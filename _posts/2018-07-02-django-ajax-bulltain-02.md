---
title : Django 게시판 - Ajax, Json
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
# 장고 게시판 Ajax 추가하기

[Soure Code](https://gist.github.com/allieus/71471537685df3b81f1d)

<iframe width="560" height="315" src="https://www.youtube.com/embed/8hfKA-VfqaM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


<br><br>
## Generic View 의 기본기능을 사용한 페이지 구분

<br>
> **blog/urls.py**

```python 
from django.urls import re_path
from .views import post_list, post_detail

app_name="blog"
urlpatterns = [
    re_path(r'^$',             post_list,   name='post_list'),
    re_path(r'^(?P<pk>\d+)/$', post_detail, name='post_detail'),
]
```

<br>
> **blog/views.py**

```python
from django.views.generic import ListView
post_list   = ListView.as_view(model=Post, paginate_by=2)
post_detail = DetailView.as_view(model=Post)
```

**ListView :** 내부 메소드로 **paginate_by=2**를 사용하면 1페이지당 2개씩만 출력을 하고, 나머지는  `/blog/?page=2` **GET Query**로 별도의 페이지 처리를 한다. 단일한 페이지에서 **Ajax**를 사용하여 결과물을 변경해보자
{: .notice--info}


**.as_view() :** 제너릭 뷰를 꼭 추가해야만 작업이 가능하다. 이게 없으면 아래와 같은 오류를 출력한다.
File "/urls.py", line 6, in module <br>
re_path(r'^$', post_list, name='post_list'),<br>
TypeError: view must be a callable or a list/tuple in the case of include().<br>
Performing system checks...
{: .notice--danger}


<br>
## **template/blog/post_list.html**

아래의 코드결과는 "page_2" 링크를 누르면,  `/blog/?page=2` 내용을 console.log() 로 출력한다

```html
{ % block content % }
<h1>Django Ajax 게시판 실습</h1>
    <a href="#" id="page_2">2 페이지 이동</a><br>
    <script>
    $(function(){
        $('#page_2').click(function(){
          $.get('', {page : 2}, function(response) {
            console.log('--- response ---');
            console.log(response);
            $("#post_list").append(response)
          });
          return false;
        });
    });
    </script>

    <ul id="post_list">
      { % for post in post_list % }
          <li> <a href="{ % url 'blog:post_detail' post.pk % }">
          { { post.title } }</a></li>
      { % endfor % }
    </ul>
{ % endblock % }
```

**코드해설 :** `$.get('',  ,{ })` 에서 `$.get('')` 과 같이 빈 주소를 넘기면 현재 url 을 재사용 하고, `page : 2` 쿼리문을 덧붙인다.  
{: .notice--info}


<br>
## Ajax 보완 및 분리하기

Ajax 처리는 기본적으로 추가적 요청을 하는 과정이므로, 불필요한 내용이 많이 포함될수록 서버에도 부담이되고 client 에서도 비효율을 발생한다. 이를 극복하기 위해 Ajax 처리부분을 별도의 객체, 함수, Template 로 관리하는 작업을 진행해보려고 한다하여 ``blog/_post_list.html`r>

<br><br>
### include 

1. 1단계 : **Base**로 기본 설정을 정의한다
2. 2단계 : **extends**로 **Base**와 연결하고, 객체는 **block**으로 채운다
3. 3단계 : 템플릿에서 별도로 추가할 내용은 **include**로 보충한다 


<br>
> **post_list.html**

Ajax 부분을 보완 / 분리한다**

```html
<a href="#" id="page_2"> 2 페이지 이동 </a><br>
<a href="#" id="page_3"> 3 페이지 이동 </a>

<script>
$(function(){

  var load_page = function(page){
    $.get('', {page : 2}, function(response) {
      $("#post_list").append(response) // 덧 붙이는곳
    });
  };

  $('#page_2').click(function(){
    load_page(2); 
    return false;
  });

  $('#page_3').click(function(){
    load_page(3);
    return false;
  });

});
</script>

<ul id="post_list">
  { % include "blog/_post_list.html" % }
</ul>
```


<br>
> **_post_list.html**

분리한 내용을 별도 템플릿에 저장한다

```html
{ % for post in post_list % }
  <li><a href="{ % url 'blog:post_detail' post.pk % }">
    { { post.title } }</a></li>
{ % endfor % }
```


<br>
> **views.py**

```python
from django.views.generic import ListView, DetailView
from .models import Post

class AjaxListView(ListView):
    def get_template_names(self):
        if self.request.is_ajax():
            app_label  = self.object_list.model._meta.app_label
            model_name = self.object_list.model._meta.model_name
            return ['%s/_%s_list.html' %(app_label, model_name)]
        else:
            return super(AjaxListView, self).get_template_names()

post_list   = AjaxListView.as_view(model=Post, paginate_by=2)
post_detail = DetailView.as_view(model=Post)
```

**코드해설 :** `get_template_names()` 는 **ListView**의 맴버함수로 [Document](https://docs.djangoproject.com/en/2.0/ref/class-based-views/mixins-simple/) 템플릿 이름을 [list] 객체로 호출한다. 여기서는 1) request 에 **Ajax**가 포함된 경우에는 `blog/_post_list.html` 과 연결, 2) 그렇지 않은 경우에는 **ListView** 의 기본 get_template_names() 함수를 사용한  `blog/post_list.html` 와 연결한다
{: .notice--info}


<br>
## Model 을 JSON으로 연결

<br>
> **views.py**

```python
from django.http import JsonResponse
from django.views.generic import ListView, DetailView
from .models import Post

class AjaxJsonListView(ListView):
    def render_to_response(self, context, **response_kwargs):
        if self.request.is_ajax():
            post_list = []
            for post in context['post_list']:
                post_list.append({
                    'id': post.id,
                    'title': post.title,
                    'content': post.content,
                    'photo_url': post.photo.url,
                })
            return JsonResponse(post_list, safe=False)
        return super(AjaxJsonListView, self).\
               render_to_response(context, **response_kwargs)

post_list = AjaxJsonListView.as_view(model=Post, paginate_by=2)
```

<br>
> **post_list.html**

```javascript
$(function(){

    var load_page = function(page){

        $.get('', {page : page}, function(data) { 

            for(var i=0; i<data.length; i++){
                var post = data[i];
                console.log(post.title);
                console.log(post.photo_url);
                var html = '<li>' +
                    post.title +
                    '<img src="' + post.photo_url + '" style="max-width:100px";/></li>';
                $("#post_list").append(html);
            }
        });
    };

    $('#page_2').click(function(){
        load_page(2);
        return false;
    });

    $('#page_3').click(function(){
        load_page(3);
        return false;
    });

});
```