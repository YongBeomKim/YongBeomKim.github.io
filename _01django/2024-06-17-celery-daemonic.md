---
layout: blog
title: Celer (daemonic processes are not allowed to have children)
tags:
- multiprocessing
---

Django 서비스에서 정해진 시간마다 반복하는 작업이 있을 때 `Celery` 를 활용합니다. Celery 에 포함된 Task 중 에서 `multiprocessing` 을 포함하는 경우, 다음과 같은 오류를 출력하였습니다.

<br/>

## 오류내용

```bash
Exception	AssertionError('daemonic processes are not allowed to have children')
Timestamp	2024-01-01 12:00:00.019620 KST
  File "/usr/lib/python3.11/multiprocessing/pool.py", line 329, in _repopulate_pool_static
    w.start()
  File "/usr/lib/python3.11/multiprocessing/process.py", line 118, in start
    assert not _current_process._config.get('daemon'), \
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: daemonic processes are not allowed to have children
```

<br/>

## 원인분석

`AssertionError: daemonic processes are not allowed to have children` 오류는 `assert not _current_process._config.get(’daemon’)` 조건을 만족시키지 못해서 발생 하는 것입니다. 즉 Celery 의 Task 데몬 프로세스에서 자식 프로세스를 만들 수 없는데 현재 실행중인 Task 의 process 가 데몬 프로세스이므로 새로운 프로세스를 만드는 작업을 할 수 없어서 발생한 오류 입니다. [출처 - AssertionError: daemonic processes are not allowed to have children 의 해결](https://leo-bb.tistory.com/87)

<br/>

## 해결방법

[Celery Issue - daemonic processes are not allowed to have children #4525](https://github.com/celery/celery/issues/4525#issuecomment-566503932) 에 나온것 처럼 Celery Worker 실행할 때 옵션을 추가하면 해결 되었습니다.

```bash
$ celery -A mysite worker -P threads
....

worker: Warm shotdown (MainProcess)
```

<br/>

# 참고사이트
- [Git - daemonic processes are not allowed to have children](https://github.com/celery/celery/issues/4525#issuecomment-566503932)
- [Celery - Python Multiprocessing](https://yimingstar.medium.com/python-multiproccessing-celery-bc48bb355d1f)
- [Celery 에서 worker별로 task를 부여하는 방법](https://iam.namjun.kim/celery/2018/09/09/celery-routing/)
- [Celery 한 프로세스에서 여러 gpu 할당 및 사용하기](https://medium.com/@sujohn478/celery-%ED%95%9C-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%EC%97%90%EC%84%9C-gpu-%EC%97%AC%EB%9F%AC%EA%B0%9C-%ED%95%A0%EB%8B%B9-%EB%B0%8F-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-0eb6e1a0a1e8)
