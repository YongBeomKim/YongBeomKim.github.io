---
layout: blog
title: Docker Compose 에서 Build 하기
tags:
- docker
---

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