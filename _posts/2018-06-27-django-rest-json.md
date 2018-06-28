---
title : Django multi JSON to Chart.JS
last_modified_at: 2018-06-27T20:45:06-05:00
header:
  overlay_image: /assets/images/book/chartjs.png
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
def get_data(request, *args, **kwargs):

    title  = 'World population per region (in millions)'

    labels = [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050]

    items = [{ "data" : [86, 114, 106, 106, 107, 111, 133, 221, 783, 278],
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
**Intex.html 템플릿 코드**
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