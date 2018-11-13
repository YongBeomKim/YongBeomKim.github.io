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


> Book Review : JavaScript 입문 2016 윤인성

**html5 태그 -> CSS 스타일 -> JavaScript 기본 기능 -> Jquery 동적기능 -> Vue / React 프레임워크** 순서대로 **기본 내용, 보완/추가 부분을 정리하는** 방식으로 내용을 정리하면 탄탄하게 기본기가 구축될 것이다. 이번 기회에 웹프로젝트를 구체화 하면서 체계적으로 정리하는 시간을 갖으려고 한다


# Basic

1. if, for, else if, switch, break
2. boolean 표현식 **?** \<true 일 때\> **:** \<false/undefined 일 때\>
3. \<true/유효한 값이 존재시\> \|\| \<false/undefined 일 때\>

```javascript
// 정의된 내용이 없으면 || undefined 조건시 결과를 출력 
let test
test = test || "초기화 합니다"
```



**.srcElement.textContent** 를 사용하면 엘리먼트에 접근 가능합니다
{: .notice--info} 
