---
layout: blog
title: Nvidia-smi & NVCC
tags:
- ubuntu
---

`IP Camera` 작업을 진행하면서 사용하게 된 모듈이 `opencv` 와 `ffmpeg` 입니다. 설치과정에 의해 하루종일 고생을 했습니다. 해당 모듈을 설치하는데 있어서 **CPU** 전용, **GPU** 활용 그리고 **armv7l** 어느것에 해당하는지에 따라 각각 다르게 진행을 해야 합니다. 운영체제는 Ubuntu 22.04 로 동일했습니다.

<br/>

# **Install**
## x86 x64 CPU
[기본적인 설치방법](https://phoenixnap.com/kb/install-ffmpeg-ubuntu) 입니다. 우분투 기본 저장소를 활용하면 됩니다.
```bash
sudo apt update
sudo apt install ffmpeg
pip install opencv-python
```

## Armv7l
32비트 환경에서 원활한 동작을 위해서는 비공식 별도로 컴파일 된 파일을 활용 합니다. `FFMPEG` 는 [ffmpeg : OpenRepos.](https://openrepos.net/content/sailffmpg/ffmpeg) [ffmpeg-xu4 : github](https://github.com/teacupx/ffmpeg-xu4) 그리고 `OpenCV`는 [OpenCV 4.1 on ODROID-XU4](https://github.com/zmacario/OpenCV-4.1-on-ODROID-XU4) [install-opencv](https://github.com/sgjava/install-opencv#install-opencv) 혹은 [opencv-mobile : github](https://github.com/nihui/opencv-mobile), [https://medium.com/analytics-vidhya/iot-opencv-4-1-on-odroid-xu4-8a14d395f191](https://medium.com/analytics-vidhya/iot-opencv-4-1-on-odroid-xu4-8a14d395f191) 를 참고 합니다.
```bash
sudo apt install libwebp-dev libtiff-dev libilmbase-dev 
sudo apt install libopenexr-dev libgstreamer1.0-dev libswscale-dev
```

## GPU
### INTRODUCE
`opencv` 에서 `GPU` 를 사용하려면, **[Numpy 배열](https://gr-st-dev.tistory.com/911)** 을 GPU 메모리로 복사해서 활용하면 됩니다. 때문에 파이썬에선 별도 설치과정은 필요가 없습니다. [Using FFmpeg with NVIDIA GPU Hardware Acceleration - Nvidia](https://docs.nvidia.com/video-technologies/video-codec-sdk/12.1/ffmpeg-with-nvidia-gpu/index.html) 즉 Nvidia 공식 페이지에서 안내를 하고 있습니다. 우선적으로 `CUDA` 와 `CUDA Toolkit` 이 설치되어 있어야 합니다.

작업을 시작하기 전에 아래의 내용과 같이 `Nvidia` 및 `Nvidia CUDA Toolkit` 이 제대로 설치되어 있는지를 확인해야 합니다. 특히 `CUDA Toolkit` 을 설치할때는 미리 설치된 `CUDA` 버젼과 일치 시켜야 합니다. 설치과정이 완료 되더라도 제대로 실행되지 않을 때에는 [Post-installation Actions - Nvidia](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#post-installation-actions) 문서에 정의한 대로 시스템 설정 내용을 추가하면 됩니다.

```bash
$ cat .zshrc
CUDA_HOME=/usr/local/cuda
PATH=${CUDA_HOME}/bin:${PATH}
export PATH=/usr/local/cuda/bin:${PATH}
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib

$ nvidia-smi 
Fri Dec 1 00:00:00 2023       
+------------------------+
| CUDA Version: 12.3     |
|========================|
| NVIDIA GeForce GTX ... |
+------------------------+

$ nvcc --version
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2023 NVIDIA Corporation
Cuda compilation tools, release 12.3, V12.3.103
Build cuda_12.3.r12.3/compiler.33492891_0
```

### CUDA
설치된 모듈을 제거하고 재설치하는 과정은 다음과 같습니다. 보다 자세한 설명은 [How to Install CUDA on Ubuntu 22.04 | Step-by-Step](https://www.cherryservers.com/blog/install-cuda-ubuntu) 를 확인하면 됩니다.

```bash
$ sudo apt purge "~nnvidia"
$ sudo apt install ubuntu-drivers-common
$ sudo ubuntu-drivers devices
== /sys/devices/pci0000:00/0000:00:01.0/0000:01:00.0 ==
driver   : nvidia-driver-535-open - third-party non-free
driver   : nvidia-driver-545-open - third-party non-free recommended

$ sudo apt install nvidia-driver-545
$ sudo reboot now
```

## CUDA Toolkit
[CUDA Toolkit Download](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=Ubuntu&target_version=20.04&target_type=deb_network) 공식페이지 내용을 참고합니다.

```bash
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt-get updatesudo apt-get -y install cuda-toolkit-12-3
sudo apt-get install -y cuda-drivers
```

## YASM
Yasm 이란 어셈블리 컴파일러인데 ffmpeg는 빌드 시 Yasm을 사용합니다. `apt install` 로는 설치가 진행되지 않는다면 [Yasm Downloads and Releases](https://yasm.tortall.net/Download.html) 공식 사이트에서 파일을 다운받아 진행을 하면 됩니다.
```bash
$ wget http://www.tortall.net/projects/yasm/releases/yasm-1.3.0.tar.gz
$ tar xzvf yasm-1.3.0.tar.gz
$ cd yasm-1.3.0
$ ./configure --prefix="$HOME/ffmpeg_build" --bindir="$HOME/bin"
$ make
$ make install
$ make distclean
```

## FFMPEG
[Using FFmpeg with NVIDIA GPU Hardware Acceleration](https://docs.nvidia.com/video-technologies/video-codec-sdk/12.1/ffmpeg-with-nvidia-gpu/index.html) 내용을 바탕으로 설치과정을 진행하면 됩니다. [FFMPEG - HWAccelIntro](https://trac.ffmpeg.org/wiki/HWAccelIntro) 공식문서 에서도 같은 내용을 자세하게 설명하고 있습니다.

```bash
$ git clone https://git.videolan.org/git/ffmpeg/nv-codec-headers.git
$ cd nv-codec-headers
$ sudo make && sudo make install
$ cd ..
$ git clone https://git.ffmpeg.org/ffmpeg.git ffmpeg/
$ sudo apt-get install build-essential yasm cmake
$ sudo apt-get install libmp3lame-dev libc6 libc6-dev
$ sudo apt-get install libtool unzip wget libnuma1 libnuma-dev
$ ./configure --enable-nonfree --enable-libmp3lame --enable-cuda-nvcc --enable-libnpp --extra-cflags=-I/usr/local/cuda/include --extra-ldflags=-L/usr/local/cuda/lib64 --disable-static --enable-shared
$ make -j 8
$ sudo make install
```

설치가 완료된 뒤 다음과 같은 오류 메세지를 출력하였습니다.
```bash
ffmpeg: error while loading shared libraries: libavdevice.so.60: 
cannot open shared object file: No such file or directory
```

오류가 발생한 파일을 로걸에서 찾으면 다음과 같은 결과를 볼 수 있었습니다.
```bash
$ sudo find / -name libavdevice.so.60
/usr/local/lib/libavdevice.so.60
/home/User/Downloads/ffmpeg/libavdevice/libavdevice.so.60
```

해결방법은 bash 설정파일에 내용을 추가해 주면 해결 되었습니다. 자세한 내용은 [ffmpeg: error while loading shared libraries: libavdevice.so.60: cannot open shared object file: No such file or directory](https://ciilii.com/question/164) 를 참고하면 됩니다.
```bash
$ cat .zshrc
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib
```

그리고 위 내용 중 공식문서 내용 이외에 추가한 내용은 다음과 같습니다. 추가한 이유는 `mp3` 인코더 모듈이 설치되지 않았기 때문 입니다.
```bash
$ sudo apt-get install libmp3lame-dev
$ ./configure --enable-libmp3lame
```

`$ ./configure --enable-nonfree --enable-cuda-nvcc --enable-libnpp` 옵션 내용을 살펴보면 다음과 같습니다. `--enable-nonfree` 는 [일부 외부 라이브러리 (non-free)](https://velog.io/@dashh/ffmpeg-1) 를 설치하는 옵션으로 결과물로 생성된 바이너리 파일 및 라이브러리는 재배포 해서는 안됩니다.

<br/>

# 참고자료
- [FFmpeg with x265 NEON arm64 cpu](https://gist.github.com/rromanchuk/d14901b520e5da3a496efd05b0a9bcf9)
- [FFmpeg - 개발역사와 기본 빌드](https://velog.io/@dashh/ffmpeg-1)
- [FFmpeg MP3 Encoding Guide](https://trac.ffmpeg.org/wiki/Encode/MP3)
- [ubuntu에서 FFmpeg, FFserver 설치하기](https://wnsgml972.github.io/ffmpeg/2018/02/09/ffmpeg_ffserver_config/)
