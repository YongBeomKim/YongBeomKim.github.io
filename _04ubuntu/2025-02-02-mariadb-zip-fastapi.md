---
layout: blog
title: Compress MariaDB tables in FastAPI
tags:
- mysql
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

# Perplexity Version
To configure FastAPI with MariaDB using InnoDB Page Compression, follow these steps:

---

### Step 1: Configure MariaDB for InnoDB Page Compression
1. **Enable required settings** in `my.cnf`/`my.ini`:
   ```ini
   [mysqld]
   innodb_file_per_table=ON          # Required for compression
   innodb_compression_algorithm=lz4  # Options: zlib, lz4, lzma, snappy
   innodb_compression_level=6        # 1 (fast) to 9 (max compression)
   ```
2. **Install compression plugins** (MariaDB ≥10.7):
   ```sql
   INSTALL SONAME 'provider_snappy';  # For snappy algorithm
   ```

---

### Step 2: Create Compressed Tables in FastAPI Models
Use SQLAlchemy's `__table_args__` to enable compression for specific tables:
```python
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    __table_args__ = {
        'mysql_engine': 'InnoDB',
        'mysql_page_compressed': '1',           # Enable page compression
        'mysql_page_compression_level': '6'     # Compression level (1-9)
    }
    
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    email = Column(String(100))
```

---

### Step 3: Apply Migrations with Compression
For existing tables, use `ALTER` commands in Alembic migrations:
```python
from alembic import op

def upgrade():
    op.execute("""
        ALTER TABLE users 
        PAGE_COMPRESSED=1, 
        PAGE_COMPRESSION_LEVEL=6
    """)
```

---

### Step 4: Configure FastAPI Database Connection
Ensure your FastAPI database setup uses connection pooling optimized for compression:
```python
from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "mysql+pymysql://user:password@localhost/db_name"

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=3600,  # Recycle connections to avoid InnoDB lock issues
    connect_args={"compress": True}  # Enable protocol compression
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI()
```

---

### Step 5: Verify Compression Effectiveness
1. **Check table compression status**:
   ```sql
   SELECT NAME, PAGE_COMPRESSED, PAGE_COMPRESSION_LEVEL 
   FROM INFORMATION_SCHEMA.INNODB_TABLESPACES 
   WHERE NAME LIKE '%users%';
   ```
2. **Monitor storage savings**:
   ```sql
   SELECT 
     TABLE_NAME, 
     DATA_LENGTH/1024/1024 AS "Data Size (MB)",
     INDEX_LENGTH/1024/1024 AS "Index Size (MB)"
   FROM INFORMATION_SCHEMA.TABLES 
   WHERE TABLE_NAME = 'users';
   ```

---

### Key Considerations
- **Filesystem Support**: Ensure your OS/filesystem supports **sparse files** and **punch hole** (e.g., XFS/EXT4 on Linux, NTFS on Windows).
- **Buffer Pool Sizing**: Increase `innodb_buffer_pool_size` to accommodate decompressed data (typically 1.5x compressed data size).
- **Algorithm Tradeoffs**:
  | Algorithm | Speed | Ratio | CPU Usage |
  |-----------|-------|-------|-----------|
  | `lz4`     | Fast  | 2x    | Low       |
  | `zlib`    | Medium| 3x    | Medium    |
  | `lzma`    | Slow  | 4x    | High      |

---

### Troubleshooting
- **"Unknown table option 'PAGE_COMPRESSED'**":
  - Confirm MariaDB version ≥10.2
  - Verify `innodb_file_per_table=ON`
- **High CPU Usage**:
  - Reduce compression level (e.g., `PAGE_COMPRESSION_LEVEL=4`)
  - Switch to faster algorithms like `lz4`

By integrating these steps, you'll achieve efficient storage compression while maintaining FastAPI's performance. For large datasets, expect **2-4x storage reduction** depending on data patterns[1][6].

Citations:
[1] https://mariadb.com/kb/en/innodb-page-compression/
[2] https://minervadb.xyz/how-is-page-compression-implemented-in-innodb/
[3] https://mariadb.com/docs/server/storage-engines/innodb/operations/configure-page-compression/
[4] https://dev.to/shiviyer/tuning-innodb-for-efficient-compression-eko
[5] https://dba.stackexchange.com/questions/289814/alter-innodb-table-from-row-to-page-compression
[6] https://www.percona.com/blog/innodb-page-compression/
[7] https://dev.mysql.com/doc/refman/8.4/en/innodb-page-compression.html
[8] https://backstreet-programmer.tistory.com/178
[9] https://www.reddit.com/r/mysql/comments/u68owi/best_practiceapproach_for_separating_data_logs/
[10] https://accuweb.cloud/resource/articles/galera-cluster-limitations-and-recovery
[11] https://stackoverflow.com/questions/70573083/how-to-improve-get-query-performance-in-fastapi
[12] https://github.com/dotnet/orleans/issues/7348
[13] https://www.zabbix.com/forum/zabbix-help/447058-using-mariadb-innodb-compression-with-zabbix
[14] https://b.hatena.ne.jp/Cherenkov/follow
[15] https://stackoverflow.com/questions/35378884/mariadb-enabling-page-compression/38927341
[16] https://docs.galaxyproject.org/en/release_24.0/admin/production.html
[17] https://jaytaylor.com/notes/
[18] https://stackoverflow.com/questions/77872385/is-it-possible-to-yield-one-compressed-file-at-a-time-in-fastapi-into-a-single-a
[19] https://loadforge.com/guides/fastapi-speed-boost-essential-tweaks-and-practices
[20] https://stackoverflow.com/questions/73813029/how-to-compress-image-and-then-upload-it-to-aws-s3-bucket-using-fastapi/73815575
[21] https://fastapi.tiangolo.com/tutorial/sql-databases/
[22] https://backstreet-programmer.tistory.com/180
[23] https://stackoverflow.com/questions/10894706/mysql-compress-with-sqlalchemy
[24] https://velog.io/@judy_choi/FastAPI-5.-Database-SQLAlchemy
[25] https://velog.io/@___pepper/Fast-api-SqlAlchemy%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-DB-%EC%97%B0%EA%B2%B0
[26] https://code-angie.tistory.com/159
[27] https://codedbyjst.tistory.com/8
[28] https://stackoverflow.com/questions/tagged/database-performance?tab=newest&page=2
[29] https://pupbani.tistory.com/220
[30] https://awesome.ecosyste.ms/projects?page=4&per_page=100
[31] https://www.ldtalentwork.com/client/select_engineers/?crid=11103
[32] https://github.com/nextcloud/server/issues/25436
[33] https://www.percona.com/blog/innodb-page-compression/
[34] https://dev.mysql.com/doc/refman/8.4/en/innodb-page-compression.html
[35] https://dba.stackexchange.com/questions/289814/alter-innodb-table-from-row-to-page-compression
[36] http://www.tocker.ca/benchmarking-innodb-page-compression-performance.html
[37] https://stackoverflow.com/questions/54353754/is-innodb-compression-compatible-with-full-text-search-and-is-the-memory-compres