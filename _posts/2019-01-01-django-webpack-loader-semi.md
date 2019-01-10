---
title : CORS, django-webpack-loader in Django
last_modified_at: 2019-01-01T10:45:06-05:00
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

바로 앞에서 **nodemon webpack-dev-server** 환경과, **Django 의 Backhand** 를 연결하여 동적인 개발 환경을 실습하였습니다. 이번에는 django **django-webpack-loader** 의 **webpack bundle** 파일을 만들어 배포가능한 환경을 구성하는 방법을 정리해 보겠습니다. [React & webpack-loader](https://medium.com/uva-mobile-devhub/set-up-react-in-your-django-project-with-webpack-4fe1f8455396) [webpack Setting](https://gist.github.com/genomics-geek/81c6880ca862d99574c6f84dec81acb0)

현재 ./Webpack 으로 django 배포용 간략버젼을 정리하였습니다. 아래의 내용으로 정리를 해보고, 안되면 그냥 앞의 HMR 모드로 `./HmrServer` 작업후 bundle 파일 생성한 뒤 배포로 연결해 버리자 (너무 작업들이 지체되었습니다)
https://medium.com/@michealjroberts/part-1-integrating-django-2-vue-js-and-hot-webpack-reload-setup-387a975166d3

<br/>
# Setting 

## django-webpack-loader, django-cors-headers <small>[webpack-loader](https://github.com/owais/django-webpack-loader), [cors-headers](https://github.com/ottoyiu/django-cors-headers)</small>
```python
$ pip install django-webpack-loader django-cors-headers
```

https://medium.com/@michealjroberts/part-1-integrating-django-2-vue-js-and-hot-webpack-reload-setup-387a975166d3

## Django Setting
### ./mysite/settings.py
앞에서는 **nodemon 의 webpack** 의 포트를 받아서 활용 하였다면, 이번에는 **django-webpack-loader** 에 의해 **bundles** 결과를 사용합니다. **작업경로의 안전성** 을 위해서 **webpack entry** 폴더는 `./public/{css, js}` 를 사용하고,  **배포단계** 에서는 `./static/{bundles, img}` 로 구분하여 작업을 진행합니다.

그리고 `./webpack-state.json` 파일의 정보를 활용하여 webpack 과 django-webpack-loader 의 연결 설정내용을 저장 및 활용합니다 <small>파일이름 오타에 주의를 합니다</small>

앞에서는 번들파일을 바로 `STATICFILES_DIRS = ['dist']` 연결을 하였습니다. 이를 `os.path.join(BASE_DIR, 'static')` 와 같이 django 엔진을 거치면서 HMR 모드를 사용하면면 `(원인: CORS 요청이 성공하지 못함)` 의 오류가 발생합니다. 물론 배포시엔 제거하면 되지만 개발 단계에서는 문제가 되므로 이를 해결하기 위해 ` django-cors-headers` 를 추가합니다. <strike>안해도 되기도 하고 오락가락 합니다</strike>[한글](http://ngee.tistory.com/1154)[일어](https://murabo.hatenablog.com/entry/2018/02/01/121925)
```python
INSTALLED_APPS = [
    'webpack_loader',
    'corsheaders',
]

CORS_ORIGIN_WHITELIST = (
    'localhost:8080',
    '127.0.0.1:8080'
)

# STATIC_URL = 'http://127.0.0.1:8080/'
STATIC_URL = '/static/'

# STATICFILES_DIRS = ['dist']
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)

WEBPACK_LOADER = {
    'DEFAULT': {  # ./static/bundles/ 에 번들파일을 저장합니다
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-state.json'),
    }
}
```

## Webpack  Setting

### webpack-bundle-tracker
```python
$ npm install --save-dev webpack-bundle-tracker
```
**--save** 는 package.json 에 개발정보를 저장하는 옵선으로 npm@5 이후부터는 초기값으로 지정되어 있습니다. **-dev** 는 **development** 설치써로써, 개발단계 에서만 사용하고, 배포단계에서는 불필요한 모듈을 구분하는 용도로 활용됩니다.


### webpack.config.js
```javascript
var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,
  mode : 'development',
  devtool: 'source-map',
  entry: {
      home: './public/js/index.js',
  },
  output: { // django-webpack-loader 에게 전달
      path: path.resolve('./static/bundles/'),
      filename: "[name]-[hash].js",
  },
  plugins: [ // django 에서 추적가능하도록 설정
    new BundleTracker({filename: './webpack-state.json'}),
  ],
  module : {
    rules : [
      { test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  performance: {
    hints: false
  },
  devServer: {
    historyApiFallback: true,
    //noInfo: true,
    overlay: true,
    inline: true,
    port: 8080,
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












<br/>
# 참고자료 사이트 

> ./node_modules/.bin/webpack-dev-server --content-base-www --inline --hot 

[Vue3 Django](https://medium.com/@rodrigosmaniotto/integrating-django-and-vuejs-with-vue-cli-3-and-webpack-loader-145c3b98501a)<br/>
[React Django](https://medium.com/labcodes/configuring-django-with-react-4c599d1eae63)<br/>
[webpack in django & vue](https://medium.com/@michealjroberts/part-1-integrating-django-2-vue-js-and-hot-webpack-reload-setup-387a975166d3)<br/>
[webpack-loader Hot Github](https://medium.com/@michealjroberts/part-1-integrating-django-2-vue-js-and-hot-webpack-reload-setup-387a975166d3)<br/>
[setting django in vue](https://eldarion.com/blog/2018/10/09/setup-guide-django-vue-webpack/)<br/>
[django Hot reload](https://zaccc123.github.io/blog/2017/guide-on-using-reactjs-with-django-part1-3/)<br/>

