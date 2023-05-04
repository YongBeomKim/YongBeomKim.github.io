---
layout: blog
title: Protection with HTTPs
tags:
- django
- nginx
---

`uvicorn` 으로 실행하고, `Nginx` 로 배포하면 `Http://` 주소로 바로 연결 가능합니다. 하지만 보안 측면에서 `Https://` 주소를 사용할 필요성이 큰 만큼 이번 기회에 `Https://` 로 배포하는 방법을 알아 보겠습니다. 전체적인 과정은 [Securely Deploy a Django App With Gunicorn, Nginx, & HTTPS](https://realpython.com/django-nginx-gunicorn/#making-your-site-production-ready-with-https) 를 참고하면 됩니다.

<figure class="align-center">
  <img width="540px" src="{{site.baseurl}}/assets/fullstack/https-vs-https.png">
  <figcaption>https-vs-https.png</figcaption>
</figure>

<br/>

# 기본설정
## SSL Port
`http://` 주소로 Client 가 요청을 하면 해상 서버의 `80`번 포트에서 서비스를 제공 합니다. 반면 `https://` 는 `443`번 포트를 통해서 서비스를 제공합니다. 때문에 서버에서 `443` 번 포트가 추가로 꼭 열려있어야 합니다. 해당 포트가 열려있지 않은 경우에는 <span style="color:var(--strong);">사이트 응답시간이 무한으로 오래</span> 걸립니다.

## Django Setting
Django 설정에서 SSL을 인식하도록 옵션값을 추가 합니다. 그리고 `ALLOWED_HOSTS` 와 `CSRF_TRUSTED_ORIGINS` 주소를 입할 때에도, SSL 을 발급받은 주소 이름과 동일한 이름을 입력해야 합니다.
```python
# https://docs.djangoproject.com/en/4.2/ref/settings/#secure-proxy-ssl-header
SECURE_SSL_REDIRECT = True
ALLOWED_HOSTS = [
  <도메인.이름>
]
CSRF_TRUSTED_ORIGINS = [
  'http://<도메인.이름>',
  'https://<도메인.이름>',
]
```

# Certbot
## Certbot 설치 및 실행
[certbot-nginx](https://github.com/certbot/certbot) 는 파이썬으로 만들어진 패키지로 SSL 보안에 필요한 도구를 설치하고 설정값을 수정하는 과정까지 모두 자동으로 진행 됩니다.

`SSL 인증서`를 발급 받을 때, `도메인 주소` 가 필요한데 별도로 입력하지 않으면 `Nginx` 설정값일 확인하고 `server name` 에 입력한 값을 가져와서 자동으로 실행 합니다. 때문에 이미 `nginx` 가 원활하게 작동하고 있다면 별다른 옵션 값 추가 없이 아래의 명령을 실행하면 됩니다. 

```bash
$ sudo snap install certbot --classic
$ sudo certbot --nginx
$ sudo certbot --nginx -d <도메인.주소>

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/<도메인.주소>/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/<도메인.주소>/privkey.pem
This certificate expires on 2023-08-02.
```

## Nginx Setting
작업을 마치면, `Nginx` 에서도 `SSL` 인증서를 활용할 수 있도록 설정값을 추가해야 됩니다. 하지만 `certbot` 에서 자동으로 필요한 내용을 추가했기 때문에 어떠한 내용이 추가되었는지 확인만 하고 넘어가겠습니다. 주석에 `# managed by Certbot` 가 붙어있는 부분이 자동으로 설정값을 추가한 내용 입니다.
```bash
server {
	server_name 도메인.네임;

  listen [::]:443 ssl ipv6only=on; # managed by Certbot
  listen 443 ssl; # managed by Certbot
  ssl_certificate /etc/letsencrypt/live/도메인.네임/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/도메인.네임/privkey.pem; # managed by Certbot
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = 도메인.네임) {
        return 301 https://$host$request_uri;
    } # managed by Certbot
	listen 80 default_server;
	listen [::]:80 default_server;
	server_name 도메인.네임;
    return 404; # managed by Certbot
}
```

## 접속확인
`443 Port` 개방여부 확인 **<span style="color:var(--strong);">(안 열려 있는경우 무한로딩 상태)</span>**, `Django Allowed host & CSRF` 설정값 확인 **<span style="color:var(--strong);">(문제가 있는 경우, 400 Bad Request 메세지를 Nginx 에서 출력)</span>, `Nginx` 정상동작 확인을 거치고 나면 이제 정상적으로 서비스를 하는것을 확이할 수 있습니다. 기존의 `http://:80` 주소를 입력하면 `Nginx` 에서 자동으로 `Http://:433` 주소값으로 자동으로 `Re-direct` 합니다.

## 인증서 정보확인
`https:\\` 주소로 접속되고 있으면 브라우저를 통해 인증서 내용을 확인할 수 있습니다. 서버에 접속한 상태에서도 동일한 정보를 확인할 수 있고, 터미널에서 갱신작업을 완료한 뒤, 해당 인증서 유효기간이 연장되었는지를 확인하는다 유용 합니다.
```bash
$ sudo certbot certificates
Saving debug log to /var/log/letsencrypt/letsencrypt.log
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Found the following certs:
  Certificate Name: <도메인.이름>
    Expiry Date: 2023-08-02 00:54:49+00:00 (VALID: 89 days)
    Certificate Path: /etc/letsencrypt/live/<도메인.이름>/fullchain.pem
    Private Key Path: /etc/letsencrypt/live/<도메인.이름>/privkey.pem
```

## 인증서 갱신
`Certbot` 에서 발급한 인증서는 `3달의 유효기간` 을 갖습니다. 해당절차 진행시 이메일 주소를 입력하면 해당 주소의 인증서가 만료될 때 안네 메일을 보내주고 이를 확인하여 갱신 작업을 진행하면 됩니다.

갱신작업을 할 때 `--dry-run` 옵션을 추가하면, 실제 작업을 진행하지 않고 갱신 작업이 가능한지 여부를 미리 확인할 수 있습니다. 아래와 같이 (success) 메세지를 출력하는지 확인 합니다. 만약 문제가 발생하였다면 해당 문제의 원인을 미리 해결해야 갱신 작업이 원활하게 진행될 수 있습니다.
```bash
$ sudo certbot renew --dry-run       
Saving debug log to /var/log/letsencrypt/letsencrypt.log
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Processing /etc/letsencrypt/renewal/<도메인.주소>.conf
Congratulations, all simulated renewals succeeded: 
  /etc/letsencrypt/live/<도메인.주소>/fullchain.pem (success)
```

유효기간을 연장할려면 앞의 `--dry-run` 옵션을 제외하고 실행을 합니다.
```bash
$ sudo certbot renew
```

## CronTab 으로 자동갱신설정 추가하기

## 리버스 프록시로 Transmisson Https 로 실행하기

<br/>

## 참고사이트
- [SSL Certbot을 이용한 인증서 갱신하기.](https://smoh.tistory.com/406)
- [Nginx 리버스 프록시(Reverse Proxy) 개념 및 사용법](https://narup.tistory.com/238)
- [Transmisson Nginx](https://www.clien.net/service/board/cm_nas/15265772)