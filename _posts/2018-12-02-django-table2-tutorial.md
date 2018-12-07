---
title : Tutorial / django-table2
last_modified_at: 2018-11-20T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django-girls.jpg
categories:
  - django
tags: 
    - django
    - python
toc: true 
---


# django-table2

Django를 통해서 간단한 작업을 하다보면 다양한 기능들이 필요로 한다, 이를 모두 건건이 함수를 구현하다보면 어려움이 많으므로 작업을 효율성을 높이기 위해 다양한 확장팩들이 제작되어 있고 이들 중 대표적인 것들로써

1. **Django Table2** [link](https://github.com/jieter/django-tables2/blob/master/docs/pages/tutorial.rst)
2. **Django Crispy Form** [link](https://django-crispy-forms.readthedocs.io/en/latest/) [example](https://simpleisbetterthancomplex.com/tutorial/2018/11/28/advanced-form-rendering-with-django-crispy-forms.html)

를 만이들 언급하고 추천하고 있었다.
1번 같은 경우는 결과 Table에 다양한 기능을 추가하기 용이하고, 2번은 form 구성 및 출력 형태를 보다 깔끔하고 정돈된 vue 에서 구현한 듯하도록 잘 정돈된 상태로 출력되어 사용하기 용이해 보인다 <small>**추후 사용하면서 필요한 내용들을 추가해보자**</small>


# **Install**

**`$ pip install django-tables2`**<br/>

## setting.py <small>[link](https://django-tables2.readthedocs.io/en/latest/pages/installation.html)</small>

```python
INSTALLED_APPS = [
    'django_tables2',]

TEMPLATES = [
    {'OPTIONS':{
        'context_processors': [ # tutorial 있지만 없어도 됨
            'django.template.context_processors.request',],},},]
```

<br/>
# **Simple Example** <small>[link](https://django-tables2.readthedocs.io/en/latest/pages/tutorial.html)</small>

Django 기본은 Model View Template 연결한다. **django-table2** 에서는 동적관리를 위해 데이터를 **모델 Class Instance**로 변환 후 이를 사용한다.  

## tutorial/models.py
```python
class Person(models.Model):
    name = models.CharField(max_length=100)
```

## tutorial/tables.py
```python
import django_tables2 as tables
from .models import Person

class PersonTable(tables.Table):
    class Meta:
        model = Person
        template_name = 'django_tables2/bootstrap.html'
```

| 템플릿                                | 설명         |
|:-------------------------------------:|:-------------------------:|
| django_tables2/table.html              |Basic table template (default).|
| django_tables2/bootstrap.html          | bootstrap 3 사용 |
| django_tables2/bootstrap4.html         | bootstrap 4 사용 |
| django_tables2/bootstrap-responsive.html|bootstrap & 반응형 |
| django_tables2/semantic.html           | semantic UI 사용   |


## tutorial/views.py
```python
from django.shortcuts import render
from django_tables2 import RequestConfig
from .models import Person
from .tables import PersonTable

def people(request):
    table = PersonTable(Person.objects.all()) # 모델 인스턴스 데이터 
    RequestConfig(request).configure(table)   
    return render(request, 'tutorial/people.html', {'table': table})
```
**RequestConfig() :** 모델링 데이터를 `request.GET` 방식을 통해 다양한 기능을 구현한다. 템플릿은 `{ % render_table % }` 로 출력한다.

## app/people.html
```php
<link href="css/bootstrap.min.css" />
{ % load render_table from django_tables2 % }
{ % render_table table % }
```

<br/>
# **Generic View** <small>[link](https://django-tables2.readthedocs.io/en/latest/pages/generic-mixins.html)

위의 작업을 보다 간단하게 구현하는 generic view 로써 **SingleTableMixin, MultiTableMixin**를 제공한다.


## **SingleTableMixin**

위의 작업들을 아래와 같이 간략하게 구현 가능하다.

## models.py, tables.py
```python
# app/models.py
class Person(models.Model):
    first_name = models.CharField(max_length=200)
    last_name  = models.CharField(max_length=200)

# app/tables.py
import django_tables2 as tables
class PersonTable(tables.Table):
    class Meta:
        model = Person
```

## app/views.py
```python
from .models import Person
from .tables import PersonTable
class PersonList(SingleTableView):
    model       = Person
    table_class = PersonTable
    template_name = 'app/template.html'
```

## app/template.html
```html
{ % load django_tables2 % }
{ % render_table table % }
```


