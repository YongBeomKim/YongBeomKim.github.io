---
title : nodemon / django 와 webpack 연결 1/2 (js,css)
last_modified_at: 2018-12-12T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django_vue.jpg
categories:
  - webpack
tags: 
    - django
    - webpack
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
2. webpack
3. webpack-dev-server
4. js 폴더를 webpack 으로 대체하기
5. css 폴더를 webpack 으로 대체하기
6. babel, react
7. react-hot-loader 연결

<br/>
# 1 Django : simple page

## Start Django
```python
$ django-admin startproject mysite
$ cd mysite 
$ ./manage.py startapp app      
$ ./manage.py makemigrations && python manage.py migrate
$ ./manage.py runserver
$ mkdir -p app/templates static/{js,css}
```

```php
├── app
│   ├── __init__.py
│   └── templates
└── static
    ├── css
    └── js
```

## Simple Page
```python
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

<br/>
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
복잡한 CSS, JS 설정을 하지 않고, `./dist/main.js` 파일 한개만 불러오면 모든 작업들이 원활하게 구동하는 것을 보실 수 있습니다.
```html
안녕! <span id="name"></span>
<div id="counter"></div>
<script src="{ % static 'main.js' % }"></script>
```

<br/>
# 3 webpack-dev-server
위의 내용대로 따라하다 보면 javascript 의 내용이 바뀔 때 마다 바로 수정이 안되고, `$ npm run build` 로 `./dist/main.js` 파일을 작성한 뒤에야 갱신이 되는 불편함이 있습니다. 이를 보완하기 위한 작업을 시작합니다

## dev-server 설치
```
$ npm i -D --save webpack-dev-server
```

### package.json
```javascript
"scripts": {
    "start": "webpack-dev-server", // 내용을 추가합니다
    }
```

## webpack-dev-server 실행
```
$ npm start

｢wds｣: Project is running at http://localhost:8080/
｢wds｣: webpack output is served from /
｢wdm｣: Hash: 63e8cb6e32ca147498e5
Version: webpack 4.28.2
Time: 474ms
Built at: 2018. 12. 28. 오후 5:12:43
  Asset     Size  Chunks             Chunk Names
main.js  342 KiB    main  [emitted]  main
｢wdm｣: Compiled successfully.
```

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/webpack_dev.png">
  <figcaption>nodejs로 구현한 서버실행을 볼 수 있습니다</figcaption>
</figure> 

## django 와 webpack-dev-server 연결

### nodemon [npmjs.com](https://www.npmjs.com/package/nodemon)
nodejs 내용이 수정될 때마다 바로 갱신하는 모듈로써, npmjs 에서 본 내용 중 가장 download 수가 많은 패키지 였습니다
```
$ npm i -D --save nodemon
```

### package.json
nodemon 을 사용하여 webpack.config.js 파일이 구동되도록 설정합니다. `-w` 는 **watch 대상을** 지정하고 `-x` 는 **execute 실행대상을** 지정합니다.
```javascript
"scripts": {
    "start": "nodemon -w webpack.config.js -x webpack-dev-server",
    }
```

### settings.py
```python
# STATIC_URL = '/static/'
STATIC_URL = 'http://127.0.0.1:8080/'
STATICFILES_DIRS = ['dist']
```

## nodemon 과 django 실행
우선 `nodemon` 을 사용하여 `webpack.config.js` 를 정상적 실행되는 모습을 확인한 뒤에 `django-webpack-loader` 를 실행합니다. 그리고 이들은 별도의 창에서 실행을 해야 합니다 (물론 background 실행을 해도 됩니다)

```python
$ npm start
$ ./manage.py runserver
```

위와같이 서버를 실행한 뒤, `static/js/index.js` 의 내용을 수정하고 저장하면 바로 django 에서도 적용되는 모습을 보실수 있습니다.

이와같이 개발단계에서 이를 적극 활용하고, 추후 정리가 되면 webpack 으로 builder 를 하여 완료를 하는 방식으로 작업을 단계별 진행하면 됩니다.

### **[nodemon] Internal watch failed: watch ENOSPC**
> <small>$ sudo **sysctl** fs.inotify.max_user_watches=582222 **&&** sudo **sysctl** -p</small> 
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/enospc.png">
  <figcaption>$npm start 실행시 종종 발생하는 오류</figcaption>
</figure> 
수정과정에서 오타등이 있으면  nodemon에서 `webpack.config.js` 오류가 발생했습니다. 그리고 내부에 자바스크립트의 주석처리를 하면 오히려 오류가 발생하는등 작업에 유의해야 합니다. 그리고 설정이 제대로 되었어도 npm과 django 실행 환경에 따라 `[nodemon] Internal watch failed: watch ENOSPC` 사진과 같은 오류가 발생합니다.

이는 최대 실행가능한 포트의 숫자가 제한되어 발생하는 오류로써 터미널에서 다음과 같이 실행하여 넉넉한 포트를 할당하면 해결이 됩니다. [stackoverflow](https://stackoverflow.com/questions/34662574/node-js-getting-error-nodemon-internal-watch-failed-watch-enospc)

## index.js 를 모듈로 구분하기

### static/js/index.js
```javascript
const name = document.getElementById('name');
const counter = document.getElementById('counter');
let count = 0;

name.innerText = 'username kim';
setInterval(()=> counter.innerText = ++count, 1000);
```

### static/js/name.js
```javascript
const name = document.getElementById('name');
name.innerText = 'username kim';
```

### static/js/count.js
```javascript
const counter = document.getElementById('counter');
let count = 0;
setInterval(()=> counter.innerText = ++count, 1000);
```

### static/js/index.js
```javascript
import './name';
import './count';
```
위와 같이 `index.js` 에서는 모듈로써 분할한 파일들이 같은 폴더내에 존재하므로 상대경로로써 동일한 경로를 특정하여 호출하면 됩니다. 그리고 뒤의 확장자인 `.js` 붙이지 않아도 정상적으로 작동하는 모습을 보실 수 있습니다.

<br/>
# 상편 마무리

django를 실행한 뒤
1. 간단한 **static** 을 이용한 javascript
2. **webpack** 을 이용한 javascript
3. **nodemon** 을 활용한 **webpack-dev-server** 로 구현한 javascript

3가지를 구체적으로 오류들과 함께 살펴보았습니다.
하편에서는 보다 고도화된 내용을 구현하도록 하겠습니다.
