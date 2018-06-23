---
title : Django Home_View
last_modified_at: 2018-06-22T11:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - views
    - django
toc: true 
---


# Main Page 구현

<small>이번의 내용은 **'파이썬 웹 프로그래밍:실전편|김석훈 04** 를 참고'</small>

settings.py로 기본골격을 완성한 뒤에는 바로 'Main Page'를 추가한다. **Base.HTML** 과 **Home.HTML**의 연결 및 **Static CSS, JS**의 작동 등 전체적인 디자인을 서버에 적용한다.


몇번 시행착오를 거치면서 느낀점은, **해당 웹서비스의 틀을 완성**하고 **(Design 및 Jqurey 등도 어느정도 구체화한 뒤)** 작업을 실행하는 방법이 가장 빨랐다. 이유는 큰 틀 없이는 방향을 읽고서 프로그래머가 직면한 문제를 어떤 방식으로 풀어가야 하는지 방향을 찾고 시행착오를 거치는데 걸리는 시간 소요가 더 많았기 때문이다.

코딩작업은 문서등으로 뼈대를 구성한 뒤, 구체적인 살을 붙이는 작업으로 인식하고 접근하는 것이 가장 효율적이라 할 수 있다.



# Django 


<br>
## MySite/views.py

<small>mysite/views.py 를 새로 추가한다</small>

```python
from django.views.generic.base import TemplateView

class HomeView(TemplateView):
    template_name = 'home.html'
```

**TemplateView** 제너릭 뷰를 활용하기 위해, **class** 객체를 만들어서 `template_name` 등의 해당 메소드를 활용한다
{: .notice-info}



<br>
## MySite/urls.py

```python
from django.contrib import admin
from django.urls import path, re_path
from .views import HomeView

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^$', HomeView.as_view(), name='home'),
]
```

**.views :** 혼동이 없다면, `mysite.views` 보다 더 효율적이다 <small>출처 : two scoop django</small>
{: .notice-info}


<br>
# Template

## base.html

보통 웹페이지는 2단 상속을 통해서 페이지를 구성한다

```html
<head>
    <meta charset="utf-8">
    <title>{ % block title % }{ % endblock title % }</title>

    { % load staticfiles % }
    <link rel="stylesheet" href="{ % static 'css/style.css' % }">
    <link rel="stylesheet" href="{ % block extrastyle % }
        { % endblock extrastyle % }">
    <script src="{ % static 'js/jquery-3.3.1.min.js' % }"></script>
</head>

<body>
    <div class="title">
        <div><img src="{ % static 'photo/logo.gif' % }" align="left"></div>
    </div>

    <!-- 본문을 추가할 위치-->
    { % block content % }
    { % endblock content % }

    <!-- footer를 추가할 위치-->
    { % block footer % }
    <div class="footer">
        <div><p>Copyright &copy; 2018</p></div>
    </div>
    { % endblock footer % }
</body>
</html>
```



<br>
## home.html

메인 페이지 HTML을 사용한다

```html
<!-- HTML 기본내용을 bast.html 에서 상속 -->
{ % extends "base.html" % }

{ % block title % }식당메인{ % endblock title % }

{ % load static % }
{ % block extrastyle % }
    { % static 'css/home.css' % }
{ % endblock extrastyle % }

{ % block content % }
    <div class="main">
        <img src="{ % static 'photo/main.jpg' % }">
            <p>기본적인 안내 메세지</p>
    </div>
{ % endblock content % }

{ % block footer % } 
    <div class="boxZ">
        <div class="footer">
            <p>Copyright &nbsp; &copy; 2018</p>
        </div>
    </div>
{ % endblock footer % }
```
**extends** 는 부모를 상속받는다<br>
**block** 은 자식에서 내용을 상속한다<br>
그럼 3단 구조일 때에는 어떻게 되나?
{: .notice--info}