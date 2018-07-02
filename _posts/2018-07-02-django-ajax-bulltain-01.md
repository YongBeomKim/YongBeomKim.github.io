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

admin 에서 사용자가 올린 이미지를 클릭하면, **MERIA User URL Routing** 기능을 기본적으로 제공하지 않아서 오류를 출력한다. 이를 극복하기 위해서는 사용자가 추가로 설정값을 입력해야 한다 [Django Document](https://docs.djangoproject.com/en/2.0/howto/static-files/)

```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    ]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

수정 후 작동을 확인한다


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

조금 더 간략하고 안정적인 **Generic view**를 사용한다

```python
from django.views.generic import ListView
post_list = ListView.as_view(model=Post)
```
**Generic View**를 사용하면 바로 함수객체를 생성한다.



16분 까지 정리를 완료 (오전중에 끝내보자!!!)