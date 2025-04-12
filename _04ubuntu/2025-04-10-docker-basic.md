---
layout: blog
title: (Docker) 개념 및 Quick Start
tags:
- docker
---

이번에 `Docker` 관련 책을 리뷰 및 실습을 하면서 알게된 내용들을 정리해 보겠습니다.

# Docker
## Container
`Docker`와 비슷한 개념을 이야기 한다면, `Python Venv`이 있습니다. **Host PC** 의 리소스를 제한없이 사용 가능합니다. 사용자가 특정 가능한 `Docker Container`를 생성하면서 필요한 내용들을 **Docker 이미지** 에서 가져와서 필요한 설치과정을 진행합니다. 

`Docker Container` 는 실행 실패시 로그값 확인등의 이유로 `$ docker container rm <컨테이너 ID>` 를 실행하기 전 까지는  남아 있습니다. 이러한 내용들은 **Docker 이미지** 를 삭제할 때 제한요인이 됩니다.
<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/docker/docker_ps.jpg">
  </p>
  <figcaption>도커 컨테이너 상태별 관리내용</figcaption>
</figure>

## 오류 컨테이너 로그값 확인
`mydjango` 와 `mynginx` 2개를 실행했는데, 결과는 1개만 정상동작을 하고, 나머지 `mynginx` 는 실행 후 바로 Exits 해 버린 것을 확인할 수 있습니다.
```bash
$ docker container run -d -p 8000:8000 --name django mydjango
b1234....................

$ docker ps   
CONTAINER ID   IMAGE     STATUS         PORTS       NAMES
b1234.......   mydjango  Up 2 seconds   [::]:8000   django

$ docker container run -p 80:80 -d mynginx                   
d0123456..............

$ docker ps   
CONTAINER ID   IMAGE     STATUS         PORTS       NAMES
b1234.......   mydjango  Up 2 seconds   [::]:8000   django

$ docker ps -a
CONTAINER ID   IMAGE    STATUS                   PORTS     NAMES
d0123456....   mynginx  Exited (1) 5 seconds ago
b1234.......   mydjango Up 49 seconds            [::]:8000 django
```

컨테이너 `d0123456....` 가 실행완료되지 않은 채 바로 중단되어 버린것을 확인할 수 있습니다. 그러면 어떤 문제로 중단되었는지 해당 컨테이너의 로그값을 확인해 보겠습니다. 다음의 내용을 보면 `default.conf` 에 포함된  `"django:8000"` 를 인식하지 못한것을 알 수 있습니다.
```bash
$ docker logs d0123456....            
...
/docker-entrypoint.sh: Configuration complete; ready for start up
...
nginx: [emerg] host not found in upstream "django:8000" 
in /etc/nginx/conf.d/default.conf:7
```

## `NetWork` 컨테이너 연동하기
독립적으로 실행되는 컨테이너들을 상호간에 연결을 하는 경우가 많습니다. 대표적인 예시가 `웹서비스`와 `Nginx` 의 연결 입니다. 이처럼 컨테이너 상호간의 연결을 쉽게 하는 방법이 동일한 `Network` 로 묶어서 실행하는 방법이 있습니다. 구체적인 실행방법은 다음과 같습니다.
```bash
$ docker network create mynetwork
$ docker network ls
 NETWORK ID     NAME        DRIVER    SCOPE
3061f14cac94   mynetwork   bridge    local

$ docker container run -d -p 8000:8000 --network mynetwork --name django mydjango
$ docker container run -d -p 80:80 --network mynetwork --name nginx mynginx
$ docker ps
CONTAINER ID   IMAGE     STATUS         PORTS      NAMES
a6a0609d7b57   mynginx   Up 11 minutes  [::]:80    nginx
177463489c3c   mydjango  Up 13 minutes  [::]:8000  django
```

<br/>

# MariaDB 10.6
## SecretsUsedInArgOrEnv, UndefinedVar
GPT 검색결과대로 실행을 하면 다음과 같은 경고메세지로 인하여 사용자 등록 및 DataBase 생성이 되지 않았습니다. 이유는 환경변수를 보다 엄격하게 `docker` 내부규칙으로 아래와 같은 오류가 발생한 것입니다.
```bash
$ $docker build --build-arg MARIADB_ROOT_PASSWORD=rootpassword \
    --build-arg MARIADB_DATABASE=mydatabase \
    --build-arg MARIADB_USER=myuser \
    --build-arg MARIADB_PASSWORD=mypassword \
    -t mymariadb .     

[+] Building 1.8s (5/5) FINISHED     docker:default
...
 6 warnings found (use docker --debug to expand):
 - SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "MARIADB_PASSWORD") (line 12)
 - UndefinedVar: Usage of undefined variable '$MARIADB_ROOT_PASSWORD' (line 9)
```

## `MariaDB` 와 `환경변수` 설정 및 활용하기
- Dockerfile에서는 민감정보를 하드코딩하지 않음
- MariaDB 컨테이너가 첫 실행 시 수행하는 docker-entrypoint-initdb.d/ 스크립트를 활용
- `.env` 파일은 빌드 시가 아니라 실행 시에만 적용
- 결과적으로 ENV, ARG 없이도 DB 초기화 + 사용자 설정 가능

```bash
project/
├── Dockerfile
├── initdb/
│   └── init.sql
├── .dockerignore
└── .env
```

```bash
# ./Dockerfile
FROM mariadb:10.6

# init.sql을 MariaDB 초기화 디렉토리로 복사
COPY initdb/init.sql /docker-entrypoint-initdb.d/

# 기본 설정
VOLUME /var/lib/mysql
EXPOSE 3306

CMD ["mysqld"]
```

```bash
# ./.env 
MYSQL_ROOT_PASSWORD=supersecret
```


```bash
-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS my_database;

-- 사용자 생성
CREATE USER IF NOT EXISTS 'my_user'@'%' IDENTIFIED BY 'my_password';

-- 권한 부여
GRANT ALL PRIVILEGES ON my_database.* TO 'my_user'@'%';
FLUSH PRIVILEGES;
```

```bash
$ docker build -t custom-mariadb .

$ docker run -d \
  --name mydb \
  --env-file .env \
  -p 3306:3306 \
  custom-mariadb
```