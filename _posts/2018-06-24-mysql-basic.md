---
title : MariaDB SQL Basic
last_modified_at: 2018-06-25T12:45:06-05:00
header:
  overlay_image: /assets/images/book/sql.jpg
categories:
  - sql
tags: 
    - sql
    - mysql
toc: true 
---


# MariaDB SQL 기본문법

<small>**모던 윕을 위한 JavaScript** 에 포함된 SQL 내용 정리</small>

<br>
## 기본 명령어

<br>
### DataBase 생성

```sql
MariaDB [(none)]>  CREATE BATABASE Company;
MariaDB [(none)]>  USE Company;
```

데이터베이스를 만들때에는 **Root 계정**을 사용한다. 다른 계정에서는 권한 문제로 작업에 제한요소가 생길 수 있다.
{: .notice--info}


<br>
### TABLE 생성
