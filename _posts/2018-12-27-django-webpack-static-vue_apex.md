---
title : Tutorial / django-webpack-loader
last_modified_at: 2018-12-12T10:45:06-05:00
header:
  overlay_image: /assets/images/book/django-sample.jpg
categories:
  - chart
tags: 
    - django
    - webpack
    - apexchart
toc: true 
---

앞에서는 node.js 의 webpack 을 설치하여 활용하는 내용을 살펴보았습니다. 작업을 하려다보니 django 에서 render() 객체로 넘기는 content 를 사용하기에는 불편한 부분이 존재하였습니다 <small><strike>아직 사용법이 익숙치 않아서 그럴 수 있을수도 있으니까 조금 더 보완이 필요합니다</strike></small> 그래서 이번 페이지 에서는 django 패키지로 제공되는 `django-webpack-loader` 를 활용하는 방법을 익혀보겠습니다.

<br/>
# django-webpack-loader
[Sample Github](https://github.com/ernieyang09/django-webpack-loader-test)

위의 예제를 활용하여 어떠한 내용을 구현하는지 샘플내용을 바탕으로 앞의 내용을 구체적으로 실습해 봅니다.



