---
title : django wsgi 와 Apache 연동하기
last_modified_at: 2018-05-09T15:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - django
    - pyton
toc: true    
---

# Mastering Django Core

<br>
## Apache 의 mod_wsgi 서버 설치


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


### mod_wsgi 및 apache2 설치확인

1. apache2 는 `https://localhost:80` 로 접속하여 apache2 설치를 확인한다
2. `$ uwsgi` 로 설치를 확인한다

<iframe width="300" src="https://www.ostechnix.com/wp-content/uploads/2016/02/Apache-test-page.png" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


### django 사용 port를 연다

1. `$ sudo ufw allow 8000` 로 `ufw` 방화벽에서 해당포트를 개방한다
2. `$ sudo iptables -I INPUT -p tcp --dport 8000 -j ACCEPT` 로 `iptables`의 해당포트를 개방한다
3. `python manage.py runserver 0.0.0.0:8000` 로 해당포트가 열린걸 확인한다


<br>
## apache2에서 설정을 추가한다

### **/etc/apache2/ports.conf**

`$ sudo nano /etc/apache2/ports.conf` 파일의 port 설정값을 추가한다 (80 포트는 기본 포트 이므로 **django 포트주소를 추가**한다)

```
#Listen 추가포트
Listen 80
Listen 8008
```


### **/etc/apache2/sites-available/000-default.conf**

`$ sudo nano /etc/apache2/sites-available/000-default.conf` 여기도 포트 80번은 기본값이므로, django 포트 주소를 추가한다.

> WSGIDaemonProcess &nbsp; 프로젝트 &nbsp; python-home=/home/가상경로/env &nbsp; python-path=/home/프로젝트경로 <br>
> WSGIProcessGroup rest <br>
> WSGIScriptAlias &nbsp; / &nbsp; /home/wsgi.py가 있는 경로/wsgi.py <br>

```
<VirtualHost *:8000>
    ServerName django_server
    <Directory /home/markbaum/Python/Source/Django/project/server>
        <Files wsgi.py>
            Require all granted
        </Files>
    </Directory>
    WSGIDaemonProcess localhost /home/markbaum/Python/django/lib/python3.6/site-packages
    WSGIProcessGroup localhost
    WSGIScriptAlias / /home/markbaum/Python/Source/Django/project/server/wsgi.py process-group=localhost
</VirtualHost>
```

**django_server :** 웹에서 접속시 연결되는 **Domain 주소** 값으로 localhost 에서 접속을 사용하려면 `$ sudo nano /etc/hosts` 에 `127.0.0.1       django_server` 값을 추가 설정하면 된다
{: .notice--info}


### rest-framework 를 설정에 추가한다 

> Alias /static /home/사용자/프로젝트/static <br>
> < Directory /home/사용자/프로젝트/static > <br>
> Require all granted <br>
> < / Directory > <br>



### rest_api 환경변수 추가하기

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












**ListView의 Template:**
{: .notice--info}

**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}  