---
title : HTML5 + CSS3 디자인
last_modified_at: 2018-07-13T12:45:06-05:00
header:
  overlay_image: /assets/images/book/html.jpg
categories:
  - html
tags: 
    - web
    - html
    - design
toc: true 
---


# HTML5 + CSS3 디자인

**모던 웹사이트 디자인의 정석**  [구판](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158390211&orderClick=LAH&Kc=) 의 최신개정판으로 HTML5 에서 추가된 태그들의 내용들을 활용해서 작업하는 내용으로 구성되어 있다. 이번 페이지에서는 추가 및 변경된 내용을 중심으로 정리를 해 보려고 한다.


<figure class="align-center">
  <img src="https://icreateadvertising.com.au/wp-content/uploads/2015/10/html5-1500x470.gif" alt="">
  <figcaption></figcaption>
</figure>


<br>
## Main Frame 설정

```html
<html lang = "ko">
<head>                        <!-- 외부에 출력되지 않는 설정 -->
    <meta charset = "UTF-8">  <!-- 파일의 인코딩 정보를 정의 -->
    <title>Sample</title>
    <meta name = "viewport"   <!--모바일 장치에 따라 출력설정-->
          content = "width=device-width, initial-scale=1.0">
    <link rel = "stylesheet"  <!-- 외부 CSS 설정을 불러온다 -->
          href = "style.css">
</head>
<body></body>
</html>
```

<br>
## CSS 변수 값 설정 - **:root {}**

```css
@charset "UTF-8";
:root {
    --main-color: #5D9AB2;      //메인색  
    --accent-color: #BF6A7A;    //강조색
    --dark-main-color: #2B5566; //어두운색
}
```
css 에서 반복적으로 사용하는 value 값을 재활용하기 쉽도록 **--변수명 : 값** 의 방법으로 객체를 생성한다. 하지만 모든 브라우저가 지원하는 포맷은 아니므로 이에 대응하는 `color:#fff` 등의 내용도 함께 설정한다
{: .notice--info} 


<br>
## 반응형 폰트크기 설정

```css
.conA h1 {font-size: 15vw;}
.conA p  {font-size: 18px;}
```

**15vw :** 화면의 너비를 **100vm** 을 기준으로 하고 상대적 크기값을 사용한다. 이는 화면의 크기가 변함에 따라 글자의 크기도 같이 변하게 된다 
{: .notice--info}


<br>
## 반응형 Break Point 

```css
@media (min-width: 768px) {
    .conA h1 {font-size: 115px;}
    .conA p  {font-size: 24px;}
}
```

**min-width: 768px** 화면 너비가 **최소 768 이상**일 때에 적용하는 설정값으로, 글자가 과도하게 커지는 것을 방지한다
{: .notice--info}  


<br>
## 구글 웹폰트 사용 

<figure class="align-center">
  <img src="http://www.bloter.net/wp-content/uploads/2016/06/google_font_rebrand_02.png" alt="">
  <figcaption>[https://fonts.google.com](https://fonts.google.com)
 에서 폰트 활용하기</figcaption>
</figure>


[폰트 오픈소스 모음](https://fonts.google.com) 에서는 해당 폰트별 **HTML HEAD**에서 소스폰트를 불러오는 값과, **CSS** 에서 **font-family** 설정 값이 제공된다. 사용자는 원하는 폰트의 설정 내용을 복사해서 사용하면 된다.

```html
<link href="https://fonts.googleapis.com/css.." rel="stylesheet">
```

```css
body {font-family: '맑은고딕'}
.conA {font-family: 'Montserrat', sans-serif;}
```

해당 페이지의 기본폰트를 설정하고, 태그 및 class 별 고유의 폰트 설정을 OverWriting 하는 방식으로 작동한다.


<br>
## letter-spacing : 폰트 자간간격 설정

```css
.conA h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 15vw; 
    letter-spacing: 0.2em;
    margin-left: 0.2em;
}
```

**0.2em : 1) "vm"** 은 화면 너비값(width)을  **2) vh** 는 화면의 높이값(height) 을 **100vm / 100vh** 를 기준으로 상대적 크기를 계산해서 출력한다면, **3) "em"** 은 해당 클래스 폰트크기를 **1em** 을 기준으로 상대적 크기값을 계산한다.
{: .notice--info}


<br>
## **section** tag

> < section class="" > < / section >

section 태그는 html 문서의 주요한 태그들을 별도로 묶을 때 사용한다. 때문인지 section 태그 내부에는 별도의 **header** 와 **footer**가 들어올 수 있다.


<br>
## 이미지 위에 Gradation 효과 덧입히기

```css
background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(img/fruits.jpg);
background-position: center;
```

**linear-gradient(rgba(시작컬러), rgba(끝 컬러))** : 점점 변화하는 컬러의 시작과 끝을 설정하면 자동으로 중간값을 연산한 결과를 화면에 출력한다. 참고로 **rgba()** 는 **Red, Green, Blue, Alpha** 값을 입력하고 이는 [https://www.w3schools.com/colors/colors_picker.asp](https://www.w3schools.com/colors/colors_picker.asp)등의 사이트를 활용하면 원하는 색상값을 찾을 수 있다
{: .notice--info}


<br>
## 로고 이미지 출력 

```css
.conA img {width: 20%;}
```

로고 img src 그림을 부모의 요소 너비의 20%의 크기로 지정한다.
{: .notice--info}


```html
<svg width="100" height="100">
</svg>

<svg viewBox="0 0 100 100">
</svg>
```

<br>
## 링크연결 버튼 스타일 정의하기

