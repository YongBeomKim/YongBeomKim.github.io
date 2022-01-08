---
layout: post
title: Example Of A News Article
tags:
- text
- news
---

POSTGRESQL DataBase 의 설치 및 기본 Setting 및 명령어 들을 정리해 보겠습니다.

# **POSTGRESQL**

## **Purge Remove**
**[completely-uninstall-postgresql](https://kb.objectrocket.com/postgresql/how-to-completely-uninstall-postgresql-757)**

```r
sudo apt-get --purge remove postgresql
sudo apt-get purge postgresql*
sudo apt-get --purge remove postgresql postgresql-doc postgresql-common
```

## **Install**
**[공식 Postgresql 설치가이드](https://www.postgresql.org/download/linux/ubuntu/)** 내용을 참고하여 설치를 진행 합니다. 작업을 완료한 뒤 Python 과 연결에 필요한 모듈들을 함께 설치 합니다.

```r
$ apt install libpq-dev postgresql postgresql-contrib
$ service postgresql status
   Active: active (exited) since Sun 2021-12-16 10:44:28 KST; 12min ago

$ sudo -i -u postgres
postgres@ip:~$ psql
psql (14.1 (Ubuntu 14.1-2.pgdg20.04+1))
postgres=# \q
```

## **postgresql.conf : 포트 및 외부접속**
PostgreSQL 이 `127.0.0.1:5432` 로 되어있습니다.

```r
$ netstat -ntlp     
Proto Local Address   Foreign Address State   PID/Program name    
tcp   0.0.0.0:22      0.0.0.0:*       LISTEN  898/sshd            
tcp   127.0.0.1:5432  0.0.0.0:*       LISTEN  1030/postgres       
```

`postgresql.conf` 에서 외부 에서도 접속 가능한 `0.0.0.0` 아이피로, 그리고 사용자가 `7879` 포트 로 변경하는 내용 입니다. 아래의 내용을 변경한 뒤, 재실행을 하면 변경된 내용을 확인할 수 있습니다.

```r
$ sudo vi /etc/postgresql/14/main/postgresql.conf
listen_address = '*'    # what IP address(es) to listen on;
port = 7879             # (change requires restart)
```

## **pg_hba.conf : 보안설정**

`pg_hba.conf` 에서는 접속 IP 와 보한 수준을 정의 합니다. `trust` 설정을 적용하면 비밀번호를 Pass 합니다.

```r
$ sudo vi /etc/postgresql/14/main/pg_hba.conf
host   all   all          0.0.0.0/0  md5    # (+) 보안외부접속
host   all   all       127.0.0.1/32  trust  # 내부접속
host   all   all   172.27.00.000/32  reject # 차단 IP
```

## **데이터베이스 & 사용자 추가**

1) `postgres` 초기 사용자의 Password 설정
2) `python` 사용자 추가 및 **SUPERUSER** 권한 할당 
3) `python` SUPERUSER 의 비밀번호 설정
4) `arterior` Database 추가 및 `UTF8` 인코딩 설정

```sql
postgres=# ALTER USER postgres WITH PASSWORD 'pass1234';
ALTER ROLE
postgres=# CREATE USER python SUPERUSER;
CREATE ROLE
postgres=# ALTER USER python WITH PASSWORD 'pass1234';
ALTER ROLE
postgres=# CREATE DATABASE arterior WITH OWNER cobalt ENCODING 'UTF8' template template0;
CREATE DATABASE
```

기본 encoding 은 **SQL_ASCII** 입니다. 한글 사용을 위해 UTF8 로 지정을 하는경우 `template` 을 `template0` 으로 정의 합니다.

```sql
postgres=# \l
   Name    |  Owner   | Encoding | Collate |  Ctype  |   Access privileges   
-----------+----------+----------+---------+---------+-----------------------
 arterior  | cobalt   | UTF8     | C.UTF-8 | C.UTF-8 | 
 postgres  | postgres | UTF8     | C.UTF-8 | C.UTF-8 | 
 template0 | postgres | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +
           |          |          |         |         | postgres=CTc/postgres
 template1 | postgres | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +
           |          |          |         |         | postgres=CTc/postgres
```

## **[How to change postgres data directory](https://dbaclass.com/article/how-to-change-postgres-data-directory/)**

일반적으로 기본 드라이버에 설치가 됩니다. 사용을 하다보면 서버용량의 한계로 금방 차는 경우가 발생 합니다. 용량을 확장하기 위한 드라이브 변경 내용을 살펴 보겠습니다.

우선 기본 설정내용을 확인 합니다.

```sql
$ sudo -i -u postgres psql
psql (14.1 (Ubuntu 14.1-2.pgdg20.04+1))
Type "help" for help.

postgres=# SHOW config_file;
 /etc/postgresql/14/main/postgresql.conf

postgres=# SHOW data_directory;
 /var/lib/postgresql/14/main
```

새롭게 활용할 드라이브에 폴더를 생성한 뒤 권한 및 설정 파일을 붙여넣기 합니다.

```r
$ systemctl stop postgresql.service
$ mkdir /data/pgdata
$ chown postgres:postgres /data/pgdata
$ chmod 700 /data/pgdata
$ rsync -av /var/lib/postgresql/14/main/  /data/pgdata
```

postgresql 의 설정과 postgresql.service 의 설정 파일들에서 변경된 내용을 적용 합니다.

```r
$ nvim /etc/postgresql/14/main/postgresql.conf
# FILE LOCATIONS
data_directory = '/data/pgdata'    # use data in another directory

$ nvim /lib/systemd/system/postgresql.service
[Service]
Environment=PGDATA=/data/pgdata
```

위 설정을 반영한 내용이 잘 작동하는지, 리부팅 한 뒤 내용을 살펴 봅니다. 맨 아래처럼 변경된 폴더가 출력되는지 확인을 하면 완료 됩니다.

```r
$ systemctl daemon-reload
$ systemctl start postgresql.service
$ systemctl status postgresql.service
$ sudo -i -u postgres psql
postgres=# SHOW data_directory;
 /data/pgdata
```

<br/>

# **PGCLI**

## **Install**

**[공식 설치 가이드](https://www.pgcli.com/install)** 를 확인합니다. 설치가 완료된 뒤, `pip3 install pgcli` 를 오류없이 설치가 되었으면 모든 내용은 완료가 됩니다

```r
$ apt install libpq-dev   # psycopg2 Python 연결용
$ apt install postgresql postgresql-contrib
$ service postgresql status
   ● postgresql.service - PostgreSQL RDBMS
$ sudo pip3 install pgsql
```

## **2 Connection**
`pgcli -h <접속주소> -p <접속포트> -U <사용자명> <대상Database>`

```r
$ pgcli -h 11.22.333.444 -p 5432 -U python arterior
Server: PostgreSQL 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)
Version: 3.0.0
Chat: https://gitter.im/dbcli/pgcli
Home: http://pgcli.com
python@15:arterior>
 
[F2]Smart Completion:ON  [F3]Multiline:OFF  
[F4]Emacs-mode Refreshing completions...   
```

지금까지 설치 및 설정과 관련한 내용들을 살펴 보았습니다. `pqcli` 를 활용하면 관련된 명령어들이 자동으로 나와서 편리합니다. 다음 페이지 에서는 기본적인 명령어 들을 살펴보도록 하겠습니다.

<br/>

## 참고사이트
- [How to change PostgreSQL's data directory on Linux](https://fitodic.github.io/how-to-change-postgresql-data-directory-on-linux)
- [Custom PGDATA with systemd](https://pgstef.github.io/2018/02/28/custom_pgdata_with_systemd.html)
- [POSTGRESQL 비밀번호 초기화](https://055055.tistory.com/14)
- [PGCLI Github](https://github.com/dbcli/pgcli)
- [PostgreSQL 9.2.4 문서](https://postgresql.kr/docs/9.2/index.html)
- [PostgreSQL 설치](https://dejavuqa.tistory.com/363?category=257816)
- [PostgreSQL 외부접속](https://dejavuqa.tistory.com/32?category=257816)
- [PostgreSQL 기본명령어 in My Gitblog](https://yongbeomkim.github.io/sql/psql-01-startup/)
- [알아두면 유용한 PSQL](https://browndwarf.tistory.com/51)
- [Python 과 PostgreSQL 연동](https://jinmay.github.io/2018/01/11/python/python-with-postgresql)
- [PostgreSQL 외부접속 허용하기](https://racoonlotty.tistory.com/entry/PostgreSQL-%EC%99%B8%EB%B6%80-%EC%A0%91%EA%B7%BC-%ED%97%88%EC%9A%A9)


<iframe width="560" height="315" src="https://www.youtube.com/embed/HHbIPi43HE4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
