---
layout: blog
title: OperationalError (2006, MySQL server has gone away)
tags:
- mysql
---

MariaDB 를 연결한 Django 에서 대규모 테이블을 `bulk_create` 로 업데이트할 때 다음과 같은 오류를 출력하였습니다.

```bash
django.db.utils.OperationalError: (2006, 'MySQL server has gone away')
```

원인을 찾다 보니 MySQL 서버에서 전달을 하는 Packet 사이즈가 작아서 생기는 문제 였습니다. 서버에서 Packet 사이즈를 확인해 보면 `16 Mb` 로 설정되어 있습니다.

```sql
MariaDB> SHOW VARIABLES LIKE 'max_allowed_packet';
+--------------------+----------+
| Variable_name      | Value    |
+--------------------+----------+
| max_allowed_packet | 16777216 |
+--------------------+----------+

1 row in set
Time: 0.016s
```

이 문제를 해결하는 방법이 2가지가 있습니다.

1. MySQL (MariaDB) 의 `DB 패킷 사이즈` 를 늘립니다.
2. django 에서 `bulk_create` 저장 인스턴스 크기를 축소 합니다.

1번의 방법도 있지만, 2번의 방법을 추천 합니다. 이유는 활용하는 DB 의 Packet 값이 너무 클 수록, 커넥션 즉 DB Session 작업에 소비하는 메모리 값이 커져서 오히려 서버의 부담을 가중시키기 때문 입니다. 

<br/>

# 참고사이트
- [MySQL / MariaDB 쿼리 패킷 사이즈 변경](https://89-02-07.tistory.com/74)
- [2006, 'MySQL server has gone away'](https://wangin9.tistory.com/entry/mysqlexceptionsOperationalError-2006-MySQL-server-has-gone-away)
- [ASGI, “MySQL server has gone away” and CONN_MAX_AGE](https://forum.djangoproject.com/t/asgi-mysql-server-has-gone-away-and-conn-max-age/5240)