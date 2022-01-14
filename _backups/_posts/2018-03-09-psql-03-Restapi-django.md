---
title : PostgreSQL 03 - Django에서 Restful API 활용
last_modified_at: 2018-03-08T13:45:06-05:00
header:
  overlay_image: /assets/images/book/sql.jpg
categories:
  - sql
tags: 
    - postgresql
    - django
    - python
    - restful
toc: true
---

1. 모델 직렬화기를 사용하여 중복코드 제거하기
1. parsing & render 옵션 사용과 JSON
1. postgresql 과 대화관계 설정


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
```

```python
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
```

```python
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
```


```python
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
```


```python
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



## PSQL 와 Django DATABASE 관계설정

### PSQL 사용자 및 DATABASE 만들기 

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


### settings.py 에서 psql 연결
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME'     : 'games',     # 접속 DATABASE 를 지정한다
        'USER'     : '사용자명',     # 사용자 명을 입력 
        'PASSWORD' : '비번',      # 사용자 비번 입력 
        'HOST'     : 'localhost', # psql Server 주소를 입력
        'PORT'     : '5432',}     # 기본 PORT 설정값 입력 
    }
```


### psql 과 django 접속 확인하기

```
$ python manage.py makemigrations games
Migrations for 'games':
  games/migrations/0002_auto_20180309_1238.py
    - Create model GameCategory
    - Create model Player
    - Create model PlayerScore
```

```
$ python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, games, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
```

```
$ sudo -u postgres psql -d games --command="\dt;"
                  List of relations
 Schema |            Name            | Type  | Owner 
--------+----------------------------+-------+-------
 public | auth_group                 | table | quant
 public | auth_group_permissions     | table | quant
 public | auth_permission            | table | quant
 public | auth_user                  | table | quant
 public | auth_user_groups           | table | quant
```