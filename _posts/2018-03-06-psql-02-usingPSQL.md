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


## PSQL 명령행 

### Terminal 옵션들

```sql
 psql [options] [dbname [username]]
```

| Employee     | Salary |                                      |
| ------------ | ------ | ------------------------------------ |
| [John Doe](#)| $1     | Because that's all Steve Jobs needed for a salary.|


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

| 명령어 | 의미 |                                      |
| ------------ | ---------------------------------------- |
| \a | 정렬/ 비정렬 모드 변환  |
| -d, --dbname DB이름   | 연결하려는 DB를 지정하여 시작한다 |




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








|-?| --help Show help, then exit|
|-a| --echo_all Echo all input from script
-A, --no-align Unaligned table output mode ( -P format=unaligned )
-c, --command <command> Run only single command (SQL or internal) and exit
-d, --dbname <dbname> Specify database name to connect to (default: current username)
-e, --echo-queries Echo commands sent to server
-E, --echo-hidden Display queries that internal commands generate
-f, --file <filename> Execute commands from file, then exit
-F, --field-separator <string> Set field separator (default: " | ") ( -P fieldsep= )
-h, --host <hostname> Database server host or socket directory (default: "local socket")
-H, --html HTML table output mode ( -P format=html )
-l, --list List available databases, then exit
-n Disable enhanced command-line editing (readline)
-o, --output <filename> Send query results to file (use -o |program for a pipe)
-p, --port <port> Database server port (default: 5432 )





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

