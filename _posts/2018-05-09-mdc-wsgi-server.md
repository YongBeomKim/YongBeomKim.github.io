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

<figure class="align-center">
  <img src="https://static.vndeveloper.com/uploads/2017/07/django-behind-uwsgi-nginx.png" alt="">
  <figcaption> uwsgi 구동원리 전개도</figcaption>
</figure> 


[정식 Document](http://uwsgi-docs.readthedocs.io/en/latest/tutorials/Django_and_nginx.html)
[설정 blog](http://covenant.tistory.com/22)
[설정 blog](http://www.hides.kr/868)
[설정 Blog](http://yujuwon.tistory.com/entry/Django-Django%EC%99%80-apache-%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0-%EC%9A%B0%EB%B6%84%ED%88%AC)
[nginx 와 Django](https://twpower.github.io/41-connect-nginx-uwsgi-django)


### Apache 의 mod_wsgi 서버를 설치한다

```
$ sudo apt-get install apache2                  # apache2 설치
$ sudo apt-get install libapache2-mod-wsgi      # wsgi 모듈
$ sudo apt-get install libapache2-mod-wsgi-py3  # 파이썬 연결 모듈
(Django) $ pip install uwsgi                    # 파이썬 모듈 
```


### mod_wsgi 및 apache2 설치확인

1. **`$ uwsgi`** 로 설치를 확인한다
2. apache2 는 **`https://localhost:80`** 로 접속하여 apache2 설치를 확인한다

<img width="300" src="https://www.ostechnix.com/wp-content/uploads/2016/02/Apache-test-page.png" /><br>


### django 사용 port를 연다

1. **`$ sudo ufw allow 8000`** 로 `ufw` 방화벽에서 해당포트를 개방한다
2. **`$ sudo iptables -I INPUT -p tcp --dport 8000 -j ACCEPT`** 로 `iptables`의 해당포트를 개방한다
3. **`$ python manage.py runserver 0.0.0.0:8000`** 로 해당포트가 열린걸 확인한다


<br>
## apache2에서 설정을 추가한다

### **/etc/apache2/ports.conf** 설정변경

<strike>`$ sudo nano /etc/apache2/ports.conf` 파일의 port 설정값을 추가한다 (80 포트는 기본 포트 이므로 **django 포트주소를 추가**한다)</strike>

localhost 에서는, 위의 설정값이 django 실행시 **해당포트가 이미 작동중**이라는 오류가 발생했다. 지정이 없어야 제대로 작동하는 결과를 보여줬다
{: .notice-info}

```
#Listen 추가포트
Listen 80
Listen 8000
```



### **/etc/apache2/sites-available/000-default.conf** 설정변경

**`$ sudo nano /etc/apache2/sites-available/000-default.conf`** 여기도 포트 80번은 기본값이므로, django 포트 주소를 추가한다.

> WSGIDaemonProcess &nbsp; 프로젝트 &nbsp; python-home=/home/가상경로/env &nbsp; python-path=/home/프로젝트경로 <br>
> WSGIProcessGroup rest <br>
> WSGIScriptAlias &nbsp; / &nbsp; /home/wsgi.py가 있는 경로/wsgi.py <br>

```
<VirtualHost *:8000>
    ServerName www.example.com
    <Directory /home/markbaum/Python/Source/Django/project/server>
        <Files wsgi.py>
            Require all granted
        </Files>
    </Directory>
    WSGIDaemonProcess www.example.com /home/markbaum/Python/django/lib/python3.6/site-packages
    WSGIProcessGroup www.example.com
    WSGIScriptAlias / /home/markbaum/Python/Source/Django/project/server/wsgi.py process-group=www.example.com
</VirtualHost>
```

**django_server :** 웹에서 접속시 연결되는 **Domain 주소** 값으로 localhost 에서 접속을 사용하려면 `$ sudo nano /etc/hosts` 에 `127.0.0.1       django_server` 값을 추가해야한다
{: .notice--info}

**WSGIDaemonProcess :** 비 윈도우 환경에서 **데몬모드**(백그라운드 실행하면서 별도 인터페이스를 필요로 하지 않는 실행) 설정을 할때에는 **외부도메인**과 **python 외부 경로**를 추가적으로 설정해야 한다
{: .notice--info}


### Alias 로 외부 경로를 url에 추가하기

[Alias 경로추가 설명 Blog](http://skylit.tistory.com/89)

```
# 리눅스의 경우
Alias    /aliastest/    "/home/bhshin/exp/testbed/aodvtest/"

# 윈도우의 경우; 폴더 구분 기호가 슬래시(/)임에 주의
Alias    /aliastest/    "C:/exp/testbed/aodvtest/"
```

위 설정은  `/home/bhshin/exp/testbed/aodvtest/` 디렉토리에 있는 콘텐츠에 웹 브라우저에서 `http://서버의 IP 주소/aliastest/` 경로를 통해서 접근할 수 있다.
{: .notice--info}


### rest-framework 를 설정에 추가 

위의 port 데이터에 아래의 정보를 추가입력하면 된다

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
```


### 서버를 재가동 한다 

`$ systemctl restart apache2.service` 로 새로운 설정값이 적용된 서버를 재가동한다



### test.py 로 서버실행을 test 하기

아래의 test.py 파일을 생성한뒤 **uwsgi** 서버를 실행한다

```python
# test.py

def application(env, start_response):
    start_response('200 OK', [('Content-Type','text/html')])
    return [b"Hello World"] # python3
```

실행명령을 입력한 뒤 브라우저에서 결과를 확인한다

```
$ uwsgi --http :8000 --wsgi-file test.py
*** Starting uWSGI 2.0.17 (64bit) on [Wed May  9 21:09:04 2018] ***
compiled with version: 7.2.0 on 09 May 2018 05:52:4...  
```



<br>
## Django Server 시작하기

wsgi.py 가 있는 폴더를 지정해서 uwsgi 로 서버를 실행한다. 결과가 출력되면 이제부터는 apache2 를 통해서 서버가 실행되는걸 확인할 수 있다.

```
$ uwsgi --http :8000  --module  server.wsgi
*** Starting uWSGI 2.0.17 (64bit) on [Wed May  9 21:13:01 2018] ***
compiled with version: 7.2.0 on 09 May 2018 05:52:45....
```


### 여러 웹사이트 실행시 중복을 방지 

기존의 설정만으로는 여러 서버를 실행하면 최초의 서버값만 인식 가능하다. 이를 방지하기 위해서 **wsgi.py** 의 환경설정 정보를 **{dict} 데이터 형식**으로 변환해야 한다


```python
#os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
os.environ["DJANGO_SETTINGS_MODULE"] = "server.settings"
```
