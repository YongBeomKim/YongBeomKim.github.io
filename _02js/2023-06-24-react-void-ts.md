---
layout: blog
title: Axios Response void[]
tags:
- typescript
---

`axios` 또는 `fetch` 메서드를 사용하여 외부 데이터를 호출하는 작업을 하고 있었습니다. 날짜에 맞는 정보를 호출하는 작업인데, 해당 날짜에 데이터가 있는 경우에는 `Object of Array[]` 를 출력하고, 데이터가 없는 경우에는 `void[]` 를 출력하는 API 입니다. 

```bash
Type 'void[]' is not assignable to type 'ReactNode'
```

`Array[]` 는 배열은 있지만 인덱스 데이터가 없는 상태를 의미하는 반면, `void[]` 는 값이 없는상태를 의미합니다. [공식문서 참고](https://www.typescriptlang.org/ko/docs/handbook/2/functions.html#void) `void` 타입선언과 관연해서는 [왜 TypeScript는 void 타입을 사용해도 값을 return 할 수 있을까?](https://pozafly.github.io/typescript/why-can-typescript-return-any-value-using-void/) 내용을 참고해 보도록 합니다. 읽어보았는데 자세하게 단계를 설명하고 있었고, 단계별 이해가 부족한 부분이 있어서 반복해서 읽어야 할 거 같은 내용이었습니다.

<br/>

# Void 오류의 발생
## React 에서 발생한 예시
결론부터 이야기 하면 `useState()` 에서 별도의 타입선언을 하지 않은 상태에서 `useEffect()` 로 데이터를 수집하고, 최종적인 템플릿 `items.map` 에서 타입을 추가하면 해결되는 내용이었습니다. 

```jsx
const Crud = ({date}:DateProps) => {

  (-) const [items, setItems] = useState(dummyItemMenu as Menu[])
  (+) const [items, setItems] = useState([])

  useEffect(() => {
    const get_items = async() => {
      await axios.get(menu_url, { params: {date:date}})
        .then(response => setItems(response.data)) 
        .catch(error => console.log(error))
    }
    get_items()
  }, [date])

  return (
    <div>
      <ul>
      {items.length > 0 ?
        (-) items.map((item,id) =>
        (+) items.map((item:Menu, id) =>
          ( <li key={id}>{item.name}</li> ))
      :
        <></>
      }
      </ul>
    </div>
  )
}
```

추가적인 방법으로는, 타입스크립트의 제너릭 선언을 활용하는 방법으로, 다음과 같이 `useState` 를 선언할 수 있습니다.
```jsx
  (+) const [items, setItems] = useState<Menu[]>([])
```

## 중간적인 예외처리
`axios` 또는 `fetch` 는 자동으로 타입처리를 진행합니다. 응답 데이터가 없는 `response.data => []` 결과값을 받을 때 함수들은 `void[]` 를 출력하는데, (1) `useState()` 에서 `void[]` 응답을 출력할때 사용할 추가적인 타입선언, (2) 그리고 `setItems` 에서도 해당 객체를 받은 뒤, `items.map()` 에서 반복작업을 할 때 `void[]` 객체에 대한 예외처리 등의 내용이 추가 되어야 합니다 

```jsx
const DateCrud = ({date}:DateProps) => {
  const [items, setItems] = useState(dummyItemMenu as Menu[])
  useEffect(() => {
    const get_items = async() => {
      await axios.get(menu_url, { params: {date:date}})
        .then(response => {
          if(response.data.length > 0) { setItems(response.data) } 
          else { setItems(dummyItemMenu) }
        }) 
        .catch(error => console.log(error))
    }
    get_items()
  }, [date])
  return (
    <section>
      <ul>
      {((items.length > 0) && (items[0].date !== "")) ?
        items.map((item,id) => (
          <li key={id}>{item.type} : {item.name}</li>
       )) : <></> }
      </ul>
    </section>
)}
```

## 결론
하루동안 중간단계를 거치긴 했지만 결론은 맨처음에 설명한 것처럼 `useState` 에서는 별도 타입을 선언하지 않은 상태에서 `axios` 또는 `fetch` 함수를 사용하여 예외처리 및 API 결과값을 수집하고, `.map()` 메서드 등에서 결과값을 출력할 때 타입을 추가하는 방식으로 작업을 하면 됩니다.

<br/>

# 참고사이트
- [Using the Effect Hook](https://legacy.reactjs.org/docs/hooks-effect.html)
- [왜 TypeScript는 void 타입을 사용해도 값을 return 할 수 있을까?](https://pozafly.github.io/typescript/why-can-typescript-return-any-value-using-void/)
- [TypeScript 공식문서 - void](https://www.typescriptlang.org/ko/docs/handbook/2/functions.html#void)