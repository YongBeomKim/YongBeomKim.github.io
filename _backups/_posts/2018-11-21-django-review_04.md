---
title : 파이썬 웹 프로그래밍 (실전편) 추가 - 태그클라우드, 댓글
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

상편에서 정리한 내용을 간단히 살펴보면..

1. **url을** 다루는 **slug, pk** 객체를 정규식의 활용 
2. **model 의 method 들**
3. **Generic View**에서 지원하는 **템플릿 메소드**
4. 템플릿의 **JSX `{ % % }` 함수를** 활용하는 방법들을 살펴보았다.

<figure class="align-center">
  <img src="http://python.astrotech.io/_images/django-request-response-flow.jpg" alt="" align="center" width="400">
  <figcaption></figcaption>
</figure> 


<br/>
# **7장 Tag 달기 <small>django-tagging</small>**

<br/>
## **tagging App 설치 및 활성화**

> pip install **django-tagging**

```python
# settings.py
INSTALLED_APPS = [
    'tagging.apps.TaggingConfig',
]
```

터미널에서 **`$ django-admin startapp tagging`** 을 실행하면 오류가 발생한다. 따라서 별도의 App 설치없이 `settings.py` 에서 위와 같이 설정만 연결하면 된다. 대신 `models.py` 는 **tag 기능을 추가하고 싶은 App의 models.py**에 추가를 하면 자동으로 Tagging App이 연결된다
{: .notice--info}

<br/>
## blog/**models.py**

```python
from tagging.fields import TagField

class Post(models.Model):
    tag = TagField()
```

admin에서 살펴보면 **TAGGING** 테이블이 blog가 아닌 **별도의 Table로** 생성됨을 알 수 있다. 즉 DataBase 테이블은 **별도의 App의 테이블로** 관리된다 


<br/>
## blog/**views.py**

```python
from django.views.generic import TemplateView
from tagging.views import TaggedObjectList

class TagTV(TemplateView):
    template_name = 'tagging/tagging_cloud.html'

class PostTOL(TaggedObjectList):
    model = Post
    template_name = 'tagging/tagging_post_list.html'
```

템플릿은 사용자가 직접 제작해야 한다. 대신 객체들을 연산하는 함수만 제공할 뿐이다
{: .notice--info}


<br/>
## { % load tagging_tags % } ,blog/**urls.py**

```python
re_path(r'^tag/$', TagTV.as_view(), name="tag_cloud"),
re_path(r'^tag/(?P<tag>[^/]+)/$', PostTOL.as_view(), name="tagged_object_list")
```

<br/>
## blog/template/tagging/*.html

<br/>
> **post_detail.html**

기존 블로그 ListView 템플릿에 tagging 모듈을 연결한다 

1. **tagging_tags :** 커스텀 Tag 값을 호출하기 위해 해당 모듈을 호출 
2. **tags_for_object :** object 객체에 포함된 **tag들을** 추출
3. tags_for_object **object as** tags : 2번 객체를 **tags**로 변경
4. **.name :** tag 이름호출 메소드 

```html
{ % load tagging_tags % }
{ % tags_for_object object as tags % }
{ % for tag in tags % }
  <a href="{ % url 'blog:tagged_object_list'  tag.name % }">
  { {tag.name} }</a>
{ % endfor % }
<a href="{ % url 'blog:tag_cloud' % }"><i>태그 클라우드</i></a>
```

<br/>
> **tagging_cloud.html**

1. **tagging_tags :** 커스텀 Tag 값을 호출하기 위해 해당 모듈을 불러온다 
2. **tag_cloud_for_model :** 클라우드 객체 포맷으로 호출
3. **.name, .font_size :** .name은 위와 동일, .font_size에서는 tag갯수 호출
4. **with steps=6 min_count=1 distribution=log % :** 최소1 범위는 1~6, 폰트크기 할당은 Logarithmic 알고리즘을 적용

```html
{ % load tagging_tags % }
{ % tag_cloud_for_model  blog.Post as tags 
    with steps=6 min_count=1 distribution=log % }
{ % for tag in tags % }
  <span class="tag-{ {tag.font_size} }">
  <a href="{ % url 'blog:tagged_object_list' tag.name % }">
  { {tag.name} }({ {tag.font_size} })</a></span>
{ % endfor % }
```

<br/>
> **tagging_post_list.html**

특정 태그를 클릭했을 때, 해당 태그의 블로그 리스트를 출력한다

```html
<h1>Posts for tag - { {tag.name} }</h1>

{ % for post in object_list % }
<h2><a href="{ {post.get_absolute_url} }">
    { {post.title} }</a></h2>
    { {post.modify_date | date:"N d, Y"} }
<p>{ {post.description} }</p>
{ % endfor % }
```

<br/>
# **8장 2 Disqus <small>댓글 추가하기</small>**

> pip install **django-disqus** 

[블로그 참고](https://onsil-thegreenhouse.github.io/programming/django/web_programmig/2017/10/22/django_tutorial2_ch2-3/)

```
django_sample
Your unique disqus URL will be: django-sample.disqus.com
Customize Your URL
```

1. **[Disqus](https://disqus.com/)** 사이트에 가입을 한다 
2. **[Install App in my Site](https://disqus.com/admin/create/)** 를 선택한다
