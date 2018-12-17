---
title : Example / django filter 사용법
last_modified_at: 2018-12-05T10:45:06-05:00
header:
  overlay_image: /assets/images/book/django-screen.jpg
categories:
  - django
tags: 
    - django
    - python
toc: true 
---

Simple is Better than Complex 사이트에서 예제로 올라온 **How to Filter QuerySets Dynamically** [site](https://simpleisbetterthancomplex.com/tutorial/2016/11/28/how-to-filter-querysets-dynamically.html) 의 내용을 Django 2.0에 맞게, 그리고 Project에 추가할 때는 어떻게 해야하는지를 실습하면서 그 내용을 정리해 보고자 합니다. 

<br/>
이 내용을 정리하면서 여러책을 뒤척이다 보니 진도가 더뎌서 무척 힘들었습니다. **기본은 완성되었다는 자신감** 속에서 **필요한 예제들을 통해서 **작은 Project 들을 완성해** 나아가고, 이를 누적해 가면서 실력을 멈추지 말고 Upgrade 하며 진행하면 좋을거 같습니다.

<br/>
# **1 Basic Tutorial** 

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/photo/filter1.png">
</figure> 

### **models.py**

`from django.contrib.auth.models import User` **사용자 정보 Table** 을 사용합니다 

### **filters.py**

필터와 연동하는 **Queryset 필터링 캐시**를 정의합니다

```python
from django.contrib.auth.models import User
from django_filters import FilterSet

class UserFilter(FilterSet):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', ]
```
**fields =** 에서 **filter** 단수명 오타를 주의하자
{: .notice--info}


### **views.py**

<div>
  <img src="{{site.baseurl}}/assets/images/photo/cache.gif" width=400 /> 
</div>

1. **user_list : 데이터베이스 인스턴스**를 생성합니다
2. **user_filter : 필터링 캐시**를 생성합니다

```python
from django.contrib.auth.models import User
from django.shortcuts import render
from .filters import UserFilter

def search(request):
    user_list = User.objects.all()
    user_filter = UserFilter(request.GET, queryset=user_list)
    return render(request, 'app이름/template.html', {'filter': user_filter})
```

### **app/template.html**

**filter** 로 검색용 폼을 생성하고, 연동 필터링 결과는 `filter.qs` 객체로 호출 합니다. **.get_full_name** 파라미터는 **first_name** 과 **last_name** 필드값을 붙여서 출력합니다.

> **filter.qs** : `from django_filters import FilterSet` 에서 생성된 기본 QuerySet을 호출합니다 [출처](https://django-filter.readthedocs.io/en/master/guide/usage.html#generic-view-configuration)

```html
<form class="" method="get">
  { { filter.form.as_p } }
  <button type="submit">검색</button>
</form>

<ul>
{ % for user in filter.qs  % }
  <li>{ {user.username} } - { {user.get_full_name} }</li>
{ % endfor % }
</ul>
```

<br/>
# **2 FilterView() <small>Generic View</small>** 

별도의 **views.py** 함수없이, **urls.py** 에서 **Generic View** 를 사용하여 inline 방식으로 활용하는 예시를 알아봅니다.

### **urls.py**

```python
from django.urls import path
from django_filters.views import FilterView
from .filters import Userfilter

app_name = 'search'
urlpatterns = [
    path('', FilterView.as_view(
                filterset_class = Userfilter,
                template_name = 'search/user_list.html'),
         name = 'index')
]
```

<br/>
# **3 Filtering Functions**

> from **django_filters** import **FilterSet, CharFilter, NumberFilter** 

## **1) CharFilter() <small>String 검색용 필터</small>** 

django 의 **filter(), exclude(), get(), Q()** 에서 제공하는 여러 **filter lookup 파라미터** 를 응용한, 다양한 검색조건을 제공합니다

> **CharFilter(lookup_expr**='icontains')

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/photo/filter2.png">
</figure> 

### **filters.py**

`first_name` 필드에 **__icontains 인스턴스 검색조건** 을 추가 합니다

```python
from django_filters import FilterSet, CharFilter

class Userfilter_(FilterSet):
    first_name = CharFilter(lookup_expr='icontains')
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name']
```

## **2) NumberFilter() <small>Interger 검색용 필터</small>**

숫자 데이터로 구성된 컬럼에서 Lookup_filter를 사용하도록 구현한 함수 입니다 

> **NumberFilter(lookup_expr** = 'year')

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/photo/filter3.png">
</figure> 


### **filters.py**

```python
from django_filters import FilterSet, CharFilter, NumberFilter

class UserFilter(FilterSet):
    # first_name 필드의 일부검색
    first_name = CharFilter(lookup_expr = 'icontains')
    # lookup_expr = 'year' : 
    year_joined = NumberFilter(
                    name = 'date_joined', # 필터링 필드를 정의
                    lookup_expr = 'year'  # __year 필터를 사용 
                    )
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', ]
```

`date_joined = NumberFilter(lookup_expr='year')` 와 같이 1줄로 처리 가능합니다. 한글필드명 등 변수명을 한글로 바로 적용하기 곤란한 경우에 활용하면 유용합니다 
{: .notice--info}


## **3) NumberFilter() Mixed**

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/photo/filter4.png">
</figure> 

### **filters.py**

```python
class UserFilter(FilterSet):

    first_name      = CharFilter(lookup_expr='icontains')
    year_joined     = NumberFilter(name='date_joined', lookup_expr='year')
    year_joined__gt = NumberFilter(name='date_joined', lookup_expr='year__gt')
    year_joined__lt = NumberFilter(name='date_joined', lookup_expr='year__lt')

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', ]
```

**date_joined** 필드의 데이터를 다양한 검색조건으로 활용하기 위해서, 다양한 검색용 인스턴스를 활용합니다
{: .notice--info}


<br/>

Exploring the Filtering Options

# 4 Filtering Options 

```python


```