---
title : React Native 페북랩 요약
last_modified_at: 2019-11-03T10:45:06-05:00
header:
  overlay_image: /assets/images/project/react_native_banner.jpg
categories:
  - javascript
tags: 
    - javascript
    - react
    - reactnative
---

**안드로이드** 개발은 **Kotlin**, **IOS** 는 **Swift** 로 대세가 넘어갔습니다. **Native 를 바로 컨트롤** 하는 장점이 있는 반면, **React Native** 는 **Javascript Bridge, Android Bridge** 모두 지원해서 작업 후 활용도가 높은 반면, 충돌이 발생하는 부분이 많다는 단점이 있습니다.

<br/>

# **Install Android Studio & React Native**

## **Install Android Studio**

우선은 **[안드로이드 스튜디오를](https://linuxize.com/post/how-to-install-android-studio-on-ubuntu-18-04/)** 설치 합니다. **ubuntu mint** 에서는 **소프트웨어 매니저** 를 사용하여 설치를 하는 방법이 가장 안전 합니다.

## **Install SDK Manager**

안드로이드 스튜디오를 실행한 뒤, **"Configure"** 를 선택하고 **"SDK Manager"** 에서 **SDK 모듈** 을 설치 합니다. **[React Native Quick Start](https://facebook.github.io/react-native/docs/getting-started)** 내용을 참고하여 **Android Pie** 를 권장하고 있습니다.

```r
Android SDK Platform 28
Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image
```

SDK 를 설치하다 보면  `/dev/kvm Permission denied` 의 오류가 출력됩니다. 이를 해결하기 위해 **kvm** 사용자  권한을 추가 합니다.

```r
$ sudo apt install qemu-kvm
$ ls -al /dev/kvm
$ grep kvm /etc/group
$ sudo adduser 사용자ID kvm
$ grep kvm /etc/group
kvm:x:131:사용자ID
```

위처럼 `$ grep kvm /etc/group` 을 실행한 결과 `사용자ID` 내용이 함께 출력되면 설치가 완료 됩니다.

마지막으로 에뮬레이터가 **다른 프로그램과 제대로 연동** 될 수 있도록 `$HOME/.bash_profile` 또는 `$HOME/.bashrc` 내용을 **에뮬레이터 실행 내용을 환경변수 관리파일에** 추가 합니다.

```r
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## **Install Yarn**

페이스북 관련 모듈을 설치하는 경우에는 **[yarn 설치](https://linuxize.com/post/how-to-install-yarn-on-ubuntu-18-04/)** 을 사용하여 **실행 및 설치** 합니다. 아래 `-sS` 는 오타가 아님에 주의 합니다.

```r
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list\n
sudo apt update
sudo apt install yarn
```

## **Install React Native CLI**

**[react native Quick Start](https://facebook.github.io/react-native/docs/getting-started)** 페이지 내용을 바탕으로 **React Native CLI** 와 **Expo CLI** 를 설치 합니다. 다음의 내용을 실행하여 **React Native** 를 설치하고, 빈 프로젝트를 설치 및 실행 합니다.

```r
$ sudo npm install -g react-native-cli
$ cd ~/React
$ npx react-native init ReactNativeBasic
$ cd ReactNativeBasic
$ react-native run-android
$ react-native run
```

위 내용으로 실행한 결과 오류가 출력 되었고, 메세지에 포함된 대로 `$ sudo chown -R 1000:1000 "/home/사용자ID/.npm"` 를 실행한 뒤 작동이 되었습니다. 하지만 문제는 **Android Emulator** 와 연결이 안되는 문제가 있었는데, 실행을 react 가 아닌 yarn 을 사용하면 해당 내용이 수정 후 작동함을 알 수 있습니다.

```r
$ cd ~/React
$ cd ReactNativeBasic
$ code .
$ yarn start
$ yarn android
```

## **Install Expo**

**[yarn 으로 expo 설치](https://forums.expo.io/t/expo-isnt-working/25293/7)** 를 참고하여 필요한 모듈을 설치 합니다.

```r
$ sudo npm install -g expo-cli
```

위처럼 설치를 해도 문제가 발생하는 경우, 설치 내용과 해당 폴더를 삭제한 뒤 **yarn** 을 사용하여 설치 합니다. 그런데 작업해본 결과 **npm** 을 사용하는 경우가 가장 제대로 작동 되었습니다.

```r
$ sudo npm uninstall -g expo-cli
$ sudo rm -r /usr/local/lib/node_modules/expo-cli
$ yarn global add expo-cli --save
```

추가로 자세한 **[Expo 디버그 내용](https://codechacha.com/ko/android-kvm-permission-denied/)** 을 확인하기 용이하도록 터미널에서 `$ export EXPO_DEBUG=true` 을 입력 합니다.


<br/>

# **React 기본**

[수업 슬라이드](https://www.slideshare.net/secret/HFQOqlOjVJ4pgp) 내용으로 Render 내부 View Component 에서 아래와 같이 **Property** 를 정의 합니다. `ex) <Text style> || 'TITLE' : top bar`

## **Property**

변수가 아닌 Property 라는 개념을 사용하는데, 이는 **화면 Render 에 영향을 주는 요소들** 을 의미한다. 때문에 변수가 아닌 **Property** 라는 이름을 사용 한다.

## **Props & State**
1. **Props** 는 **값이 변경** 될때 마다 해당 함수를 재실행 한다.
2. **State (ex> this.setState)** 는 **화면 전환시** 값을 재할당 한다.
 
## **React Native 브릿지**

구현되는 브라우저에 따라 브릿지가 다르게 작동하고, 이로인한 문제점이 발생할 수 있다. 따라서 작업시 구형되는 환경에 해당 함수 및 모듈이 제대로 작동하는지 관련 Issue 들을 잘 정리 및 작업을 해야 한다.

<figure class="align-center">
  <img src="https://www.simform.com/wp-content/uploads/2018/02/React-Native-tech-stack-1024x667.png">
</figure>

## **Babel**

[실습 사이트](https://babeljs.io/repl) 로써 **JSX** 문법을 사용하면 **간단한 코딩** 만으로도 JavaScript 를 자동완성 됩니다.

```jsx
function A() {
  return <div className="sidebar"/>
}

function AB() {
	return (
      <MyButton color="blue" shadowSize={2}>
        Click Me //children Property
      </MyButton>
    )
}
```

을 입력하면 다음과 같이 출력 됩니다.

```javascript
"use strict";

function A() {
  return React.createElement("div", {
    className: "sidebar"
  });
}

function AB() {
  return React.createElement(MyButton, {
    color: "blue",
    shadowSize: 2
  }, "Click Me //children Property");
}
```

## **React 컴포넌트**

컴포넌트를 제작할 때에는 **Carmel Case** 로 **때문자를 섞어서** 만듭니다. 파일에 컴포넌트를 담는 경우에도 **파일 이름도 대문자로 시작하는 Carmel Case** 를 사용 합니다.

<br/>

# React Native 실습


기본적인 Android 

<br/>

# **Component**

## **1 Class Component**


<br/>

# **Flex Layout**

**[React 레이아웃 블로그](https://jeongjuwon.github.io/react-native-flex-layout-practice/#/6)**

**[Flex Item 정렬 학습하기](http://flexboxfroggy.com/#ko)**

컴포넌트는 React-Native 에서 불러옵니다.


# React-Nvigation



# vscode 지우기


Props : 변경되지 않는 고정 값
State : 사용자 정의에 따라 고정된 값


# Atomic Design

Component 별로 폴더를 만들어서 관리

# Story Book

컴포넌트 주도 개발의 서포터 

Component De Development