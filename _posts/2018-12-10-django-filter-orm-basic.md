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
# Tutorial

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
# **Create / Delete**

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
# **Filed Lookup**

**.objects.filter(), .objects.exclude()** 에서는 필드별 구체적인 값에대한 비교만 가능합니다. 이를 극복하기 위한 여러 **검색 조건들을** django 에서는 제공합니다.

## 1) contains lookup

> 모델.objects.**filter**(필드이름**__contains** = "py")

**특정 문자열이 포함된** 튜플을 호출합니다

```python
Author.objects.filter(name__contains="ke")
[Out] QuerySet [<Author: spike : spike@mail.com>...]
```

## 2) icontains lookup

> 모델.objects.**filter**(필드이름**__icontains** = "Py")

case-**insensitive(무감각한)** 로써 **대소문자 구분없이** 판단합니다
  
```python
Author.objects.filter(name__icontains="KE")
[Out] QuerySet [<Author: spike : spike@mail.com>...]
```

## **3) startswith lookup <small>ex> regex : ^</small>**

> 모델.objects.**filter**(필드이름**__startswith**="t")
  
```python
Author.objects.filter(name__startswith="t")
[Out] QuerySet [<Author: tommy : tommy@email.com>...]
```

## **4) endswith lookup <small>ex> regex : $</small>**

> 모델.objects.**filter**(필드이름**__endswith**="com")

```python
Author.objects.filter(email__endswith="com")
[Out] QuerySet [<Author: tom : tom@email.com>...]
```

## **5) Greater than**

> 모델.objects.**filter**(필드이름**__gt**= Integer )

특정한 **값 보다 큰** 튜플을 출력합니다 

```python
Author.objects.filter(id__gt=3)
[Out] QuerySet [<Author: spike : spike@mail.com>...]
```

## **6) Less than**

특정한 **값 보다 작은** 튜플을 출력합니다 

```python
Author.objects.filter(id__lt=3)
[Out] QuerySet [<Author: tommy : tommy@example.com>...]
```

## **7) exact lookup**

```python
Author.objects.filter(name__exact="spike")
[Out] QuerySet [<Author: spike : spike@mail.com>]
```

## **8) iexact lookup**

대소문자 구분없이 일치하는 튜플을 출력합니다

```python
Author.objects.filter(name__iexact="SPIKE")
[Out] QuerySet [<Author: spike : spike@mail.com>...]
```

## 9) isnull lookup

The isnull lookup takes True or False, and adds IS NULL or IS NOT NULL operators to the query respectively.

```python
Author.objects.filter(name__isnull=False)
QuerySet [<Author: tommy : tommy@example.com>...]
```

