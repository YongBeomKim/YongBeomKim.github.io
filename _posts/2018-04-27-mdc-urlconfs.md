---
title : django URLconfs & 정규 표현식
last_modified_at: 2018-04-27T15:45:06-05:00
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


## URL 에서 매개변수의 활용

### HttpResponse 객체 메서드들

| 메서드                | 설명                     | 예제   |
|----------------------:|-------------------------:|-------:|
|request.path           | 도메인을 제외한 전체경로 | "/blog/"|
|request.get_host()     | 도메인 호스트      | "192.168.0.1" "www.example.com"|
|request.get_full_path()|경로 Query     | "/blog/?print=true"|
|request.is_secure()    |HTTPS 요청여부 | "True", "False" |



### regular expression

| 정규식 기호 |    내용  |
|:-----------:|:--------:|
| . (dot)     | 단일 **String** |
| \d          | 단일 **integer**|
| [A-Za-]     | 모든 **String** |
| [가-힣]     | 모든 **String(한글)** |
| +           | 앞의 정의객체 **하나이상** |
| ?           | 앞의 정의객체 **0 or 1개** |
| *           | 앞의 정의객체 **0 or 이상** |
| {1, 10}     | 앞의 정의객체 **1 ~ 10개** |

**[^\]+ :** \를 제외한 1개 이상의 문자<br>
**\d+ :** 1개 이상의 숫자<br>
**\d? :** 0개 또는 1개의 숫자<br>
**\d{1,3} :** 숫자 1개 2개 또는 3개
{: .notice--primary}

<br>
<img src="http://www.nextree.co.kr/content/images/2016/09/jhkim-140117-RegularExpression-21.png"/>
<br>


### Parametor 의 Capture

1. ( [입력객체] {자릿수} )
2. **괄호**를 넣어서 값을 캡쳐 (함수의 매개변수와 연결) 한다
3. **'r'**은 문자열이 **raw source** 임을 파이썬에게 선언한다
4. **'/'**는 모든 url에 있기 때문에 추가할 필요가 없다 
5. **_Wild card_** 란 개념으로 앞에서 다룬적 있다


```python
urlpatterns = [
    re_path(r'^time/(\d{1,2})/$', hours),
    re_path(r'reviews/([0-9]{4})/$', views.year),
    re_path(r'reviews/([0-9]{4})/[0-9]{2})/$', views.month),
    re_path(r'reviews/([0-9]{4})/[0-9]{2})/([0-9]+)/$', views.review_detail),
    ]
```

**Notice:** 위의 1, 2, 3, 4 적용을 확인한다. 이러한 객체들은 유형에 관계없이 **문자열(String)** 로 view 함수에 **routing** 된다 
{: .notice--success}


Url의 /review/2018/05 요청의 처리내용 (in Django)

```python
import views
views.month(request, '2018', '05')
```


### View 의 **키워드인수 (?P<num>)** 및  기본값 지정

```python
urlpatterns = [
    re_path(r'^time/(\d{1,2})/$', hours),
    re_path(r'reviews/([0-9]{4})/[0-9]{2})/$', views.month),
    re_path(r'reviews/page(?P<num>[0-9]+)/$', views.page),
    ]
```

**(?P<num>)** 를 활용한 명시적인 변수연결로, 인수 순서 버그에 덜 취약하고, 인수를 재정렬 가능하다. 단점은 간결성 일부를 포기해야 한다는 점이다.
{: .notice--success}


```python
# views.py
def page(request, num="1"):
    return HttpResponse
```
    
**매개변수:** num="1" 을 사용해 views.py 함수의 기본 파타미터를 지정 가능하다
{: .notice--success}



## re_path 와 urlpatterns 확장하기

### include, extra_patterns

```python
from django.conf.urls import include, re_path

extra_patterns = [
    path('reports/', credit_views.report),
    path('reports/<int:id>/', credit_views.report),
    path('charge/', credit_views.charge),
]

urlpatterns = [
    re_path(r'site/', include('blog.urls', namespace='blog')),
    ]
```

include() 함수가 포함된 re_path의 url의 정규식 부분에는 **'$'**은 없지만 **'/'**는 포함된다. 이는 include 함수에서 Url 추가처리를 위해서이다. [url 별도 관리하는 경우 extra_patterns 로 설정가능](https://docs.djangoproject.com/en/2.0/topics/http/urls/)
{: .notice--success}


### include, extra_patterns

```python
# 공통 파라미터를 사용하는 경우 
urlpatterns = [
    re_path(r'^(?P<slug>\w+)-(?P<id>\w+)/edit/$', views.edit),
    re_path(r'^(?P<slug>\w+)-(?P<id>\w+)/mail/$', views.mail),
    re_path(r'^(?P<slug>\w+)-(?P<id>\w+)/history/$', views.history),
    ]

# include() 함수의 확장활용
urlpatterns = [
    re_path(r'^(?P<slug>\w+)-(?P<id>\w+)/',
        include([
            re_path(r'edit/$', views.edit),
            re_path(r'mail/$', views.mail),
            re_path(r'history/$', views.history),
            ])),
    ]
```

하지만 부분 수정 및 추가시 오히려 더 복잡해져서 효율성은 떨어질 것으로 예상된다
{: .notice--danger}


### re_path 에 파라미터 추가

```python
# 파라미터 추가
urlpatterns = [
    re_path(r'^review/(?P[0-9]{4})/$', views.edit, {'code':'python'}),
    ]
```

위 내용은 views.edit(request, year="2018", code="python") 를 호출한다
{: .notice--success}


```python
# include() 에 추가옵션 전달
urlpatterns = [
    re_path(r'^review/', include('blog.urls'), {'code' 'python'}),
    ]
```

위 내용은 (code="python") 파라미터를 포함해서 include에 전달한다
{: .notice--success}



## URL 반전 해결

`include('', namespace= "응용 App이름")`, `repath( ,name= "특정 인스턴스 식별 ")` : URL 역분해, 역 URL, 단순한 URL 반전 을 위해서 정의한다


### name 파라미터

```python
urlpatterns = [
    re_path(r'^note/([0-9]{4})/$', views.blog, name='review-year')
]
```


```html 
# 단일 객체로 파라미터 전달
<a href="{ % url 'review-year'  2018 % }">Review</a>
```


```html
# list 객체로 순차적 파라미터 전달
{ % for year in year_list % }
    <a href="{ % url 'review-year'  year % }">{ { year} }
{ % endfor % }
```


```python
from django.core.urls import reverse

def redirect_year(request):
    year = 2018
    return HttpResponseRedirect(reverse('review-year', args=(year,)))
```

**응용 App이름 : 특정 인스턴스** Html 템플릿에서 App별 이름을 지정한다
{: .notice--primary}


### namespace 파라미터 : 응용 App이름

```python
re_path(r'^review/', include('blog.urls', namespace='review-year', app_name='blog'))
```

**Info Notice:** app_name 은 실제 app의 이름을 혼동하지 않도록 선택적으로 활용되었지만, Django2.0 부터는 `blog/urls.py`  필수항목으로 변경되었다 
{: .notice--info}