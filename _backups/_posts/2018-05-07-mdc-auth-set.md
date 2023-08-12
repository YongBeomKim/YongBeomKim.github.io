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

`$ python manage createsupteruser` 이후 정보를 입력한다. 또는 터미널에서 `$ python manage createsupteruser --username=username --email=django@django.net` 을 입력하면 바로 암호설정화면으로 넘어간다 


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

u = User.objects.get(username='username')
u.set_password('django')
u.save()
```


<br>
## 허가 및 권한 부여

### djanog Code 로 사용 권한 만들기

`META` 클래스에서 사용자 권한을 직접 작성가능하다. 

```python
from books.models import Book
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

content_type = ContentType.objects.get_for_model(Book)
Permission = Permission.objects.create(codename='can_publish',
                                      name = 'Can Publish Reviews',
                                      content_type=content_type)
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
{: .notice--info}


### views.py 에서 사용자 로그아웃

```python
from django.contrib.auth import logout

def logout_view(request):
    logout(request)
```

**사용자 특정없이** 함수 작동만으로 바로 로그아웃과 세션정보를 삭제한다
{: .notice--info}
 

### 로그인 사용자만 접근가능 함수 

```python
from django.shortcuts import redirect

# 로그인 페이지로 redirect
def my_view(request):
    if not request.user.is_authenticated():
        return redirect('/login/?next=%s' %request.path)

# 로그인 오류 메세지 출력 html을 연결
def my_view(request):
    if not request.user.is_authenticated():
        return redirect(request, 'books/login_error.html')
```


### 로그인 데코레이터

@login_required

```python
from django.contrib.auth.decorators import login_required

@login_required
def my_view(request):
    return redirect('/login/?next=%s' %request.path)
```

**@login_required** 는 현재의 **query 경로**문자열을 **next** 쿼리 문자열 파라미터에 저장하는데, 사용자 임의로 파라미터이름을 바꿀수 있다

```python
@login_required(redirect_field_name='my_redirect_field')
def my_view(request):
    ...
```

또는 **login url** 또는 **template**이름을 임의로 지정할 필요가 있는 경우에도 활용 가능하다 

```python
@login_required(login_url='account/login/main')
def my_view(request):
    ...
```


### urls.py

login url 경로에 login view 가 올바르게 연결되었는지 확인하는 함수를 추가한다

```python
# ./views.py와 혼동을 방지하기 위해 이름을 변경한다
from django.contrib.auth import views as auth_views

urlpatterns = [
    re_path(r'^accounts/login/$', auth_views.login),] 
```



<br>
## 로그인 사용자에 대한 Access 제한

### 관리자가 원하는 mail 도메인을 확인한다

```python
def my_view(request):
    if not request.user.email.endswith('@django.com'):
        return HttpResponse("You can't leave a review for this book")
```


@ user_passes_test 데코레이터를 활용하여 구현하기 

```python
from django.contrib.auth.decorators import user_passes_test

def email_check(user):
    return user.email.endswith('@django.com')

@user_passes_test(email_check)
def my_view(request):
    pass

@user_passes_test(email_check, login_url='/login/')
def my_view(request):
    pass
```

**@user_passes_test**는 필수인자를 취하고, 자동으로 익명여부를 판단한다
{: .notice--info}


<br>
## 인증 뷰

```
urls.py

urlpatterns = [
    re_path(r'^/login/$', include('django.contrib.auth.urls'))
    ]
```


### 기본 urls 경로명

1. `/login/`
2. `/logout/`
3. `/password_change/`
4. `/password_change_done/`
5. `/password_reset/`
6. `/password_reset_done/`
7. `/password_reset_confirm/`
8. `/password_reset_complete/`


<br>

## 템플릿의 데이터 인증

로그인 사용자의 권한은 템플릿 변수 `{ { perm } }` 객체(permission)에 저장된다. 이는 `django.contrib.auth.context_processors.PermWrapper` 의 인스턴스객체로 생성된다

로그인 사용자 이름이 `'foo'` 인 경우에는 `{ { prem.foo } }` 객체로 권한을 확인 가능하다 

`{ { perm.foo.can_vote } }` 는 `foo` 사용자의 `can_vote` 권한이 있는지를 ** True / False**로 출력한다. 이는 `{ % if % }` 구문을 활용하면 확인 가능하다