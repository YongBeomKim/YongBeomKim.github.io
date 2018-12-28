---
title : Tutorial / npm install 과 Webpack 개념
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

앞선 내용에서 **Webpack** 과 이들에 사용되는 개념들, 그리고 간단한 유투브 내용을 정리해 보았습니다. (중간에 포기한건 함은정.) 하지만 **Django 내부의 static 과의 관계 설정등** 보다 확실한 내용을 정리하는데 도움이 될만한 문서로써 구글을 찾아보니 보다 잘 정리된 문서들을 찾을 수 있었습니다

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/google_webpack.jpg">
  <figcaption>2018년도 자료들이 잘 정리된걸 볼 수 있습니다</figcaption>
</figure> 

우선 이번시간에는 아래의 YouTube 동영상의 내용을 정리하고, 추후 부족한 부분들을 위의 검색결과로 나온 문서들을 활용하여 보완하도록 하겠습니다

<iframe width="560" height="315" src="https://www.youtube.com/embed/A2vEazcfJ7U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

내용을 정리하기전 구체적인 목표는 다음과 같습니다

1. django-webpack-loader 의 설치 및 이해
2. node_modules 와 static 의 관계를 이해
3. vue, axios, apexchart, bootstrap 이 상호 작동 가능한 setting 만들기

그럼 시작해 보겠습니다. 

[추가로 잘 정리된 페이지](https://scotch.io/bar-talk/build-an-app-with-vuejs-and-django-part-one)

<br/>
# to do List

1. Django - simple page
2. webpack, webpack-dev-server
3. js 폴더를 webpack 으로 대체하기
4. css 폴더를 webpack 으로 대체하기
5. babel, react
6. react-hot-loader 연결

# 1 Django : simple page

## Start Django
```
$ django-admin startproject mysite
$ cd mysite 
$ ./manage.py startapp app      
$ ./manage.py makemigrations && python manage.py migrate
$ ./manage.py runserver
$ mkdir -p app/templates static/{js,css}
```

```
├── app
│   ├── __init__.py
│   └── templates
└── static
    ├── css
    └── js
```

## Simple Page
```
$ python manage.py startapp app
```

### mysite/settings.py
```python
INSTALLED_APPS = [
    'app.apps.AppConfig',
]
STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')] 
```
**localhost** 에서 작업을 할 때 에는 `STATICFILES_DIRS` 의 이름을 갖는 `tuple, list` 객체를 정의해야 하고, **서버에서 작업할 때는** `STATIC_ROOT = os.path.join(BASE_DIR, 'static')` 로 특정을 해야 합니다
{: .notice--info}

### mysite/urls.py
```python
from app.views import HomeView
urlpatterns = [
    path('', HomeView.as_view(), name='home')
]
```

### app/views.py
```python
from django.views.generic import TemplateView

class HomeView(TemplateView):
    template_name = 'home.html'
```

### app/template/home.html
```html
{ % load static % }
안녕! <span id="name"></span>
<div id="counter"></div>
<script src="{ % static 'js/index.js' % }"></script>
```

### static/js/index.js
```javascript
const name = document.getElementById('name');
const counter = document.getElementById('counter');
let count = 0;

name.innerText = '여러분';
setInterval(()=> counter.innerText = ++count, 1000);
```

# 2 WebPack

'안녕 여러분' 이 뜨고, 아래서 숫자가 카운트 되는 장면을 볼 수 있습니다. 그러면 이제 webpack 을 설치하고 연결해 보겠습니다

## npm 시작하기 
```
$ npm init -y
$ npm i webpack webpack-cli --save
```
`$npm install` 대신에 `$npm i` 를 사용해도 잘 작동합니다. 이런 축약어들을 이해하며 보완해 나아갑니다.
{:notice--info}

## package.json
npm으로 설치된 webpack 을 사용하여 django를 build 하기 위해 다음과 같이 수정한 다음  `$ npm run build` 를 실행합니다
```javascript
{
  "name": "Webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build":"webpack", // 사용자 추가내용
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "webpack": "^4.28.2",
    "webpack-cli": "^3.1.2"
  }
}
```
```
$ npm run build

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
```
`The 'mode' option has not been set` 과 같은 오류 메세지를 출력합니다. 이는 webpack 에 대한 설정 내용이 없기 때문에 발생한 오류로써 설치한 webpack 을 활성화 하기 위한 작업을 시작합니다

## webpack.config.js
`webpack.config.js` 설정파일을 다음과 같이 작성하고 `$ npm run build` 를 실행하면 정상적으로 빌드가 완료됨을 보실 수 있습니다

```javascript
module.exports = {
  mode : 'development',
  entry : './static/js/index.js',
}
```
```
Hash: 145af487c9a74c2f5fbe
Version: webpack 4.28.2
Time: 94ms
Built at: 2018. 12. 28. 오후 4:13:43
  Asset   Size  Chunks             Chunk Names
main.js  4 KiB    main  [emitted]  main
Entrypoint main = main.js
[./static/js/index.js] 193 bytes {main} [built]
```
```
├── dist
│    └── main.js
├── app
└── static
```
빌드가 완료되면 위와같이 `./dist` 폴더 내용이 추가된 모습을 보실 수 있습니다. `$ less ./dist/main.js` 로 내용을 살펴보면 다음과 같이 javascript 내용이 단일한 파일로 빌드된 내용을 보실 수 있습니다
```javascript
eval("const name = document.getElementById('name');\nconst counter = document.getElementById('counter');\nlet count = 0;\n\nname.innerText = '여러분';\nsetInterval(()=> counter.innerText = ++count, 1000);\n\n\n//# sourceURL=webpack:///./static/js/index.js?");
```

## static
빌드된 내용으로 django를 구현해 보겠습니다.

### setting.py
```python
STATIC_URL = '/static/'
STATICFILES_DIRS = ['dist']
```
### app/template/home.html
```html
안녕! <span id="name"></span>
<div id="counter"></div>
<script src="{ % static 'main.js' % }"></script>
```

