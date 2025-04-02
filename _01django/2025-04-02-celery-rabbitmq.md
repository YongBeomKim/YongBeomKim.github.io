---
layout: blog
title: Celery 를 RabbitMQ 활용하기
tags:
- celery
---

기존에는 Radis 를 `Message Queue` 로 활용했지만, 마무리 부분에 서술할 문제로 `RabbitMQ` 로 대체하려고 합니다. 위 작업을 진행하면서 알게된 내용들을 정리해 보겠습니다.

<br/>

# Celery
Celery 는 기본적인 실행을 위한 패키지 입니다. 스케줄 관리(django-celery-beat) 와 작업 프로세스를 DataBase 에 저장 및 재활용 (django-celery-results) 하는데 도움을 주는 확장 패키지를 설치하면 보다 다양한 기능을 활용할 수 있습니다. 이와 관련한 상세한 내용은 [django-celery-beat : Using custom scheduler classes](https://docs.celeryq.dev/en/stable/userguide/periodic-tasks.html#using-custom-scheduler-classes) 과 [django-celery-results : Using the Django ORM/Cache as a result backend](https://docs.celeryq.dev/en/stable/django/first-steps-with-django.html#extensions) 공식문서를 참고합니다. 

# Celery & Message Queue
## Install RabbitMQ
[RabbitMQ - Apt with Cloudsmith Mirrors: a Quick Start Script](https://www.rabbitmq.com/docs/install-debian#erlang-repositories) 공식 사이트를 참고하여 설치작업을 진행 합니다.

<div style="text-align: center;">
  <figure class="align-center">
    <img width="550" src="{{site.baseurl}}/assets/linux/apt_rabbitmq.png">
    <figcaption>A Quick Start Script</figcaption>
  </figure>
</div>

설치가 완료되었으면 정상적으로 동작하고 있는지 확인합니다.
```bash
$ sudo rabbitmqctl version
4.0.7
```

<br/>

# Queue User Setting
## RabbitMQ
guest/guest 로 기본접속이 가능합니다. 대신 보안의 이유로 `localhost` 에서만 접속 가능한 계정입니다. 외부에서 모니터링 및 관리를 위해서는 별도의 사용자 계정을 생성한 뒤 이를 연결하여야 합니다.
```bash
# guest/guest 는 localhost 에서만 접속가능
# 외부접속 계정생성 방법은 다음과 같습니다.
$ sudo rabbitmqctl add_user <사용자_이름> <비밀번호>
$ sudo rabbitmqctl set_user_tags <사용자_이름> administrator

$ sudo rabbitmqctl add_user your_username your_password
$ sudo rabbitmqctl set_user_tags your_username administrator
$ sudo rabbitmqctl set_permissions -p / your_username ".*" ".*" ".*"
```

Celery 에 연결하는 방식은 다음과 같습니다.
```python
CELERY_BROKER_URL = 'pyamqp://guest@localhost//' 
CELERY_BACKEND    = 'rpc://'

# Celery Init
app = Celery(
    'rabbitmq',
    broker=CELERY_BROKER_URL, # task 를 client <-> worker 중개함
    backend=CELERY_BACKEND,   # Celery 작업의 결과를 저장 및 검색
)
```

## Redis
```bash
# Celery with redis-cli
127.0.0.1:6379> ACL SETUSER user_name on >password ~* +@all

# Django Celery Setting
CELERY_BROKER_URL = 'redis://user_name:password@localhost:6379'
```

<br/>

# Celery 실행
## 실행명령
- `-l info` 는 Celery 기본적인 실행 명령으로, `프로세스 기반` 작업을 처리합니다.
- `-P threads` 는 스레드 기반으로 `I/O-Bound Operations` 에 적합 합니다.

## 일반적인 CPU 프로세스 기반의 실행
일반적인 CPU 프로세스 기반의 `CPU 바운드 작업 (CPU-Bound Operations)` 의 특징은 다음과 같습니다.
- 복잡한 연산, 머신러닝 모델링 및 이미지/비디오 처리 등과 같이 CPU 사용량이 높은 작업을 포함합니다.
- CPU가 지속적으로 연산을 수행하여, `I/O 대기 시간` 은 상대적으로 짧습니다.
- 이와 같은 이유로 CPU 성능이 전체 시스템 성능에 큰 영향을 미칩니다.

```bash
$ celery -A server worker -l info   

[tasks]
  . app_task.tasks.run_add
  . mysite.celery.debug_task
```

## 스레드를 사용한 병렬 I/O 바운드 작업 (I/O-Bound Operations)
`I/O 바운드 작업 (I/O-Bound Operations)`은 CPU 연산보다는 입출력(I/O) 작업에 의해 성능이 제한되는 작업을 의미하는데 특징은 다음과 같습니다.
- 디스크 읽기/쓰기, 네트워크 통신, 데이터베이스 등, 외부 장치와 상호작용에 적합 합니다.
- CPU는 I/O 작업이 완료될 때까지 대기하는 시간이 많습니다.

```bash
$ celery -A server worker -P threads

[2025-04-02 10:11:02,408: WARNING/MainProcess] task run ...
[2025-04-02 10:11:02,414: WARNING/MainProcess] task run ...
[2025-04-02 10:11:02,422: WARNING/MainProcess] task run ...
[2025-04-02 10:11:02,430: WARNING/MainProcess] task run ...
```

<br/>

# 마무리
## 향후과제
이번 Project 는 `CPU 프로세스` 기반의 실행 방식을 활용하여, 무겁지만 

## 총평
`웹 크롤링 및 DataBase 저장` 의 task 를 `Redis` 와 `스레드` 방식의 Celery로 실행했을 때, 다수의 Task 가 중복실행될 때 `Pending` 에 걸려서 실행이 멈추고, Celery 전체가 중단되는 상황을 여러번 마주쳤습니다. 이러한 작업들은 `CPU 프로세스 기반` 으로 실행하는 방식으로 보완이 가능합니다.

[Celery - Routing Tasks](https://docs.celeryq.dev/en/main/userguide/routing.html) 를 활용하여 유사한 특징의 작업들을 Queue 를 다르게 지정한 뒤, Queue 에 따라 다르게 실행을 할 수 있습니다. 
