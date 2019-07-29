---
title : 자연어 강의 3일 - 통계적 NLP
last_modified_at: 2019-07-24T10:45:06-05:00
header:
  overlay_image: /assets/images/book/nlp_master.jpg
categories:
  - nlp
tags: 
    - nlp
    - python
---

Statistic NLP 를 앞으로 다룹니다. 이는 통계를 기반으로 하는 NLP : **Frequentist Approach** (빈도를 활용), **Bayesian Approach** (베이지안 활용) 방법이 있습니다.

<br/>
# 확률 기반의 자연어 분석기법

**Binary Distribution** (이항분포) 를 계산하는 방법으로 **Berboulli Distribution** (베르누이 분포) 공식을 활용 합니다.

## 확률의 계산

확률값을 계산하는 경우

```json
P(H) = 셉타
P(T) = 1 - 셉타 (P>=0)
P(HHTHT) = 셉타 * 셉타 * (1-셉타) * 셉타 * (1-셉타)
         = 셉타 ^3 * (1- 셉타)^2

D = 앞,앞,뒤,앞,뒤
n = 5
p = 셉타
a = 확률
P(D|셉터) = 셉타^(aH) (1-셉타)^((n-a)H)
```

## MLE (Maximum Likelihood Estimation)

셉타^ : Best Candidate 

셉타^ = argmax P(D|셉타)  # 원래의 셉타 와 셉타^ 이 유사하도록 모델을 만든다

미분을 사용하여 개별 theta 값을 활용하여 미분을 합니다

## PCA Learning

Probably Approximate Correct (허용 가능한 오류율 범위내 모델을 생성)

셉타^  은 관찰데이터를 활용하여 최대추정가능 확률을 계산한 것

실제로 존재할 **셉타\*** 값과 비교하여 관찰횟수가 적으면 셉타^ 은 (오류율 > 0) 이 발생 합니다.

> Error Bound : P(|셉타^ - 셉타*| >= 오류율) <= 2e ^(-2Ne^2)

오류율을 줄이기 위해서는 N (반복횟수) 를 키우면 된다.

## MAP (Maximum A Posterior Estimation)

[베이즈 정리를 바탕으로 MLE 와 MLP](https://m.blog.naver.com/PostView.nhn?blogId=ynca333&logNo=221314899811&proxyReferer=https%3A%2F%2Fwww.google.com%2F)

MLE 는 관찰결과를 바탕으로 결과를 도출한 결과인 만큼, Posteriori(사전지식들) 를 활용하여 측정된 모델을 보정해 주는 방식이 도출하게 됩니다.

## Bayes Theorem

베이지안 모델을 활용하면 확률의 순서를 바꿔서 적용할 수 있습니다.

경험확률값이 없어도 CDF 모델에서 확률값을 만들어서 계산을 할 수 있다.

## Logistic Regression

Linear Regression 의 활용

f^  측정한 확률값을 활용하여, 모델의 결과값을 추정

h:f^(x;셉터) = Sigma ^n _(i=0) 

Squared Error (Sum/ Meam Squared Error 를 최소로 하는 함수를 활용하여 회귀 모델을 추정합니다.)

## Optimal Classification and Bayer Risk

비선형이 정확도는 높일 수 있지만 Dicision Binary 를 경게로 차이를 오히려 더 벌릴 수 있는 한계도 함께 존재한다.

Bayse Risk : 잠재적인 위험도를 측적해야 한다

Logistic Regression Classifire

### Sigmoid Function

-1~1 사이의 값으로 확률 함수와는 무관하다

<figure class="align-center">
  <img src="https://en.wikipedia.org/wiki/Sigmoid_function#/media/File:Gjl-t(x).svg">
  <figcaption></figcaption>
</figure>

### Logistic Function
f(x) = 1 / 1 + e^(-x)

### Logistic Regression

베르누이 분포 확률을 활용하여 확률값을 활용하여 회귀모델을 도출 합니다

### Maximum Conditional Likelihood Estimation (MCLE)


## Gradient Descent

Taylor Expansion 의 공식을 활용하여 BackPropaget 을 도출 합니다

## RosenBrock Function

3차원 공간에서 최적의 점을 찾는다



Question!!
셉타^ : 조건부 확률의 최대값 (몇번쨰 셉타값) 확률값인가? 아님 횟수값인가?
aH, aT : 관찰확률
Sigmoid 가 확률과 무관한 이유는?