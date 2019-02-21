---
title : 웹 서비스 코딩하기 1 - Setting
last_modified_at: 2019-02-16T10:45:06-05:00
header:
  overlay_image: /assets/images/project/service.jpg
categories:
  - service
tags: 
    - service
    - plan
---

# **디자이너 개발자의 웹기획 및 웹개발 하기**

필요한 기능을 구현하는 함수를 제작합니다. 이 단계에서 **Jupyter Notebook** 에서 모듈을 제작합니다. 그리고 이러한 작업결과를 바탕으로 **개별 Table 과 Field 개념정의서** 를 작성합니다.

```python
In [1]: import requests
In [2]: url = 'http://www.naver.com'
In [3]: response = requests.get(url).text
In [4]: response[400:600]
Out[4]: '<meta name="robots" content="index,nofollow"/>\n<meta name="description" content="네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요"/>'
```
작업단계에서는 함수로써 클래스/ 함수작업을 진행하고, 어느정도 완결성을 갖추고 나면 **프로젝트.whl** 와 같이 해당 프로젝트 이름을 사용해서 [패키지 모듈을](https://yongbeomkim.github.io/python/python-package-tutorial/) 제작/ 활용하는 방법으로 단계별 완결성을 갖춰 나아가는 습관을 갖도록 합니다.
