---
title : 쉽게 배우는 Vue.js - 9장 (바인딩)
last_modified_at: 2018-10-22T10:45:06-05:00
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

boolean 조건일 때 parameter 의 활용방법

1. **v-bind:class**="{ 'red' : color, 'blue' : !color } : **true / false 객체**
2. **v-bind:class**="[ color ? 'red' : 'blue']" : **3항 연산자**
3. **v-for** = "(task, index) in tasks" :key="index" : **배열객체 적용**
4. @click = "completeTask(task)" : **3의 배열에 내용별 적용**

<br>
# Chapter 9 : 클래스와 스타일 바인딩

## 클래스 객체의 조작

> **!this**, **!매개변수**

**color** 와 **!color** 객체를 받을 때, **this.color, !this.color** 와 같이 객체를 boolean 형식으로 구분하여 적용 가능하다.  

```html
<div>
  <div class="box" 
       v-bind:class="{'red':color, 'blue':!color }"></div>
  <button v-on:click="flipColor">컬러변경</button>
</div>

<script src="./js/vue.js"></script>
<script type="text/javascript">
new Vue({
  el: '.container',
  data: { color: true },
  methods: {
    flipColor: function() {
      this.color = !this.color;}
  }
});
</script>

<style type="text/css">
.red {background: #ff0000;}
.blue {background: #0000ff;}
.green {background: #4CAF50;}
.purple {background: #7B1FA2;}
.box {
  float: left;  width: 200px; height: 200px;
  margin: 40px; border: 1px solid rgba(0, 0, 0, .2);
}
</style>
```

## 스타일 배열문법 적용 

> **:style**="{'color':'blue', fontsize:'120px'}"

> **:style**="{'color': nice.color, fontsize: nice.fontSize}"

> **:style**="[niceStyle, badStyle]"

**:style** 의 경우 1) 스타일을 Hard coding 하거나, 2) 자동으로 적절한 접두사를 자동감지, 3) 동일한 접두사가 여럿일 때 마지막 내용이 적용된다

```html
<div id="app">
  <div :style="[nice, bad]">Such nice Day!</div>
</div>

<script src="./js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '#app',
    data: {
      nice: { color: 'blue', fontSize: '120px'},
      bad: { color: 'gray', fontStyle: 'italic'},}
  });
</script>
```

## 바인딩 예제

**completeTask()** 함수를 활용하여 **tasks** 배열 내부의 객체를 반복하여 일정한 속성값을 변경 가능한 동적인 객체를 구현합니다.

```html
<div id="app">
  <ul>
    <li :class = "{'completed' : task.done}"
        :style = "styleObject"
        v-for = "(task, index) in tasks" :key="index">
       { { task.body } }
      <button @click = "completeTask(task)" class="btn">활성화!</button>
    </li>
  </ul>
</div>

<script src="./js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '#app',
    data: {
      tasks: [
        { body: "Feed the horses", done: true },
        { body: "Wash armor", done: true},
        { body: "Sharp sword", done: false},
      ],
      styleObject: { fontSize: '25px'}
    },
    methods: {
      completeTask: function(task) {
        task.done = !task.done;}
    },
  });
</script>

<style type="text/css">
  .completed {
    text-decoration: line-through;
  }
</style>
```
