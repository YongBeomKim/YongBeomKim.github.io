---
layout: blog
title: Docker
tags:
- cloud
---

시간이 흐름에 따라 개발환경이 개선되면서, 기존에 필요로 했던 여로 과정들을 보다 효율적으로 진행할 수 있도록 도와주는 도구들이 많이 등장하였습니다. 

데이터 확인 및 전처리 과정에 활용하는 `Python Pandas` 대신에, `Rust` 엔진을 활용한 `Polars` 를 활용하면 별도의 인덱스를 제공하지 않으면서도 복잡한 연산을 빠르게 처리 가능한 장점이 있습니다.

파이썬으로 웹서비스 API 작업이 가능한 `Django & RestFrameWork` 가 있었지만, 파이썬의 특징인 `GIL`로 인하여 병렬처리 등에 한계가 있는 것을 보완하기 위하여 `Django Ninja` 및 `FastAPI` 를 활용하면 분산병렬 처리를 요구하는 내용에 보다 효과적으로 응답이 가능합니다.

Flask 및 Django 서비스를 배포하는 경우에는 `Cent OS, Ubuntu` 환경에 따라 보조적으로 필요로 하는 모듈 및 패키지들의 버젼관리 및 호환성 문제들을 모두 해결을 해야만 합니다. 대신 `docker`를 활용하면 해당 서비스에서 필요로 하는 최적의 환경을 `docker Image`로 저장 및 재활용이 가능하여 보다 효과적인 배포가 가능합니다.

대신 `Docker Image` 의 기본적인 크기가 5Gb 이상 되기 때문에 작업 환경에서 저장공간을 많이 확보한 뒤 작업을 진행하여야 원활한 작업이 가능합니다.

<br/>

# 참고사이트
- [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Step-by-Step 우분투 도커 설치하기](https://donotfear.tistory.com/106)
- [docker 설치관련 이전 포스트](https://yongbeomkim.github.io/ubuntu/docker)
- [docker ps - permission denied 오류해결 방법](https://wscode.tistory.com/112)

<br/>

# Install

## Docker Update
[Docker 신규설치](https://yongbeomkim.github.io/ubuntu/docker) 는 과거 포스팅 내용을 참조하면 됩니다. 이번에는 기존에 설치된 Docker 를 업데이트 하는 명령을 살펴보도록 하겠습니다.
```bash
$ sudo apt update
$ sudo apt upgrade docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## Permisison Denied
앞에서 살펴본 대로 Docker 를 막 설치한 뒤에는 사용자 계정에서는 다음과 같이 권한이 없다는 오류를 출력 합니다.
```bash
$ docker ps             
permission denied while trying to connect to the 
Docker daemon socket at unix:///var/run/docker.sock
: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.47/containers/json"
: dial unix /var/run/docker.sock
: connect: permission denied
```

사용자가 작업중인 `username` 계정을 `Docker 관리자`로 등록하려면 다음의 과정을 필요로 합니다.
```bash
$ whoami       
username
$ sudo usermod -aG docker username
$ cat /etc/group | grep docker
docker:x:999:username

$ docker ps
permission denied while trying to connect 
to the Docker daemon socket 
at unix:///var/run/docker.sock

$ sudo chmod 666 /var/run/docker.sock
$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

<br/>

# Docker Daemon

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/linux/docker_hosts.png">
  <figcaption>docker Components Process</figcaption>
  </p>
</figure>
