---
layout: blog
title: Django Email 보내기 with Google
tags:
- django
---

Google 의 Gmail API 를 활용하여 이메일을 보내는 방법을 정리해 보겠습니다. [Mail API 사용을 위한 Google 앱 비밀번호 생성](https://yermi.tistory.com/entry/%EA%BF%80%ED%8C%81-%EA%B5%AC%EA%B8%80Google-%EC%95%B1-%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0-Mail-API-%EC%82%AC%EC%9A%A9%EC%9D%84-%EC%9C%84%ED%95%9C-Google-%EC%95%B1-%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8-%EC%83%9D%EC%84%B1) 과 [Django에서 이메일 보내기](https://nightskyshop1023.tistory.com/27) 그리고 [회원가입 시 이메일 인증, SMTP](https://ssungkang.tistory.com/entry/Django-%E1%84%92%E1%85%AC%E1%84%8B%E1%85%AF%E1%86%AB%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8-%E1%84%89%E1%85%B5-%E1%84%8B%E1%85%B5%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF-%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8C%E1%85%B3%E1%86%BC-SMTP) 블로그 내용을 참고하였습니다.

<br/>

# Gmail API 로 이메일 보내기
## Gmail 에서 `앱 비밀번호` 발급받기
Django 에서 필요한 정보는 2개로, 발신 `이메일 주소` 와 `앱 비밀번호` 입니다. 여기서 생소한 것이 `앱 비밀번호` 인데 이것은 `Gmail` 에서 사용하는 비밀번호가 아니라, 마치 `OpenAPI` 서비스에서 `secret key` 와 유사한 역할을 담당하는 별개의 비밀번호 입니다.

계정에서 `2단계 인증` 을 활성화 합니다. 사용자 휴대폰 번호 및 기기를 연결하면 됩니다. 

`계정정보 > 보안 > 2단계 인증 > 앱 비밀번호` 에서 활용할 `앱 이름`을 추가하면 비밀번호를 발급해 줍니다

<figure class="align-center">
  <img width="500px" src="{{site.baseurl}}/assets/fullstack/app_password.png">
  <figcaption>2단계 인증 > 앱 비밀번호 발급</figcaption>
</figure>

## Django `settings.py`
Django 설정 파일에서 다음의 설정 내용을 추가 합니다.
```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_HOST_USER = '이메일을 보낼 G-mail 계정'
EMAIL_HOST_PASSWORD = 'Gmail 에서 설정한 앱 비밀번호'
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
```

## 이메일 보내기 테스트
`django shell` 을 통해서 이메일 보내기가 잘 동작하는지 확인 합니다.
```python
from django.core.mail import EmailMessage
email = EmailMessage(
    'Title', #이메일 제목
    'Content', #내용
    to=['example@example.com'], #받는 이메일
)
email.send()
```
