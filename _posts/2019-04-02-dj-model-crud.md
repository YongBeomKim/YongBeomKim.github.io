---
title : Django Model - CRUD
last_modified_at: 2019-04-02T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django.jpg
categories:
  - django
tags: 
    - model
    - django
toc: true 
---

정의된 모델을 사용자가 용이하게 다룰수 있도록 구조를 설계하는 단계가 CRUD, Create, Read, Update, Delete 단계 입니다.

Django 의 GenericView 로 구현이 가능하지만, **기능별 URL, HTML 페이지를** 필요로 하여 작업의 효율성이 낮아집니다.

이들을 1개의 페이지, 또는 다양한 상황별 적용을 위해서는
1. 개별 views.py 함수를 만들고
2. **JQuery** 의 **Ajax** 를 활용하여
3. 개별 페이지의 내용을 한개의 HTML로 묶는다

위의 방식을 활용하면, GenericView 를 통한, 다양한 조합이 구현 가능합니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/dj-admin.png">
  <figcaption>Django 의 Admin 페이지</figcaption>
</figure>

<br/>
# **Form**
web 에서 전달값은 **request** 객체로 서버에 전송됩니다
1. **request.META :** 사용자 정보 연결객체
2. **request.GET :** url GET 정보 연결객체
   1. **request.GET['q'] :** get Query 값 연결객체 