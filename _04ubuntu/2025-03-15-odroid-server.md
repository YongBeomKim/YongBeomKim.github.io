---
layout: blog
title: (Odroid H3) 서버 재설치 하기
tags:
- Linux
---

운영체제의 강제 Update 로 인한 시스템 파일 손상으로 새롭게 포맷 후 구동을 준비하고 있습니다. 이번에는 기존의 `apt install` 을 활용한 설치에 의존했다면 이번에는 최대한 최신버젼의 프로그램들을 설치하는 방법에 대하여 알아보도록 하겠습니다.

<br/>

# Nginx
## Introdiction
[Nginx 공식 홈페이지](https://nginx.org/en/download.html)를 방문하면 다음과 같은 버젼에 따른 설명을 볼 수 있습니다.
```r
nginx: download
Mainline version - (메인라인 버전 : 가장 최신 및 개선사항 포함)
CHANGES	nginx-1.27.4  pgp	nginx/Windows-1.27.4  pgp

Stable version - (안정 버전 : Mainline 중에서 충분히 검증된 버전)
CHANGES-1.26	nginx-1.26.3  pgp	nginx/Windows-1.26.3  pgp

Legacy versions - (레거시 버전 : 공식 지원이 종료)
CHANGES-1.24	nginx-1.24.0  pgp	nginx/Windows-1.24.0  pgp
```

작년에 ubuntu 22.04 기본저장소를 활용하여 설치된 서버내 버젼을 확인한 결과 `Legacy versions` 이 설치되어 있음을 확인하였습니다.
```bash
$ nginx -v
nginx version: nginx/1.24.0
```

## Install
```
```


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


개인 서버를 운영하던 중, 무리한(?) 업데이트 진행으로 기존의 설치된 내용과 충돌로 인하여 문제가 발생하였습니다. 여러도구들을 1개의 운영체제에 설치 및 운영을 하다보니 의존성 및 충돌등의 문제로 일부분 문제시 전체적인 운영이 어려워 지는 상황이 발생하고 나니까 Docker 를 활용하여 배포하는 방법을 활용할 필요성을 느끼게 되었습니다. 

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