---
title : 쉽고 빠르게 배우는 Vue.js - 4장
last_modified_at: 2018-10-12T10:45:06-05:00
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

1. Js의 **배열객체** 기반의 **리스트 출력**
2. Template 에서 **반복출력**
3. 객체의 Property를 반복하며 실행

<figure class="align-center">
  <img src="https://css-tricks.com/wp-content/uploads/2018/04/v-for_3.png" alt="">
</figure> 

<br>
# Chapter 4 : 리스트 랜더링


## v-for : 정수만큼 반복하면서 실행
 
> v-for = "i in 10" 

> { { i-1 } } 곱하기 4 는 { { (i-1) * 4 } }

객체를 { { 변수 } } 를 사용하여 반복을 한다. { { } } **Vue 객체** 내부에서는 단단한 연산도 가능하다 

```html
<link href="./js/bootstrap.min.css" rel="stylesheet">

// bootstrap 의 **.container, list-group, list-group-item** 활용 
<div class="container">
  <h1>4단 곱셈 수식을 테이블로 출력</h1>
  <ul class="list-group">
    <li v-for="i in 10" class="list-group-item">
      { { i-1 } } 곱하기 4 는 { { (i-1) * 4 } }.
    </li>
  </ul>
</div>

<script src="./js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '.container'
  })
</script>
```


## v-for : 배열 객체를 활용 

> v-for = "story in stories"

> v-for = "(story, idx) in stories"

> { {idx} }  { { story.writer } }  said  "{ { story.plot } }"

1. **stories** : 원본 데이터 배열객체
2. **stories.plot, stories.plot** : 배열 객체의 내부 프로퍼티
3. **(story, idx)** : 순환되는 배열 element **(key, value)**

```html
<link href="./js/bootstrap.min.css" rel="stylesheet">

<div class="container">
  <ul class="list-group">
    <li v-for="(story, idx) in stories" :key="idx" class="list-group-item">
      { {idx} }  { { story.writer } }  said  "{ { story.plot } }"
    </li>
  </ul>
</div>

<script src="./js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '.container',
    data: {
      stories: [
        { plot: "I crashed my car today!",
          writer: "Alex"},
        { plot: "Someone ate my chocolate...",
          writer: "John"},]
      }
    })
</script>
```


