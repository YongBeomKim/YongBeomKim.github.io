---
layout: blog
title: systemd service errors - Nginx 502
tags:
- service
---

우분투 서버를 재시작 할 때에 자동으로 실행되는 스크립트 명령어를 사용자가 추가할 수 있습니다. 이러한 작업을 **<span style="color:orange">systemctl 명령으로 서비스 등록</span>** 이라고 합니다. Django 서비스 서버에서 `flower` 와 관련하여 작업한 내용을 예시로 살펴보도록 하겠습니다

1. flower 직접실행 및 localhost 에서 확인
2. nginx 를 활용하여 기본실행 적용 (css 미적용)
3. --url--fix 옵션 적용하면 Css 정상적용

여러 옵션을 추가함으로써 발생하는 충돌 및 불필요한 리소스를 최소화 하는것이 중요 합니다. 때문에 최소한의 옵션을 정의하여 실행 내용을 확인한뒤, 부족한 부분이 발견될 때마다 하니씩 추가를 하며 완성을 합니다.

```bash
# sudo nvim /etc/systemd/system/flower.service
[Service]
...
(-) Restart=always
(+) Restart=on-failure
Type=simple
```

# Restart 
django, celery 등이 정상적으로 동작을 하고 있으면, 위의 Restart 옵션으로 인하여 재실행 됨으로써 문제가 해결 가능합니다. 문제는 django, celery 에서 오류를 포함하고 있는 경우에는 재실행 되더라도 문제가 해결되지 않음으로 인하여 재실행이 반복되는 문제가 발생합니다.

접속을 했을 때, `502 Error`를 출력하는 경우가 이에 해당될 가능성이 높습니다. 이러한 경우에는 `Restart` 설정을 비 활성화 한 뒤 재실행을 하면 어떠한 오류때문에 문제가 발생하는지를 알 수 있었습니다.
```bash
➜  ~ sudo systemctl status flower.service
× flower.service - Flower Celery Service
     Loaded: loaded (/etc/systemd/system/flower.service; enabled; vendor preset: enabled)
     Active: failed (Result: exit-code) since Mon 2024-07-22 11:09:36 KST; 1h 8min ago
    Process: 5244 ExecStart=/home/erdos/Source/.venv/bin/celery -A server flower (code=exited, status=1/FAILUR>
   Main PID: 5244 (code=exited, status=1/FAILURE)
        CPU: 3.224s

 7월 22 11:09:35 momukjihome celery[5244]:   File "<frozen importlib._bootstrap>", line 241, in _call_with_frames_removed
 7월 22 11:09:35 momukjihome celery[5244]:   File "/home/username/django/news/tasks/__init__.py", line 1, in <module>
 7월 22 11:09:35 momukjihome celery[5244]:     from .news import (
 7월 22 11:09:35 momukjihome celery[5244]: ImportError: cannot import name 'news' from 'news.tasks.news' (/home/erdos/Source/django/app_news/tasks/ne>
 7월 22 11:09:36 momukjihome systemd[1]: flower.service: Main process exited, code=exited, status=1/FAILURE
 7월 22 11:09:36 momukjihome systemd[1]: flower.service: Failed with result 'exit-code'.
 7월 22 11:09:36 momukjihome systemd[1]: flower.service: Consumed 3.224s CPU time.
```

`/home/username/django/news/tasks/__init__.py` 파일 내부에서 불러오기 오류가 발생하였고, 이로 인하여 파이썬 내부에서 문제가 발생한 것을 알 수 있었습니다. 해당 문제를 수정한 뒤에 다시 Restart 옵션을 활성화 하는 것으로 작업을 종료하였습니다.

<br/>

## 참고사이트
- [DigitalOcean에 Django 프로젝트 배포](https://windybay.net/post/12/)
- [systemctl 명령어로 서비스 등록, 생성, 삭제](https://iseunghan.tistory.com/394)
- [systemd unit 등록 관련 옵션 정리 - Linux](https://fmd1225.tistory.com/93)
- [How to Monitor and Debug Celery Tasks in Python](https://anovin.mk/tutorial/how-to-monitor-and-debug-celery-tasks-in-python/)
- [flower - reverse proxy](https://flower.readthedocs.io/en/latest/reverse-proxy.html)
- [Celery 무작정 시작하기 (5) - Monitoring](https://heodolf.tistory.com/73)
- [Flower Github](https://github.com/mher/flower)
- [Document](https://flower.readthedocs.io/en/latest/reverse-proxy.html?highlight=nginx#running-behind-reverse-proxy)
- [Celery Flower Security](https://www.appsloveworld.com/django/100/3/celery-flower-security-in-production)
- [Configuring Celery + Redis + Supervisor with Django](https://gist.github.com/hamzaakhtar953/2197681306bf8417c4d1a5e2b8e4eaef)
- [Configure Celery + Supervisor With Django](https://gist.github.com/mau21mau/9371a95b7c14ddf7000c1827b7693801)
