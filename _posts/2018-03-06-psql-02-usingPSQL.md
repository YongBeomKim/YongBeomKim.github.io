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

