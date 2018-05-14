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
  .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
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

## Bootstrap 속성 추가

<figure class="align-center">
  <img src="https://www.infragistics.com/community/cfs-filesystemfile/__key/CommunityServer.Blogs.Components.WeblogFiles/dhananjay_5F00_kumar.Maria_5F00_Blogs.Boostrap/0488.DJ_5F00_post_5F00_3.png" alt="">
  <figcaption> <strong>col-md-12 :</strong> 12 전체 길이를 12로 기준삼아서 분할조절 활용하면 된다</figcaption>
</figure> 

| box 속성 | 내용 |
|---------:|-----:|
| Content  | 객체 |
| border   | **객체** 의 내부 여유공간 |
| margin   | **Tag** 의 여유공간 |


**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}   