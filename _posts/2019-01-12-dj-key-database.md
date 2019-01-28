---
title : Django 에서 ORM 구성하기
last_modified_at: 2019-01-12T10:45:06-05:00
header:
  overlay_image: /assets/images/book/django-sample.jpg
categories:
  - django
tags: 
    - django
    - db
toc: true 
comments: true
---

Django 의 DataBase와 연결시 단일한 model 인스턴스를 사용하는 방법이 가장 간단하다. 하지만 value에 반복되는 숫자/문자열이 포함되어 있는 경우에는, index가 길어줄수록 **불필요하게 중복되는 Value들이 많아지게 되고** 이는 DataBase 용량의 비대화 및 성능저하의 원인이 됩니다.

이를 극복하기 위해서 중복되는 값들을 Primary Key Table로 별도 관리하는 것은 전통적인 DataBase 방식입니다. [(다중 DataBase를 사용하는 경우 기본키-외래키)](https://hangpark.com/django-multi-db-relation/) Django에서 적극적인 활용을 위해 간략하게 정리를 해보겠습니다. <strike><small>앞의 파이썬 기본편의 투표시스템에서도 다뤘던 내용이기도 합니다 [(Doc)](https://docs.djangoproject.com/ko/2.1/intro/tutorial02/)</small></strike>

<br/>
# Contents

https://simpleisbetterthancomplex.com/tutorial/2016/12/06/how-to-create-group-by-queries.html



<script id="dsq-count-scr" src="//http-yongbeomkim-github-io.disqus.com/count.js" async>
</script>