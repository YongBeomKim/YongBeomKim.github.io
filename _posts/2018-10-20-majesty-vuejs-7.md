---
title : 쉽고 빠르게 배우는 Vue.js - 7장 (컴포넌트)
last_modified_at: 2018-10-20T10:45:06-05:00
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

배열 항목의 필터링/ 정렬, 사용자 정의 필터, 유틸리티 라이브러리 활용 

<br>
# Chapter 7 : 컴포넌트

> **Vue.component()**

`<story>` 사용자 Tag를 생성 추가 합니다

```html
<div>
  <story></story>
</div>
<script src="./js/vue.js"></script>
<script type="text/javascript">
  Vue.component('story', {
    template: '<h1>My horse is amazing!</h1>'
  });
  new Vue({
    el: '.container'
  })
</script>
```

**Tag 이름 :** 사용자가 원하는 이름을 정하면 되지만, HTML5의 고유한 태그와 충돌하지 않도록 주의해야 한다
{: .notice--info}

 