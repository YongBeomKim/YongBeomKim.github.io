---
title : Vue.js form 다루기
last_modified_at: 2018-11-17T10:45:06-05:00
header:
  overlay_image: /assets/images/book/vue_logo.jpeg
categories:
  - vue
tags: 
    - vue
    - html5
toc: true 
---

Vue 에서 **HTML5**의 **form 객체를** 다루는 방법을 익힙니다.[원본보기](https://logrocket.com/blog/an-imperative-guide-to-forms-in-vue-js-2/) 예제가 간단하고 소스코드도 정리가 잘 되어 있어서 해당 페이지를 정리하면서 많은 부분을 익힐 수 있었습니다. [CodePen](https://codepen.io/olayinkaos/pen/GMmpPm)

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/photo/vueform.png">
  <figcaption>An imperative guide to forms in Vue.js</figcaption>
</figure> 

<br/>
# **Vue 인스턴스**

```javascript
Vue.use(VeeValidate);

VeeValidate.Validator.extend("polite", {
  getMessage: field => `You need to be polite in the ${field} field`,
  validate: value => value.toLowerCase().indexOf("please") !== -1
});

new Vue({
  el: '#app',
  data: {
    options: {
      inquiry: [
        { value: 'feature', text: "Feature Request"},
        { value: 'bug', text: "Bug Report"},
        { value: 'support', text: "Support"} ]
    },
    form : {
      name: '',
      message: '',
      inquiry_type: '', // single select box value
      logrocket_usecases: [],
      terms: false,  // Checkbox 의 true/false 출력
      concepts: [],  // multiple checkbox values
      js_awesome: '' // radio input value
    },}
});
```

<br/>
# Template

## **1 기본 템플릿**

```html
<body>
  <div class="columns" id="app">
    <div class="column is-two-thirds">
      <section class="section">
        <h1 class="title">Fun with Forms in Vue 2.0</h1>
        <section class="form"></section>
      </section>
    </div>
  </div>

  <!-- Vue의 form 객체가 몇개든 반복출력-->
  <div class="column">
    <section class="section" id="results">
      <div class="box">
        <ul><li v-for="(item, k) in form">
          <strong>{ {k} }:</strong>{ {item} }
      </li></ul></div>
    </section>
  </div>
</body>
```

## **2 Text**

```html
<section class="form">
  <div> <label>Name</label>
    <div class="control">
      <input v-model="form.name" class="input" 
        type="text" placeholder="Text input">
    </div>
  </div>
</section>
```
```javascript
new Vue({
  el: '#app',
  data: { 
    form : { 
        name: '' 
        } 
    }
})
```

## **3 Textarea**

**`form.message`** 메세지 입력창을 추가합니다

```html
<div class="field">
  <label class="label">Message</label>
  <div class="control">
    <textarea class="textarea" placeholder="Message" 
    v-model="form.message"></textarea>
  </div>
</div>
```
```javascript
data: {
  form : {
    message: '' // textarea value
  }
}
```

## **4 Select**

**ComboBOX** 를 구현합니다

> `\<select multiple v-model="form.logrocket_usecases"\>`

HTML5의 내용으로 위의 코드에서 **multiple**을 포함하는지 여부에 따라서 comboBox, LineBox를 구분합니다.[select 버튼](https://www.w3schools.com/tags/att_select_multiple.asp)

```html
<div class="field">
<label></label>
<div class="control">
<div class="select">
  <select multiple v-model="form.logrocket_usecases">
  <select v-model="form.inquiry_type">
    <option disabled value="">선택내용 없음</option>
    <option v-for="option in options.inquiry" 
        v-bind:value="option.value">{ {option.text} }
    </option>
  </select>
</div></div></div>
```
```javascript
data: {
  form : {...
  },
  options: {
    inquiry: [
      { value: 'feature', text: "Feature Request"},
      { value: 'bug', text: "Bug Report"},
      { value: 'support', text: "Support"} ]
  }
}
```

## **5-1 Checkbox 01**

true / false 선택객체 활용하기

```html
<div class="control">
  <label class="checkbox">
    <input type="checkbox" v-model="form.terms">
    I agree to the <a href="#">terms and conditions</a>
  </label>
</div>
```
```javascript
data: {
  form : {
    terms: false, // 1개 체크박스
  }, 
}
```

## **5-2 Checkbox 02**

**v-model** 로 **비어있는 array를** 활용한 다중선택

```html
<div class="field"> 
  <div class="control">
    <label class="checkbox">
      <input type="checkbox" v-model="form.concepts"
        value="promises"> Promises </label> 
    <label class="checkbox">
      <input type="checkbox" v-model="form.concepts" 
        value="testing"> Testing </label>
  </div>
</div>
```

```javascript
data: {
  form : {
    concepts: [], // multiple checkbox values
  }, 
}
```

## **5-3 Checkbox 03 : Radio Button**

빈 객체에 1개 값만 채울 때 사용한다 

```html
<label class="radio">
  <input v-model="form.js_awesome" 
    type="radio" value="Yes">Yes
</label>
<label class="radio">
  <input v-model="form.js_awesome" 
     type="radio" value="Yeap!">Yeap!
</label>
```

```javascript
data: {
  form : {
    js_awesome: '' // radio input value
  }, 
}
```

<br>
# Validating user inputs

## **vee-validate**

```javascript
Vue.use(VeeValidate);

VeeValidate.Validator.extend("polite", {
  getMessage: field => `You need to be polite in the ${field} field`,
  validate: value => value.toLowerCase().indexOf("please") !== -1
});
```

**VeeValidate** 는 검증을 위한 모듈로써, Vue 인스턴스 생성코드에 앞서서 먼저 활성화 해야 합니다.

```html
<div class="field is-grouped">
  <div class="control">
    <button v-bind:disabled="errors.any()" 
     class="button is-primary">Submit</button>
  </div>
</div>
```

<br>
## **v-validate**

템플릿 내부에 in-line 방식으로 필수내용을 추가한다 

```html
<input name="name" v-validate="'required|min:3'">

<textarea 
  v-bind:class="{'is-danger': errors.has('message')}"
  v-validate="'required|polite'">
</textarea>
```
