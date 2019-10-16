---
title : Vue.js 객체 기본개념
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

Vue.js 와 관련된 도서들이 많이 나오고 있습니다. 한국어 유투브 중에도 **[맨땅에 헤딩하기](https://www.youtube.com/channel/UCZ6yPRDNz9bNWySjAv8kUng/playlists)** 처럼 vue 에 특화되어 전문화된 내용 까지 다루고 있습니다.

이번 시간에는 **Vue.js 이정도는 알아야지** 도서의 내용을 바탕으로 vue.js 의 내용들을 정리해 보는 시간을 갖도록 하겠습니다.

<br>

# Vue-cli 설치

**vue.js** 는 **90kb** 밖에 안될 정도로 작다. 이를 **vue.template** 파일로 분리 작업이 가능하도록 **vue-cli** 를 설치하려고 하였고, 생각보다 복잡하게 설치 및 제거과정을 갖게 되었습니다. <strike> 몰라서 그런건 아니고?? </strike>

설치를 하기 전에 우선, 삭제방법에 대해 알아보도록 하겠습니다.

```r
$ sudo npm uninstall @vue/cli -g
```

<br/>
# **Vue 인스턴스**

Jquery 객체와 같이, **Vue.js 에 의해 특정된 DOM 오브젝트** 를 의미하는 것으로 **Vue 오브젝트 한개** 를 의미합니다. 이는 **템플릿 랜더링, 데이터바인딩, 컴포넌트** 등의 동작을 지원합니다.

## Data 와 Methods (인스턴스 속성 값)

사용자에게 보여주는 데이터를 **문자, 숫자, 배열, 객체** 등 JavaScript 에서 지원가능한 모든 내용이 활용 가능합니다. 인스턴스에서 정의된 데이터는 **Mastache** 기호인 `{ { messages } }` 방법으로 템플릿과 연결 합니다.

```javascript
new Vue({ 
  el: '#id .class셀렉터',
  data: {
    messages: '문자데이터',
    price: 10000,
    list: ['배열','one','two'],
    object: { name:'객체', price:100, item:'apple'},
  },
  methods: {
    showAlert: function() {alert('메세지 출력!!');}
  },
  computed: {
    showAlert: function() {alert('메세지 출력!!');}
  },
  filters: {
    number: function(value) {
      return new Intl.NumberFormat().format(value);
    }
  }
});
```

## 속성값의 계산

Vue 객체의 연산결과값을 출력하는 경우에는 **methods, computed** 메서드를 활용합니다.

{% raw %}
```html
<div id="app">{{ reverseMsg() }}</div>
<script>
new Vue({
  el: "#app",
  data: { message: "문자열 테스트" },
  methods: {
    reverseMsg: function() {
      return this.message.split('').reverse().join('')
    }
  }
});
```
{% endraw %}

**computed** 를 사용하는 경우 거의 동일하고 템플릿에서 **Mastache** 에서 바인딩 할 때, 함수형이 아닌 **데이터 형태** 로 사용 합니다.

{% raw %}
```html
<div id="app">{{ reverseMsg }}</div>
<script>
new Vue({
  el: "#app",
  data: { message: "문자열 테스트" },
  computed  : {
    reverseMsg: function() {
      return this.message.split('').reverse().join('')
    }
  }
});
```
{% endraw %}

## 감시된 속성

**Vue 인스턴스** 에서는 **변경된 시점을 감시하여 메서드를 호출** 하는 기능을 제공 합니다. **Vue 생명주기** 와 차이점으로는 생명주기는 **Vue 인스턴스 이벤트를 Hooking** 한다면, **감시된 속성** 은 **Vue 인스턴스의 데이터 변경을 Hooking** 합니다. 

<br/>
# 템플릿 문법 과 데이터 바인딩

HTML, CSS3, JavaScript 이외에도 사용자가 Vue.js 에서 지원하는 템플릿 문법들은 **DOM 엘리먼트** 속성을 추가하는 **Directive** 를 활용할 수 있습니다. **데이터 바인딩** 은 **Vue 인스턴스 데이터를 템플릿과 연결** 하는 작업으로 **Mustache, v-text, v-html, v-bind** 4가지 방법을 활용 합니다.

## Mastache 

`{ { expression } }` 으로 **Vue.js** 함수의 **data:** 메서드 데이터를 활용하여 **템플릿은 컴파일** 하며 **데이터값을 바인딩** 합니다.

{% raw %}
```html
<div id="app">{{ expression }}</div>
```
{% endraw %}

## v-text

html 태그의 속성에 위치하면서 **Mastache** 와 동일한 기능을 구현합니다. 하지만 유지보수 및 작업의 용이성 등에서 **Mastache** 가 더 간결하게 구현이 가능합니다.

```html
<div id="app" v-text="expression"></div>
```

## v-html

**v-text** 는 **템플릿 텍스트** 를 조작한다면, **v-html** 은 **HTML 문자열** 을 바인딩 합니다. **v-text** 와 **v-html** 의 차이는 **JQuery** 의  `$('#div1').text()` 와 `$('#div1').html();` 로 생각하면 됩니다.

## v-bind

**태그에 Vue.js 데이터를 직접 바인딩** 하는 문법 입니다. 이는 단순한 값이 아닌 **for 반복문, 이벤트핸들러** 등 유동적인 객체에 대응하는 Directive 로써 **변동성이 큰 값을 템플릿에 활용** 용도로 사용 합니다.

<br/>
# 템플릿 조건문

조작한 내용을 **조건에 따라 보여주거나 숨기는 경우** 에는, **vue.js 조건문을 활용** 하면 보다 간결한 작업이 가능합니다.

## v-if, v-else, v-else-if

해당 template 에서 **v-if** 값이 **true** 인 경우에만 내용을 실행 합니다. 기타 다른 조건값에 대해선 **v-else ,v-else-if** 를 같은 가족관계에서 활용하면 다양한 경우의 수를 처리 가능합니다.

```html
<div id="app">
  <span v-if="test == 'A'">A 입니다</span>
  <span v-else-if="text == 'B'">B 입니다</span>
  <span v-else> 나머지 입니다 </span>
</div>
```

## template 단위의 v-if

**template** 에서 **v-if** 조건문을 활용하면 여러개 **element 들을 묶어서 한꺼번에** 조건에 따른 다양한 결과값 출력이 가능합니다.

```html
<template v-if="soldOut">
  <h1>품절</h1>
  <button>대기</button>
</template>
<template v-else>
  <p>10,000원</p>
  <button>구매하기</button>
</template>
```

## v-show 

**값이 true** 인 경우에 관련된 내용을 보여주는 **v-show** 가 있습니다. **Ajax** 처럼 계속적인 랜더링이 필요한 경우에 적합한 Directive 로써 **template 구문 미지원, v-else 미지원** 등 용도에 따른 구분이 필요 합니다.

<br/>
# 템플릿 반복문

반복적인 element 를 랜더링 하는 용도로 활용 됩니다.

## v-for

반복적인 엘리먼트를 랜더링 할 때 활용합니다. Python 의 range() 함수를 활용하는 방법과 유사하게 Vue 인스턴스만 생성한 뒤 활용 가능합니다.

## v-for 와 범위내 반복

{% raw %}
```html
<li v-for="index in 100">
  {{ index }}
</li>
```
{% endraw %}

## v-for 와 list 배열

{% raw %}
```html
<li v-for="num in numbers">{{ num }}</li>
<script>
new Vue({
  el: '#app',
  data: { numbers: [1, 1, 2, 3, 5]} });
</script>
```
{% endraw %}

## v-for 와 list 배열 인덱스

{% raw %}        
```html
<li v-for="(num, index) in numbers">
    {{ index }} : {{ num }}</li>
<script>
new Vue({
  el: '#app',
  data: { numbers: [1, 1, 2, 3, 5]} });
</script>
```
{% endraw %}

## v-for 와 Object

{% raw %}        
```html
<li v-for="item in object">
  {{ item }} </li>             <!-- Value 출력 -->
<li v-for="(item, key) in object">
  {{ key }} : {{ item }} </li> <!-- Key, Value 출력 -->
<script>
new Vue({
  el: '#app',
  data: {
    object: {
      firstName: 'Lee',
      lastName: 'Sun-Hyoup',
      age: 24
    }
  }
});
</script>
```
{% endraw %}

## v-for 와 v-if

같은 엘리먼트에 두개가 존재하는 경우 **v-for** 를 먼저 실행하고, 반복시 마다 **v-if** 내용을 실행합니다.

<br/>
# 이벤트

Vue.js 는 사용자가 쉽게 **이벤트를 핸들링 할 수 있는 디렉티브를** 제공합니다. 

## v-on

템플릿에서 **click** 이벤트에 대응하는 **counter += 1** 수식을 **inline 방식으로** 응용이 가능합니다. 템플릿에서 **v-on:** 내용은 **@** 축약형으로 바로 활용 가능합니다.

{% raw %}
```html
<div id="app">
  <p>Counter: {{ counter }}</p>
  <button v-on:click = "counter += 1">클릭</button>
  <button @click = "counter += 1">클릭</button>
</div>

<script>
new Vue({
  el: '#app',
  data: { counter: 0 }
});
</script>
```
{% endraw %}

## 이벤트 수식어

템플릿 Vue Directive 에서  이벤트 대상의 특정과 함께 **핸들링에 지원되는 여러 수식어들을** 제공 합니다. 이러한 수식어들은 ChinMedhod 로 적용이 가능합니다.

1. **.capture :** 캡쳐링 페이즈로 적용되는 수식어 입니다.
2. **.stop :** 이벤트가 전파되지 않도록 막는 수식어 입니다.
3. **.self :** 이벤트 근원지가 해당 엘리먼트일 때 핸들러를 호출 합니다.
4. **.prevent :** 브라우저의 기본 액션을 금지하는 수식어 입니다.
5. **.once :** 특정 이벤트 핸들러를 한 번만 실행 합니다

```html
<div id="app">
  <a href="https://" @click.once.prevent="showAlert">click</a>
</div>
```

## 키 수식어 v-on:keydown

사용자 이벤트 이외에 **사용자의 특정키에 대한 제한 및 편의기능** 을 제공합니다. 아래의 예제는 **입력 폼** 에서 **Backspace** 와 **Delete** 키의 입력을 막는 예제 입니다.

```html
<input type="text" @keydown="preventKey">

<script>
new Vue({
  el: '#app',
  methods: {
    preventKey: function () {
      if(event.keyCode == 8 || event.keyCode == 46)
        event.preventDefault();
    },
  }
});
</script>
```

위의 예처럼 **keyCode** 번호를 활용할 수도 있지만 유지보수에 어려움이 있어서 단축된 수식어를 inline으로 활용 가능합니다.

지원되는 **Key 이름 메서드** 로는 **.enter, .tab, .delete(백스페이스+딜리트키), .esc, .space, .up, .down, .left, .right** 등 대략 10개의 종류를 지원 합니다

```html
<input type="text" @keydown.delete="preventKey">
```

## 마우스 수식어

vue.js 2.2 이상에서 제공되는 핸들러로 **.left .right .middle** 에 대응하여 실행되는 핸들러 입니다.

<br/>
# 모델

기본적으로 **data** 는 **단방향 바인딩** 입니다. 보다 다양한 기능을 구현하기 위한 **양방향 바인딩** 방법을 vue.js 에서 제공하는데 **v-model** 을 활용하면 됩니다.

## v-model

**v-model** 은 **폼과 데이터를 바인딩** 하는 디렉티브 입니다. 아래의 예제와 같이 다양한 **Form** 타입에 적용 합니다. 단 주의할 점으로는 v-model 을 사용하는 경우 element 에 **초기에 정의된 값이 무시** 되고 **form, template 의 데이터가 우선** 합니다. 그래도 값만 무시될 뿐 **데이터 Type 은 유지되므로** 초기값으로 **데이터 Type** 을 정의 하는 용도로써 활용도는 유지 됩니다.

```html
<textarea v-model="textMessage"></textarea>
<p>{{ textareaMessage }}</p>

<script>
new Vue({
  el: '#app',
  data: { textMessage: 'Hello,\nVue!'}
});
</script>
```

라디오 버튼을 활용하는 예제는 다음과 같습니다.

```html
<input type="radio" id="male" v-model="gender" value="male">
<label for="male">남자</label> <!-- gender : male -->

<input type="radio" id="female" v-model="gender" value="female">
<label for="female">여자</label> <!-- gender : female -->
<span>선택: {{ gender }}</span>

<script>
new Vue({
  el: '#app',
  data: { gender: '' },
});
</script>
```

**list** 객체로 초기값을 정의하면 **checkbox 데이터들이** 누적되어 저장 됩니다.

{% raw %}
```html
<input type="checkbox" id="chk1" v-model="checked" value="맥북 15">
<label for="check1">맥북 15</label>
<input type="checkbox" id="chk2" v-model="checked" value="침대">
<label for="check2">침대</label>
<span>장바구니: {{ checked }}</span>

<script>
new Vue({
  el: '#app',
  data: { checked: [] }
});
</script>
```
{% endraw %}

checkbox 를 구현하는 예제는 다음과 같습니다.

{% raw %}
```html
<input type="checkbox" v-model="checkboxModel" 
  v-bind:true-value="trueValue" 
  v-bind:false-value="falseValue">
{{ checkboxModel }}

<script>
new Vue({
  el: '#app',
  data: {
    checkboxModel: 'hello',
    trueValue: 'hello',
    falseValue: 'world'
  }
});
</script>
```
{% endraw %}

Radio 버튼을 활용하는 예제는 다음과 같습니다.

{% raw %}
```html
<input type="radio" v-model="Meal" v-bind:value="foods[0]">
<input type="radio" v-model="Meal" v-bind:value="foods[1]">
<input type="radio" v-model="Meal" v-bind:value="foods[2]">
{{ Meal }}

<script>
new Vue({
  el: '#app',
  data: {
    Meal: 'Hambergur',        // 템플릭 출력시 초기값 설정
    foods: ['Ramen','Hamburger','chicken'], // 데이터 List
  }
});
</script>
```
{% endraw %}

처음 헷갈리던 부분이 왜 **data** 에서 **Meal, foods** 왜 2개를 사용해야 하는가? 였습니다. 이유를 간단하게 정리해 보면 1. **v-bind** 로 연결되는 **데이터 목록변수** 와 2. **v-model** 에 연결되는 **서버와 통신하는 변수** 2개가 필요해서 입니다.
{: .notice--info}

다음은 **select** 버튼을 활용하는 예제 입니다.

{% raw %}
```html
<select v-model="selectModel">
<option v-for="artist in artists" 
  v-bind:value="artist">{{ artist }}</option>
</select>
{{ selectModel }}

<script>
new Vue({
  el: '#app',
  data: {
    selectModel:'Sarah McLachlan',
    artists:["Sarah McLachlan","Coldplay","Tori Kelly"]
 }
});
</script>
```
{% endraw %}

지금까지 다양한 데이터 활용법을 알아보았다면, 마지막으로 **v-model** 에 활용하는 수식어 내용을 정리해 보겠습니다. 

수식어 중 **.lazy** 는 key 작업에 따른 변화가 아닌 객체내용이 모두 변경된 뒤 실행 됩니다. 보다 안정적인 서버전송이 가능합니다.

**.trim** 은 **String** 데이터의 앞뒤 공백들을 제거 합니다. 단 **초기값** 에 대해서는 해당 내용이 적용되지 않습니다.

마지막으로 **.number** 메서드는 숫자객체들을 모두 **float, integer** 로 변경을 합니다. 모든 내용이 변경되진 않고, 객체 처음부터 숫자로 변경 가능한 부분에 대해서만 결과값을 출력 합니다.

<br/>
# Filter 필터

**일반 텍스트를 특별한 규칙에 따라 서식화** 할 때 유용합니다. 예를들면 숫자를 **thousand Comma** 등의 표현으로 출력하는 경우에 활용 가능합니다.

{% raw %}
```html
<p>필터 미적용: {{ price }}</p>
<p>필터 적용: {{ price | number }}</p>

<script>
new Vue({
  el: '#app',
  data: { price: 24380 },
  filters: {
    number: function (value) {
      return new Intl.NumberFormat().format(value);
    }
  }
});
</script>
```
{% endraw %}

Django 등에서도 Filter 를 지원 합니다. 하지만 이를 적용하면 **Server** 부담이 늘고 로딩에도 부하요인이 되는만큼, **Server 는 가장 일반적인 포맷으로 데이터를 가공 및 출력** 하고 **용도별 다양한 출력형식은 JavaScript 등의 프론트 엔진** 으로 이원화 시켜서 작업을 진행 합니다.
{: .notice--info}

주의할 점으로는 **| 필터** 의 내용은 **v-bind** 또는 **{ { } }** 에서만 적용되므로, 다른 대상에서 적용을 할 때에는 별도의 **계산된 속성** 의 내용을 활용 합니다.
