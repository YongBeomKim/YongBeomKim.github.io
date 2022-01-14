---
title : django Charts 1
last_modified_at: 2018-05-15T22:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - django
    - d3
toc: true    
---


# Javascript 시각화

<br>
## Python `[ list ]` 객체를 Javascript 로 전달하기 

[Python 객체를 Javascript 로 전달 뒤, D3로 시각화](https://stackoverflow.com/questions/13065750/how-to-pass-data-from-django-to-d3-js)

<figure class="align-center">
  <img src="http://datadrivenjournalism.net/uploads/teasers/skoli.png" alt="">
  <figcaption>Django & families</figcaption>
</figure>

django 에서 **content 로 객체를 정의**하고 이를 받아서 시각화 하는 방식으로 작업을 진행하자

```python
import json
def your_view(request):
    poll_results = [4, 6, 7, 1]
    poll_json = json.dumps(poll_results)
    # Gives you a string '[4, 6, 7, 1]'
    return render_or_whatever(context={'poll_json': poll_json})
```


And in your template

```html
<body>
    <svg id="Graph"></svg>
    <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>

    <script>
    var dataSet = { { poll_json } };
    d3.select("#Graph")
        .selectAll("rect")    // rect 요소를 지정
        .data(dataSet)        // 데이터를 요소에 연결
        .enter()              // 데이터 개수만큼 반복
        .append("rect")       // 데이터 개수만큼 rect 요소가 추가됨
        .attr("class", "bar") // CSS 클래스를 지정
        // 넓이를 지정. 두 번째의 파라미터에 함수를 지정
        .attr("width", function(d, i) { 
            return d;})       // 데이터 값을 그대로 넓이로 반환
        .attr("height", 20)   // 높이를 지정
        .attr("x", 0)         // X 좌표를 0으로 함
        .attr("y", function(d, i) { // Y 좌표를 지정함
            return i * 25})   // 표시 순서에 25를 곱해 위치를 계산
    </script>
</body>
```

위 방식의 단점은 list value 값만 Javascript Array 객체로 넘긴다는 것이다. index 정보도 함께 필요로 하는 경우에는 Json 객체로 넘기는 편이 여러보로 활용도가 높다고 할 것이다
{: .notice--info}


### Python `array` 객체를 Javascript 로 json 객체로 전달하기 

[코딩자료 출처](https://stackoverflow.com/questions/43617277/sending-json-data-from-django-to-d3-js?rq=1)

직관적으로 생각하기에는 
**Django** 에서 content 객체중 하나를 `{ dict }`로 전달을 하고 **Template** 에서 `<script>var = { { object | safe } } </script>` 로 받으면 Javascript 의 `Object` 로 작동이 될거같지만, 객체가 value 인지 string 인지를 조작하는데 있어서 미숙한 부분으로 아직 완결성이 부족하다. <strke><samll> 결국에는 restAPI로 객체들을 조절하고 이를 전달받는게 가장 효과적임은 두말할 나위가 없다</samll></strke>


```python
import json
from django.shortcuts import render

# query Set 결과물을 [ list ] 로 변환한다
def index(request):
    qs = DCPOWERSTATS.objects.all().values('TS','PuE').order_by('TS')
    context = {'data_json': json.dumps(qs[:])}
    return render(request, 'dashboard/dash.html', context=context)
```


```html
<script>
var data = {{ data_json|safe }};
</script>
```



<br>
## Morris.js Example 자료 살펴보기

[Code Source](https://embed.plnkr.co/NpX68z6HPYWk8lq8tkLC/)<br>
[Github Document](http://morrisjs.github.io/morris.js/#license)


### CDN Source URL 주소

```
href="http://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css"
src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"
src="http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"
src="http://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"
```


### Line Chart 구현

<figure class="align-center">
  <img src="https://i.stack.imgur.com/y1Rkw.png" alt="">
  <figcaption></figcaption>
</figure>
    
```html
<div id="linechart" style="height: 250px;"</div>

<script>
new Morris.Line({
    element: 'linechart', // HTML 출력 ID 정의
    data: [
        { year: '2008', value: 20 },
        { year: '2009', value: 10 },
        { year: '2010', value: 5 },
        { year: '2011', value: 5 },
        { year: '2012', value: 20 }
    ],
    xkey: 'year',     // X 축 label
    ykeys: ['value'], // Y 축 label (마우스를 올렸을 때 표시)
    labels: ['Value']
});
</script>
```



### Donut Chart 구현

```html
<div id="donut-example"></div>

<script>
Morris.Donut({
    element: 'donut-example',
    data: [
        { label: "Download Sales", value: 12 },
        { label: "In-Store Sales", value: 30 },
        { label: "Mail-Order Sales", value: 20 }
    ]
});
</script>
```



### Bar Chart 구현 1

```html
<div id="bar-example"></div>

<script>
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
</script>
```



### Bar Chart 구현 2

```html
<div id="bar-example2"></div>

<script>
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
</script>
```



## Django 정보를 RestAPI로 출력하기

[20분안에 RestAPI 활용 익히기](https://codeburst.io/create-a-django-api-in-under-20-minutes-2a082a60f6f3)

http://www.django-rest-framework.org/tutorial/3-class-based-views/
