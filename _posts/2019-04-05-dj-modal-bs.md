---
title : Django Model - bootstrap-modal-forms
last_modified_at: 2019-04-05T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django_pro.png
categories:
  - django
tags: 
    - form
    - bootstrap
toc: true 
---

GenericView 를 활용하면, 구조적 완결성이 높은 반면, 기능별 **url 과 template** 을 별도로 필요 합니다. 템플릿 구조가 단조로운 한계를 Ajax 를 활용하여 극복합니다. 하지만 로그인 보안등 기능추가가 어려운 한계가 있어서 방법을 찾던 중 [stackoverflow](https://stackoverflow.com/questions/52501470/i-want-to-create-django-popup-form-in-my-project) 에서 추천한 **[django-bootstrap-modal-forms](https://github.com/trco/django-bootstrap-modal-forms)** 의 내용을 보게 되었고, 작년 5월 처음 개발된 모듈로 업데이트도 잘 진행되어 활용도가 높아 보여서 정리를 하게 되었습니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/modal-form.jpg">
</figure>

<br/>
# django-bootstrap-modal-forms
예제로 정리된 내용을 살펴보면 아래 3개로 요약 가능합니다 
1. 회원가입용 form
2. 로그인 form
3. 일반 모델의 CRUD form

## 1. setting
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

## 2. Model Form
일반 모델객체를 활용하는 방법을 정리해 보겠습니다.

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

class Index(ListView):
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
from .views import Index, BookCreateView,\
    BookUpdateView, BookReadView, BookDeleteView

urlpatterns = [
    path('', Index.as_view(), name='index'),
    path('create/', BookCreateView.as_view(), name='create'),
    path('update/<int:pk>', BookUpdateView.as_view(), name='update'),
    path('read/<int:pk>', BookReadView.as_view(), name='read'),
    path('delete/<int:pk>', BookDeleteView.as_view(), name='delete'),
]
```