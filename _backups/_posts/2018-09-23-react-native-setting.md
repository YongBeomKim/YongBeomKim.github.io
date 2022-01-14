---
title :  React Native 환경설정
last_modified_at: 2018-09-23T10:45:06-05:00
header:
  overlay_image: /assets/images/book/reactnative.png
categories:
  - react
tags: 
    - react 
    - android
toc: true 
---



# facebook invationlab

<figure class="align-center">
  <img src="https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-9/42996851_325529291344829_6093464673443643392_n.jpg?_nc_cat=108&oh=e50e693c16e715646a6804763feaf149&oe=5C549C91" alt="">
  <figcaption>페이스북 이노베이션 랩 수업장면</figcaption>
</figure> 

**Vue.js** 의 개념들과 내용을 학습하다 보니, 어느정도 이끌어줄 수업을 찾게 되었고, 때마침 판교제2벨리에서 교육하는 수업중에 'React Native' 수업이 1달 반 동안 있어서 신청하게 되었다.

개인적으로 무료강의를 선호하는데, 다양한 분들이 오다보니 역설적으로 수업에 집중하는 인원수가 상대적으로 적고, 내가 질문을 이끌어 나아가거나 부족한 부분등을 요구해서 관철할 수 있는 재량적인 상황들이 많기 때문이다. 

또한 수업의 질이 어느정도 맘에 들지 않더라도 아쉬울께 업다는 것 또한 덤..


# 작업환경의 구축

Android Studio 같은 경우에는 생각보다 용량이 크고 무거워서, 지속적으로 설치하면서 활용하기에는 부담이 되었다. 

가장 가볍고 독립적으로 운영되는 Expo에 끌리긴 했지만 <small>1)기본 Native 앱을 그대로 적용하기 힘든 점  2) 스마트폰과 Wifi 환경에 영향을 받는다는 점</small> 때문에 지속적인 디버깅작업에는 불편함을 줄 우려가 커서 포기를 했다

결과적으로는 **GENYMOTION** 을 통해서 환경을 구축하였고, 단번에 완성이 되지않고 조금은 복잡한 (토요일 내내 삽질) 과정을 통해서 완성할 수 있었다.


<br>
# React Native 설치하기

## Document

이런 블로그, 저런 블로그의 글을 따라서 작업을 해 봤지만 각자가 적용가능한 버젼들을 따로 있었기에 이를 바로 적용하기에는 시행착오가 많이 요구되었다. 결과적으로는 **[React Native Document](https://facebook.github.io/react-native/docs/getting-started.html)** 에 따라서 설치를 하고 문제는 Git을 통해서 수정하는 방법이 가장 오류가 적었다


## CMD (관리자 권한실행) <small>[설치가이드](https://chocolatey.org/install)

> @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"

위 내용을 터미널에 설치하면 자동으로 프로그램과 환경설정까지 완료된다


## React Native 설치하기

위에서 설치한 **choco**를 사용하여 리눅스와 유사한 방식으로 프로그램을 설치합니다.

> choco install -y nodejs.install python2 jdk8

> npm install -g react-native-cli

npm 이 실행되지 않으면 Node.Js 가 환경변수에 적용되지 않았기 때문이다. 확인할 내용으로는 1) Java 1.8 설치와 환경변수 적용여부 2) Node.Js 설치와 환경변수 적용여부를 차례로 점검하면 된다

위의 모든 설치가 종료되고 나면 

> react-native init (프로젝트명)

을 실행하면 프로젝트 폴더와 필요한 내용들이 제대로 포함되는 지를 확인하면 완료가 된다 



<br>
# Android Virtual Developer 설치하기

안드로이드를 스마트폰과 연결해서 직접 앱을 활성화 하는 방법도 있지만, 작업환경 내부에서 같이 안드로이드를 구현하는 방법이 보다 작업에 유용하고 이를 구현하는 방법으로 Android Virtual Developer 를 설치 해보도록 한다 


## Android Studio 설치

윈도우에서 별도 Android SDK Mamager 를 더이상 지원하지 않고, 안드로이드 스튜디오 내부에서 Setting 을 통해서 원하는 버젼을 설치하고 환경설정 작업에 이르는 방법들이 가장 완결성이 높았다. 

Android Studio 를 설치하면서 가상 안드로이드를 운영하기 위해 필요로 하는 Driver 들을 자동으로 설치를 해주기 때문에, SDK Mamager 보다 더 작업이 수월했다. 그리고 **Intel @ HAXM** 의 경우에는 **[BIOS 에서 활성화 및 드라이버 설치](https://jun7222.tistory.com/128)** 까지 확인할 것!!

    Android SDK
    Android SDK Platform
    Performance (Intel ® HAXM)
    Android Virtual Device


## Android Studio 에서 SDK Mamager

필요로 하는 안드로이드 운영체계를 설치해야 하는데, 기본 Setting 으로는 **Android PIE** 로 설정이 되어있는데. React Native 설명서를 따르면 8.0(오레오) 를 설치하기를 권장하고 있습니다. 따라서 이들이 지정한 모듈들만 설치합니다.

    Android SDK Platform 26
    Google APIs Intel x86 Atom_64 System Image
    SDK Tools 26.0.3

설치가 끝난뒤, 아래의 환경변수를 설정 후Android Virtual Developer 로 Google Nexus 등을 선택한 뒤 가상의 안드로이드 머신이 화면에 작동하는지를 확인합니다

<figure class="align-center">
  <img src="https://facebook.github.io/react-native/docs/assets/GettingStartedCreateAVDx86Windows.png" alt="">
  <figcaption>운영체계를 8.0으로 맞춰서 작동합니다</figcaption>
</figure> 



## Windows 10 에서 환경변수 설정하기

Android Studio 를 통해서 위의 SDK를 설치한 폴더를 기본인식 가능하도록 환경변수로 입력합니다. 이로써 필요한 SDK 설정은 대부분 끝났습니다

<figure class="align-center">
  <img src="https://facebook.github.io/react-native/docs/assets/GettingStartedAndroidEnvironmentVariableANDROID_HOME.png" alt="">
  <figcaption>각자 환경에 맞게 수정된 환경변수를 입력합니다</figcaption>
</figure> 



## GENYMOTION 설치하기

SDK Mamager 로 설치된 안드로이드를 가상으로 띄워 줄 에뮬레이터를 필요로 하는데 개인용으로는 무료인 [GENYMOTION](https://www.genymotion.com/desktop/) 을 설치합니다. 그리고 VirtualBox 가 포함된 내용을 설치합니다


<figure class="align-center">
  <img src="https://applause-prodmktg.s3.amazonaws.com/2016/07/15/10/21/00/a75db13c-ded0-4fed-8e54-1523c1d9f2d6/screenshot-www.genymotion.com%202016-07-15%2015-49-29.png" alt="">
  <figcaption></figcaption>
</figure> 


설치 후, VirtualBox 는 업데이를 우선 하지 않고 GENYMOTION 을 실행합니다. 처음에는 사용자 확인을 위해 가입했던 ID 와 비밀번호를 입력합니다. 그리고 Oreo 8.0 에이뮬레이터를 실행한 뒤, SDK Mamager 로 설치된 폴더로 환경설정을 변경하면 Android Virtual Developer 설치는 끝난다.

<figure class="align-center">
  <img src="https://i.stack.imgur.com/6DLlz.png" alt="">
  <figcaption></figcaption>
</figure> 


<br>
# 마무리

GENYMOTION 을 실행해서 안드로이드를 띄운 뒤, 터미널에서 React Native 프로젝트 폴더로 이동한 뒤

> react-native run-android

를 실행하면 기본설정된 SDK 시스템 파일을 찾아서 GENYMOTION 으로 App을 구현한다. 잘 작동되면 모든 환경설정이 끝난다