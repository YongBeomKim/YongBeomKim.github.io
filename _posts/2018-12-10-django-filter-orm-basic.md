---
title : Example / django ORM
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


# **Introduction**

django-filter 모듈의 내용을 정리하면서 **filed lookup** 파라미터들이 잔뜩 등장하였다. 기본으로 보자면 **SQL Basic** -> **Django Object Relate** -> **django-filter** 순서로 정리를 한다면 저위망 포위식의 내용정리가 가능할 것으로 보입니다. <small><strike>조금씩 시작해보자 django 부터 ㅜㅜ</strike></small>

이번 페이지 에서는 **Django ORM 기초**를 최대한 압축적으로 정리해 보려고 합니다.

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
# **2 Create / Delete**

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
[Out] class 'django.db.models.query.QuerySet'

l
[Out] QuerySet [<Author: tommy : tommy@example.com>, <Author: jerry : jerry@mail.com>, <Author: spike : spike@mail.com>, <Author: tyke : tyke@mail.com>, <Author: droopy : droopy@mail.com>]

l[0]
[Out] Author: tommy : tommy@example.com

for a in l:
    print("Author: {0}".format(a.name))

[Out] Author: tommy
Author: jerry
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

Datetime Value 포맷값의 날짜정보의 일부값을 검색합니다 
  
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


# **6 etcs**

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


[link](https://overiq.com/django-1-11/django-orm-basics-part-1/)
Selecting the Fields 부분에서 마무리 작업을 진행하자...