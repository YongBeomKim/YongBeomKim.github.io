---
layout: blog
title: vscode 에서 ollama Local 모델 활용하기
tags:
- vscode
---

`ubuntu 24` 에서 `Ollama` 를 활용하여 vscode 의 Auto Suggestion 을 적용해 보겠습니다.

<br/>

# **_Ollama_**

## Ollama 설치하기
[Download (Ollama, macOS, Linux)](https://ollama.com/download) 를 참고하여 설치를 진행합니다.
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

## Ollama Models
[ollama.com/search](https://ollama.com/search) 에서 필요한 모델을 검색할 수 있습니다. 
```bash
ollama pull qwen2.5-coder:1.5b
ollama pull qwen3:4b
```
qwen2.5-coder:1.5b `(약 1 GB 미만, 코드 자동 완성 (Autocomplete), 매우 빠르고 시스템 부하가 가장 적음)` 과 qwen3:4b `(약 2.5 GB 채팅/편집 (Chat/Edit)	7b 모델보다 가볍고 빠른 응답)` 을 설치하고 개별적 용도에 따라 설정을 다르게 적용 합니다.

<br/>

# **_Continue - vscode_**

## Continue
vscode 확장도구인 [Continue - open-source AI code agent](https://marketplace.visualstudio.com/items?itemName=Continue.continue)를 설치 합니다.

설치를 완료한 뒤 3곳에서 사용자 설정값을 수정합니다.
- Continue 의 `Agents > Setting > Local Agent` 에서 설치된 ollama 모델 연결하는 설정값을 정의 합니다.
- Continue 의 기본 Setting 에 들어가서 `Autocomplete` 설정값을 변경 합니다.
- vscode 의 기본 설정인 `Preference: Open User Setting (JSON)` 에서 `자동완성 기능`을 비활성화 합니다.
- vscode `File > Preference > Keyboard Shortcuts` 에서 `자동완성 단축키`를 추가 합니다.

자동완성이 활성화 되어 있으면, 프로젝트 파일 크기가 커질수록 느려지는 경우가 발생합니다. 리소스가 충분 하다면 `Ollama` 와 `Continue 의 기본 Setting` 에서 최적의 설정값을 찾아서 적용하는 방법이 있습니다. 이번에는 리소스  최적화 및 작업 속도 효율성을 높이기 위해서 수동으로 자동완성 기능을 활성화 해 보겠습니다.

## Continue - Local Agent
`~/.continue/config.yaml` 최적화 내용을 다음과 같이 적용하였습니다
```yml
name: Local Optimized Agent
version: 1.0.0
schema: v1

# 공통 설정 (모든 모델 공통 최적화)
settings:
  provider: ollama
  defaultThreadCount: 8      # Ultra 9 275H의 효율적 병렬 스레드 수
  timeout: 25s               # 응답 지연 시 중단 (25초)
  keepAlive: 60s             # 유휴 상태 60초 후 메모리 해제
  loggingLevel: warn         # 불필요한 로그 최소화
  saveSessionHistory: false  # 세션 기록 저장 안 함
  temperature: 0.4           # 기본 온도 (코딩 안정성)
  topP: 0.9

models:
  # Fast Autocomplete - 초경량 실시간 자동 완성
  - name: Fast Autocomplete
    provider: ollama
    model: qwen2.5-coder:1.5b
    roles:
      - autocomplete
    completionOptions:
      maxTokens: 64              # 자동완성 응답 길이 최소화
      temperature: 0.0           # 완전 결정적 (안정적인 코드 예측)
      topP: 0.8
      numPredict: 64
    performance:
      numThreads: 6              # 초경량 모델이므로 스레드 절반만 사용
      maxContextTokens: 1024     # 작은 context로 빠른 응답
      priority: high             # 입력 시 우선 응답하도록 지정

  # Smart Code Agent - 채팅/편집용 정밀 모델
  - name: Smart Code Agent
    provider: ollama
    model: qwen3:4b
    roles:
      - chat
      - edit
    completionOptions:
      maxTokens: 1024            # 긴 응답 허용 (코드 리팩토링/설명용)
      temperature: 0.5           # 적절한 창의성 유지
      topP: 0.9
      numPredict: 256
    performance:
      numThreads: 8              # 최대 성능 활용
      maxContextTokens: 3072     # 더 넓은 문맥 이해
      priority: normal
```

## Continue - Setting
`Autocompletions > Multiline Autocompletions` 에서 `Never` 로 변경 합니다

## VSCode - Open User Setting
아래의 내용을 추가함으로써, 자동완성 기능을 비활성화 합니다.
```json
    // CONTINUE + OLLAMA (Local Agent)
    "editor.inlineSuggest.enabled": false,
```

## File > Preference > Keyboard Shortcuts
위 내용으로 들어가서 탐색기에서 `editor.action.inlineSuggest.trigger` 를 입력하면 최 상단에 나타나는 내용이 있습니다. 여기에서 사용자가 사용하기 편한 단축키를 입력하면 됩니다. 이제부터 입력한 단축키를 입력하면 그 이후에만 자동완성을 실행하게 됩니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="820px" src="{{site.baseurl}}/assets/code/vscode_continue_01.png">
  </p>
</figure>