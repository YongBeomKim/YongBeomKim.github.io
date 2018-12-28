---
title : Tutorial / django 에서 webpack 실행 하편
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

상편에서는 django 에서의 **Webpack** 을 설정하고, **nodemon 과 webpack-dev-server** 를 사용하는 방법들을 익혔습니다. 나머지 앞에서 참고한 YouTube 동영상의 내용을 이어 나아가겠습니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/A2vEazcfJ7U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br/>
# to do List

1. (상편) Django - simple page 
2. (상편) webpack
3. (상편) webpack-dev-server
4. js 폴더를 webpack 으로 대체하기
5. css 폴더를 webpack 으로 대체하기
6. babel, react
7. react-hot-loader 연결

<br/>
# 3 webpack-dev-server
앞에서 설정한 내용에서 **webpack** 의 `--hot` 설정을 추가합니다. [webpack 에서 hot의 설정](https://velopert.com/814)

### package.json
```javascript
  "scripts": {
    "start": "nodemon -w webpack.config.js -x webpack-dev-server --hot",
```

### static/js/name.js
```javascript
const name = document.getElementById('name');
name.innerText = 'erdos Lee Park';

if (module.hot) {
    module.hot.accept();
}
```

설정을 변경한 뒤 `$ npm start` 로 실행하고 `$ ./manage.py runserver` 를 실행하면 잘 작동하는 듯 보이지만 **크롬의** 개발자모드에서 **Preserve Log** 를 활성화 하면 다음과 같은 세부적인 오류 내용을 보실 수 있습니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/console_error.jpg">
  <figcaption>크롬의 console 오류로 Preserve Log 를 체크</figcaption>
</figure> 

이는 django 는 8000 포트를 사용하지만 webpack 의 `--hot` 은 8080포트를 사용하는 엇갈리는 문제가 해결되지 않아서 발생하는 문제입니다. 이를 해결하기 위해 **webpack.js.org** 에서 설정내용을 참고합니다 [webpack.js.org](https://webpack.js.org/configuration/output/#output-publicpath)


