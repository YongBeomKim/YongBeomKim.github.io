---
layout: blog
title: (Docker) 개념 및 Quick Start
tags:
- docker
---

이번에 `Docker` 관련 책을 리뷰 및 실습을 하면서 알게된 내용들을 정리해 보겠습니다.

# Docker

## Container
불필요한 

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/docker/docker_ps.jpg">
  </p>
  <figcaption>도커 컨테이너 상태별 관리내용</figcaption>
</figure>

## 오류가 발생한 컨테이너 확인 및 수정
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

컨테이너 `d0123456....` 가 실행완료되지 않은 채 바로 중단되어 버린것을 확인할 수 있습니다. 그러면 어떤 문제로 중단되었는지 해당 컨테이너의 로그값을 확인해 보겠습니다 <strike>이처럼 상태값 확인등이 가능해야 되므로, 컨테이너를 중단하면 바로 지워지지 않고 남아있는지 그 이유를 알 수 있었습니다.</strike> `default.conf` 에 포함된  `"django:8000"` 를 인식하지 못해서 발생한 문제였습니다. 상태값에는 `Name` 이 제대로 지정되고 있었지만, 개별 컨테이너간 연결이 되지 않아서 발생한 오류 였습니다.
```bash
$ docker logs d0123456....            
...
/docker-entrypoint.sh: Configuration complete; ready for start up
...
nginx: [emerg] host not found in upstream "django:8000" 
in /etc/nginx/conf.d/default.conf:7
```

## 컨테이너 연동하기


