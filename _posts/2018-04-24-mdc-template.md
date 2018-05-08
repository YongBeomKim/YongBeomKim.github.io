---
title : django Template
last_modified_at: 2018-04-25T20:45:06-05:00
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


[참고 Blog](https://kimdoky.github.io/django/2017/10/05/pyDjango-ch16.html)

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


### Context & {dict}

```python
import datetime
c = Context({'name' : 'john', 
             'date' : datetime.date(2018,4,23)})
raw_template = "<p>Dear { { name } }, Thanks { { date|date:'F j, Y' } }"
t = Template(raw_template)
t.render(c)

Out[] '<p>Dear john,</p><p>Thanks April 23, 2018'
```


### 다중 Context & 동일한 Template

```python
from django.template import Template, Context
t = Template('hello, { { name } }')
t.render(Context({'name':'erdos'}))

'hello, erdos'
```


```python
for name in ('Jhon', 'Thomas', 'Kim'):
    print(t.render(Context( {'name' : name} )))
     
hello, Jhon
hello, Thomas
hello, Kim
```


### 사용자정의 class 활용

```python
from django.template import Template, Context

class Person(object):
    def __init__(self, first_name, last_name):
        self.first_name, self.last_name = first_name, last_name

t = Template('Hello, { { person.first_name } }  { { person.last_name } }.')
c = Context({'person':Person('John', 'wick')})
t.render(c)

Out []  'Hello, John wick.'
```

<br><br>


## 탬플릿 객체 속성의 Access는 **_. (Dot)_**  method를 활용 

### {dict} 객체의 key 값으로 호출 

```python
person = {'name':'Sally', 'age':'43'}
t = Template('{ { person.name } }  is { {person.age} } years old')
c = Context({'person':person})
t.render(c)

Out[] 'Sally is 43 years old'
```


### Python String 객체의 method 활용 (.upper, .lower)

```python
t = Template("{ {var} } -- { {var.upper} } -- { {var.isdigit} }")
t.render(Context({'var':'hello'}))

'hello--HELLO--False'
```

**Warning in Django:** Python의 모든 string method가 적용가능한건 아니다. 실 예로 .replace('','') 같이 내부 변수를 필요로 하는 경우는 오류를 출력, **필수 인수가 없는 메서드**만 호출 가능하다 
{: .notice--danger}


### [list] 객체의 index 값으로 호출

```python
t = Template('Item 2 is  { { items.2 } }.')
c = Context({'items':['apple', 'banana', 'carrots']})
t.render(c)

'Item 2 is carrots.'
```

**Notice :** 인덱스 값은 양수만 가능하고, **음수**는 오류를 출력한다 
{: .notice--danger}

 
### ".(Dot)" 조회는 깊이있는 중첩적 접근도 가능하다

```python
from django.template import Template, Context
person = {'name':'Sally', 'age':'43'}
t = Template('{ { person.name.upper } } is { { person.age } } years old.' )
c = Context( { 'person' : person } )
t.render(c)

'SALLY is 43 years old.'
```

<br><br>


## 탬플릿 함수 태그

### if / else 

1. **유효한 값의 포함** 여부만 판단 (값의 존재여부)
2. **and, or, not** 조건을 활용가능하다  (and는 상대적 높은순위를 갖는다 )

```java
{ % if today_is_weekend % }
    <p>Welcome</p>
{ % elif room_list % }
    <p>Get back to Work.</p>
{ % endif % }
```

**if 중접사용 :** if 조건 내부에서  ex) `if (con_name and con_year) or con_date` 와 같은 **()**를 사용하면 안된다. 1) if 구문으로 분리하거나 2) 중접 if태그를 사용해야 한다
{: .notice--danger}


### for 

1. content의 시퀀스 항목들을 반복한다
2. 시퀀스 객체만 존재하면 중첩적 for 도 가능하다 
3. 객체가 { dict } 인 경우에는 .items 메소드를 활용 가능하다

```java
{ % for text in texts % }
    <h1>{ { text.name } }</h1>

    { % for value in text.sortvalue % }
        <li>{ {value} }</li>
    { % endfor % }

{ % endfor % }
```


```java
{ % for key, value  in data.items  % }
    { { key }} : { { value } }
{ % endfor % }
```



### empty

for 반복문에서, **content가 비어있는지를 확인** 하기 위해, if 문으로 판단을 한다, 하지만 이러한 반복을 피하기 위해 { % empty % } 를 사용하면 간결해 진다

```java
{ % for shoe  in shoes_list % }
    <p>{ { shoe.size } }</p>
{ % empty % }
    <p>There is no shoe</p>
{ % endfor % }
```


### forloop 

for 반복문 진행상황에 대한 정보를 제공한다 
1. **forloop.counter** : 루프 반복 횟수 
2. **forloop.revcounter** : 루프 나머지 항목 갯수 
3. **forloop.first** : 첫 반복실행시 **True** 를 출력 
4. **forloop.last** : 마지막 통과시 **True** 를 출력 


### 반복 회수를 활용

```java
{ % for  item  in todo_list % }
    <p>{ { forloop.counter } } : { { item } }</p>
{ % endfor % } 
```


### 객체 사이에 쉽표나, p tag를 추가 

```java
{ % for p in places % }{ { p } }{ % if not forloop.last % },
    { % endif % }
{ % endfor % }
```


### ifequal / ifnotequal

1. ifequal : 나열된 2개 객체가(user, currentuser 를 비교) 동일 여부를 판단한다 
2. 비교가능 객체는 : 템플릿변수, '문자열', 정수 및 십진수 

```java
{ % ifequal  user  currentuser % }
    <h1>Welcome!</h1>
{ % endequal % }
```


```java
{ % ifequal  variable  1 % }
{ % ifequal  variable  1.23 % }
{ % ifequal  variable  'foo' % }
{ % ifequal  variable  "foo" % }
```

**if 문에서 기호 :** django 의 HTML 탬플릿에서는 약결합의 특성상 **기호의 사용을  최대한 억제**함이 깔끔하다.. ==, !=, <, >, <=, >=, in, not in, is, and is not  도 사용 가능하다 
{: .notice--info}

**ifequal 인식 불가능 객체 :** True, False, [1,2,3]  {'key':'value'} 는 비교할수 없다 [document](https://docs.djangoproject.com/en/2.0/ref/templates/builtins/)
{: .notice--danger}

<br><br>


## 탬플릿 필터

date 필터 내용들 [Document](https://docs.djangoproject.com/en/2.0/ref/templates/builtins/)

```python
{ { name.upper } }
{ { name | upper } }
{ { name | first | upper } }         # 첫 글자를 대문자로 변환
{ { value | addslashes } }           # 맨 뒤 \로 tag 닫는다
{ { text | truncatewords : "30" } }  # 전체 자릿수를 30으로 한다  
{ { date | date : "F j, Y" } }       # 날짜 출력 포맷
```

**| :** 템플릿 객체의 필터를 적용, **:** 필터인수 뒤의 일부 매개변수에 적용 되고 **항상 큰따옴표** 로만 묶인다  
{: .notice--info}

<br><br>


## Django Template 철학과 한계 

1. Python, HTML 과 분리되어 작동한다
2. **안전**과 **보안**을 보장하고,**확장성** 을 고려한다
3. 단 **중복성**은 철저하게 제한한다 
4. **공백** 은 명확하게 처리한다 

<br><br>



## views.py 뷰의 템플릿 함수

### render()

1. `from django.shortcuts import render` 
2. render( 요청인자, template 이름, {context dict 객체} )

```python
def current_datetime(request):
    now     = datetime.now()
    content = {'current_date' : now }
    return render(request, 'current_datetime.html', content)

    # html = "<html><body>It is now {}/</body></html>".format(now)
    # return HttpResponse(html)
```



### 내장 템플릿 : { % include % }
 
탬플릿 내부에서 **중복된 내용을 재활용** 하는 template 함수로, 해당 객체가 미존재시 **TemplateDoesNotExist** 오류를 출력한다  

```java
 { % include 'navigation.html' % }
```

**{ % include "foo/bar.html" % }** : 파일명을 따옴표로 묶거나, **{ % include template_name % }** : 파일명이 들어 있는 변수를 사용 가능하다
{: notice-danger}

재활용 템플릿의 컨텍스트 변수가 greeting은 “Hello”로, person은 “John”으로 주어진다면 **{ % include “foo/bar.html” with person=”Jane” greeting=”Hello” % }** 의 결과는 “Hello, John”이 될 것입니다.
{: notice-danger}



### 탬플릿 상속 { % extends "부모html"% } , { % block % }/{ % endblock % }

1. { % extends % } 는, 현태 템플릿이, 자식임을 알 수 있다  
2. { % block % } 로 **영역을 지정**한다 
3. 자식에서 **블록을 재정의(Override)** 한다
4. { { block.**super** } }를 사용하면 **상위 템플릿 content**를 연결한다 
5. 부모 템플에서 동일한 이름을 정의한 { % block % } 태그가 많을수록 자세하고 정교한 작업이 가능하다
6. 동일한 템플렛에 동일한 { % block % }을 여럿 정의하지 않도록 주의해야 한다 


```java
{ % extends "부모 템플릿.hrml" % }

# 자식 템플릿 재정의 영역 1 (title)
{ % block title % }
{ % endblock title % }

# 자식 템플릿 재정의 영역 2 (본문) 
{ % block content % }
{ % endblock % }
```

<br>


### sample.html

```python

{ % block title % }Post{ % endblock % }
{ % block content % }
<ul>
    { % for date in date_list % }
    <li a href="{ % url 'blog:post_year_archive' date|date:'Y' % }">
    Year-{ { date|date:"Y" } }</a></li>
    { % endfor % }
</ul><br/>
<div>
    { % include "blog/post_archive_snippet.html" % } // 여기를 교체
</div>
{ % endblock % }
```
