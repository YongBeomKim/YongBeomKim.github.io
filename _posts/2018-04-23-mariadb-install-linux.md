---
title : Maria DB 설치 및 간단한 사용법 
last_modified_at: 2018-04-22T20:45:06-05:00
header:
  overlay_image: /assets/images/book/mariadb.jpg
  caption: "mariadb"
tags: 
    - mariadb
    - mysql
---


odroid xu4 에서 postgresql 설치 과정중[정식 설치방법](https://www.postgresql.org/download/linux/ubuntu/) armhf 미인식 문제로 계속 오류가 발생했다.

얼마전 특강에서 workbench를 조금 다뤄본 경험과 함께, mariaDB를 설치 한 결과 바로 설치가 되었다. (**Simple is The Best**가 구조 부분에선 정답임을 다시한번 느낄 수 있었다) 이번 기회에 설치방법과 간단한 사용법을 정리하면서 django에서 적용하는 계기로 삼아보려고 한다.


## MariaDB Installation [Document](https://mariadb.com/kb/en/library/installing-mariadb-deb-files/)[설치Blog](http://awesometic.tistory.com/14)

```
$ sudo apt-get update
$ sudo apt-get install mariadb-server
```


```
$ sudo vi /etc/mysql/conf.d/mysql.cnf
```


파일을 열면 `[Mysql]` 하나밖에 없는데, 한글을 사용하기 위해 아래의 내용으로 대체를 한다

```
# MariaDB-specific config file.
# Read by /etc/mysql/my.cnf
 
[client]
# Default is Latin1, if you need UTF-8 set this (also in server section)
default-character-set = utf8mb4
 
[mysqld]
#
# * Character sets
#
# Default is Latin1, if you need UTF-8 set all this (also in client section)
#
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
character_set_server = utf8mb4
collation_server = utf8mb4_unicode_ci
```


변경 내용을 적용 후 서버를 재실행 한다

```
$ sudo service mysql restart
```


