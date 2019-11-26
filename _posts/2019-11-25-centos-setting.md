---
title : CentOS 활용 및 도구설치
last_modified_at: 2019-05-05T15:45:06-05:00
header:
  overlay_image: /assets/images/book/centos.jpg
categories:
  - linux
tags: 
    - linux
    - centos
toc: true    
---

KT 1달반 무료 서버를 작업하면서, **CentOS** 에 대한 내용을 한번 더 정리해 보겠습니다. Ubuntu 에 익숙한 만큼 명령어들이 익숙하지 않아서 재정리를 하게 되었습니다. 이번에는 MySQL 설정 및 연결 내용 까지 정리를 하겠습니다.

<br/>

# 클라우드 서버

## 서버의 신청

1. **[Kosslab 서버신청](http://community.kosslab.kr/Orders/SvcMng)**
2. **[Kosslab 디딤설정](http://center-kosslab_community.didim365.com/cloud/server.php)**
3. **[Kosslab 매뉴얼](http://frontier.kosslab.kr/Manual/CloudManual)**

위 내용을 바탕으로 **Core 2v, 2Gb, 20Gb SSD HDD** 를 1달 반 신청하였습니다.

## root 비밀변호 변경

**sudo 사용자** 정보를 입력 및 수정 합니다.

```r
root@server ~ sudo passwd root
새 암호:

root@server ~ cat /etc/*release*
CentOS Linux release 7.6.1810 (Core) 
Derived from Red Hat Enterprise Linux 7.6 (Source)

root@server ~ getconf LONG_BIT
64
```

## 사용자 추가

**추가 사용자** 정보를 입력 및 수정 합니다.

```r
root@server ~ useradd pythonserver
root@server ~ passwd pythonserver
pythonserver 사용자의 비밀 번호 변경 중
새  암호: 
새  암호 재입력:
passwd: 모든 인증 토큰이 성공적으로 업데이트 되었습니다.

root@server ~ userdel pythonserver
root@server ~ rm -rf /etc/pythonserver
```

사용자를 추가 후 비밀번호를 입력해야 작업이 완료 됩니다. 사용자 폴더는 위 작업과 별도로 `/home/python` 폴더를 수동으로 삭제 하면 됩니다.

## sudoer 추가하기

. 추가된 사용자가 `sudo 사용자` 명령을 사용 가능하기 위해선 **[sudoer](https://firstboos.tistory.com/entry/sudo-user-%EC%B6%94%EA%B0%80)** 에 개별 사용자를 추가 해야 합니다.

```r
$ sudo visudo
   ## Allow root to run any commands anywhere
   root    ALL=(ALL)   ALL 
   pythonserver  ALL=(ALL)   ALL 
```

<br/>

# Cent OS Utils

## YUM

CentOS 는 **apt-get** 대신에 **yum** 을 사용합니다. **[YUM](http://www.incodom.kr/Linux/%EA%B8%B0%EB%B3%B8%EB%AA%85%EB%A0%B9%EC%96%B4/yum)** 은 **Yellowdog Updater Modified** 의 약자로, RPM 기반의 시스템 패키지 도구입니다. **Duke 대학교의 물리학과** 에서 사용하는 Red Hat Linux 시스템의 관리를 편하게 하기 위해 만들어 졌다고 합니다.

```r
* yum check-update : 인스톨된 프로그램 업데이트 체크
* yum clean all : 캐시 모두 지웁니다
* yum deplist : yum 패키지 의존성 테스트
* yum downgrade 패키지 : yum 패키지 다운그레이드
* yum erase 패키지 : yum 시스템 삭제
* yum groupinfo 그룹 : 그룹 패키지 정보
* yum groupinstall 그룹 : 그룹 패키지 설치
* yum grouplist 그룹 : 그룹 리스트 정보 확인
* yum groupremove 그룹 : 그룹 리스트 삭제
* yum help : yum 도움말 확인
* yum info 그룹 또는 패키지 : 패키지 내용 확인
* yum install 패키지 : 패키지 Install
* yum list : 설치된 그룹 및 패키지의 리스트
* yum localinstall 패키지 : 로컬에 설치
* yum makecache : 캐쉬를 다시 올립니다.
* yum provides FilePath명 : 파일 패키지 정보
* yum reinstall 패키지 : 패키지 재설치
* yum update 패키지 : 패키지 업데이트
* yum upgrade 패키지 : 패키지 업그레이
* yum search 키워드 : 키워드로 패키지 검색
```

## Git

**yum** 모듈을  사용하면 다음과 같이 쉽게 설치 가능합니다.

```s
$ yum install git
```

## Python 3.7.5

**[Python](https://www.python.org/downloads/)** 사이트 접속결과 **최신버젼이 3.7.5** 을 제공하고 있음을 알 수 있었습니다. 아래의 내용을 script 파일로 저장한 뒤 `$ source 스크립트파일` 을 실행하면 자동으로 설치 됩니다.

```r
$ mkdir temp
$ cd temp
$ touch install.sh
$ vi install.sh

  yum groupinstall -y "Developent Tools"
  wget https://www.python.org/ftp/python/3.7.5/Python-3.7.5.tgz
  tar xzf Python-3.7.5.tgz
  cd Python-3.7.5
  ./configure --enable-optimizations
  make altinstall
  python3.7 --version
```

<br/>

# MySQL

## Install

**MySQL 5.6** 부터 **yum** 을 통한 설치를 지원합니다. 설치에 필요한 **[rpm 파일](https://dev.mysql.com/downloads/repo/yum/)** 목록을 해당 사이트에서 확인 후 설치 합니다.

```r
$ vi install_mysql.sh

  rpm -ivh https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
  yum search mysql-community
  yum install mysql-community-server
  systemctl start mysqld              # 서버 활성화
  systemctl enable mysqld             # 시스템 부팅시 시작 활성화
  systemctl restart mysqld
  # echo 'validate_password_policy=LOW' >> /etc/my.cnf # 보안 정책의 추가
  # echo 'default_password_lifetime=0' >> /etc/my.cnf
  grep 'password' /var/log/mysqld.log # 초기 암호 내용의 확인

$ mysql -uroot -p
Welcome to the MySQL monitor.
Your MySQL connection id is 5
Server version: 5.7.28 MySQL Community Server (GPL)

mysql> SET PASSWORD = PASSWORD('mysql1234');
mysql> flush privileges;
```

## 















```s
$ mycli -h 210.114.91.91 -u username 
(2003, "Can't connect to MySQL server on '210.114.91.91' (timed out)")
```

<br/>

# 리눅스 확인

## 리눅스 정보 확인

여러가지 방법이 있지만 가장 보편적인 접근방법으로 터미널에서 `cat /etc/*release*` 를 입력 합니다. 그리고 우분투 bit 를 확인하는 명령은 `getconf LONG_BIT` 입니다. 

```php
[user@localhost ~]$ sudo passwd root
암호:

[root@localhost ~]# cat /etc/*release*
CentOS Linux release 7.3.1611 (Core) 
Derived from Red Hat Enterprise Linux 7.3 (Source)

[root@localhost ~]# getconf LONG_BIT
64

[root@localhost ~]# exit
[user@localhost ~]$ su
```

**$ su** 를 입력하면 관리자 계정으로 로그인 됩니다. 별도의 **sudo** 입력이 없어도 관리자 내용을 입력 및 실행 가능합니다. 관리자 계정 변경이 성공하면 터미널 앞의 표시가 **$** 에서 **#** 로 변경 됩니다.
{: .notice--info}


## **scp** 파일 이동

기본 Port 가 아닌 제공하는 포트를 사용하는 경우 작업 방법 입니다.

```php
$ scp -P 포트번호 *.mp4  /home/user/Download/
```

<br/>
# 사용자 추가

## 터미널에서 추가, 삭제

```javascript
[root]# useradd python
[root]# passwd python
erdos 사용자의 비밀 번호 변경 중
새  암호: 
새  암호 재입력:
passwd: 모든 인증 토큰이 성공적으로 업데이트 되었습니다.

[root]# userdel python
[root]# rm -rf /etc/python
```
사용자를 추가 후 비밀번호를 입력해야 작업이 완료 됩니다. 사용자 폴더는 위 작업과 별도로 `/home/python` 폴더를 수동으로 삭제 해야 합니다.

<br/>

# Python

제공받은 CentOS 서버에서는 **Pytho2** 만 실행되고 **Python3** 는 실행되지 않는 환경 이었습니다. 필요한 도구들을 설치해 보도록 하겠습니다. 뒤에서 설치할 **NeoVim, MyCLI** 등 도구의 실행을 위해서도 **Python3.6** 등이 먼저 설치 되어야 합니다.

## Python 3.6

우선 기본적인 실행에 필요한 **Python 3.6** 을 설치해 보도록 하겠습니다. **[CentOS 에서 Python](https://snowdeer.github.io/python/2018/02/20/install-python3-on-centos/)** 설치하는 방법을 참고하여 Python 3.6 을 추가 합니다. 

```r
$ yum install -y https://centos7.iuscommunity.org/ius-release.rpm
$ yum install -y python36u python36u-libs python36u-devel python36u-pip
$ yum search python3.6
```

## Jupyter Lab

서버에서 실행되는 Jupyter 를 설치해 보도록 하겠습니다. 자세한 내용은 **[jupyter-server](https://yongbeomkim.github.io/jupyter-server/)** 에서 확인을 합니다.

```s
$ pip3.6 install jupyterlab
$ jupyter lab --generate-config
   Writing default config to: /root/.jupyter/jupyter_notebook_config.py

$ nvim ~/.jupyter/jupyter_notebook_config.py
c = get_config()
c.NotebookApp.password = u'sha1:283....'
c.NotebookApp.certfile = u'/home/사용자/mycert.pem'
c.NotebookApp.open_browser = False
c.NotebookApp.notebook_dir = u'/home/사용자/자료폴더/'
c.NotebookApp.ip = '*'
c.NotebookApp.port_retries = 8888
```


<br/>

# Install Tools

## Git

```s
$ yum install git
```

## MySQL

현재 작업서버는 Mysql 이 설치되어 있는 환경입니다. 새로 설치를 필요로 하는 경우에는 **[MariaDB 설치](https://yongbeomkim.github.io/sql/sql-mariadb/)** 내용을 참고 합니다. 실행을 하면 다음과 같은 오류가 발생하였습니다. **[아래의 내용을](https://superuser.com/questions/603026/mysql-how-to-fix-access-denied-for-user-rootlocalhost)** 따라 하면서 MySQL 관리용 서버에 암호등 사용자 정보를 추가하면 됩니다. 작업을 완료 한 뒤 관리용 도구인 **[MyCLI](https://yongbeomkim.github.io/sql/sql-mariadb/)** 등을 설치 합니다.

```s
$ mysql -r root                           
ERROR 2002 (HY000): MySQL socket '/var/lib/mysql/mysql.sock' (2)

$ service mysqld start
Starting mysqld : = AUTHENTICATING systemd1.manage-units =
Password: 
==== AUTHENTICATION COMPLETE ===

$ mysql -r root
ERROR 1044 (42000): Access denied ''@'localhost' to 'root'
```

root 사용자 까지 실행 되어도 **MySQL** 에서 password 설정이 없어서 접근이 불가능 합니다.  모든 권한을 무시한 채 관리자 DataBase 에 점근하여 사용자 정보를 추가한 뒤 재실행을 하면 됩니다.

```s
$ mysqld --skip-grant-tables
[Warning] One can only use the --user switch if running as root

$ mysql -u root mysql
Server version: 5.6.31 MySQL Community Server (GPL)

sql> UPDATE user SET Password=PASSWORD('암호내용') where USER='root';
sql> FLUSH PRIVILEGES;
sql> \q

$ service mysqld start
```

## MyCLI

MySQL 터미널에서 실행시 자동완성을 도와주는 모듈 입니다. 자세한 내용은 앞에 **[정리한 내용](https://yongbeomkim.github.io/sql/sql-mariadb/)** 을 참고 합니다. 여기선 설치에 필요한 내용들을 요약해 보겠습니다.

```s
$ su
$ pip3.6 install mycli
$ nvim ~/.myclirc

# Screenshots at http://mycli.net/syntax
syntax_style = monokai
# disabled pager on startup
enable_pager = False
```

## NeoVim

**[NeoVim 정식설치](https://github.com/neovim/neovim/wiki/Installing-Neovim)** 문서를 참고하여 내용을 추가 합니다.

```python
$ yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
$ yum install -y neovim python3.6-neovim
```

설정을 위한 `init.vim` 파일이 보이지 않습니다. **[참고 사이트](https://medium.com/@akila1001/easy-steps-to-install-neovim-in-centos-b90599164379)** 

```
$ nvim .config/nvim/init.vim 
```

관련 설정파일을 생성한 뒤, **[우분투](https://yongbeomkim.github.io/ubuntu/neovim-zsh/)** 설정 내용을 그대로 붙여 넣은 뒤 실행을 합니다. 실행을 하면 새로운 플러그 인들이 설치된 모습을 볼 수 있습니다.

## Zsh

아래 내용으로 기본 설치를 한뒤, 추가 Theme 및 PlugIn 설치는 앞에서 정리한 **[우분투 에서 neovim-zsh 설치방법](https://yongbeomkim.github.io/ubuntu/neovim-zsh/)** 내용을 참고 합니다.

```r
$ yum -y install zsh
$ cd ~
$ chsh -s /bin/zsh root
$ sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
$ cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
$ source ~/.zshrc
```