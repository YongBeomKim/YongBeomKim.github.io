---
title : Django Celery 비동기 처리
last_modified_at: 2018-07-05T12:45:06-05:00
header:
  overlay_image: /assets/images/book/html.jpg
categories:
  - django
tags: 
    - django 
    - celery
toc: true 
---

<br>
# Django 에서 Celery 비동기 처리 


이번 내용은 앞에서 한번 기록은 했지만, Ajax 등을 정리한 시점에서 실제 적용을 위한 내용을 한꺼번에 정리해 보려고 한다 <small>


<figure class="align-center">
  <img src="https://buildwithdjango.com/static/blog/progress-bars/async-task-architecture.png" alt="">
  <figcaption> Django Celery 구조도</figcaption>
</figure> 


<br>
## redis 서버 설치

<small>메모리 기반의 서버로 간단하게 바로 설치된다</small>

```
$ sudo apt-get install redis-server
$ redis-cli
127.0.0.1:6379> 
```


<br>
## celery 설치

설치시 `[redis]` 를 함께 입력하면 의존성 모듈을 함께 설치한다

```
$ pip install 'celery[redis]'
```


<br>
## Django Setting for Celery

[Celery Document](http://docs.celeryproject.org/en/latest/django/first-steps-with-django.html#using-celery-with-django)

```
- Django_Project/
  - manage.py
  - server/
    - __init__.py
    - settings.py
    - urls.py
```


<br>
### Django_Project/server/__init__.py

```python
from __future__ import absolute_import, unicode_literals
from .celery import app as celery_app

__all__ = ('celery_app',)
```

<br>
### Django_Project/server/celery.py

```python
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

# Celery 와 연동 객체의 namespage은 `CELERY_` 로 시작해야 한다
# @app 데코레이션 활성화
app = Celery('server')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()  

@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
```

<br>
### Django_Project/server/settings.py

django-celery-results 모듈을 설치한다. 이는 **Django ORM/Cache**를 백핸드로 활용 가능하도록 연결한다.

```
$ pip install django-celery-results
```


```python
INSTALLED_APPS = [
    'django_celery_results',   # Celery 
]
```
