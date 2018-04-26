---
title : Master Django | model MariaDB
last_modified_at: 2018-04-27T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
tags: 
    - django
    - pyton
toc: true    
---


## MariaDB 를 Django와 연결 

### Mysql-client Python 설치

```
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


### models.py

```python
# models.py

# CREATE TABLE books_publisher ("id" serial NOT NULL PRIMARY KEY...)
class Publisher(models.Model):
    name           = models.CharField(max_length=30)

class Books(models.Model):
    # 기본키 Class 를 명확히 선언 및 관계를 정의한다 (django 2.0)
    publisher        = models.ForeignKey('Publisher', on_delete=models.CASCADE)
```

**Check in Django:** 터미널에서 `$ python manage.py check` 를 활용하면, 검사 프레임워크를 가동하여 **일반적인 모델의 문제를 잡아주고** 정상이면 `System check identified no issues (0 silenced).` 를 출력한다
{: .notice--danger}


### Model 을 SQL DataBase와 연결 

```
$ python manage.py makemigrations 앱이름
Migrations for '앱이름':
  books/migrations/0001_initial.py
    - Create model Author
    - Create model Books
    - Create model Publisher
    - Add field publisher to books
```


SQL 구문으로 내용을 출력

```
$ python manage.py sqlmigrate 앱이름 0001
BEGIN;
-- Create model Author
CREATE TABLE `books_author` (`id` integer AUTO_INCREMENT NOT NULL PRIMARY ..
```


SQL에 해당 작업을 적용한다 

```
$ python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, books, contenttypes, sessions
Running migrations:
  Applying books.0001_initial... OK
```



## mariaDB (mySQL) 에서 확인 

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