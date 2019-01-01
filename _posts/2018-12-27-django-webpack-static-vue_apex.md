---
title : django-webpack-loader /  Django 와 webpack 그리고 Vue.js
last_modified_at: 2018-12-12T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django_vue.jpg
categories:
  - webpack
tags: 
    - django
    - webpack
    - apexchart
toc: true 
---

앞에서 `$ npm start` 로 실행한 **webpackage** 과 **django의** 연결방법을 익혀보았습니다. 하지만 단점이 있는데 webpack 과 django 의 **실행포트가 달라서 
django 의 views.py 에서 출력한 객체를 활용하기가 어렵습니다.** <small><strike>아직 사용법이 익숙치 않아서 그럴 수 있을수도 있으니까 조금 더 보완이 필요합니다</strike></small> 

앞에서 npm 과 webpack 의 **hardcoding** 작업을 진행하며 내용을 이해하는 과정이었다면, 이번 페이지 에서는 **django 패키지로** 제공되는 `django-webpack-loader` [github](https://github.com/owais/django-webpack-loader) 를 활용하는 내용을 실습합니다. 미리 예제를 실습해본 결과 다음의 장점이 존재합니다.
1. npm 과 django 별도 실행할 필요가 없습니다
2. django 의 views.py 에서 출력되는 content 객체의 활용에 유용

정리에 도움된 자료들을 살펴보고 내용을 들어가 보겠습니다.
1. [django-webpack-loader Github](https://github.com/owais/django-webpack-loader)
2. vue 와 django 객체 하이브리드 설정 [블로그](https://www.jianshu.com/p/fe74907e16b9)
3. [Github Source](https://github.com/chichi1091/django_webpack_vue)
4. [내용정리 블로그](http://chichi1091.hatenablog.jp/entry/2018/02/24/233151) 

<br/>
# 장고의 템플릿과 Vue의 하이브리드 설정
Django 템플릿과 Vue 변수객체 모두 `{ { } }` 로 둘러싸여 있습니다. backhand 환경이 Django 속에서는 템플릿을 렌더링 할 때, django 엔진이 먼저 연결되므로 Vue 등의 (Single Page Application) 모듈에서도 `{ { } }` 과 연결되기 어려운 한계가 존재합니다. 

### 방법 1
Vue 객체를 다른 포맷으로 지정합니다<br/>
`new Vue( { el: '#app', delimiters: ['${', '}'] } })` 

```html
<p v-if="count > -1">
  반복횟수: ${ count }
</p>
<script>
const app = new Vue({
  el: '#app',
  delimiters: [ '${', '}' ],
  data: { count : 10 },
});
</script>
```

### 방법 2
Django 템플릿 엔진의 렌더링을 비활성화 블록을 지정하고, 이 구역 내에서 vue 렌더링 코드를 입력합니다<br/>
`{ % verbatim % } { { vue } } { % endverbatim % }`

### 사전배열을 JavaScript 로 전달합니다
```python
def index(request):
    content = {'list': [ {'age': 18}, 200], 
               'obj' : {'name': 'python'} }
    return render(request, 'index.html', contents) 
```
```html
<!doctype html> 
<html lang="en"> 
<body></body> 
<script> 
  var list = { { list | safe } } 
  var obj  = { { obj | safe } } 
</script> 
</html>
```

<br/>
# django-webpack-loader
[Sample Github](https://github.com/ernieyang09/django-webpack-loader-test) [블로그](https://velog.io/@killi8n/Django-React-%EB%A1%9C-%EC%B2%AB-%ED%99%94%EB%A9%B4-%EB%9D%84%EC%9B%8C%EB%B3%B4%EA%B8%B0-55jm970olw) 

<br/>
# tutorial - 실습하기

## django 설치 및 환경설정
```python
$ pip install django django-webpack-loader
$ django-admin startproject mysite
$ python manage.py migrate
$ python manage.py runserver
```

## npm 설치
```python
$ npm init -f
$ npm install --save-dev webpack-cli webpack-bundle-tracker vue style-loader css-loader
```

### mysite/settings.py
```python
INSTALLED_APPS = [
    'webpack_loader',
]

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATICFILES_DIRS = (os.path.join(BASE_DIR, 'assets'),)
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
    }
}
```
django 에서 webpack 과 연결 설정파일은 `./webpack-stats.json` 로 정의를 하고, webpack 에서 생성객체는 `./assets/bundles/main-xxxxxxx.js` 로 저장을 하도록 설정합니다.

### webpack.config.js
webpack 설정을 위해 django 에서 사용한 **webpack.config.js** 파일을 생성하기 위해 다음의 내용을 저장합니다.
```javascript
var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,
  entry: './public/js/app.js',
  output: {
    path: path.resolve('./assets/bundles/'),
    filename: "[name]-[hash].js",
  },
  plugins: [new BundleTracker({filename: './webpack-stats.json'}),],
  module : {
    rules : [
      { test: /\.css/,
        use: [ 'style-loader',
          { loader: 'css-loader',
            options: { url: false, sourceMap: true,},},],
      },
    ]
  },
  resolve: {
    alias: {'vue': path.resolve('./node_modules/vue/dist/vue.js'),}
  },
}
```

### mysite/views.py
```python
from django.shortcuts import render
from django.http.response import HttpResponse
 
def index(request):
    return render(request, 'index.html')
```

### template/index.html
```html
{ % load render_bundle from webpack_loader % }
<!DOCTYPE html>
<html>
  <body>
    { % verbatim % } <!-- item template -->
    <script type="text/x-template" id="item-template">
      <li>
        <div :class="{bold: isFolder}" @click="toggle" @dblclick="changeType">
          { { model.name } }
          <span v-if="isFolder">[{ { open ? '-' : '+' } }]</span>
        </div>
        <ul v-show="open" v-if="isFolder">
          <item class="item"
            v-for="(model, index) in model.children"
            :key="index" :model="model">
          </item>
          <li class="add" @click="addChild">+</li>
        </ul>
      </li>
    </script>
    <p>(You can double click on an item to turn it into a folder.)</p>
    <!-- the demo root element -->
    <ul id="demo">
      <item class="item" :model="treeData"></item>
    </ul>
    { % endverbatim % }
    { % render_bundle 'main' % }
  </body>
</html>
```

### mysite/urls.py
```python
from django.contrib import admin
from django.urls import path
from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index),
]
```

## webpack 실행하기
다음의 내용을 실행하면 webpack 파일을 생성합니다.
```python
$ ./node_modules/.bin/webpack --config webpack.config.js
$ ./manage.py runserver
```
webpack 실행시 `--watch` 설정은 미리 설치된 버젼에서는 잘 작동했는데, 새로 update 한 뒤로는 불필요 한듯 합니다. 오히려 이 옵션이 있으면 동작이 멈춰 버려서 이를 제거하고 실행하니 제대로 작동하였습니다. 