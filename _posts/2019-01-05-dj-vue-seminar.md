---
title : Beautiful Front Vue.js & Django
last_modified_at: 2019-01-14T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django_vue.jpg
categories:
  - django
tags: 
    - vue
    - django
---

Django 와 Webpack 에 대한 경험치들이 쌓이다 보니, 기존의 모든 튜토리얼을 받아들이던 것에서 벗어나 필요한 부분들을 추려서 모을 수 있게 되었습니다. 이번부터는 지금까지 참고했던 예제들 중 webpack 설정 후 필요한 내용들을 요약해서 프로젝트에 적용하는 내용들로 정리를 해 나아가겠습니다.

지금까지 Django 에서 Webpack 연결 및 Vanila.Js CSS 의 번들연결까지 완성을 했다면, 이번부터는 Django Webpack 을 활용한 Vue.js 의 연결에 대해서 정리해 나아가겠습니다. 

그 첫번째 시간으로 비록 2년전의 자료이긴 하지만, Django 와 Vue 의 연결에 대한 약 20분의 세미나를 정리해 보려고 합니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/C7oiYr4_NdU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>

<br/>
# Introduction

## Django and Vue
Django 와 Vue.js 의 관계는 **MVC**(model, view, controller) 에서 **View** 의 Template 의 Single Webpage Application 일부분으로써 위치를 합니다. 

## How to Combine the Two?
1. Django 의 views.py 객체중 **content** 를 사용해서 
2. interact API 를 만들어서
3. Django Rest API

# Template Example
```html
# django/template.html
{% raw %}
{% extends 'base.html' %}
    <div v-for="job in jobs" class="job container">
        <div class="col-sm-12">
            <h3>[[ job.jobtitle ]]</h3>
        </div>
        <div class="col-sm-12">
            <p>[[ job.description ]]</p>
            <button class="btn" v-on:click="removeJob($index)">삭제</button>
        </div>
    </div>
{% block content %}
{% endraw %}
```
```javascript
# vue/vue.vue
Vue.config.delimiters = [ "[[", "]]" ]
```


