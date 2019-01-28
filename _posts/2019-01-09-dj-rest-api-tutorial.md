---
title : Django Restful API
last_modified_at: 2019-01-09T10:45:06-05:00
header:
  overlay_image: /assets/images/code/djrest.jpg
categories:
  - django
tags: 
    - restapi
    - django
toc: true 
---

**_Django_** 패키지들 중에서도 **django-filter**, **django-table2** 등의 모듈이 존재하지만 이들은 서버에서 작업의 한계로 인해, **Client** 및 외부연결을 위해서는 **Rest API** 를 사용해야 합니다.

<br/>
# Restful Python Web Service
2년전에 구입한 **Restful 파이썬 웹서비스** 책의 내용을 바탕으로 전반적인 내용을 정리해 보겠습니다. 당시에는 내용이 적다고 생각했었는데 여러 패키지를 다루고서 반복해본 결과 생각보다 내용이 알차게 구성되어 있음을 알 수 있었습니다.

<br/>
# 1장 : Restful API in Django

| HTTP동사  |   설명                      |
|:---------:|:---------------------------:|
| GET       | 저장된 데이터를 호출합니다  |
| POST      | 새로운 데이터를 생성합니다  |
| PUT       | 새로운 데이터를 업데이트    |
| DELETE    | 데이터를 삭제합니다         |

`serializers.Serializer` 를 사용하여 개별 메소드를 직접 작성 합니다.
```python
from rest_framework import serializers
class GameSerializer(serializers.Serializer):
    def create(self, validated_data):
      ...
    def update(self, instance, validated_data):
      ...
```
1. **models.py** : 모델을 정의합니다
2. **serializer.py** : 모델 Instance 와 Python Primitve 를 **중개하는 클래스와 함수를** 정의합니다. 여기에서 작동에 필요한 함수들을 **(CRUD)** 정의합니다.
   1. **랜더러(Renderer)/직렬화(serialize)** : Server DB 를 Json 등으로 **출력** 
   2. **파서(Parser)/역직렬화(deserialize)** : 외부 API 등의 정보를 **Server DB로 전달**
3. **views.py** : Http 요청에 따른 Json 반환함수를 Client 와 연결합니다
4. **$ sudo pip install httpie** 를 설치 후, `$ http GET :포트번호/url` 을 사용하여 http 동사에 따른 결과값 들을 터미널에서 확인합니다.

**랜더러(Renderer) :** client 가 요청한 서버의 정보를 **.data** 메소드를 사용하여 **Python Dictionary** 로 추출하고, 이를 **JSONRenderer()** 를 사용하여 최종물 바이너리 데이터로 **랜러딩** 합니다. **JSONResponse()** 에서 **many=True** 를 설정하면 여러개의 인스턴스를 한꺼번에 직렬화 합니다. 이때에 Django 내부에서는 **ListSerializer()** 를 사용합니다
{: .notice--info}

**파서(Parser) :** 입력된 데이터가 유효한지를 확인하기 위해 **.is_valid**를 호출합니다. 이 메서드에서 **True** 값을 출력하면 직렬화 함수에 접근이 가능하고. **.save** 메서드로 해당 튜플 데이터를 삽입합니다
{: .notice--info}

<br/>
# 2장 : 클래스 기반 뷰와 하이퍼링크 API

## 클래스 기반의 뷰
`serializers.ModelSerializer` 클래스를 호출하고 기타 설정내용은 `class Meta:` 로 정의를 합니다.
```python
from rest_framework import serializers
from .models import 모델클래스
class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = 모델클래스
        fields = ('필드1', '필드2','필드3' ...
```
```javascript
$ http OPTIONS :8000/games/
HTTP/1.1 200 OK
Allow: GET, OPTIONS, POST, PUT
Content-Length: 170
{
    "parses": [
        "application/json",
        "application/x-www-form-urlencoded",
        "multipart/form-data"
    ],
    "renders": [
        "application/json",
        "text/html"
    ]
}
```

## 브라우저블 API
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/restweb.png">
  <figcaption>웹 브라우저에서 구현되는 REST API</figcaption>
</figure>

## 관계형 DataBase의 직렬화 역직렬화 `serializer.py` 
### models.py
`models.ForeignKey()` 을 사용하여 관계형 모델을 정의합니다
```python
from django.db import models

class GameCategory(models.Model):

class Game(models.Model):
    category = models.ForeignKey(
        GameCategory, 
        on_delete=models.CASCADE)
```

### serializer.py
관계형으로 모델을 구성하는 경우에는 Restful API 함수는 `serializers.HyperlinkedModelSerializer` 와 `serializers.HyperlinkedRelatedField` 로 변경하여 사용합니다. 그리고 추가로 여기에서 `serializers.SlugRelatedField` 를 활용하여 고유 슬러그 속성을 활용한 읽기/쓰기 필드를 생성합니다.
```python
from rest_framework import serializers

class Serializer(serializers.HyperlinkedModelSerializer):
    games = serializers.HyperlinkedRelatedField(
        many = True,
        read_only = True)

    class Meta:
        model = 카테고리클래스
        fields = ('필드1', '필드2', '필드3', ...)

class GameSerializer(serializers.HyperlinkedModelSerializer):
    game_category = serializers.SlugRelatedField(
      queryset = 카테고리클래스.objects.all(), 
      slug_field = 'name')

    class Meta:
        model = 모델클래스
        fields = ('필드1', '필드2', '필드3', ...)
```
