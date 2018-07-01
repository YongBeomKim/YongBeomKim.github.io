---
title : Django Ajax JQuery
last_modified_at: 2018-06-24T10:45:06-05:00
header:
  overlay_image: /assets/images/book/ajax.png
categories:
  - js
tags: 
    - javascript
    - ajax
toc: true 
---



# JQuery 를 활용한 Ajax

<br>
## $.ajax() 기본 속성을 활용하자

**$.ajax :** &nbsp; **JQuery** 에서는 **Ajax**와 관련된 메소드를 제공한다

`$.ajax(url, option);` [JQuery 정식 Document](http://api.jquery.com/jquery.ajax/)

$ **.ajax** ( {<br>
&nbsp;&nbsp; **url** : `요청이 보내지는 곳`,<br>
&nbsp;&nbsp; **type** : get/post/put/delete `http요청 방식`<br> 
&nbsp;&nbsp; **success** : `http 성공시 동작함수`,<br>
&nbsp;&nbsp; **error** : `http 실패시 동작함수`,<br>
&nbsp;&nbsp; **complete** : `http 완료후 동작함수`,<br>
&nbsp;&nbsp; **data** : `서버 전달 값`,<br>
&nbsp;&nbsp; **dataType** : `data 타입`,<br>
&nbsp;&nbsp; **global** : true/false `전역함수`,<br>
&nbsp;&nbsp; **async** : true/false `동기여부`,<br> 
} ) ;


```html 
<script>
$(document).ready(function() {
    $.ajax({
        url: '/parameter',
        type: 'GET',
        data: {
            name: 'test',
            region: 'test'
        },
        success: function(data) {
            $('body').append(data);
        }
    } ) ; } ) ;
</script>
```


<br>
## $.getJSON() JSON 객체를 가져온다

```html
<script>
    $(document).ready(function () {
        $.getJSON('/data.json', function (data) {
            $.each(data, function (key, value) {
                $('body').append(
                    '<h1>'+value.name+':'+value.price+'</h1>');
            } ) ; } ) ; } ) ;
</script>
```


<br>
## GET, POST, PUT, DELETE 요청

**type** 유형에 'get', 'post', 'put', 'delete' 를 활용

```html
<script>
    $(document).ready(function () {
        $('#get').click(function () {
            $.ajax({
                url : '/products',
                type : 'get',
                dataType : 'text',
                success : function (data) {
                    $('#output').val(data);
                }
            } ) ; } ) ;
</script>
```


<br>
## $.param() : 쿼리 문자열 생성

`name:RintIanTta&region=Seoul` 을 출력한다

```html
<script>
    $(document).ready(function () {
        // 변수를 선언
        var data = {
            name : 'RintIanTta',
            region : 'Seoul', } ;
        // 출력
        $('<h1></h1>').text($.param(data)).appendTo('body');
    } ) ;
</script>
```