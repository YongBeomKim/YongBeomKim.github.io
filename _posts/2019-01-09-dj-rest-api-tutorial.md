---
title : Django Restful API
last_modified_at: 2019-01-09T10:45:06-05:00
header:
  overlay_image: /assets/images/code/djrest.jpg
categories:
  - django
tags: 
    - restapi
    - django
toc: true 
---

**_Django_** 패키지들 중에서도 **django-filter**, **django-table2** 등의 모듈이 존재하지만 이들은 서버에서 작업의 한계로 인해, **Client** 및 외부연결을 위해서는 **Rest API** 를 사용해야 합니다.

<br/>
# Restful Python Web Service
2년전에 구입한 **Restful 파이썬 웹서비스** 책의 내용을 바탕으로 전반적인 내용을 정리해 보겠습니다. 당시에는 내용이 적다고 생각했었는데 여러 패키지를 다루고서 반복해본 결과 생각보다 내용이 알차게 구성되어 있음을 알 수 있었습니다.

## 1장 : Restful API in Django
1. **models.py** : 모델을 만들고
2. **serializer.py** : 모델 Instance 와 Python Primitve 를 중개합니다
   1. **랜더러 (Renderer)** : Server DB 를 Json 등으로 **출력하는 직렬화** (serialize)
   2. **파서(Parser)** : 외부 API 정보를 **Server DB로 전달하는 역직렬화** (deserialize)



