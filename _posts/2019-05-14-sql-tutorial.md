---
title : SQL and JOIN by 생활코딩
last_modified_at: 2019-05-14T12:45:06-05:00
header:
  overlay_image: /assets/images/book/sql.png
categories:
  - sql
tags: 
    - sql
    - mysql
toc: true
---

**[생활코딩 DataBase MySQL](https://www.youtube.com/playlist?list=PLuHgQVnccGMCgrP_9HL3dAcvdt8qOZxjW)** 의 내용을 바탕으로 정리 하였습니다. 그리고 기본적인 명령어는 **[Mysql Cheat Sheet](http://www.mysqltutorial.org/mysql-cheat-sheet.aspx)** 을 참고 합니다.

<br/>
# **MariaSQL, MySQL**

Django 등 기본적인 크롤링 등의 작업에서 **Sqlite3** 를 독립적으로 활용하지만, 웹 서비스에는 부족한 만큼 SQL 내용에 대해 명확하게 정리 하겠습니다. 다음은 DataBase 를 실행하는 방법 입니다.

1. **[MariaDB 설치](https://yongbeomkim.github.io/sql/mariadb-install-linux/)**
2. **[MariaDB 기본문법](https://yongbeomkim.github.io/sql/mysql-basic/)**
3. **[MySQL 의 Django 연결](https://yongbeomkim.github.io/sql/mariadb-in-django-01/)**
4. **[MySQL 의 PhP Admin 연결](https://yongbeomkim.github.io/mariadb/phpadmin-install-xu/)**

**Please Note:** mysql Workbench 를 우분투에서 설치하는 경우 [https://dev.mysql.com/downloads/file/?id=474211](https://dev.mysql.com/downloads/file/?id=474211) 에서 deb 파일을 다운 후 설치하면 됩니다
{: .notice--info}

<br/>
# **DataBase 개념**

```sql
$ mysql -u 사용자이름 -p
Enter password: 

# 사용자 비밀번호 변경
mysql> SET PASSWORD = PASSWORD('12345');

mysql> CREATE DATABASE [IF NOT EXISTS] 데이터베이스_이름;
Query OK, 1 row affected (0.00 sec)

mysql> SHOW DATABASES;
+-------------------+
| Database          |
+-------------------+
| 데이터베이스_이름 |
+-------------------+

mysql> USE 데이터베이스_이름;

mysql> DROP TABLE 테이블_이름;
Query OK, 0 rows affected (0.01 sec)

mysql> DROP DATABASE 데이터베이스_이름;
Query OK, 0 rows affected (0.01 sec)

# 테이블의 이름을 변경
mysql> RENAME TABLE 테이블_이름 TO 테이블_이름
```

**개별 데이터베이스 환경으로 변경** 을 한 뒤, **작업할 테이블을 특정하며** 명령을 합니다, 위 처럼 데이터베이스를 생성 및 관리자 제어를 하는 경우에는 **Root 계정**을 사용 합니다.
{: .notice--info}

**[생활코딩 DataBase MySQL](https://www.youtube.com/playlist?list=PLuHgQVnccGMCgrP_9HL3dAcvdt8qOZxjW)** 의 개념과 용어들 부터 명확하게 정리를 하겠습니다.

MySQL 의 전체적인 [명령어 요약](http://www.mysqltutorial.org/mysql-cheat-sheet.aspx) 은 **Mysql Cheat Sheet** 로 검색을 하면 좋습니다.

1. DataBase **SERVER**
2. **Schema :** DB 구조와 제약조건을 기록한 **메타데이터 집합**
   1. **DB의 구조적 특성** 을, **인스턴스** 로 규정
   2. 수업은 **테이블의 묶음 폴더** 로 **사용자와 테이블의 차등적 권한부여** 로 압축하여 설명
   3. 사용자가 **External Schema(외부 스키마)** 를 입력하면, **Conceptual Schema(개념 스키마)** 과정에서  번역 후, **Internal Schema(내부 스키마)** 로 **물리적 저장장치 입장으로** 새로운 구조를 생성 및 실행 합니다.
3. **Table :** 표로써 **Column(열)** 과 **row,record(행)** 으로 구성 

<br/>
# **Table & CRUD**

## **Table 의 생성**

Django 에서 모델을 생각하면 됩니다. 줄 바꿈을 하면 마지막에 **;** 를 꼭 붙여야 실행 됩니다. **(Javascript 와 비슷 합니다.)**

```sql
CREATE TABLE topic(
    id INT(11) NOT NULL  AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT NULL,
    created DATETIME NOT NULL,
    author VARCHAR(15) NULL,
    profile VARCHAR(200) NULL,
    PRIMARY KEY(id));
```

| **자료형**   | 설명         |
|:-----------: | :----------: |
| VARCHAR      | 문자열       |
| INT          | 정수 숫자    |
| DOUBLE       | 실수 숫자    |


| **필드속성**   | 설명          |
| :-------------:| :-----------: |
| NOT NULL       | 반드시 입력   |
| AUTO_INCREMENT | 자동증감      |
| PRIMARY KEY    | 기본키 지정   |

지금까지 작업한 내용을 간단하게 복습 합니다.

```sql
# 사용자가 원하는 데이터베이스로 전환
mysql> SHOW DATABASES;
mysql> USE 데이터베이스_이름;

# 테이블의 구조를 확인하고 컬럼을 추가합니다
# NOW() 는 현재시간을 기록합니다
# 입력은 Tuple 단위로 생성, 입력 됩니다
mysql> SHOW TABLES;
mysql> DESC 테이블_이름; 
```

## **Create :** INSERT

```sql
mysql> INSERT INTO 테이블_이름 (필드명1, 필드명2, 필드명3, ...) 
       VALUES ('1번필드 입력내용', '2번필드 입력내용', NOW(), ...); 
```

## **Read :** SELECT

아래의 명령에서 * 는 모든 필드를 의미 합니다

```sql
mysql> SELECT * FROM 테이블_이름;
```

조건을 추가하는 경우, **FROM** 뒤에 입력을 합니다. 이처럼 어떤 내용을 어디에 입력하는지 여부가 중요합니다.

```sql
mysql> SELECT id, title, created, author FROM 테이블_이름 
       WHERE author='python'
       ORDER BY id DESC
       LIMIT 2;
```

## **Update :** UPDATE

다음의 내용을 실행하면 2번 ROW 에 해당 필드 값들이 변경 됩니다. 주의할 점은 꼭 **WHERE** 와 같은 조건을 덧붙여야 합니다.

```sql
mysql> UPDATE 테이블_이름 SET 
    필드명1 = '변경내용1'
    필드명2 = '변경내용2' 
    WHERE id=2;
```

## **Delete :** DELETE

여기에서도 **WHERE** 조건으로 **작업 대상을 특정하지 않으면** 전체가 변경 됩니다.

```sql
mysql> DELETE FROM 테이블_이름 WHERE id=5;
Query OK, 1 row affected (0.01 sec)

mysql> SELECT * FROM 테이블_이름;
```

## **Filter :** WHERE

데이터베이스는 대상이 큰 만큼 **READ, UPDATE, DELETE** 작업의 진행시, 대상을 명확하게 지정해야 합니다. 이를 위해 사용하는 조건문이 **WHERE** 이고 이를 도와주는 다양한 필터들이 있습니다.

**LIKE** 는  **문자열 일부와 일치** 조건을 사용할 때 활용 합니다.

```sql
# 문자와 일치하는 내용을 특정
mysql> SELECT * FROM 테이블 이름
    WHERE (필드명="문자내용") OR (필드명="문자내용");

# 010 으로 시작
mysql> SELECT * FROM products
     WHERE modelnumber LIKE '010%';

# ___ : 3글자 더 붙는 조건
mysql> SELECT * FROM products
    WHERE modelnumber LIKE '010___'; 
```

| 연산자         | 설명          |
|:--------------:|:-------------:|
| =              | 동등 조건     |
| != 또는 <>     | 서로 다름     |
| <, >, <=, >=   | 크기 비교     |
| OR             | 논리합        |
| AND            | 논리곱        | 
| % (LIKE)       | 시작값 조건   |
| _              | _ 1개당 1글자 |

<br/>
# **관계형 데이터베이스 (추상화)**

필드 내 데이터가 중복되지 않도록 **모델의 추상화 작업을** 추가하면 성능이 향상 됩니다. **Foreign key** 테이블과 **Primary Key** 테이블로 저장한 뒤, **[JOIN](https://www.youtube.com/watch?v=U8FWvjaQBDs)** 명령으로 두 테이블을 합친 1개의 테이블 처럼 데이터를 활용 할 수 있습니다.

## **JOIN**

2개의 테이블을 합쳐서 1개의 테이블을 생성하는 명령으로, 종류는 다음과 같습니다.
1. **OUTTER JOIN :** 매칭되는 행이 없으면 NULL로 표시하여 결과를 출력 
   1. **LEFT JOIN** 과 **RIGHT JOIN** 이 있습니다.
2. **INNER JOIN :** 두개의 테이블 **모두에 데이터가 존재하는 행에** 대해서만 결과 출력

```sql
mysql> SELECT * FROM 데이터베이스 
    LEFT JOIN author                 # 기본 Key 테이블
    ON topic.author_id = author.id;  # 결합 기준
```

위 내용을 실행하면 **author, topic** 테이블의 id 가 동일한 이름으로 출력 됩니다. 이때문에 **WHERE** 조건을 사용하면 `ERROR 1052 (230000) Column 'id' in Field list is ambiguous` 오류가 출력됩니다. 

## **OUTER JOIN :**  LEFT JOIN

> **FROM** `기준 테이블` **LEFT JOIN** `가져올_테이블` **ON** `결합기준의 내용`

즉 **왼쪽에 정의한 테이블을 기준으로** 결합된 결과물을 생성 합니다.

```sql
mysql> SELECT topic.id, AS topic_id, title, name, profile
    FROM topic 
    LEFT JOIN author
    ON topic.author_id = author.id; 
```

이를 위해 중복되는 필드 이름을 변경하는 작업으로 **SELECT** `필드명` **AS (Alias)** `변경할 내용`, 과 같이 필드명을 다르게 구분한 뒤 작업을 진행합니다.

```sql
mysql> SELECT s.name, s.location_id, l.name AS address, l.distance  
    FROM student AS s 
    LEFT JOIN location AS l 
    ON s.location_id = l.id
    WHERE l.distance >= 100;
```

## **INNER JOIN :**  INNER JOIN

**LEFT JOIN** 과 동일한 기준으로 작업한 결과, **NULL** 값이 생성된 row 들은 제외하고, 나머지를 출력 합니다.

```sql
mysql> SELECT s.name, s.location_id, l.name AS address, l.distance  
    FROM student AS s 
    INNER JOIN location AS l 
    ON s.location_id = l.id
    WHERE l.distance >= 100;
```
