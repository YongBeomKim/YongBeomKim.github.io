---
title : Example / django-crispy-forms
last_modified_at: 2019-01-07T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django_form.png
categories:
  - django
tags: 
    - django
    - python
toc: true 
---

앞에서 `django-filters` 내용을 통해서 다양한 조건문을 구현해 봤습니다. 검색용 html5 form 객체를 다루기 위해서 `django-tweaks` 모듈을 사용하여 추가적인 랜터링 작업으로 스타일을 추가 합니다.

단점으로는 `django-filter` 에서 지원하는 `RangeDate()` 등 다양한 함수 및, **FilterSet** 의 `class Meta:` 에서 **django Lookup Expr** 을 사용한 파생 조건문으로 생성된 form 객체의 스타일 정리를 위해서 개별 속성을 확인한 뒤에야 작업하는 등의 난이도가 존재합니다.

```python
from crispy_forms.helper import FormHelper

# Style 객체를 Python 에서 선언합니다
class AddressForm(Form):
    email = CharField(
        label = '이메일',
        widget = TextInput(
            attrs = {'placeholder': 'Email'}))
    password = CharField(
        label = '암호',
        widget = PasswordInput()
        )
    address_1 = CharField(
        label = '상세주소',
        widget = TextInput(
            attrs = {'placeholder': '1234 Main St'}))
    address_2 = CharField(
        label= '도로명 주소',
        widget = TextInput(
            attrs = {'placeholder': 'Apartment, studio, or floor'}))
    city     = CharField(label='도시명')
    state    = ChoiceField(choices = STATES)
    zip_code = CharField(label = '우편번호')
    check_me_out = BooleanField(required = False)
    test         = ComboField(fields=[CharField(max_length=20), EmailField()])

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Row(
                Column('email', css_class = 'form-group col-md-6 mb-0'),
                Column('password', css_class = 'form-group col-md-6 mb-0'),
                css_class = 'form-row'
            ),
            Row(
                Column('address_1', css_class='form-group col-md-6 mb-0'),
                Column('address_2', css_class='form-group col-md-6 mb-0'),
                css_class='form-row'
            ),
            Row(
                Column('city', css_class='form-group col-md-4 mb-0'),
                Column('state', css_class='form-group col-md-4 mb-0'),
                Column('zip_code', css_class='form-group col-md-4 mb-0'),
                css_class='form-row'
            ),'check_me_out',
            Submit('submit', '제출하기')
        )
```
form 객체를 다루기 용이하도록 도와주는 package 로써 `django-crispy-forms` 이 유명합니다. 이번 페이지 에서는 `django form` 객체의 기본에서 부터 `django-crispy-forms` 을 사용한 스타일 지정까지를 정리해 보겠습니다. [참고문서](https://simpleisbetterthancomplex.com/tutorial/2018/11/28/advanced-form-rendering-with-django-crispy-forms.html)

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/django_form.png">
  <figcaption></figcaption>
</figure> 
 
# Install & Settings
```python
$ pip install --upgrade django-crispy-forms

# settings.py
INSTALLED_APPS = [
    'crispy_forms',
]

CRISPY_TEMPLATE_PACK = 'bootstrap3'
# CRISPY_TEMPLATE_PACK = 'uni_form'
```
**CRISPY_TEMPLATE_PACK :** form 템플릿 랜더링에 적용하는 스타일을 지정합니다. 지원 포맷으로는 **"uni-form", "bootstrap3", "bootstrap4"(Alpha버젼)** 이 있습니다. 사용자가 원하는 스타일이 별도로 존재하는 경우에는 **uni-form** 으로 랜더링을 한 뒤 `django-tweaks` 으로 스타일을 추가합니다. <small><strike>결국 'django-tweaks' 을 익혀둘 필요성이 생기네요..</strike></small>
{: .notice--info}

<br/>
# Django Basic form
django의 기본 함수를 사용한 form 객체를 실습합니다.
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/form1.png">
  <figcaption></figcaption>
</figure> 

### ./app/forms.py
주의할 점으로는 `required = True` 를 기본값으로 설정됩니다. 때문에 필수가 아닌 부분에 대해서는 `required = False` 로 설정값을 변경합니다.
```python
from django.forms import Form, CharField, TextInput, \
                PasswordInput, ChoiceField, BooleanField

STATES = (
    ('', '선택하기'),
    ('kr', '대한민국'),
    ('jp', '일본'),
)

class AddressForm(Form):
    email     = CharField(
        widget = TextInput(
            attrs = {'placeholder': 'Email-Address'}
        )
    )
    password  = CharField(
        widget = PasswordInput()
    )
    address_1 = CharField(
        label  = 'Address',
        widget = TextInput(
            attrs={'placeholder': '1234 Main St'}
        )
    )
    address_2 = CharField(
        widget = TextInput(
            attrs={'placeholder': 'Apartment'}
        )
    )
    city         = CharField()
    state        = ChoiceField(choices = STATES)
    zip_code     = CharField(label = 'Zip')
    check_me_out = BooleanField(required = False)
```
django 에서 지원하는 `Form(), CharField(), TextInput(), PasswordInput(), ChoiceField(), BooleanField()`  객체를 사용하여 `input-tag` 를 생성합니다. 기타 `DecimalField(), DateTimeField() , DateField(), SelectDateWidget(), ComboField()` 함수들도 사용 가능합니다.

### ./app/views.py
```python
from .form import AddressForm

def address_form(request):
    form = AddressForm()
    content = { 'form' : form }
    return render(request, 'foods/address.html', content)
```

### ./app/urls.py
```python
from .views import address_form

app_name = 'app'
urlpatterns = [
    path('address/', address_form, name='address'),
]
```

### ./app/templates/app/address.html
```html
<form method="post">
  { % csrf_token % }
  <table>{ { form.as_table } }</table>
<button type="submit">제출하기</button>
</form>
```

<br/>
# Crispy_Forms 만들기

## BootStrap4 기본스타일 적용
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/form2.png">
  <figcaption></figcaption>
</figure> 
django form 함수로 생성한 객체들을 template 에서 `{ { form|crispy } }` 만 사용하면 기본 스타일로 랜더링 합니다.

### ./app/templates/app/address.html
```html
{ % load crispy_forms_tags % }
<form method="post">
  { % csrf_token % }
  { { form|crispy } }
<button type="submit" class="btn btn-primary">제출하기</button>
</form>
```

## 사용자 정의 스타일 적용하기
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/form3.png">
  <figcaption></figcaption>
</figure> 
기본 스타일은 label과 form 을 **개별 line으로** 처리를 합니다. 다음의 내용을 활용하면 form의 스타일을 정의할 수 있습니다

### ./app/template/address.html  
```html
{ % load crispy_forms_tags % }
<body>
<form method="post">
  { % csrf_token % }

  <div class="form-row">
    <div class="form-group col-md-6 mb-0">
      { { form.email|as_crispy_field } }
    </div>
    <div class="form-group col-md-6 mb-0">
      { { form.password|as_crispy_field } }
    </div>
  </div>

  <div class="form-row">
    <div class="form-group col-md-6 mb-0">
      { { form.address_1|as_crispy_field } }
    </div>
    <div class="form-group col-md-6 mb-0">
      { { form.address_2|as_crispy_field } }
    </div>
  </div>

  <div class="form-row">
    <div class="form-group col-md-4 mb-0">
      { { form.city|as_crispy_field } }
    </div>
    <div class="form-group col-md-4 mb-0">
      { { form.state|as_crispy_field } }
    </div>
    <div class="form-group col-md-4 mb-0">
      { { form.zip_code|as_crispy_field } }
    </div>
  </div>
  
  { { form.check_me_out|as_crispy_field } }
  <button type="submit" class="btn btn-primary">제출</button>
</form>
</html>
```

<br/>
# Crispy_Forms 스타일 함수 만들기

## 스타일 추가하기
```python
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Row, Column

class AddressForm(Form):
    email     = CharField()
    ... 

class CustomCheckbox(Field):
    template = 'app/custom_checkbox.html'

# 위에서 선언한 form 객체에 스타일을 추가합니다
class CustomFieldForm(AddressForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Row(
                Column('email', css_class='form-group col-md-6 mb-0'),
                Column('password', css_class='form-group col-md-6 mb-0'),
                css_class='form-row'
            ),
            Row(
                Column('address_1', css_class='form-group col-md-6 mb-0'),
                Column('address_2', css_class='form-group col-md-6 mb-0'),
                css_class='form-row'
            ),
            Row(
                Column('city', css_class='form-group col-md-6 mb-0'),
                Column('state', css_class='form-group col-md-4 mb-0'),
                Column('zip_code', css_class='form-group col-md-2 mb-0'),
                css_class='form-row'
            ),
            CustomCheckbox('check_me_out'),  # 체크박스를 삽입합니다
            Submit('submit', '제출')
        )
```
### app/custom_checkbox.html
위에서 추가할 `check_box` 템플릿을 정의합니다. 하지만 실제로는 번거롭기 때문에 예제중 하나로 살펴봅니다.
```html
{ % load crispy_forms_field % }
<div class="form-group">
  <div class="custom-control custom-checkbox">
    { % crispy_field field 'class' 'custom-control-input' % }
    <label class="custom-control-label" for="{ { field.id_for_label } }">
    { { field.label } }</label>
  </div>
</div>
```
위와같이 별도의 클래스 객체에서 스타일을 추가할 수도 있지만, 아래와 같이 1개의 클래스 객체에서 `CSS` 스타일을 정의할 수 있습니다. 
```python
class AddressForm(Form):
    email = CharField(
        widget = TextInput(
            attrs = {'placeholder': 'Email'}))
    password = CharField(
        widget = PasswordInput()
        )
    address_1 = CharField(
        label = 'Address',
        widget = TextInput(
            attrs = {'placeholder': '1234 Main St'}))
    address_2 = CharField(
        widget = TextInput(
            attrs = {'placeholder': 'Apartment, studio, or floor'}))
    city     = CharField()
    state    = ChoiceField(choices = STATES)
    zip_code = CharField(label = 'Zip')
    check_me_out = BooleanField(required = False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Row(
                Column('email', css_class = 'form-group col-md-6 mb-0'),
                Column('password', css_class = 'form-group col-md-6 mb-0'),
                css_class = 'form-row'
            ),
            Row(
                Column('address_1', css_class='form-group col-md-6 mb-0'),
                Column('address_2', css_class='form-group col-md-6 mb-0'),
                css_class='form-row'
            ),
            Row(
                Column('city', css_class='form-group col-md-4 mb-0'),
                Column('state', css_class='form-group col-md-4 mb-0'),
                Column('zip_code', css_class='form-group col-md-4 mb-0'),
                css_class='form-row'
            ),'check_me_out',
            Submit('submit', '제출하기')
        )
```

## View 함수를 Generic View 활용하기
### ./app/views.py
앞에서는 다음과 같이 `render()` 함수를 사용하여 템플릿을 구현하였습니다. 
```python
from .form import AddressForm

def address_form(request):
    form = AddressForm()
    content = { 'form' : form }
    return render(request, 'foods/address.html', content)
```
하지만 내용이 번거롭고 정돈되지 않은 모습들을 보완하기 위해 Django 에서 지원하는 Generic view 중에 하나인 `FormView` 를 활용하고, Form 입력이 완료된 경우에는 `reverse_lazy()` 함수를 사용하여 `name='success'` url을 출력합니다.
```python
from django.urls import reverse_lazy
from django.views.generic import FormView, DeleteViewTemplateView

class CrispyAddressFormView(FormView):
    form_class = AddressForm
    success_url = reverse_lazy('success')
    template_name = 'foods/address.html'

class SuccessView(TemplateView):
    template_name = 'success.html'
```

### ./app/urls.py
```python
urlpatterns = [
    ...
    path('success/', SuccessView.as_view(), name='success'),
]
```

### ./app/templates/success.html
```html 
<p class="text-success">Form 입력을 성공하였습니다!</p>
```

<br/>
# 참고 사이트
* [Source github](https://github.com/sibtc/advanced-crispy-forms-examples)
* [Django Form 개념설명](https://developer.mozilla.org/ko/docs/Learn/Server-side/Django/Forms)
* [초코몽키 Django form 예제](https://wayhome25.github.io/django/2017/05/06/django-form/)
* [원본 참고문서](https://simpleisbetterthancomplex.com/tutorial/2018/11/28/advanced-form-rendering-with-django-crispy-forms.html)<br/>
* django-filter [link](https://django-filter.readthedocs.io/en/master/)
* django-crispy-forms [link](https://django-crispy-forms.readthedocs.io/en/latest/install.html)
