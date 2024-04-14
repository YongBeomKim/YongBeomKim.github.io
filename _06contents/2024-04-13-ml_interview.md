---
layout: blog
title: (도서) ⚝⚝⚝ 인사이드 머신러닝 인터뷰
tags:
- book
---

이 책은 [Inside the Machine Learning Interview: 151 Real Questions from FAANG and How to Answer](https://www.amazon.com/Inside-Machine-Learning-Interview-Questions/dp/B0C4MVRHQD/ref=sr_1_1?crid=3UDOHRD2TBLD7&dib=eyJ2IjoiMSJ9.wJ4VuxAxNx6QFbV1ix7eP_YlU92ofTaLBGbYTBIuRtJNy1uFGOQG0Ctg7SVAsTKZZs4eOL4BRx4sxyk6cqsqmJb-UhuU3JSq3UJYgrrJa5uioABODh2oWwUAOOwTipduSs18LiqS7UoZ9qht_6zb7sBMe8BbW5La893Cr27g-H9a9VoPm2Zs7NzX13BaUz6nuvUT7G6aUp8YITKj08Zzjc-hwa_4dGDl3dz-1Z6I8O4.-93bDSdTX6hw1i5mQcQ3R2Ti7L2TCjGY4qiDDruNrOI&dib_tag=se&keywords=Peng+Shao&qid=1713089069&s=books&sprefix=peng+shao%2Cstripbooks-intl-ship%2C291&sr=1-1) `23년 5월` 에 출간된 원서를 번역한 책으로 입니다. 

책 제목은 `머신러닝` 이지만, `딥러닝` 의 최신 기술인 `대형 언어 모델(Large Language Models, LLM)` 까지도 커버하는 책 입니다. 

4장의 `ML 시스템 설계` 부분 전체가 `추천 알고리즘`과 관련한 내용을 다루고 있었습니다, 저자가 `Twitter (현재 X)` 개발자 였던만큼 머신러닝과 관련된 내용에서는 `추천 알고리즘`에 대하여 다른 책들보다 더 상세한 내용들을 다루고 있었습니다.

<br/>

# 총평
인공지능을 이미 공부한 개발자를 위한 책으로, 독자들이 `면접 인터뷰 내용을 경험`할 수 있도록 질문들과 해당 질문에 관련한 `답변을 하는데 필요한 개념들` 을 설명하는 책 입니다. `Bert` 학습 데이터 처럼 질문과 답의 관련성을 중심으로 책을 구성했기 때문에 앞장에서는 기본개념을, 뒷이어 해당 개념의 응용을 설명하는 일반적인 Tutorial 도서를 기대했던 분들에게는 약간은 어려울 수 있어 보였습니다.

머신러닝 딥러닝을 어느정도 공부한 분들을 대상으로 실제 `인터뷰의 질의응답` 에 중점을 두고 책이 구성된 만큼 이러한 저자의 의도를 이해하며 책을 읽어나간다면 많은 도움이 될 것입니다.

<br/>

# 장점
이 책의 최대장점은 앞에서 설명한 것처럼 회사에서 예상되는 질문들을 미리 확인할 수 있다는 것 입니다. 질문의 갯수도 194개로 상당히 많은 내용을 다루고 있습니다.

ML 작업 단계별로 질문과 관련 답변에 필요한 내용들을 정리해 두고 있어서, 해당 질문이 어떤 작업에 관련된 것인지를 쉽게 확인할 수 있도록 정리가 되어 있었습니다. 부록에서 딥러닝 최신 기술인 `Attention` 및 `LLM` 까지도 다루고 있는만큼 머신러닝 및 딥러닝 관련된 모든 내용을 총 망라하고 있었습니다.

* 2장 ML기본지식
* 3장 ML코딩
* 4장 ML 시스템 설계1 - 추천 시스템
* 5장 ML 시스템 설계2 - 응용
* 6장 ML 인프라 설계
* 7장 고급 ML 문제
* 부록 생성모델 : 노이니 채널 모델에서 LLM 까지

<br/>

# 아쉬운 점
2가지가 보완이 되었으면 좋겠다는 생각이 들었습니다.

첫번째는 글 설명으로만 구성되어 있다는 점입니다.

책이 얇게 구성되다 보니 아쉬운 점인데 설명내용 대부분이 글로써 설명하는 내용으로 구성되고 있었습니다. `신경망의 활성화 함수들을 설명하시오 (61p)` 같은 경우에는 딥러닝 활성화 함수 여러가지를 나열하여 설명하고 있는 페이지에서 이들을 비교하는 표 내용이 추가 되었다면 보다 명확하게 이해하는데 도움이 될 것으로 생각됩니다.

이 책으로 스터디를 진행하실 분들이라면 답변내용들을 정리하면서 아래의 예시처럼 표로된 내용들을 찾아보거나, 없으면 스스로 정리를 하면서 진행한다면 많은 도움이 될 수 있을 것입니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="[{{site.baseurl}}/assets/ml/nlp_subtitle.jpg](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*uyTgQn76Bubw6TRh)">
  </p>
</figure>

두번째 내용은 소제목에 영어원어를 함께 병행하여 표시를 해줬으면 하는 것입니다.

아래 사진은 `5장 ML 설계 편의 자연어 이해` 와 관련된 내용인데 소제목으로 `의도분류, 정보추출, 엔터티 해결` 이 3가지를 다루고 있습니다. 

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/ml/nlp_subtitle.jpg">
  <figcaption>자연어 이해관련 질의응답 (211 P)</figcaption>
  </p>
</figure>

해당 페이지에서 언급하고 있는 `nlp 의도분류`, `nlp 정보추출` 를 구글에서 검색하면 관련 내용의 상세개념 설명 문서들과 원어 내용을 바로 찾을 수 있었습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/ml/nlp_subtitle-01.png">
  <figcaption>nlp 의도분류 검색결과</figcaption>
  </p>
</figure>

반면 `nlp 엔터티 해결` 을 검색하면 일치하는 단어가 포함된 문서를 찾지 못한채 `개체명 인식` 관련 문서를 상위에서 찾아줍니다. 

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/ml/nlp_subtitle-02.png">
  <figcaption>nlp 의도분류 검색결과</figcaption>
  </p>
</figure>

책의 상세 설명에 적혀있는 `추출한 개채명을 ~ 매핑하는 프로세스` 를 참고하 보면 `개체명 인식 NER(Named Entity Recognition)` 과 유사한 내용일 것으로 추측은 가능하지만 명확하게 일치하는 단어를 포함하는 문서를 찾지 못하는 문제가 있었습니다. 2쇄 또는 개정판 에서는 제목에 해당되는 부분 만큼원 원서에 적혀진 단어를 함께 확인할 수 있다면 더 좋은 책이 되어줄 것으로 생각 됩니다.

<br/>

# 마무리 
머신러닝 딥러닝을 공부했거나 현재 공부를 진행중에 있는 분들에게는, 책에 나열된 질문들을 스스로에게 던져보고 해당 질문에 대한 답변들을 스스로 연습한 뒤, 책 내용과 맞춰보면서 부족했던 부분 보완할 부분 또는 강화할 부분을 발견하는데 훌륭한 길라잡이가 되어 줄 것입니다.

※ 본 리뷰는 IT 현업개발자가, 한빛미디어 책을 제공받아 작성한 서평입니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="https://contents.kyobobook.co.kr/prvw/004/223/32/5800012422332/5800012422332001.jpg">
  <figcaption>인사이드 머신러닝 인터뷰</figcaption>
  </p>
</figure>


