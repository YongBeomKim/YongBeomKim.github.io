---
title : 파이썬 웹 프로그래밍 개정판 하편
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


# 파이썬 웹 프로그래밍 (개정판) 실습

<br/>
# 투표 시스템 구현하기

[django 투표시스템 구현내용 정리](http://guswnsxodlf.github.io/python/)  **투표 기능을 구현하는 App** 작업 내용으로, 클래스 테이블 객체를 정의하고 세부 기능들은 구조 메소드를 활용하여 자동으로 값을 계산해 줌으로써 구조 확장시 보다 쉽게 접근 가능하다

<br/>
## polls\models.py

```python
from django.db import models

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date      = models.DateTimeField('date_published')
    def __str__(self): return self.question_text

class Choice(models.Model):
    question    = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes       = models.IntegerField(default=0)

    def __str__(self): return self.choice_text
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
from .models import Question, Choice

admin.site.register(Question)
admin.site.register(Choice)
```

테이블 모델들을 **admin.py**로 연동시켜 admin 페이지에서 수정 가능하게 한다 

```python
from django.contrib import admin
from .models import Question, Choice

class QuestionAdmin(admin.ModelAdmin):
    # 필드 나열순서
    list_display  = ('question_text', 'pub_date')
    # fields = ['pub_date', 'question_text']
    fieldsets = [
        ('Question Statement',
            {'fields': ['question_text']}),
        ('Date Information',
            {'fields': ['pub_date'],
             'classes': ['collapse']})
    ]
    # ChoiceInline 모델을 함께 표시
    inlines       = [ChoiceInline]
    list_filter   = ['pub_date'] # 필터표시
    search_fields = ['question_text'] # 검색필터

class ChoiceInline(admin.TabularInline):
    model, extra = Choice, 2

admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
```
1) 필드 정의시 **fields, fieldsets** 둘 중 하나만 설정한다. 2) **ChoiceInline :** 클래스 객체는 앞에선 **StackedInline** 으로 기본값을 사용 가능하고, 위와같이 **TabularInline**를 사용하면 3) **QuestionAdmin**에서 **inlines** 으로 포함된 경우 보다 조밀하고 테이블 기반 형식으로 표시된다. [공식문서](https://docs.djangoproject.com/ko/2.1/intro/tutorial07/)
{: .notice--info}

<br/>
## polls/views.py

**.ForeignKey()** 제어 메소드

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

템플릿 오류는 **error_message** 에 담겨서 전달되고. **Question** 테이블의 필드별 내용을 호출하여 템플릿에서 나열한다.

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

<a href="{ % url 'polls:detail' question.id % }">
다시 투표하시겠습니까?</a>
```
