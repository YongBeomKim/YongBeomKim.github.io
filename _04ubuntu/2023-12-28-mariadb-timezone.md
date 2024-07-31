---
layout: blog
title: (MySQL) MariaDB & Django TimeZone 
tags:
- sql
- django
---

일반적인 작업들은 앞의 과정을 모두 마치면 정상적으로 작동합니다. `datetime` 객체를 저장하고 호출하는 과정에서 다음과 같은 오류가 발생합니다. 아래와 같은 오류는 `SQLite` 를 사용할 때는 발생하지 않고, 다른 DataBase 를 사용할 때 발생합니다.

```python
ImproperlyConfigured: Connection 'default' cannot set TIME_ZONE because USE_TZ is False.
ValueError: MySQL backend does not support timezone-aware datetimes when USE_TZ is False.
```

이와 같은 오류가 발생하는 원인은 <span style="color:var(--strong);">`DataBase` 내부에 정의된 시간대<span>와 <span style="color:var(--strong);">Django 내부의 시간대가 어긋나서 발생하는 연산오류</span> 때문 입니다.

이러한 문제가 발생하지 않기 위해서는, 다음의 순서에 따라 설정값을 변경 및 확인하는 과정이 필요 합니다.
1. `DataBase` 시간대를 확인하고, 다를 경우 원하는 시간대로 변경 합니다.
2. `Django` 에서 `DataBase` 와 시간대를 일치시킨 뒤 `USE_TZ=False` 로 정의 합니다.


<br />

# 1 MariaDB

## Time Zone 내용 확인하기

MariaDB 내부에도 `Timezone` 설정값이 존재 합니다. 이를 확인하는 쿼리문은 아래와 같습니다. 출력된 내용들을 정리하면 `SYSTEM` 으로 정의된 다른 값이 없음을 알 수 있고, 두번째 쿼리를 통해 `Asia/Seoul` 값으로 변경을 하려고 해도 해당 값을 찾을 수 없음을 알 수 있습니다.

```sql
mysql> select @@global.time_zone, @@session.time_zone;
+--------------------+---------------------+
| @@global.time_zone | @@session.time_zone |
+--------------------+---------------------+
| SYSTEM             | SYSTEM              |
+--------------------+---------------------+
1 row in set (0.000 sec)

mysql> SELECT b.name, a.time_zone_id 
    -> FROM mysql.time_zone a, mysql.time_zone_name b 
    -> WHERE a.time_zone_id = b.time_zone_id AND b.name LIKE '%Seoul';
Empty set (0.015 sec)
```

## Asia / Seoul 시간대 추가하기

`mysql_tzinfo_to_sql /usr/share/zoneinfo` 내용은 `/usr/share/zoneinfo` 의 우분투 시스템에 등록된 시간대 값을 `mariaDB` 에서 활용할 수 있도록 자동으로 스크립트를 생성 및 입력하는 내용 입니다. 정상적으로 입력을 완료한 후 `Maria DB` 에서 아래의 내용들을 차례로 입력하여 위의 시간대 값이 변경됨과 함께, 현재 시간값을 제대로 출력하는지를 함께 확인하면 작업이 완료 됩니다.

```sql
$ mysql_tzinfo_to_sql /usr/share/zoneinfo | sudo mysql -u root -p mysql
$ sudo mycli -u root -h localhost mysql
MariaDB 10.6.11

mysql> SET GLOBAL time_zone='Asia/Seoul';
Query OK, 0 rows affected; Time: 0.000s

mysql> SET time_zone='Asia/Seoul';
Query OK, 0 rows affected; Time: 0.000s

mysql> SELECT @@system_time_zone, @@global.time_zone, @@session.time_zone;
+------------------+------------------+-------------------+
|@@system_time_zone|@@global.time_zone|@@session.time_zone|
+------------------+------------------+-------------------+
| KST              | Asia/Seoul       |Asia/Seoul         |
+------------------+------------------+-------------------+

mysql> SELECT NOW();
+---------------------+
| NOW()               |
+---------------------+
| 2023-01-01 15:00:00 |
+---------------------+
```

<br/>

# 2 Django

## [datetime in Python (`naive` vs `aware`)](https://ctsictai.medium.com/django-time-zone-issue-6046d24a51e7)

Python 의 `datetime` 객체는 다음과 같이 [2가지 종류](https://ctsictai.medium.com/django-time-zone-issue-6046d24a51e7) 가 있습니다.
- `naive 객체` : `tzinfo` 속성이 설정되지 **<span style="color:var(--accent);">않는</span>** datetime 객체
- `aware 객체` : `tzinfo` 속성이 **<span style="color:var(--strong);">설정된</span>** datetime 객체

아래의 코드는 2가지 객체를 각각 출력한 것으로 `Out[1]` 이 시간대 정의가 없는 `naive`, `Out[2]` 가 `aware` 객체 입니다.

```python
In [1]: from app.models import TimeTable
   ...: item = TimeTable.objects.first()
   ...: item.datetime
Out[1]: datetime.datetime(2023, 1, 11, 15, 30)

In [2]: from django.utils import timezone
   ...: timezone.make_aware(item.datetime)
Out[2]: datetime.datetime(2023, 1, 11, 15, 30, tzinfo=zoneinfo.ZoneInfo(key='Asia/Seoul'))
```

## Django `settings.py`

```python
TIME_ZONE = "Asia/Seoul"
USE_TZ = False
```

설정에서 `USE_TZ` [용도는](https://docs.djangoproject.com/en/4.1/topics/i18n/timezones/) 서비스를 실행하는 서버의 시간대와, `DataBase` 가 있는 서버의 시간대가 다를 때, 이를 보정하는 함수 기능을 활성화 할 것인가 입니다. 

여러 국가의 서비스를 1개의 `DataBase` 에서 담당하는 경우, 각 서비스에서 `UTC` 시간대로 데이터를 변경하여 저장을 하고, 호출한 데이터를 다시 재해석하는 함수를 활성화 하는 옵션 입니다.

`True` 값을 정의하면, admin 또는 API 의 EndPoint 에서 서버의 시간대를 그대로 출력하는 문제가 발생할 수 있어서 이를 각각 보정하는 과정이 필요로 합니다.

`False` 값을 정의하는 경우는, 1개 국가에서 서비스 와 데이터베이스를 모두 운영하는 경우로, 시간보정이 필요없고 `naive` 객체를 저장하고 호출을 하면, Django 와 DataBase 에서 동일한 `TimeZone` 을 활성화 해 주기 때문에 앞의 경우와 달리 시간대에 따른 문제가 발생할 여지가 훨씬 적습니다. 

## DataBase

서버의 시간대가 `UTC` 가 아닌 다른 값을 갖는 경우에는, 아래처럼 시간대를 설정값에 추가 할 수 있습니다.
```python
USE_TZ = True
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.oracle',
        ...
        'TIME_ZONE': 'Asia/Seoul'
    }
}
```

`naive` 객체를 `aware` 객체로 변환할 필요가 있을 때에는, [앞의 예시](https://workingninja.com/getting-time-right-django) 처럼 `django` 의 함수를 사용할 수도 있고, 다음의 예제처럼 `Pandas.DataFrame` 의 메서드를 활용하여 변환할 수 있습니다.

```python
USE_TZ = False
df['datetime'] = df['datetime'].dt.tz_localize(TIME_ZONE)
```

<br/>

# 추가정보

## (2023-01-09) DataError : Out of range value for column `컬럼명`
[MySQL](https://install-django.tistory.com/21) 에서 발생하는 오류 메세지로, 데이터 타입이 Django 모델 설정과 다를 때 발생하는 오류 입니다. 이번에는 `IntegerField()` 에서 발생 하는데, 자체적인 해결 방법은 `integer` 로 입력할 데이터 타입이 `int64` 로 설정된 내용을, `int32` 로 변환 후 `Migration` 작업을 진행 하는 방법으로 해결 했습니다..

```python
import numpy
df['column'] = df['column'].astype(numpy.int32)
```


# 참고 사이트
- [Django MySQL](https://django-mysql.readthedocs.io/en/latest/cache.html)
- [Django에 MySQL 연동하기](https://daphne-dev.github.io/2020/10/01/django-mysql/)
- [MariaDB 초기 접속암호 분실시](https://funfunit.tistory.com/104)
- [리눅스 mysql,mariadb 한글 깨짐 현상 해결 방법](https://heum-story.tistory.com/34)
