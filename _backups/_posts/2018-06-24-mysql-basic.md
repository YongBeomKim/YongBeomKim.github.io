---
title : MariaDB SQL Basic
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
