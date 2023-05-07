---
layout: blog
title: React Social Login with Django  
tags:
- django
- react
---

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


<br/>

## 참고사이트
- [DRF에서 소셜 로그인(Google) 기능 구현하기](https://velog.io/@kkh2742/TIL221121) 
- [django에서 kakao 로그인 api 사용하기 +(allauth 사용)](https://applepick.tistory.com/27)
- [DRF 소셜 로그인 API 구현하기(Google, KaKao, Github)](https://medium.com/chanjongs-programming-diary/django-rest-framework%EB%A1%9C-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-api-%EA%B5%AC%ED%98%84%ED%95%B4%EB%B3%B4%EA%B8%B0-google-kakao-github-2ccc4d49a781)
- [Google OAuth Using `dj-auth` and `django-allauth`](https://medium.com/@aaron-ak/django-rest-framework-drf-with-google-oauth-server-side-flow-using-dj-auth-and-django-allauth-126dcd20374b)
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
