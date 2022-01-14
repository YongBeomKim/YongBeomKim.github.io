---

title : Virtscreen Monitor
last_modified_at: 2020-08-08T10:45:06-05:00
header:
  overlay_image: /assets/images/project/virtscreen.jpg
categories:
  - ubuntu
tags: 
    - ubuntu
    - vnc
---

Covid-19 로 인해서 스터디 카페에서 작업을 하다보니, Dual Monitor 의 부재로 인한 불편함이 가장 컸습니다. 이를 극복하기 위해 `Ngrok` 를 사용해 봤지만, 별도 Node 서버 연결이 필요하는 등 불편한 부분이 많았습니다.

안정적인 연결을 위해선 `Portable Monitor with USB C type` 을 구매하는 방법과, **Window 10** 에서 **안드로이드 연결을 지원하는 어플리케이션** 을 활용하는 방법 등이 있고, 이번에 정리할 내용을 **Linux** 에서 지원하는 VNC 외부화면 지원 Open Source 인 **[VirtScreen](https://github.com/kbumsik/VirtScreen)** 설치 및 사용방법 입니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/afgPtpw4NKo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>

## 간단하게 요약하면 다음과 같습니다.

1. VirtScreen GUI **[deb 파일](https://github.com/kbumsik/VirtScreen/releases)** 을 다운 받아서 설치 합니다.
2. `cannot detect system tray` 의 [PoP-OS 실행오류](https://github.com/kbumsik/VirtScreen/issues/22) 발생한 경우, GNOME Tools 인 [topicons-redux](https://extensions.gnome.org/extension/1497/topicons-redux/) 와 [tray-icons](https://extensions.gnome.org/extension/1503/tray-icons/) 를 추가로 설치 합니다.
3. 가상 모니터인 `VIRTUAL1` 을 찾이 못하는 경우 아래 내용의 설정파일을 추가 및 재부팅 합니다.

```r
$ inxi -G
Graphics:  Card: Intel Device 3e9b
   Display Server: x11 (X.Org 1.19.6 ) drivers: modesetting (unloaded: fbdev,vesa)
   Resolution: 1920x1080@48.00hz
   OpenGL: renderer: Mesa DRI Intel UHD Graphics 630 (Coffeelake 3x8 GT2) version: 4.5 Mesa 19.0.8
 π Git_blog master ✗ ❯

$ nvim /usr/share/X11/xorg.conf.d/20-intel.conf
Section "Device"
    Identifier "intelgpu0"
    Driver "intel"
    Option "VirtualHeads" "1"
    Option "AccelMethod" "sna"
    Option "TearFree" "true"
EndSection
```

## ReSet & Purge Remove

`xrandr` 등의 시스템 설정을 건들다 보면, 추후 작업을 할때 설정이 엉클어져서 문제가 발생하는 경우가 발생합니다.

```r
$ xrandr --listmonitors

Monitors: 3
 0: +*eDP-1-1 1920/344x1080/194+0+0  eDP-1-1
 1: +DP-1 1920/576x1200/324+1920+0  DP-1
 2: +HDMI-0 1280/261x800/163+3840+0  HDMI-0
```

정상적인 경우에는 사용중인 HDMI 모듈이 표시되어야 하는데, 설정값 문제로 장치 인식이 안되는 경우가 발생 가능합니다.

`Intel GPU` 는 위의 설정값을 활용하면 되고, `Nvidia` 의 **[설정을 초기화](https://askubuntu.com/questions/1097033/xrandr-missing-hdmi-output-after-install-nvidia-driver)** 하는 방법은 다음과 같습니다. 변경 후 `$ xrandr --listmonitors` 에서 기기 확인을 하면 됩니다.

```r
$ nano /lib/modprobe.d/nvidia-kms.conf
# Change the line options nvidia-drm modeset=1 
# to options nvidia-drm modeset=0.
nvidia-drm modeset=0

$ sudo update-initramfs -u
```

## Issue

현재 작업 후, 실행은 되지만 화면의 안정성이 떨어져서 활용은 하지 못하는 상황 입니다. 특히 `visual studio code` 에서 작업을 하는 경우 ToolTip 이 작동할 때 마다 화면이 Freeze 및 Wave 현상이 지속되고 있고, 이러한 내용은 **[Ubuntu 20.04](https://askubuntu.com/questions/1231824/fuzzy-graphics-after-upgrading-to-ubuntu-20-04)** 로 변경하면 된다는 내용 등으로 보아, `Intel UHD 630` 드라이버와 호환성 문제로 발생한 것으로 보입니다.

## 참고사이트

- **[YouTube Link](https://youtu.be/afgPtpw4NKo)**
- **[GitHub of VirtScreen](https://github.com/kbumsik/VirtScreen)**
- **[remote how to ubuntu](https://askubuntu.com/questions/1033436/how-to-use-ubuntu-18-04-on-vnc-without-display-attached)**
- **[xrandr missing hdmi output after install nvidia driver](https://askubuntu.com/questions/1097033/xrandr-missing-hdmi-output-after-install-nvidia-driver)**
