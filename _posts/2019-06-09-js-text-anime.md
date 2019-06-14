---
title : WEB Text Animation by JavaScript
last_modified_at: 2019-06-09T12:45:06-05:00
header:
  overlay_image: /assets/images/book/js.jpg
categories:
  - js
tags: 
    - js
    - javascript
toc: true    
---

앞에서 기본적인 CSS 문법과 유용한 도구들에 대해 알아보았습니다. 일반적으로 HTML5 와 CSS 를 활용하는 방법이 JavaScript 보다 가볍고 호환이 좋은 것으로 알려져 있습니다.

**TypewriterJS** 와 같은 도구들이 일반 환경에서는 잘 작동하지만, 사양이 낮은 환경에서는 **Chrome** 이 아닌 경우에는 튕기는 등 문제가 발생하는 상황이 발생합니다. 이를 대비하기 위해 다양한 효과보단 필요한 효과들을 몇가지로 한정을 하고, 이에 대응 가능한 여러가지 방법들을 정리하여 보완하는 방법이 생산성 향상에 도움이 됩니다.

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
# Animate.css

웹 페이지에서 구현하고 싶은 대부분의 내용을 [예제](https://codepen.io/Hudson_Taylor11/full/jBdQRY/) 와 개별 내용들을 **[정리된 페이지](https://scotch.io/tutorials/level-up-your-websites-with-animatecss)** 를 요약 정리해 보도록 하겠습니다. **[Change Opacity On Scroll](https://www.youtube.com/watch?v=TjBDjw0cZVo)** 등 에서 보다 자세한 내용을 확인할 수 있습니다.

## Introduction

**class** 로 **animated** 와 함께 **추가할 효과 이름** 을 붙여서 실행하면 됩니다. 적용 가능한 클래스는 [animate.css](https://daneden.github.io/animate.css/) 의 예제를 참고 합니다. 

```html
<h3 class="animated bounceIn">GooGle.Com</h3>
```

효과를 반복 하려면 설정값을 추가하면 됩니다.

```html
<h3 class="animated bounceIn infinite">GooGle.Com</h3>
```

애니메이션의 타이머등 추가적인 설정이 필요한 경우에는 **추가할 효과 이름** 의 **CSS** 를 Overwriting 하면 됩니다. **bounceIn** 타이머를 추가해 보도록 하겠습니다. 여기서 입력하는 **CSS3 Animation** 설정의 자세한 내용은 **[CSS/애니메이션/Animation](https://www.codingfactory.net/11163)** 블로그에 정리된 내용을 참고 합니다.

```css
.bounceIn {
  animation-duration: 3s;
  animation-delay: 2s;
  animation-iteration-count: infinite;
}
```

**delay** 와 **speed** 설정은 **Inline** 방식으로도 추가 가능합니다. 자세한 내용은 **[GitHub README](https://github.com/daneden/animate.css)** 에 설명되어 있습니다.

delay 설정으로 추가 가능한 값으로는, **delay-2s :** 2sec, **delay-3s :** 3sec, **delay-4s :** 4sec, **delay-5s :** 5sec 가 있습니다. 

speed 설정 값으로는 **slow :** 2sec,  **slower :** 3sec, **fast :** 800ms, **faster :** 500ms 가 있습니다. 

```html
<div class="animated bounceIn delay-2s">Example</div>
<div class="animated bounceIn faster">Example</div>
```

**특정한 조건** 및 **사용자 Action** 에 대응하는 **CSS 를 추가하는 JavaScript** 내용을 간단하게 살펴보면 다음과 같습니다.

```javascript
const element =  document.querySelector('#위치')
element.classList.add('animated', 'bounceOutLeft')
```

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/font-awesome.png">
</figure>