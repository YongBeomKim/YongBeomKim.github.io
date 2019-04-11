---
title : Django Filter / django_filter 예제
last_modified_at: 2019-01-03T17:45:06-05:00
header:
  overlay_image: /assets/images/book/django-sample.jpg
categories:
  - django
tags: 
    - django
    - python
toc: true 
---


**How to Filter QuerySets Dynamically** [site](https://simpleisbetterthancomplex.com/tutorial/2016/11/28/how-to-filter-querysets-dynamically.html) 의 내용을 정리해 보았습니다. **Django 2.0** 에 맞게, 그리고 Project에 추가할 때는 어떻게 해야하는지를 실습하면서 그 내용을 정리해 보고자 합니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/photo/filter6.png">
</figure> 

정리하면서 여러책을 뒤척이다 보니 진도가 더디어서 무척 힘들었습니다. **기본은 완성되었다는 자신감** 속에서 **필요한 예제들로 작은 Project를 여럿 완성하면서** Upgrade 를 해 나아가는 방향으로 진행하는 방법을 추천합니다.

<br/>
# **1 Basic Tutorial** 

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/photo/filter1.png">
</figure> 

### **models.py**

`from django.contrib.auth.models import User` **사용자 정보 Table** 을 사용합니다 

### **filters.py**

필터와 연동하는 **Queryset 필터링 캐시**를 정의합니다

```python
from django.contrib.auth.models import User
from django_filters import FilterSet

class UserFilter(FilterSet):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', ]
```
**fields =** 에서 **filter** 단수명 오타를 주의하자
{: .notice--info}


### **views.py**

1. **user_list : 데이터베이스 인스턴스**를 생성합니다
2. **user_filter : 필터링 캐시**를 생성합니다

```python
from django.contrib.auth.models import User
from django.shortcuts import render
from .filters import UserFilter

def search(request):
    user_list = User.objects.all()
    user_filter = UserFilter(request.GET, queryset=user_list)
    return render(request, 'app이름/template.html', {'filter': user_filter})
```

### **app/template.html**

`filter` 로 검색용 폼을 생성하고, 연동 결과는 `filter.qs` 객체에서 호출 합니다. `.get_full_name` 파라미터는 `first_name` 과 `last_name` 필드값을 붙여서 출력합니다.

> **filter.qs**

`from django_filters import FilterSet` 에서 생성된 **기본 QuerySet** 을 호출합니다 [출처](https://django-filter.readthedocs.io/en/master/guide/usage.html#generic-view-configuration)

```html
<form class="" method="get">
  { { filter.form.as_p } }
  <button type="submit">검색</button>
</form>

<ul>
{ % for user in filter.qs  % }
  <li>{ {user.username} } - { {user.get_full_name} }</li>
{ % endfor % }
</ul>
```

<br/>
# **2 FilterView()** <small> : Generic View</small>

**urls.py** 에서 **Generic View** 를 사용하여 **inline 방식** 으로 검색용 캐시를 활용 가능합니다

### **urls.py**

```python
from django.urls import path
from django_filters.views import FilterView
from .filters import Userfilter

app_name = 'search'
urlpatterns = [
    path('', FilterView.as_view(
                filterset_class = Userfilter,
                template_name = 'search/user_list.html'),
         name = 'index')
]
```

<br/>
# **3 Filtering Functions**

> from **django_filters** import **FilterSet, CharFilter, NumberFilter** 

## **1) CharFilter()** <small> : String 검색용 필터</small>

> CharFilter(**lookup_expr** = 'icontains')

django 의 **filter(), exclude(), get(), Q()** 에서 제공하는 여러 **filter lookup 파라미터** 를 응용하는 다양한 검색조건을 제공합니다

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/photo/filter2.png">
</figure> 

### **filters.py**

`first_name` 필드에 **__icontains 인스턴스 검색조건** 을 추가 합니다

```python
from django_filters import FilterSet, CharFilter

class Userfilter_(FilterSet):
    first_name = CharFilter(lookup_expr='icontains')
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name']
```

## **2) NumberFilter()** <small> : Interger 검색용 필터</small>

> NumberFilter(**lookup_expr** = 'year')

숫자 데이터로 구성된 컬럼에서 Lookup_filter를 사용하도록 구현합니다 

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/photo/filter3.png">
</figure> 

### **filters.py**

```python
from django_filters import FilterSet, CharFilter, NumberFilter

class UserFilter(FilterSet):
    # first_name 필드의 일부검색
    first_name = CharFilter(lookup_expr = 'icontains')
    # lookup_expr = 'year' : 
    year_joined = NumberFilter(
                    name = 'date_joined', # 필터링 필드를 정의
                    lookup_expr = 'year'  # __year 필터를 사용 
                    )
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', ]
```

`date_joined = NumberFilter(lookup_expr='year')` 와 같이 1줄로도 처리 가능합니다. **한글필드명** 등 필드 이름을 변수 이름으로 바로 적용하기 곤란한 경우에 활용하면 유용합니다. 
{: .notice--info}

## **3) NumberFilter() Mixed**

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/photo/filter4.png">
</figure> 

### **filters.py**

```python
class UserFilter(FilterSet):

    first_name      = CharFilter(lookup_expr='icontains')
    year_joined     = NumberFilter(name='date_joined', lookup_expr='year')
    year_joined__gt = NumberFilter(name='date_joined', lookup_expr='year__gt')
    year_joined__lt = NumberFilter(name='date_joined', lookup_expr='year__lt')

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', ]
```

**lookup_expr='icontains'** 과 같이 **__** 를 제외한 상태로도 활용하지만, **lookup_expr='year__lt'** 처럼 메소드를 연결해서 구현할 때에는 **__**를 생략하지 못하는 경우도 있으므로 이점에 유의해야 합니다
{: .notice--info}


<br/>
# 4 **ModelMultipleChoiceFilter() <small>Filtering Options</small>**

> ModelMultipleChoiceFilter(**queryset** = Group.objects.all())

필드의 공통된 내용을 **CheckBox** 로 선택합니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/photo/filter5.png">
</figure> 

```python
from django.contrib.auth.models import User,Group
from django_filters import ModelMultipleChoiceFilter

class UserFilter(FilterSet):
    first_name = CharFilter(lookup_expr = 'icontains')
    year_joined = NumberFilter(name = 'date_joined', lookup_expr = 'year')
    groups = ModelMultipleChoiceFilter(
        queryset = Group.objects.all(),       # 필터링 데이터
        widget = forms.CheckboxSelectMultiple # 필터링 방법(CheckBox)
        )

    class Meta:
        model = User
        fields = ['username', 'year_joined', 'groups',]
```

<br/>
# **5 django-widget-tweaks <small>템플릿 구현하기</small>**

지금까지 **django form** 기본 스타일을 사용하여 **filter.form** 검색조건과, **filter.qs** 결과변수를 사용하여 템플릿을 구현 하였습니다. 

```html
<form class="" method="get">
  { { filter.form.as_p } }
  <button type="submit">검색</button>
</form>

<ul>
{ % for user in filter.qs  % }
  <li>{ {user.username} } - { {user.get_full_name} }</li>
{ % endfor % }
</ul>
```

## **1) django-widget-tweaks**

다양한 스타일을 적용하기 위해서 `django-widget-tweaks` 을 사용합니다

이 모듈은 템플릿의 폼 필드 렌더링을 조정합니다. 별도의 파이썬 코드를 사용하지 않고도 **CSS 클래스** 및 **HTML 속성 변경**을 지원합니다

> **$ pip install django-widget-tweaks**

```python
# settings.py
INSTALLED_APPS = [
    'widget_tweaks',
]
```

**django-widget-tweaks**을 활용하는 방법은 템플릿 내부에서 `{ % render_field % }` 을 통해서 스타일 내용을 추가합니다.

```html
{ % render_field % }

{ {filter.form.year_joined.label_tag} }
{ % render_field  filter.form.year_joined  class="form-control" % }
```

## **2) Bootstrap Glyphicons**

[부트스트랩(twitter)](https://getbootstrap.com/docs/3.3/getting-started/) 에서 [Glyphicons](https://stackoverflow.com/questions/19608873/how-to-include-glyphicons-in-bootstrap-3) 등을 적용하기 위한 설정방법을 정리해 보겠습니다. <small>(버전 4도 있지만 오래된 예제들도 적용 가능하도록 3.3.7로 정리했습니다)</small>

[Bootstrap 3.7.7 다운로드](https://github.com/twbs/bootstrap/releases/download/v3.3.7/bootstrap-3.3.7-dist.zip) 에서 자료를 다운받습니다. 압축파일을 풀면 **css, fonts, js** 3개의 폴더가 생성됩니다. 이를 django 의 static 폴더 내부에 **3개의 폴더를 모두** 붙여 넣습니다.

> **css**      <-- Bootstrap.css 폴더 <br/> 
> **fonts**    <-- Bootstrap fonts 폴더 <br/>
> **js**       <-- Bootstrap JavaScript 폴더

```html
{ % load static % }
<link href="{ % static 'css/bootstrap.css' % }" rel="stylesheet" media="screen" />
```

`bootstrap.min.css` 은 3.3.6 같은 경우에도 잘 작동하지만 3.3.7은 제대로 읽지를 못해서 `bootstrap.css` 을 사용합니다.
{: .notice--info}

위와같이 `bootstrap.min.css` 파일내부를 살펴보면 위와같이 CSS 1개의 파일만 불러와도 **CSS 내부에서 상대경로를** 사용하여 **fonts** 에 존재하는 **bootstrap Glyphicons** 폰트들을 활용할 수 있습니다

```css
// bootstrap.min.css
@font-face {
    font-family: 'Glyphicons Halflings';
    src: url(../fonts/glyphicons-halflings-regular.eot);
}
```

## **3) Bootstrap Glyphicons Template**

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/photo/filter6.png">
</figure> 

```html
<head>
  { % load static % }
  <link rel="stylesheet" href="{ % static 'css/bootstrap.min.css' % }" />
</head>

{ % load widget_tweaks % }
<form method="get"> 
  <div class="well">
    <h4 style="margin-top: 0">Filter</h4>
    <div class="row">
      <div class="form-group col-sm-4 col-md-3">
        { {filter.form.username.label_tag} }
        { % render_field filter.form.username class="form-control" % }
      </div>
      <div class="form-group col-sm-4 col-md-3">
        { {filter.form.first_name.label_tag} }
        { % render_field filter.form.first_name class="form-control" % }
      </div>
      <div class="form-group col-sm-4 col-md-3">
        { {filter.form.last_name.label_tag} }
        { % render_field filter.form.last_name class="form-control" % }
      </div>
      <div class="form-group col-sm-4 col-md-3">
        { {filter.form.year_joined.label_tag} }
        { % render_field filter.form.year_joined class="form-control" % }
      </div>
      <div class="form-group col-sm-8 col-md-6">
        { {filter.form.groups.label_tag} }
        <div>
          { % for choice in filter.form.groups % }
            <label class="checkbox-inline">
              { {choice.tag} } { {choice.choice_label} }
            </label>
          { % endfor % }
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">
      <span class="glyphicon glyphicon-search"></span> Search
    </button>
  </div>
</form>

<table class="table table-bordered">
  <thead>
    <tr>
      <th>아이디</th> <th>이름</th> <th>성</th>
      <th>가입일자</th> <th>그룹</th>
    </tr>
  </thead>
  <tbody>
    { % for user in filter.qs % }
      <tr>
        <td>{ {user.username} }</td>
        <td>{ {user.first_name} }</td>
        <td>{ {user.last_name} }</td>
        <td>{ {user.date_joined} }</td>
        <td>
          { % for group in user.groups.all % }
            { {group} }
          { % empty % }
            <em class="text-muted">No group</em>
          { % endfor % }
        </td>
      </tr>
    { % empty % }
      <tr>
        <td colspan="5">No data</td>
      </tr>
    { % endfor % }
  </tbody>
</table>
```
