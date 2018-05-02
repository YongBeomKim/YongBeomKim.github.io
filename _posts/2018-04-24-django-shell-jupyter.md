---
title : Django Shell in Jupyter
last_modified_at: 2018-04-24T10:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
  caption: "Django Shell"
categories:
  - django
tags: 
    - django
    - pyton
    - jupyter
toc: true    
---


Django 객체들과 Template 를 Test 하기 위해서는 Python Shell을 사용하는 경우가 많다. 물론 Ipython을 바로 쓰면 되지만, 단점은 해당 Code를 매번 입력하는 번거로움 때문에 Jupyter 를 활용한 Shell 의 장점이 두드러 지는 작업이다.

물론 매번 kernel 이름에 Django가 있어서 거추장 스럽긴 하지만 뭐 그정도야 ㅜㅜ;; 


## Jupyter 연동을 위한 설정방법 [초코몽키](https://wayhome25.github.io/django/2017/03/21/django-ep7-django-shell/)

django-extensions 설치
```
$ pip install django-extensions
```


settings.py 내 django_extensions 추가 (앱을 활성화)
```python
INSTALLED_APPS = [
'django_extensions',
]
```


shell_plus 실행 : 터미널에서 실행하면 관련 모듈을 자동으로 불러온 뒤 실행된다 
```
$ python3 manage.py shell_plus  
```


Jupyter notebook
```
$ python manage.py shell_plus --notebook
```

**Please Note:** jupyter 도 좋지만, Terminal 접속환경에서도 활용가능한 shell_plus도 자주 사용해서 익히자
{: .notice--info}

