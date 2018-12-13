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


# Introduction

Simple is Better than Complex 사이트에서 예제로 올라온 **How to Filter QuerySets Dynamically** [site](https://simpleisbetterthancomplex.com/tutorial/2016/11/28/how-to-filter-querysets-dynamically.html) 의 내용을 Django 2.0에 맞게, 그리고 Project에 추가할 때는 어떻게 해야하는지를 실습하면서 그 내용을 정리해 보고자 한다. <small><strike>책을 뒤척이면서 진도가 더디다.. **기본은 완성되었다는 자신감** 속에서 **필요한 예제들을 통해서** 작은 Project를 완성하고 이를 누적해 가면서 실력을 멈추지 말고 Upgrade 하자</strike></small>

# App 만들기 

### models.py

`from django.contrib.auth.models import User` 의 **사용자 정보 Table** 을 사용한다


### filters.py

```python
from django.contrib.auth.models import User
import django_filters

class UserFilter(django_filters.FilterSet):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', ]
```

## views.py

```python
from django.contrib.auth.models import User
from django.shortcuts import render
from .filters import UserFilter

def search(request):
    user_list = User.objects.all()
    user_filter = UserFilter(request.GET, queryset=user_list)
    return render(request, 'search/user_list.html', {'filter': user_filter})
```







```python
from django import forms
from django.contrib.auth.models import User, Groups
import django_filters


class UserFilter(django_filters.FilterSet):
    first_name = django_filters.CharFilter(
        lookup_expr = 'icontains')
    year_joined = django_filters.NumberFilter(
        name = 'date_joined', lookup_expr='year')
    groups = django_filters.ModelMultipleChoiceFilter(
        queryset = Group.objects.all(), 
        widget   = forms.CheckboxSelectMultiple)

    class Meta:
        model = User
        fields = ['username', 'first_name', 
            'last_name', 'year_joined', 'groups']
```