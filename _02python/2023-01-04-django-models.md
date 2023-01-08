---
layout: blog
title: Django Model Fields
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
