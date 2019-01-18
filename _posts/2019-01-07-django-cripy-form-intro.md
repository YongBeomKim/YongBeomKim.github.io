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

앞에서 `django-filters` 내용을 통해서 다양한 조건문을 구현해 봤습니다. 검색용 html5 form 객체를 다루기 위해서 `django-tweaks` 모듈을 사용하여 추가적인 랜터링 작업으로 스타일을 추가했습니다.

하지만 단점으로는 RangeDate() 등의 함수, **FilterSet** 의 `class Meta:` 를 사용한 다양한 **django Lookup Expr** 을 사용한 파생조건문으로 생성된 Html 태그들의 스타일 정리를 위해선 개별적인 속성내용을 확인한 뒤 이를 일치시킨 뒤에야 변경이 가능하는 등의 난이도가 존재합니다.

form 객체를 다루기 용이하도록 도와주는 package 로써 `django-crispy-forms` 이 유명합니다. 이번 페이지 에서는 `django form` 객체의 기본에서 부터 `django-crispy-forms` 을 사용한 스타일 지정까지를 정리해 보겠습니다. [참고문서](https://simpleisbetterthancomplex.com/tutorial/2018/11/28/advanced-form-rendering-with-django-crispy-forms.html)

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/django_form.png">
  <figcaption></figcaption>
</figure> 
 
# Install

> **$ pip install --upgrade django-crispy-forms**

```python
# settings.py
INSTALLED_APPS = [
    'crispy_forms',
]

CRISPY_TEMPLATE_PACK = 'bootstrap3'
# CRISPY_TEMPLATE_PACK = 'uni_form'
```
**CRISPY_TEMPLATE_PACK :** 템플릿 랜더링시 스타일 모듈을 지정할 수 있다. 지원되는 포맷으로는 **"uni-form", "bootstrap3", "bootstrap4"(Alpha버젼)** 이 있다
{: .notice--info}



<br/>
# 참고 사이트
* django-filter [link](https://django-filter.readthedocs.io/en/master/)
* django-crispy-forms [link](https://django-crispy-forms.readthedocs.io/en/latest/install.html)
