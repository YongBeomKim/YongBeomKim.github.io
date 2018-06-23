---
title : Django Ajax
last_modified_at: 2018-06-23T13:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - json
    - django
toc: true 
---


# Django Ajax

1. 맨 처음 `settings.py` 설정을 익히고
2. `json` 객체로 Python 에서 JavaScript 로 전달을 익히고
3. 이번에 **Refresh** 없이도 객체를 변경가능한 **Ajax**를 익혀보자

참고로 Ajax 를 익히는건 이번이 처음이다. [django Ajax 참고사이트](https://www.sourcecodester.com/tutorials/python/11762/python-django-simple-crud-ajax.html)


<br>
## App 추가하기 (ajax 를 구현할 앱을 설정한다)

1. `$ python manage.py startapp ajax` **_terminal_**
2. `ajax.apps.AjaxConfig` : **_settings.py_**
3. `re_path('r^ajax/', include('ajax.urls', namespace='ajax'))` : **_urls.py_**




**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}   