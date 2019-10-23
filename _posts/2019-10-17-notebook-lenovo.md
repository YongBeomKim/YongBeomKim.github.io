---
title : lenovo 노트북 Setting
last_modified_at: 2019-10-14T10:45:06-05:00
header:
  overlay_image: /assets/images/project/lenovo.jpg
categories:
  - business
tags: 
    - startup
    - business
---

**Thinkpad E470** 을 만족스럽게 3년간 사용하던 입장에서는, 약간의 성능과 배터리 ,GPU 그리고 무게감량된 신제품을 찾게 되었고, 당시에는 가장 최신제품인 **Thinkpad X1 Extream 2 gen** 을 구매하였습니다. 결과적으로는 아쉬움이 많았던 결정이었는데, 첫째로 오픈마켓등 **다양한 채널에서 판매시 이벤트가 더 많고**,  둘째는 **Custom edition** 을 구매한 결과, 문제점이 생겼을때 대처가 어렵고 오래걸리는 상황을 경험해야 했습니다.

여러 방면으로 아쉬움이 많은 제품구매였고, 구매한 만큼 사용을 해야하는데 현재는 집에 박스채 잠들고 있습니다. 이유는 2가지인데

1. 배터리 소모가 너무 빠르다
2. 발열 처리가 떨어져서 작업시 방해가 되고, 소음등도 제어를 잘 못한다

위 2가지 내용이 3년전 구매한 제품보다도 떨어지는 결과로 인해 외부에서, 특히 도서관에서 작업하기 부족한 부분들이 많아서 아직도 실사용을 하지 못하고 있습니다. 이러한 상황을 극복하고 다양한 대안들이 제시된 내용을 정리 및 적용하기 위해서 이번 페이지 내용을 작성하게 되었습니다.

<br>

# Setting Windows

## **[발열잡기 기본작업](https://daaeedodam.tistory.com/17?category=322509)**

발열잡기 기본은 **써멀 구리스 재도포** 와 **Intel Extream Tuning Utility** 를 사용한 Under Volting 을 정리한 내용 입니다.

## **[Under Volting](https://www.reddit.com/r/thinkpad/comments/a40znq/thinkpad_x1_extreme_constant_fan_noise/)**

언더볼트와 관련된 Reddit 게시물 입니다. Under Volt **cpu** with **-130mV** and **gpu** with **-80.mv**, 내용 중에는 **-150mV** 까지도 실행한 내용이 설명되어 있네요. 추가적 설정가능한 방법들로는 3가지가 설명되어 있습니다.

1. **[Undervolt](https://www.notebookcheck.net/ThrottleStop-Primer.213140.0.html), | [Undervolt](https://www.notebookcheck.net/Intel-Extreme-Tuning-Utility-XTU-Undervolting-Guide.272120.0.html)**
2. **[Repaste](https://www.reddit.com/r/thinkpad/comments/a14vi2/basic_repasting_guide_for_the_lenovo_extreme_x1/)**
3. **[TPFanControl](https://github.com/cjbconnor/TPFanControl)**


## windows 10 Setting

윈도우와 관련된 설정은, **Bios 및 윈도우 업데이트** 최신설치 및 **Intel Under Volt** 의 활성화로 요약 됩니다. 사용자가 작업할 내용이 적은 반면에, 문제가 생기면 유연하게 대처하기가 어려운데 현재가 윈도우 설치 후 언더볼트를 설정할 **Intel XTU 프로그램의 화면이 뜨지 않는 문제** 로 보류를 하고 있습니다.

<br>

# Setting Linux

작업시간이 길고 보다 사용자 조작이 용이한 리눅스 관련 설정내용을 정리 하겠습니다.

## **[Pop OS Linux Setting](https://deepak.puthraya.com/2019/10/10/popos-thinkpad-x1-extreme.html)**

아래의 2개 설명과 달리, 2세대 Thinkpad X1 Extream 의 Pop OS 설치에 관련한 내용 입니다. 이를 참고하여 설치를 진행해 보겠습니다.


##  **[Review : Thinkpad X1E (Linux)](https://www.youtube.com/watch?v=Uqr_ry5Jseo)**

윈도우와 리눅스 듀얼부팅에 관해서 정리한 내용으로 간단하게 요약하면 다음과 같다. 결론은 다시 깔자 ㅠㅠ...

1. 기본 설치 윈도우 와 **Lenovo Vantage software** 의 펜제어 능력은 안좋다
2. 윈도우를 새로 재설치를 하자
3. 듀얼부팅 설치전 Bios 에서 **BIOS/UEFI** 를 통일하여 설치
4. 그래픽 설정은 hybrid graphics 를 **Discrete Graphics** 로 변경
5. 부팅 설정은 **disbale Secure Boot** 로 변경
6. Coil Whine 문제가 발생시 **disabled CPU power management** 로 변경
7. 4번과 5번은 윈도우와 리눅스 설치 후, 되돌리면 된다.
8. 리눅스 설치 후 `$ sudo prime-select intel` 에서 "tlp" 활성화 하기

I did a clean install of Windows 10 Pro (not sorry :-P) + Ubuntu 18.04 LTS as dualboot system. **I had to switch** from hybrid graphics to **discrete(이산한) graphics** in the **BIOS/UEFI** to be able to do the install. **After the install was finished** (including graphics drivers), **I could switch back to hybrid graphics.** CAVEAT: Make sure to have BIOS version 1.19 or later.

– if you want to have a **UEFI system, don't change to legacy. Do not mix** to not have issues related to this topic.

– **Coil whine (Gpu 의 작동으로 비정상적인 소리가 발생)** is a serious issue with almost all machines.With the **pre-installed Windows 10** plus **Lenovo Vantage software**, I also **disabled CPU power management in the BIOS** and many other people report that this really helps.

– You have to **disbale Secure Boot** to do a Linux install. **After the install, you can enable it** again. (Personally, I don't like it since it can get annoying when you do a Linux kernel update. In this regard, inform yourself about **"Secure Boot", "DKMS", and "MOK management".** However, I'm not experienced enough to make any professional recommendations.)

Battery life (4-cell 80 Wh Li ion battery) with i7-8750H and 4K Touch (at 20 % brightness level and resolution set to Full HD) when doing web browsing, watching some youtube videos, light office applicaitons like Thunderbird, plus a bit of idling:

– Clean Windows 10 Pro **(hybrid graphics and best Windows 10 power saving mode):** ~ 6 hours.

– Ubuntu 18.04 LTS with minimal installation (**"$ sudo prime-select intel"** graphics mode AND **"tlp" power saving package**): ~ 8 hours.

With the pre-installed Windows 10 plus Lenovo Vantage software, **the cooling fans were really annoying.** Either they were off or in **full jet-engine mode.** With my **clean Windows 10** and with **Ubuntu 18.04 plus "tlp" package** as stated above, the fans are more under control and are actually running at a reasonable rotation speed if they need to turn on at all.

## **[Ubuntu 18.04 on Thinkpad X1 Extreme](https://bauklimatik-dresden.de/privat/nicolai/index.html?https&&&bauklimatik-dresden.de/privat/nicolai/html/en/lenovo_x1_extreme_ubuntu1804.html)**

이번에도 듀얼부팅과 관련하여 경험을 정리한 내용 입니다.

큰 맥락은 위와 동일하고, 그래픽카드와 관련하여 배터리 절약 모드를 위해서는 Intel GPU 만 사용하는 방법이 좋지만 이는 HDMI 출력이 비 활성화 되는 문제가 있어서 상황에 따라 Nvidia 와 Intel GPU 설정값을 잘 조정해야 하는 내용을 보다 상세하게 설명 하였습니다.

My X1 Extreme shipped with a 1.09 BIOS version - with that BIOS version booting Linux is not really possible. Tried Ubuntu 18.04 and 18.10, also Pop! OS 18.04 and Pop! OS 18.10 - all got stuck during boot. Ubuntu just stopped booting with some weird ACPI errors. Pop! OS at least got a bit further, but then hang.

First, a BIOS update was necessary

I have **Windows on the first SSD** (Windows installer created three partitions, the second holding the efi-bootloader). **Linux goes to the second SSD.** Given the good reviews, I started installing Pop! OS 18.04 to test the hardware support.

I first switched in the **BIOS the Graphics** to **"Discrete Graphics"** before installing. **Boot method is UEFI**, then legacy. During installation, Installation went smoothly and graphics worked well right from the start (Pop! OS contains fairly new nvidia drivers precompiled in their kernel).

Problem was: there was no boot menu. Managed to adjust the bootloader timeout, so that the boot menu appears. But no Windows in the boot loader and I couldn't find a way to get Pop! OS to update its boot menu.

Ubuntu 18.04.2

Since Pop! OS is based on Ubuntu, I tried installing **Ubuntu 18.04.2 LTS** next (actually, the latest Ubuntu release, since 18.10 is already a few weeks older). Again, installation was done with discrete graphics selected, UEFI boot mode as default.

During the installation I chose **"Something else"** in the installation choice screen. Then I created a "/" root partition and swap partition (16 GB at end of disk) **on the second m.2 SSD.** The first disk (with Windows) I selected as target for the boot loader.
After the installation, everything looked nice. Actually, the nouveau drivers were being used and still the system ran stable without any problems. **GRUB-bootmenu showed Linux and Windows** and I could boot both OS. Disabling Windows Quickstart

Having very fast SSDs there is no need for the fast boot feature. In Windows, I **turned off Fast Boot** (see instructions). Installing propriatory nvidia drivers

When switching in **BIOS** from **discrete to hybrid graphics**, booting Ubuntu doesn't work anylonger (system hangs during boot).

Note: **to avoid hangs when something is wrong with the graphics drivers**, you can press **'e'** in the **GRUB menu** and insert `nomodeset` after the `splash` option in the linux boot line. Then press **CTRL+X** to boot with just Intel drivers. 
{: .notice--info}

During installation boot with **discrete graphics enabled.** Start the live-system, setup **network connection** and then install with propriatory drivers and updates enabled during install.

After booting the newly installed system the first time, **install the propriatory nvidia drivers.** Since I had problems with the nvidia-390 driver, I suggest using the most recent one.

First add the repository for updated graphics drivers:

> sudo add-apt-repository ppa:graphics-drivers/ppa
> sudo apt-get update

Then, you can check which drivers match your system:

> ubuntu-drivers devices

gives on my machine:

```r
== /sys/devices/pci0000:00/0000:00:01.0/0000:01:00.0 ==
modalias : pci:v000010DEd00001C8Csv000017AAsd00002267bc03sc00i00
vendor   : NVIDIA Corporation
model    : GP107M [GeForce GTX 1050 Ti Mobile]
driver   : nvidia-driver-410 - third-party free
driver   : nvidia-driver-418 - third-party free recommended
driver   : nvidia-driver-396 - third-party free
driver   : nvidia-driver-415 - third-party free
driver   : nvidia-driver-390 - distro non-free
driver   : xserver-xorg-video-nouveau - distro free builtin
```

I installed the recommended driver:

> sudo apt install nvidia-driver-418

UPDATE: just installed the new version 430 of the driver - works perfectly so far.

Now I could boot Linux with either discrete or hybrid graphics in the BIOS settings. You can test if the driver is working correctly with:

> sudo nvidia-smi

which gives

```r
Fri Mar 29 17:50:53 2019
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 418.56       Driver Version: 418.56       CUDA Version: 10.1     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  GeForce GTX 105...  Off  | 00000000:01:00.0  On |                  N/A |
| N/A   47C    P8    N/A /  N/A |    673MiB /  4040MiB |      0%      Default |
+-------------------------------+----------------------+----------------------+

+-----------------------------------------------------------------------------+
| Processes:                                                       GPU Memory |
|  GPU       PID   Type   Process name                             Usage      |
|=============================================================================|
|    0      3302      G   /usr/lib/xorg/Xorg                           257MiB |
|    0      3445      G   /usr/bin/gnome-shell                         272MiB |
|    0      3649      G   /usr/bin/nextcloud                            11MiB |
|    0     16306      G   krusader                                       1MiB |
|    0     21161      G   ...quest-channel-token=6673354144912086020    48MiB |
|    0     24101      G   ...-token=E7C04B3E75389DAC2ACA4279685CC90F    78MiB |
+-----------------------------------------------------------------------------+
```

Improving battery life

**On Windows** the **hybrid graphics/ Optimus feature** causes the desktop to use only intel graphics and thus get really long battery time.

**On Linux,** the desktop is using the **NVidia card by default.** When "hybrid graphics" in enabled in the BIOS, **you can switch** between **intel** and **nvidia mode** with the following commands:

> sudo prime-select intel

and back to NVidia with

> sudo prime-select nvidia

Current setting can be queried with

> sudo prime-select query

The change will get in effect after logout/login or sometimes after a reboot.

Note: I had trouble to use the HDMI port to connect an external screen, even when I rebooted after selecting nvidia PRIME drivers (when using GDM3 login manager). The only reliable way was to use
{: .notice--info}

> sudo nvidia-settings

and switch between intel and NVidia drivers using the dialog. After logging out and logging back in (when switching from intel **to NVidia) the HDMI port worked** and the screen config could be changed with GNOME settings and the **Special+P** shortcut.

To avoid the problems mentioned above for gdm, you can install **another display manager,** for example lightdm.

> sudo apt install lightdm

After the installation you can select the login manager to use. Later, you can switch between login managers with:

> sudo dpkg-reconfigure gdm3

or

> sudo dpkg-reconfigure lightdm

With **lightdm** you can now quickly switch between intel and nvidia with the

> sudo prime-select <intel|nvidia>

command line.

Even more convenient is the use of the gnome extension Argos switcher (see below).

**Other hardware**

The built-in hardware of the X1 Extreme works otherwise as expected (except the fingerprint sensor). Other stuff needed a bit more work: Logitech Unifying Receiver

The control software Solaar needs to be downloaded (Ubuntu package is broken). Download from https://pwr.github.io/Solaar, extract and run setup.py with sudo.

**GNOME Configuration, GNOME Extensions**

For productivity, you need the gnome extensions. First the shell extensions:

> sudo apt-get install chrome-gnome-shell

Then open Firefox, navigate to https://extensions.gnome.org and install the browser extension. You also need the following packages:

> sudo apt-get install gir1.2-gtop-2.0 gir1.2-networkmanager-1.0 gir1.2-clutter-1.0

I use the following extensions:

```
Steal My Focus (by sstent), prevents the annoying "Window is ready" message when compiling/debugging GUI software
Backslide
system-monitor
Touchpad Indicator (by user501254), automatically disables touch pad when mouse is plugged in
Datetime Format, allows customization (via extensions.gnome.org) of date/time format in status bar
Argos (needed for argos intel/nvidia switcher), see argos-indicator-nvidia-prime
Desktop Icons (puts icons/folders/shortcuts back on desktop)
```

**GNOME Shortcuts**

Einstellungen->Geräte->Tastatur: - "Fenster wechseln" -> Tastenkombi "Alt+Tab" einstellen (und damit Tastenkombination für "Anwendung wechseln" ersetzen)
Software

Here are a few notes on the software that I use (mostly for myself).
General tools and utilities

> sudo apt install gdebi p7zip-full htop okular

NextCloud

> sudo add-apt-repository ppa:nextcloud-devs/client
> sudo apt install nextcloud-client

Atom

> wget -O atom-amd64.deb https://atom.io/download/deb
> sudo gdebi atom-amd64.deb

Data migration: copy the ~/.atom directory
Thunderbird

Data migration: copy the ~/.thunderbird directory and copy ~/.gnupg for all the pgp/SMIME keys.
Lyx/Latex

First tex and helper tools:

> sudo apt install texlive-full jabref texmaker

Lyx is not taken from official repo, but instead downloaded here: https://wiki.lyx.org/LyX/LyXOnUbuntu.
Gimp + Graphics software

> sudo apt install gimp shutter

Webbrowser

Opera, download deb from https://www.opera.com/de/download and install.
File management

I use krusader:

> sudo apt install krusader keepassx kompare \ kio-extras kwalletmanager

Start Krusader and run initial config (note: icons are missing).
Install icon theme:

> sudo apt install breeze-icon-theme-rcc

Copy file /usr/share/icons/breeze/breeze-icons.rcc to the Krusader config map ~/.local/share/krusader/icontheme.rcc.

Restart Krusader, and icons are in place.

Settings:
Allgemein -> Terminal:

gnome-terminal --working-directory %d --name %t -e

Allgemein -> Betrachter/Editor:

/usr/bin/gedit

Desktop Icon, create file ~/.local/share/applications/krusader.desktop with content:

[Desktop Entry]
Name=Krusader
GenericName=File Manager
Exec=krusader
Icon=krusader_user
Terminal=false
Type=Application
Categories=Qt;Utility;

Software Development

> sudo apt install qt5-default cmake subversion git \
    meld kompare libqt5svg5 libqt5svg5-dev libqt5serialport5 libqt5serialport5-dev

Up-to-date Qt version

Open source version of Qt5 from https://www.qt.io/download-qt-installer
SmartSVN and SmartGIT
Download from Webpages: https://www.smartsvn.com and https://www.syntevo.com/smartgit/download.

For SmartSVN 9.1 you need the following fix:

    Note: Edit smartsvn.sh. There you will find a line nearly at the bottom

    export LD_LIBRARY_PATH=${_SUBVERSION_LIBRARY_PATH}:${LD_LIBRARY_PATH} 

    Please uncomment this line by adding a leading #. 

After starting SmartSVN, edit preferences and in Authentication -> SSH section select "Use system SSH" so that you can use your ssh-agent keys.
WingIDE and Python
Python 3 and PyQt5:

> sudo apt install python3 python3-pyqt5

Download WingIDE personal from https://wingware.com/downloads/wing-personal. 