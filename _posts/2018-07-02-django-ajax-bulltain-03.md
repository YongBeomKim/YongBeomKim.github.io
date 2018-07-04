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
# 장고 게시판 Post Delete 

[Soure Code](https://gist.github.com/allieus/71471537685df3b81f1d)

<iframe width="560" height="315" src="https://www.youtube.com/embed/haLJl5Xj9Ys" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


**Django Ajax, 그 두 번째 시간**

```python
In [1]: from blog.models import Post
In [2]: for i in range(100):
   ...:     Post.objects.create(title='title {}'.format(i), content='content {}'.format(i))
In [3]: Post.objects.all().count()
Out[3]: 103
```

Post 통신을 활용하여 객체를 **POST 조작**하는 작업을 실습하는 내용으로 우선 순차적 게시물을 만들어서 객체별 조작을 확인한다. 실습이 끝난결과 객체 삭제만 실습을 해서 별로였지만, 그나마 건진내용은 **Ajax** 기본조작과 **Generic View**에 기능 및 내용을 추가하는 방법을 배울 수 있었던 시간이었다.


<br>
## **views.py** 

```python
def post_delete(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if request.method == 'POST':
        post.delete()
        return redirect('blog:post_list')
    return render(request, 
                  'blog/post_delete_confirm.html',
                  {'post':post,})
```

<br>
## **urls.py**

```python
from django.urls import re_path
from .views import post_list, post_detail, post_delete

urlpatterns = [
    re_path(r'^(?P<pk>\d+)/delete/$', post_delete, name='post_delete'),
]
```

<br>
## **Template**

<br>
### **post_list.html**

```html
<ul id="post_list">
    { % include "blog/_post_list.html" % }
</ul>

<script>
$(function() {
    $('#post_list .post-delete-btn').click(function(){
        var url = $(this).attr('href');
        var target_id = $(this).data('target-id');

        if (confirm("정말로 삭제하겠습니까?")){

            $.post(url).done(function(){
                $('#' + target_id).remove();
            }).fail(function(){
                alert('삭제실패')
            })
        }
        return false; //버튼을 비활성화
    });
});
</script>
```


### **_post_list.html**

```html
{ % for post in post_list % }
<li id="post-{ { post.id } }">

    <a href="{ % url 'blog:post_detail' post.pk % }">{{ post.title }}</a>
    {{ post.title }}

    <a href="{ % url 'blog:post_delete' post.pk % }"
       class="post-delete-btn"
       data-target-id="post-{ { post.id } }">삭제</a>
</li>
{ % endfor % }
```

**HTML** 에서는 **`\<tag data-target-id=" "\>`**로 객체를 구분한 뒤,<br> **jQuery** 에서 **`$(this).data('target-id')`** 를 사용하여 객체를 조작 가능하다 [stack flow 설명 페이지](https://stackoverflow.com/questions/16424502/jquery-datatarget-pattern/40869529)
{: .notice--info}


