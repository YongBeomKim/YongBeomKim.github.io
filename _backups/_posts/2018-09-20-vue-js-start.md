---
title : Vue.js 튜토리얼 - 유투브
last_modified_at: 2018-09-20T10:45:06-05:00
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

PWA 기반의 Single Page App을 제작하는 라이브러리로 **Component, Router, Resource, Templace** 구성요소를 갖는다

<figure class="align-center">
  <img src="https://012.vuejs.org/images/mvvm.png" alt="">
  <figcaption>Vue.Js 의 MVVM 구조도</figcaption>
</figure> 

**Vue.js** 의 **View Model** 에서 **리스너, 모델, 데이터바인딩**  을 거침으로써 웹페이지를 **React** 하게 구현한다
{: .notice--info}

Vue.Js 의 특징을 나열해 보자면
1. **2 way data bindings** 을 angular와 동일하게 지원한다 
2. 화면 단위를 **컴포넌트** 형태로 제공하여, 관련 내장API를 활용
3. **컴포넌트간 통신** 은 React의 **1 way Data Flow(부모-> 자식)과 유사
4. **Virtual DOM**을 이용한 Rendering은 React와 유사
5. 다른 Front End Frame Work에 비해 쉽게 점근가능 (Jquery와 유사)


<br>
# Vue Instance

## Vue Instance (Vue 생성자) 개념

```javascript
// vm 은 View Model로, 코딩 컨벤션 객체
var vm = new Vue({
  //... options
})
```

Vue 라이브러리를 로딩한 후, `new Vue()` 객체를 생성하면 **화면제어 옵션(데이터, 속성, 메서드 등등) 단위객체** 로 자동인식되어, 제어가 가능
{: .notice--info}


## Vue Instance의 OPTIONs

```javascript
var vm = new Vue({
  temlplate : // 화면에 출력하는 Tag와 Data를 연결
  el :        // element (화면이 그려지는 시작점)
  methods: {
    // click http 등 동적 methods 를 정의
  },
  created: {
    // life cycle Hock
  }
})
```

vue 인스턴스에는 data, template, el, methods, life cycle callback 등의 다양한 options 들을 포함할 수 있다.
{: .notice--info}


## Vue Instance의 확장

```javascript
// 미리 정의한 Vue 객체를 확장하여 재사용
var MyComponent = Vue.extend({
  template : '<p>Hello {{ message }}</p>',
  data : {
    message : 'vue'
  }
})

var MyComponentInstance = new MyComponent()
```

하지만 template에서 **custom element**를 작성하는 방법을 더 권장
{: .notice--info}



## Vue Instance 라이프싸이클 초기화

Vue 객체가 Create, Read, Update, Delete 될 때
1. 데이터 관찰
2. 템플릿 컴파일 (Vue => Html로 연결)
3. DOM 객체 연결 (Vue.js 특징을 갖는 DOM => Reactive 연결)
4. 데이터 변경시 DOM 업데이트
5. 초기화 메서드 **mounted, updated, destroyed**를 제공하여 별도 Controller를 갖지 않는다.

```javascript
var vm = new Vue({
  data: {
    a:1
  },
  created: function(){
    console.log('a is:' + this.a)
  }
})
```
개발자가 의도하는 **Custom Logic**을 추가할 수 있다
{: .notice--info}

