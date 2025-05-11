---
layout: blog
title: (도서) ⚝⚝ 멀티패러다임 프로그래밍
tags:
- book
---

**IT 현업개발자가, 별도의 광고료 없이 한빛미디어의 책만 제공받아서 작성한 서평입니다.**

불필요하게 반복적인 코드사용을 최소화 하고, 함수문(반복, 조건문 등) 과 매개변수 객체들을 무분별하게 남용하여 가독성이 떨어지고 불필요한 메모리 누수가 발생하는 것을 막음으로써, 효과적인 리팩토링을 도와주는 방법...


`멀티패러다임 프로그래밍` 이 책은 Javascript, TypeScript 를 보다 효율적으로 코딩할 수 있도록 도와주는 내용을 담고 있는 책 입니다.

- Scheme

이터레이터 소개 및 활용 -> LIPS 개념 -> typeScript 를 활용하여 LIPS 개념을 이해 및 실습

LIPS 개념을 활용한 언어들에게 제공되는 함수들을, TypeScript 를 활용하여 구현함으로써 내용을 이해하고, 보다 효율적인 TypeScript 구현을 가능하도록 도와 줌

77 페이지의 Note, 그리고 1.6 요약정리를 읽고서 애매했던 개념들을 이해한 뒤, 다시 앞에서 내용들을 정리해 아나가는 과정으로 진행

이터레이터
이터러블 이터레이터
전개연산자(...) - 52 page
구조분해 / 구조분해할당 - 70page
고차함수 - 72page
제너레이터의 `yield*` - 76page
화살표함수 - 95 page
타입스크립트의 타입 추론력 - 매개변수 타입만 명시해도 충분 - 95 page

96 page - 코드주석번호가 없음, 설명한 97 page 에 있음

아마도 ~ 93 페이지 까지는 코드에 대한 주석숫자와 함께, 각각의 숫자로 내용을 정리하며 알려 주었다면, 96페이지 2-16 코드는 코드에 직접적인 주석숫자 할당이 오타로 빠졌거나, 또는 확인하여야 할 내용을 숫자로 따로 정리하는 방식으로 변경되었는지는 애매함

100 page 의 2-19 도 이처럼 코드내부 숫자주석은 없고, 외부 설명에만 숫자가 있어서 `코드내부의 주석숫자`가 빠진 것인지는 불분명함


"교수님이 그동안 연구한 내용들을 정리한 책으로, 조교나 학생들의 적극적으로 의견을 제시하지 못한채, 교수님이 편집 및 마무리 까기도 입김이 강하게 적용된 느낌이 드는 책" 

-----

LISP 개념이란 (109 page) - 118 page 에서 LISP 에 대한 개념설명을 해줌


이처럼 책을 읽다가 막히거나 생경한 개념들이 나오면, 인터넷을 뒤지는 등 우왕 좌왕 하다가 뒤에서 설명이 있는 것을 알게되면 약간은 허탈해 지면서, 이렇게 진도를 나아가는데 불필요한 낭비없이 바로 빠르게 가독성 있는 진행이 가능했을 텐데....

마치 코드내부의 운영 및 객체활용의 효율화 및 개발자 가독성 높이는 것을 설명하는 책에 비하여 책의 구조를 조금 더 효율적으로 재 배치를 한다면 훨씬 독자들의 가독성 및 이해의 효율화를 높이는데 많은 도움이 되어줄 수 있는 요소들이 뒤늦게 발견되어 아쉬운 부분이 많았습니다.

때문에 이 책은 빠르게 전체 내용들을 읽으면서 어렵거나 생소한 개념들을 메모를 하고, 뒷부분에서 위의 예시처럼 해결된 내용들은 제외하고 나머지 이 책으로도 해결되지 않은 개념 및 내용들만 따로 찾아보면서 이해를 하신다면 훨씬 흥미진진하게 내용을 빠르게 이해하실수 있으실 겁니다.



-> 118 page : LISP(클로저)


개념과 관련된 내용 (... 이라도) 들을 앞부분에 잘 정리를 하고

중간에, 본격적으로 이야기 하려는 iterator 에 대하여, for loop 반복문 내용과 비교를 하는 예제코드를 제공했다면 어떠했을 까?


예제를 통해서 비교 분석함으로 써, 저자가 소개하는 내용에 대하여 설득력 및 독자들의 호응을 불러일으키는 실전적인 예제  ex) React TS 를 활용하여, 사람 명단 Object 또는 Array 를 iterator 를 활용한 예제와 비교를 하며, 구체적인 성능에 대한 수치를 비교

비교우위의 내용들을 보다 이해하기 쉽도록 개념 그림들이 중간 중간 추가될 수 있다면 더 좋지 않았을까?

=> 4장 비동기 프로그래밍
- Promise()




이번에 리뷰한 책 제목은 `그림으로 배우는 도커` 입니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="410px" src="{{site.baseurl}}/assets/docker/pic_docker_cover.jpg">
  </p>
  <figcaption>그림으로 배우는 도커 - 표지</figcaption>
</figure>

`Docker` 는 여러번 도입을 시도했지만, 설치 및 설정관련 스크립트를 작성하고 실행하는 방법으로 어느정도 때우며 작업을 진행하고 있었습니다. 이 책을 리뷰하면서 `Docker`의 개념들과 관리방식에 대하여 알 수 있었고 본격적으로 `Docker`를 도입하는 계기가 되었습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="720px" src="{{site.baseurl}}/assets/docker/pic_docker_ubuntu_01.jpg">
  </p>
  <figcaption>docker 의 실행</figcaption>
</figure>

<figure class="align-center">
  <p style="text-align: center">
  <img width="720px" src="{{site.baseurl}}/assets/docker/pic_docker_ubuntu_02.jpg">
  </p>
  <figcaption>docker 의 실행 with Volume</figcaption>
</figure>

위 사진으로 보면서 이게 무슨 내용인지 알겠는데? 되게 자세하게 설명하고 있네? 라는 생각이 드는 분이라면, 빠르게는 하루만에 다 보실 수 있을 것이고, 세부내용 까지 확인하는데는 며칠이면 충분하실 겁니다. 

<br/>

# 책 내용 빠르게 살펴보기
이 책의 제목이 **<span style="color:orange">그림으로 배우는 도커</span>** 인 이유는, 위에서 보이는 것처럼 **<span style="color:orange">실습 내용에 그림으로 보충설명이 자세하게 추가된</span>** 것이 이 책의 가장 큰 특징 입니다.

다른 책들은 `docker`, `docker compose`, `docker desktop` 그리고 `쿠버네티스` 등을 함께 다루고 있어서 설명부분이 빠르게 넘어가는 경우가 대부분 이었습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="720px" src="{{site.baseurl}}/assets/docker/docker_old_book.jpg">
  </p>
  <figcaption>한권으로 배우는 도커 & 쿠버네티스</figcaption>
</figure>


이 책의 가장 큰 장점은 위의 여러가지 내용 중 `$ bash terminal` 환경에서 진행하는 `docker cli` 오직 하나만 집중해서 내용을 다루고 있습니다. 
<figure class="align-center">
  <p style="text-align: center">
  <img width="250px" src="https://dimg.donga.com/wps/NEWS/IMAGE/2019/07/25/96683221.2.jpg">
  </p>
</figure>

다른 책들은 실행내용을 각각 단순하게 설명에 그치고 있지만, 이 책은 **<span style="color:orange">실행 스크립트 세부내용에 대한 설명</span>** 과 함께 **<span style="color:orange">실행 결과값</span>** 에 대해서도 상세하게 설명하고 있습니다. 이 책의 내용만 진행해도 `헷갈리거나 궁금한 개념 및 내용`에 대해서도 특정하기 용이해서, GPT 질문 프롬프트를 작성하는데 많은 도움이 되었습니다.

아래의 2개 사진은 `docker`를 실행할 때 출력되는 내용을 설명한 부분 입니다. 실행 스크립트 결과에 출력되는 내용에 대하여 설명하고 있습니다. 출력된 내용에 대하여 독자들이 놓치지 않고 어떠한 내용이 실행되고 구체적인 메세지를 출력하고 있는지를 바로 알 수 있어서 좋았습니다.
<figure class="align-center">
  <p style="text-align: center">
  <img width="750px" src="{{site.baseurl}}/assets/docker/pic_docker_container_01.jpg">
  </p>
</figure>

<figure class="align-center">
  <p style="text-align: center">
  <img width="750px" src="{{site.baseurl}}/assets/docker/pic_docker_container_02.jpg">
  </p>
</figure>

그리고 앞 부분에서 설명한 내용이라 하더라도, 뒤에서 필요한 내용이라면 반복적으로 표로정리되어 있는 등, 독자들이 책을 뒤척이지 않아도 스스로 정리 가능하게 표로써 다듬어서 정리되어 있었습니다. 그리고 그림으로도 전체적인 흐름을 놓치지 않도록 표와 아랫 그림과 같이 여러가지 방법으로 쉽게 반복 정리를 할 수 있도록 도와주고 있습니다.
<figure class="align-center">
  <p style="text-align: center">
  <img width="750px" src="{{site.baseurl}}/assets/docker/docker_cli_tree.jpg">
  </p>
  <figcaption>docker 명령어 차트</figcaption>
</figure>

개인적으로 헷갈렸던 부분으로, 이것저것 설치하다 보니 중복설치된 부분인지 잘 모르고 헷갈린 부분 중 하나였는데 다음의 내용 입니다.
```bash
$ docker compose version  
Docker Compose version v2.34.0

$ docker-compose --version
Docker Compose version v2.5.0
```

이처럼 **<span style="color:orange">역할이 비슷해서 혼동할만 개념들 - (볼륨 과 바인드)</span>** 이거나, **<span style="color:orange">docker-compose</span>** 의 동일한 내용인데도 이것 저것 설치하다가 보니 중복 설치되어 헷갈렸던 내용 이었습니다. 아래의 내용을 확인한 뒤에 위 2가지의 내용을 명확하게 구분하여 확인할 수 있었습니다. 
<figure class="align-center">
  <p style="text-align: center">
  <img width="750px" src="{{site.baseurl}}/assets/docker/pic_docker_compose.jpg">
  </p>
</figure>

그리고 `docker compose` 내용이 `docker container` 의 연장선으로써 어떠한 특징을 갖는지 다음과 같은 그림으로 설명을 해 주고 있습니다.
<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/docker/pic_docker_compose_tree.jpg">
  </p>
  <figcaption>그림으로 배우는 도커</figcaption>
</figure>

## 아쉬운 점
`docker` 하나에 집중을 하다보니 여러개의 서비스를 `Network` 로 묶어서 연결하는 방법까지는 다루고 있지만 실무에서는 여러개를 묶어서 한꺼번에 설정 및 실행이 가능한 `docker compose` 에 대해서는 한 두 페이지 밖에 다루고 있지 않아서, 실제 활용하는데는 부족함이 많았습니다. 

하지만 이와같은 아쉬운 부분은  [한권으로 배우는 도커 & 쿠버네티스](https://www.hanbit.co.kr/store/books/look.php?p_code=B9392058056) 등 많은 대체제가 있기 때문에 크게 걱정하실 필요는 없습니다. 
<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/docker/pic_docker_books_list.jpg">
  </p>
</figure>

`docker` 에 대하여 다른 책들을 보더라도 많은 분량으로 손대기가 어려워서 주저하고 있는 분들 이라면 `docker` 에 대한 기본기와 주변 개념들에 대하여 빠르게 익히는 데에는 이 책 이외의 대안이 아직은 없기 때문에 초보자 분들에게는 이 책을 적극 추천 합니다.

<br/>

# 마무리
`docker` 가 어려운 이유가 운영체계를 다룬다는 점 입니다. 수식 및 이미지를 다루는 것과는 다르게 보이지 않는 개념과 대상을 다룬다는 것 때문에 무엇이 바뀌는지 명확하게 알기가 어렵습니다.

아래의 그림은 이 책을 읽으면서 제가 개인적으로 정리한 내용으로 `docker` 의 `container`에 대한 개념들과 구성에 대하여 머릿속에 그림을 그리며 개념을 정리할 수 있었던 시간이었습니다. 
<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/docker/docker_ps.jpg">
  </p>
  <figcaption>docker 에서 HOST,IMAGE,CONTAINER 개념에 대한 스케치</figcaption>
</figure>

이 책을 진행하기에도 어려움이 있는 분들이라면 제가 위의 예시로 작성했던 것처럼, 실제와는 다르더라도 본인의 머릿속에 막연하게 떠오르는 내용들을 차근차근 그림으로 그려가면서 정리작업을 진행 하신다면 많은 도움이 되어줄 것입니다.
<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/docker/pic_docker_books.jpg">
  </p>
</figure>
