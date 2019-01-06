---
title : django-webpack-loader in Django
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

바로 앞에서 **nodemon webpack-dev-server** 환경과, **Django 의 Backhand** 를 연결하여 동적인 개발 환경을 실습하였습니다. 이번에는 django **django-webpack-loader** 의 **webpack bundle** 파일을 만들어 배포가능한 환경을 구성하는 방법을 정리해 보겠습니다. 

[React & webpack-loader](https://medium.com/uva-mobile-devhub/set-up-react-in-your-django-project-with-webpack-4fe1f8455396) 

[webpack Setting](https://gist.github.com/genomics-geek/81c6880ca862d99574c6f84dec81acb0)

[Vue3 Django](https://medium.com/@rodrigosmaniotto/integrating-django-and-vuejs-with-vue-cli-3-and-webpack-loader-145c3b98501a)<br/>
[React Django](https://medium.com/labcodes/configuring-django-with-react-4c599d1eae63)<br/>

앞의 내용에 django-webpack-loader 로 적용하는 중간과정을 정리해 보겠습니다..
Start!!..