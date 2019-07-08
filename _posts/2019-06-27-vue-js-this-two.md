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
# 컴포넌트

## 전역 컴포넌트

`Vue.component()` 를 사용하면 해당 컴포넌트를 전역으로 활용할 수 있습니다. 이를 활용하면 공통적인 로직이나 템플릿을 재활용 하기에 용이합니다.

전역 컴포넌트를 생성시 주의할 점으로는 **Vue.component()** 에서 **data** 를 정의할 때에는 **반드시 함수를 사용하여** 정의를 해야 합니다. 

{% raw %}
```html
<div id="app">
  <date></date> <date></date> <date></date>
</div>
<script>
var dateComponent = {
  template: '<div>{{ now }}</div>',
  data: function () {
    return { now: new Date() }
  }
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
```html
<div id="app">
  <count></count> <count></count> <count></count>
</div>
<script>
Vue.component('count', {
  template: '<button @click="counter += 1">{{ counter }}</button>',
  data: function () { return { counter: 0 } }
});
new Vue({
  el: '#app'
});
</script>
```
{% endraw %}



<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/book/holigrail.gif">
</figure>