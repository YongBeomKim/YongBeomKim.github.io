---
title : Django Filters (내장모듈)
last_modified_at: 2019-05-06T12:45:06-05:00
header:
  overlay_image: /assets/images/code/django.jpg
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
# **Tutorial**
**Django 모델**을 호출하고, 필드별 내용을 입력하여 **저장용 인스턴스를** 생성한 뒤, **.save() 메소드를** 실행하면 해당 내용이 DataBase 에 저장됩니다 

```python
from .models import Author
from django.utils import timezone

a = Author(name = 'tom', 
    email = 'example@email.com',
    last_logged_in = timezone.now, 
    active = True)
a.save()
a.delete()
print(a.id, a.pk)
[Out] 2, 2
```

`settings.py` 에서 `USE_TZ = True` 로 변경해야 System 시간값이 아닌 **Django에서 정의한 시간대 값을** 호출 합니다.
{: .notice--info}

<br/>
# **Create**
## **objects.create() , .objects.bulk_create()**
1. **.create() :** 1줄씩 정보를 입력
2. **.bulk_create() :** 여러 [묶음정보](https://m.blog.naver.com/PostView.nhn?blogId=jung_kj&logNo=221002011537&proxyReferer=https%3A%2F%2Fwww.google.com%2F) 를 한번에 입력 합니다

데이테 입력시 **bulk** 기능의 편리함으로 인해 **[Django 2.2](https://docs.djangoproject.com/en/2.2/releases/2.2/)** 부터는 **[Queryset.bulk_update()](https://docs.djangoproject.com/en/2.2/ref/models/querysets/#django.db.models.query.QuerySet.bulk_update)** 메서드가 추가 되었습니다. 기타 `iso_year` 등 다양한 메소드가 추가 되어 있습니다.

```python
a2 = Author.objects.create(
    name = 'jerry', 
    email='jerry@mail.com')
a2.save()
Author.objects.bulk_create([
     Author(name='spike', email='spike@mail.com'),
     Author(name='tyke', email='tyke@mail.com'),
     Author(name='droopy', email='droopy@mail.com'), ])
```

**create()** 는 개별 que 를 만들어 DataBase 에 접속과 해제를 반복하여 속도가 느립니다. 따라서 **bulk_create()** 를 사용하여 한번의 접속으로 데이터를 입력하면 보다 빠른 결과를 도출 가능합니다.
{: .notice--info}

<br/>
# **Read**
## **.objects.count()**
모델의 튜플 숫자를 카운트 합니다

```python
Author.objects.count()
[Out] 5
```

## **.objects.all()**
모델 내부의 모든 객체를 호출 합니다

```python
[In] l = Author.objects.all()
[In] type(l)
[Out] class django.db.models.query.QuerySet

[In] l
[Out] QuerySet [<Author: tommy : tommy@example.com>...]

[In] l[0]
[Out] Author: tommy : tommy@example.com

[In] for a in l:
[In]     print("Author: {0}".format(a.name))
[Out] Author: tommy
Author: jerry...
```

## **.objects.filter()**
특정조건에 True 인 튜플목록을 호출합니다

```python
[In] Author.objects.filter(name='tommy')
[Out] QuerySet [<Author: tommy : tommy@example.com>]

[In] print(Author.objects.filter(name='tommy').query)
[Out] ... WHERE "djangobin_author"."name" = tommy

[In] Author.objects.filter(id=2)
[Out] QuerySet [<Author: tommy : tommy@example.com>]
```

## **.objects.exclude()**
특정조건에 False 인 튜플 목록을 호출합니다

```python
[In] Author.objects.exclude(name='spike', email='spike@mail.com')
[Out] QuerySet [<Author: tommy : tommy@example.com>...]
```

<br/>
# **Lookup Filter**

> 모델.objects.**filter**(필드이름**__lookup** = value )

**.objects.filter(), .objects.exclude()** 에서는 필드별 구체적인 값에대한 비교만 가능합니다. 이를 극복하기 위한 여러 **검색 조건들을** django 에서는 제공합니다.

## 1) contains lookup <small>**__contains**</small>
**특정 문자열이 포함된** 튜플을 호출합니다

```python
[In] Author.objects.filter(name__contains="ke")
[Out] QuerySet [<Author: spike : spike@mail.com>...]
```

## 2) icontains lookup <small>**__icontains**</small>
case-**insensitive(무감각한)** 로써 **대소문자 구분없이** 판단합니다

```python
[In] Author.objects.filter(name__icontains="KE")
[Out] QuerySet [<Author: spike : spike@mail.com>...]
```

## 3) startswith lookup <small>**__startswith**</small>

```python
[In] Author.objects.filter(name__startswith="t")
[Out] QuerySet [<Author: tommy : tommy@email.com>...]
```

## 4) endswith lookup <small>**__endswith**</small>

```python
[In] Author.objects.filter(email__endswith="com")
[Out] QuerySet [<Author: tom : tom@email.com>...]
```

## 5) Greater than <small>**__gt**</small>
특정 필드값이 **조건값 보다 큰** 튜플을 출력합니다 

```python
[In] Author.objects.filter(id__gt=3)
[Out] QuerySet [<Author: spike : spike@mail.com>...]
```

## 6) Less than <small>**__lt**</small>
특정 필드값이 **조건값 보다 작은** 튜플을 출력합니다 

```python
[In] Author.objects.filter(id__lt=3)
[Out] QuerySet [<Author: tommy : tommy@example.com>...]
```

## 7) exact lookup <small>**__exact**</small>

```python
[In] Author.objects.filter(name__exact="spike")
[Out] QuerySet [<Author: spike : spike@mail.com>]
```

## 8) iexact lookup <small>**__iexact**</small> 
**대소문자 구분없이** 일치하는 튜플을 출력합니다

```python
[In] Author.objects.filter(name__iexact="SPIKE")
[Out] QuerySet [<Author: spike : spike@mail.com>...]
```

## 9) isnull lookup <small>**__isnull**</small>
해당 필드에 **유효한 값이 있는 모든 튜플들을** 출력합니다 

```python
[In] Author.objects.filter(name__isnull=False)
[Out] QuerySet [<Author: tommy : tommy@example.com>...]
```

## 10) in lookup <small>**__in**</small>
**필드 일치조건을 [List] 형식으로** 입력 합니다

```python
[In] Author.objects.filter(name__in=['spike', 'tyke'])
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
# **4 Chaining QuerySet**
## 1) Chaining Methods
위의 **단일 조건들을 연결하여** 쿼리문으로 사용할 수 있습니다

```python
[In] Author.objects.filter(id__gt=1).\
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

# **5 복잡한 쿼리문과 Q**
**AND, OR** 조건문과 함께, Django 에서는 **Q** 를 활용하여 **조회용 Qurey** 객체를 생성합니다.

```python
[In] from django.db.models import Q
[In] Q(name__contains="tom")
[Out] <Q: (AND: ('name__contains', 'tom'))>

[In] from django.db.models import Q
[In] Q(name__icontains="tom", 
      email__icontains="example", 
      created_on__year=2018)
[Out] <Q: (AND: ('created_on__year', 2018),
    ('email__icontains', 'example'), 
    ('name__icontains', 'tom'))>
```

**filter(), exclude(), get(), Q()** 함수들은 **& (AND)** 그리고 **| (OR)** 필터를 혼용하여 활용 가능합니다.

```python
[In] Author.objects.filter(Q(name__iexact="tommy") | Q(name__iexact="jerry"))
[Out] QuerySet [<Author: tommy : tommy@example.com>...]
```

<br/>
# **etcs**
## 1) .filter(), .get()

```python
[In] Author.objects.get(name="tommy")
[In] Author.objects.filter(name="tommy")
```

.get() 과 .filter() 는 결과적으로는 동일하지만 구조적인 차이가 있습니다. **.filter()**는 해당 조건에 일치하는 **튜플 [list]** 를 출력하고, **.get()** 은 특정한 **1개 튜플** 을 출력 합니다. 

.get() 메소드 결과값이 2개 이상의 존재하는 경우 **djangobin.models.MultipleObjectsReturned**를 출력하고, 해당값이 없으면 **djangobin.models.DoesNotExist**를 출력합니다.

```python
[In] Author.objects.filter(name__contains="ke")
[Out] QuerySet [<Author: spike : spike@mail.com>, 
    <Author: tyke : tyke@mail.com>]

[In] Author.objects.get(name__contains="ke")
[Out] Traceback (most recent call last): djangobin.
  models.MultipleObjectsReturned: get() returned 
  more than one Author--it returned 2!

[In] Author.objects.get(name__contains="captain planet")
[Out] Traceback (most recent call last): djangobin.
  models.DoesNotExist: Author matching query does not exist.
```

## 2) Ordering Results <small>**.order_by()**</small>

```python
Author.objects.order_by("id")
Author.objects.filter(id__gt=3).order_by("name")
Author.objects.filter(id__gt=3).order_by("-name")
```

## 3) 출력할 필드를 특정합니다 <small>**.values_list()**</small>

```python
[In] Author.objects.values_list("id", "name")
[Out] QuerySet [(2,'tommy'), (3,'jerry'), 
  (4,'spike'), (5,'tyke'), (6,'droopy')]
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
[In] r = Author.objects.filter(id__gt=3).values_list("id", "name")
[In] r
[Out] QuerySet [(4, 'spike'), (5, 'tyke'), (6, 'droopy')]

[In] r[0]
[Out] (4, 'spike')

[In] r[0][0]
[Out] 4

[In] r[0][1]
[Out] 'spike'
```

```python
[In] r = Author.objects.filter(id__gt=3).values("id", "name")
[In] r
[Out] QuerySet [{'name': 'spike', 'id': 4}, 
  {'name': 'tyke', 'id': 5}]

[In] type(r[0])
[Out] class 'dict'

[In] r[0]
[Out] {'name': 'spike', 'id': 4}

[In] r[0]['name']
[Out] 'spike'

[In] r[0]['id']
[Out] 4
```

## 6) 필터링 결과의 Slicing

```python
[In] Author.objects.order_by("id")[1]
[Out] Author: tyke : tyke@mail.com

[In] Author.objects.order_by("-id")[:3]
[Out] QuerySet [<Author: droopy : droopy@mail.com>..]

[In] Author.objects.filter(id__gt=1).order_by("-id")[2:5]
[Out] QuerySet [<Author: spike : spike@mail.com>, ...]

[In] Author.objects.order_by("-id")[-1]
[Out] AssertionError: Negative indexing is not supported.
```

<br/>
# Updating Multiple Objects
2번 인덱스의 데이터를 새롭게 갱신합니다 

```python
[In] a = Author.objects.get(pk=2)
[In] a
[Out] Author: tommy : tommy@email.com

[In] a.name  = 'tom'
[In] a.email = 'tom@mail.com'
[In] a.save()
[In] a
[Out] Author: tom : tom@mail.com
```

```python
# 조건에 일치하는 컬럼 데이터를 갱신 (갱신된 컬럼값을 출력)
[In] Author.objects.filter(id__gt=3).update(active=True, name='x')
[Out] 3
```

<br/>
# Delete
특정조건의 QuerySet 을 호출하고 이를 삭제합니다 

```python
[In] a = Author.objects.get(pk=2)
[In] a
[Out] Author: tom : tom@mail.com

[In] a.delete()
[Out] (1, {'djangobin.Author': 1})
```
