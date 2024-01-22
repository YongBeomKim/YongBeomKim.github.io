---
layout: blog
title: Table Json 데이터에 RowSpan 추가하기
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

<br/>

# 최종형태
`role` 의 값을 기준으로 연산을 통해 `roleRowSpan` 값을 추가한다. `roleRowSpan` 값을 기준으로 셀 병합 크기 및 노출하지 않을 값의 크기를 결정하는 방법으로 해결 가능 합니다.

```javascript
interface RowData {
  name: string;
  age: number;
  role?: string;
  roleRowSpan?: number; // Number of rows to span for the role cell
}

const data: RowData[] = [
  { name: "Alice", age: 30, role: "Manager", roleRowSpan: 1 },
  { name: "Bob", age: 25, role: "Tester" , roleRowSpan: 2 },
  { name: "Charlie", age: 35 }, // Role cell will be empty due to rowspan
];
```

입력값을 위와 같이 변환을 완료했다면 템플릿에서는 이에 적합한 조건식만 추가하면 됩니다.
```jsx
const Table = () => {
  return (
    <table>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.name}</td>
            <td>{row.age}</td>
              {index === 0 || row.role !== "" 
              ? 
                (
                  <td rowSpan={row.roleRowSpan}>
                    {row.role}
                  </td>
                ) 
              : 
                null
              }
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

<br/>

## JavaScript
`useMemo()` 에서 다음과 같은 내용으로 중복여부를 확인 한 뒤, 중복갯수를 기준으로 `rowSpan` 값을 생성하게 됩니다. 실제 결과에서는 적용하지 못했는데, 이유는 `checkBox` 로 개별 라인별 숨기기를 하게되면 `rowSpan` 값이 그대로 적용됨에 따라 테이블이 깨지게 되었기 때문입니다. 향후에 이를 적용할 때를 대비하여 작업 결과를 정리해 보면 다음과 같습니다.
```jsx
  // 중복되는 갯수확인
  function countDuplicates(array:(string|number)[]) {
    let countMap: any = {};
    array.forEach(function(i){countMap[i] = (countMap[i]||0)+1;});
    return countMap
  }

  // useMemo 로 수집데이터 최적화
  const data = useMemo(() => {

    let checkName: any = {}
    const names: string[] = items.map((item) => {
      return item.type + item.menu
    })

    const checkCounts = countDuplicates(names) // Add NewKey

    items.map((item) => {
      if(checkName[item.type + item.menu]){
        item.rowSpan = 0
      } else {
        item.rowSpan = checkCounts[item.type + item.menu]
        checkName[item.type + item.menu] = 1
      }
    })

    return [...items].sort(
      function (a,b) { 
        return a['id'] - b['id'] 
      }
    )
  },[items])
```

<br/>

# 참고사이트
- [React.js- Dynamic table with rowspan](https://stackoverflow.com/questions/57353960/react-js-dynamic-table-with-rowspan)



https://yongbeomkim.github.io/02js/2023-07-04-obj-sort.html


https://sisiblog.tistory.com/313

https://ordinary-code.tistory.com/8

https://velog.io/@tjdud0123/javascript-map-filter-%ED%95%A8%EC%88%98

https://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript

https://gurtn.tistory.com/204

https://stackoverflow.com/questions/38824349/how-to-convert-an-object-to-an-array-of-key-value-pairs-in-javascript

[Array of Object에서 중복 값을 제거하는 몇 가지 방법](https://velog.io/@llama/Array-of-Object%EC%97%90%EC%84%9C-%EC%A4%91%EB%B3%B5-%EA%B0%92%EC%9D%84-%EC%A0%9C%EA%B1%B0%ED%95%98%EB%8A%94-%EB%AA%87-%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95)

