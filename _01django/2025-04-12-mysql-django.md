---
layout: blog
title: Django 에서 MySQL 연결하기
tags:
- mysql
---

[PyMySQL](https://github.com/PyMySQL) 관리도구에는 [mysqlclient](https://github.com/PyMySQL/mysqlclient) 과 [PyMySQL](https://github.com/PyMySQL/PyMySQL) 두가지가 있습니다. 이들을 비교해 보면 다음과 같습니다.

| 항목 | mysqlclient             | PyMySQL     |
|-----|-------------------------|-------------|
| 언어 | C로 작성된 Native 확장 모듈 | 순수 Python  |
| 성능 | 빠름 (C로 컴파일된 드라이버) | 느림  |
| 설치 난이도 | 어려움 (MySQL dev 필요) | 쉬움 (pip 끝) |
| 호환성 | Django 공식 | pymysql.install_as_MySQLdb() 추가필요 |
| 유지보수 | 활발 (MySQLdb 기반) | 비교적 활발, MySQL 최신 버전과도 잘 작동 |
| 에러 메시지 | 비교적 친숙하지 않음 (C 확장) | 	Python 방식이므로 쉬움 |
| 용도|	성능 중요 | 설치 간편성 |

이를 정리하면 다음과 같습니다.
> mysqlclient 를 추천하는 경우:
1. 운영 서버 또는 성능이 중요한 서비스
1. Docker 이미지 내에서 빌드 문제가 없도록 세팅 가능
1. 이미 libmysqlclient 관련 패키지가 설치되어 있는 환경

> PyMySQL 를 추천하는 경우:
1.복잡한 설치 없이 빠르게 연결하고 싶을 때
1. 서버에 컴파일러 설치가 어려운 경우

<br/>

# PyMySQL 을 활용하는 경우
django 의 project의 `__init__.py` 파일에 다음의 내용을 추가하면 됩니다.
```python
import pymysql
pymysql.install_as_MySQLdb()
```

<br/>

# 마무리
docker 에서 `mysqlclient` 를 설치하는 방법은 [우분투 에서 uv 활용하기](https://yongbeomkim.github.io/python/uv-python) 에서 이미 정리했습니다. 이를 참고하여 `mysqlclient` 를 활용하는 것을 최 우선적으로 적용하고, 차선책으로 시도해볼만한 내용이 되겠습니다.

<br/>

# 참고사이트
- [PyMySQL to Connect a Django](https://medium.com/@lebe_93/using-pymysql-to-connect-to-a-django-project-to-a-mysql-database-77bd5dade213)
