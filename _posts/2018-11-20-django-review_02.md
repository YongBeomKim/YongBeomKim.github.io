---
title : 파이썬 웹 프로그래밍 중편 (북마크, 블로그)
last_modified_at: 2018-11-20T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - django
    - python
toc: true 
---


# 파이썬 웹 프로그래밍 (실전편)

상편에서 정리한 내용을 간단히 살펴보면..

1. **url을** 다루는 **slug, pk** 객체를 정규식의 활용 
2. **model 의 method 들**
3. **Generic View**에서 지원하는 **템플릿 메소드**
4. 템플릿의 **JSX `{ % % }` 함수를** 활용하는 방법들을 살펴보았다.

<figure class="align-center">
  <img src="https://4.bp.blogspot.com/-2a5Ix9fUu6o/WI0SiFp2gTI/AAAAAAAAA1o/pLAy3c2oKtI6GH0GW9o0fXwK2rHh_blTgCLcB/s1600/1.jpg" alt="" align="center">
  <figcaption></figcaption>
</figure> 

<br/>
# **Tagging**


## tagging App 설치 및 활성화

> pip install **django-tagging**

```python
# settings.py
INSTALLED_APPS = [
    'tagging.apps.TaggingConfig',
]
```

터미널에서 **`$ django-admin startapp tagging`** 을 실행하면 오류가 발생한다. 따라서 별도의 App 설치없이 `settings.py` 에서 위와 같이 설정만 연결하면 된다. 대신 `models.py` 는 **tag 기능을 추가하고 싶은 App의 models.py**에 추가를 하면 자동으로 Tagging App이 연결된다
{: .notice--info}

## blog/models.py

```python
from tagging.fields import TagField

class Post(models.Model):
    tag = TagField()
```

admin에서 살펴보면 **TAGGING** 테이블이 blog가 아닌 **별도의 Table로** 생성됨을 알 수 있다. 즉 DataBase 테이블은 **별도의 App의 테이블로** 관리된다 
