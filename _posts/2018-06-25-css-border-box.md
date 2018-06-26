---
title : CSS border-box
last_modified_at: 2018-06-24T10:45:06-05:00
header:
  overlay_image: /assets/images/book/css.png
categories:
  - css
tags: 
    - css
    - borderbox
toc: true 
---


# Html CSS Style 속성 활용하기

[border-box 개념설명 사이트](https://www.tabmode.com/homepage/box-sizing.html)

<br>
## border-box

bootstrap, materializeCSS 등을 사용하면, layer box 들이 비율별로 변경됨을 볼 수 있었다. 고유 객체가 독립적인 경우에는 유연하게 보이겠지만, 메뉴와 기타 다양한 Layer를 쓰는 입장에서는 전체 크기가 너무 유연하게 변함으로써 처음에 정한 디자인 틀이 깨지는 문제가 있었고. 이를 불활성화할 필요에서 이번 내용을 정리하려고 한다.

`box-sizing : content-box` 초기설정값 
**
아래의 내용을 사용자가 설정한 CSS에 추가를 하면 된다

```css
html {
    box-sizing : content-box !important;
}
```


<br>
## Head 에서 Style 과 Script 추가

html도 소스코드인 만큼, 위에서 부터 순차적으로 내용확인한 뒤, 메모리에 올리고, 올라간 내용 중 해당함수를 찾는 과정을 거치면서 내용을 실행한다

```css
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/morris.min.js"></script>
```

우선 기본이 되는 **Jquery**를 메모리에 올린 뒤, 이를 바탕으로 응용 모듈인 **morris.js** 을 실행하는 구조로 작동된다. 만약 위 소스코드에서 위/아래 순서를 바꾸게 된다면 **morris.js** 먼저 올라간 상태에서는, **jquery** 내용은 메모리에 올라오지 않은 상태로써 상속 받기 어려워 **morris.js** 는 **_연관된 jquery 를 찾을 수 없다_** 는 오류를 출력한다


CSS문법의 경우도 마지막에 올라온 내용을 Update하는 만큼, 기본 CSS/ JS를 먼저, 응용 CSS/JS를 중간, 사용자 설정내용은 마지막에 배치함으로써 내용간의 충돌 및 설정변경에 유연한 대처가 가능하다
