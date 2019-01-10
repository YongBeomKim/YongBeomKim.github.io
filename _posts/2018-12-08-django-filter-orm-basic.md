---
title : Tutorial / django ORM
last_modified_at: 2018-12-05T10:45:06-05:00
header:
  overlay_image: /assets/images/book/django-tutorial.png
categories:
  - django
tags: 
    - django
    - python
toc: true 
---

Django 에서 기본으로 제공하는 **filed lookup** 파라미터가 많은데, 이번 페이지 에서는 **Django ORM 기초**를 최대한 압축적으로 정리해 보려고 합니다.

단계적으로 생각해 보면 **SQL Basic -> Django Object Relate -> django-filter** 순서로 정리를 한다면 저위망 포위식의 내용정리가 가능합니다. <small><strike>그러면 django 부터 조금씩 시작해 보겠습니다</strike></small>

<br/>
# 1 Tutorial
**Django 모델**을 호출하고, 필드별 내용을 입력하여 **저장용 인스턴스를** 생성한 뒤, **.save() 메소드를** 실행하면 해당 내용이 DataBase 에 저장됩니다 
```python
from .models import Author
from django.utils import timezone

a = Author(name = 'tom', email = 'example@email.com', 
           last_logged_in = timezone.now, active = True)
a.save()
a.delete()
print(a.id, a.pk)

[Out] 2, 2
```
`settings.py` 에서 `USE_TZ = True` 를 해야만 System 시간값이 아닌 **Django에서 측정된 시간값을** 호출합니다.
{: .notice--info}

<br/>
# **2 Create**
## **objects.create() , .objects.bulk_create()**
1. **.create() :** 1줄씩 정보를 입력
2. **.bulk_create() :** 묶음으로 정보를 입력
```python
a2 = Author.objects.create(name='jerry', email='jerry@mail.com')
a2.save()

Author.objects.bulk_create([
     Author(name='spike', email='spike@mail.com'),
     Author(name='tyke', email='tyke@mail.com'),
     Author(name='droopy', email='droopy@mail.com'), ])
```

<br/>
# **3 Read**
## **.objects.count()**
모델의 튜플 숫자를 카운트 합니다
```python
Author.objects.count()
[Out] 5
```

## **.objects.all()**
모델 내부의 모든 객체를 호출 합니다
```python
l = Author.objects.all()
type(l)
[Out] class django.db.models.query.QuerySet

l
[Out] QuerySet [<Author: tommy : tommy@example.com>...]

l[0]
[Out] Author: tommy : tommy@example.com

for a in l:
    print("Author: {0}".format(a.name))
[Out] Author: tommy
Author: jerry...
```

## **.objects.filter()**
특정조건에 True 인 튜플목록을 호출합니다
```python
Author.objects.filter(name='tommy')
[Out] QuerySet [<Author: tommy : tommy@example.com>]

print(Author.objects.filter(name='tommy').query)
[Out] ... WHERE "djangobin_author"."name" = tommy

Author.objects.filter(id=2)
[Out] QuerySet [<Author: tommy : tommy@example.com>]
```

## **.objects.exclude()**
특정조건에 False 인 튜플목록을 호출합니다
```python
Author.objects.exclude(name='spike', email='spike@mail.com')
[Out] QuerySet [<Author: tommy : tommy@example.com>...]
```

<br/>
# **4 Filed Lookup**
> 모델.objects.**filter**(필드이름**__lookup** = value )

**.objects.filter(), .objects.exclude()** 에서는 필드별 구체적인 값에대한 비교만 가능합니다. 이를 극복하기 위한 여러 **검색 조건들을** django 에서는 제공합니다.

## 1) contains lookup <small>**__contains**</small>
**특정 문자열이 포함된** 튜플을 호출합니다
```python
Author.objects.filter(name__contains="ke")
[Out] QuerySet [<Author: spike : spike@mail.com>...]
```

## 2) icontains lookup <small>**__icontains**</small>
case-**insensitive(무감각한)** 로써 **대소문자 구분없이** 판단합니다
```python
Author.objects.filter(name__icontains="KE")
[Out] QuerySet [<Author: spike : spike@mail.com>...]
```

## 3) startswith lookup <small>**__startswith**</small>
```python
Author.objects.filter(name__startswith="t")
[Out] QuerySet [<Author: tommy : tommy@email.com>...]
```

## 4) endswith lookup <small>**__endswith**</small>
```python
Author.objects.filter(email__endswith="com")
[Out] QuerySet [<Author: tom : tom@email.com>...]
```

## 5) Greater than <small>**__gt**</small>
특정 필드값이 **조건값 보다 큰** 튜플을 출력합니다 
```python
Author.objects.filter(id__gt=3)
[Out] QuerySet [<Author: spike : spike@mail.com>...]
```

## 6) Less than <small>**__lt**</small>
특정 필드값이 **조건값 보다 작은** 튜플을 출력합니다 
```python
Author.objects.filter(id__lt=3)
[Out] QuerySet [<Author: tommy : tommy@example.com>...]
```

## 7) exact lookup <small>**__exact**</small>
```python
Author.objects.filter(name__exact="spike")
[Out] QuerySet [<Author: spike : spike@mail.com>]
```

## 8) iexact lookup <small>**__iexact**</small> 
**대소문자 구분없이** 일치하는 튜플을 출력합니다
```python
Author.objects.filter(name__iexact="SPIKE")
[Out] QuerySet [<Author: spike : spike@mail.com>...]
```

## 9) isnull lookup <small>**__isnull**</small>
해당 필드에 **유효한 값이 있는 모든 튜플들을** 출력합니다 
```python
Author.objects.filter(name__isnull=False)
[Out] QuerySet [<Author: tommy : tommy@example.com>...]
```

## 10) in lookup <small>**__in**</small>
**필드 일치조건을 [List] 형식으로** 입력 합니다
```python
Author.objects.filter(name__in=['spike', 'tyke'])
[Out] QuerySet [<Author: spike : spike@mail.com>...]
```

## 11) __date, __month, __year
Datetime Value 포맷값의 **날짜정보의 일부값을 검색합니다 
```python
Author.objects.filter(created_on__year=2018)
Author.objects.filter(created_on__month=3, created_on__year=2018)
Author.objects.filter(created_on__day=24, created_on__month=3, created_on__year=2018)
```

<br/>
# **5 Chaining QuerySet**
## 1) Chaining Methods
위의 **단일 조건들을 연결하여** 쿼리문으로 사용할 수 있습니다
```python
Author.objects.filter(id__gt=1).\
               exclude(name='spike').\
               filter(name__icontains="o")
[Out] QuerySet [<Author: tommy : tommy@example.com>...]
```

## 2) .first(), .last() 
```python
Author.objects.filter(created_on__year=2018)
Author.objects.filter(created_on__year=2018).first()
Author.objects.filter(created_on__year=2018).last()
```

# **6 복잡한 쿼리문과 Q**
**AND, OR** 조건문을 Django 에서는 **Q**를 통해서 구현합니다
```python
from django.db.models import Q
Q(name__contains="tom")

from django.db.models import Q
Q(name__icontains="tom", email__icontains="example", created_on__year=2018)
```
**filter(), exclude(), get(), Q()** 함수들은 **& (AND)** 그리고 **| (OR)** 필터를 혼용하여 활용 가능합니다.
```python
Author.objects.filter(Q(name__iexact="tommy") | Q(name__iexact="jerry"))
QuerySet [<Author: tommy : tommy@example.com>...]
```

<br/>
# **7 etcs**
## 1) .filter(), .get()
```python
Author.objects.get(name="tommy")
Author.objects.filter(name="tommy")
```
.get() 과 .filter() 는 결과적으로는 동일하지만 구조적인 차이가 있습니다. **.filter()**는 해당 조건에 일치하는 튜플들을 출력하는 반면에, **.get()** 은 특정한 **1개의 튜플 결과만** 출력합니다. 

.get() 메소드 결과값이 2개 이상의 존재하는 경우 **djangobin.models.MultipleObjectsReturned**를 출력하고, 해당값이 없으면 **djangobin.models.DoesNotExist**를 출력합니다.
```python
Author.objects.filter(name__contains="ke")
[Out] QuerySet [<Author: spike : spike@mail.com>, <Author: tyke : tyke@mail.com>]

Author.objects.get(name__contains="ke")
[Out] Traceback (most recent call last): djangobin.models.MultipleObjectsReturned: get() returned more than one Author--it returned 2!

Author.objects.get(name__contains="captain planet")
[Out] Traceback (most recent call last): djangobin.models.DoesNotExist: Author matching query does not exist.
```

## 2) Ordering Results <small>**.order_by()</small>
```python
Author.objects.order_by("id")
Author.objects.filter(id__gt=3).order_by("name")
Author.objects.filter(id__gt=3).order_by("-name")
```

## 3) 출력할 필드를 특정합니다 <small>**.values_list()**</small>
```python
Author.objects.values_list("id", "name")
QuerySet [(2, 'tommy'), (3, 'jerry'), (4, 'spike'), (5, 'tyke'), (6, 'droopy')]
```

## 4) 조건출력 활용하기<small>
```python
Author.objects.filter(name__contains='kim').order_by("name")
Author.objects.values_list("id", "name")
Author.objects.filter(id__gt=3).values_list("id", "name")
```

## 5) 필터링 결과의 Indexing
**.values_list(), .values()** 의 출력결과는 동일하지만, 전자는 **튜플 객체로 구성된 List** 후지는 **Dict 객체로 구성된 List** 를 출력합니다
```python
r = Author.objects.filter(id__gt=3).values_list("id", "name")
r
[Out] QuerySet [(4, 'spike'), (5, 'tyke'), (6, 'droopy')]

r[0]
[Out] (4, 'spike')

r[0][0]
[Out] 4

r[0][1]
[Out] 'spike'
```
```python
r = Author.objects.filter(id__gt=3).values("id", "name")
r
[Out] QuerySet [{'name': 'spike', 'id': 4}, {'name': 'tyke', 'id': 5}]

type(r[0])
[Out] class 'dict'

r[0]
[Out] {'name': 'spike', 'id': 4}

r[0]['name']
[Out] 'spike'

r[0]['id']
[Out] 4
```

## 6) 필터링 결과의 Slicing
```python
Author.objects.order_by("id")[1]
[Out] Author: tyke : tyke@mail.com

Author.objects.order_by("-id")[:3]
[Out] QuerySet [<Author: droopy : droopy@mail.com>..]

Author.objects.filter(id__gt=1).order_by("-id")[2:5]
[Out] QuerySet [<Author: spike : spike@mail.com>, ...]

Author.objects.order_by("-id")[-1]
AssertionError: Negative indexing is not supported.
```

# 8 Updating Multiple Objects
2번 인덱스의 데이터를 새롭게 갱신합니다 
```python
a = Author.objects.get(pk=2)
a
[Out] Author: tommy : tommy@email.com

a.name  = 'tom'
a.email = 'tom@mail.com'
a.save()
a
[Out] Author: tom : tom@mail.com
```
```python
# 조건에 일치하는 컬럼 데이터를 갱신 (갱신된 컬럼값을 출력)
Author.objects.filter(id__gt=3).update(active=True, name='x')
[Out] 3
```

# 9 Delete
특정조건의 QuerySet 을 호출하고 이를 삭제합니다 
```python
a = Author.objects.get(pk=2)
a
[Out] Author: tom : tom@mail.com

a.delete()
[Out] (1, {'djangobin.Author': 1})
```
