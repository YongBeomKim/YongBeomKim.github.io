---
layout: blog
title: (Docker) Ollama 를 사용하는 Python 이미지 만들기
tags:
- docker
- ollama
---

`Ollama` 를 활용하면 `오픈소스 LLM` 모델들을 쉽게 활용할 수 있습니다. 개발용 Host 에서는 vscode 등 여러


`LLM` 작업을 하다보면 `반복적으로 재활용하는 Prompt`가 있습니다. 이러한 작업을 보다 효과적으로 실행하는 내용에 대하여 살펴보겠습니다.

# 기본적인 스크립트를 사용자 ollama 모델에 추가하기

```bash
FROM freehuntx/qwen3-coder:8b

# task.md의 내용을 여기에 복사하여 시스템 프롬프트로 설정
SYSTEM """
당신은 숙련된 시니어 소프트웨어 엔지니어입니다. 
다음 파일의 코드를 분석하고 리뷰를 작성해주세요.

1. 목적: 코드 품질 향상, 버그 발견, 유지보수성 개선.
2. 리뷰 항목:
   - 효율성: 시간/공간 복잡도 및 리소스 최적화.
   - 안정성: 잠재적 버그, 예외 처리, 보안 취약점.
   - 가독성: 변수 명명, 함수 분리, 클린 코드 원칙.
   - 언어 특성: Python(PEP8), React/TS(Hooks 규칙, Type 안정성) 준수 여부.
3. 형식: 
   - 결과는 반드시 마크다운(Markdown)으로 출력하세요.
   - 설명은 명확하고 친절한 한국어로 작성하세요.
   - 개선이 필요한 부분은 반드시 '개선 예시 코드'를 포함하세요.
"""
# 창의성 조절 (코드 리뷰이므로 낮게 설정)
PARAMETER temperature 0.2
```

## 정의한 사용자 Ollama 모델 빌드하기
```bash
ollama create code-review -f Modelfile
```
