---
title : 쉽게 배우는 Vue.js - 1장~3장
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

1. vue 인스턴스 : **new Vue()**
2. vue directive 함수 : **v-model, v-show, v-if, v-else, v-else-if**
3. { { **매개변수** } }, { { **$파라미터** } } 의 활용


Do it! Vue.js 입문을 읽고 두번째로 접하게 되는 vue.js 책이다. Do it! 쉽다고 하면서 Web/ CSS/ JS 만 알면 된다고 하지만, 여기서 JS 는 JavaScript 만이 아닌, **Node.JS**,  **Express** 를 의미하는 것으로, 단순한 문법이 아닌 패키지를 접해보지 않은 나로써는 술술 넘어가진 않았다.

**You-Tube** 에서 공개된 **Vue 강의** 들을 활용하여 개괄적인 아웃라인을 접한 뒤에서야, 이 책을 정리하면서 실제 활용 가능한 예시들을 정리해 보고자 한다


<br>
# Chapter 1, 2 시작하기 

## 양방향 바인딩 : Vue 디렉티브

Vue js 를 활용하여 동적 Web 구현가능하다. 다음의 예시 에서는 **v-model** (Vue의 디텍티브)를 활용한다

```html
<body>
  <div id = "app">
    // { { : v-model 객체를 HTML Template 에 심는다
    // message : 3곳의 변수명이 일치해야 한다
    <h1> { { message } } </h1>
    <input v-model = "message">
  </div>

<script src="./js/vue.js"></script>
<script>
  new Vue({  // vue 인스턴스를 생성
    el: '#app',
    data: { message: 'Vue js 예시' }
  })
</script>
```


<br>
# Chapter 3 디렉티브(directive)

**Directive** : DOM 에서 **특수한 기능**을 수행하는 Token
1. **v-show** : 조건에 따라 엘리먼트를 화면에 표시한다
2. **v-if** : v-show 대신 특정 조건에 따라 실행 (**콜백이 안정적**)
3. **v-else** : v-if 바로 다음에 활하고, 조건이 True / False 경우에 따라 다른처리를 한다


## **v-show** : 실시간으로 Render() 되어 **DOM**에 적용

**v-show** 는 해당 객체를 출력하는 **Vue Directive** 이지만, 아래의 예제 에서는  **Vue 인스턴스**의 **$data** 파라미터(**Json 객체를 출력한다**) 가 실시간 render() 되어 출력된다 

```html
<div id="app" style="text-align:center;">
  <textarea v-model = "message"></textarea>
  <button   v-show  = "message">전송내용</button>

  <!-- $ : Json 데이터 교환 형식 -->
  <pre>{ { $data } }</pre>
</div>

<script src="../vuejs/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: { message: '내용을 입력하세요' }
  })
</script>
```


## **v-if** : 실행조건이 다수 element를 Toggle 시 유용하다

> v-if = "**!**message" : message 에 값이 없을 때 template 을 출력

tempate 태그에서는 **v-show** 가 실행 불가능 하고, 되더라도 오래걸리는
단점이 있어서 v-show 대신 v-if 를 권장한다

```html
<div id = "app">
  // message 객체의 내용이 없을 때 내용을 출력
  <template v-if = "!message">
    <h1>메세지 내용을 입력하세요!</h1>
    <p>입력된 내용을 바로 화면에 출력합니다!</p>
  </template>

  <!-- v-model : message 와 input text 를 연결 -->
  <textarea v-model = "message"></textarea>

  <button v-show = "message">
    Send word to allies for help!
  </button>
  <pre>{ { $data } }</pre>
</div>

<script src = "./js/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: { message: 'Json 으로 내용이 처리 됩니다' }
  })
</script>
```


## **v-else**

**v-else** 조건은 위의 **v-if** 의 예외일 떄 실행되므로, **v-if** 바로 다음에 v-else 가 나와야만 정상적으로 실행된다.

```html
<div id="app">
  <h1 v-if="!message">메세지 내용을 입력하세요!</h1>
  <h2 v-else>내용이 맞나요?</h2>
  <textarea v-model="message"></textarea>
  <button v-show="message">
    보낼내용 확인
  </button>
  <pre> {{ $data }} </pre>
</div>

<script src="./js/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: { message: '입력할 내용' }
  })
</script>
```
ㅈ
## Quiz 풀기

```html
<link href="./js/bootstrap.min.css" rel="stylesheet">

<div class = "container">

  // v-if 조건에 해당시 아래의 h1을 출력 
  // v-if 조건문에서 OR 조건은 || 를 활용한다
  <div v-if = "gender === 'male' || gender === 'female'">
    <h1>안녕하세요,
      <span v-show = "gender === 'male'">남성 { { name } }.</span>
      <span v-show = "gender === 'female'">여성 { { name } }.</span>
    </h1>
  </div>

  // 위의 v-if 조건에 비해당시, 아래의 h1을 출력 
  <h1 v-else>성별을 입력하지 않아도 괸찮습니다 ^^</h1>

  <label for="gender">성별을 입력해 주세요 :</label>
  <input v-model="gender" class="form-control" id="gender">
  <label for="name">이름을 입력해 주세요 :</label>
  <input v-model="name" class="form-control" id="name">
  <pre>{ { $data } }</pre>
</div>

<script src="./js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '.container',
    data: { gender: 'female', name: 'Universe', },
  })
</script>
```