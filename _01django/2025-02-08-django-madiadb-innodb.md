---
layout: blog
title: (MariaDB) InnoDB 압축테이블 비교
tags:
- django
---

Django 에서 MariaDB 10.6 을 연결하여 프로젝트를 진행하고 있습니다. `CSV`로 저장한 `139.5 Mb` 파일을 DataBase 에 저장을 하면서 성능을 비교해 보도록 하겠습니다.

# Normal DataBase
데이터 베이스에 저장을 하면 데이터베이스 용량이 `218 Mb` 로 늘어난 것을 확인할 수 있었습니다.
```sql
+--------------------+-------------------+
| DBMS               | Size              |
+--------------------+-------------------+
| normal             | 218.75000000 MB   |
| performance_schema | 0.00000000 MB     |
| sys                | 0.03125000 MB     |
+--------------------+-------------------+
```

<br/>

# InnoDB Compressed Table
## InnoDB
InnoDB 란 MySQL, MariaDB 에서 별도의 PlugIn을 활용 가능하도록 도와주는 <span style="color:orange">**스토리지 엔진**</span> 입니다. 전체적인 MySQL 의 구성 및 InnoDB 의 기능에 대하여 궁금하신 분은 아랫 유투브를 확인하시기 바랍니다.

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
innodb_compression_default=ON
```

설정완료 후 재부팅을 한 뒤 <span style="color:orange">**MariaDB 의 ENGINES**</span> InnoDB 가 적용되고 있는지 확인하는 방법은 다음과 같습니다.
```sql
> SHOW ENGINES;
+---------+---------+------------+--------------+-----+------------+
| Engine  | Support | Comment    | Transactions | XA  | Savepoints |
+---------+---------+------------+--------------+-----+------------+
| InnoDB  | DEFAULT | Supports.. | YES          | YES | YES        |
+---------+---------+------------+--------------+-----+------------+
```

개별 데이터베이스 내부의 <span style="color:orange">**테이블 단위**</span>로 <span style="color:green">**InnoDB**</span> 가 적용되고 있는지 확인하는 방법은 다음과 같습니다. MySQL에서 **SHOW CREATE TABLE** 명령어를 사용하면 테이블 생성 스크립트를 확인 합니다
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
앞에서 InnoDB 를 활성화 한 뒤, `compressed` 를 활성화 하면서 테이블 단위로 지정을 할 수 있습니다. `Migration` 파일에서 Hard Coding 방식으로 지정하는 방법은 다음과 같습니다.
```python
from django.db import migrations, models

class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.RunSQL(
            "CREATE TABLE <테이블 이름> ("
            "id INT AUTO_INCREMENT PRIMARY KEY,"
            "name VARCHAR(100),"
            "price DECIMAL(10, 2)"
            ") ROW_FORMAT=COMPRESSED KEY_BLOCK_SIZE=8;"
        ),
    ]
```

## Compressed in Django


<br/>

# 참고사이트
- [InnoDB COMPRESSED Row Format](https://mariadb.com/kb/en/innodb-compressed-row-format/)
- [InnoDB Page Compression](https://mariadb.com/kb/en/innodb-page-compression/)
- [InnoDB File Format](https://mariadb.com/kb/en/innodb-file-format/)
- [How to change Innodb fileformat to Barracuda](https://mariadb.com/kb/en/how-to-change-innodb-fileformat-to-barracuda/)
- [Mysql, MariaDB 환경설정 파일 my.cnf](https://docs.3rdeyesys.com/docs/database/mysql-mariadb/configure/config-file-my-cnf-position/)
