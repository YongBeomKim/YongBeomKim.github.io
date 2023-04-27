---
layout: blog
title: Deploy Django with Nginx, Celery, Flower (Part 2)
tags:
- django
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

## flower.js

기존에는 `flower.js` 파일을 [수정](https://github.com/mher/flower/issues/895) 하는 등의 내용이 필요했는데, `flower` 앱이 업데이트 되면서 `celery flower --url_prefix=flower` 옵션을 활용하면, Nginx 의 `redirect` 설정과 `flower.js` 파일의 수정이 불필요해 졌습니다. [2023-01-23 Changed the url_prefix to rewrite the handlers regex patterns](https://github.com/mher/flower/pull/766#issuecomment-703741612)

## NGINX
```r
  location ~ ^/flower/? {
    #rewrite ^/flower/?(.*)$ /$1 break;
    #sub_filter '="/' '="/flower/';
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
ExecStart=/home/erdos/Source/venv/bin/celery -A 
  server flower --url_prefix=flower --address=127.0.0.1 
  --broker=redis://localhost:6379/0 --basic_auth=username:password
Restart=on-failure
Type=simple

[Install]
WantedBy=multi-user.target
```

<br/>

# Nginx 와 Multiple Domain
- [Serving multiple Django applications with Nginx and Gunicorn](https://www.youtube.com/watch?v=koo3bF2EPqk)
- [nginx를 사용하여 멀티 도메인 연결하는 방법](https://webisfree.com/2018-01-06/nginx%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EB%A9%80%ED%8B%B0-%EB%8F%84%EB%A9%94%EC%9D%B8-%EC%97%B0%EA%B2%B0%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
- [Serving multiple Django applications with Nginx and Gunicorn](https://michal.karzynski.pl/blog/2013/10/29/serving-multiple-django-applications-with-nginx-gunicorn-supervisor/)

<br/>

## 참고사이트
- [Celery 무작정 시작하기 (5) - Monitoring](https://heodolf.tistory.com/73)
- [Flower Github](https://github.com/mher/flower)
- [Document](https://flower.readthedocs.io/en/latest/reverse-proxy.html?highlight=nginx#running-behind-reverse-proxy)
- [Celery Flower Security](https://www.appsloveworld.com/django/100/3/celery-flower-security-in-production)
- [Configuring Celery + Redis + Supervisor with Django](https://gist.github.com/hamzaakhtar953/2197681306bf8417c4d1a5e2b8e4eaef)
- [Configure Celery + Supervisor With Django](https://gist.github.com/mau21mau/9371a95b7c14ddf7000c1827b7693801)