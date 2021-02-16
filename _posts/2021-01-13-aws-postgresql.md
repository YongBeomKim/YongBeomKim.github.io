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


```css
.artist__container{
	grid-template-columns: repeat(4, minmax(20px, 250px));
}


/* === DeskTop Artist Screen Layout === */
@media screen and (max-width: 1200px) {
	.artist__container{
		grid-template-columns: repeat(3, minmax(20px, 250px));
	}
}


@media screen and (max-width: 960px) {
	.artist__container{
		grid-template-columns: repeat(2, minmax(20px, 250px));
	}
}


/* Tablet and Big Mobile Screen */
@media screen and (max-width: 768px) {
	main, .footer {
		margin: 0px;
	}
	.footer__content {
		justify-content: center;
	}
}


/* === 모바일 Media Query  === */
@media screen and (max-width: 480px) {
	.artist__container{
		grid-template-columns: repeat(1, minmax(20px, 250px));
	}	
}


/* === SECTION for DeskTop PC === */
@media screen and (min-width: 768px) {
	.gallery__container, 
	.app__container {
    height: 100%;
  }
}
```


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

## SETTING POSTGRESQL