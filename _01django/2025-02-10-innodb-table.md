---
layout: blog
title: (MariaDB) InnoDB 02 - Page Compression
tags:
- django
---

[(MariaDB) InnoDB 01 - Row Format]() 에 이어서 보다 향상된 압축관리 방법인 Page Compression 에 대해서 작업을 진행해 보도록 하겠습니다.

# MariaDB InnoDB
## lzma 알고리즘 추가하기
```bash
# LZMA 라이브러리 설치
sudo apt-get install liblzma-dev  # Ubuntu/Debian

# 설치에 필요한 내용 다운로드
$ wget https://downloads.mariadb.com/MariaDB/mariadb-10.6.12/source/mariadb-10.6.12.tar.gz\ntar -xvzf mariadb-10.6.12.tar.gz\ncd mariadb-10.6.12/
$ cd mariadb-10.6.12

# MariaDB 빌드 시 LZMA 지원 추가
# MariaDB를 빌드할 때 -DLZMA=ON 플래그를 추가하여 lzma 라이브러리를 활성화합니다.
$ cmake . -DLZMA=ON
$ make -j$(nproc)
$ sudo make install
```


## MariaDB Setting
마리아 DB 에서 설정파일에 다음과 같은 내용을 추가하는 방식으로 내용을 수정 합니다.
```bash
```bash
/etc/mysql/mariadb.conf.d/50-server.cnf

# * InnoDB
# https://mariadb.com/kb/en/innodb-system-variables/#innodb_buffer_pool_size
innodb_buffer_pool_size = 1G

[mariadb]
innodb_compression_default=ON
innodb_compression_algorithm=zlib
```

## Status
```sql
SHOW VARIABLES LIKE 'innodb_compression_algorithm';
+------------------------------+-------+
| Variable_name                | Value |
+------------------------------+-------+
| innodb_compression_algorithm | zlib  |
+------------------------------+-------+
```

```sql
SHOW TABLE STATUS WHERE Name = 'pricedata';
+-----------+--------+------------+----------------------------+
| Name      | Engine | Row_format | Create_options             |
+-----------+--------+------------+----------------------------+
| pricedata | InnoDB | Dynamic    | `PAGE_COMPRESSED`=1        | 
|           |        |            | `PAGE_COMPRESSION_LEVEL`=7 |
+-----------+--------+-----------------------------------------+
```













기본적인 설치방법을 진행하고 나면 다음과 같은 InnoDB 의 압축 알고리즘 내용을 확인할 수 있습니다.
```sql
SHOW GLOBAL STATUS WHERE Variable_name IN (
  'Innodb_have_lz4',
  'Innodb_have_lzo', 
  'Innodb_have_lzma', 
  'Innodb_have_bzip2', 
  'Innodb_have_snappy'
);
+--------------------+-------+
| Variable_name      | Value |
+--------------------+-------+
| Innodb_have_lz4    | ON    |
| Innodb_have_lzo    | OFF   |
| Innodb_have_lzma   | OFF   |
| Innodb_have_bzip2  | OFF   |
| Innodb_have_snappy | ON    |
+--------------------+-------+
```


<br/>

# InnoDB Compressed Table
## InnoDB
InnoDB 란 MySQL, MariaDB 에서 별도의 PlugIn을 활용 가능하도록 도와주는 <span style="color:darkorange">**스토리지 엔진**</span> 입니다. 전체적인 MySQL 의 구성 및 InnoDB 의 기능에 대하여 궁금하신 분은 아랫 유투브를 확인하시기 바랍니다.

<figure class="align-center">
  <p style="text-align: center">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/vQFGBZemJLQ?si=Rbm7NPaR6AqDxPLL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
    </iframe>
  </p>
</figure> 


## [MariaDB InnoDB](https://mariadb.com/kb/en/innodb-page-compression/)
압축 데이터베이스를 활용하기 위해서는 우선 `MariaDB` 의 설정값을 다음과 같이 추가 합니다.
```bash
/etc/mysql/mariadb.conf.d/50-server.cnf

[mariadb]
# * InnoDB
innodb_buffer_pool_size = 1G
innodb_compression_default=ON
```

설정완료 후 재부팅을 한 뒤 <span style="color:darkorange">**MariaDB 의 ENGINES**</span> InnoDB 가 적용되고 있는지 확인하는 방법은 다음과 같습니다.
```sql
> SHOW ENGINES;
+---------+---------+------------+--------------+-----+------------+
| Engine  | Support | Comment    | Transactions | XA  | Savepoints |
+---------+---------+------------+--------------+-----+------------+
| InnoDB  | DEFAULT | Supports.. | YES          | YES | YES        |
+---------+---------+------------+--------------+-----+------------+
```

개별 데이터베이스 내부의 <span style="color:darkorange">**테이블 단위**</span>로 <span style="color:olive">**InnoDB**</span> 가 적용되고 있는지 확인하는 방법은 다음과 같습니다. MySQL에서 **SHOW CREATE TABLE** 명령어를 사용하면 테이블 생성 스크립트를 확인 합니다
```sql
> SHOW CREATE TABLE app_price;
+-----------+--------------------------------------+-------+
| Table     | Create                               | Table |
+-----------+--------------------------------------+-------+
| app_price | CREATE TABLE `app_price` .. ENGINE=InnoDB .. |
+-----------+--------------------------------------+-------+
```

보다 상세한 속성 내용을 보는 방법은 다음과 같습니다.
```sql
SHOW TABLE STATUS WHERE Name = 'app_price';
+---------+--------+---------+------------+
| Name    | Engine | Version | Row_format |
+---------+--------+---------+------------+
|app_price| InnoDB | 10      | Dynamic    |
+---------+--------+---------+------------+
+-------------+-----------+
| Collation   | Temporary | 
+-------------+-----------+
| utf8mb4_bin | N         |
+-------------+-----------+
```

## MariaDB Compressed
MariaDB 에서 압축기능을 활성화 합니다. [Configuring the InnoDB Page Compression Algorithm](https://mariadb.com/kb/en/innodb-page-compression/#configuring-the-innodb-page-compression-algorithm)
```sql
SET GLOBAL innodb_compression_algorithm='lzma';
SHOW GLOBAL STATUS WHERE Variable_name IN (
   'Innodb_have_lz4', 
   'Innodb_have_lzo', 
   'Innodb_have_lzma', 
   'Innodb_have_bzip2', 
   'Innodb_have_snappy'
);
+--------------------+-------+
| Variable_name      | Value |
+--------------------+-------+
| Innodb_have_lz4    | OFF   |
| Innodb_have_lzo    | OFF   |
| Innodb_have_lzma   | ON    |
| Innodb_have_bzip2  | OFF   |
| Innodb_have_snappy | OFF   |
+--------------------+-------+
```

이와같은 설정값을 매번 생성한 데이터베이스에 지정하기가 어렵기 때문에, Mariadb 의 초기 설정 파일에 다음과 같은 내용을 추가 합니다.
```bash
# /etc/mysql/mariadb.conf.d/50-server.cnf
#
# * InnoDB
innodb_buffer_pool_size = 1G

[mariadb]
innodb_compression_algorithm=lzma
```

참고로 저와같은 경우 환경변수 설정오류등의 이유로 아래와 같이 해당 알고리즘이 설치되어 있지 않아서 오류가 발생하였습니다. 이러한 경우에는 기본 압축 알고리즘인 `zlib`를 대신 지정하는 방식으로 진행하였습니다.
```bash
$ sudo systemctl status mariadb 
× mariadb.service - MariaDB 10.6.12 database server
   Main PID: 1723 (code=exited, status=1/FAILURE)
     Status: "MariaDB server is down" CPU: 174ms

  mariadbd[1723]: InnoDB: liblzma is not installed.
  systemd[1]: Failed to start MariaDB 10.6.12 database server.
```


[Django 에서 Model Class 의 Meta 클래스](https://docs.djangoproject.com/en/5.1/ref/models/options/) 로 설정값을 입력하는 부분을 살펴보면 


앞에서 InnoDB 를 활성화 한 뒤, `compressed` 를 활성화 하면서 테이블 단위로 지정을 할 수 있습니다. MariaDB 에서 직접 정의하는 방법은 다음과 같습니다.
```sql
SET SESSION innodb_strict_mode=ON;
SET GLOBAL innodb_file_per_table=ON;
SET GLOBAL innodb_file_format='Barracuda';
CREATE TABLE <테이블 이름> (
  id int,
  str varchar(50)
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED;
```

`Django` 에서 `Migration` 파일을 활용하여 Hard Coding 방식으로 지정하는 방법은 다음과 같습니다.
```bash
$ ./manage.py makemigrations app_data                        
Migrations for 'site':
  site/migrations/0001_initial.py
    + Create model PriceData
```

Migration 작업을 진행할 파일이 생성되었다면 아랫 내용을 참고하여 압축을 적용할 테이블 내용을 수정 합니다.
```python
# site/migrations/0001_initial.py

# Generated by Django 5.1.6 on 2025-02-11 16:26
from django.db import migrations, models


class Migration(migrations.Migration):
  ...
  operations = [
    migrations.CreateModel(
      name='Data',
      ...
    ),

    # Key Block Size 단위 성능비교
    # https://estenpark.tistory.com/377
    # 테이블 압축을 위한 설정값 추가
    migrations.RunSQL(
        """ALTER TABLE  app_data_pricedata 
        ENGINE=INNODB DEFAULT  CHARSET=UTF8MB4 
        ROW_FORMAT=COMPRESSED  KEY_BLOCK_SIZE=4;""",
        # "ROW_FORMAT=DYNAMIC;" # 롤백 시 기본값으로 복구
    ),
  ]
```

MariaDB 에서 해당 파일에 설정내용이 정확하게 반영 되었는지를 확인 합니다. 압축을 사용한 결과 대략 30% 의 사이즈로 줄어든 것을 확인할 수 있었습니다.
```sql
> SHOW CREATE TABLE db_data
+---------+--------------------------------+
| Table   | Create                         |
+---------+--------------------------------+
|         | CREATE TABLE ... ENGINE=InnoDB |
| db_data | ROW_FORMAT=COMPRESSED          |
|         | KEY_BLOCK_SIZE=4               |
+---------+--------------------------------+
```

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


## Compressed by Page
<span style="color:olive">COMPRESSED 행 형식</span>과 <span span style="color:olive">InnoDB 테이블 페이지 압축</span> 중 <span span style="color:darkorange">**InnoDB 테이블 페이지 압축**</span>하는 방법이 더 향상된 기술 입니다.이 둘은 형식이 비슷하지만 몇 가지 차이점은 다음과 같습니다.

<span span style="color:darkorange">**InnoDB 페이지 압축**<span>을 사용하면 압축된 페이지는 <span span style="color:crimson">**테이블스페이스 파일**</span>에서 읽은 후 즉시 압축이 풀리고, 압축 해제된 페이지만 버퍼 풀에 저장됩니다. 반면 InnoDB의 <span style="color:olive">**COMPRESSED 행 형식**</span>을 사용하면 압축된 페이지는 <span span style="color:crimson">**테이블스페이스**<span> 파일에서 읽은 후 즉시 압축이 풀리고, 압축 해제된 페이지와 압축된 페이지가 <span span style="color:crimson">**모두 버퍼 풀**</span>에 저장을 하려고 버퍼 풀에서 더 많은 공간을 사용합니다.

<span span style="color:darkorange">**InnoDB 페이지 압축**</span>을 사용하면 테이블스페이스 파일에 쓰기 직전에 페이지가 압축됩니다. 반면 InnoDB의 <span style="color:olive">**COMPRESSED 행 형식**</span>을 사용하면 변경 직후 페이지가 다시 압축되고 압축된 페이지는 압축되지 않은 페이지와 함께 버퍼 풀에 저장됩니다. 이러한 변경 사항은 가끔 디스크로 플러시됩니다. 즉, COMPRESSED 행 형식은 InnoDB 페이지 압축보다 더 자주 데이터를 다시 압축합니다.

<span span style="color:darkorange">InnoDB 페이지 압축</span>에서는 여러 압축 알고리즘이 지원됩니다. 반면 InnoDB의 <span style="color:olive">**COMPRESSED 행 형식**</span>에서는 zlib 가 유일하게 지원되는 압축 알고리즘입니다. 때문에 COMPRESSED 행 형식은 InnoDB 페이지 압축보다 압축 옵션이 적습니다.


https://mariadb.com/kb/en/innodb-page-compression/#configuring-the-compression-level

```sql
-- InnoDB 페이지 압축을 위한 필수 설정
SET GLOBAL innodb_file_per_table=ON;
SET GLOBAL innodb_file_format='Barracuda';
SET GLOBAL innodb_default_row_format='dynamic';

-- 압축 알고리즘 설정 (예: lzma)
SET GLOBAL innodb_compression_algorithm='lzma';

-- 페이지 압축을 사용하는 테이블 생성
CREATE TABLE compressed_users (
    user_id INT NOT NULL,
    username VARCHAR(50),
    email VARCHAR(100),
    PRIMARY KEY(user_id)
) ENGINE=InnoDB PAGE_COMPRESSED=1;

-- 데이터 삽입
INSERT INTO compressed_users (user_id, username, email) VALUES
(1, 'user1', 'user1@example.com'),
(2, 'user2', 'user2@example.com');

-- 압축된 페이지 수 확인
SHOW GLOBAL STATUS LIKE 'Innodb_num_pages_page_compressed';
```



# MariaDB

```bash

```





<br/>

# 참고사이트
- [MySQL - InnoDB 페이지 압축](https://myinfrabox.tistory.com/58)
- [InnoDB Page Compression](https://mariadb.com/kb/en/innodb-page-compression/)
- [InnoDB File Format](https://mariadb.com/kb/en/innodb-file-format/)
- [How to change Innodb fileformat to Barracuda](https://mariadb.com/kb/en/how-to-change-innodb-fileformat-to-barracuda/)
- [Mysql, MariaDB 환경설정 파일 my.cnf](https://docs.3rdeyesys.com/docs/database/mysql-mariadb/configure/config-file-my-cnf-position/)
- [MariaDB/MySQL InnoDB 테이블 압축](https://estenpark.tistory.com/377)