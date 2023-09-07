---
layout: blog
title: React Props on Child
tags:
- HTML
---

프론트엔드 작업을 하다보면 대부분이 API 를 통하여 데이터를 전달받고, 필요로 하는 컴포넌트에 전달하여 보여주고, 전달받은 컴포넌트에서 CRUD 작업을 구성하는 방식으로 되어 있습니다.

```r
API -> Props --(children)->
```

<br/>

# Props of Child

구현하고 싶은 내용이 많아질 수록, 컴포넌트의 자식들이 늘어나게 되는데 React.js 는 단방향 통신만 가능하다는 점과, props는 읽기 전용이라서 수정이 불가능 하다는 것을 잘 알고서 장작나무를 쌓아올리듯 구조를 만들고 작업을 진행 하여야 합니다. 이 문서를 작성하게 된 이유는 이러한 특성을 간과한 채 작업을 하다가 어려움을 격게되었고 그 경험을 정리하기 위함 입니다.

<br/>

## 성공적인 Child Props

```r
async API => Table (Array Object Map) -> Button on Table
```

서버에서 비동기 방식으로 전달받은 데이터를 활용하여 테이블 컴포넌트를 생성하고, 생성된 테이블 위에 필요한 기능버튼들을 추가한 경우에는 원활하게 잘 작동하는 모습을 볼 수 있었습니다. 이유는 데이터를 전송받아 필요한 컴포넌트들일 모두 생성된 뒤에 나머지 부가기능에 필요한 자식 컴포넌트들도 차례로 생성되었기 때문 입니다.

<br/>

## 실패한 Child Props

async 로 데이터를 전달받기 전에, child Props 들이 모두 생성된 경우가 이에 해당 됩니다. async 로 전달받은 데이터는 `useState()` 를 활용하여 상태를 변환하는데, 변환된 값이 아닌 초깃값이 자식에게 전달된 상태에서 작식 컴포넌트 생성을 완료한 경우가 이에 해당 됩니다.

<br/>

# Solution
## 컴포넌트 랜더링 조건 추가
`setState()` 로 변경되기 전 초깃값을 조건으로 데이터를 불러온 뒤 해당 컴포넌트가 랜더링 되도록 조건을 추가 합니다.

```jsx
{(props.start !== "")  ?
  <Table
    data={data}
  >
: null }
```

## React.cloneElement()
위와같은 상황에 활용가능한 메서드를 리액트에서 제공하고 있습니다. 


<figure class="align-center">
<figure class="align-center">
  <p style="text-align: center">
  <img src="{{site.baseurl}}/assets/web/html_method.png">
  <figcaption>HTTP Requests</figcaption>
  </p>
</figure>

- **<span style="color:mediumblue">GET</span>** : **조회**
- **<span style="color:green">POST</span>** : **등록**
- **<span style="color:darkorange">PUT</span>** : **수정**
- **<span style="color:firebrick">DELETE</span>** : **삭제**

<br/>

# 참고사이트
- [cloneElement 공식문서](https://react.dev/reference/react/cloneElement)
- [똑똑하게 툴팁, 모달 만들기 (with. React.cloneElement)](https://velog.io/@space_dog/React.cloneElement)
