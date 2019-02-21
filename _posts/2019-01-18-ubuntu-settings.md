---
title : 우분투 Setting & Tips (2019.01)
last_modified_at: 2019-01-18T10:45:06-05:00
header:
  overlay_image: /assets/images/book/ubuntu.png
categories:
  - ubuntu
tags: 
    - ubuntu
---

우분투에 대해 알게된 점들을 지속적으로 묶어서 정리를 해 보려고 합니다. 이번 페이지에서 정리하려는 내용은 Setting 파일들로써 각각의 파일과, 내용에 대해 정리하려고 합니다.

<br/>
# /etc/rc.local
이 파일은 **부팅시 실행할 스크립트 파일** 입니다. 참고로 경로명을 지정할 때 상대경로는 `./Download` 를 사용하고, **root** 에서 시작하는 절대정로를 지정할 때에는 위 title 과 같이 `/etc/rc.local` 을 입력합니다. 지금 저의 System 에 기록된 내용은 다음과 같습니다.

```r
#!/bin/sh -e
# rc.local
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "" on success or any other
# value on error.
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

# writed by user
sudo mount -t vfat -o iocharset=cp949 /dev/sda1  /home/erdos/exthdd/
if [ -f /aafirstboot ]; then /aafirstboot start ; fi
exit 0
```
시스템에 연결된 외장하드를 mount 하는 내용입니다. 여기에 사용자가 원하는 내용들을 바로 입력해도 되지만, 시스템 부팅시 실행되는 초기 실행에 문제가 생길 수 있기 때문에 실험적인 내용은 별도의 스크립트로 작동을 확인하고 문제가 없을 때 추가하는 방식을 추천합니다.

<br/>
# .bashrc
bach shell 을 실행할때 실행되는 내용입니다. 예를들어 외부에서 **ssh** 접속하는 경우 위의 기본실행 이외에, 추가로 실행할 내용 (ex) virtualenv, spark path 설정) 을 기록하는 파일입니다.
