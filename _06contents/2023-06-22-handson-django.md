---
layout: blog
title: (도서) ⚝⚝⚝⚝ 백엔드 개발자를 위한 핸즈온 장고
tags:
- book
- django
---

총평을 먼저 하자면, **Django** 관련 도서 또는 동영상 학습을 한번 이상 진행했던 분이라면 **대규모 API 서버 고급 개발자** 로 도약할 수 있도록 도와주는 최고의 도서라고 할 수 있습니다. **취준생 분들** 에게는 이력관리 및 인터뷰때 도움이 되는 내용까지 함께 담겨져 있습니다 

기존에 다뤘던 **FastAPI** 에서도 유사한 기능들을 제공하고 있지만, `Add-on` 및 **커뮤니티 활동** 측면에서 **Flask & Django** 가 활성화가 더 잘 되어 있어서 **Django** 처음 시작하는 분들이라면 **Fast API** 대신 **Django** 로 작업하는 것을 추천 합니다.

이책의 목표는 **Django 프레임워크를 사용하여 API 서버를 개발하는 활용하는 중급 개발자 양성** 입니다. 기존의 도서 또는 동영상 강의들이 **파이썬 초보자를 위한 개인 블로그 개발** 에 목표를 두고 있다보니 대부분 학습내용 및 마무리 부분이 대부분 비슷 했었습니다. 이점이 이 책의 차별점이라 할 수 있습니다.

<figure class="align-center">
  <img width="550px" src="{{site.baseurl}}/assets/book/dj-books1.jpg">
  <figcaption>장고관련 도서들</figcaption>
</figure>

# Chapter 2 모델링과 마이그레이션
## 2.2.2 다양한 옵션
`models.py` 작성 내용도 필요한 개념들만 설명하는데 그치치 않고, `Mysql` 등의 DB와 연결한 뒤, `DB Index` 생성과 관련한 내용을 다룸과 동시에, 여러 옵션 중 추천하는 옵션과 그 이유까지 설명하고 있습니다.
<figure class="align-center">
  <img width="750px" src="{{site.baseurl}}/assets/book/dj-book-drf1.jpg">
  <figcaption>DB 인덱스 설정관련 내용</figcaption>
</figure>

## 2.3.4 날짜 자료형 관련 필드
개발을 진행하는 서버와, DB 그리고 Django 프레임워크의 `TimeZone` 이 일치하지 않으면 `datetime` 필드값에 문제가 발생합니다. `입력한 값` 과 `저장` 및 `출력한 값` 이 서로 다르게되어 문제가 하고 심지어 다음과 같은 오류를 발생하기도 합니다.

```bash
ImproperlyConfigured: Connection 'default' cannot set TIME_ZONE because USE_TZ is False.
ValueError: MySQL backend does not support timezone-aware datetimes when USE_TZ is False.
```

이를 정리하고 해결한 포스트를 [TimeZone of MariaDB & Django](https://yongbeomkim.github.io/ubuntu/mariadb-timezone) 작성 했었는데, 이처럼 초보자가 접근하고 이해하기 어려운 부분에서는 아래의 내용처럼 그림과 함께 자세한 설명을 다뤄주고 있었습니다.
<figure class="align-center">
  <img width="750px" src="{{site.baseurl}}/assets/book/dj-book-drf2.jpg">
  <figcaption>서버와 프레임워크 TimeZone 내용</figcaption>
</figure>

<br/>

# Chapter 3 ORM과 쿼리셋
중급자 개발자를 위한 내용은 이번장 부터 본격화 됩니다. 다른 도서들이 일반적인 개념들을 설명하는 것에서 마무리 되었다면, 이 책은 실제로 **Django QuerySet** 작업을 진행하면서 발생가능한 문제들을 상정하고, 그에대한 해답까지 설명함으로써 **Django 중급 개발자를 위한 인터뷰 참고서** 수준의 내용들로 가득 차 있습니다.
<figure class="align-center">
  <img width="750px" src="{{site.baseurl}}/assets/book/dj-book-drf3.jpg">
  <figcaption>SQL 쿼리셋 최적화 내용</figcaption>
</figure>

<br/>

# Chapter 5 View
## 5.3 함수 기반 뷰(FBV) 와 클래스 기반 뷰(CBV)
Chapter 4 에서는 [django rest framework](https://www.django-rest-framework.org/#) 사용법에 대해서 설명을 진행 했습니다. 이번 장에서는 다른 Django 도서처럼 **django generic view** 를 다루지 않고, DRF(django rest framework) 와 [Django-Ninja](https://django-ninja.rest-framework.com/) 를 함께 언급하고 있습니다. 저자가 **DRF** 를 주력으로 사용하고 있어서 **Django Ninja** 와 관련한 부분은 몇페이지 안되어 이부분은 아쉬웠지만 그만큼 저자가 경험했던 내용들을 알차게 담겨있어서, 이책의 목표가 **대규모 서비스 Django API 서버** 임을 알 수 있었습니다.

<figure class="align-center">
  <img width="750px" src="{{site.baseurl}}/assets/book/dj-book-drf4.jpg">
  <figcaption>Django Ninja 비교그림</figcaption>
</figure>

<figure class="align-center">
  <img width="750px" src="{{site.baseurl}}/assets/book/dj-book-drf5.jpg">
  <figcaption>Django Ninja 코드예시 (이게 전부여서 아쉬웠음..)</figcaption>
</figure>

<br/>

# 마무리
지금까지 나온 도서들 중, 가장 고급기술 들을 알려주고 있는 **고성능 Django API 서버 개발자 기술문서** 입니다. 실제 작업을 하면서 경험했던 내용들도 구석 구석 언급하고 있을만큼 현장에 가까운 내용들을 많이 담고 있었습니다.

때문에 처음 이책을 접하신 분들 중에는 **부연설명이 너무 많다고** 느끼실 수도 있지만, 일종의 선배님들의 무용담을 듣는다 생각하면서 내용을 빼놓지 않고 읽고나면 나중에 작업을 하면서 막히는 부분이 있을때 좋은 길라잡이가 되어 줄 것입니다.

그리고 책이 다루는 내용이 너무 많아서 힘드신 분들이라면 [장고 ORM 요리책](https://django-orm-cookbook-ko.readthedocs.io/en/latest/) 전자책 형식으로 정리된 50개의 질문과 답으로 구성된 내용으로 이 내용을 마무리한 뒤 책의 내용을 진행하신다면 조금 더 수월하게 진행하실 수 있을 것입니다.

<br/>

# 추가로 바라는 점
DB 구조등을 설명할 때 삽입한 그림들이 **가로로 보기** 로 삽입이 되어 있어서 책을 읽다가 해당 내용을 보기 위해서는 책을 세로로 돌려야 하는 불편함이 있었습니다. 아마 저자분이 실제로 정리한 내용을 가감없이 책에 담으려다 보니 생긴 부분으로 생각은 되는데, 개정판에서는 해당 그림설명을 본문과 동일한 방향으로 볼 수 있게만 되어도 더 좋을거 같습니다.

그리고 개정판에 추가되었으면 하는 내용은 챕터들을 마무리 할때, **Mini Project** 형식으로 챕터의 주요내용을 담은 문제들을 1페이지 정도로 출제하고, 독자가 스스로 해결해 나아가는 경험을 통해 전체적인 흐름중 어디에 해당하는지를 경험할 수 있으면 더 좋을거 같습니다. 

<br/>

※ 본 리뷰는 IT 현업개발자가, 한빛미디어 책을 제공받아 작성한 서평입니다.


<figure class="align-center">
  <img width="450px" src="{{site.baseurl}}/assets/book/dj-book.jpg">
  <figcaption>Book Cover</figcaption>
</figure>
