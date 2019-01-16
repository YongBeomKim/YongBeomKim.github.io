---
title : Django Project 02 Model
last_modified_at: 2019-01-13T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django_pro.png
categories:
  - django
tags: 
    - js
    - django
toc: true 
---

앞에서 Django 와 JavaScript 개발을 위한 환경설정을 정리하였다면, 이번에는 간단한 예제를 활용하는 Table 결과물 예시를 구현해 보겠습니다. 

<br/>
# models
Django 에서 관리하는 데이터 **Table** 을 정의하는 부분으로 
1. `slug, create_date` 객체는 **Table Field** 를 의미합니다.
2. `class Meta` 에서는 **Table**의 속성 내용을 추가합니다
3. 기본 테이블이 `App이름_클래스명`, 이를 **my_post_diary** 로 지정합니다 
```python
from django.db import models

class Post(models.Model):
    slug  = models.SlugField(unique=True)
    create_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'post'              # App 단수이름
        verbose_name_plural = 'post_story' # App 복수이름
        db_table = 'my_post_diary'         # App DB 저장이름
        ordering = ('-create_date',)    # create_date 최신순
```

<br/>
# Django 내장 Filter
Django 내부에 제공하는 filter 내용들이 존재합니다. [My Blog](https://yongbeomkim.github.io/django/django-filter-orm-basic/)






# 참고자료 
[models Meta 설정내용](https://wikidocs.net/6667#verbose_name)<br/>
