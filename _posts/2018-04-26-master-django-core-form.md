---
title : Master Django  Form
last_modified_at: 2018-04-27T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
tags: 
    - django
    - pyton
toc: true    
---


## HttpResponse


### URL에 대한 정보객체 

```python
form django.http import HttpResponse

def hello(request):
    return HttpResponse("Hello world")
```


|  request.메서드         |  설명                   | 예제              |
|-------------------------|-------------------------|-------------------|
| request.path            | 도메인 제외한 경로명    | "/url/"           |
| request.get_host()      | 호스트(도메인 공통용어) | "127.0.0.0:8000"  | 
| request.get_full_path() | 경로와 쿼리 문자열      | "/url/?query=true"|
| request.is_secure()     | Https 요청여부 확인     | True/False        |


```python
def current_url_view_good(request):
    return HttpResponse("Url Address is {}".format(request.path))
```

[notice 다양한 옵션들](https://github.com/mmistakes/jekyll-theme-unit-test/blob/master/_posts/2010-02-05-post-notice.md)

**request :** url 결과값을 위해서 **하드코딩 대신**에 **유연한 코드**를 활용한다
{: .notice--info}


### request.META[] : 요청에 대한 기타정보

| request.META[] |  설명                 |
|----------------|-----------------------|
| HTTP_REPERER   | 참고 URL 존재시 출력  |
| HTTP_USER_AGENT | 웹 브라우저 정보     |
| REMOTE_ADDR    | 클라이언트의 IP주소   |

```python
def display_good(request):
    try:
        ua = request.META['HTTP_USER_AGENT']
    except KeyError:
        ua = 'unknown'
    return HttpResponse("Your browser is {}".format(ua))
```

**coding :** META 정보는 Key 값이 없을 수 있으므로, 예외문 안에 포함시켜 **코드의 안전성**을 높인다
{: .notice--info}


META 정보를 나열하여 출력한다

```python
    info = request.META.items()
    values = sorted(info)
    html = []
    for k, v in values:
        html.append('<tr><td> {}</td> <td>{}</td></tr>'.format(k, v))
```



## 간단한 폼-처리 예제


### 1. HTML 의 FORM 구문을 활용한 검색 페이지 만들기

```python
# urls.py
from django.urls import include
urlpatterns = [ re_path(r'^books/', include('books.urls', namespace="books")),]

# apps/urls.py
app_name='books'
urlpatterns = [
    re_path(r'^search-form/$', search_form, name='search'), #검색 form
    re_path(r'^search/$', search),]                         #결과출력
```

**urls.py :** django 2.0 이후에서는 app의 urls.py 에서 **app_name = '앱이름'** 을 앞에서 선언을 해야만 작동된다
{: .notice--danger}


```
# books/search_form.html

<form action="/books/search/"  method="get">
    <input type="text"   name="q">
    <input type="submit" value="Search">
</form>
```

**HTML 에서의 Form :** "text" 속성의 "q" 결과값을 "/books/search/" 에게 GET 방식으로 전달한다
{: .notice--info}

**GET & POST :** 행위가 데이터를 얻기 위함일 때에는 "GEt"방식을 사용하고, 외부 노출시 부작용이 생기는 작업에 한해서 "POST"로 변경한다
{: .notice--warning}



### 2. Django의 Query 매개변수를 활용한 검색폼 만들기







test 


**Primary Notice:**
{: .notice--primary}

**Info Notice:**
{: .notice--info}

**Warning Notice:**
{: .notice--warning}

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}