---
layout: blog
title: 타입스크립트 - 제너릭
tags:
- typescript
---

타입스크립트는 객체의 타입을 미리 정의하고 이를 활용하는 문법 입니다. 하지만 자료형태에 따라 숫자와 문자등을 혼용하는 데이터를 활용하는 경우에는 **타입 제너릭** 문법을 활용 합니다.

## cf> 화살표 함수와 표현식

```javascript
// let 함수명 = (파라미터) => { 본문 }
let sum = (arg1,arg2) => arg1+arg2;

function Greeting: React.FC<T> = (
  {name: string, mark: boolean}
) => { <></>}
```

<br>

<iframe width="560" height="315" src="https://www.youtube.com/embed/pReXmUBjU3E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 타입 제너릭

일반적인 타입스크립트는 변수의 Type 을 미리 정의하고 활용 합니다.

```javascript
function getSize(arr: number[] | string[] | boolean[]): number {
  return arr.length;
}

const arr1 = [1,2,3,4];
const arr2 = ["a", "b", "c"];
getSize(arr)
```

**Type 을 함수객체의 매개변수** 로 활용하여, 고정하지 않고 유동적으로 적용 하는 경우에는, **Type 의 정의를 parametor** 속성으로 변경 적용하며 가변적으로 활용 가능합니다.

```javascript
function getSize<T>(arr: T[]): number {
  return arr.length;
}

const arr1 = [1,2,3];
const arr2 = ["a","b","c"];

getSize<string>(arr1);
getSize<number>(arr2);
getSize<string|number>(arr2);
```

객체 내부에 제너릭 타입을 적용하면 보다 깊은 단계의 객체에서도 활용 가능하다

```javascript
interface Mobile<T> {
  name: string
  option: T
}

const m1: Mobile<string> = {
  name: "New",
  option: "Good",
}

Mobile.defaultProps = {
  name: '!'
};

const m2: Mobile<{color:string; coupon: boolean}> = {
  name: "New",
  option: {
    color: "red",
    coupon: false,
  }
};
```

제너릭 타입변수에서 `extends` 메서드를 활용하면 타입의 속성 내용을 추가 가능합니다.

```javascript
interface User {
  name: string;
  age: number;
}

const user: User = {name:"A", age: 10};

function showName<T extends {name:string}>(data: T): string {
  return data.name
}

showName(user);
showName(car);
```

## Hook 에서 제너릭 활용

React Hook 에서는 **제너릭 타입** 과 **기본자료** 을 한줄에 정의할 수 있다

```javascript
import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const onIncrease = () => setCount(count + 1);
  const onDecrease = () => setCount(count - 1);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}
```

## React.FC 대신 funcion 활용하기

`React.FC` 는 가독성 측면에서 양호하지만 `import` 로 불러오는 경우 default 를 함께 못가져오는 [문제](https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680#78b9) 가 있습니다. 

그래서 가독성은 떨어지지만 JavaScript 의 기본문법인 `function` 을 [활용하는 방식을 추천](https://react.vlpt.us/using-typescript/02-ts-react-basic.html) 합니다.

```javascript
type GreetingsProps = {
  name: string;
  optional?: string;
};

function Greetings({ name, optional }: GreetingsProps) {
  return <> {name}'s {optional && <p>{optional}</p>} </>;
}
 
Greetings.defaultProps = {
  mark: '!'
};
export default Greetings;
```


타입스크립트 와 리액트를 작업하면서 참고하는 링크들을 정리해 보겠습니다.

<br></br>

# TypeScript
- [useState 기본 개념 정리](https://velog.io/@scy0334/201103React-Hooks-%EC%A0%95%EB%A6%AC)

<br></br>

# Header

## NavBar
- [Fix CSS Style attributes in React and Typescript](https://chaseadams.io/posts/typescript-var-cssproperties/)
- [TypeScript and React: Styles and CSS](https://fettblog.eu/typescript-react/styles/)
- [React Auto-hide Navbar with Styled-components](https://medium.com/@glweems/react-auto-hide-on-scroll-navbar-617a6749a96)
- [React Auto-hide Navbar with Styled-components|Github](https://github.com/glweems/react-peekaboo-navbar)
- [How to make a sticky Navbar that hides on scroll (React/Hooks)](https://www.devtwins.com/blog/sticky-navbar-hides-scroll)
- [Responsive React Navigation Menu with Styled-Components](https://dev.to/hyggedev/how-to-build-a-responsive-react-navigation-menu-with-styled-components-3682)
- [Hide menu when scrolling in React.js](https://dev.to/guimg/hide-menu-when-scrolling-in-reactjs-47bj)
- [Hide menu when scrolling in React.js | GitHub](https://github.com/Dineshkarki24/Hide-menu-when-scrolling/blob/master/src/Navbar.js)

<br></br>

# Content

## Fetch
- [Simple Data Fetching in React with Hooks](https://medium.com/geekculture/simple-data-fetching-in-react-with-the-fetch-api-and-axios-with-hooks-useeffect-and-usestate-85d6bd7357c2)
- [Simple Data Fetching in React with Hooks|Github](https://github.com/kirti/react-data-fetching-axios-fetchapi/blob/main/src/PostsWithAxios.js)