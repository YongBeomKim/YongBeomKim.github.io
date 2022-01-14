---
title : Js & Ts Tips 그리고 기초문법들
last_modified_at: 2021-11-21T10:45:06-05:00
header:
  overlay_image: /assets/images/react/js-banner.png
categories:
  - javascript
tags: 
    - javascript
    - typescript
toc: true 
---

Do It 타입스크립트 내용을 정리해 보겠습니다. 아래는 2018년 JavaScript 를 정리한 내용을 덧붙여 놓았습니다.

</br>

# JavaScript 심화

## Falsy

일반적으로 boolean 값으로는 `true, false` 가 있다. JavaScript 에서는 이들을 확장한 개념으로 `truthy, falsy` 개념을 활용한다. `falsy` 에는 아래의 6개 객체가 해당되고, 나머지 모든 객체를 `truthy` 에 해당한다

```javascript
false, 0, '', null, undefined, NaN
```

### Implicit Coercion

어떤 값을 바꾸는 과정이 명시적이면 `타입 캐스팅(Type Casting)` 으로 **정적 타입 언어에서 컴파일 시점** 에 활용되고, **값이 사용되는 규칙에 따라 암시적** 이면 `강제변환(Coercion)` 으로써 **동적 타입 언어에서 런타임 시점** 에 활용한다.

이를 다른말로 요약하면, **명시적 강제변환'은 코드만 봐도** 의도적으로 탕입변환을 일으킨다는 사실이 명백한 반면, **암시적 강제변환(Implicit Coercion) 은 다른 작업 도중 불분명한 부수 효과** 로부터 발생하는 타입변환을 뜻한다. 이러한 암시적 변환을 이해하는데 위의 `falsy` 개념이 중요하게 활용 된다.

### React 암시적 강제변환

React.js 공식문서에서 **[조건부 랜더링](https://ko.reactjs.org/docs/conditional-rendering.html)** 내용으로 다음의 예시를 볼 수 있다.

```javascript
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }
  return <h1>Check</h1>;
}
```

`props.warn` 값의 true, false 여부를 판단하는 내용이 아니라, `undefined` 여부를 확인하여 해당되면 암시적 강제변환 에서 `true` 를 출력한다.

### NonNull Assertion

`!` 는 **앞에 붙어야** 반대 및 조건부 랜더링에 작동을 하고, **뒤에 붙으면 nonnull assertion**, 널리쉬하지 않다고 컴파일러한테 직접 보증?해주는 기능입니다.

```javascript
export const DomRef = () => {
  const inputRef = useRef<HTMLInputElement>(null!)
  useEffect(()=> {
    inputRef.current.focus()      // ! : Type 선언에서 ! 사용시 ? 불필요
  }, []);
  return <input type="text" ref={inputRef} />;
}
```

이처럼 React Hook 에서 초기값을 선언 할 때, non null assertion 을 활용하면 `current?` 를 사용하지 않아도, 문법의 오류없이 실행되는 것을 볼 수 있다.

<br>

# TypeScript

## Array 배열의 Math 연산

`Do It 타입스크립트` 의 **05-3** 내용으로 배열의 `filter, map, reduce` 활용예시 입니다.

```typescript
const multiply = (result: number, val: number) => result * val;

let numbers: number[] = [1,2,3,4];
let tempResult = numbers
  .filter(val => val % 2 != 0) // 홀수 필터링 [1,3]
  .map(val => val * val)  // 제곱 Mapping [1, 9]
  .reduce(multiply, 5)    // (Array f'multiply), f'multiply 추가 

let result = Math.round(Math.sqrt(tempResult)); // 제곱근, 반올림
console.log(tempResult); // 45
console.log(result);     // 7
```

## 제너릭

타입스크립트의 타입제약 가능한 문법으로 타입의 범위를 한정하는 기능을 제공합니다. 이를 **제너릭 타입제약(Generic Type Constraint)** 이라고 합니다.


<br>

# 최신 JavaScript

> Book Review : JavaScript 입문 2016 윤인성

**method(메소드) :** 객체중 자료의 type이 함수인 속성을 갖는 것으로, 함수 내부값을 외부로 호출시 **this 키워드**를 사용합니다.
{: .notice--info}

`%` : 나머지, `||` : 논리합, `&&` : 논리곱, `typeof()` : 자료형 확인 

## 단위

배열 `{}`, 리스트 `[]`, 객체 `Object.assign()`

## 객체복사

rest 파라미터 (가변 파라미터를 배결로 변환) `...`,  스프레드 연산자 (배열을 함수 파라미터나 리스트로 변환) `...` 및 `Object.assign()` 를 활용하면 얕은복사 (shallow copy) 객체가 생성된다. 이는 원본객체의 Property 를 수정하면, 복제 객에 에서도 수정된 값을 적용한다.

```typescript
const myObject = { name:"Tom", age:"20" }
const item = Object.assign({}, myObject)
const clone = {...myObject}
```

## 화살표 함수와 표현식

```javascript
// let 함수명 = (파라미터) => { 본문 }
let sum = (arg1,arg2) => arg1+arg2;

function Greeting: React.FC<T> = (
  {name: string, mark: boolean}
) => { <></>}
```

본문이 단일 표현식인 경우에는 중괄호와, `return` 생략 가능하다

## Datum functions

1. **if, else if, switch, break**
2. boolean 표현식 **?** \<true 일 때\> **:** \<false/undefined 일 때\>
3. \<true/유효한 값이 존재시\> \|\| \<false/undefined 일 때\>

```javascript
// 정의된 내용이 없으면 || undefined 조건시 결과를 출력 
let test
test = test || "초기화 합니다"
```

## Data functions

> `ex) let array = [52, 273, '아침밥', 점심밥', true, false]`

1. Array 배열 (인덱스별 element 묶음)
2. for
3. while, break (while 반복 중 break 조건추가) 

```javascript
// for (초기식; 종료식 <true 반복실행/false 종료>; step함수)
for (let i=0; i< 반복횟수; i++){...} // 1씩 증가함수
for (let length-1; i>=0; i--){...}   // 1씩 감소함수

for (let i in array){                // 배열 인덱스
      console.log('${i}인덱스 {array[i]}') }            

for (let item of array){             // 배열 값
      console.log(item)
```

## User functions

1. **같은이름, 익명함수 반복 정의시** 뒤의 내용으로 overwriting
2. `() => {}` **: 화살표 함수**
3. `function 함수명() {...};` **: 익명함수**
4. `let 함수명 = function(){...};` **: 선언적 함수** 

익명함수를 생성하면 선언적 함수를 overwriting 한다. 이는 **선언적 함수는 코드실행 전** 초기할당 되기 때문이다. 이를 피하기 위해서는 `let 함수` 를 선언해야 합니다 <small>하지만 익스플로에선 호환여부를 확인해야 한다</small>
{: .notice--info}

익명함수를 `function() {}` 과 `() =>` 두가지가 있고, **this** 동작에서 차이를 갖는다. **전자의 this** 는 최상위 객체에서 정의가 되고 **후자의 this**는 **자신과 관련된 것**으로 정의 됩니다.
{: .notice--danger}

```javascript
// 함수의 기본형태
function 함수이름 (매개변수, 매개변수) {
    let output = 초기값
        함수코드
    return output;
}

// Call Back 함수 : 매개변수로 전달하는 함수
function callTimes(callback) {
    for (let i=0; i<10; i++) {
        callback()
    }
}

//callback() 함수의 내용 
callTimes(function() {  })
```

## 표준 내장함수

1. **parseInt() :** 문자열을 정수로 변환
2. **parseFloat() :** 문자열을 실수로 변환
3. **setTimeout(함수, 시간) :** 특정시간 후 함수실행
4. **setInterval(함수, 시간) :** 특정시간 마다 함수실행
5. **clearInterval( 함수명 ) :** 특정시간 실행함수 정지  

<br/>
# Element (객체)

## 객체 

javascript 객체의 기본형태로, value값이 여럿인 경우 배열로 출력

```javascript
let product = {
    key: value,
    key: value,
}
for (let key in object) {
    console.log(`${key}: ${object[key]}`)
}

product.key
```

## false

**false 데이터** : **0, NaN, "", null**(키워드), **undefined**

## Array 객체

> Array.method()

Array 메소드 중에는 파괴적 / 비파괴적 메소드가 구분된다

|**Array 메소드** |   **내용**    |
|:-------------:|:--------------:|
|concat()       | 합친 1개 배열  |
|join()         | 문자열 1개로   |
|pop()          | 마지막 제거    |
|push()         | 마제막 추가    |
|reverse()      | 순서 뒤집기    |
|slice()        | 지정한 부분을 리턴 |
|sort()         | 정렬 (-1/0/1)  |
|splice()       | 특정부분 분리  |

| EC5 추가      |   내용         |
|:-------------:|:--------------:|
|forEach()      | 배열요소 하니씩 |
|map()          | 콜백리턴값으로 새로운 배열|
|filter()       | true조건 콜백리턴으로 새로운 배열 |


## JSON

문자열은 \" \" 쌍따옴표로 작업을 해야한다

1. **JSON.stringfy(\< <small>객체</small> \>, \< <small>변환함수</small> \>, \< <small>공백갯수</small> \>) :** JSON을 **문자열로** 변환 (join의 기능)
2. **JSON.parse(\< <small>문자열</small> \>) :** JSON을 **자바스크립트 객체로** 파싱
 
<br/>
# 예외처리 

if 조건문으로도 가능, But!!!

```javascript
try{  // 실행함수
  } catch (exception) { // 예외 처리함수
  } finally {           // 모든경우 거친다 
}
```

**catch, finally** 경우에 따라 선택적으로 사용한다, 오직 **try{ }** <samll>(예외처리 시작함수)</samll> 구문만 필수로 시작한다 
{: .notice--info}

<br/>
# **Document** <small>(문서객체)</small>

**Dom Node :** html 페이지는 1) **Tag와 Script를** 생성하는 **Element Node**, 2) 화면 출력되는 **문자열은 Text Node** 로 구분된다.

## **Document 객체선택**

최초의 Dom으로 생성된 내용을 자바스크립트에서 객체로 변환하는 작업들을 의미 

> **querySelector()** HTML5 에서 추가된 내용이다

```javascript
// 선택자 : #아이디, .class
document.getElementById(#아이디)
document.querySelector(선택자)    // 객체 선택 
document.querySelector('h2').style.color='red';
document.querySelector('h1').style.backgroundColor='red';
```

> **.innerHTML** 

```javascript
window.onload = function(){
  var header  = document.getElementById('header');
  var origianlText   = header.innerHTML; // HTML Text Node
  header.innerHTML  += '변경완료: 원본은' + origianlText;
  header.style.color = 'red';
};
```

## 문서객체 배열선택 

> document **.querySelectorAll(선택자)** // 배열객체

```javascript
var headers = document.querySelectorAll('h1');
for (var i=0; i<headers.length; i++){
  var header = headers[i];
  header.innerHTML = 'Form JavaScript'
}
```

<figure class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/book/document.jpg" alt="">
  <figcaption>DOM window 와 document 개념도</figcaption>
</figure> 


## 이벤트 (event)

> window **.onload** = function () {}

**범위**.on 이벤트 이름 (**event property**)

이벤트 속성으로는 **onblur, onfocus, onload, onscroll, onclick, ondbclick, onmousedown, onmouseup, onchange, onselect, onkeypress, onkeyup, onerror** 등이 있다.