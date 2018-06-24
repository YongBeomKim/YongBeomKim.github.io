---
title : Django Ajax
last_modified_at: 2018-06-23T13:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - json
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
## App 추가하기 (ajax 를 구현할 앱을 설정한다)



## Ajax JavaScript 작성하기

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

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}   