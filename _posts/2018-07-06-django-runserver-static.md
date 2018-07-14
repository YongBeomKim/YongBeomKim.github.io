---
title : Django 배포시 Static 못찾을 때 
last_modified_at: 2018-07-06T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - django
    - whitenoise
toc: true 
---

<br>
# Django 배포

```
$ python runserver 0.0.0.0:8000 &
```

서버에서 배포를 하는 경우 실행은 되는데, **`Debug=False`** 로 설정을 바꾸면 Static 파일을 찾지 못해서 오류가 발생했고 이는 구글의 검색결과 다양한 버젼에서도 발생하는 오류로 보였다 <small>이번에는 static 만 해결됬는데 MEDIA_URL 도 함께 해결이 되는지는 확인해 보지 못했다</small>

[오류의 수정 방법](https://code.i-harness.com/ko/q/590f82)


<br>
## **WhiteNoise**

<br>
### pip install WhiteNoise

```
$ pip install WhiteNoise
```

static JS, CSS, Image 파일 등 다양한 내용을 단일한 경로에서 호출하다 보니 생긴 문제로써 위에서 언급된 모듈을 설치한다


<br>
### settings.py

```python
#settings.py
MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware', #add whitenoise
]

##specify static root

STATIC_URL       = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles') 
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
```

1. **STATIC_URL** : Django 에서 URL 연결용 
2. **STATIC_ROOT** : Django 배포시 기본연결용
3. **STATICFILES_DIRS** : Django 디버깅시 우선 검색용

위에서 발생한 문제를 정리하면, 디버그시에는 **STATICFILES_DIRS** 를 기준으로 설정하지만, `Debug=False` 를 설정하면 **STATIC_ROOT**를 대상으로 검색을 하고 이번의 작업은 서버로 파일을 전송한 뒤, **STATIC_ROOT** 를 기본폴더로 사용하도록 설정하는 작업을 할 것이다.
{: .notice--infos}


<br>
### wsgi.py

```python
#wsgi.py
from whitenoise.django import DjangoWhiteNoise

application = DjangoWhiteNoise(application)
```

### STATIC_ROOT

서버에서 manage.py 의 **collectstatic** 옵션을 실행한다. 위 작업을 하면 정적 폴더의 모든 파일을 지정한 STATIC_ROOT 디렉토리로 복사한다.<small></small>

```
$ python manage.py collectstatic
```

<br>
**settings.py**

```python
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles') 
# STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
```
위의 설정을 마치면 STATICFILES_DIRS 을 비활성화 하고, STATIC_ROOT 를 중심으로 설정을 완료하면 제대로 작동하는 것을 알 수 있다.
