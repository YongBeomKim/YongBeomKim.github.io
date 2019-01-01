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

앞에서 django 와 webpack 의 `--hot`(HMR) 모드 연결방법을 2부에 걸쳐서, django-webpack-loader 를 이용한 js의 연결, 마지막으로 vue SPA(Single Page Applicaion) 을 직접 연결하는 방법까지 알아봤습니다.

이들중에는 어떤것은 node.js 와 vue가 너무 최신이라서 안정성이 보장되지 못한 방법(3번째), js 까지는 연결되었지만 django 의 css 와 이미지 파일의 연결부분이 빠진 내용(2번째), 그리고 npm, django 를 별도로 실행해야 하는 내용(첫번째)등 어느 한가지씩 부족한 내용들이었습니다.

우선 2번째 내용을 바탕으로, 단점들은 보완하고 작업을 하면서 새롭게 추가된 내용을 추가하면서 정리 및 강화하는 방향으로 정리를 해 나아가겠습니다.

[style-loader 오류의 보완]()<br/>

<br/>
# Project Install

## Django 설치하기
```python
$ pip install django django-webpack-loader
$ django-admin startproject mysite
$ cd mysite
$ ./manage.py makemigrations && ./manage.py migrate
$ ./manage.py runserver
```

## npm 모듈의 설치
```python
# ./mysite 에서 해당 작업을 실행합니다
$ npm init -f
$ npm i --save-dev vue webpack-cli webpack-bundle-tracker file-loader css-hot-loader mini-css-extract-plugin
```
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/sourcemap.gif">
  <figcaption>css-loader 에 의한 sourceMapUrl 오류 메세지</figcaption>
</figure> 
앞에서는 `$ npm i --save css-loader style-loader` 를 사용하였습니다만, firefox에서 **SourceMapUrl** 오류를 출력 했습니다. 해결책으로 새로운 `css-hot-loader` 모듈을[npmjs](https://www.npmjs.com/package/css-hot-loader) 사용하고 부족한 부분은 `mini-css-extract-plugin` [npmjs](https://www.npmjs.com/package/mini-css-extract-plugin) 로써 보완하는 방법을 사용하면 해당오류가 사라진 것을 볼 수 있습니다.[git issue](https://github.com/webpack-contrib/style-loader/issues/303)
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

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'

# /assets/bundles/ 폴더에 webpack 빌드파일을 저장합니다
STATICFILES_DIRS = (os.path.join(BASE_DIR, 'assets'),)
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
    }
}

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
```

## webpack.config.js

[webpack 의 개념설명](http://blog.jeonghwan.net/js/2017/05/15/webpack.html)<br/>
[참고예시 site](https://406.ch/writing/our-approach-to-configuring-django-webpack-and-manifeststaticfilesstorage/)<br/>


https://github.com/chichi1091/django_webpack_vue/blob/master/webpack.config.js

```javascript
var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: __dirname,
  mode : 'development',
  entry: './public/js/index.js',  // 시작점을 정의합니다
  output: { // 컴파일 결과물 저장폴더를 지정합니다
      path: path.resolve('./assets/bundles/'),
      filename: "[name]-[hash].js",
  },
  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module : {
    rules : [
      {
        test: /\.css$/,
        use: [
          {loader: 'css-hot-loader',},
          {loader: MiniCssExtractPlugin.loader,},
          {loader: 'css-loader',
           options: { url: false, sourceMap: true },},
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: { loaders: {} }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: { name: '[name].[ext]?[hash]'}
      },
    ]
  },
  resolve: {
    alias: {
      'vue': path.resolve('./node_modules/vue/dist/vue.js'),
    }
  },
  devServer: {
    historyApiFallback: true, // 클라이언트 뷰 라우터를 활용
    //noInfo: true,           // 처음 시작때만 info를 출력
    overlay: true,            // 오류를 browser로 출력
    headers: {'Access-Control-Allow-Origin': '*',}
  },
  // 빌더가 250kb 넘기면 경고를 출력합니다
  performance: {hints: false},
  devtool: '#eval-source-map',
}
```



# 참고자료 
[mini-css-extract-plugin setting](https://webpack.js.org/plugins/mini-css-extract-plugin/)<br/>
