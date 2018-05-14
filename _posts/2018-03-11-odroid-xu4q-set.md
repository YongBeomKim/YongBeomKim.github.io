---
title : odroid xu4 - 설치 메뉴얼
last_modified_at: 2018-03-11T13:45:06-05:00
header:
  overlay_image: /assets/images/book/singlecom.jpg
categories:
  - ubuntu
tags: 
    - odroid
toc: true
---


## odroid 설치[link](https://wikidocs.net/3277)

참고 odroid HC1 설치 매뉴얼[link](http://m.blog.daum.net/_blog/_m/commentList.do?blogid=07GHh&articleno=15837504)

### ubuntu 16.04 LTS 를 SD 카드에 설치

ubuntu Mate 16.04 [**download**](http://odroid.com/dokuwiki/doku.php?id=en:xu3_release_linux_ubuntu_k49)

SD카드를 포맷(ftp32)후 이미지를 덮어쓴다[link](http://odroid.com/dokuwiki/doku.php?id=en:odroid_flashing_tools)

**Note:** [win32diskimager](https://sourceforge.net/projects/win32diskimager/) 을 추천
{: .notice--info}

```
# 불필요한 부분들 삭제
$ sudo systemctl disable lightdm.service                    # CLI로 로그인
$ sudo apt-get purge libx11.* libqt.* && apt-get autoremove # GUI 의존제거 
$ sudo apt-get purge cups* && apt-get autoremove            # cups* 모듈 삭제
$ sudo apt-get purge chromium* firefox* kodi* && sudo apt-get autoremove # 불필요 삭제

$ sudo reboot
$ sudo apt-get update && sudo apt-get dist-upgrade -y       # 업뎃실시
$ sudo reboot
$ sudo apt-get autoremove                                   # 청소  
```
cli 설정 매뉴얼 [link](http://awesometic.tistory.com/19)


### 초기설정
 
**id : root / odroid** <br>
**pass : odroid**<br>

**Note:** `passwd$사용자아이디` 로 비밀번호를 변경한다
{: .notice--info}


### 기준 시간대 변경 [link](http://xinet.kr/tc/entry/linux-timezone-%EC%84%A4%EC%A0%95)

```
$ date                # 국제 표준시가 default로 지정 
   Mon Jan 01 00:00:00 UTC 2018   

$ tzselect            # 옵션을 따라가며 시간을 변경한다
$ nano /etc/profile   # 부팅후 자동적용을 위해 설정값을 저장
   TZ='Asia/Seoul'; export TZ
```



## 유용한 도구들 설치

### ssh 활성화 [link](http://neoguru.tistory.com/57)

```
$ sudo apt-get update 
$ sudo apt-get install  openssh-server
$ netstat -ntl                    # 데몬 22 port 확인 
    Active  Internet        connections (only servers)
    Proto   Recv-Q          Send-Q...
    0       0 0.0.0.0:22    LISTEN     
$ sudo /etc/init.d/ssh restart    # ssh 재시작
```


### ftp 설치 [link](http://freehoon.tistory.com/48)

```
$ sudo apt-get install vsftpd  # ftp 설치하기
$ sudo nano /etc/vsftpd.conf   # 설정값 추가
    write_enable=YES           # 쓰기값 추가 

$ sudo service vsftpd start    # ftp 재활성화
```

`/etc/vsftpd.conf  # 설정` [link](http://dblabblog.tistory.com/m/entry/%EC%9A%B0%EB%B6%84%ED%88%AC%EB%A6%AC%EB%88%85%EC%8A%A4-FTP%EC%84%9C%EB%B2%84%EA%B5%AC%EC%B6%95vsftpd?category=338531)<br>
ssh 설치 위를 따라서 실행하면 끝 <strike>참 쉽죠??</strike>


### torrent 설치 [link](http://vvchunvv.tistory.com/37) 및 환경설정

#### transmission-daemon 설치 / 폴더원한 설정[link](https://www.raspberrypi.org/forums/viewtopic.php?f=91&t=13650) / settings.json 설정[link](https://trac.transmissionbt.com/wiki/EditConfigFiles)

```
$ sudo apt-get install transmission-daemon          # 설치
$ sudo /etc/init.d/transmission-daemon stop         # 정지

## 관련폴더에 권한 부여
$ sudo chmod 777 /var/lib/transmission-daemon/.config/transmission-daemon/resume
$ sudo chmod 777 /home/odroid/torrent
$ sudo chmod 777 /home/downloads/transmission

$ sudo gedit /etc/transmission-daemon/settings.json # 사용자 설정 
$ sudo /etc/init.d/transmission-daemon start        # 재시작
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


#### 접속완료시 자동종료 shell scripts 추가 [link](http://blog.naver.com/PostView.nhn?blogId=plaonn9&logNo=220894181618&categoryNo=0&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView)

```
$ sudo nano /Downloads/PurgeCompleted.sh

  >> 아래의 스크립트를 삽입한다
  SERVER=" 9091 --auth pi:pi_password "
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
$ sudo /etc/init.d/transmission-daemon stop    
$ sudo nano /etc/transmission-daemon/settings.json

  >>수정전
   "script-torrent-done-enabled": false,
   "script-torrent-done-filename": "",

  >>수정후>
   "script-torrent-done-enabled": true,
   "script-torrent-done-filename": "/Downloads/PurgeCompleted.sh",

$ sudo /etc/init.d/transmission-daemon start
```


### 외장하드 mount 연결 

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


**Please Note:** `Failed to mount '/dev/sdb1'` 기존의 SSD 설정값과 충돌문제는 `$ ntfsfix /dev/sdb1`를 통해서 해결한다
{: .notice--danger}


## Python 3.6.4 설치하기

### Python 3.6.4 업데이트 [link](https://tecadmin.net/install-python-3-6-ubuntu-linuxmint/#)

```
## 관련 패키지 설치 
$ sudo apt-get update
$ sudo apt-get install build-essential checkinstall libreadline-gplv2-dev  libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev

## 정식 사이트에서 다운 및 설치 
$ cd /usr/src
$ sudo wget https://www.python.org/ftp/python/3.6.4/Python-3.6.4.tgz
$ sudo tar xzf Python-3.6.4.tgz
$ suro rm Python-3.6.4.tgz

## python 3.6.4 컴파일
$ cd Python-3.6.4
$ sudo ./configure --enable-optimizations
$ sudo make altinstall
$ python3.6 -V          # 설치확인
```


### 불필요한 파일 삭제

```
$ sudo rm -r Python-3.6.4
$ rm Python-3.6.4.tgz
$ sudo apt-get --purge remove build-essential tk-dev
$ sudo apt-get --purge remove libncurses5-dev libncursesw5-dev libreadline6-dev libdb5.3-dev libgdbm-dev libsqlite3-dev libssl-dev
 libbz2-dev libexpat1-dev liblzma-dev zlib1g-dev
$ sudo apt-get autoremove
```


### 파이썬에 필요한 모듈설치 (C++ 컴파일러등 설치)

```
$ sudo apt-get install python-pip                 # pip 최신버젼 설치
$ sudo apt-get install build-essential libssl-dev libffi-dev python3-dev libblas-dev liblapack-dev python3-dev libatlas-base-dev  gfortran  python3-setuptools  python3-matplotlib  python3-pandas  libxml2 libxml2-dev libxslt1-dev libfreetype6-dev  pkg-config  libpng12-dev  pkg-config
```


### Jupyter 설정값 변경 [link](http://goodtogreate.tistory.com/entry/IPython-Notebook-%EC%84%A4%EC%B9%98%EB%B0%A9%EB%B2%95)

```  
$ sudo apt-get install fonts-hack-ttf       # Hack 폰트 설치
$ jupyter-theme -t oceans16 -f hack -fs 10  # jupyter theme 설치
$ nano /home/odroid/.jupyter/custom/custom.css 

div.cell.{ # 여기 바로 아래에 덧 붙인다}  

(!!!추가할 내용!!)
.container {
    width: 99% !important;
}   

$ jupyter notebook --generate-config        # 설정파일 생성 
   Writing default config to: /root/.jupyter/jupyter_notebook_config.py

$ openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout mycert.pem -out mycert.pem   # OpenSSL을 사용, 365일간 유효인증 설정 

$ ipython
    In [1]: from notebook.auth import passwd
    In [2]: passwd()
      Enter password: 
      Verify password: 
    Out[2]: 'sha1:f24baff....' 

$ nano /home/odroid/.jupyter/jupyter_notebook_config.py

# 위에서 추출한 비번을 입력
c = get_config()
# c.NotebookApp.matplotlib='inline'  # 오류를 발생
c.NotebookApp.password = u'sha1:f24baff....' 
# ssl인증을 입력
c.NotebookApp.certfile = u'/absolute/path/to/your/certificate/mycert.pem'
# web-browser를 실행하지 않음
c.NotebookApp.open_browser = False
# 시작 폴더를 변경한다.
c.NotebookApp.notebook_dir = u'/root/DataScience/'
# The IP address the notebook server will listen on.
c.NotebookApp.ip = '*'   # 'xxx.xxx.xxx.xxx'는 또 왜 안된나 ㅠㅠ..
c.NotebookApp.port_retries = 8888

$ jupyter notebook --ip=* --no-browser  # terminal 에서 위의 설정값을 입력
```


### tensorflow 설치 [link](https://hackernoon.com/running-yolo-on-odroid-yolodroid-5a89481ec141)

```
$ wget https://github.com/samjabrahams/tensorflow-on-raspberry-pi/releases/download/v1.0.1/tensorflow-1.0.1-cp34-cp34m-linux_armv7l.whl 

$ pip3 install tensorflow-1.0.1-cp34-cp34m-linux_armv7l.whl

$ sudo apt-get install pkg-config zip g++ zlib1g-dev unzip
$ sudo apt-get install gcc-4.8 g++-4.8
$ sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.8 100
$ sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.8 100
$ sudo apt-get install python-pip python-numpy swig python-dev
$ sudo pip install wheel

$ sudo add-apt-repository ppa:webupd8team/java
$ sudo apt-get update
$ sudo apt-get install oracle-java8-installer
$ sudo apt-get install oracle-java8-set-default
$ java -version
```


```
# Google 플랫폼 설치를 위한 bazel 설치
$ wget https://github.com/bazelbuild/bazel/releases/download/0.5.4/bazel-0.5.4-dist.zip
$ unzip -d bazel bazel-0.5.4-dist.zip
$ cd bazel
$ sudo ./compile.sh
$ sudo vi scripts/bootstrap/compile.sh   # java와 연결 활성화 
```


```
# tensorflow 설치파일 다운로드
$ git clone --recurse-submodules https://github.com/tensorflow/tensorflow.git
$ cd tensorflow
$ git checkout tags/v1.4.0
$ ./configure
```


```
## bazel 을 활용하여 Tensorflow 설치
$ Target //tensorflow/tools/pip_package:build_pip_package up-to-date:
 bazel-bin/tensorflow/tools/pip_package/build_pip_package

$ bazel-bin/tensorflow/tools/pip_package/build_pip_package /tmp/tensorflow_pkg

$ sudo pip3 install /tmp/tensorflow_pkg/tensorflow-1.4.0-cp36-cp36mu-linux_armv7l.whl --upgrade --ignore-installed
```

http://kwangsics.tistory.com/entry/Tensorflow-설치일반-라즈베리파이
https://github.com/samjabrahams/tensorflow-on-raspberry-pi/blob/master/GUIDE.md
https://github.com/samjabrahams/tensorflow-on-raspberry-pi/issues/41