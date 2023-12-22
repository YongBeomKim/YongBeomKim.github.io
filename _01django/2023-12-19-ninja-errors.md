---
layout: blog
title: Ninja Errors
tags:
- pydantic
---

`django-ninja` 를 작업하면서 발생한 문제점 및 해결방법들을 정리해 보겠습니다.

<br/>

# 405 POST method not allowed

> Problem solved, I miss one slash on the url.

문제가 발생한 원인은 `Route` 함수 내부에서 대체된 테이블을 작업해 주지 않아서 발생하였습니다. 부분을 수정했을 때 전체적으로 연관있는 부분을 발견하지 못해서 발생한 문제로 향후에는 `django API Test` 함수들을 작성하도록 합니다. 일반적인 `Django Model` 직렬화 API는 수정할 부분이 적지만, 이번에 문제가 발생한 API는 대략 4개의 테이블을 유기적으로 연산을 하며 필요한 값들을 수정하는 API로 복잡성이 높은 경우에 한정하여 `django unittest` 를 작성하도록 합니다.

[405 POST method not allowed](https://stackoverflow.com/questions/22983222/405-post-method-not-allowed) 를 참고하여 api url 맨 뒤에 `/` 를 덧붙여 줌으로써 해결하였습니다.  
```bash
`/api/server/id`  => `/api/server/id/`
```
