---
title : Django bootstrap-modal-forms
last_modified_at: 2019-04-05T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django.jpg
categories:
  - django
tags: 
    - form
    - bootstrap
toc: true 
---

GenericView 를 활용하면, 구조적 완결성이 높은 반면, 기능별 **url 과 template** 을 별도로 필요 합니다. 템플릿 구조가 단조로운 한계를 Ajax 를 활용하여 극복합니다. 

하지만 로그인 보안등 기능추가가 어려운 한계가 있어서 방법을 찾던 중 [stackoverflow](https://stackoverflow.com/questions/52501470/i-want-to-create-django-popup-form-in-my-project) 에서 추천한 **[django-bootstrap-modal-forms](https://github.com/trco/django-bootstrap-modal-forms)** 의 내용을 보게 되었고, 작년 5월 처음 개발된 모듈로 업데이트도 잘 진행되어 활용도가 높아 보여서 정리를 하게 되었습니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/modal-form.png">
</figure>

<br/>
# **django-bootstrap-modal-forms**
예제로 정리된 내용을 살펴보면 아래 3개로 요약 가능합니다 
1. 회원가입용 form
2. 로그인 form
3. 일반 모델의 CRUD form

## **1 setting**
```s
$ pip install django-bootstrap-modal-forms
$ pip install django-widget-tweaks
```
```python
# settings.py
INSTALLED_APPS = [
    'bootstrap_modal_forms',
]
```
```html
<head>
    <link rel="stylesheet" href="bootstrap.css">
</head>
<body>
    <script src="bootstrap.js"></script>
    <script src="jquery.js"></script>
    <script src="jquery.bootstrap.modal.forms.min.js"></script>
</body>
```
`jquery.bootstrap.modal.forms.js` (3 kbyte) 를 위의 `min.js`(773 Byte) 대신 사용할 수 있습니다. 이들은 위 모듈에서 지원하는 것으로 `django-bootstrap-modal-forms/bootstrap_modal_forms/static/js/` [GitHub](django-bootstrap-modal-forms/bootstrap_modal_forms/static/js/) 에 저장된 내용을 활용합니다
{: .notice--success}

<br/>
# **일반 Model 의 modal-form**
일반 모델객체를 활용하여 **Create, Read, Update, Delete** 폼을 정의하는 방법들을 정리해 보겠습니다.

## **1 Django Coding**
Django 모듈을 활용한 module과 연결에서 차이점을 정의합니다

### models.py
```python
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=50)
    date  = models.DateField(null=True)
```

### forms.py
Django 모델을 `bootstrap_modal_forms` 에서 지원하는 form 객체를 생성합니다.

```python
from bootstrap_modal_forms.forms import BSModalForm
from .models import Book

class BookForm(BSModalForm):
    date = forms.DateField(
        error_messages = {
          'invalid': 'YYYY-MM-DD 입력'
        })
    class Meta:
        model   = Book
```

### views.py
`bootstrap_modal_forms` 에서 정의한 **Form** 객체를, `bootstrap_modal_forms.generic` 에서 정의된 **GenericView** 와 연결합니다. 해당객체는 `success_message` 에서 유추 가능하듯 **django messages** 객체를 활용함을 알 수 있습니다.

```python
from bootstrap_modal_forms.generic import BSModalLoginView,\
    BSModalCreateView, BSModalUpdateView,\ 
    BSModalReadView, BSModalDeleteView
from django.views.generic import ListView
from .forms import BookForm
from .models import Book

class BookListView(ListView):
    model = Book

class BookCreateView(BSModalCreateView):
    form_class = BookForm
    success_url = reverse_lazy('index')
    success_message = '객체생성'

class BookUpdateView(BSModalUpdateView):
    model = Book
    form_class = BookForm
    success_url = reverse_lazy('index')
    success_message = '변경완료'

class BookReadView(BSModalReadView):
    model = Book

class BookDeleteView(BSModalDeleteView):
    model = Book
    success_url = reverse_lazy('index')
    success_message = '삭제완료'
```

### urls.py
```python
from .views import BookListView, BookCreateView,\
    BookUpdateView, BookReadView, BookDeleteView

app_name = "books"
urlpatterns = [
    path('', BookListView.as_view(), name='list'),
    path('create/', BookCreateView.as_view(), name='create'),
    path('update/<int:pk>', BookUpdateView.as_view(), name='update'),
    path('read/<int:pk>', BookReadView.as_view(), name='read'),
    path('delete/<int:pk>', BookDeleteView.as_view(), name='delete'),
]
```

## **2 HTML Templates**
필요한 JavsScript, CSS 는 **Base.html** 에서 정의를 하고 개별 기능에 따른 템플릿 내용을 살펴보겠습니다.

### _modal.html
modal 기능을 구현하는 중간다리 역활을 하는 페이지로써 **기능을 구현할 페이지에서** 꼭 상속받아야 제대로 작동됩니다.

```html
<div class="modal fade" tabindex="-1" role="dialog" id="modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content"></div>
  </div>
</div>
```

이 내용을 아래의 ListView 페이지에서 상속을 받아야 기능이 제대로 작동됩니다.
{% raw %}
```php
{% include "_modal.html" %}
```
{% endraw %}

### book_list.html
일반 모델에서 **ListView** 로 구현하는 **Template** 입니다. 해당 모델의 내용을 보여주고, CRUD 기능 버튼 들을 모두 연결합니다.

기능과 연결 함수는 JavaScript 로 구현하고, 객체값의 연결은 **Html** 에서 **data-id** 속성내 값을 활용하여 전달 합니다.

{% raw %}
```html
{% block content %}
<h4>CRUD 예제</h4>
<div>
 <button class="create-book" 
    type="button">추가</button>
</div>
{% if books %}
  <table class="table">
    <thead>
      <tr>
        <th scope="col">제목</th>
        <th scope="col">날짜</th>
      </tr>
    </thead>
    <tbody>
      {% for book in books %}
        <tr>
          <td>{{ book.title }}</td>
          <td>{{ book.date }}</td>
            <button class="read-book" type="button" 
                data-id="{% url 'books:read' object.pk %}">
              <span class="fa fa-eye"></span>
            </button>
            <button class="update-book" type="button" 
                data-id="{% url 'books:update' object.pk %}">
              <span class="fa fa-pencil"></span>
            </button>
            <button class="delete-book" type="button" 
                data-id="{% url 'books:delete' object.pk %}">
              <span class="fa fa-trash"></span>
            </button>
          </td>
        </tr>
      {% endfor %}
    </tbody>
  </table>
{% else %}
  <p>저장된 내용이 없습니다</p>
{% endif %}
{% endblock content %}

{% block scripts %}
  <script type="text/javascript">
    $(function () {
      // 생성버튼 연결
      $(".create-book").modalForm({
          formURL: "{% url 'books:create' %}"
        });
      // 수정버튼 기능 연결
      $(".update-book").each(function () {
        $(this).modalForm({
            formURL: $(this).data('id')
        });
      });
      // 읽기버튼 기능 연결
      $(".read-book").each(function () {
        $(this).modalForm({
            formURL: $(this).data('id')
        });
      });
      // 삭제버튼 기능 연결
      $(".delete-book").each(function () {
        $(this).modalForm({
            formURL: $(this).data('id')
        });
      })
    });
  </script>
{% endblock extrascripts %}
```
{% endraw %}

### book_create.html
Ajax 으로 작동되는 Form 템플릿을 정의합니다. 
1. Form의 스타일 지정은 **django-tweaks** 모듈의 `render_field` 필드를 활용합니다.
2. Form의 필드별 속성은 HTML CSS Class 인 **modal-header, modal-title, modal-body** 를 활용합니다.
3. Form의 데이터 변수로는 HTML 의 `data-*, aria-*` 속성을 활용합니다. [`data-*, aria-*` 설명](https://mygumi.tistory.com/341)
   1. **data-\* :** 데이터 자체를 전달 합니다.
   2. **aria-\* :** 웹 접근성 속성을 활용 합니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/modal-create.png">
</figure>

{% raw %}
```html
{% load widget_tweaks %}
<form method="post">
  {% csrf_token %}
  <div class="modal-header">
    <h3 class="modal-title">책 생성하기</h3>
    <!-- 닫기버튼 -->
    <button type="button" class="close" 
        data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>

  <!-- 오류 메세지 처리공간 -->
  <div class="modal-body">
    <div class="{% if form.non_field_errors %}invalid{% endif %}">
      {% for error in form.non_field_errors %}
        {{ error }}
      {% endfor %}
    </div>

    {% for field in form %}
      <div class="form-group">
        <label for="{{ field.id_for_label }}">{{ field.label }}</label>
        {% render_field field class="form-control" placeholder=field.label %}
        <div class="{% if field.errors %} invalid{% endif %}">
          {% for error in field.errors %}
            <p class="help-block">{{ error }}</p>
          {% endfor %}
        </div>
      </div>
    {% endfor %}
  </div>

  <div class="modal-footer">
    <button type="button">추가하기</button>
  </div>
</form>
```
{% endraw %}

### book_update.html
Ajax로 작동되는 수정 Form 템플릿을 정의합니다.

{% raw %}
```html
{% load widget_tweaks %}
<form method="post">
  {% csrf_token %}
  <div class="modal-header">
    <h3 class="modal-title">책 수정</h3>
    <button type="button" class="close" 
      data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>

  <div class="modal-body">
    <div class="{% if form.non_field_errors %}invalid{% endif %} mb-2">
      {% for error in form.non_field_errors %}
        {{ error }}
      {% endfor %}
    </div>

   {% for field in form %}
   <div class="form-group">
     <label for="{{ field.id_for_label }}">{{ field.label }}</label>
     {% render_field field class="form-control" placeholder=field.label %}
     <div class="{% if field.errors %}invalid{% endif %}">
       {% for error in field.errors %}
         <p class="help-block">{{ error }}</p>
       {% endfor %}
     </div>
   </div>
   {% endfor %}
  </div>
  <div class="modal-footer">
    <button type="button">수정하기</button>
  </div>
</form>
```
{% endraw %}

### book_read.html
Ajax 으로 작동되는 개별 객체 내용을 보여주는 Form 템플릿을 정의합니다.

{% raw %}
```html
{% load widget_tweaks %}
<div class="modal-header">
  <h3 class="modal-title">책내용 보기</h3>
  <button type="button" class="close" 
    data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body">
  <div>제목:{{book.title}}</div>
  <div>날짜:{{book.date}}</div>
</div>
<div class="modal-footer">
  <button type="button" data-dismiss="modal">닫기</button>
</div>
```
{% endraw %}

### book_delete.html
Ajax 으로 작동되는 삭제 확인용 Form 템플릿을 정의합니다.

{% raw %}
```html
{% load widget_tweaks %}
<form method="post" action="">
  {% csrf_token %}
  <div class="modal-header">
    <h3 class="modal-title">삭제 메세지</h3>
    <button type="button" class="close" 
      data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>

  <div class="modal-body">
    <p class="delete-text">
      <strong>{{book.title}}</strong>
      를 삭제합니다
    </p>
  </div>

  <div class="modal-footer">
    <button type="submit">Delete</button>
  </div>
</form>
```
{% endraw %}
