---
title : 웹 서비스 Django Coding 01 - Model
last_modified_at: 2019-02-16T10:45:06-05:00
header:
  overlay_image: /assets/images/project/service.jpg
categories:
  - service
tags: 
    - service
    - plan
---


필요한 기능을 구현하는 함수를 제작합니다. 이 단계에서 **Jupyter Notebook** 에서 모듈을 제작합니다. 그리고 이러한 작업결과를 바탕으로 **개별 Table 과 Field 개념정의서** 를 작성합니다.

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
