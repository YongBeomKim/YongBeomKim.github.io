---
title : 웹표준 디자인 강좌 01 - Main Page
last_modified_at: 2018-07-16T12:45:06-05:00
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

**15vw :** 화면 **전체너비**를 **100vm** 을 기준으로 하고 상대적 크기값을 사용한다. 이는 화면의 크기가 변함에 따라 글자의 크기도 같이 변하게 된다 
{: .notice--info}


| 단위 |  내용설명 [실습URL](https://www.w3schools.com/cssref/tryit.asp?filename=trycss_unit_em)   |
|:----:|:------------------------------------------:|
| em   | 해당객체포함 클래스 폰트를 1로 삼는 비율값 |
| ex   | 해당객체포함 클래스 폰트의 x-높이를 기준   |
| ch   | "0"(zero) 을 기준으로 절대크기값 설정      |
| rem  | Root 클래스 폰트를 1로 하는 비율값         |
| vw   | 화면 전체 너비를 1%로 하는 비율값      |
| vh   | 화면 전체 높이를 1%로 하는 비율값      |
| vmin | 너비 높이중 작은값을 1%로 하는 비율값  |
| vmax | 너비 높이중 큰 값을 1%로 하는 비율값   |


<figure class="align-center">
  <img src="https://i.loli.net/2016/07/22/5791d750c02e3.png" alt="">
  <figcaption>vmax vmin</figcaption>
</figure>




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
  <figcaption>[https://fonts.google.com](https://fonts.google.com/?subset=korean) 폰트활용</figcaption>
</figure>


[구글폰트 오픈소스 모음](https://fonts.google.com/?subset=korean) 에서는 해당 폰트별 **HTML HEAD**에서 소스폰트를 불러오는 값과, **CSS** 에서 **font-family** 설정 값이 제공된다. 사용자는 원하는 폰트의 설정 내용을 복사해서 사용하면 된다.

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

**0.2em : 1) "vm"** 은 화면 너비(width)를  **2) vh** 는 화면의 높이(height)를 **100vm / 100vh** 를 기준으로 상대적 크기를 계산해서 출력한다면, **3) "em"** 은 해당 클래스 폰트크기를 **1em** 을 기준으로 상대적 크기값을 계산한다.
{: .notice--info}


<br>
## **section** tag

> < section class="" > < / section >

section 태그는 html 문서의 주요한 태그들을 별도로 묶을 때 사용한다. 때문인지 section 태그 내부에는 별도의 **header** 와 **footer**가 들어올 수 있다.


```html
<section class="conA">
    <div class="container">
        <h1>LOGGER</h1>
        <p>맛있고 즐거운 라이프로그</p>
    </div>
</section>
```

```css
.conA {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 450px;
}
```

**CSS** 설정은 Section 태그 내부만 적용됨이 원칙이고, `height: 100vh` 속성값으로 화면 전체로 Section 영역이 넓어진다.
{: .notice--info}

<br>
## 이미지 위에 Gradation 효과 덧입히기

```css
background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(img/fruits.jpg);
background-position: center;
```

**linear-gradient(rgba(시작컬러), rgba(끝 컬러))** : 점점 변화하는 컬러의 시작과 끝을 설정하면 자동으로 중간값을 연산한 결과를 화면에 출력한다. 참고로 **rgba()** 는 **Red, Green, Blue, Alpha** 값을 입력하고 이는 [W3 웹컬러](https://www.w3schools.com/colors/colors_picker.asp)등의 사이트를 활용하면 원하는 색상값을 찾을 수 있다
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

```css
.conA a {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 30px;
  border: solid 3px currentColor;
  border-radius: 6px;        // 경계의 라운드
  background-color: var(--accent-color);
  color: var(--text-bright-color);
  font-size: 14px;
  text-decoration: none;
}

.conA a:hover {
  background-image: linear-gradient(
    rgba(255,255,255,0.2),
    rgba(255,255,255,0.2)
  );
}
```

**var(--accent-color) :** 앞에서 선언한 **:root{}**로 선언한 객체를 CSS에서 활용할 때에는 var() 메소드로 객체를 풀어어서 사용한다
{: .notice--info}


<br>
## 개요 Text 

```html
<section class="conB">
    <div class="container">
        <div class="text">
            <span class="fa fa-bar-chart icon"></span>
            <h2>라이프로그란?</h2>
            <p>일상의 이런저런 것들을 기록하다 보면 보이지 않던 소중한 것들이 보입니다.</p>
            <a href="#">MORE<span class="fa fa-chevron-right"></span></a>
        </div>
    </div>
</section>
```


<br>
## 원형 아이콘 출력하기

[awsome font](https://fontawesome.com/icons?d=gallery&m=free)

```css
.conB .icon {
  line-height: 2em;
  border-radius: 50%;
  background-color: var(--icon-bk-color);
  color: var(--icon-color);
}
```


<br>
## **flex** - 자동 반응형 배치 설정

```css
.conB .container {
  padding-top: 80px;
  padding-bottom: 20px;
}

@media (min-width: 768px) {
  .conB .container {
    display: flex;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }

  .conB .text {flex: 1;}
  /*텍스트 분배비율 (1:1:1:.. 분할)*/
}
```

CSS3에서는 보다 복잡한 블록 타입 레이아웃 모드인 **flex** (firefox등)  **flexbox** (익스폴로러) 레이아웃을 지원한다. flexbox의 콘텐츠는 가용한 공간 내에서 **크기와 위치를 자동으로 조정** 한다.[자료출처](http://webdir.tistory.com/349)
{: .notice--info}


```css
@media (min-width: 768px) {
  .conC .container {
    display: flex;
    max-width: var(--large-width);
    margin-left: auto;
    margin-right: auto;
  }

  .conC .photo {flex: 3;}
  .conC .text  {flex: 2;
    padding: 50px;
  }
}
```

**photo** 를 3, **text** 를 2의 비율로 지정하여 배치를 한다. 이번에도 768px 보다 작을 때에는 한줄로 내려서 정렬이 된다.
{: .notice--info}


