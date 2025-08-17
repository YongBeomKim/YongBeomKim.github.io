---
layout: blog
title: (도서) ⚝⚝⚝⚝ 소플의 처음 만난 Next.js - 한빛미디어 
tags:
- book
---

**<span style="color:orange">IT 현업개발자가, 별도의 광고료 없이 한빛미디어의 책만 제공받아서 작성한 서평입니다.</span>**


현재 **<span style="color:gray">vite.js + React.js with Typescript</span>** 환경에서 프론트 엔드 작업을 하고 있습니다. 작업을 계속 할 수록 최적화에 대하여 관심이 생기고, 부가적으로 설치 및 관리해야 할 `react-router-dom, axios, tailwind-css react-cookie` 등의 부가 패키지에 대하여 `버젼관리 및 함수의 API의 수정` 등 신경써야할 내용들이 점차 늘어나게 되었습니다. 때문에 이와같은 부가기능들을 함께 묶어서 하나의 통합 패키지인 **<span style="color:orange">Next.js</span>** 에 대하여 궁금증이 생겼습니다.

**<span style="color:gray">React.js</span>** 관련 도서를 보면, **<span style="color:orange">Next.js</span>** 와 관련된 내용은 책의 맨 뒷부분에서 간략하게 다루고 있어서 빠르게 넘기는 경우가 대부분 이었습니다. 이 책을 리뷰하면서 **<span style="color:orange">Next.js</span>** 와 관련하여 전체적으로 살펴볼 수 있는 좋은 기회였습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="450px" src="{{site.baseurl}}/assets/book/first-met-nextjs.jpg">
  </p>
</figure>

<br/>

# 총평
**<span style="color:gray">React.js with Typescript</span>** 를 활용하여 `사용자 로그인, 쿠키관리, API연동` 등을 구현하여 간단한 블로그 또는 게시판 작업을 진행했던 경험이 있어서 그런지, 전체적인 내용의 설명은 쉽고 빠르게 이해할 수 있었습니다. 설명하려는 내용을 이해하고 있으니 **<span style="color:orange">Next.js</span>** 환경에서는 어떻게 코드내용을 작성하고 구현되는지는 쉽게 이해할 수 있었습니다.

<br/>

# 내용 살펴보기
프로젝트 경험이 적은 초보자 분들이라면 `작업폴더 분류 및, 파일 구분`에서 어려움을 격는 경우가 많습니다. 라우터 경로에 따라 작업에 따른 파일관리에 대하여 초보자도 바로 따라할 수 있을 정도로 그림으로 설명을 제공하고 있습니다.
<figure class="align-center">
  <p style="text-align: center">
  <img width="530px" src="{{site.baseurl}}/assets/js/next-js-router-01.jpg">
  </p>
</figure>

<figure class="align-center">
  <p style="text-align: center">
  <img width="530px" src="{{site.baseurl}}/assets/js/next-js-router-02.jpg">
  </p>
</figure>

앞의 Router 경로에 따른 폴더 및 파일구성에 대한 설명과 함께, 각각의 Router 경로에 따른 내용들이 화면구성에서 어디에 해당되는지, 그리고 외부에서 작업한 파일 내용을 화면구성에서 끌어오는 내용이 어느 부분이고, 출처가 어디인지도 직관적으로 이해할 수 있도록 단계적으로 설명을 하고 있습니다. 

<figure class="align-center">
  <p style="text-align: center">
  <img width="530px" src="{{site.baseurl}}/assets/js/next-js-router-dom-01.jpg">
  </p>
</figure>

<figure class="align-center">
  <p style="text-align: center">
  <img width="530px" src="{{site.baseurl}}/assets/js/next-js-router-dom-02.jpg">
  </p>
</figure>

개념의 설명도 초보자 눈높이에 맞춰서 `...` 를 설명할 때 `전개 연산자(Spread Operator)` 라는 본래의 개념을 설명함으로써 자칫 어려워 할 수 있는 내용에 대해서는, 기능적인 부분에 집중하여 설명을 진행하고 있었습니다. 이 부분은 호불호가 나뉠수 있겠지만, 별도의 책에서 쉽게 보완 가능한 내용인만큼, 이 책에서는 진도를 빠르게 진행하는데는 도움이 되어줄 것으로 생각 됩니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="530px" src="{{site.baseurl}}/assets/js/next-js-segment.jpg">
  </p>
</figure>

<br/>

# 추후 보완했으면 하는 내용
위에서 살펴본 것처럼 설명하려는 구성요소에 대하여 시각적으로 잘 전달을 하고 있어서 그런지, 상대적으로 작업중인 `vs code` 화면이 중반이후 실습내용이 많아질수록 지면을 차지하는 분량이 많아집니다. PDF 전자책은 잘 모르겠지만 일반책에서는 `vs code` 내용이 작업내용을 전체적으로 잘 보여준다는 취지는 알겠지만, 가독성이 낮아서 탁탁 막힌다는 느낌이 들었습니다. 다음번에는 `Light` 밝은화면 모드로 진행하거나, 또는 `vscode` 전체를 보여주지 않고, 저자의 취지인 `프로젝트 폴더 및 파일구성` 내용 부분만 잘라서 순서대로 가로로 나열하고, 바로 밑에 설명을 순서에 따른 번호와 함께 설명을 한다면 페이지 분량도 많이 줄일 수 있고, 앞부분의 시원시원한 가독성에도 일관되게 독자들에게 전달함으로써 보다 수월하게 내용을 이해하는데 도움이 되지 않을까 싶습니다.   
<figure class="align-center">
  <p style="text-align: center">
  <img width="530px" src="{{site.baseurl}}/assets/js/next-js-vscode-01.jpg">
  </p>
</figure>

<br/>

# 마무리
전체적인 내용을 다루고는 있지만, 깊이있는 내용까지 전달하기 보다는 전반적인 프로젝트를 진행하기에 필요로 하는 기본개념들을 충실하게 담고 있는 책입니다. 개인적으로는 [Next.js on Vercel](https://vercel.com/frameworks/nextjs) 을 활용한 배포 및 `Vercel`과 관련하여 종속적인 내용은 어떤것이 있는지가 조금 궁금했었고 개정판에서는 이 부분도 함께 다뤄주시면 좋겠다는 생각을 했습니다. 

완전한 Open-Source 생태계를 구축한 `React.js`와 비교해서는, 상대적으로 통합관리를 하고있는 [Next.js on Vercel](https://vercel.com/frameworks/nextjs) 에서, 나중에는 개발자들에게 뒤통수를 치지 않을까 걱정하는 시선들도 있기는 하지만, 아직까지는 개발자 친화적인 `오픈소스`로써 우려보다는 기대가 많은 만큼 이 책을 통해서 작업에 필요한 기본적인 내용들을 구현하는데에는 많은 도움이 되어 줄 것 으로 생각 됩니다.