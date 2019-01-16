---
title : Tutorial / django-table - 1/3 기초편
last_modified_at: 2018-12-02T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django-tutorial.png
categories:
  - django
tags: 
    - django
    - python
toc: true 
---


Django를 통해서 간단한 작업을 하다보면 다양한 기능들이 필요로 합니다, 이를 모두 함수로 구현하다 보면 어려움이 많기 때문에 이러한 작업을 효율성을 높이기 위한 다양한 확장팩들이 제작되어 있고 이들 중 대표적인 것으로 3가지를 들 수 있습니다.

1. **Django Table2** [link](https://github.com/jieter/django-tables2/blob/master/docs/pages/tutorial.rst)
2. **Django Crispy Form** [link](https://django-crispy-forms.readthedocs.io/en/latest/) [example](https://simpleisbetterthancomplex.com/tutorial/2018/11/28/advanced-form-rendering-with-django-crispy-forms.html)
3. **Django filter**

1번 같은 경우는 **결과 Table에 다양한 기능**을 추가하기 용이하고, **2번은 form 구성 및 출력을 정돈된 상태로** 출력합니다 <small>**추후 필요한 내용들은 추가 하겠습니다**</small>

<br/>
# **1 Introduction**
1. django-table2 설치하기
2. 테이블 데이터 인스턴스 및 views.py 사용하기
3. Generic View 사용하기 

## **1) Install**
**Django 에서 설치하기**

### $ pip install **django-tables2**

### **setting.py** <small>[link](https://django-tables2.readthedocs.io/en/latest/pages/installation.html)</small>
```python
INSTALLED_APPS = [
    ...
    'django_tables2',
]

TEMPLATES = [
    {'OPTIONS':{
        'context_processors': [ 
            'django.template.context_processors.request',],},},]
```
**TEMPLATES** 부분은 Tutorial에는 있지만, 실제 작업해본 결과 위 내용이 없어도 정상 작동 하였습니다.
{: .notice--info}

## **2) Simple Example** <small>[link](https://django-tables2.readthedocs.io/en/latest/pages/tutorial.html)</small>
Django 기본은 Model - View - Template 으로 연결하지만, **django-table2** 에서는 동적관리를 위해 데이터 들을 **모델 Class Instance** 로 변환한 뒤, 이를 사용하여 다양한 비동기적인 동적결과를 출력합니다  

### tutorial/models.py
```python
class Person(models.Model):
    name = models.CharField(max_length=100)
```

### tutorial/tables.py
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
| django_tables2/**table.html**          |Basic table template (default).|
| django_tables2/**bootstrap.html**     | bootstrap 3 사용 |
| django_tables2/**bootstrap4.html**    | bootstrap 4 사용 |
| django_tables2/**bootstrap-responsive.html**|bootstrap & 반응형 |
| django_tables2/**semantic.html**      | semantic UI 사용 |


### tutorial/views.py
```python
from django.shortcuts import render
from django_tables2 import RequestConfig
from .models import Person
from .tables import PersonTable

def people(request):
    # 모델의 인스턴스 데이터 객체로 변환
    table = PersonTable(Person.objects.all())  
    RequestConfig(request).configure(table)
    content = {'table': table}
    return render(request, 'tutorial/people.html', content)
```
**RequestConfig() :** 모델링 데이터를 `request.GET` 방식을 통해 다양한 기능이 구현 가능합니다. 템플릿 에서는 `{ % render_table % }` 를 사용하여 출력합니다.
{: .notice--info}

### ./app/people.html
```php
<link href="css/bootstrap.min.css" />
    { % load render_table from django_tables2 % }
    { % render_table table % }
```

<br/>
# **2 Generic View** <small>[link](https://django-tables2.readthedocs.io/en/latest/pages/generic-mixins.html)
generic view 로는 **SingleTableView, MultiTableMixin**를 제공한다.

## **1) SingleTableView**
**SingleTableMixin**로 이후의 예제들에 구성되어 있지만, 이번 페이지에서는 **SingleTableView**로 작성이 되어있다. <small>**SingleTableMixin** 에서는 **model** 과 **modelclass** 2개를 요구하는데 이 차이는 아직 이해가 안된다</small>
[일본자료 참고](https://afterall-wonderwall.blogspot.com/2018/01/django-tables2-singletableview.html) 

### ./app/models.py, ./app/tables.py
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

### ./app/views.py
```python
from .models import Person
from .tables import PersonTable
class PersonList(SingleTableView):
    model       = Person
    table_class = PersonTable
    template_name = 'app/template.html'
    table_pagination = False  # 페이지 구분없이 출력
```

### app/template.html
```html
{ % load django_tables2 % }
{ % render_table table % }
```

## **2) MultiTableMixin**
2개 이상의 테이블을 구현하는 경우 예제로써, 내용이 불친절하고 `qs` 가 어떤형식을 이야기하는지 모호해서 우선 기록으로만 남긴다.

### views.py
```python
from django_tables2 import MultiTableMixin
from django.views.generic.base import TemplateView

class PersonTablesView(MultiTableMixin, TemplateView):
    template_name = 'multiTable.html'
    tables = [
        PersonTable(qs),
        PersonTable(qs, exclude=('country', ))]
    table_pagination = {'per_page': 10}
```

### app/multiTable.html
```php
{ % load django_tables2 % }
{ % for table in tables % }
    { % render_table table % }
{ % endfor % }
```
