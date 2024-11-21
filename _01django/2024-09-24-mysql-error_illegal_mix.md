---
layout: blog
title: OperationalError (1271, Illegal mix of collations for operation 'in')
tags:
- mysql
---

함수 내부에서 발생한 오류가 아닌, 특정조건에서 실행시 다음과 같은 오류를 출력 하였습니다. 아랫 내용을 살펴보면 

```bash
The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "/django/app_name/tasks/news.py", line 42, in run_news_section
    df = filter_title(df, engine) # DB 와 필터링
         ^^^^^^^^^^^^^^^^^^^^^^^^
  File "/.venv/lib/python3.11/site-packages/MySQLdb/cursors.py", 
    line 179, in execute
    res = self._query(mogrified_query)
          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
django.db.utils.OperationalError: (
  1271, "Illegal mix of collations for operation 'in'"
)
```

오류 내용은, 특정 칼럼에 `IN` 검색을 실행하면 오류가 발생했다는 내용 입니다.



chatGPT 검색결과 서버응답 대기시간이 너무 길어져서 해당 접속을 유지하기 어려워서 발생한 오류 였습니다.
```sql
The error message django.db.utils.OperationalError: (2013, 'Lost connection to MySQL') indicates that Django, while trying to interact with a MySQL database, lost its connection to the database server. This could happen for various reasons, such as:
```

서버에서 오류가 발생한 함수를 실행해본 결과, 해당 함수에서는 오류가 발견되지 않았습니다. 해당 함수가 DB와 직접적인 내용도 아니였고, 해당 시간에 다른 작업 스케줄이 겹쳐서 실행되는 것으로 추측하고 있습니다. 이를 근거로 스케쥴링을 재 조정한 뒤 오류발생여부를 확인해 보겠습니다.

<br/>

# 참고사이트
- [Lost connection to Mysql during query - forum.djangoproject.com](https://forum.djangoproject.com/t/lost-connection-to-mysql-during-query/26445)