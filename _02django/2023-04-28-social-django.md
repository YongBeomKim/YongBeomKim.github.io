---
layout: blog
title: Social Login Django 
tags:
- django
---

Django 에서 `사용자정보` 모델을 Customize 한 뒤, `Google 소셜 로그인` API 작업까지 정리해 보겠습니다. 인증 작업은 `OAuth` 방식을 활용하고 있습니다.

<br/>

# Google OAuth 발급받기
구글 인증과 관련하여 필요한 Key 발급, [OAuth 개념 및 동작](https://tecoble.techcourse.co.kr/post/2021-07-10-understanding-oauth/) 등을 알아 보겠습니다. 인증 작업과 관련하여 `URI` 개념이 반복적으로 언급 됩니다. `URI` 는 특정 리소스를 식별하는 `통합 자원 식별자(Uniform Resource Identifier)` 를 의미 합니다. `URL` 은 `URI` 의 서브셋 개념 입니다.

<div style="text-align: center;">
  <figure class="align-center">
    <img src="{{site.baseurl}}/assets/linux/uri-url.jpg">
    <figcaption>URI 와 URL</figcaption>
  </figure>
</div>

## **OAuth Resources**
- `Resource Server` : Client 가 제어하려는 자원을 **보유하는** 서버 `ex)Google`
- `Resource Owner` : 위 서비스를 통해 **로그인을 하려는 User**
- `Client` : 앞의 Resource 를 **활용하려는 서비스**

## **OAuth WorkFlow**
- `Client` **등록** : OAuth Resource 를 활용하려는 Client 서버의 사전승인
- `Resource Owner` **요청** : `GET Resource Server URI` 로, 사용자 확인 파라미터 전송
- `Client` **검사** : 요청 파라미터로 로그인 완료 후, 전송된 파라미터를 검사 및 확인
- `Resource Owner` **승인** : `Redirect URI` 로 Access Token 을 위한 임시 `Authorization Code` 를 발급
- `Refresh Token` : Access Token 만료로 `401 오류` 발생하지 않도록 Access Token 재발급

<figure class="align-center">
  <img width="610px" src="{{site.baseurl}}/assets/fullstack/oauth-process.png">
  <figcaption>OAuth Connection Process</figcaption>
</figure>

## `google-auth-library-python-oauthlib`
[Google OAuth Authoriztion](https://developers.google.com/identity/protocols/oauth2/web-server?hl=ko#python_1) 공식 문서에서는 [google-auth-oauthlib.flow 패키지](https://github.com/googleapis/google-auth-library-python-oauthlib) 로 OAuth 인증하는 법을 안내하고 있습니다.
- [DRF 구글 소셜로그인 (JWT)](https://velog.io/@kjyeon1101/%EC%86%8C%EC%85%9C%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%EA%B8%80)
- [Google OpenID(Oauth) 로그인 구현하기 with django](https://velog.io/@maintain0404/Google-OpenIDOauth-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-with-django) 
- [Google APIs OAuth in Django](https://www.nishantwrp.com/posts/google-apis-oauth-in-django)

## **Google OAuth 인증키 발급**
[Google Cloud Platform](https://console.cloud.google.com/apis/credentials) 에서 `OAuth 2.0 클라이언트 ID` 를 발급 받아야 합니다. 발급을 위한 입력 값에는 `Callback URI` 가 중요한데, 뒤 이어서 작업할 내용이 변경되면 설정에서도 내용을 변경 해야 합니다. 필요한 내용이 모두 입력되면 `client_id` 와 `secret` 값을 저장 합니다.

<figure class="align-center">
  <img width="450px" src="{{site.baseurl}}/assets/fullstack/oauth-gcp.png">
  <figcaption>입력 파라미터 정보</figcaption>
</figure>

<br/>

# **Django**
작업에 필요한 인증키를 발급 받았으면 백엔드인 Django 에서는 `기본 모듈`의 작업과 `추가 설치한 패키지` 작업 2가지로 나눠 집니다.  

## **Django 인증 및 사용자 모델 커스터마이징**
Django **사용자 기본 파라미터** 는 `Username` 과 `Password` 입니다. 하지만 소셜 로그인은 `email` 을 기준으로 작동하고 있는만큼 이에 맞게 내용을 수정 및 보완 합니다. 사용자 모델에서도 [Token 관리](https://stackoverflow.com/questions/72966364/jwt-auth-using-python-social-auth-and-django-rest-framework) 할 수 있도록 내용을 추가 합니다.

[DjangoProject](https://docs.djangoproject.com/ko/4.2/topics/auth/customizing/) 페이지에 모델관리 및 인증 작업 내용이 잘 정리되어 있지만 `Tutorial` 이 아닌 `Manual` 사이트인 관계로 작업 순서는 정리는 되어있지 않은 단점이 있습니다. 때문에 관련 작업이 처음이신 분들은 [Tutorial 순서대로 정리한 블로그](https://blog.ppuing.me/30) 등을 먼저 참고하시기 바랍니다.

```python
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

# User Model Manager
class UserManager(BaseUserManager): 
  def create_user(self, email, username=None, password=None):
    user  = self.model(email = email, username = username)
    token = Token.objects.create(user=user)
    token_jwt = RefreshToken.for_user(user=user)
    token_jwt = {
      "refresh" : str(token_jwt),
      "access" : str(token_jwt.access_token)
    }
    return user

# User Model
class User(AbstractBaseUser):
  email = models.EmailField(verbose_name='이메일',unique=True,db_index=True)
  USERNAME_FIELD = 'email'
  ...

# User Profile
class Profile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
```

## **Django 인증**
**사용자 정보 클래스** 를 `email` 기준으로 변경 하면서, `User` 와 `Profile` 2개의 테이블을 작성 하였습니다. 이를 바탕으로 사용자 인증 과정도 `email` 을 기준으로 작동하도록 아래의 내용을 추가 합니다.

```python
# Auth User Login
from django.contrib.auth.backends import BaseBackend

class UserAuth(BaseBackend):
  def authenticate(self, **kwargs):
    email = kwargs.get('email')
    password = kwargs.get('password')
    user = get_user_model().objects.get(email=email)
    return user
```

<br/>

# **Django Package**
## **Simple JWT 소개**
[Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/creating_tokens_manually.html) 패키지는 DataBase 에 저장된 사용자의 `JWT Token` 의 생성, 인증, 갱신 등을 위한 `Django Model & Table` 을 생성하고 `API 함수` 까지 자동으로 생성하는 패키지 입니다. [pyjwt](https://pyjwt.readthedocs.io/en/latest/) 와 [django-rest-framework](https://www.django-rest-framework.org/) 를 기반으로 작성 되었습니다

Django 패키지와 연동을 위한 [기본설정](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html#installation) 작업하고, 추가로 Jwt 인증 API 에서 설정관련 내용들은 [Settings](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html) 페이지를 참고 합니다.

```python
# Simple JWT Package
install_requires = [
  "django",
  "djangorestframework",
  "pyjwt>=1.7.1,<3",
],
```

## **Simple JWT Urls**
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

## **Simple JWT Manage Tokens**
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

## `django-allauth==0.51.0`
**<span style="color:var(--strong);">`OAuth` 인증절차를 진행하는데 필요한 함수</span>** 를 제공하는 모듈 입니다. Google 소셜 로그인을 사용하는 경우 `0.54 (2023년 5월 1일 현재)` 버전은 아래와 같은 오류 메세지를 출력 합니다. 때문에 [`0.51.0` 버젼](https://github.com/iMerica/dj-rest-auth/issues/481) 을 설치 합니다.
```python
raise OAuth2Error("Invalid id_token") from e
allauth.socialaccount.providers.oauth2.\
  client.OAuth2Error: Invalid id_token
```

## `dj-rest-auth`
[Installation](https://dj-rest-auth.readthedocs.io/en/latest/installation.html) 내용을 적용하면, 별도의 Form 작업 없이도 로그인 인터페이스와 함수를 제공 합니다. 여기서는 Django User Model 과 연동을 위한 함수를 제공하는 목적으로 설치 했기 때문에 `path('dj-rest-auth/', include('dj_rest_auth.urls'))` 로 제공하는 인터페이스는 불필요 합니다.

## `settings.py`
위의 설치한 패키지들을 `Django` 에 연결을 한 뒤, 앞에서 발급받은 `앱 비밀번호` 를 Django 와 연결해야 합니다. 연결하는 방법은 2가지가 있는데 하나는 `Django Admin` 페이지에 접속해서 `Home > Social Account > Social Application` 에서 직접 입력하는 방법과, 두번째 [서비스 파라미터](https://django-allauth.readthedocs.io/en/latest/providers.html#django-configuration) 값을 설정파일에 추가하는 방법 이 있습니다. 아래 내용은 설정파일에 추가하는 내용 입니다.

<figure class="align-center">
  <img width="550px" src="{{site.baseurl}}/assets/fullstack/django-social-app.png">
  <figcaption>Django Admin 에서 APP 인증정보 추가</figcaption>
</figure>

<br/>

```python
SITE_ID = 1
REST_USE_JWT = True
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = 'none' #'mandatory'
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_LOGOUT_ON_GET = True
ACCOUNT_LOGIN_ON_EMAIL_CONFIRMATION = True
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend', # username in admin
    'allauth.account.auth_backends.AuthenticationBackend', # login by e-mail
]

SOCIALACCOUNT_PROVIDERS = {
  'google': {
    'APP': {
      'client_id': "*!@&$^!@&!$........",
      'secret': "adg234s!@&$^!$......",
    }, ...
  },
}
```

<br/>

# Google CallBack
아래 링크는 Java로 구현된 로그인 콜백함수 내용을 정리한 내용 입니다.
- [OAuth Google Url API](https://www.joinc.co.kr/w/man/12/oAuth2/Google)

## Callback URI Process
`Client (서버)` <- => `Resource Server (Google)` <=> `Resource Owner (사용자)` 절차를 통해서 `OAuth` 사용자 인증 과정이 진행 됩니다. `Callbak URI` 는 `Resource Sever` 에서 인증한 `Resource Owner` 의 임시 `Token` 값을 활용하여 `Client` 에 저장된 사용자 정보를 대조 및 활용을 도와주는 `URI` 입니다.

Django 의 DataBase 에 저장된 User 정보와, 각 User 들의 `Access Token`, `Refresh Token` 등을 연결 및 관리하는 모듈이 `Simple JWT` 입니다. 이 관점에서 바라보면 `Callback URI` 는 발급받은 `OAuth` 인증 완료된 `임시 Token` 을 활용하여 Django 의 User 를 제어하게 됩니다.

## Params
CallBack 과정에 필요한 파라미터를 클래스로 작업한 내용입니다. `django.views` 의 `View` 클래스를 상속받으면 `requests` 메서드를 활용할 수 있습니다.
```python
from django.views import View

class Google(View):
  user_url    = "https://www.googleapis.com/oauth2/v2/userinfo?"
  login_head  = "https://accounts.google.com/o/oauth2/v2/auth?"
  login_query = {
    "client_id":GOOGLE_CLIENT_ID,
    "redirect_uri":CALLBACK_URI,
    "response_type":"code",
    "scope":"https://www.googleapis.com/auth/userinfo.email",
  }
  oauth_head  = "https://oauth2.googleapis.com/token?"
  oauth_query = {
    "client_id":GOOGLE_CLIENT_ID,
    "redirect_uri":CALLBACK_URI,
    "client_secret":GOOGLE_SECRET,
    "state":STATE,
    "grant_type":"authorization_code",
  }
```

## Callback ReDirections
인증을 위한 중간과정 클래스 입니다.
```python
from urllib.parse import urlencode
from dj_rest_auth.registration.views import SocialLoginView

# Google 임시 Token 연산 클래스
class GoogleLogin(SocialLoginView):
  adapter_class = GoogleOAuth2Adapter
  callback_url  = CALLBACK_URI
  client_class  = OAuth2Client

# Redirect 클래스
class GoogleLoginView(Google):
  def get(self, request):
    return redirect(
      self.login_head + urlencode(self.login_query)
    )
```

## Callback 함수
```python
class GoogleCallback(Google):

  # Get Tokens & Info
  def get(self, request):

    ## access_token : 구글에서 발행한 Token
    # :: User 모델 사용자 자동추가 (Simple JWT)
    code = request.GET.get('code')
    oauth_query = self.oauth_query
    oauth_query.update({'code':code})
    oauth_url   = self.oauth_head + urlencode(oauth_query)
    oauth_response = requests.post(oauth_url).json()
    access_token   = oauth_response.get('access_token') 

    ## Google 프로필 정보
    user_response = self.user_url + urlencode({
      "access_token":access_token
    })
    user_response = requests.get(user_response)
    user_info  = user_response.json()
    email      = user_info.get('email')
    avatar_url = user_info.get('picture')
    token_db   = user_info.get('id')

    ## Django User Instance
    # :: 로그인 작업과 함께 Refresh Token 을 발행한다
    data = {'access_token': access_token, 'code': code}
    user   = User.objects.get(email=email)
    accept = requests.post(f"{BASE_URL}auth/google/", data=data)
    token_jwt  = RefreshToken.for_user(user=user)
    token_jwt  = {
      "client_id": access_token,
      "refresh": str(token_jwt), 
      "access":str(token_jwt.access_token)
    }
    return JsonResponse(token_jwt)
```

## callback API 작업에 필요한 URL
`auth/login/` 경로에서 로그인에 성공하면 `auth/callback/` 경로의 결과값인 `JsonResponse(token_jwt)` 데이터 내용을 전달 받을 수 있습니다. 다음에 이어서 작업할 `React.js` 프론트엔드 에서는 `Axios` 또는 `Fetch` 호출방식을 통해 사용자 인증에 필요한 데이터를 전달 받을 수 있고, 이러한 정보를 `Cookie` 등에 저장을 한 뒤 필요로 할 때마다 호출하는 방식으로 활용하실 수 있습니다.

```python
urlpatterns = [
  path('auth/', GoogleLogin.as_view()), # dj-rest-form (배포시 Nginx 에서 차단)
  path('auth/login/', GoogleLoginView.as_view()),
  path('auth/callback/', GoogleCallback.as_view()),
]
```

<br/>

## 참고사이트
- [Naver 로그인 API 명세서](https://developers.naver.com/docs/login/api/api.md#%EB%84%A4%EC%9D%B4%EB%B2%84-%EB%A1%9C%EA%B7%B8%EC%9D%B8-api-%EB%AA%85%EC%84%B8)
- [Django 로그인 시 cookie에 token 저장하기](https://velog.io/@rosewwross/Django-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%8B%9C-cookie%EC%97%90-token-%EC%A0%80%EC%9E%A5%ED%95%98%EA%B8%B0)
- [Django CORS Guide : What It Is and How to Enable It](https://www.stackhawk.com/blog/django-cors-guide/)
- [REST Framework를 사용한 JWT OAuth 로그인](https://funncy.github.io/django/2020/04/24/django-jwt/)
- [소셜 로그인(구글) 학습](https://velog.io/@leehk77789/%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8%EA%B5%AC%EA%B8%80-%ED%95%99%EC%8A%B5)
- [DRF 구글 소셜로그인 (JWT)](https://velog.io/@kjyeon1101/%EC%86%8C%EC%85%9C%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%EA%B8%80)
- [DRF에서 소셜 로그인(Google) 기능 구현하기](https://velog.io/@kkh2742/TIL221121)
- [DRF에서 로그인 API 구현(Google, KaKao, Github)](https://medium.com/chanjongs-programming-diary/django-rest-framework%EB%A1%9C-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-api-%EA%B5%AC%ED%98%84%ED%95%B4%EB%B3%B4%EA%B8%B0-google-kakao-github-2ccc4d49a781)
- [django에서 kakao 로그인 api 사용하기 +(allauth 사용)](https://applepick.tistory.com/27)
- [DRF 소셜 로그인 API 구현하기(Google, KaKao, Github)](https://medium.com/chanjongs-programming-diary/django-rest-framework%EB%A1%9C-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-api-%EA%B5%AC%ED%98%84%ED%95%B4%EB%B3%B4%EA%B8%B0-google-kakao-github-2ccc4d49a781)
