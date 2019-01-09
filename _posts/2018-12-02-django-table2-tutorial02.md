---
title : Tutorial / django-table2 컬럼 인덱스 2/3
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

이번 페이지에서 정리할 내용을 요약하자면, 1. 테이블 데이터 **출력** 바꾸기 2. 테이블 **컬럼 속성값** 추가하기 3. **header / footer 튜플** 추가하기 입니다.

<br/>
# **1 Alternative Data**
## Table.render_필드명
**Alternative column data :** 컬럼별로 데이터를 변형한다. 이를 적용하기 위해서는 앞에서 미리 컬럼별로 데이터를 일원화 한 정형화된 상태에서 적용해야 효과적이다

### **App/function.py**
> **def render_필드명(self, value) :**

`def render_필드명(self, value) :`  테이블 데이터 **인스턴스 클래스** 내부에 `render_필드명` 함수를 정의하면 **django-table2** 모듈에서 자동으로 **이름이 동일한 필드 데이터를** 호출하여 함수내용을 적용한다.
```python
import itertools 
import django_tables2 as tables
class SimpleTable(tables.Table):
    
    # 인스턴스 생성할 컬럼들 (row_number는 인덱스 값)
    row_number = tables.Column(empty_values=())  
    id_num     = tables.Column()
    age        = tables.Column()
    pay        = tables.Column()
    
    def __init__(self, *args, **kwargs): 
        super(SimpleTable, self).__init__(*args, **kwargs)
        self.counter = itertools.count()
    
    def render_row_number(self): # 반복자 Count
        return 'Row %d' % next(self.counter) 
    
    def render_id_num(self, value): # id 컬럼 < > 씌우기
        return '<%s>' % value
    
    def render_pay(self, value): # 1,000 콤마 추가
        return "{:,}".format(value)
```

### **views.py**
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

## Table.value_필드명
### **테이블 데이터로 출력합니다**
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
```
렌더링한 결과는 다음과 같이 출력합니다
```html
<table>
    <thead>
        <tr><th>Normal</th>
        <th>Upper</th></tr>
    </thead>
    <tbody>
        <tr><td>Hi there!</td>
        <td>HI THERE!</td></tr>
    </tbody>
</table>
```

### **img 등 다양한 포맷으로도 필드내 데이터를 출력**
```python
# 파일이름만 호출하고, 태그를 추가한 탬플릿을 생성 가능하다
from django.utils.html import format_html
class ImageColumn(tables.Column):
    def render(self, value):
        return format_html('<img src="/media/img/{}.jpg" />', value)
```

<br/>
# **2 Alternative Table Template**
## **1) Column 속성값 추가**
> tables.Column(**attrs = {}**)

테이블의 템플릿 컬럼의 **id, class** 속성값을 추가한다
```python
class SimpleTable(tables.Table):
    name = tables.Column(attrs={'th': {'id': 'foo'}})
```
위의 내용을 적용한 결과 render()는 다음과 같이 출력한다
```html
{snip}<thead><tr><th id="foo">{snip}<tbody><tr><td>{snip}
```

## **2) Row 속성값 추가**
> **row_attrs**

```python
class Table(tables.Table):
    class Meta:
        model = User
        row_attrs = {
            'data-id': lambda record: record.pk
        }

# tr 테그에서 속성값을 추가한다.
<tr class="odd" data-id="1"> [...] </tr>
<tr class="even" data-id="2"> [...] </tr>
```

<br/>
# **3 Tabler Header / Footer 추가**
테이블 인스턴스를 수정하는 내용으로 **테이블 인스턴스 클래스** 내부에서 아래의 내용들을 적용 합니다.

## 테이블 Footer를 테이블 클래스 함수에서 구현하기 
테이블 인스턴스 클래스에서 **foorter = '출력할 내용'** 의 방식으로, 테이블 맨 밑줄에 추가할 내용을 입력합니다. [link](https://django-tables2.readthedocs.io/en/latest/pages/column-headers-and-footers.html) 아래의 내용은 `population` 필드값의 총합을 출력하는 예제 입니다.
```python
country = tables.Column(footer='총합 :')
population = tables.Column(
    footer=lambda table: sum(x['population'] for x in table.data))
```

## 테이블 Footer 사용자 함수를 사용하여 구현하기 
위와같이 개별필드에 `in-line` 방식으로도 추가가 가능하지만 복잡한 내용을 다양한 테이블에 적용하기 위해서는 번거로운 작업을 필요로 합니다. 이런 경우를 대비하기 위해서 별도 사용자 함수를 생성하고 이를 재활용하는 예제 입니다.
```python
# 해당 필드의 총합을 계산하는 함수
class SummingColumn(tables.Column):
    def render_footer(self, bound_column, table):
        return sum(bound_column.accessor.resolve(row) for row in table.data)

class Table(tables.Table):
    name = tables.Column()
    country = tables.Column(footer='Total:')
    population = SummingColumn()
```

## Pinned rows 1 : **get_top_pinned_data(self)** 
**테이블의 맨 위 인덱스에 임의의 DataBases 튜플 데이터를 추가**한다. 단 여기에서 추가된 데이터는 필드별 인스턴스가 생선된 뒤에 생성됨으로써, 컬럼별 합계 등 **연산에서는 포함되지 않음에** 유의하자
```python
def get_top_pinned_data(self):
    return [
        {'name': 'Korea',
         'population': 8000,
         '기타': '어쩌고 탑'},]
```

## Pinned rows 2 : **get_bottom_pinned_data(self)** 
위와 동일하고 대신, **테이블 맨 밑에 추가된다**
```python
def get_bottom_pinned_data(self):
    return [
        {'name': 'Korea',
         'population': 1111,
         '기타': '어쩌고 바텀'},]
```
