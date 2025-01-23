---
layout: blog
title: Glances
tags:
- ubuntu
---

우분투 서버를 운영할 때, `Django, Celery` -> `Flower` -> `Nginx` 단계로 운영 및 관리를 하고 있습니다. 이처럼 서버의 운영 및 `Celery` 모니터링을 운영하고 있습니다. 우분투에서 별도의 설치없이 시스템 리소스 활용현황을 바로 확인하는 방법은 다음과 같습니다. 
```bash

$ top

top - 00:00:00 up 1:00, 5 users, load average: 0.55, 1.43, 1.77
Tasks: 454 total, 1 running, 453 sleeping, 0 stopped, 0 zombie
%Cpu(s):  1.8 us,  2.1 sy,  0.4 ni, 95.6 id,  0.0 wa,  0.0 st
MiB Mem : 3705.4 total, 1434.2 free, 1597.5 used,  873.7 buff/cache
MiB Swap: 2479.5 total, 2479.5 free,    0.0 used. 1835.1 avail Mem 

    PID USER PR NI  SHR S %CPU %MEM    TIME+ COMMAND                                  
  10332 user 20  0 1240 S 10.2  0.0  0:10.64 conky                                    
 119714 user 20  0 2824 S  3.0  3.6  0:00.13 celery                                   
   9871 user 32 12 3968 S  2.6  0.0  0:20.23 brltty    
```

이번에는 이와같은 서버 리소스 현황을 웹 페이지로 확인하는 방법에 대하여 알아보도록 하겠습니다.

<br/>

# Glances
[10+ Best Monitoring Ubuntu - 2023 Comparison](https://sematext.com/blog/ubuntu-monitoring-tools/) 목록에서 소개하는 패키지 중 open source 가 여럿 있었습니다.  `Nagios, Glances, Stacer, GNOME System Monitor, Vtop` 중에서 `Python` 으로 작성된 `Glances` 에 대하여 알아보도록 하겠습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="https://raw.githubusercontent.com/nicolargo/glances/develop/docs/_static/glances-responsive-webdesign.png">
  <figcaption>glances monitoring</figcaption>
  </p>
</figure>

## installation
웹으로 실행하는 내용과 관련한 내용을 설치하는 방법은 다음과 같습니다 `web` 대신 `all` 을 입력해도 가능합니다.
```bash
$ pip install 'glances[web]'
```

## Run
FastAPI 에서 Uvicorn 을 미들웨어로 활용하여 웹페이지에서 모니터링 내용을 확인할 수 있습니다.
```bash
$ glances --browser -w -p 8088

Glances Browser Web User Interface started on http://0.0.0.0:8088/browser
Glances Web User Interface started on http://0.0.0.0:8088/
Glances RESTful API Server started on http://0.0.0.0:8088/api/4
Announce the Glances server on the LAN (using 192.0.0.1 IP address)
INFO:     Started server process [11111]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8088 (Press CTRL+C to quit)
```

해당 페이지에 접속을 할 때 사용자 이름과, 비밀번호를 요구하는 방법은 다음과 같습니다.
```bash
$ glances --browser -w -p 8088 --username --password

Define the Glances webserver username: user
Define the Glances webserver password (user username): 
Password (confirm): 
Do you want to save the password? [Yes/No]: no

Glances Browser Web User Interface started on http://0.0.0.0:8088/browser
Glances Web User Interface started on http://0.0.0.0:8088/
Glances RESTful API Server started on http://0.0.0.0:8088/api/4
Announce the Glances server on the LAN (using 192.0.0.1 IP address)
INFO:     Started server process [11111]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8088 (Press CTRL+C to quit)
```

<br/>

# 참고사이트
- [glances - Github](https://github.com/nicolargo/glances)
- [glances - The Documents](https://glances.readthedocs.io/en/latest/quickstart.html)
- [glances - Password for Web/Browser](https://github.com/nicolargo/glances/issues/1674#issuecomment-643260628)
- [Ubuntu Server with Glances Remotely in 3 Easy Steps](https://orcacore.com/monitor-ubuntu-server-glances/)
- [10+ Best Monitoring Ubuntu - 2023 Comparison](https://sematext.com/blog/ubuntu-monitoring-tools/)
