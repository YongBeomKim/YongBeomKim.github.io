---
title : Django Project 03 Vue
last_modified_at: 2019-01-14T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django_vue.jpg
categories:
  - django
tags: 
    - js
    - django
toc: true 
---

webpack 과 Rest API 등 부가적인 기능을 추하했다면 이를 종합적으로 활용한 Template 내부에서 Vue.Js 를 사용한 Single Web Application 예시로써 Menu 버튼 작업을 진행해 보겠습니다.

실제 작업에서는 메뉴버튼등 간단한 부분들은 **HTML5, CSS** 를 사용해도 됩니다. 둘 간의 성능을 비교하면서 작업을 진행합니다. <strike>한편으로는 사소한 것도 vue.js 를 사용함으로써 vue.js 의 적용 영역을 넓히는 것도 좋아 보입니다. 추후 배포판 같은 경우는 js, css를 활용하고 Private 버젼은 보안기능 추가등을 위해 vue.js를 활용하는 등 환경을 다르게 보완 발전해 나아가는게 좋을 거 같습니다</strike>

# Vue.js

## Js, Vue 그리고 Webpack
앞에서는 webpack을 사용하지 않았기 때문에 한 페이지를 구성하기 위해 **HTML, Js, CSS** 3개의 파일만을 활용하여 작업을 하셨습니다. webpack을 활용하는 상황에서는 **.vue** 파일을 활용한 작업이 가능합니다.


Tree Component

https://vuejsexamples.com/a-tree-component-based-on-vue-js/

[Bugger Menu](https://vuejsexamples.com/an-off-canvas-sidebar-vue-component/)
[Liguor Tree](https://amsik.github.io/liquor-tree/#Examples)
[asly Menu](https://ashleylv.github.io/vue-quick-menu/index.html#/)