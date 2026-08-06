---
layout: blog
title: Aider LLM Agent 추천하는 이유
tags:
- llm
---

현재 목적을 정리하면 다음과 같습니다. 이 조건이라면 단순히 모델 지원 여부보다 **Workflow 유지**가 훨씬 중요합니다.

* Ubuntu 24 Host, Django + React + Docker + uv Project
* MiniMax Pro API 사용, 필요시 Gemini API \ Host Ollama 사용
* 인터넷이 안되는 환경에서도 최대한 동일한 Workflow 유지

| 순위 | Tool        | 추천도   |
| -- | ----------- | ----- |
| 1  | **Aider**   | ⭐⭐⭐⭐⭐ |
| 2  | OpenCode    | ⭐⭐⭐⭐☆ |
| 3  | Claude Code | ⭐⭐⭐⭐  |

---

# 1. Code Review

## OpenCode

OpenCode는 다음의 형태입니다.

```raw
Repository → Agent → 수정
```

즉 "프로젝트 전체를 이해하고" 수정하는 Agent입니다. Code Review도 가능합니다. 하지만 Review 자체가 전문 기능은 아닙니다.

---

## Aider

Aider는 Git 기반으로 동작합니다.

```raw
git diff → Review → 수정 → commit
```

Workflow 에서 매우 강합니다. 다음의 예시처럼 사용할 수 있습니다.

```bash
$ git add
$ aider
> review my last changes
```

실제 업무에서는 아래와 같이 이어집니다. 이 부분은 OpenCode보다 성숙합니다.

```text
Code Review → Diff 생성 → Patch → Commit
```

---

# 2. 오류 분석

예를 들면 아래와 같은 과정이 필요합니다.
```text
Traceback → 원인 분석 → 관련 파일 검색 → 수정
```

OpenCode도 가능합니다. 하지만 Aider는 다음과 같이 Git 을 같이 활용하는 Workflow가 자연스럽습니다.

```text
에러로그 + git + 프로젝트
```

Python 을 디버깅하는 예시를 살펴보면 다음과 같습니다.

```text
pytest → 에러 → Aider → 자동 수정 → pytest → 반복
```

---

# 3. 신규 기능 개발

여기서는 도구마다 사용 특징은 거의 비슷합니다. OpenCode는 큰 범위의 설계를 잘합니다. Aider는 기존 코드를 수정하는 능력이 뛰어납니다.

```text
User API 추가 → serializer 수정 → view 수정 → urls 수정 → test 추가
```

---

# 4. Token 효율

OpenCode 는 Agent가 Repository 를 자주 읽습니다. 다음의 이러한 과정이 반복됩니다. 때문에 Token 소비가 많습니다.

```text
Repository → Prompt 생성 → LLM
```

반면 Aider는 필요한 파일만 읽습니다. 예시를 들면 아래와 같습니다. 때문에 Token이 상당히 절약됩니다. 특히 MiniMax Token Plan을 사용할 경우 Aider가 유리합니다.

```text
models.py → views.py → serializer.py
```

---

# 5. Repository Memory

최근 Aider가 강해진 이유입니다. 예전에는 `Prompt → 수정` 정도였습니다. 최근에는 Repository Map 기능이 상당히 좋아졌습니다.

```bash
project/
api/
 models.py
 views.py
 tests.py
...
```
Repository Graph처럼 관리합니다. 그리고 필요한 파일만 Context에 넣습니다. 때문에 Token 절약 효과가 큽니다.

---

# 6. Skills

최근 Aider는 Skills 개념을 적극 활용합니다.

* Fix Django Migration
* Fix React Error
* Docker
* FastAPI
* Refactoring

등의 같은 반복 작업을 Skill 형태로 관리할 수 있습니다.

또한 프로젝트 단위로 `.aider.conf.yml` 뿐 아니라 프로젝트 규칙을 문서화하여 반복 작업에 활용하는 패턴도 많이 사용됩니다.
OpenCode 역시 프로젝트 규칙(MCP나 설정 파일)을 둘 수 있지만, **반복적인 코드 수정·리뷰 작업을 위한 운영 경험은 Aider 쪽이 더 축적되어 있습니다.**

---

# 7. Ollama

예를 들면 `Qwen3-Coder, DeepSeek, Mistral, Gemma, Llama, CodeLlama` 등을 계속 교체할 예정입니다.

---

## OpenCode
가능하지만 Provider 설정을 계속 변경해야 합니다.

---

## Aider

거의 그대로입니다.

```
ollama serve → aider → 끝
```


예를 들면 `--model ollama/qwen3-coder:30b` 과 같이 모델만 바꾸면 됩니다.

* `--model ollama/deepseek-r1`
* `--model ollama/gemma3`
* `--model ollama/llama3.3`

---

# 8. Offline

OpenCode도 가능합니다. 하지만 Provider를 자주 바꾸는 느낌입니다.

Aider는 그냥 모델 이름만 바꾸면 됩니다.

---

# 9. Multi LLM

여기도 Aider가 좋습니다. 모델변경을 설정 하나로 바꿀 수 있습니다.

```
MiniMax → Gemini → Claude → GPT-5 → Ollama
```

다음의 내용처럼 쉽게 전환할 수 있습니다.

```
/models
 1 MiniMax
 2 Gemini
 3 Ollama
```

---

# 10. Ubuntu Host 개발

현재 환경이 `Ubuntu24 → Docker → uv → Django → React → Git → VSCode` 인 상황에서는 Aider가 정말 잘 맞습니다. 다음의 Workflow가 자연스럽습니다.

```
git status → pytest → ruff → mypy → uv run → docker compose → aider
```

---

# 11. 장기적인 운영 관점

제가 추천하는 구성을 그림으로 나타내면 다음과 같습니다.

```text
                Ubuntu 24 Host
                      │
        ┌─────────────┴─────────────┐
        │                           │
     Ollama                    MiniMax API
(Qwen3-Coder, Gemma,        (M2.7, Text-01 등)
 DeepSeek, Llama 등)              │
        │                           │
        └─────────────┬─────────────┘
                      │
                   Aider CLI
                      │
        ┌─────────────┼─────────────┐
        │             │             │
   Code Review   Error Fix    Feature Development
        │             │             │
      Git Diff     pytest       Refactoring
        │             │             │
     Ruff/Mypy   Docker Test    Commit 생성
```

이 구조의 가장 큰 장점은 **온라인과 오프라인에서 사용하는 도구가 동일**하다는 점입니다. MiniMax API를 사용할 때도, Ollama의 로컬 모델을 사용할 때도 `aider` 명령과 작업 방식이 바뀌지 않습니다.

---

# 제 최종 추천

현재 사용 목적(프로젝트 코드 리뷰, 오류 분석, 기능 추가)과 개발 환경(Ubuntu 24 + Django + Docker + uv + Git), 그리고 **MiniMax Pro API와 Ollama를 병행**하려는 계획을 종합하면 다음 구성을 가장 추천합니다.

| 용도           | 추천 도구       | 이유                                            |
| -------------- | ------------ | ---------------------------------------------- |
| 프로젝트 코드 리뷰 | **Aider**    | Git diff와 연계한 리뷰 및 수정이 매우 강력            |
| 오류 분석 및 수정 | **Aider**    | 필요한 파일만 읽어 토큰을 절약하고 반복 수정 워크플로에 적합|
| 신규 기능 개발   | **Aider**     | 기존 프로젝트를 점진적으로 확장하는 작업에 강함          |
| 대규모 설계·아키텍처 검토 | **OpenCode** | 여러 파일을 아우르는 설계와 탐색에 유리           |
| MiniMax API 활용 | **Aider**   | OpenAI 호환 API 설정이 간단하고 토큰 사용이 효율적      |
| Ollama 오프라인 개발 | **Aider**     | 모델만 교체하면 동일한 CLI와 작업 방식 유지         |
| 장기적인 운영 | **Aider 중심 + OpenCode 보조** | 일상 개발은 Aider, 큰 리팩터링이나 구조 설계는 OpenCode 상호 보완 |

따라서 **하나만 선택해야 한다면 Aider**, 그리고 **최적의 개발 환경을 구축한다면 "Aider를 메인으로 사용하고 OpenCode를 보조 도구로 함께 두는 구성"**이 현재의 요구사항과 가장 잘 맞는 선택이라고 판단합니다.
