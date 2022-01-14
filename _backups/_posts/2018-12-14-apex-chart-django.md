---
title : Tutorial / Apex Chart in Django
last_modified_at: 2018-12-12T10:45:06-05:00
header:
  overlay_image: /assets/images/book/apexchart.jpg
categories:
  - chart
tags: 
    - django
    - apex
    - vue
toc: true 
---


E-chart, ChartJs, High Chart 등 여러가지를 앞에서 다뤘습니다. 이번에는 **MIT 라이센스를** 갖는 **[Apex Chart](https://apexcharts.com/)의 기본 문법들** 을 정리하면서 **JavaScript 모듈에 필요한 from Python to Json 객체를** 생성하는 함수를 만들면서 **ApexChart** 의 특징들을 정리 해보겠습니다.


# **Line차트** <small>[link](https://apexcharts.com/javascript-chart-demos/line-charts/basic/)</small>

앞에서 정리한 Django 이식 방법들을 apexchart에 적용합니다

### Raw JavaScript Source

```javascript
var options = {
    chart: {
        height: 350,
        type: 'line',
        zoom: { enabled: false }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'straight' },
    title: {
        text: 'Trends by Month',
        align: 'left'
    },
    grid: {
        row: { // 배경 그리드 간격 타일을 출력합니다
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
        },
    },
    series: [ // 데이터를 Array 로 여러개 사용하면 여러 Line을 출력합니다
        { name: "Desktops", // 필드명
          data: [10, 41, 35, 51, 49] } // 필드 데이터 
    ],
    xaxis: {
        categories: [ // 데이터셋 인덱스
        'Jan', 'Feb', 'Mar', 'Apr', 'May'],
    }
}

var chart = new ApexCharts(
    document.querySelector("#chart"),
    options
);

chart.render();
```


# **Scatter 차트** <small>[link](https://apexcharts.com/javascript-chart-demos/


```javascript
var options = {
      chart: {
        height: 350,
        type  : 'scatter',
        zoom  : {type: 'xy'}
      },
      series: [{
          name: 'TEAM 1',
          data: [ [시간값, 23], [timestamp, 33], ... ]
        },
        { name: 'TEAM 2',
          data: [ [timestamp, 51], [timestamp, 13], ... ]
        },
      ],
      dataLabels: {enabled: false},
      grid: {
        xaxis: {showLines: true},
        yaxis: {showLines: true},
      },
      xaxis: {type: 'datetime',},
      yaxis: {max: 70}
    }

var chart = new ApexCharts(
  document.querySelector("#chart"),
  options
);
chart.render();
```







차트의 통합을 추출하고, 분기별은 클릭하면 출력되는 좋은 그래프다
[Dynamic Chart](https://apexcharts.com/javascript-chart-demos/column-charts/dynamic-loaded-chart/)












## 시계열 데이터 생성 및 출력

# candle chart 를 출력하는 방법을 익힙니다

[캔들차트](https://stackoverflow.com/questions/11875770/how-to-overcome-datetime-datetime-not-json-serializable)

