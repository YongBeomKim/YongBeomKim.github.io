---
title : 생활코딩 SQL Basic
last_modified_at: 2018-06-24T12:45:06-05:00
header:
  overlay_image: /assets/images/book/sql.jpg
categories:
  - sql
tags: 
    - sql
    - mysql
toc: true 
---

# **SQL**

함수에서도 **Sqlite3** 를 쓰고있고, Django 에서도 CRUD 모듈을 만드는 등, SQL 에 대해 자주 사용하고 있지만, 막상 SQL 이 무엇인가?? 라고 한다면 애한 느낌이 아직도 듭니다

<br/>
# **MariaSQL, MySQL**

SQL 을 다룰 때, **Sqlite3** 를 쓰고는 있지만, 다중 연결에 취약한 만큼 웹 서비스를 본격적으로 진행할 예정인 만큼 이 부분에 대해서도 명확하게 정리를 하겠습니다. 다음은 DataBase 를 실행하는 방법 입니다.

```sql
$ mysql -u 사용자이름 -p
Enter password: 

# 다음의 명령으로 비밀번호를 변경
mysql> SET PASSWORD = PASSWORD('12345')
```

1. **[MariaDB 설치](https://yongbeomkim.github.io/sql/mariadb-install-linux/)**
2. **[MariaDB 기본문법](https://yongbeomkim.github.io/sql/mysql-basic/)
3. **[MySQL 의 Django 연결](https://yongbeomkim.github.io/sql/mariadb-in-django-01/)**
4. **[MySQL 의 PhP Admin 연결](https://yongbeomkim.github.io/mariadb/phpadmin-install-xu/)**

<br/>
# **DataBase 개념**

```sql
mysql> CREATE DATABASE [IF NOT EXISTS] 데이터베이스_이름;
mysql> SHOW DATABASES;
+-------------------+
| Database          |
+-------------------+
| 데이터베이스_이름 |
+-------------------+
mysql> USE 데이터베이스_이름
```

**[생활코딩 DataBase MySQL](https://www.youtube.com/playlist?list=PLuHgQVnccGMCgrP_9HL3dAcvdt8qOZxjW)** 의 개념과 용어들 부터 명확하게 정리를 하겠습니다.

MySQL 의 전체적인 [명령어 요약](http://www.mysqltutorial.org/mysql-cheat-sheet.aspx) 은 **Mysql Cheat Sheet** 로 검색을 하면 좋습니다.

1. DataBase **SERVER**
2. **Schema :** DB 구조와 제약조건을 기록한 **메타데이터 집합**
   1. **DB의 구조적 특성** 을, **인스턴스** 로 규정
   2. 수업은 **테이블의 묶음 폴더** 로 **사용자와 테이블의 차등적 권한부여** 로 압축하여 설명
   3. 사용자가 **External Schema(외부 스키마)** 를 입력하면, **Conceptual Schema(개념 스키마)** 과정에서  번역 후, **Internal Schema(내부 스키마)** 로 **물리적 저장장치 입장으로** 새로운 구조를 생성 및 실행 합니다.
3. **Table :** 표로써 **Column(열)** 과 **row,record(행)** 으로 구성 

<br/>
# **Table**

## **Table 의 생성**

Django 에서 모델을 생각하면 됩니다. 줄 바꿈을 하면 마지막에 **;** 를 꼭 붙여야 실행 됩니다. **(Javascript 와 비슷 합니다.)**

```sql
CREATE TABLE topic(
    id INT(11) NOT NULL  AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT NULL,
    created DATETIME NOT NULL,
    author VARCHAR(15) NULL,
    profile VARCHAR(200) NULL,
    PRIMARY KEY(id));
```

## **CRUD**

지금까지 작업한 내용을 간단하게 복습 합니다.

```sql
# 사용자가 원하는 데이터베이스로 전환
mysql> SHOW DATABASES;
mysql> USE 데이터베이스_이름;

# 테이블의 구조를 확인하고 컬럼을 추가합니다
# NOW() 는 현재시간을 기록합니다
# 입력은 Tuple 단위로 생성, 입력 됩니다
mysql> SHOW TABLES;
mysql> DESC 테이블_이름; 
```

### **Create**

```sql
mysql> INSERT INTO 테이블_이름 (필드명1, 필드명2, 필드명3, ...) 
       VALUES ('1번필드 입력내용', '2번필드 입력내용', NOW(), ...); 
```

### **READ**

아래의 명령에서 * 는 모든 필드를 의미 합니다

```sql
mysql> SELECT * FROM 테이블_이름;
```









# MariaDB SQL 기본문법

<small>**모던 윕을 위한 JavaScript** 에 포함된 SQL 내용 정리</small>

<br/>
## DataBase 생성

```sql
MariaDB [(none)]>  CREATE BATABASE Test;
Query OK, 1 row affected (0.00 sec)

MariaDB [(none)]>  USE Test;
```

데이터베이스를 만들때에는 **Root 계정**을 사용한다. 다른 계정에서는 권한 문제로 작업에 제한요소가 생길 수 있다.
{: .notice--info}


<br>
## **INSERT :** TABLE 생성

| 자료형       | 설명         |
|:-----------: | :----------: |
| VARCHAR      | 문자열       |
| INT          | 정수 숫자    |
| DOUBLE       | 실수 숫자    |


```sql
MariaDB [Test]> CREATE TABLE products(
    -> id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -> name VARCHAR(50) NOT NULL,
    -> modelnumber VARCHAR(15) NOT NULL,
    -> series VARCHAR(30) NOT NULL);
Query OK, 0 rows affected (0.02 sec)
```

| 필드속성       | 설명          |
| :-------------:| :-----------: |
| NOT NULL       | 반드시 입력   |
| AUTO_INCREMENT | 자동증감      |
| PRIMARY KEY    | 기본키 지정   |

```sql
MariaDB [Test]> DESCRIBE products;
+-------------+-------------+------+-----+---------+----------------+
| Field       | Type        | Null | Key | Default | Extra          |
+-------------+-------------+------+-----+---------+----------------+
| id          | int(11)     | NO   | PRI | NULL    | auto_increment |
| name        | varchar(50) | NO   |     | NULL    |                |
| modelnumber | varchar(15) | NO   |     | NULL    |                |
| series      | varchar(30) | NO   |     | NULL    |                |
+-------------+-------------+------+-----+---------+----------------+
4 rows in set (0.01 sec)
```

## **READ :** 데이터 저장 및 조회

```sql
MariaDB [Test]> INSERT INTO products (name, modelnumber, series) VALUES
    -> ('Eric Clapton Stratocaster', '01078238412', 'Artist');
Query OK, 1 row affected (0.01 sec)
```

```sql
MariaDB [Test]> SELECT * FROM products;
+----+---------------------------+-------------+--------+
| id | name                      | modelnumber | series |
+----+---------------------------+-------------+--------+
|  1 | Eric Clapton Stratocaster | 01078238412 | Artist |
+----+---------------------------+-------------+--------+
1 row in set (0.00 sec)


MariaDB [Test]> SELECT  id, name  FROM products;
+----+---------------------------+
| id | name                      |
+----+---------------------------+
|  1 | Eric Clapton Stratocaster |
+----+---------------------------+
1 row in set (0.00 sec)
```


## **FILTER :** 조건 검사

| 연산자         | 설명          |
|:--------------:|:-------------:|
| =              | 동등 조건     |
| != 또는 <>     | 서로 다름     |
| <, >, <=, >=   | 크기 비교     |
| OR             | 논리합        |
| AND            | 논리곱        | 
| % (LIKE)       | 시작값 조건   |
| _              | _ 1개당 1글자 |

```sql
MariaDB [Test]> SELECT * FROM products
    -> WHERE series="Artist";
``` 

```sql
MariaDB [Test]> SELECT * FROM products
    -> WHERE (series="Artist") OR (series="Road Worn");
```

```sql
MariaDB [Test]> SELECT * FROM products
    -> WHERE modelnumber LIKE '010%';
```

```sql
MariaDB [Test]> SELECT * FROM products
    -> WHERE modelnumber LIKE '010___'; //___ : 3글자 더 붙는 조건
```

## **SORT :** 데이터 정렬

### **ORDER BY** 에 추가로 **ASC**는 **내림차순** 을, **DESC**는 **오름차순** 정렬을 한다

```sql
MariaDB [Test]> SELECT id, name FROM products
    -> ORDER BY name ASC;
```

### **LIMIT 2(Number), 2(Step)**

```sql
MariaDB [Test]> SELECT * FROM products LIMIT 2, 2;
```

### **LIMIT 2(Number), 2(Step)**

```sql
MariaDB [Test]> SELECT * FROM products LIMIT 2, 2;
```

### **GROUP BY**

```sql
MariaDB [Test]> SELECT * FROM products GROUP BY series;
```

### **응용예제**

```sql
MariaDB [Test]> SELECT id, modelnumber FROM products 
    -> WHERE (id<7) AND (modelnumber LIKE '010%')
    -> ORDER BY name DESC
    -> LIMIT 3;
```

## **UPDATE :** 데이터 수정

```sql
MariaDB [Test]> UPDATE products SET 
    -> name = 'American Deluxe Telecaster' 
    -> WHERE id = 1;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

+----+----------------------------+-------------+--------+
| id | name                       | modelnumber | series |
+----+----------------------------+-------------+--------+
|  1 | American Deluxe Telecaster | 01078238412 | Artist |
+----+----------------------------+-------------+--------+
```

```sql
MariaDB [Test]> UPDATE products SET 
    -> name = 'American Telecaster',
    -> modelnumber = '01011112222'  
    -> WHERE id = 1;
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0

+----+---------------------+-------------+--------+
| id | name                | modelnumber | series |
+----+---------------------+-------------+--------+
|  1 | American Telecaster | 01011112222 | Artist |
+----+---------------------+-------------+--------+
```

## **DELETE :** 데이터 삭제

### id를 지정하지 않으면 TABLE 전체를 삭제한다

```sql
MariaDB [Test]> DELETE FROM products WHERE id = 1;
Query OK, 1 row affected (0.01 sec)

MariaDB [Test]> DELETE FROM products;
Query OK, 0 rows affected (0.00 sec)
```

### 빈 TABLE, DATABASE의 삭제

```sql
MariaDB [Test]> DROP TABLE products;
Query OK, 0 rows affected (0.01 sec)

MariaDB [Test]> DROP DATABASE Test;
Query OK, 0 rows affected (0.01 sec)
```
