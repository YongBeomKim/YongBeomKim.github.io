---
layout: blog
title: `select_related` 와 `prefetch_related`
tags:
- orm
---

금융데이터 베이스를 작성할 때, 동일한 기업의 동일한 날짜의 여러 데이터들이 저장 및 관리하게 되는데 이들을 보다 효과적(?)으로 관리하기 위하여 인덱스 테이블을 다음과 같이 정의 하였습니다.
```python
class Ticker(models.Model):
    code = models.CharField(blank=True, null=True, max_length=10)
    name = models.CharField(max_length=50, unique=True)


class Index(models.Model):
    date   = models.DateField()
    ticker = models.ForeignKey(
        Ticker, on_delete=models.CASCADE, 
        related_name='index'
    )

    class Meta:
        indexes = [models.Index(fields=['date','ticker']),]
```

이를 바탕으로 관련 금융 데이터들을 다음과 같이 연결 하였습니다.
```python
class Ohlcv(models.Model):
    index = models.ForeignKey(
        Index, on_delete=models.CASCADE, 
        related_name='index_ohlcv'
    )
    close = models.IntegerField()
```

<br/>

# Related Name
`primary -> foreign` 관계일 때, `foreign` 객체에서 조회하는 방법이 `정참조(forward)` 방식이고, `primary` 객체를 활용하여 조회하는 방법이 `역참조(backward)` 방식 입니다.

`정참조(forward)` 관계는 객체의 속성을 사용하면 바로 접근 가능합니다.
```python
In []: Ohlcv.objects.get(index_id=3).index.date
Out[]: datetime.date(2025, 3, 24)

In []: Ohlcv.objects.get(index_id=3).index.ticker.name
Out[]: '삼성전자'
```

`역참조(backward)` 관계에 있을 때에는 별도의 방식을 필요로 합니다. 이때 역참고 대상인 `Ohlcv` 객체를 어떻게 호출할지 사용자가 정의를 한 이름(`index_ohlcv`) 이 `related_name` 입니다. `related_name` 이 꼭 필요한 경우는 상속받은 객체 내부에 2개 이상의 컬럼이 모두 자식관계로 연결 되어 있을때 이들을 구분하기에 유용 합니다.

구체적인 예로는 `부모 클래스`에 물건목록이 있고, `자식 클래스`는 해당 물건의 `1순위, 2순위, 3순위` 와 같이 동일한 테이블 내부의 각각다른 필드의 값을 조회하는 경우에는 `자식 클래스_set` 방식으로는 조회가 불가능 합니다.
```python
In []: index = IndexTickerDate.objects.get(id=13)
     : index.index_ohlcv.all()
Out[]: <QuerySet [<Ohlcv: 2025-03-17 동화약품 Y>]>
```

<br/>

# `select_related` 와 `prefetch_related`
- `select_related`: **JOIN을 활용하여 외래 키(ForeignKey) 관련 데이터를 필터링 가능**  
- `prefetch_related`: **역참조(related_name) 또는 ManyToMany 데이터를 사전 로드하면서 필터링 적용**  

## **`select_related` 동작 방식**  
- `select_related("author")` → **JOIN을 사용하여 `index` 데이터를 미리 로드**  
- `filter(index__date__lt="2025-03-10")` → **SQL WHERE 절로 필터링**  
```python
In []: Ohlcv.objects.select_related('index'
         ).filter(index__date__lt='2025-03-10').values()
Out[]: <QuerySet [
        {'id':4,'index_id':4,'close':6130}, 
        {'id':5,'index_id':5,'close':6310}, 
        {'id':6,'index_id':6,'close': 6300}
       ]>
```

**실행되는 SQL 쿼리 (JOIN 적용)** 는 다음과 같습니다. **단 한 번의 SQL 쿼리로 최적화**가 가능합니다.
```sql
SELECT book.*, author.*
FROM book
JOIN author ON book.author_id = author.id
WHERE author.name = 'J.K. Rowling';
```

## **`prefetch_related` 동작 방식**
- `prefetch_related("book_set")` → **두 개의 쿼리 실행 후 Python에서 매핑**  
- `Prefetch("book_set", queryset=Book.objects.filter(title__icontains="Harry"))`  
  → `Harry`가 포함된 책만 미리 로드하여 **Python에서 저자와 매핑 합니다.**  
```python
In []: Index.objects.prefetch_related('index_ohlcv'
         ).filter(date__lte='2025-03-12')
Out[]: <QuerySet [
         <Index:동화약품(000020)/2025-03-12>, 
         <IndexTickerDate: 동화약품(000020)/2025-03-11>, 
         <IndexTickerDate: 동화약품(000020)/2025-03-10>
       ]>
```

Book 예제로 살펴보면 다음과 같습니다.
```python
from django.db.models import Prefetch

authors = Author.objects.prefetch_related(
    Prefetch("book_set", queryset=Book.objects.filter(title__icontains="Harry"))
)

for author in authors:
    print(f"Author: {author.name}")
    for book in author.book_set.all():  # 필터링된 책만 포함됨
        print(f" - {book.title}")
```

## **`prefetch_related` 에서 필터링**
`prefetch_related`는 **Python에서 데이터 매핑**하기 때문에 직접 필터링 불가능 합니다. 하지만 **`.Prefetch()` 객체를 사용하면 필터링이 가능합니다. 실행되는 SQL 쿼리 (N+1 문제 해결)** 는 다음과 같습니다. **필요한 데이터만 가져와서 최적화가 가능합니다.**
- `prefetch_related("book_set")` → **두 개의 쿼리 실행 후 Python에서 매핑**  
- `Prefetch("book_set", queryset=Book.objects.filter(title__icontains="Harry"))`  
  → `Harry`가 포함된 책만 미리 로드하여 **Python에서 저자와 매핑**  

**실행되는 SQL 쿼리 (N+1 문제 해결)** 는 다음과 같습니다. **필요한 데이터만 가져와서 최적화!**
```sql
SELECT * FROM author;  -- 1개의 쿼리 (저자 전체 조회)
SELECT * FROM book WHERE title LIKE '%Harry%';  -- 1개의 추가 쿼리 (필터링된 책만 조회)
```

## `select_related`와 `prefetch_related`를 함께 필터링 적용  
`select_related`와 `prefetch_related`를 함께 사용할 수 있습니다.
- `select_related` → ForeignKey(1:1, N:1) 최적화  
- `prefetch_related` → ManyToMany, 역참조(1:N) 최적화  
```python
authors = Author.objects.select_related("book_set").prefetch_related(
    Prefetch("book_set", queryset=Book.objects.filter(title__icontains="Harry"))
)
```

<br/>

# 정리  
**적절하게 조합하여 사용하면 Django ORM 성능을 극대화할 수 있습니다.**
| 최적화 방법 | 사용 대상 | 필터링 방법 |
|------------|----------|------------|
| `select_related` | `ForeignKey`(N:1, 1:1) 관계 | `.filter()`로 직접 SQL WHERE 조건 사용 가능 |
| `prefetch_related` | `ManyToOne`, `ManyToMany`, 역참조(`related_name`) | `Prefetch(queryset=...)`을 사용하여 Python에서 필터링 |

<br/>

# 참고사이트
- [Django와 Reverse relations 과 Related_name](https://velog.io/@brighten_the_way/Django%EC%99%80-Reverse-relations%EA%B3%BC-Relatedname)
- [Following relationships `backward`- `djangoproject.com`](https://docs.djangoproject.com/en/5.1/topics/db/queries/#following-relationships-backward)
- [Django 메소드 정리](https://velog.io/@may_soouu/Django-%EB%A9%94%EC%86%8C%EB%93%9C-%EC%A0%95%EB%A6%AC)










## 🎯 Django ORM에서 `select_related`와 `prefetch_related`를 활용하여 필터링하는 방법  

Django ORM에서 `select_related`와 `prefetch_related`를 사용할 때 **필터링을 적용하는 방법**은 다음과 같습니다:  

- `select_related`: **JOIN을 활용하여 외래 키(ForeignKey) 관련 데이터를 필터링 가능**  
- `prefetch_related`: **역참조(related_name) 또는 ManyToMany 데이터를 사전 로드하면서 필터링 적용**  

---

## ✅ `select_related`에서 필터링 적용  

### 🔹 `select_related`는 SQL의 `JOIN`을 사용하므로 `.filter()`와 함께 사용 가능  

```python
class Author(models.Model):
    name = models.CharField(max_length=100)

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
```

```python
# 특정 저자의 책만 가져오기 (JOIN 활용)
books = Book.objects.select_related("author").filter(author__name="J.K. Rowling")

for book in books:
    print(book.title, book.author.name)
```

✔ **동작 방식**  
- `select_related("author")` → **JOIN을 사용하여 `author` 데이터를 미리 로드**  
- `filter(author__name="J.K. Rowling")` → **SQL WHERE 절로 필터링**  

🔹 **실행되는 SQL 쿼리 (JOIN 적용)**  
```sql
SELECT book.*, author.*
FROM book
JOIN author ON book.author_id = author.id
WHERE author.name = 'J.K. Rowling';
```
🚀 **단 한 번의 SQL 쿼리로 최적화!**

---

## ✅ `prefetch_related`에서 필터링 적용  

### 🔹 `prefetch_related`는 **Python에서 데이터 매핑**하기 때문에 직접 필터링 불가능  
하지만 **`.Prefetch()` 객체를 사용하면 필터링 적용 가능!**

```python
from django.db.models import Prefetch

authors = Author.objects.prefetch_related(
    Prefetch("book_set", queryset=Book.objects.filter(title__icontains="Harry"))
)

for author in authors:
    print(f"Author: {author.name}")
    for book in author.book_set.all():  # ✅ 필터링된 책만 포함됨
        print(f" - {book.title}")
```


