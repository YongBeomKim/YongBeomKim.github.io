---
layout: blog
title: Django’s cache framework
tags:
- django
---

서버 내부의 특정공간을 활용하여 반복적인 작업에 필요한 내용을 저장 및 재활용이 가능합니다. 이러한 작업을 `Cache` 프레임워크의 활용 이라고 합니다.

```python
from django.http import HttpResponse
from django.views.decorators.cache import cache_page

@cache_page(60 * 60)  # Cache for 1 hour
def my_view(request):
    # Some expensive operation here
    result = "This view is cached for 1 hour." 
    return HttpResponse(result)
```

```python
from django.views.decorators.cache import cache_page
from ninja import NinjaAPI

api = NinjaAPI()

@api.get("/items")
@cache_page(60 * 15)  # Cache for 15 minutes
def list_items(request):
    # Your logic here
    return items
```

<br/>

# Settings
[Django’s cache framework - djangoproject](https://docs.djangoproject.com/en/5.1/topics/cache/) 공식문서를 확인하면 다음과 같은 형태로 Cache 프레임워크 저장공간을 설정할 수 있습니다.

1. 메모리 캐시
2. Unix socket 을 활용한 메모리 캐시
3. IP 주소와 포트를 활용한 메모리 캐시
4. [Redis](https://docs.djangoproject.com/en/5.1/topics/cache/#redis) 를 활용한 캐시
5. [DataBase](https://docs.djangoproject.com/en/5.1/topics/cache/#database-caching) 를 활용한 캐시
6. [File 시스템](https://docs.djangoproject.com/en/5.1/topics/cache/#filesystem-caching) 을 활용한 캐시

여기서는 `DataBase` 와 `File 시스템`을 활용한 Cache 프레임 워크에 대하여 확인해 보겠습니다.

## [File System Cache](https://docs.djangoproject.com/en/5.1/topics/cache/#filesystem-caching)
설정파일에 다음과 같이 정의를 합니다
```python
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.filebased.FileBasedCache",
        "LOCATION": "/var/lib/django_cache",
    }
}
```

캐시파일을 활용할 경로를 위와같이 정의를 한 경우에는 해당 경로와 함께, 해당 경로의 사용자 권한까지 설정이 완료 되어야 정상적인 동작이 가능합니다.
```bash
# 설정값에서 정의한 경로를 서버에 추가 합니다.
sudo mkdir -p /var/lib/django_cache

# 해당 경로에 서버운영자가 접근 가능하도록 권한을 추가합니다
sudo chown <your_user>:<your_group> /var/lib/django_cache/ 
sudo chmod 700 /var/lib/django_cache/
```

## [DataBase Cache](https://docs.djangoproject.com/en/5.1/topics/cache/#database-caching)
데이터베이스를 활용하면, 파일시스템을 활용하는 방법보다 더 효과적인 운영 및 관리가 가능합니다. 그리고 설정의 편의성 등으로 위의 파일시스템 보다는 데이테베이스를 활용한 캐시를 활용하는 것을 추천 합니다. 설정하는 방법은 다음과 같습니다.
```python
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.db.DatabaseCache",
        "LOCATION": "django_cache_table",
    }
}
```

데이터베이스에 `django_cache_table` 이름으로 캐시테이블을 추가로 설정한 다음에는, 해당 테이블을 Migration 작업을 추가로 진행 하여야 합니다.
```bash
# Creating the cache table
$ python manage.py createcachetable
```

이처럼 Django 내부 설정 및 DataBase Migration 작업이 완료된 뒤에 데이터베이스를 확인하면 `django_cache_table` 가 생성되어 있음을 확인할 수 있습니다.
```sql
SELECT * FROM django_cache_table;
+------------+---------------+---------------------+
| cache_key  | value         | expires             |
| :1:tickers |gAWVAAABAAAA...| 2025-01-13 21:09:43 |
+------------+---------------+---------------------+
```

<br/>

# Using in Django
## in Function
Django 함수 내부에서 Cache Framework 를 활용하는 방법은 다음과 같습니다. 저장된 객체는 Base64 형태로 DB에 저장되고 유효기간 내에 재활용이 가능합니다. 만약 저장되지 않은 `key` 이름으로 호출을 하면 `NoneType` 객체를 불러오게 되어 이를 근거로 유효값을 다시 수집하면 됩니다.

예시에서 캐시파일의 유효시간으로 `6000` 을 입력하였습니다. 이는 TIMEOUT 값으로 초단위로 입력하면 됩니다. 300을 입력하면 `60 X 5` 로 5분간 재활용이 가능하고, `3600 X 3 = 10800` 을 입력하면 3시간 동안 해당값을 재활용 가능합니다
```python
In [1]: from django.core.cache import cache
   ...: 
   ...: cache.set('tickers', ticker_dict, 6000)
   ...: ticker_dict = cache.get('tickers')
   ...: type(ticker_dict)
Out[1]: dict

In [2]: len(ticker_dict)
Out[2]: 2835

In [3]: ticker_dict = cache.get('python')
   ...: type(ticker_dict)
Out[3]: NoneType
```

## Django RAW ORM
DataBase Cache 테이블 이름을 `<django_cache_table>` 로 정의한 경우, DataBase 에 직접 접속을 해서 아래와 같이 테이블과 컬럼명, 그리고 해당 컬럼에 검색할 문자열을 활용하여 필요한 값을 확인 가능합니다.

검색을 진행할 때 `%er` 에서 `%` 의 의미는 Regex 에서 `*` 과 같은 의미를 갖습니다.
```python
In [1]: from django.db import connection
   ...: cursor = connection.cursor()
   ...: sql_query = """
   ...:     SELECT cache_key, expires 
   ...:     FROM   <django_cache_table> 
   ...:     WHERE  cache_key LIKE '%key_name%';"""

In [2]: queryset = cursor.execute(sql_query)
   ...: result   = cursor.fetchall()
   ...: result
Out[2]: (
          (
            ':1:key_name_KO', 
            datetime.datetime(2025, 1, 1, 1, 0, 0)
          ),
        )
```

기타 나머지 수단에서 에서 Cache FrameWork 재활용 방법은 추가로 정리해 보도록 하겠습니다.


<br/>

# 참고사이트
- [Django’s cache framework - django project](https://docs.djangoproject.com/en/5.1/topics/cache/#filesystem-caching)
- [How to Cache Website using Django — Python ?](https://medium.com/analytics-vidhya/how-to-cache-website-using-django-python-421d9b6c7c31)
- [Django에서 cache 사용하기 - 230313](https://velog.io/@kimphysicsman/230313-TIL-Django%EC%97%90%EC%84%9C-cache-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-feat.-ChatGPT-vs-Django-Document)
- [Efficient caching in python: Building @decorator to cache function call](https://minh-cao.medium.com/efficient-caching-in-python-building-a-decorator-to-cache-function-calls-c49f6793a230)
- [Django Caching 101: Understanding the Basics and Beyond](https://dev.to/pragativerma18/django-caching-101-understanding-the-basics-and-beyond-49p)
- [SQL Where Contains String](https://www.freecodecamp.org/news/sql-where-contains-string-substring-query-example/)
