---
title : PostgreSQL 02 - PSQL 사용하기
last_modified_at: 2018-03-06T11:45:06-05:00
tags: 
    - postgresql
toc: true
---


```sql
$ sudo -u postgres psql -d quant    # 해당 DB 접속
```


## PostgreSQL 관리 

### 1. 사용자

```sql
postgres=# select usename, usesysid, usecreatedb  from pg_user;
 usename  | usesysid | usecreatedb 
----------+----------+-------------
 postgres |       10 | t
 quents   |    16408 | f
(2 rows)
```
사용자 정보는 **pg_user** 내부 테이블에 저장된다 <br>
기본적 사용자 명으로 접속하지만, **PostgreSQL용 사용자**로 Overwriting 된다

생성 및 삭제는 `CREATE USER`, `DROP USER`를 활용하여 관리한다 


## PostgreSQL 문법

'ABORT [work|transaction]' : 현재 트랜잭션을 취소한다
'ALTER GROUP' : 사용자를 그룹에 추가/삭제한다 
'ALTER TABLE' : TABLE의을 속성을 변경한다 

\l  : DATABASE 목록
\c (DB이름) : DataBase 이동

\dt           : DB 내부 TABLE 목록
\d  table이름 : TABLE 상세목록

\do : 연산자 목록
\Dt : type 목록
\i <file이름> : import file to Run
\r : buffer 를 초기화
\q : psql을 종료 
\? : 도움말 
\h <SQL명령> : SQL 도움말

