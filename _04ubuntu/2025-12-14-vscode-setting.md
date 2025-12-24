---
layout: blog
title: vscode 에서 폰트사이즈 
tags:
- vscode
---

`vscode Extension` 을 여럿 설치하다 보면 기본 사이즈 설정으로는 불편한 상황이 발생합니다. 

Extension 갯수가 많아도 한 눈에 보고 싶고, Menu Header 의  Editor 그리고 terminal 의 폰트 사이즈도 따로 설정했으면 좋겠다는 생각이 들었습니다.

이처럼 각각의 개별 단위로 폰트 사이즈를 다르게 적용해 보려고 한다.  

<figure class="align-center">
  <p style="text-align: center">
  <img width="820px" src="{{site.baseurl}}/assets/linux/vscode_setting.png">
  </p>
  <figcaption></figcaption>
</figure>

설정내용을 `Json` 으로 아래와 같이 입력하고 저장하면 바로 적용 가능합니다.

```json
{
  // UI (사이드바, 메뉴, 탭 등)
  "window.zoomLevel": 0,

  // 코드 에디터 글자 크기
  "editor.fontSize": 15,

  // 에디터 줄 높이 (가독성 ↑)
  "editor.lineHeight": 22,

  // 내장 터미널
  "terminal.integrated.fontSize": 14,

  // Debug Console
  "debug.console.fontSize": 14
}
```
