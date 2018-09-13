---
title : Django Channels
last_modified_at: 2018-09-10T10:45:06-05:00
header:
  overlay_image: /assets/images/book/dj_channels.jpg
categories:
  - django
tags: 
    - django 
    - channels
toc: true 
---

<br>
# Django 에서 Channels 비동기 처리

앞에서 **celery**를 활용한 **함수적 비동기/ Crontab** 처리를 이해했다면, 이번에는 **channels**을 활용한 **Web Socket 의 구현** 을 하는 기능으로, 대표적인 예제로써 **Chatbot** 을 생각하면 된다.

서버에서 작업가능한 상황들로써
1. **AJAX** : DB 와 temlplate 간의 연결 
2. **Celery** : 함수의 비동기적 처리 
3. **Channels** : 별도의 Web Socket 구현 

의 기본개념과, Source Code 를 탄탄하게 익혀둔다면 어떠한 부가적인 내용에 대해서도 유연하게 해결책을 도출 가능 할 것이다.


<br>
# Channels 의 내용

<iframe width="560" height="315" src="https://www.youtube.com/embed/RVH05S1qab8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
</iframe>

여기서는 Django2.0 이상, Python 3.6 이상, Channels 2.1.2 이상의 최신버젼(2018년 9월 기준)을 대상으로 작업을 진행할 것으로써,  YouTube 를 참고하면 더 자세하게 알 수 있다. 추가 내용은 [Document](https://channels.readthedocs.io/en/latest/installation.html) 를 통해서 Python 소스를 추가하면 된다


<br>
## 1 channels 설치 및 Django 적용

> $ pip install channels

```python
# settings.py
INSTALLED_APPS = [ 'channels', ]
```

위의 작업을 마치고 DB와 연동 가능한 'makemigrations', 'migrate' 작업을 진행한 뒤 `$ python manage.py runserver` 를 실행하면 

> CommandError: You have not set ASGI_APPLICATION, which is needed to run the server.

와 같은 오류를 출력함을 알 수 있다. (여기까지도 정상이다!!)


<br>
## 2 ASGI_APPLICATION

웹소켓을 정의 하기만 했지, 이를 활용할 **router**를 지정하지 않은 문제로, 
1. settings.py 와 같은 폴더에 **routing.py**를 추가
2. **settings.py** 에 위의 추가한 내용을 연결한다

```python
# /server/routing.py

from channels.routing import ProtocolTypeRouter

application = ProtocolTypeRouter({
    # Empty for now (http->django views is added by default)
})
```

```python
# /server/settings.py
ASGI_APPLICATION = "server.routing.application"
```

위 두가지 작업을 `$ python manage.py runserver` 를 실행하면 서버가 원활하게 작동하는 걸 볼 수 있다 


<br>
## 3 ASGI_APPLICATION [출처](http://victorydntmd.tistory.com/261)

**ASGI(Asynchronous Server Gateway Interface)** 는 **WSGI** 를 계승한 것으로 비동기 방식으로 실행된다.

웹 서버와 python 응용프로그램 간의 표준 인터페이스를 제공하기 위해 Django Channels와 배포에 사용되는 Daphne 서버에서 정의한 사양으로서 HTTP, HTTP/2 및 WebSocket와 같은 프로토콜을 지원한다.

ASGI는 비동기 요청인 웹 소켓을 처리하는 이벤트로서 connect, send, receive, disconnect가 있다.

Django 기본으로 설정된 WSGI를 비활성화 하고 **ASGI** 를 추가한다.

```python
#server/asgi.py
import os, django
from channels.routing import get_default_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()
application = get_default_application()
```

그리고 settings.py 에서는 WGI 설정을 비활성화 하여 불필요한 작업을 제한한다

```python
# server/settings.py

ROOT_URLCONF = 'cfehome.urls'
ASGI_APPLICATION = "cfehome.routing.application"
# WSGI_APPLICATION = 'cfehome.wsgi.application'
```

<br>
# Chat Application


## consumers.py

웹소켓을 통해서 채팅하는 객체를 정의한다


```python
# chat/consumers.py

import asyncio, json
from django.contrib.auth import get_user_model
from channels.consumer import AsyncConsumer
from channels.db import database_sync_to_async

from .models import Thread, ChatMessage

class ChatConsumer(AsyncConsumer):
    def websocket_connect(self, event):
        print("connected", event)
```




출처: 



<figure class="align-center">
  <img src="https://buildwithdjango.com/static/blog/progress-bars/async-task-architecture.png" alt="">
  <figcaption> Django Celery 구조도</figcaption>
</figure> 


<br>
## redis 서버설치

<small>메모리 기반의 서버로 간단하게 바로 설치된다</small>

```
$ sudo apt-get install redis-server
$ redis-cli ping
PONG
```


<br>
## celery 설치

`$ pip install 'celery[redis]'` 를 사용하면 의존성 모듈을 자동으로 설치한다 <small> pip list로 확인하면 **amqp, billiard, celery, kombu, redis, vine** 등이 함께 설치된다 </small>

```
$ pip install celery
$ pip install redis
$ pip install django-celery-beat
$ pip install django-celery-results
```



<br>
## Django Setting for Celery

[Coding for Enterprise](https://www.codingforentrepreneurs.com/blog/celery-redis-django/)<br>
[Celery Document](http://docs.celeryproject.org/en/latest/django/first-steps-with-django.html#using-celery-with-django)

<br>
### Basic Structure
    
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
### Django_Project/server/settings.py

```python
INSTALLED_APPS = [
    'django_celery_results',   # Celery 
    'django_celery_beat',
]

# Celery 설정
# CELERY_TIMEZONE 는 django 설정값이 앞에 있어야 한다
CELERY_TIMEZONE          = TIME_ZONE  
CELERY_BROKER_URL        = 'redis://localhost:6379'
CELERY_RESULT_BACKEND    = 'redis://localhost:6379'
CELERY_ACCEPT_CONTENT    = ['application/json']
CELERY_TASK_SERIALIZER   = 'json'
CELERY_RESULT_SERIALIZER = 'json' 
```


<br>
### Django_Project/server/celery.py

```python
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# `celery` 프로그램을 작동시키기 위한 기본 장고 세팅 값을 정한다.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

# @app 데코레이션 활성화
app = Celery('server')

# namespace='CELERY'는 모든 셀러리 관련 구성 키를 의미한다.
# 반드시 CELERY라는 접두사로 시작해야 한다.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Django App Config에 등록된 모든 taks 모듈을 불러온다.
app.autodiscover_tasks()

# celery 터미널 실행내용을 정의한다
@app.task(bind=True)
def debug_task(self):
    print('Celery DATABASE Request: {0!r}'.format(self.request))
```

<br>
## Celery + Redis 실행 확인하기

<br>
### 연결된 app 에 celery 작업명령을 정의한다
`server/app이름/tasks.py`

```python
# Create your tasks here
from __future__ import absolute_import, unicode_literals
from celery import shared_task
import random

@shared_task
def add(x, y):
    return x + y

@shared_task
def mul(x, y):
    total = x * (y * random.randint(3, 100))
    return total

@shared_task
def xsum(numbers):
    return sum(numbers)
```

<br>
### Redis 서버를 실행하여 tasks.py 및 Celery 연결확인 

```
$ celery -A server worker -l info
```

별도의 터미널을 열고서 `redis` 로 실행하는 `celery DataBase` 를 실행한다. 만약 오류가 발생한다면 1) 파이썬 모듈의 문법오류, 2)`RESULT_BACKEND` 를 잘못 지정해줬을 가능성 등을 점검한다 <small>작업결과 tasks.py 내의 문법오류시 오류가 발생하는 경우가 제일 많았다</small>
{: .notice--info}


<br>
### 위에서 설정한 tasks.py 내부 함수를 Test 한다

`$ python manage.py shell`

```python
In []: from chartjs.tasks import add

In []: add(10,3)
Out[]: 13

In []: add.delay(10,3)
Out[]: <AsyncResult: 1d0e3f35-f6ac-4688-b4dd-58cd37defb93>
```

<br>
위의 **django-shell** 실행 결과들이 **Celery redis** 에서 출력됨을 볼 수 있다

```
[2018-07-05 16:37:59,854: INFO/MainProcess] Received task: sum_two_numbers[1d0e3f35-f6ac-4688-b4dd-58cd37defb93]

[2018-07-05 16:37:59,857: INFO/ForkPoolWorker-1] Task sum_two_numbers[1d0e3f35-f6ac-4688-b4dd-58cd37defb93] succeeded in 0.0016897160003281897s: 13
```



<br>
## app celery 실행에 CronTab 기능추가

<br>
### **settings.py**  

<small>[참고 사이트](https://medium.com/@yehandjoe/celery-4-periodic-task-in-django-9f6b5a8c21c7)</small>

```python
from celery.schedules import crontab

CELERY_BEAT_SCHEDULE = {

    'task-number-one': {
        'task': 'app이름.tasks.실행함수',
        'schedule': crontab(minute=59, hour=23)
    },

    'task-number-two': {
        'task': 'app이름.tasks.실행함수',
        'schedule': crontab(minute=0, hour='*/3,10-19')
    }
}
```


### Crontab schedule 설정

<small>[정식 Document](http://docs.celeryproject.org/en/latest/reference/celery.schedules.html#celery.schedules.crontab)</small>

> class celery.schedules.crontab(**minute**=u'*', **hour**=u'*', **day_of_week**=u'*', **day_of_month**=u'*', **month_of_year**=u'*', **kwargs)

|  예제         |   소스코드                                |
|:-------------:|:----------------------------------------:|
|1분 간격       |crontab()                                  |
|15분 간격      |crontab(minute='*/15')                    |
|매일 자정      |crontab(minute=0, hour=0)                  |
|3배수시간 실행 |crontab(minute=0, hour='*/3')              |
|3배수시간 실행 |crontab(minute=0,hour='0,3,6,9,12,15,18,21')|
|일요일 1분 간격 |crontab(day_of_week='sunday')             |
|일요일 1분 간격 |crontab(minute='*', hour='*', day_of_week='sun') |
|목요일과 금요일 between 3-4 am, 5-6 pm, and 10-11 pm 에 10분마다 실행|crontab(minute='*/10', hour='3,17,22',day_of_week='thu,fri') |
|짝수시간 & 3배수 시간에 실행|crontab(minute=0, hour='*/2,*/3')|
|5배수시간 실행 | crontab(minute=0, hour='*/5') |
|오전8시~오후5시 사이 3배수시간| crontab(minute=0, hour='*/3,8-17')|
|매월 두번째 날|crontab(0, 0, day_of_month='2')|
|짝수 날에 실행|crontab(0, 0, day_of_month='2-30/3')|
|매달 첫째주, 셋째주|crontab(0, 0, day_of_month='1-7,15-21')|
|매년 5월 11일|crontab(0, 0, day_of_month='11',month_of_year='5')|
|4분기의 첫달마다 실행|crontab(0, 0, month_of_year='*/3')|

