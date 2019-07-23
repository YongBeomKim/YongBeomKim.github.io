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

- (Crawling) 포커스드 크롤링  (크롤러, 스크롤러, Agent, Spyder, Bot), 앵커 텍스트 수집분석
- 스크래핑 (Scraping) : 데이터를 쪼개서 원하는 영역만 수집

(수) word piece model : 데이터를 수집하고 정리하기  

지도학습 : Regression (value 를 Predict) / Classification 
Linear regression, Gradient Descent

비지도학습 : Clustering ex)K-means, EM, Latens Sementic, LDA 모델링

Statics(likelihood),  Probability(Bayes)

NLG (Natural-language generation) : 어떻게 말을 생성하는 알고리즘을 생성할 것인가 (한글은 통사적 특징으로 잘 안된다)

<figure class="align-center">
  <img src="https://learning.maxtech4u.com/wp-content/uploads/2018/01/NLP-Techniques.png">
  <figcaption>NLT 방법론</figcaption>
</figure>

NLP 프로세스 : 해당언어 번역/ 문서수집/ 감성분석/ 정보추출/ 질문과 답 모델링 (잘 안되어서 이를 ) Human Based Profile (전문가들의 질문과 답을 찾아서 끼워맞춤) ASK.com 

언어란 특정목적으로 구조화 되어 별도의 로직과 접근법이 필요 

<br/>
# **NLP 자연어 분석 개론** 

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
5. 화용 분석 Pragmatic Alalysis  : 앞에서 사용된 사용자의 문장과 문맥 데이터를 바탕으로 문장의 해석 (대명사 해석이 어려워 아직은 난공불락)

형태소 분석의 난점
1. 중의성 (ambiguity)
2. 접두사, 접미사의 처리
3. 고유명사, 사전에 등록되지 않은 단어의 처리

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/photo/nlp-tags.jpg">
  <figcaption>한국어 분석방법</figcaption>
</figure>

### 구분문석 (Syntax Analysis)
1. 구문분석은 Top Down, 왼쪽에서 검색 모델링을 한글에도 적용 가능하다 (잘 된다더라..)
2. 작업은 1) Tagging 2) Stemming(문법적 해석) 3) 구문분석 (구조적 모델링) 4) NER : 6W 분석을 위한 작업과정
3. 단 **문어체 분석** 과 **구어체 분석** 의 경우 개별 표본에 따른 결과를 다르게 적용 가능하다

### 의미분석 
구문분석 등의 결과 문제는 없지만 실제 의미해석시 문제가 발생하는 경우 ex) 돌이 걸어간다

### khaiii
kakao의 오픈소스 Ep9 - Khaiii : 카카오의 딥러닝 기반 형태소 분석기

[https://github.com/kakao/khaiii](https://github.com/kakao/khaiii)

[http://tech.kakao.com/2018/12/13/khaiii/](http://tech.kakao.com/2018/12/13/khaiii/)

현재의 기술수준은
1. 검색, 스팸필터링, 문서분류 작업등에 자연어가 활용중..
2. 매뉴얼을 찾기 쉽게 사용자들의 접근성을 높여주는 챗봇 서비스 (대화형 및 응용력 까지는 어렵다)
3. 챗봇 서비스 (패턴매칭, 키워드/ 연관어 추출)
4. 지능형 비서 (폐쇄형 일부, 개방형)
5. 감성적 서비스 (아직은 어렵다)

Corpus 세종 21 용례 : 검색하면 안나온다!!

<br/>
# **HTTP**
1. 게시판, 회원정보, 서버정보
2. :80 http 기본포트
3. :443 https 기본포트

Get 요청을 하면, Response 응답내용을 해석 가능 합니다. (Byte 데이터를 DOM 으로 해석), TCP/IP 방식으로 해석

## request
euc-kr(국내만 표준), utf-8, ISO-8859-1

## restful
get (/movies, /movies/:id), post, put, delete

## NLP 과정 :전처리 => 모델링 => 아웃풋
1. 대용량 데이터로 부터 Static 한 분석방법을 활용
2. 단 Black BOX 가 Rule Based 로 생성되어야 안정적인 관리가 가능하다.
3. 딥러닝 과정은 낮은 과정의 차원으로 데이터를 재정의 한다

## Legal Issue
1. Opt-In : 명시적인 동의가 있는 부분만 수집 (White list)
2. Opt-Out : 명시적인 거부내용은 수집을 중단 (Black list)
3. Robots.txt : 수집기 접근을 제어하기 위한 규약

Opt-Out **검색엔진** 및 **가격비교** 는 합법적이다. (사용자가 별도의 가공을 통해 본래의 목적을 침해하지 않는다) 단 자료의 속성이 특정기업의 DB 로 특정이 가능한 경우에는 [대법원 "웹사이트 무단 크롤링은 불법"](http://news.bizwatch.co.kr/article/mobile/2017/09/27/0023) 처럼 문제가 될 수 있다.

[https://news.naver.com/robots.txt](https://news.naver.com/robots.txt) 와 같은 방식으로 수집내용을 확인한다

수집하는 방법으로는
1. Robots.txt : 접근제약 규칙의 준수
2. Crawling delay : 최대한 서버부담 최소화
3. Term of use : 사이트 이용방침
4. Public content (지적 재산권 침해여부)
5. Authentication-based sites (민감한 정보 수집 주의)