---
title : Tutorial / django-crispy-forms
last_modified_at: 2019-01-07T10:45:06-05:00
header:
  overlay_image: /assets/images/book/django_pro.png
categories:
  - django
tags: 
    - django
    - python
toc: true 
---

* django-filter [link](https://django-filter.readthedocs.io/en/master/)
* django-crispy-forms [link](https://django-crispy-forms.readthedocs.io/en/latest/install.html)

 
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

