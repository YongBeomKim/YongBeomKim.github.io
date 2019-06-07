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

vue.js 를 조합하여 화면을 구성하는 블록 입니다.

```javascript 
Vue.component('planet', { // 컴포넌트 Tag
  template: '#planet-template',
  props: ['planet'],      // Tag 내부의 Method
  methods: {
    visit: function() {
      this.planet.visits++; },
  },
  computed: {
    canBeVisited: function() {
      return this.planet.visits < 3 }
 }
});
new Vue({ 
  el: '#app',
  data: { 
    planets: [..] }
})
```
