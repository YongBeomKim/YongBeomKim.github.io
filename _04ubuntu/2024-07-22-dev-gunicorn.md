---
layout: blog
title: (DEV) Django with Uvicorn & Gunicorn
tags:
- nginx
---

Django 로 작업한 서비스를 배포하기 전에 코딩한 내용이 제대로 동작하는지를 확인해 보겠습니다.

<br/>

# Django
## [Deploying Django using Uvicorn and Gunicorn](https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/uvicorn/#deploying-django-using-uvicorn-and-gunicorn)
Django 에서 기본 생성된 파일을 보면 `wsgi` 와 `asgi` 이름을 확인할 수 있습니다. 이들에 대한 개념들을 먼저 알하보겠습니다.
```bash
├── mysite
│   ├── asgi.py
│   ├── wsgi.py
│   └── settings.py
└── manage.py
```

> WSGI

**WSGI (Web Server Gateway Interface)** 는 파이썬에서 종속된 인터페이스 입니다. 서버에서 요청을 하면 Callback 함수를 실행합니다. 이처럼 중간에서 인증이나 쿠키 등을 관리하는 역할을 하는 것을 **WSGI Middleware** 라고 하는데, WSGI application의 일종입니다. 프로세스 관리자인 **gunicorn** 등이 이에 포함됩니다.

> ASGI

WSGI는 **동기적인 callable** 요청을 받아 응답을 리턴하는 방식 입니다. 때문에 길게 유지되어야 하는 **uvloop long-poll HTTP** 나 **웹 소켓** 에는 적합하지 않았습니다. 이를 개선하기 위해서 **ASGI** 가 만들어졌습니다. 

**ASGI (Async Server Gateway Interface)** 파이썬 Async 웹서버 표준 인터페이스 입니다. 멀티 프로세스 환경을 구성하는 **uvicorn** 등이 이에 포함됩니다.

## **Uvicorn**
이처럼 **gunicorn** 과 **uvicorn** 은 상호 보완적인 기능을 제공하고 있어서 배포시 이 둘을 함께 활용하고 있습니다. 

비동기 실행하는 파이썬 모듈이 [uvloop](https://pypi.org/project/uvloop/) 입니다. 모든 기능을 활성화 하려면 설치를 할때 다음과 같이 설치를 진행하여야 `uvloop` 까지 활성화가 가능 합니다.
```bash
$ pip install `uvicorn[standard]`
```

설치를 완료했으면 터미널에서 실행하는 명령어는 다음과 같습니다.
```bash
$ python -m gunicorn mysite.asgi:application
   -k uvicorn.workers.UvicornWorker

$ python -m gunicorn server.asgi:application 
   --timeout=120 --workers 3 --worker-class 
   uvicorn.workers.UvicornWorker
[2020-01-01 01:01:00 +0900] [8561] [INFO] Starting gunicorn 22.0.0
[2020-01-01 01:01:00 +0900] [8561] [INFO] Listening at: http://127.0.0.1:8000 (8561)
[2020-01-01 01:01:00 +0900] [8561] [INFO] Using worker: uvicorn.workers.UvicornWorker
[2020-01-01 01:01:00 +0900] [8562] [INFO] Booting worker with pid: 8562
```

옵션에 활용되는 파라미터들에 대한 설명은 다음과 같습니다.
- `--daemon` : 백그라운드 실행
- `--workers` : 프로세스 개수 (최대 vcpu 개수 * 2만큼 설정을 권장)
- `--worker-class` : 프로세스를 다중으로 실행하기 위해 필요한 옵션
- `--access-logfile` : ./access_log.log : access_log.log 이름으로 로그를 저장


## Service 등록하기
최소 설정값을 지정하여 운영을 하다가 `Nginx 504` 오류를 출력하였습니다. 서비스가 커짐에 따라 서비스 시작시 초기 응답시간이 길어지게 되고, 이로써 연결되는 프로세스 중간에 문제가 발생하게 되어 원활한 서비스가 운영되지 않는 문제가 발생합니다.  

Django 서비스에서 `worker` 와 `thread` 그리고 `timeout` 숫자를 여유있게 설정 합니다. 참고로 `worker` 갯수는 cpu 1개에 여러개를 Async 로 운영하는 것으로 여유있게 숫자를 입력합니다.
```bash
$ sudo cat /etc/systemd/system/uvicorn.service
[Unit]
Description=uvicorn daemon
After=network.target

[Service]
User=erdos
Group=erdos
WorkingDirectory=/home/erdos/Source/django
Restart=on-failure
ExecStart=/home/erdos/Source/.venv/bin/gunicorn \
		server.asgi:application -w 9 \
		-k uvicorn.workers.UvicornWorker \
		--bind=127.0.0.1 \
		--timeout=200 \
		--threads=3

[Install]
WantedBy=multi-user.target
```

위의 값을 참고하여 `Nginx` 설정에서도 proxy 의 읽기와 쓰기 대기시간을 여유있게 할당 합니다. 주의할 점은 `proxy_connect_timeout` 값은 `75`를 넘지 않아야 합니다.
```r
server {

	# root /var/www/html;
	server_name www.mrmarket.kr;
	listen 80;
	listen [::]:80;
	charset utf-8;
	
	#ssl off;
	# certbot ssl
	location ^~ /.well-known/acme-challenge/ {
		default_type "text/plain";
		root /var/www/letsencrypt;
	}

	location / {
      ... 

		# 504 Nginx Error:
		proxy_connect_timeout 75;
		proxy_send_timeout 300;
		proxy_read_timeout 300;
		#send_timeout 300s;
	}
```



## 참고사이트
- [Python - gunicorn, uvicorn(wsgi, asgi)](https://velog.io/@so-eun/Python-gunicorn-uvicornwsgi-asgi)
- [Deploy Django with Nginx and Gunicorn on Ubuntu](https://youtu.be/S5TfD50s4Lo?si=kwOFQLlcsU6E4hPm)
- [ASGI Django, Nginx and Uvicorn on Ubuntu](https://gautamankul.medium.com/how-deploy-an-asgi-django-application-with-postgres-nginx-and-uvicorn-on-ubuntu-607f3b97fef3)