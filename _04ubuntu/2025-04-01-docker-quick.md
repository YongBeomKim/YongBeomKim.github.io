---
layout: blog
title: (Docker) Quick Start
tags:
- docker
---

`Docker` 와 관련한 기본지식들을 정리해 보겠습니다.

# Docker Setting
## Install
[Docker docs](https://docs.docker.com/engine/install/ubuntu/) 의 공식문서를 참고하여 설치 작업을 진행합니다. 설치 후 `docker` 이미지 생성등의 작업을 실행하면 아래와 같은 오류를 출력 합니다.
<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/docker/error_sudo.png">
  </p>
  <figcaption>설치 직후 실행시 발생한 오류</figcaption>
</figure>

`root` 사용자만 제어 가능하도록 설정되어 발생한 문제로, 현재 사용자를 `docker` 사용자 그룹에 추가합니다.
```bash
$ sudo usermod -aG docker $USER
```

# Container
개별 Container 는 별도의 제한이 없는 상태에서는 **Host PC** 리소스를 제한없이 사용 가능합니다. 사용자가 특정 가능한 `Docker Container`를 생성하면서 필요한 내용들을 **Docker 이미지** 에서 가져와서 필요한 설치과정을 진행합니다. 

`docker` 이미지를 생성하는데, volume, network, cache 등이 남아있게 됩니다. 이처럼 효과적인 방법으로 `docker image`를 생성하고, 잔여 이미지들을 `prune` 하는 방법에 대하여 알아보도록 하겠습니다.

`Docker Container` 는 실행 실패시 로그값 확인등의 이유로 `$ docker container rm <컨테이너 ID>` 를 실행하기 전 까지는  남아 있습니다. 이러한 내용들은 **Docker 이미지** 를 삭제할 때 제한요인이 됩니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/docker/docker_ps.jpg">
  </p>
  <figcaption>도커 컨테이너 상태별 관리내용</figcaption>
</figure>

## Container Image Build
`docker compose up --build`는 기본적으로 **캐시를 사용해서 빌드**합니다. 만약 **캐시를 무시하고 새로 빌드**하고 싶다면, **`--build`와 함께 `docker compose build --no-cache`를 먼저 실행** 합니다. 참고로 `docker compose up`에는 `--no-cache` 옵션이 없습니다. 그래서 **반드시 `build` 명령어에만 `--no-cache`**를 사용해야 합니다.

캐시 없이 완전 새로 빌드하고 `up` 실행하는 방법들로 다음 중 선택하여 실행 합니다.

```bash
# 두 명령어로 나눠서 실행
$ docker compose build --no-cache
$ docker compose up

# 캐시 없이 한 줄로 실행 (쉘에서 && 연결)
$ docker compose build --no-cache && docker compose up

# 캐시 없이 한 줄로 실행 (쉘에서 && 연결 && 백그라운드 모드로 실행)
docker compose build --no-cache && docker compose up -d
```

## 빌드 캐시 정리
`docker compose`를 실행하고 테스트하다 보면 **캐시나 불필요한 이미지, 컨테이너, 볼륨, 네트워크, 빌드 캐시** 등이 계속 쌓이게 되죠. 아래에 **안전하게 정리하는 방법**을 목적별로 정리해드릴게요.
```bash
# 빌드 캐시만 삭제하고 싶을 때
$ docker builder prune
# 확인 없이 강제로:
$ docker builder prune -f
# 예: `Dockerfile` 수정 후 캐시 없이 새로 빌드하려면
$ docker compose build --no-cache
```

## 사용하지 않는 모든 것 정리 (`docker system prune`)
```bash
# 중지된 컨테이너 + 안 쓰는 이미지 + 네트워크 + 캐시 모두 정리
$ docker system prune
# 강력한 정리 (볼륨 포함)
# `--volumes` 옵션은 데이터베이스 데이터까지 날릴 수 있습니다
$ docker system prune --volumes
```

## 중지된 컨테이너 제거
```bash
# 중지된 컨테이너만 제거
$ docker container prune

# 안 쓰는 이미지만 제거
$ docker image prune

# 사용되지 않는 네트워크 제거
$ docker network prune

# 사용되지 않는 볼륨 제거
$ docker volume prune
```

## 실전 예시 - `compose` 테스트 끝나고 전체 클린업
- `down -v`: 관련된 볼륨까지 삭제
- `--rmi all`: 생성된 이미지 삭제
- `--remove-orphans`: 연결되지 않은 서비스 컨테이너 제거
- `system prune`: 나머지 불필요한 캐시, 중지 컨테이너 등 정리
```bash
$ docker compose down -v --rmi all --remove-orphans
$ docker system prune -f --volumes
```

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

## 실행중인 Container 를 Commit 하기
실행중인 Container 내부에서 발생한 시스템 파일등의 내용을 포함한 복사본 이미지를 생성할 수 있습니다. (git 의 commit 과 기능적으로 비슷)
```bash
$ docker images          
REPOSITORY    TAG         IMAGE ID       CREATED         SIZE
mydjango      latest      0bb0734cf308   21 hours ago    826MB

$ docker container run -d -p 8000:8000 --network mynetwork --name django --rm mydjango

$ docker container commit django mydjango:init-mynetwork                            
sha256:230d162639ed586d0062603f51c9f36ece74ac4ed1e545b113ca5c86baabbb07

$ docker images                                         
REPOSITORY    TAG              IMAGE ID       CREATED         SIZE
mydjango      init-mynetwork   230d162639ed   2 seconds ago   827MB
mydjango      latest           0bb0734cf308   22 hours ago    826MB
```

<br/>

# MariaDB with Docker
## Dockerfile
로그파일을 생성할 수 있도록 설정파일을 다음과 같이 생성합니다.
```bash
[mysqld]
# General settings
user=mysql
datadir=/var/lib/mysql

# 로그 설정
general_log = 1
general_log_file = /var/log/mysql/query.log

slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 1

log_error = /var/log/mysql/error.log

# 보안 및 성능 관련 예시 설정
skip-host-cache
skip-name-resolve
```

`MariaDB` 설정과 관련하여 위와 같이 작업을 완료한 뒤 `Dockerfile` 파일을 다음과 같이 생성합니다.
```bash
FROM mariadb:10.6

# Set the TimeZone
# $ docker container exec mysql printenv TZ
ENV TZ="Asia/Seoul"

# my.cnf 복사
COPY my.cnf /etc/mysql/conf.d/my.cnf

# 로그 디렉터리 생성 및 권한 설정
RUN mkdir -p /var/log/mysql && \
    chown -R mysql:mysql /var/log/mysql

# 데이터 디렉토리 마운트
VOLUME /var/lib/mysql

# 기본 포트 노출
EXPOSE 3306

CMD ["mysqld"]
```

저장된 파일을 빌드한 뒤, 사용자 정보를 입력하여 MariaDB 컨테이너를 실행 합니다.
```bash
$ docker image build . -t mymariadb:log 

$ docker container run --name mysql --rm \ 
--env MYSQL_ROOT_PASSWORD=abc123 \
--env MYSQL_USER=python \
--env MYSQL_PASSWORD=abc123 \
--env MYSQL_DATABASE=sample \
--detach \
--publish 3310:3306 mymariadb:log

$ docker container exec mysql ls /var/log/mysql
error.log
query.log
slow.log
```

`localhost` 에서 생성한 mariadb 컨테이너에 접속하는 방법은 다음과 같습니다. 작업들을 진행한 내용이 로그에 기록 되고 있는지 확인하는 방법도 아래의 내용과 같습니다.
```bash
$ mycli --host=127.0.0.1 --port=3310 --user=python --password=abc1234 sample
MariaDB 10.6.21
mycli 1.27.0
...
MariaDB momukji@127.0.0.1:sample>\q

$ docker container exec mysql tail -n 2 /var/log/mysql/query.log
250414 12:00:09	     3 Query	show variables like '%time_zone%'
250414 12:00:17	     3 Query	SHOW DATABASES
```

## Volume
`docker container` 가 중단 되더라도 **컨테이너 파일을 외부에 별도로 저장하는 개념** 입니다. 이런 저런 작업을 진행하다 보면 자신도 모르게 생성된 **Volume** 들이 남아 있을 수 있는데, 이를 관리하는 방법으로 `가지를 쳐내는(prune)` 방법을 실행할 수  있습니다.
```bash
$ docker ps -a    
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES

$ docker volume ls                                                
DRIVER    VOLUME NAME
local     7f39a4419.....
local     43ad1e376.....

$ docker volume prune
WARNING! This will remove anonymous local volumes not used by at least one container.
Are you sure you want to continue? [y/N] y
Deleted Volumes:
7f39a4419.....
43ad1e376.....

Total reclaimed space: 176.2MB
```

## MariaDB 에 Volume 연결하기
**Volume**의 주요 용도는 **DataBase** 컨테이너를 실행할 때 데이터를 보존하는데 활용 합니다. 아래와 같이 `Volume`을 생성한 뒤 컨테이너 실행을 하면, 중단된 뒤 재실행 될 때에도 동일한 데이터를 보관하고 있는것을 확인할 수 있습니다.
```bash
# DataBase 데이터를 저장관리할 `Volume` 객체를 생성
$ docker volume create --name db-volume

# `Volume` 객체를 연동하여 `MariaDB`를 실행
$ docker container run --name mysql --rm \
--env MYSQL_ROOT_PASSWORD=abc1234 \
--env MYSQL_USER=python \
--env MYSQL_PASSWORD=abc1234 \
--env MYSQL_DATABASE=sample \
--detach \
--mount type=volume,source=db-volume,destination=/var/lib/mysql \
--publish 3310:3306 mymariadb:log
```

`--mount type=volume` 는 `Volume Mount` 로써 컨테이너의 외부 공간인 `Volume` 에 데이터를 보관하는 방식입니다. 유사한 방식으로 `--mount type=bind.source` 도 있는데 이는 localhost 의 Host 머신의 특정공간을 활용하는 것으로써 호스트 머신에 문제가 발생하면 연동되어 컨테이너 실행에 문제가 발생할 수 있습니다. 때문에 `docker`가 관리하는 `Volume`을 활용하는 방식을 추천하고 있습니다.

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