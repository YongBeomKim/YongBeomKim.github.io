---
title : CentOS 활용 및 도구설치
last_modified_at: 2019-11-21T15:45:06-05:00
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
$ useradd pythonserver
$ passwd pythonserver
pythonserver 사용자의 비밀 번호 변경 중
새  암호: 
새  암호 재입력:
passwd: 모든 인증 토큰이 성공적으로 업데이트 되었습니다.

$ userdel pythonserver
$ rm -rf /etc/pythonserver
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

## Python 3.6, ZSH, Git, Nginx, Node.js (v10.17.1)

mycli 등 의존성 문제로 3.7 에서 실행되지 않는 모듈이 아직도 많습니다. 서버의 안정적인 운영을 위해서 **[Python 3.6.3](https://bugzilla.redhat.com/show_bug.cgi?id=1739804)** 또는 **[Python 3.6.8](https://victorydntmd.tistory.com/256)** 를 설치하는 것을 추천 합니다. 안정적인 설치를 위해 **CentOS** 에서는 **yum** 모듈을 사용 합니다.

ZSH 플러그인도 추가 가능합니다. [zsh Theme](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes) 는 여기서 내용을 확인 합니다. 아래 내용으로 기본 설치를 한뒤, 추가 Theme 및 PlugIn 설치는 앞에서 정리한 **[우분투 에서 neovim-zsh 설치방법](https://yongbeomkim.github.io/ubuntu/neovim-zsh/)** 내용을 참고 하여 정리를 했습니다.

Node.js 는 React.js 등을 개발하는 경우에는 **NVM** 을 사용하는 측면이 유용하지만, 서비스 서버 등에서는 **Node.js** [직접 설치하여](https://linuxize.com/post/how-to-install-node-js-on-centos-7/) 작업의 안정성을 높이도록 합니다.

참고로 **[PostgreSQL](https://www.lesstif.com/pages/viewpage.action?pageId=31850584)** 을 설치하는 방법은 다음의 링크를 참고 합니다.

Django 최신버젼 업데이트를 하면서 **SQlite3** 버젼이 낮음으로써 오류가 발생하였고, 이를 보완하는 내용은 [StackOverFlow](https://stackoverflow.com/questions/55485858/using-sqlite3-with-django-2-2-and-python-3-6-7-on-centos7) 를 참고로 하였습니다.

```r
$ vi install_utils.sh

  # Install Git
  yum install git

  # Install Nginx
  yum install -y libxml2-devel libxml2-static libxslt libxslt-devel gd gd-devel
  wget http://nginx.org/packages/mainline/centos/7/x86_64/RPMS/nginx-1.17.6-1.el7.ngx.x86_64.rpm
  yum localinstall nginx-1.17.6-1.el7.ngx.x86_64.rpm

  # Install Node.js
  curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -
  yum install nodejs

  # Install Python 3.6
  yum -y install centos-release-scl
  yum -y install rh-python36
  . /opt/rh/rh-python36/enable # or scl enable rh-python36 bash [if interactive]
  # yum install -y python36u
  # yum install -y python36u-pip

  # Install SQlite 3.8
  wget http://www6.atomicorp.com/channels/atomic/centos/7/x86_64/RPMS/atomic-sqlite-sqlite-3.8.5-3.el7.art.x86_64.rpm
  yum localinstall atomic-sqlite-sqlite-3.8.5-3.el7.art.x86_64.rpm
  mv /lib64/libsqlite3.so.0.8.6{,-3.17}
  cp /opt/atomic/atomic-sqlite/root/usr/lib64/libsqlite3.so.0.8.6 /lib64

  # Install ZSH
  yum -y install zsh
  cd ~
  chsh -s /bin/zsh root
  sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
  
  cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
  source ~/.zshrc
  git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

$ vi /root/.bashrc
  alias python3="/usr/bin/python3.6"		

$ nvim ~/.zshrc
  ZSH_THEME="agnoster"      # 테마를 정의한다
  export LANG="ko_KR.UTF-8" # 한글 인코딩을 해결
  plugins=(
    git
    zsh-autosuggestions
    #zsh-syntax-highlighting
    history-substring-search
  )

$ souce .zshrc            # 변경된 설정을 적용
```

## Python 3.7.5

설치된 Python3.6 내용들을 확인한 뒤, 연관된 내용들을 [삭제](https://www.quora.com/How-do-I-completely-uninstall-Python-3-5) 합니다.

```r
yum list installed | grep -i python36
yum autoremove '*python36*'
```

그리고 Python 3.6 을 안전하게 설치하는 경우는 다음을 입력 합니다.`

```r
$ yum install gcc openssl-devel bzip2-devel sqlite-devel
$ yum install https://centos7.iuscommunity.org/ius-release.rpm
$ python3.6 -v
$ yum install python36u-pip
$ yum install python36u-devel
```

**[Python](https://www.python.org/downloads/)** 사이트 접속결과 **최신버젼이 3.7.5** 을 제공하고 있음을 알 수 있었습니다. 아래의 내용을 script 파일로 저장한 뒤 `$ source 스크립트파일` 을 실행하면 자동으로 설치 됩니다.

```r
$ mkdir temp
$ cd temp
$ vi install.sh

  yum groupinstall -y "Developent Tools"
  wget https://www.python.org/ftp/python/3.7.5/Python-3.7.5.tgz
  tar xzf Python-3.7.5.tgz
  cd Python-3.7.5
  ./configure --enable-optimizations
  make altinstall
  python3.7 --version
```

## MyCLI, NEOVIM

**Python 3.6** 을 설치한 뒤 사용 가능한 모듈을 설치 합니다.

```r
$ vi install_pytutil.sh
  pip3.6 install mycli
  yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
  yum install -y neovim python3.6-neovim

$ nvim ~/.myclirc
  # Screenshots at http://mycli.net/syntax
  syntax_style = monokai
  # disabled pager on startup
  enable_pager = False
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
  echo 'validate_password_policy=LOW' >> /etc/my.cnf # 보안정책 완화
  echo 'default_password_lifetime=0' >> /etc/my.cnf
  grep 'password' /var/log/mysqld.log # 초기 암호 내용의 확인

$ mysql -uroot -p
Welcome to the MySQL monitor.
Your MySQL connection id is 5
Server version: 5.7.28 MySQL Community Server (GPL)

# 암호변경
mysql> SET PASSWORD = PASSWORD('mysql1234');
mysql> flush privileges;
```

## 외부 접속자 추가 및 설정

```r
mysql > use mysql; 
mysql > SELECT Host,User,plugin,authentication_string FROM mysql.user;
+-----------+------+-----------------------+-------------------------+
| Host      | User | plugin                | authentication_string   |
+-----------+------+-----------------------+-------------------------+
| localhost | root | mysql_native_password | *8024A6913C57B924E6803A |
+-----------+------+-----------------------+-------------------------+
```
MySQL 버전이 5.7 이하에선 **authentication_string** 대신 **password** 를 사용 합니다.
{: .notice--info}

위 내용에서 보이는 것처럼, **localhost** 계정만 등록되어 있음을 알 수 있습니다. 외부에서 접속 가능한 `사용자id@%` 계정을 추가 합니다. **%** 은 외부 IP 접속 계정을 의미 합니다.

```r
mysql > grant all privileges on *.* to '계정'@'%' identified by '비밀번호'; 
# 외부에서 접속 가능한 '%' 계정을 추가 합니다
mysql > flush privileges;
mysql > SELECT host, user, authentication_string FROM user;
+-----------+------+-----------------------+-------------------------+
| Host      | User | plugin                | authentication_string   |
+-----------+------+-----------------------+-------------------------+
| localhost | root | mysql_native_password | *8024A6913C57B924E6803A |
| %         | root | mysql_native_password | *8024A6913C57B924E6803A |
+-----------+------+-----------------------+-------------------------+
# '%' 가 등록되어 있는지를 확인 합니다
mysql > exit;

$ systemctl restart mysqld
```

`echo 'validate_password_policy=LOW' >> /etc/my.cnf` 내용을 실행하지 않으면 비밀번호 설정시 [보안정책](https://kamang-it.tistory.com/entry/MySQL%ED%8C%A8%EC%8A%A4%EC%9B%8C%EB%93%9C-%EC%A0%95%EC%B1%85-%ED%99%95%EC%9D%B8-%EB%B3%80%EA%B2%BD%ED%95%98%EA%B8%B0) 의 문제로 암호설정에 신중해야 합니다. 자세한 내용을 링크를 참고 합니다.
{: .notice--info}

위 내용처럼 설정을 적용하고 나면 외부에서 접속이 가능함을 알 수 있습니다.


## Jupyter Lab

서버에서 실행되는 Jupyter 를 설치해 보도록 하겠습니다. 자세한 내용은 **[jupyter-server](https://yongbeomkim.github.io/jupyter-server/)** 에서 확인을 합니다.

```s
$ pip3.6 install jupyterlab
$ jupyter lab --generate-config
   Writing default config to: /root/.jupyter/jupyter_notebook_config.py

$ ipython
Python 3.6.8 (default, Aug 10 2019, 06:54:07) 
IPython 7.9.0 -- An enhanced Interactive Python.

In [1]: from notebook.auth import passwd
In [2]: passwd()
  Enter password:
  Verify password:
  'sha1:283....'

$ nvim ~/.jupyter/jupyter_notebook_config.py
  c = get_config()
  c.NotebookApp.password = u'sha1:283....'
  c.NotebookApp.certfile = u'/home/사용자/mycert.pem'
  c.NotebookApp.open_browser = False
  c.NotebookApp.notebook_dir = u'/home/사용자/자료폴더/'
  c.NotebookApp.ip = '*'
  c.NotebookApp.port_retries = 8080
```

기본 Theme 가 있지만, 무광의 검정으로 구성된 **[Material Darker](https://github.com/oriolmirosa/jupyterlab_materialdarker)** 테마를 추가 합니다. 참고로 **Node.js** 가 먼저 설치되어 있어야 합니다.

```r
$ jupyter labextension install @oriolmirosa/jupyterlab_materialdarker
```


<br/>

# Appendix

[Mail 서버 구축](https://y0c.github.io/2018/09/28/centos7-mail-server/)