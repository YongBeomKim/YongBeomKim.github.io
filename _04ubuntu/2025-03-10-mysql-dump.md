---
layout: blog
title: (MariaDB 10.6) ERROR at line 1 Unknown command `\-.`
tags:
- mysql
---

MariaDB 에서 백업 작업을 진행하던 중 다음과 같은 오류가 발생 하였습니다.
```bash
$ sudo mycli                                                   
Connecting to socket /var/run/mysqld/mysqld.sock, owned by user mysql
MariaDB 10.6.12
MariaDB root@(none):(none)>

$ mysql -u momukji -p newmarket < ./newmarket.sql
Enter password: 
ERROR at line 1: Unknown command '\-'.

$ head -n 10 newmarket.sql   
/*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.6.18-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: newmarket
-- ------------------------------------------------------
-- Server version	10.6.18-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
```

일반적이지 않은 특정한 문제는 아직까지는 GPT 검색은 어려웠고 (대신 hint 제시는 유용하더라) 웹 검색을 통해서 해결 방법을 찾을 수 있었습니다. [MariaDB에서 "ERROR at line 1: Unknown command '-'" 오류 해결하기](https://wndud587.tistory.com/14)

문제는 생성된 `dump` 파일의 맨 앞부분 주석이 문제원인으로, `vi` 등의 텍스트 편집기를 활용하여 파일을 연 뒤, 해당 주석을 삭제한 뒤 저장한 파일로 작업을 진행하면 문제가 해결 되었습니다.
