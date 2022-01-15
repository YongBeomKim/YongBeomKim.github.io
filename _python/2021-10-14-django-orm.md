---
layout: blog
title: Django ORM Query
tags:
- django
- orm
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