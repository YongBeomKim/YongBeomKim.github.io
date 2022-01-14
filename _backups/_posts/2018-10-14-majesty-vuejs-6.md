---
title : 쉽게 배우는 Vue.js - 6장 (필터)
last_modified_at: 2018-10-14T10:45:06-05:00
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

배열 항목의 필터링/ 정렬, 사용자 정의 필터, 유틸리티 라이브러리 활용으로써, 1) 앞에서 실습한 **render(), Computed** 를 활용한 배열객체 정렬, 2) **lodash** 모듈을 활용하여 다양한 설정을 적용하는 방법을 익혀봅니다


<br>
# Chapter 6 : 필터 

## filter(조건문) 

조건문에 True 인 객체들만 추출하여 **결과 객체** 를 생성합니다

```html
<h3>Alex's 의 이야기들</h3>
<ul>
    <li v-for="(story, index) in storiesBy('Alex')" :key="index">
      { { story.writer } } 의 제목은 "{ { story.plot } }" </li>
</ul>

<script src="./js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '.container',
    data: {
      stories: [{
          plot: "I ate someone's chocolate!",
          writer: "Alex"},]
    },
    methods: {
      storiesBy: function(writer) {
        return this.stories.filter(function(st) {
          return st.writer === writer })
      },
    }
  })
</script>
```
**storiesBy()** 인 methods 함수를 활용하여, 배열 Data 중 조건에 True 인 객체들을 별도의 배열로 생성, 출력합니다.
{: .notice--info}


## includes()

include() 는 Javascript 기본 함수로써, 문자열 중간에 포함된 내용을 확인하여 결과를 출력 합니다.

```html
<div>
  <label for="query">누구의 작품을 찾으시나요?</label>
  <input v-model="query" id="query">
</div>

<h3>검색결과 입니다.</h3>
<ul>
  <li v-for="(story, index) in search" :key="index">
  { { story.writer } } said "{ { story.plot } }" </li>
</ul>

<script src="./js/vue.js"></script>
<script type="text/javascript">
new Vue({
  el: '.container',
  data: {
    stories: [....],
    query: ' '
  },
  computed: {
    search: function () {
      var query = this.query
      return this.stories.filter(function (story) {
        return story.plot.includes(query)})
    }
  }
})
</script>
```

**this.query** 를 **Vue 인스턴스의 data 로** 정의된 **query** 객체를 끌어온다 (Template 의 Form 에서도 **v-model**로 연결한다) 한편 search() 함수에서 정의된 **var query** 은 search() 함수의 내부변수로써 별도의 객체임을 구분해서 이해 하자
{: .notice--info}


## 결과의 정렬

> **stories** 배열 객체를 **item** 으로 하나씩 꺼내서 <br>
> **item** 객체 메소드 중 **.upvotes > 25** 가 True 인 <br>
> 객체들로 새로운 배열을 생성한다.

```html
<h1>가장 유명한 이야기들! { {famous.length} } th</h1>
<ul class="list-group">
  <li v-for="(story, index) in famous" :key="index" class="list-group-item">
    { { story.writer } } 작가가 말하길 "{ { story.plot } }"
    and 평점은 { { story.upvotes } } 입니다.
  </li>
</ul>
<script type="text/javascript">
new Vue({
  el: '.container',
  data: {
    stories: [....]
  },
  computed: {
    famous: function () {
      return this.stories.filter(function (item) {
        return item.upvotes > 25; });
    }
  }
})
</script>
```


## Custom Filter

> 전역 **Vue.filter()** 로 필터를 정의하여 { { **|** } } 를 적용한다  

```html
<h1>Super Heroes 의 이야기들!</h1>
<ul class="list-group">
    <li v-for="(hero, index) in heroes" :key="index" class="list-group-item">
        { {hero | snitch} }
    </li>
</ul>
<script type="text/javascript">
Vue.filter('snitch', function (heroes) {
  return '"' +  heroes.isObvioulsy + '" 은(는) '  +
         heroes.firstname + ' ' +
         heroes.lastname + ' 이 현실에서 이름이다!'
})
new Vue({
    el: '.container',
    data: {
       heroes:  [
          { firstname: 'Bruce', lastname:  'Wayne', isObvioulsy: 'Batman'},]
    }
})
</script>
```

## lodash 유틸리티 활용하기 

[lodash 문법](http://kbs0327.github.io/blog/technology/lodash/) , [다운](https://raw.githubusercontent.com/lodash/lodash/4.17.10-npm/lodash.min.js) , [GitHub](https://github.com/lodash/lodash)

> **_.orderBy**(arraydata, ['key1', 'key2'], ['desc', 'asc'])

1. **arraydata** : 정렬할 배열객체 
2. **key1, key2** : 정렬 기준의 Key 들
3. **desc, asc** : Key의 배열 (없으면 오름차순 정렬)
4. arraydata 를 **key1** 내림차순, 두번째 **key2**를 오름차순 정렬한다

배열 객체의 정렬을, **orderedStories() 인 Vue 인스턴스**로 간단한 정렬(간단한 적용)을, **_.orderBy() 인 lodash** 를 활용하여 컬럼별 적용하는 방법, 2가지를 비교해보자

```html
<ul>
  <li v-for="(story, index) in orderedStories" :key="index">
  { { story.writer } } 가 말하길 "{ { story.plot } }"
  and 득표수는 { { story.upvotes } } 이다.
  </li>
</ul>
<ul>
  <!-- lodash 모듈을 사용하여 정렬 (다양한 설정이 가능) -->
  <li v-for="(story, idex) in _.orderBy(stories, ['upvotes'], [order])" :key="index">
    { { story.writer } } 가 말하길 "{ { story.plot } }"
    and 득표수는 { { story.upvotes } } 이다.
  </li>
</ul>
<script src="./js/vue.js"></script>
<script src="./js/lodash.min.js"></script>
<script type="text/javascript">
  new Vue({
    el: '.container',
    data: {
      stories: [...],
      order : 'desc'
    },
    methods: {
      // 정렬 순서를 바꾼다
      reverseOrder: function () {
        this.order = (this.order === 'desc') ? 'asc' : 'desc'
      }
    },
    computed: {
      // 자동정렬된 결과를 출력
      orderedStories: function () {
        var order = this.order
        return _.orderBy(this.stories, 'upvotes', [order]) }
    }
  })
</script>
```

**this :** 자바스크립트에서 this 는 중요한 개념으로, **reverseOrder 의 경우**에는 **window** 환경에서 **this.order** 인 **order** 객체를 overwriting 한다
{ : .notice--info}

