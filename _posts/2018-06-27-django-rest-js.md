---
title : Django RestAPI to Chart.JS
last_modified_at: 2018-06-27T10:45:06-05:00
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


# RestAPI &nbsp;&nbsp; for &nbsp;&nbsp; Chart JS

[github](https://github.com/codingforentrepreneurs/Django-Chart.js), [project Web](https://www.codingforentrepreneurs.com/projects/), [YouTube](https://www.youtube.com/channel/UCWEHue8kksIaktO8KTTN_zg)

<iframe width="560" height="315" src="https://www.youtube.com/embed/B4Vmm3yZPgc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<br>
# Settings  And Chart.JS

<br>
## CDN 추가 

<small>[chart js CDN 다운로드](https://github.com/chartjs/Chart.js/releases)</small>

`https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js`


<br>
## chart Js 작동을 확인한다

<br>
<small>**Html 태그추가**</small>

`<canvas id="bar-chart" width="800" height="450"></canvas>`

<br>
<small>**chart Js 예제추가**</small>

```javascript
// Bar chart
new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [
        { label: "Population (millions)",
          backgroundColor: 
                ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,5267,734,784,433] } ]
    },
    options: {
        legend: { display: false },
        title : { 
            display: true,
            text : 'Predicted world population (millions) in 2050'}
        } } );
```


<br>
# from **Django** to **chart Js** 

Python 객체를 JavaScript에서 어떤 방식으로 해석하고 전달하는지를 잘 설계하고 구축하는게 가장 중요하다. 1단 데이터를 넘기는 방식으로 **Python [ list ]** 객체를 **JavaScript 의 [Array Value]** 로 전달하는 과정을 살펴본다

<br>
## JavaScript 에서 **_Var_** 사용

```javascript
var labels = ["Africa", "Asia", "Europe", "Latin America", "North America"]
var defaultData = [2478,5267,734,784,433]
// Bar chart
new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
      labels: , labels
      datasets: [
        { data: defaultData } ]
    }, ....
```


<br>
## Django [ list ] 를 &nbsp; Ajax **_Var_** 로 전달

**views.py**

```python
def get_data(request, *args, **kwargs):
    labels = ["Africa", "Asia", "Europe", "Latin America", "North America"]
    item   = [2478, 5267, 734, 784, 433]
    data   = {"labels"   : labels,
              "datasets" : default_item,}
    return JsonResponse(data)
```


**html Ajax**

```javascript
var endpoint = 'api2/'
var labels = []
var defaultData = []
$.ajax({
    method : "GET",
    url : endpoint,
    success: function(data){
      labels      = data.labels  // label : RestAPI Key 값
      defaultData = data.datasets
      new Chart(document.getElementById("bar-chart"), {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              { label: "Population (millions)",
                data: defaultData} ]
        }, });
    },
    error: function(error_data){
      console.log("error")
      console.log(error_data) }
})
```