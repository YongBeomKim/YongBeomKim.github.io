---
title : Django 개발을 위한 A-Z setting.py
last_modified_at: 2018-11-19T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - django
toc: true 
---

개발을 위해 파일들의 경로를 명확하게 작업할 필요가 있다. 그리고 아래의 내용중 일부는 자동생성되지만, **관련 폴더는 자동생성되지 않으므로** 코드수정과 동시에 **동일한 이름으로 해당 폴더들을** 만들어야 한다 <small><strike>폴더 생성시 오타가 나중에 곤란한 상황을 초래하니 주의해서 작업하자</strike></small>

# Setting.py 

```python
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
```

서버의 경로를 url과 명확하게 연결하기 위하여 몇가지 설정작업을 필요로 한다

<br>
## DataBase

postgresql, mariaDB 등 고유설정에 따라 이부분은 변경한다. 기본 개발단계에서는 규모를 키우지 않고 sqlite3를 활용해도 무관하다 <strike><small>sqlite3도 1Gb가 넘어가면 효율성등 많은 문제가 생긴다</small></strike> [settings.py 개발단계](https://yongbeomkim.github.io/django/django_project_start/)

<br>
## Template

```python
TEMPLATES = [
    { 'BACKEND': 'django.template.backends.django.DjangoTemplates',
      'DIRS': [os.path.join(BASE_DIR, 'templates')],
      'APP_DIRS': True,
      'OPTIONS': {
         'context_processors': [
            'django.template.context_processors.debug',
            'django.template.context_processors.request',
            'django.contrib.auth.context_processors.auth',
            'django.contrib.messages.context_processors.messages',],},
    },
]
```

<br>
## Static

```python
STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
```

이 코드는 기본으로 제공되지만 **'./static'** 폴더부분은 자동으로 생성되지 않으므로 추가로 폴더를 생성한다 <small>이를 작업하지 않아도 default로 `./static` 폴더를 찾지만 보다 확실한 작업을 위해서 (서버에서 오작동 방지) 이를 추가한다 </small>
{: .notice--info}


<br>
## Media Url / Root

서버에서 작업에 필요한 파일들을 url로 연결하기 위한 설정이다

```python
MEDIA_URL = '/media/'
MEDIA_ROOT = [os.path.join(BASE_DIR, 'media')]
```

<br>
## Internationalization 설정

```python
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Seoul'  # Edited
USE_I18N = True
USE_L10N = True
USE_TZ = False            # Edited
```

Python Anywhere 에서는 `USE_TZ = False` 로 변경을 해야 datetime 함수에서 시간대를 불러올 때 현재시간을 잘 찾는다. 
{: .notice--info}


# Check Out

```
$ python manage.py makemigrations && python manage.py migrate
```

DataBase 연결을 함으로써 전체적인 설정 내용을 확인한다