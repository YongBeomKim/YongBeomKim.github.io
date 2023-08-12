---
title : css 비지니스 페이지 
last_modified_at: 2018-05-29T12:45:06-05:00
header:
  overlay_image: /assets/images/book/css.jpg
categories:
  - css
tags: 
    - css
    - react
toc: true    
---


# 모던 웹사이트 디자인의 정석

HTML5 & CSS3 Design Book 5장 - <small>**EBISUCOM**</small>

**기본 페이지 만들기**


<br><br>
# Sample Page

<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>샘플</title>
    <meta name="viewport" content="width=device-width">
    <style type="text/css">
    /* 자식객체의 class 가 box~ 가 아닐 때*/
    [class^="box"] > *:not([class^="box"]) {
        min-height: 0;
        line-height: 1.5;
        color: #000000;
        font-size: 14px;
        font-family: '맑은 고딕', 'Apple SD Gothic Neo', sans-serif;
        font-weight: normal;
        text-align: left;}

    [class^="box"] > [class^="box"],
    div:not([class]) > div:not([class]){
        border-color: #e0e03d;
        color: #e0e03d;
        background-color: #ffe;}

    /*### 박스 내부의 요소 성격들 정의하기*/
    .sites h1 {
        margin: 0;
        font-size: 30px}
    .sites h1 a {
        color: #000000;
        text-decoration: none}

    /*### 네비게이션 설정 */
    .menus ul {
        margin:0;
        padding:0;
        list-style: none}
    .menus li a{
        display:block;
        padding:5px;
        color: #000000;
        font-size: 14px;
        text-decoration: none}
     .menus ul:after{
        content: "";
        display:block;
        clear:both;}
    .menus li{
        float:left;
        width:auto;}
    /*### 헤더 이미지 설정하기*/
    .topimg {
        max-width: 100%;
        /*max-height: 500px;*/
        height:auto;
        vertical-align: bottom;}
    /*### 공지사항*/
    .newses h1 {
        margin-top:0;
        margin-bottom: 5px;
        font-size: 18;
        color:#666666;}
    .newses ul {
        margin: 0;
        padding: 0;
        list-style: none;}
    .newses li a {
        display: block;
        padding: 5px;
        color: #000000;
        font-site: 14px;
        text-decoration: none;
        border-bottom: dotted 2px #dddddd;}
    .newses li a:hover{
        background-color: #eeeeee}
    .newses time{
        margin-right: 10px;
        color: #888888;
        font-weight: bold;}
    </style>
</head>
<body>
    <!-- Top Naviagation  -->
    <div class="boxA">
        <!-- Title bar -->
        <div class="box1">
            <div class="sites">
                <h1><a href="#">Korea Strock Review</a></h1>
            </div>
        </div>
        <!-- Menu item -->
        <div class="box2">
            <nav class="menus">
                <ul>
                    <li><a herf="#">메인</a></li>
                    <li><a href="#">연혁</a></li>
                    <li><a hreg="#">사업소개</a></li>
                    <li><a href="#">채용문의</a></li>
                </ul>
            </nav>
        </div>
    </div>
    <!-- Header Image Item -->
    <div class="box3">
        <img src="http://www.rmpholdings.co.za/wp-content/uploads/2015/07/business-network-banner.jpg" alt="" class="topimg">
    </div>
    <!-- 공지사항 메뉴  -->
    <div class="box4">
        <div class="newses">
            <h1> 공 지 사 항 </h1>
            <ul>
                <li><a href="#">
                    <time datetime="2018-06-01">06/01 </time> 데이터센터 유지보수를 수행한다</a></li>
                <li><a href="#">
                    <time datetime="2018-05-25">05/25 </time> 모바일 버젼을 확인한다</a></li>
                <li><a href="#">
                    <time datetime="2018-05-15">05/15 </time> 공지사항</a></li>
            </ul>
        </div>
    </div>
    <!-- footer Design -->
    <div class="box5">
        <div class="copyright">
            <p>Copyright &copy; usernameStock</p>
        </div>
    </div>
</body>
</html>


<br><br>
## Box 기본 Layout

### HTML

```html
<div class="boxA">
    <div class="box1">BOX1</div>
    <div class="box2">BOX2</div>
</div>
<div class="box3">BOX3</div>
<div class="box4">BOX4</div>
<div class="box5">BOX5</div>
```


### CSS3 기본 Style

**regex 정규식**을 사용하여 "box"로 시작하는 모든 속성에 공통적 적용한다 

```css
@charset "UTF-8";
body    {font-family: '맑은 고딕', 'Apple SD Gothic Neo', sans-serif}

body>div:not([class]) {min-height: 200px}

[class^="box"],
div:not([class]){
    border: solid 8px #faa;
    color: #faa;
    background-color: #fee;
    -webkit-box-sizing: border-box;  
    -moz-box-sizing: border-box;
    box-sizing: border-box; // 브라우저별 경계 활성화
    text-align: center;
    line-height: 200px;
    font-family: Verdata, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 40px;}

/* 자식객체의 class 가 box~ 가 아닐 때*/
[class^="box"] > *:not([class^="box"]) {
    min-height: 0;
    line-height: 1.5;
    color: #000000;
    font-size: 14px;
    font-family: '맑은 고딕', 'Apple SD Gothic Neo', sans-serif;
    font-weight: normal;
    text-align: left;}

[class^="box"] > [class^="box"],
div:not([class]) > div:not([class]){
    border-color: #e0e03d;
    color: #e0e03d;
    background-color: #ffe;}
```



### Media Query 구문을 적용

768px 이상일때 적용하는 미디어쿼리문, BOX1과 BOX2를 가로정렬 한다

```css
@media (min-width: 768px) {
    .boxA:after {
        content: "";
        display: block;
        clear: both}
    .box1 {
        float: left;
        width: 50%}
    .box2 {
        float: left;
        width: 50%}
    }
```



<br>
## 내부요소 레이아웃 정의하기

### **H1** Tag 속성값을 정의

```css
/*### 박스 내부의 요소 성격들 정의하기*/
.site h1 {
    margin: 0;
    font-size: 30px}
.site h1 a {
    color: #000000;
    text-decoration: none}
```



<br>
## 네비게이션 Bar 설정

### HTML5

```html
<!-- Top Naviagation  -->
<div class="boxA">

    <!-- Title bar -->
    <div class="box1">
        <div class="site">
            <h1><a href="#">Korea Strock Review</a></h1>
        </div>
    </div>

    <!-- Menu item -->
    <div class="box2">
        <nav class="menu">
            <ul>
                <li><a herf="#">메인</a></li>
                <li><a href="#">연혁</a></li>
                <li><a hreg="#">사업소개</a></li>
                <li><a href="#">채용문의</a></li>
            </ul>
        </nav>
    </div>
</div>
```



### 네비게이션바 속성값 설정

```css
.menu ul {
    margin:0;
    padding:0;
    list-style: none
}
.menu li a{
    display:block;
    padding:5px;
    color: #000000;
    font-size: 14px;
    text-decoration: none
}
.menu ul:after{
    content: "";
    display:block;
    clear:both;
}
.menu li{
    float:left;
    width:auto;
}
```



<br>
## Main Page Image 설정 


### HTML5 

```html
<!-- Header Image Item -->
<div class="box3">
    <img src="./img/map2.gif" alt="" class="topimg">
</div>

<!-- 공지사항 메뉴  -->
<div class="box4">
    <div class="news">
        <h1> 공 지 사 항 </h1>
        <ul>
            <li><a href="#">
                <time datetime="2018-06-01">06/01 </time> 데이터센터 유지보수를 수행한다</a></li>
            <li><a href="#">
                <time datetime="2018-05-25">05/25 </time> 모바일 버젼을 확인한다</a></li>
            <li><a href="#">
                <time datetime="2018-05-15">05/15 </time> 공지사항</a></li>
        </ul>
    </div>
</div>

<!-- footer Design -->
<div class="box5">
    <div class="copyright">
        <p>Copyright &copy; usernameStock</p>
    </div>
</div>
```


### 헤더 이미지 속성값 정의하기

```css
/*### 헤더 이미지 설정하기*/
.topimg {
    max-width: 100%;
    /*max-height: 500px;*/
    height:auto;
    vertical-align: bottom;
}
```



<br>
## 공지사항 Text 설정 

### 게시판 Text 속성값 정의하기

```css
.site h1 {
    margin: 0;
    font-size: 30px}
.site h1 a {
    color: #000000;
    text-decoration: none}

.news h1 {
    margin-top:0;
    margin-bottom: 5px;
    font-size: 18;
    color:#666666;
}
.news ul {
    margin: 0;
    padding: 0;
    list-style: none;
}
.news li a {
    display: block;
    padding: 5px;
    color: #000000;
    font-site: 14px;
    text-decoration: none;
    border-bottom: dotted 2px #dddddd;
}
.news li a:hover{
    background-color: #eeeeee
}
.news time{
    margin-right: 10px;
    color: #888888;
    font-weight: bold;
}
```
