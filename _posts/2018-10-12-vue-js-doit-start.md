---
title : 쉽고 빠르게 배우는 Vue.js 2 
last_modified_at: 2018-10-12T10:45:06-05:00
header:
  overlay_image: /assets/images/book/vue_logo_small.jpg
categories:
  - vue
tags: 
    - vue 
    - javascript
toc: true 
---


# Introduction

<figure class="align-center">
  <img src="https://pbs.twimg.com/media/DNou-HLXcAAW23s.jpg" alt="">
</figure>

Do it! Vue.js 입문을 읽고 두번째로 접하게 되는 vue.js 책이다. Do it! 쉽다고 하면서 Web/ CSS/ JS 만 알면 된다고 하지만, 여기서 JS 는 JavaScript 만이 아닌, **Node.JS**,  **Express** 를 의미하는 것으로, 단순한 문법이 아닌 패키지를 접해보지 않은 나로써는 술술 넘어가진 않았다.

**You-Tube** 에서 공개된 **Vue 강의** 들을 활용하여 개괄적인 아웃라인을 접한 뒤에서야, 이 책을 정리하면서 실제 활용 가능한 예시들을 정리해 보고자 한다

<br>
## Chapter 1, 2 시작하기 

### 양방향 바인딩 : Vue 디렉티브

Vue js 를 활용하여 동적 Web 구현가능하다. 다음의 예시 에서는 **v-model** (Vue의 디텍티브)를 활용한다

```html
<body>
  <div id="app">
    <h1> { { message } } </h1>
    <input v-model = "message">
  </div>

<script src="./js/vue.js"></script>
<script>
  // vue 인스턴스를 생성한다
  new Vue({
    el: '#app',
    data: {
      message: 'Vue js 예시'
    }
  })
</script>
```


<br>
## Chapter 3 디렉티브(directive)

**Directive** : DOM 에서 **특수한 기능**을 수행하는 Token
1. **v-show** : 조건에 따라 엘리먼트를 화면에 표시
2. **v-if** : v-show 대신 특정 조건에 따라 실행 (**콜백이 안정적**)
3. **v-else** : v-if 바로 다음에 활하고, 조건이 True / False 경우에 따라 다른처리를 한다


### v-show 

```html
<body>
  <div id="app" style="text-align:center;">

    <h1>메세지 보낼 내용을 입력하세요!!</h1>
    <!-- v-model : render() 에 적용 할 객체를 정의 -->
    <textarea v-model="message"></textarea>

    <!-- v-show : 항상 Render() 되어 DOM에 적용된다 -->
    <button v-show="message">익명 전송할 내용</button>

    <!-- $ : Json 데이터 교환 형식 -->
    <pre>{{ $data }}</pre>
  </div>
</body>

<script src="../vuejs/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {
      message: '내용을 입력하세요'
    }
  })
</script>
```


