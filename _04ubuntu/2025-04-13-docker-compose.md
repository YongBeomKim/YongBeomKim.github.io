---
layout: blog
title: (Docker Compose) 에서 사용자 port 값 변경
tags:
- docker
---

`django` 와 `mariadb` 컨테이너를 연결할 때, 다음과 같은 오류를 해결하는 과정에서 많은 어려움을 격었습니다. 원인은 **개발자 Host PC 의 Localhost** 에 미리 설치된 **동일한 패키지 내용과 충돌**이 발생했거나, 또는 **충돌을 피하기 위하서 변경한 포트값을 잘못 이해하여 발생한** 문제 였습니다.
```bash
'default': (2002, "Can't connect to server on 'mariadb' (115)") 
```

## Port 설정 및 출력값 해석하기
실행 중인 Django 와 MariaDB 의 `Docker 컨테이너` 포트 매핑 정보를 확인하면 다음과 같았습니다. 각각의 내용에 대한 설명내용은 다음과 같습니다.
```bash
$ docker ps -a
IMAGE    PORTS                                        NAMES
django   0.0.0.0:8000->8000/tcp  [::]:8000->8000/tcp  django
mariadb  3306/tcp,           
         0.0.0.0:3306->3310/tcp, [::]:3306->3310/tcp  mariadb
```

**`3306/tcp`**
`Docker 컨테이너 내부`에서 MariaDB 서버가 **기본적으로 리스닝하고 있는 포트**와 **프로토콜**을 나타냅니다.

**`0.0.0.0:3306->3310/tcp`**
**IPv4 주소**를 통한 호스트 머신과 Docker 컨테이너 간의 **포트 포워딩(Port Forwarding)** 설정을 나타냅니다. 즉 호스트 머신의 외부노출 IPv4 주소를 통해 3306번 포트로 접근하는 모든 TCP 연결은 Docker 컨테이너 내부의 3310번 포트로 전달됩니다.

**`[::]:3306->3310/tcp`**
`[::]`은 호스트 머신의 **모든 IPv6 인터페이스**를 의미합니다. 즉, 호스트 머신의 IPv6 주소를 통해 3306번 포트로 접근하는 모든 TCP 프로토콜 연결은 Docker 컨테이너 내부의 3310번 포트로 전달됩니다.

위 내용들을 정리하면 다음과 같습니다.
1. MariaDB 컨테이너는 3306 포트를 사용 중이다 (여기서 개발자 PC 패키지와 충돌발생)
1. localhost 에서 3306 으로 접속시, 컨테이너 내부의 3310 포트로 전달 한다 (아무 의미없음)
1. localhost 에서 3306 으로 접속시, 컨테이너 내부의 3310 포트로 전달 한다 (아무 의미없음)

## Solution
`docker-compose`의 `mariadb` 기본설정값 위에 다음의 내용을 추가해 주었습니다.
```yml
services:

  mariadb:
    # 사용자 3310 접속시 -> 컨테이너 3306 포트로 전달
    ports:
      - "3310:3306"
```

그리고 컨테이너 상태값을 확인한 결과 다음과 같았습니다. 앞에서는 `3306/tcp`,`3310/tcp` 2개의 포트에 대하여 설명을 하느라 복잡했었지만, 간결하게 정리한 결과 아래와 같이 `3306/tcp` 하나만 설명하는 것으로 정리된 것을 확인할 수 있었습니다.
```bash
docker ps -a
IMAGE     PORTS                                       NAMES
mariadb   0.0.0.0:3310->3306/tcp, [::]:3310->3306tcp  mariadb
```

`mycli` 접속도 잘 동작하는 것을 확인할 수 있었습니다.
```bash
$ mycli --host=0.0.0.0 --port=3310 --user=name --password=passwd db_name
MariaDB 10.6.21
MariaDB name@0.0.0.0:db_name> 

$ mycli --host=127.0.0.1 --port=3310 --user=name --password=passwd db_name
MariaDB 10.6.21
MariaDB name@0.0.0.0:db_name> 

$ mycli --host=localhost --port=3310 --user=name --password=passwd db_name
MariaDB 10.6.21
MariaDB name@0.0.0.0:db_name> 
```

## 결론
`Dockerfile` 을 사용하여 개별 패키지의 기본 포트값을 변경하고, 이를 `docker-compose`에서 적용을 하는 과정에서 실수가 발행하여 생긴 문제였습니다. 이는 `Dockerfile`을 개별적으로 만들어서 `Network` 로 테스트를 진행한 뒤 `docker-compose` 로 이식하는 과정에 내용을 제대로 이해하지 못해서 발생한 문제로 이제부터는 가능하면 `docker-compose` 설정값이 안정화 되면 이것을 기초로 작업을 진행하는 것이 더 효과적이겠다는 결과를 확인할 수 있었습니다.