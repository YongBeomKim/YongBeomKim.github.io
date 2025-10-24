---
layout: blog
title: (Docker) Jupyter 컨테이너 실행
tags:
- docker
---

`docker Container` 를 활용하여 `Jupyter Notebook` 을 실행하는 내용에 대하여 알아보도록 하겠습니다. 컨테이너 사용자와 호스트 사용자 간 UID/GID 가 불일치 하면 파일을 불러오거나 생성할 때 권한 문제가 발생합니다. 이를 해결하는 방법을 정리하면 다음과 같습니다.

일반적인 컨테이너 실행 및 `Docker Compose`설정파일을 생성한 내용은 다음과 같습니다.

```bash
# Dockerfile.ml
# 활용한 Docker Image 주소
FROM jupyter/datascience-notebook

# 루트 권한으로 전환
USER root
RUN apt-get update

# 사용자 jovyan이 없을 경우, USER 전환 전에 명시적으로 생성
ENV NB_USER=jovyan
RUN if ! id -u ${NB_USER} > /dev/null 2>&1; then \
    echo "Creating user ${NB_USER}..." && \
    groupadd --gid 1000 ${NB_USER} && \
    useradd -s /bin/bash --uid 1000 --gid 1000 -m -k /etc/skel ${NB_USER}; \
  fi
USER ${NB_USER}

# Python 패키지 설치
RUN pip install --upgrade pip && \
  pip install --upgrade numpy pandas matplotlib

WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN if [ -f /app/requirements.txt ]; then \
    echo "Installing packages from requirements.txt..." && \
    pip install --no-cache-dir -r /app/requirements.txt; \
  fi

# Jupyter 환경 변수 설정
ENV JUPYTER_ENABLE_LAB=yes
ENV JUPYTER_ALLOW_INSECURE_WRITES=true
EXPOSE 8888

# 컨테이너 내부 작업 디렉토리 설정
WORKDIR /home/jovyan/work

# JupyterLab 자동 실행
CMD ["jupyter", "lab", "--ip=0.0.0.0", "--port=8888", "--NotebookApp.token=''"]
```

그리고 `docker-compose.yml` 은 다음과 같다.
```bash
# version: '0.0.1'
services:

  pyml-cpu:
    build:
      context: ./docker
      dockerfile: Dockerfile.ml
      args:
        HOST_UID: ${UID}
        HOST_GID: ${GID}
    container_name: pyml
    image: pyml-cpu:v0.0.1
    # 호스트 사용자와 컨테이너 사용자 UID/GID 일치
    user: "${UID}:${GID}"
    ports:
      - "8888:8888"
    volumes:
      - ./:/home/jovyan/work
    environment:
      - JUPYTER_ENABLE_LAB=yes
    restart: unless-stopped
    command: >
      jupyter lab --ip=0.0.0.0 --port=8888 --no-browser --NotebookApp.token=''

  pytorch-gpu:
    build:
      context: ./docker
      dockerfile: Dockerfile.torch
      args:
        HOST_UID: ${UID}
        HOST_GID: ${GID}
    container_name: pytorch
    image: pytorch-gpu:v0.0.1
    # 호스트 사용자와 컨테이너 사용자 UID/GID 일치
    user: "${UID}:${GID}"
    ports:
      - "8888:8888"
    volumes:
      - ./:/home/jovyan/work
    environment:
      - JUPYTER_ENABLE_LAB=yes
    # 컨테이너가 항상 다시 시작되도록 설정
    restart: unless-stopped
    # GPU 기능 활성화
    deploy:
      resources:
        reservations:
          devices:
            - capabilities: [gpu]
    command: >
      jupyter lab --ip=0.0.0.0 --port=8888 --no-browser --NotebookApp.token=''
```

권한값을 일치시키기 위한 환경변수 값을 `.env` 로 다음과 같이 생성합니다.
```bash
#.env
UID=1000
GID=1000
```