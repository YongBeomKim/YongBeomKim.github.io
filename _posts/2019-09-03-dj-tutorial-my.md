---
title : Django Tutorial - mine
last_modified_at: 2019-09-03T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django.jpg
categories:
  - django
tags: 
    - django
    - tutorial
---

**금융분석** 과 **머신러닝** 및 **자연어 분석** 등의 작업은 input 데이터와 Output 내용이 명확해서 작업 flow 찾기에 용이하지만, **Django** 작업은 결과물 최종형태가 불분명 하고, 작업들 과정에도 겹치거나 불필요한 부분이 상이해서 작업 계획이 막연한 단점이 있습니다.

그동안 정리한 여러 내용을 바탕으로, 단일한 작업 flow 목차 위에서 내용들을 정리 해 보겠습니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/project/dual_boot.jpg">
</figure>

<br>

# 간단정리

전체 작업내용을 간단하게 서술해 보면.

1. Model
2. Model & Views.py
3. urls.py
4. HTML Template (extend, include)
5. Admin Filters
6. Generic View & requests Form
7. message

1. Static Files & Media Folder
2. javascript WebPack
3. Rest API
4. wsgi & Gunicorn Server Setting

template 에서 javascript 호출은 cdn 호출이 효과적입니다. 서버 부담을 최소가 되고 사용자에게 전달 되기 때문입니다. 호출 내용은 Base.html 를 재활용 하는 방식으로 효율을 높입도록 합니다. [Django Girls 템플릿 확장하기](https://tutorial.djangogirls.org/ko/template_extending/)
{: .notice--info}

1. Model & ORM 
2. Model Manager & filters
3. [Signal](https://yongbeomkim.github.io/django/dj-model-tips/)

4. web Site 01 : WEB Blog
5. web Site 02 : Heriacle Blog


<br>

# 참고 사이트

[Real Python](https://realpython.com/tutorials/django/)