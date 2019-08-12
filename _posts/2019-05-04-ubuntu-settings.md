---
title : 우분투 Setting & Tips Win10
last_modified_at: 2019-05-04T10:45:06-05:00
header:
  overlay_image: /assets/images/book/ubuntu.png
categories:
  - ubuntu
tags: 
    - ubuntu
---

우분투에 대해 알게된 점들을 지속적으로 묶어서 정리를 해 보려고 합니다. 이번 페이지에서 정리하려는 내용은 Setting 파일들로써 각각의 파일과, 내용에 대해 정리하려고 합니다.

또한 윈도우 10 의 Bash 터미널에서 사용자 변경 및 zsh 설치방법을 정리해 보겠습니다. 자세한 초기설정 방법은 **[Ubuntu Setting](https://www.howtogeek.com/261417/how-to-change-your-user-account-in-windows-10s-ubuntu-bash-shell/)** 을 참고합니다.


<br/>
# manage.py

```r
# containing the script use Command
$ chmod u+rwx filename.py
# Read and Execute but not alter the shell script use
$ chmod go+rx filename.py
```
Git 소스파일을 다운받아 `manage.py` 를 보다 쉽게 실행 가능하도록 `$chmod u+rwx manage.py` 를 실행하면 보다 잘 작동 합니다. 

<br/>
# **/etc/apt/sources.list.d**
관련 패키지를 설치하다 보면 지원되지 않는 설정값들이 남아 문제가 됩니다. 따라서 불필요한 설정값과 파일들을 삭제한 뒤 재설치를 합니다. `/etc/apt/sources.list` 파일내 문제되는 경로를 삭제하고 `/etc/apt/sources.list.d/` 폴더에 설치된 내용 중 문제가 되는 파일들을 삭제 합니다.

[블로그](https://stackoverflow.com/questions/26020917/what-is-the-function-of-etc-apt-sources-list-d)

<br/>
# **/etc/rc.local**
이 파일은 **부팅시 실행할 스크립트 파일** 입니다. 참고로 경로명을 지정할 때 상대경로는 `./Download` 를 사용하고, **root** 에서 시작하는 절대정로를 지정할 때에는 위 title 과 같이 `/etc/rc.local` 을 입력합니다. 지금 저의 System 에 기록된 내용은 다음과 같습니다.

```r
#!/bin/sh -e
# rc.local
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "" on success or any other
# value on error.
# In order to enable or disable this script just change 
# the execution bits.

# writed by user
sudo mount -t vfat -o iocharset=cp949 /dev/sda1  /home/erdos/exthdd/
if [ -f /aafirstboot ]; then /aafirstboot start ; fi
exit 0
```

위 내용은 시스템에 연결된 외장하드를 mount 하는 내용입니다. 여기에 사용자가 원하는 내용들을 바로 입력해도 되지만, 시스템 부팅시 실행되는 초기 실행에 문제가 생길 수 있기 때문에 실험적인 내용은 별도의 스크립트로 작동을 확인하고 문제가 없을 때 추가하는 방식을 추천합니다.

<br/>
# .bashrc
bach shell 을 실행할때 실행되는 내용입니다. 예를들어 외부에서 **ssh** 접속하는 경우 위의 기본실행 이외에, 추가로 실행할 내용 (ex) virtualenv, spark path 설정) 을 기록하는 파일입니다.

<br/>
# 스크립트 만들기
터미널에서 연속적인 내용을 반복 입력하는 경우 이를 파일로 묶어두면, 실행방법을 간단하게 만들 수 있습니다.

```r
$ touch run_server.sh
$ sudo chmod u+x run_server.sh
$ source run_server.sh
```

스크립트 파일을 작성할 때, 맨 윗줄에 스크립트 선언을 합니다 <strike>어떠한 기능을 하는지는 아직 정확하게는 모릅니다</strike>
```r
#!/bin/sh

# open Apach server port
sudo iptables -I INPUT 1 -p tcp --dport 80 -j ACCEPT

# python virtualenv activate
cd python/django/
. bin/activate
cd ~

# running Django server
cd python/DoosanVent/
uwsgi --http :8000  --module  server.wsgi &
cd ~

# open jupyter notebook port
sudo iptables -I INPUT 2 -p tcp --dport 8080 -j ACCEPT

# running Jupyter Notebook
cd python/Source/
jupyter lab &
cd ~
```

<br/>
# 윈도우에서 sudo

초기에는 관리자 계정으로 로그인 됩니다. 맨 처음에는 관리가 관련 정보를 생성합니다.

## su passwd

관련 프로그램 설치등을 위해서도 관리자 계정이 필요한 만큼 암호를 생성합니다

```s
root@DESKTOP-UOGF7U8:~#
root@DESKTOP-UOGF7U8:~# passwd
Enter new UNIX password:
Retype new UNIX password:
root@DESKTOP-UOGF7U8:~#
```

## useradd, userdel

관리자 계정이 있어도 실제 사용하기엔 문제가 많습니다. 사용자 설정을 진행하다가 문제가 생긴경우에는 모든 시스템을 재설치 해야 하지만, 별도의 사용자권한을 생성한 뒤에 작업을 진행하게 되면 꼭 필요한 내용만 **sudo** 에 설치하고, 기타 프로그램 및 설정은 **사용자 계정** 에 설치를 하는등 작업관리가 용이한 장점이 있습니다.

```s
root@DESKTOP-UOGF7U8:~# useradd python
root@DESKTOP-UOGF7U8:~# passwd python
사용자의 비밀 번호 변경 중
새  암호: 
새  암호 재입력:
passwd: 모든 인증 토큰이 성공적으로 업데이트 되었습니다.

root@DESKTOP-UOGF7U8:~# userdel python
root@DESKTOP-UOGF7U8:~# rm -rf /etc/pythonroot@DESKTOP-UOGF7U8:~#
```

## 사용자 변경

우분투를 사용하면서 `sudo` 를 자주 사용했지만, CentOS 와 같이 윈도우 에서는 `su` 와 `su 사용자` 를 활용하여 계정을 변경한 뒤 필요한 작업들을 한꺼번에 진행하도록 합니다.

```s
root@DESKTOP-UOGF7U8:~# su python
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

python@DESKTOP-UOGF7U8:/root$
python@DESKTOP-UOGF7U8:/root$ su
Password:
root@DESKTOP-UOGF7U8:~#
```

## default user

우분투 shell 을 실행하면 기본 사용자가 **root** 로 로그인 됩니다. 때문에 매번 사용자 로그인/ 로그아웃을 반복해야 하는 번거로움이 있고 기본 사용자를 변경 설정하면 이러한 번거로운 부분의 해결이 가능합니다. 이번에는 윈도우 터미널을 실행한 뒤 `C:\>` 로 이동하여 **[기본 로그인 사용자](https://docs.microsoft.com/en-us/windows/wsl/user-support)** 를 변경하면 됩니다. 아래의 작업 뒤 우분투 터미널을 실행하면 기본 로그인 사용자정보가 변경된 것을 확인할 수 있습니다.

```s
C:\> lxrun /setdefaultuser python
```
