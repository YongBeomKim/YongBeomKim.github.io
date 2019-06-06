---
title : Vue.js 기본 익히기
last_modified_at: 2019-05-21T10:45:06-05:00
header:
  overlay_image: /assets/images/book/vue_logo.jpeg
categories:
  - vue
tags: 
    - vue 
    - javascript
toc: true 
---

**Vue.js** 를 공부하면서 새로운 JavaScript 개념의 관계들이 눈에 보이질  않아 어려워 하던 중, **Selenium** 으로 크롤링 내용을 익힌 뒤 **[아프리카도서관](https://www.youtube.com/playlist?list=PLtht1_et-35ArPa9sBozD9dEr1CPRIOMb)** 의 내용을 보면서 Python 의 **List, Dict** 객체의 조작과 **if, for, loop** 조건식 유사한 내용들로 정리를 진행 합니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/vue-vscode.jpg">
</figure>

**vue 3.0** 이 나왔지만 최신 **[다운로드](https://github.com/vuejs/vue/releases)** 버젼은 v2.6.10 으로 **Vue 2** 내용을 기준으로 진행 합니다. vue 작업을 하다보면 객체들을 정의할 때 'String' 객체를 활용하는 만큼 기존의 **html** 문법 검사로 template 틀을 완성한 뒤, **vue 문법 검사** 를 활용하여 문자열 객체들의 내용을 확인하여 작업의 효율성을 높입니다.

<br/>
# Vue.js Structure
아래의 내용을 간단하게 정리 해 보겠습니다.

1. `new Vue({})` 에서는 **el(element mount), data, method** 3가지 속성을 추가할 수 있습니다.
2. vue.js 모듈을 활용할 **HTML Tag** 를 **el:** 선언으로 **Mount** 합니다.
3. **폼 입력 바인더** 인 `v-model` 로 **data: 변수명** 을 연결하면 **양방향 binding** 을 지원 합니다.
4. 배열객체는 `v-for` 로 **객체 수 만큼 반복** 하고, `v-if` 로 **제한** 합니다.
5. **이벤트 핸들러** 인 `v-on`, **속성 바인더** 인 `v-bind` 를 활용하여 기능들을 추가 합니다.

`폼 바인더(v-model)` **->** `vue 반복 조건문(v-for, v-if)` **->** `이벤트 핸들러(v-on)` **->** `속성 바인더(v-bind)` 순서로 입력하여, 가독성을 높여 진행 합니다.

{% raw %}
```html
<div id="app">
  
  <button v-for="p in pages" 
    v-bind:class="{ 'active' : page == p }"
    v-on:click="page = p">{{ p }}
  </button>
  
  <div v-for="p in pages" 
    v-if = "page === p"> <p>{{ p }} 페이지</p>
    <img v-bind:src=" 'img/' + p + '.png'"/>
  </div>

  <input type="text" v-model="animal" 
    v-on:keyup.enter="capture()">
  <ul>
    <li v-for="a in animals">{{ a }}</li>
  </ul>
</div>

<script>
var app = new Vue({
  el: '#app',
  data:{
    page: 'page1', // 입력 form 초기값
    pages: ['page1','page2','page3'],
    animal: null,  // 입력 form 초기값
    animals: ['lion', 'tiger'],
  },
  methods: {
    capture: function() {
      if(this.animal){
        this.animals.push(this.animal);
      }
    }
  }
});
</script>
```
{% endraw %}

<br/>
# 객체와 Binding

**Vue** 에서 사용되는 **data 메소드 객체** 와 내용을 확일할 때에는, 브라우저의 **console** 에서 아래의 예제를 실행한 뒤, **firstApp.message** 를 실행하면 다음과 같이 객체와 내용을 확일 할 수 있습니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/vue-console.jpg">
</figure>

## 단방향 Binding

**script** 태그는, **모듈을 불러오는 태그** 와 **내용을 적용하는 태그** 가 구분 됩니다. 이들의 구분없이 작업을 하면 문제가 발생 합니다.

**단방향 binding** 예시로 **템플릿 DOM 엘리먼트** 들 중에 `#app` 인 DOM 만을 **vue.js 규칙에 따르는 DOM** 으로 선언을 합니다. 명령 script 는 작동할 구체적인 내용을 입력 합니다.

{% raw %}
```html
<!-- 단방향 Binding 대상 DOM-->
<div id="app">{{ message }}</div>

<script src="src/vue.js"></script>
<!-- Binding 내용 -->
<script>
    var firstApp = new Vue({
        el: '#app',  //vue.js 규칙에 따르는 DOM
        data: {
            // message 는 변수명 (변경가능)
            message: '처음 시작하는 Vue.js@!@'
        }
    });
</script>
```
{% endraw %}

## 양방향 Binding 과 **v-model**

**v-model** 을 **[폼 입력 바인딩 또는 양방향 데이터 바인딩](https://kr.vuejs.org/v2/guide/forms.html)** 이라고 합니다. 

**Directive (지시문)** 은 **Vue.JS** 객체로 선언된 **템플릿 DOM** 에서만 작동하는 **템플릿 속성** 으로, 아래 예시는  **[v-model (폼 입력 바인딩)](https://kr.vuejs.org/v2/guide/forms.html)** Directive 속성에 **data 메서드** 를 연결하면 자동으로 **양방향 Binding** 이 동작 합니다.

{% raw %}
```html
<div id="app">
  <div>{{ message }}</div>
  <input type="text" v-model="message" />
</div>
```
{% endraw %}

<br/>
# Directive (지시문)

**Directive (지시문)** 은 **Vue.JS** 객체로 선언된 **템플릿 DOM** 에서만 작동하는 **템플릿 속성** 으로, 위에선 **객체 특정 Directive** 를 알아봤다면 이번에는 **객체 조건 Directive** 를 알아보겠습니다.

## v-if & v-show

자바스크립트에서 boolean 객체는 **true, false** 소문자를 활용 합니다. 위에서 선안한 객체의 메서드를 활성화 할 것인지 판단 합니다.

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

**false** 인 경우 **v-if** 는 해당 DOM 을 **Skip** 하고, **v-show** 는 `display=None` 속성으로 rendering 되어 서버 부담이 증가 합니다. 따라서 동일한 기능이 필요한 경우 **v-if** 를 활용 합니다.

{% raw %}
```html
<div id="app">
    <div v-show="visible">{{ message }}</div>
</div>
</script>
```
{% endraw %}

## v-for

> \< li v-for = **"n in numbers"** \> \{\{ **n** \}\} \</li\>

**Array** 객체를 다루는 Method 로 **v-if** 와 함께 활용 합니다. 파이썬에서  `a = [txt  for txt in texts if len(a)>10]` 과 같은 원리로 접근하면 이해가 쉽습니다. 

아래의 예제는 `app` vue.js 객체로 1) **배열객체** `numbers: [1,2,3,4,5,6,7]` 또는  2) **key/value 객체** `people: [{name: '홍길동',age: 41,}]` 를 **v-for** 에서 활용하는 방법의 예제 입니다.

{% raw %}
```html
<div id="app_for">

  <ul>
    <li v-for="n in numbers">{{ n }}</li>
  </ul>

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

<script src="src/vue.min.js"></script>
<script>
var app = new Vue({
  el: '#app_for',
  data:{
    numbers: [1,2,3,4,5,6,7],
    people: [
        {name: '홍길동',age: 41,},
        {name: '걸캅스',age: 33,}
    ]
  }
})
</script>
```
{% endraw %}

## v-if

위의 `v-for` Directive 에서 특정한 객체들만 활용하고 싶은경우, 예를들어 `age` 객체 값이 40 이상인 경우만 출력하고 싶을 때에는 아래의 내용과 같이 `v-if` 내용을 `v-for` Directive 뒤에 붙여 주기만 하면 됩니다.

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
      }
    }
  }
});
```
{% endraw %}

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
  }
})
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
  <hr/>
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
</div>
```
{% endraw %}

`폼 바인더(v-model)` **->** `vue 반복 조건문(v-for, v-if)` **->** `이벤트 핸들러(v-on)` **->** `속성 바인더(v-bind)` 순서로 태그에 정의 함으로써 작업의 내용을 명확하게 이해하면서 작업을 진행하도록 합니다.

<body>
<div id="app_page">
  <button v-for="p in pages" v-bind:class="{ 'active' : page == p }"
      v-on:click="page = p">{{ p }}</button>
  <hr/>
  <div v-for="p in pages" v-if="page === p">
      <p> {{ p }} 페이지 이동 </p>
      <img v-bind:src=" 'img/' + p + '.png'"/>
  </div>
</div>
<hr/>

<div id="app">
  <div v-if="visible">{{ message }}</div>
  <button v-on:click="visible = !visible">메세지</button>
</div>

<div id="app_for">
  <ul>
      <li v-for="n  in  numbers">{{ n }}</li>
  </ul>
  <button v-on:click="alert('버튼의 클릭')">버튼</button>
  <hr/>
  <button v-on:dblclick="alert('버튼의 더블클릭')">버튼</button>
  <table>
      <thead>
          <tr>
              <th>이름</th>
              <th>나이</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="p in people">
              <th>{{ p.name }}</th>
              <th>{{ p.age }}</th>
          </tr>
      </tbody>
      <input type="text" v-model="animal" v-on:keyup.enter="capture()">
  </table>

  <ul>
      <li v-for="a in animals">{{ a }}</li>
  </ul>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
  var app_page = new Vue({
      el: '#app_page',
      data:{
          page: 'page1',
          pages: ['page1', 'page2', 'page3', 'page4']
      }
  })

  var firstApp = new Vue({
      el: '#app',  //vue.js 규칙에 따름을 정의
      data: {
          message: '처음 시작하는 Vue.js@!@',
          visible: false
      }
  });

  var app = new Vue({
      el: '#app_for',
      data:{
          animal: null, // 입력의 초기값 선언
          animals: ['lion', 'tiger', 'cat', 'dog', 'eagle'], // 저장 배열객체
          numbers: [1,3,5,7,9,13,15],
          people: [
              {name: '홍길동',age: 41,},
              {name: '걸캅스',age: 33,}
          ],
      },
      methods: {
          capture: function() {
              if(this.animal){
                  this.animals.push(this.animal);
              }
          }
      }
  });
</script>
</body>

