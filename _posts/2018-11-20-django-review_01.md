---
title : 파이썬 웹프로그래밍 Part 1
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

맨처음 파이썬을 공부하는 계기이자, 최초로 유로수업을 들었던 도서다. **Javascript, Jquery, Vue**를 공부하면서 도대체 Django로 할 수 있는건 무엇인가? 헷갈리면서 갈피를 잘 잡지 못해서 이번에 재대로 <small>빠르게</small> 부족한 부분들을 정리해 보려고 한다.

<figure class="align-center">
  <img src="https://4.bp.blogspot.com/-2a5Ix9fUu6o/WI0SiFp2gTI/AAAAAAAAA1o/pLAy3c2oKtI6GH0GW9o0fXwK2rHh_blTgCLcB/s1600/1.jpg" alt="" align="center">
  <figcaption></figcaption>
</figure> 


# 2장 Blog App

> url 주소의 정의 path() & repath()

**generic View** 클래스인 **ListView, DetailView**를 활용하는 위와 같은경우, **list를** 보여주는 페이지와 **datail 을** 보여주는 페이지를 구분하기 위해 ** 정규식을 활용한 **Page Key 값**을 내부에 포함하는 등 복잡한 작업을 필요로 한다, 이와 같은 경우에는 **시작(^)**과 **종료($)**를 구분지어 정의를 해야 한다

list 단독 페이지를 참조시 **path()**, 정규식을 기호등의 추가를 필요로 하는 경우에는 **re_path()** 사용하는 등의 방식을 사용하면 보다 명확하게 구분된다

```python
from django.urls import path, re_path

# mysite/urls.py
path('blog/', include('blog.urls', namespace='blog')),

# blog/urls.py
path('', BookmarkLV.as_view(), name='index'),
re_path(r'^(?P<pk>\d+)/$', BookmarkDV.as_view(), name='detail'),
```

<br>
# 3장 Blog App

models 인스턴스의 활용 [Django Model instance](https://docs.djangoproject.com/en/2.1/ref/models/instances/)

<br>
## **.get_absolute_url()** 

**개체를 참조하는 표준 URL을 반환**하는 인스턴스 메서드로 `reverse()` 를 활용하여 아래의 내용을 재활용 한다

```python
def get_absolute_url(self):
    return reverse('blog:post_detail', args=(self.slug,))
```
 
```php
# 나쁜예제
<a href="/people/{ { object.id } }/">{ { object.name } }</a>

# 좋은예제
<a href="{ { object.get_absolute_url } }">{ { object.name } }</a>
```

<br>
## **.get_필드이름_display()**

모델 DB의 내용중, 해당 **필드의 값을** 출력한다 

```python
>>> p = Person(name="Fred Flintstone", shirt_size="L")
>>> p.save()
>>> p.shirt_size
'L'
>>> p.get_shirt_size_display()
'Large'
```

<br>
## **.get_next_by_필드이름(**kwargs), .get_previous_by_필드이름(**kwargs)**

모델의 필드를 **DateField, DateTimeField** 로 정의하고 **null=True** 옵션을 추가한 경우 제대로 작동한다. 날짜를 기준으로 navigation 기능을 구현한다. 

<br>
## models.py 

```python
# blog/models.py
class = Post(models.Model):
    slug  = models.SlugField(unique=True)
    create_date = models.DateTimeField(auto_now_add=True) # 생성시간
    modify_date = models.DateTimeField(auto_now=True)     # 수정시간

    class Meta:
        verbose_name = 'post'              # App 단수이름
        verbose_name_plural = 'post_story' # App 복수이름
        db_table = 'my_post_diary'         # App DB 저장이름
        ordering = ('-modify_date',)       # modify_date 내림차순

    def get_absolute_url(self):
        return reverse('blog:post_detail', args=(self.slug,))

    def get_previous_post(self):
        return self.get_previous_by_modify_date()

    def get_next_post(self):
        return  self.get_next_by_modify_date()
```

