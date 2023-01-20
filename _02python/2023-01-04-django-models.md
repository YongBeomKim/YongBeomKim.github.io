---
layout: blog
title: Django Models & Migrations
tags:
- django
- model
---

[Django Model Fiels Reference](https://docs.djangoproject.com/ko/4.1/ref/models/fields/) 공식문서의 내용을 정리한 [블로그](https://velog.io/@qlgks1/Django-Model-%ED%95%84%EB%93%9Cfiled-%EB%AA%A8%EC%9D%8C%EC%A7%91) 입니다.

# Integer Field
## Small Integer, Integer, Big Integer

숫자 데이터는 유효범위와 사용 메모리 크기가 함수별로 다르게 활용 합니다.
- `small interger` 유효값은 `-32,768 ~ 32,767` `(2 Bytes)` 입니다.
- `integer` 유효값은 `-2,147,483,648 ~ 2,147,483,647` `(4 Bytes)` 입니다.
- `big integer` 유효값은 `9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,807` `(8 Byte)` 입니다.

<br/>

# Errors

## OperationalError: (1054, "Unknown column 'code_id' in 'where clause'")

`name` 필드값을 `ForeignKey` 로 연결하면, Django 에서 `_id` 를 자동으로 붙여서 `column name` 을 생성하는데, 이름 자체에도 `_id` 를 붙여서 migrate 하는 바람에 `column name` 이 `market_krxinvestor.code_id` 이렇게 만들어 졌습니다. 

```python
File ~/venv/lib/python3.10/site-packages/MySQLdb/connections.py:254, in Connection.query(self, query)
    252 if isinstance(query, bytearray):
    253     query = bytes(query)
--> 254 _mysql.connection.query(self, query)

OperationalError: (1054, "Unknown column 'market_krxinvestor.code_id' in 'where clause'")
```

[OperationalError](https://phin09.tistory.com/59) 관련 설명은 여기를 참고하였습니다. 참고 사이트에서 원인은 `Migration` 의 불완전 이었는데, 이번 작업에서는 다른 원인이 있었습니다.

```python
class KrxInvestor(models.Model):
    pass
```

이름만 특정한 뒤, 컬럼등을 지정하지 않은 상테에서 테이블을 만들면 결과는 다음과 같습니다.

```sql
db> DESCRIBE market_krxinvestor;
+-------+------------+------+-----+---------+----------------+
| Field | Type       | Null | Key | Default | Extra          |
+-------+------------+------+-----+---------+----------------+
| id    | bigint(20) | NO   | PRI | <null>  | auto_increment |
+-------+------------+------+-----+---------+----------------+
```

문제는 이후에 `ForeignKey` 등의 다양한 필드와 속성을 추가한 뒤 Migration 을 했는데도, 위 처럼 `id` 필드만 있는 테이블은 업데이트가 잘 되지 않았습니다. 이번 작업에서는 데이터베이스를 새로 만들고 Migration 작업을 진행하는 방법으로 진행을 했습니다. 추후에 이번처럼 특정 테이블만 문제가 있을 때 새롭게 갱신하는 방법을 찾아보겠습니다.

## DataBase Migration 새롭게 하기

Migration 파일을 찾아서 삭제하는 과정은 다음과 같습니다. [Django 자습서 참고](https://wikidocs.net/9926) 

```python
$ find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
$ find . -path "*/migrations/*.pyc"  -delete
```