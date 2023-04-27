---
layout: blog
title: PostgreSQL 기초 명령어
tags:
- sql
---

Python 으로 수집 정리한 자료를 저장 및 관리하는 PipeLine 으로 Python 의 `apscheduler` 과 `Postgresql shell` 를 활용 합니다.

![book cover]({{ site.url }}{{ site.baseurl }}/assets/book/psql.jpg)

# 모두를 위한 PostgreSQL (psql shell)

## psql 접속하기

```sql
$ sudo -i -u postgres sql
psql (13.2 (Ubuntu 13.2-1.pgdg18.04+1))

postgres=# ALTER USER postgres WITH PASSWORD 'password';
postgres=# CREATE USER user SUPERUSER;
postgres=# ALTER USER user WITH PASSWORD 'password2';
postgres=# CREATE DATABASE db WITH OWNER user ENCODING 'UTF8' template template0;
postgres=# \q

$ pgcli -h localhost -U user db -p 5432
Server: PostgreSQL 13.2 (Ubuntu 13.2-1.pgdg18.04+1)
Version: 2.2.0
Chat: https://gitter.im/dbcli/pgcli
Home: http://pgcli.com

user@localhost:db>
```

## Universal Commands

화면을 깨끗하게 바꿀 때 명령어가 따로 없습니다.

이런 경우에는 **<span style="color:var(--strong);">[우분투 기본 명령어](https://stackoverflow.com/questions/26065426/keystroke-to-clear-screen-in-psql)</span>** 를 활용하는 방법이 있습니다.

```sql
user@localhost:db>\! clear
```

### CREATE
- 데이터베이스 이름은 <b style="color:orange">소문자로 변경</b> 한 뒤 저장 됩니다.

```sql
user@localhost:db> CREATE DATABASE db;
user@localhost:db> CREATE TABLE kospi (
   id INTEGER,
   date DATE,
   bank INTEGER,
)
user@localhost:db> INSERT 
   INTO kospi (id, date, bank) 
   VALUES (2,'2021-09-05', 300);
INSERT 0 1
Time: 0.031s
```

### RETURN
```sql
user@localhost:db> \l
+-----------+--------+----------+---------+
| Name      | Owner  | Encoding | Ctype   |
|-----------+--------+----------+---------|
| dbname    | python | UTF8     | C.UTF-8 |
+-----------+--------+----------+---------+

user@localhost:db> \c dbname  
user@localhost:db> \dt
+----------+--------+--------+---------+
| Schema   | Name   | Type   | Owner   |
|----------+--------+--------+---------|
| public   | kospi  | table  | python  |
+----------+--------+--------+---------+

user@localhost:db> SELECT * FROM kospi;
+------+------------+--------+
| id   | date       | bank   |
|------+------------+--------|
| 1    | 2021-09-06 | -2000  |
+------+------------+--------+
```

### READ QUERY
- `LIMIT 숫자(제한)`, `OFFSET 숫자(건너뜀)` 
- `ORDER BY 컬럼명 or 컬럼숫자` ASC(오름차순), DESC(내림차순)
- `WHERE (조건문)`

```sql
user@localhost:db> SELECT * FROM kospi ORDER BY bank ASC;
user@localhost:db> SELECT * FROM kospi ORDER BY bank DESC;
+------+------------+--------+
| id   | date       | bank   |
|------+------------+--------|
| 2    | 2021-09-05 | 300    |
| 1    | 2021-09-06 | -2000  |
+------+------------+--------+

user@localhost:db> SELECT * FROM kospi 
   WHERE bank >0;
+------+------------+--------+
| id   | date       | bank   |
|------+------------+--------|
| 2    | 2021-09-05 | 300    |
+------+------------+--------+

user@localhost:db> SELECT * FROM kospi 
   WHERE bank > (
   SELECT bank FROM kospi WHERE bank = -2000
);
+------+------------+--------+
| id   | date       | bank   |
|------+------------+--------|
| 2    | 2021-09-05 | 300    |
+------+------------+--------+
```

### UPDATE
```sql
user@localhost:db> UPDATE kospi
   set bank = -1000  (컬럼 = 바뀔 데이터)
   WHERE id = 1        (수정할 ROW 조건)
   RETURNING *;     (수정한 내용 바로조회)
+------+------------+--------+
| id   | date       | bank   |
|------+------------+--------|
| 1    | 2021-09-06 | -1000  |
+------+------------+--------+

(컬럼 이름의 변경)
user@localhost:db> SELECT 
   bank AS foreign FROM kospi;
+-----------+
| foreign   |
|-----------|
| 300       |
| -500      |
+-----------+
```

### DELETE
```sql
user@localhost:db> DELETE 
   FROM kospi
   WHERE id = 1;

user@localhost:db> DROP TABLE kospi;
user@localhost:db> DROP DATABASE dbname;
```

<br/>

## DataType 에 맞는 테이블

### Date & Time

```sql
user@localhost:db> SHOW TIMEZONE;
+------------+
| TimeZone   |
|------------|
| Asia/Seoul |
+------------+

user@localhost:db> CREATE TABLE 
 datetime_stock (
   type_ts TIMESTAMP,
   type_tstz TIMESTAMPTZ, (TimeZone 설정)
   type_date DATE,
   type_time TIME
 );

user@localhost:db> INSERT INTO 
 datetime_stock (
   type_ts, type_tstz, type_date, type_time)
 VALUES (
   '2020-07-26 20:00:25+08:28',
   '2020-07-26 20:00:25+08:28',
   '2020-07-26',
   '18:00:00'
 );

user@localhost:db> select * from datetime_stock;
+---------------------+------------------------+------------+-----------+
| type_ts             | type_tstz              | type_date  | type_time |
|---------------------+------------------------+------------+-----------|
| 2020-07-26 20:00:25 | 2020-07-26 20:00:25+09 | 2020-07-26 | 18:00:00  |
+---------------------+------------------------+------------+-----------+
```

### JSON JSONB data

PostgreSQL 의 경우, JSON 데이터를 컬럼에 입력가능하다, JSON 과 JSONB 두가지가 있고 JSONB 를 선호하는 이유로는 텍스트를 이진(binary) 형태로 분해 후 저장을 하여, 입력을 다소 느리지만 출력시 재분석이 없이 빠르게 출력이 가능한 장점이 있다.
 
```sql
user@localhost:db> CREATE TABLE 
  book_order (
   id NUMERIC(3),
   order_info JSON NOT NULL
);

user@localhost:db> INSERT INTO book_order
 VALUES 
   (001, '{"name":"Jam", "book":{"name":"맛있는","q":2}}'),
   (002, '{"name":"Yang", "book":{"name":"mongodb","q":3}}')
 RETURNING *;

+----+-------------------------------------------------+
| id | order_info                                      |
|----+-------------------------------------------------|
| 1  | {"name":"Jam", "book":{"name":"맛있는","q":2}}   |
| 2  | {"name":"Yang", "book":{"name":"mongodb","q":3}}|
+----+-------------------------------------------------+
```

## PostgreSQL DataBase [용량 확인하기](https://codereader37.tistory.com/108)

- SELECT pg_size_pretty(('mydb')) : mydb 데이터베이스 용량 
- SELECT pg_size_pretty(pg_relation_size('mytable')) : mytable 테이블 사이즈 
- SELECT pg_size_pretty(pg_index_size('mytable')) : mytable 인덱스 크기
- SELECT pg_size_pretty(pg_total_relation_size('mytable')) : mytable 연관인덱스 합산

```sql
SELECT pg_size_pretty(pg_database_size('news'))
+------------------+
| pg_size_pretty   |
|------------------|
| 137 MB           |
+------------------+
SELECT 1
```
