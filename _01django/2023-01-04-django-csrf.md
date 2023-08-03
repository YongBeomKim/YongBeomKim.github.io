---
layout: blog
title: CSRF Django & Axios
tags:
- django
---

`Django` 와 `React.js` 통신을 할 때, `axios` 또는 `fetch` 함수등을 사용하여 서버와 POST 통신을 할 때 `CSRF 403 Forbidden Error` 메세지를 `Django` 에서 출력 합니다. 이러한 경우 해결하는 방법에 대해서 알아 보겠습니다.

# CSRF Token
## CSRF Token 의 개념
[CSRF 토큰](https://docs.djangoproject.com/ko/4.2/ref/csrf/) 의 `Cookie` 에 저장되어 통신을 합니다. 역활은 서버에 들어온 요청이 실제 서버에서 허용한 요청이 맞는지 확인하기 위한 토큰 입니다. 동작과정을 살펴보면 다음과 같습니다.

1. 뷰에서 템플릿을 만들어 넘길때, CSRF 토큰값을 쿠키에 담아서 보내준다.
2. django 프레임워크에서 설정한 헤더와 쿠키로 CSRF 토큰을 넘긴다.

Django 는 기본 설정에서 `CSRF 보안` 기능을 제공합니다. 때문에 `Key` 값이 기본 설정값으로 지정되어 전달을 하고 `axios` 등에서 확인하는 `Key` 이름이 달라서 `403` 오류가 발생 합니다.

<figure class="align-center">
  <img width="540px" src="{{site.baseurl}}/assets/fullstack/csrf_name.png">
  <figcaption>CSRF token 기본이름</figcaption>
</figure>

## Django 에서 수정
`settings.py` 파일에서 `CSRF` token 의 이름을 `axios` 에서 확인하는 `Cookie` 의 이름과 일치하도록 바꾸는 방법은 다음과 같습니다.
```python
CSRF_COOKIE_NAME = 'XSRF-TOKEN'
CSRF_HEADER_NAME = 'X-XSRF-TOKEN'
CSRF_TRUSTED_ORIGINS = [
    "http://0.0.0.0:5173",
    "http://0.0.0.0:8000",
]
```

## Axios 에서 수정
axios 설정을 `django` 기본 쿠키 설정값과 일치 시키는 방법 입니다.
```javascript
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
```

<br/>

## 참고사이트
- [CSRF 토큰이 날 괴롭힌다..](https://velog.io/@gene028/%EA%B0%9C%EB%B0%9C%EC%9D%BC%EC%A7%80-2-CSRF-%ED%86%A0%ED%81%B0%EC%9D%B4-%EB%82%A0-%EA%B4%B4%EB%A1%AD%ED%9E%8C%EB%8B%A4)
- [React에서 csrf token 사용하기 with DRF](https://jahong.tistory.com/entry/React%EC%97%90%EC%84%9C-csrf-token-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0with-Django-restframework)
- [Adding the Django CSRF Protection to React Forms](https://www.techiediaries.com/django-react-forms-csrf-axios/)

