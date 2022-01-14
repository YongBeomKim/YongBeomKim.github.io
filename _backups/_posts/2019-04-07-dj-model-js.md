---
title : Django js Modules
last_modified_at: 2019-04-07T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django.jpg
categories:
  - django
tags: 
    - model
    - django
toc: true 
---

기본적인 모델은 **Django** 의 구조를 활용하면 됩니다. 앞에서 정리한 GenericView 와 내부의 `get_context_data()` 와 `get_absolute_url()` 등의 메소드를 활용합니다.

그리고도 부족한 부분은 Django 의 Plugin 을 활용할 수도 있지만, 서버의 부담이 커지게 됩니다. 부가적으로 필요한 부분은 **JavaScript**로 구현을 하고 배포시 WebPack 을 활용하는 방법으로 구조화를 진행합니다.
 
<br/>
# Django 에서 JavaScript 적용하기


## **popper.js**

[download](https://github.com/FezVrasta/popper.js/releases) 뭐하는 놈인진 모르지만 `SyntaxError: export declarations may only appear at top level of a module popper.js` 메세지 때문에 계속 골치를 아프게 만들었다.

찾아보니 bootstrap.js 기능을 도와주는 모듈로써, **bootstrap.js 보다 앞에서** 선언을 해야 하고, **내부 문법 충돌 문제로** 인해 2017년도 버젼인 **1.11** 을 찾아서 활용해야 하고 [down](https://cdn.jsdelivr.net/npm/popper.js@1.11.0/dist/umd/) 자바스크립트 ES5 로 되어어서 ES6 인 `dist` 폴더가 아닌 `dist/umd/` 의 버젼 내용을 다운받아서 [Reddit](https://www.reddit.com/r/javascript/comments/7eaw1s/export_default_popper_breaks_popper/) 설치를 하면 잘 작동된다. <strike>이 문제때문에 여러시간 고생한건 함은정</strike>

## Font Awesome vs Glyphicons

부트스트랩에서 제공하는 아이콘 툴이 있는데, modal-form 등에서는 **Font Awsome** 을 별도로 활용하는 경우가 많습니다. 이유를 찾아보니 [stackoverflow](https://stackoverflow.com/questions/17311231/font-awesome-vs-glyphicons-in-twitter-bootstrap) 부트스트랩 내부 폰트는 사이즈 변형이 어렵지만, **Font Awsome** 은 비트맵 이미지로 크기변환등에 자유로워 제약이 적은 장점으로 추천을 합니다. 결론은 **Font Awsome** 쓰자

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

django 의 Model 에 대한 filterSet 을 정의하면, Filter Form 과 관련된 함수들을 자동으로 생성해 주는 모듈입니다. [번역문서](https://brownbears.tistory.com/96)

결과에 Paginate 를 추가하려면 다음의 내용을 참고합니다. [StackOverFlow](https://stackoverflow.com/questions/51389848/how-can-i-use-pagination-with-django-filter), 
[Filtering and Pagination with Django](https://www.caktusgroup.com/blog/2018/10/18/filtering-and-pagination-django/) 

## **django-autocomplete-light**

input 태그에서 AutoComplete 를 도와주는 모듈입니다. [django-autocomplete-light](https://django-autocomplete-light.readthedocs.io/en/master/tutorial.html#displaying-results-using-custom-html) 는 위에서 Jquery 를 모듈로써 보다 안정적인 결과물 도출이 가능합니다. [github](https://github.com/yourlabs/django-autocomplete-light)


## **django-bootstrap-modal-forms**

django 의 GenericView 를 Ajax 로 활용하도록 도와주는 모듈로, 앞에서 1페이지에 걸쳐서 정리 하였습니다. [GitHub](https://github.com/trco/django-bootstrap-modal-forms)

## **django-popup-view-field**

사용자 정의 Template 를 Ajax 를 활용한 Pop Up 으로 구현가등하게 도와주는 모듈 입니다. [GitHub](https://github.com/djk2/django-popup-view-field) `bootstrap-modal-form` 을 잘 정리하면 추가적 필요는 없을 듯 합니다.