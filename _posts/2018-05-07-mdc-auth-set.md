---
title : django 사용자 인증
last_modified_at: 2018-05-07T10:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - django
    - pyton
toc: true    
---


# Mastering Django Core

<br>
## Django 인증 시스템 사용

### Super User 만들기 

`$ python manage createsupteruser` 이후 정보를 입력한다. 또는 터미널에서 `$ python manage createsupteruser --username=erdos --email=django@django.net` 을 입력하면 바로 암호설정화면으로 넘어간다 


### Shell 에서 사용자 만들기

```python
from django.contrib.auth.models import User

# 이를 실행과 동시에 사용자가 등록된다
user = User.objects.create_user('User_name', 'django@gmail.com', 'passwd')
user.last_name = 'Kim'
user.save()
```


### 사용자 암호 분실시 변경하기

`$ python mange changepassword User_name` 을 입력하면 **비밀 번호를 2번 입력**후 변경 가능하고, 다음의 명령을 사용하면 **묻지도 따지지도 않고 비밀변호를 변경**한다

```python
from django.contrib.auth.models import User

u = User.objects.get(username='erdos')
u.set_password('django')
u.save()
```



<br>
## 웹 요청의 인증 

### views.py 에서 사용자 로그인

```python
from django.contrib.auth  import authenticate, login

def my_view(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username = username, password=password)
    if user is not None:    # 올바른 계정 로그인
        if user.is_active:     # 해당 계정이 활성화 확인 
            login(request, user)
        else:                  # 사용중지계정 오류출력
    else:                   # 잘못된 로그인 오류출력
```

모듈 호출시 **authenticate**을 먼저 불러온 뒤 **login** 모듈을 호출해야 성공적인 사용자 설정 모듈을 활용 가능하다 
{: .notice--success}


### views.py 에서 사용자 로그아웃

```python
from django.contrib.auth import logout

def logout_view(request):
    logout(request)
```

**사용자 특정없이** 함수만 작동하면 바로 로그아웃이 되고 세선에서 사용자 정보가 삭제된다
{: .notice--success}
 

### 로그인 사용자에 대한 접근제한

**ListView의 Template:**
{.notice--info}

**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}  