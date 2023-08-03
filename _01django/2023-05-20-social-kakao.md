---
layout: blog
title: Social Login Kakao 
tags:
- django
---

앞서 살펴본 `Google, Naver` 와 비교해서 `KAKAO`는 조금 더 복잡한 구조를 갖고 있었습니다. 이번에서 `Django Ninja` 로 내용을 구현해 보았습니다.

<br/>

# 카카오 소셜 로그인
[카카오 로그인](https://developers.kakao.com/docs/latest/ko/kakaologin/common) 개발문서에서 `Google` 에서 이해했던 것처럼 `REST API` 내용을 참고하여 작성을 하다보면 무난하게 따라갈 수 있었습니다. 작업 단계를 정리하면 그림의 내용과 같습니다.

1. Kakao 에 로그인 요청하기
2. `Redirect URL` 로 `code` 쿼리를 `GET` 방식으로 전달한다 (인가코드 받기)
3. 전달받은 `code` 를 활용하여 로그인 사용자의 `Access Token` 을 발급 받는다 (토큰 받기)
4. 전달받은 `Access Token` 을 활용하여 `사용자 프로필 정보` 를 전달 받는다 (사용자 로그인 완료)

<div style="text-align: center;">
  <figure class="align-center">
    <img src="{{site.baseurl}}/assets/fullstack/kakao_oauth.png">
    <figcaption>카카오 로그인 과정</figcaption>
  </figure>
</div>

## 로그인 애플리케이션 등록하기
카카오 개발자 사이트에 가입을 합니다. 그리고 **[내 애플리케이션](https://developers.kakao.com/console/app)** 콘솔에서 앱을 등록합니다. 도메인이 없는경우 `http://localhost` 만으로도 진행이 가능합니다. 등록을 완료하면 **네이티브 앱**, **REST API**, **JavaScript** 그리고 **Admin 키** 4개를 발급합니다. 이 내용을 메모장 등에 저장합니다.

애플리케이션 상세Tab 에서 **[카카오 로그인](https://developers.kakao.com/console/app/908492/product/login)** 버튼을 누르면 **카카오 로그인 활성화** 와 함께 **Redirect URI** 를 입력해야 합니다. **Redirect URI** 는 **로그인 할 때** 의 경로와 **로그아웃 할 때** 작업 완료후 Redirect URI 주소값을 입력 합니다.

## 카카오 로그인 URL
[카카오 로그인 인가코드](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#kakaologin) 를 발급받는 방법은 다음과 같습니다. **REST_API_KEY** 는 앱 발급받을 때 저장한 키값을 입력하면 되고, **REDIRECT_URI** 는 사용자가 `Code` 를 전달받은 뒤 `OAuth` 인증과정을 진행할 API 경로를 위에서 입력을 하고, 입력한 값으로 지정을 해 주면 됩니다. 조건에 충족하는 값들로 모두 채워 졌으면 아래의 실행결과 카카오 로그인 화면이 정상적으로 진행 됩니다.

```bash
GET /oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code HTTP/1.1
Host: kauth.kakao.com
```

## 토큰 받기
로그인 과정이 모두 완료 되었으면 **사용자 Code** 를 쿼리로 포함하여 **Redirect URI** 주소로 서버에서 전달하는 것을 볼 수 있습니다. **Redirect URI** API 함수에서는 `request.GET.get('code')` 를 사용하여 전달된 **사용자 code** 를 함수 내부에서 활용할 수 있습니다.
```bash
http://localhost:8000/login/kakao?code="asgiqweoivagodijvazxcz12324"
```

[토큰 받기](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token) 공식문서 내용을 참고하면 `POST` 방식으로 `Parameter` 를 포함하여 아래의 주소로 요청을 하면, 사용자 정보를 확인 할 수 있는 `Access Token` 을 발급 받을 수 있습니다.

```bash
POST /oauth/token HTTP/1.1
Host: kauth.kakao.com
Content-type: application/x-www-form-urlencoded;charset=utf-8
```

|  Name      | Description               |	Type  |필수 |
|:-----------|---------------------------|--------|---:|
|grant_type  | `authorization_code`로 고정|	String | O  |
|client_id   | REST API 키               | String |	O  | 
|redirect_uri| 리다이렉트된 URI 	         | String | O  |
|code        | 코드받기 요청으로 받은 `인가코드`|String | O  |

이 내용을 파이썬으로 작성하면 다음과 같습니다.
```python
import requests
from urllib.parse import urlencode
oauth_head = "https://kauth.kakao.com/oauth/token"
oauth_query = {
  "grant_type":"authorization_code",
  "client_id":REST_API_KEY,
  "redirect_uri":REDIRECT_URI,
  "code":code,
}
oauth_url = oauth_head + "?" + urlencode(oauth_query)
oauth_response = requests.post(oauth_url).json()
```

## 사용자 프로필 정보받기
이 부분 때문에 이번 문서를 작성하게 되었습니다. 공식 문서대로 함수를 작성하여 실행을 하면 처음 전달받은 결과 값은 다음과 같았습니다. 혹시나 아래의 값으로 상세정보를 전달받기 위해 추가적인 내용이 필요한지도 살펴 보았지만 결과적으로 아래 내용이 모든 사용자 정보를 전달한 것이 맞았고, 추가적인 정보를 전달받기 위해서는 사용자 동의를 요청이 있은 뒤에야 가능 했습니다.
```json
{
  "id": 2800000000, 
  "connected_at": "2023-05-23T10:40:21Z"
} 
```

그럼 우선 [사용자 정보 가져오기](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#req-user-info)  방법에 대해서 알아보겠습니다.
```bash
GET/POST /v2/user/me HTTP/1.1
Host: kapi.kakao.com
Authorization: Bearer ${ACCESS_TOKEN}/KakaoAK ${APP_ADMIN_KEY}
Content-type: application/x-www-form-urlencoded;charset=utf-8
```

공식문서에는 `/KakaoAK` 로 나와있는 부분 때문에 혼동이 있었는데, 이는 `Bearar`로 호출하는 방법, `KakaoAK`로 호출하는 방법 2가지가 있음을 1개의 문서로 설명하다는 내용이었습니다. `Parameter` 에서 설명하는대로 `Authorization: Bearer ${ACCESS_TOKEN}` 만 Hearer 값으로 전달하면 앞에서 살펴본 내용과 같이 정상적인 결과값을 전달 받을 수 있었습니다.

<br/>

## 동의항목
애플리케이션 설정 화면에서 **[동의항목](https://developers.kakao.com/console/app/908492/product/login/scope)** 을 클릭하면 사용자가 로그인 할때 어떤 정보를 요청하고 전달받을지를 설정할 수 있습니다. 여기에서 문제가 있었는데 `사용자 이메일` 내용을 동의항목으로 변경하려면 추가로 설정해야 될 내용이 있었습니다.

[카카오 로그인 동의항목 검수에 대해 질문드립니다](https://devtalk.kakao.com/t/topic/116587) 내용을 참고하면 `서비스 검수`가 완료된 애플리케이션에 한정되어 사용자 이메일을 전달받을 수 있게 되어 있습니다. **애플리케이션** 화면의 **비지니스** 탭에서 **사업자 번호가 있는경우** 에 한정되어 검수과정을 완료할 수 있게 되어 있지만, 개인 개발자를 위해서  [사업자 번호가 없는 경우 비즈 앱 설정하는 방법이 변경되었습니다](https://devtalk.kakao.com/t/how-can-i-switch-to-a-biz-app-if-i-do-not-have-any-business-registration-number/71983) 내용을 참고하여 진행을 하면 `이메일 인증을 위해서 사용` 탭 부분이 있고 이를 선택하면 사업자번호 등록없이도 이메일 동의를 요청할 수 있었습니다.

이렇게 사용자동의 내용을 충족하고 나면 앞에서 작업한 내용이 실행결과값은 다음과 같았습니다.
```json
{
"id": 28000000, "connected_at": "2023-05-23T10:40:21Z", 
"properties": {
   "nickname": "홍길동", 
   "profile_image": "http://k.kakaocdn.net/img_640x640.jpg",
   "thumbnail_image": "http://k.kakaocdn.net/img_110x110.jpg"
},
"kakao_account": {
   "profile_nickname_needs_agreement": false,
   "profile_image_needs_agreement": false,
   "profile": {
       "nickname": "홍길동", 
       "thumbnail_image_url": "http://k.kakaocdn.net/img_110x110.jpg",
       "profile_image_url": "http://k.kakaocdn.net/img_640x640.jpg",
       "is_default_image": true
   },
   "has_email": true, 
   "email_needs_agreement": false, 
   "is_email_valid": true, 
   "is_email_verified": true, 
   "email": "username@kakao.com"
}
```

## 총평
앞에서 살펴본 `Google, Naver` 와 비교해 보면 조금은 더 복잡하고 결과값도 깔끔하지 않고 손이 많이가는 그런 작업 이었습니다.

<br/>

## 참고사이트
- [카카오 로그인](https://developers.kakao.com/docs/latest/ko/kakaologin/common)