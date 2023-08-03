---
layout: blog
title: Simple JWT  
tags:
- django
---

`User Token` 함수들을 Customized 하면서 발생한 문제는 `Token` 의 관리였습니다. 자주 찾아보게 된 함수 내용을 정리해 보겠습니다.

# Simple JWT
## Create Token
```python
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import SlidingToken
user = get_user_model().objects.first()
SlidingToken.for_user(user)
{'token_type': 'sliding', 'exp': 1684322769, 'iat': 1684322469,
 'jti': '09e3d4', 'refresh_exp': 1684408869, 'user_id': 1}
```

## Read Token
```python
from rest_framework_simplejwt.tokens import AccessToken
AccessToken.for_user(user)
{'token_type': 'sliding', 'exp': 1684322769, 'iat': 1684322469,
 'jti': '09e3d4', 'refresh_exp': 1684408869, 'user_id': 1}
```

## Refresh Token
```python
from rest_framework_simplejwt.tokens import RefreshToken
RefreshToken.for_user(user)
{'token_type': 'sliding', 'exp': 1684322769, 'iat': 1684322469,
 'jti': '09e3d4', 'refresh_exp': 1684408869, 'user_id': 1}
```

## Delete
```python
from rest_framework_simplejwt.token_blacklist.models import \
OutstandingToken, BlacklistedToken

BlacklistedToken.objects.filter(
    token__expires_at__lt=datetime.now()
).delete()

OutstandingToken.objects.filter(
    expires_at__lt=datetime.now()
).delete()
```

<br/>

# JWT
## Token
Token 자료를 활용하는 방법은 다음과 같습니다.
```python
In []: token = AccessToken.for_user(user)
     : type(token)
Out[]: rest_framework_simplejwt.tokens.AccessToken

In []: token.token_type
Out[]: 'access'

In []: str(token)
Out[]: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2'

In []: token.payload
Out[]: {'token_type': 'sliding', 'exp': 1684322769,
 'iat': 1684322469, 'jti': '09e3d4', 
 'refresh_exp': 1684408869, 'user_id': 1}
```

## Decoding
How to decode and verify [simple-jwt-django-rest-framework token](https://stackoverflow.com/questions/62877088/how-to-decode-and-verify-simple-jwt-django-rest-framework-token)
```python
import jwt
from django.conf import settings
key   = settings.SECRET_KEY
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2t'
jwt.decode(token, key, algorithms=['HS256'])
{'token_type': 'access',
 'exp': 1684425573,
 'iat': 1684371573,
 'jti': 'ac5b6d3939a9468c97a5d68b4ac778e7',
 'user_id': 2}
```

<br/>

# 참고사이트
- [DRF JWT 인증](https://velog.io/@duo22088/DRF-JWT-%EC%9D%B8%EC%A6%9D)
- [Simple JWT 를 이용한 TokenRefreshView 1](https://earthlyz9-dev.oopy.io/django/drf/simple-jwt/token-refresh-1)
- [DRF의 simple-jwt를 이용한 로그인 기능 구현 (1)](https://smin1620.tistory.com/43)
- [Create Token Manually](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/creating_tokens_manually.html?highlight=Token#creating-tokens-manually)
- [Delete expired tokens from database](https://stackoverflow.com/questions/73153174/delete-expired-tokens-from-database-django-jwt)
- [How to obtain a token for a user with payload](https://stackoverflow.com/questions/71920941/how-to-obtain-a-token-for-a-user-with-payload-using-django-simple-jwt)
