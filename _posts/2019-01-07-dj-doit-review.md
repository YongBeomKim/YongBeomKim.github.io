---
title : Do it Vue.js 다시보기
last_modified_at: 2019-01-07T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django_vue.jpg
categories:
  - django
tags:
    - vue
    - django
toc: true

---
같은 내용을 반복하는 경우가 자주 발생합니다. 따라서 내용도 반복되긴 하지만, 작성자 스스로의 이해도는 높아지고 <strike>하지만 글을 쓰는 실력은 별로 안늘어 나는 듯..</strike> 보이는 깊이도 달라지기 때문에 이러한 내용이 많아지게 되는듯 합니다.

이번에도 **Do it Vue.js** 이 책에 들어있는 내용이 적다고 생각했었는데 여러번 볼 수록 필요한 내용, 기존에는 미처 놓친 부분들이 보이면서 도움이 되는 듯 해하고 그러한 내용들을 **Dango** 와 연계하여 정리해 보겠습니다.

<br/>
# Vue.js in django
## 개요
Django 를 한마디로 말하면 DataBase를 Web에 효과적으로 출력하는 도구 입니다. 시작이 DataBase인데 외부의 API, Excel 자료, Binary 파일 등등이 DataBase를 대신할 수 있습니다.

**사용자의 기호** 에 따라 다양한 방식으로 출력을 요합니다. **Form** 을 사용하여 선택한 내용들을 서버로 전송하여 **django-filter, REST API** 로 선별하고, Client 에서는 **Vue.js** 등을 사용하여 다양한 방식으로 출력합니다

# 용어들
## Directive (지시, 훈령)
## Vue Cli
내용 중 Instance ProtoTyping, StoryBook 등 다양한 동적기능을 제공합니다
## Component
HTML 문서중 Vue.js로 랜더링하는 부분들로써 `Vue.Component({})` 를 사용하여 생성하고, 이들은 각각 독립적이여서 **eventBus** 라는 **Vue 전역변수** 를 사용하여 정보를 전달합니다
## Single File Component
`*.vue` 단독의 파일로써 Html 문서와 비슷해 보이지만 다음과 같은 영역이 구분되어 저장합니다. vue-cli를 사용하지 않고, Django 에서 JavaScript 사용을 최소화 하기위한 목표가 있는만큼 개념만 알아두고 실제 작업에서는 `*.js` 에서 내용을 구현하는 방법을 사용하도록 합니다
```html
<template></template>
<script></script>
<style></style>
```

2019.01.23 : 추후 새로운 내용들을 추가하도록 합니다...
