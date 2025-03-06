---
layout: blog
title: (django) - ORM 문법정리
tags:
- django
---

Django 에서 ORM 문법을 활용하여 데이터를 호출하는 때에 초보자가 혼동하는 부분이 `.first()` 와 `.last()` 입니다. 데이터 베이스에 가장 최근에 저장된 내용이 `.first()` 이고, 저장한지 오래된 자료가 `.last()` 메서드를 활용하여 호출 하면 됩니다.
```python
In [1]: from app_news.models import NewsList
      : NewsList.objects.first()
      : NewsList.objects.order_by('-pk')[0]
Out[1]: (id:20) <NewsList: [경제] 해수부, 항만건설사업 BIM 적용지침 마련…"기술도입 활성화 기대">

In [2]: NewsList.objects.last()
      : NewsList.objects.order_by('pk')[0]
Out[2]: (id:1) <NewsList: '매각 중단' 홈플러스익스프레스, 유동성 확보에 힘 보탤까>
```

`Datetime
```python
# models.py
from django.db import models

class Post(models.Model):
    datetime = models.DateTimeField()


# `Datetime` 필드를 특정 날짜로 필터링
from myapp.models import Post
filtered_data = Post.objects.filter(datetime__date=target_date)
```

<br/>

# 참고사이트
- [Django Model - Field API 한글해설](https://brunch.co.kr/@ddangdol/11)