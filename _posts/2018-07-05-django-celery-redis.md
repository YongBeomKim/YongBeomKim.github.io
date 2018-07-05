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
CELERY_TAST_SERIALIZER   = 'json'
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

@app.task(bind=True)
def debug_task(self):
    print('Celery DATABASE Request: {0!r}'.format(self.request))
```

<br>
## Celery + Redis 실행 확인하기


<br>
## 연결된 app 에 celery 작업을 실행

<br>
### `server/app이름/tasks.py`

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
### Redis 서버를 실행

```
$ celery -A server worker -l info
```

별도의 터미널을 열고서 `redis` 로 실행하는 `celery DataBase` 를 실행한다. 만약 오류가 발생한다면 `RESULT_BACKEND` 를 잘못 지정해줬을 가능성이 크다.
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
        'task': 'app이름.tasks.task_number_one함수',
        'schedule': crontab(minute=59, hour=23)
    },

    'task-number-two': {
        'task': 'app2.tasks.task_number_two함수',
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

