---
layout: blog
title: (도서) ⚝⚝⚝ 인사이드 머신러닝 인터뷰
tags:
- book
---

이 책은 [Inside the Machine Learning Interview: 151 Real Questions from FAANG and How to Answer](https://www.amazon.com/Inside-Machine-Learning-Interview-Questions/dp/B0C4MVRHQD/ref=sr_1_1?crid=3UDOHRD2TBLD7&dib=eyJ2IjoiMSJ9.wJ4VuxAxNx6QFbV1ix7eP_YlU92ofTaLBGbYTBIuRtJNy1uFGOQG0Ctg7SVAsTKZZs4eOL4BRx4sxyk6cqsqmJb-UhuU3JSq3UJYgrrJa5uioABODh2oWwUAOOwTipduSs18LiqS7UoZ9qht_6zb7sBMe8BbW5La893Cr27g-H9a9VoPm2Zs7NzX13BaUz6nuvUT7G6aUp8YITKj08Zzjc-hwa_4dGDl3dz-1Z6I8O4.-93bDSdTX6hw1i5mQcQ3R2Ti7L2TCjGY4qiDDruNrOI&dib_tag=se&keywords=Peng+Shao&qid=1713089069&s=books&sprefix=peng+shao%2Cstripbooks-intl-ship%2C291&sr=1-1) `23년 5월` 에 출간된 원서를 번역한 책으로 입니다. 책 제목은 `머신러닝` 으로 적혀 있지만, `딥러닝` 최신 기술인 **<span style="color:orange">대형 언어 모델(Large Language Models, LLM)</span>** 까지 다루고 있었습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/ml/llm_tranform.jpg">
  </p>
</figure>

이 책의 가장 강점인 챕터를 골라본다면 **<span style="color:orange">4장 ML 시스템 설계</span>** 입니다. 가장 많은 분량을 차지하고 있는 부분으로 해당챕터 전체가 **<span style="color:orange">추천 알고리즘</span>** 내용으로 가득 채워져 있었습니다. IT 서비스 대부분이 사용자 특성에 맞춰서 서비스를 하는 것이 주요목적인 만큼 추천알고리즘 부분은 중요도에 비해, **데이터 분석 알고리즘** 과 비해서는 상대적으로 소홀하게 다뤄지고 있는것이 파이썬 책들의 공통적인 특징입니다. 

이 책은 저자가 `Twitter (현재 X)` 개발자 출신인 장점이 그대로 녹아 있는 책 입니다.  실제 작업을 하면서 **<span style="color:orange">추천 알고리즘</span>** 을 정리한 내용들을 볼 수 있다는 점에 있어서 강점이 두드러진 책 입니다.

<br/>

# 총평
이 책의 전체적인 구성은 **<span style="color:orange">독자들이 면접 인터뷰 상황을 경험</span>** 할 수 있도록 **<span style="color:orange">예상되는 질문들</span>** 과 **<span style="color:orange">해당 질문에 관련한 답변을 하는데 필요한 개념들을 질문 단위로 묶어서</span>** 설명하는 책 입니다. 

마치 LLM 학습모델 중 **<span style="color:orange">Bert</span>** 학습을 위한 데이터 처럼 질문과 답의 관련성을 중심으로 책을 구성했기 때문에, 관련된 내용들을 어느정도 이해하고 있는 독자들을 대상으로 실제 인터뷰에 응하기 전에 빠르게 관련내용들을 확인 및 점검하기 위한 책 입니다. 이러한 특징으로 인하여 초보자 분들에게는 약간은 어려울 수 있어 보이는 구성의 책 입니다.

한편으로는 이와같은 특징을 이해하신다면 **<span style="color:orange">개발자 인터뷰의 질의응답</span>** 에 중점을 두고 책이 구성된 만큼 이러한 저자의 의도를 이해하며 책을 읽어나간다면 많은 도움이 될 것입니다.

<br/>

# 장점
이 책의 최대장점은 위에서 설명한 것처럼 **<span style="color:orange">회사에서 예상되는 질문들을 미리 확인할 수 있다는 것</span>** 입니다. 질문의 갯수도 194개로 구성되어 있어서 상당히 많은 내용을 다루고 있습니다.

**<span style="color:orange">ML 작업 단계별</span>** 로 질문과 관련 답변에 필요한 내용들을 정리되어 있어서, **<span style="color:orange">해당 질문이 어떤 작업에 관련된 것인지</span>** 를 쉽게 확인할 수 있었습니다. 부록에서 딥러닝 최신 기술인 `Attention` 및 `LLM` 까지도 다루고 있는만큼 머신러닝 및 딥러닝 관련된 모든 내용을 총 망라하고 있었습니다.

* 2장 ML기본지식
* 3장 ML코딩
* 4장 ML 시스템 설계1 - 추천 시스템
* 5장 ML 시스템 설계2 - 응용
* 6장 ML 인프라 설계
* 7장 고급 ML 문제
* 부록 생성모델 : 노이니 채널 모델에서 LLM 까지

<br/>

# 아쉬운 점
책이 얇게 구성되다 보니 아쉬운 부분인데 **<span style="color:orange">설명내용 대부분이 서술형 글</span>** 로만 구성되어 있었습니다. **<span style="color:orange">신경망의 활성화 함수들을 설명하시오 (61p)</span>** 같은 경우에는 딥러닝 활성화 함수 여러가지를 나열하여 설명하고 있는데, 해당 페이지에서 이들의 특징을 비교하는 표 내용이 추가 되었다면 보다 객관적이면서 빠르게 비교 및 이해할수 있어보였습니다. 아마도 이 책 자체가 빠르게 전반적인 내용들을 훝어볼 수 있도록 구성되어 있는만큼 부수적인 내용들을 최소화 되어 보였습니다.

때문에 이 책으로 스터디를 진행하실 분들이라면 해당 질문에 대한 답변내용들을 준비하면서 아래의 예시처럼 표로된 내용들을 찾아보거나, 없으면 스스로 정리를 하면서 진행한다면 많은 도움이 될 수 있을 것입니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="https://miro.medium.com/v2/resize:fit:1400/format:webp/0*uyTgQn76Bubw6TRh">
  </p>
</figure>

두번째 아쉬운 부분은 개정판에서는 반영해 주었으면 하는 부분인데 **<span style="color:orange">소제목에 해당되는 개념들 만큼은 영어원어를 함께 병행</span>** 하여 표시를 해줬으면 하는 것입니다.

아래 사진은 `5장 ML 설계 편의 자연어 이해` 와 관련된 내용인데 소제목으로 **<span style="color:orange">의도분류, 정보추출, 엔터티 해결</span>** 이 3가지를 다루고 있습니다. 다른 부분들은 용어의 혼동이 적어서 그나마 다행이었는데 아랫 사진의 **<span style="color:red">엔터티 해결</span>** 부분은 책만 읽을 때에는 저의 지식이 부족한 부분도 크겠지만 잘 이해가 되지 않았습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/ml/nlp_subtitle.jpg">
  <figcaption>자연어 이해관련 질의응답 (211 P)</figcaption>
  </p>
</figure>

나머지 **<span style="color:orange">nlp 의도분류, nlp 정보추출</span>** 개념은 구글에서 검색하면 관련 내용의 상세개념 설명 문서들과 원어 내용을 바로 찾을 수 있었습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/ml/nlp_subtitle-01.png">
  <figcaption>nlp 의도분류 검색결과</figcaption>
  </p>
</figure>

반면 **<span style="color:red">nlp 엔터티 해결</span>** 을 검색하면 일치하는 단어가 포함된 문서를 찾지 못한채 **<span style="color:orange">개체명 인식</span>** 관련 문서를 상위에서 찾아줍니다. 

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/ml/nlp_subtitle-02.png">
  <figcaption>nlp 의도분류 검색결과</figcaption>
  </p>
</figure>

책의 상세 설명에 적혀있는 **<span style="color:orange">추출한 개채명을 ~ 매핑하는 프로세스</span>** 를 참고하 보면 **<span style="color:orange">개체명 인식 NER(Named Entity Recognition)</span>** 과 유사한 내용일 것으로 추측은 가능했지만 명확하게 일치하는 단어를 포함하는 문서를 찾지 못하여 발생한 약간의 혼돈의 문제가 있었습니다. 2쇄 또는 개정판 에서는 원서에 적혀진 영어단어를 적어도 **<span style="color:orange">소제목 부분</span>** 까지는 함께 확인할 수 있다면 책을 읽기만 해도 더 명확한 이해와 해석이 가능하여 더 좋은 책이 되어줄 것으로 기대를 하고 있습니다.

<br/>

# 마무리 
이러한 특징들을 잘 고려하여 내용들을 진행하신다면, 머신러닝 딥러닝을 공부했거나 현재 공부를 진행중에 있는 분들에게는, 책에 나열된 질문들을 스스로에게 던져보고 해당 질문에 대한 답변들을 스스로 연습하면서, 책 내용과 맞춰보면서 부족했던 부분 보완할 부분 또는 강화할 부분을 발견하는데 훌륭한 길라잡이가 되어 줄 것입니다.

※ 본 리뷰는 IT 현업개발자가, 한빛미디어 책을 제공받아 작성한 서평입니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="https://contents.kyobobook.co.kr/prvw/004/223/32/5800012422332/5800012422332001.jpg">
  <figcaption>인사이드 머신러닝 인터뷰</figcaption>
  </p>
</figure>


