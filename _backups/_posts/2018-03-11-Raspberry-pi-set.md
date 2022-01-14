---
title : pi - 설치 메뉴얼
last_modified_at: 2018-03-11T13:45:06-05:00
categories:
  - ubuntu
tags: 
    - raspberry 
    - Pi
toc: true
---


Raspberry Pi 서버는 설치와 설정이 편하긴 하다<br>

```
$ sudo raspi-config
```

만 실행하면 다양한 설정이 가능하다<br>

하지만 구현할 내용이 많아지면서, 개인용임에도 개발 서버로는 부족해서<br>
서버를 교체하기로 결정하였고,<br>
이번시간은 Raspberry pi와 odroid xu4Q의 초기 설정 방법을<br>
문서로써 정리하려고 한다


## Raspberry pi 운영체제 설치[link](https://wikidocs.net/3277)

라즈베리파이 운영체제 [**download**](https://www.raspberrypi.org/downloads/)

SD카드를 포맷(ftp32)후 이미지를 덮어쓴다

**Note:** **win32diskimager** [다운](https://sourceforge.net/projects/win32diskimager/)로 .img 설치가 가장 편하다 
{: .notice--info}


### 초기설정 (cli 부팅, 기본비번 변경, ssh)

**login id : pi** <br>
**password : raspberry**<br>

```
$ sudo raspi-config
```

cli로 부팅, 비밀번호 변경, ssh 활성화를 한다

**Note:** 기존의 접속정보가 있으면 ECDSA key fingerprint is SHA256:7eag.... 오류를 출력한다 
```
$ cd .ssh 
$ rm -f known_hosts          # 공개키 파일을 삭제
$ rm -f /etc/ssh/ssh_host_*  # 서버키 파일을 삭제
```
해당 파일들을 삭제후 접속을 하면 된다
{: .notice--info}


### 기준날짜 변경 [link](http://xinet.kr/tc/entry/linux-timezone-%EC%84%A4%EC%A0%95)
```
$ date
   Mon Jan 01 00:00:00 UTC 2018

$ tzselect            # 옵션에 따라 시간을 변경
$ nano /etc/profile   # 재부팅시에도 적용되도록 설정값 저장
   TZ='Asia/Seoul'; export TZ
```


## Pyton 3.6 설치하기 [link](https://gist.github.com/dschep/24aa61672a2092246eaca2824400d37f)


1 python 설치에 필요한 모듈을 설치 
```
$ sudo apt-get update
$ sudo apt-get install build-essential tk-dev libncurses5-dev libncursesw5-dev libreadline6-dev libdb5.3-dev libgdbm-dev libsqlite3-dev libssl-dev libbz2-dev libexpat1-dev liblzma-dev zlib1g-dev  # 기타 메세지에 따라서 추가설치 
```


2 Python을 정식사이트와 압축파일로 설치하기
```
$ wget https://www.python.org/ftp/python/3.6.4/Python-3.6.4.tar.xz
$ tar xf Python-3.6.4.tar.xz
$ cd Python-3.6.4
$ ./configure
$ make
$ sudo make altinstall
```


3 불필요한 파일들 삭제
```
$ sudo rm -r Python-3.6.0
$ rm Python-3.6.0.tgz
$ sudo apt-get --purge remove build-essential tk-dev
$ sudo apt-get --purge remove libncurses5-dev libncursesw5-dev libreadline6-dev
$ sudo apt-get --purge remove libdb5.3-dev libgdbm-dev libsqlite3-dev libssl-dev
$ sudo apt-get --purge remove libbz2-dev libexpat1-dev liblzma-dev zlib1g-dev
$ sudo apt-get autoremove
$ sudo apt-get clean
```


4 머신러닝 도구 설치 [link](http://wyolum.com/numpyscipymatplotlib-on-raspberry-pi/)
```
$ sudo apt-get install libblas-dev liblapack-dev python-dev libatlas-base-dev  gfortran  python-setuptools  python-matplotlib  python3-pandas  libxml2 libxml2-dev libxslt1-dev   ## 1~2 hours
$ sudo easy_install scipy  ## 2-3 hours
```


## Utility 설치 및 설정

### ftp 설치 [link](http://freehoon.tistory.com/48)

```
$ sudo apt-get install vsftpd  #ftp 설치하기
$ sudo service vsftpd start    #ftp 활성화
```

`sudo gedit /etc/vsftpd.conf  # ftp 접속 폴더 제한`<br>
ssh 설치 위를 따라서 실행하면 끝 <strike>참 쉽죠??</strike>


### torrent 설치 [link](http://vvchunvv.tistory.com/37) 및 환경설정

seeding 종료 후 자동삭제[link](http://vvchunvv.tistory.com/41)

```
$ sudo apt-get install transmission-daemon          # 설치
$ sudo /etc/init.d/transmission-daemon stop         # 정지
$ sudo gedit /etc/transmission-daemon/settings.json # 사용자 설정
$ sudo /etc/init.d/transmission-daemon start        # 재시작
```

`sudo gedit /etc/transmission-daemon/settings.json` 내용 [link](https://trac.transmissionbt.com/wiki/EditConfigFiles)


| option | 설명    |
| ------------- | ------------------ |
|"download-dir" | "/Download"       |
|"rpc-password" | "원하는 비밀번호" |
|"rpc-username" | "접속아이디"   **# 접속 ID (login과는 별개다**)** |
|"rpc-port"     |  9091  |
|"rpc-whitelist-enabled"       | false **# 모든 IP 접속허가**     |
|"trash-original-torrent-files"| true  **# 시작시 시드파일 삭제** |
|"watch-dir"  | "/Download"  **# 마지막 추가(seed 자동)** |        
|"watch-dir-enabled" | true  **# 마지막 추가** |

마지막 2줄은, 설정폴더 내 토렌트 파일을 자동으로 다운로드 시작한다.

마지막에는 쉼표(,) 없고, 기타 모든 라인의 쉼표(,)는 꼭 확인한다  


“download-dir”: “[다운로드 할 곳의 default]“,
“rpc-password”: “[transmission에 쓸 계정의 비밀번호. ]“,
“rpc-username”: “[transmission에 쓸 계정명]“,


## 외장하드 mount 연결 

``` 
# install SSD
$ mkdir exthdd                           # '연결폴더'' 만들기 
$ sudo fdisk -l                          # 디스크 확인
$ sudo blkid                             # UUID info 확인
$ sudo mount -t auto /dev/sda1 ./exthdd/ # '연결폴더'와 HDD 연결 
$ sudo gedit /etc/fstab                  # blkid로 확인한 UUID info를 입력
    proc       /proc   proc    defaults            0   0
    UUID=575   /home2  ext4    errors=remount-ro   0   1
$ sudo mount -a                          # 새로입력한 정보 적용 
reboot
```


기존의 SSD
```
$ mount /dev/sdb1 /data
Failed to mount '/dev/sdb1': 명령을 허용하지 않음
The NTFS partition is in an unsafe state. Please resume...

$ ntfsfix /dev/sdb1  # NTFS 오류는 ntfsfix
```
