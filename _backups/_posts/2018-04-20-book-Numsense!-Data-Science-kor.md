---
title : 도서리뷰 // 수학 없이 배우는 데이터 과학과 알고리즘
last_modified_at: 2018-04-21T20:45:06-05:00
header:
  overlay_image: /assets/images/book/data_science.jpg
  caption: "Numsense! Data Science"
categories:
  - Quant
tags: 
    - datascience
    - algorithm
---

> Book Review

1. 리뷰기간 : 2018.04 
2. 총평 : **4.5/5** 
3. 내용 : **4.5/5** (쉬운 상황들로 머신러닝 이론들을 잘 정리된 책)
4. 분량 : **4/5** (몇 시간이면 볼거같지만, 생각보다 깊이가 있어서 하루면 다 봄)
5. 난이도 : **초급** (머신러닝의 전체적인 그림이 잘 안그려지는 사람)


<img src="http://acornpub.co.kr/tb/detail/book/yk/rf/1510553792mLAtdGTc.jpg" width='300'>


처음 이 책을 알게 된 것은 알라딘 중고서점에 저렴하게 올라와서, 아 또 그렇고 그런 입문서중에 하나 겠구나 하는 생각이 들었다 

Amazone Book에서 다른 원서들과 함께 보던 중 이 책에 대한 리뷰가 칭찬 일색인것 보고서, 양키들이 보는눈은 좀 있나? 싶어서 대여를 하게 되었다 


##  데이터 준비 

### 데이터 Format (목적에 따라 관측타입을 달리할 수 있다)
1. Row : Data Point / Tuple(SQL) : 1번 관측으로 얻은 데이터 포인트 
2. Column : Variable(변수 데이터) == attribute, Feature, dimension 
3. Data : binary(Boolean), Category, Integer, Continuous

### 알고리즘의 선택 
1. 비지도 학습 : 숨겨진 패턴의 발견, 비지도 학습 결과를 검증 (k-means, PCAm Association Rules, Social Network Analysis)
2. 지도학습 : 이미 존재하는 패턴을 바탕으로 예측, 직접적인 결과 검증이 가능하다 (Regression, KNN, SVM, Decision Tree, Random Forest, Neural Network)
3. 강화학습 : 피트백을 활용하여 지속적인 개선을 추구한다 (Multi-Armed Bandits)

### 파라미터의 튜닝
1. 과적합 Over fit : 무작위를 영구적인 패턴으로 잘못인식 (일반화가 낮음)
2. 부적합 Under fit : 민감도가 낮아 중요추세를 반영하지 못함 (성능이 낮음)
3. 최적합 ideal fit
4. 대안으로 정규화 단계에서 **패널티 파리미터**를 사용하여 보완한다

### 결과평가
1. 혼동행렬 (Confusion Matrix) : 예측오류의 종규를 구분하여 성능을 평가한다
2. 회귀지표 (Root Mean Squared Error (RMSE)) : 큰 오차를 피하기 위해서 활용한다
3. 검증 : Train / Test Data Set을 구분하여 예측의 정확도를 시험한다
4. 교차검증 : DataSet을 여럿으로 나눈 뒤 개별 Segment를 사용하여 예측 정확도를 평가후, 모든 iteration의 평균으로 결ㄹ론을 도출한다 


## K-means 군집화

<figure class="align-center">
  <img src="https://support.minitab.com/en-us/minitab/18/factor_analysis_job_applicants_scree_plot.png" width='300'>
  <figcaption> 스크리 도표(scree plot), k를 정의하는 보조지표</figcaption>
</figure> 

1. 제약 : 개별 데이터는 1개의 군집 중심에 위치해야 한다 
2. Kinks : 위 도표(산포도와 군집의 갯수)에서 급격히 구부러진 부분으로 산포도가 적당한 수준으로 떨어지는 지점을 의미한다
3. 처음 군집의 중심을 중앙에 가까운 지점으로 이동후 , 데이터의 포함관계에 따라 거리를 재배치 한다   
4. 중심점 이동과 맴버 재할당을 반복하며, 클러스터 중심점 위치조정을 반복한다


## 주성분 분석 (PCA) Principal Component(값 또는 축) Analysis

<figure class="align-center">
  <img src="http://108.61.119.12/wp-content/uploads/2014/11/random-to-normal.png" width='400'>
  <figcaption> 개별 성분을 X, Y축으로 재배치 후 산포도를 분석한다</figcaption>
</figure> 

1. 데이터 포인트를 가장 잘 구별하는 **숨겨진 변수(주성분)를** 찾는 기법
2. 주성분 : 데이터 포인트가 **가장 넓게 분포하는 차원** 을 의미한다 
3. 개별 데이터를 **표준화(100분율 데이터로 변환)** 하여 비교분석 한다
4. 추출한 요소들을 X, Y축으로, 개별 데이터를 재배치하여 분포를 비교 분석한다 
5. 선택할 주성분의 갯수는 위의 Kinks를 통해서 찾는다
6. 한계 : 결과의 해석을 **유추**에 기반하야 한다 (요소들의 통합 이유를 구체적인 수치로 설명이 불가능하다)
7. 독립성분분석(Independent Component Analysis) : 데이터간 구분을 **직교**로 최대화 한계를 극복하기 위해, 정보가 중복되지 않도록 독특한 정보를 추출한다
8. 용도 : 가장 많은 정보를 포함한 차원에 데이터가 넓게 분포하고, 각 차원이 직교성질을 갖을 때 유용하다


## 연관규칙 ex) 구매패턴의 발견

1. 지지도 (Support) : 특정 품목 집합이 전체 거래에서 등장하는 빈도
2. 신뢰도 (Confidence) : 품목 X가 존재시, 품목 Y가 나타내는 빈도 (연관관계의 중요도를 왜곡)
3. 향상도 (lift) : 두 제품이 함께 팔리는 빈도 (1보다 크다 : 연관성 높다, 1보다 작다 : 연관성이 반대이다, 1이다 : 연관성이 없다)
4. Apriori 원칙 : 품목의 가짓수를 줄이는 방법으로, **지지도가 높은** 품목의 집합빈도를 찾거나, **신뢰도나 향상도가 높은 품목의 규칙**을 찾는다
5. Apriori 제약 : 계산량이 많고, 의심스러운 연관성 품목의 수가 많으면 일반화를 위한 별도의 검증을 필요로 한다
6. 용도 : Apriori 원칙을 활용하면 빈도가 낮은 품목들을 제거함으로써 집합을 빠르게 찾을 수 있다


## 소셜 네트워크 분석 (Social Network Analysis)

1. 개별 Note 간의 **관계** 를 파악하는데 주로 사용된다 
2. 네크워크를 시각화를 위해 **Force directed** 알고리즘을 활용한다
3. 시각화 방법으로 **Louvain method** 를 활용한다
4. **Louvain method 개념** : 모듈성(Modularity)은 **같은군집의 간선 갯수와 강도**는 **최대화** 하고, **다른군집** 은 간선의 갯수와 강도를 **최소화** 되도록 군집을 조정한다
5. **Louvain method 과정** : 0단계(개별 Node를 하나의 군딥으로 가정한다), 1단계 (모듈성이 최대화 군집을 찾아 나간다, 재할당이 없을때 까지 반복한다), 2단계 (1단계 군집을 하나의 Node로 치환한 Coarse-grained) 네크워크를 만든다), 3단계 (최적의 모듈을 만들때까지 반복한다)
6. Page-Rank 알고리즘 : Google에서 순위를 부여하는 알고리즘
7. 한계 : 통찰을 발견 가능하지만, 결과 해석측에는  신중해야 한다
8. 용도 : 군집간의 크기가 비슷하고, 겹치거나 중복되지 않을 때 적합하다


## 회귀 분석 (Regression Analysis)

1. 추세선 찾기 (Trend line) : 추세선이 직선이 아닌겨우, logarithm 등으로 데이터를 정규화 한다
2. 추세선 파라미터 최적화 알고리즘 (Gradient Descent) : 관측치의 가중치를 변경하면서, 전체적인 오차값이 최소가 되는 가중치를 찾는다
3. 회귀계수 (Regression coefficients) 
4. 상관계수 (Correlation coefficients) : ** -1 ~ 1 ** 사이의 값으로 유사도를 **강도와 계수** 로 회귀계수 보다 안정적으로 측정 가능하다
5. 상관도가 높은 예측을 포함시, 왜곡을 유발해 **다중공선성(multicolinearity)** 문제가 발생한다, 이를위해 상관도가 높은 예측을 제외하거나 Lasso, Ridge Regression등의 고급기법을 활용 가능하다.
6. 용도 : 예의측 특징간의 상관성이 낮고, 직선추세가 가정될 떄 적합하다 


## K-Nearest Neighbors (k-NN) : 유유상종

1. 개념 : 데이터 포인트간의 그룹이나 값을 예측하는 방법으로, 원하는 분류의 갯수가 짝수면, K를 홀수로 다르게 설정하여 중복을 피한다
2. **이상감지 (Anomaly Detection), 사기감지 (Fraud Detection)** : 데이터를 시각화 용이한 경우에 k-NN을 반복하면 **추가적인 통찰** 이 가능하다
3. 한계 : 분류의 갯수가 많고, 데이터 간격이 크다면 잘못될 위험이 큰 한계가 존재한다
4. 용도 : 데이터 갯수가 적고, 분류의 갯수가 명확할 때 유용하다


## 서포트 벡터 머신 (Support Vector Machine) 

1. 최적 경계 그리기 : 데이터 간의 **최적경계를 도출** 하는 기법으로, 모든 데이터를 사용하는 회귀기법등과 비교해서 **계산속도가 빠른 장점** 이 있다
2. 완충지대 (buffer zone) : 경계구분 데이터가 특정갯수 이하일떄, 경계를 넘나드는 것을 허용하여 일반화를 돕는다 (비용 파라미터의 튜닝이 가능하다)
3. 커널트릭 (Kernel trick) : 복잡한 경계의 곡선패턴을 생성 가능하다 
4. 한계 : 용도가 많고, 속도도 빠르지만 1)샘플수가 적으면 일반화가 어렵고 2) 중첩 영역이 많은경우, 잘못 분류될 가능성 또한 존재한다
5. 용도 : 샘플이 많은 데이터를 **2개의 그룹으로 분류 경계를 생성** 시 유용 


## 의사결정 트리 (Decision Tree)

1. 구조 : 데이터간의 **동질성 높은 그룹** 을 찾기위한 알고리즘이다
2. 한계 : 약간의 변화만 생겨도 결과가 달라지는 **불안정성**이 존재하고 이때문에 **과적합**에 취약하다  
3. 용도 : 구분 알고리즘으로 이용이 쉽지만 과적합의 우려를 보완하기 위해 **Random Forest** 대안적 기법을 활용한다


## 랜덤 포레스트 (Random Forest) 

1. 앙상블 기법 : Decision Tree 의 앙상블 기법을 적용하여 1) **최대 득표 투표**방식 / 2) **평균값** 을 이용한다 
2. 부트스트랩 집계 :  데이터를 랜덤하게 샘플링한 뒤, 해당 모델의 부분집합을 활용하여 최적변수를 추출한다
3. 한계 : 결과해석시 **예측력**과 **해석의 용이성** 사이에서 저울질을 해야한다
4. 용도 : 여러 Decision Tree 의 예측을 종합하여 결과를 출력한다 


## 신경망

1. 구성 : 입력계층 (위치 불변성 특징을 찾는다), hidden layer, 출력레이어, loss layer
2. loss layer : 신경망을 학습하는 동안 **오차 정도의 feedback** 을 출력한다.  1) 올바른 예측을 하는 경우 신경망을 강화하고, 2) 잘못된 예측의 경우 오차를 줄이는 backpropagation(역전파) 과정으로 재조정 한다 
3. 활성화 규칙 
4. 과적합을 피하는 방법들 : 1) 서브 샘플링 (입력 데이터를 부드럽게 만들어서 평균을 취한다) 2) 왜곡 (왜곡된 데이터로 정보를 불린다) 3) Drop Out (과적합을 피하기 위해 절반을 뉴런에서 제외한다) 4) 기울기 하강법 5) Mini-batch 6) fully connected layer
5. 용도 : 데이터 set이 크고, 고성능 컴퓨팅을 활용가능시 유용하다. 다만 결과해서이 어려운 단점이 있다


## A/B Test 와 멀티 암드 밴딧

<figure class="align-center">
  <img src="https://conversionxl.com/wp-content/uploads/2015/09/abtesting-conversion-xl-568x213.jpg" width='400'>
  <figcaption> 개별 성분을 X, Y축으로 재배치 후 산포도를 분석한다</figcaption>
</figure> 

1. A/B Test : 가능한 여러 전략들의 선택지를 탐색 후, 남은 자원을 **성과가 가장좋은 쪽** 에 모두 할당한다 
2. 입실론 : **대안을 탐색하는 시간의 비율** 로써, 입실론이 클수록 해당전략의 효과는 적다
3. 입실론 감소 전략 (epsilon decreasing strategy) :  점진적으로 **성과가 높은 전략 _(입실론이 줄어드는)_ ** 으로 자원을 할당하는 전략으로 강화학습에 적합하다 
4. 대부분의 경우 입신론 감소전략이 더 유용하지만, 자원할당비율의 최적속도를 찾기 곤란한 단점이 존재한다 