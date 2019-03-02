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

# **디자이너 개발자의 웹기획 및 웹개발 하기**

필요한 기능을 구현하는 함수를 제작합니다. 이 단계에서 **Jupyter Notebook** 에서 모듈을 제작합니다. 그리고 이러한 작업결과를 바탕으로 **개별 Table 과 Field 개념정의서** 를 작성합니다.

```python
In [1]: import requests
In [2]: url = 'http://www.naver.com'
In [3]: response = requests.get(url).text
In [4]: response[400:600]
Out[4]: '<meta name="robots" content="index,nofollow"/>\n<meta name="description" content="네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요"/>'
```
작업단계에서는 함수로써 클래스/ 함수작업을 진행하고, 어느정도 완결성을 갖추고 나면 **프로젝트.whl** 와 같이 해당 프로젝트 이름을 사용한 [패키지 모듈을](https://yongbeomkim.github.io/python/python-package-tutorial/) 제작/ 활용하여 단계별 완결성을 갖춰 나아가는 습관을 갖도록 합니다.

<br/>
# Django Project 시작하기
배경문서와 자료들이 어느정도 구체화 되고나면, 문서화 작업과 함께 Django 서버에 적용합니다.

**데이터는 sqlite3, 호출은 Django QuerySet, 구현은 HTML**  Jupyter 에서 함수로 구조화한 뒤 **해당 함수들을 묶어서 whl 모듈로** 묶으면서 진도를 진행하다 보면, 작업의 진행속도가 빨라지면서 구조화의 난이도가 낮아지게 될 것입니다.

## models.py
입력을 원하는 데이터

사용자가 원하는 모델의 클래스 Table, 필드 객체와 매칭하면 모델링은 어렵지 않게 접근 가능합니다. 다만 모든 테이블을 단일하게 구성하면 **불필요하게 반복되는 내용들로 성능에 저하** 가 생깁니다.

## ForeignKey(테이블 클래스)
다른 **부모 Table 의 id값** 을 상속받아, 자식 테이블에서 **부모테이블_id** 필드에서 매칭 합니다.

```python
# Create your models here.
class Publisher(models.Model):
    name    = models.CharField(max_length=30)

class Book(models.Model):
    publisher = models.ForeignKey(
                    Publisher, 
                    on_delete = models.CASCADE)
```

**Publisher** 테이블 정보를 **Book** 에서 상속합니다.
1. **Publisher** 테이블에서 객체를 특정한 인스턴스를 생성
2. **(자식테이블 소문자)_set** 메소드로 **자식테이블** 에 접근합니다

**Django Python Shell**
```python
p = Publisher.objects.get(name__contains="Apress")
p.book_set.all()          # Apress 출판사의 전체 Book 목록
p.book_set.filter(title__icontains="django") # 제목 필터링
```

## ManyToManyField(테이블 클래스)
외래키와 대부분은 동일하고, 모델 instance 대신 **QuerySet** 값을 추출합니다
```python
# Create your models here.
class Author(models.Model):
    first_name = models.CharField(max_length=30)
    last_name  = models.CharField(max_length=40)

class Book(models.Model):
    authors = models.ManyToManyField(Author) #, related_name='author')
```

**Django Python Shell**
```python
from books.models. import Book
b = Book.objects.get(id=1)
b.authors.filter(last_name="Kim") 
```

**ManytoMany 필드** 에서 동작하는 **.all .filter** 메소드는 **1개의 튜플만 선택했을 떄** 작동을 합니다. 이점을 주의해서 진행 합니다.
{: .notice--danger}

## **모델 관리자 QuerySets** 추가
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

```
