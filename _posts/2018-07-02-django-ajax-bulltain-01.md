---
title : Django Ajax 게시판 만들기
last_modified_at: 2018-07-01T11:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - askDjango
    - ajax
    - django
toc: true 
---


<br>
# Ask Django 의 Ajax 활용 게시판 만들기 

<iframe width="560" height="315" src="https://www.youtube.com/embed/8hfKA-VfqaM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


## **blog** 앱을 추가한다

```
$ python manage.py startapp blog
$ python manage.py createsuperuser
```


<br>
### settings.py 

**MEDIA_URL, _ROOT** <small>[참고 블로그](https://wayhome25.github.io/django/2017/05/10/media-file/)</small>

```python
MEDIA_URL  = '/media/'  # 접속가능 URL 경로
MEDIA_ROOT = os.path.join(BASE_DIR, 'static/media/')
```

게시판 작업을 본격화 할 때에 thumbnail 이미지 추가방법도 함께 정리하도록 하자
[pillow 파이썬 활용법](http://rednooby.tistory.com/100) , [askdjango 질의응답](https://www.askcompany.kr/vod/crawling/126/)
{: .notice--info}

<br>
### models.py 

```python
from django.db import models
class Post(models.Model):
    title   = models.CharField(max_length=100)
    content = models.TextField()
    photo   = models.ImageField()

    def __str__(self):
        return self.title
```

<br>
### admin.py 

```python
from django.contrib import admin
from .models import Post

admin.site.register(Post)
```
이 부분을 추가해야만 `/admin` 에서 객체를 확인 가능하다


<br>
### server/settings.py

<figure class="align-center">
  <img src="https://i.stack.imgur.com/tjloT.png" alt="">
  <figcaption>MEDIA URL Routing</figcaption>
</figure> 

admin 에서 게시물을 등록한 뒤 이미지를 확인하면 위와 같은 오류를 출력한다. 이는 **MERIA URL Routing** 기능을 기본적으로 제공하지 않아서 발생하는 것으로, 사용자가 추가로 라우팅 경로설정을 덧 붙여야 한다 [Django Document](https://docs.djangoproject.com/en/2.0/howto/static-files/)

```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns =  [ .......]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

수정 후 작동 여부를 확인한다


<br>
## views.py 

객체의 목록을 출력한다

```python
from django.shortcuts import render
from .models import Post

def post_list(request):
    post_list = Post.objects.all()
    content = {'post_list' : post_list}
    return render(request, 'blog/post_list.html', content)
```

Django에서 기본적으로 제공하는 **Generic view**를 사용해서 기능을 추가해보자

```python
from django.views.generic import ListView, DetailView

post_list   = ListView.as_view(model=Post)
post_detail = DetailView.as_view(model=Post)
```
**Generic View**를 사용하면 바로 함수객체를 생성하고, Template 는 자동적으로 `<app name >/< model name >_list.html , < model name >_detail.html` 과 연결을 합니다. [Document](https://docs.djangoproject.com/ko/2.0/intro/tutorial04/)
{: .notice--info} 


<br>
## urls.py & Template

```python
from django.urls import re_path
from .views import post_list, post_detail

app_name="blog"
urlpatterns = [
    re_path(r'^$',             post_list,   name='post_list'),
    re_path(r'^(?P<pk>\d+)/$', post_detail, name='post_detail'),
]
```

**post_list.html**

```sql
{ % block content % }
<h1>Django Ajax Test Site</h1>
  <ul>
  { % for post in post_list % }
    <li><a href="{ % url 'blog:post_detail' post.pk % }">
        {{ post.title }}</a>  </li>
  {% endfor %}
  </ul>
{ % endblock % }
``` 

<br>
**post_detail.html**

```sql
{ % block content % }
  <h1>{ { post.title } }</h1>

  { % if post.photo % }
      <img src="{ { post.photo.url } }" style="max-width: 100px;"/>
  { % endif % }
      { { post.content | linebreaks } }
{ % endblock % }
```

1234