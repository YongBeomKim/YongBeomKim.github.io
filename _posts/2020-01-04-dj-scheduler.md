---
title : Django 2.2 Setting
last_modified_at: 2019-12-21T12:45:06-05:00
header:
  overlay_image: /assets/images/django/django-rest-3.jpg
categories:
  - django
tags: 
    - django
    - start
---

Django 의 Scheduler 를 적용하는 방법을 정리해 보겠습니다.

**[APScheduler and django_apscheduler into Django](https://medium.com/@mrgrantanderson/replacing-cron-and-running-background-tasks-in-django-using-apscheduler-and-django-apscheduler-d562646c062e)** 내용을 중심으로 정리해 보겠습니다.

<br/>

# **Django IN APScheduler**

Python 에서 정기적인 실행을 적용하는 방법으로

1. **Celery** 와 **Redis** 의 활용
2. 리눅스의 **CronTab** 설정의 활용
3. 파이썬 **APScheduler** 를 활용

**Python** 을 활용하여 제어능력을 높이는 방식으로 **3** 번을 선택하게 되었습니다.

## **1 INTRODUCTION**

**[APScheduler 3.6.3](https://pypi.org/project/APScheduler/)**

**Issue** 중에는 **SQLAlchemy** 등과 연결시 속도에 무낙 발생하는 내용이 있었습니다. **Rest API** 와 **Crawling** 을 관리하며 부담을 줄이고, 보충으로 **우분투 의 CronTab** 을 활용하는 방식 보완하는 계획을 수립하도록 합니다.

**[django-apscheduler 0.3.0](https://pypi.org/project/django-apscheduler/)**

**[GitHub Django Example](https://github.com/LuxunHuang/DjangoApscheduler101/blob/master/weather/views.py)**

**django-apscheduler 0.3.0** 문서를 살펴보면 `django>=1.11` , `apscheduler>=3.2.0` 내용이 있습니다. 2020년 1월 최신버젼을 설치한 결과 잘 작동하는 모습을 볼 수 있습니다.

## **2 mysite/settings.py**

설정에서 추가할 내용은 다음과 같습니다.

```python
INSTALLED_APPS = [
    'django_apscheduler',
]
# Scheduler 설정
# - jobs 내용을 Project Database 로 생성
# - thread 에서 실행하는 jobs Application 제어
SCHEDULER_CONFIG = {
    "apscheduler.jobstores.default": {
        "class": "django_apscheduler.jobstores:DjangoJobStore"
    },
    'apscheduler.executors.processpool': {
        "type": "threadpool"
    },
}
SCHEDULER_AUTOSTART = True
# APSCHEDULER_DATETIME_FORMAT =  "N j, Y, f:s a"  # Default
```

## **3 http://localhost:8000/admin/**

Django 의 setting.py 파일에 다음의 내용을 기록한 뒤, `$ python manage.py makemigrations && python manage.py migrate` 를 실행하면 관련 table 이 생성되고, **Admin** 페이지에 자동으로 등록 됩니다.

```
Django APScheduler administration
Django APScheduler 
=======================================
Django job executions   + Add  / Change
Django jobs 	          + Add  / Change
```

**Django jobs** 에는 개별 실행을 특정한 파일의 목록이 등록되고, 실행 Que 기록은 **Django job executions** 에서 살펴볼 수 있습니다.

## **views.py**

```python
import time
from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore,\
    register_events, register_job

# thread 실행 인스턴스 생성하기
scheduler = BackgroundScheduler()
scheduler.add_jobstore(DjangoJobStore(), "default")


# 실행할 함수 Sample
class TT:
    def __init__(self, a, b):
        self.a = a
        self.b = b
    def update_a(self, Time):
        self.a = str(Time)


# 스케줄링의 적용함수 (interval)
@register_job(scheduler, "interval", seconds=1)
def test_job():
    print("task: " + str(time.time()))
    TT(1 ,2).update_a(int(time.time()))


# 스케줄링의 적용함수 (cron)
# 0:00, 6:00, 12:00, 18:00 정시에 실행
@register_job(scheduler, "cron", hour='0,6,12,18')
def test_job_hourly():
    print("task: " + str(time.time()))
    TT(1 ,2).update_a(int(time.time()))

# 스케줄링 시작
register_events(scheduler)
scheduler.start()
print("Scheduler started!")
```

