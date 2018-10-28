---
title : 쉽게 배우는 Vue.js - 11장 (실제 데이터 활용)
last_modified_at: 2018-10-24T10:45:06-05:00
header:
  overlay_image: /assets/images/book/vue_logo.jpeg
categories:
  - vue
tags: 
    - vue
    - api
    - javascript
toc: true 
---


# Introduction

**vue-resource** 모듈과 **Jquery**를 사용하여 **Create, Read, Update, Delete** 내용을 간단하게 살펴봅니다.

<br>
# Chapter 11 : Jquery를 활용하여 외부 데이터 불러오기

```html
<script type="text/javascript" src="./js/vue.js"></script>
<script type="text/javascript">
new Vue({
  el: '.container',
  data: {
    stories: [
      { body: "I crashed my car today!", writer: "Alex"},
      { body: "Yesterday, someone stole my bag!", writer: "John"},
    query: ' '
  },
</script>
```

위에서 적용 된 **data** 를 외부에서 불러옵니다.

1. **vue-resource**
2. **jquery** 


## API 데이터 추출시 Jquery 활용

$.get 을 활용하는 방법 [Web](https://api.jquery.com/jquery.get/)

```php
$.get(
    url, 
    success 
);

$.ajax({
    url: https://github.com,
    success : 
});
```

### Read : Vue Instance 에서의 Jquery 활용

주의할 점은 **Vue Instance** 생성 뒤 **mounted()** Hook을 사용하여 data를 불러와야 한다 (vue instance 의 Life Cycle 참고)

```html
<script type="text/javascript">
  Vue.component('story', {
    template: "#template-story-raw",
    props: ['story'],
  });

  var vm= new Vue({
    el: '#app',
    data: {
      stories: []
    },
    mounted: function(){
      $.get('/api/stories', function(data){
        vm.stories = data; })
    }
  })
</script>
```

**this.stories** 를 활용하지 않고, **vm.stories**를 활용하여 콜백 안에서 this 가 바인딩 되지 않는 특징을 **vm** 변수를 활용하여 극복합니다


## Update : 코드 재설계 Code refactoring 및 데이터 갱신

api 에서 가져온 데이터에, **사용자 event** 인 button 으로 추가되는 data를 **update** 합니다 

```javascript
Vue.component('story', {
    template: '#template-story-raw',
    props: ['story'],
    methods: {
        upvoteStory: function(story){
            story.upvotes++;
            $.ajax({
                url: 'api/stories/' + story.id,
                type: 'PATCH',
                data: story, });
        }
    },
})
```

## Delete : 데이터 제거

아래의 코드는 일시적으로 삭제할 뿐 DB를 수정하지 않는다

```javascript
Vue.component('story', {
    methods: {
        deleteStory: function(story){
            // story 찾기
            var index = vm.stories.indexOf(story);
            // 삭제
            vm.stories.splice(index, 1) }
    }
})
```

Ajax Delete 를 사용하여 실제 DataBase의 삭제를 요청합니다

```javascript
Vue.component('story', {
    methods: {
        deleteStory: function(story){
            // story 찾기
            var index = vm.stories.indexOf(story);
            // 삭제
            vm.stories.splice(index, 1)
            // Delete 요청
            $.ajax({
                url: 'api/strories/' + story.id,
                type: 'DELETE' });
        },
    }
})
```