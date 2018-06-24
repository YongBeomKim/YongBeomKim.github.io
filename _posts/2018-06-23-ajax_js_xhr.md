---
title : Ajax XHR
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


<br>
# XML Http Request

XMLHttpRequest 는 **xhr** 로써, Javascript 가 Ajax를 사용하는 객체로, 빈 편지지와 같게 보면 된다. XMLHttpRequest 객체의 **open()** 메소드로 전송위치와 방식을 지정한다


<br>
## XML Http Request

<small>xhl 객체를 생성</small>

```html
<script>
    // XMLHttpRequest 객체를 생성
    var request = new XMLHttpRequest();
    request.open('GET', '/data.html', false);

    // Ajax를 수행
    request.send();

    // 결과출력
    document.body.innerHTML += request.responseText;
</script>
```


<br>
## **.readyState**

<small>**request.readyState : ** xhr 프로젝트 속성 결과</small>

<figure>
    <img src="https://i.stack.imgur.com/HVIcv.png">
</figure>

```html
<script>
    // XMLHttpRequest 객체를 생성하는 함수
    function createRequest() {
        try { return new XMLHttpRequest();
        } catch (exception) {
            var versions = [
                'Msxml2.XMLHTTP.6.0',
                'Msxml2.XMLHTTP',
                'Microsoft.XMLHttp'];
            for (var i = 0; i < versions.length; i++) {
                try { return new ActiveXObject(versions[i]);
                } catch (e) { } } } }

    // XMLHttpRequest 객체생성 및 출력
    var request = createRequest();
    request.onreadystatechange = function (event) {
        alert(request.readyState); };
    request.open('GET', '/data.html', true);
    request.send();
</script>
```

<br>
## **.responseText**

<figure>
    <img src="https://tzamtzis.gr/tzamtziswp/wp-content/uploads/2017/07/http_status_codes-cheatsheet.jpg">
</figure>

```html
<script>
    // XMLHttpRequest 객체를 생성
    function createRequest() {
        try { return new XMLHttpRequest();
        } catch (exception) {
            var versions = [
                'Msxml2.XMLHTTP.6.0',
                'Microsoft.XMLHttp' ];
            for (var i = 0; i < versions.length; i++) {
                try { return new ActiveXObject(versions[i]);
                } catch (e) { } } } }

    // XMLHttpRequest 객체를 생성
    var request = createRequest();
    request.onreadystatechange = function (event) {
        if (request.readyState == 4) {
            if (request.status == 200) {
                document.body.innerHTML += request.responseText;
            }; }; };
    request.open('GET', '/data.html', true);
    request.send();
</script>
```