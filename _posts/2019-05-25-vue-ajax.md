---
title : Vue.js 의 HTTP 통신
last_modified_at: 2019-05-25T10:45:06-05:00
header:
  overlay_image: /assets/images/book/vue_logo.jpeg
categories:
  - vue
tags: 
    - vue 
    - javascript
toc: true 
---

**[Vue v2.6.10](https://github.com/vuejs/vue/releases)** 을 작업할 때에는 `폼 바인더(v-model)` **->** `vue 반복 조건문(v-for, v-if)` **->** `이벤트 핸들러(v-on)` **->** `속성 바인더(v-bind)` 순서로 작업을 진행 합니다.

**Vue Component** 에서 사용자 태그를 생성하고, **Vue Router** 에서 경로별 다른 객체를 출력합니다. 

<br/>
# HTTP 통신

jquery 에서 활용하는 **Ajax** 를 vue.js 에서는 **axios(액시오스)** 모듈을 사용 합니다. 

```html
<div id="app">
	<button v-on:click="getData">목록 호출</button>
</div>

<script src="axios.min.js"></script>
<script>
new Vue({
  el: '#app',
  methods: {
    getData: function() {
      axios.get('demo.json')
           .then(function(response) {
             console.log(response);
      });
  } }
});
</script>
```

## HTTP 의 GET 요청

```java
axios.get('url 데이터 주소').then().catch();
```

## HTTP 의 POST 요청

```java
axios.post('url 데이터 주소').then().catch();
```

내용을 보다 상세하게 기록하는 방법으로 구현할 수 있습니다.

```java
axios({
  method: 'get',
  url: 'url 데이터 주소',
})
```

<br/>
# Vue 템플릿

vue.js 는 JSX 기반의 리액트등과 달리, 별도의 `render()` 함수 없이 결과물을 정의할 수 있도록 구성되어 있습니다. 최종 결과물을 `template` 속성에 연결 합니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/vue-js-diagram.png">
</figure>

