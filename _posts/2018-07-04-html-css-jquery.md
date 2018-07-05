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

Jquery는 **자바스크립트** 의 유용한 모듈을 사용하기 쉽도록 만든 도구로써, 개념과 한계도 있지만 용도에 따라 적극적으로 사용함으로써 일반적인 기능들을 충분하게 구현 가능한 예제들을 정리하도록 이번 페이지를 구성할 예정이다


<html>
<head>
    <title>from</title>
    <meta charset="utf-8">
</head>
<body>
    <div></div>
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script text="text/javascript">
    $('div').html('<h1>Hello World!</h1>');
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

