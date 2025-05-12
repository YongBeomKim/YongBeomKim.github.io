---
layout: blog
title: Celery 에서 Requested setting INSTALLED_APPS
tags:
- celery
---

다음과 같은 기본구조를 갖고서 Django Project를 작업하고 있습니다.
```bash
├── app_info
│   ├── tasks
│   │   ├── __init__.py
│   │   ├── base.py
│   │   └── calender.py
│   └── schedule.py
├── server
│   └── celery.py
└── manage.py
```

Celery 의 Task 들을 정의할 때, 개별 Django 의 app 내부에 종합 정리한 `SCHEDULE` 객체들을 `./server/celery.py` 에 모아서 연결하는 방법을 사용 했었습니다.
```python
# ./server/celery.py
from app_info.schedule import schedule as schedule_info

app = Celery()


# Celery Periodic Tasks
SCHEDULE = {}
SCHEDULE.update(schedule_info)  # app_info
app.conf.beat_schedule = SCHEDULE
```

<br/>

# 오류발생내용

이와같은 형태로 작업을 했었고, 예전에는 별 문제 없이 작동 했었습니다 <strike>동작하는게 이상했던 거였습니다.</strike> 이번에는 `$ celery -A mysite` 를 실행하면 다음의 오류가 발생 하였습니다.
```bash
raise ImproperlyConfigured(
django.core.exceptions.ImproperlyConfigured: Requested setting INSTALLED_APPS, but settings are not configured. You must either define the environment variable DJANGO_SETTINGS_MODULE or call settings.configure() before accessing settings 
```

<br/>

# 해결방법
정석적인 `Celery` 설정 및 작업 등록에 대하여 정리해 보겠습니다.

## Task 정의하기
`app_task` 단위로 Celery Task을 정의해 보겠습니다. 실제로는 다수의 ORM 및 내부 함수를 활용하는 `task` 내용을 정의하다 보니 여러개의 하부 폴더에 최종 task 함수가 위치하게 되는 경우가 많았습니다. 
```python
# ./app_task/tasks/run.py
from celery import shared_task

@shared_task
def run_sum(x, y):
    print(f'`run_sum` {x=}, {y=} = {x+y} is running ...')
    return x + y
```

## SCHEDULE 추가하기
위의 작업 내용을 스케쥴링만 관리하는 파일에서 `실행함수 절대경로` 를 `문자열`로 입력 합니다. 
```python
# ./app_task/schedule.py
from celery.schedules import crontab
from random import randint

SCHEDULE = {
    'task_add':{
        'task': 'app_task.tasks.calender.run_add',
        'schedule': 10.0,
        'kwargs': {"x":randint(1,10), 'y':randint(1,10)},
    },
}
```

## `server/celery.py` 에서 정의하기
이전까지는 celery 에서 개별 `django app` 단위로 정의한 위의 `SCHEDULE` 객체들을 `./server/celery.py` 에 직접 불러 모아서 연결하는 방법을 사용했었습니다. 이러한 경우 (1) `celery` 가 실행될 때에는 `django` 내부의 필요한 함수들이 모두 활성화가 된 이후에 `celery` 가 실행되어야 하는 조건을 필요로 합니다 (2) 그리고 `celery` 를 실행할 때 불러오는 함수들이 꼬여서 실행에 문제가 발생할 수 있습니다.

`settings.py` 에서 `CELERY_BEAT_SCHEDULE` 객체에 schedule 들을 모아놓으면 `app.config_from_object('django.conf:settings', namespace='CELERY')` 로 설정파일을 불러올 때 함께 내용을 불러옵니다.

그리고 `server/celery.py` 에서 실행 내용을 아래와 같이 명확하게 단계별로 아래와 같이 정의를 하면 됩니다. 그리고 위에 설명한 것처럼 `app.autodiscover_tasks()`를 활용하여 `CELERY_BEAT_SCHEDULE` 불러와서 자동으로 연결하는 방식으로 동작을 하면 위의 문제들이 자동으로 해결 됩니다.
```python
# https://docs.celeryq.dev/en/stable/django/first-steps-with-django.html
import os
from celery import Celery

# Celery 설정에 필요한 `Django` 의 변수값 불러오기
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

# Initialized Celery
app = Celery(
    'mrmarket',
)
# settings.py 파일의 CELERY_ 설정을 읽어옴
app.config_from_object('django.conf:settings', namespace='CELERY')

# SCHEDULE 내용을 `settings.INSTALLED_APPS` 에서 자동으로 호출
# `app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
app.autodiscover_tasks()
```

<br/>

# 참고사이트
- [django-celery-beat, 스케줄링 함수가 작동하지 않을 때](https://velog.io/@ehgus8621/Django-celery-%EC%9D%91%EB%8B%B5-%EC%97%86%E3%85%87)
