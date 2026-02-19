---
layout: blog
title: (Docker) Django + React.js
tags:
- docker
---

`Django + React.js` 등의 웹서비스 개발환경을 구축하면서 수집한 내용들을 정리해 보겠습니다. `Docker Container` 환경에서 개별 Service 환경을 구축 및 운영하고, 코딩 작업은 `VS-Code IDE` 에서 원할하게 작동하는것이 주요한 내용 입니다.

<br/>

# Docker Compose
## `docker-compose.yml`
`backend` 로는 `Python Django` 를 사용하고, `frontend` 로는 `react.js` 를 활용해 보겠습니다. 아직은 개발코드를 작성한 내용이 없으므로 개별 컨테이너들은 `$ sh -c "tail -f /dev/null` 를 사용하여 정적인 상태로 머물게 합니다.

우선 폴더 구조는 다음과 같이 생성합니다.
```bash
.
├── docker-compose.yml
├── .gitignore
├── .env
├── web_backend
│   ├── .dockerignore
│   ├── requirements.txt
│   ├── Dockerfile
│   └── src
└── web_frontend
    ├── .dockerignore
    ├── Dockerfile
    └── src
```

`docker-compose.yml` 를 작성할 때에는 아래의 내용을 참고하여 진행합니다.
```yml
networks:
  mynetwork:

x-build: &website-build
  # 무조건 내부빌드 실행
  pull_policy: build
  build:
    context: ./web_backend
    dockerfile: Dockerfile
    args:
      USERNAME: "buffet"
      USER_UID: ${UID:-1000}
      GROUP_ID: ${GID:-1000}

x-environment-web: &django-env
  TZ: Asia/Seoul
  SECRET_KEY: ${SECRET_KEY}


services:
  backend:
    <<: *website-build
    pull_policy: build   # 무조건 내부빌드 실행
    restart: always
    networks:
      - mynetwork
    ports:
      - "8000:8000"
    user: "${UID:-1000}:${GID:-1000}"
    working_dir: /app
    volumes:
      - ./web_backend/src:/app
    environment:
      <<: *django-env
    command: >
      sh -c "tail -f /dev/null

  frontend:
    build:
      context: ./web_frontend
      dockerfile: Dockerfile
      args:
        USERNAME: "ubuntu"
        USER_UID: ${UID:-1000}
        GROUP_ID: ${GID:-1000}
    pull_policy: build   # 무조건 내부빌드 실행
    restart: always
    networks:
      - mynetwork
    ports:
      - "5173:5173"
    user: "${UID:-1000}:${GID:-1000}"
    working_dir: /app
    volumes:
      - ./web_frontend/src:/app
    command: >
      sh -c "tail -f /dev/null
    # command: >
    #   yarn dev --host 0.0.0.0
```

## `web_backend`
Python Django 를 실행하는 Dockerfile 을 다음의 내용을 참고하여 작성합니다. UV Python 을 활용하여 개발환경을 구축합니다.
```dockerfile
FROM python:3.12-slim-bookworm

ENV TZ=Asia/Seoul \
		UV_PYTHON=3.12 \
    UV_PROJECT_ENVIRONMENT=/app/.venv \
    PATH="/app/.venv/bin:$PATH" \
		UV_LINK_MODE=copy

ARG USERNAME
ARG USER_UID
ARG GROUP_ID

RUN if ! id -u ${USERNAME} >/dev/null 2>&1; then \
    groupadd -g ${GROUP_ID} ${USERNAME} && \
    useradd -m -u ${USER_UID} -g ${GROUP_ID} -s /bin/bash ${USERNAME}; \
	fi \
	&& mkdir -p /etc/sudoers.d \
	&& echo "${USERNAME} ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/${USERNAME} \
	&& chmod 0440 /etc/sudoers.d/${USERNAME}

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/
RUN mkdir -p /app/.venv /app /app/media /app/logs \
    && chown -R ${USERNAME}:${GROUP_ID} /app/.venv /app

WORKDIR /app
COPY --chown=${USERNAME}:${GROUP_ID} requirements.txt* pyproject.toml* ./

USER $USERNAME
RUN if [ ! -f pyproject.toml ]; then \
      uv init --app --name pip_django --bare -p 3.12; \
    fi \
    && if [ -f requirements.txt ]; then \
      uv add -r requirements.txt; \
    fi \
    && uv sync && uv cache clean

VOLUME ["/app/.venv"]
EXPOSE 8000/tcp
```

`WORKDIR /app` 를 기본환경으로 정의를 한 뒤, `PATH="/app/.venv/bin:$PATH"` 를 **_Uv Python_** 가상 개발환경으로 정의 했습니다. 실행중인 컨테이너를 `vs-code` 에서 확인하면 **_Pylance_** 등의 확장도구에서 검색하는 `.venv` 기본폴더에 **_Uv Python_** 이 위치하게 되서 별도의 설정없이 `Python AutoComplete` 기능을 바로 사용할 수 있습니다.

만약 vs-code 에서 `Python Interpretor` 기능이 비활성화 되어있는 경우에는 vscode 에서 Extension 설정에서 필요한 도구들이 활성화 되어있는지를 확인 합니다. 비 활성화 되어있는 경우에는 컨테이너에서 사용 가능하도록 필요에 따라 설치를 진행합니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="820px" src="{{site.baseurl}}/assets/linux/vscode_python.jpg">
  </p>
</figure>

## `web_frontend`
`React.js + vite.js + TypeScript` 를 실행하는 Dockerfile 을 다음의 내용을 참고하여 작성합니다. Ubuntu 환경의 Host 에서 `Node.js` 의 Docker Hub 파일을 직접 활용하는 경우에는 사용자 `1000` 을 일치시키는 경우 충돌 문제가 발생합니다. 이와 같은 이유로 기본 Ubuntu 컨테이너를 활용하여 작성하게 되었습니다.

```dockerfile
FROM ubuntu:22.04
ENV TZ=Asia/Seoul
RUN apt-get update && apt-get install -y --no-install-recommends \
		ca-certificates \
    gnupg \
    sudo \
		&& rm -rf /var/lib/apt/lists/*

# ---- Node.js & yarn 설치 :  Node.js 22.x를 설치 ----
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn

ARG USERNAME
ARG USER_UID
ARG GROUP_ID

# 사용자 및 그룹 생성, sudo 권한 부여 (선택사항)
RUN if ! id -u ${USERNAME} >/dev/null 2>&1; then \
    groupadd -g ${GROUP_ID} ${USERNAME} && \
    useradd -m -u ${USER_UID} -g ${GROUP_ID} -s /bin/bash ${USERNAME}; \
	fi \
	&& mkdir -p /etc/sudoers.d \
	&& echo "${USERNAME} ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/${USERNAME} \
	&& chmod 0440 /etc/sudoers.d/${USERNAME}

WORKDIR /app
RUN chown -R ${USERNAME}:${GROUP_ID} /app
USER $USERNAME
EXPOSE 5173/tcp 
```

이들을 활용하여 기본 컨테이너 작업을 진행하면 됩니다.

`React.js` 초기화는 [your-first-vite-project](https://ko.vite.dev/guide/#scaffolding-your-first-vite-project) 공식문서를 참고하여 환경을 구축합니다.
