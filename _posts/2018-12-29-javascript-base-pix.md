---
title : JavaScript 개념 익히기 
last_modified_at: 2018-12-29T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django_vue.jpg
categories:
  - js
tags: 
    - js
    - webpack
toc: true 
---

자바스크립트 객체를 다루면서 객체에 대한 구체적인 개념을 이해 못하고서 작업을 진행하다 보니까, 어느 부분을 수정 보완을 하는지를 미세적으로 잘 모르는 상태에서 장님이 코끼리 다리 만지듯이 제대로된 수정 보완이 아닌 통으로써 내용을 다루고 세적인 변경 및 수정에 취약하게 됩니다.

지금까지 정리한 개념 및 추후 정리를 한 내용들을 모아두는 저장 창고로써 기능을 하도록 작업을 진행해 보겠습니다.

# Example
```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    })
  ],
  module: {
    rules: [..]
  }
}
```

# Javascript 에서 객체
```javascript
선언문 객체 (Object) = 
배열 (Array) = [ 'x', 'y', 'z', 100, false, true]
객체 (Object) = {
  속성 이름 : 속성 값,
} // json
```

# 객체의 깊이별 속성값
```javascript
객체.메소드 = {
  객체 메소드의 속성객체 (attribute): {
    벨류객체 (value): [
      속성 이름 : 속성 값,
    ]
  }
}
```

