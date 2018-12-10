---
title : Tutorial / django-table2 중편
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

<br/>
# **3 Alternative Data**

## 1) Table.render_필드명

**Alternative column data :** 컬럼별로 데이터를 변형한다. 이를 적용하기 위해서는 앞에서 미리 컬럼별로 데이터를 일원화 한 정형화된 상태에서 적용해야 효과적이다

### # App/function.py

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

### **1) Column 속성값 추가**

> **tables.Column(attrs = {})**

테이블의 템플릿 컬럼의 **id, class** 속성값을 추가한다 

```python
class SimpleTable(tables.Table):
    name = tables.Column(attrs={'th': {'id': 'foo'}})

# will render something like this:
'{snip}<thead><tr><th id="foo">{snip}<tbody><tr><td>{snip}'
```


### **2) Row 속성값 추가**

> **row_attrs**

```python
class Table(tables.Table):
    class Meta:
        model = User
        row_attrs = {
            'data-id': lambda record: record.pk
        }

tr 테그에서 속성값을 추가한다.
<tr class="odd" data-id="1"> [...] </tr>
<tr class="even" data-id="2"> [...] </tr>
```

<br/>
# **4 Tabler Header / Footer 추가**

페이지별 반복시, 맨 위와 아래에 덧붙일 내용을 입력 합니다. 여기서 추가하는 value 값들은 컬럼별 연산시에는 비해당됨에 유의해야 합니다 

https://django-tables2.readthedocs.io/en/latest/pages/column-headers-and-footers.html