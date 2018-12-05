---
title : 파이썬 웹 프로그래밍 개정판 추가
last_modified_at: 2018-11-20T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - django
    - python
toc: true 
---


# 파이썬 웹 프로그래밍 (개정판) 실습

<br/>
# Django 핵심 기능들

## Generic View

**as_view() :** 클래스형 View 의 **진입 메소드** 로써, 내부의 **dispatch()** 메소드로 POST/ GET 요청여부를 확인 후 해당 인스턴스를 자동연결 처리를 하고, 연결 메서드가 없으면 **HttpResponseNotAllowed** exception을 출력한다

## Form

1. **최초 Form :** 비어있는 Form 객체
2. 유효값 포함 **Post :** Redirect 된다
3. 유효값 없는 **Post :** Error 메세지와 함께 출력 
