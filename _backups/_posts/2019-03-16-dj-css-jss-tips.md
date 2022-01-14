---
title : CSS, JS Tips  with  Django
last_modified_at: 2019-03-16T10:45:06-05:00
header:
  overlay_image: /assets/images/code/htmlcssjs.jpg
categories:
  - django
tags: 
    - html
    - css
    - javascript
---

Fail Fast!!
그동안 기능에 대한 호기심만 키웠다면 
이제는 본격적으로  메뉴활용 Django 모듈을 이번주 내로 완성하자!!

Django 에서 기본 지원되는 내용을 충분히 활용하고...
나머지들에 대해서 HTML5, CSS, JavaScript, restful API 등으로 보완을 합니다

<br/>
# **web Tip들 모음**

## CSS Background image 삽입하기
Base.html 등에서 활용할 CSS 스타일을 static 함수를 사용하면 작동이 잘 안됩니다. 조금 모양은 빠지지만 `/폴더명/파일명.jpg` 과 같은 절대경로를 적용합니다 [stackoverflow](https://stackoverflow.com/questions/39769469/the-way-to-use-background-image-in-css-files-with-django)
```css
#third{
    background: url("/static/img/sample.jpeg") 50% 0 no-repeat fixed;
}
```

## Hamberger Menu
화면 사이즈가 줄어들면 자동으로 햄버거 메뉴로 변경하는 Bootstrap 코드가 **배프의 오지랍 Django** 에 구현이 되어 있는데, offline 실행을 위해선 필요한 모듈을 잘 적용해야 합니다.

이를 위해서는 아래의 모듈을 모두 필요로 합니다.
```html
    <link rel="stylesheet" href="bootstrap.min.css">
    <script src="bootstrap.min.js"></script>
    <script src="jquery-3.3.1.js"></script>
    <script src="popper.min.js"></script>
```

## AutoComplete Text

[YouTube](https://www.youtube.com/watch?v=Fq2gNPHjgdE) Form의 입력도구에서 사용자를 도와주기 위한 자동완성 기능으로 **JQuery** 의 **JQuery UI** 를 활용합니다 [jquery](https://stackoverflow.com/questions/48563996/jquery-ui-autocomplete-doesnt-work-with-jquery-version-3-2-1)

```html
<script src="jquery-3.3.1.js"></script>
<script src="jquery-ui.js"></script>
<link rel="stylesheet" href="jquery-ui.css">

<div class="container">
    <h2>Form 에서 자동완성</h2>
    <input type="text" id="auto">
</div>
```

```js
// 한글자만 일치해도 결과를 출력
$ (function(){
    var data = [
        "배추김치",
        "무김치",
        "콩나물",
    ]; 
    $("#auto").autocomplete({
        source:data
    });
});
```
