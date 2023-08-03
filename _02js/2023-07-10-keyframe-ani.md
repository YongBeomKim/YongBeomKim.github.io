---
layout: blog
title: CSS Animation, KeyFrame & Tailwind
tags:
- CSS
---

사용자 맞춤형  특화적인 기능을 활용하는 방법이 있는데 `animation` 과 `keyframe` 을 사용하는 방법이 있습니다.

<br/>

# CSS Animation
기본적인 CSS 속성 내용에 대해 알아보겠습니다.

## Key Frame
`@keyframes` 은 애니메이션의 **프레임 단위 스타일** 을 정의 합니다.

애니메이션 단계를 정의하는 방법은 2가지가 있는데 `from ~ to` 의 **2단계** 로 설정하는 방법과, `0%, 25%, 100%` 등을 활용하여 각각의 **진행단계**로 설정하는 방법이 있습니다. 각 단계별 내용은 **CSS** 기본 문법을 활용합니다.

```css
@keyframes effect_name {
  from {top: 0px;}
  to {top: 200px;}
}
@keyframes effect_name {
  0% {top: 0px;}
  100% {top: 200px;}
}
```

## Animation
`@keyframes` 에서 프레임 단위의 애니메이션 스타일을 정의 했다면, `animation` 은 HTML 객체에 `@keyframes` 을 연결하고 전체적인 속성값을 정의 합니다.

| **속성**                  | 	**설명**	 | **속성 값* *     |
|:------------------------:|:-----------:|:---------------:|
|animation-name            |키프레임 이름   |                 |
|animation-duration        |재생시간       |0, 3s, 300ms     |
|animation-timing-function |진행 가속도    |linear,ease,steps |
|                          |	           |cubic-bezier(,,,) |
|animation-delay           |시작 지연시간   | 3s (3초 후 시작)  |
|animation-direction 	     |재생방향       |normal,reverse   |
|animation-iteration-count |반복횟수       |infinite: 무한반복 |
|animation-fill-mode 	     |시작 전,후 적용 |                 |
|animation-play-state 	   |초기상태       |paused: 중지유지   |

이처럼 많은 속성값을 각각 입력하는 방법도 있지만 간단하게 1줄에 입력 할 수 있습니다. 아래 내용은 첫번째 내용과 두번째 내용이 같은 내용을 담고 있습니다.

```CSS
{
  animation: rotate 2s infinite ease;
}
{
  animation-name: rotate;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
}
```

<br/>

# Tailwind CSS Animation
[tailwind Animation](https://tailwindcss.com/docs/animation) 에서 제공하는 효과들 사용 수 있습니다. 


```jsx
import {keyframes, css} from 'styled-components'

const boxFade = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`
const Fade = css`
  animation: ${boxFade} 1s linear infinite;
`
const App = () => {
  const [button, setButton] = useState(false)
  return(
    <div className={`w-full flex ${button ? Fade : ''}`}>
      Message Box
    </div>
  )
}
```


|Class        | Properties                       |
|:-----------:|:--------------------------------:|
|animate-none |animation: none                   |
|animate-spin |animation: spin 1s linear infinite|
|animate-ping |animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite|
|animate-pulse|animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite|
|animate-bounce|	animation: bounce 1s infinite  |

링크에 포함된 공식문서 내용을 보면 `Properties` 내용에는 각각 `animation_name` 을 지정하고 해당내용에 포함될 `@KeyFrame` 내용들이 추가 되어 있습니다. 이 내용을 참고하면 개별 컴포넌트에 사용자가 정의한 속성값을 생성하고 html 태그에 적용에 활용할 수 있습니다.

```css
animation: bounce 1s infinite;

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
```



@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
animate-ping	animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;



Animation 과 KeyFrame 에 대해 설명하는 동영상 중 가장 잘 설명하는 내용을 칭크를 붙

<iframe 
  width="560" height="315" 
  src="https://www.youtube.com/embed/DoSDYJKCSg4" 
  title="YouTube video player" frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen
>
</iframe>

<br/>

# Animation
CSS 에서 활용하는 `키프레임 애니메이션` 에 대해서 알아보도록 하겠습니다. 먼저 애니메니션 효과 내용을 정의한 `KeyFrame` 객체를 생성합니다. 이렇게 생성한 `KeyFrame` 객체를 HTML 태그객체에 `animation` 속성을 활용하여 연결하면 됩니다.

## Animation
`animation` 속성

## Animation & KeyFrame


```css
animation: spin 1s linear infinite;

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```


<br/>

# 참고사이트
- [CSS animation + @keyframes 사용법](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=wnsrhkqja&logNo=221411967642)
- [w3 school - How To Alerts](https://www.w3schools.com/howto/howto_js_alert.asp)
- [Tailwind CSS 애니메이션 사용법, 커스터마이징](https://onlydev.tistory.com/141)
