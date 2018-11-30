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


<br/>
# 투표 시스템 구현하기

[django 투표시스템 구현내용 정리](http://guswnsxodlf.github.io/python/) 위에서 정리한 djagno Project 위에서 **투표 기능을 구현하는 App** 작업을 진행한다

<br/>
## polls\models.py

```python
from django.db import models

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date_published')

    def __str__(self):
        return self.question_text

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text
```

Question 클래스로 생성된 테이블 

| 컬럼명                       | 내용                |
|:----------------------------:|:-------------------:|
| **id** (integer)             | pk 값으로 자동생성  |
| question_text (varchar(200)) | 질문내용을 입력     |
| pub_date (datetime)          | 배포날짜            |


Choice 클래스로 생성된 테이블

| 컬럼명                       | 내용                     |
|:----------------------------:|:------------------------:|
| id (integer)                 | pk 값으로 자동생성       |
| **question_id** (integer)    | **Question 클래스** 키값 |
| choice_text(varchar(200))    | 설문내용을 입력          |
| votes (integer)              | 투표수 카운트            |

> **models.ForeignKey( 참조클래스, on_delete = models.CASCADE)**

**.ForeignKey() :** 다른 테이블의 기본키를 참조하는 필드로써, on_delete = models.**PROTECT** 는 **외래키 독립** 을, on_delete = models.**CASCADE** 는  **외래키 의존**으로 구성한다


<br/>
## polls/admin.py

```python
from django.contrib import admin
# Register your models here.

from .models import Question, Choice

admin.site.register(Question)
admin.site.register(Choice)
```

위에서 정의한 테이블을 **admin.py**로 연동시켜 admin 페이지에서 수정 가능하게 한다 


<br/>
## polls/views.py

위에서 설정한 **.ForeignKey()** 를 **함수** 및 **템플릿에서** 제어하는 메소드 들을 정리해 보면 다음과 같다

| 메소드                          |      내용                |
|:-------------------------------:|:---------------------------------:|
|**.objects.all()**               | 클래스 테이블 모두 호출           |
|**.order_by**('-pub_date')[:5]   | 클래스 테이블 정렬                |
|**get_object_or_404**(, **pk**= )| 클래스 pk호출, 없으면 404 Exception 발생| 

```python
from django.shortcuts import render, get_object_or_404
from .models import Question, Choice

def index(request):
    latest_question_list = Question.objects.all().order_by('-pub_date')[:5]
    context = {'latest_question_list' : latest_question_list}
    return render(request, 'polls/index.html', context)

def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, "polls/detail.html", {'question':question})

def results(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/results.html', {'question':question})
```


| 메소드                  |      내용                           |
|:-----------------------:|:-----------------------------------:|
|**.objects.all()**       | 클래스 테이블 모두 호출             |
|**.choice_set.get**()    | **ForeignKey** 참조 Choice 모델 호출|
|**.DoesNotExist**        | 호출한 값이 없을 때 처리            |
|**except** (KeyError, 클래스.DoesNotExist) | 클래스 pk 없으면 **KeyError** 출력 |

아래의 경우 **try:, except:, else:**로 구성되어 있는데, **try:** 로 정상처리 된 경우 **else:** 에서는 이를 받아서 추가 실행을 한다 <small>의외로 헷랄렸던 부분이다.. 이런게 있엇군!![점프 투 파이썬](https://wikidocs.net/30#try-else)</small> 

```python
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse

def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)

    try:
        selected_choice = question.choice_set.get(
            pk=request.POST['choice']) # Html Form의 전달

    except (KeyError, Choice.DoesNotExist):
        return render(request, "polls/detail.html",{
            'question': question,
            'error_message':"선택한 내용이 없습니다"})
    else:
        selected_choice.votes += 1
        selected_choice.save()
        return HttpResponseRedirect(reverse("polls:results", 
            args=(question_id,)))
```

<br/>
## polls/urls.py

```python
from django.urls import re_path, path
from .views import index, detail, results, vote

app_name="polls"
urlpatterns = [
    path('',                           index,   name="index"),
    path('<int:question_id>/',         detail,  name='detail'),
    path('<int:question_id>/results/', results, name="results"),
    path('<int:question_id>/vote/',    vote,    name='vote'),
]
```

## Template 

Html 에서 Django 객체를 어떻게 처리할 지에 대해 익혀보자

<br/>
## polls/templates/polls/index.html

투표할 내용을 보여주는 대표 템플릿으로 내부의 **href** 링크 경로는 1) `/polls/{ { question.id } }/` 와 같이 **Hardcoing** 을 할 수 도 있고, 2) `{ % url 'polls:detail' question.id % }` 의 url 템플릿 함수를 사용하여 경로를 세분화 할 수 있다.  

```html
{ % if latest_question_list % }
    <ul>
    { % for question in latest_question_list % }
        <!-- href="/polls/{ { question.id } }/" 동일-->
        <li><a href="{ % url 'polls:detail' question.id % }">
          { { question.question_text } }</a></li>
    { % endfor % }
    </ul>
{ % else % } <p>투표할 내용이 없습니다</p>
{ % endif % }
```

<br/>
## polls/templates/polls/detail.html

템플릿 오류는 **error_message** 객체에 담겨서 전달되고. **Question** 테이블의 필드별 내용을 호출하여 템플릿에서 나열한다.

**원본테이블.종속테이블_set.all** 메소드는 **1:N** 관계로 [공식문서](https://docs.djangoproject.com/en/2.1/topics/db/queries/) 를 참조하면 보다 자세한 내용을 볼 수 있다.

**forloop.counter** 객체는 for 반복문 내부에서 1부터 시작하여 1씩 증가하여 결과값을 반환한다

```html
<h1>{ {question.question_text} }</h1>

{ % if error_message % }
  <p><strong>{ {error_message} }</strong></p>
{ % endif % }

<form action="{ % url 'poll:vote' question.id % }" 
 method = "post">
  { % csrf_token % }
  { % for choice in question.choice_set.all % }
    <input type="radio" name="choice" 
    id = "choice{ {forloop.counter} }"
    value = "{ {choice.id} }"/>
    <label for="choice{ {forloop.counter} }">
    { {choice.choice_text} }</label><br/>
  { % endfor % }
  <input type="submit" value="Vote" />
</form>
```

<br/>
## polls/templates/polls/results.html


```html
<h1>{ { question.question_text } }</h1>

<ul>
{ % for choice in question.choice_set.all % }
    <li>{ { choice.choice_text } } -- 
    { { choice.votes } } 투표수 
    { { choice.votes | pluralize } }</li>
{ % endfor % }
</ul>

<a href="{% url 'polls:detail' question.id %}">
다시 투표하시겠습니까?</a>
```

전체적으로 클래스 객체만 정의하면 내부적인 구조는 개별 메서드에서 자동으로 값을 계산해 주는 기능을 다양하게 익히면 보다 쉽게 구조를 확장할 수 