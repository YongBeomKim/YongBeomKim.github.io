---
title : css Flexible Box
last_modified_at: 2018-05-25T12:45:06-05:00
header:
  overlay_image: /assets/images/book/css.jpg
categories:
  - css
tags: 
    - css
    - flexible
toc: true    
---

# Flexible Box

[sk플래닛 블로그]( https://readme.skplanet.com/?p=13710)<br>
[MSDN 기술노트](https://msdn.microsoft.com/ko-kr/library/bg124109)

<figure class="align-center">
  <img src="http://www.onextrapixel.com/wp-content/uploads/2013/04/flexbox-elements.jpg" alt="">
  <figcaption>donut-example</figcaption>
</figure>

보통 flexbox로 불리는 Flexible Box 모듈은, 1차원적인 레이아웃 모델 인터페이스와 강력한 정렬 기능을 통해 항목 간 공간 배분을 제공할 수 있는 방법으로 설계되었습니다. 

이전까지는 **.block .inline** 또는 **속성값 None** 으로만 정리를 했다면, 이제부터는 평면은 Flexible Layout Box 그리고 CSS GRID 를 한번 정리해 보고자 한다


<br> 

## Flexible Box 기본개념

배치 시작점과 끝점을 정하고, 객체배열의 **주축**과 **교차축**을 정의하면 아이템 배치를 자유자재로 설정가능하다


### display:flexbox

Flexible Box 활성화

```css
{
    display:-webkit-flex;
    display:flex;
}
```

**-webkit-flex** flexible box 는 아직 W3C 확정단계가 아니여서 브라우저 접두사를 추가해야 한다



### flex-direction:row

```css
{
    display:flex;
    flex-direction:row;
}
```

<figure class="align-center">
  <img src="http://blog.teamtreehouse.com/wp-content/uploads/2012/12/flexbox-flex-direction.png" alt="">
  <figcaption>donut-example</figcaption>
</figure>

|  속성값        |   flex-direction 설명      |
|---------------:|---------------------------:|
| row            | 박스를 왼쪽에서 배치시작   |
| row-reverse    | 박스를 오른쪽에서 배치시작 |
| column         | 박스를 위에서 배치시작     |
| column-reverse | 박스를 아래부터 배치시작   |



### Flexible Box 여러줄로 배치

`flex-wrap` : 위의 개별박스를 여러줄로 배치


```css
{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
```

<figure class="align-center">
  <img src="https://image.slidesharecdn.com/putting-flexbox-into-practiceblend-conf130907-130908160522-/95/putting-flexbox-into-practice-19-638.jpg" alt="">
  <figcaption>donut-example</figcaption>
</figure>

|  속성값        |   flex-wrap 설명            |
|---------------:|----------------------------:|
| nowrap         | 박스를 한줄로 배치(기본)    |
| wrap           | 박스를 여러줄로 배치 (예제) |
| wrap-reverse   | 박스 여러줄 역방향 배치     |



### Flexible Box 다중설정

위의 2개 설정값을 한꺼번에 설정하는 옵션설정

`flex-flow` : flex-direction설정  flex-wrap설정

<figure class="align-center">
  <img src="http://readme.skplanet.com/wp-content/uploads/css-flex-flow.gif" alt="">
  <figcaption>donut-example</figcaption>
</figure>

```css
{
    display: flex;
    flex-flow: row wrap-reverse;
}
```



### justify-content

주축방향으로 다양한 플렉스 아이템 배치하기

```css
{
  display: flex;
  justify-content: space-around;
}
```

<figure class="align-center">
  <img src="http://codefor.life/images/flexbox-justify-content.png" alt="">
  <figcaption>donut-example</figcaption>
</figure>

| 속성값      | justify-content               |
|------------:|------------------------------:|
| flex-start  | 부모 주축 왼쪽부터 배치(기본) |
| flex-end    | 부모 주축 오른쪽부터 배치     |
| center      | 부모 주출 중앙부터 배치       |
| space-between | 양 끝에 일치후 동일간격 배치 |
| space-around | 양 끝에도 공간두고 간격배치  |


### align-items

교차축 방향으로 flex item 배치

```css
{
  display:flex;
  align-items:center;}
```

<figure class="align-center">
  <img src="http://w3.unpocodetodo.info/css3/images/flex-align-items.gif" alt="">
  <figcaption></figcaption>
</figure>

| 속성값      | align-items                     |
|------------:|--------------------------------:|
| stretch     | 박스를 height-fit 늘린다(기본)  |
| flex-start  | 박스를 교차 시작점 배치시작     |
| flex-end    | 박스를 교차 끝점 배치시작       |
| center      | 박스를 교차점 중앙 배치시작     |
| baseline    | 



<br>

## Navigation Bar 스타일 적용하기

[navbar 기본 스타일](http://zzznara2.tistory.com/562)

[navbar customiz](http://twitterbootstrap.org/bootstrap-navbar-background-color-transparent/)

[navbar style](https://getbootstrap.com/docs/3.3/examples/navbar-fixed-top/)


[navbar color style](http://humy2833.dothome.co.kr/customizing.html)





**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}   