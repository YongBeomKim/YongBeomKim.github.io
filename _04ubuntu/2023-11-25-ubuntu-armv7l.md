---
layout: blog
title: 우분투 에서 Python 패키지 설치 (armv7l)
tags:
- ubuntu
---

간단한 서버 작업을 하게 되었는데, 서버를 구축할 때 `Arm` CPU 서버는 10만원 근처에서 해결 가능한 반면, `x86` 인텔 서버는 `N5105`, `N6006` 서버인 경우 20만원대 초 중반까지 비용을 필요로 합니다. 이번에 `Arm` 서버작업을 진행하면서 **<span style="color:darkblue">파이썬 패키지 파일 설치</span>** Issue 가 있어서 해당 내용을 정리해 보았습니다.

<br/>

# Ubuntu Setting
## Ubuntu & CPU Info
`Samsung Exynos5422` 를 CPU 로 갖고있는 **<span style="color:darkblue">[ODROID-XU4Q](https://www.hardkernel.com/ko/shop/odroid-xu4q-special-price/)</span>** 제품을 재활용 하였습니다. 상세스펙은 다음과 같습니다.

```bash
$ cat /etc/issue
Ubuntu 22.04.3 LTS

$ uname -a  # 커널에 대한 정보
Linux odroid 6.1.61-16 
armv7l armv7l armv7l GNU/Linux
```

<br/>

# Python Package Issue
## 문제내용
우분투 설치 및 기타 서버설정들은 모두 완료가 되었는데 **<span style="color:orange">파이썬 모듈</span>** 들을 설치하면서 오랜 시간이 소요가 되었는데 이유는 32비트 `Armv7l` CPU 에 호환되는 패키지 모듈파일을 찾지 못해서 발생한 문제 였습니다.

```bash
$ pip install scikit_learn
Processing ./scikit_learn-1.2.2
Collecting scipy>=1.3.2 (from scikit-learn==1.2.2)
  Using cached scipy-1.11.4.tar.gz (56.3 MB)
  Installing build dependencies ... -
```

파이썬 패키지 설치과정을 최신버전의 `(ex> scipy-1.11.4.tar.gz)` 압축 파일을 다운 받은 뒤, 해당 버전에 해당되는 **<span style="color:darkblue">[CPU 호환 의존성](https://bluexmas.tistory.com/1076)</span>** 파일을 찾아서 설치 과정을 완료 합니다. 문제는 `Armv7l` 32비트 CPU 인 경우에는 최신버젼일 수록 컴파일된 파일이 없어서 설치과정을 마무리 하지 못하고 계속 검색과정을 반복하게 됩니다.

컴파일 의존성 파일을 확인해 보는 방법으로는 **<span style="color:darkblue">[Pandas PyPi](https://pypi.org/project/pandas/2.0.1/#files)</span>** 에서  **<span style="color:orange">의존성 설치파일 목록</span>** 을 확인하면 됩니다. 입니다. 아쉽게도 `Armv7l` 호환되는 패키지 파일내용을 위 페이지에서 제공하고 있지 않습니다.

```bash
pandas-2.0.1-cp310-cp310-win32.whl (9.5 MB view hashes)
pandas-2.0.1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (12.3 MB view hashes)
pandas-2.0.1-cp310-cp310-manylinux_2_17_aarch64.manylinux2014_aarch64.whl (11.6 MB view hashes)
pandas-2.0.1-cp310-cp310-macosx_11_0_arm64.whl (10.8 MB view hashes)
pandas-2.0.1-cp310-cp310-macosx_10_9_x86_64.whl (11.8 MB view hashes)
```

## wheel whl files
비공식적으로 제공하고 있는 **<span style="color:darkblue">[whl 패키지 파일 저장소](https://wheel-index.linuxserver.io/ubuntu/)</span>** 에서 의존성 파일을 다운 받아서 설치하는 방법이 가장 빠르고 확실 했습니다. 

관련사이트가 많은데, 이들 중 잘 정리된 사이트 중 하나가 **<span style="color:darkblue">[piwheels.org](https://piwheels.org/)</span>** 였습니다. 한가지 아쉬운 점은 `Python 3.9  Python 3.11` 패키지 파일만 제공하고 `Python 3.10` 은 제공하고 있지 않고 있습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="590px" src="{{site.baseurl}}/assets/linux/piwheels-pandas.png">
  <figcaption>https://piwheels.org/project/pandas</figcaption>
  </p>
</figure>

## Pytorch on armv7l
딥러닝 모듈인 **<span style="color:darkblue">[Pytorch](https://pytorch.org/)</span>** 은 빌드파일을 사용하지 않고 설치를 진행하면 다음과 같은 오류 메세지를 출력 합니다

```bash
$ pip install torch torchvision torchaudio
ERROR: Could not find a version that satisfies the requirement torch (from versions: none)
ERROR: No matching distribution found for torch
```

이같은 경우에도 **<span style="color:darkblue">[비공식 빌드 모듈](https://torch.kmtea.eu/whl/stable.html)</span>** 목록에서 호환되는 내용을 다운받아서 사용하면 설치 가능했습니다. 23년 11월 현재까지는 **<span style="color:darkblue">Python 3.9</span>** 환경에서 설치를 진행 하였습니다.

```bash
pip install numpy-1.26.2-cp39-cp39-linux_armv7l.whl
pip install Pillow-10.1.0-cp39-cp39-linux_armv7l.whl
pip install torch-1.8.1-cp39-cp39-linux_armv7l.whl
pip install torchvision-0.9.1-cp39-cp39-linux_armv7l.whl
pip install torchaudio-0.7.2-cp39-cp39-linux_armv7l.whl
```

<br/>

# Ubuntu tools
## Snap 설치하기
라즈베리파이에서 패키지 모듈인 **<span style="color:darkblue">[Enable snaps on Raspberry Pi and install mycli](https://snapcraft.io/install/mycli/raspbian)</span>** 설치하는 내용 입니다.

```bash
$ sudo apt update
$ sudo apt install snapd
$ sudo reboot
$ sudo snap install core
$ sudo snap install mycli
```

## 파이썬 버젼 변경하기
우분투 22.04 는 `Python 3.10` 을 기본으로 설치되어 있습니다. 앞에서 언급한 것처럼 `Python 3.9` 환경을 필요로 하는데 라즈베리파이 에서 파이썬 **<span style="color:darkblue">[Raspberry pi - can't install Python 3.11](https://stackoverflow.com/questions/76942052/raspberry-pi-cant-install-python-3-11)</span>** 을 설치하는 내용 참고하여 진행 하였습니다. 진행내용은 다음과 같습니다.

```bash
sudo apt-get install pkg-config zip g++ zlib1g-dev unzip default-jdk autoconf automake libtool
sudo apt-get install python3-pip python3-numpy swig python3-dev
sudo apt-get install libopenblas-dev
sudo apt-get install libtiff5-dev libjpeg8-dev libopenjp2-7-dev zlib1g-dev
sudo libfreetype6-dev liblcms2-dev libwebp-dev tcl8.6-dev tk8.6-dev python3-tk
sudo libharfbuzz-dev libfribidi-dev libxcb1-dev

wget https://www.python.org/ftp/python/3.9.18/Python-3.9.18.tgz
tar -xzvf Python-3.9.18.tgz 
cd Python-3.9.18/
./configure --enable-optimizations
sudo make altinstall
cat ~/.bash_history # less ~/.bash_history
```

<br/>

# 마무리
이번 작업을 하기 전까지는 서버를 `x86` 으로 변경해야 하나, 아니면 작업 서버를 새로운 CPU로 변경을 해야하나 걱정을 했었는데, 단순 서비스를 제공하는 서버로는 지금 작업한 스펙으로도 충분하다는 결론을 내릴 수 있었습니다. 향후에 위 조건으로도 해결이 어렵거나 정말로 보완이 필요한 상황이 발생하면 추가정리 하겠습니다.

<br/>

# 참고사이트
- [pillow Document](https://pillow.readthedocs.io/en/stable/installation.html)