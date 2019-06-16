---
title : WEB Animation CSS & JS
last_modified_at: 2019-06-09T12:45:06-05:00
header:
  overlay_image: /assets/images/book/js.jpg
categories:
  - js
tags: 
    - js
    - css
    - javascript
toc: true    
---

**TypewriterJS** 와 같은 도구들이 일반 환경에서는 잘 작동하지만, 사양이 낮은 환경에서는 **Chrome** 이 아닌 경우에는 튕기는 등 문제가 발생하는 상황이 발생합니다. 

작업을 진행하면서 다양한 효과를 사용하기 보다는 **필요한 효과를 몇가지로 한정** 하고, 이에 **대응 가능한 여러가지 방법들을 정리** 하여 생산성을 높이도록 합니다.

<br/>
# Typing Text

앞에서 정리한 **TypewriterJS** 도 있지만, 상황적인 제약과 텍스트는 기본 구성요소인 만큼 다양한 효과 방법들을 정리해 보도록 하겠습니다.

## css-tricks.com

**[css-tricks.com](https://css-tricks.com/snippets/css/typewriter-effect/)** 에 정리된 내용들은 기본적인 HTML5 와 CSS 를 활용한 내용들을 정리한 페이지 입니다.

## tobiasahlin.com

**[tobiasahlin](https://tobiasahlin.com/moving-letters/)** 사이트는 개인이 정리한 예제 블로그로 **anime.min.js** 와 **jquery** 를 사용한 예제들로 생각보다 코드가 길고 복잡한 단점이 있습니다.

## www.justinaguilar.com

[justinaguilar.com](http://www.justinaguilar.com/animations/) 에서 예제관련 CSS 내용을 볼 수 있습니다. 하지만 이를 HTML 에서 어떻게 구현하는지는 자세히 나와 있지 않아서 조금 더 확인이 필요 합니다.


<br/>
# 기능의 구현

현재 작업에 필요한 기능 들로는

1. 메뉴 스크롤로 인한 **[Nav 투명도](https://codepen.io/michaeldoyle/pen/Bhsif/)** 변화
2. **[velocity.js ](https://codepen.io/zeasts/pen/mPLEQe)** 기능별 버튼 Hover 시 Pop-Up 내용 설명 
3. **[letter move](https://tobiasahlin.com/moving-letters/)** 페이지 이동시 전체 화면적인 리액션

## Bootstrap 
Bootstrap Popover with velocity.js 
