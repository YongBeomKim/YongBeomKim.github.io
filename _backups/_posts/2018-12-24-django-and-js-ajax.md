---
title : Django Ajax Axios 그리고 Javascript
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

Django 에서 기본은 DataBase 의 Object를 활용하는 방법이고, 추가적으로 form 에서의 csrf 등의 기능을 익히면서 능력키를 치운다면 보다 다양하고 동적인 작업에 있어서 궁극적인 확장가능한 방법은 **비동기 통신** 의 구현이라 할 수 있습니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/photo/django-ajax-comic.png">
  <figcaption>Django 에서 구현하는 Ajax 개념도</figcaption>
</figure> 

DataBase 는 **QuerySet**, 외부 데이터(크롤링, 파일 불러오기) 는 **json.dumps()** 로 content 객체 또는 **JsonResponse()** 를 사용하여 **외부 API** 생성된 결과를 Template로 연결하였습니다.

두번째 **외부 API** 포인트를 활용하면, **Ajax** 구현에도 도움이 되는데, [HighChart](https://simpleisbetterthancomplex.com/tutorial/2018/04/03/how-to-integrate-highcharts-js-with-django.html) 등에서는 **Jquery**를 사용한 **Ajax** 구현의 예제를 학습하였습니다.

**Jquery**의 한계가 존재하므로, **Vue.Js**를 사용하기로 결정하였고 이를 위해서 **Vue.router** 는 지원이 제한적이여서 **Axios**를 사용하기를 공식적으로 권장하고 있습니다. 때문에 별도로 이를 익혀야 하는데, 추가적으로 **CSRF** 보안을 사용하는 방법을 [StackOverFlow](https://stackoverflow.com/questions/49477585/django-react-axios) 에서 보는등 중간에 끼어든 내용들이 많아졌습니다.

이를 정리하자면 django 객체를 Template 전달방법으로 **Straight, json API** 가 있는데..

1. django 에서 **json.dumps(), JsonResponse()** 로 객체 전달하기
2. **{ { } }** 또는 **Axios** 로, 전달객체를 Template에서 받기
3. 객체 전달시 **[csrf](https://stackoverflow.com/questions/49477585/django-react-axios)** 보안의 적용
4. 추후 Django 에서의 **RestfulAPI** 활용한 컨트롤

이를 모두 정리하면 어떠한 내용이라도 자유자재로 객체를 전달하고 활용이 가능할 것입니다.

<br/>
# **Axios**

1번은 앞에서 이미 다루었기 때문에, 이번 페이지 에서는 **Vue의 확장을 위한 Axios** 사용법 및 간단한 예제를 정리해 보겠습니다.

