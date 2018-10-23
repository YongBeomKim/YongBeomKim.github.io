---
title : CSS Bootstrap 예제로 정리
last_modified_at: 2018-05-12T20:45:06-05:00
header:
  overlay_image: /assets/images/book/bootstrap.jpg
categories:
  - css
tags: 
    - bootstrap
    - css
toc: true    
---

<br>
# Bootstrap 으로 디자인 하라

1장 부트스트랩 환경과 구조<br>
2장 부트스트랩 사이트 제작

[Django 적용](https://tutorial.djangogirls.org/ko/css/)<br>
[정식 Document](http://bootstrapk.com/css/) <br>
[Blog Document](http://maczniak.github.io/bootstrap/components.html)<br>
[간단 설명서](http://unikys.tistory.com/394)

실무자 블로그 글 중에 **https://materializecss.com/** 의 스타일을 더 추천하더라. 아직 나는 초보니까 ㅜㅜ... Bootstrap의 스타일을 익힌 뒤 **materializecss**을 확장해 나아가자  [사용자 blog](https://medium.com/chequer/materializecss-%EC%A0%81%EC%9A%A9%ED%9B%84%EA%B8%B0-b5ea72f4bc56)


<br>
## Navigation Bar 스타일 적용

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="bootstrap.min.js"></script>
```

버튼식 네이게이션 **navbar-toggle**을 활성화 하려면 **Jquery** 와 **bootstrap.min.js** 를 함께 설정해야 한다 <strong><small> 이 둘을 활성화 해야만 navbar toggle 이 활성화 된다</small></strong>
{: .notice--info}


### Head 속성 정의하기

```html
<head>
    <meta charset="utf-8">
    <style>
    @import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400);
    .navbar {
        background-color: #fff;
    }
    .navbar-toggle {  // navbar toggle 버튼 정의
        position: relative;
        margin-top: 47px;
        top: 2px;
    }
    .navbar-nav {     // navbar 정의
        padding-right: 10px;
        margin-top: 20px;
        background-color: #fff
    }
    .navbar-nav li {   // navbar 텍스트 자간 정의
        margin: 0 20px;
    }
    </style>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="bootstrap.min.js"></script>
</head>
```


### 본문 내용 정의하기 

```html
<nav class = "navbar navbar-default navbar-fixed-top" 
     role  = "navigation" 
     id    = "navbar-scroll">
    <div class = "container">
        <div class="navbar-header">
            <button type  = "button" 
                    class = "navbar-toggle" 
                    data-toggle = "collapse" 
                    data-target = ".navbar-1-collapse">
                <span class = "sr-only">Toggle navigation</span>
                <span class = "icon-bar"></span>
                <span class = "icon-bar"></span>
            </button>
            <a class = "navbar-brand" href="#">
            <img src = "python.svg" alt = "9PixelStudio" height = "80"></a>
        </div>

        <div class="collapse navbar-collapse navbar-right navbar-1-collapse">
            <ul class="nav navbar-nav">
                <li><a href="#">home </a></li>
                <li><a href="#">about </a></li>
                <li><a href="#">contact </a></li>
            </ul>
        </div>
    </div>
</nav>
```


<br>
## Carousel 이미지 자동 슬라이드

[Document](http://bootstrap4.kr/docs/4.0/components/carousel/)
