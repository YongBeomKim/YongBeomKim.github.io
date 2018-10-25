---
title : 쉽게 배우는 Vue.js - 7장 (컴포넌트)
last_modified_at: 2018-10-20T10:45:06-05:00
header:
  overlay_image: /assets/images/book/vue_logo.jpeg
categories:
  - vue
tags: 
    - vue 
    - javascript
toc: true 
---


# Introduction

1. **methods :** 사용자 함수
2. **component :** 사용자 Tag
3. **directive :** html 태그의 값들 연결

<br>
# Chapter 7 : 컴포넌트

## **Vue.component()**

`<story>` 사용자 Tag를 생성 추가 합니다

```html
<div>
  <story></story>
</div>
<script src="./js/vue.js"></script>
<script type="text/javascript">
  Vue.component('story', {
    template: '<h1>My horse is amazing!</h1>'
  });
  new Vue({
    el: '.container'
  })
</script>
```

**Tag 이름 :** 사용자가 원하는 이름을 정하면 되지만, HTML5의 고유한 태그와 충돌하지 않도록 주의해야 한다
{: .notice--info}

 
## 템플릿

위 컴포넌트의 **template** 속성에 기록한 내용을, `<template>` 태그를 활용하여 다양한 내용을 구현한다.

```html
<div>
  <story></story>
</div>

<template id="story-template">
  <h1>My horse is amazing!</h1>
</template>

<script src="./js/vue.js"></script>
<script type="text/javascript">
  Vue.component('story', {
    template: "#story-template"
  });

  new Vue({
    el: '.container'
  })
</script>
```

## 프로퍼티

**props :** 지역변수 <small>참고로 **state** 라는 React 개념을 Vue.js 에서는 **compute**를 사용하여 주현한다 (state를 남발하면 콜백지옥에 빠지므로 유의 할 것!!)</small> 로써  **plot** 이라는 1개의 속성을 사용자가 추가할 때의 예시다ㄴ

```html
<story plot = "My horse is amazing"></story>

<template id = "story-template">
  <h1>{ { plot } }</h1>
</template>

<script type = "text/javascript" src = "./js/vue.js"></script>
<script type = "text/javascript">
  Vue.component('story', {
    props: ['plot'],
    template: "#story-template"
  });
  new Vue({
    el: '.container'
  })
</script>
```

추가되는 속성이 여러개일 때, 위의 코드를 Re-Factoring 하는 내용을 살펴보자

```html
<div class="container">
  <story v-bind:sto="{plot: 'My horse is amazing.', writer: 'Mr. Weebl'}">
  </story>
</div>

<template id="story-template">
  <h1>{{ sto.writer }} said "{{ sto.plot }}"</h1>
</template>

<script type="text/javascript" src="./js/vue.js"></script>
<script type="text/javascript">
  Vue.component('story', {
    props: ['sto'],
    template: "#story-template"
  });
  new Vue({
    el: '.container'
  })
</script>
```

##  재사용성 : for

```html
<div>
    <h3>Alex'의 이야기</h3>
    <ul>
        <story v-for="(story, index) in storiesBy('Alex')" :key="index" :story="story"></story>
    </ul>
    <div>
        <label for="query">누구의 이야길 찾으세요?</label>
        <input v-model="query" class="form-control">
    </div>
    <h3>검색결과 :</h3>
    <ul>
        <story v-for="(story, index) in search" :key="index" :story="story"></story>
    </ul>
</div>

<template id="story-template">
  <li class="list-group-item">
    { { story.writer } } said "{ { story.body } }"
  </li>
</template>

<script type="text/javascript" src="./js/vue.js"></script>
<script type="text/javascript">
Vue.component('story', {
    props: ['story'],
    template: '#story-template'
});

new Vue({
  el: '.container',
  data: {
    stories: [
      { body: "I crashed my car today!", writer: "Alex"},
      { body: "Yesterday, someone stole my bag!", writer: "John"},
    query: ' '
  },
  methods:{
    storiesBy: function (writer) {
      return this.stories.filter(function (story) {
        return story.writer === writer })
    }
  },
  computed: {
    search: function () {
      var query = this.query
      return this.stories.filter(function (story) {
        return story.body.includes(query) })
    }
  }
})
</script>
```
