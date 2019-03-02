---
title : 웹 서비스 코딩하기 1 - Setting
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

**데이터는 sqlite3, 호출은 Django QuerySet, 구현은 HTML** 앞에서 Jupyter 함수만으로 보였던 내용들을 웹으로 제공하기 위해서는 각 단계별로 구조화한 뒤 실행을 해야하는 과정들이 복잡하고 어렵게 느껴지는 문제가 있어서 멈칫멈칫하는 문제가 현재 있습니다. 이러한 과정도 반복하면 난이도가 낮아질 것이라 보기 때문에 두려워 말고 실행하도록 합니다.

# models.py
클래스 Table, 필드 객체와 매칭하면 모델링은 어렵지 않게 접근 가능합니다. 다만 모든 테이블을 단일하게 구성하면 **불필요하게 반복되는 내용들로 성능에 저하** 가 생깁니다.

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

```python
p = Publisher.objects.get(name__contains="Apress")
p.book_set.all()          # Apress 출판사의 전체 Book 목록
p.book_set.filter(title__icontains="django") # 제목 필터링

QuerySet [<Book: A Two django Story>, <Book: Python & django>]
```

## ManyToManyField(테이블 클래스)


```python
# Create your models here.
class Publisher(models.Model):
    name    = models.CharField(max_length=30)
    website = models.URLField()

class Author(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=40)

class Book(models.Model):
    authors     = models.ManyToManyField(Author) #, related_name='author')
    publisher   = models.ForeignKey(Publisher, on_delete=models.CASCADE)
```
