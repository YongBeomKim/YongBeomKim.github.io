---
title : 파이썬 웹 프로그래밍 (실전편) 추가 - Auth 인증
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


# 파이썬 웹 프로그래밍 (실전편) 

<br/>
# **11장 인증기능** 

> **django.contrib.auth** 

**auth** 에서 기본제공 **Url 목록들**로 아래의 코드 중  `re_path(r'^accounts/', include('django.contrib.auth.urls'))` 에 의해서, `accounts/login/` 과 같이 주소의 앞 부분이 추가되어 활용한다

1. 'login/', **LoginView**, 'login'
2. 'logout/', **LogoutView**, 'logout'
3. 'password_change/', **PasswordChangeView**, 'password_change'
4. 'password_change/done/', **PasswordChangeDoneView**, 'password_change_done'
5. 'password_reset/', **PasswordResetView**, 'password_reset'
6. 'password_reset/done/', **PasswordResetDoneView**, 'password_reset_done'
7. 'reset/<uidb64>/<token>/', **PasswordResetConfirmView**, 'password_reset_confirm',
8. 'reset/done/', **PasswordResetCompleteView**, 'password_reset_complete',

장고에서 기본으로 제공하는 인증기능 모듈이다. 이를 사용하면 다양한 인증작업을 할 수 있다.[로그인/로그아웃](https://blog.hannal.com/2015/06/start_with_django_webframework_08/)


**User**

| User 필드   |  타입     |조건(초기값)|  설명        |
|:-----------:|:---------:|:----------:|:------------:|
| id          | integer   | pk         | 기본 키      |
| password    | CharField |            | 비밀번호     |
| username    | CharField | Unique     | 로그인 이름  |
| first_name  | CharField | Blank      | 이름         |
| last_name   | CharField | Blank      | 성           |
| email       | CharField | Blank      | 이메일       |
| is_superuser| Boolean   | False      | 관리자 여부  |
| is_staff    | Boolean   | False      | 스탭 여부    |
| is_active   | Boolean   | True       | 계정 활성화  |
| date_joined | DateTime  | .now       | 계정 생성시간|
| last_login  | DateTime  | null       | 마지막 로그인|


**auth**

**auth app** 은 위의 **User 테이블**, 이외에도 **Group, Permission** 테이블을 관리하고 있습니다. 이를 활용하여 사용자가 원하는 기능을 구현할 수 있습니다

[초코몽키 Auth 사용법](https://wayhome25.github.io/django/2017/05/18/django-auth/)

[초코몽키 Auth 회원가입](https://wayhome25.github.io/django/2017/03/01/django-99-my-first-project-2/)


<br/>
## **mysite/views.py**

**auth 인증에** 필요한 **model객체, 함수**들은 **기본제공** 하므로, **views.py**  에서 필요한 내용을 바로 작성한다.

```python
from django.views.generic.base import TemplateView
from django.views.generic.edit import CreateView
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy

class UserCreateView(CreateView):
    template_name = 'registration/register.html'
    form_class = UserCreationForm
    success_url = reverse_lazy('register_done') # 종료후 실행

class UserCreateDoneTV(TemplateView):
    template_name = 'registration/register_done.html'
```

`./registration` 등의 템플릿 경로는 **django 의 auth** 에서 기본 설정된 경로명으로 꼭 지켜야 한다
{: .notice--info} 


<br/>
## **mysite/urls.py**

사용자 인증을 위한 기본 경로들을 활용한다.

```python
from django.contrib.auth import urls
from .views import UserCreateView, UserCreateDoneTV

urlpatterns = [
    re_path(r'^accounts/', include('django.contrib.auth.urls')),
    re_path(r'^accounts/register/$', UserCreateView.as_view(), 
      name='register'),
    re_path(r'^accounts/register/done/$', UserCreateDoneTV.as_view(), 
      name='register_done'),
]
```

<br/>
## **Templates**

1. **registeration/login.html :** 로그인 화면을 디자인
2. **registeration/logged_out.html :** 로그아웃 성공화면 디자인
2. **registeration/register.html :** 새로운 사용자 계정을 생성
3. **registeration/register_done.html :** 가입 성공시 실행
4. **registeration/password_change_form.html :**
5. **registeration/password_change_done.html :** 

```html
# templates/registeration/login.html

<form method="post" action=".">{ % csrf_token % }

  { % if form.errors % }
  <p class="errornote">로그인 실패</p>{ % endif % }

  <p>사용자 추가</p>
  <fieldset class="aligned">
      { {form.username.label_tag} }{ {form.username} }
      { {form.password1.label_tag} }{ {form.password1} }
      { {form.password2.label_tag} }{ {form.password2} }
    </div>
  </fieldset>
  <div class="submit-row">   <!-- 등록버튼 --> 
    <input type="submit" value="Register" /> 
  </div>
</form>
```

**form.errors :** form 객체에서 발생한 오류를 호출하는 객체이다. 기타 사용자 등록 부분은 함수나 경로를 Django 에서 기본으로 제공하는 부분이 많으므로 이 부분을 주의깊게 고려하여 경로와 views.py 및 템플릿을 주의해서 작성해야 한다


