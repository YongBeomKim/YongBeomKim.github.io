---
layout: blog
title: MariaDB on Ubuntu 22.04
tags:
- sql
---

`PostgreSQL` 에서 `16Gb` 데이터를 추출 후 압축을 진행해 보니 `1Gb` 로 줄어 들었습니다. 내용을 찾아보면 `PostgreSQL` 은 용량과 속도를 내주는 대신에, 활용성을 높인 데이터베이스로 간단한 반복작업을 하는 서비스 에서는 부적합 하다는 의견이 보였습니다. 대안으로 'MySQL', 'MariaDB' 를 활용하는 것이 속도와 용량등 모든 측면에서 유리하다는 의견들을 볼 수 있었습니다.

다음의 내용은 [How to Install and Set Up MariaDB on Ubuntu 22.04](https://www.makeuseof.com/install-set-up-mariadb-on-ubuntu/) 을 따라 진행한 내용을 정리해 보겠습니다.

<br />

# **설치하기**

## **MariaDB 설치하기**

우분투 22.04 에서 부가적으로 필요한 모듈과, MariaDB 모듈을 설치하는 명령어는 다음과 같습니다. MadiaDB 는 10.06 LTS 버젼이 설치 됩니다 (2023.1.31)

```r
sudo apt update && sudo apt upgrade
sudo apt-get install wget software-properties-common dirmngr ca-certificates apt-transport-https -y
sudo apt install mariadb-server mariadb-client
sudo pip install mycli
```

설치된 이후 상태를 확인하는 명령어는 다음과 같습니다.

```r
mariadb --version
sudo systemctl status mariadb
```

## GCP 에서 방화벽 개방하기
[2023-03-31 추가](https://llighter.github.io/hugo_blog/2018/04/compute-engine%EC%97%90-mariadb-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0/) VM 머신 내부에 Mariadb 등을 설치한 경우에는 외부에서 연결 가능하도록 해당 포트를 열어줘여 합니다. 

`VPC 네트워크 >> 방화벽 규칙 세부정보` 에서 `tcp 3306` 포트를 사용할 수 있도록 설정내용을 추가 합니다.

## **한글설정 및 포트값 추가**
- [MySQL default encoding UTF8로 바꾸기](https://sitos-dev.tistory.com/18)
- [Docker MySQL, MariaDB 한글 깨짐 현상 관련 설정](https://velog.io/@jmjmjames/Docker-MySQL-MariaDB-%ED%95%9C%EA%B8%80-%EA%B9%A8%EC%A7%90-%ED%98%84%EC%83%81-%EA%B4%80%EB%A0%A8-%EC%84%A4%EC%A0%95)

```r
# MariaDB 포트값 변경
$ sudo nvim /etc/mysql/my.cnf
[mysqld]
port=15501

# 외부 포트열기
$ sudo nvim /etc/mysql/mariadb.conf.d/50-server.cnf 
#  bind-address = 127.0.0.1
```

## 포트내용 확인하기
[Ubuntu) 포트, 방화벽 확인 및 포트 열기](https://archijude.tistory.com/392) 내용을 바탕으로 위의 포트를 변경한 뒤, 내용을 확인하는 명령 방법은 다음과 같습니다.

```r
$ netstat -nap | grep LISTEN
tcp        0   0 0.0.0.0:15501   0.0.0.0:*   LISTEN      -                   

$ sudo netstat -tulpen | grep db
tcp        0   0 0.0.0.0:15501   0.0.0.0:*   2853/mariadbd       
tcp6       0   0 :::15501        :::*        2853/mariadbd    
```

## 포트 포워드
공유기를 거치는 경우, 외부에서 접속이 안되면 `포트 포워드` 내용을 확인합니다.

<br/>

# 사용자 설정

## **Root 사용자 비밀번호 추가**

root 초기 사용자 암호를 추가해야 합니다. 작업이 원할하게 진행되지 않는다면 `mysql.user` 테이블의 plugin 컬럼에서 `unix_socket` 값을 `mysql_native_password` 로 [변경](https://oziguyo.tistory.com/36) 하면 됩니다. 추가적인 내용은 [Create User & Password](https://www.codingfactory.net/11336) 를 참고 합니다.

[**2023년 3월 31일 추가 내용**](https://oneboard.tistory.com/21) 설치 후 `sudo mysql -u root` 를 입력하면 보안명령 없이 접속할 수 있습니다. 예전의 `root` 사용자 변경 쿼리를 실행하면 `ERROR 1356` 을 출력하는데, 이유는 `user` 테이블에 `@localhost` 내용이 추가되는 방식으로 변경되어 있어서 두번째 방식으로 변경을 해야 합니다. `sudo mysql -u root` 를 사용하면 비밀번호 없이도 접속이 가능하기 때문에 `root` 사용자 정보를 따로 변경할 실익은 거의 없습니다.

```sql
$ sudo mysql -u root
$ sudo mariadb -u root

MariaDB [(none)]> use mysql;
MariaDB [mysql]> UPDATE user set password=password('password@@') where user='root';
ERROR 1356 (HY000): View 'mysql.user' references invalid table(s) or column(s) or function(s) or definer/invoker of view lack rights to use them

MariaDB [mysql]> set password for 'root'@'localhost' = PASSWORD('password@@');
Query OK, 0 rows affected (0.002 sec)
MariaDB [mysql]> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.001 sec)
```

## **사용자 추가**
추가적인 사용자 입력 방법은 다음과 같습니다.

```sql
$ sudo mariadb -u root -p
$ sudo mycli -u root -h localhost mysql

# 현재 등록된 사용자정보 확인
MariaDB []> use mysql;
MariaDB [mysql]> SELECT host, user FROM user;

# @'localhost' : 내부만 접속, $'%' : 외부접속 가능
MariaDB []> CREATE USER '<사용자ID>'@'localhost' IDENTIFIED BY '<비밀번호>';
MariaDB []> CREATE USER '<사용자ID>'@'%' IDENTIFIED BY '<비밀번호>';
MariaDB []> FLUSH PRIVILEGES;
```

## **데이터베이스 추가 및 권한설정**
새로운 데이터베이스를 생성하고, 추가 사용자에게 생성한 데이터베이스 권한을 추가하는 내용 입니다.

```sql
MariaDB> CREATE DATABASE <DB이름>;
MariaDB> GRANT ALL PRIVILEGES ON <DB이름>.*  to  '<사용자이름>'@'%';
MariaDB> SHOW GRANTS FOR '<사용자이름>'@'%';
MariaDB> FLUSH PRIVILEGES;
```

<br/>

# REMOVE
설치한 DB를 삭제하는 명령은 다음과 같습니다.
```r
$ sudo apt-get purge "mariadb-*"
```

<br/>

# Backup
## Backup Tools
mariadb 를 백업 및 복원하는 방법을 살펴보겠습니다. [MariaDB 10.6 : Backup](https://www.server-world.info/en/note?os=Ubuntu_22.04&p=mariadb&f=3) 또는 [Mariabackup으로 증분백업하기](https://blog.devbox.kr/docs/mariabackup/) 에서 소개한 방법도 있지만 `MariaDB Foundation` 에서 작성한 유투브를 참고하여 진행해 보겠습니다.

<p style="text-align: center">
  <iframe width="560" height="315" 
    src="https://www.youtube.com/embed/b-KFj8GfvzE?si=xIvkAPRo2gTk0Ld1" 
    title="YouTube video player" frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowfullscreen>
  </iframe>
</p>


<br/>

# Appendix

## [MyCli](https://www.mycli.net/)
MySQL, madiadb 를 터미널에서 접속할 때, 자동완성 기능을 돕는 CLI 입니다. 설치시 몇가지 주의할 점들이 있어서 정리를 해 보았습니다.

## Python: OSError: mariadb_config not found
파이썬 [mysqlclient](https://pypi.org/project/mysqlclient/) 모듈을 설치하다 보면 위의 오류가 발생하는 경우가 있습니다. [mariadb 패키지 요구사항](https://int-i.github.io/python/2021-03-01/mariadb-config-not-found/) 을 충족하지 못해서 발생하는 문제점으로 이를 해결하면 정상적인 진행이 가능합니다.

- C 컴파일러
- 파이썬 개발 패키지 (python-dev)
- MariaDB Connector/C 라이브러리 및 헤더 파일
- TLS 라이브러리 (ex. OpenSSL 등)

## [Building cryptography on Linux](https://github.com/pyca/cryptography/blob/main/docs/installation.rst#building-cryptography-on-linux)
ARM Cpu 환경에서 `MariaDB` 를 설치하는 경우에 발생한 상황으로, `$ pip install cryptography` 설치 진행과정 중에 `Rust installed and available<installation:Rust>` 오류가 발생하여 더이상 진행되지 않았습니다.

이런 경우에는 아래의 모듈을 설치한 뒤에 진행을 하면 해결 가능합니다.
```r
$ sudo apt-get install build-essential libssl-dev libffi-dev \
    python3-dev cargo pkg-config
```

## 참고사이트
- [사용자 추가, 권한 부여하기, 원격접속 허용 설정하기](https://kig6022.tistory.com/14)
- [ERROR mysql ERROR 1698 (28000): Access denied](https://velog.io/@yhe228/ERRORmysql-ERROR-1698-28000-Access-denied-for-user-rootlocalhost)
- [AWS MariaDB 원격접속 하기](https://conkjh032.tistory.com/28)
- [MariaDB 초기 접속암호 분실시](https://funfunit.tistory.com/104)
