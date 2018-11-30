---
title : 파이썬 웹 프로그래밍 (실전편) 하편 - form
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

템플릿 결과 이외에, 별도의 정보를 서버로 전송 후 변화된 내용을 활용하기 위해 **form 객체를** 활용하여 CRUD 객체를 만드는 방법을 익혀보자

1. from **django** import **forms** : django 기본제공 모듈
2. from **django.db.models** import **Q** : form 메소드 연산조건용
3. form.**errors**, **object_list** : 템플릿 form 오류, 정상 데이터
4. from **django.contrib.auth.mixins** import **LoginRequiredMixin**
5. from **django.views.generic.edit** import **CreateView, UpdateView, DeleteView**
6. generic.view 에서 제공하는 함수들과, Template 경로를 잘 정리하자
7. Template 에서는 **form.as_p(), as_table(), as_ul()**을 사용하면 form 결과물을 \<p\>, \<table\>, \<ul\> 객체로 자동 생성 후 출력한다 [form api](https://docs.djangoproject.com/en/2.1/ref/forms/api/)

<figure class="align-center">
  <img src="http://www.nextree.co.kr/content/images/2016/09/hjkwon-140328-form_-01.png" alt="" align="center">
  <figcaption></figcaption>
</figure> 

<br/>
# **9장 검색기능**

<br/>
## blog/forms.py

임시로 사용할 form 객체를 정의합니다. 여기선 검색어 1개만 활용하므로 검색객체 1개를 정의합니다

```python
from django import forms

class PostSearchForm(forms.Form):
    search_word = forms.CharField(label='단어 검색 : ') 
```
`label ="web으로 출력할 내용"`으로 템플릿에서는 `{ {form.as_table} }` 를 사용하여 내용을 호출한다


<br/>
## blog/views.py

임시로 사용할 form 객체와 템플릿 메소드를 정의합니다. 이를 위해서 1) 출력할 템플릿, 2) form 에서 서버에서 연산할 함수 메소드, 3) form 서버 전송결과 출력할 context 연산할 내용을 정의합니다

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
2. **object_list :** 해당 App의 DataBase에서 조건에 해당되는 인덱스 데이터를 list 형태로 불러옵니다. 반복 객체의 개별 필드값은 **.필드값** 메소드를 사용하여 호출합니다

<br/>
# **12장 콘텐츠 편집 기능**

Bookmark 콘텐츠를 CRUD 하는 함수를 정의합니다

## Bookmark 수정 / 편집의 설계

| 필드   | 타임      |  내용          |
|:------:|:---------:|:--------------:|
|id      |Integer    | 기본키         |
|Title   |CharField  | 북마크 제목    |
|url     |URLField   | 북마크 Url     |
|owner   |ForeignKey | 북마크 소유자  |


<br/>
## models.py 

객체 수정을 위해서 사용자 정보를 **개별 App의 테이블**에 **사용자 필드를** 추가 합니다.

```python
# bookmark/models.py 
from django.contrib.auth.models import  User

class Bookmark(models.Model):
    owner = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
```

<br/>
## views.py 

bookmark 객체가 **Create, Read, Update, Delete** 함수를 작성합니다

```python
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin

class BookmarkCreateView(LoginRequiredMixin, CreateView):
    model = Bookmark
    fields = ['title', 'url']
    success_url = reverse_lazy('bookmark:index')

    # form의 유효성을 검사한 뒤 오류가 없으면 메소드를 호출합니다
    def form_valid(self, form):
        form.instance.owner = self.request.user
        return super(BookmarkCreateView, self).form_valid(form)

class BookmarkChangeLV(LoginRequiredMixin, ListView):
    template_name = 'bookmark/bookmark_change_list.html'

    # 화면에 출력할 레코드 리스트를 반환합니다
    def get_queryset(self):
        return Bookmark.objects.filter(owner=self.request.user)

class BookmarkUpdateView(LoginRequiredMixin,UpdateView):
    model = Bookmark
    fields = ['title', 'url']
    success_url = reverse_lazy('bookmark:index')

class BookmarkDeleteView(LoginRequiredMixin, DeleteView):
    model = Bookmark
    success_url = reverse_lazy('bookmark:index')
```

**LoginRequiredMixin : ** django 1.10 에서는 이 함수를 사용자가 직접 작성했지만 django 2.1 에서는 `from django.contrib.auth.mixins import **LoginRequiredMixin**` 객체를 직접 제공합니다. 이 함수는 현재 사용자가 로그인 여부를 판단하여 로그인 상태가 아니면 자동으로 re-direct 합니다


<br/>
## urls.py

```python
app_name = "bookmark"

urlpatterns = [
  re_path(r'^add/$', 
    BookmarkCreateView.as_view(), name='add'),
  re_path(r'^change/$', 
    BookmarkChangeLV.as_view(), name='change'),
  re_path(r'^(?P<pk>[0-9]+)/update/$', 
    BookmarkUpdateView.as_view(), name='update'),
  re_path(r'^(?P<pk>[0-9]+)/delete/$', 
    BookmarkDeleteView.as_view(), name='delete'),
]
```

<br/>
## Tamplates

generic view 를 사용하면 설정할 내용이 적은많큼, 관련된 기본설정값을 잘 지켜야 한다. 이점이 왜 장점인지 처음에는 잘 몰랐다.

Web과 관련된 기본적인 작업들을 이해하고 나서는, 꼭 필요한 내용인데 작업을 줄여주는구나, 그리고 기본설정 url/ template 내용을 정확하게 이해하면 제공되는 서비스 자체도 안정적으로 구현 가능하다.  

1. **CreateView, UpdateView** 에서는 **app이름/app이름_form.html**
2. **DeleteView** 에서는 **app이름/app이름_confirm_delete.html**
 
으로 템플릿을 자동연결 합니다 