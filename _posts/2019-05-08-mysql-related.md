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

**필드 내 데이터가 중복되지 않도록 구조화 작업을** 하면 성능이 향상 됩니다. **Foreign key** 테이블과 **Primary Key** 테이블로 저장한 뒤, **JOIN** 명령으로 두 테이블을 합친 1개의 테이블 처럼 데이터를 활용 할 수 있습니다.

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

```sql
mysql> SELECT * FROM 데이터베이스 
    LEFT JOIN author                 # 기본 Key 테이블
    ON topic.author_id = author.id;  # 결합 기준
```