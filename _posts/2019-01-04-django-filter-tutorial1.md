---
title : Tutorial / Django Filter
last_modified_at: 2018-12-15T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django-filter.png
categories:
  - django
tags: 
    - django
    - filter
    - vue
toc: true 
---

웹에서 데이터를 표현하는 방법으로 **Table** 과 **Graph** 두가지 방법을 주로 사용합니다. django 내부에도 기본 Create, Read, Update, Delete 기능에 추가적 조건설정이 가능한 LookUp함수를 제공합니다.[My Blog](https://yongbeomkim.github.io/django/django-filter-orm-basic/)

이를 사용하는 경우에는 목록출력 함수, 개별 조건에 맞춰 작동하는 함수, 결과물을 출력하는 개별 함수들과 각각의 탬플릿을 필요로 합니다. 간단한 조건에도 복잡한 조건문을 필요로 합니다.

이를 간단하게 도와주는 패캐지로 `django-filter` 가 있고 앞에서 간단한 예제를 살펴보았습니다. 하지만 앞의 예제만으로는 부족한 부분들이 있어서, 공식 Document의 내용을 정리해 보려고 합니다. [Document](https://django-filter.readthedocs.io/en/master/)


# 진행할 내용 간단정리

<br/>
# Install
```python
$ pip install django-filter

# settings.py
INSTALLED_APPS = [
    ...
    'django_filters',
]
```

<br/>
# Model and Filter
### ./app/models.py
```python
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField()
    description = models.TextField()
    release_date = models.DateField()
    manufacturer = models.ForeignKey(Manufacturer)
```

### ./apps/filter.py
```python
import django_filters
from django_filters import FilterSet, DateFromToRangeFilter
from .models import Foods


class FoodFilter(FilterSet):
    # 사용자 정의 필터를 추가합니다
    food_date = DateFromToRangeFilter() 

    class Meta:
        model = Foods
        # Lookup 함수로, 파생필터를 정의합니다
        fields = {
            'food_date': ['exact', 'year__gt'],
            'item':['exact'],
            'sort': ['exact'],
            'section': ['exact'],
            'price': ['lt', 'gt'],
        }
        order_by = ('-food_date',)

    # filter 최초 출력값 없이 실행
    # https://stackoverflow.com/questions/30211058/empty-result-list-on-django-filter-page-startup
    def __init__(self, *args, **kwargs):
        super(FoodFilter, self).__init__(*args, **kwargs)

        # 초기값을 특정합니다
        self.form.initial['Item'] = "쌀"
        # at sturtup user doen't push Submit button, and QueryDict (in data) is empty
        if self.data == {}:
            self.queryset = self.queryset.none()
```