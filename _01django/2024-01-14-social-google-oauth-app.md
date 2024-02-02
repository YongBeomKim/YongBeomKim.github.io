---
layout: blog
title: Google에서 확인하지 않은 앱
tags:
- django
---

지금까지 앞에서 [Social Login Google in Django](https://yongbeomkim.github.io/01django/2023-05-10-social-google.html) 의 내용으로 로그인 서비스를 제작하는 방법을 정리하였습니다.

대략 6개월 정도 운영을 하다보니 2024년 2월 부터 `Google에서 확인하지 않은 앱` 메세지를 출력 하였습니다. 검색결과 관련 게시물을 다수 확인할 수 있었고, 관련하여 조치를 필요로 하는 내용들은 E-mail 로 알려주는 대로 진행을 한 뒤, 승인을 거처야 해당 메세지를 해결 할 수 있다는 내용들이었습니다.

<div style="text-align: center;">
  <figure class="align-center">
    <img src="{{site.baseurl}}/assets/fullstack/g-oauth-login.png">
    <figcaption>로그인 메세지</figcaption>
  </figure>
</div>

<br/>

# Google Console 확인하기
관련 이메일이 영문으로 와서 해소를 하지 못한 것으로 생각되어 콘솔에서 확인한 결과 다음과 같은 메세지를 확인 할 수 있었습니다. 아직 개발작업이 진행중인 상황에서는 `http://localhost` 도메인을 사용중이 었기 때문에 당분간은 `Google Cloud console` 에서 초대한 계정에 필요한 계정들을 수동으로 추가한 뒤, 완전한 배포단계에서 추가적으로 필요한 조치들을 취하고, 관련 내용들을 정리해 보도록 하겠습니다.

<div style="text-align: center;">
  <figure class="align-center">
    <img src="{{site.baseurl}}/assets/fullstack/g-oauth-message.png">
  </figure>
</div>

<div style="text-align: center;">
  <figure class="align-center">
    <img src="{{site.baseurl}}/assets/fullstack/g-oauth-user.png">
  </figure>
</div>


## 참고사이트
- [google oauth2 사용하기](https://idlecomputer.tistory.com/310)
