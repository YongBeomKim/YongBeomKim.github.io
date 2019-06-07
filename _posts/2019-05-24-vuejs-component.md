---
title : Vue.js 응용
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

**[Vue v2.6.10](https://github.com/vuejs/vue/releases)** 을 작업할 때에는 `폼 바인더(v-model)` **->** `vue 반복 조건문(v-for, v-if)` **->** `이벤트 핸들러(v-on)` **->** `속성 바인더(v-bind)` 순서로 작업을 이해했다면, 이번에는 조금 더 깊이있는 내용으로 진행하겠습니다.

<br/>
# Vue.js LifeCycle

앞에서 살펴본 **Vue 인스턴스** 속성은 다음과 같았습니다. 1번의 request 에 모든 작업 내용을 지정했기 때문에 가능했습니다. 하지만 다양한 모듈과 연결된 작업을 진행하다 보면 단계별 필요한 작업을 특정해야 합니다. 

```javascript
var app = new Vue({
  el: '#app',
  data:{
    number:null,
    numbers: [1,5,3,6,7],
  },
  methods: {
    add: function() {
      this.numbers.push(this.number);
      }
    }
  });
```

이를 위해 Vue.js 에서 제공하는 **[Life Cycle(생명주기)](https://blog.martinwork.co.kr/vuejs/2018/02/05/vue-lifecycle-hooks.html)** 을 활용합니다. 

1. `this`, `data` 속성이 접근하는 **Created**
2. template 의 `render()` 직전 단계인 **beforeMount**
3. `el:` 에서 특정한 DOM 에 부착된 뒤에 호출하는 **mounted**
4. mounted 직후 **vue 인스턴스 값들의 치환** 된 직후 **beforeUpdate**
5. 데이터 변경으로 새로 render() 된 이후 **updated**
6. `vue 인스턴스` 를 삭제하기 직전인 **beforeDestroy**
7. `vue 인스턴스` 삭제한 직후인 **destoryed**

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/vue-js-diagram.png">
</figure>

<br/>
# Vue.js Component

vue.js 를 조합하여 화면을 구성하는 블록 입니다. 컴포넌트 이름을 `my-tag` 와 같은 **케밥기법(kebab-case)** 으로 작업을 해야 합니다. 이와 같은 **[Vue 스타일 가이드](https://kr.vuejs.org/v2/style-guide/index.html)** 를 참고하여 작업을 진행 합니다.

## 전역 컴포넌트

해당 컴포넌트를 **다양한 vue 인스턴스** 에서 재활용이 가능합니다.

```html 
<div id="app">
  <my-tag></my-tag>
</div>

<script>
Vue.component('my-tag', {
  template: '<div>컴포넌트 등록</div>',
});
new Vue({ 
  el: '#app',
});
</script>
```

## 지역 컴포넌트

**특정 vue 인스턴스** 에서만 작동하는 컴포넌트를 정의 합니다.

```html 
<div id="app">
  <my-tag></my-tag>
</div>

<script>
var cmp = {
  template: '<div>컴포넌트 등록</div>',
};
new Vue({ 
  el: '#app',
  components: {'my-tag': cmp}
});
</script>
```

<br/>
# Vue 컴포넌트 통신

개별 컴포넌트는 유효범위로 인해 서로 참조가 불가능 합니다. 

## props : 아래로 전달

상위 컴포넌트가 하위 컴포넌트에 데이터를 전달하는 속성 입니다. 따라서 **하위 컴포넌트** 내부에 정의를 합니다. 그 뒤 상위 컴포넌트에 `v-bind:props객체` 속성으로 연결 합니다.

{% raw %}
```html
<div id="app">
  <c-comp v-bind:pdata="msg"></c-comp>
</div>

<script>
Vue.components('c-comp', {
  props: ['pdata'], // props 객체명
  template: '<p>{{ pdata }}</p>',
});
new Vue({
  el: '#app',
  data: {
    msg: "부모 컴포넌트 입니다",
  }
});
</script>
```
{% endraw %}

## event Bus : 위로 전달

단방향 통신을 기본으로 하는 vue.js 의 정식문서에는 없는 내용 입니다. 양방향 바인더인 **폼 바인더(v-model)** 와 별도로 이를 구현하기 위해 **강제로 상위 컴포넌트** 생성 및 활용 합니다.

`.$emit()` 를 활용하여 이벤트를 보내고, `.$on()` 에서 이벤트를 수신 합니다. 

{% raw %}
```html
<div id="app">
  <c-comp></c-comp>
</div>

<script>
var eventBus = new Vue();

Vue.component('c-comp', {
  template: '<div>컴포넌트<button v-on:click="showLog">보이기</button></div>',
  methods: {
    showLog: function() {
      eventBus.$emit('trigger', 100);
    }
  }
});

var app = new Vue({
  el: '#app',
  created: function() {
    eventBus.$on('trigger', function(value){
      console.log("이벤트 전달 : ", value);
    });
  }
});
</script>
```
{% endraw %}

<br/>
# Vue 라우터 (Routing)


