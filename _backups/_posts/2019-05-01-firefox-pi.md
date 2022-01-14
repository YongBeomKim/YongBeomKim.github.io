---
title : firefox arm 설치하기
last_modified_at: 2019-05-01T10:45:06-05:00
header:
  overlay_image: /assets/images/code/firefox.jpg
categories:
  - python
tags: 
    - python
    - crawling
toc: true 
---

[StackOverFlow](https://stackoverflow.com/questions/52534658/webdriverexception-message-invalid-argument-cant-kill-an-exited-process-with) 를 참고로 요약 하자면 **geckodriver** 드라이버를 설치 후 (브라우저를 화면에 띄우는 용도) 버전에 맞는 **firefox** 를 설치 하면 됩니다.

주의할 점은 개별 모듈의 버젼을 맞춰서 설치를 해야 합니다.

<br/>
# firefox in raspberry pi

## **geckodriver**

[geckodriver](https://github.com/mozilla/geckodriver/releases) 를 내가 설치할 환경에 맞는 내용을 찾아서 설치합니다. 여기선 **ARM** 에 맞는 파일을 다운받은 뒤 `mv /usr/local/bin` 폴더로 복사를 합니다. 간혹 컴파일 되지 않은 파일로 해당 위치에 옮긴 뒤 실행이 안되는 경우가 있는데, 이 경우는 `$ chmod x+d geckodriver` 로 속성을 바꾼 뒤 옮기면 실행이 가능합니다.

## **firefox**

[firefox](https://github.com/jdonald/firefox-armhf/releases) 를 다운받아 설치합니다. 파일의 버젼과 우분투 버젼까지도 자신의 환경과 맞춰서 다운받아 설치를 합니다.

firefox-esr 버젼을 설치하는 방법은 다음과 같습니다.

```php
sudo add-apt-repository ppa:mozillateam/ppa
sudo apt-get update
sudo apt install firefox-esr
```


## **chromium** 75 이상의 버젼을 설치하면

```
(django) odroid :: ~/python 2 » sudo dpkg -i chromium-chromedriver_73.0.3683.75-0ubuntu3_armhf.deb
Selecting previously unselected package chromium-chromedriver.
(데이터베이스 읽는중 ...현재 76541개의 파일과 디렉터리가 설치되어 있습니다.)
Preparing to unpack chromium-chromedriver_73.0.3683.75-0ubuntu3_armhf.deb ...
Unpacking chromium-chromedriver (73.0.3683.75-0ubuntu3) ...
dpkg: dependency problems prevent configuration of chromium-chromedriver:
 chromium-chromedriver 패키지는 다음 패키지에 의존: libc6 (>= 2.29): 하지만:
  시스템에 있는 libc6:armhf의 버전은 2.23-0ubuntu10입니다.
 chromium-chromedriver 패키지는 다음 패키지에 의존: libstdc++6 (>= 7): 하지만:
  시스템에 있는 libstdc++6:armhf의 버전은 5.4.0-6ubuntu1~16.04.10입니다.
```

`sudo apt-get install libstdc++` 을 설치하면 의존성 문제로 오류가 발생합니다. 즉 **libstdc++** 모듈을 설치하려면 오류가 발생합니다. 한글 블로그를 찾다보면 [라즈베리파이 설치](https://notejb.blogspot.com/2019/01/blog-post_2.html) 에서 우분투 14 버젼의 65버젼 chromium 을 설치하는 방법으로 해결하는 내용이 있습니다. 

하지만 위 방법을 사용하면 **requests_html** 에서 작동이 안되는 단점이 존재합니다.


# Selenium & Chromdriver
처음 정리한 내용 입니다.

## Intro

python 에서 selenium 작업을 하다 보면 headless 모듈로써 **PhantomJs** 는 일종의 한계가 존재합니다. 기능적인 한계로써 javascript 를 실행하다 보면 몇가지 실행이 안되는 문제가 있습니다. 이를 극복하기 위해서는 최근에는 Chrome 브라우저를 headless 를 추천하고 있어서 이를 사용하는 방법을 정리해 보겠습니다.

## chromium

크롬 브라우저를 시스템 기본을 활용하면, 업데이트시 설정이 변경되는 등 안전성이 낮은 한계가 있습니다. 이를 극복하는 방법으로 별도의 파일을 사용하는 내용을 정리해 보겠습니다. [정리된 블로그](https://blog.softhints.com/python-headless/)

<iframe width="560" height="315" src="https://www.youtube.com/embed/BdppFIT_lIs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>

크롬 웹브라우저 [chrome 74버젼](https://sites.google.com/a/chromium.org/chromedriver/downloads) 다운받아 설치 합니다. 작업 폴더 근처에 압축을 풀면 설치가 끝납니다. 별도 설치과정 없이 해당 파일만 있으면 됩니다.

문서에는 최신을 받게 되어있지만 **selenium** 에서 chrome 74 까지만 지원해서, [다운](http://chromedriver.chromium.org/) 에서 받아서 실행하면 버젼 충돌 오류를 출력합니다
{: .notice--danger}
