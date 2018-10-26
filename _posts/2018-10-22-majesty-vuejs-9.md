---
title : 쉽게 배우는 Vue.js - 9장 (바인딩)
last_modified_at: 2018-10-22T10:45:06-05:00
header:
  overlay_image: /assets/images/book/vue_logo.jpeg
categories:
  - vue
tags: 
    - vue 
    - javascript
toc: true 
---


# Introduction

{: .notice--info}




<br>
# Chapter 9 : 클래스와 스타일 바인딩

## 클래스 객체를 조작하는 방법

> **!**

**color** 와 **!color** 객체를 받을 때, **this.color, !this.color** 와 같이 객체를 boolean 형식으로 구분하여 적용 가능하다.  

```html
<div>
  <div class="box" 
       v-bind:class="{'red':color, 'blue':!color }"></div>
  <button v-on:click="flipColor">컬러변경</button>
</div>

<script src="./js/vue.js"></script>
<script type="text/javascript">
new Vue({
  el: '.container',
  data: { color: true },
  methods: {
    flipColor: function() {
      this.color = !this.color;}
  }
});
</script>

<style type="text/css">
.red {background: #ff0000;}
.blue {background: #0000ff;}
.green {background: #4CAF50;}
.purple {background: #7B1FA2;}
.box {
  float: left;  width: 200px; height: 200px;
  margin: 40px; border: 1px solid rgba(0, 0, 0, .2);
}
</style>
```

