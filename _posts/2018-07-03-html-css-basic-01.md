---
title : 웹표준 Html & FORM
last_modified_at: 2018-07-03T10:45:06-05:00
header:
  overlay_image: /assets/images/book/html.jpg
categories:
  - 
tags: 
    - html
toc: true 
---

<br>
# 웹표준을 위한 HTML5 with CSS JS


<br>
## Style 의 선언
<br>
스타일 선언 방법으로는 
1. **link**(외부연결)
2. **embedding**(HTML 내부에 직접입력)
3. **inline**(태그에 직접입력) 3가지가 있다 


### link

```html
<link rel="stylesheet" type="text/css" href="css/style.css">
```

### embedding 외부파일 연결 / 직접입력

```html
<style type="text/css">
  @import url("csstyle.css");
</style>

<style type="text/css">
  #연결id {
    속성명 : 속성값;
  }
</style>
```

### inline 

```html
<a href="" style="속성명:속성값; 속성명:속성값;">
```

<br>
## Table 

**\<ul\>** : 순서가 없는 목록 UnOrdered List<br>
**\<ol\>** : 순서가 있는 목록 Ordered List<br>
**\<dl\>** : 정의 목록 Definition List


<br>
## 여백의 설정

1. **Padding** : content 내부충전 여백
2. **Border** : content 외부 여백 
3. **margin** : 가장자리 의미로, 객체 밖 여백

.
<br>
## Html FORM 

Django 에서 **Form** 객체를 다양하게 다루는 방법이 있지만, 객관적인 개념 및 용도를 잘 몰라서 우왕 좌왕 한 측면이 적지않았다. 이번기회에 기본이 되는 **HTML** 에서의 **Form**객체의 기능과 버튼 들을 잘 정리해 보도록 하자.


