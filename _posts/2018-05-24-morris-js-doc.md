---
title : morris.js
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

[Document](http://morrisjs.github.io/morris.js/)<br>
[Code Source](https://codepen.io/andreic/pen/CJoze/)


<br>
## DataFrame to Json

**Python** 결과를 **DataFrame** 으로 정리한 뒤, 이를 json 객체로 전달해서 Client 단에서 시각화를 한다. json 변환시 **`Dataframe.to_json(orient='records')`** 으로 해야 튜플단위로 묶여서 json이 출력되므로 이 부분만 주의하면 된다


<br>
## Json in Morris.js

`data : { { parse_json | safe } },` 또는 `var dataSet = { { parse_json | safe } }`  로 객체명을 사용해서 `views.py` 에서 **Json** 자료를 사용 가능하다. 이때 `data : ,` 의 맨 뒤 **,** 를 빼먹지 않도록 주의해야 한다.


<br>
## Morris.js Example chart 
<small>from document</small>


### AREA Chart

`behaveLikeLine: true`  line 차트 내부 영역을 표시

<figure class="align-center">
  <img src="https://docs.oracle.com/cd/E72987_01/adf/tag-reference-dvt/images/chart/areaChart.png" alt="">
  <figcaption></figcaption>
</figure>

```javascript
Morris.Area({
  element: 'graph',
  behaveLikeLine: true,
  data: [
    {x: '2011 Q1', y: 3, z: 3},
    {x: '2011 Q2', y: 2, z: 1},
    {x: '2011 Q3', y: 2, z: 4},
    {x: '2011 Q4', y: 3, z: 3}
  ],
});
```



### AREA Stacked Chart

누적 영역차트 그린다

```javascript
Morris.Area({
  element: 'graph',
  data: [
    {x: '2010 Q4', y: 3, z: 7},
    {x: '2011 Q1', y: 3, z: 4},
    {x: '2011 Q2', y: null, z: 1},
    {x: '2011 Q3', y: 2, z: 5},
    {x: '2011 Q4', y: 8, z: 2},
    {x: '2012 Q1', y: 4, z: 4}
  ],
  xkey: 'x',
  ykeys: ['y', 'z'],
  labels: ['Y', 'Z']
}).on('click', function(i, row){
  console.log(i, row);
});
```



### Bar Chart 

<figure class="align-center">
  <img src="https://i1.wp.com/annkemery.com/wp-content/uploads/2017/01/EmeryAnalytics_Vertical-Bar-Chart-1.png" alt="">
  <figcaption></figcaption>
</figure>

```javascript
Morris.Bar({
  element: 'graph',
  data: [ {x: '2011 Q1', y: 0}, {x: '2011 Q2', y: 1},
    {x: '2011 Q3', y: 2}, {x: '2011 Q4', y: 3},
    {x: '2012 Q1', y: 4}, {x: '2012 Q2', y: 5},
    {x: '2012 Q3', y: 6}, {x: '2012 Q4', y: 7},
    {x: '2013 Q1', y: 8}],
  xkey: 'x',
  ykeys: ['y'],
  labels: ['Y'],
  barColors: function (row, series, type) {
    if (type === 'bar') {
      var red = Math.ceil(255 * row.y / this.ymax);
      return 'rgb(' + red + ',0,0)';
    }
    else {return '#000';}
  }
});
```


### Bar Compare Chart 

한 컬럼의 데이터를 비교하는 차트

<figure class="align-center">
  <img src="https://i.stack.imgur.com/GGHwV.png" alt="">
  <figcaption></figcaption>
</figure>

```javascript
Morris.Bar({
  element: 'graph',
  axes: false,
  data: [
    {x: '2011 Q1', y: 3, z: 2, a: 3},
    {x: '2011 Q2', y: 2, z: null, a: 1},
    {x: '2011 Q3', y: 0, z: 2, a: 4},
    {x: '2011 Q4', y: 2, z: 4, a: 3}
  ],
  xkey: 'x',
  ykeys: ['y', 'z', 'a'],
  labels: ['Y', 'Z', 'A']
});
```



### Day Chart 

날짜를 기준으로 비교군 line Chart 

<figure class="align-center">
  <img src="https://peltiertech.com/images/2016-08/PlotMultipleTimeSeries.png" alt="">
  <figcaption></figcaption>
</figure>


```javascript
var day_data = [
  {"period": "2012-10-01", "licensed": 3407, "sorned": 660},
  {"period": "2012-09-30", "licensed": 3351, "sorned": 629},
  {"period": "2012-09-29", "licensed": 3269, "sorned": 618},
  {"period": "2012-09-20", "licensed": 3246, "sorned": 661},
  {"period": "2012-09-19", "licensed": 3257, "sorned": 667},
  {"period": "2012-09-18", "licensed": 3248, "sorned": 627},
  {"period": "2012-09-17", "licensed": 3171, "sorned": 660},
  {"period": "2012-09-16", "licensed": 3171, "sorned": 676},
  {"period": "2012-09-15", "licensed": 3201, "sorned": 656},
  {"period": "2012-09-10", "licensed": 3215, "sorned": 622}
];
Morris.Line({
  element: 'graph',
  data: day_data,
  xkey: 'period',
  ykeys: ['licensed', 'sorned'],
  labels: ['Licensed', 'SORN']
});
```



##

<figure class="align-center">
  <img src="https://camo.githubusercontent.com/f58f92a92acb32e4c1579d7a623cfe9908bb855c/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f3131363239322f3438353239352f30323261336363652d623865662d313165322d383233662d3166356633343736383132392e706e67" alt="">
  <figcaption></figcaption>
</figure>




<br>
## Morris.js chart example

### Morris.js 활용 Line Chart

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


### Morris.js 활용한 Pi Chart

```javascript
Morris.Donut({
    element: 'donut-example',
    data: [ { label: "Download Sales", value: 12 },
        { label: "In-Store Sales", value: 30 },
        { label: "Mail-Order Sales", value: 20 }]
    });
```


### Morris.js 활용 bar Chart

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


### Morris.js 활용 bar Chart2

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
<small>[Code Source](https://codepen.io/andreic/pen/CJoze/)</small>


### Header  and  Data Setting

Head tag Details

```html
<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"></script>
```

Body tag Details 

```html
<div id="area-chart"></div>
<div id="line-chart"></div>
<div id="bar-chart"></div>
<div id="stacked"></div>
<div id="pie-chart"></div>
```

Script Data and Settings

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














Example Codes

### Head 에 script 추가

```html
<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"></script>
```





**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}   