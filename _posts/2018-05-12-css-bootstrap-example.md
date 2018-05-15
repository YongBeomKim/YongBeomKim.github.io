---
title : CSS Bootstrap 컴포넌트
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

<br>
# Bootstrap 으로 디자인 하라

1장 부트스트랩 환경과 구조<br>
2장 부트스트랩 사이트 제작

[정식 Document](http://bootstrapk.com/css/) <br>
[간단 설명서](http://unikys.tistory.com/394)

실무자 블로그 글 중에 **https://materializecss.com/** 의 스타일을 더 추천하더라. 아직 나는 초보니까 ㅜㅜ... Bootstrap의 스타일을 익힌 뒤 **materializecss**을 확장해 나아가자  [사용자 blog](https://medium.com/chequer/materializecss-%EC%A0%81%EC%9A%A9%ED%9B%84%EA%B8%B0-b5ea72f4bc56)

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

**.progress** 로 객체를 선언한 뒤, **.progress-bar** 로 값을 적용하고  **progress-bar-success** 로 스타일을 선언한다
{: .notice--info}

**-success :** 녹색, **-info :** 파랑, **-warning :** 노랑 **-danger :** 빨강
{: .notice--info}






**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}   