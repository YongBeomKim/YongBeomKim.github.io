---
title : Tutorial / django-widget-tweaks
last_modified_at: 2018-12-05T10:45:06-05:00
header:
  overlay_image: /assets/images/book/django-girls.jpg
categories:
  - django
tags: 
    - django
    - python
toc: true 
---


[simple is the better than complex](https://simpleisbetterthancomplex.com/tutorial/2016/11/28/how-to-filter-querysets-dynamically.html) 여기에서 예제를 따라하면서 알게되었습니다. 처음에는 왜 이리 귀찮은 모듈을 또 깔아야 하나 했지만 [github](https://github.com/jazzband/django-widget-tweaks)에 가보니 용량도 작고, 추천도 많아서 호기심이 생겼습니다.

Tweak the form field **rendering in templates, CSS classes and HTML attributes is supported.** 안그래도 django-table2 등 다양한 모듈을 사용하다보면 해당 모듈에서 1차 랜더링을 하고 사용자 임의로 추가하고 싶은 내용을 덧붙이는 방식으로 2번 3번의 불필요한 반복을 필요로 하는데, 여기서 소개하는 트윅을 통해서 모든 내용을 정리한다면 불필요한 랜더링을 줄일 수 있어서 필요한 모듈중 하나로 생각되었습니다 <small><strike>**이렇게 또 익혀야 할 내용이 늘어나는 구나.. 잘 정리를 하면 깔끔하게 재활용 가능하니까 첫째도, 둘째도 정리다!!**</strike></small>


# Install 

> **$ pip install django-widget-tweaks**

```python
# settings.py
INSTALLED_APPS = [
    'widget_tweaks',
]
```


$ pip install django-widget-tweaks


https://visualstudiomagazine.com/articles/2012/01/01/~/media/ECG/visualstudiomagazine/Images/2012/01/0112vsm_LLUICodeExpertFig1_hires.ashx








