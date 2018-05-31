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
  <img src="https://www.innovedesigns.com/wp-content/uploads/2013/08/entypo-font-awesome.png" alt="">
  <figcaption>awesome-icons</figcaption>
</figure>


### cdn url address 목록

[cdnjs url 주소](https://cdnjs.com/libraries/font-awesome)

> https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css

> https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css.map

> https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css



### fontawesome 다운로드

[fontawesome.com Web](https://fontawesome.com/v4.7.0/get-started/) | [font-awesome-4.7.0.zip download](https://fontawesome.com/v4.7.0/assets/font-awesome-4.7.0.zip)


<br>
## 



**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}   