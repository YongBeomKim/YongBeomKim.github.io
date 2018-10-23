---
title : 도서리뷰 // 금융인을 위한 통계분석
last_modified_at: 2018-04-12T20:45:06-05:00
categories:
  - Quant
tags: 
    - static
    - finance
    - python
---

> Book Review

1. 리뷰기간 : 2018.04 
2. 총평 : **4/5** 
3. 내용 : **4/5** (통계기초를 바탕으로 금융의 예시들을 잘 설명한 책)
4. 분량 : **4/5** (통계기초를 학습한 뒤 접근하기 좋음, 분량도 적다)
5. 난이도 : **초급** (금융인에 한해 초급이고, 채권/ 재무재표등에 대한 추가적 이해가 필요)

<img src="http://gdimg.gmarket.co.kr/684735048/still/600?ver=0" width='300'>


작년 이책을 사서 봤을때에는 통계학 기초를 금융 사례를 작용하여 설명한 책 정도로만 알고 있었다. 이번에 시간을 내어 전체를 살펴보니 내용들도 잘 정리되어 있어서 좋았다.


막연하게 상황별 필요한 내용을 구글링으로 찾다보니 전체가 보이지 않아 어려움이 잇었고, 금융분석 모델을 정의하고 개념들을 이해하려다 보니 기본적인 내용부터 정리를 할 필요성을 갖게 되어서 이 책의 내용을 중심으로 체계적으로 적어 나아가 보려고 한다.


# 1절 금융데이터

## 금융 데이터의 측정 : 수익률
1. 기본적 수익률 
2. 복리 수익률  (-100% ~ 무한대의 값)
3. log 수익률   (-무한대 ~ 무한대) 의 값으로 기간별 단순 합산이 가능하다


# 3절 금융과 통계학

## 금융통계 분석

1. Value-at-Risk [Python Code](https://www.quantstart.com/articles/Value-at-Risk-VaR-for-Algorithmic-Trading-Risk-Management-Part-I)

정상적인 금융시장의 **_주어진 신뢰수준__** 에서 보유기간 동안 발생가능한 **_잠재적 최대손실금액__** 

```python
import numpy as np
from scipy.stats import norm

def var_cov_var(P, c, mu, sigma):
    alpha  = norm.ppf(1-c, mu, sigma)
    return P - P*(alpha + 1)

# import Stock Data
from googlefinance.get import get_data
stock = get_data('KRX:005930', '3Y')
stock["rets"] = stock["Close"].pct_change()

# Var 계산
P     = 1e6      # 1,000,000 원 (초기자금)
c     = 0.99     # 99% 신뢰구간 (confidence interval)
mu    = np.mean(stock["rets"])
sigma = np.std(stock["rets"])
var   = var_cov_var(P, c, mu, sigma)
print ("Value-at-Risk: $%0.2f" % var)

Value-at-Risk: $37948.19

# 1백만원 3년동안 매수 보유시, 최대 손실가능 금액은 37,948원이다
# 1백만원 투자시, 3년동안 37,948원 초과손실확률은 1%에 불과하다

```


2. 부도확률 expected-default-frequency

파이썬 금융분석 책에서 찾아보기

3. 자본자산 가격결정모형 [이론과 Code](https://medium.com/python-data/capm-analysis-calculating-stock-beta-as-a-regression-in-python-c82d189db536)

**사프 린트너의 자본자산 가격결정모형(Capital Asset Pricing Model)** : 시장의 위험과 기대수익률의 관계는 선형적이며, 시장 Beta가 유일한 위험척도이다


```python
import pandas as pd

# 월별 종가 Table을 %(퍼센트) 변동률로 변환한다
fb     = pd.read_csv('FB.csv', parse_dates=True, index_col='Date',)
sp_500 = pd.read_csv('^GSPC.csv', parse_dates=True, index_col='Date')
monthly_prices         = pd.concat([fb['Close'], sp_500['Close']], axis=1)
monthly_prices.columns = ['FB', '^GSPC']

monthly_returns       = monthly_prices.pct_change(1)
clean_monthly_returns = monthly_returns.dropna(axis=0)  # drop first missing

# 인덱스 데이터와 종목 데이터를 분리한다
X = clean_monthly_returns['^GSPC']
y = clean_monthly_returns['FB']


# 통계적 분석결과 출력
import statsmodels.api as sm

X1      = sm.add_constant(X) # Add a constant to the independent value
model   = sm.OLS(y, X1)  # 회귀 모델을 생성한다
results = model.fit()    # fit model and print results
print(results.summary())


# 선형 회귀 모델의 기울기를 출력
from scipy import stats
slope, intercept, r_value, p_value, std_err = stats.linregress(X, y)

print(slope)  # 기울기 값이 해당 종목의 Beta 변동성 결과값이 된다
```