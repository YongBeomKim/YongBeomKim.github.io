---
title : React Native 리로드
last_modified_at: 2019-11-06T10:45:06-05:00
header:
  overlay_image: /assets/images/project/react_native_banner.jpg
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

## **Node.js Version Manager**

**[NVM github](https://github.com/nvm-sh/nvm)** 내용을 참고하여 **[우분투내 설치](https://trustyoo86.github.io/nodejs/2019/02/18/ubuntu-nvm.html)** 합니다.

```r
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

**[공식사이트](https://developer.android.com/studio/install)** 에 따라 내용을 설치 합니다.

64비트 중 추가로 필요한 32비트 모듈들을 설치 합니다. 그리고 설치 중 **Android KVM Linux installation** 메세지가 출력되었고 [kvm](https://developer.android.com/studio/run/emulator-acceleration?utm_source=android-studio#vm-linux) 모듈설치 및 [관련 내용](https://stackoverflow.com/questions/36526021/kvm-installation-unable-to-locate-package-ia32-libs-multiarch) 은 우분투에서 공통적으로 출력 되었습니다. 

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

설치된 모듈을 **[React Native](https://facebook.github.io/react-native/docs/getting-started)** 에서 활용할 수 있도록 **환경변수에** 해당 내용을 등록 합니다.

```r
$ sudo mv ./android-studio   /usr/local/
$ cd /usr/local/android-studio/bin
$ ./studio.sh
```





<figure class="large">
    <div class="myvideo">
       <video  style="display:block; width:100%; height:auto;" autoplay controls loop="loop">
           <source src="https://developer.android.com/studio/videos/studio-install-linux.mp4" type="video/mp4" />
       </video>
    </div>
<figcaption>우분투 설치 동영상</figcaption>
</figure>

https://developer.android.com/studio/videos/studio-install-linux.mp4