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
[설정 Blog](http://yujuwon.tistory.com/entry/Django-Django%EC%99%80-apache-%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0-%EC%9A%B0%EB%B6%84%ED%88%AC)

### Apache 의 mod_wsgi 서버를 설치한다

```
$ sudo apt-get install apache2                  # apache2 설치
$ sudo apt-get install libapache2-mod-wsgi      # wsgi 모듈
$ sudo apt-get install libapache2-mod-wsgi-py3  # 파이썬 연결 모듈
(Django) $ pip install uwsgi                    # 파이썬 모듈 
```


### wsgi 작동을 확인

```
$ uwsgi              
*** Starting uWSGI 2.0.17 (64bit) on [Wed May  9 14:58:47 2018] ***
compiled with version: 7.2.0 on 09 May 2018 05:52:45
os: Linux-4.13.0-39-generic #44-Ubuntu SMP Thu Apr 5 14:25:01 UTC 2018
```


### django 를 사용할 port 열기 

1. `$ sudo ufw allow 8000` 로 `ufw` 방화벽에서 해당포트를 개방한다
2. `$ sudo iptables -I INPUT -p tcp --dport 8000 -j ACCEPT` 로 `iptables`의 해당포트를 개방한다
3. `python manage.py runserver 0.0.0.0:8000` 로 해당포트가 열린걸 확인한다


### apache2에서 설정을 한다

`$ sudo nano /etc/apache2/ports.conf` 파일의 port설정값을 추가한다 (80 포트는 기본으로 **django 포트를 추가**한다)

```
#Listen 추가포트
Listen 80
Listen 8000
```


`$ sudo nano /etc/apache2/sites-available/000-default.conf` 에 포트를 추가한다. 여기도 포트 80번은 기본값으로 변경말고 django 포트를 추가한다.

> WSGIDaemonProcess &nbsp; 프로젝트 &nbsp; python-home=/home/가상경로/env &nbsp; python-path=/home/프로젝트경로 <br>
> WSGIProcessGroup rest <br>
> WSGIScriptAlias &nbsp; / &nbsp; /home/wsgi.py가 있는 경로/wsgi.py <br>



출처: http://www.hides.kr/868 [Hide]

```
WSGIDaemonProcess myproject python-home=/home/username/Python/Source/Django/project python-path=/home/sammy/myproject

<VirtualHost *:8000>
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html

</VirtualHost>
```






### settings.py

settings.py 설정에서 `ALLOWED_HOSTS = ['*']` 로 변경한다 


### mod_wsgi 와 django 의 연결

`nano /etc/apache2/sites-available/000-default.conf` 설정파일을 수정한다

```
<VirtualHost *:80>
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html
        
        > > 여기에 사용자 추가내용을 입력한다 < < 
         
</VirtualHost>
```


### rest-framework 를 설정에 추가한다 

> Alias /static /home/사용자/프로젝트/static <br>
> < Directory /home/사용자/프로젝트/static > <br>
> Require all granted <br>
> < / Directory > <br>



### django 의 wsgi.py 을 연결한다

> <Directory /home/사용자/프로젝트/wsgi.py 경로> <br>
> < Files wsgi.py > <br>
> Require all granted  <br>
> < / Files > <br>
> </Directory> <br>

```
Alias /static /home/markbaum/django/lib/python3.6/site-packages/rest_framework/static

<Directory /home/markbaum/django/lib/python3.6/site-packages/rest_framework/static>
    Require all granted
</Directory>  

<Directory /home/markbaum/Python/Source/Django/project/server>
    <Files wsgi.py>
        Require all granted
    </Files>
</Directory>
```
