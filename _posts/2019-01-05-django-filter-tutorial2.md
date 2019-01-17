---
title : Tutorial / Django Filters
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

Django-filters는 View에 작성된 일반적인 코드를 계속 쓰는 부담을 덜어주는 일반적이고 재사용가능한 패키지로써 **모델의 필드를 기반으로 queryset을 필터링 함수** 들을 제공합니다. 이번 페이지는 공식문서를 정리한 블로그를 [(Blog)](http://brownbears.tistory.com/96) 바탕으로 수정 보완 하였습니다.

<br/>
# **Introduction**
아래의 예시들은 **Product** 라는 모델을 사용하여 **사용자의 list 페이지에 제품을 필터링** 하는 예시를 구현해 보겠습니다.

<br/>
# **The model**
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

<br/>
# **The filter**
### ./app/filters.py
사용자가 **release_date 또는 price 필드를** 기반으로 사용자에게 필터링하여 데이터를 보여주는 예입니다. 화면에는 `class Meta:` 선언필드들을 먼저 보여주고, `name` 필드는 그 다음에 출력 합니다.
```python
import django_filters

class ProductFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='iexact')
    class Meta:
        model = Product
        fields = ['price', 'release_date']
```
장고의 ModelForm에 매우 비슷한 API를 사용합니다. 그냥 ModelForm과 같이 우리는 또한 필터를 무시하거나 선언적 구문을 사용하여 새로운 것을 추가 할 수 있습니다.
{: .notice--info}

<br/>
# **Declaring filters**
### ./app/filters.py
filter를 정의하는 경우 **선언적인 구문은** 유연성이 있지만 **매우 자세하게 정의합니다.** 아래의 예시에서는 **FilterSet** 의 핵심 **filter argument** 에 대한 대략적인 예시를 보여줍니다
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

## filters 함수 주요한 2개의 argument가 있습니다.

### **<span style="color:blue">name =" "</span>** 
모델 필드의 이름을 필터링합니다. 관련있는 모델(ex, manufacturer__name -manufacturer는 models.py에서 foriegn key로 잡혀있기 때문에 가능) 필드를 장고의 __구문을 사용하여 "관계 경로(relationship paths)"를 통과 할 수 있습니다.

### **lookup_expr=" "** 
`lookup_expr` 조건문을 하용하여 조회필드를 정의 합니다. 장고에서  `__구문` 은 조회된 결과의 조건에 대한 변환을 지원 합니다. (ex, year **__gte**)

필드에서 name과 lookup_expr은 완벽한 Django 검색 표현을 나타냅니다. 검색 표현의 상세한 설명은 해당 lookup reference에서 제공하고 있습니다. django-filters 는 transforms과 Django 둘 다 지원합니다.

<br/>
# Common declarative problems

다음은 필터를 선언 할 때 발생하는 일반적인 문제 중 일부입니다. 필터가 어떻게 작동하는지에 대한 방법을 제공하기 때문에 읽어보는 것을 추천합니다.
Filter name and lookup_expr not configured

name과 lookup_expr은 선택사항이지만 이 것들은 지정하는 것이 좋습니다. 기본적으로 name을 지정하지 않으면 filterset 클래스는 필터의 이름으로 사용됩니다. 추가적으로 lookup_expr은 기본값으로 exact 값이 들어갑니다. 다음은 잘못 가격 필터의 예입니다 :

Produce.objects.filter(price__gt__exact=value)

위의 코드는 FieldError를 발생시키기 때문에 아래와 같이 바꿔줍니다.

class ProductFilter(django_filters.FilterSet):
    price__gt = django_filters.NumberFilter(name='price', lookup_expr='gt')

Missing lookup_expr for text searcg filters

CharField 및 TextField에 대한 조회 표현을 설정하고 왜 "foo"를 검색했을 때 "foobar"를 결과로 반환하지 않는 것에 대한 이유를 궁금해하는 것을 잊지하는 것은 매우 일반적입니다. 이것은 기본 검색 타입이 exact이기 때문입니다, 하지만 사용자는 icontains 조회를 원할 수도 있습니다.
Filter and lookup expression mismatch (in, range, isnull)

일부 조회 값의 종류를 예상한대로 직접적으로 모델 필드의 타입인 필터와 일치하는 것이 적절한 아니다. 일반적으로 isnull, in 및 range 조회의 이슈로 볼 수 있습니다. 다음의 product 모델을 살펴 봅니다 :

class Product(models.Model):
    category = models.ForeignKey(Category, null=True)

주어진 category가 선택적임을 감안할 때, 분류되지 않은 제품에 대한 검색을 사용하려는 것이 합리적입니다. 다음은 잘못 구성된 isnull 필터입니다 :

class ProductFilter(django_filters.FilterSet):
    uncategorized = django_filters.NumberFilter(name='category', lookup_expr='isnull')

category를 위한 컬럼타입은 integer이지만 isnull 조회는 boolean값을 기대합니다. 위 코드의 NumberFilter는 오직 숫자만 확인할 수 있습니다. 필터는 'expression aware'을 하지 않으며 lookup_expr에 기반하여 동작을 변경하지 않습니다. 사용자는 데이터 타입의 기본 모델필드를 사용하는 대신에 모델 필드 조회 조건의 데이터 타입이 맞는 필터를 사용해야 합니다.

아래는 카테고리가 된 것과 카테고리가 되지 않는 제품에 대한 조회를 나타내는 예시입니다.

class NumberInFilter(django_filters.BaseInFilter, django_filters.NumberFilter):
    pass

class ProductFilter(django_filters.FilterSet):
    categories = NumberInFilter(name='category', lookup_expr='in')
    uncategorized = django_filters.BooleanFilter(name='category', lookup_expr='isnull')

More info on constructing IN and RANGE csv filters.
Generating filters with Meta.fields

 

FilterSet 메타 클래스는 중요한 코드 중복 없이 쉽게 여러 개의 필터를 지정할 수 있는 fields속성을 제공합니다. 기본 구문은 여러 필드 이름 목록을 지원합니다 :

import django_filters

class ProductFilter(django_filters.FilterSet):
    class Meta:
        model = Product
        fields = ['price', 'release_date']

위의 코드는 'price'와 'release_date'필드 모두에 대해 'exact' 조회를 발생시킵니다. 또한 dictionary는 각 필드에 대해 복수의 조회 조건을 구현할 수 있습니다.

import django_filters

class ProductFilter(django_filters.FilterSet):
    class Meta:
        model = Product
        fields = {
            'price': ['lt', 'gt'],
            'release_date': ['exact', 'year__gt'],
        }

위 코드는 'price_lt', 'price_gt', 'release_date'와 'release_date__year__gt' 필터를 생성합니다.

필터 조회 타입은 'exact'가 기본이여서 필터의 이름에 추가되지 않습니다.

위의 예에서, 출시 날짜의 정확한 필터는 'RELEASE_DATE'가 아닌 'release_date__exact'입니다.

Meta 클래스의 fields 순서에 있는 항목은 관련 모델에 필드를 필터링하는 장고의 __ 구문을 사용하여 "relationship paths(관계 경로)"를 포함 할 수있습니다 :

class ProductFilter(django_filters.FilterSet):
    class Meta:
        model = Product
        fields = ['manufacturer__country']

Overriding default filters

django.contrib.admin.ModelAdmin와 마찬가지로, filter_overrides를 사용하여 같은 종류의 모든 모델 필터를 위해 기본 필터를 오버라이드 하는 것은 가능합니다. 

class ProductFilter(django_filters.FilterSet):
    filter_overrides = {
        models.CharField: {
            'filter_class': django_filters.CharFilter,
            'extra': lambda f: {
                'lookup_expr': 'icontains',
            },
        },
        models.BooleanField: {
            'filter_class': django_filters.BooleanFilter,
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

Customize filtering with Filter.method
 

사용자는 필터링을 수행하는 method을 지정하여 필터의 동작을 제어 할 수있습니다. method reference에 자세한 내용을 확인할 수 있습니다.

class F(django_filters.FilterSet):
    username = CharFilter(method='my_custom_filter')

    class Meta:
        model = User
        fields = ['username']

    def my_custom_filter(self, queryset, name, value):
        return queryset.filter(**{
            name: value,
        })

The view

-----준비중------
The URL conf

-----준비중------
The template

-----준비중------
Generic view & configuration

-----준비중------


참조문서: https://django-filter.readthedocs.io/en/latest/usage.html#using-django-filter