---
title : django 배포하기
last_modified_at: 2018-05-08T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - django
    - pyton
toc: true    
---

# 서비스 배포를 위한 강력한 서버와 연결하기

## SECREAT KEY 분리하기


### 환경 변수파일에 저장하기

nano를 사용하여 .zshrc 파일을 편집 후 활용 

```
$ nano ~/.zshrc 
    # .zshrc 파일에 아래 코드를 추가해준다.
    export INSTA_SECRET_KEY='b_4(!id8ro!1645n@ub55555hbu93gaia0 

$ echo $INSTA_SECRET_KEY    # 환경변수 확인 명령
```

`settings.py` 파일을 열어서 SECRET_KEY 의 값을 삭제하고 환경변수로 대체한다

```python
import os
SECRET_KEY = os.environ["INSTA_SECRET_KEY"]
```



### 외부 파일로부터 불러온다 


**ListView의 Template:**
{: .notice--info}

**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}  