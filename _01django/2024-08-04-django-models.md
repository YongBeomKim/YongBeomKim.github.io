---
layout: blog
title: Django Models & Migrations
tags:
- orm
---

Django 의 Model 을 생성하고 관리하는데 필요한 기본 개념인 [Model ORM](https://velog.io/@may_soouu/Django-%EB%A9%94%EC%86%8C%EB%93%9C-%EC%A0%95%EB%A6%AC) 과
[Model Field](https://velog.io/@qlgks1/Django-Model-%ED%95%84%EB%93%9Cfiled-%EB%AA%A8%EC%9D%8C%EC%A7%91) 내용을 정리해 보겠습니다. 각각의 내용은 요약된 블로그를 참고 하였습니다. 

<br/>

# Django Model ORM
언더바 두개 `__` 를 사용하는 경우는 다음과 같습니다
- **<span style="color:var(--strong);">조건을 추가</span>** 하는 경우
- **<span style="color:var(--strong);">외부참조 모델</span>** 이 있는경우

## Methods

| **메서드**| **내용**                   |
|:--------:|:-------------------------:|
|all()     |테이블 모든 데이터셋           |
|filter()  |특정 조건에 부합하는 데이터셋    |
|exclude() |특정 조건을 제외한 데이터셋     |
|get()     |특정 조건에 부합하는 1개 데이터셋|
|count()   |데이터 갯수 확인              |
|first()   |테이블 첫번째 데이터           |
|last()    |테이블 마지막 데이터           |
|exists()  |특정조건 데이터 존재여부 확인    |
|order_by()|특정필드를 기준으로 정렬        |

## `.filter()`
```python
# iexact : 대소문자를 구분하지 않음
Boards.objects.filter(title__excact='python')
Boards.objects.filter(title__iexcact='python')
```

## `__contains`
부분 일치 조건 입력할 때 사용합니다
```python
# icontains : 대소문자를 구분하지 않음
Boards.objects.filter(title__contains='python')
Boards.objects.filter(title__icontains='python')
```

## `__in`
list() 객체로 조건값을 확인 할 때 사용합니다.
```python
Boards.objects.filter(title__in=['python','developer'])
```

## `__gt`, `__lt`, `__gte`, `__lte`
- gt **(greater than)** : >
- lt **(less than)** : <
- gte **(greater than or equal)** : >=
- lte **(less than or equal)** : <=
```python
Boards.objects.filter(
  date__gt = datetime.date(2020,10,4))
Boards.objects.filter(
  date__lt = datetime.date(2020,10,4))
```

## `__startswith`, `__endswith`
- startswith : 조건으로 **<span style="color:var(--accent);">시작</span>** 하는 문자열 검색
- endswith : 조건으로 **<span style="color:var(--accent);">끝나는</span>** 문자열 검색
```python
Books.objects.filter(title__startswith="book")
```

## `.union()`
데이터베이스에서 추출한 QuerySet 을 합치는 메서드 입니다. 유사한 기능을 하는 `|` or 연산자가 있는데, `| (or)` 연산자는 SQL Query 문에서도 `| (or)` 를 그대로 적용하기 때문에, `boolean` 필드 에서는 해당 필드값의 `or` 조건을 적용해서 모든 값이 `True\False` 값으로 통일 되어 버립니다.
- `qs1 | qs2` : `OR 조건` 을 통해 가져오는 SQL문을 작성 합니다.
- `qs1.union(qs2)` : 각각의 결과값을 `union` 연산으로 합치는 SQL문을 작성 합니다.
```python
data1 = Boards.objects.filter(title__exact="python")
data2 = Boards.objects.filter(title__exact="developer")
data3 = data1.union(data2)
data3 = data1 | data2  
```

## `.intersection()`
교집합으로 두 개 이상의 쿼리셋 변수 중 중복된 값을 호출 합니다
```python
data1 = Boards.objects.filter(title__in=["python", "developer"])
data2 = Boards.objects.filter(title__in=["python", "vscode"])
data3 = data1.intersection(data2)
```

<br/>

# Django Model Fields
이번에는 Django 모델들의 속성에 대해 정리해 보겠습니다.

## Integer Field
### Small Integer, Integer, Big Integer
숫자 데이터는 유효범위와 사용 메모리 크기가 함수별로 다르게 활용 합니다.
- `small interger` 유효값은 `-32,768 ~ 32,767` `(2 Bytes)` 입니다.
- `integer` 유효값은 `-2,147,483,648 ~ 2,147,483,647` `(4 Bytes)` 입니다.
- `big integer` 유효값은 `9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,807` `(8 Byte)` 입니다.

<br/>

## Errors
### OperationalError: (1054, "Unknown column 'code_id' in 'where clause'")
`name` 필드값을 `ForeignKey` 로 연결하면, Django 에서 `_id` 를 자동으로 붙여서 `column name` 을 생성하는데, 이름 자체에도 `_id` 를 붙여서 migrate 하는 바람에 `column name` 이 `market_krxinvestor.code_id` 이렇게 만들어 졌습니다. 

```python
File ~/venv/lib/python3.10/site-packages/MySQLdb/connections.py:254, in Connection.query(self, query)
    252 if isinstance(query, bytearray):
    253     query = bytes(query)
--> 254 _mysql.connection.query(self, query)

OperationalError: (1054, "Unknown column 'market_krxinvestor.code_id' in 'where clause'")
```

[OperationalError](https://phin09.tistory.com/59) 관련 설명은 여기를 참고하였습니다. 참고 사이트에서 원인은 `Migration` 의 불완전 이었는데, 이번 작업에서는 다른 원인이 있었습니다.

```python
class KrxInvestor(models.Model):
    pass
```

이름만 특정한 뒤, 컬럼등을 지정하지 않은 상테에서 테이블을 만들면 결과는 다음과 같습니다.

```sql
db> DESCRIBE market_krxinvestor;
+-------+------------+------+-----+---------+----------------+
| Field | Type       | Null | Key | Default | Extra          |
+-------+------------+------+-----+---------+----------------+
| id    | bigint(20) | NO   | PRI | <null>  | auto_increment |
+-------+------------+------+-----+---------+----------------+
```

문제는 이후에 `ForeignKey` 등의 다양한 필드와 속성을 추가한 뒤 Migration 을 했는데도, 위 처럼 `id` 필드만 있는 테이블은 업데이트가 잘 되지 않았습니다. 이번 작업에서는 데이터베이스를 새로 만들고 Migration 작업을 진행하는 방법으로 진행을 했습니다. 추후에 이번처럼 특정 테이블만 문제가 있을 때 새롭게 갱신하는 방법을 찾아보겠습니다.

## DataBase Migration 새롭게 하기
Migration 파일을 찾아서 삭제하는 과정은 다음과 같습니다. [Django 자습서 참고](https://wikidocs.net/9926) 

```python
$ find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
$ find . -path "*/migrations/*.pyc"  -delete
```

<br/>

# Django ORM Tips
Django 에서 유용한 tip 들을 [gaussian37.github.io](https://gaussian37.github.io/) 에서 추출한 내용들로 정해 봅니다. 정리한 내용은 다음과 같습니다.

1. Django ORM QuerySet Filter
2. related_name 설정 시 prefetch_related 사용
3. QuerySet 정렬

## [Django QuerySet Filter](https://gaussian37.github.io/python-django-django-query-set/)
- `exact` : 정확히 일치하는 데이터 찾기
- `None`을 찾는 경우 `Null`을 찾는 명령을 사용 합니다. **isnull**

```python
Entry.objects.get(id__exact=14)
Entry.objects.get(id__exact=None)
``` 

- `iexact` : 대소문자를 구분하지 않고 정확히 일치하는 데이터 찾기

```python
Blog.objects.get(name__iexact='beatles blog')
Blog.objects.get(name__iexact=None)
```

- `contains`, `icontains` : 포함하는 문자열 찾기 (`icontains`는 대소문자 구분하지 않음)
- 아래 코드는 headline에서 **Lennon**이라는 문자열을 포함하는 object를 찾습니다.

```python
Entry.objects.get(headline__contains='Lennon')
```

- `in` : list, tuple, string 또는 queryset과 같이 iterable한 객체를 대상으로 각 원소를 조회합니다.

```python
Entry.objects.filter(id__in=[1, 3, 4])
: SELECT ... WHERE id IN (1, 3, 4);

Entry.objects.filter(headline__in='abc')
: SELECT ... WHERE headline IN ('a', 'b', 'c');
``` 

- queryset를 직접 조건으로 넣을 수 있습니다. (성능 체크 필요)

```python
inner_qs = Blog.objects.filter(name__contains='Cheddar')
entries = Entry.objects.filter(blog__in=inner_qs)
:SELECT ... WHERE blog.id IN (SELECT id FROM ... WHERE NAME LIKE '%Cheddar%')
```

- `gt`, `gte`, `lt`, `lte` 와 같이 부등호를 사용할 수 있습니다.

```python
Entry.objects.filter(id__gt=4)
: SELECT ... WHERE id > 4;
```

- `startswith`, `istartswith`, `endswith`, `iendswith`는 각각 접미사, 접두사를 찾습니다.

```python
Entry.objects.filter(headline__startswith='Lennon')
Entry.objects.filter(headline__endswith='Lennon')
```

- `range`는 범위에 해당하는 object를 찾습니다.

```python
import datetime
start_date = datetime.date(2005, 1, 1)
end_date = datetime.date(2005, 3, 31)
Entry.objects.filter(pub_date__range=(start_date, end_date))
```

## [related_name 설정 시 prefetch_related 사용](https://gaussian37.github.io/python-django-related_name/)
Django Model 에서 [related_name](https://velog.io/@brighten_the_way/Django%EC%99%80-Reverse-relations%EA%B3%BC-Relatedname) 속성은 Primary 오브젝트 에서 **특정한 Primary 값을 갖고있는 Foreign 오브젝트**를 자동으로 필터링 하는 Method 입니다.

```python
class Store(models.Model):
    artist = models.ForeignKey(
      Artist, on_delete=models.CASCADE, related_name='store')

In [1]: Artist.objects.get(id=1).store.all()
Out[1]: <QuerySet [<...>]>
```

장고 model 에서 ForeignKey를 사용 할 때, 특히 한 모델에서 여러 개의 ForeignKey가 있을 때, `related_name` 을 이용하여 ForeignKey 의 이름을 정할 수 있습니다.

예를 들어 `모델 A` 의 `pk` 를 `모델 B` 가 `fk` 로 사용하고 있다고 가정을 합니다.
장고는 lazy 하게 SQL 작업을 수행하므로 ForeignKey로 접근한 데이터에 대한 작업이 여러번 필요한 경우에는, **join 연산이 필요** 한 경우로써 `prefetch_related` 를 사용하여 필요한 query를 바로 가져오는 것이 효율적 입니다. `prefetch_related`는 다음과 같이 사용할 수 있습니다.

```python
A.objects.prefetch_related("B_set")
```

즉, A 모델이 B 모델의 FK를 통하여 join 한 결과 값을 lazy하지 않게 한번에 가져올 때 사용합니다.
`prefetch_ralated` 내용은 제 블로그의 다른 글에서 확인해 보시면 되겠습니다.

이 때 중요한 것은 related_name을 이용한 경우 `model_set` 형태가 아니라 `related_name` 을 사용 합니다. 예를 들면 아래와 같습니다.

```python
class Price(models.Model):
    book = models.ForeignKey(Book, related_name='prices')

books = Book.objects.prefetch_related('prices')
```

다시 하면 정리하면 `related_name`을 사용한 경우 `prefetch_related`를 사용할 때, `foo_set`을 파라미터로 사용하지 않고
`related_name`을 바로 사용하면 됩니다. 

## [QuerySet 정렬](https://gaussian37.github.io/python-django-queryset-%EC%98%A4%EB%A6%84%EC%B0%A8%EC%88%9C,-%EB%82%B4%EB%A6%BC%EC%B0%A8%EC%88%9C-%EC%A0%95%EB%A0%AC/)
장고 ORM을 이용하여 DB를 읽을 때, 기본적으로 필요한 작업이 오름차순(ascending)/내림차순(descending)으로 특정 field를 가져오는 것입니다. ORM을 이용하여 DB를 가져올 때 어떻게 하면 될까요? `A`라는 모델이 있다고 가정합시다. `A`의 모든 데이터를 긁어 오려면 다음과 같이 입력하면 됩니다.

```python
A.objects.all()
```

그 다음에 `order_by()`를 사용하면 됩니다. 이 때 인자로 들어갈 문자열은 field의 이름입니다.
A 라는 모델에 `point`라는 field가 있다고 합시다. 그러면 다음과 같이 읽어올 수 있습니다.

```python
A.objects.all().order_by('point')
```

이렇게 읽어오면 오름차순으로 읽어오게 됩니다. 기본값은 오름차순 입니다. 다음과 같이 읽으면 내림차순으로 읽어오게 됩니다.

```python
A.objects.all().order_by('-point')
```

<br/>

# Etc QuerySet
## Chaining Methods
위의 **단일 조건들을 연결하여** 쿼리문으로 사용할 수 있습니다

```python
[In] Author.objects.filter(id__gt=1).\
               exclude(name='spike').\
               filter(name__icontains="o")
[Out] QuerySet [<Author: tommy : tommy@example.com>...]
```

## 복잡한 쿼리문과 Q**
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
외래키와 대부분은 동일하고, 모델 instance 대신 **QuerySet** 값을 추출합니다.

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

이를 위해서는 **F** 식을 제공합니다. 아래의 예제는 **Book 모델 클래스**의 **n_page** 필드값 중 **n_total** 필드의 값과 비교하여 더 큰값을 갖는 경우에 해당 객체들을 추출합니다.

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

<br/>

# 참고사이트
- [Django ORM](https://brownbears.tistory.com/63)