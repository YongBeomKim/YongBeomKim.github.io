---
title : Mastering Django Core - 고급 Model
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


## 다대일 값 액세스


### 조건에 해당하는 객체에 접근

```python
from .models import Book

b = Book.objects.get(id=10)
b.authors.all()
```


### 외래키에서 엑세스

```python
author = Book.objects.get(first_name='King', last_name='steven')

author.book_set.all()
author.book_set.count()    # .count() 결과물 갯수
author.book_set.filter(title__icontain='python')
```

**Info Notice:** `Book` 소문자 이름에 `_set`을 합친 `book_set` 메서스를 활용하면 **부모 객체로 이동**하여 **query 결과**를 호출한다 (저자의 모든 책 목록을 호출한다)
{: .notice--info}


### 관리자 QuerySets 추가 정의

```python
# 모델의 특정조건 메서드를 정의한다
class KingManager(models.Manager):
    def get_queryset(self):
        return super(KingManager, self).get_queryset().filter(author='king')
```


```python
class Book(models.Model):
    title       = models.CharField(max_length=100)
    king_object = KingManager()  # 특정 메서드 결과를 필드에 저장한다
```

**Book.king_object.all()** 을 사용하면, 'king'이 작성한 책들만 반환한다. **vanilla Manager** 인스턴스 이름으로 설정함에 주의해야한다. **ex) __icontain**, 주의않은경우, 다른 **vanilla Manager** 객체들은 동작이 되지 않는다.
{: .notice--success}



## 모델 메서드

### 모델 식별을 위한 고유 메서드들

ex) _get_full_name(self) : 모델의 인스턴스에서 필요한 인자를 추출

```python
# models.py

class Person(models.Model):
    first_name = models.CharField(max_length=50)
    last_name  = models.CharField(max_length=50)
 
    def _get_full_name(self):
        return "{} {}".format(self.first_name, self.last_name)

    # property : 내부 parametor 접근 (first_name, last_name)
    full_name = property(_get_full_name)
```

객체의 고유값을 식별하는 URL을 갖는 객체는 다음의 2가지를 정의해야 한다 1) **__str__() :** 객체의 유니코드를 반환, 2) **get_absolute_url() :** 객체의 Url을 추출하는 함수를 정의한다
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



## SQL 쿼리

### SQL 쿼리문 실행

```python
for p in Person.objects.raw('SELECT * FROM my_person'):
    print(p)[0]   # list 객체를 반환 
```

**주의할점** SQL에 대한 점검을 수행하지 않으므로, 쿼리결과값이 없을 때 숨은 오류가 발생한다
{: .notice--success} 


### 사용자 정의 SQL 실행

```python
from django.db import connection

def my_custom_sql(self):
    cursor = connection.cursor()
    cursor.execute("UPDATE bar SET foo=1 where... ")
    row = cursor.fetchone()
    return row
```

**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success} 