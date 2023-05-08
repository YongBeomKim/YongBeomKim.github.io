---
layout: blog
title: Social Login React.js   
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
- [Social Logins in React.js & Django – Step by Step](https://www.geeksforgeeks.org/email-social-logins-in-django-step-by-step-guide/)
- [Google Login with Django & React — Part 3](https://iamashutoshpanda.medium.com/google-login-with-django-react-part-3-6f90674ce829)
- [Django, React JWT Auth & Pagination](https://levelup.gitconnected.com/full-stack-web-tutorial-django-react-js-jwt-auth-rest-bootstrap-pagination-b00ebf7866c1)
