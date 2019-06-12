---
title : SQL Mycli and Django
last_modified_at: 2019-05-15T12:45:06-05:00
header:
  overlay_image: /assets/images/book/sql.png
categories:
  - sql
tags: 
    - sql
    - mysql
toc: true
---

**sqlite3** 는 **개별파일만** 연결하여 사용성은 높지만 보안 및 사용자 관리가 어려운 반면, **MySQL** 등은  **고유주소, 사용자ID, Password** 등을 설정해야 하는 번거로움이 있지만, 시스템 및 작업의 안전성을 담보하는 만큼 익숙해 질 필요가 있습니다.

<br/>
# DataBase 사용자 관리

사용자 생성 및 권한을 부여하는 방법을 알아보겠습니다. 주의할 점으로는 사용자 특정시 **`** 기호를 사용하는데, 이는 단따옴표가 아닌 **UP 기호** 임에 주의 합니다.

하지만 지금은 **단따옴표** 를 사용해도 실행 가능한 모습을 보여 주었습니다.
{: .notice--info}

## MySQL 사용자 정보 확인
등록된 사용자 정보를 확인 합니다.

```sql
sql> use mysql;
sql> select host, user, password from user;
+-----------+---------+----------------+
| host      | user    | password       |
+-----------+---------+----------------+
| localhost | root    | *5102147677551 |
| %         | ironman | *0129F440BCA46 |
+-----------+---------+----------------+
```

host 에 표시된 `localhost` 는 **내부** 접근 전용, `%` 는 **외부** 접근 설정 입니다.
{: .notice--info}

## 사용자 생성 및 권한 설정
모든 권한을 갖는 외부에서 접속 가능한 `id:ceo` , `pw:password` 를 추가 합니다.

```sql
sql> CREATE USER ceo@`%` IDENTIFIED BY `password`;
sql> GRANT ALL ON *.* TO ceo@`%`;
```

특정한 작업영역을 제한하는 `id:staff` , `pw:company`  사용자를 추가 합니다.

```sql
sql> CREATE USER staff@`%` IDENTIFIED BY `company`;
sql> GRANT SELECT, INSERT, UPDATE, DELETE ON ShopDB.* TO staff@`%`;
sql> GRANT SELECT ON user.* TO staff@`%`;
```

위 내용은 `GRANT 작업권한내용 ON 데이터베이스.테이블 TO 사용자` 부분의 내용으로, 해당 데이터베이스 내부의 모든 테이블에 권한을 추가 하는 내용 입니다.
{: .notice--info}


등록한 사용자로 로그인 하는 방법은 다음과 같습니다

```sql
$ mysql -u staff -p
Enter password: company
sql> 
```

지금까지 작업한 사용자별 권한 내용을 확인해 보겠습니다.

```sql
sql> SHOW GRANTS FOR `staff`@`%`;
```

사용자를 삭제하는 방법은 다음과 같습니다.

```sql
sql> DELETE FROM user WHERE user=`staff`;
sql> DROP USER `staff`;
```

<br/>
# Django와 연결 

GRANT ALL PRIVILEGES ON myproject.* TO 'myproject'@'%'; 

Django의 Model Data Layout을 활용하면 다음과 같은 장점이 있습니다.

1. 유지 관리보수가 간편하다
2. DB 전환에 용이  (settings.py만 변경)
3. DB의 OverHead를 효과적으로 관리 (Python 객체 재활용)
4. 단, SQL결과와 100% 일치하진 않는다

Django 에서 연결하여 사용할 DataBase 와 사용자를 추가합니다.

```sql
> CREATE DATABASE 데이터베이스;
> CREATE USER '사용자ID'@'%' IDENTIFIED BY 'password';
> GRANT ALL PRIVILEGES ON 데이터베이스.* TO '사용자ID'@'%';
> SHOW GRANTS FOR '사용자ID';                                                                       +----------------------------------------------------------------+
| Grants for 사용자ID@%                                          |+----------------------------------------------------------------+
| GRANT USAGE ON *.* TO '사용자ID'@'%' IDENTIFIED BY PASSWORD '*'|
| GRANT ALL PRIVILEGES ON `데이터베이스`.* TO 'myproject'@'%'    |+----------------------------------------------------------------+
```

## Mysql-client Python 모듈의 설치

```r
$ sudo apt-get install python-dev libmysqlclient-dev
# 오류가 발생하면 이를 통해서 수정 후 재설치를 한다
$ sudo apt-get install -f
$ pip install mysqlclient
```

## **settings.py** in Django

다음의 내용으로 설정값을 변경 합니다.

```python
# settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '데이터베이스',
        'USER': '사용자ID',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT':  '3306', # mariaDB default 포트설정
        'OPTIONS' :      # http://tibyte.kr/274 (Warning 경고시)
            {'init_command': 
            "SET sql_mode='STRICT_TRANS_TABLES'"},}}
```

**Django Celery Beat** 의 경우 **makemigragtion** 을 실행하면 `"Error 1071: Specified key was too long; max key length is 767 bytes"` 오류를 출력합니다. 이를 수정하는 방법으로 [GitIssue](https://github.com/mattermost/mattermost-server/issues/10358) 내용과 함께, MariaDB 10.2 이상의 버젼을 설치하면 해결되는 것으로 알려져 있습니다.

## **models.py**

```python
# CREATE TABLE books_publisher 
# ("id" serial NOT NULL PRIMARY KEY...)
class Publisher(models.Model):
    name = models.CharField(max_length=30)

# 기본키 Class 를 명확히 선언 및 관계를 정의한다
class Books(models.Model):
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
    - Add field publisher to books
```

SQL 구문으로 내용을 출력 합니다.

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

## 테스트를 실행 합니다

```r
$ python manage.py test 모델명

Creating test database for alias 'default'...
System check identified no issues (0 silenced).
-----------------------------------------------
Ran 0 tests in 0.000s
OK
```

정상적으로 작동되는 걸 볼 수 있습니다

<br/>
# 참고 Site 목록
1. Django 에서 MySQL 사용법 [Blog](http://pope8.tistory.com/6)
2. mysqlclient-python [GitHub](https://github.com/PyMySQL/mysqlclient-python)
3. 1044 접속 오류가 발생한 경우 [Blog](http://www.dlxedu.com/askdetail/3/d29001d0e92a66e4119cb3d696065569.html)