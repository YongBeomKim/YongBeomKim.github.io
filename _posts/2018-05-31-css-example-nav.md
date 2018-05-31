---
title : css navbar toggle
last_modified_at: 2018-05-31T12:45:06-05:00
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

**네비게이션 메뉴를 토글로 변환**


<br>
## 상단메뉴 정렬하기 

### 메뉴의 정렬

> @media (max-width: 767px){css문법} 

**767px 보다 작을때** : <small>모바일 메뉴 디자인</small>

> @media (min-width: 768px){css문법} 

**768px 보다 클때** : <small>데스크탑 메뉴 디자인</small>


메뉴 내용을 전체인식 CSS 문법이 아닌, 페이지별 CSS 설정을 분할하여 개별적 적용하도록 한다 
{: .notice--info} 



<br>
## 토클 버튼 생성하기

### Jquery 활용하기

[cdn Url 주소](https://cdnjs.com/libraries/jquery/)

[jquery.min](https://code.jquery.com/jquery-3.3.1.min.js)

[web site](https://jquery.com/download/)


### 메뉴버튼 만들기

```html
<div class="box">
<button type="button" id="menubtn">메뉴</button>
<nav class="menu" id="menu">
    <ul>
        <li><a href="#">메인</a></li>
    </ul>
</nav>
</div>
```


### Jquery 문법 사용하기

```html
<script src="./img/jquery-3.3.1.min.js"></script>
<script>
$(function(){
    $("#menubtn").click(function(){
        $("#menu").slideToggle();
    });
});
</script>
```

`button id="menubtn"`  < nav id = "menu" > 태그의 표시/ 비표시 슬라이드 애니메이션을 활성화 한다



### 데스크탑 화면에서 토글버튼 숨기기

```css
/* ##### 768px 이상일때 ##### */
@media (min-width: 768px) {
    #menubtn {    /*메뉴버튼 숨기기*/
        display: none;}
    #menu {       /* 네비게이션 출력*/
        display: block !important}}
```



<br>
## 토클 버튼 Design 꾸미기

### 토글버튼에서 글자 숨기기

```css
@media (max-width: 767px){
    #menu {   /*### 매뉴 text*/
        display: none}
    #menubtn i {  /*### 토글버튼 꾸미기*/
        color:#888888;
        font-size: 18px;}
    #menubtn span {
        display: inline-block;
        text-indent: -999px;}}
```



### button 태그 버튼 디자인 바꾸기

> <button type="button" id="menubtn">

```css
@media (max-width: 767px){
    #menubtn {
        padding: 6px 12px;
        border: solid 1px #aaaaaa;
        border-radius: 5px;
        background-color: #ffffff;
    }};
```


### button 태그 버튼 위치 및 세부디자인 설정

```css
@media (max-width: 767px){
    #menubtn {
       ....
       position: absolute;
       top: 20px;
       right: 15px;
       cursor:pointer;}

    #menubtn:hover {
        background-color: #dddddd;}

    #menubtn:focus {
        outline: none;}};
```

`cursor:pointer;`  마우스 포인터를 위에 올렸을 때 손가락 모양으로 바꾼다
{: .notice--info}


<br>
## 데스크탑 메뉴 디자인하기

> border-left: solid 20px #c50018;

빨간색 버튼 모양의 박스를 생성한다


**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}   