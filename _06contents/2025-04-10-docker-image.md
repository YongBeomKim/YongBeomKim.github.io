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
  <img width="510px" src="{{site.baseurl}}/assets/docker/pic_docker_cover.jpg">
  </p>
  <figcaption>그림으로 배우는 도커 - 표지</figcaption>
</figure>

`Docker` 에 대한 선입견은, 1. 다수의 컨테이너 운영으로 불필요한 리소스를 추가로 요구할 것이다, 2. 도커 이미지 파일을 필요로 해서 저장소 용량을 많이 필요로 한다, 3. 컨테이너 연결이 복잡할 것이고 개별 컨테이너의 오류와 함께 도커의 연결 내용까지 알야아 할게 너무 많아서 작업이 어려울 것이다. 였습니다.

때문에 지금까지 `Ubuntu 22` 에서 직접 설치와 설정 및 연결 과정을 진행하는 것이, 각각 직접 대응하는 것이 더 쉽겠다는 생각을 하면서 `설치 및 관리 스크립트` 를 잘 정리하는 것으로 작업은 진행해 왔습니다.

## Docker 를 도입하게 된 계기
`Ubuntu 22` 서버를 최신버젼 업데이트 실행했고, 과정 중 설정을 잘못 누르는 바람에 <strike>시스템 설정 강제 업데이트를 실행 했습니다</strike> 부팅영역에 문제가 발생했습니다. 개인서버라서 너무 많은 패키지들이 설치되어 있어서 있었고 차라리 재설치를 진행하는게 훨씬 효과적 이겠다는 판단위에 재설치를 진행 했습니다.

그동안 `우분투 설치 스크립트`로 작업을 진행하면서도, 몇몇 설정파일은 수동으로 설정하는 과정들이 빠질 수 없었고 이러한 과정들이 귀찮게 느껴지던 중 이번에 발생한 사를 격으면서 이번 책을 리뷰한 책을 통해서 `Docker`를 직업 활용하는 계기가 되었습니다.

<br/>

# 책 내용 빠르게 살펴보기
왜 Docker 가 효율적으로 시스템을 운영 가능한지 설명하는 내용으로 `그림으로 배우는 도커` 의 25페이지 입니다. 참고로 사진속 개별 파이썬, 도커 등의 아이콘 이미지는 책 원본 내용이 아닌 개인적으로 이해를 돕기 위해서 추가한 내용입니다.
<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/docker/pic_docker_01.jpg">
  </p>
  <figcaption>도커가 필요한 이유 (개별 아이콘은 개인적으로 보완하였습니다 - 25 page)</figcaption>
</figure>

다른 책들은 `Docker Desktop` 및 `쿠버네티스` 등을 함께 다루고 있는것에 비해, 이 책은 `$ bash terminal` 환경에서 진행하는 `docker cli` 오직 하나만 집중해서 내용을 다루고 있습니다. `Docker` 와 `Docker Compose` 에 모든 내용을 집중하고 있습니다.
<figure class="align-center">
  <p style="text-align: center">
  <img width="380px" src="https://dimg.donga.com/wps/NEWS/IMAGE/2019/07/25/96683221.2.jpg">
  </p>
</figure>

다른 책들은 실행 스크립트의 설명에 그치지만, 이 책은 `실행 스크립트에 대한 설명`과 함께 `실행 결과값`에 대해서요 상세하게 설명하고 있습니다. 이 책의 내용만 진행해도 `헷갈리거나 궁금한 부분`을 명확하게 특정할 수 있어서 GPT 질문 프롬프트를 어떻게 작성하면 되는지 정리할 수 있었습니다.

> 172 페이지 사진 첨부하기>

그리고 내용으로 설명한 내용들을 반복적으로 독자들이 정리할 수 있도록 표로써 다듬어서 정리를 하고 있고, 또한 그림으로 전체적인 흐름을 놓치지 않도록 표와 아랫 그림과 같이 여러가지 방법으로 반복 정리를 할 수 있도록 도와주고 있습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/docker/docker_cli_tree.jpg">
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

같은 내용인데 어떻게 다른지 잘 몰라서 헷갈렸던 부분 이었습니다. 이러한 의문을 책의 다음 내용을 보고서 명확하게 정리할 수 있었습니다. 
<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/docker/pic_docker_compose.jpg">
  </p>
  <figcaption>그림으로 배우는 도커</figcaption>
</figure>

그리고 `docker compose` 내용이 `docker container` 의 연장선으로써 어떠한 특징을 갖는지 다음과 같은 그림으로 설명을 해 주고 있습니다.
<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/docker/pic_docker_compose_tree.jpg">
  </p>
  <figcaption>그림으로 배우는 도커</figcaption>
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

이 책이 조금 어려운 분들이라면 위의 예시처럼 막연하게 떠오르는 내용들을 차근차근 그림으로 그려가면서 정리를 해 나아가신다면 많은 도움이 되어줄 것입니다.

## 아쉬운 점
일본의 책을 번역한 내용이라서 그런지 `Ruby`를 주요한 언어로 다루고 있습니다. [Most popular technologies](https://survey.stackoverflow.co/2024/technology) 에서도 5% 정도만 나올 정도로 마이너한 언어 입니다. 향후에는 조금 더 대중적인 언어와 예시를 내용으로 다루면 더 좋겠다는 생각이 들었습니다.

이처럼 아쉬운 부분은 이 책으로 `docker container` 의 기본기를 몇번 익히고 나서, [한권으로 배우는 도커 & 쿠버네티스](https://www.hanbit.co.kr/store/books/look.php?p_code=B9392058056) 에서 반복되는 부분은 빠르게 훝은 뒤 부족한 부분들을 이 책으로 보완 할 수 있었습니다. 

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/docker/pic_docker_books_list.jpg">
  </p>
</figure>

<br/>

# 추천대상
`docker` 에 대하여 들어보신 분, `docker desktop` 에서 제공하는 UI를 조작하는 것 보다는 `terminal cli` 환경에서 `docker` 를 실행하면서 내용을 익히려는 분들에게 이 책을 추천 합니다. `docker desktop` 을 실행가능한 환경이 `enterprise` 유료버젼에서만 가능하게 바뀌었기 때문에 무료로 `docker`를 다루려는 분들이라면 이 책으로 기본기를 탄탄하게 정리를 하시면 충분할 것입니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/docker/pic_docker_books.jpg">
  </p>
</figure>
