---
title : React Native 설치하기
last_modified_at: 2019-11-06T10:45:06-05:00
header:
  overlay_image: /assets/images/project/react-native.png
categories:
  - javascript
tags: 
    - javascript
    - react
    - reactnative
---

3일간 **페이스북 이노베이션랩** 에서 **React Native** 수업을 들으면서, **ios, android 작업의 생산성이**  이제는 용이성을 높아졌음을 알 수 있었습니다. **Thinkpad X1E** 에 재설치 및 필요한 추가모듈 등을 정리해 보려고 합니다.

<br/>

# **Node.js**

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/react/nodejs-banner.png">
</figure>

`React Native 0.61` 등은 **Node.js** 를 기반으로 작성되어 있습니다.

2019년 11월 현재 **[Node.js](https://nodejs.org/ko/)** 12.13.0 LST** 와 **13.1.0** 를 제공하고 있지만, **React Native 0.61** 개발 버젼에 맞도록 **[Node.js 10 LST](https://github.com/facebook/react-native/issues/26598)** 를 설치 하도록 합니다.

## **Node.js Version Manager**

Node.js 버젼을 상황에 따라 다르게 적용하기 쉽도록 <strike>나는 초기라 그럴일이 없다만...</strike> Node.js 버젼을 쉽게 환경설정을 변경 가능한 Virtual Manger 를 활용할 수 있습니다. **[NVM github](https://github.com/nvm-sh/nvm)** 내용을 참고하여 **[우분투내 설치를](https://trustyoo86.github.io/nodejs/2019/02/18/ubuntu-nvm.html)** 합니다.

**curl** 이 설치되지 않은 경우에는 `$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | zsh` 을 입력합니다. **Oh my zip shell** 의 `.zshrc` 자동 등록을 위해선 `zsh`를 사용하였습니다. 기본 **bash** 를 사용하는 경우는 `bash` 로 변경하여 설치 합니다.

```r
$ sudo apt install curl
$ sudo apt-get install build-essential libssl-dev
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | zsh
```

**nvm** 이 설치된 경우 **설치 가능한 버젼들을** 확인 합니다. 이미 설치된 Node.js 가 있는 경우에도 추가 삭제작업 없이도 사용이 가능합니다. 아래 내용은 **Node.js v10** 의 마지막 버젼인 `node.js 10.17.0` 을 설치하는 내용 입니다. 보다 자세한 내용은 **[Node Version Manager](https://dgkim5360.tistory.com/entry/node-version-manager-introduction)** 등을 참고합니다.

```r
$ source .zshrc
$ nvm --version
0.35.1
$ nvm ls-remote | grep "v10.*LTS"
   v10.16.2   (LTS: Dubnium)
   v10.16.3   (LTS: Dubnium)
   v10.17.0   (Latest LTS: Dubnium)

$ nvm install 10.17.0 
$ node -v            
v10.17.0
```

<br/>

# **Android Studio**

**ubuntu Mint** 와 같이 **소프트웨어 매니저** 에서 설치를 지원하면 이를 활용하는 것이 가장 좋습니다. 아쉽게도 사용자가 적은 **Pop os** 는 설치매니저에서 지원을 하지 않아서 **[공식사이트](https://developer.android.com/studio/install)** 내용에 따라 설치를 합니다.

## **kvm**

**Android Virtual Device** 실행에 필요한 **32비트 모듈** 을 설치 합니다. 중간 **Android KVM Linux installation** 메세지가 출력 되는데 [kvm](https://developer.android.com/studio/run/emulator-acceleration?utm_source=android-studio#vm-linux)  [관련 내용](https://stackoverflow.com/questions/36526021/kvm-installation-unable-to-locate-package-ia32-libs-multiarch) 을 설치하고 사용자ID 를 등록해야만 **Permission** 오류가 방지 됩니다.

<figure class="align-center">
  <img src="https://vitux.com/wp-content/uploads/2019/04/word-image-124.png">
</figure>

```r
$ sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 libbz2-1.0:i386
$ sudo apt-get install qemu-kvm libvirt-bin ubuntu-vm-builder bridge-utils
$ kvm-ok
INFO: /dev/kvm exists
KVM acceleration can be used

$ sudo adduser 사용자ID kvm
$ grep kvm /etc/group
kvm:x:131:사용자ID
```

## **Android Studio**

**[공식사이트](https://developer.android.com/studio/install)** 에 접속하여 설치에 필요한 내용을 다운 받은 뒤, **[안내 동영상](https://vitux.com/how-to-install-android-studio-ide-on-ubuntu/)** 에 따라 설치 합니다.

<figure class="large">
  <div class="myvideo">
   <video  style="display:block; width:100%; height:auto;" autoplay controls loop="loop">
     <source src="https://developer.android.com/studio/videos/studio-install-linux.mp4" type="video/mp4" />
   </video>
  </div>
<figcaption>우분투 설치 동영상</figcaption>
</figure>

```r
$ sudo mv ./android-studio   /usr/local/
$ cd /usr/local/android-studio/bin
$ ./studio.sh
```

해당 **IDE** 를 설치한 뒤, **Configure** 에서 다음 2개를 추가로 실행 합니다.

1. **Create Desktop Entry** 를 실행해야 **설치 아이콘** 이 추가 됩니다.
2. **SDK mamager** 에서 **Android Pie** 를 추가 합니다.
3. **ADV Manager** 에서 **[가상기기](https://suyou.tistory.com/154)** 를 추가 합니다.

3번의 가상기기를 추가하지 않은 상태에서 **React Native** 를 실행하면 다음과 같은 오류를 출력 합니다.

```r
$ yarn android
$ react-native run-android
error Failed to launch emulator. Reason: No emulators found as an output of `emulator -list-avds`.
warn Please launch an emulator manually or connect a device. Otherwise app may fail to launch.
info Installing the app...
> Task :app:installDebug FAILED
```

## **.bashrc .zshrc**

설치된 **Androd Studio** 를 **[React Native](https://facebook.github.io/react-native/docs/getting-started)** 등에서 활용할 수 있도록 `$HOME/.bashrc` 또는 `$HOME/.zshrc` 의**환경변수에** 에 추가 합니다. 

```r
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

<br/>

# **React Native**

지금까지 **node.js** 와 **Android Studio** 를 설치 하였습니다. 이제 마무리 단계로 **[React Native](https://facebook.github.io/react-native/docs/getting-started)** 를 추가 합니다. **Facebook** 특성상 **yarn** 을 사용하는 것을 추천 합니다.

## **yarn**

블로그에 잘 설명된 **[yarn](https://itsfoss.com/install-yarn-ubuntu/)** 내용에 따라 추가 합니다. **[참고 블로그2](https://linuxize.com/post/how-to-install-yarn-on-ubuntu-18-04/)**

```r
$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
$ sudo sh -c 'echo "deb https://dl.yarnpkg.com/debian/ stable main" >> /etc/apt/sources.list.d/yarn.list'
$ sudo apt update
$ sudo apt install yarn
$ yarn -v
1.19.1
```

## **React Native CLI**

아래 방법으로 **React CLI** 모듈을 LocalHost 에 설치 합니다.

```r
$ sudo yarn 
$ sudo yarn global add create-react-native-app
$ sudo yarn global add react-native-cli
```

아래의 내용을 실행하면 **React native** 프로젝트를 자동으로 생성하고 실행을 합니다. `yarn` 내용은 `package.json` 의 스크립트를 실행 합니다. 위의 **React CLI** 를 설치하지 않은 경우에는, 관련된 모든 모듈들을 외부에서 다운받아 설치 합니다.

```r
$ npx react-native init 프로젝트
$ cd 프로젝트
$ yarn start
$ yarn android
```

<br/>

# **React Native Running On Android Device**

**Android Studio** 를 활용하는 방법도 있지만, **expo** 를 사용하다보니, 스마트폰에서 직접 결과물을 확인하는 방법도 상당히 매력적으로 다가왔습니다. [React 공식 블로그](https://facebook.github.io/react-native/docs/running-on-device) 내용을 바탕으로 안드로이드 스마트폰 연결방법을 정리해 보겠습니다. 

## **Phone Setting**

안드로이드 설정에 들어가서 다음의 내용을 따라서 적용 합니다.

1. 설정 (Settings) 
2. About phone and then tapping the Build number row at the bottom seven times. 
3. You can then go back to 설정 (Settings)
4. 개발자도구 (Developer options) to enable "USB debugging"

**USB 디버깅** 활성화 뒤, 기기를 USB로 연결 합니다. 터미널에서 `lsusb` 를 입력하면 연결된 기기의 ID 인 **22b8** 의 내용이 확인 가능 합니다. 

```r
$ lsusb
Bus 002 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 001 Device 003: ID 22b8:2e76 Samsung Galexy III 
```

확인된 **228b** 기기ID 를 `sudo tee /etc/udev/rules.d/51-android-usb.rules` 설정파일에 추가 합니다. 이 내용을 1번 입력하면, 다음부터는 자동으로 설정값을 연결 합니다.

```r
echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="22b8", MODE="0666", GROUP="plugdev"' | sudo tee /etc/udev/rules.d/51-android-usb.rules
```

지금까지 설정한 내용이 기기에서 제대로 인식되는지 확인 합니다.

```r
$ adb devices
List of devices attached
emulator-5554 offline       # Google emulator
14ed2fcc      unauthorised  # USB 연결기기
```

처음 연결시에는 **unauthorised** 를 출력 합니다. 기기를 보면 해당 내용을 확인하는 modal 메세지를 출력합니다. 계속 작업을 진행하는 경우에는 자동으로 인증과 함께 **OK** 를 입력합니다. 이러한 설정까지 확인되면 다음처럼 연결기기 내용이 변경됨을 알 수 있습니다.

```r
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc      device    # USB 연결기기
```

모든 설정이 완료 되었습니다. `yarn start` , `yarn android` 를 실행하면 이제부터 연결된 기기에서 실행되는 모습을 확인할 수 있습니다.