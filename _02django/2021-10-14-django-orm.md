---
layout: blog
title: Django ORM Query
tags:
- django
---

Django 에서 유용한 tip 들을 [gaussian37.github.io](https://gaussian37.github.io/) 에서 추출한 내용들로 정해 봅니다. 정리한 내용은 다음과 같습니다.

1. Django ORM QuerySet Filter
2. related_name 설정 시 prefetch_related 사용
3. QuerySet 정렬

<br>

## [Django QuerySet Filter](https://gaussian37.github.io/python-django-django-query-set/)

+ 장고에서 테이블을 조회할 때, `filter`를 사용하여 필요한 데이터만 조회하는 작업을 합니다.
+ `filter`를 사용하여 데이터를 `lookup`하는 대표적인 방법 입니다.

+ `exact` : 정확히 일치하는 데이터 찾기
    + 만약 `None`을 찾는다고 하면 `Null`을 찾는 것과 동일합니다. **isnull**

```python
Entry.objects.get(id__exact=14)
Entry.objects.get(id__exact=None)
``` 

+ `iexact` : 대소문자를 구분하지 않고 정확히 일치하는 데이터 찾기

```python
Blog.objects.get(name__iexact='beatles blog')
Blog.objects.get(name__iexact=None)
```

+ `contains`, `icontains` : 포함하는 문자열 찾기 (`icontains`는 대소문자 구분하지 않음)
+ 아래 코드는 headline에서 **Lennon**이라는 문자열을 포함하는 object를 찾습니다.

```python
Entry.objects.get(headline__contains='Lennon')
```

+ `in` : list, tuple, string 또는 queryset과 같이 iterable한 객체를 대상으로 각 원소를 조회합니다.

```python
Entry.objects.filter(id__in=[1, 3, 4])
: SELECT ... WHERE id IN (1, 3, 4);

Entry.objects.filter(headline__in='abc')
: SELECT ... WHERE headline IN ('a', 'b', 'c');
``` 

+ 또는 다음과 같이 queryset를 직접 조건으로 넣을 수 있습니다. (성능 체크 필요)

```python
inner_qs = Blog.objects.filter(name__contains='Cheddar')
entries = Entry.objects.filter(blog__in=inner_qs)
:SELECT ... WHERE blog.id IN (SELECT id FROM ... WHERE NAME LIKE '%Cheddar%')
```

+ `gt`, `gte`, `lt`, `lte` 와 같이 부등호를 사용할 수 있습니다.

```python
Entry.objects.filter(id__gt=4)
: SELECT ... WHERE id > 4;
```

+ `startswith`, `istartswith`, `endswith`, `iendswith`는 각각 접미사, 접두사를 찾습니다.

```python
Entry.objects.filter(headline__startswith='Lennon')
Entry.objects.filter(headline__endswith='Lennon')
```

+ `range`는 범위에 해당하는 object를 찾습니다.

```python
import datetime
start_date = datetime.date(2005, 1, 1)
end_date = datetime.date(2005, 3, 31)
Entry.objects.filter(pub_date__range=(start_date, end_date))
```

<br>

## [related_name 설정 시 prefetch_related 사용](https://gaussian37.github.io/python-django-related_name/)

Django Model 에서 [related_name](https://velog.io/@brighten_the_way/Django%EC%99%80-Reverse-relations%EA%B3%BC-Relatedname) 속성은 Primary 오브젝트 에게 Foreign 오브젝트를 연결하는 Method 입니다.

```python
class Store(models.Model):
    artist = models.ForeignKey(
      Artist, on_delete=models.CASCADE, related_name='store')

In [1]: Artist.objects.get(id=1).store.all()
Out[1]: <QuerySet [<...>]>
```

장고 model 에서 ForeignKey를 사용 할 때, 특히 한 모델에서 여러 개의 ForeignKey가 있을 때, `related_name` 을 이용하여 ForeignKey 의 이름을 정할 수 있습니다.

예를 들어 모델 A의 pk를 모델 B가 FK로 사용하고 있다고 가정합시다.
장고는 lazy 하게 SQL 작업을 수행하므로 ForeignKey로 접근한 데이터에 대한 작업이 여러번 필요한 경우로써 **join 연산이 필요** 한 경우에는 `prefetch_related` 를 통하여 필요한 query를 바로 가져와서 작업하는 것이 효율적 입니다.

이 때, `prefetch_related`는 다음과 같이 사용할 수 있습니다.

```python
A.objects.prefetch_related("B_set")
```

즉, A 모델이 B 모델의 FK를 통하여 join 한 결과 값을 lazy하지 않게 한번에 가져올 때 사용합니다.
`prefetch_ralated` 내용은 제 블로그의 다른 글에서 확인해 보시면 되겠습니다.

이 때 중요한 것은 related_name을 이용한 경우 `model_set` 형태가 아니라 `related_name` 자체를 입력해 주면 되겠습니다.

예를 들면 아래와 같습니다.

```python
class Price(models.Model):
    book = models.ForeignKey(Book, related_name='prices')
    
books = Book.objects.prefetch_related('prices')
```

다시 하면 정리하면 `related_name`을 사용한 경우 `prefetch_related`를 사용할 때, `foo_set`을 파라미터로 사용하지 않고
`related_name`을 바로 사용하면 됩니다. 

<br>

## [QuerySet 정렬](https://gaussian37.github.io/python-django-queryset-%EC%98%A4%EB%A6%84%EC%B0%A8%EC%88%9C,-%EB%82%B4%EB%A6%BC%EC%B0%A8%EC%88%9C-%EC%A0%95%EB%A0%AC/)

장고 ORM을 이용하여 DB를 읽을 때, 기본적으로 필요한 작업이 
오름차순(ascending)/내림차순(descending)으로 특정 field를 가져오는 것입니다.

ORM을 이용하여 DB를 가져올 때 어떻게 하면 될까요?

`A`라는 모델이 있다고 가정합시다. `A`의 모든 데이터를 긁어 오려면 다음과 같이 입력하면 됩니다.

```python
A.objects.all()
```

그 다음에 `order_by()`를 사용하면 됩니다. 이 때 인자로 들어갈 문자열은 field의 이름입니다.
A 라는 모델에 `point`라는 field가 있다고 합시다. 그러면 다음과 같이 읽어올 수 있습니다.

```python
A.objects.all().order_by('point')
```

이렇게 읽어오면 오름차순으로 읽어오게 됩니다. 기본값은 오름차순 입니다.

```python
A.objects.all().order_by('-point')
```

이렇게 읽어오면 내림차순으로 읽어오게 됩니다.

정리하면 `order_by('filed 이름)`으로 DB 조회 시 오름차순/내림차순을 결정하게 되고 이 때,
filed이름 앞에 **-** 를 붙이면 내림차순으로 읽어오게 됩니다.

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
<br/>

# **디자이너 개발자의 웹기획 및 웹개발**

```python
In [1]: import requests
In [2]: url = 'http://www.naver.com'
In [3]: response = requests.get(url).text
In [4]: response[400:600]
Out[4]: '<meta name="robots" content="index,nofollow"/>\n<meta name="description" content="네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요"/>'
```
작업단계에서는 함수로써 클래스/ 함수작업을 진행하고, 어느정도 완결성을 갖추고 나면 **프로젝트.whl** 와 같이 해당 프로젝트 이름을 사용한 [패키지 모듈을](https://yongbeomkim.github.io/python/python-package-tutorial/) 제작/ 활용하여 단계별 완결성을 갖춰 나아가는 습관을 갖도록 합니다.

<br/>

# Django Model 만들기
배경문서와 자료들이 어느정도 구체화 되고나면, 문서화 작업과 함께 Django 서버에 적용합니다.

**데이터는 sqlite3, 호출은 Django QuerySet, 구현은 HTML**  Jupyter 에서 함수로 구조화한 뒤 **해당 함수들을 묶어서 whl 모듈로** 묶으면서 진도를 진행하다 보면, 작업의 진행속도가 빨라지면서 구조화의 난이도가 낮아지게 될 것입니다.

## models.py
입력을 원하는 데이터

사용자가 원하는 모델의 클래스 Table, 필드 객체와 매칭하면 모델링은 어렵지 않게 접근 가능합니다. 다만 모든 테이블을 단일하게 구성하면 **불필요하게 반복되는 내용들로 성능에 저하** 가 생깁니다.

개별 **Table 클래스** 객체에서는 활용가능한 여러 메소드들을 제공합니다.
```python
from book.models import Book
Book.objects.get()
모델클래스.모델매니저.관계매니저()
```

## **모델 매니저 : models.Manager**
기본 모델 매니저는 **.objects** 를 사용 합니다. **ForeignKey, ManyToMany** 와 같이 역관계 접근을 위한 **모델클래스(소문자)_set** 매니저, 그리고 사용자가 정의한 임의의 매니저가 필요한 경우에는 **models.Manager** 를 활용하여 **사용자 정의 모델 매니저** 를 정의 후 필드에 연결 합니다

## **관계 매니저**
**objects** 를 사용하여 해당 테이블에 접근한 뒤, 기본적인 조건 및 관계식을 정의하여 원하는 결과를 출력합니다. 대표적인 것들로는 **.all(), .get(), .filter(), .exclude(), .create(), .delete(), .remove(), .clear()** 등이 있고, 필드의 성격에 따라 추가 제공가능한 메소드 들을 정리합니다

.remove(), .clear() 메소드는 상대객체의 값을 제거하지 않고, 상대객체의 관계를 끊어버리는 역활만 합니다.
{: .notice--info}

## ForeignKey(테이블 클래스)
다른 **부모 Table 의 id값** 을 상속받아, 자식 테이블에서 **부모테이블_id** 필드에서 매칭 합니다.

```python
# Create your models here.
class Publisher(models.Model):
    name    = models.CharField(max_length=30)

class Book(models.Model):
    publisher = models.ForeignKey(
      "books.Publisher",      # App.모델클래스 
      on_delete = models.CASCADE,
      related_name = "books", # "books+" 역제한
      related_query_name = "book")
```

**Publisher** 테이블 정보를 **Book** 에서 상속합니다.
1. **Publisher** 테이블에서 객체를 특정한 인스턴스를 생성
2. **(자식테이블 소문자)_set** 메소드로 **자식테이블** 에 접근합니다

**Django Python Shell**
```python
from books.models import Publisher, Book

# 1 foreign 필드 조회하기
# Book 테이블을 book_set 인스턴스로 접근
p = Publisher.objects.get(name__contains="Apress")
p.book_set.all()          # Apress 출판사의 전체 Book 목록
p.book_set.filter(title__icontains="django") # 제목 필터링

# 2 역방향 관리자로 부모필드 조회하기
# related_name 관리자를 활용합니다
b = Book.objects.get(id=1)
b.publisher_set(manager='books').all()

# 3 부모필드 업데이트
# Book 테이블을 직접 연결하여 접근
b = Publisher(name='Aplus')
e = Book(publisher=b)
e.save()
```

mastering Django 내용보다 (694p) [위의 방식이](https://stackoverflow.com/questions/46314246/how-to-update-a-foreign-key-field-in-django-models-py) 직관적이여서 알기 쉽습니다. 그리고 ForeignKeyManager 에는 추가 메서드를 제공합니다.

1. **add()** 지정된 모델객체를 추가
2. **create()** 새로운 객체 세트를 저장
3. **remove()** 지정된 모델객체를 제거
4. **clear()** 관련된 모든객체를 제거
5. **set()** 관련 객체세트를 대체


## ManyToManyField(테이블 클래스)
외래키와 대부분은 동일하고, 모델 instance 대신 **QuerySet** 값을 추출합니다
```python
# Create your models here.
class Author(models.Model):
    name = models.CharField(max_length=30)

class Book(models.Model):
    authors = models.ManyToManyField(Author)
```

**Django Python Shell**
```python
from books.models import Book, Author

# 1 조회하기
b = Book.objects.get(id=1)
b.authors.filter(last_name="Kim") 

# 2 역방향 조회하기 (모델_set)
# related_name 을 사용합니다
a = Author.objects.get(id=1)
a.book_set.all() # a 작가의 모든책을 출력

# 3 데이터 추가하기
book = Book.objects.get(pk=1)
bill = Author.objects.create(name="Bill")
john = Author.objects.create(name="John")
book.authors.add(bill, john)
```

**ManytoMany 필드** 에서 동작하는 **.all .filter** 메소드는 **1개의 튜플만 선택했을 떄** 작동을 합니다. 이점을 주의해서 진행 합니다.
{: .notice--danger}

<br/>
# Model 의 **QuerySet**
django 에서 기본으로 제공하는 방식만이 아닌, 사용자가 원하는 필터링 방법들을 활용해 보겠습니다.

## **커스텀 모델 매니저** QuerySets 추가
사용자 기능을 추가하기 위한 method 를 추가할 수 있습니다.
```python
# Many to Many 로 연결된 field 의 객체를 검색해서 출력하기
class TitleManager(models.Manager):
    def get_queryset(self):
        qs = super(TitleManager, self).get_queryset()
        return qs.filter(title__icontains='django') 

class Book(models.Model):
    title         = models.CharField(max_length=100)
    objects       = models.Manager() # 기본 매니저 재정의
    title_objects = TitleManager()   # django 타이틀 포함목록
```

## **모델 관리자 QuerySet** 여럿 활용하기
```python
class MaleManager(models.Manager):
    def get_queryset(self):
        qs = super(MaleManager, self).get_queryset()
        return qs.filter(sex="M")

class FemaleManager(models.Manager):
    def get_queryset(self):
        qs = super(FemaleManager, self).get_queryset()
        return qs.filter(sex="F")

class Person(models.Model):
    name    = models.CharField(max_length=50)
    sex     = models.CharField(max_length=1, 
        choices=(("M",'Male'),("F",'Female')))
    objects = models.Manager()
    men     = MaleManager()
    woman   = FemaleManager()
```

## **모델 메서드** 추가하기
```python
import datetime as dt
class Person(models.Model):
    first_name = models.CharField(max_length=50)
    last_name  = models.CharField(max_length=50)

    def _get_full_name(self):
        return '%s %s' % (
            self.first_name, self.last_name)
    
    full_name = property(_get_full_name)

    # 저장할 때 추가적인 기능을 정의할 수 있습니다
    def save(self, *args, **kwargs):
        super(Person, self).save(*args, **kwargs)
```

## **F 연산 객체로** 모델의 필드값 참조하기
모델 클래스에서 **필드와 필드간 개별 값을** 비교하는 방법을 정리해 보겠습니다.

이를 위해서는 **F** 식을 제공합니다. 아래의 예제는 **Book 모델 클래스**의 **n_page** 필드값 중 **n_total** 필드의 값과 비교하여 더 큰값을 갖는 경우에 해당 객체들을 추출합니다 
```python
from django.db.models import F
Book.objects.filter(n_page__gt = F('n_total'))
Book.objects.filter(n_page__gt = F('n_total') * 2)
Book.objects.filter(n_page__gt = F('n_total') + F('n_comment'))

from datetime import timedelta
Book.objects.filter(n_page__gt = F('pub_date') + timedelta(days=3))
```
**__gt, __gte, __lt, __lte** 와 같은 비교구문을 사용할 수도 있고, 수식 및 tiledelta 를 활용하는등 다양한 방식으로 인덱스별 데이터를 비교하여 원하는 결과를 추출할 수 있습니다.

```python
Book.objects.get(id__exact=14)
Book.objects.get(pk=14)
Book.objects.get(pk__in=[1, 4, 7])
Book.objects.get(pk__gt=14)
Book.objects.filter(blog__pk=3)
```

## Cacheing 과 QuerySet
자주 사용되는 QuerySet을 재활용하면 DataBase의 효율을 높일 수 있습니다.
```python
queryset = Person.objects.all()
queryset[5]  # 인덱싱은 DB 를 Query
```

**QuerySet 객체를 재평가를** 한 뒤, **indexing, slicing** 을 하면 **Cache 를 재검토** 합니다.
```python
queryset = Person.objects.all()
[entry   for entry in queryset]
print (queryset[5])
```

## **Q 조건문 객체를** 사용한 복잡한 조회
**Q** 객체는 검색 키워드를 캡슐화 하는 객체로 **, &** 그리고 **|** 객체를 사용할 수 있고, 무효화 선언을 위한 **~** 를 사용할 수 있습니다.
```python
from django.db.models import Q
Q(entry__startswith="python")
Q(entry__startswith="python")|Q(entry__startwith="django")
Q(entry__startswith="python")|~Q(pub_date__year="2019")
```

위의 조건식을 사용하여 **.filter(), exclude(), get()** 조회식에 활용하실 수 있습니다.
```python
Book.objects.get(
    Q(title__startswith="python"),
    Q(pub_date=date(2019,1,1))|Q(pub_date=date(2019,2,1))
)
```

또한 lookup 함수와 **Q()** 객체를 혼합하여 사용하실 수 있습니다.
```python
Book.objects.get(
    Q(pub_date=date(2019,1,1))|Q(pub_date=date(2019,2,1)),
    title__startswith="python")
```

주의할 점은 위와달리, 아래와 같은 조건식 만으로는 결과를 출력하지 않는다는 점에 주의해야 합니다 **함수 우선실행조건**
```python
Book.objects.get(
    title__startswith="python",
    Q(pub_date=date(2019,1,1))|Q(pub_date=date(2019,2,1))
    )
```
