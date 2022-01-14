---
title : Django RestAPI
last_modified_at: 2018-06-27T10:45:06-05:00
header:
  overlay_image: /assets/images/book/chartjs.jpg
categories:
  - js
tags: 
    - js
    - chartjs
    - django
toc: true 
---


# REST API in Django 

[github](https://github.com/codingforentrepreneurs/Django-Chart.js), [project Web](https://www.codingforentrepreneurs.com/projects/), [YouTube](https://www.youtube.com/channel/UCWEHue8kksIaktO8KTTN_zg)

<iframe width="560" height="315" src="https://www.youtube.com/embed/B4Vmm3yZPgc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


<br>
# DJango REST API

앞에서 Json 객체를 전달하는 2가지 방법을 살펴봤다면, 이번에는 REST API를 활용하여 객체를 전달하는 방법을 구현해 보도록 한다.


<br>
# REST API Base Settings

<br>
## 모듈의 설치 
<small>[정식 document](http://www.django-rest-framework.org/tutorial/1-serialization/)</small>

`pip install **djangorestframework**` <br>
`pip install **pygments**  # We'll be using this for the code highlighting`


<br>
## settings.py
`INSTALLED_APPS = ['rest_framework',]`


<br>
<br>
# App Additional Settings

<br>
## RestAPI **views.py**

<small>[http://www.django-rest-framework.org/api-guide/views/](http://www.django-rest-framework.org/api-guide/views/)
</small> 의 URL에서 **views.py**에 사용할 코드를 복사한다

```python
from rest_framework.views import APIView
from rest_framework.response import Response

class ChartData(APIView):
    authentication_classes, permission_classes = [], []

    def get(self, request, format=None):
        data = {"sales": 300, "customers" : 33}
        return Response(data)
```


<br>
## RestAPI **urls.py**

`re_path(r'^api/chart/data/$', ChartData.as_view())`

`http://localhost:8000/chartjs/api/chart/data/` 로 **RestfulAPI**를 출력한다


<br>
## RestAPI에 정보를 추가한다 

Django 등록 사용자 수를 **RestAPI**에 추가한다

```python
from django.contrib.auth import get_user_model
User = get_user_model()

class ChartData(APIView):
    authentication_classes, permission_classes = [], []

    def get(self, request, format=None):
        data = {"sales": 300, 
                "customers" : 33,
                "users" : User.objects.all().count()}
        return Response(data)
```