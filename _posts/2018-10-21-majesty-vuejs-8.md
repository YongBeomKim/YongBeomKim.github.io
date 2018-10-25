---
title : 쉽게 배우는 Vue.js - 8장 (이벤트)
last_modified_at: 2018-10-21T10:45:06-05:00
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

1. **$on(event) :** 이벤트 청취
2. **$emit(event) :** 이벤트 발생
3. **$once(event) :** 이벤트를 (한번 만) 청취한다
4. **$off(event) :** 이벤트 리스너를 제거한다


<br>
# Chapter 8 : 사용자 정의 이벤트

## 이벤트 발생과 청취

```html
<div>
  <p style="font-size: 140px;">
    { { votes } }
  </p>
  <button @click="vote">Vote</button>
</div>

<script src="./js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '.container',
    data: { votes: 0 },
    methods: {
      vote: function(writer) {
        this.$emit('voted') },
    },
    created() {
      this.$on('voted', function(button) {
        this.votes++ })
    }
  })
</script>
```