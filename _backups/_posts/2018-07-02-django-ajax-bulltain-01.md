---
title : Django 게시판 - Django
last_modified_at: 2018-07-02T11:45:06-05:00
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
# 장고 게시판 기본틀 만들기 

[Soure Code](https://gist.github.com/allieus/71471537685df3b81f1d)

<iframe width="560" height="315" src="https://www.youtube.com/embed/8hfKA-VfqaM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


<br>
## MEDIA_URL, MEDIA_ROOT 설정값 추가하기

제목, 게시글과 함께 사진파일을 추가로 정리할 것이다

**settings.py** <small>**MEDIA_URL, _ROOT** [참고 블로그](https://wayhome25.github.io/django/2017/05/10/media-file/)</small>

```python
MEDIA_URL  = '/media/'  # 접속가능 URL 경로
MEDIA_ROOT = os.path.join(BASE_DIR, 'static/media/')
```

게시판 작업을 본격화 할 때에 thumbnail 이미지 추가방법도 함께 정리하도록 하자
[pillow 파이썬 활용법](http://rednooby.tistory.com/100) , [askdjango 질의응답](https://www.askcompany.kr/vod/crawling/126/)
{: .notice--info}


<br>
**urls.py**

<figure class="align-center">
  <img src="https://i.stack.imgur.com/tjloT.png" alt="">
  <figcaption>MEDIA URL Routing</figcaption>
</figure> 

<small>admin 에서 게시물을 등록한 뒤 이미지를 확인하면 위와 같은 오류를 출력한다. 이는 **MERIA URL Routing** 기능을 기본적으로 제공하지 않아서 발생하는 것으로, 사용자가 추가로 라우팅 경로설정을 덧 붙여야 한다 [Django Document](https://docs.djangoproject.com/en/2.0/howto/static-files/)</small>

```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns =  [ .......]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```


<br>
## **blog** 앱을 추가 작업하기

기본 `base.html` 템플릿으로 작업을 진행중인 프로젝트에 블로그 내용을 덧붙이는 방식으로 작업을 확인할 것이다. 이러한 악조건(?) 에서 코드의 작동을 확인함으로 써 다른 내용과 충돌여부를 더욱 확실하게 알 수 있는 장점이 있다 <small>대신 작업하면서 충돌부분이 도드라져서 받는 스트레스 또한 적지 않은점은 함정</small>

```
$ python manage.py **startapp** blog
$ python manage.py **createsuperuser**
```


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

<br>
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
        { { post.title } }</a>  </li>
  { % endfor % }
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