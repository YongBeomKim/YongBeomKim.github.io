---
title : 쉽고 빠르게 배우는 Vue.js - 5장 (상호작용)
last_modified_at: 2018-10-13T10:45:06-05:00
header:
  overlay_image: /assets/images/book/vue_logo.jpeg
categories:
  - vue
tags: 
    - vue 
    - javascript
toc: true 
---

<figure class="align-center">
  <img src="https://css-tricks.com/wp-content/uploads/2018/04/v-for_3.png" alt="">
</figure> 

# Introduction

1. 객체가 아닌 **사용자의 Event**에 따라 결과를 변화한다
2. 


<br>
# Chapter 5 : 상화작용 (Event Handling)

> **v-on** : **click** = "upvote"

> **@click** = "upvote"

Vue 디렉티브(directive) 인 **v-on**을 쓰면 내용은 명확하겠지만, 뒤에 이벤트명, 적용함수 등 이어붙는 내용이 많아짐에 따라 축약형인 **@**로 대체가 가능하다 (위 아래의 문법은 모두 동일한 결과를 출력한다)

```html
<button v-on:click="upvote">
    Upvote 카운트 : { { upvotes } }
</button>

<script type="text/javascript" src="./js/vue.js"></script>
<script type="text/javascript">
new Vue({
    el: '.container',
    data: { upvotes: 0 },
    methods: {
        upvote: function () { this.upvotes++; }
    }
})
</script>
```