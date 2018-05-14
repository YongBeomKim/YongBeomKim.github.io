---
title : CSS Bootstrap 정리
last_modified_at: 2018-05-12T16:45:06-05:00
header:
  overlay_image: /assets/images/book/bootstrap.jpg
categories:
  - css
tags: 
    - ide
    - sublime
toc: true    
---


# Bootstrap

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
| `<table class="table">`  | 좌우 꽉 채우는 스타일 | 
| `<table class="table table-striped">`  | 좌우 채우고, row 마다 색적용 |
| `<table class="table table-hover">`   | 평범한 table에, Hover 시 색적용|


| row, cell 적용 class     | 내용 |
|-----------:|----------------------:|
| `.active`  | 회색 스타일 | 
| `.success`  | 연두색 스타일 |
| `.warning`  | 겨자색 스타일 |
| `.danger`   | 붉은색 스타일 





  **객체** 의 내부 여유공간 |
| margin   | **Tag** 의 여유공간 |


**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}   