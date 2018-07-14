---
title : Django 에서 시간설정
last_modified_at: 2018-07-10T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - django
    - pytz
toc: true 
---

<br>
# pytz 

[참고한 블로그](https://jupiny.com/2016/10/05/model-datetimefield-in-korean/)

이번 게시물은 '카카오톡 플러스친구' 작업을 하면서, 시간설정을 한국으로 변경했음에도 계쏙 App에서 결과물이 국제 표준시로 계속 출력이 되는 문제로 인해서 수정방법을 찾다가 발견한 내용을 정리하는 게시물이다

결론만 언급하면 

**settings.py**

```python
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Seoul'
USE_TZ = False  
```

> When **USE_TZ is False**, Django will store all datetimes. When **USE_TZ is True**, Django will us in templates and in forms.
 
초기 설정값이 'USE_TZ = True' 로 되어있고 template 와 form 객체에만 미치고 정작 models.py views.py 에서는 국제 표준시를 하는 이유를 생각해 보면, 아마도 배포하여 대상은 국제의 누구라도 될 수 있으니까 다양한 국가의 사용자에게 특정한 시간대 강조는 장애가 된다고 생각해서 그런듯 하다 <small><strike>한국 사람들만 많이 모여도 소원이 없겠다 ㅜㅜ</strike></small>


```python
import json, pytz, datetime
tz  = pytz.timezone('Asia/Seoul')
now = datetime.datetime.now(tz)
nowtime = " {}시 {}분 {}초".format(now.hour , now.minute, now.second)
```

timezone을 특정해서 결과값을 출력할 필요가 있을 때에는 위의 함수를 사용했지만, 이는 개별 에서 필요한 요건마다 설정을 해야하는 번거로움이이 있으므로, 맨 위의 내용을 사용하여 전체적인 통일감을 주는게 여러면에서 장점이 있다.
{: .notice--info}

