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

앞에서 `$ npm start` 로 실행한 **webpackage** 과 **django의** 연결방법을 익혀보았습니다. 하지만 단점이 있는데 webpack 과 django 의 **실행포트가 달라서 
django 의 views.py 에서 출력한 객체를 활용하기가 어렵습니다.** <small><strike>아직 사용법이 익숙치 않아서 그럴 수 있을수도 있으니까 조금 더 보완이 필요합니다</strike></small> 

앞에서 npm 과 webpack 의 hardcoding 작업을 진행하며 내용을 이해하는 과정이었다면, 이번 페이지 에서는 django 패키지로 제공되는 `django-webpack-loader` 를 활용하는 내용을 실습해 봅니다. 미리 예제를 실습해본 결과
1. npm 과 django 별도 실행할 필요가 없습니다
2. django 의 views.py 에서 출력되는 content 객체의 활용에 유용

<br/>
# django-webpack-loader
[Sample Github](https://github.com/ernieyang09/django-webpack-loader-test) [블로그](https://velog.io/@killi8n/Django-React-%EB%A1%9C-%EC%B2%AB-%ED%99%94%EB%A9%B4-%EB%9D%84%EC%9B%8C%EB%B3%B4%EA%B8%B0-55jm970olw) [예제블로그](http://chichi1091.hatenablog.jp/entry/2018/02/24/233151) [Github Source](https://github.com/chichi1091/django_webpack_vue)

## django 설치
```python
$ pip install django django-webpack-loader
$ django-admin startproject django_webpack_vue
$ python manage.py migrate
$ python manage.py runserver
```

## npm 설치
```
$ npm init -f
$ npm install --save-dev webpack webpack-bundle-tracker vue style-loader css-loader
```

### webpack.config.js
webpack 설정을 위해서 **webpack.config.js** 파일을 생성하고 아래의 내용을 입력합니다.
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
            options: { url: false, sourceMap: true,},},
        ],
      },
    ]
  },
  resolve: {
    alias: {
      'vue': path.resolve('./node_modules/vue/dist/vue.js'),}
  },
}
```

### template/index.html
```html
{ % load render_bundle from webpack_loader % }
<!DOCTYPE html>
<html>
  <body>
    { % verbatim % }
    <!-- item template -->
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

## 장고의 템플릿과 Vue의 하이브리드 설정
Django 템플릿과 Vue 변수객체 모두 `{ { } }` 로 둘러싸여 있습니다. backhand 환경이 Django 속에서는 템플릿을 렌더링 할 때, django 엔진이 먼저 연결되므로 Vue는 `{ { } }` 과 연결되기 어려운 한계가 존재합니다.

### 방법 1
Vue 구성을 변경하기 위해 `대괄호([[ ]])` 를 대신 사용합니다.
> new **Vue**( { el: '#app', **delimiters: ['[[', ']]']**, } }) 

### 방법 2
Django 템플릿 렌더링을 비활성화 하여 vue 엔진에서 렌더링 하도록 설정합니다
> { % **verbatim** % } { { vue } } { % **endverbatim** % }

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


./node_modules/.bin/webpack --config webpack.config.js --watch

