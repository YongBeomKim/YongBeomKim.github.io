---
layout: blog
title: Django IntegerField Out of Bounds
tags:
- django
- nginx
---


```bash
  File "python3.11/site-packages/pandas/core/algorithms.py", 
  line 1743, in map_array
    return lib.map_infer(values, mapper, convert=convert)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "lib.pyx", line 2972, in pandas._libs.lib.map_infer
OverflowError: Python integer 9514880000 out of bounds for int32
```

https://github.com/stellargraph/stellargraph/issues/1668

https://github.com/encode/django-rest-framework/issues/7017#issuecomment-546095464

int32.MaxValue
9514880000
2147483647


https://stackoverflow.com/questions/56720783/how-to-fix-overflowerror-overflow-in-int64-addition


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