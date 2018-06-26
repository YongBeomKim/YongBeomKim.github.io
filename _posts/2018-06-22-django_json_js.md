---
title : Django Json to Html
last_modified_at: 2018-06-22T11:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - json
    - django
toc: true 
---


# Python { dict } &nbsp;&nbsp; to &nbsp;&nbsp; HTML JSon


<br>
# Django to JS

모든 시각화를 Sever 에서 처리하기 보다는, Client로 분산시키면 서버 부담도 적어지고 시각적인 효과도 용이한 다양한 장점이 존재한다.

간단하게 내용을 전달하고 시각화 하는 방법을 정리해보겠다


<br>
## views.py


### { dict } -> **Json** -> **HTML**

```python
def chart(request):

    data = [
         {"year": '2008', "value": 20},
         {"year": '2009', "value": 10},
         {"year": '2010', "value": 5},
         {"year": '2011', "value": 5},
         {"year": '2012', "value": 20} ]

    import json
    data = json.dumps(data)
    return render(request, 'template.html', context = { 'data_json' : data} )
```


### DataFrame / Series -> **json(orient='records')** -> **HTML** 

```python
import  pandas as pd
data  = df.to_json(orient='records')

import json
data = json.dumps(data)
return render(request, 'template.html', context={'data_json': data})
```

**df.to_json()** 만 사용하면, 컬럼별로 묶어서 출력된다. `' { "value" : { "0":20 , "1":10 }, "year" : { "0":"2008" , "1":"2009" } }'`<br>
**df.to_json(orient='records')** 를 사용해야만 튜플단위로 묶여서 출력된다. `'[ { "value" : 20 , "year" : "2008" }, {"value" : 10 , "year" : "2009"} ]'`
{: .notice--info}


<br>
## HTML Template

```html
<div id="chart">
    <script>
    new Morris.Line( {
        element: 'chart',
        data: { { data_json | safe } },
        xkey: 'year',     // x축 컬럼을 정의
        ykeys: ['value'], // y축 컬럼을 정의(배열)
        labels: ['Value'] // y축 표시할 이름명
    } );
    </script>
</div>
```

`{ { data_json | safe } }` 와 같이 **'| safe '** 필터를 사용해서 Json 객체를 JS로 전달받는다
{: .notice--info}



```html
<div id="graph2" class="boxB">
<script>
new Morris.Bar( {
    element: 'graph2',
    data: { { data_json | safe } },
    xkey: 'x',
    ykeys: ['y'],
    labels: ['Y'],
    barColors: function (row, series, type) {
        if (type === 'bar') {
            var red = Math.ceil(255 * row.y / this.ymax);
        return 'rgb(' + red + ',0,0)';
        }
        else { return '#000'; }
        }
    } );
</script>
</div>
```

**MorrisJs** 여기서는 MorrisJs 의 튜토리얼을 활용햇지만, 다른 시각화 방법들에 따른다. 보면 알겠지만 내부설정은 JavaScript 내용을 활용하므로 이부분을 잘 익히면 된다
{: .notice--info}