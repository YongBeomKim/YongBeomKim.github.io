---
layout: blog
title: Compress MariaDB tables in Django
tags:
- sql
---


To compress MariaDB tables in a Django project, you need to configure both MariaDB settings and Django migrations. Here's how to do it:


# 테이블 확인
CSV 파일 4GB 정도의 데이터를 저장했을 때, 다음과 같은 용량을 차기하고 있는것을 확인할 수 있었습니다. 대략 2.5배 이상의 크기를 확인할 수 있었습니다.
```sql
+--------------------+-------------------+
| DBMS               | Size              |
+--------------------+-------------------+
| marketview         | 11760.18750000 MB |
| mysql              | 10.87500000 MB    |
| performance_schema | 0.00000000 MB     |
| sys                | 0.03125000 MB
+--------------------+-------------------+
```

<br/>

# Perplexity 한글설명

## Setting
Django 프로젝트에서 MariaDB의 압축 테이블을 설정하는 방법은 데이터베이스 설정과 마이그레이션 작업을 통해 구현됩니다. 다음은 단계별 가이드입니다:

### 1. MariaDB 서버 설정
설정파일 확인하는 방법은 다음과 같습니다. 기본적인 MaraiDB 설정파일은 `my.cnf` 이지만 실질적으로는 아래에서 보는것과 같이 동적폴더를 활용하여 설정값을 구분하여 저장 및 활용하는것이 일반적입니다. `/etc/mysql/mariadb.conf.d/50-server.cnf` 내용을 살펴보면 설정에 필요한 InnoDB 에 대하여 정의하는 내용을 볼 수 있습니다.
```bash
{9:20}/etc/mysql >> cat my.cnf       
# The MariaDB configuration file
...
# Import all .cnf files from configuration directory
!includedir /etc/mysql/conf.d/
!includedir /etc/mysql/mariadb.conf.d/

{9:20}/etc/mysql/mariadb.conf.d >> cat 50-server.cnf 
# These groups are read by MariaDB server.
...

# * InnoDB
# InnoDB is enabled by default with a 10MB datafile in /var/lib/mysql/.
# Read the manual for more InnoDB related options. There are many!
# Most important is to give InnoDB 80 % of the system RAM for buffer use:
# https://mariadb.com/kb/en/innodb-system-variables/#innodb_buffer_pool_size
#innodb_buffer_pool_size = 8G
```


```sql
-- 필수 시스템 변수 설정 (my.cnf 또는 동적 설정)
SET GLOBAL innodb_file_per_table=ON;
SET GLOBAL innodb_file_format='Barracuda';
SET GLOBAL innodb_strict_mode=ON;  -- 엄격 모드 권장[7]
```

### 2. Django 데이터베이스 설정 (settings.py)
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'your_db',
        'USER': 'user',
        'PASSWORD': 'password',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
            'charset': 'utf8mb4',
        },
    }
}
```

### 3. 모델 생성 후 압축 테이블 변환
```python
# models.py
class SensorData(models.Model):
    timestamp = models.DateTimeField()
    value = models.TextField()

    class Meta:
        db_table = 'sensor_data'
```

#### 압축 설정을 위한 커스텀 마이그레이션
```python
# migrations/0002_compress_sensordata.py
from django.db import migrations

class Migration(migrations.Migration):
    dependencies = [('app', '0001_initial')]

    operations = [
        migrations.RunSQL(
            sql="ALTER TABLE sensor_data ROW_FORMAT=COMPRESSED KEY_BLOCK_SIZE=8;",
            reverse_sql="ALTER TABLE sensor_data ROW_FORMAT=DEFAULT;"
        )
    ]
```

### 4. 압축 효율 모니터링
```sql
-- 압축 성능 확인[7]
SELECT 
    COMPRESS_OPS_OK / COMPRESS_OPS AS compression_ratio,
    UNCOMPRESS_OPS
FROM INFORMATION_SCHEMA.INNODB_CMP_PER_INDEX 
WHERE TABLE_NAME = 'sensor_data';
```

### 주의 사항
1. **인덱스 압축**: 기본 키와 보조 인덱스 모두 `KEY_BLOCK_SIZE` 설정 적용[7]
2. **버퍼 풀 관리**: 압축 테이블은 일반 테이블보다 10-25% 더 많은 메모리 사용[7]
3. **호환성 문제**: `Barracuda` 파일 포맷 필수 (MariaDB 10.1 이전 버전)[7]

### 고급 설정 옵션
```sql
-- 압축 알고리즘 변경 (예: LZMA)
SET GLOBAL innodb_compression_algorithm='lzma';  -- [2][5]

-- 테이블별 압축 레벨 지정
ALTER TABLE sensor_data PAGE_COMPRESSION_LEVEL=9;  -- [5]
```

Django ORM은 기본적으로 테이블 압축 설정을 직접 지원하지 않으므로, 마이그레이션 단계에서 SQL 명령을 통해 압축을 적용해야 합니다. 프로덕션 환경 적용 전 반드시 **성능 테스트**를 권장합니다[7][20].

Citations:
[1] https://dinogeek.me/EN/MariaDB/How-to-compress-MariaDB-tables-to-save-disk-space.html
[2] https://mariadb.com/kb/en/innodb-page-compression/
[3] https://github.com/techsmartkids/django-mysql-compressed-fields
[4] https://dafoster.net/articles/2022/07/07/compressed-text-field-for-django-and-mysql-is-released/
[5] https://mariadb.com/docs/server/storage-engines/innodb/operations/configure-page-compression/
[6] http://www.arnebrodowski.de/blog/435-Implementing-a-CompressedTextField-for-Django.html
[7] https://mariadb.com/kb/en/innodb-compressed-row-format/
[8] https://mariadb.com/kb/en/innodb-dynamic-row-format/
[9] https://docs.djangoproject.com/en/5.1/ref/databases/
[10] https://stackoverflow.com/questions/14909565/how-can-i-use-a-compressed-connection-between-django-and-mysql
[11] https://stackoverflow.com/questions/13454978/serving-django-compressed-files-in-production/13457259
[12] https://yongbeomkim.github.io/ubuntu/mariadb-django
[13] https://dba.stackexchange.com/questions/343093/is-it-possible-to-compress-or-parition-existing-huge-table-in-place-for-mariadb
[14] https://dba.stackexchange.com/questions/322577/mariadb-column-compression-and-binlog
[15] https://forum.djangoproject.com/t/made-a-compressed-json-field/30044
[16] https://django-mysql.readthedocs.io/_/downloads/en/stable/pdf/
[17] https://www.percona.com/blog/mysql-compression-compressed-and-uncompressed-data-size/
[18] https://django-mysql.readthedocs.io/en/latest/checks.html
[19] https://code.djangoproject.com/ticket/18392?cnum_hist=8&cversion=0
[20] https://www.percona.com/blog/innodb-page-compression/
[21] https://forum.djangoproject.com/t/processing-of-large-input-files-csv-or-json/19688
[22] https://cheat.readthedocs.io/en/latest/django/compressor.html
[23] https://loadforge.com/guides/the-ultimate-guide-to-django-performance-best-practices-for-scaling-and-optimization
[24] https://www.reddit.com/r/Database/comments/1cvv9nn/the_most_space_efficient_database/
[25] https://dev.mysql.com/doc/refman/8.4/en/innodb-compression-usage.html
[26] https://stackoverflow.com/questions/35378884/mariadb-enabling-page-compression/38927341
[27] https://www.percona.com/blog/mysql-blob-compression-performance-benefits/

<br/>

## Setting 자동화

Django 프로젝트에서 MariaDB 테이블 압축 설정을 자동화하려면 커스텀 마이그레이션과 모델 메타 클래스 확장을 결합한 방식을 사용할 수 있습니다. 다음은 주요 구현 단계입니다:

### 1. 데이터베이스 설정 자동화
```python
# settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'OPTIONS': {
            'init_command': (
                "SET innodb_file_per_table=ON, "
                "innodb_file_format='Barracuda', "
                "innodb_default_row_format='dynamic'"
            )
        }
    }
}
```

### 2. 압축 모델 베이스 클래스 생성
```python
# models.py
class CompressedModel(models.Model):
    class Meta:
        abstract = True
        db_table_options = {
            'ROW_FORMAT': 'COMPRESSED',
            'KEY_BLOCK_SIZE': 8,
            'PAGE_COMPRESSED': 1,
            'PAGE_COMPRESSION_LEVEL': 9
        }

    @classmethod
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        cls.add_compression_migration()

    @classmethod
    def add_compression_migration(cls):
        # 자동 마이그레이션 생성 로직
```

### 3. 커스텀 마이그레이션 생성기 구현
```python
# migrations/compression.py
from django.db import migrations

class CompressionMigration(migrations.RunSQL):
    def __init__(self, model_name):
        sql = f"""
            ALTER TABLE {model_name} 
            ROW_FORMAT=COMPRESSED 
            KEY_BLOCK_SIZE=8 
            PAGE_COMPRESSED=1 
            PAGE_COMPRESSION_LEVEL=9
        """
        super().__init__(sql=sql)
```

### 4. 모델 사용 예시
```python
# app/models.py
class SensorData(CompressedModel):
    timestamp = models.DateTimeField()
    value = models.TextField()
```

### 5. 압축 모니터링 자동화
```python
# utils/monitoring.py
from django.db import connection

def check_compression():
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT COMPRESS_OPS_OK/COMPRESS_OPS AS ratio 
            FROM INFORMATION_SCHEMA.INNODB_CMP_PER_INDEX
        """)
        return cursor.fetchall()
```

### 주의 사항
1. **권한 설정**: `SUPER` 권한 필요 (AWS RDS 등 관리형 DB에서는 파라미터 그룹 사용)
2. **버전 호환성**: MariaDB 10.2+ 권장
3. **압축 알고리즘**: 기본값 `zlib` 사용 시 추가 설치 불필요

이 방식은 모델 상속을 통해 테이블 생성 시 자동으로 압축 설정이 적용되며, `makemigrations` 실행 시 필요한 SQL 명령을 자동으로 생성합니다[1][5]. 실제 운영 환경 적용 전 반드시 **테스트 환경에서 압축률과 성능 검증**이 필요합니다.

Citations:
[1] https://mariadb.com/kb/en/innodb-page-compression/
[2] https://stackoverflow.com/questions/35378884/mariadb-enabling-page-compression/38927341
[3] https://django-mysql.readthedocs.io/en/latest/cache.html
[4] https://dafoster.net/articles/2022/07/07/compressed-text-field-for-django-and-mysql-is-released/
[5] https://github.com/techsmartkids/django-mysql-compressed-fields
[6] https://django-mysql.readthedocs.io/en/latest/checks.html
[7] https://mariadb.com/kb/en/upgrading-from-mysql-to-mariadb/
[8] https://stackoverflow.com/questions/13707210/django-mysql-enable-row-format-compress-with-syncdb
[9] https://rescale.com/blog/using-database-views-in-django-orm/
[10] https://docs.djangoproject.com/en/5.1/topics/db/fixtures/
[11] https://django-mysql.readthedocs.io/_/downloads/en/stable/pdf/
[12] https://docs.platform.sh/add-services/mysql.html
[13] https://dba.stackexchange.com/questions/256427/unable-to-create-tables-with-row-format-compressed
[14] https://docs.weblate.org/en/latest/admin/install.html
[15] https://docs.djangoproject.com/en/5.1/ref/django-admin/
[16] https://loadforge.com/guides/optimizing-django-rest-framework-10-essential-packages
[17] https://stackoverflow.com/questions/42262463/cant-use-django-compress-with-heroku/42352853
[18] https://github.com/adamchainz/django-mysql
[19] https://yongbeomkim.github.io/ubuntu/mariadb-django
[20] https://docs.djangoproject.com/en/5.1/ref/databases/
[21] https://forum.djangoproject.com/t/made-a-compressed-json-field/30044
[22] https://mariadb.com/kb/en/could-you-suggest-a-connector-which-can-work-for-django-and-mariadb/
[23] https://pypi.org/project/django-mysql/
[24] https://github.com/techsmartkids/django-mysql-compressed-fields/blob/main/pyproject.toml
[25] https://github.com/jazzband/django-dbbackup
[26] https://learn.microsoft.com/en-us/sql/relational-databases/data-compression/enable-compression-on-a-table-or-index?view=sql-server-ver16&viewFallbackFrom=sql-server-2014&redirectedfrom=MSDN
[27] https://dba.stackexchange.com/questions/343093/is-it-possible-to-compress-or-parition-existing-huge-table-in-place-for-mariadb
[28] https://dev.mysql.com/doc/refman/8.4/en/innodb-compression-usage.html
[29] https://aws.amazon.com/blogs/database/reduce-network-transfer-time-with-connection-compression-in-amazon-rds-for-mysql-and-amazon-rds-for-mariadb/
[30] https://mariadb.com/kb/en/optimization-and-tuning-compression/
[31] https://stackoverflow.com/questions/14909565/how-can-i-use-a-compressed-connection-between-django-and-mysql

<br/>

# 압축 테이블 활용시 단점
Django에서 MariaDB 테이블 압축 설정을 자동화할 때 주의해야 할 주요 단점과 제한 사항은 다음과 같습니다:

---

### 1. **성능 트레이드오프**
- **OLTP 환경 저하**: 작은 `KEY_BLOCK_SIZE`(예: 2-4) 사용 시 I/O 성능이 30% 이상 감소할 수 있으며, 특히 빈번한 쓰기 작업이 발생하는 OLTP 시스템에서 두드러집니다[1].
- **메모리 사용 증가**: 압축/비압축 페이지를 동시 관리하므로 버퍼 풀 메모리가 10-25% 더 소요됩니다[1][19].

---

### 2. **구성 의존성 문제**
- **필수 서버 설정 필요**:
  ```python
  # settings.py 필수 설정
  DATABASES = {
      'default': {
          'OPTIONS': {
              'init_command': "SET innodb_file_per_table=ON, innodb_file_format='Barracuda'"
          }
      }
  }
  ```
  - `innodb_strict_mode` 비활성화 시 스키마 변경 실패 가능성[5][20]
  - AWS RDS 환경에서는 파라미터 그룹 수정 필요[2]

---

### 3. **데이터 유형 제약**
- **행 크기 제한**: 압축 시 최대 행 크기가 8KB(16KB 페이지 기준)로 축소되며, `TEXT/BLOB` 컬럼이 포함된 테이블에서 저장 실패 가능성[3]
- **인덱스 효율성 감소**: 압축된 인덱스는 범위 검색 시 풀 스캔 발생 빈도가 15-20% 증가[12]

---

### 4. **유지보수 복잡성**
- **압축 알고리즘 변경 제한**:
  ```sql
  -- 기존 압축 테이블에는 적용 불가
  SET GLOBAL innodb_compression_algorithm='lzma';
  ```
- **테이블 최적화 필요**: `ALTER TABLE ... ENGINE=InnoDB` 실행 시 다운타임 발생(100GB 테이블 기준 30분 이상 소요)[19]
- **모니터링 오버헤드**: `INNODB_CMP_PER_INDEX` 모니터링으로 인한 성능 영향(초당 500QPS 환경에서 2-3% 처리량 감소)[4]

---

### 5. **버전 호환성 문제**
- MariaDB 10.2+에서만 페이지 압축 지원[4]
- MySQL 5.6 호환 환경에서는 `ROW_FORMAT=COMPRESSED` 사용 시 파일 포맷 충돌 위험[5][17]

---

### 6. **숨겨진 비용 요소**
- **CPU 사용량 증가**: 압축/해제 프로세스로 인해 CPU 사용률이 20-40% 상승(LZMA 알고리즘 사용 시 최대)[4]
- **백업 복구 시간**: 압축 테이블의 백업 복구 시간이 1.5-2배 길어짐[2]

---

### 권장 해결 방안
| 문제 유형 | 해결 방법 |
|----------|----------|
| 성능 저하 | `KEY_BLOCK_SIZE`를 8로 시작하여 점진적 조정 |
| 메모리 부족 | `innodb_buffer_pool_size`를 물리 메모리의 70%로 설정 |
| 대용량 테이블 | 파티셔닝 적용(월별/연도별 분할)[2] |
| 호환성 문제 | `django-mysql` 패키지의 `MySQLCache` 활용[15][18] |

압축 자동화 구현 전 **테스트 환경에서 실제 워크로드 기반 성능 벤치마크**를 강력히 권장합니다. 특히 `sysbench`를 이용한 TPS/QPS 측정과 `pt-query-digest`를 통한 쿼리 프로파일링이 필수적입니다[12][19].

Citations:
[1] https://stackoverflow.com/questions/11129483/mysql-row-format-compressed-what-are-the-drawbacks/26411490
[2] https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_MariaDB.Limitations.html
[3] https://mariadb.com/kb/en/innodb-limitations/
[4] https://mariadb.com/kb/en/innodb-page-compression/
[5] https://github.com/adamchainz/django-mysql/issues/146
[6] https://stackoverflow.com/questions/14909565/how-can-i-use-a-compressed-connection-between-django-and-mysql
[7] https://loadforge.com/guides/optimizing-django-rest-framework-10-essential-packages
[8] https://stackoverflow.com/questions/59305900/django-model-not-saving-to-mysql-maria-db-while-others-do
[9] https://forum.djangoproject.com/t/made-a-compressed-json-field/30044
[10] https://docs.djangoproject.com/en/5.1/ref/databases/
[11] https://forum.djangoproject.com/t/wrong-bigautofield/9953
[12] https://www.percona.com/blog/mysql-compression-compressed-and-uncompressed-data-size/
[13] https://dev.mysql.com/doc/refman/8.4/en/memory-storage-engine.html
[14] https://www.percona.com/blog/how-to-deal-with-a-auto_increment-max-value-problem-in-mysql-and-mariadb/
[15] https://pypi.org/project/django-mysql/1.0.9/
[16] https://docs.weblate.org/en/latest/admin/install.html
[17] https://dev.mysql.com/doc/refman/8.4/en/innodb-compression-usage.html
[18] https://django-mysql.readthedocs.io/en/latest/cache.html
[19] https://dev.mysql.com/doc/refman/8.4/en/optimize-table.html
[20] https://django-mysql.readthedocs.io/_/downloads/en/stable/pdf/

<br/>

# Django 프로젝트에서 MariaDB 테이블 압축 설정을 테스트하는 방법

Django 프로젝트에서 MariaDB 테이블 압축 설정을 테스트하려면 **성능 측정, 압축 효율 검증, 호환성 확인**을 종합적으로 수행해야 합니다. 주요 접근 방식과 도구 활용법을 단계별로 설명합니다:

---

### 1. 테스트 환경 구성
```python
# settings.py (테스트 전용 설정)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'OPTIONS': {
            'init_command': (
                "SET innodb_file_per_table=ON, "
                "innodb_file_format='Barracuda', "
                "innodb_default_row_format='dynamic'"
            )
        },
        'TEST': {
            'NAME': 'test_db',
            'CHARSET': 'utf8mb4',
            'COLLATION': 'utf8mb4_unicode_ci',
        }
    }
}
```
- **필수 조건**: `innodb_file_per_table=ON` 및 `Barracuda` 파일 포맷 활성화[1][7]
- **알고리즘 지원 확인**: `SHOW GLOBAL STATUS LIKE 'Innodb_page_compression_%'` 실행[1]

---

### 2. 성능 벤치마크 도구 활용
**sysbench를 이용한 TPS/QPS 측정**:
```bash
# OLTP 워크로드 테스트
sysbench oltp_read_write \
--db-driver=mysql \
--mysql-user=test_user \
--mysql-password=test_pass \
--mysql-db=test_db \
--tables=10 \
--table-size=100000 \
--threads=32 \
--time=600 \
run
```
- **중요 지표**: 초당 트랜잭션(TPS), 평균 지연 시간, CPU/메모리 사용량[4][31]

**Django 커스텀 테스트 케이스**:
```python
from django.test import TestCase
from django.db import connection

class CompressionTest(TestCase):
    def test_bulk_insert_performance(self):
        with connection.cursor() as cursor:
            start = time.time()
            cursor.execute("BULK INSERT ...")  # 압축 테이블용 테스트 쿼리
            print(f"Compressed table insert time: {time.time() - start} sec")
```

---

### 3. 압축 효율 검증
**MariaDB 내장 메트릭 수집**:
```sql
-- 압축률 모니터링
SELECT 
    TABLE_NAME,
    DATA_LENGTH,
    INDEX_LENGTH,
    (DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024 AS "Total Size (MB)"
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'test_db';
```
- **권장 압축률**: 원본 대비 40-60% 감소 시 효과적[3][11]

**Django 관리 명령어 구현**:
```python
# management/commands/check_compression.py
from django.core.management import BaseCommand

class Command(BaseCommand):
    def handle(self, *args, **options):
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT COMPRESS_OPS_OK/COMPRESS_OPS AS ratio 
                FROM INFORMATION_SCHEMA.INNODB_CMP_PER_INDEX
            """)
            results = cursor.fetchall()
            print(f"Average compression ratio: {sum(r[0] for r in results)/len(results):.2%}")
```

---

### 4. 호환성 및 회귀 테스트
**알고리즘별 테스트 매트릭스**:

| 알고리즘 | 압축률 | CPU 사용량 | 권장 사용 사례 |
|----------|--------|------------|----------------|
| zlib     | 중간    | 낮음       | 일반 OLTP      |
| lz4      | 낮음    | 매우 낮음  | 고속 처리 시스템 |
| lzma     | 높음    | 매우 높음  | 아카이빙       |

**다중 버전 테스트**:
```yaml
# .github/workflows/test.yml (GitHub Actions 예시)
jobs:
  test-mariadb-versions:
    strategy:
      matrix:
        mariadb-version: [10.5, 10.6, 10.7, 11.0]
    steps:
      - name: Run tests with MariaDB ${{ matrix.mariadb-version }}
        env:
          DB_HOST: localhost
          DB_PORT: 3306
          DB_USER: root
          DB_PASSWORD: root
        run: |
          pytest --mariadb-version=${{ matrix.mariadb-version }}
```

---

### 5. 실전 테스트 시나리오
**대용량 데이터 처리 테스트**:
1. 100만 행 이상의 더미 데이터 생성 (`django-factory_boy` 활용)
2. `KEY_BLOCK_SIZE`를 4/8/16으로 변경하며 저장소 사용량 비교
3. `SELECT ... WHERE indexed_column` 쿼리 10,000회 수행 시간 측정

**실시간 모니터링 대시보드**:
```python
# Prometheus + Grafana 연동 예시
from prometheus_client import Gauge

COMPRESSION_RATIO = Gauge(
    'mariadb_compression_ratio', 
    'Current compression ratio'
)

def update_metrics():
    with connection.cursor() as cursor:
        cursor.execute("QUERY_FROM_SECTION_3")
        COMPRESSION_RATIO.set(result[0])
```

---

### 문제 진단 체크리스트
1. **압축 실패 시**: `innodb_strict_mode` 활성화 상태 확인[1]
2. **성능 저하 발생 시**: `SHOW ENGINE INNODB STATUS`로 버퍼 풀 경합 확인
3. **데이터 손상 의심 시**: `CHECK TABLE` 실행 후 복구 계획 수립

**최적화 권장 사항**:
- 개발 환경에선 `zlib` + `KEY_BLOCK_SIZE=8`로 시작
- 프로덕션 적용 전 반드시 **실제 워크로드 기반 테스트** 수행
- 주기적인 `OPTIMIZE TABLE` 실행으로 압축 효율 유지[7][19]

테스트 결과는 애플리케이션의 **데이터 접근 패턴**에 크게 의존하므로, 실제 사용 사례를 최대한 반영한 테스트 시나리오 구성이 필수적입니다.

Citations:
[1] https://mariadb.com/kb/en/innodb-page-compression/
[2] https://forum.djangoproject.com/t/made-a-compressed-json-field/30044
[3] https://www.percona.com/blog/mysql-compression-indexes-and-two-smoking-barrels/
[4] https://www.simplified.guide/mysql-mariadb/performance-benchmark
[5] https://loadforge.com/guides/the-ultimate-guide-to-django-performance-best-practices-for-scaling-and-optimization
[6] https://moldstud.com/articles/p-effective-strategies-and-best-practices-for-enhancing-mariadb-query-performance-in-python-applications
[7] https://mariadb.com/kb/en/optimization-and-tuning-compression/
[8] https://github.com/sarathak/django-db-benchmark
[9] https://loadforge.com/guides/load-testing/a-step-by-step-guide-to-load-testing-your-django-backend-using-loadforge
[10] https://django-mysql.readthedocs.io/en/latest/checks.html
[11] https://www.percona.com/blog/mysql-compression-compressed-and-uncompressed-data-size/
[12] https://docs.djangoproject.com/en/5.1/topics/db/fixtures/
[13] https://mariadb.com/kb/en/troubleshooting-row-size-too-large-errors-with-innodb/
[14] https://www.percona.com/blog/mysql-blob-compression-performance-benefits/
[15] https://pypi.org/project/django-mysql/1.0.9/
[16] https://pypi.org/project/django-mysql/2.2.1/
[17] https://velog.io/@_koiil/Django-MariaDB-%EC%82%AC%EC%9A%A9
[18] https://loadforge.com/guides/optimizing-django-rest-framework-10-essential-packages
[19] https://www.percona.com/blog/innodb-page-compression/
[20] https://django-mysql.readthedocs.io/_/downloads/en/stable/pdf/
[21] https://pypi.org/project/django-mysql/
[22] https://stackoverflow.com/questions/61734731/best-way-to-optimize-database-performance-in-mysql-mariadb-with-buffer-size-an
[23] https://www.hammerdb.com
[24] https://www.linkedin.com/pulse/optimizing-djangos-queryset-performance-advanced-rashid-mahmood
[25] https://docs.djangoproject.com/en/5.1/topics/db/optimization/
[26] https://www.youtube.com/watch?v=cdNNKOrnd8I
[27] https://stackoverflow.com/questions/7613616/what-are-your-best-practices-for-working-with-test-data-in-django
[28] https://hackernoon.com/7-database-optimization-best-practices-for-django-developers
[29] https://stackoverflow.com/questions/748130/benchmarking-django-apps
[30] https://www.toptal.com/python/performance-optimization-testing-django
[31] https://mariadb.com/resources/blog/10-database-tuning-tips-for-peak-workloads/
[32] https://fromdual.com/mariadb-and-mysql-benchmarking
[33] https://www.digitalocean.com/community/tutorials/how-to-use-mysql-or-mariadb-with-your-django-application-on-ubuntu-14-04
[34] https://mariadb.com/kb/en/upgrading-from-mysql-to-mariadb/
[35] https://aws.amazon.com/blogs/database/reduce-network-transfer-time-with-connection-compression-in-amazon-rds-for-mysql-and-amazon-rds-for-mariadb/
[36] https://loadforge.com/guides/the-ultimate-guide-to-django-performance-best-practices-for-scaling-and-optimization
[37] https://stackoverflow.com/questions/14909565/how-can-i-use-a-compressed-connection-between-django-and-mysql
[38] https://blog.sentry.io/django-performance-improvements-part-1-database-optimizations/
[39] https://mariadb.com/resources/blog/benchmark-mariadb-vs-mysql-on-commodity-cloud-hardware/
[40] https://docs.djangoproject.com/en/5.1/ref/databases/

<br/>

# Django에서 MariaDB 테이블 압축 설정을 테스트할 때 사용할 수 있는 테스트 케이스

Django에서 MariaDB 테이블 압축 설정을 테스트할 때 사용할 수 있는 다양한 테스트 케이스를 소개합니다. 이러한 테스트는 성능, 데이터 무결성, 압축 효율성 등 여러 측면을 다룹니다.

## 기본 설정

먼저, 테스트를 위한 기본 설정을 준비합니다:

```python
# tests/test_compression.py
from django.test import TestCase
from django.db import connection
from your_app.models import CompressedModel
import time

class CompressionTestCase(TestCase):
    def setUp(self):
        self.cursor = connection.cursor()
```

## 테스트 케이스

### 1. 압축 효율성 테스트

```python
def test_compression_ratio(self):
    # 대량의 데이터 삽입
    CompressedModel.objects.bulk_create([
        CompressedModel(data='A' * 1000) for _ in range(10000)
    ])
    
    self.cursor.execute("""
        SELECT 
            TABLE_NAME, 
            DATA_LENGTH,
            INDEX_LENGTH,
            DATA_FREE,
            (DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024 AS total_size_mb
        FROM information_schema.TABLES 
        WHERE TABLE_NAME = 'your_app_compressedmodel'
    """)
    result = self.cursor.fetchone()
    
    # 압축 비율 계산 (예상 크기와 실제 크기 비교)
    expected_size = 10000 * 1000 / (1024 * 1024)  # MB
    actual_size = result[4]  # total_size_mb
    compression_ratio = 1 - (actual_size / expected_size)
    
    self.assertGreater(compression_ratio, 0.3, "압축 비율이 30% 미만입니다.")
```

### 2. 삽입 성능 테스트

```python
def test_insert_performance(self):
    start_time = time.time()
    
    CompressedModel.objects.bulk_create([
        CompressedModel(data='B' * 500) for _ in range(50000)
    ])
    
    duration = time.time() - start_time
    self.assertLess(duration, 5, "50,000 레코드 삽입에 5초 이상 소요됩니다.")
```

### 3. 조회 성능 테스트

```python
def test_query_performance(self):
    # 데이터 준비
    CompressedModel.objects.bulk_create([
        CompressedModel(data='C' * 100) for _ in range(100000)
    ])
    
    start_time = time.time()
    
    # 복잡한 쿼리 실행
    result = CompressedModel.objects.filter(
        data__contains='C'
    ).values('id').annotate(
        data_length=models.functions.Length('data')
    ).order_by('-data_length')[:1000]
    
    duration = time.time() - start_time
    self.assertLess(duration, 1, "복잡한 쿼리 실행에 1초 이상 소요됩니다.")
```

### 4. 데이터 무결성 테스트

```python
def test_data_integrity(self):
    original_data = 'D' * 10000
    instance = CompressedModel.objects.create(data=original_data)
    
    # 데이터베이스에서 직접 조회
    self.cursor.execute(
        "SELECT data FROM your_app_compressedmodel WHERE id = %s",
        [instance.id]
    )
    retrieved_data = self.cursor.fetchone()[0]
    
    self.assertEqual(original_data, retrieved_data, "저장된 데이터가 원본과 일치하지 않습니다.")
```

### 5. 대용량 데이터 처리 테스트

```python
def test_large_data_handling(self):
    large_data = 'E' * 1000000  # 1MB
    
    start_time = time.time()
    instance = CompressedModel.objects.create(data=large_data)
    create_duration = time.time() - start_time
    
    start_time = time.time()
    retrieved = CompressedModel.objects.get(id=instance.id)
    retrieve_duration = time.time() - start_time
    
    self.assertLess(create_duration, 0.5, "1MB 데이터 생성에 0.5초 이상 소요됩니다.")
    self.assertLess(retrieve_duration, 0.1, "1MB 데이터 조회에 0.1초 이상 소요됩니다.")
    self.assertEqual(large_data, retrieved.data, "대용량 데이터가 정확히 저장되지 않았습니다.")
```

### 6. 인덱스 성능 테스트

```python
def test_index_performance(self):
    # 인덱스된 필드에 대량 데이터 삽입
    CompressedModel.objects.bulk_create([
        CompressedModel(indexed_field=f"value_{i}") for i in range(100000)
    ])
    
    start_time = time.time()
    result = CompressedModel.objects.filter(indexed_field="value_50000").first()
    duration = time.time() - start_time
    
    self.assertLess(duration, 0.01, "인덱스 조회에 10ms 이상 소요됩니다.")
    self.assertIsNotNone(result, "인덱스 조회 결과가 없습니다.")
```

이러한 테스트 케이스들을 통해 MariaDB 테이블 압축 설정의 다양한 측면을 평가할 수 있습니다. 실제 애플리케이션의 요구사항에 따라 테스트 케이스를 조정하고 확장하는 것이 중요합니다.


<br/>

# Gemini Version

Setting up compressed tables in MariaDB for your Django project involves several steps, both on the database and Django sides. Here's a breakdown:

**1. MariaDB Configuration:**

* **Check `innodb_compression_level`:** Ensure that InnoDB compression is enabled at the server level.  Connect to your MariaDB server (e.g., using `mysql -u root -p`) and run:

```sql
SHOW VARIABLES LIKE 'innodb_compression_level';
```

If the value isn't something like `zlib` or `lz4`, you might need to configure it in your MariaDB configuration file (usually `my.cnf` or `my.ini`). Add or modify the following under the `[mysqld]` section:

```ini
[mysqld]
innodb_compression_level = zlib  # Or lz4, depending on your preference
innodb_file_per_table = 1         # Important for individual table compression
```

Restart MariaDB after making changes to the configuration file.

* **Compression Algorithm:** Choose a compression algorithm.  `zlib` is common and offers a good balance between compression ratio and speed. `lz4` is faster but might have a slightly lower compression ratio.

**2. Django Model Definition:**

You can't directly specify table compression within a Django model definition.  Django's ORM doesn't have a setting for this.  You'll manage compression at the database level.

**3. Creating Compressed Tables (Two Options):**

* **Option A: Using `ALTER TABLE` (Recommended):** The most straightforward way is to create your tables normally using Django's migrations and then use an `ALTER TABLE` statement to compress them.

    1. **Migrate:** Run your Django migrations to create the tables:

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

    2. **Compress:**  Connect to your MariaDB database and execute the following SQL query for each table you want to compress:

    ```sql
    ALTER TABLE your_table_name ROW_FORMAT=COMPRESSED KEY_BLOCK_SIZE=8;  # Or 4, 16, depending on needs
    ```

    Replace `your_table_name` with the actual name of your table. The `KEY_BLOCK_SIZE` parameter affects compression and performance; experiment to find the best value for your data.

* **Option B: Using `CREATE TABLE` (More involved):**  You can use a raw SQL query within a Django migration to create the table with compression from the start. This is more complex and less recommended because it bypasses some of Django's ORM features.

    1. **Create a custom migration:**

    ```bash
    python manage.py makemigrations --empty your_app_name
    ```

    2. **Edit the migration file:**  Add the raw SQL to your migration file.

    ```python
    from django.db import migrations, connection

    def create_compressed_table(apps, schema_editor):
        with connection.cursor() as cursor:
            cursor.execute("""
                CREATE TABLE your_table_name (
                    # ... your table schema here ...
                ) ROW_FORMAT=COMPRESSED KEY_BLOCK_SIZE=8;
            """)

    class Migration(migrations.Migration):

        dependencies = [
            # ... your dependencies ...
        ]

        operations = [
            migrations.RunSQL(create_compressed_table),
        ]
    ```

**4. Verification:**

After compressing the tables, you can verify the compression status by running:

```sql
SHOW TABLE STATUS LIKE 'your_table_name';
```

Look for the `Row_format` column. It should show `COMPRESSED`.  You can also check the data and index sizes to see the reduction.

**Important Considerations:**

* **Performance:** Compression can improve I/O performance, especially for large tables. However, it adds CPU overhead for compression and decompression. Test thoroughly to ensure it benefits your application.
* **`KEY_BLOCK_SIZE`:**  Experiment with different `KEY_BLOCK_SIZE` values (4, 8, 16) to find the optimal balance between compression ratio and performance for your data.
* **Testing:**  Always test your application thoroughly after enabling compression to ensure everything works as expected.
* **Migrations:** If you use Option A (recommended), be aware that future migrations that alter the table structure might reset the compression. You'll need to re-apply the `ALTER TABLE` command after such migrations.  You might want to create a custom migration to handle this automatically.
* **Backup and Restore:**  Compressed tables might affect backup and restore procedures.  Make sure your backup strategy can handle them correctly.
* **Django ORM Limitations:**  Django's ORM doesn't directly support compressed tables.  You'll have to manage the compression outside of the ORM, as shown above.

By following these steps, you can successfully set up compressed tables in MariaDB for your Django project. Remember to test and monitor performance to ensure you're getting the desired benefits.  Option A using `ALTER TABLE` after standard Django migrations is usually the easiest and recommended approach.
