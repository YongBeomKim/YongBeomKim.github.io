---
title : SQL MariaDB MyCli & PhPAdmin
last_modified_at: 2019-05-11T20:45:06-05:00
header:
  overlay_image: /assets/images/book/sql.jpg
categories:
  - sql
tags: 
    - mariadb
    - mysql
toc: true     
---

odroid xu4 에서 postgresql 설치중 [정식 설치방법](https://www.postgresql.org/download/linux/ubuntu/) 을 보면 지원 가능한 시스템으로 **amd64, i386, ppc64el** 에서만 가능하여 **armhf 미인식 문제로** 계속 오류가 발생 했습니다.

얼마전 특강에서 workbench를 조금 다뤄본 경험과 함께, mariaDB를 설치 한 결과 바로 설치가 되었다. (**Simple is The Best**가 구조 부분에선 정답임을 다시한번 느낄 수 있었다) 이번 기회에 설치방법과 관련 도구들의 설치 및 사용법을 정리해 보겠습니다.

## MariaDB Installation 
[Document](https://downloads.mariadb.org/mariadb/repositories) 에서 설치 목적에 부합하는 버젼을 선택한 뒤 설치를 합니다.

```r
$ sudo apt-get update
$ sudo apt-get install mariadb-server
```

>mariadb-server : 의존: mariadb-server-10.3 (>= 1:10.3.15+maria~xenial)E: 망가진 고정 패키지가 있습니다.

**[설치Blog](http://awesometic.tistory.com/14)** 문제는 ARM CPU 에서는 지원이 제한되어 위 내용으로 설치하면 다음과 같은 오류가 발생합니다. 때문에 **[설정값을 수정](https://itsfoss.com/how-to-remove-or-delete-ppas-quick-tip/)** 하기 위해 `sudo ls /etc/apt/sources.list.d/` 에 저장된 불필요한 경로파일을 삭제하고  `sudo vim /etc/apt/sources.list` 내부의 문제가 되는 경로들을 제거한 뒤 재실행 합니다.
{: .notice--info} 

> Thread: Sub-process /usr/bin/dpkg returned an error code (1) trying to install mariaDB

설치도중 문제가 생긴 경우 위와 같은 오류를 출력합니다. `$ sudo apt-get --purge remove "mariadb*"` 등 모든 내용을 제거한 뒤 다음 절차에 따라 **[재설치를](https://ubuntuforums.org/showthread.php?t=2302804)** 하면 해결 가능합니다.

```r
$ sudo service mysql stop
$ sudo apt-get purge mariadb-server-10.0
$ sudo apt-get --purge remove "mariadb*"
$ sudo apt-get autoremove
$ sudo apt-get clean

$ sudo apt-get update
$ sudo apt-get install mariadb-server
```

우분투에 MariaDB를 처음 설치하면 캐릭터셋이 기본으로 **Latin-1** 으로 설정되어 있습니다. 한글을 사용하려면 **euc-kr** 또는 **UTF-8** 으로 기본 설정을 변경해야 합니다. 이를 변경하기 위해 [/etc/mysql/conf.d/mysql.cnf](https://jm4488.tistory.com/23) 파일을 수정 합니다.

```r
$ sudo nvim /etc/mysql/conf.d/mysql.cnf

# MariaDB-specific config fil*e.
# Read by /etc/mysql/my.cnf
 
[client]
# Default is Latin1, 
# if you need UTF-8 (server section)
default-character-set = utf8mb4
 
[mysqld]
# * Character sets
# Default is Latin1, 
# if you need UTF-8 (server section)
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
character_set_server = utf8mb4
collation_server = utf8mb4_unicode_ci
```

외부에서 접속을 위해 연결가능 Ip 주소 제한을 풀어 줍니다

```r
$ sudo nvim /etc/mysql/mariadb.conf.d/50-server.cnf

# 아래의 내용 앞에 #을 추가한다. (0.0.0.0 or * 도 가능해진다)
# bind-address = 127.0.0.1 
```

변경 내용을 적용 후 서버를 재실행 합니다. CLI 모드에선 다음 내용을 실행해도 비밀번호를 입력하는 절차로 진행이 되지 않습니다.

```r
# 새로운 설치 후 새로운 설정값을 실행
$ sudo service mysql restart
$ systemctl restart mariadb
$ mysql_secure_installation
Enter current password for root (enter for none): 
ERROR 1698 (28000): Access denied for user 'root'@'localhost'
```

##  MariaDB 초기 비밀번호 재설정 
[Blog](https://blog.naver.com/hyungjun212/221218211094) 다음의 내용대로 DataBase 내부의 값을 변경하는 방식으로 해결 가능합니다.

```sql
# 이걸로 강제로 접속한다 (이것도 안되면 재설치를..)
$ sudo mysql -u root mysql  

sql> USE mysql;
sql> SELECT user, plugin FROM user;
sql> UPDATE user SET plugin='';
sql> UPDATE user SET password=PASSWORD("설정 비밀번호") WHERE User='roor';
sql> FLUSH PRIVILEGES;
sql> QUIT;
```

##  MariaDB 초기 설정값 만들기 
[Blog](https://suwoni-codelab.com/linux/2017/05/24/Linux-CentOS-MariaDB/) 내용을 참고하여 정리를 하였습니다.

### MariaDB 초기설정

```r
$ mysql_secure_installation    # 설정을 재실행한다
```

1. 처음은 root 패스워드 설정 : **N**  
2. anonymous users 를 삭제질문 : **Y**
3. 원격지에서 root로그인 허용질문 : **N**
4. 누구든지 access할수 있는 Test db 삭제질문 : **Y**
5. 위의 변경 설정한 권한 리로드 적용 : **Y**
 
## MariaDB 완전 삭제방법 알아보기

```r
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

<br/>
# **MyCLI**
[GitHub](https://github.com/dbcli/mycli) Python 으로 제작된 모듈로써 youtube-dl, neo-vim 등과 같이 파이썬 환경에서 설치를 한 뒤, 설치 환경의 터미널에서 `$ mycli -u root` 를 실행하면 **vim** 과 같은 작업 환경이 실행 됩니다.

<figure class="align-center">
  <img src="https://i1.wp.com/wp.laravel-news.com/wp-content/uploads/2018/12/mycli-screenshot-1.png">
  <figcaption>vscode-database</figcaption>
</figure>

## 설치
```r
$ sudo pip3 install mycli
```

라즈베리파이 등에서 `$ sudo pip3` 를 실행하면 안되는 경우가 있습니다. 이 경우에는 `$ sudo apt-get remove python3-pip` 제거 후 `$ sudo apt-get install python3-pip` 로 재설치 하거나 `$python3 -m pip` 를 사용하여 필요한 명령을 실행하면 됩니다.
{: .notice--info}

## Syntex Color
**[Syntex](https://www.mycli.net/syntax)** 기본 설정값은 어두운 녹색으로 시의성이 나쁩니다. `~/.myclirc` 설정 내용을 변경하여 다양한 Syntex 파레트로 변경 가능합니다. 추천하는 테마는 **monokai** 와 **bw** 등이 있습니다. 

**[Pager](https://www.mycli.net/pager)** 기본값은 활성화로, 쿼리문을 실행하면 별도의 Page 에서 결과물이 출력됩니다. **mycli** 에서는 이를 장점으로 설명 하지만, 내용을 보기엔 불편하여 이 부분은 비 활성화 하였습니다

```r
# Screenshots at http://mycli.net/syntax
syntax_style = monokai

# disabled pager on startup
enable_pager = True
```

<br/>
# MySQL in **VSCODE**
vscode 에서도 SQL 접속에 유용한 도구들을 지원하고 있습니다. **vscode-database** 확장팩만 설치하면 되는 등 생각보다 간단한 장점이 있는 반면, **disconnect** 설정을 아직 찾지 못한 숙제가 남아있는 부분이기도 합니다.

<figure class="align-center">
  <img src="https://raw.githubusercontent.com/Bajdzis/vscode-database/master/readme/v2.0-result.gif">
  <figcaption>vscode-database</figcaption>
</figure>

## **SQLITE** in vscode

SQlite3 를 사용하는 도구로 이를 설치한 뒤, 실행을 하면 WorkSpace 내부에 있는 **sqlite db** 파일을 자동으로 찾아준 뒤 이를 연결하면 바로 내용을 확인 가능합니다. 

## **vscode-database** in vscode

**SQLite** 를 설치하면 dependancy 로 설치되는 **[vs market](https://marketplace.visualstudio.com/items?itemName=bajdzis.vscode-database)** 모듈을 활용하여 **mysql** 등의 연결이 가능 합니다. 보다 자세한 사용방법은 **[웹문서](https://vscode.tistory.com/entry/SQL-Server-mssql#recentEntries)** 의 내용을 참고 하면 됩니다.


**Mysql** 설정 연결을 시도하면 **connect_to localhost port 52698: failed** [오류](https://github.com/Microsoft/vscode/issues/50172) 가 발생하는 경우에는 [Remote VSCode](https://marketplace.visualstudio.com/items?itemName=rafaelmaiolla.remote-vscode) 와 충돌로 발생하는 것으로 이를 제거 후 실행하면 됩니다.
{: .notice--infos} 

<br/>

# **PHP Admin**
작년 DataBase 강의를 들으면서 **Mysql WorkBench로** 설치 및 연결을 했지만 접근성이 떨어지다 보니 모니터링도 게을리 하게 되는 등의 문제가 있었습니다. 이번에는 mariaDB의 접근성을 높여서 작업의 용이성을 높이기 위해서 **PhpMyAdmin** 를 설치하고 사용하는 내용을 정리하기 위한 페이지로 진행해 보겠습니다.

우선 MariaDB를 설치하였고, 3306 Default Port Setting 으로 연결이 되어 있습니다. 이들을 연결하기 위하여 **Apache 설정을 수동으로** 입력하고, 설치된 MariaDB 와 PhpMyAdmin 에 필요한 **부수적인 프로그램들을** ex)php 설치 연결해 보겠습니다. 우선은 아무것도 설치되어 있지 않다는 가정에서 진행합니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/phpmyadmin.png">
  <figcaption>해당 페이지를 찾을 수 없습니다</figcaption>
</figure> 

## Apache2 Install

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

## PhP Install
실행에 필요한 PhP 프로그램을 설치합니다

```r
$ sudo apt-get install php php-cgi libapache2-mod-php php-common php-pear php-mbstring
```

## Apache2 와 Php 연결하기
```r
$ sudo a2enconf php7.0-cgi
$ sudo systemctl reload apache2
```

<br/>
## PHP MyAdmin Install

```r
$ sudo apt-get install phpmyadmin php-mbstring php-gettext

|been installed and configured, /usr/share/doc/phpmyadmin.|
|Configure database for phpmyadmin with dbconfig-common?  |
|                                                         |
|             <Yes>                   <No>                |
+---------------------------------------------------------+
```
접속 서버프로그램은 **apache2**를 설정하고, 위와같이 자동설정 여부는 `<No>` 를 선택합니다.

## mariadb 설정연결

```sql
$ sudo mysql -u root -p mysql

sql> update user set plugin=' 'where user='root';
Query OK, 0 rows affected (0.00 sec)
Rows matched: 1  Changed: 0  Warnings: 0

sql> flush privileges;
Query OK, 0 rows affected (0.00 sec)

sql> exit
Bye
```

## Run phpMyAdmin
`http://서버주소:80/phpmyadmin` 로 접속해자. 단 방화벽으로 포트개방이 필요한 경우에는 기본설정값인 80번 포트를 열어줍니다. `sudo iptables -I INPUT 1 -p tcp --dport 80 -j ACCEPT`

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/phpnot.jpg">
  <figcaption>해당 페이지를 찾을 수 없습니다</figcaption>
</figure> 
OTL은 잠시 접어두고 다음의 내용을 추가합니다

### /etc/apache2/apache2.conf
`$ sudo nano /etc/apache2/apache2.conf` 로 다음의 내용을 맨 밑에 추가합니다.

```r
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
**[Tutorial](https://websiteforstudents.com/install-apche2-php-phpmyadmin-ubuntu-17-04-17-10/)**<br/>
**[Apache Server Connect](https://askubuntu.com/questions/668734/the-requested-url-phpmyadmin-was-not-found-on-this-server)**<br/>
**[PhPMyAdmin 생활코딩](https://opentutorials.org/course/195/1469)**