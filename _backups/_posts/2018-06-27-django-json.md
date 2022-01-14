---
title : Django JSON
last_modified_at: 2018-06-27T10:45:06-05:00
header:
  overlay_image: /assets/images/book/chartjs.jpg
categories:
  - js
tags: 
    - json
    - django
toc: true 
---


# Django Chart js Setting

[github](https://github.com/codingforentrepreneurs/Django-Chart.js), [project Web](https://www.codingforentrepreneurs.com/projects/), [YouTube](https://www.youtube.com/channel/UCWEHue8kksIaktO8KTTN_zg)

<iframe width="560" height="315" src="https://www.youtube.com/embed/B4Vmm3yZPgc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

**CodingEntrepreneurs** Django 초창기 부터 관심있게 봤었지만 이해를 하지 못해서 저장만 해 두고 있다가 이번에 시험해본 결과 가장 깔끔하고 다양한 반응형 결과를 제공하는 것을 볼 수 있었다.
{: .notice--info}


<br>
## Chart js CDN 

<small>[다운로드](https://github.com/chartjs/Chart.js/releases)</small>
`https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js`


<br>
## base.html

<br>
**CSS JS**

```html
<head>
    { % include 'base/css.html' % }
</head>
```

**include** HTML 템플릿 사이에 `{ % include % }` 를 통해서 설정 내용을 별도의 파일로써 관리하고 이를 추가하는 방식을 사용한다
{: .notice--info}

<br>
**jQuery**

```html
{ % include 'base/js.html' % }
<script>
$(document).ready(function(){
    { % block jquery % }
    { % endblock % }
})    
</script>
```

**script** 페이지별 각기 다른 jquery 내용을 추가하는데 있어서 반복을 줄이기 위해서 **jquery** 블록을 사용한다 <strike>jquery 이름은 사용자에 따라서 자유롭게 정의 가능하다</strike>
{: .notice--info}


<br>
# Chart js 의 **JSON 구조**를 설계한다

<br>
## mysite 에서 APP의 추가

**urls.py**
`re_path(r'^chartjs/', include('chartjs.urls', namespace='chartjs')),`

**settings.py**
`INSTALLED_APPS = ['chartjs',]`


<br>
## Chart Js 의 **views.py**

```python
from django.shortcuts import render
from django.http import JsonResponse

def index(request, *args, **kwargs):
    return render(request, 'chartjs/index.html', { })

def get_data(request, *args, **kwargs):
    data = {"sales":100, "customers":10,}
    return JsonResponse(data)
```

기본 **index.html**를 구현하고, **get_data** 은 **JSON** 만 출력한다(템플릿 **X**)
{: .notice--info}

<br>
## Chart Js 의 **urls.py**

```python
from django.urls import re_path
from .views import index, get_data

app_name="chartjs"
urlpatterns = [
    re_path(r'^$',          index,    name='index'),
    re_path(r'^api/data/$', get_data, name='api-data'),
]
```

**/api/data** 를 통해서 **JSON API**를 구현한다
{: .notice--info}

<br>
## Chart Js 의 **index.html**

```javascript
{ % block jquery % }
var endpoint = 'api/data/'

$.ajax({
    method: "GET",
    url: endpoint,
    success: function(data){
        console.log(data.customers * 1234)
    },
    error: function(error_data){
        console.log("error")
        console.log(error_data)
    }
})
{ % endblock jquery % }

{ % block content % }
    <div class="col-sm-12" url-endpoint='{ % url "chartjs:api-data" % }'>
        <h1>Hello World</h1>
    </div>
{ % endblock % }
```

위의 Ajax 결과값은 **Console**로 출력된다

1. **endpoint** : **url** 내부 객체간 연결을 한다
2. var **endpoint** = 'api/data/'
    1. '/api/data/' : **절대좌표**를 활용
    2. 'api/data/'  : 서버기준 **상대좌표**를 활용 
3. console.**log**(data)
    1. data : 객체 **Json** 을 출력 `ex) {"sales":100, "customers":10,}`
    2. data.customers : **Json**의 **Key**의 value를 출력 `ex) 10(integer)`


<br>
# Chart js 의 **JSON**를 추가한다

## **views.py**

```python
from django.shortcuts import render
from django.http import JsonResponse

def index(request, *args, **kwargs):
    return render(request, 'chartjs/index.html', {"customers":22})

def get_data(request, *args, **kwargs):
    data = {"sales":100, "customers":10,}
    return JsonResponse(data)
```


<br>
## **index.html**
**
```javascript
var endpoint = 'api/data/'
var customerData = parseInt("{ { customers } }")
$.ajax( { 
    method : "GET",
    } )
```

`{ { customers } }` **Django**객체를 **jQuery**로도 받지만, 모든 객체를 'String'으로 받으므로 숫자는 **parseInt()** 로 변환하는 번거로움이 존재한다
{: .notice--info}