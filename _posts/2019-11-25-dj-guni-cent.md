---
title : Django Nginx Gunicorn on CentOS 7.6
last_modified_at: 2019-11-25T10:45:06-05:00
header:
  overlay_image: /assets/images/code/Django_SetUp.png
categories:
  - django
tags: 
    - django
    - gunicorn
---

**Django 배포** 를 정리해 보겠습니다. 이번 사례는 앞에서 설정한 **CentOS** 에서 **Django (8000번 Port)** 로 작업한 내용을 **gunicorn (8000번 Port)** 미들웨어를 활용하여 **Nginx (80번 Port)** 서버로 배포하는 내용을 정리 합니다. [대표참고 블로그](https://nachwon.github.io/django-deploy-3-nginx/)

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/react/nginx_gunicorn.jpg">
  <figcaption>https://villoro.com/post/nginx_gunicorn</figcaption>
</figure>

<br/>

# CentOS Setting

## 필요한 기본모듈 설치

```r
$ yum install gcc gcc-c++ 
$ yum install zlib-devel
$ yum install openssl openssl-devel
$ yum install sqlite sqlite-devel
$ yum install wget tree
```

```r
$ yum install screen
$ yum install supervisor
$ supervisord
```

<br/>

# Django & Gunicorn

**Django** 내부에 **runserver** 설정이 있지만 서버연결에 부하가 많아서, 분산처리를 하는 **Gunicorn** 과 같은 **MiddleWare** 를 활용 합니다. 이러한 작업을 **WSGI (Web Server Gateway Interface)** 라는 인터페이스를 활용 합니다.

```r
$ vi install_django.sh
  
  cd ~
  pip3 install gunicorn Django
  django-admin startproject mysite
  mv mysite/ web/
  cd web
  echo "STATIC_ROOT = os.path.join(BASE_DIR, 'static/')" >> mysite/settings.py
  python3 manage.py collectstatic
  #gunicorn server.wsgi:application --bind=127.0.0.1:8000
  gunicorn server.wsgi:application --bind  0:8000 --daemon --reload
```
`--daemon:` 데몬 프로세스로 실행, `--reload:` 소스 변경시 재구동
{: .notice--info}

<br/>

# Nginx

**8000 번** 으로 실행되는 Gunicorn 을 **80번** [Nginx 서버](http://dveamer.github.io/backend/PythonWAS.html) 로 연결 및 설정하는 방법을 알아 보겠습니다.

## Install on CentOS 7.6 

**[Nginx](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/)** 공식 사이트에서 설치방법을 참고하여 `/etc/yum.repos.d/nginx.repo` 설치용 레포지터리를 저장하며 설치를 합니다. **[수동 Nginx 설치파일](http://nginx.org/packages/mainline/centos/7/x86_64/RPMS/)** 에 맞는 wget 을 찾아서 설치 합니다. 주의할 점으로는 내용을 변경시 **Web Browser** 의 **Cache** 를 주기적으로 지워주면서 확인을 합니다.

작업에 참고하는 사이트로는 **[Nginx 추가모듈](https://idchowto.com/?p=47122) , [Nginx 설치관련 유투브](https://www.youtube.com/watch?time_continue=60&v=PymIIQ_JSPc&feature=emb_title), [Nginx 강의 유투브](https://www.linuxhelp.com/how-to-install-nginx-1-17-0-v-on-centos-7-6)** 등이 있습니다.

```r
$ yum install -y libxml2-devel libxml2-static libxslt libxslt-devel gd gd-devel
$ yum install nginx -y 
   Installed size: 2.7 M
   Public key for nginx-1.17.6-1.el7.ngx.x86_64.rpm is not installed

$ wget http://nginx.org/packages/mainline/centos/7/x86_64/RPMS/nginx-1.17.6-1.el7.ngx.x86_64.rpm
$ yum localinstall nginx-1.17.6-1.el7.ngx.x86_64.rpm
```

## Setting

설치된 경우, Nginx 실행내용을 확인 합니다.

```r
$ systemctl enable nginx
  Created symlink from 
  /etc/systemd/system/multi-user.target.wants/nginx.service 
  to 
  /usr/lib/systemd/system/nginx.service.

$ systemctl start nginx
$ systemctl stop nginx
$ systemctl restart nginx
$ systemctl status nginx
   nginx.service - nginx - high performance web server
   Active: active (running) since 목 2019-11-28 KST

$ netstat -ntlp | grep :80     # 포트로 검색
$ netstat -tulpn | grep nginx  # 실행어로 검색    
   tcp 0   0 0.0.0.0:80    0.0.0.0:*  LISTEN  5289/nginx: master  

$ nginx -v                        
   nginx version: nginx/1.17.6

$ journalctl -xn
-- The start-up result is done.
  11월 28 11:47:17 Unregistered Authentication Agent 
  11월 28 11:50:01 momukji systemd[1]:
  Started Session 4 of user root.
-- Subject: Unit session-4.scope has finished start-u
```

## Checking Status

Nginx 를 실행한 뒤, `curl -i http://localhost` 에서 Nginx 기본 페이지가 출력되는 경우에는 제대로 서버는 작동한다고 생각해도 무관 합니다. 그럼에도 불구하고 실행 내용이 브라우저에 보이지 않는 경우에는, 꼭 **브라우저의 캐시와 쿠키** 를 삭제를 한 뒤 접속 합니다.

```r
$ service nginx start
$ curl -i http://localhost
    HTTP/1.1 200 OK
    Server: nginx/1.16.1
    Content-Type: text/html

$ nginx -s stop
$ curl -i http://localhost
    curl: (7) Failed connect to localhost:80; 연결이 거부됨
$ service nginx start
```

## Gunicorn to Nginx

앞에서 8000 번 포트를 80번과 연결하는 방법을 알아 보겠습니다. 다음부터 설명할 내용은 **파이썬 웹 프로그래밍(기초|김석훈)** 의 내용을 바탕으로 진행하였습니다. 우선 **Nginx** 기본 명령어를 정리해 보겠습니다

```r
$ nginx            # 활성화
$ nginx -s stop    # 정지
$ nginx -s reload  # 재기동
$ nginx -t         # Nginx 설정파일 유효성 검사
$ nginx -h         # Nginx 도움말
```

**Node.js** 의 **package.json** 과 같이 **Nginx** 기본 설정파일은 `nvim /etc/nginx/nginx.conf` 입니다. 내용을 살펴보면 다음과 같습니다.

```r
http {
    ...
    include /etc/nginx/conf.d/*.conf;
}
```

내용을 보면 사용자가 추가 가능한 부분은 `/etc/nginx/conf.d/` 폴더 내에 저장된 파일을 사용합니다. `/etc/nginx/conf.d/default.conf` 이라는 기본 파일이 저장되어 있고, 이번에는 Gunicorn 을 바로 연결하는 방식으로 빠르게 진행을 했습니다.

```r
$ vi  /etc/nginx/conf.d/default.conf

server {
    listen       80;
    server_name  사이트.com;
    location / {
        proxy_pass http://0.0.0.0:8000;
    }

    location /static/ {
        alias /home/erdos/web/static/;
    }

    location /media/ {
        alias /home/erdos/web/media/;
    }
}
```

<br/>

# Nginx 13:Permisson denied

Django 의 Admin 페이지를 로딩하면 CSS 등의 Static 파일을 찾지 못한 결과값을 보여 줍니다. **Nginx** 의 log 내용을 살펴 보면 다음과 같은 오류를 출력하고 있습니다.

```java
$ tail -30 /var/log/nginx/error.log

2019/12/01 [error] *5 open() "/home/web/static/admin/css/responsive.css" failed (13: Permission denied), client:, server:, request: "GET /static/admin/css/responsive.css HTTP/1.1", host:, referrer:
```

## SElinux

CentOS 의 보안설정 문제로 인한 해결책 중 하나로 제시된 내용 입니다. 아쉽게도 이번 서버에서는 이로써 해결되진 않았습니다.

```r
# To check if SELinux is running:
$ getenforce

# To disable SELinux until next reboot:
$ setenforce Permissive

$ setsebool -P httpd_can_network_connect true
```


## semanage

다음의 [policycoreutils-phtyon](http://homaki.tistory.com/94) 을 설치하면 semanage, audit2allow 등의 명령어를 사용할 수 있다.

```r
$ yum install policycoreutils-python
```

## /etc/nginx/nginx.conf

위 설정대로 실행하면 `static` 폴더들이 연결되지 않는 결과를 보여줍니다. 원인을 파악하기 위해 **Nginx** 실행 Log 내용을 확인 합니다.

```r
$ tail -30 /var/log/nginx/error.log
2019/12/01 17:32:09 [error] "fonts.css" failed 
(13: Permission denied), ...

2019/12/01 17:32:11 [error] "base.css" failed 
(13: Permission denied), ...
```

원인을 요약하면 **[**Nginx** 사용자와 Django 소유자가 일치하지 않아서](https://nachwon.github.io/django-deploy-3-nginx/)** 연결 실패하는 오류 입니다. 이를 수정하기 위해서는 **Nginx** 소유자를 `user nginx;` 에서 `user 사용자ID;` 로 변경 합니다.

```r
$ chmod g+x /home/사용자ID/web
$ chmod g+r /home/사용자ID/web
$ chmod +x /home/사용자ID/web
$ chmod +x /home/사용자ID/web/static
$ vi /etc/nginx/nginx.conf
user  사용자ID;
worker_processes  1;
...
```

이를 수정 후, **Nginx** 를 재가동 한 뒤 접속하면 제대로 연결됨을 확인할 수 있습니다.

1. **[Supervisor](https://villoro.com/post/nginx_gunicorn)** 를 활용한 활성화
2. **[Systemd 을 활용한 등록 1](https://www.alibabacloud.com/blog/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04_594319)**
3. **[Systemd 을 활용한 등록 2](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-centos-7)**
4. **[RedHot 8 Django Setting](https://www.redhat.com/en/blog/setting-django-application-rhel-8-beta)**
5. **[CentOS 7 Django Setting](https://simpleisbetterthancomplex.com/tutorial/2017/05/23/how-to-deploy-a-django-application-on-rhel.html)**
6. **[Ubuntu 19.04 Django Setting](https://www.techsupportpk.com/2019/08/how-to-set-up-django-with-postgres-nginx-gunicorn-ubuntu-1904.html)**