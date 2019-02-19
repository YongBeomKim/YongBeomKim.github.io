---
title : 웹 서비스 코딩하기 1 - Setting
last_modified_at: 2019-02-16T10:45:06-05:00
header:
  overlay_image: /assets/images/project/service.jpg
categories:
  - service
tags: 
    - service
    - plan
---

# **디자이너 개발자의 웹기획 및 웹개발**

## 데이터 흐름 정의하기
Django 에서 Back-hand 와 Front-hand 에서 **어떻게 데이터를 구조화** 할 것인가에 대해서 개념정의를 분명하게 해야 합니다. 이러한 토대 위에서 최적화/ 모듈의 추가/ Style의 정의와 같은 작업들을 단계별로 접근해 나아가야만, **전체적인 구조가 흔들리지 않으면서, 다양한 시도들을 견고하게 구현할 수 있습니다.**

그리고 고민하는 부분이 구현 기술인데, 가장 손쉬운 **직렬화 (Json.dump), Serializer (Django 미들웨어), Restful API (django-restful)** 구조화 등의 방법이 있습니다. 최근에는 Graph-gl 을 사용하는 방법들도 논의되고 있지만 이번에는 제외하도록 하겠습니다. <strike>잘 몰라서 그러는거 아냐? 맞습니다 맞구요~</strike>

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/project/menu-rdb.jpg">
  <figcaption>초기 ERD 구조화 작업내용</figcaption>
</figure>

위 예제는 객체 지향적인 구분없이 1개의 덩어리로 구조화가 되어 있다. 이러한 경우에는 1개의 필드에 문제가 생기면 전체적인 흐름에 문제가 생길 수 있어서 안전성이 떨어집니다. 

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/project/ia-table-work.jpg">
</figure>

앞에서 정의한 **Information Architecture 초안을** 바탕으로 개별 APP 에서 필요로 하는 데이터를 구체화 하는 과정이 필요합니다. 이 단계에서 **Jupyter Notebook** 을 사용하여 파이썬 함수와 모듈을 제작합니다. 그리고 예제 데이터를 통해서 **개별 Table 과 Field 개념정의서** 를 작성합니다. 

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/project/jupyter-ex.png">
  <figcaption>jupyter notebook 함수들을 구현합니다</figcaption>
</figure>

