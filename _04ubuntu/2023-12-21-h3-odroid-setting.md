---
layout: blog
title: (Ubuntu) 우분투 설치 with Odroid
tags:
- ubuntu
---

`ARMv7 32bit` CPU 서버 운영에 관련된 내용은 [우분투 에서 Python 패키지 설치 (armv7l)](https://yongbeomkim.github.io/ubuntu/ubuntu-armv7l) 에서 정리하였습니다. 이번에 서버를 [ODROID-H3](https://www.hardkernel.com/shop/odroid-h3/) 로 변경하게 되었습니다. 이유는 `ffmpeg` 모듈의 설치 및 `Yolo v8` 기능의 추가 입니다.

[Samsung Exynos 5422 vs Intel Celeron N5095](https://www.cpu-monkey.com/en/compare_cpu-samsung_exynos_5422-vs-intel_celeron_n5095) 결과를 보면 Exynos 의 Single Thread 성능은 대략 2배정도 되는데 반해, CPU Thread 갯수는 Exynos가 8개, Intel CPU (N5105, N6006) 는 4개를 갖고 있습니다. 기타 Graphic 가속기와 PCI 확장 모듈을 갖고 있습니다. 작업용 PC로써는 기존의 서버보다 확실한 성능 및 운영 우의를 갖겠지만, 간단한 기능을 갖는 인터넷 서비스 서버로는 분산 정도에 따라 `ARMv7` CPU 서버의 환경도 충분할 것으로 보입니다.

<br/>

# OS Setting
## Ubuntu 22.04.3
Ubuntu 22.04.3 LTS 를 설치하려는 경우에는, 별도의 준비과정 필요없이 LAN 만 연결한 뒤 [Ubuntu Server 22.04.3](https://blog.dalso.org/article/ubuntu-22-04-lts-server-install) 설치과정을 진행 가능합니다.

<br/>

# Realtek PCIe FE / GBE / 2.5G 
## How to Install the Ethernet Driver on ODROID-H3/H3+
[How to Install the Ethernet Driver on ODROID-H3/H3](https://wiki.odroid.com/odroid-h3/hardware/install_ethernet_driver_on_h3plus#linux) RealTek 랜드라이버를 업데이트 하기전에 설치된 내용을 살펴보면 다음과 같습니다. `r8125` 장치가 설치되어 있는데, 드라이버는 `r8169` 드라이버가 설치되어 있습니다. 이 둘을 일치하는 과정 입니다.  
```bash
$ ifconfig
$ sudo lshw -class network
$ ethtool -i enp1s0
$ ethtool -i enp2s0
  driver: r8169
  version: 5.15.0-91-generic
  firmware-version: rt18125b-2_0.0.2 07/13/20
```

위 페이지 속의 링크를 들어가 보면 **2023/10/31** 을 기준으로 `2.5G/5G Ethernet LINUX driver r8125 for kernel up to 6.4 	9.012.03` 드라이버가 업데이트 되었습니다. 해당 페이지에서 드라이버를 다운받아서 설치하는 과정은 다음과 같습니다. 	
```bash
$ tar -xf r8125-9.012.03.tar.bz2
$ cd r8125-9.012.03
$ sudo apt install build-essential
$ sudo ./autorun.sh
$ ethtool -i enp1s0 
  driver: r8125
  version: 9.012.03-NAPI
```

<br/>

# 




우분투 설치 후 관련 자세한 초기설정 방법은 **[Ubuntu Setting in Win10](https://www.howtogeek.com/261417/how-to-change-your-user-account-in-windows-10s-ubuntu-bash-shell/)** 와 앞에서 정리한 [우분투 Setting & Tips](https://yongbeomkim.github.io/ubuntu/ubuntu-settings/) 내용을 참고합니다.

**[POP-OS 22.04 설치 기본 스크립트]({{site.baseurl}}/assets/download/popos_init.sh)**

<br>

# **Tips**

## **PDF 수정 및 변경**

[ubuntu PDFTK 설치 및 사용법](https://linuxhint.com/install_pdftk_ubuntu/)

[PDF 페이지 분할](https://askubuntu.com/questions/56853/splitting-a-pdf-page-in-two)


내용을 확인하면 별거 없지만, 자주 사용하지 않아서 잊어버린 Linux 터미널 명령들을 정리 합니다.

## **[ssh 접속 연결시 Warning 메세지 출력하는 경우](https://hoyoung2.tistory.com/106)**

Domain 의 Ip 값을 변경한 경우 **서버의 공개키가 변경된 경우로**, ssh 접속시 위 메세지가 출력되면서 해당 Ip 가 저장되지 않고 계속 오류를 출려하는 문제가 있습니다. 해결 방법으로는 접속이 문제 된 도메인의 정보를 삭제 후 재실행하면 해결 됩니다.

공격(man-in-the-middle attack)일 가능성이 있어서 1) $HOME/.ssh/known_hosts 파일에 해당 호스트에 대한 키를 삭제한다. 2) $HOME/.ssh/known_hosts 파일을 삭제한다. 방법을 선택하여 실행 합니다.

```r
# ssh localhost
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
@ WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! @ 
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY! 
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the RSA key sent by the remote host is 
00:f3:19:ee:36:f3:1f:fe:5c:ec:23:e0:c3:ba:3f:26. 
Please contact your system administrator. 

Add correct host key in /root/.ssh/known_hosts to get rid of this message.
Offending RSA key in /root/.ssh/known_hosts:1
RSA host key for localhost has changed and you have requested strict checking.
Host key verification failed. 

$ cd .ssh
$ rm -f known_hosts   # 공개키가 담겨있는 파일을 삭제하고 접속한다. 
 Permanently added 'localhost' (ECDSA) to the list of known hosts.
```


## Ubuntu Terminal 명령어 모음

파일 이름으로 위치 찾기

```r
$ find ./ -name "*.xls"

# 기본설정 브라우저 설정값 확인 및 변경
$ sudo update-alternatives –-config x-www-browser
```


## unable **"cinnamon-session-cinnamon"** X session

우분투 Mint 가 장점이 많으면서도 위 에러로 인하여 갑자기 시스템이 먹통이 되버리는 문제가 있습니다. 그나마 휴일에 발생하였기에 다행이지 평일 업무 중 해당 상황을 처음 격게된 경우라면 상당히 곤란한 오류 입니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/x-session-error.jpg">
</figure>
21
이를 해결하기 위해 검색해 본 결과, **우분투 재설치** 내용이 가장 많았습니다. 이는 기존의 설정 내용과 저장된 파일을 삭제하는 등의 문제가 있고, USB 로 부팅 후 접근하려고 했지만 **Permission Error** 로 인하여 작업에도 곤란한 부분이 많았습니다.

다행히 검색 중 **[Mint 리눅스 포럼](https://forums.linuxmint.com/viewtopic.php?t=273579)** 내용을 확인해서 적용해본 결과 문제가 바로 해결 되었습니다.

1. 리눅스 재부팅
2. 로그인 실행
3. 위 오류가 출력되면 **Click OK** 를 누릅니다.
4. 검은 화면에서 **Ctrl + Alt + F1** 을 누릅니다
5. **Id** 와 **Password** 로 Terminal 접속 후 다음 내용을 입력 합니다.

```r
$ sudo apt-get update
$ sudo apt-get install nemo
$ sudo apt-get install cinnamon
$ reboot
```

## 윈도우10 Bash **SSH-Key** 생성 및 등록

우분투에서 ssk-key 생성 및 등록은 여러가지 자료들이 많이 나와있어서 문제가 안된다.. 문제는 windows10 에서 어떻게 생성하고 활용할 것인가???? 윈도우에 우분투가 포함되어 장점도 있지만, 2개의 Operation System 을 연결하는 방법에서 개념이 명확하게 정리되어 있지 않으면 작업에 있어서 어려움이 생기고 그러한 부분을 정리해 보도록 하겠습니다.

### SSH-key 생성

**윈도우 내부의 우분투** 를 실행하고 해당 터미널에서 인증키를 생성합니다. 생성된 파일은 **~/.ssh** 폴더에 저장되고 이를 활용하여 검증이 실행 됩니다.

```r
UserName@DESKTOP-A1BCDEF:~$ ssh-key
UserName@DESKTOP-A1BCDEF:~$ cd .ssh/
UserName@DESKTOP-A1BCDEF:~/.ssh$ ls
id_rsa   id_rsa.pub    known_hosts
```

### SSH-key 생성키 복사

**윈도우 내부의 우분투** 에서 생성한 인증파일을 **윈도우 시스템으로 복사** 합니다. 윈도우 경로는 `/mnt/c/` 를 지정하면 **윈도우 root** 경로와 연결됩니다. 인증키 파일을 붙여놓는 장소로는 `/users/사용자id/.ssh` 와   `/Program File/Git/.ssh` 두가지 폴더를 설명한 내용들이 있었는데, 작업해본 결과 `/users/사용자id/.ssh` 폴더 붙여놓으면 제대로 작동하는 것을 볼 수 있습니다.

```r
UserName@DESKTOP-A1BCDEF:~/.ssh$ cp * /mnt/c/Python/
```

### Git 에 SSH 등록

ssh 값을 Git 서비스에 등록하면 자동으로 로그인 됩니다. 사용자 설정메뉴에서 SSH 값으로 `id_rsa.pub` 파일의 내용을 추가 한 뒤, Git 을 SSh 값으로 지정하면 자동으로 업로드 실행내용을 확인 합니다.

<br>

# **Dual Booting**

윈도우 10 기본설치 및 **리눅스 Mint** 로 변경, Tensorflow 1.13 부터 Cuda 10 지원 등, 최신 변경된 설정에 맞는 설치방법을 정리하고, 공통된 내용을 **리눅스 스크립트 파일** 로 생성 및 저장하여, 추후 활용시 적용 합니다 <strike>server 를 google 에 설치하기 위해서라도 docker 부분은 추후 보완 합니다.</strike>

윈도우 리눅스 듀얼부팅을 정리하면, HDD를 비어있는 상태에서 
1. 윈도우 설치 USB를 활용하여, 윈도우 부트로더, 윈도우 설치, 리눅스 설치용 partion 3개를 생성합니다.
2. 이를 위해 먼저 윈도우 10 USB 로 파티션 추가 및 윈도우를 설치 합니다.
3. 완료 후, 리눅스 USB로 부팅한 뒤 나머지 파티션에 Linux 를 설치 합니다.

<br>

# **Install Windows**

## **부팅용 USB 만들기**

부팅용 Usb 를 만들 때에 자주 사용하는 모듈이 [rufus](https://rufus.ie/) 프로그램 입니다. 윈도우에서 작업을 하는데, 기본 설정값으로 USB 를 제작하고 부팅을 하면 다음과 같은 오류가 발생하였습니다.

```
*********************************************
***** ERROR : LEGACY BOOT OF UEFI MEDIA *****
*********************************************

should recreate it in Rufus using the following setting:
* Partion scheme -> MBR
* Target system -> BIOS...
```

처음에는 부팅 Disk 문제인줄 알았지만, 내용에 나와있듯이 **Rufus** 에서 해당 USB 작업시 작업변경 내용을 알려주고 있었고, 부팅용 UBS 작성시 설정값을 위 내용으로 적용하고 설치를 진행하면 제대로 결과가 나오는 것을 알 수 있습니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/project/dual_boot.jpg">
</figure>

## **SSD 파티션 오류문제**

SSD 를 포맷 후 설치하는 경우, 종종 **이 디스크에는 Windows 를 설치할 수 없습니다** 메세지가 출력 됩니다. 이유는 SSD 하드 디스크가 **MBR** 방식으로 되어 있는데, 이를 **GPT** 방식으로 [파티션을 변경](https://blog.naver.com/PostView.nhn?blogId=bk32167&logNo=221524850658&from=search&redirect=Log&widgetTypeCall=true&directAccess=false) 해야 해결이 됩니다

```
# Shift + F10 를 눌러서 Terminal 실행
$ diskpart
$ DISKPART> disk
$ DISKPART> select disk 0
$ DISKPART> clean
$ DISKPART> convert gpt

# exit 를 눌러서 빠져 나옵니다.
```

## **최대 절전모드 실행**

SSD 는 물리디스크가 아니여서 켜고 끄는데 별다른 물리적인 문제가 발생하지 않습니다. (하지만 시스템과 리소스는 조금 차지하지만 소음이 관리되는 만큼 좋다고 생각한다 ...) SSD 하드디스크를 활용하는 경우는 이를 활성화 합니다.

## **기타 필요한 내용들**

필요한 유틸리티 설치와 인증 프로그램의 실행, 그리고 **One Driver 삭제** 와 **Windows Update 수동/ 해제** 를 실행 합니다. 수시로 업데이트 문제로 종료시 대기시간이 길어지는 문제가 있는데, 중요한 보안이슈등은 언론에 나오기도 하고, 업데이트 중에는 오히려 불안정한 내용들이 포함되어 문제가 되기도 하는 등 개인적으로는 장점보단 단점이 더 많다고 생각합니다.

재설치로 작업한 뒤에는 최신 업데이트로 모두 적용을 하고 난 뒤에 **[업데이트](https://mastmanban.tistory.com/972)** 를 **수동 및 정지** 로 변경합니다.


## **Windows 10 설치 후**

인증 과 onedrive 제거, 업데이트 실시, 로그인 화면 설정 등 관련 setting 을 마치고 리눅스 설치와 관련된 내용으로 넘어가겠습니다. 추후 보완할 내용은 아래에 기록하면 됩니다.

<br>

# **Install Ubuntu**

처음 리눅스에 대해 잘 모르고 **Ubuntu Mate** 와 17.01 버젼을 설치하여 사용하고 있습니다. 하지만 **LTS** 버젼이 아니여서 2019년 9월 현재 관련 업데이트가 모두 종료하였습니다.

관련 시스템 등을 재설치를 계획한 만큼 **우분투 18.04 LTS** 로 시스템을 재설치 진행 합니다. 관련 시스템별 설치 **Script** 정리가 되면 [Odroid Xu4](https://www.hardkernel.com/blog-2/ubuntu-18-04-for-odroid-xu4/) 에도 우분투 18.04 를 설치 합니다.

## **ACPI: Invalid _PSD data**

리눅스 서버를 설치할 계획도 있었지만, **주식 HTS** 연동 및 **HomeTex** 서비스 연계등을 고려했을 때, 윈도우의 활용도가 충분히 있는만큼 추후에 다시 시도하기로 남기게 되었습니다. 위 오류의 문제점은 **nvidia** 관련 드라이버와 충돌로 현재는 예상 됩니다.

데스크탑에 기존 설치 성공한 리눅스 구버젼이 있으면 이를 활용하여 설치를 시도해 보겠습니다.

**2019년 9월 5일 MSI U200** 작업시, 우분투 설치 중 꺼지는 현상은 반복 되었고, 내부를 전체 뜯어서 확인하고 Mulit Slot 의 전원 부분을 제거하는 작업 도중에, 모니터가 사망하는 부작용으로 작업을 중단..
{: .notice--danger}

<br>

# **Plan**

우선 msi U200 은 잘 보내드리도록 하자, 결합해서 다시 살아나면 좋고.. :) 어찌되었든 집에서 Desktop 제거하기 프로젝트 시작하기..

1. **Teclast x98 3G Air** 에는 **[우분투 16.04 LST](https://salda.ws/video.php?id=hZLv6q38icw)** 설치
2. Dell venu 8 note 를 windows 10 머신(서버) 로 활용
3. **Odroid HC1** 구매 후, Nas 서버로 운영하기 (SSD 장착)
4. **Odrid Xu4** 를 집에서 파일 등 복사용 DeskTop 활용
5. 남는 SSD 는 **USB 외장하드** 처럼 활용하기

**Chuwi VI10 (Intel Atom Z3736F)** 에서 테스트를 마친 내용 입니다.

1. **[Touch screen driver](https://github.com/onitake/gslx680-acpi)**
2. **[WIFI+BT driver RTL8723BS](https://github.com/hadess/rtl8723bs)**
3. **[Kernel v4.5-rc1](http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.5-rc1-wily/)**

중고 노트북 중엔 [레노버 아이디어패드 S145-15IWL CEP (SSD 128GB)](http://prod.danawa.com/info/?pcode=7485370&cate=1131320) 33만원 짜리도 있어라.. 우선은 있는걸로 돈을 벌고 나중에 사자 ㅠㅠ..