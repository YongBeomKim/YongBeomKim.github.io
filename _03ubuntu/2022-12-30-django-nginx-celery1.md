---
layout: blog
title: Deploy Django with Nginx, Celery, Flower (Part 1)
tags:
- django
- celery
- flower
- nginx
---

Django 서비스 배포와 관련한 내용들을 순서대로 모아보는 시간을 갖도록 하겠습니다. 작업의 순서는 1. Nginx 위에 Django 올리기, 2. Celery 동작 확인하기 3. Flower 단계로 진행하겠습니다. Celery 와 관련된 코딩 내용을 앞에 상세하게 서술된 만큼 이번 페이지 에서는 배포를 위한 내용을 중심으로 진행 하겠습니다.

<br/>

# Nginx 위에 Django 올리기

## [How to deploy Django](https://docs.djangoproject.com/ko/4.1/howto/deployment/)

공식 문서에서는 `Celery` 비동기 모듈을 사용하는 경우, `WSGI`(only supports synchronous) 와 `ASGI`(비동기 친화적인 표준) 중 `ASGI` 를 활용해야 하고 이 경우에는 [uvicorn](https://www.uvicorn.org/deployment/) 을 사용하는 방법을 공식문서에서 설명하고 있습니다. 자세한 내용은 [ASGI와 Uvicorn 그리고 Gunicorn과 함께 사용하기](https://jonnung.dev/python/2021/10/24/asgi-uvicorn-with-guicorn/#gsc.tab=0) 를 참고합니다.

간단히 요약하면 [uvicorn](https://www.uvicorn.org/deployment/) 비동기 처리 모듈이 파이썬의 `GIL` 등의 이유로 싱글코어만 지원하는 한계로 인해 [Gunicorn](https://gunicorn.org/) 의 멀티코어 활용을 함께 사용하도록 권장하고 있으며, 실행 스크립트 내용은 다음과 같습니다.

```r
$ python -m gunicorn <myproject 이름으로 변경>.asgi:application -k uvicorn.workers.UvicornWorker
```

## [Nginx](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/#official-debian-ubuntu-packages) 개요

Nginx 에서 우리가 작업할 파일 및 폴더들은 다음과 같습니다. `Nginx 의 권한설정 내용` 은 `Nginx.conf` 파일에서 관리를 하고, `가상 호스트 서버 블록` 내용은 `conf.d` 와 `site-available` 폴더에서 관리를 합니다. 두 폴더의 구체적인 차이는 [Difference in sites-available vs sites-enabled vs conf.d directories](https://serverfault.com/questions/527630/difference-in-sites-available-vs-sites-enabled-vs-conf-d-directories-nginx) 를 참고 합니다.

```r
/etc/nginx » tree .
.
├── conf.d <folder>
├── sites-available
│   └── default
├── sites-enabled
│   └── default -> /etc/nginx/sites-available/default
└── nginx.conf
```

## Nginx 의 권한설정 `nginx.conf`

`nginx.conf` 파일에서는 `user` 이름값이 중요한데 `root` 가 아닌 다른 사용자 이름을 추가 합니다.  nginx 가 [최고권리자에 접근하지 못하도록 설정값을 지정](https://opentutorials.org/module/384/4530) 해야 합니다. 개별 설정 값들에 대한 설명은 [nginx 환경 설정 conf](https://m.blog.naver.com/youngchanmm/221905488244) 을 참고 합니다. 

## Nginx 의 가상 호스트 등록 `sites-available/default`

localhost 인 `http://127.0.0.1` 내부 url 주소와 Python Django, Celery, Flower 의 기본 포트 값을 참고하여 다음과 같이 작성하였습니다. [flower](https://stackoverflow.com/questions/41241048/django-how-can-i-access-celery-flower-page-in-production-mode) 설정과 관련된 내용은 링크를 참고 합니다. `flower` 앱이 업데이트 되면서 `celery flower --url_prefix=flower` 옵션을 활용하면, Nginx 의 `redirect` 설정과 `flower.js` 파일의 수정이 불필요해 졌습니다. [2023-01-23 Changed the url_prefix to rewrite the handlers regex patterns](https://github.com/mher/flower/pull/766#issuecomment-703741612)

```r
server {
  listen 80;
  listen [::]:80;
  server_name momukji.com www.momukji.com;
  charset      utf-8;

  location / {
    proxy_pass http://127.0.0.1:8000;
  }

  location /static/ {
    autoindex on;
    alias /home/erdos/Source/django/staticfiles/;
    expires 1d;
  }

  location ~ ^/flower/? {
    # rewrite ^/flower/?(.*)$ /$1 break;
    # sub_filter '="/' '="/flower/';
    sub_filter_last_modified on;
    sub_filter_once off;

    # proxy_pass http://unix:/tmp/flower.sock:/;
    proxy_pass http://127.0.0.1:5555;
    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_http_version 1.1;
  }
}
```



<br/>

## 403 Error

`403` 오류는 권한이 없이 때문에 발생하는 문제 입니다. 이와 관련하여 다음 2가지를 확인하면 됩니다. 1번은 `staticfiles` 에서 문제가 발생하는 경우로 `우분투 배포 관리자` 를 `root` 가 아닌 다른 이름으로 추가를 한 뒤, 그 이름으로 소스 파일을 작업한 뒤, Nginx 에서 `User` 이름을 일치 시키면 쉽게 해결 가능 합니다. 2번은 `admin` 관리자 페이지에서 `csrf` 오류와 함께 `403` 메세지를 출력하는 경우 입니다.
1. [Nginx](https://stackoverflow.com/questions/16808813/nginx-serve-static-file-and-got-403-forbidden) 의 `user` 사용자가 해당 파일에 접근 권한을 추가 합니다.
2. [Django](https://forum.djangoproject.com/t/django-admin-panel-login-403-error-csrf/12720/3) 에서 `ALLOWED_HOSTS` 와 `CSRF_TRUSTED_ORIGINS` 에 배포하는 주소값이 포함 되어 있는지 확인 합니다

## Service 등록

앞의 과정들이 모두 해결 되었다면, 부팅시 자동으로 실행하는 서비스 스크립트를 작성 후 등록 합니다.

```r
$ sudo vi /etc/systemd/system/uvicorn.service

[Unit]
Description=uvicorn daemon
After=network.target

[Service]
User=USERNAME
Group=USERNAME
WorkingDirectory=/home/USERNAME/django
ExecStart=/home/USERNAME/venv/bin/gunicorn server.asgi:application -k uvicorn.workers.UvicornWorker

[Install]
WantedBy=multi-user.target

$ sudo systemctl enable uvicorn
$ sudo systemctl start uvicorn
$ sudo systemctl -f stop uvicorn
$ sudo systemctl status uvicorn
```
