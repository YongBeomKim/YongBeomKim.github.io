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

1. **$on(eventName) :** 이벤트 청취
2. **$emit(eventName) :** 이벤트 발생
3. **$once(eventName) :** 이벤트를 (한번 만) 청취한다
4. **$off(eventName) :** 이벤트 리스너를 제거한다

중간 정리를 하는데 $emit $on 으로 이벤트를 발생하고, 이벤트 리스너를 연결하는데 eventName 이 어떻게 기능을 하는지, (템플릿에서는 v-on 으로 리스너를 연결한다) this 와의 차이에 있어서 구분이 명확하지 못해서 혼란을 격고 있다. Do It vue.js 에 나온 내용을 참고로 해서 잘 정리를 해보자 (React Native 에서)


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

1. **@voted :** v-on : voted 
2. **@click :** v-on : click

**this** 로 객체를 binding 하는 경우 **this.$on** / **this.$emit** 을 활용하지만, this 같은 경우 환경에 따라 매개변수 범위가 달라지므로 **부모-자식** 사이의 통신에는 부적절하다. 대신에 **v-on**, **(@) 이벤트 리스너** 를 활용한다 


```html
<div>
  // 부모 템플릿
  <p style="font-size: 140px;"> { { votes } }</p>
  <food @voted="vote" name="치즈버거"></food>
</div>

<template id="food">
  <button @click="vote">{ { name } }</button>
</template>

<script src="./js/vue.js"></script>
<script type="text/javascript">
  // 부모 컴포넌트
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
https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.17/vue.js
## 인자 전달

단일한 웹페이지 에서 여러 변수를 관리하는 경우 

```html
  <div>
    <p style="font-size: 140px;">{ { votes } }</p>
    <div class="row">
      <food @voted="countVote" name="Cheeseburger"></food>
      <food @voted="countVote" name="Double Bacon Burger"></food>
      <food @voted="countVote" name="Rodeo Burger"></food>
    </div>
    <h1>Log:</h1>
    <ul class="list-group">
      <li class="list-group-item" v-for="(vote, index) in log" :key="index">{{ vote }}</li>
    </ul>
  </div>
</body>

<template id="food">
  <div class="text-center col-lg-4">
    <p style="font-size: 40px;">
      {{ votes }}
    </p>
    <button class="btn btn-default" @click="vote">{{ name }}</button>
  </div>
</template>

<script src="./js/vue.js"></script>
<script type="text/javascript">
  Vue.component('food', {
    template: '#food',
    props: ['name'],
    data: function() {
      return { votes: 0 }
    },
    methods: {
      vote: function(event) {
        this.votes++;
        this.$emit('voted', event.srcElement.textContent); }
    }
  })
  new Vue({
    el: '.container',
    data: { votes: 0, log: [] },
    methods: {
      countVote: function(food) {
        this.votes++;
        this.log.push(food + ' received a vote.');}
    }
  })
</script>
```

## 부모 자식이 아닌 관계에서 통신

위에서는 Create Hook 에서 **.$on** 를 사용하여 이벤트를 등록하고, 이를 활성화 하기 위해 **.$emit**을 사용합니다. 위와 같이 `<사용자Tag @이벤트이름="함수">` 를 사용하면 이벤트 청취는 가능하지만, 자식 컴포넌트로 이벤트 내용을 보낼 수는 없다.


```html
<h1>Food Battle</h1>
<p>{ { votes.count } }</p>
<button @click="reset">Reset votes</button>
<hr>
  <div class="row">
    <food name="Cheeseburger"></food>
    <food name="Double Bacon Burger"></food>
    <food name="Whooper"></food>
  </div>
<hr><h1>Log:</h1>
<ul>
  <li v-for="(vote, index) in votes.log" 
      :key="index"> { { vote } } </li>
</ul>

<template id="food">
  <div>
    <p>{ { votes } }</p>
    <button @click="vote">{ { name } }</button>
  </div>
</template>

<script src="./js/vue.js"></script>
<script type="text/javascript">
  var bus = new Vue()

  Vue.component('food', {
    template: '#food',
    props: ['name'],
    data: function() {
      return { votes: 0 }
    },
    methods: {
      vote: function(event) {
        var food = event.srcElement.textContent;
        this.votes++;
        bus.$emit('voted', food);
      },
      reset: function() {this.votes = 0}
    },
    created() {
      bus.$on('reset', this.reset)
    }
  })
  new Vue({
    el: '.container',
    data: {
      votes: { count: 0, log: [] }
    },
    methods: {
      countVote: function(food) {
        this.votes.count++;
        this.votes.log.push(food + ' received a vote.');
      },
      reset: function() {
        this.votes = { count: 0, log: [] },
        bus.$emit('reset');
      }
    },
    created() {
      bus.$on('voted', this.countVote)
    }
  })
</script>
```

함수 실행은 Vue 인스턴스에서 **methods** 내부에 함수를 정의한 뒤, 개별 Life Cycle 에서 **여기선 created()** 이벤트를 호출 **.$on** 한 뒤 **this.**countVote 를 활용한다. 이렇게 객체를 분리함으로써 개별 함수내 **this** 를 안정적으로 특정, 활용 가능하다
{: .notice--info}


