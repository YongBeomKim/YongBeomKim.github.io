---
layout: blog
title: (MariaDB) InnoDB 01 - Row Format
tags:
- django
---

Django 에서 MariaDB 10.6 을 연결하여 프로젝트를 진행하고 있습니다. `CSV`로 저장한 `139.5 Mb` 파일을 DataBase 에 저장을 하면서 성능을 비교해 보도록 하겠습니다.

# MariaDB InnoDB 압축
## <span style="color:olive">**COMPRESSED 행**</span> vs <span style="color:darkorange">**테이블 페이지**</span> 형식
InnoDB 에서 <span style="color:olive">**COMPRESSED 행 형식**</span>과 <span span style="color:darkorange">**테이블 페이지**</span> 압축 중 <span span style="color:darkorange">**테이블 페이지**</span> 압축 방법이 더 향상된 기술 입니다.

InnoDB 에서 <span span style="color:darkorange">**페이지 압축**</span>은 압축된 페이지를 <span span style="color:crimson">**테이블스페이스 파일**</span> 에서 읽은 후 즉시 압축이 풀리고, <span span style="color:crimson">**압축 해제된 페이지**</span>만 버퍼 풀에 저장됩니다. 반면 <span style="color:olive">**COMPRESSED 행 형식**</span>은 압축된 페이지를 <span span style="color:crimson">**테이블스페이스 파일**</span> 에서 읽은 후 즉시 압축이 풀리고, <span span style="color:crimson">**압축 해제된 페이지와 압축된 페이지 모두**</span>가 버퍼 풀에 저장을 하기 위해서 더 많은 공간을 사용합니다.

<span span style="color:darkorange">**페이지 압축**</span>은 <span span style="color:crimson">**테이블스페이스 파일에 쓰기 직전**</span>에 페이지가 압축됩니다. 반면 InnoDB의 <span style="color:olive">**COMPRESSED 행 형식**</span>은 <span span style="color:crimson">**변경 직후 페이지가 다시 압축되고 압축된 페이지는 압축되지 않은 페이지와 함께**</span> 버퍼 풀에 저장됩니다. 이러한 변경 사항은 가끔 디스크로 플러시 되어서 더 자주 데이터를 다시 압축합니다.

<span span style="color:darkorange">**페이지 압축**</span>은 <span span style="color:crimson">**여러 압축 알고리즘**</span>을 지원됩니다. 반면 <span style="color:olive">**COMPRESSED 행 형식**</span>은 <span span style="color:crimson">**zlib**</span> 가 유일하게 지원되는 압축 알고리즘입니다.

<br/>

# <span style="color:olive">**InnoDB COMPRESSED Row Format**</span>
Mysql 에서는 관리형 모듈로 `MyiSAM` 과 `InnoDB` 두가지가 있었지만, 현재는 대부분이 `InnoDB`를 사용하고 있습니다. `InnoDB`를 활용한 압축방식 중 이번 페이지는 **InnoDB COMPRESSED Row Format** 에 대하여 알아보도록 하겠습니다.

## [MariaDB InnoDB](https://mariadb.com/kb/en/innodb-page-compression/)
데이터베이스 압축 기능을 활용하기 위해서 `MariaDB` 의 기본 설정값을 다음과 같이 추가 합니다. 그리고 재부팅을 실행
```bash
/etc/mysql/mariadb.conf.d/50-server.cnf

[mariadb]
# * InnoDB
innodb_buffer_pool_size = 1G
innodb_compression_default=ON
innodb_compression_algorithm=zlib
```

설정완료 후 재부팅을 한 뒤 <span style="color:darkorange">**MariaDB 의 ENGINES**</span>에 InnoDB 가 잘 적용되고 있는지 확인하는 방법은 다음과 같습니다.
```sql
> SHOW ENGINES;
+---------+---------+------------+--------------+
| Engine  | Support | Comment    | Transactions |
+---------+---------+------------+--------------+
| InnoDB  | DEFAULT | Supports.. | YES          |
+---------+---------+------------+--------------+
```

## Django Migration
DataBase 환경설정을 확인했으면 Django 와 MariaDB를 연결한 뒤 Django 에서 지원하는 `MakeMigrations` 옵션을 실행합니다. 그 결과 파이썬으로 작성된 DataBase Migration 파일들의 목록을 확인할 수 있습니다.
```bash
$ ./manage.py makemigrations my_site

Migrations for 'my_site':
  my_site/migrations/0001_initial.py
    + Create model Data
```

압축기능을 적용할 테이블이 있는 Migration 파일을 열어서 압축내용을 추가 합니다. 추가가 완료 되었으면 `python manage.py migrate` 를 실행하여 데이터베이스에 적용을 하면 됩니다.
```python
# my_site/migrations/0001_initial.py
from django.db import migrations, models


class Migration(migrations.Migration):
  ...
  operations = [
    migrations.CreateModel(name='Data', ...),

    # 테이블 압축을 위한 설정값 추가
    # Key Block Size 단위 성능비교
    # https://estenpark.tistory.com/377
    migrations.RunSQL(
        """ALTER TABLE  app_data_pricedata 
        ENGINE=INNODB DEFAULT  CHARSET=UTF8MB4 
        ROW_FORMAT=COMPRESSED  KEY_BLOCK_SIZE=4;""",
        # "ROW_FORMAT=DYNAMIC;" # 롤백 시 기본값으로 복구
    ),
  ]
```

위 내용이 DataBase 에 적용 되었는지 확인 합니다
```sql
$ SHOW TABLE STATUS WHERE Name = 'mysite';
+--------+--------+------------+----------------------+
| Name   | Engine | Row_format | Create_options       |
+--------+--------+------------+----------------------+
| mysite | InnoDB | Compressed | row_format=COMPRESSED|
|        |        |            | key_block_size=4     |
+--------+--------+------------+----------------------+
```

## key_block_size
데이터를 압축해서 보관함으로 파일 `I/O` 를 감소시키는 것이 가장 큰 목적입니다 (반대로 압축을 하면 Update 속도가 느려 집니다) 테이블 압축의 옵션인 <span style="color:darkorange">**key_block_size**</span>(블록 사이즈) 는 **2,4,8,16KB** 로 설정할 수 있습니다. 크기에 따른 성능의 차이는 [DATA 전문가로 가는 길:티스토리](https://estenpark.tistory.com/377) 블로그에서 자세하게 확인할 수 있습니다. 대략적인 성능비교 테이블은 다음과 같습니다.

```sql
`139Mb` -> 8kb, 4kb 일 때 
+----------------+--------+
| DBMS           | Size   |
+----------------+--------+
| normal         | 376 MB |
| compress (8kb) | 179 MB |
| compress (4kb) | 120 MB |
| sys            | 0.03MB |
+----------------+--------+
```

|블록 사이즈 | 압축률   | 조회시간 |
|:--------:|--------|--------|
|  -       | -      | 0.42   |
|  2Kb     | 76.2%  | 0.39   |
|  4Kb     | 76.2%  | 0.377  |
|  8Kb     | 56.4%  | 0.398  |
| 16Kb     | 14.9%  | 0.433  |

`139Mb` CSV 파일을 위의 설정값으로 압축을 진행한 결과, 데이터베이스의 크기는 다음과 같았습니다.
```sql
> SELECT table_schema AS DBMS,
  CONCAT((SUM(data_length + index_length) / 1024 / 1024)," MB") AS "Size"
  FROM  information_schema.TABLES
  GROUP BY table_schema;
+--------------------+-------------------+
| DBMS               | Size              |
+--------------------+-------------------+
| compress           | 119.27734375 MB   |
| normal             | 376.00000000 MB   |
| performance_schema | 0.00000000 MB     |
| sys                | 0.03125000 MB     |
+--------------------+-------------------+
```

데이터베이스 내부에서의 압축 크기를 확인해보면 다음과 같았습니다.
```sql
  SELECT TABLE_NAME, DATA_FREE, TABLE_ROWS
  FROM INFORMATION_SCHEMA.TABLES
  WHERE TABLE_SCHEMA = 'compress';
+-------------+-----------+------------+
| TABLE_NAME  | DATA_FREE | TABLE_ROWS |
+-------------+-----------+------------+
| ...         | 0         | 0          |
| mysite_data | 4980736   | 2660540    |
+-------------+-----------+------------+
```

## Next
이처럼 행 단위 압축은 설정 및 실행은 용이하였지만, 기능적으로 보았을 때 손실되는 부분이 많아서 다음에 살펴볼 Page Compressed 를 추천하고 있습니다. 이어서 페이지 단위 압축 방법에 대해서 살펴보도록 하겠습니다.

<br/>

# 참고사이트
- [InnoDB COMPRESSED Row Format](https://mariadb.com/kb/en/innodb-compressed-row-format/)
- [InnoDB Row 압축(Compression)](https://estenpark.tistory.com/377)
