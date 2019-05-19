---
title : 생활코딩 SQL 관계형 데이터 베이스 JOIN
last_modified_at: 2018-06-24T12:45:06-05:00
header:
  overlay_image: /assets/images/code/sql.png
categories:
  - sql
tags: 
    - sql
    - mysql
toc: true 
---

**필드 내 데이터가 중복되지 않도록 구조화 작업을** 하면 성능이 향상 됩니다. **Foreign key** 테이블과 **Primary Key** 테이블로 저장한 뒤, **[JOIN](https://www.youtube.com/watch?v=U8FWvjaQBDs)** 명령으로 두 테이블을 합친 1개의 테이블 처럼 데이터를 활용 할 수 있습니다.

**[생활코딩 DataBase MySQL](https://www.youtube.com/playlist?list=PLuHgQVnccGMCgrP_9HL3dAcvdt8qOZxjW)** 의 내용을 바탕으로 정리 하였습니다. 그리고 기본적인 명령어는 **[Mysql Cheat Sheet](http://www.mysqltutorial.org/mysql-cheat-sheet.aspx)** 을 참고 합니다.

<br/>
# **Preview**

1. **[MariaDB 설치](https://yongbeomkim.github.io/sql/mariadb-install-linux/)**
2. **[MariaDB 기본문법](https://yongbeomkim.github.io/sql/mysql-basic/)
3. **[MySQL 의 Django 연결](https://yongbeomkim.github.io/sql/mariadb-in-django-01/)**
4. **[MySQL 의 PhP Admin 연결](https://yongbeomkim.github.io/mariadb/phpadmin-install-xu/)**

```sql
$ mysql -u 사용자이름 -p
Enter password: 

mysql> SET PASSWORD = PASSWORD('12345');

mysql> CREATE DATABASE [IF NOT EXISTS] 데이터베이스_이름;

mysql> USE 데이터베이스_이름;

mysql> DROP TABLE 테이블_이름;
Query OK, 0 rows affected (0.01 sec)

mysql> DROP DATABASE 데이터베이스_이름;
Query OK, 0 rows affected (0.01 sec)
```

<br/>
# **관계형 데이터베이스**

## **JOIN**

2개의 테이블을 합쳐서 1개의 테이블을 생성하는 명령으로, 종류는 다음과 같습니다.
1. **OUTTER JOIN :** 매칭되는 행이 없으면 NULL로 표시하여 결과를 출력 
   1. **LEFT JOIN** 과 **RIGHT JOIN** 이 있습니다.
2. **INNER JOIN :** 두개의 테이블 **모두에 데이터가 존재하는 행에** 대해서만 결과 출력

```sql
mysql> SELECT * FROM 데이터베이스 
    LEFT JOIN author                 # 기본 Key 테이블
    ON topic.author_id = author.id;  # 결합 기준
```

위 내용을 실행하면 **author, topic** 테이블의 id 가 동일한 이름으로 출력 됩니다. 이때문에 **WHERE** 조건을 사용하면 `ERROR 1052 (230000) Column 'id' in Field list is ambiguous` 오류가 출력됩니다. 

## **OUTER JOIN :**  LEFT JOIN

> **FROM** `기준 테이블` **LEFT JOIN** `가져올_테이블` **ON** `결합기준의 내용`

즉 **왼쪽에 정의한 테이블을 기준으로** 결합된 결과물을 생성 합니다.

```sql
mysql> SELECT topic.id, AS topic_id, title, name, profile
    FROM topic 
    LEFT JOIN author
    ON topic.author_id = author.id; 
```

이를 위해 중복되는 필드 이름을 변경하는 작업으로 **SELECT** `필드명` **AS (Alias)** `변경할 내용`, 과 같이 필드명을 다르게 구분한 뒤 작업을 진행합니다.

```sql
mysql> SELECT s.name, s.location_id, l.name AS address, l.distance  
    FROM student AS s 
    LEFT JOIN location AS l 
    ON s.location_id = l.id
    WHERE l.distance >= 100;
```

## **INNER JOIN :**  INNER JOIN

**LEFT JOIN** 과 동일한 기준으로 작업한 결과, **NULL** 값이 생성된 row 들은 제외하고, 나머지를 출력 합니다.

```sql
mysql> SELECT s.name, s.location_id, l.name AS address, l.distance  
    FROM student AS s 
    INNER JOIN location AS l 
    ON s.location_id = l.id
    WHERE l.distance >= 100;
```
