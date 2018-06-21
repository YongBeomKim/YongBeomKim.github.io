---
title : Django Settings.py 기본설정
last_modified_at: 2018-06-21T15:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - settings
    - django
toc: true 
---


지금까지는 **Mastering Django Core** 등 **도서내용**을 중심으로 정리했다면, 이제부터는 **Project를 위한 Django** 작업을 위해서 지금까지 정리된 공통설정 내용을 정리해 보려고 한다 


# settings.py


<br>
## SECRET_KEY 설정

```python
with open('/폴더/secret_key.txt') as f:
    SECRET_KEY = f.read().strip()
```
**SECRET_KEY 의 재활용 :** PC별 1개만 저장되어도 재활용 가능햇다 ;ㅆ; 
{: .notice--warning} 


<br>
## DEBUG, ALLOWED_HOSTS

```python
import socket
if socket.gethostname() == '프로그래머 PC 사용자 이름':
    DEBUG = TEMPLATE_DEBUG = True
    ALLOWED_HOSTS = ['localhost']
else:
    DEBUG = TEMPLATE_DEBUG = False
    ALLOWED_HOSTS = ['*']
```

**socket.gethostname() :** 해당 PC의 User 이름을 추출해서, 코딩시에는 디버그를 활성화 하고, 다른 PC에서는 보안을 강화한다
{: .notice--warning} 


<br>
## STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]

[참고 사이트](https://blog.hannal.com/2015/04/start_with_django_webframework_06/)

```python
STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
```

**STATIC_URL :** HTML에서 정적파일 연결 URL로 마지막은 '/'로 닫아야 한다 **STATICFILES_DIRS :** 은 사용자가 추가로 **CSS, JS, Media File**을 사용시 꼭 지정해야 **static_url**로 연결해서 내부서 활용이 가능하다
{: .notice--warning} 



<br>
## CELERY

```python
# Celery 설정
CELERY_BROKER_URL        = 'redis://localhost:6379'
CELERY_RESULT_BACKEND    = 'redis://localhost:6379'
CELERY_ACCEPT_CONTENT    = ['application/json']
CELERY_TAST_SERIALIZER   = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE          = 'Asia/Seoul' # 스케줄러는 시간정의 필수
```
**redis 와 CELERY :** Django 에서 **비동기적 실행** 을 추가한다 이둘을 설치하고 입력해야 하는건 다음근..
{: .notice--warning} 



<br>
## Mariadb 와 django 연동하기

**사용자, 암호, DATABASE** 3개를 정의한다

```sql
$ mysql -u root -p
Enter password: 

>>> CREATE DATABASE  DB이름 CHARACTER SET UTF8;
>>> CREATE USER 사용자@localhost IDENTIFIED BY '비밀번호';
>>> GRANT ALL PRIVILEGES ON DB이름.* TO 사용자@localhost;
>>> FLUSH PRIVILEGES;
>>> exit; 
```

[참고사이트](http://bluejake.tistory.com/28)





**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}   