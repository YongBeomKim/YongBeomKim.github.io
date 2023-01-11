---
layout: blog
title: MariaDB for Django
tags:
- django
- mariadb
---

앞선 과정을 모두 마쳤으면 `MariaDB` 에서 정상적인 작업들이 가능할 것입니다. 이제부터 `Django` 와 연결과 관련한 내용들을 정리해 보겠습니다.


<br />

# [Django 와 Maria DB (MySQL) 연동하기](https://daphne-dev.github.io/2020/10/01/django-mysql/)

## **패키지 설치하기**

```r
$ pip install mysqlclient
$ pip install django-mysql (선택)
```

## **Maria DB (MySQL) 실행**

아래의 스크립트는 `root` 계정으로 접속한 뒤, 새로운 사용자와 데이터베이스를 생성하고, 추가한 사용자에게 생성한 데이터베이스 권한을 추가하는 내용 입니다.

```r
$ sudo mariadb -u root -p
$ sudo mycli -u root -h localhost mysql  # https://django-mysql.readthedocs.io/en/latest/cache.html
```
```sql
mysql> CREATE DATABASE <테이블이름>;
mysql> CREATE USER '<사용자이름>'@'localhost' IDENTIFIED BY '<비밀번호>';
mysql> GRANT ALL PRIVILEGES ON <테이블이름>.*  to  '<사용자이름>'@'localhost';
mysql> SHOW GRANTS FOR '<사용자이름>'@'localhost';
mysql> FLUSH PRIVILEGES;
```

## Django 에서 언결하기

`settings.py` 설정 파일에서 앞선 설정 내용을 바탕으로 입력을 한 뒤 `migration` 을 실행하면 됩니다.

```r
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', # 사용할 DB의 종류
        'NAME': 'DB 이름',
        'USER': 'DB 계정 이름',
        'PASSWORD': 'DB 계정의 패스워드',
        'HOST': '접속 IP',
        'PORT': '포트 번호(3306)',
    }
}
```

실행을 하면 다음과 같은 메세지를 출력하는 경우가 있습니다. 한글과 같은 문자를 활용하는 경우에는 `utf-8` 포맷은 오류를 발생하기 때문 입니다. 

```r
WARNINGS:
?: (django_mysql.W003) The character set is not utf8mb4 for database connection 'default'
        HINT: 'utf8' character set does not include support for all Unicode characters.
        It is strongly recommended you move to use 'utf8mb4'. 
        See: https://django-mysql.readthedocs.io/en/latest/checks.html#django-mysql-w003-utf8mb4
```

앞의 `한글설정 및 포트값 추가` 부분을 완료하면 기본값이 `utf8mb4` 로 적용됩니다. 그럼에도 위의 경고 메세지가 출력되는 경우에는, `createsuperuser` 등으로 한글을 입력한뒤 정상적으로 처리되는지 또는, DB에 접속해서 default 타입 내용을 확인하면 됩니다.

```sql
mysql> SHOW CREATE DATABASE newsite;
+------------------------------------------------------------------------+
| Database | Create Database                                             |
+------------------------------------------------------------------------+
| <DB이름>  | DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ |
+------------------------------------------------------------------------+
```

<br/>

# 추가정보

## (2023-01-09) DataError : Out of range value for column `컬럼명`
[MySQL](https://install-django.tistory.com/21) 에서 발생하는 오류 메세지로, 데이터 타입이 Django 모델 설정과 다를 때 발생하는 오류 입니다. 이번에는 `IntegerField()` 에서 발생 하는데, 자체적인 해결 방법은 `integer` 로 입력할 데이터 타입이 `int64` 로 설정된 내용을, `int32` 로 변환 후 `Migration` 작업을 진행 하는 방법으로 해결 했습니다..

```python
import numpy
df['column'] = df['column'].astype(numpy.int32)
```


# 참고 사이트
- [Django MySQL](https://django-mysql.readthedocs.io/en/latest/cache.html)
- [Django에 MySQL 연동하기](https://daphne-dev.github.io/2020/10/01/django-mysql/)
- [MariaDB 초기 접속암호 분실시](https://funfunit.tistory.com/104)
- [리눅스 mysql,mariadb 한글 깨짐 현상 해결 방법](https://heum-story.tistory.com/34)
