---
title : Example / django ORM
last_modified_at: 2018-12-05T10:45:06-05:00
header:
  overlay_image: /assets/images/book/django-girls.jpg
categories:
  - django
tags: 
    - django
    - python
toc: true 
---


# **Introduction**

django-filter 모듈의 내용을 정리하면서 **filed lookup** 파라미터들이 잔뜩 등장하였다. 기본으로 보자면 **SQL Basic** -> **Django Object Relate** -> **django-filter** 순서로 정리를 한다면 저위망 포위식의 내용정리가 가능할 것으로 보입니다. <small><strike>조금씩 시작해보자 django 부터 ㅜㅜ</strike></small>

이번 페이지 에서는 **Django ORM 기초**를 최대한 압축적으로 정리해 보려고 합니다.


# **Create / Delete**

**Django 모델**을 호출하고, 필드별 내용을 입력하여 **저장용 인스턴스를** 생성한 뒤, **.save() 메소드를** 실행하면 해당 내용이 DataBase 에 저장됩니다 

```python
from .models import Author
from django.utils import timezone

a = Author(name = 'tom', email = 'example@email.com', 
           last_logged_in = timezone.now, active = True)
a.save()
a.delete()
print(a.id, a.pk)

[Out] 2, 2
```

`settings.py` 에서 `USE_TZ = True` 를 해야만 System 시간값이 아닌 **Django에서 측정된 시간값을** 호출합니다.
{: .notice--info}

