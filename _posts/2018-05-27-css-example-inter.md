---
title : css Page 맛보기
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


# 반응형 웹 만들기 둘째마당

메인 페이지 만들기 

반응형 웹 만들기 2판 <small>-김운아- 이지스퍼블리싱</small>


<br>
## 페이지 상단 작업하기 

### .header CSS Style
헤더 영역의 구조 작업

> display: **flex**;<br>
> order: **2**;<br>
> flex-direction: **column**;
> position: **relative**;
> width: **100%**;

order: **2**; 는 모바일 화면구조시 2번째로 배치된다
{: .notice--infoxx}


### .header Html 

```html
<header class="header">
    <h1 class="logo">
        <a href="index.html">flat<br>design</a>
    </h1>
    <nav class="nav">
        <ul class="gnb">
            <li><a href="#">Home</a><span class="sub_menu_toggle_btn">sub menu</span></li>
            <li><a href="#">About</a><span class="sub_menu_toggle_btn">sub menu</span></li>
        </ul>
    </nav>
    <span class="menu_toggle_btn">Menu Toggle</span>
</header>
```


<br>
## Slider 영역 구조작업하기

### css style 

슬라이더 영역 CSS

```css
.slider_section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    order: 3;
    width: 100%;
    height: 300px;
    background: url(img/img.jpg) center center no-repeat;}
```

**background: url(img/img.jpg) center center no-repeat** 배경 이미지를 가운데에 배치한다 
{: .notice--info}


```css
.slider_section span {
    width: 34px;
    height: 39px;
    text-indent: -9999px;
    background: url(img/arrow.png) no-repeat;
    cursor: pointer;}

span.prev_btn {
    margin-left: -10px;
    background-position: 0 0;}
```


**fallback** 기법으로, 길이설정에 **px, rem** 두가지 기준값을 모두 적용하여 다양한 상황에서의 오류를 방지한다
{: .notice--info}


## Navigation Bar 예제


[navbar 기본 스타일](http://zzznara2.tistory.com/562)<br>
[navbar customiz](http://twitterbootstrap.org/bootstrap-navbar-background-color-transparent/)<br>
[navbar style](https://getbootstrap.com/docs/3.3/examples/navbar-fixed-top)<br>
[navbar color style](http://humy2833.dothome.co.kr/customizing.html)