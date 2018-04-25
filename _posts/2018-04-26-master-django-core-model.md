---
title : Master Django - model
last_modified_at: 2018-04-26T02:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
tags: 
    - django
    - pyton
toc: true    
---


## MariaDB 를 Django와 연결 

### Mysql-client Python 설치

```
$ sudo apt-get install python-dev libmysqlclient-dev
$ sudo apt-get install -f
$ pip install mysqlclient
```


### settings.py

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'DB 이름',
        'USER': 'User 이름',
        'PASSWORD': 'User 암호',
        'HOST': 'localhost',
        'PORT':  '3306', # mariaDB default 포트설정
        'OPTIONS' :      # http://tibyte.kr/274 (Warning 경고시)
            {'init_command': 
            "SET sql_mode='STRICT_TRANS_TABLES'"},}}
```


## Django 에서 Model 정의

Python 코드로 직접 SQL 입력출력 가능하다. 하지만 Django의 Model Data Layout을 활용하는 이유를 열거하자면 

1. 모델을 보다 쉽고 간결하게 유지 관리보수가 가능하다
2. DB 전환시 추가적인 작업이 줄어든다 (settings.py만 변경하면 된다)
3. 접속자별 overhead를 효과적으로 관리한다 (Python 객체를 상호간 재활용 한다)
4. 단점으로는 SQL 구현결과와 100% 일치하진 않는다는 점이다



**Warning in Django:** Python의 모든 string method가 적용가능한건 아니다. 실 예로 .replace('','') 같이 내부 변수를 필요로 하는 경우는 오류를 출력, **필수 인수가 없는 메서드**만 호출 가능하다 
{: .notice--danger}

