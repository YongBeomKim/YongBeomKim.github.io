---
title : Django Ajax by jQuery
last_modified_at: 2018-06-23T13:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - jquery
    - django
toc: true 
---


# Django Ajax

1. 맨 처음 `settings.py` 설정을 익히고
2. `json` 객체로 Python 에서 JavaScript 로 전달을 익히고
3. 이번에 **Refresh** 없이도 객체를 변경가능한 **Ajax**를 익혀보자

참고로 Ajax 를 익히는건 이번이 처음이다. [django Ajax 참고사이트](https://www.sourcecodester.com/tutorials/python/11762/python-django-simple-crud-ajax.html)


<br>
## App 추가하기 (ajax 를 구현할 앱을 설정한다)

1. `$ python manage.py startapp ajax` **_terminal_**
2. `ajax.apps.AjaxConfig` : **_settings.py_**
3. `re_path('r^ajax/', include('ajax.urls', namespace='ajax'))` : **_urls.py_**


<br>
## models.py

<small>대상 모델을 정의한다</small>

```python
from django.db import models

class Member(models.Model):
    firstname = models.CharField(max_length=40)
    lastname  = models.CharField(max_length=40)

    def __str__(self):
        return self.firstname + " " + self.lastname
```


<br>
## views.py

<small>**index** 및 **CRUD**에 대응하는 함수들을 정의한다</small>

```python
from django.shortcuts import render, redirect
from .models import Member

# 기본 page 를 render()
def index(request):
    return render(request, 'crud/index.html')

# DB 내용을 출력하는 render()
# jQuery의 Read()를 실행
def read(request):
    members = Member.objects.all()
    context = {'members': members}
    return render(request, 'crud/result.html', context)

# DB 를 수정하는 render()
# .edit 객체를 누를 때 jQuery 실행
def edit(request, id):
    members = Member.objects.get(id=id)
    context = {'member': members}
    return render(request, 'crud/edit.html', context)

# #create 객체를 누를 떄 jQuery 실행 
def create(request):
    member = Member(firstname= request.POST['firstname'],\
                    lastname = request.POST['lastname'])
    member.save()
    return redirect("crud:index")

# #update 객체를 누를 떄 jQuery 실행 
def update(request, id):
    member = Member.objects.get(id=id)
    member.firstname = request.POST['firstname']
    member.lastname  = request.POST['lastname']
    member.save()
    return redirect("crud:index")

# .delete 객체를 누를 때 jQuery 실행
def delete(request, id):
    member = Member.objects.get(id=id)
    member.delete()
    return redirect("crud:index")
```

**template** 은 index.html,  edit.html,  result.html 3개를 사용한다 <small> **render()**를 통해서 반영
{: .notice--info}


**CRUD** 다른 책이나 내용을 살펴보면 **RestAPI** 를 활용하여 CRUD를 제어하고, 이를 back-hand 에서 Vue.js 등의 모듈을 사용해서 받는 방법으로 구현하는 경우도 많이 볼 수 있다 <small>우선은 Python을 중점적으로 정리하면서 기능들을 덧붙여 나아가자</small>
{: .notice--info}


<br>
## urls.py

<small>**index** 및 **CRUD**에 대응하는 함수들을 정의한다</small>

```python
from django.urls import re_path
from . import views

app_name="crud"
urlpatterns = [
    re_path(r'^$',                        views.index,  name='index'),
    re_path(r'^read$',                    views.read,   name='read'),
    re_path(r'^create$',                  views.create, name='create'),
    re_path(r'^edit/(?P<id>\d+)$',        views.edit,   name='edit'),
    re_path(r'^edit/update/(?P<id>\d+)$', views.update, name='update'),
    re_path(r'^delete/(?P<id>\d+)$',      views.delete, name='delete'),
]
```


<br>
## Ajax JavaScript 작성하기

`window.location.replace()` <small>는 다른페이지로 이동하는 **JavaScript** 함수이다 [출처](http://dailydev.tistory.com/13)

```javascript
$(document).ready(function(){
    if($('#result') != null){ Read();}

    $('#create').on('click', function(){
        $firstname = $('#firstname').val();
        $lastname  = $('#lastname').val();
        if($firstname == "" || $lastname == ""){
            alert("Please complete the required field");
        }else{
            $.ajax({
                url  : 'create',
                type : 'POST',
                data : {
                    firstname : $firstname,
                    lastname  : $lastname,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val() },
                success : function(){
                    Read();
                    $('#firstname').val('');
                    $('#lastname').val('');
        } }); } });

    $(document).on('click', '.edit', function(){
        $id = $(this).attr('name');
        window.location = "edit/" + $id; });

    $('#update').on('click', function(){
        $firstname = $('#firstname').val();
        $lastname  = $('#lastname').val();
        if($firstname == "" || $lastname == ""){
            alert("Please complete the required field");
        }else{
            $id = $('#member_id').val();
            $.ajax({
                url  : 'update/' + $id,
                type : 'POST',
                data : {
                    firstname : $firstname,
                    lastname  : $lastname,
                    csrfmiddlewaretoken : $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function(){
                    window.location = '/';
                    alert('Updated!'); }
            }); } });

    $(document).on('click', '.delete', function(){
        $id = $(this).attr('name');
        $.ajax({
            url  : 'delete/' + $id,
            type : 'POST',
            data : {
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            }, success: function(){ Read(); alert("Deleted!");} }); }); });

function Read(){
    $.ajax({
        url     : 'read',
        type    : 'POST',
        async   :  false,
        data    : { res : 1,
            csrfmiddlewaretoken : $('input[name=csrfmiddlewaretoken]').val()},
        success : function(response){
            $('#result').html(response);} }); }
```

**`async : false`** Read() 함수의 **동기화 설정**을 하면 **FireFox**에서는 
`메인 쓰레드 XMLHttpRequest 더이상 사용하지 않습니다` 오류가 발생한다. 새로운 Jquery 에서는 `Prmoiss` 객체를 `Deffered`를 활용한다 [Promiss 를 위한 Deferred 설명](https://poiemaweb.com/jquery-deferred) | [Onky](https://okky.kr/article/301029?note=1000882) | [Deferred 설명](https://www.html5rocks.com/ko/tutorials/async/deferred/) | [Prmoiss객체](http://uwostudy.tistory.com/54)
{: .notice--info}

**동기식 처리시 발생하는 오류**로, 우선은 **비동기식**으로 django를 완성한 뒤 차후에 수정 보완해 나아가면 되는 부분으로 보인다.
{: .notice--info}