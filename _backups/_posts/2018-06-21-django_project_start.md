---
title : Django Settings.py 기본설정
last_modified_at: 2018-06-21T15:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - settings
    - django
toc: true 
---


지금까지는 **Mastering Django Core** 등 **도서내용**을 중심으로 정리했다면, 이제부터는 **Project를 위한 Django** 작업을 위해서 지금까지 정리된 공통설정 내용을 정리해 보려고 한다 


# settings.py


<br>
## Django Shell 기능을 추가

```python
INSTALLED_APPS = [
    'django_extensions',
    ]
```
`$ pip install django-extensions` 로 모듈을 추가한 뒤 **terminal** 에서<br>
`$ python3 manage.py shell_plus` 을 하면 Ipython과 연동<br>
`$ python manage.py shell_plus --notebook`을 하면 Jupyter와 연동된다
{: .notice--info} 


<br>
## SECRET_KEY 설정

```python
with open('/폴더/secret_key.txt') as f:
    SECRET_KEY = f.read().strip()
```
**SECRET_KEY 의 재활용 :** PC별 1개만 저장되어도 재활용 가능햇다 ;ㅆ; 
{: .notice--warning} 


<br>
## DEBUG, ALLOWED_HOSTS

```python
import socket
if socket.gethostname() == '프로그래머 PC 사용자 이름':
    DEBUG = TEMPLATE_DEBUG = True
    ALLOWED_HOSTS = ['localhost']
else:
    DEBUG = TEMPLATE_DEBUG = False
    ALLOWED_HOSTS = ['*']
```

**socket.gethostname() :** 해당 PC의 User 이름을 추출해서, 코딩시에는 디버그를 활성화 하고, 다른 PC에서는 보안을 강화한다
{: .notice--warning} 


<br/>

## STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]

[참고 사이트](https://blog.hannal.com/2015/04/start_with_django_webframework_06/)

```python
STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
```

**STATIC_URL :** HTML에서 정적파일 연결 URL로 마지막은 '/'로 닫아야 한다 **STATICFILES_DIRS :** 은 사용자가 추가로 **CSS, JS, Media File**을 사용시 꼭 지정해야 **static_url**로 연결해서 내부서 활용이 가능하다
{: .notice--warning} 



<br>

## CELERY

```python
# Celery 설정
CELERY_BROKER_URL        = 'redis://localhost:6379'
CELERY_RESULT_BACKEND    = 'redis://localhost:6379'
CELERY_ACCEPT_CONTENT    = ['application/json']
CELERY_TAST_SERIALIZER   = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE          = 'Asia/Seoul' # 스케줄러는 시간정의 필수
```
**redis 와 CELERY :** Django 에서 **비동기적 실행** 을 추가한다. 물론 이들을 설치하고[설치내용](https://yongbeomkim.github.io/django/redis-django/) 입력해야 하는건 당근..
{: .notice--warning} 



<br>
## TEMPLATES

```python
TEMPLATES = 
    'DIRS'    : [os.path.join(BASE_DIR, "static/templates")],
    'APP_DIRS': True,

```

**TEMPLATES :**  `'APP_DIRS': True` 을 설정하면, 1)우선 해당 앱의 `/app이름/templates/` 를 우선 검색하고, 2) `static/templates/` 을 두번째로 검색한다. 
{: .notice--info}



<br>
## DATABASES

### MySQL 에서의 설정

<small>**사용자, 암호, DATABASE** 3개를 정의한다 [참고사이트](http://bluejake.tistory.com/28)</small>

```sql
$ mysql -u root -p
Enter password: 

>>> CREATE DATABASE  DB이름 CHARACTER SET UTF8;
>>> GRANT ALL PRIVILEGES ON DB이름.* TO 사용자@localhost;
>>> FLUSH PRIVILEGES;
>>> exit; 
```

**`$ mysql -u root -p`** DB 추가, 사용자 권한 작업은 root로 실행<br>
**>>> CREATE USER 사용자@localhost IDENTIFIED BY '비밀번호';** 사용자 추가 
{: .notice--info}


### Django 에서의 설정 

<small>**SQLITE3** 설정</small>

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME'  : os.path.join(BASE_DIR, 'db.sqlite3'),}}
```


<small>**MariaDB** 설정 [DB설정방법](http://bluejake.tistory.com/28)</small>

```python

DATABASES = {
    'default': {
        'ENGINE'  : 'django.db.backends.mysql',
        'NAME'    : 'DATABASE이름',
        'USER'    : 'USER이름',
        'PASSWORD': 'USER_PASSWORD',
        'HOST'    : 'localhost',
        'PORT'    : '3306',
        'OPTIONS' :
            {'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"},
        'TEST' : {
            'NAME': 'test_myproject', },
        }}
```

**MariaDB 기본내용**은 블로그[사이트](https://yongbeomkim.github.io/django/mdc-model-1/) 정리내용을 참고<br>
**'PORT':'3306'** MariaDB 의 기본 설정값이다<br>
**'TEST':{'NAME':}** TDD 용 DATABASE (권한설정 필요)<br>
**'OPTIONS':{'init_command':},** MariaDB [참고](http://tibyte.kr/274) Warning용 
{: .notice--info}


<br>
## Gmail SMTP 서버의 활용

[참고사이트](https://www.codingforentrepreneurs.com/blog/use-gmail-for-email-in-django/)

```python
EMAIL_HOST          = 'smtp.gmail.com'
EMAIL_HOST_USER     = 'email@gmail.com'
EMAIL_HOST_PASSWORD = 'password'
EMAIL_PORT          = 587
EMAIL_USE_TLS       = True
```


<br>
## Internationalization 환경설정

```python
LANGUAGE_CODE = 'en-us'
TIME_ZONE     = 'Asia/Seoul'
USE_I18N      = True
USE_L10N      = True
USE_TZ        = True
```