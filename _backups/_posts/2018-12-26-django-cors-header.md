---
title : Django, Js 교차 CORS 오류에 대한 대책
last_modified_at: 2018-12-12T10:45:06-05:00
header:
  overlay_image: /assets/images/book/django-sample.jpg
categories:
  - chart
tags: 
    - django
    - apex
    - vue
toc: true 
---

**교차 출처 요청 차단 :** 동일 출처 정책으로 인해 `http://localhost:8000/json/` 에 있는 원격 자원을 차단하였습니다. (원인: 'Access-Control-Allow-Origin' CORS 헤더가 없음).
{: .notice--info}

자바스크립트는 동일한 port의 자료만 활용 가능하고 다른 port의 자료는 제한하는 기본 정책이 존재하였지만, 지금과 같은 Web Package 가 발전하면서 이와같은 제한은 안전정치가 아닌 걸림돌이 되어 버린 측면이 존재합니다.

개발을 위한 단계에서 이러한 문제를 해결할 필요가 있고 Django 에서의 해법을 찾은 자료를 정리해 보겠습니다.


# **$ pip install django-cors-headers**

[Pypi](https://pypi.org/project/django-cors-headers/) [설정Tip](https://stackoverflow.com/questions/53577134/cross-origin-request-blocked-using-axios-and-django-rest)

다음과 같이 설정하면 오류가 발생하지 않습니다.

```python
INSTALLED_APPS = [
    # 'corsheaders',  # 설치 없이도 잘 작동합니다.
    ...
]

MIDDLEWARE = [  # Or MIDDLEWARE_CLASSES on Django < 1.10
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware', 
    ...
]

CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = (
    'localhost:3030',
    '127.0.0.1:3030'
)
```

이와같이 설정하고 json 을 받으면 오류를 출력하지 않습니다