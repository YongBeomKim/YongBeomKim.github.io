---
title : Django 게시판 - Post 처리
last_modified_at: 2018-07-02T15:45:06-05:00
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
# 장고 게시판 Post 처리 

[Soure Code](https://gist.github.com/allieus/71471537685df3b81f1d)

<iframe width="560" height="315" src="https://www.youtube.com/embed/haLJl5Xj9Ys" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>



Django Ajax, 그 두 번째 시간

```python
Python 3.6.3 (default, Oct  3 2017, 21:45:48) 
Type 'copyright', 'credits' or 'license' for more information
IPython 6.2.1 -- An enhanced Interactive Python. Type '?' for help.

In [1]: from blog.models import Post

In [2]: for i in range(30):
   ...:     Post.objects.create(title='title', content='content')

In [3]: exit
```

Post 통신을 활용하여 객체를 **CRUD** 한다