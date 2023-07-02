---
layout: blog
title: React CodeSplit
tags:
- typescript
---

`React.js` 프로젝트를 진행하다보면 크기가 커지게 됩니다. 지난번 작업을 할 때에도 Build 작업을 진행시 다음과 같은 경고 메세지가 출력 되었습니다.

```bash
$ yarn    
yarn install v1.22.19

WARNING in asset size limit: 
The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets: index.js (488 KiB)

WARNING in webpack performance recommendations: 
You can limit the size of your bundles by using import()
or require.ensure to lazy load some parts of your application.

webpack 5.88.0 compiled with 3 warnings in 7037 ms
Done in 7.60s.
```

처음 작업을 할 때부터 `Code Split` 내용이 중요하다는 이야기를 듣고는 있었지만 <strike>귀찮아서</strike> 프로젝트에 적용하지 않고 있었습니다. 이번에 `Vite.js` 를 미들웨어로 변경했고, 중형 크기의 프로젝트를 진행하면서 적용을 해야겠다는 생각에 내용들을 찾아서 정리해 보았습니다.

<br/>

# React
## Lazy Loading
컴포넌트를 호출할 때 React 의 `lazy()` 함수를 활용하여 호출 합니다. 불러오는 방식에는 2가지가 있는데 함수를 사용하여 바로 호출하는 방법과 `Promise` 객체를 활용하여 **지연시간** 을 추가하는 방식이 있습니다.
```jsx
import { lazy } from "react";
(-) import SampleComponent from './components/Sample';
(+) const SampleComponent = lazy(() => import("./components/Sample"));
```

[React 리액트 라우터 지연시간 걸기](https://dreamcoding.tistory.com/28) | [React suspense/lazy delay?](https://stackoverflow.com/questions/54158994/react-suspense-lazy-delay) 방식을 활용하면, 모듈이 불완전하게 호출되어 화면이 깨지는 것을 피할 수 있습니다.
```jsx
import { lazy } from "react";
const SampleComponent2 = lazy(() => {
  return Promise.all([
      import("./components/Sample"),
      new Promise(resolve => setTimeout(resolve, 500))
  ])
  .then(([moduleExports]) => moduleExports);
});
```

## React Router Dom
`vite.js` 에서는 별도 설정할 내용이 없습니다. `lazy` 로 호출한 컴포넌트를 `Suspense` 함수를  사용하여 `Router Dom` 에 연결을 하고, 지체된 시간동안 `Loading` 화면에서 제어할 내용을 추가 합니다.
```jsx
import { lazy, Suspense } from "react";
import { 
  BrowserRouter, Routes, Route, Outlet, Link 
} from "react-router-dom";
...
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route
            index
            element={
              <Link to="/sample">lazy sample</Link>
            }
          />
          <Route
            path="sample"
            element={
              <Suspense fallback={
                <div>Loading...</div>
              }>
                <SampleComponent />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
```

## Build
리액트 파일을 빌드하면 다음과 같은 내용을 출력합니다.
```bash
$ yarn build
yarn run v1.22.19
warning package.json: No license field
$ tsc && vite build
vite v2.6.14 building for production...
transforming (1) index.htmlBrowserslist: caniuse-lite is outdated. Please run:
  npx browserslist@latest --update-db
✓ 69 modules transformed.

dist/assets/favicon.17e50649.svg         1.49 KiB
dist/index.html                          0.59 KiB
dist/assets/index.acdff5c3.js            3.33 KiB / gzip: 1.64 KiB
dist/assets/react-icons.de186dfe.js      1.48 KiB / gzip: 0.73 KiB
dist/assets/react-spinners.9e109b39.js   2.29 KiB / gzip: 1.15 KiB
dist/assets/Sample.d1ff6fc8.js           0.82 KiB / gzip: 0.50 KiB
dist/assets/index.458f9883.css           0.29 KiB / gzip: 0.22 KiB
dist/assets/vendor.1f2b8393.js           139.33 KiB / gzip: 45.34 KiB
Done in 4.07s.
```

빌드값을 템플릿에 추가하는 내용까지 자동으로 완성이 됩니다. 템플릿에 포함되는 내용을 살펴보면 다음과 같습니다. `index.js index.css` 파일과 함께, 연결관계를 확인하는 `vendor.1f2b8393.js`, 그리고 Loading 화면에서 필요한 `react-spinners.9e109b39.js` 3개의 내용을 추가하면 됩니다.

```html
<!DOCTYPE html>
  <head>
    <script type="module" crossorigin src="/assets/index.acdff5c3.js"></script>
    <link rel="modulepreload" href="/assets/vendor.1f2b8393.js">
    <link rel="modulepreload" href="/assets/react-spinners.9e109b39.js">
    <link rel="stylesheet" href="/assets/index.458f9883.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

<br/>

# 참고 사이트
- [Vite code splitting that just works](https://sambitsahoo.com/blog/vite-code-splitting-that-works.html)
- [Github - vite-react-split-template](https://github.com/KrishGarg/vite-react-vendor-split-template)
- [[React+TypeScript] Lazy-loading & preload로 Component 성능 최적화하기](https://velog.io/@olwooz/ReactTypeScript-Lazy-loading-preload%EB%A1%9C-Component-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94%ED%95%98%EA%B8%B0)
- [npm trends](https://npmtrends.com/normalize.css-vs-reset.css-vs-sanitize.css-vs-styled-normalize)
- [Structure React Projects From Beginner To Advanced](https://blog.webdevsimplified.com/2022-07/react-folder-structure/)
