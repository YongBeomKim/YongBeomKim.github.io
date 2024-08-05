---
layout: blog
title: (SSL) Certbot Errors - 진행중
tags:
- nginx
---

Django 또는 React 로 작성한 내용을 Nginx 를 활용하여 정상적으로 동작하는지를 확인하고 난 뒤에는, 도메인을 활용하는 방법에 대해서 확인해 보겠습니다. SSL 인증서가 발급된 도메인을 활용하면 **소셜인증** 등의 다양한 외부 서비스를 활용할 수 있습니다

<br/>

# Certbot
## [Certbot Instructions](https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal)
**Ubuntu** 에서 **certbot** 설치에 대하여 정리한 문서들을 보면 **apt-get, snap** 등, 다양한 방법으로 설치를 진행하는 것을 알 수 있습니다. [certbot 공식문서](https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal) 를 방문하면 자신의 환경에 맞는 설치방법을 안내하고 있습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/linux/certbot_site.png">
  </p>
</figure>

**Ubuntu 22.04** 환경이라면 에서 Nginx 를 사용하는 서비스인 경우에는 **snap** 을 활용하여 설치작업을 진행하도록 안내하고 있습니다.

## Purge Remove
위의 방법으로 설치를 진행하지 않은 경우에는 삭제 후 재설치 과정을 진행합니다. **certbot** 과 함께 설치된 **certbot.timer** 가 있습니다. **certbot.timer** 는 인증서를 자동으로 갱신하는 스케줄러 입니다.
```bash
$ sudo systemctl status certbot
$ sudo systemctl stop certbot

$ sudo systemctl status certbot.timer
$ sudo systemctl stop certbot.timer
$ sudo systemctl disable certbot.timer
$ sudo rm /etc/systemd/system/certbot.timer
$ which certbot.timer
```

메인 설치도구들을 삭제 진행합니다.
```bash
$ sudo apt remove --purge certbot
$ sudo apt purge python-certbot-nginx
$ sudo apt autoremove
$ sudo apt autoclean
```

위 과정을 모두 진행했더라도, 터미널에서 실행하면 조각들이 남아있는 경우가 있습니다. 이때는 수동으로 남아있는 내용들을 삭제 합니다.
```bash
$ which certbot
/usr/bin/certbot

$ sudo rm /usr/bin/certbot
$ sudo rm -rf /etc/letsencrypt
$ sudo rm -rf /var/log/letsencrypt
```

삭제작업들이 모두 완료되었으면 확인 과정을 진행 합니다
```bash
$ sudo dpkg -r certbot
dpkg warning ignoring request to remove certbot which isnt installed

$ which certbot       
certbot not found

$ certbot --version
zsh: command not found: certbot
```

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

## Install
Ubuntu 22.04 환경에서 Nginx 로 배포를 하는경우에는 **snapd** 를 활용하기를 추천하고 있습니다.

```bash
$ sudo apt-get remove certbot && sudo dnf remove certbot && sudo yum remove certbot 
0 upgraded, 0 newly installed, 0 to remove and 9 not upgraded.

$ sudo snap install --classic certbot
  certbot 2.11.0 from Certbot Project (certbot-eff✓) installed

$ sudo ln -s /snap/bin/certbot /usr/bin/certbot
$ which certbot
  /usr/bin/certbot
```

## Another instance of Certbot is already running.
우분투에서 **80** 번 포트에서 실행중인 내용과 충돌때문에 발생한 오류 입니다. 아랫 명령어를 활용하여 해당 포트에서 실행중인 프로세스 `ID` 값을 확인한 뒤 해당 프로세스를 제거하면 됩니다. 
```bash
$ find / -type f -name ".certbot.lock" -exec rm {} \;

$ sudo netstat -tnlp|grep 80
$ kill -9 17907
```

## Certbot failed to authenticate some domains
**certbot** 을 실행하면 다음과 같은 오류를 출력하였습니다. 블로그 등을 참고하여 `sudo certbot certonly --nginx` 등도 실행하였지만 오류를 마주치게 되면서 이와 관련한 작업들은 일단 중지한 뒤 향후에 보완작업을 진행하겠습니다.
```bash
$ sudo certbot --nginx

Saving debug log to /var/log/letsencrypt/letsencrypt.log

Certbot failed to authenticate some domains (authenticator: nginx). 
The Certificate Authority reported these problems:
  Detail: 1.1.1.1: Fetching http://site.com/.well-known/acme-challenge/L-c1pKLN2SppUd8MNheRCqgG49mCwM2accpYwe8nTXY: Timeout during connect (likely firewall problem)
```

```bash
➜  www sudo mkdir letsencrypt
➜  www cd letsencrypt 
➜  letsencrypt sudo mkdir .well-known
➜  letsencrypt cd .well-known 
➜  .well-known sudo mkdir acme-challenge           
➜  .well-known cd acme-challenge 

$ pwd
/var/www/letsencrypt/.well-known/acme-challenge
```

```bash
$ sudo snap install certbot --classic
$ sudo certbot certificates
$ sudo certbot renew --dry-run
$ sudo certbot renew -n -q
$ sudo certbot renew
```

<br/>

## 참고사이트 1
- [lets encrypt 설치하기 / 설치 실패 해결방법](https://flymogi.tistory.com/56)
- [Let's Encrypt 오류 Https 인증 실패 해결방법](https://2vup.com/nginx-letsencrypt-error/)
- [Nginx Let's Encrypt 오류 Https 인증 실패 해결방법](https://2vup.com/nginx-letsencrypt-error/)
- [SSL보안인증서 설치시 Another instance of Certbot is already running](https://linguist79.tistory.com/1514)


## 참고사이트 2
- [Nginx linux 소유자, 그룹, 권한을 잘 생각해야 한다](https://mabb.tistory.com/524)
- [Nginx.service failed /run/nginx.pid 오류 해결](https://its-blog.tistory.com/162)
- [Nginx 504, Nginx 502 에러 해결(Feat. Gunicorn)](https://velog.io/@ssssujini99/WebError-Nginx-504-Nginx-502-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%EA%B8%B0-Feat.-Gunicorn)
- [eff-certbot.readthedocs](https://eff-certbot.readthedocs.io/en/stable/using.html#nginx)
- [Python - gunicorn, uvicorn(wsgi, asgi)](https://velog.io/@so-eun/Python-gunicorn-uvicornwsgi-asgi)
- [Deploy Django with Nginx and Gunicorn on Ubuntu](https://youtu.be/S5TfD50s4Lo?si=kwOFQLlcsU6E4hPm)
- [ASGI Django, Nginx and Uvicorn on Ubuntu](https://gautamankul.medium.com/how-deploy-an-asgi-django-application-with-postgres-nginx-and-uvicorn-on-ubuntu-607f3b97fef3)
