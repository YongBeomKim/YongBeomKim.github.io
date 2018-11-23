---
title : 파이썬 웹 프로그래밍 중편 (form 객체 다루기)
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

템플릿 결과 이외에, 별도의 정보를 서버로 전송 후 변화된 내용을 활용하기 위해 **form 객체를** 활용하는 방법을 익혀보자

<figure class="align-center">
  <img src="http://www.nextree.co.kr/content/images/2016/09/hjkwon-140328-form_-01.png" alt="" align="center">
  <figcaption></figcaption>
</figure> 

<br/>
# **9장 검색기능**


<br/>
## blog/forms.py

form 객체를 정의합니다. 여기선 검색어 1개만 활용하므로 검색객체 1개를 정의합니다

```python
from django import forms

class PostSearchForm(forms.Form):
    search_word = forms.CharField(label='단어 검색 : ') 
```
`label ="web으로 출력할 내용"`으로 템플릿에서는 `{ {form.as_table} }` 를 사용하여 내용을 호출한다


<br/>
## blog/views.py

form 객체와 템플릿 메소드를 정의합니다. 이를 위해서 1) 출력할 템플릿, 2) form 에서 서버에서 연산할 함수 메소드, 3) form 서버 전송결과 출력할 context 연산할 내용을 정의합니다

```python
from .forms import PostSearchForm
from django.db.models import Q

class SearchFormView(FormView):
    form_class    = PostSearchForm
    template_name = 'blog/post_search.html'

    def form_valid(self, form):
        schWord = "%s" %self.request.POST['search_word']
        post_list = Post.objects.filter(Q(title__icontains = schWord) |
                                        Q(description__icontains = schWord) |
                                        Q(content__icontains = schWord)).distinct()
        context = {}
        context['form'] = form
        context['search_term'] = schWord
        context['object_list'] = post_list
        return render(self.request ,self.template_name, context)
```

검색 연산작업을 수행하는 방법으로 1) **.filter(Q() | Q() | Q()).distinct()** 를 사용하여 검색조건을 정의할 수 있다 2) **필드이름__icontains :** 대소문자 구분없이 단어포함 여부를 검사한다. 한글도 무난하게 검색된다 3) **.distinct() :** 조건이 여럿인 경우, 중복결과는 제거 후 출력한다
{: .notice--info}


<br/>
## **blog/template/blog/post_search.html**

```html
검색을 위해 입력폼을 출력합니다
<form action="." method="post">{ % csrf_token % }
  { {form.as_table} }
  <input type="submit" value="Submit" />
</form>

{ % if object_list % }
{ % for post in object_list % }
  <h2><a href="{ {post.get_absolute_url} }">
  { {post.title} }</a></h2>
  { {post.modify_date | date:"N d, Y"} }
  <p>{ {post.description} }</p>
{ % endfor % }

{ % elif search_term % }
  <b><i>{ {search_term} } 검색결과가 없습니다</i></b>
{ % endif % }
```

1. **form action="." :** action 폼에서 **서버로 데이터를 보내는 목적지 URL** 을 지정한다
2. 

출처: http://mainia.tistory.com/4246 [녹두장군 - 상상을 현실로]