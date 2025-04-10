---
layout: blog
title: (도서) ⚝⚝⚝⚝ 그림으로 배우는 도커
tags:
- book
---

**IT 현업개발자가, 별도의 광고료 없이 한빛미디어의 책만 제공받아서 작성한 서평입니다.**

개인적으로 `Ubuntu` 작업 환경을 좋아합니다. 우분투의 개념 특성상 해당 환경에서 활용가능한 MIT 라이센스의 무료 소프트웨어가 많다는 것 입니다. 그리고 가장 큰 장점은 적은 자원으로도 동일한 또는 보다 효과적인 작업환경의 구축이 가능하다는 점 입니다.


개인적으로 `Ubuntu` 작업 환경을 좋아합니다. 우분투의 개념 특성상 해당 환경에서 활용가능한 MIT 라이센스의 무료 소프트웨어가 많다는 것 입니다. 그리고 가장 큰 장점은 적은 자원으로도 동일한 또는 보다 효과적인 작업환경의 구축이 가능하다는 점 입니다.

개발 서버들은 대체로 무료인 우분투 환경에서 실행하는 경우가 대부분이여서, 그냥 서버설치 및 개발환경 구축 `Bash Script`를 잘 정리해 놓으면 별도의 부가적인 내용 없이 하나의 텍스트 파일 하나로 모든 설치과정을 다 해결할 수 있어서 별도의 `Docker`에 대해서는 좋긴한데 귀찮아서 계속 미루기만 하던 상황이었습니다.

그러던 중 올해들어서 `Docker` 와 관련하여 꼭 내용들을 익혀야 겠다는 사건(?)이 발생 했습니다. 그것은 운영체게 소프트웨어들을 업데이트 하는 `$ sudo apt update && sudo apt upgrade` 를 굳이 필요하지 않음에도 실행하여 진행하던 중, 옵션선택 하나를 잘못하는 바람에 `안전부팅영역`이 문제가 발생하였고 이로써 그동안 잘 사용중이던 서버가 재부팅을 해도 기본 환경에 진입을 하지 못하고 `운영체제 복구환경` 만 가능하게 되었고, 해당 원인을 찾는 것 보다는 자료들을 백업하고 재설치가 그나마 빠르겠다는 결단속에 어쩔 수 없이 서버를 전체 삭제한 뒤 재설치 과정을 몆주동안 진행하게 되었습니다.

그나마 개인 장난감 서버였기에 망정이지, 타인의 실제 운영중인 서버였다면 정말 아찔한 상황이 벌어질 수 도 있었던 내용이었습니다. <strike>물론 개인용 장난감 서버라서 무리한 업데이트도 진행 가능했던 이유이기도 합니다.</strike> 

그렇다면 왜 Docker 가 이러한 문제점에 대비 가능한지를 설명하는 내용으로 책 내용을 살펴보기 시작해 보겠습니다. 아랫 사진은 이번에 리뷰하게 된 `그림으로 배우는 도커` 의 25페이지 입니다. 참고로 사진속 개별 파이썬, 도커 등의 아이콘 이미지는 책 원본 내용이 아닌 개인적으로 이해를 돕기 위해서 추가한 내용입니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/docker/pic_docker_01.jpg">
  </p>
  <figcaption>도커가 필요한 이유 (개별 아이콘은 개인적으로 보완하였습니다 - 25 page)</figcaption>
</figure>

195 페이지 202 페이지 등 뒷부분은 이렇게 적용되어 있음


윈도우 환경속 게임 플레이를 비유적으로 설명하자면, RTX 그래픽 카드가 설치된 x86 CPU가 장착된 PC 위에서 `사이버펑크 2077` 및 `GTA 5` 게임 설치 플레이를 하고 있었습니다. 그러던 중 `사이버펑크 2077`에서 최신 업데이트가 올라와서 설치 실행했는데, 기대했던 것 보다 문제들이 해결되지 않고 있었고 RTX의 여러 기능들이 정상적으로 작동하지 않는것을 확인하게 되었습니다. 때문에 윈도우 설정 및 그래픽카드와 관련된 이런 저런 내용들을 만지다가, 작업자의 실수로 윈도우 블루스크린이 뜨는 바람에 이도 저도 못하는 상황이 발생하였습니다. 만약에 `Docker` 에서 이러한 게임환경을 각각 관리할 수 있었다면 <strike>실제로는 불가능 하지만</strike> 위와같은 문제가 발생했을 때 `사이버펑크 2077`만 실행이 안될 뿐, `GAT 5` 를 플레이 하는데는 전혀 아무문제 없이 실행가능 했었다.... 라는 내용 입니다.

`Docker` 와 관련된 책들의 내용들에 대하여 검색할 정도의 분들이라면, 어떠한 기능을 하는지 그리고 기본적인 원리정도는 아시는 분들이 대부분 일거라고 생각합니다. 기본개념 및 원리에 대하여 간단하게 살펴봤다면 이러한 기본개념 위에서 본문의 내용들을 함께 살펴보도록 하겠습니다.

# 내용 살펴보기
일본 번역서이다 보니, 일본에서 개발된 `Ruby` 개발언어를 중심에 두고서 설명들이 진행됩니다. 이 부분만 유념한 채 내용들을 따라가시면 될 것입니다. 

이 책은 **일본책 번역서** 들의 특징을 갖고 있는데 **단계적으로 내용들을 살펴보는 방식으로 내용이 구성**되어 있습니다. 그리고 각 장의 챕터들일 10페이지 내외로 매우 짧게 나뉘어 있습니다. 따라서 한 번 내용을 살펴본 뒤에는, 필요한 내용을 빠르게 살펴보기에 적합하도록 구성되어 있습니다.

292 page (앞에 비슷한 내용 있음) - 340 페이지 

그리고 앞 부분에서 설명된 내용이라도 뒷부분에서 필요한 내용이라면 표로써 반복적으로 내용을 다뤄주고 있습니다. 덕분에 내용 중 기억이 잘 안나는 부분이 있더라도 계속적으로 내용들을 이해하기 수월했습니다.

정리한 내용 속에는 앞부분에 언급되어반복적으로 설명을 하고 있는 부분이 이 책의 장점입니다.

341 page

그리고 docker-compose 를 사용할 때 해당 버젼들이 새롭게 개선되면서 실행에 변경된 내용들을 다뤄주고 있었는데, ㅓㅑ헷갈릴 수 있는 부분으로, 버젼과 관련하여 변경된 내용들도 다뤄주고 있어서 많은 도움이 되었습니다.




너무 초보적인 내용 때문에 실제 사용하는 내용에 대하여 개략적인 

P 80 ~ p 81
필요할 때 어떤 내용을 확인해야 하는지 개념을 알기에 좋은 예




# 추가
그림으로 설명하는 Docker 인 만큼, 그림이 많은것이 장점입니다. 한가지 보완되었으면 하는 부분은 각각의 다른개념 및 각각의 개발언어들이 동일한 도형으로 설명을 하고 있어서, 개념들에 대한 정의가 아직 명확하지 않은 초보자 분들에게는 헷갈릴 수도 있겠다는 생각이 들었습니다. 때문에 각각의 개념 및 개발언어를 설명하는 그림의 도형들 앞에 아래의 예시와 같은 `개별 아이콘`을 적용 한다면 훨씬 더 초보자 분들이 보기에 더 좋겠다는 생각이 들었습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="https://img.freepik.com/free-vector/20-programming-coding-line-icon-pack-like-develop-coding-development-programming-develop_1142-24370.jpg">
  <figcaption> 아이콘 예제들</figcaption>
  </p>
</figure>


<figure class="align-center">
  <p style="text-align: center">
  <a href="https://www.analyticsvidhya.com/blog/2019/06/understanding-transformers-nlp-state-of-the-art-models/">
  <img width="510px" src="https://miro.medium.com/v2/resize:fit:2000/1*iy12bH-FiUNOy9-0bULgSg.png">
  <figcaption> - How do Transformers Work in NLP? A Guide to the Latest State-of-the-Art Models</figcaption>
  </a>
  </p>
</figure>

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/nlp/nlp_llm_guide_02.jpg">
  <!-- <figcaption>자연어 처리와 관련한 책들</figcaption> -->
  </p>
</figure>


<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/nlp/nlp_llm_guide_cover.jpg">
  </p>
</figure>

※ 본 리뷰는 IT 현업개발자가, 한빛미디어 책을 제공받아 작성한 서평입니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/nlp/nlp_llm_guide_cover.jpg">
  </p>
</figure>
