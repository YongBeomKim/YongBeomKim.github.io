---
title : Master Django - Template
last_modified_at: 2018-04-25T20:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
tags: 
    - django
    - pyton
toc: true    
---

## 기본적 형태 (HTML의 일부분이다)

1. { { 객체 \| safe } } : template 객체 
2. { % if % } : template 함수
3. { # 사용설명 # } : template 주석

```python
from django import template
t = template.Template('My name is { { name } }.') 
c = template.Context({'name':'Nigl'})
t.render(c)

Out[]: 'My name is Nigl.'
```


## Context & {dict}

```python
import datetime
c = Context({'name' : 'john', 
             'date' : datetime.date(2018,4,23)})
raw_template = "<p>Dear { { name } }, Thanks { { date|date:'F j, Y' } }"
t = Template(raw_template)
t.render(c)

Out[] '<p>Dear john,</p><p>Thanks April 23, 2018'
```


## 다중 Context & 동일한 Template

```python
from django.template import Template, Context
t = Template('hello, { { name } }')
t.render(Context({'name':'erdos'}))

'hello, erdos'
```

```python
for name in ('Jhon', 'Thomas', 'Kim'):
    print(t.render(Context({'name':name})))
     
hello, Jhon
hello, Thomas
hello, Kim
```


## 사용자정의 class 활용

```python
from django.template import Template, Context

class Person(object):
    def __init__(self, first_name, last_name):
        self.first_name, self.last_name = first_name, last_name

t = Template('Hello,  \{\{ person.first_name \}\}  \{\{ person.last_name \}\}.')
c = Context({'person':Person('John', 'wick')})
t.render(c)

Out []  'Hello, John wick.'
```


## 탬플릿 객체 속성의 Access는 **_. (Dot)_**  method를 활용 

### 1. {dict} 객체의 key 값으로 호출 

```python
person = {'name':'Sally', 'age':'43'}
t = Template('{ { person.name } }  is { {person.age} } years old')
c = Context({'person':person})
t.render(c)

Out[] 'Sally is 43 years old'
```


### 2. Python String 객체의 method 활용 (.upper, .lower)

```python
t = Template("{ {var} } -- { {var.upper} } -- { {var.isdigit} }")
t.render(Context({'var':'hello'}))

'hello--HELLO--False'
```

**Please Note:** Python의 모든 string method가 적용가능한건 아니다. 실 예로 .replace('','') 같이 내부 변수를 필요로 하는 경우는 오류를 출력, **필수 인수가 없는 메서드**만 호출 가능하다 
{: .notice--danger}


### 3. [list] 객체의 index 값으로 호출

```python
t = Template('Item 2 is  { { items.2 } }.')
c = Context({'items':['apple', 'banana', 'carrots']})
t.render(c)

'Item 2 is carrots.'
```

**Please Note:** 인덱스 값은 양수만 가능하고, **음수**는 오류를 출력한다 
{: .notice--danger}

 
### 4. ".(Dot)" 조회는 깊이있는 중첩적 접근도 가능하다

```python
from django.template import Template, Context
person = {'name':'Sally', 'age':'43'}
t = Template('{ {person.name.upper} } is { { person.age } } years old.' )
c = Context({'person':person})
t.render(c)

'SALLY is 43 years old.'
```

