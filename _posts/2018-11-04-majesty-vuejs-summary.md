---
title : 쉽게 배우는 Vue.js 요약
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

<img src="http://developerfarm.cdn1.cafe24.com/cover/s/9791158390754.jpg" width='300'>


# <small>Ch 1, 2, 3</small> Vue 개념 및 디렉티브 ()

1. vue 인스턴스 : **new Vue()**
2. vue **directive(지시)** 함수
        1. **v-model :** Vue 객체를 HTML과 binding
    2. **v-show :** 엘리먼트 출력 (랜더링 비용 높다 : **내용이 자주변경**)
    3. **v-if :** True 조건 엘리먼트 출력 (토글 비용 높다 : **조건제한**)
    4. **v-else :** v-if false 일때 엘리먼트를 출력
    5. **v-else-if :** v-if false 일때 조건 true시 엘리먼트를 출력
3. { { **매개변수** } } , { { **$Vue 메서드** } }

Examples

```html
1.특정 태그의 활성여부 
<h1 v-if="!message"> Title </h1>

2.여러개를 묶어서 활성여부 : HTML5 의 Template 태그를 활용 
<template v-if=!message>... </template>

3. v-else, v-else-if 블록의 활용
<h1 v-if="조건내용">... </h1>
<h2 v-else> Empty data </h2>

4. v-if / v-show
<div v-if = "gender === 'male' || gender === 'female'">
    <span v-show = "gender === 'male'">남성</span>
    <span v-show = "gender === 'female'">여성</span>
```


# <small>ch 4</small> v-for 배열객체 랜더링

```html
1. integer 배열
<li v-for="i in 10" class="list-group-item">{ { i } }</li>

2. key, value 배열
<li v-for="(story, idx) in stories" :key="idx">
{{idx}} {{ story.writer }} said "{{ story.plot }}"</li>
```

**idx** 는 Python 의 enumerate() 와 같이 **배열의 index값을** 자동으로 출력한다. 개별 **key 값**은 **객체명.key**로 추출한다
{: .notice--info}


# <small>ch 5</small> v-on (@)

## 1 **inline :** Event 핸들링 

> ex) <button **@click.prevent** = "변수/함수">

**[@이벤트 목록](http://linuxism.tistory.com/1705)** ex) 실행시 화면을 새로고침 한다.

1. input 부분 수정한 내용을 반영하는 경우 vue 인스턴스에 **event.preventDefault();**를 추가 
2. **v-on** 이벤트를 제어하는 **.stop, .prevent, .once** [이벤트 핸들러](https://kr.vuejs.org/v2/guide/events.html)를 지원한다. ( .capture, .self는 거의 사용되지 않는다 / Chain Method도 가능)

```html
1. integer 를 1씩 증가
<button v-on:click="매개변수++">

2. 이벤트와 함수의 연결 
<button v-on:click="함수">
<button @click="함수">

3. 새로고침 제한 핸들러 (Chain Method 가능)
<button @click.prevent="함수">
```

## 2 **inline :** Key 한정자 

> <input **v-model:"a" @keyup.13** = 함수>

자바스크립트의 [Key code](https://css-tricks.com/snippets/javascript/javascript-keycodes/)를 활용하면 특정한 입력에 반능하는 객체를 정의 가능하다

> <input **v-model:"a" @keyup.enter** = 함수>

위의 Code 번호가 아닌 별칭을 사용할 수 있다 ex> **enter, tab, delete, esc, space, up, down, left, right**

## 3 computed properties

React 의 props 와 state 에서 언급된 state를 **Vue 함수 메서드**로 구현

```php
<div class="contain"> a={ {a} }, b={ {b} }</div>
<script>
new Vue({
    el: '.contain',
    data {a:1,},
    computed: {
        b: () => {return this.a + 1} } 
    });
</script>
``` 

계산기 구현예제 

> **input, button, select, option** 의 속성을 잘 이해하자

```html
<div class="container">
<form>
  <input v-model.number="a">
  <select v-model="operator">
    <option>+</option> <option>-</option>
  </select>
  <input v-model.number="b" class="form-control">
  <button @click="calculate">계산</button>
</form>
<h2>결과 값 : { {a} } { {operator} } { {b} } = { {c} }</h2>
</div>
```

```javascript
  new Vue({
    el: '.container',
    data: { a: 1, b: 2, c: null, operator: '+',},
    methods: {
      calculate: function(event) {
        event.preventDefault();
        switch (this.operator) {
          case '+' : this.c = this.a + this.b; break;
          case '-' : this.c = this.a - this.b; break;
          case '*' : this.c = this.a * this.b; break;
          case '/' : this.c = this.a / this.b; break; }
      } },});
```

# Filter 