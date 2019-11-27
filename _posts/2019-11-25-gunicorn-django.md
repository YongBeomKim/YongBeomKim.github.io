---
title : Django Tutorial - mine
last_modified_at: 2019-11-25T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django.jpg
categories:
  - django
tags: 
    - django
    - gunicorn
---


Django 를 서버에서 설정하는 방법을 정리해 보겠습니다.


해당 IP 의 도메인은 80번 포트를 기본으로 연결 합니다. 

하지만 80번 포트는 시스템 포트로 바로 연결이 되지 않아서, 8000 번 포트등을 경유하여 접속하는 방식으로 시스템이 구성 됩니다.

방식은 

Django 서버 => Gunicorn => Nginx => 외부포트 연결

을 사용 합니다.



참고사이트

https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-centos-7

http://dveamer.github.io/backend/PythonWAS.html

https://narito.ninja/blog/detail/21/

https://cjh5414.github.io/nginx/

https://www.codns.com/b/B10-42

https://dailyheumsi.tistory.com/19

https://support.dnsever.com/hc/ko/articles/219445328-80

https://wikidocs.net/10304


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

8. Static Files & Media Folder
9. javascript WebPack
10. Rest API
11. wsgi & Gunicorn Server Setting

template 에서 javascript 는 **cdn 외부 호출** 방식이 효과적입니다. 서버 부담을 최소가 되고 사용자에게 전달 되기 때문입니다. 그리고 호출 내용을 Base.html 에 모아서  재활용 방식으로 효율을 높이도록 합니다. [Django Girls 템플릿 확장하기](https://tutorial.djangogirls.org/ko/template_extending/)
{: .notice--info}

1. Model & ORM 
2. Model Manager & filters
3. [Signal](https://yongbeomkim.github.io/django/dj-model-tips/)

1. web Site 01 : WEB Blog
2. web Site 02 : Heriacle Blog

<br>

# 참고 사이트

[Real Python](https://realpython.com/tutorials/django/)