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
  Vue.component('planet', {
    template: '#planet-template',
    props: ['planet'],
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


