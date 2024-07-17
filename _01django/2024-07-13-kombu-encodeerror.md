---
layout: blog
title: Celery (kombu.exceptions.EncodeError)
tags:
- celery
- multiprocessing
---

Celery 에 등록된 Task 중에서  정기적으로 **<span style="color:orange">kombu.exceptions.EncodeError</span>** 오류가 발생 하였습니다. 오류 내용을 살펴보면 `venv` 에서 설치된 `kombu/util/json.py` 에서 문제가 시작하여, `/usr/local/lib/python3.11/json/encoder.py` 에서 오류 내용을 출력하고 있는 것을 볼 수있습니다.

```bash
$ celery inspect ping    
Traceback (most recent call last):
  File "/home/erdos/Source/.venv/lib/python3.11/site-packages/kombu/transport/pyamqp.py", line 203, in establish_connection
    conn.connect()
  File "/home/erdos/Source/.venv/lib/python3.11/site-packages/amqp/connection.py", line 324, in connect
    self.transport.connect()
  File "/home/erdos/Source/.venv/lib/python3.11/site-packages/amqp/transport.py", line 184, in _connect
    self.sock.connect(sa)
ConnectionRefusedError: [Errno 111] Connection refused

The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "/home/erdos/Source/.venv/bin/celery", line 8, in <module>
    sys.exit(main())
             ^^^^^^
  File "/home/erdos/Source/.venv/lib/python3.11/site-packages/kombu/connection.py", line 458, in _ensure_connection

  File "/usr/local/lib/python3.11/contextlib.py", line 158, in __exit__
    self.gen.throw(typ, value, traceback)
  File "/home/erdos/Source/.venv/lib/python3.11/site-packages/kombu/connection.py", line 476, in _reraise_as_library_errors
    raise ConnectionError(str(exc)) from exc
kombu.exceptions.OperationalError: [Errno 111] Connection refused
```

이를 근거로 추축을 해 보면 Django + Celery 에서 연결된 시스템 Redis (RabbitMQ) 와 연결되는 부분에서 문제가 발생한 것이 아닌가 생각이 들었습니다.

```bash
  File "/home/username/Source/.venv/lib/python3.11/site-packages/kombu/utils/json.py", line 47, in default
    return super().default(o)
           ^^^^^^^^^^^^^^^^^^
  File "/usr/local/lib/python3.11/json/encoder.py", line 180, in default
    raise TypeError(f'Object of type {o.__class__.__name__} '
TypeError: Object of type OperationalError is not JSON serializable
During handling of the above exception, another exception occurred:

kombu.exceptions.EncodeError: Object of type OperationalError is not JSON serializable
```

<br/>

# Message Queue
## Redis & RabbitMQ
비동기 작업을 수행하는 Message Queue 중에 Django 와 연결 가능한 것으로 Redis 와 RabbitMQ 가 있습니다. [Redis, RabbitMQ 차이점을 알아보자](https://velog.io/@jisoo1170/Redis-RabbitMQ-%EC%B0%A8%EC%9D%B4%EC%A0%90%EC%9D%84-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90) 포스팅 내용을 참고해 보면 서비스 운영 내용에 따라 적합한 것을 선택하면 됩니다. 최대한 간단한 구조와 운영을 지향하는 입장에서 Redis 를 선택 하였습니다.

<br/>

# Celery
## Django Code
Django 에서 Celery 설정관련 내용을 살펴보면 다음과 같습니다.
```python
# settings.py:
CELERY_BROKER_URL = 'amqp://localhost'
CELERY_RESULT_BACKEND = 'amqp://localhost'
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TASK_SERIALIZER = 'json'
```

[task-message-protocol](https://docs.celeryq.dev/en/latest/history/whatsnew-4.0.html#new-task-message-protocol) 내용을 참고하면, Camel Case 로도 입력할 수 있는데 예시를 보면 다음과 같습니다.
```python
app = Celery('celery', broker=BROKER_URL,
  backend=BROKER_URL)

app.conf.update(
  accept_content=['application/json'],
  task_serializer='json',
  result_serializer='json',
)
```

## Task Serializer
[kombu.exceptions.EncodeError: User is not JSON serializable - stackoverflow](https://stackoverflow.com/questions/49373825/kombu-exceptions-encodeerror-user-is-not-json-serializable) 에서 가장많이 추천된 내용을 살펴보면 다음과 같습니다.

요약을 하면 task serialization 를 `JSON` 으로 정의해서 발생한 문제로 2개의 답을 제시하고 있습니다. 쉽게 해결을 하기위해 2번째 내용에 관하여 공식문서를 참고하게 되었습니다.

```bash
This is because you are using the JSON serializer for task serialization (as indicated by the setting CELERY_TASK_SERIALIZER = 'json'), but you are trying to return a model instance (which cannot be serialized into JSON).

You have two options:
1) Don't pass the instance, pass the primary key of the instance and then look up the object inside your task.

2) Use the pickle task serializer instead. This will allow you to pass objects as arguments to your tasks and return them, but comes with it's own security concerns.
```

## Celery Securit - Serializers
[Celery Securit #Serializers](https://docs.celeryq.dev/en/stable/userguide/calling.html#serializers) 공식문서를 보면 `json, pickle, yaml, msgpack` 등 있는데, 파이썬에 친숙한 `pickle` 로 변경 하였습니다

```python
app.conf.update(
  accept_content=['application/json'],
  task_serializer='json',
  (-) result_serializer='json',
  (+) result_serializer='pickle',
)
```

<br/>

# 참고사이트
- [Django Celery + RabbitMQ 세팅](https://blog.naver.com/lastingchild/222348184974)
- [Celery 첫 걸음마 떼기](https://velog.io/@yvvyoon/celery-first-step-2)
- [Django + Celery + Redis: kombu.exceptions.OperationalError](https://stackoverflow.com/questions/73400719/django-celery-redis-kombu-exceptions-operationalerror-errno-111-connecti)
- [kombu.exceptions.EncodeError](https://stackoverflow.com/questions/49373825/kombu-exceptions-encodeerror-user-is-not-json-serializable)
