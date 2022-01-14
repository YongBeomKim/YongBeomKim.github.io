---
title : Vue.js 3 / django webpack 그리고 Vue.js 3 
last_modified_at: 2018-12-28T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django_vue.jpg
categories:
  - webpack
tags: 
    - django
    - webpack
    - vue
toc: true 
---

앞에서 실습한 django, webpack 의 내용을 정리하다보면, **django 와 vue, webpack, JavaScript** 등 서로 다른 환경객체들을 다루다 보니 복잡하고 다양한 접근방법들이 존재하게 되었습니다, 이번에는 조금 더 다른 접근법에 대한 정리를 하면서 내용을 고도화 해 나아가겠습니다. [참고 블로그](https://ariera.github.io/2017/09/26/django-webpack-vue-js-setting-up-a-new-project-that-s-easy-to-develop-and-deploy-part-1.html)

<br/>
# Introduction

django는 백핸드로, javascript 는 프론트로 분할작업은 앞에서 실습한 `webpack --hot` 모듈만으로도 충분합니다. 하지만 여기에서는 django와 vue를 혼합하여 Single Page Application 를 구현하는 방법을 정리한 결과로써 제공하는 해결책은 `django-webpack-loader` 와 `webpack-bundle-tracker webpack 플러그인` 을 기반으로 처리를 합니다. 

django 에서는 관리파일을 처리하고, webpack 에서는 업데이트를 처리합니다. 개발하는 동안에는 로컬과 웹 서버 모두를 실행하고 웹 브라우저에서는 Django만 출력합니다 :)

## 설정목표

1. prod 와 dev 환경을 최대한 비슷하게 구현하기
2. django 의 단일 port로 결과물 구현하기
3. hot reload (aka HMR) 개발환경 구축하기
4. django 에 무리한 부담없는 개발환경 구축하기

<br/>
# project 만들기
dev 환경을 setting 하는 방법을 진행합니다

## vue 와 django 프로젝트 설치하기
```python
$ vue init webpack mysite
$ cd mysite
$ django-admin startproject mysite
```
```python
$ npm i --dev --save webpack-bundle-tracker 
$ pip install django-webpack-loader
$ pip freeze > requirements.txt
```

### ./mysite/mysite/settings.py
```python
INSTALLED_APPS = [
    'webpack_loader',
]
```

### ./build/webpack.base.conf.js
`webpack` 설정파일에서 `bundle tracker` 내용을 추가합니다 
```javascript
let BundleTracker = require('webpack-bundle-tracker')
module.exports = {
  // ...
  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
  ],
}
```

## static 환경설정
static 환경설정에는 여러가지 방법이 있어서 어렵습니다. 때문에 여기에서는 `./public` 에서 모든 작업파일을 저장합니다. 주의할 검은 `./public` 폴더 밑에 `./js` , `./css` 등의 폴더 추가는 가능하지만, 보다 깊은단계의 설정은 문제를 일으킬 수 있습니다.
```python
- public/
  - js/ (webpack generated)
  - css/ (webpack generated)
  - img/ (django generated)
  - admin/ (django generated)
```

### ./config/index.js
webpack 과 django 두곳의 환경에서 설정내용을 작업해야 합니다. 우선 webpack 에서 설정파일을 작업합니다. 기본 설정파일에서 아래에 없는 내용을 추가합니다.
```javascript
module.exports = {
  dev: {
    assetsPublicPath: 'http://localhost:8080/',
  },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist/'),
    assetsSubDirectory: '',
    assetsPublicPath: '/static/',
  },
}
```

### ./my_project/settings.py
django 에서 webpack 의 설정경로를 재활용 합니다
```python
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'dist'),
    os.path.join(BASE_DIR, 'static'),
)
STATIC_ROOT = os.path.join(BASE_DIR, 'public')
STATIC_URL  = '/static/'
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': '',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
    }
}
```

### $ npm run build
앞에서 설정한 내용이 제대로 되었다면 npm 을 사용하여 build 를 실행합니다. 제대로 작동하는지를 확인합니다.
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/npm_build.jpg">
  <figcaption>$ npm run build</figcaption>
</figure> 

## 설정의 해석
`build.assetsRoot: path.resolve(__dirname, '../dist/')`<br/>
webpack 빌더를 설정에 따라 `$ npm run build` 작업결과를 저장하는 폴더를 정의합니다 

`STATICFILES_DIRS and STATIC_ROOT`<br/>
django 에서의 설정 내용으로 django 엔진에서 외부파일을 찾기위한 설정을 정의합니다. 특이한 점은 `STATICFILES_DIRS` 에 2개의 폴더가 지정되어 있는데 하나는 `./static` (django) 폴더이고, 나머지는 `./dist` (webpack) 의 폴더 입니다.

`assetsSubDirectory: '',`, `assetsPublicPath: '/static/'`<br/>
webpack 에서도 작성한 외부파일을 `url` 에서 출력하는 경로를 설정합니다. 예를 들면 `<img src="images/logo.png">` 의 내용으로 작업을 하면 결과는 `<img src="/static/images/logo.png">` 과 같은 모습으로 외부에서 관찰 가능합니다.

`STATIC_URL = '/static/'`<br/>
django 에서도 위의 webpack에서의 작업과 동일하게 외부연결 url 랜더링 경로를 정의합니다.

`dev.assetsPublicPath: 'http://localhost:8080/'`<br/>
Django 마찬가지입니다. 템플릿 중 하나가 정적 파일을 참조 할 때마다 `/static` 경로 아래에 렌더링됩니다.

`WEBPACK_LOADER['DEFAULT']['STATS_FILE']`<br/>
django 에서는 `django-webpack-loader` 에 의해서 **BundleTracker** 의해 생성된 json객체를 불러오기 위한 환경설정을 정의합니다. <small>**(build/webpack.base.conf.js 파일의 내용을 참조합니다)**</small>
 
<br/>
# django 플랫폼에서 `django static` 과 `vue` 객체의 활용
```html
<img src="{ % static 'logo.png' % }"> 
<img src="static/logo.png">
```
django 에서는 `STATICFILES_DIRS` 설정으로 인해 호출객체를 찾지만, vue 의 webpack 에서 정의한 객체의 호출에 대해선 별도 정의를 필요로 합니다.

## webpack 에서 static 호출하기
### build/webpack.base.conf.js 
```javascript
module.exports = {
  resolve: {
    alias: {
      // ...
      '__STATIC__': resolve('static'),
    },
}
```

위와같이 webpack 에서 내용을 변경하고 `__STATIC__` 경로를 사용하면 동일한 객체를 호출가능합니다. 다만 `~` 를 덧붙여야 함을 꼭 기억하셔야 합니다.
```html
<img src="~__STATIC__/logo.png">
```

<br/>
# **HMR**(Hot realod or Hot Module Replacement) 의 설정
우선적으로는 django 서버로 접근하고, `dev.assetsPublicPath` 설정내용을 참조하여 webpack은 프록시<small>**(서버와 클라이언트를 연결하는 캐시데이터를 응용 가능합니다)**</small> 처리를 합니다. 하지만 이때문에 **HMR** hot reload 가 깨지는 문제가 발생합니다. 이를 보완하기 위해서는 webpack dev 서버에서 새로운 Header 값을 추가해야 **CORS** 요청이 가능해집니다.

### ./build/webpack.dev.conf.js
`webpack-dev-server` 에서 **CORS** 요청이 원활하도록 새로운 Header 값을 추가합니다.
```javascript
devServer: {
  headers: {
    "Access-Control-Allow-Origin":"\*"
  },
}
```

<br/>
# Simple Template

### ./mysite/settings.py
django 에서 template 객체가 있는 경로를 지정합니다.
```python
TEMPLATES = [
  {
    'DIRS': [os.path.join(BASE_DIR, 'templates')],
  }
]
```

### ./templates/my_project/base.html 
```html
{ % load render_bundle from webpack_loader % }
<html>
  <body>
    { % block content % }
    { % endblock % }
    { % render_bundle 'app' % }
  </body>
</html>
```

### ./templates/my_project/spa.html
```html
{ % extends "my_project/base.html" % }
{ % block content % }
  <div id="app"></div>
{ % endblock % }
```

### ./mysite/urls.py
```python
from django.views.generic import TemplateView
urlpatterns = [
    path('', TemplateView.as_view(
        template_name='my_project/spa.html'), name='home'),
]
```

### **$ ./manage.py runserver** 를 실행합니다.

webpack 내용이 실행되지 않아서 OSError를 출력합니다 (익숙하시쥬??) 이 부분을 수정한 뒤 나머지 불필요한 부분을 삭제하는 내용을 마무리를 하도록 합니다.



### next !!
내용을 다시 읽어보니 이를 보완하여 정리한 페이지가 링크로 걸려 있었다. 이걸 통해서 위에서 막힌 부분을 찾아서 수정하도록 하자[blog](https://medium.com/@rodrigosmaniotto/integrating-django-and-vuejs-with-vue-cli-3-and-webpack-loader-145c3b98501a)

> webpack의 `output.publicPath` 를 수정하는 대신에 `Django baseUrl` 을 항상 사용하는 작업 환경을 구축하자.

이러한 환경에서 작업을 해야만 보다 안정적인 작동이 가능해집니다.

이를 통해서 vue를 npm start 로 2개 띄우고 실행하는 것까지 도달은 했지만, django 내부의 static 폴더와의 연결은 어떤방식을 사용하지는지에 대해선 딱히 언급하지 않아서 지금까지는 이번 페이지에서 정리된 내용으로 발전하도록 하겠습니다.