---
title : 자바스크립트 입문 요약
last_modified_at: 2018-11-09T10:45:06-05:00
header:
  overlay_image: /assets/images/book/JavaScript.png
categories:
  - javascript
tags: 
    - javascript
toc: true 
---


**html5 태그 -> CSS 스타일 -> JavaScript 기본 기능 -> Jquery 동적기능 -> Vue / React 프레임워크** 순서대로 **기본 내용, 보완/추가 부분을 정리하는** 방식으로 내용을 정리하면 탄탄하게 기본기가 구축될 것이다. 이번 기회에 웹프로젝트를 구체화 하면서 체계적으로 정리하는 시간을 갖으려고 합니다

> Book Review : JavaScript 입문 2016 윤인성

**method(메소드) :** 객체중 자료의 type이 함수인 속성을 갖는 것으로, 함수 내부값을 외부로 호출시 **this 키워드**를 사용합니다.
{: .notice--info}

`%` : 나머지, `||` : 논리합, `&&` : 논리곱, `typeof()` : 자료형 확인 

<br/>
# Basic

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

<br/>
# 이벤트 (event)

> window **.onload** = function () {}

**범위**.on 이벤트 이름 (**event property**)

이벤트 속성으로는 **onblur, onfocus, onload, onscroll, onclick, ondbclick, onmousedown, onmouseup, onchange, onselect, onkeypress, onkeyup, onerror** 등이 있다.