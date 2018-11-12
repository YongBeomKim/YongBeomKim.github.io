---
title : 쉽게 배우는 Vue.js 요약 하편
last_modified_at: 2018-11-04T10:45:06-05:00
header:
  overlay_image: /assets/images/book/vue_logo.jpeg
categories:
  - vue
tags: 
    - vue
    - django
toc: true 
---

> Book Review

Vue.js의 구조를 1페이지로 요약해보자


<br>
# <small>ch7 :</small> 컴포넌트

Vue 컴포넌트 속성으로는 **template (화면에 표시할 HTML/CSS), methods (화면로직 method), created (Vue 인스턴스 추가생성시 실행로직)** 가 있다

## 1 template 의 활용

> **<plant></plant>**

html5 의 `<template>` 로 특별한 어플리케이션 내용을 정의한 후, vue component 완 연결하여 특정한 태그를 정의한다

```html
<div id="app">
    <div class="container">
      <ul class="list-group">
        <planet v-for="(planet, index) in planets" 
         :key="index" :planet="planet"></planet>
      </ul>
    </div>
</div>
```

```html
<template id="planet-template">
    <li> { { planet.name } } 신청 { { planet.visits } } 명
      <button v-show="canBeVisited" @click="visit">신청</button>
      <span v-show="planet.visits>0" class="fa-rocket" aria-hidden="true">
      </span> // v-show="planet.visits>0" True 면 aria-hidden="true" 활성화 
    </li>
</template>
```

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
  new Vue({ el: '#app',
            data: { planets: [..] }
  })
```

사용자 정의 html 태그에서 **영문의 대소문자를 구분하지 않는다.** 코딩시 **CamelCase** 를 활용하는 경우, 태그 및 속성명의 대소문자 사이를 **'-'(하이픈)** 을 사용한다
{: .notice--info}


## 2 (:) v-bind 

> <li v-for="(hero, index) in heroes" :key="index">
> <li v-for="(hero, index) in heroes" v-bind:key="index">

**v-bind (:)** 는 **속성** 또는 **컴포넌트 트로퍼티**를 **동적으로 binding** 함으로써 1) **vue component 객체** 연결 2) **반복문에서 key (index)** 지정 지정 등으로 활용한다

```html
<template id="story-template">
  <h1>{{ sto.writer }} said "{{ sto.plot }}"</h1>
</template>
```

**vue in-line method는** 반복이 많을수록 HTML 태그가 복잡하지만, 위와같은 **Vue 컴포넌트 Tag**를 사용하면 보다 간결하게 제어가 가능하다 <small>**python 함수와** 같이 **Vue 컴포넌트 Tag를** 활용하면 유용하다</small>

<br>
# <small>ch8 :</small> 사용자 정의 이벤트

**$emit() :** <small>이벤트 발생</small>, **$on :** <small>이벤트 청취</small>, **$once() :** <small>이벤트 1번만 청취</small>, **$off() :** <small>이벤트 리스너 제거</small>

```html
<div class="container">
  <p>{{ votes }}</p>
  <button @click="vote">투표</button>
</div>
```

```javascript
// Vue 인스턴스를 생성 (부모)
new Vue({
  el: '.container',     // 인스턴스 부착위치
  data: { vote_num: 0}, // 인스턴스 부착내용
  methods: {  // Vue methods 컴포넌트 (자식)
    vote: function() { this.$emit('voted') },
  },
  created() { // 인스턴스 추가생성시 실행(state)
    this.$on('voted', function() {this.vote_num++})
  }
})
```

created() 와 같은 [생명주기 Hook](https://blog.martinwork.co.kr/vuejs/2018/02/05/vue-lifecycle-hooks.html) 으로 1) **beforeCreate** (인스턴스 초기생성) / **created** (인스턴스 추가생성) 2) **beforeMount / mounted** 3) **beforeUpdate / updated** 4) **activated / deactivated** 5) **beforeDestroy / destoryed**