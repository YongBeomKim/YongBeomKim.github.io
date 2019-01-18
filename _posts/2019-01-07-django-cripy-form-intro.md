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
            attrs={
            'placeholder': 'Email-Address'}
        )
    )
    password  = CharField(
        widget = PasswordInput()
    )
    address_1 = CharField(
        label  = 'Address',
        widget = TextInput(
            attrs={
            'placeholder': '1234 Main St'
            }
        )
    )
    address_2 = CharField(
        widget = TextInput(
            attrs={
            'placeholder': 'Apartment, studio, or floor'
            }
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
# crispy_forms 만들기
### ./app/templates/app/address.html
```html
{ % load crispy_forms_tags % }
<form method="post">
  { % csrf_token % }
  { { form|crispy } }
<button type="submit" class="btn btn-primary">제출하기</button>
</form>
```


<br/>
# 참고 사이트
* [Django Form 개념설명](https://developer.mozilla.org/ko/docs/Learn/Server-side/Django/Forms)
* [초코몽키 Django form 예제](https://wayhome25.github.io/django/2017/05/06/django-form/)
* [원본 참고문서](https://simpleisbetterthancomplex.com/tutorial/2018/11/28/advanced-form-rendering-with-django-crispy-forms.html)<br/>
* django-filter [link](https://django-filter.readthedocs.io/en/master/)
* django-crispy-forms [link](https://django-crispy-forms.readthedocs.io/en/latest/install.html)
