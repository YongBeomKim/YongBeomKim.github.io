---
title : Tutorial / CSS Bootstrap
last_modified_at: 2018-05-12T16:45:06-05:00
header:
  overlay_image: /assets/images/book/bootstrap.jpg
categories:
  - css
tags: 
    - bootstrap
    - css
toc: true    
---


# Bootstrap 으로 디자인 하라

1장 부트스트랩 환경과 구조<br>
2장 부트스트랩 사이트 제작

[Django 적용](https://tutorial.djangogirls.org/ko/css/)<br>
[정식 Document](http://bootstrapk.com/css/) <br>
[Blog Document](http://maczniak.github.io/bootstrap/components.html)<br>
[간단 설명서](http://unikys.tistory.com/394)

실무자 블로그 글 중에 **https://materializecss.com/** 의 스타일을 더 추천하더라. 아직 나는 초보니까 ㅜㅜ... Bootstrap의 스타일을 익힌 뒤 **materializecss**을 확장해 나아가자  [사용자 blog](https://medium.com/chequer/materializecss-%EC%A0%81%EC%9A%A9%ED%9B%84%EA%B8%B0-b5ea72f4bc56)


<br>
## CDN Address [출처](http://bootstrapk.com/getting-started/)

```
<!-- 합쳐지고 최소화된 최신 CSS -->
link rel="stylesheet" 
href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"

<!-- 부가적인 테마 -->
link rel="stylesheet" 
href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css"

<!-- 합쳐지고 최소화된 최신 자바스크립트 -->
script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"
```


<br>

## Bootstrap 속성 추가

```css
  .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, 
  .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, 
  .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, 
  .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, 
  .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, 
  .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, 
  .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, 
  .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, 
  .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, 
  .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, 
  .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, 
  .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
    border: 1px solid black;
    padding: 10px;
  }
  .row{
    margin-bottom: 4px;
    margin-top: 4px;
    }
```

**Bootstrap CSS 라이브러리** 묶음에 속성값을 추가 가능하다
{: .notice--info} 


<br>
## Bootstrap 화면 분할하기


### column  modify  - push/ pull- (number)

**col-md- :**

<figure class="align-center">
  <img src="https://www.infragistics.com/community/cfs-filesystemfile/__key/CommunityServer.Blogs.Components.WeblogFiles/dhananjay_5F00_kumar.Maria_5F00_Blogs.Boostrap/0488.DJ_5F00_post_5F00_3.png" alt="">
  <figcaption> <strong>col-md-12 :</strong> 전체 길이를 **12로** 기준삼아 분할조절을 활용한다</figcaption>
</figure> 

1. **col-md-3 :**  <small>column modify 3 줄 차지하는 객체</small> 
2. **col-md-pull-3 :** <small>객체를 3줄 단위로 왼족으로 이동</small>
3. **col-md-push-3 :** 객체를 3줄 단위로 오른쪽 이동


**col-md-push-(num), col-md-pull-(num) :** 과 같은 **객체 이동옵션**은 길이를 정의한 객체에 한해서 적용되므로 **class="col-md-10 col-push-2"** 와 같은 방법으로 적용한다
{: .notice--info}


<br>
## Typo Graphy

[구글 한글폰트 사용법](https://fonts.google.com/?subset=korean)


### font-family 기본설정 옵션들

```css
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;        // 글꼴크기
  line-height: 1.425;     // 행간크기
  color: #333;            // 글꼴 색 : 진한회색
  background-color: #fff; // 배경 색 : 흰색
}
```

**Helvetica Neue :** 부트스트랩 기본 글꼴 설정값으로, 해당 폰트가 없으면 Arial 등을 순차적으로 찾아서 적용한다. 대한민국의 경우 대표적인 **"맑은 고딕"** 을 추가해 주면 환경별 차이를 줄일 수 있다
{: .notice--info}


```css
body {
  font-family: "Helvetica Neue", Helvetica, Arial, 
               "맑은 고딕", "Malgun gothic", sans-serif;
}
```


### @ import 

```html
<style>
@import url('https://fonts.googleapis.com/css?family=Do+Hyeon');
</style>
```

**@import** 구문을 사용하면, 본문 가운데라도 **style** 태그를 활용하여 손쉽게 외부 폰트를 추가한 뒤 tag 내부에서 스타일 속성을 활용하여  `font-family: 'Do Hyeon', sans-serif;`  와 같은 방식으로 깔끔하게 적용 가능하다
{: .notice--info}


### @ font-face

CSS 분법을 사용하여 font 객체 추가하기 [web info](https://www.cmsfactory.net/how-to-download-nanumgothic-webfonts)

```css
@font-face{
  font-family:'NanumGothic';
  src: url("//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.eot");
  src:local(""), url('url(//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.woff') format("woff");
}
  body{
    font-family: "Helvetica Neue", Helvetica, Arial,"맑은 고딕","NanumGothic",  sans-serif;
  }
```

CSS 파일에 직접 @font-face 속성을 이용하여 처리함이 가정 명확하고, Google font에서 제공되는 Nanum Brush ,Hanna 등의 여러 폰트를 직업 가져와서 적용한다
{: .notice--info}


### Google 의 외부폰트 활용

[Do+Hyeon 폰트 안내 페이지](https://fonts.google.com/specimen/Do+Hyeon?selection.family=Do+Hyeon)

```css
<link href="https://fonts.googleapis.com/css?family=Do+Hyeon" rel="stylesheet">
<style type="text/css">
  body{
  font-family: 'Do Hyeon', sans-serif;
}
```


## Font 관련 속성들

### 문단정렬

| class 선택자  | 내용 |
|--------------:|-----:|
| .text-left    | 왼쪽정렬 |
| .text-center  | 가운데 정렬 |
| .text-right   | 오른쪽 정렬 |


### 스타일 class

[bootstrap 스타일 예제](https://getbootstrap.com/docs/4.0/utilities/colors/)

```html
<p class="text-primary">.text-primary</p>
<p class="text-secondary">.text-secondary</p>
<p class="text-success">.text-success</p>
<p class="text-danger">.text-danger</p>
<p class="text-warning">.text-warning</p>
<p class="text-info">.text-info</p>
<p class="text-light bg-dark">.text-light</p>
<p class="text-dark">.text-dark</p>
<p class="text-muted">.text-muted</p>
<p class="text-white bg-dark">.text-white</p>
```



### 인용어구 스타일 적용

```html
<blockquote class="pull-left" style="font-weight:bold;">
    포트폴리오 최적 분산비율 예측
    <small>몬테카를로 시뮬레이션을 활용</small>
</blockquote>
```

**pull-left**, **pull-right** 로 정렬을 정의할 수 있다
{: .notice--info}


<br>
## Table 에 적합한 스타일 적용

| table 적용 class          | 내용 |
|--------------------------:|----------------------:|
| **table class="table"**  | 좌우 꽉 채우는 스타일 | 
| **table class="table table-striped"**  | 좌우 채우고, row 마다 색적용 |
| **table class="table table-hover"**   | 평범한 table에, Hover 시 색적용|


| row, cell 적용 class     | 내용 |
|-----------:|----------------------:|
| **.active**  | 회색 스타일 | 
| **.success**  | 연두색 스타일 |
| **.warning**  | 겨자색 스타일 |
| **.danger**   | 붉은색 스타일 

<br>
## Form 객체에 스타일 적용하기

```html
<form class="form-group sr-only">
```

**.form-group :** 클래스를 적용하면 bootstrap 기본 Form 스타일을 적용한다. **.sr-only :** label 은 화면에서 보이지 않게 처리한다
{: .notice--info}


```html
<form role="form" class="form-inline">
    <div class="form-group">
        <label for="Name" class="sr-only">이름</label>
        <input type="text" class="form-control" placeholder="이름">
    </div>
    <div class="form-group">
        <label for="emailaddress" class="sr-only">이메일</label>
        <input type="email" class="form-control" placeholder="이메일">
    </div>
    <div class="form-group">
        <button type="submit"> 확인</button>
    </div>
</form>
```

개별 영역들이 `<div>`로 나눠져 있지만, **.form-inline** 클래스를 적용하면 반응형 웹 내용을 적용한다 
{: .notice--info}

```html
<form class="form-horizontal">
<div class="form-group">
  <label for="email" class="col-xs-2 col-lg-2 control-label">이메일</label>

  <div class="col-xs-10 col-lg-10">
      <input type="email" class="form-control" placeholder="이메일">
  </div>

</div>
</form>
```

label 객체는 `class="col-xs-2 col-lg-2 control-label"` 그리고 control 객체를 `class="col-xs-10 col-lg-10"` 로 좌우 너비값을 지정하여 화면 분할하여 적용할 수 있다
{: .notice--info}


<br>
## button 객체와 이미지 & Helper Class

```html
<button type="button" class="btn btn-primary btn-lg">큰 버튼 btn-lg</button>
<button type="button" class="btn btn-default btn-sm">작은 버튼 btn-sm</button>
```

**btn** 버튼을 **flat** 하게 변형 , 
**btn-block** 버튼을 블록 **level** (width:100%) 로 적용 , 
**btn-primary / btn-default** Style을 **blue (white)**로 적용 ,
**btn-lg / btn-sm/ btn-xs** 버튼의 **크기**를 크게 (작게/ 아주작게) 적용 
{: .notice--info}


<br>

## 객체 Layout
```html
<section class="box1 pull-right">
   pull-right을 적용해서 오른쪽에 박스가 배치
</section>
<section class="box1 pull-left">
   pull-left을 적용해서 왼쪽에 박스가 배치
</section>        
```

단 navigation bar 에서는 **.navbar-right** , **.navbar-left**를 적용해야만 한다
{: .notice--info}


<figure class="align-center">
  <img src="http://mblogthumb1.phinf.naver.net/MjAxNzAzMTdfODQg/MDAxNDg5NzEwNzk3MzYy.u9hTYsmzUVy2ZgeRvxKd1Azzjeev-bDLXwEuYcfkQ_Yg.jnQetor6LG6wWQYtpaOXNPgbSJYiiDjM_uzc6QbK8nIg.PNG.zdr55/%EC%A0%9C%EB%AA%A9_%EC%97%86%EC%9D%8C.png?type=w800" alt="">
  <figcaption> class 속성값에 따른 반응형 크기 테이블 </figcaption>
</figure>


<br>
## Panel 스타일 적용

```html
<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">Panel title</h3>
    </div>
    <div class="panel-body">
        Panel content
    </div>
</div>
```


<figure class="align-center">
  <img src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2013/12/printpreview2.png" alt="">
  <figcaption> div 태그로 분할한 영역에 대한 스타일 지정</figcaption>
</figure> 


<br>
## Page 패널 제목너비 적용하기

```html
<div class="jumbotron">
  <div class="container">
    <h1>Jumbotron  내부에 Container 포함시 ....  Hello, world!</h1>
    <p>점보트론을 이용하면, 웹사이트에서 중요한 내용 또는 공지사항 등을  부각시킬 수 있습니다. </p>
    <p><a class="btn btn-primary btn-lg">Learn more</a></p>
  </div>
</div>

<div class="container">
   <div class="jumbotron">
      <h1>Container 내부에 Jumbotron 포함시 ....  Hello, world!
        <small>여기는 점보트론 내의 h1 글꼴 크기입니다. </small></h1>
      <p>여기는 .container 내부에 있는 일반 글꼴 크기입니다.  </p>
      <p><a class="btn btn-primary btn-lg">Learn more</a></p>
  </div>
</div>
```

**.container** 는 **여백 스타일**을 적용하고, **.jumbotron** 는 **전체 너비를 사용**한다. 이는 **div 태그** 로 너비속성값 우선순위에 따라서 스타일이 다르게 적용된다
{: .notice--info}  


## progress bar style  

```html
<div class="progress">
  <div class="progress-bar progress-bar-success" aria-valuenow="40"
      aria-valuemin="0" aria-valuemax="100" style="width: 40%">
    <span class="sr-only">40% Complete (success)</span>
  </div>
</div>
```

1) **.progress** 로 객체를 선언한 뒤, 2) **.progress-bar** 로 값을 적용하고  3) **progress-bar-success** 로 스타일을 선언한다
{: .notice--info}

**-success :** 녹색, **-info :** 파랑, **-warning :** 노랑 **-danger :** 빨강
{: .notice--info}

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


<br/>
## Navigation Bar 스타일 적용하기

[navbar 기본 스타일](http://zzznara2.tistory.com/562)<br/>
[navbar customiz](http://twitterbootstrap.org/bootstrap-navbar-background-color-transparent/)<br/>
[navbar style](https://getbootstrap.com/docs/3.3/examples/navbar-fixed-top/)<br/>
[navbar color style](http://humy2833.dothome.co.kr/customizing.html)<br/>

