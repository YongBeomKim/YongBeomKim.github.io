---
title : Django 마스터 01 
last_modified_at: 2018-04-24T20:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
  caption: "Django Tutorial"
tags: 
    - mariadb
    - mysql
toc: true    
---


##  WildCard

Wild card 는 **정식 선발은 아니지만 경기에 출전하는 선수** 를 의미하는 용어로써, **\d{1,2}** 인수값이 hours_ahead(request, **hour**) 에 자동으로 연결된다

**Notice:** urls.py의 **약결합** 특성으로 d{1,2}가 와일드카드로써 작용한다
{: .notice--info}

```python
urlpatterns = [
    re_path(r'^$', hello),
    re_path(r'^time/(\d{1,2})/$', hours_ahead),
]
```


## request 넌 누구냐?

`from django.http import HttpResponse` 의 객체로, 모든 View 함수들은 이를 상속받기 때문에, request 파라미터를 빠짐없이 연결한다

**Note:**
{: .notice--info}

**Please Note:**
{: .notice--danger}