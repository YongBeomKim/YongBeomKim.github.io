---
title : django 고급 Template
last_modified_at: 2018-04-28T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - django
    - pyton
toc: true    
---


# Mastering Django Core

## Context 를 출력하는 Process

```python
from django.template import loader, Context

def view(request):
    t = loader.get_template('template.html')
    c = Context({'app' : 'my app',
                'user' : request.user, })
    return t.render(c)
```

**Context** : 여러개의 **node**를 담은 **compile 객체**<br>
**render()** : **compile 객체**를 **Template 에 render** 함수로 django에서 가장하안정적인 방식이다
{: .notice--warning} 

<br><br>
## 기본적인 context_processors 객체 

```
'context_processor' : [
    'django.template.context_processors.debug',
    'django.template.context_processors.request',
    'django.contrib.auth.context_processors.auth',
    'django.contrib.message.context_processors.messages',
    ]
```

개별 context 가 위의 내용을 하나씩 점검하고 그럼에도 빠르게 처리를 한다 
{: .notice--warning} 

### auth 의 변수들
1. **auth.User** : 현재 로그인 사용자
2. **auth.perms** : 현재 로그인 사용자 권한

### debug 의 변수들
1. **debug-True** : 디버그 모드를 test
2. **sql_queries** : 요청시 발생한 보든 SQL 쿼리와 소요시간을 {'sql': , 'time': } 딕셔너리 목록으로 생성한다


## 자동 HTML 빠져나가기 

### Auto Escape

HTML 객체를 django가 생성시, 의도치 않은 Html변수가 포함되어 tag 를 빠져나가는 **Cross Site Scripting(XSS)** 문제를 방지할 필요가 있다

1. '<', '>', ', ", & 의 5개 문자는 빠져나가기 처리가 된다
2. Template 에서는 이를 대체하는 별도의 기호들을 정의한다
```
 < : &lt;
 > : &gt;
 ' : '
 " : &quot;
 & : &amp;
```

<br>
### 개별변수 

{ { 개별변수 } } 에 대해서 자동스이스케이프를 비활성화 

```
{ { 변수 | safe }} 
```

<br>
### 템플릿 블록으로 자동 빠져나감을 제어한다 

```
{ % autoescape off % }

    Hello { { name } }

{ % endautoescape % }
```

<br>
```
{ % autoescape off % }

    { % autoescape on % }
        name : { { name } }
    { % endautoescape % }

{ % endautoescape % }
```

{ % autoescape on/off % } / { % endautoescape % } 블록을 사용해서 해당 영역의 autoescape 모드를 전환한다
{: .notice--success}


### 필터 인수에서 문자열 자동 이스케이프 처리

```
{ { data | default : "this is a string" } }
{ { data | default : "3 &lt; 2"} }   <== 를 사용한다
{ { data | default : "3 > 2" } }     <== Auto Escape 문제가 발생가능하다 
```


<br>
## 템플릿 시스템 확장

### 코드 레이아웃

`{ % load review_extras % }`  는 

1. INSTALLED_APPS 로 연결된 `review_extras.py` 파일의 모듈(태그/ 필터)을  로드한다
2. `models.py`, `views.py` 와 동일한 레벨의 `templatetags폴더` 내부의 `review_extras.py` 파일의 모듈(태그/ 필터)을 로드한다 
3. `% load %` 로 불러올 수 있는 모듈의 갯수는 제한이 없다


<br>
## 맞춤 템플릿 태그 및 필터

<br>
### 사용자 정의 템플릿 필터
1. parametor : 변수의 값은 문자열은 아니다
2. value : 기본값을 지정가능하고, 생략도 가능하다

<br>
### 인수를 포함하는 사용자 정의 템플릿 필터

```python
# modify.py

def cut(value, arg):
    return value.replace(arg, '')
```

<br>
```java
{ % load modify % }
{ { somevalue | cut:"0"}}
```

cut( **value** , **arg**) 에서 1) **value :** 는 **somevalue**, 2) **arg :** 는 **"0"** 로 연결되어 작동된다
{: .notice--warning} 


<br>
### 인수가 없는 사용자 정의 템플릿 필터

```python
def lower(value):
    return value.lower()
```

대부분의 경우 인수가 없는 필터를 많이 활용한다
{: .notice--warning} 


<br>
### 사용자 정의 필터 등록

```python
from django import template
from django.template.defaultfilters import stringfilter

register = template.Library()

@register.filter
@stringfilter
def lower(value):
    return value.lower()
```

<br>
```python
@register.filter(is_safe=True)
```

`is_safe=True`를 설정하면 자동 이스케이프 실행없이 raw 데이터를 tempalte로 출력한다. 때문에 이경우에는 <,>,& 등의 포함여부를 잘 살펴봐야 한다
{:. notice--success} 

<br>
```python
@register.filter(needs_autoescape=True)
def letter_filter(text, autoescape=None):
    return ....
```

`needs_autoescape=True`를 설정하면 { % autoescape on/off % } 태그에 영향을 받는다.
{:. notice--success} 