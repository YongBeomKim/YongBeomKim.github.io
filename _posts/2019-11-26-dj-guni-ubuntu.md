---
title : Django Nginx Gunicorn on Ubuntu 18
last_modified_at: 2019-11-26T10:45:06-05:00
header:
  overlay_image: /assets/images/code/Django_SetUp.png
categories:
  - django
tags: 
    - django
    - gunicorn
---

**Django 배포** 를 정리해 보겠습니다. 이번에는 앞에서 정리한 **CentOS** 내용을 바탕으로 **Ubuntu** 에서 설치하는 내용을 정리해 보겠습니다. 

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/react/nginx_gunicorn.jpg">
  <figcaption>https://villoro.com/post/nginx_gunicorn</figcaption>
</figure>

<br/>

# Nginx

## Install

우분투에서 설치 및 실행과정은 다음과 같습니다.

```r
$ sudo apt-get install nginx
$ sudo service nginx start
$ service nginx status
● nginx.service - A high performance web server
   Active: active (running) since 28min ago
           ├─716 nginx: /usr/sbin/nginx -g daemon on;
```

**Nginx** 기본 명령어는 다음과 같습니다.

```r
$ nginx           # 활성화
$ nginx -s stop   # 정지
$ nginx -s reload # 재기동
$ nginx -t        # Nginx 설정파일 유효성 검사
$ nginx -h        # Nginx 도움말
```

## Setting

`nginx.conf` 가 Nginx 의 기본 설정파일 내용이고, 이를 바탕으로 구체적인 실행 내용은 `sites-available/default` 에서 설정 합니다.

가정 통신망은 **80번 포트** 를 막는 경우가 있습니다. **공유기 포트포워딩** 을 활용하여 **내부 82번** 포트를 **외부 80번 포트로** 변경하면 해결 가능합니다. 우분투의 포트도 연 뒤 **Nginx** 실행을 확인 합니다.

```r
$ /etc/nginx » tree
  ├── sites-available
  │   └── default
  ├── sites-enabled
  │   └── default -> /etc/nginx/sites-available/default
  └── nginx.conf

$ sudo nvim /etc/nginx/nginx.conf
  user  erdos;
  worker_processes;

$ sudo nvim /etc/nginx/sites-available/default
  server {
    listen 82;
    ...
  }

$ sudo iptables -I INPUT 1 -p tcp --dport 82 -j ACCEPT
```

<br/>

# Django & Gunicorn

Django 기본 설정에서 다음의 내용만 추가 하였습니다. 별도 `staticollection` 을 실행하지 않고 **static** 설정만 연결한 뒤 실행하였는데 제대로 작동하는 내용을 보여 줬습니다.

```r
$ mysite/settings.py
  STATIC_ROOT = os.path.join(BASE_DIR, 'static/')

$ sudo nvim /etc/nginx/sites-available/default

  server {
      listen 82;
      server_name _;
      location / {
          proxy_pass http://0.0.0.0:8000;
      }
  }

$ vi /etc/nginx/nginx.conf
user  사용자ID;
```

위 내용들을 수정한 뒤, 서버를 재부팅 하고 **Nginx** 를 재가동 해야 제대로 연결됨을 확인할 수 있습니다.

1. **[Supervisor](https://villoro.com/post/nginx_gunicorn)** 를 활용한 활성화
2. **[Systemd 을 활용한 등록 1](https://www.alibabacloud.com/blog/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04_594319)**
3. **[Systemd 을 활용한 등록 2](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-centos-7)**
4. **[RedHot 8 Django Setting](https://www.redhat.com/en/blog/setting-django-application-rhel-8-beta)**
5. **[CentOS 7 Django Setting](https://simpleisbetterthancomplex.com/tutorial/2017/05/23/how-to-deploy-a-django-application-on-rhel.html)**
6. **[Ubuntu 19.04 Django Setting](https://www.techsupportpk.com/2019/08/how-to-set-up-django-with-postgres-nginx-gunicorn-ubuntu-1904.html)**