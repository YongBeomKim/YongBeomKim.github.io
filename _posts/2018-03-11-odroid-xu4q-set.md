---
title : odroid xu4 - 설치 메뉴얼
last_modified_at: 2018-03-11T13:45:06-05:00
tags: 
    - odroid
toc: true
---


odroid xu4 설치 매뉴얼

## odroid 운영체제 설치[link](https://wikidocs.net/3277)

ubuntu Mate 16.04 [**download**](http://odroid.com/dokuwiki/doku.php?id=en:xu3_release_linux_ubuntu_k49)

SD카드를 포맷(ftp32)후 이미지를 덮어쓴다[link](http://odroid.com/dokuwiki/doku.php?id=en:odroid_flashing_tools)

**Note:** 여기서도 **win32diskimager** [다운](https://sourceforge.net/projects/win32diskimager/)가 가장 편하다 
{: .notice--info}


## 유용한 도구들 설치

http://awesometic.tistory.com/19

### 초기설정
 
**login id : root / odroid** <br>
**password : odroid**<br>

```
$ sudo systemctl disable lightdm.service                    # CLI로 로그인
$ sudo apt-get purge libx11.* libqt.* && apt-get autoremove # GUI 의존제거 
$ sudo apt-get purge cups* && apt-get autoremove            # cups* 모듈 삭제
$ sudo apt-get purge chromium* firefox* kodi* && sudo apt-get autoremove # 불필요 삭제
$ sudo reboot

$ sudo apt-get update && sudo apt-get dist-upgrade -y       # 업뎃실시
$ sudo reboot
$ sudo apt-get autoremove                                   # 청소  
```

 새로운 사용자에게도 적용하기 위해, /etc/skel/.profile 에도 추가합니다

sudo vi /etc/skel/.profile
TZ='Asia/Seoul'; export TZ

 추가로 기본 시간대를 바꿔줍니다.

dpkg-reconfigure tzdata

 Asia/Seoul 로 설정해주시면 됩니다.

 재부팅 해줍니다.

sudo reboot


## Utility 설치 및 설정

### ftp 설치 [link](http://freehoon.tistory.com/48)

```
$ sudo apt-get install vsftpd  #ftp 설치하기
$ sudo service vsftpd start    #ftp 활성화
```

`sudo gedit /etc/vsftpd.conf  # ftp 접속 폴더 제한`<br>
ssh 설치 위를 따라서 실행하면 끝 <strike>참 쉽죠??</strike>


### torrent 설치 [link](http://vvchunvv.tistory.com/37) 및 환경설정

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
|"rpc-username" | "접속아이디"   # 접속 ID (login과는 별개다) |
|"rpc-port"     |  9091  |
|"rpc-whitelist-enabled"       | false # 모든 IP 접속허가     |
|"trash-original-torrent-files"| true  # 시작시 시드파일 삭제 |
|"watch-dir"  | "/Download"  # 마지막 추가(seed 자동)|        
|"watch-dir-enabled" | true  # 마지막 추가|

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
