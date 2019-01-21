---
title : django-webpack-loader / vue 연결하기 (중간정리)
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

django 와 vue 의 연결 방법으로, 첫번째는 **django 와 webpack** 의 `--hot`(HMR) 모드 연결방법을 2부에 걸쳐서, 두번째는 **django-webpack-loader** 를 이용한 js의 연결, 마지막으로 **vue SPA(Single Page Applicaion)** 을 직접 연결하는 방법까지 알아봤습니다.

각각의 완결성 보다는 장단점이 있어서 이번 페이지에서는 두번째 내용을 기준으로 설치부터 시작하여 단점은 보완하고 버젼업에 따른 변경된 내용을 보완 및 강화하는 방향으로 정리를 해 나가겠습니다.

<br/>
# Project Install

## Django 설치하기
```python
$ pip install django django-webpack-loader
$ django-admin startproject mysite
```
```python
$ cd mysite
$ ./manage.py makemigrations && ./manage.py migrate
$ ./manage.py runserver
```

## npm 모듈의 설치
```python
# ./mysite 에서 해당 작업을 실행합니다
$ npm init -f
$ npm i --save-dev vue webpack webpack-cli webpack-bundle-tracker file-loader css-loader css-hot-loader mini-css-extract-plugin vue-loader
```
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/sourcemap.gif">
  <figcaption>css-loader 에 의한 sourceMapUrl 오류 메세지</figcaption>
</figure> 
`$ npm i --save css-loader style-loader` 를 사용하는 경우 크롬에선 정상작동 하였지만, firefox에서는 **SourceMapUrl** 오류를 출력 합니다. 이의 해결책으로써 새로운 `css-hot-loader` 모듈을[npmjs](https://www.npmjs.com/package/css-hot-loader) 사용하고 부족한 부분은 `mini-css-extract-plugin` [npmjs](https://www.npmjs.com/package/mini-css-extract-plugin) 로써 보완을 하면 firefox, chrome 모두에서 해당오류가 사라짐을 볼 수 있었습니다.[git issue](https://github.com/webpack-contrib/style-loader/issues/303)
{:. notice--info}

<br/>
# Setting

##  Django Setting
django 에서 추가로 필요로 하는 폴더들을 생성합니다. 
```python
$ mkdir -p public/{css,js} templates
```

### ./mysite/settings.py
```python
INSTALLED_APPS = [
    'webpack_loader',
]

# templates 폴더를 특정합니다
TEMPLATES_DIR = os.path.join(BASE_DIR, 'templates')
TEMPLATES = [
    {   'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [TEMPLATES_DIR,],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)

# webpack 에서 빌드파일이 저장된 경로 : ./static/bundles/
# bundles 데이터를 django 의 호출용 json 파일을 생성합니다
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-state.json'),
    }
```

##  webpack Setting
[webpack option](https://trustyoo86.github.io/webpack/2018/01/10/webpack-configuration.html) 내용을 참고하여 주요 속성들의 개념과 내용을 학습합니다.

### ./webpack.config.js
webpack 에서 **bundle 을 생성하기** 위한 연결모듈의 설정과, **대상파일 및 저장파일의 경로를** 설정합니다. 주의할 점은 django 와의 연결을 위해 `settings.py` 에서 호출하는 webpack bundle 파일을 일치시켜야 합니다.
[webpack bundle 설정](https://github.com/owais/django-webpack-loader/issues/117)

그리고 배포를 위한 관리용 파일 폴더를 `./public`, `./static` 2개로 중복하여 생성하였습니다. 이유는 하나는 `webpack` 에서 **HMR** 등으로 관리를 위한 용도로써 `public`, 나머지는 django 에서 활용을 위한 `./static` 으로 구분을 위해 나누었고 추후 보완해 나아갈 부분이라 볼 수 있습니다.
```javascript
var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: __dirname,
  mode : 'development',
  entry: {  // 시작점을 정의합니다
      index: './public/js/index.js',
  },
  output: { // 컴파일 결과 저장폴더를 지정합니다
      path: path.resolve('./static/bundles/'),
      filename: "[name]-[hash].js",
  },
  plugins: [
    new BundleTracker({filename: './webpack-state.json'}),
    // webpackOptions.output 의 설정을 추가합니다
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module : {
    rules : [
      { test: /\.css$/, // css 로딩 webpack 모듈 (firefox와 호환문제)
        use: [
          {loader: 'css-hot-loader',},
          {loader: MiniCssExtractPlugin.loader,},
          {loader: 'css-loader',
            options: {
              url: false,      // css 를 url() 과 결합을 금지합니다
              sourceMap: true, // sourceMap 사용을 활성화
            },
          },
        ],
      },
      { test: /\.vue$/,
        loader: 'vue-loader',
        options: { loaders: {} },
      },
      { test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: { name: '[name].[ext]?[hash]' }
      },
    ]
  },
  resolve: { // 모듈을 해석하는데 필요한 모듈을 설정합니다
    alias: { // vue의 실행을 위한 별칭을 지정합니다.
      'vue': path.resolve('./node_modules/vue/dist/vue.js'),
    }
  },
  devServer: {
    historyApiFallback: true, // 클라이언트 뷰 라우터를 활용
    //noInfo: true,           // 처음 시작때만 info를 출력
    overlay: true,            // 오류를 browser로 출력
    headers: {
       'Access-Control-Allow-Origin': '*',
    }
  },
  performance: {
    hints: false // 빌더가 250kb 넘기면 경고를 출력
  },
  devtool: '#eval-source-map',
}
```
`entry: './public/js/index.js',` 와 같이 단일한 객체만 생성하는 경우에는 `main` 객체이름을 자동으로 생성합니다. 다만 실제 작업에서는 이러한 경우는 드물기 때문에 위와같이 객체명을 특정한 뒤 대상을 지정합니다.
{: .notice--info}

`alias: {'vue':}`  부분은 webpack bundle 파일에서 **Vue.js** 모듈은 별도의 CDN 없이도 `window.Vue = require('vue');` 만으로도 호출 가능하도록 도와줍니다.
{: .notice--info}

<br/>
# building Django
예제 작업을 위해서 django 작업을 진행합니다.

## mysite/views.py
```python
from django.shortcuts import render
 
def index(request):
    return render(request, 'index.html')
```

## mysite/urls.py
```python
from django.contrib import admin
from django.urls import path
from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index),
]
```

<br/>
# building Template
예제 작업을 위해서 django 작업을 진행합니다.

## templates/index.html
랜더링 `index.html` 웹페이지를 생성합니다.
```python
{ % load render_bundle from webpack_loader % }
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
  <body>
    <!-- 템플릿에서 vue 랜더링을 위해 django 제한구역을 설정 -->
    { % verbatim % } 

    <script type="text/x-template" id="item-template">
      <li>
        
        <div :class = "{bold: isFolder}" 
             @click = "toggle" 
             @dblclick = "changeType">
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

### public/css/app.css
스타일 설정파일을 생성합니다.
```css
body {
  font-family: Menlo, Consolas, monospace;
  color: #444;
  background-color: lightblue; 
}
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
```

### public/js/index.js
```javascript
import '../css/app.css';

// demo data
var data = {
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        }
      ]
    }
  ]
}

// define the item component
window.Vue = require('vue');
Vue.component('item', {
  template: '#item-template',
  props: {
    model: Object
  },
  data: function () {
    return {
      open: false
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    },
    addChild: function () {
      this.model.children.push({
        name: 'new stuff'
      })
    }
  }
})

// boot up the demo
var demo = new Vue({
  el: '#demo',
  data: {
    treeData: data
  }
})
```

### building webpack
```python
$ ./node_modules/.bin/webpack --config webpack.config.js
```

<br/>
# 참고자료 

[webpack 의 개념설명](http://blog.jeonghwan.net/js/2017/05/15/webpack.html)<br/>
[참고예시 site](https://406.ch/writing/our-approach-to-configuring-django-webpack-and-manifeststaticfilesstorage/)<br/>
[mini-css-extract-plugin setting](https://webpack.js.org/plugins/mini-css-extract-plugin/)<br/>
[webpack 이름이 여럿일 때](https://github.com/owais/django-webpack-loader/issues/117)<br/>
[webpack bundle 참고](https://stackoverflow.com/questions/49123760/cannot-resolve-bundle-style)<br/>