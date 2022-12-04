---
layout: blog
title: Django Ninja Auth
tags:
- ninja
---

Django 에서 React 와 보안을 위해 사용하는 방법중에 PyJWT 를 활용한 Token 을 검증하는 방법부터, SNS 소셜 미디어를 활용한 로그인 방법까지 알아 보도록 하겠습니다.

로그인 관련 개념 내용들은 [쉽게 알아보는 서버 인증 2편(Access Token + Refresh Token)](https://tansfil.tistory.com/59) 및 [DRF JWT 인증방식 로그인, 회원가입](https://korinkorin.tistory.com/57) 내용을 참고합니다

# PyJWT

아래 코드는 `{"some":"payload"}` 객체를 `HS256` 로 암화화된 방법을 사용해서 전달하는 내용 입니다.

암호를 생성하고, 해석하는데 필요한 Key 객체로써, 아래의 예시에서는 `key` 데이터를 사용하여 확인 합니다.

```python
import jwt
key = "secret"
encoded = jwt.encode({"name": "payload", "password":"secret1234"}, key, algorithm="HS256")
print(encoded)
#eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb21lIjoicGF5bG9hZCJ9.4twFt5NiznN84AWoo1d7KO1T_yoc0Z6XOpOVswacPZg

jwt.decode(encoded, key, algorithms="HS256")
#{'some': 'payload'}
```

# Django

## Django Ninja
[Reddit](https://www.reddit.com/r/django/comments/r2tti8/django_ninja_auth_example/) 에 설명한 예시 내용을 이해 해보겠습니다.

