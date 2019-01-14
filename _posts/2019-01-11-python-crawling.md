---
title : Python Crawling 
last_modified_at: 2019-01-08T10:45:06-05:00
header:
  overlay_image: /assets/images/code/python.jpg
categories:
  - python
tags: 
    - python
    - crawling
toc: true 
---

데이터를 분석하려면 데이터가 있어야 합니다. <samll>당여한 이야기쥬</samll> 데이터 출력 API 등 이 있으면 문제가 없지만 적절한 데이터 제공 PipeLine이 없는경우 **Crawling** 로 해결합니다.

이번 페이지에서는 **Crawling** 에 대해 그동안 정리된 내용한 내용들을 경우에 따라 간략하게 정리해보겠습니다.

<br/>
# requests & lxml 
웹페이지 소스코드를 불러온 필요한 테이블 정보를 추출하여 활용합니다. **HTML5** 문법으로 구성된 Document 로써 개별 Tag 기준 다양한 연산을 진행합니다. 태그별 다양한 연산을 지원하는 모듈로써 **Beautiful Soup, lxml** 등으 있고, 다음 예제에서는 **C** 언어로 컴파일된 **[lxml](https://github.com/lxml/lxml)** 모듈을 사용하여 **비트코인 가격정보 수집** 예제를 [coinmarketcap](https://coinmarketcap.com/currencies/bitcoin/historical-data/?start=20181014&end=20190114) 실습합니다.
```python
url = "https://coinmarketcap.com/currencies/bitcoin/..."

import requests
response = requests.get(url).text   # 소스코드를 수집합니다

from lxml.html import fromstring, tostring
lxml_response = fromstring(response) # lxml 객체로 변환 합니다
lxml_table = lxml_response.xpath("//div[@class='table-responsive']/table")
lxml_table

Out[] [<Element table at 0x7f6ce.....>]
```

```python
table_html = tostring(lxml_table[0])

import pandas as pd
pd.read_html(table_html)[0].head(3)
```
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Date</th>
      <th>Open*</th>
      <th>High</th>
      <th>Low</th>
      <th>Close**</th>
      <th>Volume</th>
      <th>Market Cap</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Jan 13, 2019</td>
      <td>3658.87</td>
      <td>3674.76</td>
      <td>3544.93</td>
      <td>3552.95</td>
      <td>4681302466</td>
      <td>62106461671</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Jan 12, 2019</td>
      <td>3686.97</td>
      <td>3698.98</td>
      <td>3653.81</td>
      <td>3661.30</td>
      <td>4778170883</td>
      <td>63994140882</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Jan 11, 2019</td>
      <td>3674.02</td>
      <td>3713.88</td>
      <td>3653.07</td>
      <td>3687.37</td>
      <td>5538712865</td>
      <td>64443301117</td>
    </tr>
  </tbody>
</table>'