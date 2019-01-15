---
title : Python Crawling - requests, requests-html, selenium 
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

데이터를 분석하려면 데이터가 있어야 합니다. <strike><samll>당연한 이야기쥬</samll></strike> 데이터 출력 API 등 이 있으면 문제가 없지만 적절한 데이터 제공 PipeLine이 없는경우 **Crawling** 로 해결합니다.

이번 페이지에서는 **Crawling** 에 대해 그동안 정리된 내용한 내용들을 경우에 따라 간략하게 정리해보겠습니다.

<br/>
# **Requests & Lxml** 
웹페이지 소스코드는 **HTML5** 문법으로 구성된 Document 로써 개별 Tag 기준 다양한 연산을 진행함으로써 정보를 추출합니다. 이를 지원하는 모듈로는 **Beautiful Soup, lxml** 등이 있고, 다음 예제에서는 **C** 언어로 컴파일된 **[lxml](https://github.com/lxml/lxml)** 모듈을 사용하여 **비트코인 가격정보 수집을**  [coinmarketcap](https://coinmarketcap.com/currencies/bitcoin/historical-data/?start=20181014&end=20190114) 실습합니다.
```python
url = "https://coinmarketcap.com/currencies/bitcoin/..."

import requests
response = requests.get(url).text  

from lxml.html import fromstring, tostring, HTMLParser
lxml_response = fromstring(response, parser=HTMLParser(encoding="utf-8"))
lxml_table = lxml_response.xpath("//div[@class='table-responsive']/table")
lxml_table
```
```php
Out[] [<Element table at 0x7f6ce.....>]
```
수집한 소스코드를 `lxml` 객체로 변환하고, xpath 등으로 필터링한 결과 추출된 내용이 있으면 `객체 메모리 주소값이` 출력됩니다. 이를 통해서 몇개의 유효객체가 추출되었는지를 확인합니다. 위의 encoding 설정은 한글등 추출된 객체가 깨지는 경우에 추가합니다.
{: .notice--info}

```python
table_html = tostring(lxml_table[0])

import pandas as pd
pd.read_html(table_html)[0].head(3)
```
<table border="1" class="dataframe">
<thead><tr style="text-align: right;"><th></th>
    <th>Date</th><th>Open*</th><th>High</th><th>Low</th><th>Close**</th>
    <th>Volume</th><th>Market Cap</th></tr></thead>
<tbody>
  <tr><th>0</th><td>Jan 13, 2019</td><td>3658.87</td><td>3674.76</td>
    <td>3544.93</td><td>3552.95</td><td>4681302466</td><td>62106461671</td></tr>
  <tr><th>1</th><td>Jan 12, 2019</td><td>3686.97</td><td>3698.98</td>
    <td>3653.81</td><td>3661.30</td><td>4778170883</td><td>63994140882</td></tr>
  <tr><th>2</th><td>Jan 11, 2019</td><td>3674.02</td><td>3713.88</td>
    <td>3653.07</td><td>3687.37</td><td>5538712865</td><td>64443301117</td>
</tr></tbody>
</table>

<br/>
# **Selenium**
requests를 사용하여 소스코드를 불러오면 객체값이 JavaScript 로 구성된 경우가 많습니다. 
```html
<table summary="주요 시세." class="no_info">
  <tr><td class="first">
    {if sv == 0}{js numberFont(changeNumberFormat(=pcv))}
    {else}{js numberFont(changeNumberFormat(=sv))}{/if}
  </td></tr>
</table>
```

이러한 경우 javascript 스크립트를 실행하고 결과값을 사용해야 합니다 이러한 경우 가장 대중적으로 활용되는 모듈이 [seleniumHQ](https://www.seleniumhq.org) 입니다. **(select -> action -> new Position Result)** 과정으로 구조를 설계 및 실행합니다. 이에대한 자세한 내용은 [YouTube](https://www.google.com/search?q=%ED%8C%8C%EC%9D%B4%EC%8D%AC+%EC%9B%B9%ED%81%AC%EB%A1%A4%EB%A7%81+selenium&client=ubuntu&hs=nWL&channel=fs&source=lnms&tbm=vid&sa=X&ved=0ahUKEwiS8cLh8OzfAhWLw7wKHQHKBfIQ_AUIDigB&biw=1360&bih=728) 를 참고하면 많은 참고가 가능합니다.
```python
from selenium import webdriver
url    = "https://finance.naver.com/item/coinfo.nhn?code=035720"
driver = webdriver.PhantomJS()
driver.get(url)
html_source = driver.page_source
driver.close()

html_source[:500]
```

<br/>
# **Requests-HTML**
**Selenium** 을 사용하면 웹페이지 로그인, 검색어 조건부여 등 조작이 가능한 반면, 크롤링을 위해서 JavaScript 내용을 찾고, 해당 함수를 실행하는 등의 작업을 추가해야 합니다. 보다 간편한 방법으로 구현가능한 모듈로써 가장 유명한 것으로는 **[requests-html](https://html.python-requests.org/)** 이 있습니다 [Example Jupyter](https://beenje.github.io/blog/posts/parsing-javascript-rendered-pages-in-python-with-pyppeteer/)
```python

import nest_asyncio
nest_asyncio.apply()
```
`import nest_asyncio` 는 Jupyter Notebook 에서 실행하면 `loop error` 를 출력합니다. 내부적으로 Chromiun 환경에서 작동하고 결과를 출력하는데, Jupyer 를 구현하는 웹브라우저와 충돌하기 때문에 이들을 비동기로 분리하기 위해 외와같이 내용을 추가합니다.
```python
url = "http://....."
from requests_html import HTMLSession
session = HTMLSession()

with HTMLSession() as session:
    r = session.get(url)
    r.html.render()

print("Get Table List : {} \n\nMethods : {}".format(
    r.html.find('table'), 
    dir(r.html.find('table')[1])))
```
```php
Get Table List : [<Element 'table' class=('tab',)>, <Element 'table' >, <Element 'table' >] 

Methods : [... , 'element', 'encoding', 'find', 'full_text', 'html', 'links', 'lxml', 'pq', 'raw_html', 'search', 'search_all', 'session', 'skip_anchors', 'text', 'url', 'xpath']
```
이와같이 해당페이지를 크롤링하면 **table** 3개 객체가 출력됩니다. 이 정보가 저장된 `r` 객체에서 제공되는 메소드로는 위와 같은 내용들이 제공됩니다. 추출된 내용을 html 문서로 내용을 추출하고 `pandas` 를 통해서 연산 가능한 객체로 정리된 상태로 활용합니다.

```python
table_source = r.html.find('table')[1].html
pd.read_html(table_source)[0]
```

<script id="dsq-count-scr" src="//http-yongbeomkim-github-io.disqus.com/count.js" async>
</script>