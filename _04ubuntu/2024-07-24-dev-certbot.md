---
layout: blog
title: (DEV) Certbot of SSL
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

## Install


certbot
sudo certbot
dpkg -r certbot
sudo dpkg -r certbot
which certbot
cd /usr/bin
ls
clear
ls -al | grep certboy
ls -al | grep certbot
sudo apt remove --purge certbot\n
sudo apt autoremove\nsudo apt autoclean\n
certbot
sudo apt autoremove && sudo apt autoclean\n
sudo rm /usr/bin/certbot
sudo rm -rf /etc/letsencrypt\nsudo rm -rf /var/log/letsencrypt\n
which certbot\n
certbot
source .zshrc
clear
certbot --version
clear
history
clear

```





- mrmarket 에서 삭제작업 진행내용 정리하기
- 설치 후 새로운 SSL 작업완료내용 확인 및 정리하기
- Django 는 임시로 별도의 `Nginx/django` 내용으로 진행하며 차츰 문제점 확인하기 - 다음주 부터는 분석하기




<br/>

# Nginx

## Proxy Cache Clear
```bash
server {

	location / {
		# django uvicorn
		proxy_pass http://127.0.0.1:8000;
		proxy_cache disk-cache;
		proxy_cache_valid any 1m;
		proxy_ignore_headers Cache-Control Expires;
  }
}
```

## [conflicting server name](https://webisfree.com/2017-07-04/nginx-%EC%9B%B9%EC%84%9C%EB%B2%84-config-%EC%84%A4%EC%A0%95%EC%8B%9C-conflicting-server-name-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D%ED%95%98%EB%8A%94-%EA%B2%BD%EC%9A%B0)
**nginx** 테스트에서 다음과 같은 오류를 출력하고 있었습니다. `confilcting ...` 메세지는 2개이상의 설정파일에서 해당 주소와 관련한 설정내용을 다루고 있어서 발생하는 오류 입니다. 이번의 경우는 기본 설정값을 `defalut.bak` 로 확장자를 변경하면 관계가 없을 줄 알았는데 그래도 위와같이 오류메세지를 출력하게 되었던 것이었습니다.
```bash
$ nginx -t
nginx: [warn] conflicting server name "mrmarket.kr" on 0.0.0.0:8000, ignored
nginx: the configuration file /etc/nginx/nginx.conf syntax is okzz
```

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
- [Nginx linux 소유자, 그룹, 권한을 잘 생각해야 한다](https://mabb.tistory.com/524)
- [Nginx.service failed /run/nginx.pid 오류 해결](https://its-blog.tistory.com/162)
- [Nginx 504, Nginx 502 에러 해결(Feat. Gunicorn)](https://velog.io/@ssssujini99/WebError-Nginx-504-Nginx-502-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%EA%B8%B0-Feat.-Gunicorn)
- [eff-certbot.readthedocs](https://eff-certbot.readthedocs.io/en/stable/using.html#nginx)
- [Python - gunicorn, uvicorn(wsgi, asgi)](https://velog.io/@so-eun/Python-gunicorn-uvicornwsgi-asgi)
- [Deploy Django with Nginx and Gunicorn on Ubuntu](https://youtu.be/S5TfD50s4Lo?si=kwOFQLlcsU6E4hPm)
- [ASGI Django, Nginx and Uvicorn on Ubuntu](https://gautamankul.medium.com/how-deploy-an-asgi-django-application-with-postgres-nginx-and-uvicorn-on-ubuntu-607f3b97fef3)
