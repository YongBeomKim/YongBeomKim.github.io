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

**request :** url 결과값을 위해서 **하드코딩 대신**에 **유연한 코드**를 활용한다
{: .notice--info}


### 요청에 대한 기타정보

```python
def display_good(request):
    try:
        ua = request.META['HTTP_USER_AGENT']
    except KeyError:
        ua = 'unknown'
    return HttpResponse("Your browser is {}".format(ua))
```


