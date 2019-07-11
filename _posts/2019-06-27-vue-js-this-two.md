---
title : Vue.js 이정도는 알아야지 하편
last_modified_at: 2019-06-24T12:45:06-05:00
header:
  overlay_image: /assets/images/book/vuejs.png
categories:
  - vue
tags: 
    - vue
    - javascript
toc: true    
---

앞에서 Vue.js 객체와 사용자 조작에 사용할 다양한 Directive 함수들에 대해 알아보았습니다. 지금부터 알아볼 내용은 **Vue.component()** 로써 확장된 **Vue 인스턴스** 가 생성됩니다. 

<br/>
# 컴포넌트 개념

## 전역 컴포넌트

`Vue.component()` 를 사용하면 해당 컴포넌트를 전역으로 활용할 수 있습니다. 이를 활용하면 공통적인 로직이나 템플릿을 재활용 하기에 용이합니다.

전역 컴포넌트를 생성시 주의할 점으로는 **Vue.component()** 에서 **data** 를 정의할 때에는 **반드시 함수를 사용하여** 정의를 해야 합니다. 

{% raw %}
```html
<div id="app"> <date></date> </div>
<script>
var dateComponent = {
  template: '<div>{{ now }}</div>',
  data: function () { return { now: new Date() } }
}
new Vue({
  el: '#app',
  components: { date: dateComponent }
});
</script>
```
{% endraw %}

컴포넌트 내부에서도 **이벤트에 대응하는 연산 내용을** 추가할 수 있습니다. 

{% raw %}
```javascript
Vue.component('count', {
  template: '<button @click="counter += 1">{{ counter }}</button>',
  data: function () { return { counter: 0 } }
});
new Vue({ el: '#app' });
```
{% endraw %}

## 로컬 컴포넌트

컴포넌트의 옵션으로 객체를 저장한 뒤, Vue 인스턴스에서 호출하여 사용 합니다.

```javascript
var dateComponent = {
  template: '<div>{{ now }}</div>',
  data: function () { return { now: new Date() }
  }
}
new Vue({
  el: '#app',
  components: { date: dateComponent }
});
```

## 컴포넌트 작성시 제한사항

태그 중 **ul, ol, table, select** 등 **HTML5 기본 엘리먼트 설정값이 있는** 태그와 동일한 이름으로 컴포넌트를 작성하면 문제가 발생합니다. 즉 HTML5 기능을 갖는 이름과 다르게 컴포넌트명을 정의 합니다. 동일한 이름으로 사용할 필요가 있으면 Vue 인스턴스에 컴포넌트 이름을 정의한 뒤 Vue Directive 중 **is** 를 활용 합니다.

{% raw %}
```html
<tr is="row-component"></tr>

<script>
var rowComponent = {
  template: '<tr><td>사과</td><td>Apple</td></tr>'
};
new Vue({
  el: '#app',
  components: { 'row-component': rowComponent }
});
</script>
```
{% endraw %}

## 템플릿 분리

컴포넌트의 템플릿을 분리하여 `<script></script>` 태그 내부에 탬플릿 내용을 정의할 수 있습니다. vue 태그인 `<template id="todo-component"></template>` 로 작업을 해도 동일한 결과를 출력합니다.

{% raw %}
```html
<div id="app">
  <todo-component></todo-component>
</div>

<script src="https://unpkg.com/vue@2.3"></script>

<!-- 템플릿 부분을 분리하였습니다. -->
<script type="text/x-template" id="todo-component">
  <div> <h1>2017년의 목표</h1>
    <ul> 
      <li v-for="todo in todos"> {{ todo }} </li>
    </ul>
  </div>
</script>

<script>
var todoComponent = {
  template: '#todo-component', // id 선택자를 이용
  data: function () {
    return { todos: ['열심히 일하기', '연애하기'] },
  }
};
new Vue({
  el: '#app',
  components: { 'todo-component': todoComponent },
});
</script>
```
{% endraw %}

<br/>
# 컴포넌트 데이터 전달

## 부모-자식 컴포넌트 관계

컴포넌트는 **Props** 속성을 활용하여 자식에게만 전달을 합니다. **컴포넌트 자체 독립적인 완전성** 을 갖춰야 하기 때문입니다. 하지만 반대적인 상황도 충분히 가능한 상황이므로 부모에게 전달하는 경우에는 **이벤트를 emit** 을 활용 합니다.

## props 데이터 전달

**자식 컴포넌트는 부모의 데이터를 참고** 가능하고 **props** 옵션을 사용합니다. 하지만 반대로 자식 컴포넌트는 부모 데이터를 참조할 수 없습니다.

{% raw %}
```javascript
var simpleComponent = {
  props: ['message'],              // props 정의
  template: '<p>{{ message }}</p>' // props 템플릿에서 사용
};
new Vue({
  el: '#app',
  components: {'simple-component': simpleComponent}
});
```
{% endraw %}


## 네이밍 규칙

컴포넌트 이름을 지을때 주의할 점은 **HTML5 템플릿** 에서는 **대소문자를 구분하지 못합니다.** 때문에 탬플릿에서는 **kebab-case** 인 **하이픈** 을 사용하고, **스크립트 내부** 에서는 대소문자를 구분하는 만큼**camelCase** 를 사용 합니다.

## 동적 Props

앞에서 사용된 Props 는 **정적 Props** 로 **String** 데이터만 사용 가능하고 **Number, Object, List** 는 전달할 수 없습니다. 이를 사용하는 경우에는 **v-bind** 로 데이터를 전달 합니다.

{% raw %}
```html
<div id="app">
  <input type="text" v-model="message">
  <simple-component v-bind:message="message"></simple-component>
</div>

<script>
var simpleComponent = {
  props: ['message'],
  template: '<div>{{ message }}</div>'
};
new Vue({
  el: '#app',
  data: { message: 'Hello, Vue!' },
  components: { 'simple-component' : simpleComponent }
});
</script>
```
{% endraw %}

## Props 주의할 점

### Props 초기값을 로컬 데이터로 정의

부모 컴포넌트가 전달한 **Props** 를 수정하는 경우는 다음과 같이 진행합니다.

{% raw %}
```html
<div id="app">
  <simple-component :initial-counter="counter"></simple-component>
</div>

<script>
var simpleComponent = {       // 하위 컴포넌트 객체를 정의
  props: ['initialCounter'],  // 하위 컴포넌트 에서 Props 지정 : 템플릿서 사용
  template: '<button @click="addCounter">{{ counter }}</button>',
  data: function () {
    return { 
      counter: this.initialCounter 
    } 
  },
  methods: {
    addCounter: function () { 
      this.counter += 1;
    }
  }, // 자식 컴포넌트에서, 부모 { counter : 0 } 호출 
};

new Vue({  // 부모 인스턴스
  el: '#app',
  data: { counter: 0 },
  components: { 'simple-component' : simpleComponent }
});
</script>
```
{% endraw %}

### Props 로 부터 계산된 속성을 정의

계산 작업이 가능한 객체를 활용하는 예제 입니다.

```html
<div id="app">
  <simple-component :price="price"></simple-component>
</div>

<script>
var simpleComponent = {
  props: ['price'],
  template: '<p>가격: {{ price }} 할인: {{ discountPrice }}</p>',
  computed: {
    discountPrice: function () { 
      return  this.price * 0.7; 
    }
  }
};

new Vue({
  el: '#app',
  data: { price: 125000 },
  components: { 'simple-component': simpleComponent }
});
</script>

```

## Props 검증하기

데이터 Type 이 중요한 경우에는, Props 속성을 사용하여 데이터 타입을 강제할 수 있습니다. 이는 다른 데이터와 연결시 유용합니다.


```html
```


<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/book/holigrail.gif">
</figure>