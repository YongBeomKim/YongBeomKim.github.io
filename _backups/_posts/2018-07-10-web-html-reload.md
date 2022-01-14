---
title : Web 에서의 reload (새로고침)
last_modified_at: 2018-07-10T12:45:06-05:00
header:
  overlay_image: /assets/images/book/web.jpg
categories:
  - html
tags: 
    - html
    - javascript
toc: true 
---

<br>
# reload 

Web 은, 사용자의 **request** 에 응답하는 **response** 를 화면에 출력한다. 하지만 단순한 게시물만이 아닌, 사용자와 상호작용하는 다양한 기능을 추가하다 보면 단순한 결과만이 아닌 **정기적/ 비정기적 새로고침**을 통해서 페이지를 살아숨쉬게 만들 수 있다

이를 보완하기 위해서 Django 에서 작업하기 보단, 사용자의 조작에 의존하는 방식이 1)서버의 부담을 줄여주고 2)사용자 반응에도 직접적이여서 더 효과적인 성능개선이 체감될 수 있어서 정리해본 결과, Javascript, Jquery, HTML 내용이 가장 결과가 좋았다 [가장 잘 정리된 블로그](https://www.thewordcracker.com/jquery-examples/refresh-current-page-using-javascript/)

<br>
## **HTML**

<small>페이지 전체를 새로고침 한다. 무거울 때에는 비효율 적이지만 간단한 페이지 같은 경우에는 쉽게 접근 가능하다</small>

```html
<META HTTP-EQUIV="refresh" CONTENT="15">
```

```python
def ask(request):
    read_txt = open("./question.txt",'r').read()
    content  = """<html><head>
        <META HTTP-EQUIV='refresh' CONTENT='5'>
        <body>""" + read_txt + "</body>"
        return HttpResponse(content)
```

<br>
## jQuery

<small>e-chart 등 모듈의 결과물이 **페이지 크기를 변화**시키면 크기가 변하지 않아서 전체가 일그러지는 문제가 발생했다. 아래의 코드는 사용자가 페이지 크기를 변화시킬 때 자동으로 갱신을 한다</small>

```javascript
window.onresize = function() {
    document.location.reload();
};
```
