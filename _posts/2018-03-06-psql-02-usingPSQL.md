---
title : PostgreSQL 02 - PSQL 사용하기
last_modified_at: 2018-03-06T11:45:06-05:00
header:
  overlay_image: /assets/images/book/sql.jpg
categories:
  - sql
tags: 
    - postgresql
toc: true
---

보다 직접적인 명령들을 알아보도록 한다

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


## PSQL 명령모음[link](http://dbrang.tistory.com/749)

### Terminal 옵션들

```
$ sudo -u postgres psql [options] [dbname [username]]
```


| option | 설명 |                                      |
| ------------ | ---------------------------------------- |
| -l  | DATABASE 목록을 출력후 종료 |
| -d, --dbname DB이름   | 연결하려는 DB를 지정하여 시작한다 |
| -f, --file 파일명     | 파일을 읽어서 실행 후 종료 |
| -H, --html    | HTML 출력모드 |
| -h, --host 호스트이름 | 서버 호스트를 지정한다    |
| -p, --port 포트숫자 | 서버포트를 지정 (기본값:5432)|
| -q, --quiet | 메세지 없이 질의 결과만 출력 |
| -s, --single-step| 단계별 확인하며 실행 |


### psql 내부명령어 Quick 레퍼런스

```sql
postgres=# \d games_game;
```

| 명령어 | 의미 |                                      |
| ------------ | ---------------------------------------- |
| \? | 도움말 호출 |  
| \h `SQL명령` | SQL 도움말 출력 |
| \l | DATABASE 목록 출력 |
| \d, \d `table이름` | TABLE에 대한 설명을 출력 |
| \da | 집합 통계함수 목록을 출력 |
| \df | 함수목록 출력 (List of function) |
| \do | 연산자목록 출력 (List of Operation) |
| \dT | 자료형목록 출력 (List of data types) |
| \i `파일이름` | 파일을 불러와서 실행 |
| \c `DB이름` | 데이터 베이스 이동 |
| \r | buffer 를 초기화|
| \q | psql을 종료 |