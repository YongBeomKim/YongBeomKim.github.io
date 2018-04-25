---
title : Django Shell in Jupyter
last_modified_at: 2018-04-24T10:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
  caption: "Django Shell"
tags: 
    - django
    - pyton
    - jupyter
toc: true    
---


## 2장 Urls 와 Views

###  WildCard

Wild card 는 **정식 선발은 아니지만 경기에 출전하는 선수** 를 의미하는 용어로써, **d{1,2}** 인수값이 hours_ahead(request, **hour**) 에 자동으로 연결된다

```python
urlpatterns = [
    re_path(r'^$', hello),
    re_path(r'^time/(\d{1,2})/$', hours_ahead),
]
```

**Notice:** urls.py의 **약결합** 특성으로 **d{1,2}**를 와일드카드로써 작동한다
{: .notice--info}
