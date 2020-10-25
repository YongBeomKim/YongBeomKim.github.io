---
title : PostgreSQL Commenders
last_modified_at: 2020-10-17T10:45:06-05:00
header:
   overlay_image: /assets/images/project/postgresql.png
categories:
  - server
tags: 
    - aws
    - server
    - linux
---

PostgreSQL 과 관련된 기본적인 명령어 내용을 살펴보겠습니다. MySQL 과 구조적인 차이가 있습니다.

<br />

# **POSTGRESQL**

## **1 Basic Command**

기본적인 명령어 들을 정리해 보겠습니다.

```sql
postgres=# 
postgres-#   # 내용 계속 입력중 ..

# List of DataBase
postgres=# \l
postgres=# \list
                              List of databases
   Name    |  Owner   | Encoding | Collate |  Ctype  |   Access privileges   
-----------+----------+----------+---------+---------+-----------------------
 postgres  | postgres | UTF8     | C.UTF-8 | C.UTF-8 | 
```

```sql
# Create DataBase
postgres=# \c cobalt

# Display, DataBase / Table
postgres=# \dd
```

## pgcli

```r
$ pip install psycopg2
```


## 참고사이트

- [PostgreSQL 설치](https://dejavuqa.tistory.com/363?category=257816)
- [PostgreSQL 외부접속]()

- [알아두면 유용한 PSQL](https://browndwarf.tistory.com/51)
- [Python 과 PostgreSQL 연동](https://jinmay.github.io/2018/01/11/python/python-with-postgresql)
- [PostgreSQL 외부접속 허용하기](https://racoonlotty.tistory.com/entry/PostgreSQL-%EC%99%B8%EB%B6%80-%EC%A0%91%EA%B7%BC-%ED%97%88%EC%9A%A9)
- [pgcli Github](https://github.com/dbcli/pgcli)

https://yongbeomkim.github.io/sql/psql-01-startup/