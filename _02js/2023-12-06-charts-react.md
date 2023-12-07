---
layout: blog
title: Charts in React.js
tags:
- typescript
---

시각화 도구들에 대하여 알아본 내용들을 정리해 보겠습니다. 이전에도 한번 [Charts](https://yongbeomkim.github.io/02js/2022-01-21-charts.html) 내용을 정리한 적이 있었습니다. 이당시에는 **<span style="color:orange">금융 데이터를 위한 시각화</span>** 관련 모듈들을 중심으로 찾아보았습니다.

이번에는 조금더 범용적으로  **<span style="color:darkblue">React.js</span>** 환경에서 활용하기에 적합한 모듈을 찾아보고 정리한 내용을 기록해 보려고 합니다.

## ChatGPT

우선 조사를 위한 후보군을 추리는 방법으로 **ChatGPT** 를 사용하였습니다. 검색엔진은 문서들의 제목을 조사하는데 최신 내용들을 중심으로 원하는 내용을 찾기 위해서는 단순 검색보단 추가적인 조건식을 활용하고, 해당 문서들의 내용을 본 뒤에야 이 내용이 타당한지를 확인 가능하는 등의 검색 및 확인 그리고 평가의 단계를 거치게 됩니다.이에반해 **ChatGPT** 는 검색 및 검토과정을 나름대로 마친 정리된 문서 한장으로 앞의 모든 과정을 한꺼번에 확인할 수 있다는 점에서 사용자의 결정시간을 단축해 준다는 점에서 큰 장점이 있습니다.

```bash
Chart.js with React `react-chartjs-2`: is free
Recharts: is a free, and simple API
Victory: free library
```

맨 처음 활용한 모듈이 **<span>react-chartjs-2</span>** 입니다. 가장 대중적인 만큼 예제들도 많아서 바로 적용할 수 있었지만 상대적으로 무거운 랜더링 및 부자연스러운 효과 등으로 조금더 가볍고 사용자조작이 편한 모듈로 대체가 필요하다는 느낌이 들었습니다.

## **ReCharts**
현재 1순위로 활용하는 모듈 입니다. 처음에는 반응형 예제에서 화면이 보여지지 않는 문제가 있었지만, **[Rechart Responsive container does not render](https://stackoverflow.com/questions/47614196/rechart-responsive-container-does-not-render)** 를 참고하여 해결된 이후로는 적극 활용하고 있습니다.

[업데이트](https://www.npmjs.com/package/recharts) 도 활발하고, [ReCharts Document](https://recharts.org/en-US/) 공식문서가 자세하게 잘 정리되어 있습니다.

## **Victory**
이 모듈도 업데이트도 활발하고 [Collaborators](https://www.npmjs.com/package/victory) 숫자가 가장 많은 모듈 입니다. 활용방법도 단순하고, [Victory 공식문서](https://formidable.com/open-source/victory/gallery) 잘 정리되어 있어서 활용하기에 적합한 모듈 입니다.

## **Echarts**
상대적으로 무겁지만 Chart.js 보다 활발하게 커뮤니티가 이루어져 있고, 다양한 차트의 예제를 제공하는 모듈 입니다. 커스텀이 어렵다는 단점이 있지만. 다른 모듈들을 찾다가 없으면 이 모듈로써 해결가능하다는 장점이 있습니다. [GitHub](https://github.com/apache/echarts) 및 [Gallery](https://echarts.apache.org/examples/en/index.html#chart-type-radar) 를 제공하고 있어서 활용하기 용이합니다.

## **<span style="color:var(--accent);">React Financial Charts</span>**
앞에서 살펴본 내용들은 기본적인 차트를 제공하고 있습니다. 보다 복잡한 금융서비스에 적합한 내용으로는 이전에 정리 했었던 [react-financial-charts](https://github.com/react-financial/react-financial-charts) 를 추천 합니다. 이 모듈의 단점은 공식문서를 제공하고 있지 않다는 점 입니다. 지금은 업데이트를 하고 있지 않은 [react-stockcharts](https://github .com/rrag/react-stockcharts) 모듈의 예제 및 문서를 참고해야하는 번거로움이 있습니다. 그나마 최근에는 간단한 예시를 정리한 [React-financial-charts 사용 설명서](https://velog.io/@turtlemana/React-financial-charts-%EC%82%AC%EC%9A%A9-%EC%84%A4%EB%AA%85%EC%84%9C) 또는 [예제코드]([codesandbox.io/s/c88wz](https://codesandbox.io/p/sandbox/react-financial-charts-demo-c88wz?file=%2Findex.js)) 등을 참고하는 방식으로 접근을 하면 됩니다.

<br/>

# 마무리
7개월 전에도 그렇고 뭔가 더 좋은게 있지 않을까? 하는 막연한 불안감 및 결핍에 빠져서, 마치 `행복의 파랑새를 찾아서` 동화속의 아이들 처럼 뭔가를 이루고 열매를 통한 성장을 하기보단, 성장하지 못한 불안해 하는 환경속에서 멈춰버리게 됩니다. 이러한 문제점을 인식하여 정해진 기간내 조금은 부족한 열매를 먹고, 이를 바탕으로 앞으로 나아갈 수 있는 자세를 갖는 2024년이 되었으면 합니다.

<br/>

# 참고사이트
- [Recharts 차트 라이브러리 사용법](https://velog.io/@eunjin/React-Recharts-%EC%B0%A8%ED%8A%B8-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EC%82%AC%EC%9A%A9%EB%B2%95)
- [Recharts 차트 라이브러리 커스텀하는 방법](https://velog.io/@eunjin/React-Recharts-%EC%B0%A8%ED%8A%B8-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EC%BB%A4%EC%8A%A4%ED%85%80%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
- [Recharts에서 커스텀 도구킷을 사용하는 방법](https://colinch4.github.io/2023-12-01/12-53-02-519052-recharts%EC%97%90%EC%84%9C-%EC%BB%A4%EC%8A%A4%ED%85%80-%EB%8F%84%EA%B5%AC%ED%82%B7%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95%EC%9D%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80%EC%9A%94/)
- [Recharts.js 적용기](https://heeeming.tistory.com/entry/React-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%B0%A8%ED%8A%B8-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-Rechartsjs-%EC%A0%81%EC%9A%A9%EA%B8%B0React-chart-library-Rechartsjs)
- [ReCharts.js Legand Clickable Example](https://codesandbox.io/p/sandbox/recharts-with-legend-toggle-dqlts?file=%2Fsrc%2FBarGraph.js)
- [recharts 로 LineChart 구현하기](https://velog.io/@yrats/recharts-%EB%A1%9C-LineChart-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
- [Victory 튜토리얼 따라하기](https://medium.com/official-podo/%EC%B0%A8%ED%8A%B8-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-victory-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-%EB%94%B0%EB%9D%BC%ED%95%98%EA%B8%B0-f9332ae7c97a)