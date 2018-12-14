---
title : Example / django filter Queryset
last_modified_at: 2018-12-05T10:45:06-05:00
header:
  overlay_image: /assets/images/book/django-girls.jpg
categories:
  - django
tags: 
    - django
    - python
toc: true 
---


# **Introduction**

Simple is Better than Complex 사이트에서 예제로 올라온 **How to Filter QuerySets Dynamically** [site](https://simpleisbetterthancomplex.com/tutorial/2016/11/28/how-to-filter-querysets-dynamically.html) 의 내용을 Django 2.0에 맞게, 그리고 Project에 추가할 때는 어떻게 해야하는지를 실습하면서 그 내용을 정리해 보고자 합니다. 

<div>
  <img src="{{site.baseurl}}/assets/images/photo/cache.jpg" width='600'>
</div>

<br/>
책을 뒤척이면서 진도가 더뎌서 무척 힘들었습니다. **기본은 완성되었다는 자신감** 속에서 **필요한 예제들을 통해서** 작은 Project를 완성하고 이를 누적해 가면서 실력을 멈추지 말고 Upgrade 하며 진행하면 좋을거 같습니다.

<br/>
# **1 Basic Tutorial** 

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/photo/filter1.png">
</figure> 

### **models.py**

`from django.contrib.auth.models import User` 의 **사용자 정보 Table** 을 사용합니다 

### **filters.py**

필터와 연동하는 **Queryset 필터링 캐시**를 정의합니다
```python
from django.contrib.auth.models import User
import django_filters

class UserFilter(django_filters.FilterSet):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', ]
```
**fields =** 코딩하면서 **filter** 단수명으로 오타가 발생했던 부분으로 주의하자
{: .notice--info}


### **views.py**

검색필터를 포함한 views.py 함수를 정의합니다 

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

> **filter.qs** : 필터링 QuerySet

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
# **2 Generic View** 

별도의 **views.py** 함수없이, **urls.py** 에서 **Generic View** 를 사용하여 inline 방식으로 활용하는 예시를 알아보도록 합니다.

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
# **3 Filtering Options** 

## **1) String 일부 검색용 필드** 

**일부 검색필드**를 사용하면 **폼 label**도 자동 변경된다.

> **CharFilter(lookup_expr**='icontains')

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/photo/filter2.png">
</figure> 

### **filters.py**

```python
from django_filters import FilterSet, CharFilter

class Userfilter_(FilterSet):
    first_name = CharFilter(lookup_expr='icontains')
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name']
```

## **2) Interger 일부 검색용 필드**

> **NumberFilter**(name = 'date_joined', **lookup_expr** = 'year')

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/photo/filter3.png">
</figure> 

### **filters.py**

```python
from django_filters import FilterSet, CharFilter, NumberFilter

class UserFilter(FilterSet):
    first_name = CharFilter(lookup_expr = 'icontains')
    year_joined = NumberFilter(
                    name = 'date_joined', 
                    lookup_expr = 'year')
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', ]
```

## **3) Interger 일부 검색용 필드**

> **NumberFilter**(name = 'date_joined', **lookup_expr** = 'year')

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


