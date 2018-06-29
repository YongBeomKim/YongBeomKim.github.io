---
title : E Chart Django
last_modified_at: 2018-06-27T21:45:06-05:00
header:
  overlay_image: /assets/images/book/chart.jpg
categories:
  - js
tags: 
    - js
    - echart
toc: true 
---

<br>
# E Chart in Django

[E Chart 4.1 GitHub](https://github.com/apache/incubator-echarts)<br>
[Color Pallet](https://www.w3schools.com/colors/colors_picker.asp)


<figure class="align-center">
  <img src="https://www.highcharts.com/images/docs/candlestick.png" alt="">
  <figcaption>Zoomed the Time Series Chart</figcaption>
</figure> 


<br>
## views.py

```python
from pandas_datareader import get_data_yahoo

def index(request):
    return render(request, 'echart/index.html')

def get_data(request):
    df = get_data_yahoo('005930.KS', '2018-05-01')
    df = df.reset_index()
    df = df.iloc[:, :-1]

    # 실수데이터를 정수로 축약
    for col in df.columns[1:]:
        df[col] = df[col].astype('int')

    # value 들을 문자로 바꾼다
    for col in df.columns:
        df[col] = df[col].astype('str')
    df_list = df.values.tolist()

    data = {'titleSet' : '삼성전자',
            'dataSet'  : df_list}
    return JsonResponse(data, safe=False)
```

<br>
## urls.py

```python
from django.urls import re_path
from .views import index, get_data

app_name='echart'
urlpatterns = [
    re_path(r'^$',    index,    name='index'),
    re_path(r'^api/$', get_data, name='api')
]
```

<br>
## index.html

```html
{ % extends "base.html" % }

{ % block js % }
{ % load static % }
<script src="{ % static 'js/echarts.min.js' % }"></script>
{ % endblock js % }

{ % block content % }
<br><br><br><br>
    <div align="left" class="boxA">
        <div id="echart_main" style="width: 850px;height:500px;"></div>
    </div>
    <script src="{ % static 'js/page/echart-main.js' % }"></script>
{ % endblock content % }
```

<br>
## js/page/echart-main.js

```javascript
var endpoint = 'api/'

$.ajax({
    method: "GET",
    url: endpoint,

    success: function(data){

        var rawData  = data.dataSet;
        var rawTitle = data.titleSet;
        var myChart  = echarts.init(document.getElementById('echart_main'));

        function calculateMA(dayCount, data) {
            var result = [];
            for (var i = 0, len = data.length; i < len; i++){
                if (i < dayCount) {
                    result.push('-');
                    continue;
                }
                var sum = 0;
                for (var j = 0; j < dayCount; j++) {
                    sum += data[i - j][1];
                }
                result.push(sum / dayCount);
            }
            return result;
        }

        // 날짜만 추출
        var dates = rawData.map(function (item) {
            return item[0];
        });

        // 데이터 추출 (순서를 맞춘다) : Open, Close, Lowest, Highest
        var data = rawData.map(function (item) {
            return [+item[3], +item[4], +item[2], +item[1]];
        });

        var option = {
            backgroundColor: '#ffffff',   // 배경색 '#21202D',
            legend: {
                data: [rawTitle, 'MA5', 'MA10', 'MA20', 'MA30'],
                inactiveColor: '#777',
                textStyle: { color: '#000000'}  // 글자색
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false,
                    type: 'cross',
                    lineStyle: {
                        color: '#8392A5', // 포인터 Grid 세로축 '#376df4'
                        width: 2,
                        opacity: 1
            } } },
            xAxis: {
                type: 'category',
                data: dates,
                axisLine: { lineStyle: { color: '#8392A5' } } // x축
            },
            yAxis: {
                scale: true,
                axisLine: { lineStyle: { color: '#8392A5' } }, // y축
                splitLine: { show: false }
            },
            grid: { bottom: 80 },
            dataZoom: [{  // 시계열 변환버튼
                textStyle: { color: '#8392A5' },
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                dataBackground: {
                    areaStyle: { color: '#8392A5'},
                    lineStyle: { opacity: 0.8, color: '#8392A5'}
                },
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2 }
                }, { type: 'inside'}],
            animation: false,  // 처음 그릴때 애니메이션 활성화
            series: [
                { type: 'candlestick',
                  name: rawTitle,
                  data: data,
                  itemStyle: {
                    normal: {
                        color: '#FD1050',        //상승바 RED   #FD1050
                        color0: '#0033cc',       //하락바 BLUE  #0CF49B
                        borderColor: '#FD1050',  //상승 축  #FD1050
                        borderColor0: '#4d79ff'} //하락 축  #0CF49B
                    }
                },
                {   name: 'MA5',
                    type: 'line',
                    data: calculateMA(5, data),
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 1,
                            color: '#000000',  // #FD1050
                } } },
                {   name: 'MA10',
                    type: 'line',
                    data: calculateMA(10, data),
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 1,
                            color: '#000000',  // #FD1050
                } } },
                {   name: 'MA20',
                    type: 'line',
                    data: calculateMA(20, data),
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 1,
                } } },
                {   name: 'MA30',
                    type: 'line',
                    data: calculateMA(30, data),
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 1,
                        }
        } } ] };;
        if (option && typeof option === "object") {
            myChart.setOption(option, true); }
    },
    error: function(error_data){
        console.log("Ajax loading error")}
})
```
