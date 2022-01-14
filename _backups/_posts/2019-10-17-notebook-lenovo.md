---
title : Thinkpad X1E 듀얼부팅 Setting
last_modified_at: 2019-10-17T10:45:06-05:00
header:
  overlay_image: /assets/images/project/lenovo.jpg
categories:
  - notebook
tags: 
    - thinkpad
    - notebook
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


## **[Ubuntu 18.04 on Thinkpad X1 Extreme](https://bauklimatik-dresden.de/privat/nicolai/index.html?https&&&bauklimatik-dresden.de/privat/nicolai/html/en/lenovo_x1_extreme_ubuntu1804.html)**

이번에도 듀얼부팅과 관련하여 경험을 정리한 내용 입니다.

큰 맥락은 위와 동일하고, 그래픽카드와 관련하여 배터리 절약 모드를 위해서는 Intel GPU 만 사용하는 방법이 좋지만 이는 HDMI 출력이 비 활성화 되는 문제가 있어서 상황에 따라 Nvidia 와 Intel GPU 설정값을 잘 조정해야 하는 내용을 보다 상세하게 설명 하였습니다.

I have **Windows on the first SSD** (Windows installer created three partitions, the second holding the efi-bootloader). **Linux goes to the second SSD.** Given the good reviews, I started installing Pop! OS 18.04 to test the hardware support.

I first switched in the **BIOS the Graphics** to **"Discrete Graphics"** before installing. **Boot method is UEFI**, then legacy. During installation, Installation went smoothly and graphics worked well right from the start (Pop! OS contains fairly new nvidia drivers precompiled in their kernel).

Problem was: there was no boot menu. Managed to adjust the bootloader timeout, so that the boot menu appears. But no Windows in the boot loader and I couldn't find a way to get Pop! OS to update its boot menu.

<br>

# Vs Code Setting

```r
$ code --list-extensions
abusaidm.html-snippets
akamud.vscode-theme-onedark
alexcvzz.vscode-sqlite
azemoh.one-monokai
batisteo.vscode-django
bigonesystems.django
formulahendry.auto-rename-tag
hollowtree.vue-snippets
ionutvmi.path-autocomplete
maximetinu.identical-sublime-monokai-csharp-theme-colorizer
ms-python.python
octref.vetur
s3gf4ult.monokai-vibrant
sdras.vue-vscode-snippets
sleistner.vscode-fileutils
vscode-icons-team.vscode-icons
Yggdrasill-7C9.axios-snippets
yzhang.markdown-all-in-one
zhuangtongfa.Material-theme
Zignd.html-css-class-completion
```
