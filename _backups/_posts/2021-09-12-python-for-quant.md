---
title : Python for Quant
last_modified_at: 2021-07-25T10:45:06-05:00
header:
   overlay_image: /assets/images/quant/quant_banner.jpg
categories:
  - quant
tags: 
    - quant
    - python
---

최근에는 Python 을 활용한 금융분석 양질의 도서를 다수 찾을 수 있다. 여러권의 도서 정리작업을 진행하였고, 데이터 분석 및 기술적 지표를 생성하는 방법등 분량의 다수가 겹치는 부분이 많이 있었습니다. 이들의 내용을 정리하는 페이지 입니다.


이번 페이지 에서는 Pandas 및 Python 기본 함수와 관련된 내용을 정리해 보겠습니다.

<br/>

# Pandas

- [Backtesting of Pandas](https://towardsdatascience.com/backtest-trading-strategies-with-pandas-vectorized-backtesting-26001b0ba3a5)

```python
# DataFrame Filtering
series_valid = df['filter'].isin(names)
df[series_valid]

# DataFrame Filtering 2 (결측치 필터링)
# Nan, 무한대, 음의 무한대 1개라도 포함된 Tuple 은 (~)제외
df[~df.isin([np.nan, np.inf, -np.inf]).any(1)]  
```

> with Pandas Series Methods
- **.isin([list])** : True/ False 필터링 결과 Series 출력

> with Pandas DataFrame Methods
- **.where()** : True 를 그대로 출력, False 는 other 값으로 대체
- **.mask()** : False 를 그대로 출력, True 는 other 값으로 대체
- **.diff()** : 앞뒤 데이터 차이값 생성
- **.pct_change()** : 앞뒤 데이터 변화율 생성
- **.cumsum()** : 누적 합 생성
- **.cummax()** : 누적 최댓값을 비교하여, 최댓값 출력
- **.cummin()** : 누적 최솟값을 비교하여, 최솟값 출력
- **.unique()** : 고유값 Series 생성
- **.isna().sum()** : DataFrame 의 NaN 의 합
- **.apply(함수)** : 특정 컬럼의 데이터를 함수적용한 결과값으로 새로운 Series 생성 
- **.agg(['mean', 'std'], axis=0)** : max, min, sum, mean 과 같은 통계결과값 컬럼별 생성
- **[.rank](https://hogni.tistory.com/48)** : Series 의 데이터 순위 값 출력
- **[.apply](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.apply.html)** : 데이터 값들을 바꾼다 (ex> np.sqrt)
- **[.asfreq](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.asfreq.html)** : 컬럼별 함수 적용 결과값을 덮어쓴다 (ex> freq='M')
- **[.groupby()](https://rfriend.tistory.com/383)** : 데이터를 집단별로 묶는다

<br/>

# DateTime

```python
# datetime 모듈의 활용
import datetime
datetime.datetime.today().strftime('%Y-%m-%d')
[Out]: 2021-08-11

datetime.datetime(year=2000, month=1, day=1)
[Out]: 2000-01-01 00:00:00

datetime.datetime.today() - datetime.timedelta(days=7)
[Out]: datetime.datetime(2021, 8, 4, 10, 46, 44, 131681)
```

<br/>

# Yahoo Finance

- [Market data from Yahoo](https://aroussi.com/post/python-yahoo-finance)

<br/>

# Matplotlib

```python
# matplotlib 기본 설정값 변경하기

import matplotlib.pyplot as plt
plt.rcParams["font.family"] = 'D2Coding'
plt.rcParams['figure.dpi'] = 300
plt.rcParams['figure.figsize'] = (20.0, 5.0)
plt.rc('font', family='NanumGothic')
```

```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots(3, 1, figsize=(20,12), sharex=True)
df.adj_close.plot(ax=ax[0])  # 주가 Table
ax[0].set(title='SAMSUNG time series', ylabel='Stock Price (원)')
df.simple_rtn.plot(ax=ax[1]) # 단순 수익률 Table
ax[1].set(ylabel='Simple Return (원)')
df.log_rtn.plot(ax=ax[2])    # log 수익률 Table
ax[2].set(xlabel='Date', ylabel='Log Return (%)')
plt.show()
```

```python
fig = plt.figure()
ax = fig.add_subplot(111, ylabel='Google price in $')
data['close'].plot(ax=ax, color='r', lw=2.)
# Marker 추가하기
ax.plot(
    data.loc[data['position'] == 1.0].index,
    data.price[data['position'] == 1.0],
    '^', markersize=8, color='m')
ax.plot(
    date.loc[date['position'] == -1.0].index,
    date.price[date['position'] == -1.0],
    'v', markersize=8, color='k')
plt.show()
```

<br/>

# Cuffinks
- [GitHub](https://github.com/santosjorge/cufflinks)

Install the Python Package
```r
! pip install cufflinks
! pip install chart_studio
! pip install jupyterlab "ipywidgets>=7.5"
! jupyter labextension install jupyterlab-plotly@4.14.3
```

Initialized the Module
```python
import cufflinks as cf
from plotly.offline import iplot, init_notebook_mode

cf.set_config_file(world_readable=True, theme='pearl', offline=True) # set up settings (run it once)
init_notebook_mode(connected=True)  # initialize notebook display

# Plotly from DataFrame
df.iplot(subplots=True, shape=(3,1), shared_xaxes=True, title="SAMSUNG")
```