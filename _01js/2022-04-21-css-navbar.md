---
layout: blog
title: CSS Navigation 만들기
tags:
- css
---

사이트 CSS 작업을 하면서, 단계별 이해를 필요로 하는 개념들을 하나씩 정리 해 보겠습니다. (처음부터 매 번 다시 시작하는 듯 해서 정리를 시작하게 되었습니다.) [HTML Semantic Elements](https://dotnettutorials.net/lesson/semantic-elements-html/)

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/web/semantic.png">
  <figcaption>HTML Sematic Elements</figcaption>
</figure>

<br/>

# Header
`Header` 태그는 영화의 `로고` 또는 `메인 타이틀` 처럼 화면을 꽉 채우는 특정 이미지를 배경으로 활용을 할 때 주로사용 합니다. 때문에 태그 내부에 구성요소가 많으면 모바일 등으로 화면이 전환될 때 요소들이 엉킬 수 있는 단점이 있습니다. 따라서 화면을 꽉 채우지 않는 `서비스의 대표 이미지`를 전달하는 목적으로 페이지를 구성할 때 사용 합니다.
```css
header{
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
}
```

<figure class="align-center">
  <img width="200px" src="{{site.baseurl}}/assets/web/html-template-536788.jpg">
  <figcaption>페이지로 이미지 활용예시</figcaption>
</figure>

<br/>

# Section, Div
최근은 모바일 기능이 강조 되면서 `웹툰`과 같이 구성요소들이 화면의 폭 길이에 따라 구성요소들을 채운 높이 길이가 천차만별로 달라진 구성을 갖게 됩니다. [아침식사 메뉴 예시 사이트](https://nicepage.com/templates/preview/breakfast-menu-1672524?device=desktop) `flex-box`를 활용하여 객체들을 차례로 쌓아올리는 방식으로 화면을 구성 합니다. `Scroll` 기능을 통해서 내용을 얼마나 바로 보여줄 것인가 결정하게 되는데, `Infinite Scroll` 등의 부가 기능을 주로 활용 합니다.

<figure class="align-center">
  <img width="600px" src="{{site.baseurl}}/assets/web/food-menu-pc.png">
  <figcaption>데스크탑 모드</figcaption>
</figure>

<figure class="align-center">
  <img width="250px" src="{{site.baseurl}}/assets/web/food-menu-mobile.png">
  <figcaption>모바일 모드</figcaption>
</figure>

<br/>

# NavBar
첫페이지를 구성하는 필수 요소로 네비게이션바를 들 수 있습니다. 다음의 예시는 메뉴와 사용자 로그인 부분이 별도로 모바일 구성에서 보여질 수 있도록 작업을 한 예제 입니다. 튜토리얼을 작업하면서, 중요한 내용들을 정리해 보겠습니다.

[![Responsive Navbar Tutorial](https://i.ytimg.com/vi/VRrEquQfh88/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAEnvkuh_kVYFae0n6zFWxjbp0jfQ)](https://youtu.be/VRrEquQfh88)

## Styles
네비게이션의 위치는 3가지 정도로 정리할 수 있습니다. 이번 작업은 최대한 간단한 내용을 빠르게 작업하는 것이 목적인 만큼, 2번으로 작업을 진행 하였습니다.
1. 화면 이동과 관계없이 고정된 형태
2. 화면 맨 위에 고정되어 있는 형태
3. 화면이 움직이면 숨고, 내리면 나타나는 형태

## Canvas Container
페이지 단위로 화면구성을 정의하기 위한 기본 틀로써 Canvas 를 먼저 정의 합니다. 담길 내용은 다음과 같습니다.
```typescript
export const Container = styled.div<{url:string}>`
  background: url(${props => props.url});
  background-size: cover;
  background-position: center;
`
```

## HTML Tags
```typescript
<Canvas>
  <nav>
    <a className="logo">Title</a>
    <div className={`navbar${isOpen ? "" : " hide-menu"}`}>
    <ul>
      <li><a></a></li>
      <li><a></a></li>
    </ul>
    <div className="main">
      <a className="user" href="/login">
        로그인
      </a>
      <div id="menu-icon">
        <svg>Hamberger Icon</svg>
      </div>
    </div>
  </nav>
</Canvas>
```

### Nav Items
`Flex-Box` 스타일 정의를 사용 하였습니다. 자식 태그에서도 동일한 내용으로 스타일이 정의 됩니다. 하지만 손자 까지는 해당 내용이 반영되지 않는 것으로 보입니다.

```css
nav {
  display: flex;
  flex-direction: row;
  width: 100vw;
  z-index: 1000;
  justify-content: space-between;
}
nav .navbar {
  display: flex;
  flex-direction: row;
}
nav .navbar a {
  margin: 0px 40px;
}
nav .main {
  display: flex;
  flex-direction: row;
}
nav .main .user {
  display: flex;
  flex-direction: row; 
  align-items: center;
}
nav #menu-icon {
  z-index: 10001;
  display: none;
}
```

## Responsive Style
스타일을 적용하는데 도움을 받은 유투브 Tutorial 입니다. 코딩 과정은 깔끔하지 않아서 수정할 부분이 많지만, CSS 만으로 Hamberger 를 구현하는 것과, 모바일에서 메뉴가 화면 전체를 활용하여 보여지는 부분 등의 스타일이 마음에 들어서 활용 하였습니다.

[![Minimal Responsive Navigation](https://i.ytimg.com/vi/BXArjoEmVa0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAxzyOnrrpYqyUI0v8RwDIUdxoQfw)](https://youtu.be/BXArjoEmVa0)

두번째 내용은 결과물을 몇가지 부족했지만, 작업내용의 설명 및 코딩과정이 깔끔해서 내용을 이해하는데 도움을 많이 받은 내용 입니다. 두번째 내용을 먼저 보신 뒤 위 첫번째 내용을 따라하면 수정할 부분과 보완할 부분이 잘 보일 수 있어서 도움을 많이 받은 내용 입니다.

[![Faire une Navbar Responsive en HTML & CSS](https://i.ytimg.com/vi/HQopEEurQYE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCjb4RXvZp6ioMBlBjEajxIqVhjRA)](https://youtu.be/HQopEEurQYE)

```css
@media (max-width: 980px) {
  #menu-icon {
    display: block;
  }
 .navbar {
   flex-direction: column;
   justify-content: flex-start;
   position: absolute;
   top: 0px;
   left: 0px;
   width: 100vw;
   height: 100vh;
   background: #000;
 }
 .navbar a {
   display: block;
   margin: 12px 0px;
   padding: 0px 25px;
 }
 .hide-menu {
   margin-left: -100%;
 }
```