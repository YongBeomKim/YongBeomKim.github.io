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


## Javascript 시각화

### Python `[ list ]` 객체를 Javascript 로 전달하기 

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
    var dataSet = {{ poll_json }};
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
**Django** 에서 content 객체중 하나를 `{ dict }`로 전달을 하고 

**Template** 에서 `<script>var = { { object | safe } } </script>` 로 받으면 
Javascript 의 `Object` 로 작동이 될거같은 느낌아닌 느낌이 든다

<strke><samll> 하지만 restAPI로 객체들을 조절하고 이를 전달받는게 가장 효과적임은 두말할 나위가 없다</samll></strke>




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




### Morris.js 

[github Document](http://morrisjs.github.io/morris.js/#license)

<figure class="align-center">
  <img src="http://datadrivenjournalism.net/uploads/teasers/skoli.png" alt="">
  <figcaption>Django & families</figcaption>
</figure>


**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}   