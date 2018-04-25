---
title : Django 마스터 01 
last_modified_at: 2018-04-25T20:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
tags: 
    - django
    - pyton
toc: true    
---


## 2장 Urls.py & Views.py

###  WildCard

Wild card 는 **정식 선발은 아니지만 경기에 출전하는 선수** 를 의미하는 용어로써, **\d{1,2}** 인수값이 hours_ahead(request, **hour**) 에 자동으로 연결된다

**Notice:** urls.py의 **약결합** 특성으로 **d{1,2}**를 와일드카드로써 작동한다
{: .notice--info}

```python
urlpatterns = [
    re_path(r'^$', hello),
    re_path(r'^time/(\d{1,2})/$', hours_ahead),
]
```


### request 넌 누구냐?

`from django.http import HttpResponse` 의 객체로, 모든 View 함수들은 이를 상속받기 때문에, request 파라미터를 빠짐없이 연결한다

```python
def hours_ahead(request, offset):
    try:
        offset = int(offset)
    except ValueError:
        raise Http404()
    dt = datetime.now() + timedelta(hours=offset)
    html = "<html><body>In {} hour(s), it will be {}.</body></html>".format(offset,dt)
    return HttpResponse(html)
```

**Please Note:** 정수로 변환이 되면 함수를 진행하고, 변환이 안되면 404 오류를 출력한다 
{: .notice--danger}


## 3장 Templates

### 기본적 형태 (HTML의 일부분이다)

1. {{ 객체 | safe }} : template 객체 
2. {% if %} : template 함수
3. {# 사용설명 #} : template 주석

```python
IPython 6.2.1
from django import template
t = template.Template('My name is {{name}}.') 
c = template.Context({'name':'Nigl'})
t.render(c)

Out[]: 'My name is Nigl.'
```


### Context & {dict}

```python
IPython 6.2.1 -- An enhanced Interactive Python. Type '?' for help.

import datetime
c = Context({'name' : 'john', 
              'date' : datetime.date(2018,4,23)})
raw_template = "<p>Dear {{name}}, Thanks {{date|date:'F j, Y'}}"
t = Template(raw_template)
t.render(c)

Out[] '<p>Dear john,</p><p>Thanks April 23, 2018'
```


### 다중 Context & 동일한 Template

```python
IPython 6.2.1 -- An enhanced Interactive Python. Type '?' for help.

from django.template import Template, Context
t = Template('hello, {{name}}')
t.render(Context({'name':'erdos'}))
'hello, erdos'

for name in ('Jhon', 'Thomas', 'Kim'):
    print(t.render(Context({'name':name})))
     
hello, Jhon
hello, Thomas
hello, Kim
```


### 탬플릿 객체 속성의 Access는 . : method를 활용 

```python
person = {'name':'Sally', 'age':'43'}
t = Template('{{person.name}} is {{person.age}} years old')
c = Context({'person':person})
t.render(c)

Out[] 'Sally is 43 years old'
```


### 사용자정의 class를 활용

```python
from django.template import Template, Context

class Person(object):
    def __init__(self, first_name, last_name):
        self.first_name, self.last_name = first_name, last_name

t = Template('Hello, {{person.first_name}} {{person.last_name}}.')
c = Context({'person':Person('John', 'wick')})
t.render(c)

Out []  'Hello, John wick.'
```

