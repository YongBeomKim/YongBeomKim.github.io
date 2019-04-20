---
title : Django js Modules
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
쉽게 도와주는 **AutoComplete** 기능을 사용하기 위해 기본 Jquery 이외에 `jquery-ui` 와 scroll 기능 위한 [jquery-ui-autocomplete-scroll](http://anseki.github.io/jquery-ui-autocomplete-scroll/) 기능을 추가하면 됩니다.

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

<br/>
# Django 에서 Ajax 모듈

앞에서 **django-table2, django-filter, django-crispy-form** 등을 정리해 보았습니다. **GenericView** 와 **django-form** 로 구조화된 모듈을 최대한 활용하기 위해 필요한 Ajax 모듈을 모아보겠습니다

## **django-filter**

Django Filter Form 객체를 생성해주는 모듈입니다. 공식 문서를 한글로 번역한 자료등도 있어서 [번역문서](https://brownbears.tistory.com/96) 이를 참고합니다

## **django-autocomplete-light**

앞에서 정의한 AutoComplete 내용을 도와주는 모듈입니다. [django-autocomplete-light](https://django-autocomplete-light.readthedocs.io/en/master/tutorial.html#displaying-results-using-custom-html) 는 위에서 Jquery 를 모듈로써 보다 안정적인 결과물 도출이 가능합니다. [github](https://github.com/yourlabs/django-autocomplete-light)


## **django-bootstrap-modal-forms**

django 의 GenericView 를 Ajax 로 활용하도록 도와주는 모듈로, 앞에서 1페이지에 걸쳐서 정리 하였습니다. [GitHub](https://github.com/trco/django-bootstrap-modal-forms)

## **django-popup-view-field**

위 예제는 GenericView 를 활용했다면, 보다 가볍게 활용가능한 내용이 무었이 있을지 확인하기 위해 사용가능한 모듈을 찾아보았습니다. [GitHub](https://github.com/djk2/django-popup-view-field) 앞의 내용을 세부적으로 잘 활용하면 이는 필요없을거 같은 모듈입니다.