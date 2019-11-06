---
title : React Native 페북랩
last_modified_at: 2019-11-03T10:45:06-05:00
header:
  overlay_image: /assets/images/project/lenovo.jpg
categories:
  - javascript
tags: 
    - javascript
    - react
    - reactnative
---

리액트 네이티브 수업내용 요약 및 정리 페이지 입니다.

Render 내부 View Component 

<Text style> || 'TITLE' : top bar Property 를 정의한다.

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
 