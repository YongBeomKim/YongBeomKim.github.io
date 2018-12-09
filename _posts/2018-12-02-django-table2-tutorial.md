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

를 추천하고 있었다.

1번 같은 경우는 **결과 Table에 다양한 기능**을 추가하기 용이하고, **2번은 form 구성 및 출력 형태를 보다 깔끔하고 정돈**되어 vue 에서 구현한 듯하도록 잘 정돈된 상태로 출력되어 사용하기 용이해 보인다 <small>**추후 사용하면서 필요한 내용들을 추가해보자**</small>


# **1 Introduction**

## **1) Install**
**Django 에서 설치하기**

### terminal

**`$ pip install django-tables2`**<br/>

### **setting.py** <small>[link](https://django-tables2.readthedocs.io/en/latest/pages/installation.html)</small>

```python
INSTALLED_APPS = [
    'django_tables2',]

TEMPLATES = [
    {'OPTIONS':{
        'context_processors': [ # tutorial 있지만 없어도 됨
            'django.template.context_processors.request',],},},]
```

<br/>
## **2) Simple Example** <small>[link](https://django-tables2.readthedocs.io/en/latest/pages/tutorial.html)</small>

Django 기본은 Model View Template 연결한다. **django-table2** 에서는 동적관리를 위해 데이터를 **모델 Class Instance**로 변환 후 이를 사용한다.  

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
| django_tables2/table.html              |Basic table template (default).|
| django_tables2/bootstrap.html          | bootstrap 3 사용 |
| django_tables2/bootstrap4.html         | bootstrap 4 사용 |
| django_tables2/bootstrap-responsive.html|bootstrap & 반응형 |
| django_tables2/semantic.html           | semantic UI 사용   |


### tutorial/views.py
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

### app/people.html
```php
<link href="css/bootstrap.min.css" />
{ % load render_table from django_tables2 % }
{ % render_table table % }
```

<br/>
# **2 Generic View** <small>[link](https://django-tables2.readthedocs.io/en/latest/pages/generic-mixins.html)

위의 작업을 보다 간단하게 구현하는 generic view 로써 **SingleTableView, MultiTableMixin**를 제공한다.


## **1) SingleTableView**

**SingleTableMixin**로 이후의 예제들에 구성되어 있지만, 이번 페이지에서는 **SingleTableView**로 작성이 되어있다. <small>**SingleTableMixin** 에서는 **model** 과 **modelclass** 2개를 요구하는데 이 차이는 아직 이해가 안된다</small>
[일본자료 참고](https://afterall-wonderwall.blogspot.com/2018/01/django-tables2-singletableview.html) 

### models.py, tables.py
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

### app/views.py
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

2개 이상의 테이블을 구현하는 경우 예제로써, 내용이 불친절하고 `qs` 가 어떤형식을 이야기하는지 모*호해서 우선 기록으로만 남긴다.

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

```php
{ % load django_tables2 % }
{ % for table in tables % }
    { % render_table table % }
{ % endfor % }
```

<br/>
# **3 Alternative Data**

## 1) Table.render_필드명

**Alternative column data :** 컬럼별로 데이터를 변형한다. 이를 적용하기 위해서는 앞에서 미리 컬럼별로 데이터를 일원화 한 정형화된 상태에서 적용해야 효과적이다

### App/function.py

> **def render_필드명(self, value) :**

`def render_필드명(self, value) :`  테이블 데이터 **인스턴스 클래스** 내부에 `render_필드명` 함수를 정의하면 **django-table2** 모듈에서 자동으로 **이름이 동일한 필드 데이터를** 호출하여 함수내용을 적용한다.

```python
import django_tables2 as tables
import itertools 
class SimpleTable(tables.Table):
    
    # 인스턴스 생성할 컬럼들 (row_number는 인덱스 값)
    row_number = tables.Column(empty_values=())  
    id_num     = tables.Column()
    age        = tables.Column()
    pay        = tables.Column()
    
    def __init__(self, *args, **kwargs): 
        super(SimpleTable, self).__init__(*args, **kwargs)
        self.counter = itertools.count()
    
    def render_row_number(self):  # 반복자 Count
        return 'Row %d' % next(self.counter) 
    
    def render_id_num(self, value): # id 컬럼 < > 씌우기
        return '<%s>' % value
    
    def render_pay(self, value): # 1,000 콤마 추가
        return "{:,}".format(value)
```

### views.py

```python
# 임의의 데이터 Set
data_set = [
    {'age': 31, 'id_num': 10, 'pay':False}, 
    {'age': 34, 'id_num': 11, 'pay':232123},
    {'age': 41, 'id_num': 13, 'pay':523123},
    {'age': 39, 'id_num': 18, 'pay':928123},
    {'age': 32, 'id_num': 91, 'pay':132123},]

from .function import SimpleTable
table = SimpleTable(data_set)

for i in range(3):
    print(', '.join(map(str, table.rows[i])))

>>> Row 0, <10>, 31, 0
Row 1, <11>, 34, 232,123
Row 2, <13>, 41, 523,123
```


## 2) Table.value_필드명

### 테이블 데이터로 출력합니다

```python
import django_tables2 as tables
class UpperColumn(tables.Column):
    def render(self, value):
        return value.upper()

class Example(tables.Table):
    normal = tables.Column()
    upper  = UpperColumn()

data = [{'normal': 'Hi there!',
         'upper':  'Hi there!'}]

table = Example(data)
# 테이블 결과값을 렌더링한 결과값
'''<table>
    <thead><tr><th>Normal</th><th>Upper</th></tr></thead>
    <tbody><tr><td>Hi there!</td><td>HI THERE!</td></tr></tbody>
</table>'''
```

### img 등 다양한 포맷으로도 변형하여 출력 가능하다

```python
# 파일이름만 호출하고, 태그를 추가한 탬플릿을 생성 가능하다
from django.utils.html import format_html
class ImageColumn(tables.Column):
    def render(self, value):
        return format_html('<img src="/media/img/{}.jpg" />', value)
```


<br/>
# **4 Alternative Table Template**

> **tables.Column(attrs = {})**

테이블의 템플릿 컬럼의 **id, class** 속성값을 추가한다 

```python
class SimpleTable(tables.Table):
    name = tables.Column(attrs={'th': {'id': 'foo'}})

# will render something like this:
'{snip}<thead><tr><th id="foo">{snip}<tbody><tr><td>{snip}'
```






