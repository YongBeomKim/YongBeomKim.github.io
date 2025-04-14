---
layout: blog
title: (도서) ⚝⚝⚝⚝ 그림으로 배우는 도커
tags:
- book
---

**IT 현업개발자가, 별도의 광고료 없이 한빛미디어의 책만 제공받아서 작성한 서평입니다.**

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
`docker` 하나에 집중을 하다보니, 실전에서 활용하고 있는 `docker compose` 까지 활용하시는데는 부족함이 있습니다.
이처럼 아쉬운 부분은  [한권으로 배우는 도커 & 쿠버네티스](https://www.hanbit.co.kr/store/books/look.php?p_code=B9392058056) 등 많은 대체제가 있기 때문에 크게 걱정하실 필요는 없습니다. 

오히려 `docker` 에 대하여 어려워서 도입을 주저하고 있는 분들에게는 `docker` 의 기본기를 빠르게 익히기에는 이만한 도서는 없다고 생각 합니다.
<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/docker/pic_docker_books_list.jpg">
  </p>
</figure>

<br/>

# 마무리
`docker` 가 어려운 이유가 운영체계를 다룬다는 점 입니다. 수식 및 이미지를 다루는 것과는 다르게 보이지 않는 개념과 대상을 다룬다는 것 때문에 무엇이 바뀌는지 명확하게 알기 어렵다는 점 입니다. 아래의 내용은 이 책을 읽으면서 개인적으로 정리한 내용으로 `docker` 의 `container`에 대한 개념들과 구성에 대하여 머릿속에 그림을 그리며 개념을 정리할 수 있었던 시간이었습니다. 
<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/docker/docker_ps.jpg">
  </p>
  <figcaption>docker 에서 HOST,IMAGE,CONTAINER 개념에 대한 스케치</figcaption>
</figure>

이 책이 조금 어려운 분들이라면 제가 작성했던 스케치 처럼 막연하게 떠오르는 내용들을 차근차근 그림으로 그려가면서 정리를 해 나아가신다면 많은 도움이 되어줄 것입니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/docker/pic_docker_books.jpg">
  </p>
</figure>
