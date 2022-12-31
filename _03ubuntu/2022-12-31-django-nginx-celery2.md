---
layout: blog
title: Deploy Django with Nginx, Celery, Flower (Part 2)
tags:
- django
- celery
- flower
- nginx
---

앞에서 Nginx 설정과 Django 서비스 등록을 성공적으로 진행 하였다면, 현재 배포를 지정한 주소값을 입력하면 서비스가 제대로 제공되고 있음을 알 수 있습니다. 이제부터는 부가적으로 `Django` 의 스케쥴링 비동기 작업을 수행하는 `Celery` 와 이를 모니터링 하는 `Flower` 설치 및 배포에 대해 알아보겠습니다.

<br/>

# Celery


