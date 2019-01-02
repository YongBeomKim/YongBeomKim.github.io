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

