---
title : Django / npm install 과 Django
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

자바스크립트 도구들 중에는 상당수가 npm install 을 사용하여 설치하는 경우가 많다. 지금까지는 단일한 **js, css** 파일을 불러와서 작업을 하였으므로 별도의 복잡한 설정이 불필요 했었고, 그나마 **Bootstrap** 에서 **GraphIcon**을 사용하기 위한 상대경로 및 필요한 파일들을 위치하였습니다.

이와같은 Hard Coding 방법으로도 작업은 가능하겠지만 보다 다양한 모듈활용하기 위한 확장성을 넓히기 위해서는 **Npm Install 에 대한 개념의 이해와, Django 에 적용하는 방법을** 정리를 해보겠습니다.

<br/>
# what is the **"$ npm install"?**

npm 은 **Node Package Manager** 의 약자입니다. 이에대해 체험을 한 것은 React Native를 수업하면서 필요한 내용들을 Node Js로 불러오면서 사용하였습니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/npmjs.png">
  <figcaption>npmjs.com npm설치 가능한 모듈검색</figcaption>
</figure> 

복잡하지만 간단하게 설명하면 Node.js 패키지 설치 모듈로써 package.json 설정내용에 포함된 것들을 참조하여 자동으로 JavaScript모듈들을 설치해주는 방법이라고 보면 됩니다.

# **npm**

<iframe width="560" height="315" src="https://www.youtube.com/embed/a0V4prHO5DI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>

1. **package :** 외부에서 불러오는 모듈들
2. **module :** 내 환경내에 미리 설치된 모듈


npmjs.png

