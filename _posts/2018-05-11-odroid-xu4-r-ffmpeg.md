---
title : odroid 유틸설치
last_modified_at: 2018-05-12T10:45:06-05:00
header:
  overlay_image: /assets/images/book/singlecom.jpg
categories:
  - odroid
tags: 
    - r
    - ffmpeg
---

# odroid 유틸 설치

<br>
## 동영상 인코딩 도구 설치 [blog](http://blog.cjbox.kr/entry/FFMPEG%EB%A1%9C-%EC%9D%B8%EC%BD%94%EB%94%A9%ED%8E%8C)

ffmpeg를 바로 설치해서 활용하는데, 1배속 인코딩 되지만 쿨러가 있어야만 추가적 작동이 가능하고 무리한 부담 지속은 문제가 될듯 하다 그냥 기록용이 맞다는게 거짓말은 아니라고 말 못하지....

<br>
## docker 설치하기

[From original instructions](http://blog.hypriot.com/post/run-docker-rpi3-with-wifi/)

```
$ sudo apt-get install -y apt-transport-https
$ wget -q https://packagecloud.io/gpg.key -O - | sudo apt-key add -
$ echo 'deb https://packagecloud.io/Hypriot/Schatzkiste/debian/ wheezy main'
$ sudo tee /etc/apt/sources.list.d/hypriot.list
$ sudo apt-get update
$ sudo apt-get install -y docker-hypriot
$ sudo systemctl enable docker
```




<br>
## R 설치

최신버젼이 아닌 ARM에 사용가능한 3.2.2가 설치된다

```
$ sudo apt-get install r-base
$ sudo apt-get install gdebi-core
$ sudo apt-get install libapparmor1
```



## R Studio 설치 [Document](http://herb.h.kobe-u.ac.jp/raspiinfo/rstudio_en.html)

[document](https://www.r-bloggers.com/rstudio-on-raspberrypi-3/)

```
$ sudo apt-get install pandoc pandoc-citeproc
```

문제는 R studio 설치가 문제다.. (아래의 문서는 너무 긴듯하다 좀더 짧은걸 찾아보자)
