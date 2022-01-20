---
layout: blog
title: NGINX & Service 등록
tags:
- nginx
---

# Gunicorn & Uvicorn

## Uvicorn

[Django 공식문서](https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/uvicorn/) 에서  실행을 위한 미들웨어로 [Uvicorn](https://www.uvicorn.org/) 를 언급하고 있습니다. 별도 설정없이 자동으로 `127.0.0.1:8000` 주소로 실행됨을 로그로써 확인 가능합니다.

```r
$ gunicorn myproject.asgi:application -k uvicorn.workers.UvicornWorker
```

<br/>

# Nginx 

## Install

Nginx 공식 사이트의 [우분투 설치가이드](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/#official-debian-ubuntu-packages) 에는 ubuntu 20.04 설치 방법만 기술되어 있습니다. 이를 참고하여 우분투 버젼에 맞는 내용을 다운로드 합니다.

```r
# 설치에 필요한 모듈설치
$ apt install curl gnupg2 ca-certificates lsb-release 

# Nginx 저장소 설정 (lsb release -cs 는 리눅스 배포판을 확인)
$ echo "deb http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" \
  | sudo tee /etc/apt/sources.list.d/nginx.list

# Nginx 공개키 추가
$ curl -fsSL https://nginx.org/keys/nginx_signing.key | sudo apt-key add -
$ sudo apt update
$ sudo apt install nginx
# Nginx 도움말
$ nginx -h
# Nginx 설정파일 유효성 검사
$ nginx -t
# Nginx 정지, 재가동
$ nginx -s [ stop | quit | reopen | reload ]
```

## 파일의 구성

NGINX 의 설정 내용은 크게 2가지로 나눠 볼 수 있습니다. 
1. `nginx.conf` Nginx 기본설정 
2. `/etc/nginx/conf.d/` 1번에서 **include** 호출 **추가설정**

```r
$ find / -name nginx.conf
/etc/nginx/nginx.conf

$ tree .
├── conf.d
│   └── default.conf
└── nginx.conf
```

## nginx.conf

특별히 변경할 내용은 없습니다. 다만 설정 내용 중 `user` 이름을 추후의 `service` 등록시 사용 합니다. `user` 이름은 우분투 사용자가 아닌 별도의 이름으로 관리 됩니다.

```r
$ cat vi /etc/nginx/nginx.conf

user nginx;
worker_processes auto;
include /etc/nginx/conf.d/*.conf;
```

## /etc/nginx/conf.d/default.conf  

Django 는 `127.0.0.1` 아이피, 포트를 Nginx 를 거치면서 외부 접속을 가능하게 합니다. Django 의 `Static` 과 `Media` 폴더는 Nginx 를 활용하여 연결 합니다.

```r
server {
    listen       80;
    server_name  django;
    charset      utf-8;
    location / {
        proxy_pass http://127.0.0.1:8000;
    }
    location /static/ {
        autoindex on;
        alias /home/user/django/staticfiles/;
        expires 1d;
    }
}
```

## default.conf of Axios Post

추가 내용은 [`axios.post` 를 활용](https://stackoverflow.com/questions/50949594/axios-having-cors-issue) 하는 경우 [`OPTIONS` method](https://blog.huiya.me/12) 를 먼저 확인합니다. 따라서 서버단위에서 Options 설정을 추가를 해야 합니다. [CORS on Nginx](https://enable-cors.org/server_nginx.html) 내용을 참고 하였습니다.

```r
$ cat /etc/nginx/sites-available/default

server {
  listen 80;
  server_name arterior.kr;
  charset utf-8;

  location / {
    proxy_pass http://127.0.0.1:8000;
    if ($request_method = 'OPTIONS') {
      add_header 'Access-Control-Allow-Origin' '*';
      add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
      add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
      # Tell client that this pre-flight info is valid for 20 days
      add_header 'Access-Control-Max-Age' 1728000;
      add_header 'Content-Type' 'text/plain; charset=utf-8';
      add_header 'Content-Length' 0;
      return 204;
    }
    if ($request_method = 'POST') {
      add_header 'Access-Control-Allow-Origin' '*' always;
      add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
      add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range' always;
      add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range' always;
    }
  }
  location /static/ {
    autoindex on;
    alias /home/cobalt/Source/django/staticfiles/;
    expires 1d;
  }
  location /media/ {
    alias /home/cobalt/Source/media/;
    expires 1d;
  }  
}
```

<br/>

# Service

서버를 부팅할 때마다 자동으로 실행하는 스크립트를 만들어 보겠습니다.

## gunicorn.service

스크립트를 자동으로 실행하도록 service deamon 을 활성화 해 보겠습니다. `User` 는 스크립트를 실행하는 **우분투 User** 의 이름을 추가 합니다. `Group` 이름은 앞에서 정의한 `nginx.conf` 의 **user** 이름으로 일치시킵니다.

```r
$ sudo vi /etc/systemd/system/gunicorn.service

[Unit]
Description=Service Title
After=network.target

[Service]
User=USERNAME
Group=www-data
WorkingDirectory=/home/USER/django
Environment="PATH=/home/USER/Python/venv/bin"
ExecStart=/home/USER/Python/venv/bin/gunicorn myproject.asgi:application -k uvicorn.workers.UvicornWorker

[Install]
WantedBy=multi-user.target
```

## daemon 파일의 시스템 등록

service 파일을 정의했으면 다음의 순서대로 진행 합니다.
1. daemon 과 연결작업을 먼저 한 뒤
2. System 자동실행 등록 절차를 진행 합니다
3. 재설정 하는 경우, 서비스를 종료를 한 뒤 새로 연결작업을 진행 해야 합니다.

```r
$ sudo systemctl -h
$ sudo systemctl enable gunicorn
Created symlink /etc/systemd/system/multi-user.target.wants/gunicorn.service → /etc/systemd/system/gunicorn.service.
$ sudo systemctl start gunicorn
$ sudo systemctl status gunicorn

$ sudo systemctl -f stop gunicorn
$ sudo systemctl status gunicorn
```

<br/>

# Naver Cloud

네이버 클라우드는 Ubuntu 18.04 까지만 현재 지원하고 있습니다. 때문에 Python 은 3.6 버젼이고, Nginx 은 설정값을 추가해야만 정상적인 설치 작업이 진행 됩니다.

- [Naver Cloud 콘솔 메뉴얼](https://www.ncloud.com/)
- [Naver Cloud AAG(보안설정) 등 기초설정 방법](https://m.blog.naver.com/nieah914/221609709142)
- [Naver Cloud Nginx 설치 및 포트포워딩](https://prohannah.tistory.com/84)
- [Naver Cloud 서버 반납하기](https://growingsaja.tistory.com/325)