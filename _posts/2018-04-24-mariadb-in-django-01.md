---
title : Maria DB 사용법 & Django 연결
last_modified_at: 2018-04-24T20:45:06-05:00
header:
  overlay_image: /assets/images/book/sql.jpg
categories:
  - sql
tags: 
    - mariadb
    - mysql
toc: true    
---

## mysql Workbench 설치하기

**Please Note:** [https://dev.mysql.com/downloads/file/?id=474211](https://dev.mysql.com/downloads/file/?id=474211) 에서 deb 파일을 다운 후 설치한다 
{: .notice--info}

## Django와 연결을 위한 DataBase 및 사용자 추가

### 새로운 데이터베이스와 사용자를 추가한다
 
```sql
markbaum@markbaum:~$ mysql -u root -p
Enter password: 

> CREATE DATABASE  DB이름 CHARACTER SET UTF8;
> CREATE USER 사용자@localhost IDENTIFIED BY '비밀번호';
> GRANT ALL PRIVILEGES ON DB이름.* TO 사용자@localhost;
> FLUSH PRIVILEGES;
> exit; 
```

### 사용자만 추가

```sql
> create user '이름'@'%' identified by '비밀번호';
> flush privileges;   # 전체 권한을 부여한다 
> quit;
Bye
```

위에서 설정한 이름과 비번으로 실행한다.

```sql
$ mysql -u 이름 -p
Enter password: 비밀번호

MariaDB [(none)]> 
```

## Django와 연결 [Blog](http://pope8.tistory.com/6)

### Mysql-client Python 설치하기 [github](https://github.com/PyMySQL/mysqlclient-python) | [mirror 사이트](https://packages.ubuntu.com/artful-updates/amd64/libmysqlclient-dev/download)

```r
$ sudo apt-get install python-dev libmysqlclient-dev
# 오류가 발생하면 이를 통해서 수정 후 재설치를 한다
$ sudo apt-get install -f
$ pip install mysqlclient
```

```python
#settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'DB 이름',
        'USER': 'User 이름',
        'PASSWORD': 'User 암호',
        'HOST': 'localhost',
        'PORT':  '3306', # mariaDB default 포트설정
        'OPTIONS' :      # http://tibyte.kr/274 (Warning 경고시)
            {'init_command': 
            "SET sql_mode='STRICT_TRANS_TABLES'"},
        }
}
```