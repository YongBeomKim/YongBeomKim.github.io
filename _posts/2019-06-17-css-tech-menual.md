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

내용의 이해를 돕는 동영상으로 추천할 내용들은 다음과 같습니다.

1. **[코딩하는 남자](https://www.youtube.com/channel/UCEV0Mv07slTliSXBlV-lG2w)**
2. **[생활코딩 CSS 2016](https://www.youtube.com/playlist?list=PLuHgQVnccGMDaVaBmkX0qfB45R_bYrV62)**
3. **[빔캠프 코딩가나다](https://www.youtube.com/playlist?list=PLMv8nY90ATZWQ5fbLJIdGB6ujWlUB37qa)**

<br/>
# 선택자

효과를 추가하기 위해선 대상을 특정할 수 있어야 합니다. 어떤 대상에게 효과를 주느냐에 따라 효과의 결과 및 대상과 적용범위등 모든것이 달라 집니다. 대상자 종류는 다음과 같습니다.

1. id, class, Tag 기본 선택자
2. **> :** 자식 선택자
3. **  :** 자손 선택자
4. **+ :** 인접 선택자
5. **~ :** 형제 선택자
6. **element[ attr ="값"] {} :** 속성 선택자
7. **:nth-child(), :hover, :target ::before ::after :** 다양한 가상 선택자

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

CSS3 부터 지원하는 **inline-block** 도 있지만, **IE 9** 이후만 지원해서 윈도우XP 는 사용이 어렵고, **inline 속성** 을 기본으로 갖고 있어서 폰트의 기본여백이 생기고, 이를 **font-size: 0;** 으로 강제로 줄여야 하는 등 작업이 필요합니다.

작업을 하면서 **부모** 인 **.container** 와 **개별 자식들** 인 **.item** 을 구분해서 작업을 합니다

## .container **부모 배열객체**

```css
.container {
  display: flex;
  flex-wrep: wrap;
  flex-direction: row | column-reverse;
  align-items: center;
  align-content: center; 
  justify-content: center | flex-end | flex-start; 
}
```

## .items **자식객체**

```css
.container {
  flex-basis: 300px;
  flex-grow: 1;
  flex-shrink: 1;
  order: 3;
}
```




<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/book/holigrail.gif">
</figure>


<figure class="align-center">
  <img src="http://c.incru.it/newjobpost/2019/05_mafra/mafra.jpg">
  <!--<img src="{{site.baseurl}}/assets/images/code/">-->
</figure>
