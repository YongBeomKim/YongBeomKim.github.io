---
layout: blog
title: Flower
tags:
- django
- nginx
---

1. flower 직접실행 및 localhost 에서 확인
2. nginx 를 활용하여 기본실행 적용 (css 미적용)
3. --url--fix 옵션 적용하면 Css 정상적용

최소한의 옵션으로 내용을 확인한뒤, 하니씩 추가적인 내용들 부가확인하며 완성하기

```bash
# sudo nvim /etc/systemd/system/flower.service
[Service]
...
(-) Restart=always
(+) Restart=on-failure
Type=simple
```

https://docs.openrem.org/en/0.9.1-docs/celery-linux.html

https://unix.stackexchange.com/questions/513972/how-to-fix-start-limit-hit-trying-to-start-gunicorn-on-ubuntu-18

https://stackoverflow.com/questions/41241048/django-how-can-i-access-celery-flower-page-in-production-mode

https://fmd1225.tistory.com/93
https://dobiho.com/64414/

<br/>

## 참고사이트
https://flower.readthedocs.io/en/latest/config.html?highlight=prefix#url-prefix

https://anovin.mk/tutorial/how-to-monitor-and-debug-celery-tasks-in-python/

https://medium.com/accredian/setting-up-celery-flower-rabbitmq-for-airflow-2dac6b58e141

https://iseunghan.tistory.com/394

https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/uvicorn/

https://windybay.net/post/12/

https://flower.readthedocs.io/en/latest/reverse-proxy.html


- [Celery 무작정 시작하기 (5) - Monitoring](https://heodolf.tistory.com/73)
- [Flower Github](https://github.com/mher/flower)
- [Document](https://flower.readthedocs.io/en/latest/reverse-proxy.html?highlight=nginx#running-behind-reverse-proxy)
- [Celery Flower Security](https://www.appsloveworld.com/django/100/3/celery-flower-security-in-production)
- [Configuring Celery + Redis + Supervisor with Django](https://gist.github.com/hamzaakhtar953/2197681306bf8417c4d1a5e2b8e4eaef)
- [Configure Celery + Supervisor With Django](https://gist.github.com/mau21mau/9371a95b7c14ddf7000c1827b7693801)