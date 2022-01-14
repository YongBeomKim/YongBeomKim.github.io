---
title : pyTesseract 파이썬 OCR
last_modified_at: 2019-03-20T12:45:06-05:00
header:
  overlay_image: /assets/images/code/tesseract.png
categories:
  - tesseract
tags: 
    - raspberrypi
    - tesseract
    - ocr
---

Tesseract 를 Django 서버 또는 RaspberryPi 서버에서 구현을 목적으로 하고 있는 만큼, ubuntu 에서 설치하는 방법을 정리해 보겠습니다

<br/>
# Tesseract 를 Python 에서 구현하기

## Install
윈도우에서 설치하는 내용도 있지만 [윈도우 설치](https://junyoung-jamong.github.io/computer/vision,/ocr/2019/01/30/Python%EC%97%90%EC%84%9C-Tesseract%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-OCR-%EC%88%98%ED%96%89%ED%95%98%EA%B8%B0) OpenCV와 연계하면 보다 다양한 활용이 가능합니다.

### Install in RaspberyPI
[참고사이트](https://webnautes.tistory.com/947)
```R
sudo apt install tesseract-ocr tesseract-ocr-script-hang tesseract-ocr-script-hang-vert

#sudo apt install python3-opencv 
#sudo apt install python-opencv  # 위 설치가 안되면 실행

pip3 install pytesseract
pip3 install opencv-python  # 설치하면 오류가 발생합니다
```
위와 같이 설치하면 **terreract 모듈과, 한글언어팩, 파이선 모듈을** 모두 설치 합니다. 하지만 환경에 따라 일부 자료를 찾을 수 없다는 오류메세지가 나옵니다. **우분투 18 이하인** 경우에 발생하는 내용으로, 다음과 같이 설치 Key 를 가져오도록 설정을 한 뒤, 위의 설치과정을 진행하면 해결됩니다.

```r
sudo add-apt-repository ppa:alex-p/tesseract-ocr
sudo apt-get update
```

## install OpenCV

[openCV](https://github.com/opencv/opencv) ARM NEON CPU를 활용한 odroid XU4 와 같은 경우에는 설치가 바로 안됩니다. 따라서 다음의 내용과 같이 설치과정을 진행해야 합니다 [Github](https://github.com/nikmart/sketching-with-NN/wiki/ODROID-XU4)

```r
sudo apt-get install build-essential cmake pkg-config libjpeg-dev libtiff5-dev libpng-dev libavcodec-dev libavformat-dev libswscale-dev libv4l-dev libxvidcore-dev libx264-dev libgtk2.0-dev libgtk-3-dev libcanberra-gtk* libatlas-base-dev gfortran  python3-dev

sudo apt-get install curl zip unzip libtool swig libpng12-dev pkg-config git zip g++ unzip wget xz-utils
```

**OpenCV** 최신버젼을 다운로드 합니다
```r
cd ~
wget -O opencv.zip https://github.com/opencv/opencv/archive/3.4.1.zip
unzip opencv.zip
wget -O opencv_contrib.zip https://github.com/opencv/opencv_contrib/archive/3.4.1.zip
unzip opencv_contrib.zip
```

다운받은 파일의 컴파일을 설치합니다
```r
cd ~/opencv-3.4.1/
mkdir build
cd build
cmake -D CMAKE_BUILD_TYPE=RELEASE \
    -D CMAKE_INSTALL_PREFIX=/usr/local \
    -D OPENCV_EXTRA_MODULES_PATH=~/opencv_contrib-3.4.1/modules \
    -D ENABLE_NEON=ON \
    -D ENABLE_VFPV3=ON \
    -D WITH_OPENCL=ON \
    -D WITH_JASPER=OFF \
    -D BUILD_TESTS=OFF \
    -D INSTALL_PYTHON_EXAMPLES=OFF \
    -D BUILD_EXAMPLES=OFF ..
```

설치된 검파일 파일을 사용하여 모듈을 설치합니다 `make -j4` 는 약 30분의 시간이 소요됩니다.
```r
make -j4
sudo make install
sudo ldconfig
```

virtualenv 환경에서 실행하려면 다음의 내용을 본인의 설정에 맞춰서 적용 후 결과를 확인합니다.
```r
cd /usr/local/lib/python3.6/site-packages/
sudo mv cv2.cpython-36m-arm-linux-gnueabihf.so cv2.so
cd ~/.virtualenvs/cv/lib/python3.6/site-packages/
ln -s /usr/local/lib/python3.6/site-packages/cv2.so cv2.so
```
```python
import cv2
cv2.__version__
'3.4.1'
```

## pyTesseract 

다음과 같이 간단하게 실습이 가능합니다 [pyTesseract 실습](https://webnautes.tistory.com/947)

```python
from PIL import Image
import pytesseract

# 영어 인식
print(pytesseract.image_to_string(Image.open('english.png')))

# 한글 
print(pytesseract.image_to_string(Image.open('hangul.png'), lang='Hangul'))

```