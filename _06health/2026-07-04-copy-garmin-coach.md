---
layout: blog
title: (Work Flow) 러닝 코치 Host 서버
tags:
- health
---

갤럭시 Watch 를 사용하고 있다. 장점은 AS 및 중고 재구매 판매가 용이하다. 그리고 갤럭시 스마트폰 사용자에게는 mp3, 사진 이동 및 사진촬영에 활용 가능하다는 등의 확장성이 뛰어나다는 점이 있습니다.

반면 가장 큰 단점은 생태계 확장이 어렵고, Garmin Coach 와 같은 러너 전용 프로그램이 부족하다 입니다. GPS 의 정확도에 대해서는 여러 이야기가 있지만 건강관리 측면에서 러닝을 하는 입장에서는 크게 문제가 있지는 않았습니다.

이번 페이지는 `Samsung Health` 데이터를 활용하여 `Garmin Coach` 와 유사한 또는 보다 추가된 관리가 가능한 서비스를 구현하는 내용에 대하여 검색한 내용들을 정리해 보겠습니다.

<br/>

# WorkFlow
```text
Samsung Health JSON
        │
        ▼
Python Parser
        │
        ├── Pace 분석
        ├── Heart Rate Drift
        ├── Cadence 분석
        ├── Training Load 계산
        ├── VO₂max 추정
        └── Recovery 계산
        │
        ▼
GPT-5.5 / 로컬 LLM
        │
        ▼
Garmin Coach 스타일 피드백
        │
        ▼
React Dashboard
```


## Samsung Health JSON
* Health Connect to Webhook
[깃허브: mcnaveen/health-connect-webhook (MIT 라이선스)](https://github.com/mcnaveen/health-connect-webhook)

- 특징: 갤럭시 워치의 삼성 헬스 데이터는 안드로이드의 Health Connect(헬스 커넥트) API에 통합됩니다. 이 앱은 헬스 커넥트에 축적된 갤럭시 워치의 실시간/누적 러닝 JSON 데이터를 Host PC의 로컬 HTTP 서버나 Webhook 엔드포인트로 자동 전송해 줍니다.

- 활용: 매번 수동으로 JSON을 옮길 필요 없이, 러닝 후 로컬 PC(Host)에서 실행 중인 분석 스크립트로 데이터를 즉시 쏴주는 파이프라인을 구축할 수 있습니다.

## Garmin Coach 스타일 피드백
* OpenAthlete
[깃허브: openathleteorg/openathlete (AGPLv3 라이선스)](https://github.com/openathleteorg/openathlete)

특징: 가민 커넥트나 스트라바, 트레이닝픽스 등 폐쇄적인 플랫폼에 데이터를 종속시키지 않고, Host PC나 개인 서버에 직접 호스팅(Self-hosted)할 수 있는 유러피언 Endurance 스포츠 분석 플랫폼입니다.

기능: 러닝 데이터 분석의 핵심 지표인 CTL(만성 훈련 부하), ATL(급성 훈련 부하), TSB(훈련 스트레스 균형)를 추적합니다. 최근 업데이트를 통해 AI 기반 세션 생성(AI session generation) 기능도 옵션으로 제공하여 가민 코치와 유사한 피드백 환경을 직접 구축하기에 가장 적합합니다.

## RunAlyze / Intervals.icu
분석도구로써 MIT 로도 어느정도 기능을 제공하는 서비스들은 다음과 같습니다.

[RunAlyze](https://runalyze.com/start)
특징은 다음과 같다.
- Training Load
- Recovery
- Effective VO2Max
- Marathon Prediction
- Fatigue
- Running Economy
- Pace 분석
- 심박 기반 분석

[Intervals.icu](https://www.intervals.icu)
분석내용
- CTL
- ATL
- TSB
- Fatigue
- HR Zone
- Pace Zone
- Recovery
- Load

최근에는 AI Coach 기능이 추가되고 있습니다. Garmin Coach가 내부적으로 보는 대부분의 지표를 제공합니다. Reddit에서도 Garmin 대신 `Runalyze`와 `Intervals.icu`를 추천하는 의견이 매우 많습니다.

## 기타 LLM 모델을 활용
GPT LLM 모델을 API 로 연결해서 결과값을 분석합니다.

## Fit DashBoard
[fit-dashboard](https://github.com/arpanghosh8453/fit-dashboard)
Host PC 에서 모니터링 데이터를 확인합니다.
