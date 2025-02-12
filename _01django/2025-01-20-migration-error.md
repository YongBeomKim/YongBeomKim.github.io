---
layout: blog
title: Django’s cache framework
tags:
- django
---

`Python3.12.8` 환경에서 `Django 5.1.6` 으로 작업을 진행하던 중 DataBase 연결작업에서 다음과 같은 오류가 종종 <strike>(실은 자주)</strike> 발생하였습니다
```bash
>>> ModuleNotFoundError: No module named 'django.db.migrations.migration'
```

이와 같은 경우에는 다음과 같이 강제로 `Django` 모듈을 새로 재설치 과정을 진행하면 해결 되었습니다.
```bash
pip install --upgrade --force-reinstall Django
```

# 참고사이트
- [ModuleNotFoundError: No module named 'django.db.migrations.migration'](https://goodlucknua.tistory.com/77)
  