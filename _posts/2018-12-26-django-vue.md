---
title : Django / vue 복습 및 Django
last_modified_at: 2018-12-12T10:45:06-05:00
header:
  overlay_image: /assets/images/book/django-sample.jpg
categories:
  - chart
tags: 
    - django
    - apex
    - vue
toc: true 
---

`{ { } }` 객체표시는 django 에서도 중괄호를 사용하고, Vue.js 에서도 같은 객체표현 방식을 사용합니다. 이를 파하기 위해서는 각 Tag별 id를 구분하여 두가지 문법이 한곳에서 중복 사용되지 않도록 이름을 다르게 하는 등을 유의해야 합니다.

```html
<div id='app'><h2>{ { message } }</h2></div>
```
```javascript
var data = {
  message: '인사 메세지 입니다'
}
new Vue({
  el: '#app',
  data: data
})
```

```javascript
new Vue({
  el: #app,
  data: {
    message : '인사 메세지 입니다'
  }
});
```

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/vue_life.png">
  <figcaption>vue의 Life Cycle</figcaption>
</figure> 




