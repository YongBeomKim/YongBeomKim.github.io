---
title : d3.js SVG
last_modified_at: 2018-05-20T20:45:06-05:00
header:
  overlay_image: /assets/images/book/d3.jpg
categories:
  - javascript
tags: 
    - javascript
    - d3
    - svg
toc: true    
---

# D3.js - SVG Basic
**Data Driven Document**

<small>D3.js 입문 Chapter 4 - SVG 다루기</small>
[source download](https://freelec.co.kr/m-datacenter/?board_name=DataCenter2&order_by=fn_pid&order_type=desc&board_page=4&list_type=list&vid=55)


<br>

## HTML tag 를 활용하여 SVG 작성하기

### SVG 기본속성을 활용한 그리기

```html
<style>
  svg {width  : 320px;
       height : 240px;
       border : 1px solid black;}
  rect {stroke-width : 4px;
        stroke : black;
        fill   : orange;}
  circle {opacity : 0.75;
          fill    : blue;}
</style>

<svg>
  <rect x="10" y="20" width="180" height="160" />
  <circle cx="190" cy="140" r="80" />
</svg>
```


그림은 안쪽에서 부터 그림을 그려나간다. 그리고 SVG 좌표값은 일반적 모니터 좌표를 기준으로, 위쪽 위를 원점으로 삼는다


### 둥근 모서리 도형 그리기

```html 
<svg>
  <rect x="30" y="20" width="200" height="100" rx="20" ry="20" />
</svg>
```


<br>

## D3를 사용하여 기본도형 그리기

### d3를 사용하여 기본적인 도형 그리기

위와 같이 Tag로 적용 가능하지만, d3.select()를 통해서도 tag를 추가 가능하다

```javascript
d3.select("#graphArea")   // svg 요소를 생성하는 div 요소를 지정
  .append("svg")          // svg 요소를 추가
  .attr("width", "320px")   // svg 요소의 가로 넓이를 설정
  .attr("height", "240px");  // svg요소 세로 높이를 설정
```


**SVG** 모든 도형요소를 포함하지 않고, 다음의 4가지만 가능하다

| 속성값 |  내용  |
|-------:|--------:|
|"rect"  | 사각형(각진/둥근 모서리) |
|"circle"| 원 |
|"path"  | 복잡한 도형 |
|"text"  | 문자 |


d3.js의 속성값은 **리터럴 형식**을 사용하여 한 번에 지정 가능하다

```javascript
d3.select("#graphArea")   // svg 요소를 생성하는 div 요소를 지정
  .append("svg")          // svg 요소를 추가
  .attr({
    x : "10px",
    y : "20px",
    width : "320px",
    height : "240px"
    });  // svg요소 세로 높이를 설정
```


또는, **CSS** 정의값을 d3.js에서 **.class 객체명**을 사용하여 재활용 가능하다 

```html
<style>
  .bar_note { fill : red; }
</style>

<script src="//d3js.org/d3.v4.min.js">
d3.select(".bar")
  .attr("class", "bar_note")
</script>
```

  
<br>
## d3.js의 Animation 기타 효과구현 

### Animation 구현하기

```javascript
d3.select("#myBar")
  .attr({x :0,
         y :0,
         width : 200,
         height : 30})
  .transition().duration(1000)
  .attr("width", 10)
  .transition().duration(500)
  .attr("width", 320);
```

객체의 정의값과 중간 효과내용, 그리고 변화된 객체 정의값, 효과내용을 **시나리오식의 메소드 chain** 상식을 통해서 정의하면 중간 과정을 자동으로 계산해서 적용한다


### d3.js 에서 function(d,i) 로 특정객체만 적용하기

```javascript
d3.selectAll(".bar")  // bar 클래스 속성을 적용
  .style("fill", 
    function(d,i){if(i == 2)
      {return "red";}  // 전체 중 3번째 객체만 적용 
  });
```
