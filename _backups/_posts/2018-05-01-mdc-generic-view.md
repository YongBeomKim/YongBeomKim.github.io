---
title : django 일반 View
last_modified_at: 2018-05-01T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - django
    - pyton
toc: true    
---


# Mastering Django Core

[GenericView 설명서](https://wikidocs.net/9623)

<br>
## **ListView** (Generic View) 

### models

```python
# models.py

from django.db import models

class Publisher(models.Model):
    name = models.CharField(max_length=30)
```


### views

```python
# views.py

from django.views.generic import ListView
from .models import Publisher

class PublishList(ListView):
    model = Publisher
```


### urls

```python
# urls.py

from django.urls import re_path
from .views import PublishList

urlpatterns = [
    re_path(r'^view/$', PublishList.as_view()), 
    ]
```

**ListView의 Template:**  `App이름/ Model이름_list.html` 에 template 를 자동으로 추론한다
{.notice--info}


### Template 객체

```html
{ % extends "base.html" % }

<ul>{ % for publisher in object_list % }
        { { publisher.name } }
    { % endfor % }
</ul>
```

**{ object_list }** ListView 의 **content** 목록을 Template 의 **object_list** 또는 **publisher_list** (**모델명_list**)로 호출한다   
{.notice--info}


<br>
## context 조각

### **ListView**와 사용자 Template 객체 

```python
# views.py

class PublishList(ListView):
    model = Publisher
    context_object_name = 'Template 전달 객체 이름'
```

**model = Publisher** Publisher.objects.all()을 출약한 쿼리문이다
{.notice--info}


### **DetailView**와 **Context** 객체 추가

```python
# views.py

from django.views.generic  import DetailView
from .models import Publisher, Book

class PublisherDetail(DetailView):
    model = Publisher
    def get_context_data(self, **kwargs):
        context = super(PublisherDetail, self).get_context_data(**kwargs)
        context['book_list'] = Book.objects.all()
        return context
```

**super()** 는  원본 데이터를 현 클래스 객체와 병합을 진행하고, **context['필드명']** 으로 {context} 객체에 필드 정보를 추가한다.  
{.notice--info}


### 객체의 하위집합 내용보기

```python

class PublisherDetail(DetailView):
    context_object_name = 'publisher'
    queryset = Publisher.objects.all()
```

**context_object_name :** 템플릿 파일에 전달하는 컨텍스트 변수명을 지정 [document](https://wikidocs.net/9623#context_object_name)
{.notice--info}

**queryset** ListView 등의 필터링 목록을 보다 구체화 한다
{.notice--info}


```python
from django.views.generic import ListView
from .models import Book

class BookList(ListView):
    queryset = Book.objects.order_by('-publication_date')
    context_object_name = 'book_list'
```

**queryset & context_object_name** ListView 로 자동추출되는 List 객체를 최근의 책자와 함께 발행일순으로 정렬한다
{.notice--info}


```python
from django.views.generic import ListView
from .models import Book

class DjangoBookList(ListView):
    context_object_name = 'book_list'
    queryset = Book.objects.filter(publisher__name='Django')
    template_name = 'book/django_list.html'
```

**template_name :** GenericView 에서 임의이 Template완 연결 파라미터
{: .notice--success}


## 동적 필터링

```python
# views.py

from django.shortcuts import get_object_or_404
from django.views.generic import ListView

class PublisherBookList(ListView):
    template_name = 'books/books_by_publisher.html'
    def get_queryset(self):
        self.publiser = get_object_or_404(Publisher, name=self.args[0])
        return Book.objects.filter(publiser=self.publiser)
```

**get_queryset:**  **ListView**의 queryset 에 상세한 로직의 추가가 가능하다. 동시에 템플릿등의 추가 설정 또한 용이하다.
{.notice--info}


## 추가 작업의 수행

객체를 불러오기 전이나 후에 몇가지 추가작업을 하는 경우 

```python
# models.py

from django.db import models

class Author(models.Model):
    last_accessed = models.DateTimeField()
```

```python
# views.py

class AuthorDetailview(DetailView)
    queryset = Author.objects.all()

# 객체를 검색하는 메서드
def get_object(self):
    object = super(AuthorDetailview, self).get_object()
    object.last_accessed = timezone.now()
    object.save()
    return object
```




```
urlpatterns = [
    re_path(r'^author/(?P<pk>[0-9]+)/$', AuthorDetailview.as_view(),
    ]
```

**Info Notice:** `Book` 소문자 이름에 `_set`을 합친 `book_set` 메서스를 {: {.notice--info}

**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}  