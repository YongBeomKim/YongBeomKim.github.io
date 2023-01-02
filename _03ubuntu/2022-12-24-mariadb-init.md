---
layout: blog
title: MariaDB on Ubuntu 22.04
tags:
- mariadb
---

`PostgreSQL` 에서 `16Gb` 데이터를 추출 후 압축을 진행해 보니 `1Gb` 로 줄어 들었습니다. 내용을 찾아보면 `PostgreSQL` 은 용량과 속도를 내주는 대신에, 활용성을 높인 데이터베이스로 간단한 반복작업을 하는 서비스 에서는 부적합 하다는 의견이 보였습니다. 대안으로 'MySQL', 'MariaDB' 를 활용하는 것이 속도와 용량등 모든 측면에서 유리하다는 의견들을 볼 수 있었습니다.

다음의 내용은 [How to Install and Set Up MariaDB on Ubuntu 22.04](https://www.makeuseof.com/install-set-up-mariadb-on-ubuntu/) 을 따라 진행한 내용을 정리해 보겠습니다.

<br />

# **설치하기**

## **데이터베이스 설치하기**

우분투 22.04 에서 부가적으로 필요한 모듈과, MariaDB 모듈을 설치하는 명령어는 다음과 같습니다. 

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

## **한글설정 및 포트값 추가**
- [MySQL default encoding UTF8로 바꾸기](https://sitos-dev.tistory.com/18)
- [Docker MySQL, MariaDB 한글 깨짐 현상 관련 설정](https://velog.io/@jmjmjames/Docker-MySQL-MariaDB-%ED%95%9C%EA%B8%80-%EA%B9%A8%EC%A7%90-%ED%98%84%EC%83%81-%EA%B4%80%EB%A0%A8-%EC%84%A4%EC%A0%95)

```r
# 한글 사용을 위한 `unicode` 기본값 추가하기 
$ sudo nvim /etc/mysql/my.cnf
  [mysql]
  default-character-set=utf8mb4
  [Client]
  default-character-set=utf8mb4
  [mysqld]
  character-set-server=utf8mb4
  collation-server=utf8mb4_unicode_ci
  skip-character-set-client-handshake
  [mysqldump]
  default-character-set=utf8mb4

# Server Connection Setting
$ sudo nvim /etc/mysql/mariadb.conf.d/50-server.cnf 
  # * Basic Settings
  port = 3306
  bind-address = 127.0.0.1
```

<br/>

# **[Create User & Password](https://www.codingfactory.net/11336)**

## **Root 사용자 비밀번호 추가**

root 초기 사용자 암호를 추가해야 합니다. 작업이 원할하게 진행되지 않는다면 `mysql.user` 테이블의 plugin 컬럼에서 `unix_socket` 값을 `mysql_native_password` 로 [변경](https://oziguyo.tistory.com/36) 하면 됩니다.

```sql
$ sudo mysql -u root

MariaDB [(none)]> use mysql;
MariaDB [mysql]> update user set 
  password=password('<비밀번호>') where user='root';
MariaDB [mysql]> FLUSH PRIVILEGES;
MariaDB [mysql]> SELECT User, Host, plugin FROM mysql.user;

$ sudo mysql -u root -p
password:

$ sudo mycli -u root -h localhost mysql
password:

# @'localhost' : 내부만 접속, $'%' : 외부접속 가능
MariaDB []> CREATE USER '<사용자ID>'@'localhost' IDENTIFIED BY '<비밀번호>';
MariaDB []> CREATE USER '<사용자ID>'@'%' IDENTIFIED BY '<비밀번호>';
MariaDB []> CREATE DATABASE '<데이터베이스이름>';
MariaDB []> USE '<데이터베이스이름>';
MariaDB ['<데이터베이스이름>']> FLUSH PRIVILEGES;
```

## **데이터베이스 추가 및 권한설정**

아래의 스크립트는 `root` 계정으로 접속한 뒤, 새로운 사용자와 데이터베이스를 생성하고, 추가한 사용자에게 생성한 데이터베이스 권한을 추가하는 내용 입니다.

```r
$ sudo mariadb -u root -p
$ sudo mycli -u root -h localhost mysql
```
```sql
mysql> CREATE DATABASE <DB이름>;
mysql> CREATE USER '<사용자이름>'@'localhost' IDENTIFIED BY '<비밀번호>';
mysql> GRANT ALL PRIVILEGES ON <DB이름>.*  to  '<사용자이름>'@'localhost';
mysql> SHOW GRANTS FOR '<사용자이름>'@'localhost';
mysql> FLUSH PRIVILEGES;
```

<br/>

# [MyCli](https://www.mycli.net/)

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

<br/>

## 참고사이트

- [ERROR mysql ERROR 1698 (28000): Access denied](https://velog.io/@yhe228/ERRORmysql-ERROR-1698-28000-Access-denied-for-user-rootlocalhost)
- [AWS MariaDB 원격접속 하기](https://conkjh032.tistory.com/28)
- [MariaDB 초기 접속암호 분실시](https://funfunit.tistory.com/104)
