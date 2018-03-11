---
title : Pi - 사용자 설정하기
last_modified_at: 2018-03-11T13:45:06-05:00
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


## Raspberry pi 설정하기

### 운영체제 설정하기 [link](https://wikidocs.net/3277)

라즈베리파이 운영체제를 **download** [link](https://www.raspberrypi.org/downloads/)

SD카드를 포맷(ftp32)후 이미지를 덮어쓴다
**Note:** **win32diskimager**[다운](https://sourceforge.net/projects/win32diskimager/) 유틸로 .img를 설치하는 방법이 가장 편하다 
{: .notice--info}


### 초기설정하기 

**login id : pi** <br>
**password : raspberry**<br>

```$ sudo raspi-config
```

cli로 부팅, 비밀번호 변경, ssh 활성화를 한다


### Pyton 3.6 설치하기 [link](https://gist.github.com/dschep/24aa61672a2092246eaca2824400d37f)


1 python 설치에 필요한 모듈을 설치 
```
$ sudo apt-get update
$ sudo apt-get install build-essential tk-dev libncurses5-dev libncursesw5-dev libreadline6-dev libdb5.3-dev libgdbm-dev libsqlite3-dev libssl-dev libbz2-dev libexpat1-dev liblzma-dev zlib1g-dev  # 기타 메세지에 따라서 추가설치 
```


2 Python을 정식사이트와 압축파일로 설치하기
```
$ wget https://www.python.org/ftp/python/3.6.0/Python-3.6.0.tar.xz
$ tar xf Python-3.6.0.tar.xz
$ cd Python-3.6.0
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
$ sudo apt-get install libblas-dev liblapack-dev python-dev libatlas-base-dev  gfortran  python-setuptools  python-matplotlib  python3-pandas   ## 1~2 hours
$ sudo easy_install scipy  ## 2-3 hours
```



### 필요한 utility 설정 

#### ftp 설치 [link](http://freehoon.tistory.com/48)

```
$ sudo apt-get install vsftpd  #ftp 설치하기
$ sudo service vsftpd start    #ftp 활성화
```

`sudo gedit /etc/vsftpd.conf  # ftp 접속 폴더 제한`
ssh 설치 위를 따라서 실행하면 끝 <strike>참 쉽죠??</strike>


#### torrent 설치 [link](http://vvchunvv.tistory.com/37) 및 환경설정

```
$ sudo apt-get install transmission-daemon          # 설치
$ sudo /etc/init.d/transmission-daemon stop         # 정지
$ sudo gedit /etc/transmission-daemon/settings.json # 사용자 설정
$ sudo /etc/init.d/transmission-daemon start        # 재시작
```

`sudo gedit /etc/transmission-daemon/settings.json` 내용 [link](https://trac.transmissionbt.com/wiki/EditConfigFiles)

| option | 설명    |                                      |
| -------------- | ---------------------------------------- |
|"download-dir" | "/Download"      |
|"rpc-password" | "원하는 비밀번호"  |
|"rpc-port"     |  9091  |
|"rpc-username" | "접속아이디"   # 접속 ID (login과는 별개다) |
|"rpc-whitelist-enabled"       | false # 모든 IP 접속허가     |
|"trash-original-torrent-files"| true  # 시작시 시드파일 삭제 |
|"watch-dir"  | "/Download"  # 마지막 추가(seed 자동)|        
|"watch-dir-enabled" | true  # 마지막 추가|
마지막 2줄은, 설정폴더 내 토렌트 파일을 자동으로 다운로드 시작한다.

마지막에는 쉼표(,) 없고, 기타 모든 라인의 쉼표(,)는 꼭 확인한다  
