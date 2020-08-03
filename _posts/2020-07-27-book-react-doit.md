---
title : BOOK do it! 리액트 정석
last_modified_at: 2020-07-27T10:45:06-05:00
header:
  overlay_image: /assets/images/react/dj_react.png
categories:
  - django
tags: 
    - django
    - react
---

**[Do IT React.js](https://github.com/justinpark/justin-do-it-react)** 도서에서 추가적으로 다루는 내용을 정리해 보겠습니다. React.js 의 기본서는 **리액트를 다루는 기술** 을 기준으로 추가 내용을 선별 하였습니다. 

![책표지](https://image.yes24.com/goods/87631428/M)

## 2 ES6 문법 액기스

## 2-1 Template String (템플릿 문자열)

**Python** 에서의 **f-string (formatted string literals)** 과 같은 문법을 `f"{변수1} {변수2}"` **ES6** 에서도 Jquery 와 비슷한 형테로 활용 가능 합니다.

`${변수명}` 를 활용하면 객체명 호출 및 연산 까지도 가능 합니다.

```javascript
const string1 = '안녕하세요';
const string2 = '반갑습니다';
const greeting = `${string1} & ${string2}`;
const product = {
    name: '리액트 정석',
    price: '32,000원'
};
const price = 10000;
const number = 15;
const boolValue = false;

console.log(greeting);
console.log(`제품 ${product.name} 의 가격은 ${product.price} 입니다`);
console.log(`템플릿 문자열에서 수식 계산도 ${price * number} 가능합니다`);
```

## 2-2 Spread Operator

나열형 자료를 추출하거나 연결할 때 사용하는 문법으로 **배열`[]`, 객체`{}`, 함수의 인자 표현식`()` 내부** 에서만 사용이 가능합니다.

```javascript
// ES6 문법
var array1 = ['one', 'two'];
var array2 = ['three', 'four'];

// ES5 := [array1[0], array1[1], array2[0], array2[1]];
var combined = [...array1, ...array2];

// 배열 구조화 할당과 Spread Operator
var [first, second, three = 'empty', ...others] = array1;
```

```javascript
var [first, second, three = 'empty', ...others] = array1;
// ES5 := [].concat(array1, array2);
// first = 'one', second = 'two', three = 'empty', others = []

function func(...args) {
  var [first, ...others] = args;
}

function func(first, ...others) {
  var firstInES6 = first;
  var othersInES6 = others;
}

// 올바르지 못한 예
// var wrongArr = ...array1;
```