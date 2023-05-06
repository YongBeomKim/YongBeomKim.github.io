---
layout: blog
title: Django Social Login 
tags:
- django
---

Django 에서 `사용자정보` 모델을 Customize 부터, `소셜 로그인` API 구축까지 정리를 시작 해 보겠습니다. 이 내용들을 실제 정리한 저장소로는 [bitbucket - Article](https://bitbucket.org/momukjilab/article/src/master/) 가 있습니다. 하지만 해당 결과물에는 서비스 Key 값이 포함되어 있어서 비공개로 변환 하였습니다.

앞으로 `URI` 개념이 나오는데, `URI` 는 특정 리소스를 식별하는 통합 자원 식별자(Uniform Resource Identifier)를 의미 합니다. `URL` 은 `URI` 의 서브셋 개념 입니다.

<div style="text-align: center;">
  <figure class="align-center">
    <img src="{{site.baseurl}}/assets/linux/uri-url.jpg">
    <figcaption>URI 와 URL</figcaption>
  </figure>
</div>

<br/>

# **OAuth**
[OAuth 개념 및 동작의 이해](https://tecoble.techcourse.co.kr/post/2021-07-10-understanding-oauth/)

## **Resources**
- Resource Server : Client 가 제어하려는 자원을 보유하는 서버 `ex)Google`
- Resource Owner : 위 서비스를 통해 로그인을 하려는 User
- Client : 앞의 Resource 를 활용하려는 서비스

## **OAuth Flow**
- Client 등록 : OAuth Resource 를 활용하려는 Client 서버의 사전승인
- Resource Owner 요청 : `GET Resource Server URI` 로, 사용자 확인 파라미터 전송
- Client 검사 : 앞의 파라미터를 확인하여 로그인이 완료 후, 전송된 파라미터를 검사 및 확인
- Resource Owner 승인 : 승인 후 `Redirect URI` 클라이언트 전환으로 Access Token 발급을 위한 임시 `Authorization Code` 를 발급
- Refresh Token : Access Token 만료로 401 오류가 발생하면 재발급 절차를 진행 합니다.

<br/>

# **Django BaseUserManager**
`이메일` 기준으로 인증절차를 진행하도록 사용자 모델 내용을 수정 합니다. Django 사용자 기본 파라미터는 `Username` 과 `Password` 입니다. 하지만 최근의 서비스들은 `email` 을 기준으로 작동하고 있어서, 이에 맞도록 내용을 수정 보완 합니다.

## **Django 인증 및 사용자 모델 커스터마이징**
[DjangoProject](https://docs.djangoproject.com/ko/4.2/topics/auth/customizing/) 사이트 내용으로 해당 내용을 적용하는 방법을 가장 잘 성명하고 있고, 버전이 변경됨에 따라 수정 보완된 내용도 바로 알 수 있습니다. 하지만 `Tutorial` 이 아닌 `Manual` 사이트인 관계로 작업의 순서대로 정리는 되어있지 않습니다. 해당 작업이 처음이신 분은 [Tutorial 순서대로 정리한 블로그](https://blog.ppuing.me/30) 등을 우선 참고하면 됩니다.

## **Django 인증**
**사용자 정보 클래스** 를 `email` 기준으로 변경 하면서, `사용자정보` 와 `프로필` 2개의 테이블을 작성 하였습니다. 이를 근거로 사용자 인증 과정도 `email` 을 기준으로 작동하도록 아래의 내용들을 추가 합니다.

```python
# Auth User Login
from django.contrib.auth.backends import BaseBackend
class UserAuth(BaseBackend):

  def authenticate(self, **kwargs):
    email = kwargs.get('email')
    password = kwargs.get('password')
    try:
      user = get_user_model().objects.get(email=email)
      if user.check_password(password):
        return user
      else:
        return None
    except:
      return None
```

<br/>

# **Simple JWT**
[Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/creating_tokens_manually.html) 패키지는 DataBase 에 저장된 사용자의 `JWT Token` 의 생성,인증,갱신 등을 위한 `Django Model & Table` 을 생성하고  `API 함수` 까지 자동으로 생성하는 패키지 입니다. [pyjwt](https://pyjwt.readthedocs.io/en/latest/) 와 [django-rest-framework](https://www.django-rest-framework.org/) 를 기반으로 작성 되었습니다

```python
name="djangorestframework_simplejwt",
description="A minimal JSON Web Token authentication plugin for Django REST Framework",
install_requires=[
  "django",
  "djangorestframework",
  "pyjwt>=1.7.1,<3",
],
```

## **Django Setting**
Django 패키지와 연동을 위한 [기본설정](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html#installation) 을 작업하고, 추가로 Jwt 인증 API 에서 설정관련 내용들은 [Settings](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html) 페이지를 참고 합니다.

## **Django User Model**
`Django` 에서 `Email` 인증 내용을 추가한 만큼, 사용자 모델에서도 [Token 관리](https://stackoverflow.com/questions/72966364/jwt-auth-using-python-social-auth-and-django-rest-framework) 할 수 있도록 내용을 추가 합니다.
```python
# /core/models.py
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken

class UserManager(BaseUserManager): 

  def create_user(self, email, username, password):
    user = self.model(email = email, username = username)
    user.set_password(password)
    user.save(using = self._db)
    (+) token     = Token.objects.create(user=user)  # Create, Access
    (+) token_jwt = RefreshToken.for_user(user=user) # Refresh
    (+) token_jwt = {
    (+)   "refresh": str(token_jwt),
    (+)   "access":str(token_jwt.access_token) }
```

## **JWT Urls**
API 작업을 윈활하게 도와주는 [Django URL](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html#installation) 내용을 추가 합니다.

```python
from rest_framework_simplejwt.views import (
  TokenObtainPairView,
  TokenRefreshView,
  TokenVerifyView,
)
urlpatterns += [
  path('accounts/token/', 
    TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('accounts/token/verify/', 
    TokenVerifyView.as_view(), name='token_verify'),
  path('accounts/token/refresh/', 
    TokenRefreshView.as_view(), name='token_refresh'),
]
```

## **Manage JWT Tokens**
앞의 이메일 인증 작업을 완료한 뒤 테스트를 진행하다 보면, Access Token 을 호출하면 기존의 Token 의 유효기간이 완료되지 않았어도 계속 새로운 Token 값을 생성합니다. 사용자 숫자에 비해 계속 Token 값이 누적되면 이를 청소를 해주게 되는데, 앞에서 언급했듯이 `Simple JWT` 에서 Token 테이블을 직접 관리하고 있어서 아래의 내용처럼 `Simple JWt` 에서 호출 및 관리를 하면 됩니다. [Manage JWT Tokens](https://stackoverflow.com/questions/73153174/delete-expired-tokens-from-database-django-jwt) 내용을 참고 합니다.

```python
import pandas
from rest_framework_simplejwt.token_blacklist.models import \
OutstandingToken, BlacklistedToken

BlacklistedToken.objects.filter(
  token__expires_at__lt=datetime.now()).delete()
OutstandingToken.objects.filter(
  expires_at__lt=datetime.now()).delete()
data = OutstandingToken.objects.all().values_list()
pandas.DataFrame(data)
```

<br/>

# **DRF에서 소셜 로그인 구현하기**
소셜 서비스와 연동을 위해서 추가로 `django_allauth` 패키지와 로그인 인터페이스를 제공하는 `dj-rest-auth` 패키지를 활용 합니다. 소셜 로그인 과정은 `서비스 서버` 에서 사용자 인증을 `인증서버` 의 `OAuth`를 활용하는 방식으로, 전체적인 프로세스는 다음과 같습니다.
1. `인증서버 ex>Google` 에게 **<span style="color:var(--strong);">OAuth 인증요청</span>** 을 합니다.
2. **OAuth 인증요청** 에 포함된 `파라미터` 가 `서비스 서버` 정보와 일치하는지 확인 합니다.
3. 일치하면 `서비스 서버` 로고 등을 포함하여 `로그인 인터페이스` 를 직접 제공합니다.
4. 로그인 되면, `해당 사용자 정보` 를 `서비스 서버` **<span style="color:var(--strong);">CallBack 함수</span>** 에게 전달 합니다.
5. **<span style="color:var(--strong);">CallBack 함수</span>** 에서 추가 검증절차를 진행하여 마무리 합니다.

<figure class="align-center">
  <img width="610px" src="{{site.baseurl}}/assets/fullstack/oauth-process.png">
  <figcaption>OAuth Connection Process</figcaption>
</figure>

## `django-allauth==0.51.0`
**<span style="color:var(--strong);">`OAuth` 인증절차를 진행하는데 필요한 함수</span>** 를 제공하는 모듈 입니다. Google 소셜 로그인을 사용하는 경우 `0.54 (2023년 5월 1일 현재)` 버전은 아래와 같은 오류 메세지를 출력 합니다. 때문에 [`0.51.0` 버젼](https://github.com/iMerica/dj-rest-auth/issues/481) 을 설치 합니다.
```python
raise OAuth2Error("Invalid id_token") from e
allauth.socialaccount.providers.oauth2.\
  client.OAuth2Error: Invalid id_token
```

## `dj-rest-auth`
Django 에서 인증에 필요한 인터페이스를 제공하는 모듈 입니다.

<br/>

# Google OAuth
## google-auth-library-python-oauthlib
[Google OAuth Authoriztion](https://developers.google.com/identity/protocols/oauth2/web-server?hl=ko#python_1) 공식 문서에서는 [google-auth-oauthlib.flow 패키지](https://github.com/googleapis/google-auth-library-python-oauthlib) 로 OAuth 인증하는 법을 안내하고 있습니다.
- [Google OpenID(Oauth) 로그인 구현하기 with django](https://velog.io/@maintain0404/Google-OpenIDOauth-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-with-django) 
- [Google APIs OAuth in Django](https://www.nishantwrp.com/posts/google-apis-oauth-in-django)

## Google OAuth
[Google Cloud Platform](https://console.cloud.google.com/apis/credentials) 에서 `OAuth 2.0 클라이언트 ID` 를 발급 받아야 합니다. 발급을 위한 입력 값에는 `Callback URI` 가 중요한데, 뒤 이어서 작업할 내용과 연결되어서 작업이 되야 합니다. 발급이 완료되면 `client_id` 와 `secret` 값 받게 되고 서비스 서버에 해당 값을 저장 합니다.

<figure class="align-center">
  <img width="350px" src="{{site.baseurl}}/assets/fullstack/oauth-gcp.png">
  <figcaption>입력 파라미터 정보</figcaption>
</figure>

<br/>

# Django All Auth
`django-allauth` 패키지로 작업을 진행 하겠습니다. 
- [DRF에서 소셜 로그인(Google) 기능 구현하기](https://velog.io/@kkh2742/TIL221121) 
- [django에서 kakao 로그인 api 사용하기 +(allauth 사용)](https://applepick.tistory.com/27)
- [DRF 소셜 로그인 API 구현하기(Google, KaKao, Github)](https://medium.com/chanjongs-programming-diary/django-rest-framework%EB%A1%9C-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-api-%EA%B5%AC%ED%98%84%ED%95%B4%EB%B3%B4%EA%B8%B0-google-kakao-github-2ccc4d49a781)
- [Google OAuth Using `dj-auth` and `django-allauth`](https://medium.com/@aaron-ak/django-rest-framework-drf-with-google-oauth-server-side-flow-using-dj-auth-and-django-allauth-126dcd20374b)

## `settings.py`
앞에서 발급받은 고유값을 Django 와 연결하는 방법이 2가지가 있는데 하나는 `Django Admin` 페이지에 접속해서 `Home > Social Account > Social Application` 에서 직접입력하는 방법과, 두번째 [서비스 파라미터](https://django-allauth.readthedocs.io/en/latest/providers.html#django-configuration) 값을 설정파일에 추가하는 방법 이 있습니다.

```python
SOCIALACCOUNT_PROVIDERS = {
  'google': {
    'APP': {
      'client_id': "*!@&$^!@&!$........",
      'secret': "adg234s!@&$^!$......",
    }, ...
  },
}
```

<figure class="align-center">
  <img width="350px" src="{{site.baseurl}}/assets/fullstack/django-social-app.png">
  <figcaption>Django Admin 에서 APP 인증정보 추가</figcaption>
</figure>

<br/>

# React.js
프론트엔트는 SocialLogin 을 위한 URL 로 Redirect 후, 전달받은 API 값을 활용하여 rendering 결과를 활용하는 방식으로 구성을 하면 됩니다. 이는 Django React Blog 예제에서 사용자 페이지 로그인 후, 해당내용을 어떻게 받아서 처리를 했는지 이 부분을 그대로 적용하면 될 것으로 보입니다.




<br/>

## 참고사이트
- [Django 에서 이메일 보내기](https://nightskyshop1023.tistory.com/27)
- [Django, React JWT Auth & Pagination](https://levelup.gitconnected.com/full-stack-web-tutorial-django-react-js-jwt-auth-rest-bootstrap-pagination-b00ebf7866c1)
- [Django, React JWT Auth & Pagination GITHUB](https://github.com/timurbakibayev/crud_django_react)
- [Blogify Example GITHUB](https://github.com/Amir-Mohamad/Blogify)
- [Blogify Example with Ninja GITHUB](https://bitbucket.org/momukjilab/ninja-blog/src/master/)
- [OAuth Flowchart (draft)](https://github.com/deu-meta/metaland-accounts/issues/43)
- https://www.geeksforgeeks.org/email-social-logins-in-django-step-by-step-guide/
- https://medium.com/chanjongs-programming-diary/django-rest-framework%EB%A1%9C-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-api-%EA%B5%AC%ED%98%84%ED%95%B4%EB%B3%B4%EA%B8%B0-google-kakao-github-2ccc4d49a781
- https://velog.io/@leehk77789/%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8%EA%B5%AC%EA%B8%80-%ED%95%99%EC%8A%B5
- https://velog.io/@kjyeon1101/%EC%86%8C%EC%85%9C%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%EA%B8%80
- https://medium.com/@aaron-ak/django-rest-framework-drf-with-google-oauth-server-side-flow-using-dj-auth-and-django-allauth-126dcd20374b
