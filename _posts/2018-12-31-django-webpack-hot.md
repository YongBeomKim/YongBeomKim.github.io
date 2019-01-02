---
title : django-webpack-loader / Hot Replacement Module
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

바로 앞페이지에서 **webpack**을 사용하여 번들객체를 만들고 결과를 출력하는 간단한 process를 정리하였습니다. 하지만 결과를 볼려면 **bundle** 파일을 생성한 뒤 결과를 볼 수 있는 번거로움이 존재합니다. 개발단계에서 유용한 **HMR(Hot Module Replacement)** 모드의 **django-webpack-loader** 모듈작업 환경을 정리해 보겠습니다.

**javascript WebPack 과 Django를 다이렉트로 연결하면** 문제는 해결되지만, **배포시 django-webpack-loader 를 추가로 설정하는 번거로움이** 존재합니다. <strike>참 번거로운 것도 많아요 ㅠㅠ.. 그런데 설정시 오류가 나면 고생하는건 팩폭입니다</strike> 

```javascript
import VueApexCharts from 'vue-apexcharts'
import Vue from 'vue'
```

[HMR Github](https://github.com/owais/django-webpack-loader/tree/master/examples/hot-reload)<br/>
[HMR React 예제](https://gist.github.com/genomics-geek/81c6880ca862d99574c6f84dec81acb0)<br/>
[Vue HMR 설명](https://ariera.github.io/2017/09/26/django-webpack-vue-js-setting-up-a-new-project-that-s-easy-to-develop-and-deploy-part-1.html)<br>

# Setting
앞에서 다룬 내용이니 <strike>자세한 설명은 생략합니다</strike>
```python
$ pip install django django-webpack-loader
$ django-admin startproject mysite
$ cd mysite
$ ./manage.py makemigrations && ./manage.py migrate
$ npm init -f
$ npm i --save-dev vue webpack webpack-cli webpack-bundle-tracker file-loader css-loader css-hot-loader mini-css-extract-plugin vue-loader
```

## ./mysite/settings.py
```python
INSTALLED_APPS = [
    'webpack_loader',
]

STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-state.json')
    }
}
```
폴더와 파일이름을 `webpack.config.js` 에서도 동일하게 설정하도록 유념해서 작업을 진행합니다.
{: .notice--info}

<br/>
# HMR (Hot realod or Hot Module Replacement)
webpack 으로 생성한 bundle 파일을 사용시 문제가 되지 않지만, HMR 모드를 활성화 하는 경우에는 CORS (Cross-origin resource sharing) requests 를 Header 값에 추가하는 등의 작업을 필요로 합니다.

## webpack-dev-server [Github](https://www.npmjs.com/package/webpack-dev-server)
```python
$ npm i webpack-dev-server --save-dev
```
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/dev_server.jpg">
  <figcaption>webpack-dev-server 최신에서 발생하는 오류</figcaption>
</figure> 
webpack 과 webpack-dev-server 를 설치하는 경우 위와같은 오류를 출력합니다. 이는 git 에서도 아직 [issue](https://github.com/vuejs/vue-cli/issues/3223) 로 남아있고, 추후 1.3.16 에서 개선될 것이라고 예측하고 있을 뿐 아직 완전한 해결방법을 제시하진 못하고 있습니다. 

이와 비슷한 용도로 사용가능한 **webpack-hot-middleware** 모듈도 있지만, `$ npm i webpack-hot-middleware` 이를 설치한 경우에도 위와같은 오류를 출력합니다.

## webpack.config.js
[webpack document](https://webpack.js.org/guides/hot-module-replacement/) 에서 
```javascript
+ const webpack = require('webpack');

  module.exports = {
    entry: {
-      app: './src/index.js',
-      print: './src/print.js'
+      app: './src/index.js'
    devServer: {
+     hot: true
    },
    plugins: [
+     new webpack.HotModuleReplacementPlugin()
    ],
  };
```

```javascript
var path = require("path")
+ const webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: __dirname,
  mode : 'development',
  entry: {  // 시작점을 정의합니다
      index: './public/js/index.js',
  },
  // entry: './public/js/index.js',
  output: { // 컴파일 결과 저장폴더를 지정합니다
      path: path.resolve('./assets/bundles/'),
      filename: "[name]-[hash].js",
  },
  plugins: [
+     new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(), // don't reload if there is an error
    new BundleTracker({filename: './webpack-stats.json'}),
    // webpackOptions.output 의 설정을 추가합니다
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module : {
    rules : [
      { // css 로딩 webpack 모듈 (firefox와 호환문제)
        test: /\.css$/,
        use: [
          {
            loader: 'css-hot-loader',
          },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,      // css 를 url() 과 결합을 금지합니다
              sourceMap: true, // sourceMap 사용을 활성화
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
    ]
  },
  resolve: { // 모듈을 해석하는데 필요한 모듈을 설정합니다
    alias: { // vue의 실행을 위한 별칭을 지정합니다.
      'vue': path.resolve('./node_modules/vue/dist/vue.js'),
    }
  },
  devServer: {
+     hot: true
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