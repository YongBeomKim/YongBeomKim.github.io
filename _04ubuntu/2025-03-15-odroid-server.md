---
layout: blog
title: (Odroid H3) 서버 재설치 하기
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

<br/>

# 참고사이트
- [NAS 우분투 서버 22.04 트랜스미션 서버 설치](https://theleast.tistory.com/62)
- [Transmission 4.0 on Ubuntu 22.04](https://ogdenslake.ca/2023/03/20/transmission-4-0-on-ubuntu-22-04/)
- [MariaDB InnoDB - Row Format](https://yongbeomkim.github.io/01django/2025-02-08-innodb-row.html)
- [리눅스 - 우분투 22.04 nginx stable 업그레이드](https://magnuxx.tistory.com/entry/%EB%A6%AC%EB%88%85%EC%8A%A4-%EC%9A%B0%EB%B6%84%ED%88%AC-2204-nginx-stable-%EC%97%85%EA%B7%B8%EB%A0%88%EC%9D%B4%EB%93%9C)

<br/>

# FTP
## Install
```bash
$ sudo apt-get install vsftpd  # ftp 설치하기
$ sudo nano /etc/vsftpd.conf   # 설정값 추가

    write_enable=YES           # 쓰기값 추가 
    anon_upload_enable=YES
    anon_mkdir_write_enable=YES

    chroot_local_user=YES      # 사용자 home 폴더에 묶음
    chroot_list_enable=YES
    chroot_list_file=/etc/vsftpd.chroot_list (계정이름 추가)

$ sudo echo  사용자명 > /etc/vsftpd.chroot_list
$ sudo service vsftpd start    # ftp 재활성화

-- 사용자 추가 ---
$ sudo adduser 사용자명        # 별도 사용자를 추가 (이 계정으로 접속된다)
$ visudo -f /etc/sudoers       # 사용자 계정을 sudo 연결 
   # User alias specification
   사용자명   ALL=(ALL:ALL) ALL    
   # User privilege specification
   root  ALL=(ALL:ALL) ALL

$ su - 사용자명                # cf) root 전환은 `$ su -` 
```

## Add User
설치를 하면 `root` 사용자에게 허용된 것을 볼 수 있습니다.
```bash
$ sudo lsof -i -P -n | grep vsftpd
vsftpd 2135 root 3u IPv6  29589  0t0  TCP *:21 (LISTEN)
```

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

1. torrent 설치 [link](http://vvchunvv.tistory.com/37) 및 환경설정

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

[transmission (torrent) 설정법](https://soopsokbaram.tistory.com/37)