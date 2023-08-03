---
layout: blog
title: Ninja 를 이해하는 10 단계
tags:
- pydantic
---

이번 내용은 Ninja 기본 제작자가 설명하는 [DjangoCon 2022 ｜ Introducing Django Ninja](https://youtu.be/zpR1QCLBpIA) 을 요약한 문서 입니다. Ninja 모듈의 제작 의도 및 중심을 구성하는 개념들이 어떤 것인지를 이해할 수 있는 내용이었습니다.

- [**10 Steps of Django Ninja**](#10-steps-of-django-ninja)
  - [1 Introduction](#1-introduction)
  - [2 Types of `URL Query`](#2-types-of-url-query)
  - [3 Async 지원](#3-async-지원)
  - [4 Example : Django ORM Filter](#4-example--django-orm-filter)
  - [5 Response Header \& Cookie](#5-response-header--cookie)
  - [6 Uploading Files](#6-uploading-files)
  - [7 중첩된 객체 (Nested Object)](#7-중첩된-객체-nested-object)
  - [8 Pagination](#8-pagination)
  - [9 Creating Schemas From Model](#9-creating-schemas-from-model)
  - [10 Large Project](#10-large-project)
- [Appendix](#appendix)
  - [**Resolve End Point**](#resolve-end-point)
  - [**Get Items**](#get-items)
  - [CRUD Example](#crud-example)
- [참고 사이트](#참고-사이트)

<br>
<br>

# **10 Steps of Django Ninja**

Ninja 구성요소는 `API 함수` 와 `Schema` 2가지로 나눌 수 있습니다.

API 함수의 구성요소는 `URL_PATH`, `QUERY_PARAMS`, `API_END_POINTS` 3가지로 나눠 집니다. `QUERY_PARAMS` 이름과 일치하는 `URL_PATH` 변수를 정의하면 이들은 자동으로 연결되어 작동 합니다. 1번 예시에서 `person_id` 변수가 `URL_PATH` 와 `QUERY_PARAMS` 에 동일하게 사용되고 있고 이로써 이들은 상호 연결되어 동작 합니다.

```python
# Names
@ninja.HTTP_METHOD("/URL_PATH")
def function(request, QUERY_PARAMS):
    return API_END_POINTS
```

<br>

## 1 Introduction
**Pydantic (API Endpoint) + Types (URL Query) + Django**

- Step 1 : **Pydantic**
```python
class PersonSchema(Schema):
    name:str
    age:int
```

- Step 2 : **Types**
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

## 2 Types of `URL Query`
앞의 `person_id` 와 같이 `URL_PATH` 에서 동일한 이름을 정의하지 않으면 `URL Query` 변수로 활용 합니다. 여러 다수의 `Query` 를 선언할 때 `Schema` 클래스를 활용하면 아래의 예시처럼 간단하게 선언할 수 있습니다. `API 연산함수` 내부에서는 `payload` 변수를 사용하여 해당 쿼리에 할당된 값을 호출 및 활용 할 수 있습니다.

```python
class NewPost(Schema):
    title: str
    timestamp: date
    tags: List[str] = []

# payload Object 그대로 출력
@api.post('/posts')                   # : URL Path Params
def create(request, payload:NewPost): # : URL Query Params
    return payload.dict()

# Object 중 특정 필드의 값 출력
@secure.post('/postday')
def create_day(request, payload:NewPost):
    return payload.timestamp.day
```

<br>

## 3 Async 지원
함수에서 외부 데이터를 받아서 처리하는 경우 `Async` 를 활용하게 되는데, 이러한 경우 함수의 전부, 또는 일부만 적용하여 구현 할 수 있습니다.
```python
import asyncio

@router.get("/say-after")
async def say_after(request, delay: int, word: str):
    await asyncio.sleep(delay)
    return {"saying": word}
```

<br>

## 4 Example : Django ORM Filter
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

이렇게 정의된 Schema 는 `Query Params` 로 불러온 뒤 연산을 진행합니다. 이때 `None` 초기값을 갖는 필드는 제외하는 옵션 `exclude_unset` 을 활용하여 필요한 작업만 명령할 수 있습니다.
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
Ninja 에서 기본 제공하는 Decorator 를 추가하면 쉽게 활용할 수 있습니다.

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

<br/>

# Appendix
[Sneaky REST APIs With Django Ninja](https://realpython.com/courses/rest-apis-with-django-ninja/) 에서 1회당 20분을 넘기지 않는 분량의 전체 10회 강의 였습니다. 대신 동영상 대부분이 `terminal` 에서 진행되는 만큼 Django Project 의 structure 이해가 필요 합니다. 2023년 5월 접속해본 결과 현재 다수의 동영상이 `유료 동영상` 으로 전환되어 있었습니다. 때문에 과거 정리한 내용 중 추가로 언급된 내용들을 정리해 보겠습니다.

## **Resolve End Point**
사용자 정의 Endpoint 를 `클래스 메서드` 형식으로 추가할 수 있습니다. 아래의 예제는 `full_name` 과 `user_age` 엔드 포인트를 정의한 뒤, 사용자가 추가로 `resolve_엔드포인트 이름(obj)` 정의를 하면 자동으로 해당 함수의 연산 결과를 EndPoint 로 출력 합니다.

```python
# schema.py
class PersonSchema(ModelSchema):

    # Naming User Field
    full_name: str
    user_age: str

    class Config:
        model = Person
        model_fields = ['id', 'birth_year',]

    # User Field Function
    # :: use `resolve_` method
    @staticmethod
    def resolve_full_name(obj):
        return f'{obj.name}  {obj.title}'

    @staticmethod
    def resolve_user_age(obj):
        age = 50 - obj.birth_year
        return f'{obj.name}  {age}'
```

## **Get Items**
라우터 함수에서는 `get_object_or_404` 를 사용하여 테이블 데이터를 호출 합니다.  
```python
from django.shortcuts import get_object_or_404

@router.get("/person/{int:person_id}", response=PersonSchema)
def person(request, person_id):
    return get_object_or_404(Person, id=person_id)
```

Django Shell 을 사용하여 결과값을 테스트 할 수 있습니다.
```python
In [1]: from content.apis.krx.models import Person
   ...: from content.apis.krx.schema import PersonSchema
   ...: item = Person.objects.last()
   ...: data = PersonSchema.from_orm(item)
   ...: data
Out[1]: PersonSchema(
    id=2, birth_year=11, 
    full_name='Django  the ORM of Django', 
    user_age='Django  39'
)

In [2]: data.dict()
Out[2]: 
{'id': 2,
 'birth_year': 11,
 'full_name': 'Django  the ORM of Django',
 'user_age': 'Django  39'}

In [3]: data.json()
Out[3]: '{"id": 2, "birth_year": 11, "full_name": "Django  the ORM of Django", "user_age": "Django  39"}'
```

## CRUD Example
```python
@router.post("/gift", response=GiftOut, url_name="create_gift")
def create_gift(request, payload: GiftIn):
    body = WeddingGift.objects.create(**payload.dict())
    return body

# Read 1 : Item List
@router.get("/gifts", response=List[GiftOut], url_name='list_gifts')
def list_gifts(request):
    return WeddingGift.objects.all()

# Read 2 : Read Item
@router.get('/gift/{int:id}', response=GiftOut, url_name='gift')
def get_gist(request, id):
    return get_object_or_404(WeddingGift, id=id)

# Update
@router.put('/gift/{int:id}', response=GiftOut)
def update_gift(request, id, payload: GiftIn):
    item = get_object_or_404(WeddingGift, id=id)
    # Update Instance
    for key, value in payload.dict().items():
        setattr(item, key, value)
    item.save()
    return item

# Delete
@router.delete("/gift/{int:id}")
def delete_gift(request, id):
    item = get_object_or_404(WeddingGift, id=id)
    item.delete()
    return  {"success":True}
```

<br>

# 참고 사이트 
- [Building HTTP APIs with DRF](https://realpython.com/courses/django-rest-framework/)
- [REST APIs: Interacting With Web Services](https://realpython.com/api-integration-in-python/)
- [Test Driven Development of Django Restful API](https://realpython.com/test-driven-development-of-a-django-restful-api/)