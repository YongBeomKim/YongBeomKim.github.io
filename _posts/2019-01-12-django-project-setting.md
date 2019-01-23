---
title : Django Project 01 Setting
last_modified_at: 2019-01-12T15:45:06-05:00
header:
  overlay_image: /assets/images/code/django_pro.png
categories:
  - django
tags:
    - js
    - django
toc: true
---

작년 강연자료를 만들면서 **막연한 두려움으로 인한 작업 스트레스가** 있었습니다. 지금 작업은 하는데 **제대로 하는건가? 해봤자 소용 없는건 아닐까?** Pandas 작업, 데이터 분석, 머신러닝 딥러닝 심지어 운전을 시작할 때도 막연한 두려움으로 인해 진도가 어려운 시점들이 있었습니다.

다행히 앞에 서술한 것들도 시간이 지나면서 익숙해진 만큼, **Django 로 Python 모듈들을 Web 기반으로 잘 묶어내는 플랫폼으the night come for us  리뷰로써** 기본 모듈을 잘 구현하고 CSS, Javascript 로 연결하는 부분들 실무를 중심으로 정리합니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/webpack_sample.gif">
  <figcaption>아래의 샘플 실행결과</figcaption>
</figure>


<br/>
# Description
1. **Hot Reload** 모듈을 활성화 하는 설정
2. **mariaDB** 연결
3. **django-filter** 연결
4. **django-table2** 연결

<br/>
# Django Setting
**Node Package Manager** 와 **Django** 의 설정을 연결합니다

## Terminal Setting
```python
$ django-admin startproject mysite
$ cd mysite
$ ./manage.py startapp app      
$ ./manage.py makemigrations && python manage.py migrate
$ ./manage.py runserver
$ mkdir -p public/{js,css} templates static/{img, media}
```
```php
├── mysite
│   └── settings.py
├── templates
├── public
│   ├── css
│   └── js
└── static
    ├── img
    └── media
```

### ./mysite/settings.py
**webpack-dev-server** 는 `localhost:3000` 포트를 사용하여 Djagno와 연결되고,  **webpack-bundle-tracker** 에 의해 Hash 값들이 추가되어 생성된 번들파일은 `./webpack-state.json` 로 저장을 합니다. 이 두가지 설정값을 읽어서 Django 는 Webpack 서버와 연결을 합니다.
```python
INSTALLED_APPS = [
    'webpack_loader',
    'corsheaders',
]

CORS_ORIGIN_WHITELIST = (
    'localhost:3000',
    '127.0.0.1:3000'
)

STATIC_URL = '/static/'
STATICFILES_DIRS = ( os.path.join(BASE_DIR, 'static'), )
# ./static/bundles/ 에 번들파일을 저장합니다
# webpack-bundle-tracker 결과값을 ./webpack-state.json 에 저장합니다
WEBPACK_LOADER = {
    'DEFAULT': {  
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-state.json'),
    }
}
```
위의 패키지가 설치되어 있지 않은 경우 `$ pip install django-webpack-loader django-cors-headers` 로 설치 후 실행을 합니다
{: .notice--info}

<br/>
# Node Package Setting
## Install Node Package Modules
앞으로 사용할 node package 들을 설치합니다. 과거의 경우 `--save` 를 붙여야만 했지만 지금은 default로 입력되어 아래와 같이 설치만 해도 해당 해키지 목록을 `package.json` 파일에 자동으로 저장합니다.
```python
$ npm init -f
$ npm i webpack css-loader file-loader style-loader vue vue-loader
$ npm i -D nodemon webpack-dev-server webpack-bundle-tracker
```
패키지 설치시 `-D` 의 의미는 **개발용 모듈** 로써 `package.json` 에서  **devDependencies** 에 추가합니다. 이를 제외하는 경우는 개발/배포 공용모듈로써 **dependencies** 에 추가하는 차이점이 있습니다.
{: .notice--info}

### ./package.json
`$ npm run 스크립트내용` 과 같이, 설치된 모듈을 사용하여 실행할 스크립트 내용들을 `package.json` 에 포함을 시키면 긴 스크립트를 모두 사용하지 않고 **스크립트 예약어** 만으로도 해당 내용을 실행할 수 있습니다.
```javascript
{
  "scripts": {
    "start": "nodemon -w webpack.config.js -x webpack-dev-server --hot",
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "webpack": "^4.28.3",
    ...
  },
  "devDependencies": {
    "webpack-dev-server": "^3.1.14",
    ...
  }
}
```
주의할 점은 `package.json` 은 설정파일로써 별도의 주석등이 추가되는 경우 오류가 발생합니다. 온전히 설정에 필요한 내용으로만 구성을 해야 하는 점에 유의합니다
{: .notice--info}

<br/>
# Webpack Setting
웹팩의 설정내용을 직접 입력합니다.

### ./webpack.config.js
```javascript
var path = require("path")
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    context: __dirname,
    mode: 'development',
    entry: {
        // home-hash값.js 로 bundle 파일을 생성합니다
        home: './public/js/index.js',
    },
    output: {
        // https://webpack.js.org/guides/public-path/
        publicPath: 'http://127.0.0.1:3000/',
        // path: path.resolve('./static/bundles/'),
        // filename: '[name]-[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
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
    resolve: {   
        alias: { // vue를 호출하기 위한 별칭을 지정합니다.
            'vue': path.resolve('./node_modules/vue/dist/vue.js'),
        }
    },
   devServer: {
       historyApiFallback: true, // 클라이언트 뷰 라우터를 활용
       //noInfo: true,           // 처음 시작때 info 출력
       overlay: true,            // 오류를 browser로 출력
       inline: true,
       port: 3000,
       headers: {
          'hot' : 'true',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
       },
       https: false,
       disableHostCheck: true
   },
    performance: {
        hints: false // 빌더가 250kb 넘기면 경고를 출력
    },
    devtool: '#eval-source-map',
    plugins:[
        new BundleTracker({
            filename: './webpack-state.json'
        })
    ],
  }
```
`nodemon -w webpack.config.js -x webpack-dev-server` 을 통해서  `-w` 는 **watch 대상을** 지정하고 `-x` 는 **execute 실행대상을** 지정합니다.

<br/>
# Django Sample Example
위와같이 `bundles` 파일을 지정하지 않은 상황에서 `$ npm start` 를 실행하면 아래와 같은오류를 출력합니다. 이를 테스트할 간단한 내용을 추가함으로써 `dev server` 작동을 확인해 보겠습니다.
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/npm_error.jpg">
  <figcaption>bundle 파일을 지정하지 않고 실행시 오류</figcaption>
</figure>

## Django Example
### ./mysite/views.py
```python
from django.views.generic import TemplateView
from django.shortcuts import render

class HomeView(TemplateView):
    template_name = 'home.html'
```

### ./mysite/urls.py
```python
from .views import HomeView

urlpatterns = [
    path('', HomeView.as_view(), name='index'),
]
```

### ./public/js/name.js
```javascript
const name = document.getElementById('name');
name.innerText = '파이썬';

if (module.hot) {
  module.hot.accept();
}
```

### ./public/js/count.js
```javascript
const counter = document.getElementById('counter');
let count = 0;
const timer = setInterval( () => counter.innerText = ++count, 1000);

if (module.hot) {
  module.hot.dispose(()=> {
    clearInterval(timer);
  });
  module.hot.accept();
}
```

### ./public/css/hello.css
```css
#counter {
    width: 100px;
    height: 100px;
    border: 2px solid lightgray;
}
```

### ./public/js/index.js
```javascript
import './name';
import './count';
import '../css/hello.css';
```

### ./templates/home.html
```html
{ % load render_bundle from webpack_loader % }
{ % load static % }
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
</head>
<body>
  <img src='{ % static "img/photo.jpg" % }' width='250' /><br/>
  <span id="name"></span>
  <div id="counter"></div>
{ % render_bundle 'home' % }
</body>
```

<br/>
# Django HMR, bundle Running
이와같이 설정하고서 개발단계와 배포단계에 구분하여 실행하는 내용을 정리해 보겠습니다

## Hot Reload Modules by **dev-server**
webpack 으로 생성된 bundles 파일들은 `webpack-state.json` 에 저장되고, Django 에서는 생성된 이파일을 사용하여 연결합니다.

### ./webpack.config.js
`webpack-dev-server` 의 실행을 설정을 한 뒤, `$ npm start` 를 실행을 하고, 다른 창에서  `$ ./manage.py runserver` 을 실행하면 Hot Reload Modules 을 사용할 수 있습니다.
```javascript
module.exports = {
    context: __dirname,
    output: {
        // https://webpack.js.org/guides/public-path/
        publicPath: 'http://127.0.0.1:3000/',
        // path: path.resolve('./static/bundles/'),
        // filename: '[name]-[hash].js',
    },
}
```

## Production mode by **bundle files**

### ./webpack.config.js
다음과 같이 설정한 뒤, `$ npm run build` 를 실행하면 번들파일이 생성됩니다. 이후 동일한 터미널에서 `./manage.py runserver` 를 실행하면 webpack으로 압축된 bundle 파일로 실행하는 모습을 볼 수 있습니다.
```javascript
module.exports = {
    context: __dirname,
    output: {
        // https://webpack.js.org/guides/public-path/
        // publicPath: 'http://127.0.0.1:3000/',
        path: path.resolve('./static/bundles/'),
        filename: '[name]-[hash].js',
    },
}
```

<br/>
# GitHub Source
```python
$ git clone git@github.com:YongBeomKim/Project.git
$ git log
commit 0992d87d329f75a2808c31c0fd9aeeec937626cd
Date:   Tue Jan 15 17:25:52 2019 +0900
    django webpack setting

$ git reset --hard "0992d87d329f75a2808c31c0fd9aeeec937626cd"
```
