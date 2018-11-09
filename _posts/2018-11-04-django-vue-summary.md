---
title : 쉽게배우는 vue.js 요약
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


## Vue 개념 및 디렉티브 (Ch 1, 2, 3)

1. vue 인스턴스 : **new Vue()**
2. vue **directive(지시)** 함수
        1. **v-model :** Vue 객체를 HTML과 binding
    2. **v-show :** 엘리먼트 출력 (랜더링비용 높다 : **내용이 자주변경**)
    3. **v-if :** True 조건 엘리먼트 출력 (토글비용 높다 : **조건제한**)
    4. **v-else :** v-if 의 조건결과 false 일때 엘리먼트를 화면에 표시
    5. **v-else-if :** v-if false 일때 추가조건 true시 엘리먼트를 화면에 표시
3. { { **매개변수** } }, { { **$Vue 데이터(메서드)** } } 의 활용

Examples
```html
1.특정 태그의 활성여부 
<h1 v-if="!message"> Title </h1>

2.여러개를 묶어서 활성여부 : HTML5 의 Template 태그를 활용 
<template v-if=!message>... </template>

3. v-else, v-else-if 블록의 활용
<h1 v-if="조건내용">... </h1>
<h2 v-else> Empty data </h2>

4. v-if 와 v-show 의 구분예제
<div v-if = "gender === 'male' || gender === 'female'">
    <span v-show = "gender === 'male'">남성</span>
    <span v-show = "gender === 'female'">여성</span>
```


## v-for 배열객체 랜더링 (ch 4)

```html
1. integer 배열
<li v-for="i in 10" class="list-group-item">{ { i } }</li>

2. key, value 배열
<li v-for="(story, idx) in stories" :key="idx">
{{idx}} {{ story.writer }} said "{{ story.plot }}"</li>
```

**idx** 는 Python 의 enumerate() 와 같이 **배열의 index값을** 자동으로 출력한다. 개별 **key 값**은 **객체명.key**로 추출한다
{: .notice--info}


##  v-on (@) Event 핸들링 (ch 5)

```html
1. integer 를 1씩 증가
<button v-on:click="매개변수++">

2. 이벤트와 함수의 연결 
<button v-on:click="함수">
<button @click="함수">

3. 
```