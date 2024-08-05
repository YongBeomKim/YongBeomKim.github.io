---
layout: blog
title: (Nginx) 504 Gateway Time-out
tags:
- nginx
---

**Nginx 504** 오류는 `5xx (서버 오류) 서버가 유효한 요청을 처리하는 데 실패했다.` 는 의미를 갖는 오류입니다.

> 504 Gateway Time-out (nginx/1.18.0 (Ubuntu))

지난번에는 **502** 오류에 대하여 알아봤다면, 이번에는 동일한 파일을 새로 작업을 시작하는데 위와같은 오류를 출력하였습니다. [ Nginx 504, Nginx 502 에러 해결(Feat. Gunicorn)](https://velog.io/@ssssujini99/WebError-Nginx-504-Nginx-502-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%EA%B8%B0-Feat.-Gunicorn) 문서에서 관련한 내용이 상세하게 정리가 잘 되어 있었습니다.

위 내용을 적용한 결과 바로 해결이 되지 않았습니다. 급할수록 돌아가라는 말이 있는 것처럼 배포와 관련하여 그동한 발생한 문제들을 하나씩 점검해 보겠습니다.
1. **certBot** SSL 인증서 갱신하기 - 그동안 오류발생
2. **Django SSL 관련 설정내용** 재확인 - `$ ./manage.py check --deploy`
3. django 에서 uwsgi, asgi 배포를 위한 uvicorn, gunicorn 내용 확인하기
4. **Nginx** 에서 **socket** 활용내용 확인하기

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

**WSGI (Web Server Gateway Interface)** 는 파이썬에서 사용되는 개념입니다. 서버에서 요청을 하면 Callback 함수를 실행합니다. 이처럼 중간에서 인증이나 쿠키 등을 관리하는 역할을 하는 것을 **WSGI Middleware** 라고 하는데, WSGI application의 일종입니다. 프로세스 관리자인 **gunicorn** 등이 이에 포함됩니다.

> ASGI

WSGI는 **동기적인 callable** 요청을 받아 응답을 리턴하는 방식 입니다. 때문에 길게 유지되어야 하는 **uvloop long-poll HTTP** 나 **웹 소켓** 에는 적합하지 않았습니다. 이를 개선하기 위해서 **ASGI** 가 만들어졌습니다. 멀티 프로세스 환경을 구성하는 **uvicorn** 등이 이에 포함됩니다.

이처럼 `gunicorn 과 uvicorn` 은 상호 보완적인 기능을 제공하고 있어서 배포시 이 둘을 함께 활용하고 있습니다. 실행 명령어는 다음과 같습니다.
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

<br/>

# Nginx
## Warning
```bash
$ nginx -t
nginx: [warn] the "user" directive makes sense only if the master process runs with super-user privileges, ignored in /etc/nginx/nginx.conf:2
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: [emerg] open() "/run/nginx.pid" failed (13: Permission denied)
nginx: configuration file /etc/nginx/nginx.conf test failed

$ sudo nvim /etc/nginx/nginx.conf
```

<br/>

# Linux
## Sub-process /usr/bin/dpkg returned an error code (1)
패키지 설치 및 업데이트를 진행하는 경우, 다음과 같은 오류가 발생하였습니다.
```bash
$ sudo apt upgrade

Errors were encountered while processing:
 transmission-daemon
needrestart is being skipped since dpkg has failed
E: Sub-process /usr/bin/dpkg returned an error code (1)
➜  ~ client_loop: send disconnect: Broken pipe
```

위와같은 오류로 업데이트 및 설치가 중단되는 경우에는 다음의 내용을 실행하는 것으로 해결 가능했습니다. [E: Sub-process /usr/bin/dpkg returned an error code (1) 에러해결](https://lovflag.tistory.com/47)
```bash
sudo rm /var/lib/dpkg/info/*
sudo dpkg --configure -a
sudo apt-get update
```

## Certbot SSL Install
앞에서 Django 개발자가 작업한 내용이 원활하게 배포 가능하다는 것을 확인 하였습니다. 이제부터는 서버의 기본 설정에 대해서 알아보겠습니다. `SSL` 인증서 발급 및 배포와 관련된 프로그램들을 설치 합니다.
```bash
$ sudo apt install certbot python3-certbot-nginx
```

## Certbot Certificates
인증서를 확인할 때 `Another instance of Certbot is already running.` 오류를 출력하였습니다. [SSL보안인증서 설치시 Another instance of Certbot is already running](https://linguist79.tistory.com/1514) 를 참고하여 아랫 내용을 실행하고 나면 정상동작하는 것을 확인 할 수 있었습니다.
```bash
$ sudo certbot certificates

Another instance of Certbot is already running.
Ask for help or search for solutions at https://community.letsencrypt.org. See the logfile /tmp/tmp98hh_l1r/log or re-run Certbot with -v for more details.

$ sudo find / -type f -name ".certbot.lock" -exec rm {} \;
```

인증서가 만료되어 갱신을 하려고 했는데 다음과 같은 오류를 출력하였습니다.
```bash
$ sudo certbot renew
...
Certbot failed to authenticate some domains (authenticator: nginx).
The Certificate Authority reported these problems:
  Detail: 1.1.1.1: Fetching http:/site.com/.well-known/acme-challenge/k9odol4iZhWo3rRPn-K-aLVBzd-h4bbLDPbtbJwpeSs: Timeout during connect (likely firewall problem)

Hint: The Certificate Authority failed to verify the temporary nginx configuration changes made by Certbot. Ensure the listed domains point to this nginx server and that it is accessible from the internet.
```

`Let's Encrypt` 커뮤니티 등에서는 [Timeout during connect (likely firewall problem)](https://community.letsencrypt.org/t/timeout-during-connect-likely-firewall-problem/191530/6) 80, 443 포트가 열려있지 않아서 발생하는 문제로 해당 포트를 열어주면 해결 될 것으로 이야기를 했지만 [SSL보안인증서 설치시 Another instance](https://linguist79.tistory.com/1514) 저에게는 해당되지 않았습니다. 

[Plesk Community](https://talk.plesk.com/threads/lets-encrypt-timeout-during-connect-likely-firewall-problem.371288/post-933995) 커뮤니티 글 속의 **"wildcard" method and use external DNS** 에서 원인을 추측할 수 있었습니다. **iptime 공유기의 DDNS** 를 활용하여 발급받은 도메인이라서 중간에 바뀐 정보로 인하여 갱신에 문제가 발생한 것이 아닐까 하고 있습니다.

## Delete
이처럼 다양한 원인 또는 불명확한 원인이 발생한 경우에는 삭제 후 재설치 과정을 진행하는 것이 가장 빠른 해결책 입니다. 인증서를 삭제한 뒤 nginx 설정값에 포함된 인증서 내용들을 삭제해 보겠습니다
```bash
$ sudo certbot delete         
- - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: site.com
- - - - - - - - - - - - - - - - - - - - - - - - - - - -
Are you sure you want to delete the above certificate(s)?
(Y)es/(N)o: y

$ sudo certbot certificates
- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Saving debug log to /var/log/letsencrypt/letsencrypt.log
- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
No certificates found.
```

## Re Install
[Let’s Encrypt 인증서로 NGINX SSL 설정하기](https://nginxstore.com/blog/nginx/lets-encrypt-%EC%9D%B8%EC%A6%9D%EC%84%9C%EB%A1%9C-nginx-ssl-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0/) 내용으로 재설치 과정을 진행하겠습니다...

```bash
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
All renewals failed. The following certificates could not be renewed:
  /etc/letsencrypt/live/mrmarket.kr/fullchain.pem (failure)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1 renew failure(s), 0 parse failure(s)
Ask for help or search for solutions at https://community.letsencrypt.org. See the logfile /var/log/letsencrypt/letsencrypt.log or re-run Certbot with -v for more details.
➜  ~ sudo certbot renew --dry-run
Saving debug log to /var/log/letsencrypt/letsencrypt.log

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Processing /etc/letsencrypt/renewal/mrmarket.kr.conf
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Simulating renewal of an existing certificate for mrmarket.kr

Certbot failed to authenticate some domains (authenticator: nginx). The Certificate Authority reported these problems:
  Domain: mrmarket.kr
  Type:   connection
  Detail: 113.60.151.93: Fetching http://mrmarket.kr/.well-known/acme-challenge/_nSe7ZPzIBn0TehfkbDAz-uwhtnp1qYYRqQKsXDCBSA: Timeout during connect (likely firewall problem)

Hint: The Certificate Authority failed to verify the temporary nginx configuration changes made by Certbot. Ensure the listed domains point to this nginx server and that it is accessible from the internet.

Failed to renew certificate mrmarket.kr with error: Some challenges have failed.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
All simulated renewals failed. The following certificates could not be renewed:
  /etc/letsencrypt/live/mrmarket.kr/fullchain.pem (failure)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1 renew failure(s), 0 parse failure(s)
Ask for help or search for solutions at https://community.letsencrypt.org. See the logfile /var/log/letsencrypt/letsencrypt.log or re-run Certbot with -v for more details.
```
```bash
$ sudo snap install certbot --classic
$ sudo certbot certificates
$ sudo certbot renew --dry-run
$ sudo certbot renew -n -q
$ sudo certbot renew
```

# 참고사이트
- [eff-certbot.readthedocs](https://eff-certbot.readthedocs.io/en/stable/using.html#nginx)
- [Nginx 504, Nginx 502 에러 해결(Feat. Gunicorn)](https://velog.io/@ssssujini99/WebError-Nginx-504-Nginx-502-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%EA%B8%B0-Feat.-Gunicorn)
- [Python - gunicorn, uvicorn(wsgi, asgi)](https://velog.io/@so-eun/Python-gunicorn-uvicornwsgi-asgi)
- [Deploy Django with Nginx and Gunicorn on Ubuntu](https://youtu.be/S5TfD50s4Lo?si=kwOFQLlcsU6E4hPm)
- [ASGI Django, Nginx and Uvicorn on Ubuntu](https://gautamankul.medium.com/how-deploy-an-asgi-django-application-with-postgres-nginx-and-uvicorn-on-ubuntu-607f3b97fef3)
