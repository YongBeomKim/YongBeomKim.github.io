---
title : Vue.js 이정도는 알아야지
last_modified_at: 2019-06-24T12:45:06-05:00
header:
  overlay_image: /assets/images/book/vuejs.png
categories:
  - vue
tags: 
    - vue
    - javascript
toc: true    
---

Vue.js 와 관련된 도서들이 많이 나오고 있습니다. 한국어 유투브 중에도 **[맨땅에 헤딩하기](https://www.youtube.com/channel/UCZ6yPRDNz9bNWySjAv8kUng/playlists)** 처럼 vue 에 특화되어 전문화된 내용 까지 다루고 있습니다.

이번 시간에는 **Vue.js 이정도는 알아야지** 도서의 내용을 바탕으로 vue.js 의 내용들을 정리해 보는 시간을 갖도록 하겠습니다.

<br/>
# **Vue 인스턴스**

Jquery 객체와 같이, **Vue.js 에 의해 특정된 DOM 오브젝트** 를 의미하는 것으로 **Vue 오브젝트 한개** 를 의미합니다. 이는 **템플릿 랜더링, 데이터바인딩, 컴포넌트** 등의 동작을 지원합니다.

## Data 와 Methods (인스턴스 속성 값)

사용자에게 보여주는 데이터를 **문자, 숫자, 배열, 객체** 등 JavaScript 에서 지원가능한 모든 내용이 활용 가능합니다.

```javascript
new Vue({ 
  el: '#id .class셀렉터',
  data: {
    messages: '문자데이터',
    price: 10000,
    list: ['배열','one','two'],
    object: { data:'객체', price:1, name:'apple'},
  },
  methods: {
    showAlert: function() {
      alert('메세지 출력!!');
    }
  }
});
```
인스턴스에서 정의된 데이터는 **Mastache** 기호인 `{{messages}}` 방법으로 템플릿과 연결 합니다.

## 속성값의 계산

Vue 객체의 연산결과값을 출력하는 경우에는 **methods, computed** 메서드를 활용합니다.

{% raw %}
```html
<div id="app">{{ reverseMsg() }}</div>
<script>
new Vue({
  el: "#app",
  data: { message: "문자열 테스트" },
  methods: {
    reverseMsg: function() {
      return this.message.split('').reverse().join('')
    }
  }
});
```
{% endraw %}

computed 를 사용하는 경우 거의 동일하고 템플릿에서 **Mastache** 에서 바인딩 할 때, 함수형이 아닌 **데이터 형태** 로 사용 합니다.

{% raw %}
```html
<div id="app">{{ reverseMsg }}</div>
<script>
new Vue({
  el: "#app",
  data: { message: "문자열 테스트" },
  computed  : {
    reverseMsg: function() {
      return this.message.split('').reverse().join('')
    }
  }
});
```
{% endraw %}

## 감시된 속성

**Vue 인스턴스** 에서는 **변경된 시점을 감시하여 메서드를 호출** 하는 기능을 제공 합니다. **Vue 생명주기** 와 차이점으로는 생명주기는 **Vue 인스턴스 이벤트를 Hooking** 한다면, **감시된 속성** 은 **Vue 인스턴스의 데이터 변경을 Hooking** 합니다. 


<br/>
# 템플릿 문법 과 데이터 바인딩

HTML, CSS3, JavaScript 이외에도 사용자가 Vue.js 에서 지원하는 템플릿 문법들은 **DOM 엘리먼트** 속성을 추가하는 **Directive** 를 활용할 수 있습니다.

**데이터 바인딩** 은 **Vue 인스턴스 데이터를 템플릿과 연결** 하는 작업으로 **Mustache, v-text, v-html, v-bind** 4가지 방법을 활용 합니다.

## Mastache 

`{{ expression }}` 으로 Vue.js 함수의 **data:** 메서드 데이터를 활용하여 **템플릿을 컴파일** 하면서 **데이터값을 바인딩** 합니다.

{% raw %}
```html
<div id="app">{{ expression }}</div>
```
{% endraw %}

## v-text

html 태그의 속성에 위치하면서 **Mastache** 와 동일한 기능을 구현합니다. 하지만 유지보수 및 작업의 용이성 등에서 **Mastache** 가 더 간결하게 구현이 가능합니다.

```html
<div id="app" v-text="expression"></div>
```

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/book/holigrail.gif">
</figure>

