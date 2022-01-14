---
title : finance Data in Python
last_modified_at: 2019-04-28T10:45:06-05:00
header:
  overlay_image: /assets/images/code/kensho.jpg
categories:
  - python
tags: 
    - python
    - finance
toc: true 
---

금융 데이터를 수집하는 모듈들을 정리해 보겠습니다. 대부분 requests, lxml 을 사용하여 직접 크롤링 모듈을 만들었지만, API가 바뀌는 등 대안의 필요시 다음의 내용들을 활용하여 안정적인 자료 수집이 가능 합니다.

# **FinanceDataReader**

[Github](https://github.com/FinanceData/FinanceDataReader) 네이버 금융에서 제공되는 데이터를 **xml** 데이터를 url 을 사용하여 수집합니다. 이로인해 보다 빠른 자료 수집이 가능합니다

# **Pykrx**

[Github](https://github.com/sharebook-kr/pykrx) http://www.krx.co.kr/ 의 Meta 정보를 활용하여 자료들을 수집합니다. 공식 자료제공 플랫폼으로 단점으로는 자료 호출에 시간이 좀 걸립니다. 그래서 주가정보 같은 경우 call 간격을 1초 단위로 설정되어 있습니다.

