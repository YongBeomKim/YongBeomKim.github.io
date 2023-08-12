---
title : nodemon / django 와 webpack 연결 2/2 (--hot, babel, vue)
last_modified_at: 2018-12-12T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django_vue.jpg
categories:
  - webpack
tags: 
    - webpack
    - nodejs
    - vue
toc: true 
---

상편에서는 django 에서의 **Webpack** 을 설정하고, **nodemon 과 webpack-dev-server** 를 사용하는 방법들을 익혔습니다. 이번 페이지에서는 webpack 에서 **--hot** 모듈을 설치하고 **css**까지 활용하는 방법을 익힙니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/A2vEazcfJ7U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br/>
# to do List

1. <strike>(상편) Django - simple page</strike>
2. <strike>(상편) webpack</strike>
3. <strike>(상편) webpack-dev-server</strike>
4. js 를 hot 모듈 webpack 으로 대체하기
5. css 를 hot 모듈 webpack 으로 대체하기
6. babel
7. <strike>react, react-hot-loader 연결</strike>
8. vue, vue-loader 연결

<br/>
# 4 js 를 hot 모듈 webpack 으로 대체하기

## `--hot` 설정의 활성화
앞에서 설정한 내용에서 **webpack** 의 `--hot` 설정을 추가합니다. [webpack 에서 hot의 설정](https://velopert.com/814) webpack 에 종속되는 객체들이 수정하면 바로 변경가능하도록 **webpack** 과 **dev-server** 를 실시간으로 연결해주는 옵션입니다.

### package.json
```javascript
  "scripts": {
    "start": "nodemon -w webpack.config.js -x webpack-dev-server --hot",
```

### static/js/name.js
```javascript
const name = document.getElementById('name');
name.innerText = 'username Lee Park';

if (module.hot) {
    module.hot.accept();
}
```

설정을 변경한 뒤 `$ npm start` 로 실행하고 `$ ./manage.py runserver` 를 실행하면 잘 작동하는 듯 보이지만 **크롬의** 개발자모드에서 **Preserve Log** 를 활성화 하면 다음과 같은 세부적인 오류 내용을 보실 수 있습니다.
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/console_error.jpg">
  <figcaption>크롬의 console 오류로 Preserve Log 를 체크</figcaption>
</figure> 

이는 django 는 8000 포트를 사용하지만 webpack 의 `--hot` 은 8080포트를 사용하는 엇갈리는 문제가 해결되지 않아서 발생하는 문제입니다. 이를 해결하기 위해 **webpack.js.org** 에서 설정내용을 참고합니다 [webpack.js.org](https://webpack.js.org/configuration/output/#output-publicpath)

이를 참조하여 `webpack.config.js` 파일에서 현재 내 서버에서 실행되는 webpack 설정을 django 와 연결 가능하도록 내용을 입력합니다.

```javascript
module.exports = {
  mode : 'development',
  entry : './static/js/index.js',
  output: {
    publicPath: 'http://127.0.0.1:8080/'
  }
}
```

그리고 자바스크립트 내용을 변경하고 실행하면 이제는 다른종류의 오류를 출력합니다. 이는 연결은 되었지만 보안의 이유로써 접속이 거부되었다는 내용입니다. 
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/console_error_auth.jpg">
  <figcaption>크롬의 console 오류로 Preserve Log 를 체크</figcaption>
</figure> 

이를 수정하기 위해서는 위에서 요구하는 `Access-Control-Allow-Origin header` 값을 webpack 에 추가합니다.

```javascript
module.exports = {
  mode : 'development',
  entry : './static/js/index.js',
  output: {
    publicPath: 'http://127.0.0.1:8080/'
  },
  devServer: {
    headers: {
        'Access-Control-Allow-Origin': '*', // 추가내용 
    }
  }
}
```
`'Access-Control-Allow-Origin': "*",` 에서 쌍따옴표를 사용하면 해당 오류가 해결되지 않습니다. 아마도 PHP 에서의 "" 는 string, '' 는 Raw Code 의 의미구분이 여기에서도 적용되는게 아닌가 싶습니다. **webpack 설정시에는 '' 의 단 따옴표만을** 사용하도록 주의를 하는 편이 좋습니다.
{: .notice--info}

이와같이 설정을 하면 오류가 사라진 것을 보실 수 있습니다.

### static/js/count.js
`--hot` 모듈을 사용하면 앞에서의 단일한 문자는 바로 변경되는 모습을 볼 수 있지만, **수치연산** 에서는 문제점이 발생합니다.

```javascript
const counter = document.getElementById('counter');
let count = 1000;  // 숫자를 수정하는 경우
setInterval(()=> counter.innerText = ++count, 1000);

if (module.hot) {
    module.hot.accept();
}
```

String 같은 단일한 값은 바로 update 가 되는데 반해, 연산중인 숫자값은 메모리에 남아서 기존의 연산내용이 번갈아 가며 출력되는 모습을 보실 수 있습니다. 이를 수정하기 위해서는 숫자연산 매개변수를 상수로 설정하여 완전하게 대체하도록 변경을 하고, `--hot` 설정에서도 기존의 내용을 완전히 삭제하도록 명령을 해야 합니다.

```javascript
const counter = document.getElementById('counter');
let count = 1000;
const timer = setInterval(()=> counter.innerText = ++count, 1000); 

if (module.hot) {
    module.hot.dispose(() => {
      clearInterval(timer);
    });
    module.hot.accept();
}
```
연산함수를 상수로 고정시키고, `module.hot.dispose()` 를 사용하여 객체가 변경되었을 때 중복된 객체를 삭제합니다. 비록 복잡해 보이지만지 이로써 설정을 분명하게 함으로써 보다 안정적인 운영이 가능해 집니다.
{: .notice--info}

<br/>
# 5 CSS 를 hot 모듈 webpack 으로 대체하기

## CSS 파일 Webpack 에서 사용하기
위에서 **javascript** 객체의 개발시 비동기 개발환경 설정을 설정해 보았습니다. 이러한 배경위에서 **CSS** 스타일 설정을 위한 추가적인 모듈 및 작업내용을 살펴 보겠습니다. 

### static/css/hello.css
```css
#counter {
  width:100px;
  height:100px;
  border: 2px solid lightgray;
}
```

### static/js/index.js
아래와 같이 CSS 내용을 추가하면 다음과 같은 오류가 발생합니다.
```javascript
import './name';
import './count';
import '../css/hello.css'; // 추가내용
```
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/npm_css_error.jpg">
  <figcaption>npm start 터미널 오류</figcaption>
</figure> 

## css-loader style-loader
이를 개선하기 위해서 **css-loader** 를 설치합니다
```python
$ npm i --save css-loader style-loader
```

### webpack.config.js
[css-loader](https://www.npmjs.com/package/css-loader) 의 내용을 참고하여 module 설정내용을 추가합니다. 이후 CSS 내용이 변경되면 바로 적용되는 모습을 확인할 수 있습니다.
```javascript
module.exports = {
  mode : 'development',
  entry : './static/js/index.js',
  output: {
    publicPath: 'http://127.0.0.1:8080/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  devServer: {
    headers: {
       'Access-Control-Allow-Origin': '*',
    }
  }
}
```

<br/>
# 6 babel

npmjs 에서 [babel-loader](https://www.npmjs.com/package/babel-loader) 내용을 참고로 하여 설치를 하고 **webpack.config.js** 내용을 추가합니다.

```python
$ npm install -D --save babel-loader @babel/core @babel/preset-env webpack
```

### webpack.config.js
```javascript
module.exports = {
  mode : 'development',
  entry : './static/js/index.js',
  output: {
    publicPath: 'http://127.0.0.1:8080/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  devServer: {
    headers: {
       'Access-Control-Allow-Origin': '*',
    }
  }
}
```

<br/>
# 7 Vue.js 설치 및 webpack 연결하기 
Do it Vue.js 에 나온 Webpack 설정내용을 추가해 보겠습니다. 작업에 필요한 모듈을 설치하고 다음과 같이 설정을 추가합니다.

## vue-style-loader, vue-loader, file-loader
**file-loader** [블로그](http://blog.jeonghwan.net/js/2017/05/22/webpack-file-loader.html)
```python
$ npm i --save-dev file-loader 
$ npm i --save vue vue-style-loader vue-loader vue-router
```

### webpack.config.js 
**vue** 를 추가함으로써 필요한 설정 내용을 다음과 같이 추가합니다.
```javascript
module.exports = {
  mode : 'development',
  entry : './static/js/index.js',
  output: {
    publicPath: 'http://127.0.0.1:8080/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
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
    ],
  },
  resolve:{  // 해당 파일이 어떻게 해석되는지 정의합니다
    alias :{
      'vue$': 'vue/dist/vue.esm.js' // vue 최신웹팩과 연결
    },
    extensions: ['*', '.js', '.vue', '.json']
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
