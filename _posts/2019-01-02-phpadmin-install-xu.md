---
title : MariaDB in phpMyAdmin
last_modified_at: 2019-01-02T10:45:06-05:00
header:
  overlay_image: /assets/images/code/phpmyadmin.png
categories:
  - mariadb
tags: 
    - mariadb
    - phpadmin
toc: true 
---

Django 등의 프로젝트를 진행하기 위해서 가장 중요한 부분이 DataBase 입니다. 처음에는 **PostgreSQL** 에 몰입을 했엇지만, raspberry Pi 등에서 설치가 안되는 문제로 인해서 MySQL 그리고 **OpenSource인 MariaDB에** 정착을 하게 되었습니다.

작년 DataBase 강의를 들으면서 **Mysql WorkBench로** 설치 및 연결을 했지만 접근성이 떨어지다 보니 모니터링도 게을리 하게 되는 등의 문제가 있었습니다. 이번에는 mariaDB의 접근성을 높여서 작업의 용이성을 높이기 위해서 **PhpMyAdmin** 를 설치하고 사용하는 내용을 정리하기 위한 페이지로 진행해 보겠습니다.

<br/>
# Description
1. PhpMyAdmin 설치하기
2. madiaDB와 연결하기

<br/>
# Introduction 
우선 MariaDB를 설치하였고, 3306 Default Port Setting 으로 연결이 되어 있습니다. 이들을 연결하기 위하여 **Apache 설정을 수동으로** 입력하고, 설치된 MariaDB 와 PhpMyAdmin 에 필요한 **부수적인 프로그램들을** ex)php 설치 연결해 보겠습니다. 우선은 아무것도 설치되어 있지 않다는 가정에서 진행합니다.

<br/>
# MariaDB
## Install
```python
$ sudo apt-get update
$ sudo apt-get install mariadb-server
```
## Settings
기타 한글설정 및 port 개방등의 설정은 기존에 정리한 페이지를 참고합니다 [MariaDb 설치하기](https://yongbeomkim.github.io/sql/mariadb-install-linux/)

<br/>
# Apache2
## Install
```python
$ sudo apt-get install apache2
```
### /etc/apache2/conf-enabled/security.conf 
`$ sudo nano /etc/apache2/conf-enabled/security.conf` 를 사용하여 설정파일을 다음과 같이 수정합니다
```php
# Set to one of:  Full | OS | Minimal | Minor | Major | Prod
# where Full conveys the most information, and Prod the least.
#ServerTokens Minimal
ServerTokens Prod
#ServerTokens Full
```
**ServerTokens** 은 서버에서 Token 공개정도를 설정하는 내용으로 설정 값은 **Prod(최소공개), Major, Minor, Min, OS, FULL(모두공개)** 단계로 설정 가능합니다. [출처](http://brocess.tistory.com/8)

### /etc/apache2/mods-enabled/dir.conf
`$ sudo nano /etc/apache2/mods-enabled/dir.conf` 를 사용하여 **기본실행 파일을** 변경합니다
```html
# 변경 전 내용
<IfModule mod_dir.c>
DirectoryIndex index.html index.cgi index.pl index.php index.xhtml index.htm
</IfModule>
```
```html
# 변경 후 내용 
<IfModule mod_dir.c>
DirectoryIndex index.html index.php index.htm
</IfModule>
```

### /etc/apache2/sites-enabled/000-default.conf
`$ sudo nano /etc/apache2/sites-enabled/000-default.conf` 로 **server 정보를** 수정합니다 <strike>하지만 이 부분은 개별설정에 따라 달리지는 부분으로 우선은 수정하지 않고 진행하겠습니다</strike>

`$ sudo systemctl restart apache2` 설정을 변경한 뒤 apache2 서버를 재실행 합니다.

<br/>
# PhP
## Install
실행에 필요한 PhP 프로그램을 설치합니다
```python
$ sudo apt-get install php php-cgi libapache2-mod-php php-common php-pear php-mbstring
```

## Apache2 와 Php 연결하기
```python
$ sudo a2enconf php7.0-cgi
$ sudo systemctl reload apache2
```

<br/>
# phpMyAdmin
## Install
```python
$ sudo apt-get install phpmyadmin php-mbstring php-gettext

 | been installed and configured, /usr/share/doc/phpmyadmin.                 |
 | Configure database for phpmyadmin with dbconfig-common?                   |
 |                                                                           |
 |                  <Yes>                   <No>                             |
 +---------------------------------------------------------------------------+
```
접속 서버프로그램은 **apache2**를 설정하고, 위와같이 자동설정 여부는 `<No>` 를 선택합니다.

## mariadb 설정연결
```sql
$ sudo mysql -u root -p mysql

Welcome to the MariaDB monitor.  Commands end with ; or \g.
Server version: 10.0.36-MariaDB-0ubuntu0.16.04.1 Ubuntu 16.04
Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

MariaDB [mysql]> update user set plugin=' 'where user='root';
Query OK, 0 rows affected (0.00 sec)
Rows matched: 1  Changed: 0  Warnings: 0

MariaDB [mysql]> flush privileges;
Query OK, 0 rows affected (0.00 sec)

MariaDB [mysql]> exit
Bye
```

<br/>
# Run phpMyAdmin
`http://서버주소:80/phpmyadmin` 로 접속해자. 단 방화벽으로 포트개방이 필요한 경우에는 기본설정값인 80번 포트를 열어줍니다. `sudo iptables -I INPUT 1 -p tcp --dport 80 -j ACCEPT`

## Run it
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/phpnot.jpg">
  <figcaption>해당 페이지를 찾을 수 없습니다</figcaption>
</figure> 
OTL은 잠시 접어두고 다음의 내용을 추가합니다

### /etc/apache2/apache2.conf
`$ sudo nano /etc/apache2/apache2.conf` 로 다음의 내용을 맨 밑에 추가합니다.

```
Include /etc/phpmyadmin/apache.conf
```

수정을 완료한 뒤 `$ sudo systemctl reload apache2` 로 아파치 서버를 재실행 한 뒤 접속을 하면 phpMyAdmin 페이지로 연결됨을 보실 수 있습니다. 

### /etc/phpmyadmin/apache.conf
`$ sudo nano /etc/phpmyadmin/apache.conf` 를 사용하여 접속 url 을 변경 가능합니다.
```php
# phpMyAdmin default Apache configuration

#Alias /phpmyadmin /usr/share/phpmyadmin
Alias /sql /usr/share/phpmyadmin
```
수정을 완료한 뒤 `$ sudo systemctl reload apache2` 로 아파치 서버를 재실행 하면 새로운 Url로 접속이 됨을 보실 수 있습니다.

<br/>
# 참고사이트
[Tutorial](https://websiteforstudents.com/install-apche2-php-phpmyadmin-ubuntu-17-04-17-10/)<br/>
[apache Server Connect](https://askubuntu.com/questions/668734/the-requested-url-phpmyadmin-was-not-found-on-this-server)<br/>
[phpMyAdmin 생활코딩](https://opentutorials.org/course/195/1469)<br/>