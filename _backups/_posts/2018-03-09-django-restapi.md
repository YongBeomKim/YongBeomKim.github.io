---
title : django Restful API 사용하기
last_modified_at: 2018-03-08T13:45:06-05:00
categories:
  - django
tags: 
    - django
    - python
    - restful
toc: true
---

## Django 기본적 설정 

```sql
$ python manage.py startapp games
```

```python 
# settings.py 에 설정 연결
'rest_framework',
'앱.apps.앱config', # 축약 버젼도 가능 
```


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



