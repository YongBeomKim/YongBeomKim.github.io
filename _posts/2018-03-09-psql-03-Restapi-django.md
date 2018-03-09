---
title : PostgreSQL 03 - Django에서 Restful API 활용
last_modified_at: 2018-03-08T13:45:06-05:00
tags: 
    - postgresql
    - django
    - python
    - restful
toc: true
---

- 모델 직렬화기를 사용하여 중복코드 제거하기
- parsing & render 옵션 사용과 JSON
- postgresql 과 대화관계 설정
<출처>  RESTful 파이썬 웹 서비스 제작 


## Django ModelView를 활용한 직렬화기 설계
### serializer.py 
- 모듈을 활용하여 새롭게 정의한다

**Note:** `from rest_framework import serializers.ModelSerializer`를 활용하면, **CRDU** Method를 자동으로 구현<strike>참 쉽죠??</strike>
{: .notice--info}


```python
from rest_framework import serializers
from .models import Game

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id','name','release_date','game_category','played')
```


### views.py 내용수정 
- API 뷰를 작성하기 위한 Wrapper 작업

```python
# views.py

from django.shortcuts import render

# Create your views here.

from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Game
from .serialilzers import GameSerializer

# @api_view : HTTP 동사 리스트를 출력한다
@api_view(['GET','POST'])
def game_list(request):
    if request.method == 'GET':
        games = Game.objects.all()
        games_serializer = GameSerializer(games, many=True)
        return Response(games_serializer.data)

    elif request.method == 'POST':
        games_serializer = GameSerializer(data=request.data)
        if game_serializer.is_valid():
            games_serializer.save()
            return Response(games_serializer.data, status=status.HTTP_201_CREATED)
        return Response(games_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','POST'])
def game_detail(request, pk):
    try:
        game = Game.objects.get(pk=pk)
    except Game.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        game_serializer = GameSerializer(game)
        return Response(game_serializer.data)

    elif request.method == 'PUT':
        game_serializer = GameSerializer(game, data=request.data)
        if game_serializer.is_valid():
            game_serializer.save()
            return Response(game_serializer.data)
        return Response(game_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        game.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
```


### models.py
- PostgreSQL 와 대화하는 API를 위해 상속관계를 다양하게 정의한다

**Note:** (related_name = '객체명') : **역방향 관계에 사용할 객체명**으로 이름을 설정하지 않으면 `객체명.map_set` 를 활용한다 [출처](https://stackoverflow.com/questions/2642613/what-is-related-name-used-for-in-django)
{: .notice--info}


```python

from django.db import models

# category 클래스를 정의 (pk, name 열만 생성)
class GameCategory(models.Model):
    name = models.CharField(max_length=200)
    class Meta: 
        ordering = ('name',)
    def __str__(self): 
        return self.name


# Game 클래스를 정의
class Game(models.Model):
    created       = models.DateTimeField(auto_now_add=True)
    name          = models.CharField(max_length=200)

    # models.ForeignKey() : 다대일 관계로 GameCategory 의 자식 테이블로 설정
    game_category = models.ForeignKey(GameCategory,
                                      related_name = 'games',
                                      on_delete    = models.CASCADE)
    release_date  = models.DateTimeField()
    played        = models.BooleanField(default=False)

    class Meta:
        ordering = ('name',)

    def __set__(self):
        return self.name


class Player(models.Model):
    MALE    = 'M'
    FEMALE  = 'F'
    GENDER_CHOICE = ( (MALE,   'male'),
                      (FEMALE, 'Female'),)
    created = models.DateTimeField(auto_now_add=True)
    name    = models.CharField(max_length = 50, blank = False, default = '')
    gender  = models.CharField(max_length = 2,  
                               choices = GENDER_CHOICE, default = MALE,)
    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name


class PlayerScore(models.Model):
    Player     = models.ForeignKey(Player, 
                                   related_name = 'scores', 
                                   on_delete = models.CASCADE)
    game       = models.ForeignKey(Game, on_delete=models.CASCADE)
    score      = models.IntegerField()
    score_date = models.DateTimeField()

    class Meta:
        ordering = ('-score',)
```



## PSQL 의 DATABASE 만들기

```sql
# psql 접속
$ sudo -u postgresql psql   

# DATABASE 만들기
postgres=# CREATE DATABASE games;

# 접속가능한 사용자 만들기
games=# CREATE ROLE  사용자명  WITH LOGIN PASSWORD  '비번';
CREATE ROLE
games=# GRANT ALL PRIVILEGES ON DATABASE games  TO  사용자명;
GRANT
games=# ALTER USER  사용자명  CREATEDB;
ALTER ROLE
games=# DROP USER 사용자명;
DROP ROLE
games=# \q
```

Django ModelView를 활용한 직렬화기 


## Dango 에서 직렬화, 역직렬화 관리


### 1 models.py 설정

```python
class Game(models.Model):
    created      = models.DateTimeField(auto_now_add = True)
    name         = models.CharField(max_length=200, blank=True, default='')
    release_date = models.DateTimeField()
```


### 2 serializer.py 설정

```python
from rest_framework import serializers
from .models import Game

class GameSerializer(serializers.Serializer):
    pk            = serializers.IntegerField(read_only=True) # pk를 추가 
    name          = serializers.CharField(max_length=200)
    release_date  = serializers.DateTimeField()

    # validated_data : 유효한 인자를 전달받는다
    # create를 별도의 함수를 설정
    def create(self, validated_data):
        return Game.objects.create(**validated_data)

    # instance       : 기존 인스턴스
    # validated_data : 새로운 유효 데이터를 받는다
    # 새로운 객체를 기존 인스턴스 공간하 overwrite 후 저장
    def update(self, instance, validated_data):
        instance.name          = validated_data.get('name',          instance.name)
        instance.release_date  = validated_data.get('release_date',  instance.release_date)
        instance.save()     # .save()로 SQL 저장
        return instance
```


### 3 python django Shell로 확인

```python
# 직렬화 : Python 객체 --> DB 자료저장
from datetime import datetime
from django.utils import timezone
from games.models import Game

gamedatetime = timezone.make_aware(datetime.now(),timezone.get_current_timezone())
game1 = Game(name = 'Smurfs Jungle', release_date = gamedatetime)
game1.save()

# 역직렬화 01 : DB객체 --> Python
from games.serializers import GameSerializer```
from rest_framework.renderers import JSONRenderer

game_serializer1 = GameSerializer(game1)
renderer         = JSONRenderer()
rendered_game1   = renderer.render(game_serializer1.data)
In [1]: game_serializer1.data
Out[1]: 
ReturnDict([('pk', 1),
            ('name', 'Smurfs Jungle'),
            ('release_date', '2018-03-08T06:24:50.704086Z')])


# 역직렬화 02 : {dict}객체 --> Python
from django.utils.six import BytesIO
from rest_framework.parsers import JSONParser

json_string_for_new_game = '{"name":"Tomb Raider Extreme Edition",
                             "release_date":"2016-05-18T03:02:00.776594Z"}'
json_bytes_for_new_game = bytes(json_string_for_new_game, encoding="UTF-8")
stream_for_new_game     = BytesIO(json_bytes_for_new_game)
parser                  = JSONParser()
parsed_new_game         = parser.parse(stream_for_new_game)
In [2]: parsed_new_game
Out[2]: 
{'game_category': '3D RPG',
 'name': 'Tomb raider',
 'played': 'false',
 'release_date': '2018-02-12T03:02:22.778894Z'}


# 메모리 인스턴스를 DATABASE에 저장 
new_game_serializer = GameSerializer(data=parsed_new_game)
In [3]: if new_game_serializer.is_valid():  # 유효성 검사 : true 값 필요
    ...:     new_game = new_game_serializer.save() # 이후, DATABASE 저장   
    ...:     print(new_game.name)
Tomb raider
```


### 4 views.py 작성 : API View 작성 (Html로 Restful출력)

```python
from django.shortcuts import render
# Create your views here.

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework import status
from .models import Game
from .serialilzers import GameSerializer


# 문자열을 HTTP 응답으로 출력한다
class JSONResponse(HttpResponse):

    # JSONResponse 클래스 출력형식을 제어
    # 1) render 수신 데이터를 JSON 렌더링 후
    # 2) 반환된 Byte문자열을 content에 담는다
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


# @csrf_exempt : 요청 위조쿠키를 설정
# game_list    : objects 객체를 모두 나열
# request 가 'GET/ POST' 따른 개별함수를 정의
@csrf_exempt
def game_list(request):
    # GET 전달시 : 모든 list를 출력
    if request.method == 'GET':
        games = Game.objects.all()

        # many = True : GameSerializer(역직렬화 함수)에서
        #               여러 인스턴스를 직렬화 한다
        games_serializer = GameSerializer(games, many=True)
        return JSONResponse(games_serializer.data)

    # POST 전달시 : JSON 요청 데이터를 DB에 저장
    # game_data   : JSON 전달객체를 변수에 저장
    elif request.method == 'POST':
        game_data = JSONParser().parse(request)
        game_serializer = GameSerializer(data = game_data)
    if game_serializer.is_valid():
        game_serializer.save()
        return JSONResponse(game_serializer.data, status=status.HTTP_201_CREATED)
    return JSONResponse(game_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# game_detail : 기존 자료들을 '인스턴스'에 호출 
# views.py에서 Get, Put, Delete 작업을 정의한다
# request 가 'GET/ PUT' 별로 함수를 정의한다
# DB 에서 'pk'에 해당되는 튜블을 추출
@csrf_exempt
def game_detail(request, pk):
    try:
        game = Game.objects.get(pk=pk)
    except Game.DoesNotExist:
        return HttpResponse(status= status.HTTP_404_NOT_FOUND)

    # GET 방식 : game 데이터를 '역직렬화' 출력 
    if request.method == 'GET':
        game_serializer = GameSerializer(game)
        return JSONResponse(game_serializer.data)

    # PUT 방식 : UPDATE DATA
    elif request.method == 'PUT':
        game_data       = JSONParser().parse(request)
        game_serializer = GameSerializer(game, data=game_data)
        if game_serializer.is_valid():
            game_serializer.save()
            return JSONResponse(game_serializer.data)
        return JSONResponse(game_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE 방식 :
    elif request.method == 'DELETE':
        game.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
```



