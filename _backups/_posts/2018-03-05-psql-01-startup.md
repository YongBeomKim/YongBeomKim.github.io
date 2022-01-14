---
title : PostgreSQL 01 - 시작하기
last_modified_at: 2018-03-05T11:45:06-05:00
header:
  overlay_image: /assets/images/book/sql.jpg
categories:
  - sql
tags: 
    - postgresql
toc: true
---

sqlite3로 대충 버텨 왔지만 <br>
서비스를 구축하기 위해서는 DB를 운영을 해야하는<br>
현실에 직면해 있고, 

**mysql의 workbench** Entity 설계 용이성으로 흔들리기도 했지만<br> 
<strike>(그러면서도 돈주고 이번주 토요일 세미나는 신청했다)</strike>

무료라는 강력한 장점과 함께, <br>
여러 공개된 블로거 분들의 자료들을 모아서<br>
잘 한번 버무려 보려고 한다. <br>
<strike>(사람들이 다들 좋다고 하니까 해볼려는 거다. 왜인지는 이제 알아가려는 건 함정..)</strike>


```sql
$ sudo -u postgres psql          # psql 접속

postgres=# createdb quent        # DB 생성  (\l|목록) 
        =# \c quent              # quent DB로 변경

quent=# CREATE SCHEMA muyong     # SCHEMA 생성 (\dn|목록)
quent=# CREATE TABLE  muyong.alicetable  # TABLE 생성(SCHEMA)
       (id varchar(20) primary key, pw varchar(20));

quent=# \dt                      # TABLE 목록
No relations found.
quent=# \dt muyong.*             # SCHEMA를 특정하여 TABLE 목록 확인

quent=# CREATE TABLE tbl (id int, na str); # TABLE 생성
quent=# DROP TABLE tbl                     # TABLE 삭제
quent=# DROP DATABASE quent                # DATABASE 삭제
```


## PostgreSQL CLI

```
$ sudo -u postgres psql
```

보안과 psql 철학을 이유로 사용자를 **postgres** 변경한 뒤 **psql**를 실행한다

1. -u : user Id (사용자를 postgres 로 변경한다)

**Note:** 사용자변경과 프로그램 실행을 같이 하면, 
프로그램 종료시 사용자도 함께 빠져나와 편하다
{: .notice--info}

**Please Note:** 사용자변경과 프로그램 실행을 같이 하면, 
프로그램 종료시 사용자도 함께 빠져나와 편하다
{: .notice--danger}

<figure class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/psql/structure.png" alt="">
  <figcaption>출처:https://blog.naver.com/alice_k106/220847310053</figcaption>
</figure> 

`CREATE DATABASE mydb`로 최상단의 DATABASE를 생성하고<br>
바로 아래 계층에 **SCHEMA**를 구분 생성한다 (default : public)

1. 여러 사용자들이 접속시 충돌을 최소화 하는 설계가 가능 
2. 논리 DB를 분리하여 **관리용이성/ 충돌방지** 설계가 가능
3. 개별 SCHEMA를 `Join`을 통해서 통합적 관리에 용이


## DATABASE
### 1 DATABASE 목록확인
```sql
postgres=# \l
                                  List of databases
   Name    |  Owner   | Encoding |   Collate   |    Ctype    |   Access privileges   
-----------+----------+----------+-------------+-------------+-----------------------
 postgres  | postgres | UTF8     | ko_KR.UTF-8 | ko_KR.UTF-8 | 
 quent     | postgres | UTF8     | ko_KR.UTF-8 | ko_KR.UTF-8 | 
 games     | postgres | UTF8     | ko_KR.UTF-8 | ko_KR.UTF-8 | =Tc/postgres+
                                                      postgres=CTc/postgres+
                                                      quents=CTc/postgres
```

`postgres=#`는, DB가 "postgres"임을 의미 <strike>User가 아니다</strike>


### 2 DATABASE 변경하기
```sql
postgres=# \c quent
You are now connected to database "quent" as user "postgres".
quent=# 
```



### 3 DATABASE 생성하기
```sql
quent=# CREATE DATABASE sample
CREATE DATABASE
quent=# \c sample
You are now connected to database "sample" as user "postgres".
sample=# 
```


## SCHEMA
### SCHEMA 목록확인, 생성
```sql
quent=# \dn
  List of schemas
  Name  |  Owner   
--------+----------
 public | postgres
(1 row)
```
기본생성된 1개만 존재한다

```sql
quent=# create SCHEMA muyong;
CREATE SCHEMA
quent=# \dn
  List of schemas
  Name  |  Owner   
--------+----------
 muyong | postgres
 public | postgres
(2 rows)
```
muyong 스키마를 추가하였다


## TABLE 

### 1 TABLE 목록확인, 생성
```sql
quent=# create table muyong.alicetable(id varchar(20) primary key, pw varchar(20));
CREATE TABLE
quent=# \dt
No relations found.
```
muyong 테이블의 **alicetable**로 생성한 결과, 출력시 내용이 없다<br>
`\dt muyong.*` 를 입력해보자

```sql
quent=# \dt muyong.*
           List of relations
 Schema |    Name    | Type  |  Owner   
--------+------------+-------+----------
 muyong | alicetable | table | postgres
```
`\dt`는 테이블 목록만 출력하므로<br>
자세한 내용을 알려면 `\d`를 사용해야 한다 


```sql
quent=# \d muyong.*
         Table "muyong.alicetable"
 Column |         Type          | Modifiers 
--------+-----------------------+-----------
 id     | character varying(20) | not null
 pw     | character varying(20) | 
Indexes:
    "alicetable_pkey" PRIMARY KEY, btree (id)

       Index "muyong.alicetable_pkey"
 Column |         Type          | Definition 
--------+-----------------------+------------
 id     | character varying(20) | id
primary key, btree, for table "muyong.alicetable"


quent=# \d muyong.alicetable
         Table "muyong.alicetable"
 Column |         Type          | Modifiers 
--------+-----------------------+-----------
 id     | character varying(20) | not null
 pw     | character varying(20) | 
Indexes:
    "alicetable_pkey" PRIMARY KEY, btree (id)
```


### 2 table 내용(컬럼) 추가 : CREATE, READ, UPDATE, DELETE
기본적 SQL 의 CRUD 문법은 동일하다.

다만,<br>
`INSERT INTO 테이블.스키마 VALUE ('test','test2')`<br> 
SCHEMA를 지정하지 않으면 search_path의 schema를 지정한다