---
title : Django Project - Model
last_modified_at: 2019-01-14T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django_pro.png
categories:
  - django
tags: 
    - model
    - django
toc: true 
---

# Modeling

프로젝트 모델을 작업하면서 부족했던 부분들을 정리하는 시간으로 삼겠습니다.


## SQLITE3 [(WEB)](https://stackoverflow.com/questions/48549068/django-db-utils-notsupportederror-in-sqlite-why-not-supported-in-sqlite)
Django 2.1 에서 Migration 결과 `(automatically created in migrations directory after makemigrations command) and add atomic = False to the Migration class. Migration(migrations.Migration)` 를 출력하는 경우가 있습니다.

이 경우에는 **Migration** 폴더 내 작업 내용을 다음과 같이 수정합니다.

```python
from django.db import migrations

class Migration(migrations.Migration):
    atomic = False # <<<< 이 내용을 추가합니다
```

## one to many 관계는 ForeignKey() 를 활용 [(Web)](https://stackoverflow.com/questions/6928692/how-to-express-a-one-to-many-relationship-in-django)
관계용 모듈함수로는 `models.ForeignKey()`, `models.ManyToManyField()` 를 활용합니다.