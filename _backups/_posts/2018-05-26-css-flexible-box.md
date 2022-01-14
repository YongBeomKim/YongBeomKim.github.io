---
title : css Flexible Box
last_modified_at: 2018-05-26T12:45:06-05:00
header:
  overlay_image: /assets/images/book/css.jpg
categories:
  - css
tags: 
    - css
    - flexible
toc: true    
---

# Flexible Box

반응형 웹 만들기 2판 <small>-김운아- 이지스퍼블리싱</small>

[sk플래닛 블로그](https://readme.skplanet.com/?p=13710)<br>
[sk플래닛 블로그](https://readme.skplanet.com/?p=13690)<br>
[MSDN 기술노트](https://msdn.microsoft.com/ko-kr/library/bg124109)

<figure class="align-center">
  <img src="http://www.onextrapixel.com/wp-content/uploads/2013/04/flexbox-elements.jpg" alt="">
  <figcaption>donut-example</figcaption>
</figure>

보통 flexbox로 불리는 Flexible Box 모듈은, 1차원적인 레이아웃 모델 인터페이스와 강력한 정렬 기능을 통해 항목 간 공간 배분을 제공할 수 있는 방법으로 설계되었습니다. 

이전까지는 **.block .inline** 또는 **속성값 None** 으로만 정리를 했다면, 이제부터는 평면은 Flexible Layout Box 그리고 CSS GRID 를 한번 정리해 보고자 한다



<br>
## 미디어 쿼리

### 기본문법

> @media [only/not] [미디어유형] [and/,] (조건문) {실행문}

> @media (min-width:320px) and (max-width:760px) {실행문}

"@"는 미디어쿼리 문법의 시작을 알린다. 그리고 미디어 쿼리는 대/소문자를 구분하지 않는다. 그리고 head 본문에서 삽입시 `<style>@media all and () {}</style>` 을 사용한다 
{: .notice--info}


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

> meta **name**="viewport" **content**="width-device=width, **initial-scale**=1.0, **minimum-scale**=1.0, **maximum-scale**=1.0, **user-scalable**=no"
 

**width :** 뷰포트의 너비값,  **initial-scale :** 초기배율값, **minimum-scale :** 초기축소비율, **user-scalable :** 확대/축소비율

모바일 기기들의 해상도가 높아짐에 따라 모바일에서도 반응형웹을 적용하기 위해서는 해상도만이 아닌 기기별 정보를 필요로 하고 이를 처리하기 위해서 뷰포트를 설정한다
{: .notice--info}


<br>
## CSS 기본속성을 Clear Fix 

**Tag** 의 기본적인 속성내용을 초기화 한다

```css
.page ul {
    display:inline-block;
}

.page ul:after {
    content : "";
    display : block; 
    clear : both}
```


<br>
### clear : both 

> .tag { **clear** : **both** }

위에서 정의된 .tag 내부에서도 클리어픽스의 영향을 받는다


<br>
### :after, :front

> .tag**:after** { display:block; clear:both; }

해당 태그 다음/ 앞에 위치하는 태그들의 성격을 정의한다



<br>
## Flexible Box 기본개념

배치 시작점과 끝점을 정하고, 객체배열의 **주축**과 **교차축**을 정의하면 아이템 배치를 자유자재로 설정가능하다


### display:flexbox

Flexible Box 활성화

> display:-webkit-flex; <br>
> display:**flex**;

**-webkit-flex** flexible box 는 아직 W3C 확정단계가 아니여서 브라우저 접두사를 추가해야 한다
{: .notice--info}


<br>
## Format Setting
flexbox의 배열기준 정하기


<br>
### flex-direction:row

<figure class="align-center">
  <img src="http://blog.teamtreehouse.com/wp-content/uploads/2012/12/flexbox-flex-direction.png" alt="">
  <figcaption></figcaption>
</figure>

> display:flex;<br>
> flex-direction:**row**;

|  속성값        |   flex-direction 설명      |
|---------------:|---------------------------:|
| row            | 박스를 왼쪽에서 배치시작   |
| row-reverse    | 박스를 오른쪽에서 배치시작 |
| column         | 박스를 위에서 배치시작     |
| column-reverse | 박스를 아래부터 배치시작   |


<br>
### Flexible Box 여러줄로 배치

`flex-wrap` : 위의 개별박스를 여러줄로 배치

<figure class="align-center">
  <img src="https://image.slidesharecdn.com/putting-flexbox-into-practiceblend-conf130907-130908160522-/95/putting-flexbox-into-practice-19-638.jpg" alt="">
  <figcaption></figcaption>
</figure>

> display: flex;<br>
> flex-direction: **row**;<br>
> flex-wrap: **wrap**;

|  속성값        |   flex-wrap 설명            |
|---------------:|----------------------------:|
| nowrap         | 박스를 한줄로 배치(기본)    |
| wrap           | 박스를 여러줄로 배치 (예제) |
| wrap-reverse   | 박스 여러줄 역방향 배치     |


<br>
### Flexible Box 다중설정

위의 2개 설정값을 한꺼번에 설정 가능하다

> `flex-flow` : flex-direction설정  flex-wrap설정

<figure class="align-center">
  <img src="http://readme.skplanet.com/wp-content/uploads/css-flex-flow.gif" alt="">
  <figcaption></figcaption>
</figure>

> display: **flex**;<br>
> flex-flow: **row wrap-reverse**;


<br>
### justify-content

주축방향으로 다양한 플렉스 아이템 배치하기

<figure class="align-center">
  <img src="http://codefor.life/images/flexbox-justify-content.png" alt="">
  <figcaption>donut-example</figcaption>
</figure>

> display: flex;<br>
> justify-content: **space-around**;

| 속성값      | justify-content               |
|------------:|------------------------------:|
| flex-start  | 부모 주축 왼쪽부터 배치(기본) |
| flex-end    | 부모 주축 오른쪽부터 배치     |
| center      | 부모 주출 중앙부터 배치       |
| space-between | 양 끝에 일치후 동일간격 배치 |
| space-around | 양 끝에도 공간두고 간격배치  |


<br>
## Align
기준 위에서 item들 정렬방향설정


<br>
### align-items

세로 교차축 방향으로 flex item 배치

<figure class="align-center">
  <img src="http://w3.unpocodetodo.info/css3/images/flex-align-items.gif" alt="">
  <figcaption></figcaption>
</figure>

> display:flex;<br>
> align-items:**center**;


| 속성값      | align-items                     |
|------------:|--------------------------------:|
| stretch     | 박스를 height-fit 늘린다(기본)  |
| flex-start  | 박스를 교차 시작점 배치시작     |
| flex-end    | 박스를 교차 끝점 배치시작       |
| center      | 박스를 교차점 중앙 배치시작     |
| baseline    |                                 |



<br>
### align-content

교차축 방향으로 flex item 배치

<figure class="align-center">
  <img src="http://w3.unpocodetodo.info/css3/images/flex-align-content.gif" alt="">
  <figcaption></figcaption>
</figure>

> display:flex;<br>
> flex-wrap:**wrap**;<br>
> align-content:**space-between**;


| 속성값      | align-content                   |
|------------:|--------------------------------:|
| stretch     | 박스를 height-fit 늘린다(기본)  |
| flex-start  |                 |
| flex-end    |                 |
| center      |                 |
| space-between | 양 끝에 붙이고 나머지 동일간격  |
| space-around |                |


<br>
## flex  

플랙스 아이템을 가변적으로 적용한다

> flex : flex-grow  flex-shirink  flex-basis<br>

| 속성값     |  설명                |
|-----------:|---------------------:|
|flex-grow   | 여백을 늘리는 속성   |
|flex-shrink | 아이템 넘칠떄 줄임   |
|flex-basis  | 아이템 기본크기 설정 |


<br>
## flex Example

### CSS code source

```css
    #wrap {
        display: flex;
        flex-flow: row wrap;
        width: 90%;
        margin: 0 auto;}
    .header {
        display: flex;
        order: 1;
        justify-content: flex-end;
        position: relative;
        width: 100%;}
    .header h1 {
        position: absolute;
        top: 0;
        left: 0;
        width: 12.5%;
        height: 80px;
        background: #ff6b57;}
    .header nav {
        width: 87.5%;
        min-height: 80px;
        background: #ff6b57;}
    .slider_section {
        order: 2;
        width: 50%;
        background: #3c90be;}
    .gallery_section {
        order: 3;
        width: 27.083333333333333333333333333333%;
        height: 440px;
        background: #f8de73;}
    .rankup_section {
        order: 4;
        width: 22.916666666666666666666666666667%;
        background: #00d2a5;}
    .latest_post_section {
        order: 5;
        width: 30%;
        background: #9cabe4;}
    .popular_post_section {
        order: 6;
        width: 30%;
        background: #d76817;}
    .banner_section {
        display: flex;
        order: 7;
        flex-flow: column nowrap;
        width: 22.916666666666666666666666666667%;
    }
    .banner_section div {
        flex: 1 1 0;}
    .banner_section div.banner_box_01 {
        background: #0175bb;}
    .banner_section div.banner_box_02 {
        background: #1261c9;}
    .social_section {
        order: 8;
        width: 17.083333333333333333333333333333%;
        height: 270px;
        background: #fe6eda;}
    .footer {
        order: 9;
        width: 100%;
        height: 94px;
        background: #474747;}
```


### HTML code source

```html 
<div id="wrap">
    <header class="header">
        <h1>h1 title is in this Ares...</h1>
        <nav>Navigation</nav>
    </header>
    <section class="slider_section"><br><br><br><br>slider_section</section>
    <section class="gallery_section">gallery_section</section>
    <section class="rankup_section">rankup_section</section>
    <section class="latest_post_section">latest_post_section</section>
    <section class="popular_post_section">popular_post_section</section>
    <section class="banner_section">
        <div class="banner_box_01">banner_box_01</div>
        <div class="banner_box_02">banner_box_02</div>
    </section>
    <section class="social_section">social_section</section>
    <footer class="footer">footer</footer>
</div>
```


<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>Document</title>
    <style>
    #wrap {
        display: flex;
        flex-flow: row wrap;
        width: 90%;
        margin: 0 auto;
    }
    .header {
        display: flex;
        order: 1;
        justify-content: flex-end;
        position: relative;
        width: 100%;
    }
    .header h1 {
        position: absolute;
        top: 0;
        left: 0;
        width: 12.5%;
        height: 80px;
        background: #ff6b57;
    }
    .header nav {
        width: 87.5%;
        min-height: 80px;
        background: #ff6b57;
    }
    .slider_section {
        order: 2;
        width: 50%;
        background: #3c90be;
    }
    .gallery_section {
        order: 3;
        width: 27.083333333333333333333333333333%;
        height: 440px;
        background: #f8de73;
    }
    .rankup_section {
        order: 4;
        width: 22.916666666666666666666666666667%;
        background: #00d2a5;
    }
    .latest_post_section {
        order: 5;
        width: 30%;
        background: #9cabe4;
    }
    .popular_post_section {
        order: 6;
        width: 30%;
        background: #d76817;
    }
    .banner_section {
        display: flex;
        order: 7;
        flex-flow: column nowrap;
        width: 22.916666666666666666666666666667%;
    }
    .banner_section div {
        flex: 1 1 0;
    }
    .banner_section div.banner_box_01 {
        background: #0175bb;}
    .banner_section div.banner_box_02 {
        background: #1261c9;}
    .social_section {
        order: 8;
        width: 17.083333333333333333333333333333%;
        height: 270px;
        background: #fe6eda;}
    .footer {
        order: 9;
        width: 100%;
        height: 94px;
        background: #474747;}
    </style>
</head>
<body>
    <div id="wrap">
        <header class="header">
            <h1>h1 title is in this Ares...</h1>
            <nav>Navigation</nav>
        </header>
        <section class="slider_section"><br><br><br><br>slider_section</section>
        <section class="gallery_section">gallery_section</section>
        <section class="rankup_section">rankup_section</section>
        <section class="latest_post_section">latest_post_section</section>
        <section class="popular_post_section">popular_post_section</section>
        <section class="banner_section">
            <div class="banner_box_01">banner_box_01</div>
            <div class="banner_box_02">banner_box_02</div>
        </section>
        <section class="social_section">social_section</section>
        <footer class="footer">footer</footer>
    </div>
</body>
</html>
