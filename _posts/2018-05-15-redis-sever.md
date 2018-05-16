---
title : Redis 비동기 처리
last_modified_at: 2018-05-15T20:45:06-05:00
header:
  overlay_image: /assets/images/book/redis.png
categories:
  - django
tags: 
    - redis
    - django
toc: true    
---


# Redis Server 


<figure class="align-center">
  <img src="https://buildwithdjango.com/static/blog/progress-bars/async-task-architecture.png" alt="">
  <figcaption> 비동기 처리를 위한 message Q 구조</figcaption>
</figure>

[관련 Blog](http://whatisthenext.tistory.com/127)<br>
[radis django](https://realpython.com/caching-in-django-with-redis/)


파이썬에서 비동기 처리를 규격화 하기 위해서 redis, celery 모듈을 Python , Django 와 연결하여 정기적 작업의 모듈화를 작업 용이하도록 한다. RabbitMQ 는 예전에 설치했지만 Ubuntu 17.04 와 호환성이 좋지 않고, Shutdown 할 때마다 성능저하에 원인이 되어서 redis 를 설치할 예정이다


<br>
## redis-server Installation 

```
$ sudo apt-get install redis-server$
$ redis-cli
127.0.0.1:6379> 
```

초간단 메모리 server로 접속하면 **6379번 port** 로 바로 접속된다.
{: .notice--info}


<br>
## CRUD 기본 명령어

### Create 데이터 저장하기 

**set** key value

```
127.0.0.1:6379> set django server
OK
```


### Read 데이터 읽기

**get** key

```
127.0.0.1:6379> get django
"server"
```


### Update 데이터 수정

```

127.0.0.1:6379> set django python
OK
127.0.0.1:6379> get django
"python"
```



### Delete 데이터 삭제

**del** key 

```
127.0.0.1:6379> set redis memserver
OK
127.0.0.1:6379> KEYS *
1) "django"
2) "redis"

127.0.0.1:6379> del redis
(integer) 1
127.0.0.1:6379> KEYS *
1) "django"
```


### 리스트 형태로 데이터 저장하기


**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}   