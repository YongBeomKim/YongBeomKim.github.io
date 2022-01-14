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
[redis CRUD](http://bong8nim.com/post/programming/redis/ubuntu-16-04-install-redis/)<br>
[radis django](https://realpython.com/caching-in-django-with-redis/)


RabbitMQ 는 Ubuntu 17.04 와 호환성이 좋지 않으므로, **redis** 설치를 추천한다. 인메모리 성능을 요하므로 sudo 권한으로 설치한다

**Redis**는 **REmote DIctionary Server**의 약자로, Salvatore Sanfilippo라는 이탈리아 해커가 MySQL로 어떤 어플을 개발하다가 느려터졌다고 생각했고, 직접 메모리 기반의 빠른 Redis를 개발하게 되었다는 비하인드 스토리가 있다


<br>
## redis-server Installation 

```sql
$ sudo apt-get install redis-server
$ redis-cli
127.0.0.1:6379> 
```

초간단 메모리 server로 접속하면 **6379번 port** 로 바로 접속된다.
{: .notice--info}


<br>
## CRUD 기본 명령어

### Create 데이터 저장하기 

**set** key value

```sql
127.0.0.1:6379> set django server
OK
```


### Read 데이터 읽기

**get** key

```sql
127.0.0.1:6379> get django
"server"
```


### Update 데이터 수정

```sql
127.0.0.1:6379> set django python
OK
127.0.0.1:6379> get django
"python"
```



### Delete 데이터 삭제

**del** key 

```sql
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


## 리스트 형태로 데이터 저장


### 리스트 데이터 Create

**lpush** key value

```sql
127.0.0.1:6379> lpush dog mung
(integer) 1
```


### 리스트 데이터 Update

**lpush** key value

```sql
127.0.0.1:6379> lpush dog mung
(integer) 2
```


### 리스트 데이터 Read (리스트 데이터의 인덱스를 지정)

**lrange** key startindex endindex

```sql
127.0.0.1:6379> lrange dog 0 -1
1) "mung"
2) "mung"
```


### 데이터 삭제 Delete (저장된 전체 데이터를 삭제한다)

**flushdb**

```sql
127.0.0.1:6379> flushdb
OK
127.0.0.1:6379> keys *
(empty list or set)
```


<br>

## 데이터 유효기간 설정 (유효 시간(초)를 설정)

**set** key time(sec)

```sql
127.0.0.1:6379> set testvalue 100
OK
127.0.0.1:6379> KEYS *
1) "testvalue"
127.0.0.1:6379> setex testvalue 10 testvalue
OK
127.0.0.1:6379> get testvalue
"testvalue"
127.0.0.1:6379> get testvalue   # 10초 뒤 삭제를 확인
(nil)
127.0.0.1:6379> exit
@ubuntu$
```
