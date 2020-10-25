---
title : PostgreSQL settings in ubnutu
last_modified_at: 2020-10-17T10:45:06-05:00
header:
   overlay_image: /assets/images/project/postgresql.png
categories:
  - server
tags: 
    - aws
    - server
    - linux
---

EC2 에서 필요로 하는 프로그램들을 설치하는 과정을 살펴보았다면, 이번에는 DataBase 의 설치 및 기본 Setting 및 명령어 들을 정리해 보겠습니다. 

Django 를 활용하여 플랫폼 작업을 하고 있어서 PostgreSQL 과 관련된 내용은 오래전 부터 듣고 정리를 했었지만, 관련 한국어 자료들이 않지 않아서 MySQL 을 활용한 설치 및 외부접속 그리고 명령어 들을 활용하고 있었습니다. EC2 서버를 구축하고, 보다 고도화된 정보처리 및 저장 가능한 **(Array 데이터가 Cell 에 저장 가능)** 장점을 활용해 보도록 하겠습니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/HHbIPi43HE4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br />

# **POSTGRESQL**

## **1 Install**

우분투 18.04 를 기준으로 정리해 보겠습니다

```r
$ apt install libpq-dev   # psycopg2 Python 연결용
$ apt install postgresql postgresql-contrib
$ service postgresql status
● postgresql.service - PostgreSQL RDBMS
   Loaded: loaded (/lib/systemd/system/postgresql.service; enabled; vendor preset: enabled)
   Active: active (exited) since Sat 2020-10-24 10:00:49 UTC; 1h 34min ago
  Process: 12790 ExecStart=/bin/true (code=exited, status=0/SUCCESS)
 Main PID: 12790 (code=exited, status=0/SUCCESS)

$ sudo -i -u postgres
postgres@ip-111-22-33-44:~$ psql
psql (10.14 (Ubuntu 10.14-0ubuntu0.18.04.1))
Type "help" for help.

postgres=# \q
postgres@ip-111-22-33-44:~$ exit
logout
```

## **2 외부포트 열기**

내부 IP 설정내용을 살펴보면, PostgreSQL 이 사용하는 `5432` 번 포트가 `127.0.0.1:5432` 로 되어있음을 볼 수 있다. 이는 **내부에서만 활성화된 Port 설정** 의 의미를 갖는 것으로 설정 변경을 통해서 외부에서도 접속 가능한 `0.0.0.0:5432` 바꿔주는 과정 입니다.

```r
$ netstat -ntlp     
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      898/sshd            
tcp        0      0 127.0.0.1:5432          0.0.0.0:*               LISTEN      1030/postgres       
```

`pg_hba.conf` 에서는 외부접속 가능한 IP 를 설정 합니다.

```r
$ sudo vi /etc/postgresql/12/main/pg_hba.conf
host all all 0.0.0.0/0 trust          # 모든 IP 접근을 허용
host all all 172.27.00.00/0 trust     # case 1. 특정 IP만 접근을 허용  
host all all 172.27.00.000/32 reject  # case 2. 특정 IP만 접근을 막음
```

그리고 `postgresql.conf` 에서는 CONNECTIONS AND AUTHENTICATION 부분의`listen_address = localhost` 내용을 `listen_address = '*'` 로 바꿔줍니다.

```r
$ sudo vi /etc/postgresql/12/main/postgresql.conf
listen_address = '*'    # what IP address(es) to listen on;
port = 7879             # (change requires restart)
```

위 설정을 모두 마친뒤에 서비스를 재실행한 뒤 IP 내용을 확인 합니다. 앞의 `127.0.0.1:5432` 내용이 `0.0.0.0:5432` 로 바뀐것을 알 수 있습니다.

```r
$ service postgresql restart
$ netstat -ntlp 
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address Foreign   Address  State  PID/Program name    
tcp        0      0 0.0.0.0:22    0.0.0.0:*          LISTEN 898/sshd            
tcp        0      0 0.0.0.0:7879  0.0.0.0:*          LISTEN 11662/postgres      
```

## **3 사용자 설정**

MySQL 과 달리 기본적인 설정 Table 이 존재하지 않습니다. 따라서 사용자가 최고관리자 및 사용자를 생성하고 이과 관련된 내용을 할당해야 합니다. 아래의 내용을 정리하면 1) `postgres` 초기 사용자의 Password 설정, 2) `python` 사용자 추가 및 **SUPERUSER** 권한 할당 3) `python` SUPERUSER 의 비밀번호 설정, 4) `arterior` 라는 Database 추가 및 한글사용을 위한 `UTF8` 인코딩 설정 순으로 진행 됩니다.

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

Database 를 만들때 한가지 주의할 점은 encoding 입니다. 기본 encoding 은 **SQL_ASCII** 입니다. UTF8 로 지정을 하려면 Database 를 생성할 때 추가를 해야 합니다. 그렇지 않으면 Database 를 삭제하고 다시 만들어야 하는 귀찮은 상황이 발생 됩니다. 그리고 UTF8 로 지정을 하려면 `template` 을 `template0` 으로 지정해야 합니다.

```sql
postgres=# \l
                              List of databases
   Name    |  Owner   | Encoding | Collate |  Ctype  |   Access privileges   
-----------+----------+----------+---------+---------+-----------------------
 arterior  | cobalt   | UTF8     | C.UTF-8 | C.UTF-8 | 
 postgres  | postgres | UTF8     | C.UTF-8 | C.UTF-8 | 
 template0 | postgres | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +
           |          |          |         |         | postgres=CTc/postgres
 template1 | postgres | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +
           |          |          |         |         | postgres=CTc/postgres
(4 rows)

postgres=# 
```

<br/>

# **PGCLI**

사용자 접속 모듈로 가장많이 활용하는 것이 PGADMIN4 입니다. 이는 윈도우 등에서 설치와 함께 자동으로 실행가능한 프로그램으로 GUI 를 활용하여 접근하는 방식 입니다. 하지만 Server 작업을 위해선 Terminal 에서 관련 명령어들을 입력해야 하고 이를 위해서는 앞에서 본 내용과 같은 내용들을 일일히 암기를 해야 하는 단점이 있습니다.

이러한 불편함을 극복하기 위한 Termial SQL Ide 가 있는데 MySQL, MariaDB 를 활용 가능한 `mycli` 와, PostgreSQL 을 활용 가능한 `pgcli` 2가지가 있고, 이번 시간에는 **[PGCLI](https://www.pgcli.com/)** 의 설치 및 사용방법에 대해서 알아보도록 하겠습니다.

## **1 Install**

주의할 점으로는 해당 프로그램은 PostgreSQL 의 엔진을 필요로 하므로, 사용자가 실행하려는 컴퓨터 에서도 사용은 하지 않더라도 **PostgreSQL** 프로그램이 설치가 되어 있어야만 합니다. 설치가 완료된 뒤, `pip3 install pgcli` 를 오류없이 설치가 되었으면 모든 내용은 완료가 됩니다

```r
$ apt install libpq-dev   # psycopg2 Python 연결용
$ apt install postgresql postgresql-contrib
$ service postgresql status
   ● postgresql.service - PostgreSQL RDBMS

$ sudo pip3 install pgsql
```

## **2 Connection**

아래의 명령만 실행하면 

```r
# pgcli -h <접속주소> -p <접속포트> -U <사용자명> <대상Database>
$ pgcli -h 11.22.333.444 -p 5432 -U python arterior
Server: PostgreSQL 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)
Version: 3.0.0
Chat: https://gitter.im/dbcli/pgcli
Home: http://pgcli.com
python@15:arterior>
 
[F2] Smart Completion: ON  [F3] Multiline: OFF  [F4] Emacs-mode     Refreshing completions...   
```

지금까지 설치 및 설정과 관련한 내용들을 살펴 보았습니다. `pqcli` 를 활용하면 관련된 명령어들이 자동으로 나와서 편리합니다. 다음 페이지에서는 기본적인 명령어 들을 살펴보도록 하겠습니다.

<br/>

## 참고사이트

- [PostgreSQL 설치](https://dejavuqa.tistory.com/363?category=257816)
- [PostgreSQL 외부접속]()

- [알아두면 유용한 PSQL](https://browndwarf.tistory.com/51)
- [Python 과 PostgreSQL 연동](https://jinmay.github.io/2018/01/11/python/python-with-postgresql)
- [PostgreSQL 외부접속 허용하기](https://racoonlotty.tistory.com/entry/PostgreSQL-%EC%99%B8%EB%B6%80-%EC%A0%91%EA%B7%BC-%ED%97%88%EC%9A%A9)
- [pgcli Github](https://github.com/dbcli/pgcli)

https://yongbeomkim.github.io/sql/psql-01-startup/