---
title : Beautiful Front Vue.js & Django
last_modified_at: 2019-01-06T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django_vue.jpg
categories:
  - django
tags:
    - vue
    - django
---

지금까지 Django 에서 Webpack 연결 및 Vanila.Js CSS 의 번들연결까지 완성을 했다면, 이번부터는 Django Webpack 을 활용한 Vue.js 의 연결에 대해서 정리해 나아가겠습니다.

그 첫번째 시간으로 비록 2년전의 자료이긴 하지만, Django 와 Vue 의 연결에 대한 약 20분의 세미나를 정리해 보려고 합니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/C7oiYr4_NdU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>

<br/>
# Introduction

## Django and Vue
Django 와 Vue.js 의 관계는 **MVC**(model, view, controller) 에서 **View** 의 Template 의 Single Webpage Application 일부분으로써 위치를 합니다.

## How to Combine the Two?
1. Django 의 views.py 객체중 **content** 를 사용해서
2. interact API 를 만들어서
3. Django Rest API

## Template Example

### django/template.html
```html
{% raw %}
{% extends 'base.html' %}
    <div v-for="job in jobs" class="job container">
        <div class="col-sm-12">
            <h3>[[ job.jobtitle ]]</h3>
        </div>
        <div class="col-sm-12">
            <p>[[ job.description ]]</p>
            <button class="btn" v-on:click="removeJob($index)">삭제</button>
        </div>
    </div>
{% block content %}
{% endraw %}
```
### vue/vue.vue
```javascript
Vue.config.delimiters = [ "[[", "]]" ]
```

## Django REST API
Model 의 직렬화 함수를 만들고, 이를 사용하여 endpoint url 로 구조화 합니다. 위의 3가지중 추천하는 방법으로 **intergrate** 에 용이하고, 문서들이 잘 되어 있으며, **Json, Xml** 등 다양한 포맷을 지원합니다

### Step 1 : 모델 직렬화(Serialise) 함수
**./django/serializers.py**
```python
from .models import JobList
from rest_framework import serializers

class JobsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = JobList
        fields = ('jobtitle', 'jobdescription', 'postdate')
```

### Step 2 : 직렬화 함수 EndPoint
**./django/views.py**
```python
from .models import JobList
from rest_framework import viewsets
from .serializers import JobsSerializer

class JobsViewSet(viewsets.ModelViewSet):
    queryset = JobList.objects.all()
    serializer_class = JobsSerializer
```

### Step 3: API 라우터 정의
**./django/urls.py**
```python
from django.conf.urls import path, include
from django.contrib import admin
from rest_framework import routers
from .views import job_list, JobViewSet

router = routers.DefaultRouter()
router.register(r'job', JobsViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', job_list),
    path('api/', include(router.urls)),
]
```

### Step 4 : EndPoint 데이터를 Vue.js 에서 호출합니다
**./django/template/vue.js**
```javascript
ver demo = new Vue({
    el: '#app',
    data: {
        'apptitle' : '장고와 Vue.js의 만남',
        'jobtitle' : '',
        'jobdescription' : '',
        'jobs' : [],
    },
    ready: function()
        {this.$http.get('http://localhost:8000/api/jobs/')
             .then(function(response){
                this.jobs = response.data;
            },
            function (response) {
                console.log('response');
            });
        }
    });
```

## 장점
1. frontend 의 JavaScript를 간결하게 할 수 있다
2. 런닝커브를 줄일 수 있다 <strike>(py, dj, js를 쌩으로 구현시와 비교)</strike>
3. 다양한 프레임워크로 대체가 용이하다

## 단점
1. 규모에 상관없이 Set Up 위한 일정량이 필요
2. 거대한 프로젝트에서는 복잡해 질 수 있다
3. Webpack 을 설정하기 어렵다 <strike>그거 하느라 죽는줄 알았어..</strike>

<br/>
# 참고사이트
[GitHub Source](https://github.com/andrewm89/djangovuejs.git)<br/>
