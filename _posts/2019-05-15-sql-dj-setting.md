---
title : SQL MariaDB in Django
last_modified_at: 2019-05-15T12:45:06-05:00
header:
  overlay_image: /assets/images/code/sql.png
categories:
  - django
tags: 
    - django
    - mysql
    - sql
toc: true    
---

**sqlite3** 는 **개별파일만** 연결하면 되지만, **SQL Server** 는 **고유주소와 id, Password** 를 입력해야 하는 번거로움 때문에 접근이 어렵습니다. 하지만 체계적이고 대형 시스템을 활용하기 위해선 이러한 작업이 안전성을 담보하는 등 익숙해 질 필요가 있습니다.

<br/>
# Tools
`$ mysql -u root -p` 로 기본 터미널을 사용하거나 **workbench** 를 사용해도 되지만, 원활한 server 관리를 위해 터미널에서 유용한 도구들을 살펴 보겠습니다.

## **MyCLI**
[GitHub](https://github.com/dbcli/mycli) Python 으로 제작된 모듈로써 youtube-dl, neo-vim 등과 같이 파이썬 환경에서 설치를 한 뒤, 설치 환경의 터미널에서 `$ mycli -u root` 를 실행하면 **vim** 과 같은 작업 환경이 실행 됩니다.

### 설치
```r
$ sudo pip3 install mycli
```

라즈베리파이 등에서 `$ sudo pip3` 를 실행하면 안되는 경우가 있습니다. 이 경우에는 `$ sudo apt-get remove python3-pip` 제거 후 `$ sudo apt-get install python3-pip` 로 재설치 하거나 `$python3 -m pip` 를 사용하여 필요한 명령을 실행하면 됩니다.
{: .notice--info}

### Syntex Color
[공식 Site](https://www.mycli.net/syntax) 기본 설정값은 어두운 녹색으로 시의성이 나쁩니다. `~/.myclirc` 설정 내용을 변경하여 다양한 Syntex 파레트로 변경 가능합니다. 추천하는 테마는 **monokai** 와 **bw** 등이 있습니다. 

```r
# Syntax coloring style. Possible values (many support the "-dark" suffix):
# Screenshots at http://mycli.net/syntax
syntax_style = default
```

설정 중 **rrt, vim** 등은 **vim** 환경으로 전환되어 실행 후 다시 빠져 나와야 하는 등의 번거로움이 있었습니다.
{: .notice--info}

## **SQLITE** in vscode

SQlite3 를 사용하는 도구로 이를 설치한 뒤, 실행을 하면 WorkSpace 내부에 있는 **sqlite db** 파일을 자동으로 찾아준 뒤 이를 연결하면 바로 내용을 확인 가능합니다. 

## **vscode-database** in vscode

**SQLite** 를 설치하면 dependancy 로 설치되는 **[vs market](https://marketplace.visualstudio.com/items?itemName=bajdzis.vscode-database)** 모듈을 활용하여 **mysql** 등의 연결이 가능 합니다.

<figure class="align-center">
  <img src="https://raw.githubusercontent.com/Bajdzis/vscode-database/master/readme/v2.0-result.gif">
  <figcaption>vscode-database</figcaption>
</figure>

<br/>
# Django 와 DataBase 추가

## 데이터베이스 와 사용자 추가
 
```sql
$ mysql -u root -p
Enter password:
sql> CREATE DATABASE myproject CHARACTER SET UTF8; 
sql> CREATE USER 'myproject'@'%' IDENTIFIED by 'djangodb';
sql> GRANT ALL PRIVILEGES ON myproject.* TO 'myproject'@'localhost';
sql> FLUSH PRIVILEGES;
sql> exit; 
```

## 사용자 관리
작업을 하다보면 사용자 정보가 중복 저장되었고 비밀번호를 제대로 관리하지 못해 문제가 발생 하였습니다. 

```sql
sql> use mysql;
sql> select host, user, password from user;
+-----------+-----------+----------------+
| host      | user      | password       |
+-----------+-----------+----------------+
| localhost | myproject | *5102147677551 |
| %         | myproject | *0129F440BCA46 |
+-----------+-----------+----------------+
```
host 정보에 나타난 `localhost` 는 **내부** 에서의 접근, `%` 는 **외부** 접근용 설정 입니다.
{: .notice--info}


## 사용자만 추가

```sql
> create user '사용자이름'@'%' identified by '비밀번호';
> flush privileges;   # 전체 권한을 부여 합니다 
> quit;
Bye
```

위에서 설정한 이름과 비번으로 실행을 합니다.

```sql
$ mysql -u 이름 -p
Enter password: 비밀번호

MariaDB [(none)]> 
```

## Django와 연결 [Blog](http://pope8.tistory.com/6)

### Mysql-client Python 설치하기 
1. [github](https://github.com/PyMySQL/mysqlclient-python)
2. [mirror 사이트](https://packages.ubuntu.com/artful-updates/amd64/libmysqlclient-dev/download)

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

<br>
# MariaDB 를 Django와 연결 
Mastering Django Core 의 내용을 살펴 보겠습니다

## Mysql-client Python 설치
```r
$ sudo apt-get install python-dev libmysqlclient-dev
$ sudo apt-get install -f
$ pip install mysqlclient
```

```python
# settings.py
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
            "SET sql_mode='STRICT_TRANS_TABLES'"},}}
```

## Django 에서 Model 정의하기

Python 코드로 직접 SQL 입력출력 가능하다. 하지만 Django의 Model Data Layout을 활용하는 이유를 열거하자면 

1. 유지 관리보수가 간편하다
2. DB 전환에 용이  (settings.py만 변경)
3. DB의 OverHead를 효과적으로 관리 (Python 객체 재활용)
4. 단, SQL결과와 100% 일치하진 않는다

## models.py

```python
# models.py
# CREATE TABLE books_publisher ("id" serial NOT NULL PRIMARY KEY...)
class Publisher(models.Model):
    name = models.CharField(max_length=30)

class Books(models.Model):
    # 기본키 Class 를 명확히 선언 및 관계를 정의한다 (django 2.0)
    publisher = models.ForeignKey('Publisher',\
     on_delete = models.CASCADE)
```

**Check in Django:** 터미널에서 `$ python manage.py check` 를 활용하면, 검사 프레임워크를 가동하여 **일반적인 모델의 문제를 잡아주고** 정상이면 `System check identified no issues (0 silenced).` 를 출력한다
{: .notice--danger}

## Model 을 SQL DataBase와 연결 

```r
$ python manage.py makemigrations 앱이름
Migrations for '앱이름':
  books/migrations/0001_initial.py
    - Create model Author
    - Create model Books
    - Create model Publisher
    - Add field publisher to books
```

SQL 구문으로 내용을 출력

```r
$ python manage.py sqlmigrate 앱이름 0001
BEGIN;
-- Create model Author
CREATE TABLE `books_author` (`id` integer AUTO_INCREMENT NOT NULL PRIMARY ..
```

SQL에 해당 작업을 적용한다 

```r
$ python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, books, contenttypes, sessions
Running migrations:
  Applying books.0001_initial... OK
```

<br/>
# mariaDB (mySQL) 에서 확인 
mariaDB 접속

```sql
$ sudo mysql -u사용자 -p
Enter password: 
```
DataBase 목록 확인 및 변경

```sql
MariaDB [(none)]> show databases;
+--------------------+
| Database           |
+--------------------+
| myproject          |
+--------------------+
2 rows in set (0.00 sec)

MariaDB [(none)]> use myproject;
Database changed
```

Table 목록 확인 및 살펴보기

```sql
MariaDB [myproject]> show tables;
+----------------------------+
| Tables_in_myproject        |
+----------------------------+
| auth_group                 |
| books_publisher            |
+----------------------------+
14 rows in set (0.01 sec)

MariaDB [myproject]> desc books_books;
+------------------+--------------+------+-----+---------+----------------+
| Field            | Type         | Null | Key | Default | Extra          |
+------------------+--------------+------+-----+---------+----------------+
| id               | int(11)      | NO   | PRI | NULL    | auto_increment |
| publisher_id     | int(11)      | NO   | MUL | NULL    |                |
+------------------+--------------+------+-----+---------+----------------+
4 rows in set (0.01 sec)
```

**Check in mariaDB:** 기본 key 테이블은 **books_publisher** 이지만, 외래키 컬렴명은 **publisher_id** 로 앱이름은 제외한 뒷부분 이름 만으로 참조한다
{: .notice--info}

**Check in mariaDB:** postgresql 보다 직관적이여서, 명령어를 익히기 용이하다 
{: .notice--info}

<br/>
# Test 접속시 1044 접속 오류가 발생하는 경우

[solution Blog](http://www.dlxedu.com/askdetail/3/d29001d0e92a66e4119cb3d696065569.html) 중국 사이트로 해결이 추가됨

```r
$ python manage.py test 모델 
Creating test database for alias 'default'...
Got an error creating the test database: (1044, "Access denied for user 'myproject'@'localhost' to database 'test_myproject'")
```

Django의 **test** 실행시에는 권한이 없어서 `ERROR 1044 (42000): Access denied for user 'tester'@'localhost' to database` 접속 오류가 발생한다
{: .notice--danger}


## 우선 root 계정으로 접속한다
```r
$ mysql -uroot -p       # 01 root 계정으로 접속한다
Enter password: 
```

## myproject 계정의 권한 내용을 살펴본다
```sql
MariaDB [(none)]> show grants for myproject@localhost;
+---------------------------------+
| Grants for my@localhost         |
+---------------------------------+
+----------------------------------------------------------------------+
| GRANT USAGE ON *.* TO 'myproject'@'localhost' IDENTIFIED BY PASSWORD |
|'*5102144CA406FC026831D796EA07645447677551'                           |
|                                                                      |
| GRANT ALL PRIVILEGES ON `my`.* TO 'my'@'localhost'                   |
+----------------------------------------------------------------------+
```

## **_test_myproject.*_** 로 접속하는경우 모든 권한을 부여한다
```sql
MariaDB [(none)]> GRANT ALL PRIVILEGES ON test_myproject.* TO 'myproject'@'localhost' IDENTIFIED BY '비밀번호';
Query OK, 0 rows affected (0.00 sec)
```

## django Setting 에서 test 계정을 추가한다
```python
DATABASES = {
    'default': {
        ...
        'TEST' : {'NAME': 'test_myproject'},
        }
      }
```

## 테스트를 실행한다

```r
$ python manage.py test 모델명

Creating test database for alias 'default'...
System check identified no issues (0 silenced).
-----------------------------------------------
Ran 0 tests in 0.000s
OK
```

정상적으로 작동되는 걸 볼 수 있습니다