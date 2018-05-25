---
title : morris.js Quick
last_modified_at: 2018-05-23T20:45:06-05:00
header:
  overlay_image: /assets/images/book/morris.png
categories:
  - javascript
tags: 
    - javascript
    - morris
toc: true    
---

# Morris.js
<small>[Document](http://morrisjs.github.io/morris.js/)<br>
[Code Source](https://codepen.io/andreic/pen/CJoze/)</small>


<br>
## Morris.js Notices

### DataFrame to Json

**Python** 결과를 **DataFrame** 으로 정리한 뒤 json 변환시 **`df.to_json(orient='records')`** 으로 해야만 튜플단위로 묶여서 json이 출력되므로 이 부분만 주의하면 된다


### Json in Morris.js

`data : { { parse_json | safe } },` 또는 `var dataSet = { { parse_json | safe } }`  로 객체명을 사용해서 `views.py` 에서 **Json** 자료를 사용 가능하다. 이때 `data : ,` 의 맨 뒤 **,** 를 빼먹지 않도록 주의해야 한다.


### Header Settings

```html
<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"></script>
```



<br>
## Morris.js chart example

### Line Chart

<figure class="align-center">
  <img src="https://www.codediesel.com/wp-content/uploads/2015/02/morris-chart1.jpg" alt="">
  <figcaption>line chart</figcaption>
</figure>

```javascript
new Morris.Line({
    element: 'myfirstchart',
    data: [ { year: '2008', value: 20 },
        { year: '2009', value: 10 },
        { year: '2010', value: 5 },
        { year: '2011', value: 5 },
        { year: '2012', value: 20 }],
    xkey: 'year',     // x축 컬럼을 정의
    ykeys: ['value'], // y축 컬럼을 정의(배열)
    labels: ['Value'] // y축 표시할 이름명 
});
```


### Donut Chart

<figure class="align-center">
  <img src="https://d2.alternativeto.net/dist/s/morris-js_191216_full.png?format=jpg&width=1600&height=1600&mode=min&upscale=false" alt="">
  <figcaption>donut-example</figcaption>
</figure>

```javascript
Morris.Donut({
    element: 'donut-example',
    data: [ { label: "Download Sales", value: 12 },
        { label: "In-Store Sales", value: 30 },
        { label: "Mail-Order Sales", value: 20 }]
    });
```


### Bar Chart

<figure class="align-center">
  <img src="https://camo.githubusercontent.com/9552f5d9257bd31f3e9c1d6c21c5a132c7a5b803/687474703a2f2f692e696d6775722e636f6d2f316c334c6e72452e706e67" alt="">
  <figcaption>donut-example</figcaption>
</figure>

```javascript
Morris.Bar({
    element: 'bar-example',
    data: [
        { y: '2006', a: 100 },
        { y: '2007', a: 75 },
        { y: '2008', a: 50 },
        { y: '2009', a: 75 },
        { y: '2010', a: 50 },
        { y: '2011', a: 75 },
        { y: '2012', a: 100 }
    ],
    xkey: 'y',
    ykeys: ['a'],
    labels: ['Backlog Items']
});
```


### Bar Compare Chart

<figure class="align-center">
  <img src="https://i.stack.imgur.com/TFWvE.png" alt="">
  <figcaption></figcaption>
</figure>

```javascript
Morris.Bar({
    element: 'bar-example2',
    data: [
        { y: '2006', a: 100, b: 90 },
        { y: '2007', a: 75, b: 65 },
        { y: '2008', a: 50, b: 40 },
        { y: '2009', a: 75, b: 65 },
        { y: '2010', a: 50, b: 40 },
        { y: '2011', a: 75, b: 65 },
        { y: '2012', a: 100, b: 90 }
    ],
    xkey: 'y',
    ykeys: ['a', 'b'],
    labels: ['Series A', 'Series B']
});
```



<br>
## Morris.js chart example 2
<small>[Code Source](https://codepen.io/andreic/pen/CJoze/) : 단일 데이터를 다양한 방법으로 시각화</small>


### Data Setting

Body tag Details 

```html
<div id="area-chart"></div>
<div id="line-chart"></div>
<div id="bar-chart"></div>
<div id="stacked"></div>
<div id="pie-chart"></div>
```

Script Data Settings

```javascript
var dataSet = [
        { y: '2014', a: 50, b: 90 },
        { y: '2015', a: 65, b: 75 },
        { y: '2016', a: 50, b: 50 },]
    ,

    config = {
        data   : dataSet,
        xkey   : 'y',
        ykeys  : ['a', 'b'],
        labels : ['Total Income', 
                 'Total Outcome'],
        fillOpacity      : 0.6,
        hideHover        : 'auto',
        behaveLikeLine   : true,
        resize           : true,
        pointFillColors  : ['#ffffff'],
        pointStrokeColors: ['black'],
        lineColors       : ['gray', 'red']
    };
```


## Morris.js Charts

### Area Chart

```javascript
config.element = 'area-chart';
Morris.Area(config);
```


### Line Chart

```javascript
config.element = 'line-chart';
Morris.Line(config);
```


### Bar Chart

```javascript
config.element = 'bar-chart';
Morris.Bar(config);
```


### Stack Chart

```javascript
config.element = 'stacked';
config.stacked = true;
Morris.Bar(config);
```


### Donut Chart

```javascript
Morris.Donut({
    element: 'pie-chart',
    data: [
        { label: "Friends", value: 30 },
        { label: "Allies", value: 15 },
        { label: "Enemies", value: 45 },
        { label: "Neutral", value: 10 }
    ]
});
```



