---
title : BOOK do it! 리액트 정석 Component
last_modified_at: 2020-07-25T10:45:06-05:00
header:
  overlay_image: /assets/images/code/react-banner.png
categories:
  - react
tags: 
    - javascript
    - react
---

**[Do IT React.js](https://github.com/justinpark/justin-do-it-react)** 도서에서 React.js 부분을 정리해 보겠습니다.

![책표지](https://image.yes24.com/goods/87631428/M)

<br />

## 3 Component

## Curly Brace

데이터 원본을 React.js Component 에 전달 합니다. 단위 데이터, 객체, 배열, 함수, JSX 까지 모두 전달이 가능합니다. 

{% raw %}
```r
{2}, {true}, 
{[1,2,3,4]}, {{ key:'value'}},
{ () => {} }, {<span>JSX Code</span>}
```
{% endraw %}

## Children Property

Component 중간의 Node 에 데이터를 정의하면 컴포넌트가 이를 인식하여 동작 합니다.

```java
render() {
  return (
      <>
        <ChildComponent> 데이터 TAG </ChildComponent>
        // 속성 으로도 Children 을 입력 가능합니다.
        <ChildComponent children={<b>데이터 TAG</b>} />
      </>
)};
```

### ProtoTypes

데이터 형식을 미리 정의하면, 정의한 내용과 다른 내용이 입력된 경우 오류 메세지를 출력 합니다.

### Component Condition : `&&`

**조건이 true** 일 때, **지정된 값을 할당** 하고, undefined 등의 오류가 발생하는 경우에는 **해당 객체의 연성 과정을 무시** 하고 진행을 합니다.

{% raw %}
```javascript
let value;
if (obj) {
  value = obj.key1;
};
const value = obj && obj.key1;
{ condition && <Component  /> }
```
{% endraw %}

`if (value)` 판단문에서 **true** 와 **false** 결과값은 아래의 객체로도 대체 가능합니다.

```javascript
true : -1, '0', 'false'(문자열), `{}`, `[]`
false : undefined, null, 0, NaN
```

### Component Condition : `||`

**조건이 false** 일 때, **지정된 값을 할당** 하고, 유효한 값이 전달된 경우에는 해당 값을 적용 합니다.

{% raw %}
```javascript
const Box = styled.div`
  background: ${props => props.color || 'blue'};
  padding: 1rem;
  display: flex;
`;
```
{% endraw %}
