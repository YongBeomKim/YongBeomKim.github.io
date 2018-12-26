---
title : Django / npm install 과 Django
last_modified_at: 2018-12-12T10:45:06-05:00
header:
  overlay_image: /assets/images/book/django-sample.jpg
categories:
  - chart
tags: 
    - django
    - apex
    - vue
toc: true 
---

자바스크립트 도구들 중에는 상당수가 npm install 을 사용하여 설치하는 경우가 많습니다. 지금까지는 단일한 **js, css** 파일을 불러와서 작업을 하였으므로 별도의 복잡한 설정이 불필요 했었고, 그나마 **Bootstrap** 에서 **GraphIcon**을 사용하기 위한 상대경로 및 필요한 파일들을 위치하였습니다.

이와같은 Hard Coding 방법으로도 작업은 가능하겠지만 보다 다양한 모듈활용하기 위한 확장성을 넓히기 위해서는 **Npm Install 에 대한 개념의 이해와, Django 에 적용하는 방법을** 정리를 해보겠습니다.

참고자료들.
1. [reactjs django](https://owais.lone.pw/blog/webpack-plus-reactjs-and-django/)
2. [reactjs django](https://medium.com/uva-mobile-devhub/set-up-react-in-your-django-project-with-webpack-4fe1f8455396)
3. [reactjs django](https://www.techiediaries.com/django-webpack-react/)

<br/>
# what is the **<small>"$ npm install"?</small>**

npm 은 **Node Package Manager** 의 약자입니다. 이에대해 체험을 한 것은 React Native를 수업하면서 필요한 내용들을 Node Js로 불러오면서 사용하였습니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/npmjs.png">
  <figcaption>npmjs.com npm설치 가능한 모듈검색</figcaption>
</figure> 

복잡하지만 간단하게 설명하면 Node.js 패키지 설치 모듈로써 package.json 설정내용에 포함된 것들을 참조하여 자동으로 JavaScript모듈들을 설치해주는 방법이라고 보면 됩니다. [YouTube 참고](https://www.youtube.com/watch?v=a0V4prHO5DI`)

<br/>
# **npm**

여기저기 구글링을 해본 결과를 간단하게 정리해 보겠습니다. 단 시작하기 전에 **module** 과 **Package** 를 명료하게 구분하고 시작하겠습니다. **1) package : 외부에서 설치 후** 사용 가능한 모듈을 의미하고, **2) module :** 내 환경에서 **미리/기본** 사용 가능한 모듈을 의미합니다

```
#  Django Project folders
├── manage.py
├── package.json
├── node_modules
│   ├── jquery
│   └── vue
```

1. 프로젝트 기본 폴더에서 **$ npm init** 으로 **package.json** 를 생성 <small>(프로젝트 내용을 간단하게 적어줍니다)</small>
2. `$ npm install vue --save` 의 **--save** 를 사용하면 **package.json**에 설치한 패키지 목록을 저장합니다. <small>추후 node_modules 폴더가 없어도 `package.json` 있는 폴더에서 `$ npm install` 만 실행하면 목록을 자동으로 설치합니다. [참고](http://jinbroing.tistory.com/143)</small>
3. `$ pip install django-webpack-loader` 로 **webpack** 을 사용하면, `node_modules` 폴더를 `staticfiles_dir` 과 동일하게 작동합니다 [StackOverFlow](https://stackoverflow.com/questions/40903366/how-to-include-css-in-node-modules-folder-from-django-project?rq=1)

```php
# package.json
{
  "name": "django",
  "version": "1.0.0"...
  },
  ....
  "dependencies": {
    "vue": "^2.5.21"
  }
}
```

<br/>
# WebPack (모듈 번들러) <small>[블로그](http://blog.jeonghwan.net/js/2017/05/15/webpack.html), [입문자를 위한 웹팩](https://github.com/AriaFallah/WebpackTutorial/tree/master/ko-arahansa/part1)</small>

Web을 구현할떄 **다양한 JavaScript 모듈이** 발달함에 따라 이들을 함께 사용하다 보면 **네트워크 비용을 많이 소요하게 되고 변수간 충돌의 위험도 커집니다.** 

이를 해결하기 위한 방법으로 **모듈을 IIFE 스타일로 변경해** 주는 과정 뿐만 아니라 **하나의 파일로 묶음으로써(bundled) 네트웍 비용을 최소화(http 요청을 최소화)** 할수 있는 방법으로 등장한 기술이 **Webpack** [link](https://medium.com/ag-grid/webpack-tutorial-understanding-how-it-works-f73dfa164f01) 입니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/webpack.png">
  <figcaption>How to work Webpack</figcaption>
</figure> 

> **엔트리, 아웃풋, 로더, 플러그인**

## 엔트리

웹팩에서 모든 것은 모듈로 구성되어 있습니다. 웹페이지를 구성하는 자바스크립트, 스타일시트, 이미지 등 **모든 것을 자바스크립트 모듈로 로딩해서 하나로 묶는 작업을 엔트리** 라고 합니다.

## 아웃풋

엔트리 과정을 통해서 하나로 묶인 모듈 결과물을 **아웃풋**으로 기록합니다

## 로더

Webpack 에서는 JavaScript 만 지원하기 때문에, Css Image 등 **자바스크립트가 아닌 모든 객체들을 JavaScript로 변환하는 역활을** 하는 부분을 **로더 (style-loader, babel-loader)** 라고 합니다 

## 플러그인

위의 **로더는 파일단위** 로 작업을 진행한다면, 변환된 플러그인은 **번들된 결과물** 을 처리합니다

<br/>
# django-webpack-loader

전체적 구조와 개념들을 이해하셧다면 이제는 Django 에서 구현하는 방법을 종합해 보겠습니다.

<br/>
# Vue.js in Django 

webpack 을 실습하면서 vue.js 직접적인 내용이 2018.10 올라온 내용이 있어서 여기를 참조하였습니다. 비록 아프리카 억양에 화질이 않좋지만 있는게 어디에요 ㅠㅠ..

[YouTube](https://www.youtube.com/playlist?list=PLUPDOJAnyTw_w8KKcFk_toQ9jPCdkRMhf)

## **step 1** Django 프로젝트 만들기

```
$ django-admin startproject mysite
```

## **step 2** Vue.js Template Webpack 연결하기

vue.js 템플릿을 Webpack 으로 만든 [Github](https://github.com/vuejs-templates/webpack) 의 내용을 따라해 봅니다

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/vuetemp.jpg">
  <figcaption>How to work Webpack</figcaption>
</figure> 

```
$ npm install vue
$ vue init webpack-simple frontend
  ? Project description 작업의 내용을 설명 (git commit 내용)
   To get started:
   
     cd frontend
     npm install
     npm run dev
```

위와 같이 설치를 하면 다음과 같은 Tree 구조를 갖습니다

```
├── frontend
│   ├── package.json
│   ├── src
├── manage.py
├── db.sqlite3
```

설치된 내용을 바탕으로 필요한 부가설치를 진행합니다

```
$ cd frontend
$ npm install
$ npm run dev
```

`$ npm run dev`를 실행하면 8080 포트를 통해서 vue project를 실행합니다. 이에 따라 django는 8000번 vue.js 는 8080 포트 를 사용하여 활성화 됩니다

## **step 3** django-webpack-loader

```
$ pip install django-webpack-loader
```

### settings.py

```python
# Application definition
INSTALLED_APPS = [
    ...
    'webpack_loader',
]

# WebPack Loader 설정
WEBPACK_LOADER = {
  'DEFAULT': {
    'CACHE': not DEBUG,
    'BUNDLE_DIR_NAME' : '',
    'STATS_FILE': os.path.join(BASR_DIR, 'frontend/webpack-stats.json'), #생성
    'POLL_INTERVAL' : 0.1,
    'TIMEOUT': None,
    'IGNORE': ['.+\.hot-update.js', '.+\.map']
  }
}
```

## **step 4** 

```
$ cd frontend
$ npm install --save-dev webpack-bundle-tracker
```


