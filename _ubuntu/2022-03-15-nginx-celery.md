---
layout: blog
title: NGINX Celery Flower 등록
tags:
- nginx
- celery
---

# Nginx Gunicorn & Celery
이번 페이지에서는 Celery 를 함께 등록하는 과정 까지 진행을 해보겠습니다.

<br/>

# Content
- [Uvicorn](#uvicorn)
- [Running with Gunicorn](#running-with-gunicorn)

<br/>

# [Uvicorn](https://www.uvicorn.org)
## [Running with Gunicorn](https://www.uvicorn.org/#running-with-gunicorn)
[Django 공식문서](https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/uvicorn/) 에서도  서버 실행을 위한 미들웨어로 [Uvicorn](https://www.uvicorn.org) 를 언급하고 있습니다. 아래의 명령어 하나만 실행하면 `127.0.0.1:8000` 에서 실행되는 내용을 로그에서 확인 가능합니다.
```r
$ gunicorn mysite.asgi:application -w 2 -k uvicorn.workers.UvicornWorker
```

## gunicorn.service
위 스크립트를 자동으로 실행하도록 `service deamon` 을 등록 합니다. 
1. `User` 는 스크립트를 실행하는 **<span style="color:var(--strong);">우분투 User</span>** 의 이름을 입력합니다. 
2. `Group` 은 `nginx.conf` 의 **<span style="color:var(--strong);">user</span>** 이름을 입력 합니다.
```r
$ sudo vi /etc/systemd/system/gunicorn.service
[Unit]
Description=HomePage
After=network.target

[Service]
User=USERNAME
Group=www-data
WorkingDirectory=/home/USERNAME/Source
Environment="PATH=/home/USERNAME/Python/venv/bin"
ExecStart=/home/USERNAME/Python/venv/bin/gunicorn myproject.asgi:application -k uvicorn.workers.UvicornWorker

[Install]
WantedBy=multi-user.target
```

## daemon service 등록 및 실행
1. daemon 과 연결작업을 먼저 한 뒤
2. System 자동실행 등록 절차를 진행 합니다
3. 재설정 하는 경우, 서비스를 종료를 한 뒤 새로 연결작업을 진행 해야 합니다.
```r
$ sudo systemctl -h
$ sudo systemctl enable gunicorn
  Created symlink 
  /etc/systemd/system/multi-user.target.wants/gunicorn.service → 
  /etc/systemd/system/gunicorn.service.

$ sudo systemctl start gunicorn   # 서비스 시작
$ sudo systemctl status gunicorn  # 상태확인
$ sudo systemctl -f stop gunicorn # 멈춤 (재부팅시 재실행 된다)
$ sudo systemctl disable gunicorn # 재부팅시 실행 안함
```

<br/>

# Nginx
## Install
[Nginx 우분투 설치가이드](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/#official-debian-ubuntu-packages) 에는 ubuntu 20.04 설치 방법만 기술되어 있습니다. 이는 [앞의 내용을 참고](https://yongbeomkim.github.io/ubuntu/2022-01-11-nginx-init.html) 하여 우분투 버젼에 맞는 내용을 다운로드 합니다.

## 파일의 구성
NGINX 의 설정 내용은 크게 2가지로 나눠 볼 수 있습니다. 
1. `nginx.conf` Nginx **기본설정** 
2. `default.conf` 또는 `default` 의 **서비스 설정**

## nginx.conf
`user` 이름은 `service` 등록에 사용 합니다. 주의할 내용은 `user` 이름은 우분투 사용자 이름과 별개의 데이터로써 관리 됩니다.
```r
$ cat vi /etc/nginx/nginx.conf

user www-data;
worker_processes auto;
include /etc/nginx/conf.d/*.conf;
```

## default.conf (default)
Django 에서 설정한 `Static` 과 `Media` 폴더에 대한 내용은 Nginx 를 활용하여 연결 합니다. 추가로 Axios 에서 Post 호출을 사용하는 경우에는 [앞의 내용을 참고](https://yongbeomkim.github.io/ubuntu/2022-01-11-nginx-init.html) 합니다.
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
  location /media/ {
    alias /home/user/django/media/;
    expires 1d;
  } 
}
```

## Reload
변경된 설정내용이 있으면 서버를 재실행 합니다.
```r
$ nginx -s [ stop | quit | reopen | reload ]
```

<br/>

# [Celery](https://docs.celeryq.dev/en/latest/)
[Daemonizing](https://docs.celeryq.dev/en/latest/userguide/daemonizing.html) 은 여러가지 방법이 있습니다. 이번 페이지 에서는 위 Uvicorn 에서 살펴본 내용과 같이 [`systemd`](https://docs.celeryq.dev/en/latest/userguide/daemonizing.html#usage-systemd) 에서 등록하는 방법을 정리해 보겠습니다. 
- [systemd 사용](https://devlog.jwgo.kr/2019/07/05/celery-daemonization/)
- [Init-script 사용](https://dingrr.com/blog/post/celery%EB%A5%BC-%EB%8D%B0%EB%AA%AC%EC%9C%BC%EB%A1%9C-%EA%B5%AC%EB%8F%99-on-ubuntu)
- [supervisord 사용](https://dev.to/idrisrampurawala/deploying-django-with-celery-and-redis-on-ubuntu-3fo6)

## Setting Files
Celery 는 [`celery.service`](https://docs.celeryq.dev/en/latest/userguide/daemonizing.html#service-file-celery-service) 와 [`celerybeat.service`](https://docs.celeryq.dev/en/latest/userguide/daemonizing.html#service-file-celerybeat-service) 2개의 서비스를 필요로 합니다. 2개의 서비스 파일은 공식문서의 내용을 그대로 사용하면 됩니다. 사용자 변수 내용은 `/etc/conf.d/celery` 파일을 호출하는 방식으로 운영 됩니다.
1. /etc/systemd/system/celery.service
2. /etc/systemd/system/celerybeat.service
3. /etc/conf.d/celery

## Celery Worker
공식문서를 참고하여 초간단 버젼으로 서비스 파일을 작성해 보겠습니다. 기본 골격은 앞의 `gunicorn` 데몬 파일을 재활용 하였고 추가적인 옵션들만 덧붙여 보았습니다.
```r
$ sudo vi /etc/systemd/system/celery.service

[Unit]
Description=MarketSearch
After=network.target

[Service]
Type=forking
User=USERNAME
Group=www-data
WorkingDirectory=/home/USERNAME/Source
Environment="PATH=/home/USERNAME/Python/venv/bin"
ExecStart=/home/USERNAME/Python/venv/bin/celery -A server worker -l info
Restart=always

[Install]
WantedBy=multi-user.target
```

## Celery Beat
```r
$ sudo vi /etc/systemd/system/celerybeat.service

[Unit]
Description=DjangoSite
After=network.target

[Service]
Type=simple
User=USERNAME
Group=www-data
WorkingDirectory=/home/USERNAME/Source
Environment="PATH=/home/USERNAME/Python/venv/bin"
ExecStart=/home/erdos/USERNAME/venv/bin/celery -A server beat -l info
Restart=always

[Install]
WantedBy=multi-user.target
```

## flower.service

[Flower] 는 Celery 동작 내용을 모니터링 GUI를 생성하는 모듈 입니다. [daemon 등록예제](https://stackoverflow.com/questions/13579047/celery-flower-as-daemon) 를 참고하여 본인의 시스템에 맞게 내용을 보완 합니다.

```r
$ sudo vi /etc/systemd/system/flower.service

[Unit]
Description=Flower Celery Service

[Service]
User=USERNAME
Group=www-data
WorkingDirectory=/home/USERNAME/Source
Environment=/home/USERNAME/Python/venv/bin/celery -A server --broker=redis://localhost:6379 flower
Restart=on-failure
Type=simple

[Install]
WantedBy=multi-user.target
```

## SystemCTL
앞에 작성한 2개의 파일을 시스템 파일로 등록을 하고 재부팅하면, Nginx 와 Django 에 잘 연동되어 작동되는 모습을 확일 할 수 있습니다.

```r
$ sudo systemctl enable celery.service                 
  Created symlink 
  /etc/systemd/system/multi-user.target.wants/celery.service
  → /etc/systemd/system/celery.service.

$ sudo systemctl enable celerybeat.service
  Created symlink 
  /etc/systemd/system/multi-user.target.wants/celerybeat.service 
  → /etc/systemd/system/celerybeat.service.

$ sudo systemctl enable flower.service        
  Created symlink 
  /etc/systemd/system/multi-user.target.wants/flower.service
  → /etc/systemd/system/flower.service.
```

## Nginx for Flower

Flower 는 Django 서비스와 별도로 5555번 포트에서 동작을 합니다. 따라서 Nginx 에서도 접속할 수 있도록 아래의 설정내용을 추가한 뒤 재실행 해야 합니다. [Stackoverflow 자료출처](https://stackoverflow.com/questions/41241048/django-how-can-i-access-celery-flower-page-in-production-mode)

```r
location ~ ^/flower/? {
    rewrite ^/flower/?(.*)$ /$1 break;

    sub_filter '="/' '="/flower/';
    sub_filter_last_modified on;
    sub_filter_once off;

    # proxy_pass http://unix:/tmp/flower.sock:/;
    proxy_pass http://localhost:5555;
    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_http_version 1.1;
}
```

# 참고사이트
- [Celery Document](https://django.fun/docs/celery/en/5.1/userguide/daemonizing/)
- [Deploy celery and celery beat in production with Django (Ubuntu)](https://medium.com/clean-slate-technologies/deploy-celery-and-celery-beat-in-production-with-django-ubuntu-de71ccb24907)
- [Daemonizing Celery Beat with systemd](https://ahmadalsajid.medium.com/daemonizing-celery-beat-with-systemd-97f1203e7b32)