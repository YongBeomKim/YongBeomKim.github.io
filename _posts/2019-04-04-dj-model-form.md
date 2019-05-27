---
title : Django Form
last_modified_at: 2019-04-04T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django.jpg
categories:
  - django
tags: 
    - model
    - django
toc: true 
---

**CreateView** 에서 **[Chained Dropdown List](https://simpleisbetterthancomplex.com/tutorial/2018/01/29/how-to-implement-dependent-or-chained-dropdown-list-with-django.html)** 내용을 정리하다가, Model Class 가 많이 필요해 추가기능을 알아보던 중에, **Formset**, **inlineFormSet** 등에 대해서 이해도가 떨어져서 이번 내용을 정리하게 되었습니다.

위 내용은 [예제Site](dependent-dropdown-example.herokuapp.com) 에서 확인할 수 있습니다

<br/>
# Form 객체의 생성
Form 객체를 생성하는 방법으로는, 1) modelform_factory 을 활용한 **Form 객체** 그리고 2) **forms** 클래스를 활용한 **Form 클래스 객체** 가 있습니다

## Form 객체 만들기

기본적인 form 객체를 생성 합니다. 

1. `required=False` 는 필수 항목들을 정의 합니다. 
2. `widget=forms.Textarea` 은 필드별 맞춤형 위쳇을 정의 합니다.

```python
from django import forms

class ContentForm(forms.Form):
    subject = forms.CharField()
    email   = forms.EmailField(required=False)
    message = forms.CharField(widget=forms.Textarea)
```


## Form 객체 다루기

터미널에서 `$ python manage.py shell` 을 실행하여 생성한 form 객체를 확인 합니다.

```python
>>> from .forms import ContentForm
>>> f = ContentForm()
>>> print(f)
>>> print(f.as_ul())
>>> print(f.as_p())
>>> f.cleaned_data      # 데이터를 dict 으로 출력
>>> f.is_bound          # form 객체 확인
>>> f.errors            # form 객체 오류 확인
>>> f.is_valid()        # form 유효성 확인
>>> f['subject']        # 특정 필드 확인
>>> f['subject'].errors # 필드별 오류 확인
```

## Form Template

`f.errors` 로 객체를 활용하는 방식으로 템플릿을 작성 합니다.  **django** 에서 **form** 객체내 정의를 변경하면 템블릿에서 별도 작업 없이 적용 됩니다.

{% raw %}
```html
<body>
    {% if form.errors %}
    <p style="color: red;">
        form 객체에 오류가 있습니다.
    </p>
    {% endif }

    <form action="" method="post">
        <table>
            {{form.as_table}}
        </table>
        {% csrf_token %}
        <input type="submit" value="입력">
    </form>
</body>
```
{% endraw %}


<br/>
# FormView
form 을 보여주기 위한 GenericView 입니다. 보다 구조적인 작업이 가능합니다. 속성값 중 `success_url` 은 form 처리가 성공한 뒤 **redirect URL** 을 정의 합니다. 해당 페이지에서 결과를 출력시에는 지정하지 않습니다.

```python
from django.views.generic.edit import FormView
from .form import TempForm

class SearchFormView(FormView):
    form_class = TempForm   # 사용자 정의 form 객체
    template_name = 'app/template.html'

    def get_initial(self):
        init_data = super(SearchFormView).get_initial()
        init_data['name'] = 'Search'
        return init_data

    def get_success_url(self):
        return reverse('home')

    # form : 사용자 정의 form 객체를 의미
    def form_valid(self, form):
        search = '%s' % self.request.POST['search']
        post_list = Model.objects.filter(field__icontains = search)

        # 필터링 결과물 정의
        context = {}
        context['form'] = form # 
        context['search'] = search
        context['object_list']  = post_list
        return render(self.request, self.template_name, context)
```

<br/>
# FormSet의 활용

## modelform_factory
Form 객체를 생성합니다

```python
from django.forms.models import modelform_factory
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
