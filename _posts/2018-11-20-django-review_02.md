---
title : 파이썬 웹 프로그래밍 중편 (북마크, 블로그)
last_modified_at: 2018-11-20T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - django
    - python
toc: true 
---


# 파이썬 웹 프로그래밍 (실전편)

앞에서 url을 다루는 **slug, pk** 객체를 정규식의 활용 **model 의 method 들**과, **Generic View**에서 지원하는 **템플릿**에서 활용하는 방법들을 살펴보았다.

<figure class="align-center">
  <img src="https://4.bp.blogspot.com/-2a5Ix9fUu6o/WI0SiFp2gTI/AAAAAAAAA1o/pLAy3c2oKtI6GH0GW9o0fXwK2rHh_blTgCLcB/s1600/1.jpg" alt="" align="center">
  <figcaption></figcaption>
</figure> 


# base.html / home.html

<br />
## **{% load static %},{% load staticfiles %}**

[원문 stack overflow](https://stackoverflow.com/questions/24238496/what-is-the-difference-between-load-staticfiles-and-load-static)

**settings.py** 설정파일에서 **STATICFILES_STORAGE**를 사용하여 참조경로를 여럿 설정한 경우 **{% load static from staticfiles %}**을 사용하면 클라우드의 경로를 명확하게 호출 가능하고, 이를 축약한 방법이 **{% load staticfiles %}** 이다.

간단한 site인 경우에는 **STATIC_ROOT** 를 설정하고, 템플릿에서는 **{% load static %}**를 사용하면 된다.

<br />
## **{% block extra %},{% endblock %}**

동일한 템플릿을 별도의 request를 받은경우, 갱신되는 부분을 소스코드에 삽입한다

```html
# 부모 템플릿
{% block content %}
{% endblock %}
```

부모 템플릿에서 위와 같이 구현하는 방법, 또는 `<div id="content">{% block content %}{% endblock %}</div>` 설정하는 방법 2가지가 있다. 위의 예시와 같은 방법이 보다 다양하고 명확하게 조건들을 변경가능한 자유도가 높기 때문에 위의 예시를 추천한다


<br/>
## **{% extends "base.html" %}**

상단바 메뉴 등 동일한 내용을 템플릿을 상속받는 경우에 사용하고, 반드시 **템플릿 첫줄에** 추가를 해야 상속을 받을 수 있다


<br/>
## **{% extends "base.html" %}**



