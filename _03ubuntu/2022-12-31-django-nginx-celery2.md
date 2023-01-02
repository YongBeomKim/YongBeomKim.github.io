---
layout: blog
title: Deploy Django with Nginx, Celery, Flower (Part 2)
tags:
- django
- celery
- flower
- nginx
---

앞에서 Nginx 설정과 Django 서비스 등록을 성공적으로 진행 하였다면, 현재 배포를 지정한 주소값을 입력하면 서비스가 제대로 제공되고 있음을 알 수 있습니다. 이제부터는 부가적으로 `Django` 의 스케쥴링 비동기 작업을 수행하는 `Celery` 와 이를 모니터링 하는 `Flower` 설치 및 배포에 대해 알아보겠습니다.

<br/>

# Celery

## Django Project

`Celery` 실행없이 `Django Shell` 에서 `Celery` 를 실행하면 `celery redis AttributeError: 'ChannelPromise' object has no attribute '__value__'` 등의 오류를 출력 합니다.

`Django` 에서 `Celery` 실행을 점검하기 위한 요소는 다음과 같습니다. [참고문서](https://docs.celeryq.dev/en/stable/django/first-steps-with-django.html)

1. 연결을 위한 `messenger` 로 `redis, rabbitmq` 의 설치 및 실행 여부를 확인 합니다.
1. `django` 에서 `Celery('', broker=, backend=,)` 연결 내용을 확인 합니다.
1. `django` 프로젝트 `__init__.py` 파일에서 `__all__ = ('app',)` 을 확인 합니다.
1. `Celery worker` 를 실행한 상태에서 `Django` 에서 실행 내용을 확인 합니다.

<br/>

# Flower

`flower 1.0.0` 일때 성공한 내용 입니다.


## flower.js

## NGINX
```r
  location ~ ^/flower/? {
    rewrite ^/flower/?(.*)$ /$1 break;

    sub_filter '="/' '="/flower/';
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
```

## Service

```r
[Unit]
Description=Flower Celery Service
Requires=celery.service
After=network.target

[Service]
User=erdos
Group=www-data
WorkingDirectory=/home/erdos/Source/django
Environment="PATH=/home/erdos/Source/venv/bin"
ExecStart=/home/erdos/Source/venv/bin/celery -A server flower --address=127.0.0.1 --broker=redis://localhost:6379/0 --basic_auth=pi:saltman21
Restart=on-failure
Type=simple

[Install]
WantedBy=multi-user.target
```

## 참고사이트
- [Celery 무작정 시작하기 (5) - Monitoring](https://heodolf.tistory.com/73)
- [Flower Github](https://github.com/mher/flower)
- [Document](https://flower.readthedocs.io/en/latest/reverse-proxy.html?highlight=nginx#running-behind-reverse-proxy)
- [Celery Flower Security](https://www.appsloveworld.com/django/100/3/celery-flower-security-in-production)
- [Configuring Celery + Redis + Supervisor with Django](https://gist.github.com/hamzaakhtar953/2197681306bf8417c4d1a5e2b8e4eaef)
- [Configure Celery + Supervisor With Django](https://gist.github.com/mau21mau/9371a95b7c14ddf7000c1827b7693801)

현재 `flower 1.2.0` 으로 업데이트 되면서 수정 및 변경이 조금  
