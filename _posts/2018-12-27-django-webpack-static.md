---
title : Tutorial / npm install 과 Webpack 개념
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

앞선 내용에서 **Webpack** 과 이들에 사용되는 개념들, 그리고 간단한 유투브 내용을 정리해 보았습니다. (중간에 포기한건 함은정.) 하지만 **Django 내부의 static 과의 관계 설정등** 보다 확실한 내용을 정리하는데 도움이 될만한 문서로써 구글을 찾아보니 보다 잘 정리된 문서들을 찾을 수 있었습니다

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/google_webpack.jpg">
  <figcaption>2018년도 자료들이 잘 정리된걸 볼 수 있습니다</figcaption>
</figure> 

우선 이번시간에는 아래의 YouTube 동영상의 내용을 정리하고, 추후 부족한 부분들을 위의 검색결과로 나온 문서들을 활용하여 보완하도록 하겠습니다

<iframe width="560" height="315" src="https://www.youtube.com/embed/A2vEazcfJ7U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

내용을 정리하기전 구체적인 목표는 다음과 같습니다

1. django-webpack-loader 의 설치 및 이해
2. node_modules 와 static 의 관계를 이해
3. vue, axios, apexchart, bootstrap 이 상호 작동 가능한 setting 만들기

그럼 시작해 보겠습니다. 

[잘 정리된 페이지1](https://scotch.io/bar-talk/build-an-app-with-vuejs-and-django-part-one)