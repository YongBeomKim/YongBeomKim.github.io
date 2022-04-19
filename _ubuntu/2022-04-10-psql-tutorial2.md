---
layout: blog
title: PostgreSQL 기초 명령어2
tags:
- psql
---

PostgreSQL 에서 추가적인 명령어들을 정리해 보겠습니다. 보다 자세한 내용은 [PostgreSQL Tutorial](https://www.tutorialspoint.com/postgresql/index.html) 사이트에서 확인 가능합니다.

![book cover]({{ site.url }}{{ site.baseurl }}/assets/post/postgresqlT.jpg)

# PSQL Tutorials

## `"` : 예약어를 필드명으로 지정한 경우

**<span style="color:var(--strong);">`"` 쌍 따옴표</span>** 로 감싸는 경우는, 별도의 객체로 선언을 하게 됩니다.

```sql
> SELECT code_id, "foreign"  FROM krx_pricekrxdaum limit 3;
   SELECT 3
   Time: 0.017s
```

## `'` : 검색등 조건문에 포함되는 경우

Python 에서의 F-String 과 같이 조건의 값으로써 정의를 하는 경우에는 **<span style="color:var(--strong);">`'` 단 따옴표</span>** 로 감싸야 합니다.

```sql
> SELECT * FROM krx_code WHERE code LIKE '00593%';
+------+--------+------------+----------+
| id   | code   | name       | market   |
|------+--------+------------+----------|
| 1    | 005930 | 삼성전자     | Y        |
| 38   | 005935 | 삼성전자우    | Y        |
+------+--------+------------+----------+

> SELECT * FROM krx_code WHERE code NOT LIKE '0000%%';
```

## 검색 패턴에 사용하는 **<span style="color:var(--accent);">[WildCard](https://www.tutorialspoint.com/postgresql/postgresql_like_clause.htm)</span>** 옵션

- The percent sign `%` : 정규식에서 `*` 개념
- The underscore `_` : 정규식에서 `?` 개념

```sql
SELECT
   'foo' LIKE 'foo',
   'foo' LIKE 'f%',
   'foo' LIKE '_o_',
   'bar' LIKE 'b_'
```
- `foo = foo` 는 같으므로 true
- `foo = f%` 는 f로 시작하기 때문에 true
- `foo = _o_` 는 3자리이며 2번째 자리가 "o" 일때 true
- `bar = b_` 에서 bar는 3자리 이지만 b_ 는 2자리 여서 false