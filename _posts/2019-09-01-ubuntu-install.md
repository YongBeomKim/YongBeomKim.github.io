---
title : 우분투 듀얼부팅, 설치 and Tips
last_modified_at: 2019-09-01T10:45:06-05:00
header:
  overlay_image: /assets/images/book/ubuntu.png
categories:
  - ubuntu
tags: 
    - ubuntu
    - settings
---

우분투 설치 후 관련 자세한 초기설정 방법은 **[Ubuntu Setting in Win10](https://www.howtogeek.com/261417/how-to-change-your-user-account-in-windows-10s-ubuntu-bash-shell/)** 와 앞에서 정리한 [우분투 Setting & Tips](https://yongbeomkim.github.io/ubuntu/ubuntu-settings/) 내용을 참고합니다.

<br>

# **Tips**

내용을 확인하면 별거 없지만, 자주 사용하지 않아서 잊어버린 Linux 터미널 명령들을 정리 합니다.

> find ./ -name "*.xls"

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