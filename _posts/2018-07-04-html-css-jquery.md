---
title : 웹표준 Html - jQuery
last_modified_at: 2018-07-04T12:45:06-05:00
header:
  overlay_image: /assets/images/book/html.jpg
categories:
  - html
tags: 
    - html
toc: true 
---

<br>
# 웹표준을 위한 HTML5 with CSS JS

<br>
## **jQuery** 의 기본골격

```javascript
$(document).ready(function() {
    처리할 함수
});
```

Jquery는 **자바스크립트** 의 유용한 모듈을 사용하기 쉽도록 만든 도구로써, 개념과 한계도 있지만 용도에 따라 적극적으로 사용함으로써 일반적인 기능들을 충분하게 구현 가능한 예제들을 정리하도록 이번 페이지를 구성할 예정이다


<html>
<head>
    <title>from</title>
    <meta charset="utf-8">
</head>
<body>
    <div id='test'></div>
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script text="text/javascript">
    $(#test).html('<h1>Hello World!</h1>');
    </script>
</body>
</html>


```html 
<div></div>
<script src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script text="text/javascript">
    $('div').html('<h1>Hello World!</h1>');
</script>
```

앞의 **D3.js** 모듈에서도 익혔듯이, **HTML Tag** 등의 구조설계를 먼저 완성하고, **JavaScript, Jquery** 의 스크립트를 뒤에 덧붙여야 제대로 작동한다.


<br>
## 셀렉터

jQuery 에서도, 객체 선택은 **CSS 셀렉터**를 사용하여 스타일 시트에 접근 가능하다 <strike>모듈에서의 문법들은 기반으로 하는 언어들의 용법을 재활용 하는 측면이 강하고, 이러한 특징은 새로운 문법을 익히는 데도 쉽게 접근 가능한 tip 이기도 하다</strike>

|CSS 셀렉터   |   설명                 |
|:-----------:|:----------------------:|
|*            | 모든 엘리먼트          |
|E F          | E의 자손중 모든 F      |
|E>F          | E의 직계 F             |
|E+F          | E의 형제 바로다음 F    |
|E~F          | E의 형제 다음모든 F    |
|E:has(F)     | F자손을 갖는 모든 E    |
|E.C          | .C class를 갖는 E      |
|*.C          | .C class를 갖는 모든것 |
|E#I          | I 아이디를 갖는 모든 E |
|*#I          | I 아이리를 갖는 모든것 |
