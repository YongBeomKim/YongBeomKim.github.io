---
title : 웹을 위한 머신러닝 2 - 이론편
last_modified_at: 2018-03-14T15:45:06-05:00
header:
  overlay_image: /assets/images/book/machine-learning.jpg
categories:
  - machine learning
toc: true
---


> 웹을 위한 머신러닝 - 에이콘 


<img src="http://acornpub.co.kr/tb/detail/book/dm/qn/1489112679ajXucfb6.jpg" width='300'>

## **자율학습** : 군집화, 차원축소, 특이값 분해

### 군집화 알고리즘
1. 정의 : 데이터를 여러 부분집합으로 재구성하여, 의미있는 구조를 추론
1. 유형 : 확률분포방식, 군집중심방식/밀도방식, 계층방식

### 확률분포방식 (distribution Method)
1. EM 알고리즘 : 파라미터 확률분포모델의 기댓값(log 우도) 최대화 알고리즘
    1. E 단계 : **Log 우도(log likelihood)** 함수를 생성 (log : 오목함수)
    1. M 단계 : **E를 최대화** 위한 '파라미터'를 다시 계산

2. 가우시안 분포 혼합모델 [link](http://norman3.github.io/prml/docs/chapter09/2.html)
    1. E 단계 : **베이지안** 정리로 **가중치** 계산
    2. M 단계 : **E를 최대화** 위한 '파라미터'를 다시 계산

**Note:** EM알고리즘은 **자율학습 알고리즘**으로 **K개**의 가우시안 컴포넌트의 은닉변수를 찾는게 목표다
{: .notice--info}

### 군집중심방식 (centroid Method) : 중심과 포인트 거리 최소화 
1. K-means : **K**개의 군집중심 값(유클리드 거리 최소값)을 계산
2. DBSCAN (밀도기반 공간군집화) : 두 포인트간 밀도가 특정조건 만족시까지 계산
3. Mean-shift (평균이동) : 밀도 커널함수의 지역 최댓값을 찾는 비모수 알고리즘

### 계층방식 : 연결기반 군집화 ex)DECISION TREE 
1. 계층 군집화 : 유클리드결합, 단일결합, 완전결합, 평균결합, 와드 알고리즘 

### 차원축소 
1. 주성분 분석(PCA) : 주요정보가 포함된 부분공간을 식별하는 목표이다

### 특이값 분해 

**Note:**
{: .notice--info}

**Please Note:**
{: .notice--danger}


## **지도 학습**
target을 특정한 휘귀분석, 분류기법 

### 모델 오류 평가
Mean Square Error 를 사용해서 평가를 한다

### 일반화 선형모델
레이블 {% raw %}$$y$${% endraw %}와 특징벡터{% raw %}$$x^{(i)}$${% endraw %}사이 선형관계를 생성한다 ex) Gradient Descent : 내리막 배치 경사법 

### 리지회귀
선형회귀모델 비용함수에 `정규화 항`을 추가해서, 비이상적 확장을 제한하여 일반화에 도움을 준다 

### 라소회귀
`정규화항`이 파라미터 **절댓값**을 적용 

### 로지스틱 회귀
boolean 확률적 분류기로, 속성에 가중치를 곱한뒤, 결과는 sigmoid()로 출력

### K-nearest Neighbors (KNN)
K개의 서이웃에서, 빈도가 제일 높은 레이블을 판단한다 

### Naive Bayes (다항분포 나이브 베이즈, 가우시안 나이브 베이즈)
베이지안 함수를 사용하여, 사후확률을 최대로 하는 레이블 p를 찾는다

### Support Vector Machine
분포 데이터를 두개의 부분집합으로 나누는 **결정경계 법선**을 찾는다

### 커널트릭
데이터 집합을 다른차원위 공간으로 매핑하여 분할한다


## **히든 마르코프 모델**
상황별 시나리오를 모델로 구축