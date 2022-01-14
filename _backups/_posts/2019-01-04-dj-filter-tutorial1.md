---
title : Django Filter / django_filter 튜토리얼
last_modified_at: 2018-01-04T10:45:06-05:00
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

**django-filters** 는 View에 작성된 일반적인 코드를 계속 쓰는 부담을 덜어주는 일반적이고 재사용가능한 패키지로써 **모델의 필드를 기반으로 queryset을 필터링 함수** 들을 제공합니다. 이번 페이지는 공식문서를 정리한 블로그를 [(Blog)](http://brownbears.tistory.com/96) 바탕으로 수정 보완 하였습니다.

<br/>
# **Introduction**
아래의 예시들은 **Product** 라는 모델을 사용하여 **사용자의 list 페이지에 제품을 필터링** 하는 예시를 구현해 보겠습니다.

<br/>
# Install & Setting
## Install
```python
$ pip install django-filter

# settings.py
INSTALLED_APPS = [
    ...
    'django_filters',
]
```

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

### ./app/filters.py
사용자가 **release_date 또는 price 필드를** 기반으로 사용자에게 필터링하여 데이터를 보여주는 예입니다. 화면에는 `class Meta:` 선언필드를 먼저 보여주고, `name` 필드는 그 다음에 출력 합니다.
```python
import django_filters
from django_filters import FilterSet, DateFromToRangeFilter
from .models import Foods

class FoodFilter(FilterSet):
    name = CharFilter(lookup_expr='iexact')
    food_date = DateFromToRangeFilter() 

    class Meta:
        model = Foods
        fields = {
            'food_date': ['exact', 'year__gt'],
            'item':['exact'],
            'sort': ['exact'],
            'section': ['exact'],
            'price': ['lt', 'gt'],
        }
        order_by = ('-food_date',)

    def __init__(self, *args, **kwargs):
        super(FoodFilter, self).__init__(*args, **kwargs)
        self.form.initial['Item'] = "쌀"
        if self.data == {}:
            self.queryset = self.queryset.none()

```
**필터링 클래스** 내부에 선언한 `__init__` 함수는 초기 설정 `if self.data = {}:` 조건문을 사용하여 제어를 합니다 [StackOverFlow](https://stackoverflow.com/questions/30211058/empty-result-list-on-django-filter-page-startup)
{: .notice--info}

<br/>
# **Filters 선언**
### ./app/filters.py
filter를 정의하는 경우 **선언적인 구문은** 유연성이 있지만 **매우 자세하게 정의합니다.** 아래의 예시에서는 **FilterSet** 의 핵심 **filter argument** 에 대한 대략적인 예시를 보여줍니다.
```python
from django_filters import FilterSet, NumberFilter, CharFilter

class ProductFilter(FilterSet):
    price        = NumberFilter()
    price__gt    = NumberFilter(name='price', lookup_expr='gt')
    price__lt    = NumberFilter(name='price', lookup_expr='lt')
    release_year = NumberFilter(name='pub_date', lookup_expr='year')
    release_year__gt   = NumberFilter(name='pub_date', lookup_expr='year__gt')
    release_year__lt   = NumberFilter(name='pub_date', lookup_expr='year__lt')
    manufacturer__name = CharFilter(lookup_expr='icontains')

    class Meta:
        model = Product
```

## filters 함수의 주요한 2개의 argument
### **<span style="color:red">name =" "</span>** 
**모델 필드의 이름을** 필터링합니다. 관련있는 모델 (ex, manufacturer__name -manufacturer는 models.py에서 foriegn key로 잡혀있기 때문에 가능) 필드를 장고의 **__구문을** 사용하여 **관계 경로(relationship paths)를** 통과 할 수 있습니다.

### **<span style="color:red">lookup_expr=" "</span>** 
`lookup_expr` 조건문을 하용하여 조회필드를 정의 합니다. 장고에서  `__구문` 은 조회된 결과의 조건에 대한 변환을 지원 합니다. (ex, year **__gte**)

필드에서 **name과 lookup_expr은** 완벽한 django 검색 표현을 나타냅니다. 검색 표현의 상세한 설명은 해당 **[lookup reference](https://yongbeomkim.github.io/django/django-filter-orm-basic/)** 에서 제공하고 있습니다.

<br/>
# **Common declarative problems**
필터를 선언 할 때 발생하는 일반적인 문제들을 정리해 보겠습니다

## Filter name and lookup_expr not configured

**name** 과 **lookup_expr** 는 선택사항 이지만 지정하는 것을 추천합니다. 
1. **name** 의 기본값은 **filterset 클래스 이름** 입니다
2. **lookup_expr** 의 기본값은 **exact** 입니다

```python
# 아래 코드는 FieldError를 발생합니다.
from .models import Produce
Produce.objects.filter(price__gt__exact=value)

# django-filters 를 사용하는 예시입니다
from django_filters import django_filters, NumberFilter
class ProductFilter(FilterSet):
    price__gt = NumberFilter(name='price', lookup_expr='gt')
```

## lookup_expr 사용시 NaN 값의 처리
기본 검색 타입은 **exact** 이지만. 사용자가 **icontains** 조회를 원할 수 있습니다. 하지만 일치하는 값이 없는경우 **isnull, in** 및 **range 조회의 이슈** 가 있습니다. 다음의 product 모델을 살펴 봅니다.

### ./app/models.py

```python
class Product(models.Model):
    category = models.ForeignKey(Category, null=True)
```

### ./app/filters.py
분류되지 않은 제품에 대해서도 검색을 사용하는 것이 합리적입니다. 다음의 예시는 **잘못 구성된 isnull** 필터의 예시입니다.

```python
from django_filters import FilterSet, NumberFilter
class ProductFilter(FilterSet):
    uncategorized = NumberFilter(name='category', lookup_expr='isnull')
```

**category** 의 컬럼타입이 **integer** 이지만 **isnull** 을 조회하면 **boolean** 을 출력합니다. (**NumberFilter** 는 오직 숫자만 확인 합니다.) 사용자는 필드와 동일한 모델필드를 사용하는 대신에 **조회 조건의 데이터 타입이 맞는 필터를** 사용합니다. 아래는 카테고리가 된 것과 카테고리가 되지 않는 제품에 대한 조회를 나타내는 예시입니다.

```python
from django_filters import FilterSet, BooleanFilter,\
                           BaseInFilter, NumberFilter

class NumberInFilter(BaseInFilter, NumberFilter):
    pass

class ProductFilter(FilterSet):
    categories    = NumberInFilter(name='category', lookup_expr='in')
    uncategorized = BooleanFilter(name='category', lookup_expr='isnull')
```

## Generating filters with Meta.fields
FilterSet의 **메타 클래스는** 중요한 코드 중복 없이 쉽게 여러 개 필터를 지정할 수 있는 fields 속성을 제공합니다.

```python
from django_filters import FilterSet

class ProductFilter(FilterSet):
    class Meta:
        model = Product
        fields = ['price', 'release_date']
```

위의 코드는 'price'와 'release_date'필드 모두에 대해 'exact' 조회를 발생시킵니다. 또한 dictionary는 각 필드에 대해 복수의 조회 조건을 구현할 수 있습니다.

```python
from django_filters import FilterSet

class ProductFilter(FilterSet):
    class Meta:
        model = Product
        fields = {
            'price': ['lt', 'gt'],
            'release_date': ['exact', 'year__gt'],
        }
```

위 코드는 **'price_lt', 'price_gt', 'release_date'와 'release_date__year__gt'** 검색필터를 생성합니다. **exact** 를 사용하는 경우에는 기본 설정값이므로 **필터의 이름에 추가되지 않습니다.** 위의 예시에서 출시 날짜의 정확한 필터는 'release_date' 가 아닌 **release_date__exact** 를 사용합니다.

```python
class ProductFilter(FilterSet):
    class Meta:
        model = Product
        fields = ['manufacturer__country']
```

**class Meta:** 클래스의 fields 순서에 있는 항목은 관련 모델에 필드를 필터링하는 장고의 __ 구문을 사용하여 "relationship paths(관계 경로)"를 포함 할 수있습니다.
{: .notice--info}

## 기본 필터의 내용을 Overriding

`django.contrib.admin.ModelAdmin` 와 마찬가지로, `filter_overrides` 를 사용하면 `models.py` 에서 선언한 같은 종류의 모델필터를 `django-filters` 의 기본필터로 오버라이드 합니다. 즉 동일한 모델선언 객체들을 동일한 조건을 적용하는 용도로 활용합니다.

```python
from django_filters import FilterSet, CharFilter,\
                             BooleanFilter 

class ProductFilter(FilterSet):
    filter_overrides = {
        models.CharField: {
            'filter_class': CharFilter,
            'extra': lambda f: {
                'lookup_expr': 'icontains',
            },
        },
        models.BooleanField: {
            'filter_class': BooleanFilter,
            'extra': lambda f: {
                'widget': 'forms.CheckboxInput',
            },
        },
    }

    class Meta:
        model = Product
        fields = {
            'name': ['exact'],
            'release_date': ['isnull'], 
        }
```

## Customize filtering with Filter.method
사용자는 필터링을 수행하는 method을 지정하여 필터의 동작을 제어 할 수 있습니다. method reference에 자세한 내용을 확인할 수 있습니다.

```python
class F(django_filters.FilterSet):
    username = CharFilter(method='my_custom_filter')

    class Meta:
        model = User
        fields = ['username']

    def my_custom_filter(self, queryset, name, value):
        return queryset.filter(**{
            name: value,
        })
```

# 참조문서
[django-filters 공식문서](https://django-filter.readthedocs.io/en/latest/usage.html#using-django-filter)<br/>
[공식문서 번역 블로그](http://brownbears.tistory.com/96)<br/>
