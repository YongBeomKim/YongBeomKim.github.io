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
기본적인 설치방법 입니다. 우분투 기본 저장소를 활용하면 됩니다.
```bash
sudo apt update
sudo apt install ffmpeg
pip install opencv-python
```

## Armv7l
32비트 환경에서 원활한 동작을 위해서는 비공식 별도로 컴파일 된 파일을 활용 합니다. `FFMPEG` 는 [ffmpeg : OpenRepos.](https://openrepos.net/content/sailffmpg/ffmpeg) [ffmpeg-xu4 : github](https://github.com/teacupx/ffmpeg-xu4) 그리고 `OpenCV` 경우에도 [install-opencv](https://github.com/sgjava/install-opencv#install-opencv) 혹은 [opencv-mobile : github](https://github.com/nihui/opencv-mobile), [https://medium.com/analytics-vidhya/iot-opencv-4-1-on-odroid-xu4-8a14d395f191](https://medium.com/analytics-vidhya/iot-opencv-4-1-on-odroid-xu4-8a14d395f191) 를 참고 합니다.
```bash
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

## FFMPEG
[Using FFmpeg with NVIDIA GPU Hardware Acceleration](https://docs.nvidia.com/video-technologies/video-codec-sdk/12.1/ffmpeg-with-nvidia-gpu/index.html) 내용을 바탕으로 설치과정을 진행하면 됩니다. [FFMPEG - HWAccelIntro](https://trac.ffmpeg.org/wiki/HWAccelIntro) 공식문서 에서도 같은 내용을 자세하게 설명하고 있습니다.
```bash
$ git clone https://git.videolan.org/git/ffmpeg/nv-codec-headers.git
$ cd nv-codec-headers
$ sudo make && sudo make install
$ cd ..
$ git clone https://git.ffmpeg.org/ffmpeg.git ffmpeg/
$ sudo apt-get install build-essential yasm cmake libtool libc6 libc6-dev unzip wget libnuma1 libnuma-dev
$ ./configure --enable-nonfree --enable-cuda-nvcc --enable-libnpp --extra-cflags=-I/usr/local/cuda/include --extra-ldflags=-L/usr/local/cuda/lib64 --disable-static --enable-shared
$ make -j 8
$ sudo make install
```

설치가 완료된 뒤 다음과 같은 오류 메세지를 출력하였습니다.
```bash
ffmpeg: error while loading shared libraries: libavdevice.so.60: 
cannot open shared object file: No such file or directory
```

파일
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