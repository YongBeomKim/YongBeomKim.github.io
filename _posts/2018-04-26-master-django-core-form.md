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

```python
form django.http import HttpResponse

def hello(request):
    return HttpResponse("Hello world")


```


**admin url:** `http://localhost:8000/admin/auth/user/1/history/` admin 수정이력을 확인 가능하다  
{: .notice--info}
