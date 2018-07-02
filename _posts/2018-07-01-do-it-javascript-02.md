---
title : Do It Js,Jquery 02 객체
last_modified_at: 2018-06-27T21:45:06-05:00
header:
  overlay_image: /assets/images/book/js.jpg
categories:
  - js
tags: 
    - javascript
toc: true 
---

# JavaScript

객체는 기능 과 **속성**(내장객체 지정 method) 를 갖는다

<br>
## 내장객체

```javascript
var t = new Date();
var nowYear = t.getFullYear();           // 올해값
var theDate = new Date(nowYear, 11, 31); // 월 (0 ~ 11)
var diffSec = theDate - t;               // 올해 남은 일수
document.write("올해는 " + diffSec + "초 남음<br/>") //밀리 초

var diffDay = Math.ceil(diffSec / (60 * 1000 * 60 * 24))
document.write("올해는 " + diffDay + "일 남음")  //밀리 초
```

<br>
```javascript
var num    = 2.13123;
var maxNum = Math.max(10, 5, 8, 30);
var minNum = Math.max(10, 5, 8, 30);
var rndNum = Math.random(); // 0~1 사이의 난수
var piNum  = Math.PI;
```

<br>
## 배열객체

### 배열객체 기본

> **배열 인덱스**는 Python과 동일하게 `0` 부터 시작한다

```javascript
var arr = new Array("값1", "값2", "값3"......)
var arr = new Array(1, "hello", true)

var arr = new Array()
arr[0] = 1;
arr[1] = "hello";
arr[2] = true

for (var i=0; i<arr.length; i++){
    document.write(arr[i], "<br/>")
}
```

### 배열 메서드

|종류                   | 설명                              |
|:---------------------:|:---------------------------------:|
|join()                 | 객체들을 연결된 1개의 문자로 출력 |
|reverse()              | 배열 순서를 뒤바꾼다              |
|sort()                 | 오름차순(default) 정렬            |
|slice(인덱스1, 인덱스2)| 구간 자르기                       |
|splice()               | 구간을 나눈뒤 새 데이터 삽입      |
|concat()               | 두 배열을 합친다                  |
|pop()                  | 마지막 인덱스를 삭제한다          |
|push(data)             | 마지막 인덱스를 추가한다          |
|shift()                | 첫번째 인덱스를 삭제한다          |
|unshift(data)          | 첫번째 인덱스를 추가한다          |
|length                 | 배열의 갯수를 호출                |



<br>
## 문자객체 (String Object)

```javascript
var t = new String("javascript");
var t = "javascript"     // 이게 더 간단하고 직관적
```

### 문자객체 메서드

|종류                   | 설명                              |
|:---------------------:|:---------------------------------:|
|charAt(index번호)      | index 해당 문자를 출력            |
|indexOf("찾을문자")    | 왼쪽에서 최초일치 인덱스 출력 |
|lastIndexOf("찾을문자")| 오른쪽에서 최초일치 인덱스 출력|
|match("찾을문자")      | 왼쪽에서 최초일치 문자를 출력 |
