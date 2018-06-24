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


```html
<script>
    var request = new XMLHttpRequest();
        request.open('GET', '/data.html', false);
</script>
```


**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}   