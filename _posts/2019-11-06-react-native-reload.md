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

3일간 **페이스북 이노베이션랩** 에서 **React Native** 수업을 들으면서, 어플을 만들기 위한 **기본개념** 익히기 및 **ios, android 작업의 생산성** 등에서도 이제는 도입하기에 충분할 정도로 작업의 용이성을 높아졌음을 알 수 있었습니다

이번 페이지는 앞의 내용을 정리하면서, 수업기간 중 AS를 맏겼던 **Thinkpad X1E** 에 재설치 및 필요한 추가모듈 등을 정리해 보려고 합니다.

<br/>

# **Node.js**

`React Native 0.61` 등은 **Node.js** 를 기반으로 작성되었습니다. 때문에 먼저 node.js를 설치해야 합니다.

2019년 11월 현재 **[Node.js](https://nodejs.org/ko/)** 12.13.0 LST** 와 **13.1.0** 를 제공하고 있습니다. **React Native 0.61** 개발시 버젼에 맞게 설정을 맞춰야 하고, 수업 중 들은 내용은 **[Node.js 10 LST](https://github.com/facebook/react-native/issues/26598)** 를 추천 합니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/react/nodejs-banner.png">
</figure>

## **Node.js Version Manager**

**[NVM github](https://github.com/nvm-sh/nvm)** 내용을 참고하여 **[우분투내 설치](https://trustyoo86.github.io/nodejs/2019/02/18/ubuntu-nvm.html)** 합니다.

```r
$ sudo apt install curl
$ sudo apt-get install build-essential libssl-dev
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | zsh
```

curl 을 설치하지 않은경우 `$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | zsh` 을 입력합니다. **Oh my zip shell** 을 쓰고 있어서 `.zshrc` 에 자동 등록을 위해 `zsh`를 사용하였고, 기본 **bash** 를 사용하는 경우는 `bash` 로 변경하여 설치 합니다.

아래와 같이 **nvm** 을 설치 후 **가능한 버젼들을** 확인하고, **nvm** 을 사용하여 변경된 버젼을 확인 합니다. 기존에 설치한 내용을 삭제하지 않아도 사용 가능합니다. 보다 자세한 내용은 **[Node Version Manager](https://dgkim5360.tistory.com/entry/node-version-manager-introduction)** 브로그 등을 참고합니다.

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

**ubuntu Mint** 와 같이 **소프트웨어 매니저** 에서 설치방법을 지원하는 경우에는 이를 활용하는게 가장 좋습니다. 하지만 **Pop os** 는 지원하지 않는 경우에는 **[공식사이트](https://developer.android.com/studio/install)** 에 따라 설치를 합니다.

## **kvm**

필요한 **32비트 모듈** 을 설치 합니다. 중간 **Android KVM Linux installation** 메세지가 출력 되는데 [kvm](https://developer.android.com/studio/run/emulator-acceleration?utm_source=android-studio#vm-linux)  [관련 내용](https://stackoverflow.com/questions/36526021/kvm-installation-unable-to-locate-package-ia32-libs-multiarch) 을 설치하고 등록 합니다.

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

3번의 가상 추가하지 않고 **React Native** 를 실행하면 다음과 같은 오류를 출력 합니다.

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

지금까지 **node.js** 와 **Android Studio** 를 설치 하였습니다. 이제 마무리 단계로 **[React Native](https://facebook.github.io/react-native/docs/getting-started)** 를 추가 합니다. **Facebook** 특성상 **yarn** 을 사용하는걸 추천하고 있어서 이를 설치 합니다.

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

## **React Native Init**

아래의 내용을 실행하면 **React native** 프로젝트를 자동으로 생성하고 실행을 합니다. `yarn` 내용은 `package.json` 의 스크립트를 실행 합니다.

```r
$ npx react-native init 프로젝트
$ cd 프로젝트
$ yarn start
$ yarn android
```

