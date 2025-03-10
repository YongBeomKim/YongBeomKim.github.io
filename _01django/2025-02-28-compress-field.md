---
layout: blog
title: (MySQL) django-mysql-compressed-fields
tags:
- mysql
---

앞에서는 사용자 `Django Model Class` 를 만들어서 압축기능을 활용하는 내용에 대하여 정리해 보았습니다. 이러한 경우에는 DB 에 압축이 된 상태로 저장되어 있어서 `Django ORM` 기능을 일정부분 포기하게 됩니다. 이번에 발견한 [django-mysql-compressed-fields](https://pypi.org/project/django-mysql-compressed-fields/) 를 활용한 결과 압축성능도 좋고, 검색기능도 활용 가능하다는 것을 확인할 수 있었습니다.

```sql
-- 압축성능의 비교
-- 앞의 `zlib Binary` 와 비슷한 압축률
 SELECT 
     table_schema AS `Database`, 
     table_name AS `Table`, 
     ROUND(data_length/(1024*1024),2) AS `Size(MB)`
 FROM     information_schema.TABLES
 WHERE    table_schema = 'compress' -- 데이터베이스 이름
 ORDER BY data_length + index_length DESC;
+------------------------------+----------+
| Table                        | Size(MB) |
+------------------------------+----------+
| app_newslist                 | 574.00   |
| app_newslisttextcompressed   | 287.80   |
| app_newslistbinarycompressed | 286.80   |
| django_admin_log             | 0.02     |
| django_migrations            | 0.02     |
+------------------------------+----------+
```

```python
# 검색 Query 활성화 비교
In [9]: NewsListBinaryCompressed.objects.filter(summary__contains='한동훈')
Out[9]: <QuerySet []>

In [10]: NewsListTextCompressed.objects.filter(summary__contains='한동훈')[:2]
Out[10]: <QuerySet [<NewsListTextCompressed: 한동훈 "'김 여사 라인' 없으면 없다고, 아니면 없애겠다고 해야" ...>, <NewsListTextCompressed: 재보궐 D-3, 한동훈·이재명 부산 금정 ...>]>
```

`Django 5.1.6` 과 `MariaDB 10.6.12` 환경에서도 위와 같이 정상적으로 동작하는 것을 확인 하였습니다. 설치 및 프로젝트에 적용 등 관련된 세부 내용은 [PyPi - django-mysql-compressed-fields](https://pypi.org/project/django-mysql-compressed-fields/) 를 참고하시면 됩니다.


참고로 이와같은 `zlib` 알고리즘을 활용한 압축은 `MySQL, MariaDB` 를 활용할 때에 더 효과적이고, `PostgreSQL` 에서는 상대적으로 용량을 더 많이 필요로 하는 것으로 알려지고 있습니다. [Compressed model field for Django - mjnaderi](https://gist.github.com/mjnaderi/7b86a2863eb15f9266729d9ffa68006a)

<br/>

# 주의할 점
압축을 적용한 필드에 검색 기능은 제공하지만, MariaDB 의 **Indexing** 을 생성하는 필드에 포함이 되는 경우에는 다음과 같은 오류가 발생 합니다. 따라서 MySQL 의 색인에는 해당 필드를 제외 하여야 합니다. <strike>압축된 형태의 원본을 저장하기 때문에 Index 에는 제외를 해야 되는게 당연하긴 하다.</strike>
```python
# 뉴스목록
class NewsList(models.Model):
    datetime = models.DateTimeField()
    title    = CompressedTextField()
    summary  = CompressedTextField()

    class Meta:
        ordering = ('-pk',)
        indexes  = [
            models.Index(
                fields=['-datetime','title']
            ),
        ]
```
```bash
  File "/home/venv/lib/python3.12/site-packages/MySQLdb/cursors.py", line 330, in _query
    db.query(q)
  File "/home/venv/lib/python3.12/site-packages/MySQLdb/connections.py", line 261, in query
    _mysql.connection.query(self, query)
django.db.utils.OperationalError: (1071, 'Specified key was too long; max key length is 3072 bytes')
```

<br/>

# 참고사이트
- [django-mysql-compressed-fields 1.2.0 - PYPI](https://pypi.org/project/django-mysql-compressed-fields/)