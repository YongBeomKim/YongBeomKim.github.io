---
layout: blog
title: Django Ninja 에서 Async 활용하기
tags:
- mysql
---

`django` 프로젝트의 기본 `admin` 페이지를 실행할 때, 다음과 같은 경고메세지가 출력되는 것을 확인할 수 있었습니다. 해당 경고 메시지는 Django의 `StreamingHttpResponse` 이터레이터를 비동기적으로 처리하려고 할 때 발생합니다. `Django 3.1`부터 `ASGI (Asynchronous Server Gateway Interface)` 비동기 처리를 지원하면서, 스트리밍 응답의 콘텐츠도 비동기 이터레이터를 사용하도록 권장하고 있다는 메세지 입니다
```bash
$ gunicorn server.asgi:application -k uvicorn.workers.UvicornWorker -w 4 -b 0.0.0.0:8000
[INFO] Starting gunicorn 23.0.0
[INFO] Listening at: http://0.0.0.0:8000 (332164)
[INFO] Using worker: uvicorn.workers.UvicornWorker
[INFO] Waiting for application startup.
[INFO] ASGI 'lifespan' protocol appears unsupported.

/lib/python3.12/site-packages/django/core/handlers/asgi.py:332: Warning: StreamingHttpResponse must consume synchronous iterators in order to serve them asynchronously. Use an asynchronous iterator instead.
  async for part in content:
```

<br/>

# Django Template View에서 Async 활용하기

<br/>

# Django Ninja에서 Async 활용하기
[Ninja Async support](https://django-ninja.dev/guides/async-support/)

<br/>

# 참고사이트
- [PyMySQL to Connect a Django](https://medium.com/@lebe_93/using-pymysql-to-connect-to-a-django-project-to-a-mysql-database-77bd5dade213)
