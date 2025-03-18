---
layout: blog
title: (Docker) Django Nginx SQL
tags:
- docker
---

개인 서버를 운영하던 중, 무리한(?) 업데이트 진행으로 기존의 설치된 내용과 충돌로 인하여 문제가 발생하였습니다. 여러도구들을 1개의 운영체제에 설치 및 운영을 하다보니 의존성 및 충돌등의 문제로 일부분 문제시 전체적인 운영이 어려워 지는 상황이 발생하고 나니까 Docker 를 활용하여 배포하는 방법을 활용할 필요성을 느끼게 되었습니다. 

# Docker
## Install Docker
**[<span style='color:orange'>Install Docker Engine on Ubuntu</span> - dockerdocs](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)** 공식문서를 확인하고 설치방법을 진행 합니다. 운영체제 및 설치 버젼에 따라서 내용이 바뀌는 경우도 많으니까 꼭 공식문서를 참고하여 설치작업을 진행 합니다.

## CLI run
```bash
$ docker image pull python:3.12.9:slim
$ docker rmi 6663e6263306

$ docker container ls -a
$ docker ps -a --filter ancestor=36d17f72f4f3
$ docker run -it 1f48792ccb92
```