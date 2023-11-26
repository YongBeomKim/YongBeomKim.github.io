---
layout: blog
title: (도서) ⚝⚝⚝ 데이터 드리븐 리포트
tags:
- book
---

전체적인 느낌은 `실제 파이썬을 활용한 데이터 분석 내용을 꾹꾹 눌러 담았다.` 였습니다.

<br/>

# 총평
## 도서관련 전체적인 감상

시중에 나온 일반적인 `파이썬 데이터분석` 도서들은 `파이선 기초 2/5`, `Pandas Numpy 2/3` 그리고 `시각화를 위한 Matplotlib 1/3` 로 구성되어 있습니다. 이러한 초보자를 대상으로 하는 책들은 파이썬을 활용한 기본적인 분석 까지만 가능하고 실무에 적용하기 까지는 비어있는 부분이 많은 것 또한 사실 입니다.

이 책은 실제 실무에 적용하는 분석방법을 차례로 알려주고 있는 책이었습니다. 대략 400 페이지 속에서 `파이썬 문법 (특히 Pandas) 및 통계적인 지식` 을 기초로 실무분석 내용까지 함께 다루고 있습니다. 이 책을 적극 추천하는 분은 초보자 대상의 `파이썬을 활용한 데이터분석` 관련 강의를 한번 이해하신 분들 중, `통계적인 분석` 과 관련하여 기본적인 내용들을 접하신 뒤에 이 책을 진행하신다면 많은 부분은 챙겨가실 수 있었습니다.

이는 이 책을 진행하다가 `코딩 부분이 어려우신 분` 들이라면, `파이썬 데이터 분석` 관련 얇은책 하나를 보고나서 진행하신다면 많은 도움이 될 것이고, 혹은 `통계적인 분석 부분이 이해가 어려운 분` 들이라면 `통계적 기초` 관련 얇은책을 읽은 뒤 나머지 내용들을 진행한다면 많은 도움이 될 것입니다.

## Pandas-Profiling (ydata-profiling)
이 책의 가장 큰 장점은 **<span style="color:orange">Chat GPT</span>** 그리고 **<span style="color:orange">ydata-profiling (Pandas-Profiling)</span>** 모듈을 활용하여 **<span style="color:orange">도메인 지식 (domain knowledge : 정의역 지식, 분야 지식은 특정한 전문화된 학문이나 분야의 지식)</span>** 을 빠르게 파악하는 능력까지 독자들에게 전달해 주는 부분이 가장 유익한 부분이었습니다.

위에서 언급한 것처럼 일반적인 통계적 분석 너머까지 이해하기 위해서는 분석비용이 많이 드는데, 이처럼 **<span style="color:orange">ChatGPT</span>** 의 무료기능과 **<span style="color:orange">파이썬 오픈소스</span>** 를 활용하여 **<span style="color:orange">전문적인 데이터 분석 리포트</span>** 를 무료로 독자들이 직접 작성할 수 있도록 해주는 부분이 이 책의 가장 큰 장점 입니다. 이 부분만 이해하신다면 이 책의 값어치 그 이상을 가져가실 수 있을 것입니다.

**[Pandas-Profiling](https://wikidocs.net/47193)** 모듈은 올해 23년 6월 이후로 **[ydata-profiling](https://github.com/ydataai/ydata-profiling)** 으로 변경이 되었습니다. 이유는 대규모 데이터를 핸들링하는 [Apache Spark](https://spark.apache.org/) 를 함께 지원하면서 모듈이 합쳐지게 되었습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="400px" src="{{site.baseurl}}/assets/book/ydata-profile.png">
  <figcaption>ydata profile 분석내용</figcaption>
  </p>
</figure>

<br/>

# 도서 둘러보기

## 1장 데이터 드리븐 보고
이 부분은 인문학적인 내용을 다루는 부분으로, **<span style="color:orange">데이터 중심의 의사결정</span>** 의 개념 및 필요한 사전지식들을 다루고 있습니다. 저자가 **<span style="color:orange">조직 내부의 인력관리 (Human Resource)</span>** 분야에서 일하고 있어서 이 부분에 관련한 예시 및 내용들이 나오고 있어서 기업에서 생활을 하시는 분들이라면 예시까지도 흥미있게 접근하실 수 있을 것입니다.

## 2장 데이터 드리븐 보고절차
> Pandas & Scipy 파이썬 모듈 학습

이 책의 주요한 내용을 정리한 챕터가 2장과 3장 입니다. 1장에서 느낀점은 현재 실무에서 일하고 있는 코딩 비숙련자 분들이, 자신의 업무효율을 높이고 몸값을 높일 수 있도록 컴퓨터 기술적인 부분을 향상하는데 중점을 두고 있어 보입니다.


※ 본 리뷰는 IT 현업개발자가, 한빛미디어 책을 제공받아 작성한 서평입니다.

<figure class="align-center">
  <img width="510px" src="{{site.baseurl}}/assets/book/DataDriven.jpeg">
  <figcaption>데이터 드리븐 리포트 (리뷰도서)</figcaption>
</figure>
