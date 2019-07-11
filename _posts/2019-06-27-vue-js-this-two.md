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

컴포넌트는 자식에게만 전달이 가능합니다. 이유는 **컴포넌트 자체 독립적인 완전성** 을 갖춰야 합니다. 하지만 데이터 교환은 충분히 발생 가능한 상황이기 때문에, 자식에게 전달은 **props** 를 사용하고, 부모에게 전달하는 경우에는 **이벤트를 emit** 합니다. 이런 방식으로 컴포넌트간 간접적인 의존성만 유지합니다.

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

컴포넌트 이름을 지을때 소문자 알파벳을 활용하면 가장 확실합니다. 하지만 연관성 있는 여러객체를 생성하는 경우에는 구분자를 필요로 하게 됩니다. 

이때 주의할 점은 **HTML5 템플릿** 에서는 **대소문자를 구분하지 못합니다.** 때문에 탬플릿에서 기호를 사용하는 경우 **kebab-case** 인 **하이픈** 을 사용하여 객체들을 구분하고, **스크립트 내부** 에서는 대소문자를 구분하는 만큼**camelCase** 를 사용합니다.

## 동적 Props

앞에서 사용된 Props 는 **정적 Props** 로 **String** 데이터만 사용 가능합니다. 때문에 **Number, Object, List** 데이터는 전달할 수 없습니다. 이들을 사용하는 경우에는 **v-bind** 를 사용하여 데이터를 전달해야 합니다.

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







<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/book/holigrail.gif">
</figure>