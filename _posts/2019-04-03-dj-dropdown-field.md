---
title : Django dropdown field
last_modified_at: 2019-04-06T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django.jpg
categories:
  - django
tags: 
    - form
    - bootstrap
toc: true 
---

**CreateView** 에서 **[Chained Dropdown List](https://simpleisbetterthancomplex.com/tutorial/2018/01/29/how-to-implement-dependent-or-chained-dropdown-list-with-django.html)** 내용을 정리해 보겠습니다. [예제Site](https://dependent-dropdown-example.herokuapp.com) 

**models.CharField(choices=CHOICE)** 를 활용하면, 첫째로 실제 구현을 위해서는 JQuery 의 AutoComplete 등의 다양한 언어간의 혼합으로 복잡해 지는 점과, 둘째로는 모델이 변경되면 내부 소스코드를 수정해야 한다는 점에 있어서 완결성과 안정성을 해치게 됩니다.

## models.py
아래의 예시는 국가와 해당 수도의 종속관계 입니다. 모델에는 기준이 되는 필드를 1개만 갖습니다. 현재 작업중 모델내 중 분류를 GenericForm 에서 활용 하려다 어려움을 격어서 방법을 찾던 중 입니다.

```python
from django.db import models

class Country(models.Model):
    name = models.CharField(max_length=30)
    def __str__(self):
        return self.name

class City(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    def __str__(self):
        return self.name

class Person(models.Model):
    name = models.CharField(max_length=100)
    birthdate = models.DateField(null=True, blank=True)
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True)
    def __str__(self):
        return self.name
```

## forms.py
다양한 조건을 만족하는 기능을 구현하기 위해서는, Django 의 Form 객체를 활용하는 방법이 가장 유리합니다.

```python
from django import forms
from .models import Person, City

class PersonForm(forms.ModelForm):
    class Meta:
        model = Person
        fields = ('name', 'birthdate', 'country', 'city')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['city'].queryset = City.objects.none()
```

## views.py
View 에서는 GenericView를 최대한 활용하여 구조적 안정성을 높입니다.

```python
from django.views.generic import ListView, CreateView, UpdateView
from django.urls import reverse_lazy
from .models import Person

class PersonListView(ListView):
    model = Person
    context_object_name = 'people'

class PersonCreateView(CreateView):
    model = Person
    form_class = PersonForm
    success_url = reverse_lazy('change')

class PersonUpdateView(UpdateView):
    model = Person
    form_class = PersonForm
    success_url = reverse_lazy('change')

# AJAX 방식으로 데이터를 불러오는 함수를 정의 합니다
def load_cities(request):
    country_id = request.GET.get('country')
    cities  = City.objects.filter(
        country_id = country_id).order_by('name')
    content = {'cities': cities}
    return render(request, 'dropdown_list.html', content)
```


## urls.py
```python
from django.urls import path
from .views import PersonListView,\
  PersonCreateView, PersonUpdateView, load_cities

urlpatterns = [
    path('', PersonListView.as_view(), name='change'),
    path('add/', PersonCreateView.as_view(), name='add'),
    path('<int:pk>/', PersonUpdateView.as_view(), name='change'),
    path('ajax/load-cities/', load_cities, name='ajax'),
]
```

## Template

{% raw %}
```html
{% extends 'base.html' %}

{% block content %}
  <h2>Person Form</h2>
  <form method="post" novalidate>
    {% csrf_token %}
    <table>
      {{ form.as_table }}
    </table>
    <button type="submit">Save</button>
    <a href="{% url 'change' %}">Nevermind</a>
  </form>
{% endblock %}
```
{% endraw %}
