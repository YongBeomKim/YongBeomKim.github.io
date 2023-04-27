---
layout: blog
title: Django Ninja 로 몰래 배우는 Rest API
tags:
- pydantic
---

`PyCharm by JetBrains` 채널에서 지난 9월 [Writing REST With Django and Ninja](https://youtu.be/Gry6rlZYpzw) 세미나가 온라인으로 진행되었습니다. `Django Ninja` 를 소개하는 내용으로 1시간 10분의 짧은 시간속에 기대했던 것 보다 더 알찬 내용을 배울 수 있었습니다.

[Sneaky REST APIs With Django Ninja](https://realpython.com/courses/rest-apis-with-django-ninja/) 에서 1회당 20분을 넘기지 않는 분량의 전체 10회 강의이었습니다. 대신 동영상 대부분이 `terminal` 에서 진행되는 만큼 Django Project 의 structure 이해가 필요 합니다. 아래의 내용은 이번에 새롭게 이해한 부분을 중심으로 정리해 보겠습니다. <strike>이해하기 쉽게 잘 다듬어서 강의 동영상을 직접 만들어도 좋을 듯 합니다...</strike> bg

- [**Django Ninja 로 몰래 배우는 Rest API**](#django-ninja-로-몰래-배우는-rest-api)
  - [**Part 1 URL Params**](#part-1-url-params)
    - [**01 Query String**](#01-query-string)
    - [**02 Url Params**](#02-url-params)
  - [**Part 2 Schema**](#part-2-schema)
    - [**01 Http Response**](#01-http-response)
    - [**02 Schema**](#02-schema)
    - [**3 resolve End Point**](#3-resolve-end-point)
  - [**Part 3 CRUD**](#part-3-crud)
- [기타 참고할 내용](#기타-참고할-내용)


<br/>
<br/>

# **[Django Ninja 로 몰래 배우는 Rest API](https://realpython.com/courses/rest-apis-with-django-ninja/)**

## **Part 1 URL Params**

API 입력 요소를 컨트롤 하는 방법을 살펴보겠습니다. 

### **01 Query String**

`django ninja` 는 `Pydantic` 을 기반으로 제작 되었습니다. 따라서 Python 의 객체선언 내용이 ninja 에서는 속성 검사 를 진행하고, 해당 속성 그대로 연산에 영향을 줍니다. 아래의 예제에서 숫자가 아닌 `string` 객체를 사용하는 경우 오류가 발생하게 됩니다.

```python
@router.get('/rock')
def rock(request, height:int):
    return f"Mountain Rock's heigh is {height+2}m tall"
```

### **02 Url Params**

`.get('/rock/{int:height}')` 내용을 추가하면 query string 이 아닌 URL 구성요소를 우선 적용합니다. 이경우 이름을 동일하게 설정해야 합니다.

```python
@router.get("/food/{str:item}")
def food(request, item:str):
    return f"I love {item}"
```

- 객체선언 `:int` 그대로 Pydantic 및 객체변형이 적용 된다!!!
- :: Server 내부에서 연산은 해당 객체 속성으로 진행된다 (무조건 str 로 적용되진 않음) 
- :: 함수 Param 에만 적용하는 경우 Param 로 작동한다  ex) `/rock?height=500`
- :: URL 에 "동시에 선언" 하는 경우 URL 경로로 작동한다   ex) `@router.get('/rock/{int:height}'`

<br>
<hr>
<br>

## **Part 2 Schema**

이번에는 EndPoint 에 대해서 살펴 보도록 하겠습니다.

타입스크립트에서 다루고 있는 객체와 데이터 타입은 다음과 같습니다.
- 기본타입 : number, string, boolean, object (dict())
- 데이터타입 : array ([list]), tuple ([list]), enum, any
- falsy : void (None), null, undefined, unknown, never

배열 데이터 타입 중 `array` 와 `tuple` 이 동일해 보이는데, 이는 Python 과 비슷하게 연관을 해보자면, `array` 는 `ex) string[]` 와 같이 단일한 타입만 허용되는 배열이고 , `tuple` 은 `ex) [integer, string, integer]` 에서 보여지는 것과 같이 인덱스 마다 고유의 타입을 선언한 배열 입니다.

가장 차이를 보이는 것이 `enum (열거형)` 인데 타입 선언시 객체의 속성이 아닌 **[특정한 값을 선언](https://medium.com/@seungha_kim_IT/typescript-enum%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-3b3ccd8e5552)** 하는 객체 타입 입니다. [출처](https://youtu.be/-TlpYcmHvb8?t=51)

### **01 Http Response**

Ninja 의 `Response` 객체를 활용하여 Django 의 `request` 객체에 직접 접근하여 조작하는 방법이 있습니다.

```python
from django.http import HttpResponse

@router.get("/swords")
def swords(request, response: HttpResponse):
    response.set_cookie("curve", "bendy")
    return f"Swords are pointy"
```

Ninja 에서는 이보다 더 간편한 방법으로 `Header, Cookie` 클래스를 활용하여 조작할 수 있습니다. 

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

### **02 Schema**

일반적인 Rest API End point 를 정의하는 경우, Ninja 의 Schema 클래스를 상속 받는 Class 객체를 사용 합니다. 다음의 내용은 2개의 `TestSchema` tuple 을 출력하는 EndPoint 를 갖는 예제 입니다. 1개가 아닌 다수의 배열(Array) 임을 정의하기 위해 `typing List` 속성을 추가 합니다.

```python
# schema.py
# :: 출력 Object 선언
from ninja import Schema
class TestSchema(Schema):
    name:str
    age:int

# router.py
# :: List[] : 출력 배열객체 선언
from typing import List 
@router.get('/sample', response=List[TestSchema], auth=None)
def sample(request):
    content = [
        TestSchema(name="Python", age=25),
        TestSchema(name="Django", age=13)
    ]
    return content
```

### **3 resolve End Point**

`ModelSchema` 를 사용하면 아래의 예시처럼 사용자 정의 Endpoint 를 추가할 수 있습니다. `full_name` 과 `user_age` 엔드 포인트를 정의한 뒤, 클래스 메서드 이름을 `resolve_엔드포인트 이름(obj)` 으로 정의를 하면 자동으로 해당 함수의 연산 결과를 EndPoint 로 출력 합니다.

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
    # :: use `resolve` method
    @staticmethod
    def resolve_full_name(obj):
        return f'{obj.name}  {obj.title}'

    @staticmethod
    def resolve_user_age(obj):
        age = 50 - obj.birth_year
        return f'{obj.name}  {age}'
```

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
Out[1]: PersonSchema(id=2, birth_year=11, full_name='Django  the ORM of Django', user_age='Django  39')

In [2]: data.dict()
Out[2]: 
{'id': 2,
 'birth_year': 11,
 'full_name': 'Django  the ORM of Django',
 'user_age': 'Django  39'}

In [3]: data.json()
Out[3]: '{"id": 2, "birth_year": 11, "full_name": "Django  the ORM of Django", "user_age": "Django  39"}'
```

<br>
<hr>
<br>

## **Part 3 CRUD**

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

    # Overwrite Instance
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
<hr>
<br>

# 기타 참고할 내용 
- [Building HTTP APIs with DRF](https://realpython.com/courses/django-rest-framework/)
- [REST APIs: Interacting With Web Services](https://realpython.com/api-integration-in-python/)
- [Test Driven Development of Django Restful API](https://realpython.com/test-driven-development-of-a-django-restful-api/)errr