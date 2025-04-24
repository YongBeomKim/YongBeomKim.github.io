---
layout: blog
title: Django 에서 Async 활용하기
tags:
- mysql
---

`Django Ninja`는 자체적으로 **비동기 뷰를 완전히 지원**합니다. 1. `async def`를 사용하면 `asyncio` 기반의 코드도 원활하게 사용할 수 있습니다. 2. Django는 전통적으로 동기식 ORM을 사용하기 때문에, 이걸 비동기 컨텍스트에서 다룰 때는 `asgiref.sync.sync_to_async`를 사용할 수 있습니다.

## **`async def`를 사용하는 경우 - 외부 API 호출 등 I/O 작업**
다음의 경우에는 `async def` 함수 안에서 `await`와 함께 `asyncio.sleep()`, `HTTP 요청`, `비동기 파일 처리` 등을 직접 사용할 수 있습니다. 이 경우는 완전히 **비동기 루틴만 사용**하므로 Django Ninja + asyncio 만으로 충분 합니다.
```python
import asyncio
from ninja import NinjaAPI

api = NinjaAPI()

@api.get("/async-hello")
async def async_hello(request):
    await asyncio.sleep(1)  # 비동기 지연 (예: 외부 API 대기)
    return {"message": "Hello from async view!"}
```

## **`sync_to_async`를 사용하는 경우 - Django ORM 같은 동기 코드가 포함될 때**
Django ORM은 **동기 코드**입니다. 비동기 함수 내에서 `User.objects.get()` 같은 동기 코드를 직접 호출하면 **경고 메시지**가 발생하거나 **잠재적 deadlock**이 생길 수 있어서 `sync_to_async()`로 감싸줘야 안전합니다.

Django ORM을 **비동기 함수에서 호출**해야 할 땐 `sync_to_async()`를 반드시 사용해야 합니다.
```python
from ninja import NinjaAPI
from django.contrib.auth.models import User
from asgiref.sync import sync_to_async

api = NinjaAPI()

@api.get("/user-info")
async def user_info(request, username: str):
    get_user = sync_to_async(User.objects.get)
    user = await get_user(username=username)
    return {"email": user.email}
```

## `sync_to_async`와 `async_to_sync` 정리
| 기능 | 사용 상황 | 설명 |
|------|-----------|------|
| `sync_to_async(fn)` | 비동기 코드에서 동기 함수 호출 | 비동기 뷰 안에서 Django ORM, 파일 등 전통적인 동기 함수 사용 |
| `async_to_sync(fn)` | 동기 코드에서 비동기 함수 호출 | 주로 management command나 middleware 등 동기 컨텍스트에서 비동기 함수 호출할 때 사용 |

## 전체내용 요약
| 상황 | 방법 |
|------|------|
| `asyncio`나 `httpx`, 외부 API만 쓸 때 | `async def` 함수와 `await` 만으로 OK |
| Django ORM 또는 동기 라이브러리 사용 시 | `sync_to_async()`로 wrapping 필요 |
| 동기 코드에서 비동기 함수 호출 시 | `async_to_sync()` 사용 |

<br/>

# 참고사이트
- [Ninja Async support](https://django-ninja.dev/guides/async-support/)
- [PyMySQL to Connect a Django](https://medium.com/@lebe_93/using-pymysql-to-connect-to-a-django-project-to-a-mysql-database-77bd5dade213)
