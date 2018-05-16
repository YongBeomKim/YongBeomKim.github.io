---
title : Celery, Redis 와 Django 연동
last_modified_at: 2018-05-15T22:45:06-05:00
header:
  overlay_image: /assets/images/book/django-celery.png
categories:
  - django
tags: 
    - redis
    - django
    - celery
toc: true    
---


# Django 와 Redis Server 연동

[설치 가이드 Blog](http://whatisthenext.tistory.com/127)<br>
[celery django](http://wangin9.tistory.com/entry/celery)

<br>
## celery 

### Celery 파이썬 모듈 설치하기 

```
$ pip install 'celery[redis]'
$ pip install  celery  redis  django-celery-beat  django-celery-results
```

**'celery[redis]'** 로 작은따옴표를 둘러싸고서 설치를 하면 redis 와 의존성 모듈을 함께 설치한다
{: .notice--info}



### Djagno 프로젝트와 Celery 연동하기 

<br>
`[프로젝트 폴더] / [환경폴더] / settings.py`

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_celery_beat',
    'django_celery_results',
]
 
# Celery
CELERY_BROKER_URL = 'redis://localhost:6379'
CELERY_RESULT_BACKEND = 'redis://localhost:6379'
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TAST_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'Asia/Seoul' # 스케줄러는 시간정의 필수
```

<br>
`[프로젝트 폴더] / [환경폴더] /celery.py`

```python
from __future__ import absolute_import 
import os 
from celery import Celery
 
# Celery를 기본모듈 등록
os.environ.setdefault('DJANGO_SETTINGS_MODULE', '환경폴더.settings')
app = Celery('환경폴더')
app.config_from_object('django.conf:settings', namespace = 'CELERY')
app.autodiscover_tasks()  # 모든 Django App configs에서 task 활성화
 
@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
```

**.setdefault()** 설정을 문자열로 등록한 이유는 Celery Worker 자식 프로세스에게 configuration object를 직렬화 않기 때문이다. 
**namespace = 'CELERY'** 는 celery 관련한 configuration key는 'CELERY_' 로 시작해야 하기 때문이다.
{: .notice--info}

<br>
`[프로젝트 폴더] / [환경설정 폴더] / __init__.py`

```python
from .tasks import app as celery_app
__all__ = ['celery_app']
```


<br>
`[프로젝트 폴더] / [환경설정 폴더] / tasks.py` 에 스케줄러를 정의한다

```python
from __future__ import absolute_import, unicode_literals
import random
from celery.decorators import task
  
@task(name="sum_two_numbers")
def add(x, y):
    return x + y
 
@task(name="multiply_two_numbers")
def mul(x, y):
    total = x * (y * random.randint(3, 100))
    return total
 
@task(name="sum_list_numbers")
def xsum(numbers):
    return sum(numbers)
```


<br>
### Djagno 와 Celery 확인

```bash
$ python manage.py makemigrations
No changes detected
$ python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, books, contenttypes, django_celery_beat, django_celery_results, sessions
```


```bash
$ celery -A server beat -l info
celery beat v4.1.0 (latentcall) is starting.
LocalTime -> 2018-05-16 20:54:40
Configuration ->
    . broker -> redis://localhost:6379//
    . loader -> celery.loaders.app.AppLoader
    . scheduler -> celery.beat.PersistentScheduler
    . db -> celerybeat-schedule
    . logfile -> [stderr]@%INFO
    . maxinterval -> 5.00 minutes (300s)
[2018-05-16 20:54:40,080: INFO/MainProcess] beat: Starting...
```

`celery -A [프로젝트명] beat -l info` 를 실행하면, **celery beat** 를 통해서 tasks.py 를 테스트 한다
{: .notice--info}


```python
$ ipython manage.py shell_plus
Python 3.6.3 (default, Oct  3 2017, 21:45:48) 
Type 'copyright', 'credits' or 'license' for more information
IPython 6.2.1 -- An enhanced Interactive Python. Type '?' for help.

In [1]: from  server.tasks import add

In [2]: add.delay(4, 4)
Out[2]: <AsyncResult: 9f935894-17dd-48ce-bd9c-4779df2ec133>
```


<figure class="align-center">
  <img src="https://buildwithdjango.com/static/blog/progress-bars/async-task-architecture.png" alt="">
  <figcaption> 비동기 처리를 위한 message Q 구조</figcaption>
</figure>


**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}   