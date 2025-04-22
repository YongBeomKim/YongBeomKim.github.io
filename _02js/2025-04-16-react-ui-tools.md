---
layout: blog
title: React 19, Tailwind 4 & Vite.js
tags:
- react
---

React.js 의 TailwindCSS 가 v4 로 업데이트 되면서, 컴포넌트 객체를 활용하기 쉽게 도와주는 도구들이 많이 있습니다.

## [Shadcn/UI](https://github.com/shadcn-ui/ui)
덩치가 상대적으로 크지만 [Radix-ui](https://github.com/radix-ui/primitives) 를 활용하여 tailwindCSS 컴포넌트를 사용자가 조작하기 용이하도록 하다는 장점때문에 많은 분들이 추천하고 있습니다. **[react & Shadcn/UI 설치 스크립트]({{site.baseurl}}/assets/download/react.sh)** 를 우분투 터미널에서 실행하면 설명 및 관련내용을 자동으로 설치해 주는 예제 스크립트 입니다.

## [daisy/UI](https://github.com/saadeghi/daisyui)
별도의 Javascript 등의 추가작업은 어렵지만, 쉽고 단순한 내용의 스타일을 빠르게 적용하는데 적합하다고 합니다.

기타 Shadcn, mantine, mui는 어떤 것을 사용하든 상관없다고 합니다. [Raddit/2025](https://www.reddit.com/r/reactjs/comments/1gpaj3b/daisy_ui_vs_shadcn_ui_which_one_to_choose_in_2025/)의 토론내용을 살펴보면 몇몇 분들은 [Mantine](https://github.com/mantinedev/mantine) 을 사용하고 너무 평범해 보이지 않도록 스타일을 조금 바꾸는 것을 추천합니다.

또는 간편하고 문서작성이 잘 되어 있어서 빠르게 적용 가능한 [Bulma](https://github.com/jgthms/bulma) 등이 있습니다.

<br/>

# 마무리
궁극적으로는 [Radix-ui](https://github.com/radix-ui/primitives) 을 기반으로 커뮤니티가 활성화 되어있는 [Shadcn/UI](https://github.com/shadcn-ui/ui) 를 활용하는 방향으로 작업하는 것이 적절하다고 생각 합니다.
