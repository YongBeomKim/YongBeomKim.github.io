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
## 동기 비동기 방식

<small>xhl 객체를 생성</small>


```html
<script>
    // XMLHttpRequest 객체를 생성
    function createRequest() {
        try {
            return new XMLHttpRequest();
        } catch (exception) {
            var vers = [
                'Msxml2.XMLHTTP.6.0',
                'Msxml2.XMLHTTP.5.0',
                'Msxml2.XMLHTTP.4.0',
                'Msxml2.XMLHTTP.3.0',
                'Msxml2.XMLHTTP',
                'Microsoft.XMLHttp'];
            for (var i = 0; i < vers.length; i++) {
                try {
                    return new ActiveXObject(vers[i]);
                } catch (e) { } } } }

    // XMLHttpRequest 객체를 생성
    var request = createRequest();
        request.open('GET', '/data.html', false);

    // send() 메서드 시간 측정
    var prevDate = new Date();
        request.send();

    var nowDate = new Date();

    // 결과출력
    alert(nowDate - prevDate);
</script>
```




**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}   