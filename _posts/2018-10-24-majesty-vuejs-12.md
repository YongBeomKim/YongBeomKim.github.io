---
title : 쉽게 배우는 Vue.js - 12장 (Http Client)
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


<br>
# Chapter 12 : HTTP 클라이언트 활용

앞에서 **Jquery**를 사용하는 방법을 살펴봤습니다, Ajax 호출만 사용한다면 Jquery 대신에 **vue-resource** , **axios** 를 활용하여 API 호출하는 방법을 더 추천합니다.


## **vue-resource**

Vue.js 의 리소스 플러그인으로 XML Http Response 나 JSONP를 이용해서 응답을 처리합니다.

```javascript
//GET 방식으로 호출 
this.$http({url: '/someUrl', method: 'GET'})
   .then(function (response){
        // 성공시 콜백처리 함수내용 
    }, function (response) {
        // 오류시 콜백처리 함수내용
   });
```

요청 메서드들 정리해보자

1. this.**$http.get**(url, [data], [option]).**then**(성공콜백, 오류콜백)
2. this.**$http.post**(url, [data], [option]).**then**(성공콜백, 오류콜백);
3. this.**$http.put**(url, [data], [option]).**then**(성공콜백, 오류콜백);
4. this.**$http.patch**(url, [data], [option]).**then**(성공콜백, 오류콜백);
5. this.**$http.delete**(url, [data], [option]).**then**(성공콜백, 오류콜백);


## **_axios**

Node.js에서도 호환 가능한 Promise 기반의 HTTP 클라이언트를 제공합니다

```javascript
axios({
    method: 'get',
    url: '/user/stories'
}).then(function (response){
    console.log(response);
}).catch(function (error){
    console.log(error);
})
```

요청 메서드들의 정리하면 다음과 같다. 다만 별칭 method 를 사용할 경우, config 에서 url, method, data 프로퍼티를 지정할 필요가 없습니다.

1. axios.**request**(config)
2. axios.**get**(url[, config])
3. axios.**delete**(url[, config])
4. axios.**head**(url[, data[, config]])
5. axios.**post**(url[, data[, config]])
6. axios.**put**(url[, data[, config]])
7. axios.**patch**(url[, data[, config]])

**vue-resource** 를 활용할 경우 `Vue.**prototype.$http** = **axios**` 를 사용하면 axios 문법을 그대로 활용 가능하다
{: .notice--info}


## **_axios** 사용하기

**Get 요청**을 활용하여 데이터를 **Read**

```javascript
mounted: function() {
    // GET 요청
    axios.get('/api/stories')
    .then(function (response){
        Vue.set(vm, 'stories', response.data)
        // 또는 아래 코드를 사용 가능
        // vm.stories = response.data 
    })
}
```


## **patch** 및 **delete** 요청

**PATCH** (update) 요청시

```javascript
upvoteStory: function(story) {
    story.upvotes++;
    axios.patch('/api/stories' + story.id, story)
}
```

**delete** 요청시 

```javascript
deleteStory: function(story){
    var index = this.$parent.stories.indexOf(story);
    this.$parent.stories.splice(index, 1)
    axios.delete('/api/stories' + story.id)
}
```

**story** 컴포넌트에 접근하기 위해 this.**$parent.stories** 또는 vm.**stories** 를 활영하여 접근합니다.


## 기능 개선

### 수정하기 







