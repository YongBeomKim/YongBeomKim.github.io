---
title : CSS 작업용 정리
last_modified_at: 2019-06-17T12:45:06-05:00
header:
  overlay_image: /assets/images/book/responsive-nav.png
categories:
  - css
tags: 
    - css
    - menu
    - response
toc: true    
---

앞에서 CSS 와 관련된 내용들을 정리하긴 했었지만, 수업의 내용을 수동적으로 나열한 결과 작업을 진행하면서 수정이 필요한 부분이 어디인지를 알기가 어려운 한계가 있습니다. 이를 보완하기 위해 작업 부분별로 내용을 정리해 보도록 하겠습니다.

CSS 관련 내용을 잘 정리한 곳으로 **[w3schools.com](https://www.w3schools.com/cssref/)** 내용을 참고하면 좋습니다. 그리고 CSS 관련 이해를 돕는 동영상으로 추천할 내용은 다음과 같습니다.

1. **[코딩하는 남자](https://www.youtube.com/channel/UCEV0Mv07slTliSXBlV-lG2w)**
2. **[생활코딩 CSS 2016](https://www.youtube.com/playlist?list=PLuHgQVnccGMDaVaBmkX0qfB45R_bYrV62)**
3. **[빔캠프 코딩가나다](https://www.youtube.com/playlist?list=PLMv8nY90ATZWQ5fbLJIdGB6ujWlUB37qa)**

<br/>
# 선택자

효과를 추가하기 위해선 대상을 특정할 수 있어야 합니다. 어떤 대상에게 효과를 주느냐에 따라 효과의 결과 및 대상과 적용범위등 모든것이 달라 집니다. 대상자 종류는 다음과 같습니다.

1. id, class, Tag 기본 선택자
2. **> :** 자식 선택자 (1가족까지)
3.   **:** 자손 선택자 (후손까지)
4. **+ :** 인접 선택자 (동등가족)
5. **~ :** 형제 선택자 (동등가족 첫번째 객체)
6. **element[ attr ="값"] {} :** 속성 선택자
7. **:nth-child(), :checked, :text, :hover, :target ::before ::after :** 다양한 가상 선택자

**:checked** 는 상태에 관한 선택자, **:text** 는 Form 과 관련된 선택자등 다양한 가상선택자를 활용하면 보다 다양한 기능을 구현할 수 있습니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/15P163Q724I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>

## 기본 선택자

`#id .class tag { }` 와 같이 대상의 조건을 나열하여 대상을 특정 합니다.

## 자식 선택자

`div > li { }` 는 `<div>` **부모와 바로 연결된 1촌 자식인** `<li>` 까지만 특정 됩니다.

## 자손 선택자

`div li { }` 는 `<div> <li>` 이후로도 연결된 **모든 자손들** 을 특정 합니다.

## 인접 선택자

`input + label { }` 와 같이 **같은 부모들** 이지만 **인접한 태그들을** 특정합니다. **input 태그** 와 **연관된 label** 이 그 예로써, 메뉴효과 등 다양한 작업에 널리 활용 됩니다.

## 형제 선택자

`h3 ~ p { }` 와 같이 **같은 부모들** 이고 **인접한 태그들** 중 **처음으로 조건을 충족하는 1개의 객체만 특정** 하는 방식 입니다. 위 **인접하는 부모들** 중 바로 붙어있는 1개를 형제사이와 동일하게 취급 합니다.

## 속성 선택자

`div[class="home"] {}` 내에 대해서는, **lxml** 에서 객체특정 문법과 상당히 유사한 내용으로 이해하면 됩니다. 약간식 차이는 `class="home"` 에서 특정하는 방식으로 **정규식의 문법을 활용** 하며 다음과 같습니다.

1. `class = "home"` **등가** 규칙
2. `href ^= "https://"` **시작값** 규칙
3. `href $= ".pdf"` **종료값** 규칙
4. `href *= "naver"` **일부 포함값** 규칙

## 가상 선택자

**:hover  :target  :checked  :active  :visited  :link  ::before  ::after** 등과 같이 **Tag 별 지원하는 이벤트 효과 전/후** 를 특정하는 방법이 있습니다.

**:first-child :last-child :nth-child(2n)** 와 같이 **동일한 조건의 다수의 (List) 객체들** 중 **특정한 하나 또는 여럿** 을 특정하는 선택자가 있습니다. 예제중 `2n` 은 다른 정수로 바꿔서 적용 가능 합니다.

<br/>
# flex

객체를 정렬하는 방법으로 **1줄에 동등한 위치 객체들을 함께 나열하는 inline** 방식과 **객체별 줄바꿈을 실행하는 block** 방식이 있습니다.

**inline-block** 도 있지만, **IE 9** 이후 버젼만 지원해서 윈도우XP 는 사용이 어렵고, **inline 속성** 이  기본으로 포함되어 기본여백 등이 생기고, **font-size: 0;** 등 강제로 여백을 줄이는 작업이 필요합니다.

## .container **부모 배열객체**

아래의 속성에 따라 **.items** 이 재배치 됩니다. 즉 **.container** 자신이 아닌 내부 **.items** 이 재배치 됩니다.

```css
.container {
     display: flex|inline|block|inline-block;
     /* flex-wrap : 아이템이 100% 넘을 때 정렬방법 */
     flex-wrap: wrap|wrap-reverse|nowrap|initial|inherit;
     /* flex-direction : .items 배열방향 기준 */
     flex-direction: row|row-reverse|column|column-reverse|initial|inherit;
     /* align-items : .items 수평정렬로 위아래는 늘리지 않습니다 */
     align-items: center|stretch|flex-start|flex-end|baseline|initial|inherit;
     /* align-content : .items 각 줄단위 정렬 입니다 */
     align-content: center|stretch|flex-start|flex-end|space-between|space-around|initial|inherit; 
     /* justify-content : .items 의 수평정렬로 위아래 꽉 채웁니다 */
     justify-content: center|flex-start|flex-end|space-between|space-around|initial|inherit; 
}
```

## .items **자식객체**

**.container** 에서 정의된 배치규칙에 따라 개별 item 에 따라 default 값이 지정 됩니다. 아래의 설정 방법으로 사용자가 개별 item 내용을 변경 가능합니다.

```css
.items:nth-child(2n) {
  order: 3;       /* 배치 순서를 지정 */
  flex-grow: 1;   /* 확장시(grow) 여백비율 n */
  flex-shrink: 1; /* 축소시(shrink) 고통분담 비율 n */
  flex-basis: 300px; /* 객체의 기본 값 */

  /* 위 내용을 1줄로 처리 */
  /* flex: flex-grow, flex-shrink, flex-basis;*/
  flex: 1 0 300px;
}
```

## content : 개별 객체들

위에서는 **flex 배치 기준** 과 **개별 객체의 flex 값** 의 설정방법을 알아 보았습니다. 부모와 자식 객체간 설정방법과 내용이 다름에 주의를 해야 되는 내용들 이었지만, 이번에 설명할 내용을 개별 아이템별 설정 가능한 내용 입니다.

```css
div {
  color: 색 |inherit |currentColor;
  float: none |left |right |initial |inherit;
  display: block |inline |inline-block;
  overflow: hidden |visible |scroll |auto |initial |inherit;
  border-radious: 10px;
  vertical-align: length|top|middle|bottom|baseline|sub|super|text-top|text-bottom|initial|inherit;

  margin: top 간격값| auto(기본 설정값)| bottom 간격값;
  margin-left: length |auto |initial |inherit;
  padding: top 간격값| auto(기본 설정값)| bottom 간격값;
}
```

## font 설정

폰트에서 객체는 **content** 로 **line-height** 는 **개별 font 에서 초기값으로 설정되는 내용** 입니다. **이들의 여백을 관리하는 방법은 개별 폰트의 설정을 바꿀수는 없기 때문에** 이와 적합한 방법을 사용자가 임의로 다양한 값을 입력하며 여백을 줄이는 방법을 활용합니다.

개별 값을 **px** 로 정의를 하면 유지보수가 어렵기 때문에, 폰트관련 내용은 **em** 단위를 사용하여 작업을 진행합니다.

```css
a {
  font-size: 30px;
  line-height: 1.4em| normal| initial| inherit;
  margin-top: 0.8em;
}
```

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/book/holigrail.gif">
</figure>