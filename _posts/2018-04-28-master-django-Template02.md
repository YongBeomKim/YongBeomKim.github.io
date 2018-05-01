---
title : Mastering Django Core - 고급 Model
last_modified_at: 2018-04-28T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
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

```python
class Person(models.Model):
    first_name = models.CharField(max_length=50)
    last_name  = models.CharField(max_length=50)
 
    def _get_full_name(self):
        return "{} {}".format(self.first_name, self.last_name)

    # property : 함수내부의 parametor에 접근한다
    # first_name, last_name 함께 추출
    full_name = property(_get_full_name)
```

**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success} 