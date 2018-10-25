---
title : 쉽게 배우는 Vue.js - 8장 (이벤트)
last_modified_at: 2018-10-21T10:45:06-05:00
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

1. **$on(event) :** 이벤트 청취
2. **$emit(event) :** 이벤트 발생
3. **$once(event) :** 이벤트를 (한번 만) 청취한다
4. **$off(event) :** 이벤트 리스너를 제거한다


<br>
# Chapter 8 : 사용자 정의 이벤트

## 이벤트 발생과 청취

**Vue 인스턴스** 의 생명주기 Cycle [내용 살펴보기](https://medium.com/witinweb/vue-js-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-7780cdd97dd4)

<figure class="align-center">
  <img src="https://cdnsite1.assist.ro/sites/default/files/styles/big/public/images/blog/Vue-instance-lifecycle-Page-1.png" alt="">
</figure>

html 내부에서 **특정 이벤트**를 정의**(Emit)** 하고, 이를 활용**(On)** 하는 함수를 정의한다.


```html
<div>
  <p style="font-size: 140px;">
    { { votes } } </p>
  <button @click="vote">Vote</button>
</div>

<script src = "./js/vue.js"></script>
<script type = "text/javascript">
  new Vue({
    el: '.container',
    data: { votes: 0 },
    methods: {
      vote: function(writer) {
        this.$emit('voted') },
    },
    created() {
      this.$on('voted', function(button) {
        this.votes++ })
    }
  })
</script>
```

**created()** Vue Instance 의 Life Cycle 중 **created Hook** 단계에서 객체를 제어한다



## 부모 - 자식 사이의 통신

**this** 로 객체를 binding 하는 경우 **this.$on** / **this.$emit** 을 활용하지만, this 같은 경우 환경에 따라 매개변수 범위가 달라지므로 **부모-자식** 사이의 통신에는 부적절하다. 대신에 **v-on**, **(@) 이벤트 리스너** 를 활용한다 


```html
<div>
  <p style="font-size: 140px;"> { { votes } }</p>
  <food @voted="vote" name="치즈버거"></food>
</div>

<template id="food">
  <button @click="vote">{ { name } }</button>
</template>

<script src="./js/vue.js"></script>
<script type="text/javascript">
  Vue.component('food', {
    template: '#food',
    props: ['name'],
    methods: {
      vote: function() {
        this.$emit('voted') },},
  })

  new Vue({
    el: '.container',
    data: { votes: 0 },
    methods: {
      vote: function() {
        this.votes++ },},
  })
</script>
```