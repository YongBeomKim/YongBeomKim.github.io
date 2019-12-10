---
title : Django 3.0 Release
last_modified_at: 2019-12-03T10:45:06-05:00
header:
  overlay_image: /assets/images/django/django-rest-3.jpg
categories:
  - django
tags: 
    - django
    - rest
---


**Sklearn** 등의 학습데이터를 활용한 **[Restful API Server](https://honeyteacs.tistory.com/6)** 실습 내용을 정리해 보겠습니다. 작업방법은 **1. JQuery API 활용한 Ajax 2. Django restful API** 로 나뉘어 집니다. 

작업에서 구현할 내용으로는 
1. **sklearn** 학습 내용은 **form.post** 로 받은 값을 바탕으로 출력
2. **Django REST framework** 프레임 워크의 활용

React 관련 내용을 찾아보니 **[Django REST framework](https://this-programmer.com/entry/%EA%B0%84%EB%8B%A8%ED%95%9C-react-JS-Django-%EC%96%B4%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EB%A7%8C%EB%93%A4%EA%B8%B0)** 을 [활용한 내용](https://medium.com/wasd/restful-api-in-django-16fc3fb1a238) 이 많았습니다. 사용자도 많고 commit 수도 많은만큼 협력작업을 진행하는데 있어서 큰 도움이 될 것으로 생각되어 정리해 보겠습니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/django/django-rest.jpg">
  <figcaption>Build Django REST Framework</figcaption>
</figure>





<br/>

# **참고 사이트**

**[Django restful api](https://medium.com/wasd/restful-api-in-django-16fc3fb1a238)**


<br/>

# Install & Django 

```r
$ pip install djangorestframework markdown django-filter
$ pip install django-cors-headers
```





**Django 3** 가 배포되었습니다. 간단하게 사용해본 결과 비교적 가볍고 빠르게 설치 및 작동되는 모습을 보여줬습니다. **Django 3.2** 부터는 상당부분을 비동기로 처리가 가능하지만, Document 들이 아직 부족해서 필요한 기능들에 대해 수정 및 보완이 필요 합니다.

추천되는 Process 는 우선은 **Django 2.2** 를 사용하여 필요한 기능들을 추가 및 작업을 하고, 원하는 기능들이 명확하게 정리가 된 후, **Django 3.0** 으로 컨버팅을 통해서 필요한 내용들의 문법 및 기능 차이를 구분 및 적용/ 학습하는 과정으로 진도를 진행 합니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/django/release-roadmap.png">
  <figcaption>https://static.djangoproject.com/img/release-roadmap.688d8d65db0b.png</figcaption>
</figure>

**[Django 3.0 공식 릴리스 문서](https://docs.djangoproject.com/en/dev/releases/3.0/)**

**[Django 3.0 공식 릴리스 문서 (한글)](https://www.44bits.io/ko/post/django-3-0-release-note-summary)**

