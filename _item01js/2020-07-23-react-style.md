---
layout: blog
title: 리액트 스타일 가이드
tags:
- react
---

**더 괜찮은 개발자가 되기 위한 리액트 스타일 가이드** 도서를 빠르게 복습하면서 이 책에서만 볼 수 있었던 내용을 정리 합니다. 이 내용은 **리액트 서울 스터디** github 에서도 내용을 확인하실 수 있습니다.

![책표지](https://image.yes24.com/Goods/72264715/L)

## 1 웹 개발 동향
더이상 자세한 설명은 생략한다...

## 2 리액트의 기본

## 2.4 리액트 작성 방법

### Component

**개념 :** Browser 에 표시되는 GUI 자체를 담당하는 단위

**Render() :** 컴포넌트 내용을 **Template** 에 표시하는 Method

**Presentational / Functional Component :** 컴포넌트 내부에 **함수와 객체** 의 유무로 구분
- Presentational Components : 어떻게 보일 것인가 만 고려하는 컴포넌트
- Presentational 은 **Stateless Functional Component** 로 구현한다 (react 의 `Component` 클래스 상속 불필요)
- **SFC** 컴포넌트 에서도 객체는 **Props** 를 사용하면 활용 가능 합니다.

**Props :** 컴포넌트 내부에서 **필요한 값 을 전달** 받는 **객체 예약어** 로 **초기값 변경 불가능**

- `props` : 객체 예약어
- `props.children` : 주로 하나의 컴포넌트 에서 다른 컴포넌트를 주입하는 용도로 활용
- `key` : 반복문을 활용한 여러 객체 생성시 활용

```javascript
// index 별도 객체를 활용한 key 적용
props.data.map((index, text) => {
    return <li key={index}>{text}</li>;
})

// 고유한 id 를 활용한 key 적용
props.data.map((data) => {
    return <li key={data.id}>{data.text}</li>;
})
```

**State :** props 가 변하지 않는 값이면, state 는 **컴포넌트 내부에서 변경이 가능한 객체**

- `this.state.key값` 
- `this.setState()` 은 state 의 값을 변경하는 **setter** 함수다.
- boolean, string, float, Array 등등 모두 받을 수 있다.

**Event :** Client 사용자의 Event 를 **JSX** 로 탐지 및 활용이 가능

## 3 Atomic Design

## 3.2 Atomic Design 의 장점

**Page** 와 **Component** 들을 기준을 갖고 아래 단위로 나눠서 작업 합니다.
- 개발자 사이에 가치관의 공유
- 개발 공정에서도 작업 단위를 명확하게 정의가 가능

![Atomic Design](https://user-images.githubusercontent.com/4838076/33235048-d083dca6-d217-11e7-9aea-9a5ef5ae6fe7.png)

- **Atoms :** 더 작게 나눌 수 없는 **최소단위** 
   ex) Button, Input, title ...

- **Molecules :** Atoms 를 조합하여 **반복 활용 가능한 최소단위**
  - Atoms 를 너무 작게 나누면 조합이 어렵다
  - **반복 활용 가능한 상태** 를 기준으로 **최소단위를 변경** 하며 작업을 진행
  
- **Organisms :** 복잡한 UI 까지도 포함가능하며 **재사용성을 강조하지 않는다**
  - **특정 부분이 반복** 되면 이 부분을 **Molecules** 로 작업해 준다
  - 몇개의 Organism 이 조합되면 **Page** 가 생성된다

- **Templates :** Wire Frame 의 개념으로 페이지에 실제 데이터 표시되기 직전의 모습
  - **Component** 단위로 **콘텐츠** 가 들어가므로 동적 특성을 명확하게 정의를 필요

- **Pages :** Template 에 **실제 데이터 및 반응형** 이 반영된 상태
  - Page 는 Template 의 인스턴스 상태를 의미
  - 값 이 다를때마다 표시 내용이 다르면 지표로 활용

## 3.3 Component 의 UI 디자인

- layout
- Flexbox
- Tone & Manner 

## 4 Source Code Build

- node.js
- webpack

## 5 Component 의 구현

## 5.2 Component 의 수준

- Switch Container 관계를 활용하여 작업
  - **Switch Comtainer :** 1. Flag Switch **(SFC)**, 2. View Flag Value **(SFC)**
  - SFC 대신 **Local State** 를 활용하면 재활용성이 높아진다
  - 과조한 Atoms 에 주의한다

## 5.3 프로젝트의 구성

```
src
 ------ index.js
 ------ components
    -------- container
                  ------ ...jsx
    -------- presentational
                  ------ ...jsx
 ------ presentational
    -------- ...jsx
 ------ modules
    ---- ...jsx
```

## 6 Component & CSS

## 6.1 Component & CSS

**OOCSS (Object Oriented CSS) :** 구조와 Style 을 나눠서 객체 지향형 CSS 구조화

**BEM (Blcok Element Modifier) :** UI를 구축할 때, 자식(Element) 과 요소(Modifier) 관점으로 Class 를 구조화

**SMACSS (Scalable and Modular Architecture for CSS) :** 확장성을 고려한 CSS LayOut

## 6.2 CSS in JavaScript

webpack 의 **css-loader, styled-components** 2개를 활용하여 CSS Modules 을 구현 가능합니다.