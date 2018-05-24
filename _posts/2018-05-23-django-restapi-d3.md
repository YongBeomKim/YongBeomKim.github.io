---
title : Django RestAPI to d3.js
last_modified_at: 2018-05-23T20:45:06-05:00
header:
  overlay_image: /assets/images/book/restapi.png
categories:
  - javascript
tags: 
    - django
    - restapi
    - d3
toc: true    
---


# Django RestAPI to Javascript

앞에서는 postgresql 모델연결에 중점을 뒀다면, 이번에는 **Series**객체, **CSV** 데이터 등 다양한 데이터에 따른 활용에 중점을 두고 작업을 할 예정이다

<br>
# RestAPI

<figure class="align-center">
  <img src="https://impythonist.files.wordpress.com/2015/07/rstapi.jpg" alt="">
  <figcaption>RestAPI structure</figcaption>
</figure>

[django rest_framework](http://www.unionsmart.cn/archives/649)


## np.array 객체를 RestAPI 생성


**views.py**

```python
def data(request):
    mylist = []
    x = np.array(['2017-07-10', '2017-07-11', '2017-07-12', '2017-07-13'])
    y = np.array([58.13, 53.98, 67.00, 89.70])
    for i in range(len(x)):
        mylist.append({"date":x[i], "close":y[i]})
    return JsonResponse(mylist, safe=False)
```


**urls.py**

해당 데이터 Json 객체를 **name="data"** 로 url을 연결한다 

`re_path(r'^data/$', data, name="data"),`


**HTML template**

```html
<script src="//d3js.org/d3.v4.min.js">
var parseDate = d3.time.format("%Y-%m-%d").parse;
var callback_function = function (data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close; })

d3.json("{ % url "js:data" % }",  callback_function);
</script>
```

외부 데이터를 **.forEach** 메서드로 불러올 경우, **문자는 바로 연결** 가능하지만, 날짜의 경우는 parseDate() 로 문자열 출력 포맷을 정의하고, 숫자는 **+- 를 사용하여 유형변환**을 해야한다 [참고site](http://learnjsdata.com/read_data.html)
{: .notice--info}


<br>
## Pandas DataFrame 을 Json으로 출력 <small>[stackflow](https://stackoverflow.com/questions/26733855/struggling-with-pandas-to-json-in-django)</small>


### django views.py 에서 설정

```python
def data2(request):
    data = [{ "year": '2008', "value": 20 }, { "year": '2009', "value": 10 },
            { "year": '2010', "value": 5  }, { "year": '2011', "value": 5 },
            { "year": '2012', "value": 20}]
    import pandas as pd
    df = pd.DataFrame(data)
    data_json = df.to_json(orient='records') 
    data_html = df.to_html()
    return render(request, 'd3js/data2.html', context={'data_json': data_json,
                                                       'data_html': data_html})
```


`data_json = df.to_json(orient='records')` : 옵션을 추가해야 **튜플단위**로 데이터가 묶여서 출력된다 [pandas.to_json() 옵션들](https://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.to_json.html)   


### template

```html
{ { data_json | safe } }
```
 
별도의 태그내용 없이 위의 내용만 사용하면 바로 Json API로 출력된다.


<br>
## Json to Morris.js

`data : { { parse_json | safe } },` 또는 `var dataSet = { { parse_json | safe } }`  로 객체명을 사용해서 `views.py` 에서 **Json** 자료를 사용 가능하다. 이때 `data : ,` 의 맨 뒤 **,** 를 빼먹지 않도록 주의해야 한다.


### Head 에 script 추가하기

```html
<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"></script>
```


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
## Model 데이터를 직렬화 역직렬화 관리

**직렬화기 :** Django Model Instance **-->** Json  
**역직렬화기 :** Json **-->** Django Model Instance 


```python
from rest_framework import serializers
from .models import Game

# 직렬화 필드 객체정의
class GameSerializer(serializers.Serializer):
    pk   = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=200)
    play = serializers.BooleanField(required=False)

    # validated_data : 유효한 인자전달
    def create(self, validated_data):
        return Game.objects.create(**validated_data)

    # instance       : 기존 인스턴스
    # validated_data : 새로운 값
    # .save()로 update 새로운 값을 저장
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.play = validated_data.get('played', instance.played)
        instance.save()
        return instance
```


참고로 이부분은 앞에서도 여러번 정리를 했니 우선은 여기서 마무리 하도록 한다


**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}   