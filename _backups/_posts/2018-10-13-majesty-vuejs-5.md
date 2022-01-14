---
title : 쉽게 배우는 Vue.js - 5장 (상호작용)
last_modified_at: 2018-10-13T10:45:06-05:00
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

**사용자의 Event**에 따른 결과를 반환한다


<br>
# Chapter 5 : 상화작용 (Event Handling)

> **v-on** : **click** = "upvote"

> **@click** = "upvote"

Vue 디렉티브(directive) 인 **v-on**을 쓰면 내용은 명확하겠지만, 뒤에 이벤트명, 적용함수 등 이어붙는 내용이 많아짐에 따라 축약형인 **@**로 대체가 가능하다 (위 아래의 문법은 모두 동일한 결과를 출력한다)


<br>
## 이벤트 처리 : Button 을 **Click** 하는 횟수를 Counting 한다

```html
<button v-on:click="upvote">
    Upvote 카운트 : { { upvotes } }
</button>

<script type="text/javascript" src="./js/vue.js"></script>
<script type="text/javascript">
new Vue({
    el: '.container',
    data: { upvotes: 0 },
    methods: {
        upvote: function () { this.upvotes++; }
    }
})
</script>
```

위의 코드에서 `function () { this.upvotes++; }` 를 `() => { this.upvotes++; }` 로 바꾸면 작동을 하지 않는다 (2018.10.17)


<br>
## 이벤트 한정자 : 계산기 구현 

v-model : 사용자 입력 데이터 자동변환 method [Vue.js](https://kr.vuejs.org/v2/guide/forms.html)

1. **v-model.number** : "숫자"로 자동변경
2. **v-model.trim** : 자동으로 trim()
3. **v-model.lazy** : 입력 이벤트와 동기화 한다

> **.number** : 숫자의 Passing 위해 'number' 한정자를 사용

> **.preventDefault()** : 특정 이벤트의 기본동작을 제한한다

**.preventDefault()** 을 사용하지 않으면 **페이지를 새롭게 불러와서** 변경된 내용이 적용되지 않고 화면이 변경되어 초기화 된다

```html
<div>
  <h1>두 숫자를 연산한 결과를 출력</h1>
  <form>
    <input v-model.number="a">
    <select v-model="operator">
      <option> + </option>
      <option> - </option>
      <option> * </option>
      <option> / </option>
    </select>
    <input v-model.number="b">
    <button type="submit" @click="calculate"> 계산하기 </button>
  </form>
  <h2>결과 값 : { {a} } { {operator} } { {b} } = { {c} }</h2>
</div>

<script type="text/javascript" src="./js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '.container',
    data: { a: 1, b: 2, c: null, operator: '+',},
    methods: {
      calculate: function(event) {
        event.preventDefault();
        switch (this.operator) {
          case '+' : this.c = this.a + this.b
          break;
          case '-' : this.c = this.a - this.b
          break;
          case '*' : this.c = this.a * this.b
          break;
          case '/' : this.c = this.a / this.b
          break; }
      }
    },
  });
</script>
```

**v-on** 에 연결된 이벤트의 기본 동작시 새로고침을 방지하여, 비동기 처리가 원활 하도록 아래의 4개 **이벤트 한정자**를 제공합니다 (capture, self 는 거의 사용되지 않는다)

1. .prevent
2. .stop
3. .capture
4. .self


<br>
## 키 한정자

> <input v-model="a" **@keyup.13**="calculate">

.keyup 키보드 이벤트를 청취할 경우 **키 코드**를 확인할 필요가 있다. 참고로 **enter**의 경우는 **13**을 코드값으로 갖는다.

일반적으로 많이 사용되는 키로는 **enter, tab, delete, esc, space, up, down, left, right** 가 있다.


<br>
## Computed Property 계산된 프로퍼티

**Vue 인스턴스**의 **Computed 객체**에 정의된 함수는, **React** 의 **state** (변수가 변하면 변수가 포함된 함수도 같이 재실행 된다) 와 동일한 결과를 출력한다 <small>이를 남발하면 콜백에 빠진다</small>

```html
<html>
<div class="container">
  <h1>두 숫자를 연산한 결과를 출력</h1>
  <form>
    <input v-model.number="a" \> +
    <input v-model.number="b" \>
  </form>
  <h2>결과 값 : { {a} } + { {b} } = { {c} }</h2>
  <pre> { { $data } } </pre>
</div>

<script type="text/javascript">
  new Vue({
    el: '.container',
    data: { a: 1, b: 2},
    computed: {
      // 계산된 프로퍼티 
      c: function() {
        return this.a + this.b
      }
    },
  });
</script>
```