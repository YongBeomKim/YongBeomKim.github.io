---
layout: blog
title: React 객체관리
tags:
- typescript
---

서버 Data 를 Table 형태로 출력하면서 추가적 필요한 내용이 `colspan` , `rowspan` 입니다. 지금까지는 동일한 데이터라고 해도 `.map()` 함수로 동일한 내용을 그대로 출력함으로써 작업에는 문제가 없지만 동일한 내용이 화면에 반복 출력함으로써 시각적 피로도 및 출력자료에 대한 보다 자유로운 형태 조작이 어려운 한계가 존재합니다.

이번에 React 에서 `Table` 을 자체제작 형태를 사용하는 것으로 우선 결정한 만큼 이 기능도 추가하는 방법에 대하여 시도한 내용들을 정리해 보도록 하겠습니다. 현재 목표로 하는 내용을 가장 잘 구현한 내용을 vue.js 로 작성한 내용으로 [Vue.js - 동적으로 테이블 행 병합하기, 동적 rowspan(1)](https://velog.io/@gyumin_2/Vue.js-%EB%8F%99%EC%A0%81%EC%9C%BC%EB%A1%9C-%ED%85%8C%EC%9D%B4%EB%B8%94-%ED%96%89-%EB%B3%91%ED%95%A9%ED%95%98%EA%B8%B0-%EB%8F%99%EC%A0%81-rowspan1) 를 참고하면 됩니다.

풀어나아갈 문제들을 정리하면 다음과 같습니다.
1. 서버에서 출력한 Object Array 를 받는다.
2. 받은 Object Array 에서 중복되는  Object 의 Key 와 Value 를 찾는다
3. 앞에서 찾은 정보를 활용하여 중복값과 중복 횟수를 판단할 기준으로 활용한다
4. 중복횟수 기준 데이터를 활용하여 원본 Object array 에서 중복된 데이터는 null 로 변환한다
5. 각 열들의 중복데이터를 추가한다

```

```

https://yongbeomkim.github.io/02js/2023-07-04-obj-sort.html

https://develop-sense.tistory.com/entry/HTML-%ED%85%8C%EC%9D%B4%EB%B8%94table%EC%9D%98-colspan%EA%B3%BC-rowspan-%EC%82%AC%EC%9A%A9%EB%B2%95%EA%B3%BC-%EC%98%88%EC%8B%9C

https://sisiblog.tistory.com/313

https://ordinary-code.tistory.com/8

https://velog.io/@tjdud0123/javascript-map-filter-%ED%95%A8%EC%88%98

https://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript

https://gurtn.tistory.com/204

https://stackoverflow.com/questions/38824349/how-to-convert-an-object-to-an-array-of-key-value-pairs-in-javascript

[Array of Object에서 중복 값을 제거하는 몇 가지 방법](https://velog.io/@llama/Array-of-Object%EC%97%90%EC%84%9C-%EC%A4%91%EB%B3%B5-%EA%B0%92%EC%9D%84-%EC%A0%9C%EA%B1%B0%ED%95%98%EB%8A%94-%EB%AA%87-%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95)

시각화 도구들에 대하여 알아본 내용들을 정리해 보겠습니다. 이전에도 한번 [Charts](https://yongbeomkim.github.io/02js/2022-01-21-charts.html) 내용을 정리한 적이 있었습니다. 이당시에는 **<span style="color:orange">금융 데이터를 위한 시각화</span>** 관련 모듈들을 중심으로 정리하였습니다. 이번에는 조금 더 범용적으로  **<span style="color:darkblue">React.js</span>** 환경에서 활용하기에 적합한 모듈을 찾아보고 정리한 내용을 기록해 보려고 합니다.

## ChatGPT

우선 조사를 위한 후보군을 추리는 방법으로 **ChatGPT** 를 사용하였습니다. 검색엔진은 문서들의 제목을 조사하는데 최신 내용들을 중심으로 원하는 내용을 찾기 위해서는 단순 검색보단 추가적인 조건식을 활용하고, 해당 문서들의 내용을 본 뒤에야 이 내용이 타당한지를 확인 가능하는 등의 검색 및 확인 그리고 평가의 단계를 거치게 됩니다.이에반해 **ChatGPT** 는 검색 및 검토과정을 나름대로 마친 정리된 문서 한장으로 앞의 모든 과정을 한꺼번에 확인할 수 있다는 점에서 사용자의 결정시간을 단축해 준다는 점에서 큰 장점이 있습니다.

```bash
Chart.js with React `react-chartjs-2`: is free
Recharts: is a free, and simple API
Victory: free library
```

맨 처음 활용한 모듈이 **<span>react-chartjs-2</span>** 입니다. 가장 대중적인 만큼 예제들도 많아서 바로 적용할 수 있었지만 상대적으로 무거운 랜더링 및 부자연스러운 효과 등으로 조금더 가볍고 사용자조작이 편한 모듈로 대체가 필요하다는 느낌이 들었습니다.

## **ReCharts**
현재 1순위로 활용하는 모듈 입니다. 처음에는 반응형 예제에서 화면이 보여지지 않는 문제가 있었지만, **[Rechart Responsive container does not render](https://stackoverflow.com/questions/47614196/rechart-responsive-container-does-not-render)** 를 참고하여 해결된 이후로는 적극 활용하고 있습니다. [업데이트](https://www.npmjs.com/package/recharts) 도 활발하고, [ReCharts Document](https://recharts.org/en-US/) 공식문서가 자세하게 잘 정리되어 있습니다.

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