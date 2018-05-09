---
title : django 배포하기
last_modified_at: 2018-05-08T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - django
    - pyton
toc: true    
---


# 서비스 배포를 위한 강력한 서버와 연결하기

## SECREAT KEY 분리하기

[초코몽키 관련 blog](https://wayhome25.github.io/django/2017/07/11/django-settings-secret-key/)

### 환경 변수파일에 저장하기

nano를 사용하여 .zshrc 파일을 편집 후 활용 

```
$ nano ~/.zshrc 
    # .zshrc 파일에 아래 코드를 추가해준다.
    export INSTA_SECRET_KEY='b_4(!id8ro!1645n@ub55555hbu93gaia0 

$ echo $INSTA_SECRET_KEY    # 환경변수 확인 명령
```

`settings.py` 파일을 열어서 SECRET_KEY 의 값을 삭제하고 환경변수로 대체한다

```python
import os
SECRET_KEY = os.environ["INSTA_SECRET_KEY"]
```



### 외부 파일에 저장 후 불러온다 

`/etc/secret_key.txt` 별도의 Text 파일로 저장후 재활용 한다

```python
with open('/etc/secret_key.txt') as f:
    SECRET_KEY = f.read().strip()
```


### 디버그 환경설정

```python
import os, socket

with open('/home/local/secret_key.txt') as f:
    SECRET_KEY = f.read().strip()

if socket.gethostname() == 'localname':
    DEBUG         = TEMPLATE_DEBUG = True
    ALLOWED_HOSTS = ['localhost']
else:
    DEBUG         = TEMPLATE_DEBUG = False
    ALLOWED_HOSTS = ['ip-address']
```



<br>

## Apache 의 mod_wsgi 서버와 연결하여 Django 배포하기


[설정 blog](http://covenant.tistory.com/22)
[설정 blog](http://www.hides.kr/868)

### Apache 의 mod_wsgi 서버를 설치한다

```
$ sudo apt-get install libapache2-mod-wsgi      # wsgi 모듈
$ sudo apt-get install libapache2-mod-wsgi-py3  # 파이썬 연결 모듈
```

### settings.py

settings.py 설정에서 `ALLOWED_HOSTS = ['*']` 로 변경한다 


### mod_wsgi 설정파일 변경

`nano /etc/apache2/sites-available/000-default.conf` 설정파일을 수정한다


### rest-framework 를 설정에 추가한다 

> Alias /static /home/사용자/static
> <Directory /home/사용자/static>
> Require all granted
> </Directory>

```
Alias /static /home/사용자/django/lib/python3.6/site-packages/rest_framework/static
<Directory /home/사용자/django/lib/python3.6/site-packages/rest_framework/static>
    Require all granted
</Directory>  
```


### django 의 wsgi.py 을 연결한다

> <Directory /home/app/wsgi.py 경로>
> <Files wsgi.py>
> Require all granted
> </Files>
> </Directory>

```
<Directory /home/markbaum/Python/Source/Django/project/server>
    <Files wsgi.py>
        Require all granted
    </Files>
</Directory>
```


### 

```
WSGIScriptAlias / /home/사용자/Django/mysite/wsgi.py       # django wsgi.py
WSGIDaemonProcess mysite python-path=/home/사용자/Django/  # django 폴더
WSGIProcessGroup mysite

<Directory /home/사용자/Django>
<Files wsgi.py>
Require all granted
</Files>
</Directory>

Alias /static/ /home/ubuntu/Check/www_static/
<Directory /home/ubuntu/Check/www_static>
Require all granted
</Directory>
```











**ListView의 Template:**
{: .notice--info}

**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}  