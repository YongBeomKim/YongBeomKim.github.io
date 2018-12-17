---
title : 파이썬 웹 프로그래밍 개정판 상편
last_modified_at: 2018-11-20T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django-tutorial.png
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

**Django 모델정의 함수**에서 아래와 같이 작성하면, 연결 **DataBase의 Query 문을** 자동으로 생성한다. 모델의 인덱스별 **pk**값은 자동으로 생성한다

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
## path()

**path(\<route\>, \<vuew\>)** 두 개의 필수 인자와, 추가로 **kwarg, name** 2개의 선택인자를 받는다

1. **route :** URL 경로를 정의하는 문자열로, URL String이라고도 한다
2. **view :** 해당 URL 요청시, Python 에서 호출하는 view 함수
3. **kwarg :** URL 이외에 추가로 POST, GET 요청시 view 함수에 전달하는 값
4. **name :** URL 경로별 이름을 할당하여, Template와 연결시 사용한다 

<br/>
## path() in urls.py 

> \< **int** : year \>

**\< \>** 부분을 **Path Converter** 라고 하는데, 내부에 **객체 Type 설정값** 들은 다음과 같다.

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
파라미터의 이름인 **year, month, slug** 등은 사용자가 임의로 지정 가능하다. 단 여기서는 날짜별 관리를 Generic View를 사용하기 때문에, 위처럼 맞춰야 하지만 사용자 함수로써 이를 관리할 때에는 각각에 맞는 이름을 사용하면 된다
{: .notice--info}

<br/>
## re_path() in urls.py 

 `(?P<pk>\d+)` 에서 **pk**는 **변수(?P<변수명>)** 로써 **정규식으로 pk의 값을 정의하고** (pk는 변수 이름으로 임의로 변경 가능하다) 해당 위치의 값을 뷰로 전송하겠다는 뜻입니다.

```python
from django.url import re_path
from .views import *

urlpatterns = [
    path('blog/2018/', case),
    re_path(r'^blog/(?P<year>[0-9]{4})/$', year_archive),
    re_path(r'^blog/(?P<year>[0-9]{4})/(?P<month>[0-9]{2})/$', month_archive),
    re_path(r'^blog/(?P<year>[0-9]{4})/(?P<month>[0-9]{2})/(?P<slug>[\w-]+)/$', detail),
]
```

<br/>
## views.py

```python
from django.http import HeepResponse
import datetime

def current_time(request):
    now = datetime.datetime.now()
    html = <html><body>지금 시간은 %s 입니다</body></html> %now
    return HeepResponse(html)
```

