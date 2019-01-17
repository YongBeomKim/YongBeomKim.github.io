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
```python
$ pip install django-widget-tweaks

# settings.py
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
[사용자 필터-초코몽키](https://wayhome25.github.io/django/2017/06/22/custom-template-filter/)

[사용자 필터-위키북스](https://wikidocs.net/9678)


# filter 목록

https://django-filter.readthedocs.io/en/master/ref/filters.html?highlight=Date%20Range







# 참고자료 
[models Meta 설정내용](https://wikidocs.net/6667#verbose_name)<br/>
