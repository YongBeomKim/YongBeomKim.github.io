---
title : CSS Style Tips
last_modified_at: 2019-06-17T12:45:06-05:00
header:
  overlay_image: /assets/images/book/css.jpg
categories:
  - css
tags: 
    - css
    - flexible
toc: true    
---

HTML 에서 다양한 효과를 추가할 때, **Vue.js React.js** 나 **Javascript** 를 활용한 **Jquery** 효과도 가능하지만 내용이 분리되어 유지보수가 어렵습니다. 이번 프로젝트의 작업을 진행하면서는 **HTML5** 와 **CSS3** 의 기능을 활용하여 다양한 효과들을 적용하겠습니다.

이번 페이지에서는 CSS3 의 `::before` 와 `::after` 그리고 다양한 `transform` 등의 기능을 활용하여 다양한 효과들을 추가합니다. 그리고 필요한 라이브러리는 여러군데 찾기보단 **[Codepen](https://codepen.io/)** 에서 검색한 뒤 최대한 간결한 내용들을 활용 및 정리해 보겠습니다.

<br/>
# **농림축산식품 창업경진대회**

**7월 10일** 까지 **웹 서비스를** 구성하여 **[농림축산식품 창업경진대회](http://data.mafra.go.kr/contest/introduction/introduction/screen.do)** 를 신청해 보도록 하겠습니다. **CASCADE 작업방식** 으로 **2019.4.10 ~ 2019.7.10** 까지 2주내 틀과 웹 서비스를 완성한 뒤, 필요한 서류들을 작성해 제출까지 진행해 보도록 하겠습니다.

<figure class="align-center">
  <img src="http://c.incru.it/newjobpost/2019/05_mafra/mafra.jpg">
  <!--<img src="{{site.baseurl}}/assets/images/code/">-->
</figure>

<br/>
# Accordian Menu

SSGPAY 에서 인상깊게 남은 Accordion Menu 방식과, 카드 접이식 방법을 활용한 내용의 전개에 대해 정리해 보겠습니다. 구현된 내용들을 보면 **Jquery** 를 사용했을 뿐, 기본적인 HTML5 코드와 CSS3 를 활용하여 구현을 한 내용을 볼 수 있었습니다.

## HTML Code

템플릿의 HTML 내용을 살펴보면 다음과 같습니다. **accordion** 클래스를 선택하면 바로 연결되어 있는 **panel** 의 내용을 출력 합니다.

```html
<button class="accordion">Section 1</button>
<div class="panel">
  <p>Lorem ipsum dolor sit amet..</p>
</div>

<button class="accordion">Section 2</button>
<div class="panel">
  <p>Lorem ipsum dolor sit amet..</p>
</div>

<button class="accordion">Section 3</button>
<div class="panel">
  <p>Lorem ipsum dolor sit amet..</p>
</div>
```

## JavaScript

개별 메뉴버튼을 **"Click"** 을 하면 **this.nextElementSibling** 함수를 사용하여 바로 아래에 연결된 내용을 출력 합니다. 이로인해 별도의 상속관계를 설정할 필요가 없이 유지보수가 간결해 지는 장점이 있습니다. 전체  **JavaScript** 내용을 살펴보면 다음과 같습니다.

```javascript
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
```

## CSS 

그리고 이들을 이어주는 **CSS** 내용을 살펴보면 다음과 같습니다.

```css
.accordion {
  color: #444;
  background-color: #eee;
  transition: 0.4s;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  font-size: 15px;
}
.active, .accordion:hover {
  background-color: #ccc;
}
.accordion::after {
  color: #777;
  content: '\002B'; /*메뉴 Default 표식*/
  float: right;     /*오른쪽에 표식*/
  font-weight: bold;
  margin-left: 5px;
}
.active::after {
  content: "\2212"; /*메뉴 Active 표식*/
}
.panel {
  padding: 0 18px;
  max-height: 0;
  overflow: hidden; /* 부모를 넘어가는 자식은 숨김 */
  background-color: white;
  transition: max-height 0.2s ease-out;
}
```

<br/>
# Card Menu

위에선 간단한 기능을 활용한 아코디언 메뉴를 알아보았습니다.

페이지별 내용을 출력하고 결과를 볼 수 있어서 공간적인 측면에선 유용하지만 1개를 활성화 하면 다른 페이지를 닫으면 보다 집중도가 높아서 효과가 높을 것으로 기대 됩니다. 이번 **[예제내용](https://codepen.io/jerica/pen/XYzmQx)** 을 참고로 하여 본문을 디자인 하도록 하겠습니다.

<!-- 메뉴 예제사이트 https://codepen.io/jerica/pen/XYzmQx -->
