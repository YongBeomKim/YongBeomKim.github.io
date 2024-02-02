---
layout: blog
title: Social Login Google in Django
tags:
- django
---

`@oauth-react` 등의 리액트 모듈은 `Vite.js` 또는 `Serve` 등의 프론트엔드 서버 위에서는 정상적으로 작동 되었지만, Django 서버 위에서 실행을 할 때에는 Token 값 호출에 실패를 했습니다. 원인을 추정하자면 `Callback URI` 주소값에서 각각 실행되는 **Port** 값이 달라지는 것을 해결하지 못해서 발생하는 오류로 예상 됩니다.

**OAuth** 인증 과정을 다시 살펴보면 다음과 같습니다.
1. **리소스 서버** 에서 **Access Code** 를 발급받기 위해서 **로그인 Redirect URL** 주소로 Redirect 합니다.
2. **리소스 서버** 는 **Access Code** 를 키값 `code` 로 포함하여  **CallBack URI** 로 전달 합니다.
3. **Callback URI** 함수에서 **OAuth** 인증을 위한 **Access Token** 을 발급 받습니다.
4. **Callback URI** 에서 **Access Token** 을 입력해서 **User Profile** 을 발급 받습니다. 

<br/>

# Django OAuth
`Django` 에서 `OAuth` 에 필요한 과정들을 `Ninja API` 로 구현하고, 결과값은 **Browser Cookie** 로 저장해서 **FrontEnd** 로 활용하는 구조로 결정했습니다. 작업 아이디어는 [React+Django Kakao Social Login](https://velog.io/@jnano94/ReactDjangoKakao-Social-Login) 를 참고 하였습니다. 맨 앞에서 언급한 문제 때문에 링크된 게시물의 내용은 전혀 반영하지 못했습니다. 

## Gogole Identity
[Using OAuth 2.0 for Web Server Applications](https://developers.google.com/identity/protocols/oauth2/web-server) 공식문서에서 작업과정 및 각각의 파라미터에 대한 설명들이 잘 나와 있습니다. 특정한 모듈이 아닌 네이티브로 작업을 하려면 해당 페이지 개발 예제 페이지 에서 **HTTP/REST** 탭에 나와있는 내용들을 참고합니다. 해당 페이지 내용은 별도의 모듈없이 순수하게 `Http` 주소입력 과정을 통해서 작업이 가능하도록 내용을 설명하고 있어서 많은 도움이 되었습니다.

## Process Map
진행과정은 다음과 같습니다.
1. **React.js** 에서 **로그인** 버튼을 클릭
2. **리소스 서버** 로그인 주소로 `Redirect` 
3. **유효코드** 를 발급받아서 **OAuth** 사용자 프로필 정보를 전달받음
4. 가입이 안되어 있으면 사용자 가입 절차를 진행
5. 가입된 사용자는 `Access Token` 의 유효기간을 확인
6. 유효기간이 1주일 이내 남아있으면 유효기간을 연장
7. 작업이 완료된 `Access Token` 을 쿠키에 저장
8. 홈화면으로 이동 하는 것으로 작업을 완료

리액트 홈화면 에서는 유효한 `Access Token` 값이 있으면 `Ninja API` 로 전달해서 **사용자 프로필 정보** 를 받아서 이를 `LocalStorage` 에 저장 합니다. 저장된 프로필을 활용하여 사용자 인증 및 표시기능에 적용 합니다. 지금까지 서술한 **OAuth** 인증과정을 구조도로 정리하면 다음과 같습니다. 

<div style="text-align: center;">
  <figure class="align-center">
    <img src="{{site.baseurl}}/assets/fullstack/oauth-django.png">
    <figcaption>Oauth Process</figcaption>
  </figure>
</div>

## Login Redirect
[Redirect to Google's OAuth 2.0 server](https://developers.google.com/identity/protocols/oauth2/web-server#redirecting) 공식문서에서 **HTTP/REST** 탭에서 내용을 확인할 수 있습니다. `redirect_uri` 주소와 `client_id` 값은 사용자가 별도로 입력 또는 발급받은 내용을 적용 합니다. 이로써 1번 2번과정을 완료 했습니다.

```python
from django.shortcuts import redirect
url = """https://accounts.google.com/o/oauth2/v2/auth?
 scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&
 access_type=offline&
 include_granted_scopes=true&
 response_type=code&
 state=state_parameter_passthrough_value&
 redirect_uri=https%3A//oauth2.example.com/code&
 client_id=client_id"""
redirect(url)
```

로그인을 성공하면 유효한 `OAuth access_token` 을 발급합니다. 해당값은 아래에서 보는것과 동일 합니다. 

```json
{
  "code": ["4/0AbUR2VM2K9YdQE2qMF5d0qcqzAbivHMTExH0AIEdiP11UqZ1AP79sOwm9T5y8EFlVEdywg"], 
  "scope": ["email https://www.googleapis.com/auth/userinfo.email openid"],
  "authuser": ["0"], 
  "prompt": ["consent"]
}
```

## OAuth access_token
`redirect_uri` 경로로 위의 값을 전달하고, 해당 주소에서 나머지 작업을 마무리 합니다. **Resource Sever** 에서 발급된 토큰의 유효시간은 대략 1시간 남짓 입니다. 발급받은 뒤 1시간 이내에 로그인 작업이 완료 되어야 합니다. 이후 과정부터는 프로젝트 내부에서 별도로 관리하는 `JWT` Token 을 사용 합니다.  

파이썬 에서는 `Simple JWT` 를 사용합니다. 별도의 `JWT` 토큰을 발급 및 관리를 하면, 로그인 작업이 완료된 뒤 나머지 작업에서 Token 관리가 서비스 내부 DB 로도 가능해 집니다. 그리고 서비스 특성에 맞게 Token 을 발급 및 관리가 가능해 지는등 장점이 많아 집니다. 자세한 내용은 [Step 5: Exchange authorization code for refresh and access tokens](https://developers.google.com/identity/protocols/oauth2/web-server#httprest_3) 공식 문서를 참고 합니다.

```json
{
  "access_token": "1/fFAGRNJru1FTz70BzhT3Zg",
  "expires_in": 3920,
  "token_type": "Bearer",
  "scope": "https://www.googleapis.com/auth/drive.metadata.readonly",
  "refresh_token": "1//xEoDL4iW3cxlI7yDbSRFYNG01kVKM2C-259HOF2aQbI"
}
```

## Calling Google API
[Calling Google APIs](https://developers.google.com/identity/protocols/oauth2/web-server#callinganapi) 문서에 나와있는 것처럼 지금까지 과정으로 모든 인증과정을 마무리 되었습니다. 발급받은 `access_token` 을 다음의 양식에 맞춰서 서버에 전달하면, 로그인 완료된 사용자의 프로필 정보를 전달 받을 수 있습니다.
```bash
GET /drive/v2/files HTTP/1.1
Host: www.googleapis.com
Authorization: Bearer access_token

GET https://www.googleapis.com/drive/v2/files?access_token=access_token
```

## Complete Example
파이썬 예제가 아닌 `HTTP/REST` 탭에서 [파이썬 플라스크에서 앞의 과정을 진행하는 예제코드](https://developers.google.com/identity/protocols/oauth2/web-server#example) 가 공개되어 있습니다. 이를 참조하여 작업을 마무리 합니다.
```python
import uuid
import json
import flask
import requests

app = flask.Flask(__name__)
CLIENT_ID = '123456789.apps.googleusercontent.com'
CLIENT_SECRET = 'abc123'  # Read from a file or environmental variable in a real app
SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly'
REDIRECT_URI = 'http://example.com/oauth2callback'

@app.route('/')
def index():
  if 'credentials' not in flask.session:
    return flask.redirect(flask.url_for('oauth2callback'))
  credentials = json.loads(flask.session['credentials'])
  if credentials['expires_in'] <= 0:
    return flask.redirect(flask.url_for('oauth2callback'))
  else:
    headers = {'Authorization': 'Bearer {}'.format(credentials['access_token'])}
    req_uri = 'https://www.googleapis.com/drive/v2/files'
    r = requests.get(req_uri, headers=headers)
    return r.text


@app.route('/oauth2callback')
def oauth2callback():
  if 'code' not in flask.request.args:
    auth_uri = (
      'https://accounts.google.com/o/oauth2/v2/auth?response_type=code'
      '&client_id={}&redirect_uri={}&scope={}').format(CLIENT_ID, REDIRECT_URI, SCOPE)
    return flask.redirect(auth_uri)
  else:
    auth_code = flask.request.args.get('code')
    data = {
      'code': auth_code,
      'client_id': CLIENT_ID,
      'client_secret': CLIENT_SECRET,
      'redirect_uri': REDIRECT_URI,
      'grant_type': 'authorization_code'}
    r = requests.post('https://oauth2.googleapis.com/token', data=data)
    flask.session['credentials'] = r.text
    return flask.redirect(flask.url_for('index'))

app.secret_key = str(uuid.uuid4())
app.debug = False
app.run()
```

<br/>

# 마무리
[@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google) 또는 [google-api-python-client](https://github.com/googleapis/google-api-python-client) 등의 모듈을 사용할 때 계속 문제가 되는 부분이 `redirect_uri` 주소 였습니다. `8000`번 포트에서 실행하는 Django 서버 위에서, `5173` 포트에서 실행하는 `Vite.js` 로 빌드된 `React.js with TypeScript` 로 작업을 하고 있습니다. 이러한 환경이 생각보다 극한상황 이었구나 하는 두려움과 함께, 해결을 한 뒤에는 어떠한 문제가 발생 하더라도 다 극복 가능하다는 자신감(?)이 생겼지만 그만큼 가성비는 나빴던 상황이었던 만큼 보다 효율적으로 성과를 내는 방향을 빠르게 찾고, 이러한 문제해결 과정들을 기록으로 남겨서 비슷한 문제가 발생할 때에도 이전 보다는 더 효율적으로 작업을 완료하는 능력을 키워가는데 더 집중하도록 하겠습니다.

## 참고사이트
- [Django cookie에 token 저장하기](https://velog.io/@rosewwross/Django-로그인-시-cookie에-token-저장하기)
- [google oauth2 사용하기](https://idlecomputer.tistory.com/310)
- [Drawio - OAuth Process Map](https://app.diagrams.net/#G1BuYCR-l3c1Xu2JR6XoE1KUDoutSA1ihB)
