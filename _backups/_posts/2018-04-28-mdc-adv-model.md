---
title : django 고급 Model
last_modified_at: 2018-04-28T12:45:06-05:00
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


<br>
## 다대일 값 액세스


### 조건에 해당하는 객체에 접근

```python
from .models import Book

b = Book.objects.get(id=10)
b.authors.all()
```


### 외래키에서 **메소드**를 활용한 엑세스

```python
b = Book.objects.get(id=50)
b.publisher                   # <== Book 테이블의 publisher 컬럼
<Publisher: Apress Publisher> # 필드와 연결된 외래키 값을 보여준다

b.publisher.website           # <== publisher 컬럼에 외래키 연결 값 직업추출
```


### **외래키참조테이블이름_set**  메소드를 활용한 엑세스

```python
p = Publisher.objects.get(name='Apress')
p.book_set.filter(title__icontain='django')
[<Book: the Django Book>, <Book: Pro Django>]

p.book_set.all()
p.book_set.count()
p.book_set.filter()
```

**.book_set :** `참조 테이블 명` 소문자 이름에 `_set`을 합친 `book_set` 메서스를 활용하면 **외래키 참조 기본키 테이블 객체**의 결과 값을 호출한다
{: .notice--info}


### 사용자 정의 QuerySets 추가

```python
# models.py
from django.db import models

# 모델의 특정조건 메서드를 정의한다
class NigelManager(models.Manager):
    def get_queryset(self):
        return super(NigelManager, self).get_queryset().filter(author='Nigel')

class Book(models.Model):
    nigel_objects = NigelManager()
```

**Book.nigel_object.all() :** 를 사용하면, 'Nigel'이 작성한 책들만 반환한다. 메서드 이름을 정의할 때 **vanilla Manager** 인스턴스 이름으로 설정하지 않도록 주의해야한다
{: .notice--success}


<br>
## 모델 메서드

### 날짜 데이터 특수 메소드

```python
from django.db import models

class Person(models.Model):
    birth_date = models.DateField()

    def babyboomer_status(self):
        import datetime
        if self.birth_date < datetime.date(1945, 8, 1)
            return "베이비 부머 이전 세대입니다"
        elif self.birth_date < datetime.date(1965, 1, 1)
            return "베이비 부머 세대입니다"
        else:
            return "베이비 부머 이후 세대입니다"

    def _get_full_name(self):
        return '{} {}'.format(self.first_name, self.last_name)
    full_name = property(_get_full_name)
```

**property :** 내부 parametor 접근하는 함수 (first_name, last_name), 
**_get_full_name(self) :** 모델의 인스턴스에서 필요한 인자추출 메서드를 정의
{: .notice--success} 


### .save() .delete()를 활용한 객체 수정 : { dict } 모델 Overwrite 

```python
class Blog(models.Model):
    name = models.CharField(max_length=100)
    tagline = models.TextField()
    
    def save(self, *arg, **kwargs):
        to do something ...
        super(Blog, self).save(*arg, **kwargs)  # .save() 메소드를 실행
        do something else()....
```

**.save() :** 파라미터 메서드를 호출 후 저장한다
{: .notice--success}


<br>
## SQL 쿼리

```python
from django.db import models

models.Manager.raw(raw_query, params=None, transpations=None)
```


### SQL 쿼리문 실행

```python
for p in Person.objects.raw('SELECT * FROM my_person'):
    print(p)[0]   # list 객체를 반환 
```

**주의할점** SQL에 대한 점검을 수행하지 않으므로, 쿼리결과값이 없을 때 숨은 오류가 발생한다
{: .notice--success} 


### 사용자 정의 SQL 직접실행

```python
from django.db import connection

def my_custom_sql(self):
    cursor = connection.cursor()
    cursor.execute("UPDATE bar SET foo=1 WHERE ... ")
    cursor.execute("SELECT foo FROM bar WHERE ...")
    row = cursor.fetchone()
    return row
```

**db.connection :** 특정 데이터베이스에 대한 연결을 얻을 수 있다
{: .notice--warning} 
