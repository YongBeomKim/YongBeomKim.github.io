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

이들을 연결하여 원하는 환경에서 작업이 원할하도록 내용을 정리하는 것이 목적입니다. 앞에서 정리한 내용의 한계는 **django-webpack-loader**가 없는 환경에서 webpack-dev-server 를 구현하는 내용이 빠져있어서 django 의 content 객체를 다룰때의 내용을 정리할 필요가 있습니다.

# package.json

```javascript
  "scripts": {
    "build": "webpack --config webpack.config.js --progress --colors --mode development",
    "watch": "webpack --config webpack.config.js --watch --mode development",
    "test": "echo \"Error: no test specified\" && exit 1",
    "start:dev": "webpack-dev-server"
  },
```

package.json 내부에 위와같은 내용은 `$ npm run build` 와 같이, 터미널에서 실행하는 명령들을 스크립트로 요약하여 정의한 것입니다. 해당 내용들이 실행안되면 위의 내용을 수정하면 됩니다.















바로 앞에서 **nodemon webpack-dev-server** 환경과, **Django 의 Backhand** 를 연결하여 동적인 개발 환경을 실습하였습니다. 이번에는 django **django-webpack-loader** 의 **webpack bundle** 파일을 만들어 배포가능한 환경을 구성하는 방법을 정리해 보겠습니다. 

[React & webpack-loader](https://medium.com/uva-mobile-devhub/set-up-react-in-your-django-project-with-webpack-4fe1f8455396) 

[webpack Setting](https://gist.github.com/genomics-geek/81c6880ca862d99574c6f84dec81acb0)

[Vue3 Django](https://medium.com/@rodrigosmaniotto/integrating-django-and-vuejs-with-vue-cli-3-and-webpack-loader-145c3b98501a)<br/>
[React Django](https://medium.com/labcodes/configuring-django-with-react-4c599d1eae63)<br/>

앞의 간단한 JavaScript 와 CSS 예제를 사용하여, Django 의 django-webpack-loader 와 webpack-dev-server 를 HMR로 연결하는 방법을 정리해 보겠습니다. <strike>그런데 이러한 연결이 중요한것이 아니라 작업이 중요한데도 나중의 복잡성 때문에 너무 정체된 문제가 있다는 점 꼭 유의하자!! first thing to do First!!</strike>


webpack-bundle-tracker 와 django 를 연결하여 HMR 모드로 개발가능한 환경을 구축하는 것!! 이것이 작업의 주된 목적이다.

https://medium.com/@michealjroberts/part-1-integrating-django-2-vue-js-and-hot-webpack-reload-setup-387a975166d3