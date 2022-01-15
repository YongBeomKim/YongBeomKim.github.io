---
layout: blog
title: Do it! 리액트 정석
tags:
- react
---

**[Do IT React.js](https://github.com/justinpark/justin-do-it-react)** 도서에서 추가적으로 다루는 내용을 정리해 보겠습니다. React.js 의 기본서는 **리액트를 다루는 기술** 을 기준으로 추가 내용을 선별 하였습니다. 

이번 페이지 에서는 **ES6** 의 문법 내용을 중심으로 살펴보겠습니다.

![책표지](https://image.yes24.com/goods/87631428/M)

<br />

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

배열에서의 활용과, 배열 구조화 할당 예제는 다음과 같습니다.

```javascript
// ES6 문법
var array1 = ['one', 'two'];
var array2 = ['three', 'four'];

// ES5 := [array1[0], array1[1], array2[0], array2[1]];
var combined = [...array1, ...array2];

// 배열 구조화 할당과 Spread Operator
// ...others 는 앞의 객체들이 처리한 나머지(타입이 다양하게 변환된다) 를 자동추출
var [first, second, three = 'empty', ...others] = array1;
```

JavaScript 의 **특수변수인 arguments** 를 사용하면 객체 형태로 각각 할당 합니다. **(Pythone 에서 enumerate() 와 동일한 기능을 하는 특수변수)**

```javascript
function func() {
  console.log(arguments);
}
func(1,2,3)
// Arguments { 0: 1, 1: 2, 2: 3, … }
```

전개 연산자를 활용하면 이와같은 배열 연산을 보다 단순하게 구현할 수 있다. 아래의 2개 함수는 동일한 기능을 하는 함수 입니다.

```javascript
function func() {
  var args = Array.prototype.slice.call(this, arguments); // 배열로 변환
  console.log(args[0]);         // 0번째 인덱스 값
  console.log(args.slice(1));  // 1번 부터 Slice 한 나머지 값 (배열)
}

function func(...args) {
  console.log(args[0]);         // 0번째 인덱스 값
  console.log(args.slice(1));  // 1번 부터 Slice 한 나머지 값 (배열)
}

function func(first, ...others) {
  console.log(first)    // 0번째 인덱스 값
  console.log(others)   // 0번째 를 Slice 한 나머지 값
}
```

주의할 점으로는 `...others` 객체는 **함수 인자 표현식** 등에서 **맨 마지막 객체 값** 으로만 할당하고, 중간에 위치한 값을 할당할 수는 없다. 이때는 `...others` 객체에서 별도로 마지막 부분을 추출 해야만 된다. 

객체에서 활용과, 객체 구조화 할당 예제는 다음과 같습니다.

```javascript
var objectOne = { one: 1, two: 2, other: 0 };
var objectTwo = { three: 3, four: 4, other: -1 };

var combined = {
  ...objectOne,
  ...objectTwo,
}; // 중복되는 객체는 뒤의 것으로 OverWriting 된다
```

객체의 Key 와 Value 값을 각각 추출할 수 있습니다.

```javascript
var obj1 = {one:"1", two:"2", three:"3"}
// 첫번째 객체의 Key 와 value 를 추출
var {one: myOne} = obj1  // one : one,  myOne : "1"
```

객체의 내부에 객체가 포함되어 있는 경우에는 아래와 같이 작업을 합니다. 이때 주의할 점으로는 객체 내부의 Key 값은 유효값이 생성 되지만, 추출을 위한 보조객체를 호출하면 **Uncaught ReferenceError: obj is not defined** 오류가 발생합니다.

```javascript
var obj1 = {one:"1", two:"2", three:"3"}
var obj2 = {zero:"0", four:"4", obj: obj1}
var { obj : { three }} = obj2
console.log(obj)   // Uncaught ReferenceError 오류를 출력 
console.log(three) // "3"

var { obj : { two : myTwo }} = obj2
console.log(myTwo)  // one, two 모두 객체 추출을 위한 Key 로 값이 할당되지 않습니다.
```

obj 객체 호출시 오류가 발생하는 이유는 **객체 내부의 객체를 추출** 하는 경우에는 **가장 깊은 단계의 값** 만 추출하고 나머지는 호출하기 위한 **Key 값** 로만 작동 합니다. <strike>즉 **객체 구조화** 의 경우 모든 변수에 값을 할당하지 않습니다</strike>
{: .notice--info}

```javascript
var others = Object.assign({}, combined);
var { other, ...others } = combined;
// others = { one: 1, two: 2, three: 3, four: 4}
```

## 2-3 가변변수와 불변변수

**let** 은 가변변수를 정의 하고, **const** 는 불변변수를 정의 합니다. **const** 로 생성된 객체의 경우, 원칙적으로는 객체 자신의 값을 변경할 수 없지만, JavaScript 함수로 **별개의 객체를 생성** 하는 함수는 **const** 객체의 값을 변경 가능 합니다.

**가변 내장 함수** (`push(...items), splice(s, c ...items), pop(), shift()`) 를 사용하면, **불변변수** 의 상태 와 값이 유동적으로 변하게 되어서 **객체 불변성 유지를 통한 안정성에** 크게 위협을 줍니다.

```javascript
const arr2 = [];
// arr2.push(1);          // [1]
// arr2.splice(0, 0, 0); // [0,1]
// arr2.pop();            // [1]
```

이러한 이유로 위의 내장함수 대신, **무결성 내장 함수** (`concat(...items), slice(시작_index, 마지막_index)`) 를 사용하여 객체 불변성을 유지하며 작업이 가능합니다. 무결성 함수를 사용한 객체와 배열의 예제는 다음과 같습니다.

```javascript
const arr3 = [];
const arr4 = arr3.concat(1);   //  [1]
const arr5 = [...arr4, 2, 3];   //  [1, 2, 3]
const arr6 = arr5.slice(0, 1); // arr6 = [1], arr5 = [1, 2, 3]
const [first, ...arr7] = arr5; // arr7 = [2, 3], first = 1

const obj3 = { name: '내이름', age: 20 };
const obj4 = { ...obj3, name: '새이름' }; // { name: '새이름', age: 20}
const { name, ...obj5 } = obj4;          // { age: 20 }

const arr = [1, 2, 3]; 
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
} // 가변 변수의 사용

for (const item in arr) {
  console.log(item);
} // iterator 방식의 for-in 루프와 함께 불변 변수 사용

// forEach 함수 예
arr.forEach((item, index) => {
  console.log(item);
  console.log(index);
});
```

## 2-4 클래스

JavaScript 에서는 기본으로 Class 를 지원하지 않아서 **ProtoType** 메서드를 활용하여 객체를 생성하는 방식으로 클래스와 클래스 메서드를 구현해 왔었습니다. 

```javascript
// ES5 문법
function Shape(x, y) {
  this.name = 'Shape';
  this.move(x, y);
}
// static 타입 선언 예제
Shape.create = function(x, y) {
  return new Shape(x, y);
};
// 인스턴스 함수를 선언하는 예제
Shape.prototype.move = function(x, y) {
  this.x = x;
  this.y = y;
};
Shape.prototype.area = function() {
  return 0;
};
```

```javascript
var s = new Shape(0, 0);
var s2 = Shape.create(0, 0);
s.area(); // 0

function Circle(x, y, radius) {
  Shape.call(this, x, y);
  this.name = 'Circle';
  this.radius = radius;
}
Object.assign(Circle.prototype, Shape.prototype, {
  area: function() {
    return this.radius * this.radius;
  },
});

var c = new Circle(0, 0, 10);
c.area(); // 100
```

ES6 에서 부터 **클래스** 개념과 **static** 선언이 함께 도입 되어 클래스 문법이 완성 되었습니다.보다 자세한 내용은 **[자바스크립트 객체지향 프로그래밍](https://www.youtube.com/playlist?list=PLuHgQVnccGMAMctarDlPyv6upFUUnpSO3)** 을 참고 합니다.

```javascript
class Shape {
  static create(x, y) {
    return new Shape(x, y);
  }
  name = 'Shape';
  // 클래스 메서드 선언
  constructor(x, y) { this.move(x, y); }
  move(x, y) {
    this.x = x;
    this.y = y;
  }
  area() { return 0; }
}
```

```javascript
var s  = new Shape(0, 0);
var s1 = Shape.create(0, 0);
s.area(); // 0

class Circle extends Shape {
  constructor(x, y, radius) {
    super(x, y);
    this.radius = radius;
  }
  area() {
    if (this.radius === 0) return super.area();
    return this.radius * this.radius;
  }
}
var c = new Circle(0, 0, 10);
c.area(); // 100
```

## 2-5 화살표 함수

기본의 함수 선언 방식은 다음과 같습니다.

```javascript
function add(first, second) {
    return first + second;
}; 
var add = function(first, second) {
    return first + second;
};
```

화살표 함수는 **인자블록 (())** 과 **본문 블록({})** 사이에 **화살표 기호 (=>)** 를 추가하면 됩니다. **이단계 함수 선언** 에서도 Arrow Function 을 사용할 수 있습니다.

```javascript
var add = (first, second) => {
    return first + second;
}

// 2단계 Arrow Function 의 선언
var addNumber = (num) {
    return (value) => num + value;
}
var addNumber = (num) => (value) => num + value;
```

**Class 객체** 에서 함수를 호출하는 경우, 참조하는 **콜백함수의 실행 범위** 에 따라서 **호출 가능한 객체** 가 제한 됩니다. 이를 보완하는 Method 로는 **bind()** 를 사용해서 **this** 객체로 전달과정을 포함해야 합니다. 

Arrow Function 을 사용하면 `bind()` 함수 없이 **this** 객체 만으로도 전달 가능합니다.

```javascript
// bind함수를 통해 this scope를 전달한 예
class MyClass {
  value = 10;
  constructor() {
    // bind() 함수를 사용한 객체전달 확장
    var addThis2 = function(first, second) {
      return this.value + first + second;
    }.bind(this);
    // Arrow Function 을 사용하면 bind() 없이 this 객체로 자동 연결된다.
    var addThis3 = (first, second) => this.value + first + second;
  }
}
```

## 2-6 객체 확장 표현식 & 구조 분해 할당

선언된 Object 내부에 Key 값들을 추가 할 수 있습니다.

```javascript
var obj = { a:1}
obj.b = 2;
obj["c"] = 3;

var nameKey = 'other'
obj[`an${nameKey}`] = 4;
```

## 2-7 라이브러리 의존성 관리

실행에 필요한 모듈을 모두 호출 되어야 작동이 원활 합니다.

## 2-8 배열 함수

ES5 에서 추가된 배열함수로 `forEach(), map(). recude()` 함수가 있습니다.

우선 배열함수를 사용하지 않고 구현하는 예제를 살펴보겠습니다.

```javascript
const qs = '?banana=10&apple=20&orange=30';

function parse(qs) {
  // .substr(시작_index, 종료_index) : String 객체 Slice 함수
  var queryString = qs.substr(1);       // '? 제거'
  var chunks = queryString.split('&');  

  var result = {}; 
  for(var i = 0; i < chunks.length; i++) {
    var parts = chunks[i].split('=');  // ['banana','10']
    var key   = parts[0];               // 'banana'
                                          // Number() : String 을 Float 으로 변환   
    var value = Number.isNaN(Number(parts[1])) ? parts[1] : Number(parts[1]);
    result[key] = value;   // 객체의 값 확장 
  }
  return result;
}

parse(qs)
```

### `.forEach()`

배열 객체를 for 반복문에서 함수처리를 반복하는 경우에는 **배열함수** 로 Re-Factoring 하면 간결해 집니다. 아래의 예제는 **chunks** 배열객체를 `.forEach()` 함수로 반복처리를 해 보겠습니다.

```javascript
function parse(qs) {
  var queryString = qs.substr(1);
  var chunks = queryString.split('&');  
  var result = {};
  chunks.forEach(function(value, index)) { // value : 개별 값, index : Key Index
    var parts = value.split('=');
    var key   = parts[0];
    var value = Number.isNaN(Number(parts[1])) ? parts[1] : Number(parts[1]);
    result[key] = value;
  }
  return result;
}
```

덧붙여서 추출한 값들은 배열 구조 할당으로 보다 간결하게 ReFactoring 이 가능 합니다.

```javascript
function parse(qs) {
  const queryString = qs.substr(1);
  const chunks = queryString.split('&');
  let result = {};
  chunks.forEach((chunk) => {
    const [ key, value ] = chunk.split('='); 
    result[key] = Number.isNaN(Number(value)) ? value : Number(value); 
  });
  return result;
}
```

### `.map()`

`.map()` 배열함수는 인자에 포함된 **콜백함수가 실행 될 때 마다 새로운 객체를 생성** 합니다. 아래의 내용을 실행하면, `[ { key: 'banana', value: 'one' }, { key: 'apple', value: '20' }, { key: 'orange', value: '30' } ]` 반복문 실행시 마다 새로운 객체를 생성하는 것을 알 수 있습니다.

```javascript
function parse(qs) {
  const queryString = qs.substr(1);
  const chunks = queryString.split('&');
  const result = chunks.map((chunk) => {
    const [ key, value ] = chunk.split('='); // key = 'banana', value = '10'
    return { key: key, value: value }; // { key: 'banana', value: '10' }
  });
  return result;
}
```

### `.reduce()`

`reduce(콜백함수, 초기값 객체)` 배열함수는 **배열 형태를 객체(`숫자,문자,배열,객체,boolean`) 형태로 변환** 하는 함수 입니다.

```javascript
// 0 : 데이터 초기값 선언 (Initialization)
function sum(numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
sum(['1',2,3,4,5,6,7,8,9])
```

`.map()` 에서 반복적인 객체를 생성된 데이터 Type 을 합치는 용도로써 `.reduce()` 메서드를 유용하게 활용할 수 있습니다.

```javascript
function parse(qs) {
  const queryString = qs.substr(1);
  const chunks = queryString.split('&');
  const result = chunks.map((chunk) => {
    const [ key, value ] = chunk.split('='); // key = 'banana', value = '10'
    return { key: key, value: value }; // { key: 'banana', value: '10' }
  });

  // reduce() 배열 함수를 활용하여 객체 합치기
  var result2 = result.reduce(function(result, item){
    result[item.key] = item.value;
    return result;
  } , {});
  return result;
}
```

객체 구조화 할당을 활용하면 result2 의 수식을 보다 간단하게 정리할 수 있습니다.

```javascript
function parse(qs) {
  ...
  var result2 = result.reduce(function(result, {key, value}){
    result[key] = value;
    return result;
  } , {});
  return result;
}
```

## 2-9 비동기 함수

### urgentWork()

프로그램은 순서대로 실행하는게 원칙 이지만, 이러한 순서에 얽매이지 않고 실행 가능한 방법이 **비동기 실행** 입니다. JavaScript 에서는 비동기 실행 함수를 `urgentWork()` 를 사용하면 구현 가능합니다.

```javascript
// ES5의 예제
function work1(onDone) {
  setTimeout(() => onDone('작업1 완료!'), 100);
}
function work2(onDone) {
  setTimeout(() => onDone('작업1 완료!'), 200);
}

// 앞서 실행된 명령과 별개로 작동
function urgentWork() {
  console.log('긴급 작업');
}

work1(function(msg1) {
  console.log('done after 100ms:' + msg1);
  work2(function(msg2) {
    console.log('done after 300ms:' + msg2);
  });
});
urgentWork(); // 비동기 함수를 실행
```

## Promise

위 방식은 CallBack 형식으로 작업 내용을 알아보기 어려운 단점이 있습니다. 이를 간단하게 작업이 가능한 **클래스 객체** 로 **Promise** 클래스를 제공 합니다.

**Promise** 객체는 `then(), catch(), finally()` 메서드를 활용하여, CallBack 방식을 Currying 방식으로 구현이 가능 합니다.

```javascript
// 1. Producer
// New Promise is Created, the Excutor runs automatically.
const promise = new Promise( (resolve, reject) => {
  console.log('doing something...');
  setTimeout( ()=> {
    reject(new Error('no network'));
  }, 2000);
  
  // 2. Consumer : then, catch, finally
  promise
    .then(value => {   // 정상 처리된 경우
      console.log(value);
    })
    .catch(error => {  // 비정상 처리된 경우
      console.log(error);
    })
    .finally( () => {  // 정상/비정상 처리된 후
      console.log('finally')
    });
```

## 3 Component

## Curly Brace

데이터 원본을 React.js Component 에 전달 합니다. 단위 데이터, 객체, 배열, 함수, JSX 까지 모두 전달이 가능합니다. 

{% raw %}
```r
{2}, {true}, 
{[1,2,3,4]}, {{ key:'value'}},
{ () => {} }, {<span>JSX Code</span>}
```
{% endraw %}

## Children Property

Component 중간의 Node 에 데이터를 정의하면 컴포넌트가 이를 인식하여 동작 합니다.

```java
render() {
  return (
      <>
        <ChildComponent> 데이터 TAG </ChildComponent>
        // 속성 으로도 Children 을 입력 가능합니다.
        <ChildComponent children={<b>데이터 TAG</b>} />
      </>
)};
```

### ProtoTypes

데이터 형식을 미리 정의하면, 정의한 내용과 다른 내용이 입력된 경우 오류 메세지를 출력 합니다.

### Component Condition : `&&`

**조건이 true** 일 때, **지정된 값을 할당** 하고, undefined 등의 오류가 발생하는 경우에는 **해당 객체의 연성 과정을 무시** 하고 진행을 합니다.

{% raw %}
```javascript
let value;
if (obj) {
  value = obj.key1;
};
const value = obj && obj.key1;
{ condition && <Component  /> }
```
{% endraw %}

`if (value)` 판단문에서 **true** 와 **false** 결과값은 아래의 객체로도 대체 가능합니다.

```javascript
true : -1, '0', 'false'(문자열), `{}`, `[]`
false : undefined, null, 0, NaN
```

### Component Condition : `||`

**조건이 false** 일 때, **지정된 값을 할당** 하고, 유효한 값이 전달된 경우에는 해당 값을 적용 합니다.

{% raw %}
```javascript
const Box = styled.div`
  background: ${props => props.color || 'blue'};
  padding: 1rem;
  display: flex;
`;
```
{% endraw %}