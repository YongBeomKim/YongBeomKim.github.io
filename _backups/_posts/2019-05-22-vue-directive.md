---
title : Vue.js 의 Dirctive
last_modified_at: 2019-05-22T10:45:06-05:00
header:
  overlay_image: /assets/images/book/vue_logo.jpeg
categories:
  - vue
tags: 
    - vue 
    - javascript
toc: true 
---

**vue.js Directive** 를 작업하는 경우, 아래의 순서대로 태그에 정의 함으로써 작업의 내용을 명확하게 이해하며 작업을 합니다. 앞으로 다룰 Direct 내용으로는 **v-model, v-for, v-if, v-else, v-else-if, v-on, v-bind** 등이 있습니다.

4. **v-model :** 폼 바인더
5. **v-for :** 반복문
6. **v-if, v-else, v-else-if :** 조건부 랜더링
7. **v-on :** 이벤트 핸들러
8.  **v-bind :** 속성 바인더

<br/>
# Directive (지시문)

**Directive (지시문)** 은 **Vue.JS** 객체로 선언된 **템플릿 DOM** 에서만 작동하는 **템플릿 속성** 으로, 위에선 **객체 특정 Directive** 를 알아봤다면 이번에는 **객체 조건 Directive** 를 알아보겠습니다.

## v-if & v-show

**v-if, v-else, v-else-if** 등의 **조건부 랜더링** 내용을 [공식문서](https://kr.vuejs.org/v2/guide/conditional.html) 를 참고하여 정리를 해 보겠습니다

자바스크립트에서 판단을 하는 경우 boolean 객체의 **true, false** 소문자 내용을 활용 합니다. 위에서 선언한 객체의 메서드를 활성화 할 것인지를 판단 합니다.

**v-if** 를 활용하는 방법으로는 대표적으로 아래 2가지가 있습니다.

1. 반복문의 실행 조건 `<div v-for="p in pages" v-if = "page === p">`
2. 객체의 true, false 의 판단 `<h1 v-if ="!message">`

{% raw %}
```html
<div id="app">
  <div v-if="visible">{{ message }}</div>
</div>
<script src="src/vue.min.js"></script>
<script>
var firstApp = new Vue({
  el: '#app',  //vue.js 규칙에 따르는 DOM
    data: {
      message: '처음 시작하는 Vue.js@!@',
      visible: false
  }
});
</script>
```
{% endraw %}

**false** 인 경우 **v-if** 는 해당 DOM 을 **Skip** 하고, **v-show** 는 CSS 속성을 `display:none` 속성으로 rendering 되어 서버 부담이 증가 하고 **v-else 와 함께, vue component 내부에서 사용할 수 없는** 한계가 있습니다. 따라서 동일한 기능이 필요한 경우 **v-if** 를 사용 합니다.

{% raw %}
```html
<div id="app">
    <div v-show="visible">{{ message }}</div>
</div>
</script>
```
{% endraw %}

그럼에도 **v-show** 를 사용하는 이유는 **v-if** 는 랜더링 비용이 낮은대신 Toggle 비용이 높습니다. 반대로 **v-show** 는 토글비용이 낮아 매우 자주 Toggle 하는 경우 (ex> 실시간 주가출력) 등에 유용 합니다.

## v-else, v-else-if

**v-if** 에 대한 **else** 블록을 지정하여 예외적인 실행을 정의할 수 있습니다.

```html
<h1 v-if="!message"> 입력된 메세지가 없습니다</h1>
<h2 v-else> 메세지 전송이 완료 되었습니다</h2>
```

단조로운 예외문이 아닌 다양한 상황에 따른 예외를 지정할 수 있습니다.

```html
<div v-if="type === 'A'">
  A 내용의 출력
</div>
<div v-else-if="type === 'B'">
  B 내용의 출력
</div>
<div v-else-if="type === 'C'">
  C 내용의 출력
</div>
<div v-else>
  Not A/B/C 내용의 출력
</div>
```

## v-for

> \< li **v-for** = "**n** in numbers" \> \{\{ **n** \}\} \</li\>

**Array** 객체를 다루는 Method 로 **v-if** 와 함께 활용 합니다. 파이썬의  `a = [txt  for txt in texts if len(a)>10]` 와 같은 원리로 이해하면 쉽습니다. 

아래 예제는 `app` vue.js 객체로 1) **배열객체** `numbers: [1,2,3,4,5,6,7]` 또는  2) **key/value 객체** `people: [{name: '홍길동',age: 41,}]` 를 **v-for** 에서 활용하는 방법의 예제 입니다.

{% raw %}
```html
<div id="app_for">

  <ul> <li v-for="n in numbers">{{ n }}</li> </ul>

  <table>
    <thead>
      <tr> <th>이름</th> <th>나이</th> </tr>
    </thead>
    <tbody>
      <tr v-for="p in people">
        <th>{{ p.name }}</th>
        <th>{{ p.age }}</th>
      </tr>
    </tbody>
  </table>

</div>

<script>
var app = new Vue({
  el: '#app_for',
  data:{
    numbers: [1,2,3,4,5,6,7],
    people: [
        {name: '홍길동',age: 41,},
        {name: '걸캅스',age: 33,}
  ] }
});
</script>
```
{% endraw %}

`v-if` 내용을 `v-for` Directive 뒤에 붙여 주기만 하면, 반복시 특정 조건일 때에만 해당 내용일 적용 됩니다.

{% raw %}
```html
<tbody>
  <tr v-for="p in people" v-if="p.age >= 30"> 
    <th>{{ p.name }}</th>
    <th>{{ p.age }}</th>
  </tr>
</tbody>
```
{% endraw %}

## v-on **(@) : 이벤트 핸들러**

`v-on` 은 **[이벤트 핸들링](https://kr.vuejs.org/v2/guide/events.html)** 으로 **사용자의 Action** 에 Response 하는 객체를 생성하는 Directive 입니다. `v-on:click="alert('버튼의 클릭')"` 와 같이 JavaScript 내용을 바로 적용하면 `v-on` 에서 특정한 **Action** 결과로 해당 **JavaSciprt** 내용을 실행 합니다.

```html
<div id='app'>
  <button v-on:click="alert('버튼의 클릭')">버튼</button>
</div>
```

**객체의 값** 을 변경할 수 있습니다. `"visible = !visible"` 에서 **not 연산자(!)** 를 활용하면 **true, false** 값이 반복적으로 변경 됩니다.

{% raw %}
```html
<div id="app">
  <div v-if="visible">{{ message }}</div>
  <button v-on:click="visible = !visible">메세지</button>
</div>
```
{% endraw %}

사용자 정의 **vue method 함수** 를 이벤트 메서드로 활용할 수 있습니다. `v-on:keyup.enter` 에서 처럼 `v-on` Directive 에 **keyup** 메서드와 **enter** 를 **chain reaction** 연결 함으로써 조건을 추가할 수 있습니다.

{% raw %}
```html
<div id="app_for">
  <input type="text" v-model="animal" 
    v-on:keyup.enter="capture()">
  <ul>
    <li v-for="a in animals">{{ a }}</li>
  </ul>
</div>

<script>
var app = new Vue({
  el: '#app_for',
  data:{
    animal: null, // input 초기값
    animals: ['lion', 'tiger', 'cat'],
  },
  methods: {
    capture: function() {
      if(this.animal){
        this.animals.push(this.animal);
  } } }
});
```
{% endraw %}

`v-on` Directive 에서 메서드를 호출할 때, 인자값을 함께 활용할 수 있습니다.

```html
<button v-on:click="clickBtn(10)">클릭</button>
<script>
var app = new Vue({
  methods: {
    clickBtn: function(num) {
      alter('clicked ' + num + ' times');
} } });
</script>
```

위의 인자값 이외 `event` 매개변수를 활용하여 **이벤트** 로 DOM 이벤트에 접근할 수 있습니다.

```html
<button v-on:click="clickBtn">클릭</button>
<script>
var app = new Vue({
  methods: {
    clickBtn: function(event) {
      console.log(event);
} } });
</script>
```

해당 객체의 값의 연산을 활용한 이벤트 핸들링도 가능 합니다.

{% raw %}
```html
<div id="app">
  <button v-on:click="upvotes++">추천 {{ votes }}</button>
</div>

<script>
new Vue({
  el: "#app",
  data:{ votes : 0, },
});
</script>
```
{% endraw %}

위와 동일한 내용을 **함수 메서드** 로 구현 가능합니다.

{% raw %}
```html
<div id="app">
  <button v-on:click="upvote">추천 {{ votes }}</button>
</div>

<script>
new Vue({
  el: "#app",
  data:{ votes : 0, },
  methods:{
    upvote: function(){ this.votes++; }
  }
});
</script>
```
{% endraw %}

이러한 이벤트를 한정하는 방법으로 **이벤트 한정자 (.prevent, .stop)** 또는 **Key 한정자 ex)v-on.keyup.13** 가 있습니다. 이들 중 **Key 한정자** 를 자세히 알아 보겠습니다.

아래의 예시 중 `<input v-on:keyup.enter="capture()">` 에서 그 내용을 볼 수 있고 일반적인 **Key 별칭** 을 정리하면 **enter, tab, delete, esc, space, up, down, left, right** 등이 있습니다.

## v-bind **(:) : 속성 바인더**
 
**v-on** 은 **객체의 Event** 를 연결하고, **v-bind** 는 **객체의 속성** 을 연결하여 다양한 기능을 구현 합니다. `v-bind:class="{ 'active' : page == p }"` 처럼 내부에 조건문이 포함되어 **v-if** 를 추가할 필요가 없습니다.

{% raw %}
```html
<div id="app">
  <button v-for="p in pages" 
    v-on:click="page = p">{{ p }}</button>
  <div v-for="p in pages" v-if="page === p">
    <p> {{ p }} 페이지 이동 </p>
  </div>
</div>
<script>
var app_page = new Vue({
  el: '#app',
  data:{
    page: 'page1', // 초기값 객체
    pages: ['page1','page2','page3','page4']
} });
</script>
```
{% endraw %}

> **v-bind:class = "{ 'active' : page == p }"**

위의 vue Directive 내용을 해석하면, **page == p** 조건이 **true** 일 때, 해당 tag 에 **class='active'** 내용을 추가 합니다. 구체적인 작업 내용이 'string' 으로 구성되는 만큼 오타에 주의 합니다.

{% raw %}
```html
<div id="app_page">
  <button v-for="p in pages" 
    v-bind:class="{ 'active' : page == p }"
    v-on:click="page = p"> {{ p }} 
  </button>

  <div v-for="p in pages" v-if="page === p">
    <p> {{ p }} 페이지 이동 </p>
    <img v-bind:src=" 'img/' + p + '.png'"/>
  </div>
</div>
```
{% endraw %}

Angular 등은 `<img v-bind:src="'img/{{ p }}.png'"/>` 을 지원하지만, Vue.js 에서는 작동이 되질 않아, Hard Coding 방법인 `<img v-bind:src="'img/'+p+'.png'"/>` 으로 문자열 완성 방법을 활용해야 제대로 작동 합니다.
{: .notice--info}

**이벤트 핸들러**인 **v-on** 을 **@**, **속성 바인더** 인 **v-bind** 는 **:** 축약기호를 활용하면 보다 간결해 집니다. <strike>하지만 그만큼 헷갈릴 수 도 있어서 입력을 할때에도, 이벤트 핸들러를 앞에 속성바인더는 뒤에 순서대로 입력하며 full name 으로 개념을 익히고, 완성 후 축약형으로 변경하는 식으로 점진적인 접근으로 작업을 진행 합니다.</strike>

{% raw %}
```html
<div id="app">
  
  <button v-for="p in pages" 
    @click="page = p"
    :class="{ 'active' : page == p }">{{ p }}
  </button>
  
  <div v-for="p in pages" 
    v-if = "page === p"> <p>{{ p }} 페이지</p>
    <img :src=" 'img/' + p + '.png'"/>
  </div>

  <input type="text" v-model="animal" 
    @keyup.enter="capture()">
  <ul>
    <li v-for="a in animals">{{ a }}</li>
  </ul>
</h1>
```
{% endraw %}

`v-bind` 에서 HTML 속성값을 vue.js 에 연결할 때, 어느 객체의 값을 연결할지 결정할 수 있습니다.

```html
<div id="app">
  <p v-bind:id="idA"> id 와 바인딩</p>
  <p v-bind:class="classA"> class 와 바인딩</p>
  <p v-bind:style="styleA"> style 와 바인딩</p>
</div>
<script>
new Vue({
  el: '#app',
  data: {
    idA: 10,
    classA: 'container',
    styleA: 'color : blue',
} });
</script>
```

반복문인 **v-for** Directive 를 사용할 때에는 **v-bind:key="n"** 과 같이 반복 객체를 특정해 주는 것이 좋습니다. 이를 활용하면 전체 DOM 이 아닌, Vue.js 프레임 워크에서 직접 제어를 하면서 **조작시 소요되는 시간을 최소화** 합니다.

```html
<div id="app">
   <li v-for="(toItem, index) in data" 
     v-bind:key="toItem" class="shadow">
   </li>
</div>
```