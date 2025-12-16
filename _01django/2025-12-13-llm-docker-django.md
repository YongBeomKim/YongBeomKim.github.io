---
layout: blog
title: Celery 에서 threading 활용
tags:
- docker
---

Docker 환경에서 **Django + React.js** 스택으로 작업을 하고 있습니다. 여기에 **LLM(Ollama 기반)** 기능을 붙이려는 상황에서 아래와 같은 **두 가지 아키텍처 선택지**를 비교해 보았습니다.

<br/>

# Django Ninja + Ollama (Django 내부 통합)
✔ LLM 기능이 **부가 기능** 일때로, OpenAPI Key 등으로 테스트 후 적용한다
✔ 사용자 수 적고, 내부 서비스 / MVP 로 운영할 때
✔ Django에 모든 로직을 묶고 싶을 때

```yaml
React
  ↓
Django (Ninja API)
  ↓
Ollama (local or container)
```

## 장점
### 1. **아키텍처 단순성**
* 기존 Django 인프라 그대로 활용
* 인증/권한/세션/JWT 로직 재사용 가능
* 배포 단순 (컨테이너 수 감소)

### 2. **개발 속도 빠름**
* Django Ninja → FastAPI 스타일이라 러닝 커브 낮음
* 기존 Django ORM, User 모델, 로그 시스템 그대로 사용

### 3. **내부 서비스로 적합**
* 사내 툴, PoC, 관리자용 LLM 기능에 이상적
* 요청량이 많지 않은 경우 충분히 안정적

### 4. **Streaming 지원 가능**
* Ninja + ASGI(Uvicorn) 환경에서
* Ollama Streaming Response 연결 가능

## 단점
### 1. **확장성 한계**
* Django는 본질적으로 **LLM 추론 서버에 최적화된 프레임워크는 아님**
* GPU / 추론 부하가 커질수록 Django 전체가 영향받음

### 2. **장기 운영 시 복잡도 증가**
* LLM 전용 설정 (timeout, retry, batching 등)이 Django 설정을 오염시킴
* 워커 분리 어려움

<br/>

# 별도 FastAPI + Ollama Docker Container (LLM 마이크로서비스)
2가지 방법 중 분리운영에 중점을 둔다면 2번째 방식을 추천합니다. 
✔ LLM이 **핵심 기능**으로 스트리밍 응답 필수
✔ GPU 서버 사용하고 사용자 수 증가 예상될 때
✔ 추후 모델 교체 / 멀티 모델 운영

```yaml
React
  ↓
Django (API / Auth / Business Logic)
  ↓
FastAPI (LLM Gateway)
  ↓
Ollama
```

또는

```yaml
React → Django
React → FastAPI (LLM)
```

## 장점
### 1. **확장성 최강**
* LLM 서버 독립 스케일링 가능
* GPU 서버 분리 가능
* 추후 vLLM, TGI, OpenAI API 교체 쉬움

### 2. **LLM 전용 최적화**
* FastAPI + Uvicorn → Streaming 최적
* 긴 요청, SSE, WebSocket 안정적
* 타임아웃, 큐잉, rate-limit 구현 쉬움

### 3. **운영 안정성**
* LLM 서버 죽어도 Django 서비스 영향 없음
* 장애 격리 (Blast Radius 감소)

### 4. **팀/미래 확장에 유리**
* LLM 팀과 웹 팀 분리 가능
* 추후 다른 서비스에서도 LLM 재사용 가능

## 단점
### 1. **복잡도 증가**
* 컨테이너, 네트워크, 인증 처리 추가
* 서비스 간 통신 보안 필요 (Internal Token 등)

### 2. **초기 개발 비용**
* 작업 난이도가 높아진다
* Docker Compose / K8s 구성 필요

<br/>

# FastAPI + Ollama 를 활용할 때 SSE
ollama 등의 응답을 단방향으로 처리할 때에도 발생하게 되는데, `LLM` 서비스에게 요청을 하면 `응답결과를 받기까지 오랜 시간동안 딜레이`가 발생하게 됩니다. 이처럼 특정 영역에서 딜레이가 발생 했을 때, 서비스 전체로 까지 영향이 미치는 것을 것을 방지할 필요가 있습니다.

이와같은 상황을 방기하기 위해서 [SSE(Server-Sent-Event)](https://pypi.org/project/sse-starlette/) 와 같은 MiddleWare 가 필요 합니다. 역할은 Python 에서 `await / async` 의 조합처럼 특정작업의 딜레이가 발생할 확률이 높은경우 별도의 프로세스로 진행하도록 도와 줍니다.  

## SSE 를 적용하지 않았을 때
```yaml
Client
  ── 요청 ──▶
           (서버 처리, 대기)
  ◀─ 응답 ──
연결 종료
```

## SSE 를 적용하는 경우
```yaml
Client
  ── 요청 ──▶
           (연결 유지)
  ◀─ chunk 1
  ◀─ chunk 2
  ◀─ chunk 3
           (완료)
연결 종료
```

| 항목       | SSE 적용 ❗  | SSE 미적용          |
| -------- | --------- | ---------------- |
| 통신 모델    | Streaming | Request/Response |
| 응답 방식    | 점진적       | 일괄               |
| HTTP 연결  | 오래 유지     | 짧음               |
| 클라이언트 UX | ⭐⭐⭐⭐⭐     | ⭐⭐               |
| 구현 복잡도   | 중         | 매우 낮음            |
| 서버 리소스   | 연결 유지 비용  | 처리 순간 집중         |
| 에러 처리    | 중간 복구 가능  | 실패 시 전체 실패       |
| LLM 적합성  | ⭐⭐⭐⭐⭐     | ⭐                |


<br/>


# 성능 / 운영 관점 요약 비교
| 항목           | Django Ninja 통합 | FastAPI 분리 |
| ------------ | --------------- | ---------- |
| 초기 개발 속도     | ⭐⭐⭐⭐⭐           | ⭐⭐⭐        |
| 아키텍처 단순성     | ⭐⭐⭐⭐⭐           | ⭐⭐         |
| LLM 성능 최적화   | ⭐⭐              | ⭐⭐⭐⭐⭐      |
| 장애 격리        | ⭐⭐              | ⭐⭐⭐⭐⭐      |
| GPU / 대규모 처리 | ❌               | ✅          |
| 스트리밍 안정성     | ⭐⭐⭐             | ⭐⭐⭐⭐⭐      |
| 미래 확장성       | ⭐⭐              | ⭐⭐⭐⭐⭐      |

<br/>

# **현실적인 추천 (당신 상황 기준)**
**이미 Django + React + Docker 기반으로 서비스를 구성하고 있고, LLM 기능을 실서비스에 붙이려는 상황** 이라면 1단계로는 **Django Ninja + Ollama** (빠르게 기능 검증, UX / Prompt / Streaming 구조 확정) 으로 적용을 우선한다. 그리고 **FastAPI LLM 서비스 분리** (API 인터페이스 유지, Django는 Gateway 역할만 수행) 하는 방식으로 고도화 함으로써 **리팩토링 비용 최소 + 미래 확장성 확보** 가능합니다.

## 한 줄 결론
- **LLM이 부가 기능 → Django Ninja 통합**
- **LLM이 핵심 기능 / 확장 예정 → FastAPI 분리**
- **지금은 Ninja → 나중에 FastAPI로 분리하는 단계적 접근이 가장 현실적** 입니다.
