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

## 관계형 DataBase의 직렬화 역직렬화
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
    # 사용자 필드를 추가
    games = serializers.HyperlinkedRelatedField(
        many = True,
        read_only = True) # 읽기전용

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


class PlayerSerializer(serializers.HyperlinkedModelSerializer):
    # 외부 PrimaryKey 의 serilaize 클래스를 연결합니다
    scores = ScoreSerializer(many=True, read_only=True)
    # Player.GENDER_CHOICES 의 내용을 사용하여 필드를 구성
    gender = serializers.ChoiceField(
        choices = Player.GENDER_CHOICES)
    # get_필드명_display 를 사용하여 새로운 필드를 추가합니다
    gender_description = serializers.CharField(
        source = 'get_gender_display', 
        read_only = True)

    class Meta:
        model = Player
        fields = ('url','name','gender',
            'gender_description','scores',)
```

## views.py
`serializer.py` 에서 직렬화, 역직렬화 클래스를 정의한 뒤, 이를 **Template** 로 출력하기 위한 **views.py** 함수를 구현하는 3가지 방법을 설명하고 있습니다
1. **JSONRender(), JSONResponse()** 를 사용한 사용자 함수 
2. `@api_view` 데코레이터의 활용 
3. `rest_framework.views.APIView` 의 **클래스 기반 뷰** 
```python
# 조회용 Genegric 클래스
class Generic_List(generics.ListCreateAPIView):
    queryset = 모델클래스.objects.all()
    serializer_class = Rest 시리얼 함수
    name = 'url 사용할 이름'

# Get, Post, Put, Delete 모두 지원하는 클래스
class Generic_Detail(generics.RetrieveUpdateDestroyAPIView):
    ...

# 위에서 생성한 4개의 재너릭뷰 Root 클래스
class ApiRoot(generics.GenericAPIView):
    name = 'api-root'
    def get(self, request, *args, **kwargs):
        return Response({
            '테이블1': reverse(Generic_List.name, request=request),
            '테이블2': reverse(Generic_Detail.name, request=request),
            })
```

<br/>
# 3장 : API 인증 향상과 추가기능

## 페이지 나누기
### settings.py [(Doc)](https://www.django-rest-framework.org/api-guide/pagination/#using-your-custom-pagination-class)

아래와 동일하기 설정을 하면, 한개의 페이지에 출력할 갯수가 제한됩니다. `http://localhost:8000/games/?offset=1` 과 같은 방식으로 GET Query 문인 **?offset=1** 를 사용하여 구분 페이지를 출력합니다.
```python
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 3  # 기본값은 "None" (무제한) 입니다
}
```
숫자는 1에서 시작합니다. 데이터 내용이 많은경우 List 페이지를 열면 모든 데이터를 호출하느라 rack 이 걸리는 경우가 많은데, 위와같은 설정을 통해서 서버의 무리한 요청을 제한하는 효과가 있습니다.
{: .notice--info}

쿼리문에서 `http://localhost:8000/games/?limit=1&offset=1` 과 같이 **limit=1** 을 사용하면 제약조건의 숫자를 변경할 수 있습니다.
{: .notice--info}

## 인증, 권한 그리고 스로틀링 [(Doc)](https://www.django-rest-framework.org/api-guide/authentication/)

**settings.py** 에서 위의 설정내용에 덧붙여서 다음의 내용을 추가합니다. 
```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    )
}
```

