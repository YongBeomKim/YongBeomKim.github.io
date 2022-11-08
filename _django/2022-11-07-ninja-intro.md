---
layout: blog
title: Django Ninja 를 10 단계로 이해하기
tags:
- ninja
- django
---

이번 내용은 Ninja 기본 제작자가 설명하는 [DjangoCon 2022 ｜ Introducing Django Ninja](https://youtu.be/zpR1QCLBpIA) 을 요약한 문서 입니다. Ninja 모듈의 제작 의도 및 중심을 구성하는 개념들이 어떤 것인지를 이해할 수 있는 내용이었습니다.

- [**10 Steps of Django Ninja**](#10-steps-of-django-ninja)
  - [1 Introduction](#1-introduction)
  - [2 Complex Payloads (Schema)](#2-complex-payloads-schema)
  - [3 Async 지원](#3-async-지원)
  - [4 Example : Filter](#4-example--filter)
  - [5 Response Header & Cookie](#5-response-header--cookie)
  - [6 Uploading Files](#6-uploading-files)
  - [7 중첩된 객체 (Nested Object)](#7-중첩된-객체-nested-object)
  - [8 Pagination](#8-pagination)
  - [9 Creating Schemas From Model](#9-creating-schemas-from-model)
  - [10 Large Project](#10-large-project)

<br>
<br>

# **10 Steps of Django Ninja**

Ninja 의 핵심 구성요소를 Schema 와 API 함수 2가지로 나눌 수 있습니다. 이 중 API 함수의 구성요소 이름을 간단하게 살펴보면 다음과 같습니다. `URL_PATH` 즉 **url 경로의 내용** 을 함수 내부에서도 사용하려면 `QUERY_PARAMS` 내부에 **동일한 변수 이름** 을 선언하면 자동으로 둘을 연결 합니다.

```python
# Names
@ninja.HTTP_METHOD("/URL_PATH")
def function(request, QUERY_PARAMS):
    return API_END_POINTS
```

<br>

## 1 Introduction

pydantic + Type hints + Django

- Step 1 : **pydantic (for Complex Payloads)**

```python
class PersonSchema(Schema):
    name:str
    age:int
```

- Step 2 : **Type hints**

```python
@api.get("/person/{person_id}", response=PersonSchema)
def person(request, person_id: int):
    return get_object_or_404(Person, id=person_id)
```

- Step 3 : **Django**

```python
# urls.py
urlpatterns = [
    path("api/", api.urls),
]
```

<br>

## 2 Complex Payloads (Schema)

API 연산에 필요한 변수들을 선언할 때, Ninja 의 `Schema` 클래스를 상속하여 선언할 수 있습니다. 

```python
class NewPost(Schema):
    title: str
    timestamp: date
    tags: List[str] = []

# payload Object 그대로 출력
@api.post('/posts')                   # : Path Params
def create(request, payload:NewPost): # : Query Params
    return payload.dict()

# Object 중 특정 필드의 값 출력
@secure.post('/postday')
def create_day(request, payload:NewPost):
    return payload.timestamp.day
```

<br>

## 3 Async 지원

Async 내용일 전부, 또는 일부만 추가하여 구현 할 수 있습니다.

```python
import asyncio

@router.get("/say-after")
async def say_after(request, delay: int, word: str):
    await asyncio.sleep(delay)
    return {"saying": word}
```

<br>

## 4 Example : Filter

Django ORM 필터링 명령 내용을 `Schema` 클래스를 활용하여 미리 정의 합니다.

```python
class PostFilters(Schema):
    title__icontains: str = None
    year: int = None
    year__gte: int = None
    year__lte: int = None
    timestamp__year: int = None
    timestamp__month: int = None
```

이렇게 정의된 Schema 를 `Query Params` 로 불러온 뒤 연산을 진행합니다. 이때 `None` 초기값을 갖는 필드는 제외하는 옵션 `exclude_unset` 을 활용하여 필요한 작업만 명령할 수 있습니다.

```python
from ninja import Query

@api.get('/post', response=PostOut)
def post_filter(
      request, 
      filters: PostFilters = Query(...)
    ):
    args = filters.dict(exclude_unset=True) # None 초깃값 제외
    query_set = Post.objects.filter(**args)
    return query_set
```

<br>

## 5 Response Header & Cookie

Django 의 `HttpResponse` 기능을 활용하는 방법으로 Header 와 Cookie 값을 추가 할 수 있습니다. 이는 JWT 의 내용을 최소화 한 뒤 필요한 내용들을 추가하는데 적절한 방법 입니다.

```python
from django.http import HttpResponse

@router.get("/swords")
def swords(request, response: HttpResponse):
    response.set_cookie("curve", "bendy")
    return f"Swords are pointy"
```

Ninja 에서 제공하는 `Cookie` , `Header` 클래스를 활용하면 보다 체계적인 관리가 가능 합니다.

```python
from ninja import Header, Cookie

@router.get('/header')
def web_header(request, 
        cookie_name: str = Cookie(...),
        authorization: str = Header(...),
    ):
    cookie_data = cookie_name.dict()
    authorized = authorization.dict()
    return cookie_data + " " + authorized
```

<br>

## 6 Uploading Files

Rest ARI 를 활요하여, 1개 또는 여러개의 파일을 다루는 예제 입니다

```python
from ninja import UploadedFile, File

# 1 개의 파일만 업로드
@api.post('/upload')
def upload(request, 
      file: UploadedFile = File(...),
    ):
    data = file.read()
    return ...

# 여러개 파일 업로드
@api.post('/upload')
def upload(request,
        files = List[UploadedFile] = File(...),
    ):
    data = files[0].read()
    ...
```

<br>

## 7 중첩된 객체 (Nested Object)

Foreign Key 로 연관된 테이블은 `Schema` 클래스 객체를 필드에 연결하는 방법으로 구현할 수 있습니다.

```python
class Category(Schema):
    id: int
    title: str

class PostSchema(Schema):
    id: int
    category: Category
    title: str
```

<br>

## 8 Pagination

Ninja 에서 제공하는 Decorator 를 추가하면 쉽게 활용할 수 있습니다.

```python
from ninja.pagination import paginate

@api.get('/posts', response=List[PostSchema])
@paginate
def list_post(request):
    return Post.objects.all()
```

<br>

## 9 Creating Schemas From Model

DataBase 의 필드 고유한 값이 아닌, 사용자가 정의한 End Point 를 API 로 구현하고 싶은 경우에는 `ModelSchema` 클래스를 상속받아 활용합니다.

```python
from ninja import ModelSchema

class PostSchema(ModelSchema):

    author_age: int

    class Config:
        model = Post
        model_fields = '__all__'
        model_exclude = ['id']

    @staticmethod
    def resolve_author_age(obj):
        age = datetime.now.year - obj.birth
        return age
```

<br>

## 10 Large Project

다수의 App 과 각각의 모델들이 유기적인 관계를 갖을 때, 1개의 api를 상속받아 모두 연결하기 보다는 필요에 따라 분리하여 관리하는 방법을 필요로 합니다. `Router` 기능을 지원하는데 개별 `router` 객체를 작성한 뒤, 1개의 `api` 에 이들을 연결하는 방법으로 구현이 가능 합니다.

```python
from ninja import Router, NinjaAPI
api = NinjaAPI()
router = Router()

@router.get('/somewhere')
...

api.add_router('/news', news.router)
api.add_router('/post', post.router)
```

다른 방법으로는 `api` 객체를 서로 다르게 구분하여 작성하는 방법도 가능 합니다.

```python
from ninja import NinjaAPI
api = NinjaAPI()
api_private = NinjaAPI()
api_v1 = NinjaAPI()
api_v2 = NinjaAPI()
```
