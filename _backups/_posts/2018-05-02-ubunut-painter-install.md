---
title : ubuntu - Simple Painter
last_modified_at: 2018-05-01T12:45:06-05:00
header:
  overlay_image: /assets/images/book/painter.png
categories:
  - ubuntu
---


## Kolour Paint

그냥 설치하면 안되고 설정값을 가져온 뒤 설치를 해야 한다. 중간 발생한 오류를 자동으로 고친뒤 설치되어서 둘중 어느 파일로 설지되었는지는 잘 모르겠는데 다시 설치를 할 때에는 주의를 해서 설치하자. 설치해본 결과 가장 무난한 Painter 로 보여진다

```
$ wegt http://security.ubuntu.com/ubuntu/pool/universe/k/kolourpaint/kolourpaint_17.12.3-0ubuntu1_amd64.deb
$ wget http://archive.ubuntu.com/ubuntu/pool/universe/k/kolourpaint/kolourpaint_17.04.3-0ubuntu1_i386.deb
$ sudo dpkg -i kolourpaint_17.04.3-0ubuntu1_i386.deb
$ sudo apt-get update
$ sudo apt-get install kolourpaint
```


## mtPaint [install](https://linuxhint.com/mtpaint-graphic-editor-alternative-mspaint-linux-os/)

```
$ sudo apt install gdebi
$ wget https://launchpad.net/ubuntu/+archive/primary/+files/libopenjpeg5_1.5.2-3.1_amd64.deb
$ sudo gdebi libopenjpeg5_1.5.2-3.1_amd64.deb
```


```
$ sudo add-apt-repository ppa:webupd8team/mtpaint
$ sudo apt-get update && sudo apt install mtpaint
```


삭제하는 경우
```
$ sudo apt remove mypaint
```

설치하고 보니 내용이 너무 없어서 별로 였음 