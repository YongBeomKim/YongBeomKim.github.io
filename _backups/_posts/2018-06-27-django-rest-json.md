---
title : Django multi JSON to Chart.JS
last_modified_at: 2018-06-27T20:45:06-05:00
header:
  overlay_image: /assets/images/book/chartjs.jpg
categories:
  - js
tags: 
    - js
    - chartjs
    - django
toc: true 
---


# Multi JSON &nbsp;&nbsp; to &nbsp;&nbsp; Chart JS

<small>**Multi Json**을 **Django** 에서 활용하기</small> 


<iframe width="560" height="315" src="https://www.youtube.com/embed/9N6a-VLBa2I" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


**Multi Json** 객체는 **Python** 의 **`{ dict }`** 객체를 활용하면 쉽게 구현 가능하다. 개별 Data 또는 Array 객체를 **'Key'** 값에 따라 개별 정의를 한 뒤, **JavaScript** 에서 **`객체.Key이름`** 을 사용하면 개별 **'Key'**값에 해당하는 **value** 들을 추출 가능하다 


<br>
## 원본 Template

```javascript
new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
    labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
    datasets: [
      { data: [86,114,106,106,107,111,133,221,783,2478],
        label: "Africa",
        borderColor: "#3e95cd",
        fill: false }, ] },
  options: {
    title: {
      display: true,
      text: 'World population per region (in millions)'
  } } } );
```


<br>
## **views.py**

```python
from django.http import JsonResponse

def get_data(request, *args, **kwargs):
    title  = 'World population per region (in millions)'
    labels = [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050]
    items  = [{ "data" : [86, 114, 106, 106, 107, 111, 133, 221, 783, 278],
               "label" : "Africa",
               "borderColor" : "#3e95cd",
               "fill" : False},

            { "data" : [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
              "label" : "Asia",
              "borderColor" : "#8e5ea2",
              "fill" : False}, ]

    data = { "title" : title, 
             "labels": labels,
             "items" : items }

    return JsonResponse(data, safe=False)
```

**safe=False** 은 { dict } 이외의 객체를 직렬화 할때 사용한다. 이를 사용하지 않으면 **TypeError**를 출력한다 [Master Django : **Core 822p**]
{: .notice--info}


<br>
## **urls.py**

`re_path(r'^api/$', get_data, name='api-data'),`


<br>
## **Template**

<br>
**Intex.html 템플릿 코드** <br>
`<canvas id="line-chart" height="100"></canvas>`

<br>
**jQuery** 에서는 **AjAX** 를 통과한, **data** 객체를 전달받는다

```javascript
var endpoint = 'api/'
$.ajax({
    
    method : "GET",
    url    : endpoint,
    
    success: function(data){
    new Chart(document.getElementById("line-chart"), {
      type: 'line',
      data: { labels   : data.labels,
              datasets : data.items
      },
      options : {
        title : {
          display : true,
          text    : data.title }
    } } ); },
    
    error: function(error_data){
        console.log("error")
        console.log(error_data) } } )
```
