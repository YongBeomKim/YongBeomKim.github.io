---
title : AWS PostgreSQL
last_modified_at: 2021-01-13T10:45:06-05:00
header:
   overlay_image: /assets/images/project/postgresql.png
categories:
  - psql
tags: 
    - sql
    - pgcli
---

설치 완료된 Server 에서 POSTGRESQL 서버를 사용하는 방법을 정리해 보겠습니다. 간단하게 요약하면, 1.AWS 서버에 POSTGRESQL 설치 2.POSTGRESQL 환경설정 3.Client 에서 pgcli 설치 및 연결 확인 입니다.


## INSTALL POSTGRESQL

```r
$ apt install libpq-dev   # psycopg2 Python 연결용
$ apt install postgresql postgresql-contrib
$ service postgresql status
● postgresql.service - PostgreSQL RDBMS
   Loaded: loaded (/lib/systemd/system/postgresql.service; enabled; vendor preset: enabled)
   Active: active (exited) since Sat 2020-10-24 10:00:49 UTC; 1h 34min ago
  Process: 12790 ExecStart=/bin/true (code=exited, status=0/SUCCESS)
 Main PID: 12790 (code=exited, status=0/SUCCESS)

$ sudo -i -u postgres
postgres@ip-111-22-33-44:~$ psql
psql (10.14 (Ubuntu 10.14-0ubuntu0.18.04.1))
Type "help" for help.

postgres=# \q
postgres@ip-111-22-33-44:~$ exit
logout
```

## PGCLI

위 터미널에서 작업을 하게되면, 모든 명령어를 익혀서 작업을 해야 만 하고 오류가 발생하는 경우 도움을 얻기 힘든 단점이 있습니다. 이러한 불편함을 도와주는 도구로써 Pgcli 를 사용하면 필요한 명령어 및 오류가 발생하는 경우 많은 도움을 받을 수 있습니다.

### Install

**[공식 설치 가이드](https://www.pgcli.com/install)** 에서 따르는 내용 그대로 진행하면 됩니다.

설치 후 기본 설정값을 활용하는 방법은 다음과 같습니다.

```sql
$ sudo su - postgres    
postgres@momukji:~$ pgcli
Server: PostgreSQL 10.15 (Ubuntu 10.15-0ubuntu0.18.04.1)
Version: 3.1.0
Chat: https://gitter.im/dbcli/pgcli
Home: http://pgcli.com
postgres>  


[F2] Smart Completion: ON  [F3] Multiline: OFF  [F4] Emacs-mode
```

