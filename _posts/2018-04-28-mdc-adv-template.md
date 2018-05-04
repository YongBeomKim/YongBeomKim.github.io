---
title : Django MDC - 고급 Template
last_modified_at: 2018-04-28T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - django
    - pyton
toc: true    
---


# Mastering Django Core

## Context 를 출력하는 Process

```python
from django.template import loader, Context

def view(request):
    t = loader.get_template('template.html')
    c = Context({'app' : 'my app',
                'user' : request.user, })
    return t.render(c)
```

**Context** : 여러개의 **node**를 담은 **compile 객체**<br>
**render()** : **compile 객체**를 **Template 에 render** 함수로 django에서 가장하안정적인 방식이다
{: .notice--warning} 

<br><br>
## 기본적인 context_processors 객체 

```
'context_processor' : [
    'django.template.context_processors.debug',
    'django.template.context_processors.request',
    'django.contrib.auth.context_processors.auth',
    'django.contrib.message.context_processors.messages',
    ]
```

개별 context 가 위의 내용을 하나씩 점검하고 그럼에도 빠르게 처리를 한다 
{: .notice--warning} 

### auth 의 변수들
1. **auth.User** : 현재 로그인 사용자
2. **auth.perms** : 현재 로그인 사용자 권한

### debug 의 변수들
1. **debug-True** : 디버그 모드를 test
2. **sql_queries** : 요청시 발생한 보든 SQL 쿼리와 소요시간을 {'sql': , 'time': } 딕셔너리 목록으로 생성한다


## 자동 HTML 빠져나가기 

HTML 객체를 django가 생성시, 의도치 않은 Html변수가 포함되어 tag 를 빠져나가는 **Cross Site Scripting(XSS)** 문제를 방지할 필요가 있다

1. '<', '>', ', ", & 의 5개 문자는 빠져나가기 처리가 된다
2. Template 에서는 이를 대체하는 별도의 기호들을 정의한다
    1. < : &lt;
    2. > : &gt;
    3. ' : '
    4. " : &quot;
    5. & : &amp;



**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success} 