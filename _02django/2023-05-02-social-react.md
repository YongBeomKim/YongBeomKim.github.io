---
layout: blog
title: Social Login React.js   
tags:
- django
- react
---

지금까지 `Django` 에서 `OAuth` 인증과 관련한 내용을 알아 보았습니다. 앞에서 작업한 `Django` 서버를 `React.js` 와 연결작업을 하다보면 `302 Https Error` 를 출력했습니다. [django-allauth 소셜로그인 이후 redirect View 클래스 작성](https://blog.myungseokang.dev/posts/django-allauth-about-redirect/) 으로 해결 하더라도 `Django` 와 `React.js` 에서 `OAuth` 인증 프로세스를 중복으로 설정 및 유지보수를 해야하는 문제가 남습니다.

`django-allauth` 모듈이 덩치가 크고 상대적으로 마이너 모듈인 만큼, 인증 모듈의 중복제거 및 향후 유지보수를 위해서라도 `React.js` 패키지 중심으로 사용자 인증 및 관리구조를 개편하는 것이 더욱 유리 합니다.

<br/>

# Tutorial
우선 리액트에서 `Google OAuth` 인증절차를 알아 보겠습니다. 이전까지는 [react-login-google](https://www.npmjs.com/package/@dump-work/react-google-login) 모듈이 대세였지만 해당 모듈이 더이상 지원하지 않고 여러 파생 모듈들이 등장 했습니다. 그중 가장 활성도가 높은 [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google) 를 활용한 예제를 살펴보겠습니다.

Google 에서 제공하는 Login Button 형식은 3가지가 있습니다.
1. Sign In with Google : 브라우저에 저장된 사용자 정보를 노출하는 로그인 버튼
2. One tap Sign Up : 별도의 과정없이 사용자 가입절차를 진행
3. Automatic Sign In : 세션에 저장된 가입자 정보를 보여주고 로그인 진행

[![Google Identity Services Login with React (2023 React Google Login)](https://i.ytimg.com/vi/roxC8SMs7HU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLApQMKzT0T78QCQOM44HFitEgHL0g)](https://youtu.be/roxC8SMs7HU)

## 

## 리액트 만으로 소셜인증 시스템 구축하기

바로 앞 페이지에서, `Google` 에서 제공하는 `OAuth` 사용자 인증 과정과, Django 에서 구현하는 작업에 대해 자세히 알아 보았습니다. 이번 페이지는 앞에서 구현된 `Google Social Login` API를 `React.js` 페이지에서 연결 및 활용하는 내용을 알아보겠습니다.

## **OAuth Resources**
- `Resource Server` : Client 가 제어하려는 자원을 **보유하는** 서버 `ex)Google`
- `Resource Owner` : 위 서비스를 통해 **로그인을 하려는 User**
- `Client` : 앞의 Resource 를 **활용하려는 서비스**

<div style="text-align: center;">
  <figure class="align-center">
    <img src="{{site.baseurl}}/assets/linux/uri-url.jpg">
    <figcaption>URI 와 URL</figcaption>
  </figure>
</div>


# Errors
## `[hmr] Failed to reload {파일 경로}. This could be due to syntax errors or importing non-existent modules. (see errors above)`
수정한 내용에 문법오류가 없는데도 위와같은 오류 메세지를 출력 했는데 (`vite 3.1.x`) 원인은 `Vite.js` 에서 발생한 문제 였습니다. `ContextAPI` 관련 이슈로 최신버젼으로 `vite` 를 업데이트 하면 해당 오류가 더이상 발생하지 않았습니다. [Vite HMR 에러 (feat. ContextAPI)](https://tesseractjh.tistory.com/307)

## `[GSI] The given origin is not allowed for the given client ID`
JavaScript 에서 `Authorized JavaScript origins` 문제로 인해 발생하는 오류로 OAuth 등록시 포트없는 주소까지 추가하는 방법으로 해결하는 방법이 있는데 [Stackoverflow](https://stackoverflow.com/questions/68438293/the-given-origin-is-not-allowed-for-the-given-client-id-gsi) 이것으로는 해결되지 않았지만 `index.html` 에 아래의 내용을 추가하는 것으로 해결 가능했습니다.
```html
<meta name="referrer" content="no-referrer-when-downgrade" />
```

## `Ignoring the less restricted referrer policy “no-referrer-when-downgrade”`
FireFox 브라우저에서 실행할 때, 바로 앞의 내용을 추가한 상태에서 발행한 오류로 [브라우저에 다음의 내용들을 추가](https://phabricator.wikimedia.org/T293109) 하면 정상작동 하는 것을 볼 수 있었습니다.
```html
<meta name="referrer" content="origin">
<meta name="referrer" content="origin-when-crossorigin">
<meta name="referrer" content="origin-when-cross-origin">
```

<br/>

https://berom.tistory.com/30
https://medium.com/@ronakchitlangya1997/social-authentication-email-using-django-and-react-js-e1cc8456262d


## 참고사이트
- [Django 소셜로그인 - NAVER LOGIN](https://pythonblog.co.kr/blog/84/)
- [React 네아로(네이버아이디로그인) 구현](https://velog.io/@sssssssssy/%EB%84%A4%EC%9D%B4%EB%B2%84%EB%A1%9C%EA%B7%B8%EC%9D%B8)
- [React+Django Kakao Social Login](https://velog.io/@jnano94/ReactDjangoKakao-Social-Login)
- [React 구글 소셜 로그인 에러 삽질기 (feat. 커스텀 버튼)](https://prod.velog.io/@miyoni/google-social-login)
- [Full Stack Web Tutorial: Django, React JS, JWT Auth, REST, Bootstrap, Pagination](https://levelup.gitconnected.com/full-stack-web-tutorial-django-react-js-jwt-auth-rest-bootstrap-pagination-b00ebf7866c1)

- [Unable to get access token from google oauth](https://stackoverflow.com/questions/75767917/unable-to-get-access-token-from-google-oauth)
- [Django와 React를 이용해서 github 로그인을 해봅시다](https://heokknkn.tistory.com/54)
- [Social Authentication Using Django and React](https://medium.com/@ronakchitlangya1997/social-authentication-email-using-django-and-react-js-e1cc8456262d)
- [Social Auth using Django and React](https://medium.com/@ronakchitlangya1997/social-authentication-email-using-django-and-react-js-e1cc8456262d)
- [Social Logins in React.js & Django – Step by Step](https://www.geeksforgeeks.org/email-social-logins-in-django-step-by-step-guide/)
- [Google Login with Django & React — Part 3](https://iamashutoshpanda.medium.com/google-login-with-django-react-part-3-6f90674ce829)
- [Django, React JWT Auth & Pagination](https://levelup.gitconnected.com/full-stack-web-tutorial-django-react-js-jwt-auth-rest-bootstrap-pagination-b00ebf7866c1)
