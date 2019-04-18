---
title : Django JavaScript
last_modified_at: 2019-04-07T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django_pro.png
categories:
  - django
tags: 
    - model
    - django
toc: true 
---

# Django 에서 JavaScript 적용하기

기본적인 모델은 **Django** 의 구조를 활용하면 됩니다. 앞에서 정리한 GenericView 와 내부의 `get_context_data()` 와 `get_absolute_url()` 등의 메소드를 활용합니다.

그리고도 부족한 부분은 Django 의 Plugin 을 활용할 수도 있지만, 서버의 부담이 커지게 됩니다. 부가적으로 필요한 부분은 **JavaScript**로 구현을 하고 배포시 WebPack 을 활용하는 방법으로 구조화를 진행합니다.
 

## AutoComplete
조건에 따른 Create, Update 등의 작업을 위해 html 의 `input` 태그를 활용합니다. 이때 어떤 내용이 오류가 없는지를 서버에서 확인하면 절차도 복잡하고 효율도 낮습니다. 이를 보다 쉽게 도와주는 **AutoComplete** 기능을 활용합니다. 기본 Jquery 이외에 `jquery-ui` 와 scroll 기능 위한 [jquery-ui-autocomplete-scroll](http://anseki.github.io/jquery-ui-autocomplete-scroll/) 기능을 추가합니다

```html
<link type="text/css" href="jquery-ui.css">    
<script src="jquery-3.3.1.js"></script>
<script src="jquery-ui.js"></script>
<script src="jquery.ui.autocomplete.scroll.min.js"></script>  
```

```html
<input type="text" id="inputField">
```

```javascript
$( function() {
  var data = [
    "Cake - Banana",
    "Cake - Carrot",
  ];        
  $("#inputField").autocomplete({
    maxShowItems: 5, // 스크롤 표시갯수
    source:orderdata });
});
```
