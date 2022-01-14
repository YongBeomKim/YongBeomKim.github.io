---
title : MySQL Setting & Python 
last_modified_at: 2019-11-20T18:45:06-05:00
header:
  overlay_image: /assets/images/book/sqlal.png
categories:
  - python
  - sql
tags: 
    - sql
    - mysql
    - mariadb
    - python
toc: true 
---

서비스 서버를 구매하는 과정에서 설정관련 내용을 정리해 보려고 합니다. 

[참고자료](https://edu.kosslab.kr/pluginfile.php/963/mod_resource/content/0/%EA%B0%95%EC%9D%98%202.pdf)

# MySQL 설치 및 설정

```r
sudo apt-get update 
sudo apt-get install mysql-server 
sudo mysql_secure_installation 
sudo mysql -u 계정 -P 비밀번호

mysql > use mysql; 
mysql > grant all privileges on *.* to '계정'@'%' identified by '비밀번호'; 
# '%' 은 모든 IP 계정을 의미 합니다
mysql > flush privileges;

mysql > SELECT host, user, password FROM user;
# '%' 가 등록되어 있는지를 확인 합니다
mysql> exit;

sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf 
# bind-address = 0.0.0.0 

sudo /etc/init.d/mysql restart
```

# MariaDB 설치 및 설정

https://kyeoneee.tistory.com/5

https://yongbeomkim.github.io/sql/sql-mariadb/

```r
nvim /etc/my.cnf
```



https://jackerlab.com/python-pymysql/

https://kyome.tistory.com/73


SQL은 아직도 익숙치 않아서 어렵게 생각하는 부분이다.

완전하게 익숙해진 다음에 작업할 생각보다는, 조금씩 작업을 진행하면서 필요한 부분을 채워 나가보자.


## SQLalchemy 와 Pandas로 조회하기

MariaDB와 연동 및 조회 (SQLalchemy & Pandas)

```python
# DATABASE 연결
from sqlalchemy import create_engine
engine = create_engine('mysql://root:pass@localhost/DATABASE', 
           convert_unicode=True, echo=False)
conn   = engine.connect()

# Table 접속
import pandas as pd
data = pd.read_sql_table('Table', conn)
data.head()
```


<br/>

## DataFrame 객체를 Pandas로 갱신

작업의 용이성을 위해서 테이블 전체를 Update 하는 `if_exist='replace'` 설정에는 계속 오류가 발생한다. 지금 가능한건 인덱스를 추가한다

```python
import pandas as pd

# 현재 저장된 TABLE을 조회한다
table = 'Table'
data  = pd.read_sql_table(table, conn)

# 새롭게 변경할 DataFrame을 작성한다
# id를 index로 설정해야한다
data  = pd.DataFrame(columns=data.columns)
data.set_index('id', inplace=True)

# 현재 이작업만 유효하게 작동된다
# 문제는 결과가 괴랄하다는 점이다
data.to_sql(name=table, con=engine, if_exists='append', index=False)
print("Saved successfully!! \n Connection is Terminated")
conn.close()
```
