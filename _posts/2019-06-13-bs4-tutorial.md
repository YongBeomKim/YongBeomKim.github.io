---
title : Bootstrap 4 Tutorials
last_modified_at: 2019-06-13T12:45:06-05:00
header:
  overlay_image: /assets/images/book/bootstrap.png
categories:
  - css
tags: 
    - css
    - bootstrap
toc: true    
---

지금 출간된 도서들이 **Bootstrap 3** 내용을 설명하는 부분이 많습니다. **Bootstrap 4** 가 출시된 지도 오래되었고 이부분으로 적용하는 부분도 많아서 이러한 차이점을 비교해 보도록 하겠습니다.


**부트스트랩 3.2** 버전은 **IE8** 을 지원하는 최종버전이고, **부트스트랩 3.3** 부터는 **IE9/IE10** 이상을 지원 합니다. **부트스트랩 4** 는 **IE10/IE11** 이상부터 지원을 해서 국내 오래된 시스템의 IE 사용자는 포기하는 한계가 있습니다. 이러한 점에 주의하며 작업 대상을 특정 합니다.

간단한 목차를 살펴보면 **CSS 스타일, 부트스트랩 지원 컴포넌트, 부트스트랩 JavaScript** 3개의 파트로 구분이 가능합니다

<br/>
# bs4 Component

## Image Style

[BS3 vs BS4](https://www.quackit.com/bootstrap/bootstrap_4/tutorial/bootstrap_images.cfm) 정리사이트로 여기를 추천하는 내용이 많았습니다. BS3 관련 내용들을 학습하면서 분류등 내용을 익히고, 자세한 소스는 위와 같은 비교정리 사이트를 참고 합니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/book/bootstrap.jpg">
</figure>

<br/>
## Badge

텍스트 내용 중 **특정 Badge** 로 표시되는 표식 및 숫자로 표시를 표현하는 기능 입니다. **bs3** 에선 **Label** 로 이름을 사용하였는데, **bs4** 에서는 **[Badge](https://getbootstrap.com/docs/4.3/components/badge/)** 로 이름이 변경 되었습니다. 

<br/>
# bs4 JavaScript 

여기서 지원하는 기능들은 대부분 **Jquery** 모듈을 추가로 필요합니다. 대표적인 효과들을 언급하면 다음과 같습니다.

1. Transaction
2. Modal Window
3. Drop Down Menu
4. Scroll Spy (Bookmark Tag)
5. Tab
6. ToolTip
7. Pop Over
8. Warning
9. Collapse : 아코디언 효과
10. Carousel : 반응형 슬라이드 효과
11. Affix
12. Parallax : 시간차 슬라이드 효과