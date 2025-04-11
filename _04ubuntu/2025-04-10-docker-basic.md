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
