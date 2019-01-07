---
title : django-webpack-loader HMR and Django
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

npm으로 설치한 ./node_modules 를 django 와 연결하고 이러한 환경에서 webpack-dev-server 으로 압축하여 배포하기 위한 환경설정에 대해 약 1달간 연구작업을 반복하고 있습니다.

JavaScript 모듈
1. **webpack, webpack-cli** : js 및 static 파일을 **압축하는** 모듈
2. **webpack-dev-server** : **development 모드** 에서 사용하는 **Hot Reload 활성화** [npmjs](https://www.npmjs.com/package/webpack-dev-server)
3. **webpack-bundle-tracker** : 생성한 **bundle 파일을 연결하는** 모듈 [npmjs](https://www.npmjs.com/package/webpack-bundle-tracker)

Django 모듈
1. **django-webpack-loader** : webpack 의 환경을 Django와 연결

이들을 연결하여 원하는 환경에서 작업이 원할하도록 내용을 정리하는 것이 목적입니다. 앞에서 정리한 내용의 한계는 **django-webpack-loader**가 없는 환경에서 **webpack-dev-server** 를 구현하는 내용이 빠져있어서 django 의 content 객체를 다룰때의 내용을 정리할 필요가 있습니다.

오늘도 거의 다 되었는데, 막판에 정리가 안되면서 엉망이 되었습니다. 이를 제대로 정리하기 위해서라도 오늘 완전하게 마무리를 진행하겠습니다 레알! 리얼리!!

<br/>
# 진행할 내용 미리보기
1. nodemon 을 사용한 webpack-dev-server 와 Django 연결
2. django-webpack-loader 를 사용하여 1을 보완한다
3. 배포를 위해서 webpack-dev-server 부분을 제거하고 나머지만 출력한다.

작업시 webpack-dev-server 영역을 확실하게 구분해야만 배포시 혼동이 줄어듭니다. 1) **자바스크립트 패키지** 폴더는 `./node_modules` 2) **작업용 CSS, JS** 폴더는 `./public` 3) Django 이미지등 파일과 배포용 build 파일들은 `./static` 으로 구분지어 작업을 진행합니다.

<br/>
# node.js & webpack Setting

## package.json 
> `$ npm start`

**node.js** 의 npm 에서 관리 가능한 **설치 및 실행명령을** 정의합니다.
```javascript
{
  "scripts": {
    "start": "nodemon -w webpack.config.js -x webpack-dev-server --hot",
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "webpack": "^4.28.3",
  },
  "devDependencies": {
    "webpack-dev-server": "^3.1.14"
  }
}
```

## webpack.config.js 
> `./node_modules/.bin/webpack --config webpack.config.js` 

앞의 `package.json` 과 달리 사용자가 임의로 이름을 지정할 수 있습니다. 또는 단일한 파일에서 `mode` 설정을 production, development 로 구분하여 지정이 가능하고, 개발단계 또는 배포단계에 서로다른 내용을 적용 가능합니다.

```javascript
var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,
  mode : 'development',
  entry: {
      index: './public/js/index.js',
  },
  output: {
      path: path.resolve('./static/bundles/'),
      filename: "[name]-[hash].js",
  },
  plugins: [
    new BundleTracker({filename: './webpack-state.json'}),
  ],
  devServer: {
    headers: {
       'Access-Control-Allow-Origin': '*',
    }
  },
}
```

<br/>
# step 1 : **nodemon** 을 사용한 Django, Webpack 연결
## 내용설명
nodemon을 사용하여 webpack 서버를 `http://127.0.0.1:3030/` 로 활성화 하고, django 에서 `static` 으로 연결합니다.

<br/>
# step 2 : django-webpack-loader 와 webpack-dev-server 연결
## 내용설명
위의 단일한 작업환경을 1) `webpack_loader` 을 사용한 `{ % load render_bundle from webpack_loader % }` 의 webpack 의 연결 2) 나머지 환경은 `STATICFILES_DIRS` 로 별개 작동하는 환경을 구축 합니다.

## webpack
### package.json
nodemon 을 사용하여 배포하는 내용을 그대로 사용합니다.

### webpack.config.js
> `$ npm i -dev webpack-bundle-tracker`

**webpack 의 설정 및 실행파일** 목록을 `BundleTracker` 에서 `webpack-stats.json` 파일로 저장하고, 이를 django에서 활용 가능하도록 다음의 내용을 추가합니다.
```javascript
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    output: {
        ...
        publicPath: 'http://127.0.0.1:3030/',
        filename: '[name]-[hash].js',
    },
    ...
    plugins:[
        new BundleTracker({filename: './webpack-stats.json'})
    ],
  }

```

## Django
### settings.py
```python
INSTALLED_APPS = [
    ...
    'webpack_loader',
    'corsheaders'
]

STATIC_URL = '/static/'
STATICFILES_DIRS = (os.path.join(BASE_DIR, 'static'),)
WEBPACK_LOADER = {
    'DEFAULT': {
        "CACHE": not DEBUG,
        'BUNDLE_DIR_NAME': 'bundles/',  # "/" 는 꼭 뒤에 추가합니다
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
    }
}
CORS_ORIGIN_WHITELIST = ('localhost:3030','127.0.0.1:3030')
```
`webpack-stats.json` 파일의 정보를 사용하여 `WEBPACK_LOADER` 에서 django 를 연결합니다. 주의할 점은 `BUNDLE_DIR_NAME` 경로는 `/static/bundles/` 와 같이 static 와 연결하여 경로를 완성하므로 꼭 **static 내용을 먼저** 정의를 해야 합니다. 

<br/>
# step 3 : build 파일 생성 후 배포하기
지금까지는 `$ npm start` 와 같이 내부 명령으로 `dev-server` 를 별도로 실행하였습니다. 하지만 배포시에는 이와같은 번거로움이 필요없고 webpack build 파일을 생성하고 나머지는 삭제 후 배포실행하면 됩니다. 즉 webpack 을 내부의 build 파일과 연결만 하면 django 실행만으로도 웹서비스를 실행할 수 있습니다.

## webpack setting
### ./webpack.config.js
webpack dev server 관련 출력내용을 제거하고, 대신 **bundles 파일을 저장하는 경로를** 정의합니다.
```javascript
var path = require("path")

module.exports = {
    output: {
        path: path.resolve('./static/bundles/'),
        filename: '[name]-[hash].js',
    }, ...
}
```

### ./package.json
> `$ npm run build`

여기서는 내용을 변경할 필요는 없습니다. 서버를 실행하는 대신에 필드 파일을 생성하는 명령을 실행한 뒤 위에서 정의한 `path` 에 빌드파일이 생성되고, 해당 기록을 `webpack-stats.json` 에 저장여부를 확인합니다.
```javascript
  "scripts": {
    "start": "nodemon -w webpack.config.js -x webpack-dev-server --hot",
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

## Django Setting
`webpack-stats.json` 의 내용이 변경되었기 대문에 별도의 내용변경없이 django를 실행하면 됩니다.

## Bootstrap [npm 설치](https://stevenwestmoreland.com/2018/01/how-to-include-bootstrap-in-your-project-with-webpack.html)
```
$ npm i bootstrap
```

<br/>
# 참고 사이트들
[React & webpack-loader](https://medium.com/uva-mobile-devhub/set-up-react-in-your-django-project-with-webpack-4fe1f8455396)<br/>
[webpack Setting](https://gist.github.com/genomics-geek/81c6880ca862d99574c6f84dec81acb0)<br/>
[Vue3 Django](https://medium.com/@rodrigosmaniotto/integrating-django-and-vuejs-with-vue-cli-3-and-webpack-loader-145c3b98501a)<br/>
[React Django](https://medium.com/labcodes/configuring-django-with-react-4c599d1eae63)<br/>
[django vue webpack](https://medium.com/@michealjroberts/part-1-integrating-django-2-vue-js-and-hot-webpack-reload-setup-387a975166d3)<br/>