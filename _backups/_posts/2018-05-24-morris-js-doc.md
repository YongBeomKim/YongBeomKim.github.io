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
<small>from Main Document</small>

[Document](http://morrisjs.github.io/morris.js/)<br>
[Code Source](https://codepen.io/andreic/pen/CJoze/)

## Basic Options

### Header Setting

```html
<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"></script>
```


### morris.js Basic Options

**`resize: true`** margin, padding 모두 0px로, 해당 영역을 꽉 채운다<br>
**`grid: true`** Grid 설정을 활성화 한다



<br>
## Area Chart 

### AREA Chart Basic

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



## Bar Chart 

### Bar Chart Basic

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


### Bar Stacked Chart 

```javascript
Morris.Bar({
  element: 'graph',
  data: [
    {x: '2011 Q1', y: 3, z: 2, a: 3},
    {x: '2011 Q2', y: 2, z: null, a: 1},
    {x: '2011 Q3', y: 0, z: 2, a: 4},
    {x: '2011 Q4', y: 2, z: 4, a: 3}
  ],
  xkey: 'x',
  ykeys: ['y', 'z', 'a'],
  labels: ['Y', 'Z', 'A'],
  stacked: true
});
```

`  ykeys: ['y', 'z', 'a'],` 순서대로 차곡 차곡 쌓아올린 튜플당 1개의 막대를  출력한다


<br>
## Day Chart 

### Day Chart Basic

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



### Day Chart horizon label

<figure class="align-center">
  <img src="https://camo.githubusercontent.com/f58f92a92acb32e4c1579d7a623cfe9908bb855c/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f3131363239322f3438353239352f30323261336363652d623865662d313165322d383233662d3166356633343736383132392e706e67" alt="">
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
Morris.Bar({
  element: 'graph',
  data: day_data,
  xkey: 'period',
  ykeys: ['licensed', 'sorned'],
  labels: ['Licensed', 'SORN'],
  xLabelAngle: 60
});
```


### Daylight-savings time 

날짜 시간별 정렬데이터 시각화

```javascript
// This crosses a DST boundary in the UK.
Morris.Area({
  element: 'graph',
  data: [
    {x: '2013-03-30 22:00:00', y: 3, z: 3},
    {x: '2013-03-31 00:00:00', y: 2, z: 0},
    {x: '2013-03-31 02:00:00', y: 0, z: 2},
    {x: '2013-03-31 04:00:00', y: 4, z: 4}
  ],
  xkey: 'x',
  ykeys: ['y', 'z'],
  labels: ['Y', 'Z']
});
```

### Time Event Chart

특정 시간대 영역을 Highlight 로 표시하기

```javascript
var week_data = [
  {"period": "2011 W17", "licensed": 3148, "sorned": 632},
  {"period": "2011 W16", "licensed": 3155, "sorned": 681},
  {"period": "2011 W15", "licensed": 3190, "sorned": 667},
  {"period": "2011 W14", "licensed": 3226, "sorned": 620},
  {"period": "2011 W13", "licensed": 3245, "sorned": null},
  {"period": "2011 W12", "licensed": 3289, "sorned": null},
  {"period": "2011 W11", "licensed": 3263, "sorned": null},
];
Morris.Line({
  element: 'graph',
  data: week_data,
  xkey: 'period',
  ykeys: ['licensed', 'sorned'],
  labels: ['Licensed', 'SORN'],
  events: ['2011-04',['2011-05', '2011-06'],'2011-08']
});
```


### 날짜 구분별 다양한 Label 활용

**<small>시간 정보를 포함</small>** <br>
{x: '2013-03-30 22:00:00', y: 3, z: 3},

**<small>Week 를 기준</small>**<br>
{"period": "2011 W27", "licensed": 3407, "sorned": 660},

**<small>Quater 를 기준</small>**<br>
{"period": "2008 Q4", "licensed": 3155, "sorned": 681},



<br>
## Donut Chart

### Donut Chart Basic

<figure class="align-center">
  <img src="https://d2.alternativeto.net/dist/s/morris-js_191216_full.png?format=jpg&width=1600&height=1600&mode=min&upscale=false" alt="">
  <figcaption></figcaption>
</figure>

```javascript
Morris.Donut({
  element: 'graph',
  data: [
    {value: 70, label: 'foo'},
    {value: 15, label: 'bar'},
    {value: 10, label: 'baz'},
    {value: 5, label: 'A really really long label'}
  ],
  formatter: function (x) { return x + "%"}
}).on('click', function(i, row){
  console.log(i, row);
});
```

`return x + "%"` 는 해당 객체를 선택하면 jquery 를 사용하여 **'%'** 를 붙여서 출력한다.


### Donut Chart

출력내용을 임의의 text를 정의한다

```javascript
Morris.Donut({
  element: 'graph',
  data: [
    {value: 70, label: 'foo', formatted: 'at least 70%' },
    {value: 15, label: 'bar', formatted: 'approx. 15%' },
    {value: 10, label: 'baz', formatted: 'approx. 10%' },
    {value: 5, label: 'A really really long label', 
               formatted: 'at most 5%' }
  ],
  formatter: function (x, data) { return data.formatted;}
});
```


### Donut Chart Color Change

```javascript
Morris.Donut({
  element: 'graph',
  data: [
    {value: 70, label: 'foo'},
    {value: 15, label: 'bar'},
    {value: 10, label: 'baz'},
    {value: 5, label: 'A really really long label'}
  ],
  backgroundColor: '#ccc',
  labelColor: '#060',
  colors: ['#0BA462', '#39B580', '#67C69D', '#95D7BB'],
  formatter: function (x) {return x + "%"}
});
```


## Line Animation Chart


```javascript
var nReloads = 0;
function data(offset) {
  var ret = [];
  for (var x = 0; x <= 360; x += 10) {
    var v = (offset + x) % 360;
    ret.push({
      x: x,
      y: Math.sin(Math.PI * v / 180).toFixed(4),
      z: Math.cos(Math.PI * v / 180).toFixed(4)
    });
  }
  return ret;
}
var graph = Morris.Line({
    element: 'graph',
    data: data(0),
    xkey: 'x',
    ykeys: ['y', 'z'],
    labels: ['sin()', 'cos()'],
    parseTime: false,
    ymin: -1.0,
    ymax: 1.0,
    hideHover: true
});
function update() {
  nReloads++;
  graph.setData(data(5 * nReloads));
  $('#reloadStatus').text(nReloads + ' reloads');
}
setInterval(update, 100);
```


**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}   