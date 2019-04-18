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

# 추후에 보완할 내용들...

to do  list..

## **django-autocomplete-light**

[django-autocomplete-light](https://django-autocomplete-light.readthedocs.io/en/master/tutorial.html#displaying-results-using-custom-html) 는 위에서 Jquery 등으로 작업하던 내용을 모듈로써 보다 안정적인 결과물 도출이 가능합니다. 이 내용을 참고하여 서버에서 작업을 도와줍니다 [github](https://github.com/yourlabs/django-autocomplete-light)

## **django-todo**

[GitHub](https://github.com/shacker/django-todo) todo 내용의 구조와 메일링, 파일다운 등 다양한 조합을 Package로 제공합니다. 이번처럼 세부작업이 필요한 과정에서는 오히려 번거로울 수 있지만, 참고하여 기본골격을 구축할때 추가할 내용들을 도움 받습니다 

## **vue.js & Restful API**

우선은 Json 과 Apex Chart 등으로 안정적인 구조물을 만듭니다. 추가적인 작업이 필요하면 위 내용을 바탕으로 보완합니다.