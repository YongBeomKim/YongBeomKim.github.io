---
title : 파이썬 웹 프로그래밍 (실전편) 상편 - 북마크, 블로그
last_modified_at: 2018-11-20T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django-tutorial.png
categories:
  - django
tags: 
    - django
    - python
toc: true 
---


# 파이썬 웹 프로그래밍 (실전편)

맨처음 파이썬을 공부하는 계기이자, 최초로 유로수업을 들었던 도서다. **Javascript, Jquery, Vue**를 공부하면서 도대체 Django로 할 수 있는건 무엇인가? 헷갈리면서 갈피를 잘 잡지 못해서 이번에 재대로 <small>빠르게</small> 부족한 부분들을 정리해 보려고 한다.

앞으로 다룰 내용을 간단하게 살펴보면...

1. **url을** 다루는 **slug, pk** 객체를 정규식의 활용 
2. **model 의 method 들** [models 의 API](http://pythonstudy.xyz/python/article/310-Django-%EB%AA%A8%EB%8D%B8-API)
3. **Generic View**에서 지원하는 **템플릿 메소드**
4. 템플릿의 **JSX `{ % % }` 함수를** 활용하는 방법들을 살펴보았다.

<figure class="align-center">
  <img src="https://4.bp.blogspot.com/-2a5Ix9fUu6o/WI0SiFp2gTI/AAAAAAAAA1o/pLAy3c2oKtI6GH0GW9o0fXwK2rHh_blTgCLcB/s1600/1.jpg" alt="" align="center">
  <figcaption></figcaption>
</figure> 


# 2장 Blog App

> url 주소의 정의 path() & repath()

**generic View** 클래스인 **ListView, DetailView**를 활용하는 위와 같은경우, **list를** 보여주는 페이지와 **datail 을** 보여주는 페이지를 구분하기 위해 ** 정규식을 활용한 **Page Key 값**을 내부에 포함하는 등 복잡한 작업을 필요로 한다, 이와 같은 경우에는 **시작(^)**과 **종료($)**를 구분지어 정의를 해야 한다

list 단독 페이지를 참조시 **path()**, 정규식을 기호등의 추가를 필요로 하는 경우에는 **re_path()** 사용하는 등의 방식을 사용하면 보다 명확하게 구분된다


> **path**('blog/', **include('blog.urls', namespace='blog'))**

mysite/urls.py 에서 경로를 App으로 나눈다


> **path**('', BookmarkLV.**as_view()**, name='index'),

> **re_path**(r'^(?P<pk>\d+)/$', BookmarkDV.as_view(), name='detail')

blog/urls.py 에서 App의 Home Url 경로같은 경우는 **path()** 함수를 사용하고, 내부에 정규식과 같은 내용이 추가되는 경우는 **re_path()** 함수를 사용한다 


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
## **.get_next_by_필드이름(**kwargs), <br>.get_previous_by_필드이름(**kwargs)**

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
        ordering = ('-modify_date',)   # modify_date 내림차순 (최신순)

    def get_absolute_url(self):
        return reverse('blog:post_detail', args=(self.slug,))

    def get_previous_post(self):
        return self.get_previous_by_modify_date()

    def get_next_post(self):
        return  self.get_next_by_modify_date()
```

<br>
## Page Objects

> **page_obj :** Page 객체가 들어있는 컨텍스트 변수

```html
{ % for post in posts % }
  <a href="{ { post.get_absolute_url } }">{ {post.title} }</a>
  { { post.modify_date | date:"N d, Y" } }
  <p>{ { post.description } }</p>
{ % endfor % }
```

필터와 내용을 정의할 때 `post.modify_date | date:"N d, Y"` 를 작업할 때 **`date:"N d, Y"`** 는 꼭 붙여야 제대로 작동한다. 이부분을 주의해야 한다


Page 객체 자동생성 메소드를 정리해보자.. [Django](https://docs.djangoproject.com/en/2.1/topics/pagination/)


**Methods**

1. **.has_next() :** 다음 페이지를 호출
2. **.has_previous() :** 이전 페이지를 호출
3. **.has_other_pages() :** 다음/이전 페이지 존재시 **True**를 출력 
4. **.next_page_number() :** 다음 페이지 **숫자를 출력** (InvalidPage)오류출력
5. **.previous_page_number() :** 이전 페이지의 **숫자를 출력** 
6. **.start_index() :** 최초 인덱스 값을 출력 
7. **.end_index() :** 마지막 인덱스 값을 출력


**Attributes**

1. **.object_list :** 페이지 객체를 List() 출력 
2. **.number :** 이번 페이지의 숫자를 출력
3. **.paginator :** The associated Paginator object



> **django.views.generic.dates**

제너릭뷰 내용 살펴보기[공식문서](https://docs.djangoproject.com/en/2.1/ref/class-based-views/generic-date-based/) [구조도](http://epydoc.pythondiary.com/generic-views/django.views.generic.dates-module.html)

| 제너릭뷰               |   기본템플릿                      |
|:----------------------:|:----------------------------------:|
| **List**View           |  모델이름_**all**.html             |
| **Detail**View         |  모델이름_**detail**.html          |
| **Year**ArchiveView    |  모델이름_archive_**year**.html    |
| **Month**ArchiveView   |  모델이름_archive_**month**.html   |        
| **Day**ArchiveView     |  모델이름_archive_**day**.html     |
| **Today**ArchiveView   |  모델이름_archive_**day**.html     |

**DayArchiveView 와 TodayArchiveView** 의 차이는 출력하는 기준날짜가 **특정일**인지, **오늘**인지 차이일 뿐 동일한 템플릿을 사용한다 


> **date_list**

1. **`{ % now % }`** 함수는 현재의 정보를 출력한다 
2. **date_list :** DateField, DateTimeField 모델 필드값을 기준으로 **템플릿별 적용한 Date Generic view** 기준 호출된 **List 객체**를 활용할 수 있다 [공식문서](https://docs.djangoproject.com/en/2.1/ref/class-based-views/generic-date-based/)

```php
<h1>블로그 글 모음 { % now "N d, Y" % }</h1>
<ul>
  { % for date in date_list % }
  <li style="display: inline;">
    <a href= "{ % url 'blog:post_year_archive' date|date:'Y' % }">
      Year- { { date | date:"Y" } }</a></li>
  { % endfor % }
</ul>
```

<br/>
# **4장 프로젝트 홈페이지 만들기 <small>템플릿 함수들 </small>**

> **base.html / home.html**

<br />
## **{ % load static % },{ % load staticfiles % }**

[원문 stack overflow](https://stackoverflow.com/questions/24238496/what-is-the-difference-between-load-staticfiles-and-load-static)

**settings.py** 설정파일에서 **STATICFILES_STORAGE**를 사용하여 참조경로를 여럿 설정한 경우 **{ % load static from staticfiles % }**을 사용하면 클라우드의 경로를 명확하게 호출 가능하고, 이를 축약한 방법이 **{ % load staticfiles % }** 이다.

간단한 site인 경우에는 **STATIC_ROOT** 를 설정하고, 템플릿에서는 **{ % load static % }**를 사용하면 된다.

<br />
## **{ % block extra % }, { % endblock % }**

동일한 템플릿을 별도의 request를 받은경우, 갱신되는 부분을 소스코드에 삽입한다

```html
# 부모 템플릿
{ % block content % }
{ % endblock % }
```

부모 템플릿에서 위와 같이 구현하는 방법, 또는 `<div id="content">{ % block content % }{ % endblock % }</div>` 설정하는 방법 2가지가 있다. 위의 예시와 같은 방법이 보다 다양하고 명확하게 조건들을 변경가능한 자유도가 높기 때문에 위의 예시를 추천한다


<br/>
## **{ % extends "base.html" % }**

상단바 메뉴 등 동일한 내용을 템플릿을 상속받는 경우에 사용하고, 반드시 **템플릿 첫줄에** 추가를 해야 상속을 받을 수 있다
