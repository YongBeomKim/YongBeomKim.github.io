---
title : Vue.js Component, Router
last_modified_at: 2019-05-24T10:45:06-05:00
header:
  overlay_image: /assets/images/book/vue_logo.jpeg
categories:
  - vue
tags: 
    - vue 
    - javascript
toc: true 
---

**[Vue v2.6.10](https://github.com/vuejs/vue/releases)** 을 작업할 때에는 `폼 바인더(v-model)` **->** `vue 반복 조건문(v-for, v-if)` **->** `이벤트 핸들러(v-on)` **->** `속성 바인더(v-bind)` 순서로 작업을 이해했다면, 이번에는 조금 더 깊이있는 내용으로 **[Do it Vue.js](https://github.com/joshua1988/doit-vuejs)** 의 내용으로 보완 합니다.

<br/>
# Vue.js LifeCycle

앞에서 살펴본 **Vue 인스턴스** 속성은 다음과 같았습니다. 1번의 request 에 모든 작업 내용을 지정했기 때문에 가능했습니다. 하지만 다양한 모듈과 연결된 작업을 진행하다 보면 단계별 필요한 작업을 특정 합니다. 

{% raw %}
```javascript
<div id="app">{{ message }}</div>
<script>
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  },
  beforeCreate: function() {
    console.log("beforeCreate");
  },
  created: function() {
    console.log("created");
  },
  mounted: function() {
    console.log("mounted");
  },
  updated: function() {
    console.log("updated");
  }
});
</script>
```
{% endraw %}

이를 위해 Vue.js 에서 제공하는 **[Life Cycle(생명주기)](https://blog.martinwork.co.kr/vuejs/2018/02/05/vue-lifecycle-hooks.html)** 을 활용합니다. 

1. `this`, `data` 속성이 접근하는 **Created**
2. template 의 `render()` 직전 단계인 **beforeMount**
3. `el:` 에서 특정한 DOM 에 부착된 뒤에 호출하는 **mounted**
4. mounted 직후 **vue 인스턴스 값들의 치환** 된 직후 **beforeUpdate**
5. 데이터 변경으로 새로 render() 된 이후 **updated**
6. `vue 인스턴스` 를 삭제하기 직전인 **beforeDestroy**
7. `vue 인스턴스` 삭제한 직후인 **destoryed**

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/vue-js-diagram.png">
</figure>

<br/>
# Vue.js Component

vue.js 를 조합하여 화면을 구성하는 블록 입니다. **[Vue 스타일 가이드](https://kr.vuejs.org/v2/style-guide/index.html)** 를 참고하여 작업을 진행 합니다.

HTML 은 **대소문자를 구분하지 못합니다.** 때문에 변수 이름을 **CamelCase** 로 구분하고 싶은 경우에는, 대소문자가 구분되지 않아서, 이름을 `my-tag` 와 같은 **케밥기법(kebab-case)** 으로 작업을 하면 JavaScript 등에서 **CamelCase** 로 인식 및 구분이 가능 합니다.

{% raw %}
```html
<story is-user="true"></story>
<script>
new Vue({
  props: ['isUser'],
})
```
{% endraw %}

## 전역 컴포넌트

해당 컴포넌트를 **다양한 vue 인스턴스** 에서 재활용이 가능합니다.

```html 
<div id="app">
  <my-tag></my-tag>
</div>

<script>
Vue.component('my-tag', {
  template: '<div>컴포넌트 등록</div>',
});

new Vue({ 
  el: '#app',
});
</script>
```

## 지역 컴포넌트

**특정 vue 인스턴스** 에서만 작동하는 컴포넌트를 정의 합니다.

```html 
<div id="app">
  <my-tag></my-tag>
</div>

<script>
var cmp = {
  template: '<div>컴포넌트 등록</div>',
};

new Vue({ 
  el: '#app',
  components: {'my-tag': cmp}
});
</script>
```

<br/>
# Vue 컴포넌트 통신

개별 컴포넌트는 유효범위로 인해 서로 참조가 불가능 합니다. 

```javascript
Vue.component('컴포넌트 태그', {
  props: ['props 객체명'], 
  template: '<h1></h1>',
  methods: { 함수명: function() { } }
});
```

## props : 아래로 전달

상위 컴포넌트가 하위 컴포넌트에 데이터를 전달하는 속성 입니다. 따라서 **하위 컴포넌트** 내부에 정의를 합니다. 그 뒤 상위 컴포넌트에 `v-bind:props객체` 속성으로 연결 합니다.

{% raw %}
```html
<div id="app">
  <c-comp v-bind:pdata="msg"></c-comp>
</div>

<script>
Vue.components('c-comp', {
  props: ['pdata'], // props 객체명
  template: '<p>{{ pdata }}</p>',
});

new Vue({
  el: '#app',
  data: {
    msg: "부모 컴포넌트 입니다",
  }
});
</script>
```
{% endraw %}

## event Bus : 위로 전달

단방향 통신을 기본으로 하는 vue.js 의 정식문서에는 없는 내용 입니다. 양방향 바인더인 **폼 바인더(v-model)** 와 별도로 이를 구현하기 위해 **강제로 상위 컴포넌트** 생성 및 활용 합니다.

`.$emit()` 를 활용하여 이벤트를 보내고, `.$on()` 에서 이벤트를 수신 합니다. 

{% raw %}
```html
<div id="app">
  <c-comp></c-comp>
</div>

<script>
var eventBus = new Vue();

Vue.component('c-comp', {
  template: `
    <div>컴포넌트
      <button v-on:click="showLog">보이기</button>
    </div>`,
  methods: {
    showLog: function() {
      eventBus.$emit('trigger', 100);
} } });

var app = new Vue({
  el: '#app',
  created: function() {
    eventBus.$on('trigger', function(value){
      console.log("이벤트 전달 : ", value);
}) } });
</script>
```
{% endraw %}

<br/>
# Vue 라우터 (Routing)

라우팅이란 웹페이지 간의 이동 방법을 의미 합니다. **[Vue Router 공식 한글문서](https://router.vuejs.org/kr/guide/)** 의 내용을 참고하여 내용을 익히도록 합니다.

```html
<script>
var User = {
  template:  `<div> User Component
                <router-view></router-view>
              </div>`
};
var UserPost = {
  template: '<p>Post 컴포넌트</p>'
};
var routes = [
  { path: '/user',
    component: User,
    children: [
      { path: 'posts', component: UserPost },
    ]
  }
];
var router = new VueRouter({ routes });
var app = new Vue({ router }).$mount('#app');
</script>
```

## router-link

> \< router-link **to**="/foo"\> foo 경로 이동 \</ router-link \>

`Vue-router` 의 `router-link` **Tag** 를 활용하고, 속성인 `to` prop 에서 **url** 경로를 추가 합니다. 해당 tag의 내용은 `<a></a>` 내용으로 화면에 출력 합니다. 

## router-view **(Named View)**

> \< router-view **name**="header"\> \</ router-view \>

Named View 인 `<router-view>` 태그는 개별 컴포넌트를 선택하여 렌더링 합니다.

```html
<div id="app">
   <router-view name="header"></router-view>
   <router-view></router-view>
   <router-view name="footer"></router-view>
</div>

<script>
var Body   = { template: '<div>This is Body</div>' };
var Header = { template: '<div>This is Header</div>' };
var Footer = { template: '<div>This is Footer</div>' };
var router = new VueRouter({
  routes: [
    { path: '/',
      components: { 
        // 라우터 name : 객체
        default: Body,
        header: Header,
        footer: Footer
} } ] });
var app = new Vue({router}).$mount('#app');
</script>
```

## script

`.$mount` 메서드에서 라우터 컴포넌트를 Vue 인스턴스에 붙여서 기능을 구현합니다. 앞에서 `el:` 속성과 동일하게 작동 합니다. 

```html
<script>
// 3. Main. Login 컴포넌트 내용 정의
var Main  = { template: '<div>main  페이지</div>' };
var Login = { template: '<div>login 페이지</div>' };

// 4. 개별 url 컴포넌트 등록
var routes = [
  { path: '/main',  component: Main },
  { path: '/login', component: Login }
];

// 5. Vue 라우터 인스턴스 생성
var router = new VueRouter({
  mode: 'history',
  routes
});

// 6. Vue 라우터를 Vue 인스턴스에 등록
var app = new Vue({
  router
}).$mount('#app');
</script>
```

## Nested Router

위에서는 단일 Routing 기능을 제공했다면, 이번에는 2단계 깊이의 라우터링을 `/user/posts`, `/user/profile` 구현하는 방법 입니다.

```html
<div id="app">
  <router-view></router-view>
</div>

<script>
var User = {
  template:  `<div> User Component
                <router-view></router-view>
              </div>`
};
var UserProfile = {template: '<p>Profile 컴포넌트</p>'};
var UserPost = {template: '<p>Post 컴포넌트</p>'};
var routes = [
  { path: '/user',
    component: User,
    children: [
      { path: 'posts', component: UserPost},
      { path: 'profile', component: UserProfile},
    ]
  }
];

var router = new VueRouter({
  routes // 라우터 인스턴스 생성
});

var app = new Vue({
  router // Vue 인스턴스에 라우터 연결
}).$mount('#app');
</script>
```
