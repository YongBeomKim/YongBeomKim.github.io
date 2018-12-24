---
title : Do It Vue.js 입문 요약 하편
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

상편에서는 **Vue 인스턴스 와 컴포넌트** 그리고 전달객체로써 **props, emit 과 on, eventBus**등을 구현하는 방법을 살펴 보았습니다. 이제는 보다 확장된 Router 등을 알아보겠습니다.

# 필수 기술들

## **Vue router**

**기본 Router, Nested Router, Named View** 등의 기술이 있습니다 [참고](http://ict-nroo.tistory.com/90) 간단하게 살펴보면

1. **Router :** url별 다른 객체를 출력
2. **Nested Router :** 컴포넌트 내부 컴포넌트를 조정합니다 
3. **Named View :** 라우터 내부 component 에서 객체 여러개를 활용합니다

> **\<router-view\> \</router-view\>** : 라우터 결과를 출력

router 란 **Single Page Application에서** 사용하는 기법으로 **웹페이지 일부분만 갱신하는** 기법으로 화면의 깜박임 없이 페이지를 변경한다

```html
<div id="app">
  <router-link to="/main">Main 컴포넌트</router-link>
  <router-link to="/login">Login 컴포넌트</router-link>
  <router-view></router-view>
</div>
```

```javascript
// 컴포넌트를 정의
var Main  = {template: '<div>main Page</div>'};
var Login = {template: '<div>login In Page</div>'};
var routes = [  // 라우팅할 url 및 컴포넌트 정의 
    { path: '/main',
      component: Main},
    { path: '/login',
      component: Login} 
    ];

// 라우터 인스턴스
var router = new VueRouter( 
    { mode : 'history',     // URL 초기화 (노출X)
      routes });

// .$mount() : 라우터 인스턴스를 화면에 부착
var app = new Vue({router}).$mount('#app');
```

<br>
## Nested Router

> /name ,/name/profile

**Nested Router** 는 부모-자식 컴포넌트를 같이 활용하는 방법으로, 하위 컴포넌트에서도 `</router-view>`를 활용 가능합니다.  `/user` 라우팅 경로에 덧붙여서 `/user/posts` , `user/profile` 라우팅을 추가로 구현합니다.

```html
<div id="app">
  <router-view></router-view>
</div>
```

```javascript
// Component, template 정의
var User = {
  template: `<div>컴포넌트<router-view></router-view></div>` 
};
var UserProfile = { template: '<p>User Profile Component</p>' };
var UserPost    = { template: '<p>User Post Component</p>' };
// Nested Routing 
//  ./user , /user/posts, /user/profile 
var routes = [
  { path: '/user',                 // /user 컴포넌트
    component: User,  
    children: [ { path: 'posts',   // /user/posts 컴포넌트 
                  component: UserPost },
                { path: 'profile', // /user/profile 컴포넌트
                  component: UserProfile },] } ];  
// Vue Router 정의
var router = new VueRouter({ routes });
// Vue Instance 에 Router 추가
var app = new Vue({ router }).$mount('#app');
```

<br>
## Named View

name 이름을 사용하면 **단일 컴포넌트에 여러 객체 연결을** 제어하기에도 용이하다. 별도의 이름 객체가 없으면 **default, Body** 와 연결한다.

```html
<div id="app">
  <router-view name="header"></router-view>
  <router-view></router-view>
  <router-view name="footer"></router-view>
</div>
```

```javascript
// 컴포넌트 내용 객체
var Body   = {template: '<div>This "Router" is Body</div>'};
var Header = {template: '<div>This "Router" is Header</div>'};
var Footer = {template: '<div>This "Router" is Footer</div>'};

// 단일 Router에서 여러 객체를 활용합니다
var router = new VueRouter({
    routes: [
      { path: '/', 
        components: { default: Body,
                      header: Header,
                      footer: Footer} }]
  })

var app = new Vue({router}).$mount('#app');
```

<br>
# Vue HTTP 통신

## axios, vue-resource [참고](https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html)

> **axios** : ajax 통신을 지원하는 모듈이다 [axios 사용법](https://github.com/axios/axios#axios-api)

<small>참고로 **vue resource 1.3.4** 이전까지는 Ajax 통신을 지원했지만, 최신버젼 부터는 **.get** 을 지원하지 않습니다</small>   

```javascript
// Http Get 요청
axios.get('url주소').then(
  function(){...}).catch(...);
// Http Post 요청
axios.post('url 주소').then(
  function(){...}).catch(...);
// HTTP 에 대한 자세한 속성
axios({
  methods: 'get',
  url: 'url 주소',
})
```

<br>
# Vue Template

## Template

> **render()** 에서는 **JSX** 기반의 문법들을 활용하여 개발을 합니다

1. **v-once :** 데이터가 변경되어도 바꾸지 않는다
2. **v-bind()** 는 **:** 로 요약하여 Vue 객체를 Template에 연결한다 

## \{ \{ \} \}

**{ { } } :** 템플릿 객체를 사용하면 인라인 방식으로 **자바스크립트 표현식을 활용** 가능 합니다

```html
<p>{ { message + '!!!'} }</p>
<p>{ { message.split(''.reverse().join('/')) } }</p>
```

자바스크립트를 내부에 구현하는 경우 var 선언문, if 분기문 은 불가능 하지만, **삼항연산자 `{ { true ? 100 : 0 } }`** 는 사용 가능합니다
{: .notice--info}

<br>
## **Directive**

Vue 에서 **Directive** 는 **v-** 가 붙는 Template 속성들을 통칭합니다

| 디렉티브 |  역활                        |
|:--------:|:----------------------------:|
| **v-if**     | boolean 판단                 |
| **v-for**    | 배열객체를 활용              |
| **v-show**   | 객체를 활용                  |
| **v-bind**   | Html 속성과 Vue 데이터 연결  |
| **v-on**     | 이벤트를 감지하여 처리       |
| **v-model**  | form 등에서 Vue 인스턴스 동기화 |  

## Vue 인스턴스 메서드

1. **el :** 템플릿 부착위치
2. **template :** Vue 인스턴스 템플릿 내용
3. **methods :** 함수로써 화면제어
4. **computed :** 함수로써 캐시로 화면제어 (내장 API)
5. **watch :** 함수로써 캐시로 화면제어 (복잡한 비동기)
