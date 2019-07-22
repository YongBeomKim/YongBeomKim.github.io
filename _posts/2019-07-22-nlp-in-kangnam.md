---
title : 자연어 강의 1일
last_modified_at: 2019-07-22T10:45:06-05:00
header:
  overlay_image: /assets/images/art/DavidHockney.jpg
categories:
  - nlp
tags: 
    - nlp
    - python
---

빅데이터 분석은 전처리와 모델링 과정을 모두 거쳐야 하기때문에, 한 부분이라도 문제가 발생하거나 만족스럽지 못하면 처음부터 다시 접근을 해야 합니다. 이를 **no free lunch theorem** 이라고 합니다.

<figure class="align-center">
  <img src="https://miro.medium.com/max/623/1*0QP3OeK7BAOWGlUcDG6VSw.png">
  <figcaption>no free lunch theorem</figcaption>
</figure>

크롤러, 스크롤러

(수) word piece model : 데이터를 수집하고 정리하기  

지도학습 : Regression (value 를 Predict) / Classification 
Linear regression, Gradient Descent

비지도학습 : Clustering ex)K-means, EM, Latens Sementic, LDA 모델링

Statics(likelihood),  Probability(Bayes)

NLG (Natural-language generation) : 어떻게 말을 생성하는 알고리즘을 생성할 것인가 (한글은 통사적 특징으로 잘 안된다)

<figure class="align-center">
  <img src="https://learning.maxtech4u.com/wp-content/uploads/2018/01/NLP-Techniques.png">
  <figcaption>no free lunch theorem</figcaption>
</figure>

NLP 프로세스 : 해당언어 번역/ 문서수집/ 감성분석/ 정보추출/ 질문과 답 모델링 (잘 안되어서 이를 ) Human Based Profile (전문가들의 질문과 답을 찾아서 끼워맞춤) ASK.com 

언어란 특정목적으로 구조화 되어 별도의 로직과 접근법이 필요 

응용분야
1. 정보검색 (map reduce), 질의응답 시스템, 인덱싱
2. 기계번역, 자동통역
3. 문서요약, 오탈자 검증 및 수정, 문법오류 수정

통사적 다양성 (동사의 쓰임)
1. Postfix 언어 (Head-final Language)
   1. 동사가 문장 뒤에 위치
   2. 한국어, 일본어
2. Infix 언어
   1. 동사가 문장의 중간에 위치
   2. 영어, 프랑스어
3. Prefix 언어
   1. 동사가 문장의 처음에 위치
   2. 아일랜드어

단어를 보어로 볼것인가? 아니면 1개의 단어로 볼것인가?


자연어 분석단계
1. PreProcessing
2. 형태소 분석 Morphological Analysis (Regular Grammer(정규문법) 으로 분석 가능)
3. 구문분석 Syntax Analysis (NER (Named-entity recognition) : 객체명 인식, 6W 를 찾는과정)
4. 의미분석 Semantic Analysis  <== 현재의 기술단계 ( 전자사전(wordnet), On Tology , Word2Vec )
5. 화용 분석 Pragmatic Alalysis  : 문장과 문맥의 해석 (대명사 해석이 어려워 아직은 난공불락)

형태소 분석의 난점
1. 중의성 (ambiguity)
2. 접두사, 접미사의 처리
3. 고유명사, 사전에 등록되지 않은 단어의 처리

구분문석 (Syntax Analysis)
? NER 과 구문분석의 차이는 (구문분석 방법들 알아두기)

의미분석 
구분분석 등의 결과 문제는 없지만 실제 의미해석시 문제가 발생하는 경우 ex) 돌이 걸어간다