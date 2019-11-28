---
title : Django 서버배포
last_modified_at: 2019-11-25T10:45:06-05:00
header:
  overlay_image: /assets/images/code/Django_SetUp.png
categories:
  - django
tags: 
    - django
    - gunicorn
---

**Django 배포** 를 정리해 보겠습니다. 이번 사례는 앞에서 설정한 **CentOS** 에서 **Django (8000번 Port)** 로 작업한 내용을 **gunicorn (8000번 Port)** 미들웨어를 활용하여 **Nginx (80번 Port)** 서버로 배포하는 내용을 정리 합니다.

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
  gunicorn server.wsgi:application --bind 0:8000 
```

<br/>

# Nginx

[Nginx 서버](http://dveamer.github.io/backend/PythonWAS.html) 를 설정하는 내용에 대해 알아보겠습니다.

## CentOS 7.6 

**[Nginx](https://idchowto.com/?p=47122)** 에서 필요한 모듈을 설치 합니다. 해당 페이지 내용을 확인시, Browser 의 **Cache** 를 지우면서 내용을 확인을 해야 합니다.

[nginx 유투브](https://www.youtube.com/watch?time_continue=60&v=PymIIQ_JSPc&feature=emb_title) 내용을 바탕으로 정리를 해보겠습니다. **[Nginx](http://nginx.org/packages/mainline/centos/7/x86_64/RPMS/)** 다운로드 사이트, **[Nginx](https://www.linuxhelp.com/how-to-install-nginx-1-17-0-v-on-centos-7-6)** 강의 관련 사이트

```r
$ yum install -y libxml2-devel libxml2-static libxslt libxslt-devel gd gd-devel
$ yum install nginx -y 
   Installed size: 2.7 M
   Public key for nginx-1.17.6-1.el7.ngx.x86_64.rpm is not installed

$ wget http://nginx.org/packages/mainline/centos/7/x86_64/RPMS/nginx-1.17.6-1.el7.ngx.x86_64.rpm
$ yum localinstall nginx-1.17.6-1.el7.ngx.x86_64.rpm
```

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

이번에 CentOS 기본페이지가 떠서 Nginx 내용이 보이지 않는 문제가 발생하였습니다. 임시 서버인 만큼 우선은 **81번** 포트로 변경해서 서비스를 실행해 보겠습니다.

```r
$ nvim /etc/nginx/conf.d/default.conf

  server {
    listen 81;
  }

$ systemctl stop nginx
$ systemctl start nginx
$ netstat -tulpn | grep nginx  # 실행어로 검색    
   tcp 0   0 0.0.0.0:81   0.0.0.0:*  LISTEN  6459/nginx: master  
```

## Nginx 설치 및 활성화

https://ko.stealthsettings.com/fix-nginx-start-failed-centos-7-nginx-emerg-open-path-failed-13-permission-denied.html

https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-centos-7

아래처럼 Nginx 를 설치하고 실행하면, `http://localhost:80` 내용으로 특정한 페이지가 활성화 됨을 알 수 있습니다.

```r
$ yum install epel-release
$ yum install nginx

$ service nginx start
$ curl -i http://localhost
    HTTP/1.1 200 OK
    Server: nginx/1.16.1
    Content-Type: text/html
    Accept-Ranges: bytes

$ nginx -s stop
$ curl -i http://localhost
    curl: (7) Failed connect to localhost:80; 연결이 거부됨
```

## Nginx 설정

Nginx 설정은 `/etc/nginx/ngnix.conf` 에 저장 됩니다. 작업을 위해 설정파일을 백업 합니다.

```r
$ cd /etc/nginx
$ cp ngnix.conf nginx.conf_bak
$ cd ~
$ nvim /etc/nginx/ngnix.conf

  http {
    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration from /etc/nginx/conf.d
    # http://nginx.org/en/docs/ngx_core_module.html#include
    include /etc/nginx/conf.d/*.conf;
  }
```

실제로 설정파일은 `/etc/nginx/conf.d/*.conf` 에서 사용 됩니다. 

**[블로그](https://dailyheumsi.tistory.com/19)** 에는 별도 폴더를 만들고 `ln -s /etc/nginx/temp.d/django.conf /etc/nginx/conf.d/django.conf` 와 같이 연결하는 방식을 추천 합니다.

이번에는 1개의 사이트만 운영하는 만큼, 설정파일을 작성해 보겠습니다.

```r
$ nvim /etc/nginx/conf.d/project.conf

```


참고사이트

https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-centos-7

http://dveamer.github.io/backend/PythonWAS.html

https://narito.ninja/blog/detail/21/

https://cjh5414.github.io/nginx/

https://www.codns.com/b/B10-42

https://dailyheumsi.tistory.com/19

https://support.dnsever.com/hc/ko/articles/219445328-80

https://wikidocs.net/10304


**금융분석** 과 **머신러닝** 및 **자연어 분석** 등의 작업은 input 데이터와 Output 내용이 명확해서 작업 flow 찾기에 용이하지만, **Django** 작업은 결과물 최종형태가 불분명 하고, 작업들 과정에도 겹치거나 불필요한 부분이 상이해서 작업 계획이 막연한 단점이 있습니다.

그동안 정리한 여러 내용을 바탕으로, 단일한 작업 flow 목차 위에서 내용들을 정리 해 보겠습니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/project/dual_boot.jpg">
</figure>

<br>

# 간단정리

전체 작업내용을 간단하게 서술해 보면.

1. Model
2. Model & Views.py
3. urls.py
4. HTML Template (extend, include)
5. Admin Filters
6. Generic View & requests Form
7. message

8. Static Files & Media Folder
9. javascript WebPack
10. Rest API
11. wsgi & Gunicorn Server Setting

template 에서 javascript 는 **cdn 외부 호출** 방식이 효과적입니다. 서버 부담을 최소가 되고 사용자에게 전달 되기 때문입니다. 그리고 호출 내용을 Base.html 에 모아서  재활용 방식으로 효율을 높이도록 합니다. [Django Girls 템플릿 확장하기](https://tutorial.djangogirls.org/ko/template_extending/)
{: .notice--info}

1. Model & ORM 
2. Model Manager & filters
3. [Signal](https://yongbeomkim.github.io/django/dj-model-tips/)

1. web Site 01 : WEB Blog
2. web Site 02 : Heriacle Blog

<br>

# 참고 사이트

[Real Python](https://realpython.com/tutorials/django/)