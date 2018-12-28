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

## `--hot` 설정의 활성화
앞에서 설정한 내용에서 **webpack** 의 `--hot` 설정을 추가합니다. [webpack 에서 hot의 설정](https://velopert.com/814) webpack 에 종속되는 객체들이 수정하면 바로 변경가능하도록 **webpack** 과 **dev-server** 를 실시간으로 연결해주는 옵션입니다.

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

이를 참조하여 `webpack.config.js` 파일에서 현재 내 서버에서 실행되는 webpack 설정을 django 와 연결 가능하도록 내용을 입력합니다.

```javascript
module.exports = {
  mode : 'development',
  entry : './static/js/index.js',
  output: {
    publicPath: 'http://127.0.0.1:8080/'
  }
}
```

그리고 자바스크립트 내용을 변경하고 실행하면 이제는 다른종류의 오류를 출력합니다.  `Failed to load http://127.0.0.1:8080/d3a22e4ecc29a45701f1.hot-update.json: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8000' is therefore not allowed access.` 이는 연결은 되었지만 보안의 이유로써 접속이 거부되었다는 내용입니다. 

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/console_error_auth.jpg">
  <figcaption>크롬의 console 오류로 Preserve Log 를 체크</figcaption>
</figure> 

이를 수정하기 위해 위에서 요구하는 header 값을 webpack 에서 추가합니다.

```javascript
module.exports = {
  mode : 'development',
  entry : './static/js/index.js',
  output: {
    publicPath: 'http://127.0.0.1:8080/'
  },
  devServer: {
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
  }
}
```
참고로 작업시 `'Access-Control-Allow-Origin': "*",` 쌍 따옴표를 사용하니까 위에서 발생한 권한오류가 동일하게 발생하였습니다. PHP 에서 정의된 "" 는 string, '' 는 Raw Code 의 의미구분이 여기에서도 적용되는 듯 합니다. webpack 설정시에는 '' 단일한 따옴표를 사용하도록 주의를 하는 편이 좋습니다
{: .notice--info}

이와같이 설정을 하면 오류가 사라진 것을 보실 수 있습니다.