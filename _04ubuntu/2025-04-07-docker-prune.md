---
layout: blog
title: Docker 의 Cache 안전하게 정리하는 방법
tags:
- docker
---

`docker compose`를 실행하고 테스트하다 보면 **캐시나 불필요한 이미지, 컨테이너, 볼륨, 네트워크, 빌드 캐시** 등이 계속 쌓이게 되죠. 아래에 **안전하게 정리하는 방법**을 목적별로 정리해드릴게요.

<br/>

# 1 빌드 캐시 정리
```bash
# 빌드 캐시만 삭제하고 싶을 때
$ docker builder prune

# 확인 없이 강제로:
$ docker builder prune -f

# 예: `Dockerfile` 수정 후 캐시 없이 새로 빌드하려면
$ docker compose build --no-cache
```

<br/>

# 2 사용하지 않는 모든 것 정리 (`docker system prune`)
```bash
# 중지된 컨테이너 + 안 쓰는 이미지 + 네트워크 + 캐시 모두 정리
$ docker system prune

# 강력한 정리 (볼륨 포함)
# `--volumes` 옵션은 데이터베이스 데이터까지 날릴 수 있습니다
$ docker system prune --volumes
```

<br/>

# 3 중지된 컨테이너 제거
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

<br/>

# 실전 예시 - `compose` 테스트 끝나고 전체 클린업
- `down -v`: 관련된 볼륨까지 삭제
- `--rmi all`: 생성된 이미지 삭제
- `--remove-orphans`: 연결되지 않은 서비스 컨테이너 제거
- `system prune`: 나머지 불필요한 캐시, 중지 컨테이너 등 정리
```bash
$ docker compose down -v --rmi all --remove-orphans
$ docker system prune -f --volumes
```