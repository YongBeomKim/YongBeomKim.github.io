---
title : Maria DB 설치
last_modified_at: 2018-04-22T20:45:06-05:00
header:
  overlay_image: /assets/images/book/mariadb.jpg
  caption: "mariadb"
tags: 
    - mariadb
    - mysql
toc: true    
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


```
$ sudo vi /etc/mysql/conf.d/mysql.cnf
```


외부에서 접속을 위해 연결가능 Ip 주소 제한을 풀어준다

```
$ sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf

# 아래의 내용 앞에 #을 추가한다. (0.0.0.0 or * 도 가능해진다)
# bind-address = 127.0.0.1 
```


변경 내용을 적용 후 서버를 재실행 한다

```
$ sudo service mysql restart
$ mysql_secure_installation    # 새로운 설치 후 새로운 설정값을 실행한다
```


##  MariaDB 초기 비밀번호 재설정 [Blog](https://blog.naver.com/hyungjun212/221218211094)

```
$ mysql_secure_installation    # 새로운 설치 후 새로운 설정값을 실행한다
Enter current password for root (enter for none): 
ERROR 1698 (28000): Access denied for user 'root'@'localhost'
```

초기 설정 후 비밀번호 때문에 계속 문제가 발생했다.<strike>google로도 잘 못찾는 문제중 의외로 Naver를 통하면 해결되는 경우가 종종 있는데, 이번이 그런 문제였다</strike>

```
# 이걸로 강제로 접속한다 (이것도 안되면 재설치를..)
$ sudo mysql -u root mysql  

MariaDB[(none)]> USE mysql;
MariaDB[mysql]> SELECT user, plugin FROM user;
MariaDB[mysql]> UPDATE user SET plugin='';
MariaDB[mysql]> UPDATE user SET password=PASSWORD("설정 비밀번호") WHERE User='roor';
MariaDB[mysql]> FLUSH PRIVILEGES;
MariaDB[mysql]> QUIT;
```

원인은 Terminal plugin 이 설치되는 바람에 꼬여서 그렇다고 카더라...


##  MariaDB 초기 설정값 만들기 [Blog](https://suwoni-codelab.com/linux/2017/05/24/Linux-CentOS-MariaDB/)

### MariaDB 초기설정
```
$ mysql_secure_installation    # 설정을 재실행한다
```

1. 처음은 root 패스워드 설정 : **N**  
2. anonymous users 를 삭제질문 : **Y**
3. 원격지에서 root로그인 허용질문 : **N**
4. 누구든지 access할수 있는 Test db 삭제질문 : **Y**
5. 위의 변경 설정한 권한 리로드 적용 : **Y**

 
## MariaDB 완전 삭제방법

```
# 관련 프로그램들을 삭제한다
$ sudo systemctl stop mariadb
$ sudo apt-get purge mariadb-server
$ sudo apt-get purge mariadb-common

# 연관 폴더들을 삭제한다
$ sudo rm -rf /var/log/mysql
$ sudo rm -rf /var/log/mysql.*
$ sudo rm -rf /var/lib/mysql
$ sudo rm -rf /etc/mysql

# 관련된 부가 설치들을 확인후 
# sudo apt-get --purge remove 로 삭제한다
$ dpkg -l | grep -i 'maria\|mysql'
```
