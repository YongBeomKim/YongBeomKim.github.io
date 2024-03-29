---
layout: blog
title: (도서) ⚝⚝⚝ 크레이티브 프로그래머
tags:
- book
---

맨 처음 이 책을 들었을때 드는 생각은, 코딩에 창의성이 필요한가? 하는 의문 이었습니다. 협업이 최 우선시 되는 작업에서 누군가의 창의성은 오히려 전체적인 작업효율에 방해가 되기 쉽고, 때문에 문서화와 클링코딩이 가장 중요한 덕목 중 하나로 생각하고 있습니다.

이 책에서 말하는 **<span style="color:orange">창의성</span>** 이란 **<span style="color:orange">현재 진행중인 작업 프로세스의 문제점을 파악하고 개선하는 법</span>** 입니다. 이 책이 전달하고 싶은 내용을 정리하면 다음과 같습니다.

**<span style="color:orange">개발자들이 경험하게 되는 문제점 사례들을 설명</span>** 하고 **<span style="color:orange">개선 방법에 대해 올바른 생각을 할 수 있는 각자의 창의력을 향상을 훈련하는 내용</span>**  입니다.

<figure class="align-center">
  <img width="350px" src="{{site.baseurl}}/assets/book/devdoc.jpg">
  <figcaption>Docs for Developers 기술 문서 작성 완벽 가이드</figcaption>
</figure>

가장 최근에 접했던 책 중 **[Docs for Developers 기술 문서 작성 완벽 가이드](https://www.hanbit.co.kr/store/books/look.php?p_code=B8810771470)** 와 연결되는 부분이 많은 것으로 생각이 들어 흥미가 생기기 시작했습니다. **Docs for Developers 기술 문서 작성 완벽 가이드** 는 문고판의 크기로 얇고 작어서 이동하는 시간 동안 보기에 좋았습니다. 때문에 보고나면 상대적으로 지면이 적어서 개발 프로세서를 단계별 압축하는 바람에 약간은 아쉬웠는데 이러한 허기를 채워 줄 수 있겠다는 기대가 들었습니다.

<br/>

# 1장 창의성을 위한 여정
앞에서 설명한 대로 이 책에서 말하고 싶은 `창의성` 의 개념을 셜명하는 내용 입니다.

# 2장 기술 지식
구체적으로 협업하는 사람의 성격을 **구조주의자 (기술과 방법을 연구하고 분석), 상황주의자 (사회적 맥락), 영감주의자 (자유로운 연상)** 로 나누고 있고, 각각의 구조주의자(2장), 상황주의자 (3장), 영감주의자 (4,5,6장) 에 대한 설명을 앞으로 진행할 예정임을 안내하는 것으로 시작합니다.

아마 본인에게 이 책이 잘 맞는지 확인하고 싶으신 분은 `2장` 만 읽어보시면 됩니다. 저에게는 취향저격이었는데 마치 **모듈의 개발문서** 를 읽는 느낌이 들도록 짜여 있습니다. 각각의 프로그램 모듈을 활용할 때 필요한 함수와 내부 파라미터에 대해, 각각의 개념부터 설명을 시작하는 과정이 있는데 자칫 가볍게 읽고싶은 분들에게는 머리가 약간 아프다고 느낄 수 있습니다. 이런 분들은 앞에서 언급했던 **Docs for Developers 기술 문서 작성 완벽 가이드** 를 보시면 좋을거 같습니다.

저는 구체적이고 상세한 개발 프로세스 내용에 대한 갈증을 느끼고 있어서, 이처럼 상세한 설명으로 시작하는 내용들이 좋았습니다. 마치 세미나로 해당 개발내용에 대해 실습을 경험한 뒤, 세부적인 내용에 대해 의문을 갖고서 해당 개발내용에 대한 공식문서를 찾아서 읽는 경험과 동일하다고 생각하시면 됩니다. <strike>노트필기 및 철학자 까지 거슬러 올라가며 설명을 할 정도로, 상세한 설명을 하고 싶다는 저자의 진심을 느낄 수 있었습니다</strike>

설명하는 방식도 `생산성 관리 개념인 GTD(Getting Things Done) 방법론에서 생각과 행동을 언급하는데, 이는 리팩토링과 코드작성을 번갈아 하는 것처럼 친숙하게 느껴질 것입니다 (P 64)` 와 같이 최대한 개발자들이 흥미를 갖고 읽을 수 있도록 많은 장치들을 해 놓았습니다. 때문에 이 책을 읽기 시작하신 분이라면 `2장`이 약간 어려워 보여도 책 전체의 2/3 (2~6장) 에 등장할 개념들의 설명 및 전체적인 내용의 압축으로 가득 차 있는만큼 그냥 넘기지 마시고 꼭 읽기를 추천 합니다.

# 3장 커뮤니케이션
**<span style="color:skyblue">LucasArt</span>** 개발팀 사례를 언급하며 내용이 진행됩니다. `원숭이섬의 비밀1,2` 와 같이 어드벤처 게임 명작을 만들어 냈음에도, CEO 인 `조지루카스` 가 회사업무에 흥미를 잃음으로써 회사 조직 방황을 하게 되었는데, 이후에도 `Dig, 플스로틀` 등의 명작을 계속 만들어 낼 수 있었던 원동력이 무엇인가를 연구하고 이를 실제 우리의 작업에 적용하는데 필요한 내용들을 담고 있습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="850px" src="{{site.baseurl}}/assets/book/monkey-island-01.jpg">
  <figcaption>원숭이섬의 비밀 1편, 이 게임은 뒤에서도 계속 언급된다</figcaption>
  </p>
</figure>

2장에서 이야기 한 것처럼, 3장 `상황주의자 (사회적 맥락)` 입장과 시선에서 **<span style="color:orange">현재 진행중인 작업 프로세스의 문제점을 파악하고 개선하는 법</span>** 을 이야기 하고 있는습니다. 구체적인 사례들이 많이 나오는데, 2장과 마찬가지로 여러가지 사례와 그에대한 설명으로 가득 차 있습니다.

# 4장 제약조건
`영감주의자 (자유로운 연상)` 개발자를 위한 **<span style="color:orange">현재 진행중인 작업 프로세스의 문제점을 파악하고 개선하는 법</span>** 입니다. 앞에서 언급했던 **<span style="color:skyblue">LucasArt</span>** 와 **iD 소프트** 고전 명작인 **Doom** 그리고, **게임보이** 와 같은 기기들을 언급하며 **구체적인 Game 개발 과정** 을 사례로 이야기를 하고 있습니다. 30대 후반, 40대 독자들이라면 과거 게임을 즐겼던 경험을 살리면서 흥미진진하게 읽어 나아갈 수 있는 챕터 였습니다.

# 5장 비판적 사고 ~ 9장 창의성에 대한 마지막 생각
4장이 **안정적인 조직운영** 에 관련된 내용이었다면, 5장 부터는 **문제가 발생했을때 원인을 찾고 창의성으로 이를 단계별 생각해 보게 만드는 내용 이었습니다. 

<br/>

# 총평
이 책의 장점은 **<span style="color:orange">개발자들이 경험하게 되는 문제점 사례들을 설명</span>** 하고 **<span style="color:orange">개선 방법에 대해 올바른 생각을 할 수 있는 각자의 창의력을 향상 시켜주는</span>** 주는데 집중하고 있습니다. 훌륭한 업적을 이룬 위인이 `저 이렇게 잘났어요, 운이 좋았어요` 를 가르쳐 들지않고, 최대한 독자들이 각각의 예시로 든 경험에 대해 몰입을 하고 해결방법을 찾는데 필요한 창의력을 기르는 내용이라서 제목이 **<span style="color:orange">크리에이티브 프로그래머</span>** 였습니다. 

책에 들어있는 내용의 비중이 모두 커서 한꺼번에 소화 하기엔 어려움이 있긴 하지만, 각 장마다 맨 뒤에 **요약** 정리된 내용을 빠르게 읽어보는 것만으로도 도움이 되실 것입니다. 현재 팀으로 개발작업을 진행하는 모든 개발자 분들에게 추천하는 것으로 마무리 하겠습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="550px" src="{{site.baseurl}}/assets/book/creative.jpg">
  <figcaption>크리에이티브 프로그래머</figcaption>
  </p>
</figure>

<br/>

※ 본 리뷰는 IT 현업개발자가, 한빛미디어 책을 제공받아 작성한 서평입니다.