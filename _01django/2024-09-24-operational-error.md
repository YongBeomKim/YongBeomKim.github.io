---
layout: blog
title: OperationalError (2006, MySQL server has gone away)
tags:
- mysql
---

`for-loop` 명령으로 반복작업이 많은 Celery 작동 내용에서 다음과 같은 오류가 발생하였습니다.
```bash
2024/09/26 15:39:18 [celery.app.trace] Task app.ohlcv
[asdfq234-150q3qga0-23fsdzfgsdf] raised unexpected:

The above exception was the direct cause of the following exception:
Traceback (most recent call last):
  File "../data/instance.py", line 33, in <lambda>
    filter(lambda x : model.objects.filter(code=x).count() == 0,
                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "../python/site-packages/MySQLdb/cursors.py", line 179, in execute
    res = self._query(mogrified_query)
          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
django.db.utils.OperationalError: (2013, 'Lost connection to MySQL server during query')
```

chatGPT 검색결과 서버응답 대기시간이 너무 길어져서 해당 접속을 유지하기 어려워서 발생한 오류 였습니다.
```sql
The error message django.db.utils.OperationalError: (2013, 'Lost connection to MySQL') indicates that Django, while trying to interact with a MySQL database, lost its connection to the database server. This could happen for various reasons, such as:
```

서버에서 오류가 발생한 함수를 실행해본 결과, 해당 함수에서는 오류가 발견되지 않았습니다. 해당 함수가 DB와 직접적인 내용도 아니였고, 해당 시간에 다른 작업 스케줄이 겹쳐서 실행되는 것으로 추측하고 있습니다. 이를 근거로 스케쥴링을 재 조정한 뒤 오류발생여부를 확인해 보겠습니다.

<br/>

# 참고사이트
- [Lost connection to Mysql during query - forum.djangoproject.com](https://forum.djangoproject.com/t/lost-connection-to-mysql-during-query/26445)