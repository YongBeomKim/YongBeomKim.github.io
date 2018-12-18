---
title : Sample / JavaScript Chart in Django
last_modified_at: 2018-12-12T10:45:06-05:00
header:
  overlay_image: /assets/images/book/django-sample.jpg
categories:
  - chart
tags: 
    - django
    - apex
    - vue
toc: true 
---


[Highchart](https://simpleisbetterthancomplex.com/tutorial/2018/04/03/how-to-integrate-highcharts-js-with-django.html) 를 Django 에 연결하는 방법으로 **1 직렬연결, 2 Json 연결, 3 포맷연결, 4 Ajax 연결** 을 알아보겠습니다.

Ajax 연결은 Jquery를 사용하였지만, 추후 Vue.js 를 활용하는 방법까지  확장해 보겠습니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/photo/filter1.png">
  <caption>이 그래프를 3가지 방식으로 구현합니다</caption>
</figure> 

<br/>
# 1 직렬연결

django 의 **QuerySet** 데이터를 Template으로 **직렬연결하는 방법을** 살펴봅니다 <small>**다만 실무에서는 경직된 방법으로 추천하지 않습니다**</small>

### views.py
```python
from django.db.models import Count, Q
from django.shortcuts import render
from .models import Passenger

def index(request):
    dataset = Passenger.objects \
        .values('ticket_class') \
        .annotate(survived_count=Count('ticket_class', filter=Q(survived=True)),
                  not_survived_count=Count('ticket_class', filter=Q(survived=False))) \
        .order_by('ticket_class')
    return render(request, 'template.html', {'dataset': data})
```

필터링 결과, 다음과 같은 QuerySet을 출력하고, 템플릿 에서는 이를 직접 받아서 랜더링 합니다.

```python
[ {'ticket_class': 1, 'survived_count': 200, 'not_survived_count': 123},
  {'ticket_class': 2, 'survived_count': 119, 'not_survived_count': 158},
  {'ticket_class': 3, 'survived_count': 181, 'not_survived_count': 528}]
```

### template.html

**[highcharts](https://www.highcharts.com/)** 에서 요구하는 방식으로 개별 필드별 데이터를 입력합니다

```html
<div id="container"></div>

<script src="...highcharts.src.js"></script>
<script>
  Highcharts.chart('container', {
      chart: { type: 'column' },
      title: { text: 'Titanic Survivors'},
      xAxis: {
          categories: [
            { % for entry in dataset % }
                '{ {entry.ticket_class} } Class'
                { % if not forloop.last % }, { % endif % }
            { % endfor % }
        ]
      },
      series: [{
          name: 'Survived',
          data: [
            { % for entry in dataset % }
                { { entry.survived_count } }
                { % if not forloop.last % }, { % endif % }
            { % endfor % }
          ],color: 'green'
      }, {
          name: 'Not survived',
          data: [
            { % for entry in dataset % }
                { { entry.not_survived_count } }
                { % if not forloop.last % },{ % endif % }
            { % endfor % }
        ,color: 'red' } ]
  } );
</script>
```

<br/>
# 2 Json

**데이터를 Json** 으로 변환하여 출력합니다. 

### **views.py**

```python
def index(request):
    dataset = Passenger.objects...order_by('ticket_class')
    categories, survived_series, not_survived_series = list(), list(), list()
    for entry in dataset:
        categories.append('{} Class'.format(entry['ticket_class']) )
        survived_series.append( entry['survived_count'] )
        not_survived_series.append( entry['not_survived_count'] )

    return render(request, 'template.html', {
        'categories': json.dumps(categories),
        'survived_series': json.dumps(survived_series),
        'not_survived_series': json.dumps(not_survived_series) })
```

### **template.html**

큰 틀은 위와 동일하지만 별도의 for, if문 없이 간결하게 구현되는 모습을 볼 수 있다. **template 에서 호출할 때 주의할 점이** 있는데 **1. Integer / float** 정보는 **json 변환 데이터** 를 바로 사용하면 되지만, **2. String 이 포합된 을 json** 데이터는 **',"** 로 둘러싸여 있고 **Javascript**등에서 인식할 때 **Auto Escape** 되므로 꼭 **| safe 필터를** 사용 하여야 합니다

```html
<script>
Highcharts.chart('container', {
    chart: { type: 'column' },
    title: { text: 'Titanic Survivors' },
    xAxis: {
        categories: { { categories | safe } }
    },
    series: [{
        name: 'Survived',
        data: { { survived_series } },
        color: 'green'
    }, {
        name: 'Not survived',
        data: { { not_survived_series } },
        color: 'red'
    }]
});
</script>
```

<br/>
# 3 Json

**모든 설정내용을 서버에서 일원화** 하여 관리함으로서, 템플릿을 최대한 간단한 방식으로 제어 가능합니다.

```python
def index(request):

    dataset = Passenger.objects...order_by('ticket_class')
    categories, survived_series, not_survived_series = list(), list(), list()

    for entry in dataset:
        categories.append('{} Class'.format(entry['ticket_class']) )
 
        survived_series.append( entry['survived_count'] )
        not_survived_series.append(entry['not_survived_count'])

    survived_series = {
        'name': 'Survived', # label 에 표시되는 이름
        'data': survived_series,
        'color': 'purple'   # graph 시각화 색
    }
    not_survived_series = {
        'name': 'Not_Survived',
        'data': not_survived_series,
        'color': 'red'
    }
 
    # Chart 입력정보를 단일하게 정리합니다
    chart = {
        'chart' : {'type': 'column'},
        'title' : {'text': 'Titanic Survivors'},
        'xAxis' : {'categories': categories},
        'series': [survived_series, not_survived_series]
    }
    # 정리된 {dict} 데이터를 Json으로 변환하여 출력합니다
    data = json.dumps(chart)
    return render(request, 'template.html', {'chart': data})
```

### template.html

템플릿에서 간결한 방식으로 구현 함으로써, 복잡한 코드 라인에서도 django의  제어가 가능합니다.

```html
<script>
  Highcharts.chart('container', { { chart|safe } });
</script>
```

<br/>
# 3 Json & Ajax

실무에서 사용하는 방법으로 **별도의 Data Endpoint를** 설정하고, 여기의 자료를 비동기 방식으로 호출하여 템플릿 데이터를 구현합니다

### **views.py**

django 에서 지원하는 **JsonResponse()** 모듈을 활용하여 출력합니다. 앞에서 **Json()** 을 사용하는 것과 차이점은 출력이 단일한 객체로 일원화 됩니다.

```python
from django.http import JsonResponse

def index(request):
    dataset = Passenger.objects..
    chart = {
      .. 위와 동일합니다 ..
    }
    return JsonResponse(chart)

#  chart를 구현하는 url을 정의합니다
def data_api(request):
    return render(request, 'template.html')
```

### **urls.py**

```python
urlpatterns = [
    path('ticket-class', views.index),
    path('ticket-class/api', views.data_api, name='api'),
]
```

### **template.html**

html 템플릿 내부에 **[data-](https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/%EB%8D%B0%EC%9D%B4%ED%84%B0_%EC%86%8D%EC%84%B1_%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)속성은** 표준이 아닌 속성이나 추가적인 DOM 속성으로 의미론적 표준 HTML 요소에 **추가 정보를 저장할 수 있도록** 해줍니다.

```html
<div id="container" data-url="{ % url 'api' % }">
</div>

<script src="highcharts.src.js"></script>
<script src="jquery.min.js"></script>
<script>
  $.ajax({
    url: $("#container").attr("data-url"),
    dataType: 'json',
    success: function (data) {
      Highcharts.chart("container", data);
    }
  });
</script>
```

이와같은 방식을 사용하면 Django 와 Javascript 를 독립적으로 작성하여 운영하실 수 있습니다. 다른 ChartJs 등에서 활용하는 경우에도 위의 내용을 활용하면 쉽게 접근 가능합니다.