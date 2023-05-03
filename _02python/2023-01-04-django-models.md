---
layout: blog
title: Django Models & Migrations
tags:
- django
---

Django 의 Model 을 생성하고 관리하는데 필요한 기본 개념인 [Model ORM](https://velog.io/@may_soouu/Django-%EB%A9%94%EC%86%8C%EB%93%9C-%EC%A0%95%EB%A6%AC) 과
[Model Field](https://velog.io/@qlgks1/Django-Model-%ED%95%84%EB%93%9Cfiled-%EB%AA%A8%EC%9D%8C%EC%A7%91) 내용을 정리해 보겠습니다. 각각의 내용은 요약된 블로그를 참고 하였습니다. 

<br/>

# Django Model ORM
언더바 두개 `__` 를 사용하는 경우는 다음과 같습니다
- **<span style="color:var(--strong);">조건을 추가</span>** 하는 경우
- **<span style="color:var(--strong);">외부참조 모델</span>** 이 있는경우

## Methods
| **메서드**| **내용**                   |
|:--------:|:-------------------------:|
|all()     |테이블 모든 데이터셋           |
|filter()  |특정 조건에 부합하는 데이터셋    |
|exclude() |특정 조건을 제외한 데이터셋     |
|get()     |특정 조건에 부합하는 1개 데이터셋|
|count()   |데이터 갯수 확인              |
|first()   |테이블 첫번째 데이터           |
|last()    |테이블 마지막 데이터           |
|exists()  |특정조건 데이터 존재여부 확인    |
|order_by()|특정필드를 기준으로 정렬        |

## `.filter()`
```python
# iexact : 대소문자를 구분하지 않음
Boards.objects.filter(title__excact='python')
Boards.objects.filter(title__iexcact='python')
```

## `__contains`
부분 일치 조건 입력할 때 사용합니다
```python
# icontains : 대소문자를 구분하지 않음
Boards.objects.filter(title__contains='python')
Boards.objects.filter(title__icontains='python')
```

## `__in`
list() 객체로 조건값을 확인 할 때 사용합니다.
```python
Boards.objects.filter(title__in=['python','developer'])
```

## `__gt`, `__lt`, `__gte`, `__lte`
- gt **(greater than)** : >
- lt **(less than)** : <
- gte **(greater than or equal)** : >=
- lte **(less than or equal)** : <=
```python
Boards.objects.filter(
  date__gt = datetime.date(2020,10,4))
Boards.objects.filter(
  date__lt = datetime.date(2020,10,4))
```

## `__startswith`, `__endswith`
- startswith : 조건으로 **<span style="color:var(--accent);">시작</span>** 하는 문자열 검색
- endswith : 조건으로 **<span style="color:var(--accent);">끝나는</span>** 문자열 검색
```python
Books.objects.filter(title__startswith="book")
```

## `.union()`
데이터베이스에서 추출한 QuerySet 을 합치는 메서드 입니다. 유사한 기능을 하는 `|` or 연산자가 있는데, `| (or)` 연산자는 SQL Query 문에서도 `| (or)` 를 그대로 적용하기 때문에, `boolean` 필드 에서는 해당 필드값의 `or` 조건을 적용해서 모든 값이 `True\False` 값으로 통일 되어 버립니다.
- `qs1 | qs2` : `OR 조건` 을 통해 가져오는 SQL문을 작성 합니다.
- `qs1.union(qs2)` : 각각의 결과값을 `union` 연산으로 합치는 SQL문을 작성 합니다.
```python
data1 = Boards.objects.filter(title__exact="python")
data2 = Boards.objects.filter(title__exact="developer")
data3 = data1.union(data2)
data3 = data1 | data2  
```

## `.intersection()`
교집합으로 두 개 이상의 쿼리셋 변수 중 중복된 값을 호출 합니다
```python
data1 = Boards.objects.filter(title__in=["python", "developer"])
data2 = Boards.objects.filter(title__in=["python", "vscode"])
data3 = data1.intersection(data2)
```

<br/>

# Django Model Fields
이번에는 Django 모델들의 속성에 대해 정리해 보겠습니다.

## Integer Field
### Small Integer, Integer, Big Integer
숫자 데이터는 유효범위와 사용 메모리 크기가 함수별로 다르게 활용 합니다.
- `small interger` 유효값은 `-32,768 ~ 32,767` `(2 Bytes)` 입니다.
- `integer` 유효값은 `-2,147,483,648 ~ 2,147,483,647` `(4 Bytes)` 입니다.
- `big integer` 유효값은 `9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,807` `(8 Byte)` 입니다.

## Errors
### OperationalError: (1054, "Unknown column 'code_id' in 'where clause'")
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