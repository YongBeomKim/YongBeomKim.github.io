---
title : Django Admin Suit
last_modified_at: 2019-04-08T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django_pro.png
categories:
  - django
tags: 
    - model
    - django
toc: true 
---

django-suit 을 활용하면 보다 깔끔하게 정리된 Admin 페이지를 활용하실 수 있습니다

https://teamlab.github.io/jekyllDecent/blog/tutorials/Django-Admin-%EC%BB%A4%EC%8A%A4%ED%84%B0%EB%A7%88%EC%9D%B4%EC%A7%95

하지만 이는 유로서비스로, 완전한 Open Source 인 [startbootstrap-sb-admin](https://github.com/BlackrockDigital/startbootstrap-sb-admin) 사용하도록 합니다.

[SB-admin-2](https://startbootstrap.com/themes/sb-admin-2/) 가 별도로 있고 이쪽이 더 가볍고 깔끔해 보입니다.




# **금융 테이블 수집도구 만들기**
우선 자동 자료 수집기 Django 모델 만들기

## **1 자료 수집하기**
- Django 모델의 정의
- 시간별 자동수집 모델 만들기
- 자료 수집 테이블 자동화 완성하기
    1. **기본가격 :** open, high, low, close, volume
    1. **거래원별 순매매 :** 외인, 개인, 기관, 기타
    1. **상위 거래원 :** 기관명, 순매수, 순매도
    1. **대차거래 자료 :** thinkpool 과 공매도 포탈 활용
    1. **Theme 분석 :** 네이버 카페별 **기업분석 테마** 수집

## **01 상위 거래원 수집**

```python
from muyong.stock import Think
t = Think()
t.get_trader('005930').tail()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }
    .dataframe tbody tr th {
        vertical-align: top;
    }
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>code</th>
      <th>name</th>
      <th>buy</th>
      <th>sell</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>7</th>
      <td>005930</td>
      <td>신영증권</td>
      <td>0</td>
      <td>209329</td>
    </tr>
    <tr>
      <th>8</th>
      <td>005930</td>
      <td>모건스</td>
      <td>1107626</td>
      <td>1215798</td>
    </tr>
    <tr>
      <th>9</th>
      <td>005930</td>
      <td>에스지</td>
      <td>0</td>
      <td>63274</td>
    </tr>
    <tr>
      <th>10</th>
      <td>005930</td>
      <td>전체</td>
      <td>6062802</td>
      <td>7673853</td>
    </tr>
    <tr>
      <th>11</th>
      <td>005930</td>
      <td>외국계합</td>
      <td>2605935</td>
      <td>6191172</td>
    </tr>
  </tbody>
</table>
</div>

## **02 가격정보 수집**
https://github.com/FinanceData/FinanceDataReader

```python
# Samsung(005930), 1992-01-01 ~ 2018-10-31
import FinanceDataReader as fdr
df = fdr.DataReader('068270', '1992-01-01', '2018-10-31')
```

```python
# 1원 변화에 따른 거래량 : 
# 소유자가 변경 활성화 판단기준
# 중립거래, 매도세, 매수세 비교
# 연평균 거래량을 기준으로 + /-를 구분하면 더 명확할 듯...
import FinanceDataReader as fdr
df = fdr.DataReader('005930', '2019-05')

df['Chg'] = df['Close'] - df['Open']
df['Vol/Chg'] = df['Volume'] / df['Chg']
df.loc[:, ['Volume', 'Chg', 'Vol/Chg']].tail()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }
    .dataframe tbody tr th {
        vertical-align: top;
    }
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Volume</th>
      <th>Chg</th>
      <th>Vol/Chg</th>
    </tr>
    <tr>
      <th>Date</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2019-05-20</th>
      <td>15752397</td>
      <td>350</td>
      <td>45006.848571</td>
    </tr>
    <tr>
      <th>2019-05-21</th>
      <td>18812133</td>
      <td>550</td>
      <td>34203.878182</td>
    </tr>
    <tr>
      <th>2019-05-22</th>
      <td>11033339</td>
      <td>-200</td>
      <td>-55166.695000</td>
    </tr>
    <tr>
      <th>2019-05-23</th>
      <td>12259006</td>
      <td>-50</td>
      <td>-245180.120000</td>
    </tr>
    <tr>
      <th>2019-05-24</th>
      <td>13339441</td>
      <td>-1100</td>
      <td>-12126.764545</td>
    </tr>
  </tbody>
</table>
</div>

## **03 거래원 순매매 정보**

```python
from muyong.stock import Shinhan
s = Shinhan()
s.get_trader('005930').head(3)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }
    .dataframe tbody tr th {
        vertical-align: top;
    }
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>날짜</th>
      <th>코드</th>
      <th>개인</th>
      <th>외국인</th>
      <th>기관</th>
      <th>증권</th>
      <th>투신</th>
      <th>은행</th>
      <th>종금</th>
      <th>보험</th>
      <th>기금</th>
      <th>기타</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2019/05/24</td>
      <td>005930</td>
      <td>1610624</td>
      <td>-4010898</td>
      <td>2395517</td>
      <td>1250287</td>
      <td>20436</td>
      <td>-849</td>
      <td>1461</td>
      <td>89826</td>
      <td>1322596</td>
      <td>13109</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2019/05/23</td>
      <td>005930</td>
      <td>-1422429</td>
      <td>3264084</td>
      <td>-1816229</td>
      <td>-1400368</td>
      <td>-31451</td>
      <td>4000</td>
      <td>0</td>
      <td>114503</td>
      <td>-887271</td>
      <td>-19526</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2019/05/22</td>
      <td>005930</td>
      <td>-321294</td>
      <td>1758966</td>
      <td>-1499052</td>
      <td>-889870</td>
      <td>106232</td>
      <td>16597</td>
      <td>49190</td>
      <td>43915</td>
      <td>-806669</td>
      <td>57770</td>
    </tr>
  </tbody>
</table>
</div>

## **04 대차거래 가격정보**
### **1) thinkpool 에서 수집**

```python
# 대차거래 정보
from muyong.stock import Think
t = Think()
t.get_short('005930',1).head(3)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }
    .dataframe tbody tr th {
        vertical-align: top;
    }
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>일자</th>
      <th>체결(주수)</th>
      <th>상환(주수)</th>
      <th>잔고 주수</th>
      <th>잔고 금액(백만)</th>
      <th>증감(수량)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>20190524</td>
      <td>2489871</td>
      <td>2702761</td>
      <td>114271560</td>
      <td>4879396</td>
      <td>-212890</td>
    </tr>
    <tr>
      <th>1</th>
      <td>20190523</td>
      <td>1897917</td>
      <td>1270226</td>
      <td>114484450</td>
      <td>5020143</td>
      <td>627691</td>
    </tr>
    <tr>
      <th>2</th>
      <td>20190522</td>
      <td>961080</td>
      <td>1455058</td>
      <td>113856759</td>
      <td>4952769</td>
      <td>-493978</td>
    </tr>
  </tbody>
</table>
</div>

### **2) 대차거래 포털에서 수집**

```python
table.drop(['비중','순매매','거래량'], axis=1)
```

```python
date_info = '20190521'

from muyong.stock import Krx
k = Krx()
# 대차 거래정보
short_trade = k.get_short(date_info, date_info, 1)
short_trade = short_trade.drop(['공매도거래대금','총거래대금','비중','비중.1'], axis=1)
short_trade.종목코드 = [code.replace('KR7','')[:6]  for code in short_trade.종목코드]
short_trade.head(3)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }
    .dataframe tbody tr th {
        vertical-align: top;
    }
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>일자</th>
      <th>종목코드</th>
      <th>종목명</th>
      <th>공매도거래량</th>
      <th>총거래량</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2019/05/21</td>
      <td>095570</td>
      <td>AJ네트웍스</td>
      <td>346</td>
      <td>39296</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2019/05/21</td>
      <td>068400</td>
      <td>AJ렌터카</td>
      <td>1865</td>
      <td>109070</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2019/05/21</td>
      <td>006840</td>
      <td>AK홀딩스</td>
      <td>1185</td>
      <td>11414</td>
    </tr>
  </tbody>
</table>
</div>

```python
short_trade[short_trade.종목코드 == "011151"]
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }
    .dataframe tbody tr th {
        vertical-align: top;
    }
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>일자</th>
      <th>종목코드</th>
      <th>종목명</th>
      <th>공매도거래량</th>
      <th>총거래량</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>12</th>
      <td>2019/05/21</td>
      <td>011151</td>
      <td>CJ씨푸드1우</td>
      <td>0</td>
      <td>6574</td>
    </tr>
  </tbody>
</table>
</div>

```python
date_info = '20190521'

# 대차 잔고거래 현황 (거래일 + 2일 이내 등록)
# 잔고금액 : 잔고수량 * 해당일 종가
short_remain = k.get_short(date_info, date_info, 1, remain=True)
short_remain = short_remain.drop(['공매도잔고금액','시가총액','비중'], axis=1)
short_remain.종목코드 = [code.replace('KR7','')[:6]  for code in short_remain.종목코드]
short_remain.head(3)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }
    .dataframe tbody tr th {
        vertical-align: top;
    }
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>공시의무발생일</th>
      <th>종목코드</th>
      <th>종목명</th>
      <th>공매도잔고수량</th>
      <th>상장주식수</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2019/05/21</td>
      <td>000020</td>
      <td>동화약품</td>
      <td>31460</td>
      <td>27931470</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2019/05/21</td>
      <td>000040</td>
      <td>KR모터스</td>
      <td>688322</td>
      <td>189444075</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2019/05/21</td>
      <td>000050</td>
      <td>경방</td>
      <td>13533</td>
      <td>27415270</td>
    </tr>
  </tbody>
</table>
</div>

```python
short_trade.shape
```
    (962, 5)

```python
codes = [cod for cod in short_trade.종목코드  if cod not in list(short_remain.종목코드)]
len(codes)
```

    405

```python
# 공매도 대상은 962개 기업이고
# 거래가 없으면 잔고수량 변화가 없어서 기록에 없음.
short_remain.shape
```

    (557, 5)

# **기업 특수정보**
krx.or.kr 또는 포털에서 수집분석하기
1. 신규상장
1. 과열종목 정보
1. 거래정지 정보
1. 기타 다양한 신호 정보

```python
# progress bar animation
import itertools, threading, time, sys
done = False

#here is the animation
def animate():
    for c in itertools.cycle(['|', '/', '-', '\\']):
        if done: break
        sys.stdout.write('\rloading ' + c)
        sys.stdout.flush()
        time.sleep(0.1)
    sys.stdout.write('\rDone!     ')

t = threading.Thread(target=animate)
t.start()

#long process here
time.sleep(3)
done = True
```
    Done!     
