---
layout: blog
title: (MySQL) MariaDB with Django - Size Check
tags:
- mysql
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

아래의 스크립트는 `root` 계정으로 접속하는 방법 입니다.
```bash
$ sudo mariadb -u root -p
$ sudo mycli -u root -h localhost mysql  # https://django-mysql.readthedocs.io/en/latest/cache.html
```

새로운 사용자와 데이터베이스를 생성하고, 추가한 사용자에게 생성한 데이터베이스 권한을 추가하는 내용 입니다.
```sql
mysql> CREATE DATABASE <테이블이름>;
mysql> CREATE DATABASE <테이블이름> DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

mysql> CREATE USER '<사용자이름>'@'localhost' IDENTIFIED BY '<비밀번호>';
mysql> GRANT ALL PRIVILEGES ON <테이블이름>.*  to  '<사용자이름>'@'localhost';
mysql> SHOW GRANTS FOR '<사용자이름>'@'localhost';
mysql> FLUSH PRIVILEGES;
```

[데이터베이스별 / 테이블별 용량 확인 하기](https://info-lab.tistory.com/296) 를 하려면 다음의 쿼리를 입력하면 됩니다.
```sql
SELECT 
	table_schema AS DBMS,
	CONCAT((SUM(data_length + index_length) / 1024 / 1024)," MB") AS "Size"
FROM
	information_schema.TABLES
GROUP BY 
	table_schema;

+--------------------+-----------------+
| DBMS               | Size            |
+--------------------+-----------------+
| information_schema | 0.20312500 MB   |
| services           | 925.45312500 MB |
| mysql              | 10.82812500 MB  |
| performance_schema | 0.00000000 MB   |
| sys                | 0.03125000 MB   |
+--------------------+-----------------+
```

다음의 내용으로도 동일한 내용을 확인할 수 있습니다.
```sql
SELECT table_schema AS "Database", 
ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS "Size (MB)" 
FROM information_schema.TABLES 
GROUP BY table_schema;
```

해당 데이터베이스의 개별 테이블 단위 크기를 확인하는 방법은 다음과 같습니다.
```sql
SELECT table_name AS "Table",
ROUND(((data_length + index_length) / 1024 / 1024), 2) AS "Size (MB)"
FROM information_schema.TABLES
WHERE table_schema = "<데이터베이스 이름>"
ORDER BY (data_length + index_length) DESC;

+----------------------------------+-----------+
| Table                            | Size (MB) |
+----------------------------------+-----------+
| app_market_krxpriceohlc          | 530.77    |
| app_market_krxloan               | 389.56    |
| app_news_navercontent            | 1.53      |
+----------------------------------+-----------+
```

## Django 와 연결하기

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
        'OPTIONS': {
            'charset':'utf8mb4',
            'compress': True,
        }   
    }
}
```

한글과 같은 문자를 활용하는 경우에는 `utf-8` 포맷의 DataBase 에서는 오류가 발생합니다. 즉 위의 `charset':'utf8mb4` 설정값 없이 작업을 진행하면 다음과 같은 오류 메세지를 발생 합니다. 

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

`compress: True,` 설정은 [How can I use a compressed connection between Django and MySQL?](https://stackoverflow.com/questions/14909565/how-can-i-use-a-compressed-connection-between-django-and-mysql) 의 설정값을 활용한 것으로 응용한 결과, 압축을 하기 이전과 상당히 큰 데이터 크기 차이가 발생 했습니다. 이것은 테이블 생성시  `ROW_FORMAT=COMPRESSED` 옵션을 추가해주는 설정으로 `MySQL 8` 이후 버젼부터는 안정적으로 잘 작동합니다.


보다 자세한 내용은 [이것이 MySQL 이다](https://books.google.co.kr/books?id=17MCEAAAQBAJ&pg=PA337&dq=ROW_FORMAT%3DCOMPRESSED&hl=ko&sa=X&ved=2ahUKEwiTzLOLn8H8AhUEs1YBHVG9DwcQ6AF6BAgFEAI#v=onepage&q=ROW_FORMAT%3DCOMPRESSED&f=false) 등의 내용을 참고하면, 테이블 압축 기능을 지원하는 방법으로 다음과 같습니다.

```sql
CREATE DATABASE IF NOT EXISTS compressDB;
USE compressDB;
CREATE TABLE compressTBL (emp_no int, first_name VARCHAR(14))
    ROW_FORMAT=COMPRESSED ;
```

<br/>

# 추가정보

## (2023-01-09) DataError : Out of range value for column `컬럼명`
[MySQL](https://install-django.tistory.com/21) 에서 발생하는 오류 메세지로, 데이터 타입이 Django 모델 설정과 다를 때 발생하는 오류 입니다. 이번에는 `IntegerField()` 에서 발생 하는데, 자체적인 해결 방법은 `integer` 로 입력할 데이터 타입이 `int64` 로 설정된 내용을, `int32` 로 변환 후 `Migration` 작업을 진행 하는 방법으로 해결 했습니다..

```python
import numpy
df['column'] = df['column'].astype(numpy.int32)
```

## (2023-01-12) ID 숫자 초기화 하기

 `delete()` 메서드로 삭제 후, 새로 데이터를 입력하면, 기존의 ID 마지막 숫자에서 부터 작업을 시작 합니다. 새로운 1번부터 인데스를 시작하려면 [초기화 설정](https://velog.io/@sjy5386/SQL-AUTOINCREMENT-%EA%B0%92-%EC%B4%88%EA%B8%B0%ED%99%94%EC%9E%AC%EC%A0%95%EB%A0%AC) 을 해야 합니다.

```sql
ALTER TABLE `테이블_이름` AUTO_INCREMENT = 1;
```

## InnoDB

[MySQL InnoDB 테이블의 압축 조정](http://www.innodbcluster.com/?depth=140703) 및 [영문 원본 사이트](https://dev.mysql.com/doc/refman/5.6/en/innodb-compression.html) 등을 참고하면, 데이터 압축과 관련하여 `InnoDB` 의 [설정값](https://estenpark.tistory.com/377) 을 통해서 [구현](https://myinfrabox.tistory.com/58) 할 수 있다. 

[Django Project](https://docs.djangoproject.com/en/4.1/ref/databases/) 문서에서도 [Django 의 설정](https://stackoverflow.com/questions/12165534/how-can-i-specify-multiple-init-commands-in-djangos-setup-file) 을 통해서 이를 조정할 수 있는데, 우선은 이 부분은 직접 MariaDB 콘솔을 활용하여 설정 및 확인등을 하는 과정을 통해 테스트를 하고, 기본 서비스는 우선 현재 설정내용으로 진행을 하자.

## [Django RAW SQL](https://docs.djangoproject.com/en/4.1/topics/db/sql/)

`READ` 명령을 사용할 때에는 [Performing raw SQL queries](https://docs.djangoproject.com/en/4.1/topics/db/sql/#performing-raw-queries) 의 내용은 데이터를 참조할 때 사용합니다.

```python
for p in Person.objects.raw('SELECT * FROM myapp_person'):
    print(p)
```

`CREATE`,`UPDATE`,`DELETE` 내용은 [Executing custom SQL directly](https://docs.djangoproject.com/en/4.1/topics/db/sql/#executing-custom-sql-directly) 를 참고하여 다음의 명령을 사용하면 됩니다.  `ALTER TABLE market_krxpriceohlc AUTO_INCREMENT = 1` 와 같이 속성을 변경하는 명령을 사용할 수 있습니다.

```python
from django.db import connection
with connection.cursor() as cursor:
    cursor.execute("ALTER TABLE market_krxpriceohlc AUTO_INCREMENT = 1")
    # row = cursor.fetchone()
```

# 참고 사이트
- [Django MySQL](https://django-mysql.readthedocs.io/en/latest/cache.html)
- [Django에 MySQL 연동하기](https://daphne-dev.github.io/2020/10/01/django-mysql/)
- [MariaDB 초기 접속암호 분실시](https://funfunit.tistory.com/104)
- [리눅스 mysql,mariadb 한글 깨짐 현상 해결 방법](https://heum-story.tistory.com/34)
- [How to check MySQL database and table sizes](https://www.a2hosting.com/kb/developer-corner/mysql/determining-the-size-of-mysql-databases-and-tables/)
