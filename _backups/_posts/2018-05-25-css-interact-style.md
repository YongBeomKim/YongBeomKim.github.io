---
title : css Interact Web
last_modified_at: 2018-05-25T12:45:06-05:00
header:
  overlay_image: /assets/images/book/css.jpg
categories:
  - css
tags: 
    - css
    - flexible
toc: true    
---


# 반응형 웹 만들기 첫째마당

반응형 웹 만들기 2판 <small>-김운아- 이지스퍼블리싱</small>

<br>
## CSS 함수

### **calc** 함수

Margin(외부충전) - Padding(경계) - Border(내부충전)

```css
#wrap div {
    display: inline-block;
    width: calc(100% - 100px);
    height: 200px;
    margin: 50px;
    background: #f7e041;}
```

width 속성에서 `calc` **CSS 함수**를 사용하면, 고정된 margin 간격을 사용할 수 있다.
{: .notice--info}

`display: inline-block` : display 속성의 값 중 inline 처럼 한줄로도 보이고, block 태그에 적용 가능한 속성값이다. <small>그런데 무슨 뜻인지는 잘 모르겠다</small>
{: .notice-info}


<br> 
## 가변 그리드

### margin 을 가변으로 변환

```css
#wrap div:first-child{
  margin-right:37.5%, //360px/960px
  background:#1f5118b;
}
```


### 태그 기본값을 기준으로 글자크기 설정

<body>
  <div style="font-size:2em">font-size:2em 는 태그기본값 2배를 적용
    <p style="font-size:0.5em">font-size:0.5em  부모의 1/2 상속</p>
  </div>
  <div style="font-size:2rem">font-size:2rem 기본값 2배를 적용
    <p style="font-size:0.5rem">font-size: 0.5rem HTML기본 1/2 상속</p>
  </div>
</body>


### 브라우저 크기에 따른 글자크기 설정

<body>
  <p style="font-size:2vw">2vw : 브라우저 width 2%</p>
  <p style="font-size:3vh">3vh : 브라우저 height 3%</p>
  <p style="font-size:3vmin">3vmin : w/h 중 짧은쪽기준 3%</p>
</body>


<br>
## 미디어 쿼리

### 기본문법

> @media [only/not] [미디어유형] [and/,] (조건문) {실행문}

> @media (min-width:320px) and (max-width:760px) {실행문}

"@"는 미디어쿼리 문법의 시작을 알린다. 그리고 미디어 쿼리는 대/소문자를 구분하지 않는다. 그리고 head 본문에서 삽입시 `<style>@media all and () {}</style>` 을 사용한다 
{: .notice--info}


아래의 코드는 768 이상일 때에만 활성화

```css
@media (min-width:768px){}
```




```css
@media all and (min-width:320px){실행내용}
```

media all 은 모든 기기에 동일한 기준을 적용하는 의미다
{: .notice--info}

|  미디어유형 |   설명            |
|------------:|------------------:|
| all         | 모든장치          |
| print       | 인쇄장치          |
| screen      | 화명장치          |
| tv          | 영상음성 도시출력 |



### 링크방식

> <link rel="stylesheet"  href="style.css">



<br>

## 뷰포트

뷰포트는 실제 화면을 표시하는 영역으로, 기기별 설정된 초기 화면크기값이다

`<meta name="viewport" content="width-device=width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">`

**width :** 뷰포트의 너비값,  **initial-scale :** 초기배율값, **minimum-scale :** 초기축소비율, **user-scalable :** 확대/축소비율


# Flexible Box

<figure class="align-center">
  <img src="http://www.onextrapixel.com/wp-content/uploads/2013/04/flexbox-elements.jpg" alt="">
  <figcaption>donut-example</figcaption>
</figure>

보통 flexbox로 불리는 Flexible Box 모듈은, 1차원적인 레이아웃 모델 인터페이스와 강력한 정렬 기능을 통해 항목 간 공간 배분을 제공할 수 있는 방법으로 설계되었습니다. 

이전까지는 **.block .inline** 또는 **속성값 None** 으로만 정리를 했다면, 이제부터는 평면은 Flexible Layout Box 그리고 CSS GRID 를 한번 정리해 보고자 한다