---
title : 파이썬 웹 프로그래밍 개정판
last_modified_at: 2018-11-20T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - django
    - python
toc: true 
---


# 파이썬 웹 프로그래밍 (개정판) 

2018년에 새로 출시된 **파이썬 웹 프로그래밍 기본편** 내용에 추가된 내용을 살펴보도록 할 것이다. 추가된 내용은 Django 2.1 이상에서 변경된 내용을 추가적으로 정리하려고 한다

<br/>
# D jango 웹 프레임워크

<br/>
## models.py

**Django 모델정의 함수**에서 아래와 같이 작성하면, 연결 **DataBase의 Query 문을** 자동으로 생성한다

```python
from django.db import models

class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name  = models.CharField(max_length=30)
```

```sql
CREATE TABLE myapp_person(
  "id" serial NOT NULL PRIMARY KEY,
  "first_name" varchar(30) NOT NULL,
  "last_name" varchar(30) NOT NULL
);
```


<br/>
## urls.py

> \< **int** : year \>

\< \> 부분을 Path Converter 라고 하는데, 내부에 객체 Type 설정값들은 다음과 같다.

| type    |   내용                                         |
|:-------:|:----------------------------------------------:|
|**str**  | "/" 제외한 모든 **문자열**                     |
|**int**  | 양의 **정수 값**                               |
|**slug** | **slug 형식의** 문자열 (ASCII,숫자,하이픈,밑줄)|
|**path** | **"/" 포함한 모든 문자열**                     |
|**uuid** | **UUID** 형식의 문자열 [Document](https://docs.python.org/3/library/uuid.html) |





```python
from django.url import path
from .views import *

urlpatterns = [
    path('blog/2018/', case),
    path('blog/<int:year>/', year_archive),
    path('blog/<int:year>/<int:month>/', month_archive),
    path('blog/<int:year>/<int:month>/<slug:slug>/', detail),
]
```