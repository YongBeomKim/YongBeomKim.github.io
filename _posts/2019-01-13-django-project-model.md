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
# BootStrap 설치하기
crispy-form 등 다양한 모듈에서 지원하는 bootstrap 을 추가로 설치합니다 [BootStrap Document](https://getbootstrap.com/docs/4.0/getting-started/webpack/) [GitIssue](https://github.com/twbs/bootstrap/issues/22196) 

## npm install
```python
$ npm i bootstrap bootstrap-webpack jquery popper.js
```

### ./public/js/index.js
```javascript
import 'bootstrap/dist/css/bootstrap.css';
```

### ./webpack.config.js
```javascript
module.exports = {
    entry: {
        index: './public/js/index.js',
    },
}
```

### ./app/template.html
```php
{ % load render_bundle from webpack_loader % }
{ % render_bundle 'index' % }
```

<br/>
# django-widget-tweaks
django 에서 form 객체의 CSS 스타일을 편집하는 경우 HTML5 TEMPLATE 에서 해당 객체를 조작하기 유용하도록 도와주는 패키지 입니다. [GitHub](https://github.com/jazzband/django-widget-tweaks)

## Install
```php
$ pip install django-widget-tweaks
```

### ./django/settings.py
```python
INSTALLED_APPS = [
    'widget_tweaks',
]
```

## HTML Template 
> { % load widget_tweaks % } , { % render_field form.필드 % }

```php
<!-- form 편집 tweaks 를 활성화 합니다 -->
{ % load widget_tweaks % } 

<!-- input type 을 type="search" 추가합니다 -->
{ % render_field form.search_query type="search" % }

<!-- HTML5 속성값을 추가 합니다 -->
{ % render_field form.text rows="20" cols="20" title="Hello, world!" % }
 
<!-- class 내용을 추가합니다 -->
{ % render_field form.title class+="css_class_1 css_class_2" % }

<!-- template variables can be used as attribute values -->
{ % render_field form.text placeholder=form.text.label % }
```

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

## 사용자 filter 추가
[사용자 필터-초코몽키](https://wayhome25.github.io/django/2017/06/22/custom-template-filter/)<br/>
[사용자 필터-위키북스](https://wikidocs.net/9678)

<br/>
# filter 목록
[django-filters](https://django-filter.readthedocs.io/en/master/ref/filters.html?highlight=Date%20Range)

<br/>
# Django REST API
이게 편하고 동적인 작업에도 용이하다고 하니까 쓰자. 우선 써보고 필요한면 추가 대안을 모색하는 방법으로 진도를 나아가자!!

## Install
```php
$ pip install djangorestframework
$ pip install djangorestframework-jwt
```

### ./mysite/settings.py
```python
INSTALLED_APPS = [
    'rest_framework',
    'rest_framework.authtoken',
]

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}

import datetime
JWT_AUTH = {
    'JWT_VERIFY': True,
    'JWT_VERIFY_EXPIRATION': True,
    'JWT_LEEWAY': 0,
    'JWT_EXPIRATION_DELTA': datetime.timedelta(seconds=86400),
    'JWT_ALLOW_REFRESH': True,
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=7),
}
```

### ./mysite/urls.py
작업을 위한 url과 별도로 아래의 url 을 추가합니다. **obtain_jwt_token** 의 역활은 **사용자 ID와 암호를 암호화된 방식으로 인증 및 연결하는** 기능을 합니다. 이를 확인 가능한 경로는 `http://localhost:8000/auth/` 를 사용합니다.
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/dj_rest_token.png">
  <figcaption></figcaption>
</figure> 
```python
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('auth/', obtain_jwt_token),
]
```

# 참고자료 
[models Meta 설정내용](https://wikidocs.net/6667#verbose_name)<br/>
[Reat API 설정내용](https://medium.com/@samy_raps/simple-movies-web-app-with-vue-vuetify-and-django-part-2-login-2414b984500b)<br/>