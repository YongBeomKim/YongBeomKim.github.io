---
title : css awesomefont, Layout
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

**레이아웃 조정하기**


<br>

## 네비게이션 메뉴 조절하기

`width:auto;` 객체의 길이만큼 크기를 정한다 

`border: solid 8px #faa;` 경계선 객체에는 색이 추가된다

`max-width: 100%;`  이미지 크기를 기준으로 100% 

`width: 100%`   화면 크기를 기준으로 100%


<br>

## 화면의 3단배치 새롭게 정렬하기

**ClearFix** 를 사용하여 크기축소시 일렬로 정렬

```css
@media (min-width: 768px) {
    .box6:after {
        content: "";
        display: block;
        clear: both;}
    .box6-1 {
        float:left;
        width:33.33333%;}
    .box6-2 {
        float:left;
        width:33.33333%;}
    .box6-3 {
        float:left;
        width:33.33333%;}
    }
```



<br>
## font-awesome 아이콘 활용하기

<figure class="align-center">
  <img src="http://themeflection.com/wp-content/uploads/2015/07/font-awesome-array-760x400.jpg" alt="">
  <figcaption>awesome-icons</figcaption>
</figure>


### cdn url address 목록

[cdnjs url 주소](https://cdnjs.com/libraries/font-awesome)

> https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css

> https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css.map

> https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css



### fontawesome 다운로드

[Web Site](https://fontawesome.com/v4.7.0/get-started/) // [font-awesome-4.7.0.zip download](https://fontawesome.com/v4.7.0/assets/font-awesome-4.7.0.zip)


<br>
## Header 이미지에 Copy 메세지 올리기

```css
.topimg {
    max-width: 100%;
    height:auto;
    vertical-align: bottom;
}
```

```css
/* ### 캐치카피 ### */
.catch {
    margin:0px;
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.7);
    font-size: 18px;}

/* ### 이미지와 카피를 중첩한다 ### */
.top {position: relative;}

.catch {
    position:absolute;
    bottom: 7%;
    left: 3%;}
```


## 삼각형 메뉴 CSS로 만들기

[css 모델을 그린뒤 소스 베껴오기](http://www.cssarrowplease.com/)

```css
.follow-info:after {
    top:100%;
    left: 50%;
    border: solid transparent;
    content: "";
    height: 0px;
    width: 0px;
    position: absolute;
    pointer-events: none;
    border-color: rgba(221, 221, 221, 0);
    border-top-color: #dddddd;
    border-width: 15px;
    margin-left: -15px;
}
```
