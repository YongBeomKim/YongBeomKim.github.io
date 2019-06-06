---
title : 
last_modified_at: 2019-05-21T10:45:06-05:00
header:
  overlay_image: /assets/images/book/vue_logo.jpeg
categories:
  - vue
tags: 
    - vue 
    - javascript
toc: true 
---

**Vue.js** 를 공부하면서 새로운 JavaScript 개념의 관계들이 눈에 보이질  않아 어려워 하던 중, **Selenium** 으로 크롤링 내용을 익힌 뒤 **[아프리카도서관](https://www.youtube.com/playlist?list=PLtht1_et-35ArPa9sBozD9dEr1CPRIOMb)** 의 내용을 보면서 Python 의 **List, Dict** 객체의 조작과 **if, for, loop** 조건식 유사한 내용들로 정리를 진행 합니다.

**vue 3.0** 이 나왔지만 소스코드를 받으려고 알아보니 [](https://github.com/vuejs/vue/releases)

<br/>
# 객체와 Binding

**Vue** 에서 사용되는 **data 메소드 객체** 와 내용을 확일할 때에는, 브라우저의 **console** 에서 아래의 예제를 실행한 뒤, **firstApp.message** 를 실행하면 다음과 같이 객체와 내용을 확일 할 수 있습니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/vue-console.jpg">
</figure>

## 단방향 Binding App

**script** 태그는, **모듈을 불러오는 태그** 와 **내용을 적용하는 태그** 가 구분 됩니다. 이들의 구분없이 작업을 하면 문제가 발생 합니다.

**단방향 binding** 예시로 **템플릿 DOM 엘리먼트** 들 중에 `#app` 인 DOM 만을 **vue.js 규칙에 따르는 DOM** 으로 선언을 합니다. 명령 script 는 작동할 구체적인 내용을 입력 합니다.

{% raw %}
```html
<!-- 단방향 Binding 대상 DOM-->
<div id="app">{{ message }}</div>

<script src="src/vue.js"></script>
<!-- Binding 내용 -->
<script>
    var firstApp = new Vue({
        el: '#app',  //vue.js 규칙에 따르는 DOM
        data: {
            // message 는 변수명 (변경가능)
            message: '처음 시작하는 Vue.js@!@'
        }
    });
</script>
```
{% endraw %}

## 양방향 Binding 과 Directive 

**Directive (지시문)** 은 **Vue.JS** 객체로 선언된 **템플릿 DOM** 에서만 작동하는 **템플릿 속성** 으로, 아래 예시는  **[v-model (폼 입력 바인딩)](https://kr.vuejs.org/v2/guide/forms.html)** Directive 속성에 **data 메서드** 를 연결하면 자동으로 **양방향 Binding** 이 동작 합니다.

{% raw %}
```html
<div id="app">
    <div>{{ message }}</div>
    <input type="text" v-model="message" />
</div>
```
{% endraw %}

<br/>
# Directive (지시문)

**Directive (지시문)** 은 **Vue.JS** 객체로 선언된 **템플릿 DOM** 에서만 작동하는 **템플릿 속성** 으로, 위에선 **객체 특정 Directive** 를 알아봤다면 이번에는 **객체 조건 Directive** 를 알아보겠습니다.

## v-if & v-show

자바스크립트에서 boolean 객체는 **true, false** 소문자를 활용 합니다. 위에서 선안한 객체의 메서드를 활성화 할 것인지 판단 합니다.

{% raw %}
```html
<div id="app">
    <div v-if="visible">{{ message }}</div>
</div>
<script src="src/vue.min.js"></script>
<script>
var firstApp = new Vue({
    el: '#app',  //vue.js 규칙에 따르는 DOM
    data: {
        message: '처음 시작하는 Vue.js@!@',
        visible: false
    }
});
</script>
```
{% endraw %}

**false** 인 경우 **v-if** 는 해당 DOM 을 **Skip** 하고, **v-show** 는 `display=None` 속성으로 rendering 되어 서버 부담이 증가 합니다. 따라서 동일한 기능이 필요한 경우 **v-if** 를 활용 합니다.

{% raw %}
```html
<div id="app">
    <div v-show="visible">{{ message }}</div>
</div>
</script>
```
{% endraw %}

## v-for

**Array** 객체를 다루는 Method 로 **v-if** 와 함께 활용 합니다. 파이썬에서  `a = [txt  for txt in texts if len(a)>10]` 과 같은 원리로 접근하면 이해가 쉽습니다.