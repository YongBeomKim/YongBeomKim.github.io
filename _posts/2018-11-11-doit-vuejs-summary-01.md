---
title : Do It Vue.js 입문 요약 상편
last_modified_at: 2018-11-11T10:45:06-05:00
header:
  overlay_image: /assets/images/book/vue_logo.jpeg
categories:
  - vue
tags: 
    - javascript
    - vue
toc: true 
---

Vue.js 에서 제공하는 함수를 활용하는 **vue 인스턴스(연산 객체)**, 그리고 Html 페이지 에서 활용하는 사용자 정의 Tag 인  **vue 컴포넌트(템플릿 객체)** 두 부분으로 크게 나눌 수 있습니다.

<br>
# Vue 인스턴스 와 컴포넌트

<br>
## Vue 인스턴스 

> **new Vue()** 

1. **Vue()** 객체를 **뷰 인스턴스** 라고 한다
2. 속성으로는 **data, el, template, methods (화면제어), computed (state/캐시 화면제어), watch (computed 비동기 처리) , created (생명주기)** 등이 있다
3. **el : 유효범위 :** 웹페이지 생성 -> vue 인스턴스 -> 특정요소에 인스턴스 부착
4. { { 변수 } }, { { $속성 } } 의 활용

<br>
## Vue 컴포넌트

> Vue **.component** ('Tag이름'{..}) : 사용자 Html5 Tag 를 만든다

```javascript
Vue.component('user-tag',{
  template : '<div>컴포넌트 내용</div>'
});
var cmp = {
  template : '<div>컴포넌트 내용</div>'
}
new Vue({ // 지역 컴포넌트 : Tag를 특정
  el: '#app',
  components : {'user-tag':cmp}
})
```

<br>
# 뷰 컴포넌트 통신

## 통신이 필요한 경우

```javascript
var cmp1 = {
  template : '<div>{ {com1data} }</div>',
  data: function(){
    return{cmp1data: 100}
  }
}
var cmp2 = {
  template : '<div>{ {com2data} }</div>',
  data: function(){
    return {cmp2data: cmp1.data.cmp1data}
  } // 별개의 객체로 상속받지 못한다!!
}
new Vue({ //컴포넌트 정의 : 부착 Tag를 특정
  el: '#app',
  components: {
    'my-cmp1':cmp1, // 동작 O
    'my-cmp2':cmp2, // 동작 X
  }
})
```
**cmp2data: cmp1.data.cmp1data** 객체 cmp1, cmp2 는 Vue component 와 별도의 유효범위를 할당받으므로 직접 접근이 불가능 하다.
{: .notice--info} 

<br>
## 부모에서 자식에게 전달 (일반적)

> **props :**

상위컴포넌트 에서 하위 컴포넌트로 **전달가능한 props 속성을** 생성한다

```html
<div id=app>
  <cmp :props="msg"></cmp>  // props 연결 inline속성 : 값
</div>
```

```javascript
// 전역 컴포넌트 객체
Vue.component('cmp', {
    props: ['props'],               // props 속성이름 (v-bind로 연결)
    template: '<p>{ {props} }</p>', // props 활용 예
});
new Vue({
    el: '#app',
    data: { msg: '부모객체 통과' }
});
```

<br>
## 자식의 이벤트를 부모가 전달

> **.$emit() / .$on, v-on()**

**Vue**는 기본적으로 단방향 통신으로 설계가 되어 있고, 예외적으로 하위에서 상위로 이벤트를 발생하기 위해 부모 컴포넌트에 하위 객체를 받을 수 있는 **.$emit(방출할 내용)** 을 정의한다. 템플릿에서 이를 **.$on/ v-on** 속성값을 사용하여 발생한 객체를 수신합니다.

```html
<div id="app">
    // on, v-on, @ : 이벤트를 받는 메소드
    // v-on:show-log, @:show-log : JSX 문법
    <ch-vue v-on:show-log="printText"></ch-vue>
</div>
```
**:** (v-bind: **<small>변수 연결</small>**), **@** (v-on: **<small>이벤트 연결</small>**) 으로 위의 코드를 축약할 수 있습니다.
{: .notice--info}

```javascript
// showLog 함수 (전역 컴포넌트)
Vue.component('ch-vue', {
  template: '<button v-on:click="showLog">show</button>',
  methods: {
    showLog: function() {
      this.$emit('show-log');} //show-log : 출력이름
  }
});
// printText 함수 (하위 컴포넌트)
new Vue({
    el: '#app',
    data: { message: '안녕! Vue!' },
    methods: {
      printText: function() {
        console.log("event 수신");}
    }
});
```
**.$emit('이벤트이름')** 에서 외부로 연결할 이벤트 이름을 정의하고, **template:**에서는 **컴포넌트 Design 을** 정의합니다.
{: .notice--info}

**Carmel Case** 를 사용시 주의할 점은 **show-log** 과 **showLog** 는 동일한 객체입니다. html5 에서는 대소문자를 구분 못하므로 **$emit()** 에서는 소문자로만 된 이름을 사용했고, **template:** 에서는 JSX 의 문법을 사용하므로 대소문자가 구분 가능한 방법으로 이름을 사용하였습니다.
{: .notice--danger}

<br>
## 같은 레벨의 컴포넌트 사이의 통신

> **Event Bus**

앞에서 **부모 -> 자식, 자식 -> 부모** 사이의 통신이 아닌, 서로 다른관계 간의 통신을 위해서 **별도의 객체를 활용** 하는 방법을 익힙니다.

**Vue 전역변수를 Event Bus** 로 사용하면 상위-하위 관계를 유지하지 않아도, 데이터를 한 컴포넌트에서 다른 컴포넌트로 전달할 수 있습니다.

```html
<div id="app">
  <child-component></child-component>
</div>
```

```javascript
// eventBus(전역변수) : 송수신 객체
var eventBus = new Vue();
Vue.component('child-component', {
  template: '<div>컴포넌트<button v-on:click="log">버튼</button></div>',
  methods: {
    log: function() {
      eventBus.$emit('triggerEventBus', 100); }
  }
});
// .$on() : 컴포넌트 수신 메서드
var app = new Vue({
  el: '#app',
  created: function() {
    eventBus.$on('triggerEventBus', function(value) {
      console.log("이벤트 전달 받음 : ", value); });
  }
});
```
