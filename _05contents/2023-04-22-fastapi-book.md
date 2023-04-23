---
layout: blog
title: (도서) FASTAPI를 사용한 파이썬 웹개발
tags:
- fastapi
- python
---

파이썬으로 `간단한 API 서버` 작업을 하려면, `Flask` 또는 `Django` 와 같은 프레임 워크와 `Django Rest FrameWork` 같은 모듈에 대해서 모두 알고난 뒤 작업이 가능 했었습니다. 이러한 허들을 낮춰준 모듈이 `FastAPI` 로 1개의 모듈에 대해서만 알고 나면 동일한 결과물을 뽑아낼 수 있었고, 부수적으로 서버 응답속도도 비약적으로 빨라져서 안쓸 이유가 없는 모듈이 되었습니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/fullstack/compare.png">
  <figcaption>Django Async vs FastAPI vs WSGI Django</figcaption>
</figure>

`Django` 에서는, 동일한 엔진으로 개발된 [Django Ninja](https://pypi.org/project/django-ninja/) 가 있어서 이를 잘 활용하고 있었습니다. 이번에 `한빛미디어` 에서 `FastAPI` 를 집중적으로 다룬 도서가 나온다는 소식을 들을 수 있었고, 때마침 `나는 리뷰어이다` 활동을 하고 있던 중, 4월 신청 목록에도 해당 도서가 담겨 있어서 신청을 하고, 책을 받을 수 있었습니다.

<br />

## 총평
1. 정확히 **200 페이지 안에 모든 내용**이 꽉 차 있었다.
2. `웹서비스 실행 내용` 이 `터미널` 결과값 을 보여줘서, 한 페이지에서 여러 결과값을 담고 있었다.
3. [FastAPI 공식문서](https://fastapi.tiangolo.com/ko/) 보다 개념들의 유기적 관계를 알 기 쉽게 구성되어 있었다
4. **Docker, JWT 보안, Testing, 배포** 까지 대부분의 단계를 담고 있어서 좋았다
5. `API Server` 가 주요 목적이라, NoSQL 인 `mongoDB` 만 있고, MySQL 등 다른 DB는 따로 찾아봐야 했다
6. `Social Login`, `Filtering`, `API EndPoint 수정`, `DataBase Indexing` 등 고급 기술 내용은 언급되지 않는다.

`FastAPI` 의 고급기술을 찾고 활용할 수 있는 능력을 스스로 갖추도록 <span style="color:var(--strong);">기초체력을 길러주는 용도</span> 로써 알차게 구성되어 있었습니다.

## Coding
코드 대부분이 `async` 비동기 명령어와 `@데코레이터` 들로 도배가 되어 있어서, 파이썬 기초만 공부하신 분들에게는 바로 내용을 이해하기는 어려운 내용으로 보일 수 있었습니다. 

하지만 해당 내용이 전체에 걸쳐서 반복되고 있고, 해당 챕터에서 추가되는 내용은 아래의 사진처럼 다른 색으로 바뀌어 있어서 해당 챕터에서 설명한 내용이 코드속에 어떻에 녹아 있는지를 한눈에 바로 알 수 있었습니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/fullstack/book-fastapi.jpeg">
  <figcaption>CHAPTER 2 라우팅</figcaption>
</figure>

## FastAPI 공식문서
책에서는 `개발자가 실습을 하는 과정에서 보게되는 화면` 을 최소로 하고 있고, <span style="color:var(--strong);">터미널에서 실습 및 결과값</span> 을 담고 있습니다. 때문에 <span style="color:var(--accent);">터미널 환경에서 개발 작업이 익숙하지 않은 분</span> 이라면 내가 지금 작업하는 내용 및 과정이 제대로 진행되고 있는지에 대해서 불안해 하실 수 있어 보였습니다. 

터미널 개발작업 경험이 적은 분들이라면, 책 진도를 진행하기 전에 [FastAPI 공식문서 한글번역](https://fastapi.tiangolo.com/ko/) 사이트에 나와있는 `Tutorial` 내용을 먼저 경험하시길 추천 합니다. 해당 사이트는 패키지를 설치하는 과정, `Uvicorn` 서버가 실행되는 과정들이 모두 동영상으로 담겨 있습니다.

이러한 경험을 먼저 하신 뒤에 이 책을 따라가면서, <span style="color:var(--accent);">챕터별 설명하는 개념</span>과, 위 사진에서 보이는 것처럼 <span style="color:var(--accent);">색으로 특정된 코드의 내용</span> 을 중심으로 진행을 하면, 전체적인 내용을 이해하실 수 있을 것이고, 바로 간단한 API, 사용자 로그인 서비스를 바로 구현하실 수 있습니다.

## 마무리
이 책을 리뷰하는데 생각보다 시간이 오래 걸렸습니다. 오히려 다른 책들은 어려운 내용들이 많아서 빨리 리뷰를 해야겠다는 조급합이 생겼었는데, 이 책은 처음 받았을 때 무척 얇았고 전체적인 내용들을 파악하는데 얼마 걸리지 않아서 금방 하겠지 하며 계속 미루게 되었습니다.

나중에 하더라도 빨리 리뷰를 할 수 있겠다는 자신감(?)으로 계속 미루다 보니, 결과적으로 가장 오래 걸리게 되었고, 막상 해당 내용을 따라가다 보면 예전에는 대충 넘어갔던 부분들도 `주석` 에서 해당 내용에 대해 설명한 부분을 읽으면서 그동안 잘 몰랐던 부분에 대해서도 찾아보고 고민하는 과정들로 녹녹하지 않았습니다.

실제 작업을 하는데 필요한 고급 내용을 다룰만큼 여유가 있는 책은 아니였지만, 책 두께만큼 `FastAPI` 작업을 하는데 있어서 <span style="color:var(--accent);">필요한 기초체력을 생각보다 더 탄탄하게 갖추는데</span> 많은 도움이 되는 시간이었습니다.

※ 본 리뷰는 IT 현업개발자가, 한빛미디어 책을 제공받아 작성한 서평입니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/fullstack/fastapi-cover.jpeg">
  <figcaption>리뷰도서</figcaption>
</figure>
