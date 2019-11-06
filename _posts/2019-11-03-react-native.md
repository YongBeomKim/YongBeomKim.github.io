---
title : React Native 페북랩
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

리액트 네이티브 수업내용 요약 및 정리 페이지 입니다. **안드로이드** 개발은 **Kotlin**, **IOS** 개발은 **Swift** 로 대세가 넘어가 있습니다. 이들은 **Native 를 바로 컨트롤** 하는 장점이 있기 때문입니다. 반면 **React Native** 는 둘을 모두 작업할 수 있지만, 단점으로는 **Javascript, Android Bridge** 를 사용하여 내용들을 변환하는 과정을 거쳐야 하기 때문에, 작업 내용의 호환성 등 충돌이 발생할 부분들이 많은 단점이 존재 합니다.

Render 내부 View Component 에서 아래와 같이 **Property** 를 정의 합니다.

`<Text style> || 'TITLE' : top bar`

<br/>

# React 기본 개념들

## Property

변수가 아닌 Property 라는 개념을 사용하는데, 이는 **화면 Render 에 영향을 주는 요소들** 을 의미한다. 때문에 변수가 아닌 **Property** 라는 이름을 사용 한다.

## Props & State

### **1 Props**

**값이 변경** 될때 마다 해당 함수를 재실행 한다.

### **2 State  (ex> setState) **

**화면 전환시** 값을 재할당 하는 React 내부변수로 컴포넌트 내부에서 값을 재할당 한다.

```
this.setState
```
 
<br/>

# React Native 브릿지

구현되는 브라우저에 따라 브릿지가 다르게 작동하고, 이로인한 문제점이 발생할 수 있다. 따라서 작업시 구형되는 환경에 해당 함수 및 모듈이 제대로 작동하는지 관련 Issue 들을 잘 정리 및 작업을 해야 한다.

<figure class="align-center">
  <img src="https://www.simform.com/wp-content/uploads/2018/02/React-Native-tech-stack-1024x667.png">
</figure>


<br/>

# Babel

**JSX** 문법을 사용하면 **간단한 코딩** 만으로도 JavaScript 를 자동으로 완성 한다

https://babeljs.io/repl

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

## React 컴포넌트

컴포넌트를 제작할 때에는 **Carmel Case** 로 **때문자를 섞어서** 만듭니다. 파일에 컴포넌트를 담는 경우에도 **파일 이름도 대문자로 시작하는 Carmel Case** 를 사용 합니다.


# Expo

expo 는 페북의 모듈을 사용하는 만큼 apt-get 보다는 yarn 을 사용하여 설치를 합니다.

1. [yarn 설치](https://linuxize.com/post/how-to-install-yarn-on-ubuntu-18-04/)
2. expo 설치내용 삭제
3. [yarn 으로 expo 설치](https://forums.expo.io/t/expo-isnt-working/25293/7)

디버그 내용을 확인하기 용이하도록 터미널에서 `$ export EXPO_DEBUG=true` 을 입력 합니다.

