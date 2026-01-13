---
layout: blog
title: vscode 에서 GPT 모델 활용하기
tags:
- vscode
---

`ubuntu 24` 에서 `Ollama`등을 활용하여 [vscode 의 Auto Suggestion 등 적용하는 내용에](https://yongbeomkim.github.io/ubuntu/vscode-ollama) 대하여 앞에서 살펴 보았습니다. 이번에는 작업을 진행하면서 추가적으로 알게된 내용들을 정리해 보겠습니다.

<br/>

# **_CONTINUE_**
`Ollama` 를 실시간으로 활용하면, 생각보다 하드웨어 리소스를 많이 차지하는 것을 알 수 있었습니다. 이때문에 실시간으로 적용하기 보다는 [단축키를 설정하고 필요할 때에만 코드 자동화를 실행하는 방식으로 설정하는 내용](https://yongbeomkim.github.io/ubuntu/vscode-ollama)을 살펴보았습니다.

가장 쉽게 연결가능한 AI 모델은 [Gemini Google AI Studio](https://aistudio.google.com/) 입니다. Continue 에서 Gemini Model 을 선택하려고 클릭을 하면 `Oops! Something went wrong` 오류가 발생합니다. 추후 이 부분은 업데이트로 보완될 내용이긴 하지만 25.12.15 현재까지는 수정되지 않고 있습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="600px" src="{{site.baseurl}}/assets/code/vscode_gemini_error.gif">
  </p>
  <figcaption></figcaption>
</figure>

설정에서는 `Gemini 2.0` 하나만 선택 가능합니다. 이를 활용하여 설정값을 입력한 뒤, 적합한 모델 이름을 `~/.continue/config.yml` 에서 직접 수정하는 방식으로 활용 가능합니다.

```yaml
  - name: Gemini 2.5 Flash Lite
    provider: gemini
    model: gemini-2.5-flash-lite
    apiKey: AI_user_key.......
  - name: Gemini 2.0 Flash
    provider: gemini
    model: gemini-2.5-flash
    apiKey: AI_user_key.......
```

[Google Gemini 무료 Model](https://blog.naver.com/spicy_gamza/224079631931) 중 활용 가능한 목록 이름은 [Gemini Google AI Studio](https://aistudio.google.com/) 의 모니터링에서 직접 이름을 확인하고 적용하는 방식으로 입력 후 사용량의 변동으로 확인을 하면 됩니다. 지금은 `gemini-2.5-flash` , `gemini-2.5-flash-lite` 모델이 가장 경제적으로 활용할 수 있습니다. 사용량이 가득차면 처음 시작한 다음날 같은 시간대 부터 사용 가능합니다. 구글 계정을 몇개 활용하여 모두 소진되면 번갈아 가며 활용하는 방식으로 작업을 진행합니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="950px" src="{{site.baseurl}}/assets/code/google_ai_studio_main.png">
  </p>
  <figcaption></figcaption>
</figure>

<br/>

# Cline
참고로 GPT 에이전트를 연결하는 Vs Code 확장 프로그램으로는 [CLine](https://cline.bot/) 이 있습니다. 

[Vscode + cline 사용 후기 - 공부 기록하려고 만든 블로그](https://toyourlight.tistory.com/136) 를 보면, Cline 은 전체적인 프로젝트 매니저와 같은 역할을 하는 것을 알 수 있습니다. 가벼운 작업은 CONTINUE 를 활용하고 완성된 프로젝트를 관리하는 단계에서는 Cline 으로 관리감독 및 보완하는 방식으로 진행할 계획 입니다.