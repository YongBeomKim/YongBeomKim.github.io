---
layout: blog
title: Celery Flower on Nginx
tags:
- nginx
- celery
---

Celery, Flower 의 서버설정 과정을 정리해 보았습니다.
- [Celery 공식문서](https://docs.celeryq.dev/en/latest/)
- [Celery Fork 문서 Python.fum](https://django.fun/docs/celery/en/5.1/)
- [Flower 모니터링](https://flower.readthedocs.io/en/latest/)
- [우분투 Service 설정내용](https://potatogim.net/wiki/Systemctl)

<br/>

# Content
- [Content](#content)
- [Uvicorn](#uvicorn)
  - [Running with Gunicorn](#running-with-gunicorn)
  - [gunicorn service](#gunicorn-service)
  - [daemon service](#daemon-service)
- [Nginx](#nginx)
  - [Install](#install)
  - [파일의 구성](#파일의-구성)
  - [nginx.conf](#nginxconf)
  - [default.conf (default)](#defaultconf-default)
  - [Reload](#reload)
  - [무료 SSL 설치 및 자동 업데이트 설정](#무료-ssl-설치-및-자동-업데이트-설정)
- [Celery](#celery)
  - [Setting Files](#setting-files)
  - [Celery Worker](#celery-worker)
  - [Celery Beat](#celery-beat)
  - [SystemCTL](#systemctl)
  - [내용의 추가](#내용의-추가)
- [Flower](#flower)
  - [Nginx for Flower](#nginx-for-flower)
  - [flower.service](#flowerservice)
  - [flower service 내용추가](#flower-service-내용추가)
- [Supervisor](#supervisor)
- [참고사이트](#참고사이트)

- [Nginx](#nginx)
  - [Install](#install)
  - [파일의 구성](#파일의-구성)
  - [nginx.conf](#nginxconf)
  - [default.conf (default)](#defaultconf-default)
  - [Reload](#reload)

- [Content](#content)
- [Uvicorn](#uvicorn)
  - [Running with Gunicorn](#running-with-gunicorn)
  - [gunicorn service](#gunicorn-service)
  - [daemon service](#daemon-service)
- [Nginx](#nginx)
  - [Install](#install)
  - [파일의 구성](#파일의-구성)
  - [nginx.conf](#nginxconf)
  - [default.conf (default)](#defaultconf-default)
  - [Reload](#reload)
  - [무료 SSL 설치 및 자동 업데이트 설정](#무료-ssl-설치-및-자동-업데이트-설정)
- [Celery](#celery)
  - [Setting Files](#setting-files)
  - [Celery Worker](#celery-worker)
  - [Celery Beat](#celery-beat)
  - [SystemCTL](#systemctl)
  - [내용의 추가](#내용의-추가)
- [Flower](#flower)
  - [Nginx for Flower](#nginx-for-flower)
  - [flower.service](#flowerservice)
  - [flower service 내용추가](#flower-service-내용추가)
- [Supervisor](#supervisor)
- [참고사이트](#참고사이트)

- [참고사이트](#참고사이트)

<br/>

# [Uvicorn](https://www.uvicorn.org)
## [Running with Gunicorn](https://www.uvicorn.org/#running-with-gunicorn)
[Django 공식문서](https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/uvicorn/) 에서도  서버 실행을 위한 미들웨어로 [Uvicorn](https://www.uvicorn.org) 를 언급하고 있습니다. 아래의 명령어 하나만 실행하면 `127.0.0.1:8000` 에서 실행되는 내용을 로그에서 확인 가능합니다.
```r
$ gunicorn mysite.asgi:application -w 2 -k uvicorn.workers.UvicornWorker
```

## gunicorn service
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
ExecStart=/home/USERNAME/Python/venv/bin/gunicorn myproject.asgi:application -k uvicorn.workers.UvicornWorker

[Install]
WantedBy=multi-user.target
```

## daemon service
1. daemon 과 연결작업을 먼저 한 뒤
2. System 자동실행 등록 절차를 진행 합니다
3. 재설정 하는 경우, 서비스를 종료를 한 뒤 새로 연결작업을 진행 해야 합니다.

```r
$ sudo systemctl -h
$ sudo systemctl enable gunicorn
  Created symlink 
  /etc/systemd/system/multi-user.target.wants/gunicorn.service
  → /etc/systemd/system/gunicorn.service.

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

## 무료 SSL 설치 및 자동 업데이트 설정

[Update: Using Free Let’s Encrypt SSL/TLS Certificates with NGINX](https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/)

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

**<span style="color:var(--accent);">[2022-04추가](https://flower.readthedocs.io/en/latest/prometheus-integration.html#set-up-your-celery-application)</span>** 이벤트 로그 확인을 용이하도록 `-E` 옵션을 추가 합니다.

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
ExecStart=/home/USERNAME/Python/venv/bin/celery -A server worker -l info -E
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
ExecStart=/home/erdos/USERNAME/venv/bin/celery -A server beat -l info
Restart=always
StartLimitBurst=0

[Install]
WantedBy=multi-user.target
```

## SystemCTL
앞에 작성한 2개의 파일을 시스템 파일로 등록을 한 뒤 재부팅과 함께 정상작동 하는지 확인 합니다.

```r
$ sudo systemctl enable celery.service                 
  Created symlink 
  /etc/systemd/system/multi-user.target.wants/celery.service
  → /etc/systemd/system/celery.service.

$ sudo systemctl enable celerybeat.service
  Created symlink 
  /etc/systemd/system/multi-user.target.wants/celerybeat.service 
  → /etc/systemd/system/celerybeat.service.
```

## 내용의 추가

- **<span style="color:var(--accent);">[2022-04-04 추가](https://www.suse.com/support/kb/doc/?id=000019750)</span>**

```r
2020-10-22 systemd[1]: celerybeat.service: Start request repeated too quickly.
```

재부팅한 경우 위 오류가 나타나 제대로 실행되지 않는 경우가 빈번하게 발생하였습니다. 동일한 문제가 발생하는 경우에는 아래의 명령을 추가 적용 합니다.

```r
$ systemctl show -p FragmentPath celerybeat.service
  FragmentPath=/usr/lib/systemd/system/celerybeat.service
$ systemctl daemon-reload
```

- **<span style="color:var(--accent);">[2022-04-05 추가](https://stackoverflow.com/questions/32785720/celery-beat-not-starting-eoferrorran-out-of-input)</span>**

`Celery Beat` 의 log 를 확인해보니, status 는 정상작동을 했는데, log 에서 `Celery beat not starting EOFError('Ran out of input')` 오류를 계속 반복해서 출려하고 있었습니다. Nginx 설정값을 변경해준 뒤 링크 내용을 적용하니 해결 되었습니다.

<br/>

# Flower

## Nginx for Flower

Flower 는 Django 와 별개의포트에서 동작 합니다. Nginx 에서 외부 경로를 통해 연결할 수 있도록 아래 내용을 추가한 뒤 `Nginx` 를 재실행 합니다. [Stackoverflow 자료출처](https://stackoverflow.com/questions/41241048/django-how-can-i-access-celery-flower-page-in-production-mode) 

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

## flower.service

[Flower 공식문서](https://flower.readthedocs.io/en/latest/reverse-proxy.html) 는 Celery 동작 내용을 모니터링 GUI를 생성하는 모듈 입니다. [daemon 등록예제](https://stackoverflow.com/questions/13579047/celery-flower-as-daemon) 를 참고하여 본인의 시스템에 맞게 내용을 보완 합니다.

외부접속시 [보안](https://flower.readthedocs.io/en/latest/auth.html) 을 추가할 수 있습니다

```r
$ sudo vi /etc/systemd/system/flower.service

[Unit]
Description=Flower Celery Service

[Service]
User=USERNAME
Group=www-data
WorkingDirectory=/home/USERNAME/Source
Environment=/home/USERNAME/Python/venv/bin/celery flower -A server --broker=redis://localhost:6379/0 --basic_auth=user1:password1,user2:password2
Restart=on-failure
Type=simple

[Install]
WantedBy=multi-user.target
```

그리고 서비스에 등록 합니다.

```r
$ sudo systemctl enable flower.service        
  Created symlink 
  /etc/systemd/system/multi-user.target.wants/flower.service
  → /etc/systemd/system/flower.service.
```

## flower service 내용추가

- [2022-04-04](https://flower.readthedocs.io/en/latest/prometheus-integration.html#start-flower-monitoring)

위 내용대로 적용하면 Localhost 에서는 잘 동작을 하는 모습을 보였지만, Server 에서는 Flower 의 `status` 와 연결이 되지않아서 동작의 상세 내용을 확인할 수 없었습니다.

임시 방법으로 아래의 명령을 사용하면 터미널에서 직접 이벤트 실행 내용을 확인할 수 있습니다.

```r
$ celery -A server events --dump
```

- [2022-04-05](https://github.com/mher/flower/issues/895#issuecomment-516027096)

flower 가 `localhost` 에서 잘 작동했지만, `Django` 와 `flower` 가 `Nginx` 에 의해 다른 경로로 동작 하는 경우 `Celery task` 를 찾지 못해서 `status` 가 **online 으로 연결되지 않는** 문제가 있었습니다.

원인은 `flower` 파이썬 모듈의 `flower.js` 파일에서 `Nginx` 에서 변경된 `flower` 경로를 찾지 못해서 발생한 것이었습니다. 이를 해결하기 위해서 우선 **서버에서 `celery` 와 `celerybeat` 시스템 상태가 안정적으로 동작하는 것을** 확인 합니다.

```r
$ find ./ -name "flower.js"
 ./venv/lib/python3.8/site-packages/flower/static/js/flower.js
```

그리고 `flower.js` 파일의 `url_prefix()` 함수에서 경로명을 `Nginx` 의 설정한 경로와 일치 시켜줌으로써 해결 가능했습니다.

```javascript
// python3.8/site-packages/flower/static/js/flower.js
function   {
  var url_prefix = $('#url_prefix').val();
  if (url_prefix) {
    if (url_prefix.startsWith('/')) {
      return '/flower' + url_prefix;
    } else {
      return '/flower' + '/' + url_prefix;
    }
  }
  return '/flower';
}
```

<br/>

# Supervisor

추가적으로 터미널에서 이벤트 상태를 확인할 수 있는 모듈 입니다. Nginx 처럼 별도의 모듈로써 동작을 하기 때문에 celery 와 celerybeat 설정 내용값을 모두추가해야 합니다. [설정예제](https://gist.github.com/mau21mau/9371a95b7c14ddf7000c1827b7693801) 를 참고 하면 됩니다.

<br/>

# 참고사이트
- [Celery Document](https://django.fun/docs/celery/en/5.1/userguide/daemonizing/)
- [Deploy celery and celery beat in production with Django (Ubuntu)](https://medium.com/clean-slate-technologies/deploy-celery-and-celery-beat-in-production-with-django-ubuntu-de71ccb24907)
- [Daemonizing Celery Beat with systemd](https://ahmadalsajid.medium.com/daemonizing-celery-beat-with-systemd-97f1203e7b32)
- [Asynchronous Task with Django Celery Redis and Production using Supervisor](https://medium.com/swlh/asynchronous-task-with-django-celery-redis-and-production-using-supervisor-ef920725da03)

