---
layout: blog
title: (도서) ⚝⚝⚝⚝ 부트캠프 QA편
tags:
- book
---

5년전쯤 부터 **<span style="color:orange">테스트 주도 개발 (TDD)</span>** 이라는 개념을 개발자들에게 유행시키기 위한 노력이 있었습니다. 간단하게 요약하면 테스트 작업 자체가 불필요한 과정이 아니고, 오히려 더 효과적인 개발코드를 설계하는데 도움이 되는 과정이라는 내용 이었습니다.

하지만 이러한 노력은 크게 반응을 얻지 못했습니다. 실제 개발 작업은 해당 개발언어에서 기능을 구현하는 패키지의 기본문서를 참고하여 시실과 날실로 엮어 나아가는 방식으로 작업을 진행합니다. 때문에 개발하는 대부분의 과정을 살펴보면, 기본 문서의 내용을 참고하여 `Ctrl + C` + `Ctrl +V` 하는 방식으로 진행 합니다. 그리고 문서 그대로 작업을 했음에도 오류가 발생하세 되면, 오류내용을 근거로 어떠한 내용으로 문제가 발생하게 되었는지를 알기위해 고급 단위의 코드내용을 살펴보면서 문제를 해결하는 방식 입니다.

이처럼 문제가 발생하면 연관된 패키지 내부까지 살펴 봐야되서 많은 노력을 필요로 하게 되는데, TDD는 문제가 발생하지 않은 부분 까지도 앞에서 설명한 고급단위의 소스코드를 살펴보고, 이를 근거로 테스트를 진행하는 작업용 코드까지 작성을 해야 합니다. 

이처럼 필요는 하지만, 가까히 활용하기에는 장벽이 많았던 QA와 관련한 책이 새로나왔다고 하여, 신청 및 리뷰를 진행하게 되었습니다.

<br/>

# 총평
**테스트 주도 개발** 관련한 도서들이 개발자의 **기능 테스트** 부분에 제한되어 설명을 하고 있다면, 이 책은 **부트캠프** 라는 부제와 어울리는 **<span style="color:orange">소프트 웨어</span>** 전반에 걸쳐서 **테스트** 와 연관된 개념 및 실무 내용을 다루고 있었습니다. 덕분에 소프트 웨어 기획 개발 및 운영 단계에서 어떻게 테스트 내용을 다루는지 알 수 있었습니다.

아래의 이미지는 271 페이지에 삽입된 이미지로 소프트웨어(서비스) 개발 전체에 어떻게 테스트 관련 내용을 다루고 있는지를 압축적으로 설명한 이미지 입니다. 아래의 내용만 살펴보는 것만으로도 이 책의 전반적인 내용 및 구성을 통해 어떤 내용을 전달하려고 하는지 아실 수 있으실 겁니다

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/fullstack/qa-01.jpg">
  <figcaption>271 페이지</figcaption>
  </p>
</figure>

<br/>

# 아쉬운 점
소프트 웨어 테스트를 실습하는데 도움이 되는 템플릿을 제공해 줬다면, 일종의 실습과정이 추가 되었다면 더 좋았겠다는 생각이 들었습니다. 289페이지 **<span style="color:orange">4주차 : 실정 소프트웨어 테스팅</span>** 부분이 이러한 아쉬움을 조금은 보완해 주고 있지만 이 부분마저도 설명으로 대부분이 설명으로 채워져 있었습니다. 

챕터 단위의 실습 내용은 충실하게 다뤄지고 있습니다. 향후에는 `간단한 개인 블로그` 등의 미니프로젝트를 대상으로  `소프트웨어 / 서비스의 전반적인 테스트` 관련한 `실무 템플릿` 예시를 함께 제공을 해 주신다면 개발자 및 테스트 관련업종 취업 준비생 분들에게 더 많은 도움이 되어줄 것으로 기대 됩니다.

<br/>

# [세미나 후기]({{site.baseurl}}/assets/download/hanbit_QA.pdf)
2024년 7월 13일 토요일 오전에 진행되었던 이 책의 저자분 세미나에 참석할 수 있었습니다. 향후 8월달에는 한빛미디어 홈페이지를 통해서 해당 동영상을 보실수 있을것으로 안내를 받았습니다.

혹시 관심있으신 분이라면 동영상도 꼭 한번 보시길 추천합니다. 세미나 내용도 내용이지만 서비스 관련 테스트를 진행하는 분이라면 어떠한 성격 및 자세를 갖고 일을해야 높은 위치에 오를 수 있는지를 엿볼 수 있는 기회 였습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/fullstack/qa_seminar_live.jpg">
  </p>
</figure>

저자분의 세미나를 보면서 떠오른 이미지는 엄청나게 비싼 F1 레이싱 팀의 메카닉 팀장님을 보는 듯 했습니다. 무척 바쁘게 돌아가는 상황 속에서 어떠한 고난과 역경이 본인을 힘들게 하더라도, 폭풍우 속의 등대처럼 굳건하게 자리를 지키며 모든것을 살피며 문제를 해결해 나아가는 든든함이 해당 직종의 중요한 자질이겠구나 하는 생각이 들었습니다.

그리고 세미나와 질의응답을 통해서, AI의 발전과 관련하여 테스트 관련 직업 종사자의 생각을 들을 수 있었는데, 2024년 현재 까지도 상당 부분이 테스트 업무 종사자 본인의 직감과 자신만의 템플릿 관리, 그리고 연관되는 타 부서의 관계자와의 직접적인 커뮤니케이션을 통해서 업무가 이루어 지고 있다는 느낌을 받을 수 있었습니다. 

때문인지 Jira 또는 Workflow 프로세스와 같이, 업무와 관련된 정형화된 소프트웨어 테스트 도구가 아직 없다는 점을 알 수 있었는데, 한편으로는 아쉬운 부분 이자, 다른 한편으로는 지금현재 새로운 비지니스를 준비하시는 분들에게는 좋은 재료로써 활용 가능하겠다는 생각도 들었던 시간이었습니다. 이 책을 구매했지만 바빠서 전체를 읽지 못하신 분들이거나, 또는 이 책에 관련된 내용이 궁금한 분들이라면 세미나 동영상을 보시는 것을 추천 합니다.

※ 본 리뷰는 IT 현업개발자가, 한빛미디어 책을 제공받아 작성한 서평입니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/book/QA_bootcamp.jpg">
  <figcaption></figcaption>
  </p>
</figure>