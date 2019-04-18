---
title : Django Form
last_modified_at: 2019-04-04T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django_pro.png
categories:
  - django
tags: 
    - model
    - django
toc: true 
---

**CreateView** 에서 **[Chained Dropdown List](https://simpleisbetterthancomplex.com/tutorial/2018/01/29/how-to-implement-dependent-or-chained-dropdown-list-with-django.html)** 내용을 정리하던 중, Model Class 가 많이 필요해 추가기능을 살피던 중, **Formset**, **inlineFormSet** 등에 대해서 이해도가 떨어져서 이번 내용을 정리하게 되었습니다.

위 내용은 [예제Site](dependent-dropdown-example.herokuapp.com) 에서 확인할 수 있습니다

<br/>
# Form 객체의 생성
Form 객체를 생성하는 방법으로는, 1) modelform_factory 을 활용한 **Form 객체** 그리고 2) **forms** 클래스를 활용한 **Form 클래스 객체** 가 있습니다

## modelform_factory
Form 객체를 생성합니다
```python
from django.forms.models import  modelform_factory
from .models import Books

# Form 객체를 생성
BookForm = modelform_factory(Books, fields='__all__')
```

## forms
form 객체보다 세부설정이 용이한 장점이 있습니다

```python
from django import forms

class BookForm(forms.ModelForm):
    class Meta:
        model  = Books
        fields = ['title','author'] # '__all__'
        exclude = ['date']
```

<br/>
# GenericView
django 에서 지원하는 **CreateView, UpdateView** 내부에서 해당 모델과 관련된 레코드를 자동으로 생성합니다. Model 과 Form 의 특징을 모두 갖는만큼 활용도가 높습니다.

```python
class BookCreateView(CreateView):
    model = Books
    fields = '__all__'

class BookUpdateView(UpdateView):
    model = Photo
    fields = '__all__'
```

<br/>
# FormSet
**일반 Form 여러개로 묶어서** 하나의 Form 으로 취급하는 객체 입니다. **BaseFormSet** 클래스를 상속받기도 하지만, 보통은 **formset_factory()** 를 활용합니다

## formset_factory
```python
from django import forms
from django.forms.formsets import formset_factory
class BookSearchForm(forms.Form):
    search_word = forms.CharField(label="제목을 입력하세요")

BookSearchFormSet = formset_factory(BookSearchForm)
```

<br/>
# ModelFormSet
데이터베이스 모델에 기초한 모델폼을 만들고, 그 모델폼을 여러개 묶은 것이 모델폼셋 입니다.

```python
from django.forms.models import modelformset_factory
from .models import Books

BookFormSet = modelformset_factory(Books, fields='__all__')
```

<br/>
# InlineFormSet
MainForm 에 종속된 FormSet 으로 주종관계가 1:N 의 외래키로 연결된 테이블에서 사용합니다. 이 경우 **BaseInlineFormSet** 클래스를 상속받기도 하지만, **inlineformset_factory()** 함수를 주로 활용합니다

```python
class BookCreateView(CreateView):
    model = Books
    fields = '__all__'

BookInlineFormSet = inlineformset_factory(Books, Authors
    fields = ['image', 'title', 'date'],
    extra = 2)
```

활용하고자 하는 등의 별도 조합을 작업하는데 있어서 Form 에 대한 이해도가 필오 

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/dj-admin.png" style="width:500" align="center">
  <figcaption>Django 의 Admin 페이지</figcaption>
</figure>
{% raw %}
```html
<form method="get" action="{% url 'update-list' %}">
    <p>필터링: <input type="text" value={{filter}} name="filter"/></p>
    <p><input type="submit" name="submit" value="submit"/></p>
</form>
```
{% endraw %}
