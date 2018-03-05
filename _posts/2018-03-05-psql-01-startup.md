---
title : PostgreSQL 01 - 시작하기
last_modified_at: 2018-03-05T11:45:06-05:00
tags: 
    - postgresql
gallery:
  - image_path: /assets/images/photo/20180131_img02.jpg
    alt: "placeholder image 2"
---


그동안 sqlite3로 대충 버텨 왔지만, 
서비스를 구축하기 위해선 본격적으로 DB를 운영을 해야하는
현실에 직면해 있고, 

**mysql의 workbench** Entity 설계 부분으로 흔들리기도 했지만 
<strike>(그러면서 돈주고 이번주 토요일 세미나는 신청했다)</strike>

무료라는 강력한 장점과 함께, 
여러 공개된 블로거 분들의 자료들을 모아서
잘 한번 버무려 보려고 한다. 
<strike>(사람들이 다들 좋다고 하니까 해볼려는 거다. 왜인지는 이제 알아가려는 건 함정..)</strike>


### PostgreSQL CLI

```
$ sudo -u postgres psql
```

보안과 psql 철학을 이유로 사용자를 **postgres** 변경한 뒤 **psql**를 실행한다

1. -u : user Id (사용자를 postgres 로 변경한다)

**Please Note:** 사용자변경과 프로그램 실행을 같이 하면, 
프로그램 종료시 사용자도 함께 빠져나와 편하다{: .notice--danger}

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/psql/structure.png){: .align-center}

<figure class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/psql/structure.png" alt="">
  <figcaption>출처:https://blog.naver.com/alice_k106/220847310053</figcaption>
</figure> 

**CREATE DATABASE mydb**로 최상단의 DATABASE가 생성된다.
바로 아래 계층에 **schema**를 구분함으로써 (default : public)

1. 여러 사용자들이 접속시 충돌을 최소화 하는 설계가 가능 
2. 논리 DB를 분리하여 **관리용이성/ 충돌방지** 설계가 가능
3. 개별 schema 간은 **Join**을 통해서 통합적 관리에 용이


### PostgreSQL 사용하기

#### 1 DATABASE 목록 확인
```sql
postgres=# \l
```







```
     =# createdb quent        # DB 생성
     =# \c quent              # quent DB로 변경
quent=#  CREATE TABLE tbl_tea # TABLE 생성
             (id int, name STR
quent=#  DROP TABLE tbl_tea   # TABLE 삭제
quent=#  DROP DATABASE quent  # DB삭제
```
