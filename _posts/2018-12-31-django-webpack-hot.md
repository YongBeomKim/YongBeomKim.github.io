---
title : django / Hot Replacement Module
last_modified_at: 2018-12-30T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django_vue.jpg
categories:
  - webpack
tags: 
    - js
    - django
    - webpack
toc: true 
---

바로 앞에서 django-webpack-loader 를 사용하여 webpack bundle 파일을 만들고 이를 활용하여 배포하는 작업까지 진행하였습니다. 하지만 개발단계에서 매번 bundle 작업을 진행 후 확인하는 것은 번거롭기 때문에 이를 한페이지로 정리를 해보겠습니다.

<br/>
# HMR Development Mode Setting

## Terminal Setting (django & npm)
```python
$ django-admin startproject mysite
$ cd mysite
$ ./manage.py makemigrations && ./manage.py migrate
$ npm init -f
$ npm i --save-dev webpack webpack-cli 
$ npm i --save-dev webpack-bundle-tracker webpack-dev-server
$ npm i --save-dev file-loader css-loader style-loader
$ npm i --save nodemon
```

## Django Setting

### ./mysite/settings.py
```python
TEMPLATES_DIR = os.path.join(BASE_DIR, 'templates')
TEMPLATES = [
    {   'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [TEMPLATES_DIR,],
        'APP_DIRS': True,
    },
]

STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'dist'),
)
```
**webpack** 에서 기본 번들파일을 생성하면 `./dist/index-hash034i345.js` 와 같은 경로에 생성되므로 `./dist` 폴더를 static로 연결합니다

<br/>
# Webpack dev Server

## Terminal Setting
```python
$ mkdir -p templates public/{css,js} static/{img}
```

## Webpack Setting

### ./webpack.config.js
```json
var path = require("path")
const webpack = require('webpack')

module.exports = {
  context: __dirname,
  mode : 'development',  // 개발자 모드 활성화
  devtool: 'source-map', // firefox 문제해결
  entry: {
      index: './public/js/index.js', 
  },
  output: {
      publicPath: 'http://127.0.0.1:8080/',
  },
  module : {
    rules : [
      { test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      { test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
        }
      },
      { test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ]
  },
  resolve: { // 모듈을 해석하는데 필요한 모듈을 설정합니다
    alias: { // vue의 실행을 위한 별칭을 지정합니다.
      'vue': path.resolve('./node_modules/vue/dist/vue.js'),
    }
  },
  performance: {
    hints: false // 빌더가 250kb 넘기면 경고를 출력
  },
  devServer: {
    headers: { 
       'hot' : 'true',
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Credentials': 'true',
    },
    https: false,
    disableHostCheck: true
  }
}
```
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/dev_server.jpg">
  <figcaption>webpack-dev-server 최신에서 발생하는 오류</figcaption>
</figure> 
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/webpack_wds.jpg">
  <figcaption>$ npm run build</figcaption>
</figure> 
**firefox** 에서 작업을 하는 경우 **CORS 요청오류, [WDS] Disconnected!** 오류 메세지를 출력하는 경우에는, 위와같이 **headers** 내용을 추가합니다.[webpack git](https://github.com/webpack/webpack-dev-server/issues/851#issuecomment-449518624)
{: .notice--info}

### ./package.json
```json
{
  "disableHostCheck": true,
  "scripts": {
    "start": "nodemon -w webpack.config.js -x webpack-dev-server --hot",
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
}
```

<br/>
# Simple Example

## Django Setting

### ./mysite/views.py
```python
from django.views.generic import TemplateView

class HomeView(TemplateView):
    template_name = 'home.html'
```

### ./mysite./urls.py
```python
from django.contrib import admin
from django.urls import path
from .views import HomeView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', HomeView.as_view(), name='home'),
]
```

## Template Setting

### ./templates/index.html
```html
{ % load static % }
<!DOCTYPE html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <span id="name"></span>
    <div  id="counter"></div>
    <script src="{ % static 'index.js' % }"></script>
  </body>
</html>
```

## JavaScript & Style CSS Setting

### ./public/js/name.js
```json
const name = document.getElementById('name');
name.innerText = '장고 웹팩';

if (module.hot) { // hot 모듈의 적용
   module.hot.accept();
}
```

### ./public/js/count.js
```json
const counter = document.getElementById('counter');
let count = 0;
const timer = setInterval(() => counter.innerText = ++count, 1000);

if (module.hot) {
   module.hot.dispose(()=> {
      clearInterval(timer);  // HMR로 갱신시 값들을 초기화 합니다
   })
   module.hot.accept();
}
```

### ./public/index.js
```json
import './name';
import './count';
import '../css/hello.css';
```

<br/>
# Running Site
아래의 두가지 서버를 각각 별도의 서버 또는 background 실행을 합니다.

## webpack dev server running
```python
$ npm start
```

## django server running
```python
$ ./manage.py runserver
```
<br/>
# 참고자료 사이트 

> ./node_modules/.bin/webpack-dev-server --content-base-www --inline --hot 

```javascript
import VueApexCharts from 'vue-apexcharts'
import Vue from 'vue'
```
[webpack-hmr-tutorial](https://www.javascriptstuff.com/webpack-hmr-tutorial/)<br/>
[webpack dev server](https://www.toptal.com/javascript/hot-module-replacement-in-redux)<br/>
[stackoverflow](https://github.com/angular/angular-cli/issues/4839)<br/>
[참고 Blog](https://medium.com/a-beginners-guide-for-webpack-2/webpack-loaders-css-and-sass-2cc0079b5b3a)<br/>
[multi name](https://github.com/webpack/webpack/tree/master/examples/multiple-entry-points)<br/>
[HMR Github](https://github.com/owais/django-webpack-loader/tree/master/examples/hot-reload)<br/>
[HMR React 예제](https://gist.github.com/genomics-geek/81c6880ca862d99574c6f84dec81acb0)<br/>
[Vue HMR 설명](https://ariera.github.io/2017/09/26/django-webpack-vue-js-setting-up-a-new-project-that-s-easy-to-develop-and-deploy-part-1.html)<br>
