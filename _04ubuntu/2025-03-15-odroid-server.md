---
layout: blog
title: (Odroid H3) 서버 설치하기
tags:
- Linux
---

운영체제의 강제 Update 로 인한 시스템 파일 손상으로 새롭게 포맷 후 구동을 준비하고 있습니다. 이번에는 기존의 `apt install` 을 활용한 설치에 의존했다면 이번에는 최대한 최신버젼 및 사용자가 원하는 버젼의 프로그램을 설치하는 방법에 대하여 알아보도록 하겠습니다.

아래의 내용은 우분투 실행 스크립트를 작성한 뒤 우분투 환경에서 실행하는 내용 입니다. 사용자가 실행하려는 내용을 텍스트 파일로 모아서 정리한 뒤 저장 합니다. (`python.sh`), 해당 파일을 실행 스크립트로 동작할 수 있도록 권한을 추가한 뒤 (`sudo chmod +x`) 실행을 하면 됩니다.
```bash
sudo chmod +x python.sh
nohup sudo ./python.sh &!
tail -10 nohup.out
```

- [Nginx](#nginx)
  - [Introdiction](#introdiction)
  - [Install](#install)
- [Python](#python)
  - [Install](#install-1)
- [MariaDB](#mariadb)
  - [Install](#install-2)
  - [Setting](#setting)
  - [Root 사용자 설정](#root-사용자-설정)
  - [사용자 추가](#사용자-추가)
  - [데이터베이스와 사용자 연결](#데이터베이스와-사용자-연결)
  - [외부에서 연결하기](#외부에서-연결하기)
- [transmission-daemon](#transmission-daemon)
  - [필수 패키지 설치](#필수-패키지-설치)
  - [Transmission 소스 코드 다운로드](#transmission-소스-코드-다운로드)
  - [빌드 디렉토리 생성 및 이동](#빌드-디렉토리-생성-및-이동)
  - [CMake를 사용하여 빌드 구성](#cmake를-사용하여-빌드-구성)
  - [컴파일 및 설치](#컴파일-및-설치)
  - [시스템 서비스 파일 생성](#시스템-서비스-파일-생성)
  - [웹 인터페이스 활성화](#웹-인터페이스-활성화)
- [참고사이트](#참고사이트)
- [SFTP](#sftp)
  - [Install](#install-3)
- [transmission-daemon](#transmission-daemon-1)
  - [Install by Apt](#install-by-apt)
  - [Remove](#remove)
  - [Install by Snap](#install-by-snap)
      - [transmission-daemon 설치](#transmission-daemon-설치)
- [Docker](#docker)
  - [Install Docker](#install-docker)
  - [CLI run](#cli-run)

<br/>

# Nginx
## Introdiction
[Nginx 공식 홈페이지](https://nginx.org/en/download.html)를 방문하면 다음과 같은 버젼에 따른 설명을 볼 수 있습니다.
- Mainline version - (메인라인 버전 : 가장 최신 및 개선사항 포함)   > nginx-1.27.4
- Stable version   - (안정 버전 : Mainline 중 충분히 검증된 버전) > nginx-1.26.3
- Legacy versions  - (레거시 버전 : 공식 지원 종료 버젼)          > nginx-1.24.0

`ubuntu 22.04` 기본저장소를 활용하여 설치하면 `Legacy versions` 이 설치되어 있음을 확인하였습니다.
```bash
nginx -v
  nginx version: nginx/1.24.0
```

## Install
이번에는 `Stable` 버젼을 설치하는 방법에 대하여 알아보도록 하겠습니다. `Nginx Stable` 저장소 주소를 가져온 뒤 설치작업을 진행하는 내용 입니다.
```bash
curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null

echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/ubuntu $(lsb_release -cs) nginx" | sudo tee /etc/apt/sources.list.d/nginx.list

sudo apt update && sudo apt install nginx -y
nginx -v
  nginx version: nginx/1.26.3
```

<br/>

# Python
`ubuntu 22.04` 는 `Python 3.10` 을 기본으로 설치합니다. 2025년 최신버젼은 `Python 3.13` 까지 제공하고 있습니다. 어떤 버젼을 설치할지는 [python.org/downloads](https://www.python.org/downloads/) 를 참고합니다. 이번에는 `Python 3.12` 를 설치하는 과정을 알아보겠습니다. 

## Install
```bash
# `zlib` 알고리즘 및 기타 의존성 모듈을 설치합니다.
sudo apt install zlib1g-dev -y
sudo apt install libmariadb-dev -y  # MariaDB
sudo apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libsqlite3-dev libreadline-dev libffi-dev curl libbz2-dev pkg-config make -y
sudo apt install python3-pip -y

# 사용자가 특정 버젼의 파이썬을 설치 합니다.
VERSION=3.12.9
wget https://www.python.org/ftp/python/${VERSION}/Python-${VERSION}.tgz
tar -xzvf Python-${VERSION}.tgz 
cd Python-${VERSION}/
./configure --enable-optimizations
sudo make altinstall
sudo apt install python3.12-dev libpq-dev -y
sudo apt install python3.12-lib2to3 -y
sudo apt install python3.12-gdbm -y
sudo apt install python3.12-venv -y
sudo apt install python3.12-tk -y
```

<br/>

# MariaDB
[MariaDB 11.8 is LTS](https://mariadb.org/11-8-is-lts/) 등을 확인하면 다양한 버젼이 있습니다. 사용자가 원하는 기능이 구현 가능한 여러 버젼이 있지만, 이번에는 그동안 사용했던 버젼인 `10.6.18`을 특정하여 설치작업을 진행해 보도록 하겠습니다.

## Install
`10.6.18` 버젼을 설치하는 방법은 다음과 같습니다.
```bash
VERSION="10.6.18"
sudo apt install software-properties-common dirmngr curl ca-certificates apt-transport-https
curl -LsS https://r.mariadb.com/downloads/mariadb_repo_setup
sudo bash -s -- --mariadb-server-version="mariadb-${VERSION}"
sudo apt update && sudo apt upgrade
sudo apt-get install wget software-properties-common dirmngr ca-certificates apt-transport-https -y
sudo apt install mariadb-server mariadb-client
sudo pip install mycli
```

## Setting
접속포트를 정의 및 변경하는 방법은 다음과 같습니다.
```bash
$ sudo nvim /etc/mysql/my.cnf  
[client-server]
port = 3306
```

DataBase 의 인코딩 정보와, 외부에서 접속 가능하도록 설정하는 방법은 다음과 같습니다. 그리고 MySQL/ MariaDB 에서는 `InnoDB`를 활용한 내부 압축 알고리즘을 제공 합니다. 이러한 설정을 활성화 하는 방법까지 알아보면 다음과 같습니다. 보다 자세한 내용은 [(MariaDB) InnoDB - Row Format](https://yongbeomkim.github.io/01django/2025-02-08-innodb-row.html)를 확인하시면 됩니다.
```bash
/etc/mysql/mariadb.conf.d/50-server.cnf

[server]
character-set-server=utf8
# bind-address = 127.0.0.1 - 주석처리

[mariadb]
# * InnoDB
innodb_buffer_pool_size = 2G
innodb_compression_default=ON
innodb_compression_algorithm=zlib
```

변경된 포트값 및 외부접속 설정이 시스템에 반영되고 있는지 확인합니다.
```bash
$ sudo netstat -tulpn | grep db
tcp   0.0.0.0:3306   0.0.0.0:*  29179/mariadbd      
tcp6  :::3306        :::*       29179/mariadbd 
```

## Root 사용자 설정
`Root` 사용자는 `auth_socket` 설정값이 활성화 되어 있어서 `sudo` 를 사용하면 별도의 Password 없이도 MySQL/ MariaDB 에 접속 가능합니다. 방법은 다음과 같습니다.
```bash
$ sudo mycli
  Connecting to socket /var/run/mysqld/mysqld.sock, owned by user mysql 
  MariaDB 10.6.18
  mycli 1.29.2
  MariaDB root@(none):(none)>
```

만약 외부에서도 `root` 사용자로 접속 가능하기 위해서는 사용자 관련 `plug in` 설정값을 `mysql_native_password` 로 변경 하야아 합니다. 그렇지 않으면 다음과 같은 오류를 출력합니다. 변경과 관련 내용은 [Ubuntu 환경일 때](https://oziguyo.tistory.com/36) [Docker 환경일 때](https://kdh0518.tistory.com/66) 를 확인 합니다.
```bash
$ mysql -u root -p
  Enter password: 
  ERROR 1698 (28000): Access denied for user 'root'@'localhost'
```

## 사용자 추가
`root` 사용자로 접속한 뒤 `mysql` <span style="color:orange">**데이터베이스**</span> 에서 외부에서 접속 가능한 사용자를 입력하는 예시는 다음과 같습니다.
```sql
use mysql;
SELECT host,user FROM `user`;
+-----------+-------------+
| Host      | User        |
+-----------+-------------+
| localhost | mariadb.sys |
| localhost | mysql       |
| localhost | root        |
+-----------+-------------+

-- @'localhost' : 내부만 접속
-- @'%'         : 외부접속 가능
CREATE USER 'username'@'%' IDENTIFIED BY 'password!2$';
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password!2$';
FLUSH PRIVILEGES;

SELECT host,user FROM `user`;
+-----------+-------------+
| Host      | User        |
+-----------+-------------+
| %         | username    |
| localhost | username    |
| localhost | mariadb.sys |
| localhost | mysql       |
| localhost | root        |
+-----------+-------------+
```

## 데이터베이스와 사용자 연결
```sql
CREATE DATABASE mydb;
ALTER DATABASE mydb CHARACTER SET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON mydb.* to 'username'@'%';
SHOW GRANTS FOR 'username'@'%';
+--------------------------------------------------------------------+
| Grants for username@%                                              |
+--------------------------------------------------------------------+
| GRANT USAGE ON *.* TO `username`@`%` IDENTIFIED BY PASSWORD '*123' |
| GRANT ALL PRIVILEGES ON `mydb`.* TO `momukji`@`localhost`          |
+--------------------------------------------------------------------+

FLUSH PRIVILEGES;
```

## 외부에서 연결하기
```bash
mycli mysql://username@sitename.com:3306/mydb
  Password: 
  MariaDB 10.6.18
  mycli 1.27.0

  MariaDB username@sitename.com:mydb>
```

<br/>

# transmission-daemon
Ubuntu 22.04에서 `transmission-daemon` 4.0.6 버전을 설치하려면, 소스 코드를 컴파일하는 방법이 필요합니다. 이는 최신 기능을 활용할 수 있지만, 약간의 추가 작업이 필요합니다. 다음은 단계별 가이드입니다.

## 필수 패키지 설치
컴파일에 필요한 패키지를 먼저 설치합니다.
```bash
sudo apt update
sudo apt install -y build-essential automake autoconf cmake libtool pkg-config intltool \
libcurl4-openssl-dev libglib2.0-dev libevent-dev libminiupnpc-dev libssl-dev libsystemd-dev
```

만약 Transmission의 데스크탑 GUI를 사용하려면 추가로 GTK 관련 패키지를 설치해야 합니다:
```bash
sudo apt install -y libgtk-3-dev libappindicator3-dev
```

## Transmission 소스 코드 다운로드
Transmission의 공식 GitHub 저장소에서 소스 코드를 클론합니다. 이 명령은 서브모듈까지 포함하여 저장소를 클론합니다.
```bash
git clone --recurse-submodules https://github.com/transmission/transmission Transmission
```

## 빌드 디렉토리 생성 및 이동
```bash
cd Transmission
mkdir build
cd build
```

## CMake를 사용하여 빌드 구성
빌드 구성을 생성합니다. 여기서 `-DENABLE_CLI=ON` 옵션은 CLI 클라이언트를 활성화합니다. 데스크탑 GUI를 사용하려면 추가로 `-DENABLE_GTK=ON` 또는 `-DENABLE_QT=ON` 옵션을 추가하세요.
```bash
cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX:PATH=/usr -DENABLE_CLI=ON ..
```

## 컴파일 및 설치
이 과정은 시스템 성능에 따라 시간이 소요될 수 있습니다.
```bash
make
sudo make install
```

## 시스템 서비스 파일 생성
`transmission`이라는 시스템 사용자를 생성합니다.
```bash
sudo adduser --system --group transmission
```

그런 다음, 서비스 파일을 복사하고 활성화합니다.
```bash
sudo cp ~/Transmission/daemon/transmission-daemon.service /lib/systemd/system/
sudo systemctl enable transmission-daemon.service
sudo systemctl start transmission-daemon.service
```

## 웹 인터페이스 활성화
웹 인터페이스를 사용하려면 설정 파일을 수정해야 합니다. 먼저 서비스를 중지합니다. 그런 다음 설정 파일을 편집합니다.
```bash
sudo systemctl stop transmission-daemon.service
sudo nano /home/transmission/.config/transmission-daemon/settings.json
```

파일에서 `"rpc-enabled"`를 `true`로 설정하고, `"rpc-whitelist"`에 접근을 허용할 IP 주소를 추가하거나, 전체 접근을 허용하려면 `"rpc-whitelist-enabled"`를 `false`로 설정합니다.
```json
"rpc-enabled": true,
"rpc-whitelist": "127.0.0.1,192.168.*.*",
"rpc-whitelist-enabled": false,
```

설정을 저장한 후, 서비스를 다시 시작합니다:
```bash
sudo systemctl start transmission-daemon.service
```

이제 브라우저에서 `http://<서버_IP>:9091`로 접속하여 Transmission 웹 인터페이스를 사용할 수 있습니다. **참고로** 이 과정은 `Transmission 4.0.6` 버전을 설치하기 위한 일반적인 절차이며, 시스템 환경에 따라 일부 단계가 다를 수 있습니다. 자세한 내용은 [Pi My Life Up의 가이드](https://pimylifeup.com/ubuntu-transmission/)를 참고하시기 바랍니다. 

<br/>

# 참고사이트
- [NAS 우분투 서버 22.04 트랜스미션 서버 설치](https://theleast.tistory.com/62)
- [Transmission 4.0 on Ubuntu 22.04](https://ogdenslake.ca/2023/03/20/transmission-4-0-on-ubuntu-22-04/)
- [MariaDB InnoDB - Row Format](https://yongbeomkim.github.io/01django/2025-02-08-innodb-row.html)
- [리눅스 - 우분투 22.04 nginx stable 업그레이드](https://magnuxx.tistory.com/entry/%EB%A6%AC%EB%88%85%EC%8A%A4-%EC%9A%B0%EB%B6%84%ED%88%AC-2204-nginx-stable-%EC%97%85%EA%B7%B8%EB%A0%88%EC%9D%B4%EB%93%9C)
- [transmission (torrent) 설정법](https://soopsokbaram.tistory.com/37)

<br/>

# SFTP
**SSH**는 리눅스 서버를 **원격으로 조작**하기 위한 보안 통신 수단입니다. **SFTP**는 SSH 위에서 동작하는 **파일 전송 기능만 따로 떼어낸** 프로토콜입니다. 이처럼 프로토콜이 동일하고 **동일한 포트(22번)** 를 사용해서, **SSH가 설치되어 있으면 SFTP는 자동으로 지원**됩니다.

| 항목              | SSH (Secure Shell)                             | SFTP (SSH File Transfer Protocol)                    |
|-------------------|------------------------------------------------|-------------------------------------------------------|
| **기본 개념**     | 원격 시스템에 보안 연결로 접속하는 프로토콜     | SSH 위에서 동작하는 파일 전송 프로토콜               |
| **목적**          | 원격 로그인 및 명령어 실행                       | 원격 서버와 파일 전송 (업로드/다운로드)              |
| **기반 프로토콜** | 자체 프로토콜 (TCP 22번 포트 사용)              | SSH 프로토콜 위에서 동작함 (포트도 22번 사용)        |
| **기능**          | - 원격 명령 실행<br>- 터미널 접속<br>- 포트 포워딩 등 | - 파일 업로드/다운로드<br>- 디렉토리 생성/삭제 등     |
| **보안**          | 암호화된 세션 제공 (비밀번호 또는 키 인증)       | SSH의 보안 기능을 그대로 사용                        |
| **접속 방법**     | `ssh user@host`                                 | `sftp user@host`                                     |
| **CLI 명령어**    | 예: `ls`, `cd`, `mkdir`, `top` 등 터미널 명령어  | 예: `put`, `get`, `ls`, `cd`, `mkdir` 등 SFTP 명령어  |
| **주 용도**       | 서버 관리, 원격 제어                             | 파일 전송 (보안 FTP 대체용)                          |

## Install
```bash
$ sudo apt update
$ sudo apt install openssh-server
$ sudo systemctl status ssh
```

| 상황 | 사용할 것 |
|------|-----------|
| 서버에서 로그를 확인하거나 명령어를 실행하고 싶다 | **SSH** |
| 로컬에서 서버로 파일을 올리거나, 서버에서 받아오고 싶다 | **SFTP** |


<br/>

# transmission-daemon
## Install by Apt
다음의 방법은 PPA(Personal Package Archive)를 이용한 설치방법 입니다. 하지만 이러한 방법은 저장소 주소가 정확하지 않아서 향후 `apt update` 실행에 지속적인 오류원인이 되는 경우가 많습니다. `ARM64` 환경은 모르지만 적어도 `x86`환경이라면 다음과 같은 방식으로 설치된 경우에는 삭제를 하고 아래의 방식으로 재설치를 진행하는 것을 추천 합니다
```bash
sudo add-apt-repository ppa:transmissionbt/ppa
sudo add-apt-repository ppa:hda-me/transmission-bin
sudo apt update
sudo apt install transmission-cli transmission-common transmission-daemon
```
## Remove
PPA 로 설치한 경우 패키지 삭제방법은 다음과 같습니다.
```bash
sudo apt remove transmission-cli transmission-common transmission-daemon
sudo apt autoremove
sudo add-apt-repository --remove ppa:transmissionbt/ppa
```
## Install by Snap
```bash
sudo snap install transmission
sudo snap install transmission
    transmission 4.0.6 from Sameer Sharma (sameersharma2006) installed
```

torrent 설치 [link](http://vvchunvv.tistory.com/37) 및 환경설정

#### transmission-daemon 설치
- [폴더원한 설정](https://www.raspberrypi.org/forums/viewtopic.php?f=91&t=13650)
- [settings.json 설정](https://trac.transmissionbt.com/wiki/EditConfigFiles)

```bash
$ sudo apt-get install transmission-daemon          # 설치
$ sudo /etc/init.d/transmission-daemon stop         # 정지

## 관련폴더에 권한 부여
$ sudo chmod 777 /var/lib/transmission-daemon/info/resume
$ sudo chmod 777 /home/사용자명/다운폴더
$ sudo chmod 777 /home/downloads/임시저장 폴더

$ sudo nano /etc/transmission-daemon/settings.json # 사용자 설정 
$ sudo /etc/init.d/transmission-daemon start       # 재시작
```

| settings.json | 설명    |
| ------------- | ------------------ |
|“speed-limit-down”| 100, # 최대 다운속도|
|“speed-limit-down-enabled”| false, # 최대 다운속도|
|“speed-limit-up”| 25, # 최대 업속도|
|“speed-limit-up-enabled”| true, # 최대 업속도|
|"download-dir"  | "/Download"       |
|"rpc-password"  | "비밀번호" |
|"rpc-username"  | "접속아이디"   # 접속 ID (login 별개) |
|"rpc-port"      |  9091  |
|"rpc-whitelist-enabled"       | false # 모든 IP허가 (403 forbidden 발생시 변경)     |
|"trash-original-torrent-files"| true  # 시작시 시드파일 삭제 |
|"watch-dir"     | "/Download"  # 마지막줄에 추가|        
|"watch-dir-enabled" | true  # 마지막줄에 추가|

마지막만 쉼표(,)가 없다.. 꼭 확인!!


> [접속완료시 자동종료 shell scripts](http://blog.naver.com/PostView.nhn?blogId=plaonn9&logNo=220894181618&categoryNo=0&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView)

```bash
$ sudo nano /Downloads/PurgeCompleted.sh

  >> 아래의 스크립트를 삽입한다
  SERVER=" 9091 --auth 접속id : 접속_password "
  TORRENTLIST=`transmission-remote $SERVER --list | sed -e '1d;$d;s/^ *//' | cut --only-delimited --delimiter=" " --fields=1`
  for TORRENTID in $TORRENTLIST
  do
    DL_COMPLETED=`transmission-remote $SERVER --torrent $TORRENTID --info | grep "Percent Done: 100%"`
    STATE_STOPPED=`transmission-remote $SERVER --torrent $TORRENTID --info | grep "State: Seeding\|Stopped\|Finished\|Idle"`
    if [ "$DL_COMPLETED" ] && [ "$STATE_STOPPED" ]; then
        transmission-remote $SERVER --torrent $TORRENTID --remove
    fi
  done

$ sudo chmod +x /home/odroid/Downloads/PurgeCompleted.sh    # 권한설정
$ chown -R username /home/odroid/Downloads/
$ sudo /etc/init.d/transmission-daemon stop    
$ sudo nano /etc/transmission-daemon/settings.json
  >>수정전
   "script-torrent-done-enabled": false,
   "script-torrent-done-filename": "",

  >>수정후>
   "script-torrent-done-enabled": true,
   "script-torrent-done-filename": "/home/username/download/transmission/PurgeCompleted.sh",

$ sudo /etc/init.d/transmission-daemon start
```
`/home/username/download/transmission/PurgeCompleted.sh"`
- [관련1](http://m.blog.daum.net/hevyflat/50?tp_nil_a=1)
- [관련2](http://blog.daum.net/_blog/BlogTypeView.do?blogid=0hcMr&articleno=50&categoryId=0&regdt=20150623142121)


# Docker
## Install Docker
**[<span style='color:orange'>Install Docker Engine on Ubuntu</span> - dockerdocs](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)** 공식문서를 확인하고 설치방법을 진행 합니다. 운영체제 및 설치 버젼에 따라서 내용이 바뀌는 경우도 많으니까 꼭 공식문서를 참고하여 설치작업을 진행 합니다.

## CLI run
```bash
$ docker image pull python:3.12.9:slim
$ docker rmi 6663e6263306

$ docker container ls -a
$ docker ps -a --filter ancestor=36d17f72f4f3
$ docker run -it 1f48792ccb92
```

