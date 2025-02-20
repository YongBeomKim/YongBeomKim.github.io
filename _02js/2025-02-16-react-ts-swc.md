---
layout: blog
title: React 19, Tailwind 4 & Vite.js
tags:
- react
---

설치에 필요한 도구들을 최신 버젼여부 확인 및 업데이트를 진행합니다. 그렇지 않은경우 다음과 같은 오류를 접하게 됩니다.
```bash
$ npm install -g npm@latest
...
npm ERR! notsup Required: {"node":"^20.17.0 || >=22.9.0"}
npm ERR! notsup Actual:   {"npm":"10.2.4","node":"v20.11.1"}
```

<br/>

# Install
## System Package Update
근본적으로는 `Node.js` 를 업데이트 한 뒤에, 나머지 필요로 하는 도구들을 차례로 업데이트 진행합니다.
```bash
# Node Version Maneger 재설치 / 업데이트
# 설치 후 나오는 스크립트 내용 `.bashrc` / `.zshrc` 추가
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# 설치 가능한 버젼 확인 (22.9 보다 높은버젼 확인)
$ nvm ls-remote | grep Latest   
   v22.14.0   (Latest LTS: Jod)

# v22.14.0 을 설치 합니다.
# 설치 후 실행할 때에는 `nvm use v22.14.0` 를 입력합니다.
$ nvm install v22.14.0       
Downloading and installing node v22.14.0...
Downloading https://nodejs.org/dist/v22.14.0/node-v22.14.0-linux-x64.tar.xz...
Now using node v22.14.0 (npm v10.9.2)

# Node Version Mameger 에서도 `.nvmrc` 관리자 파일을 제공
# .nvmrc 파일이 있는 디렉토리로 이동하면, 명시된 Node.js 버전 사용
$ nvm install --latest-npm
No .nvmrc file found
Downloading and installing node v23.8.0...
....

# NPM 패키지 설치에 필요한 `yarn` 을 업데이트 합니다.
$ npm install --global yarn
```

`.nvmrc` 파일에는 다음과 같은 방법으로 Node.js 버전을 명시할 수 있습니다.

| 텍스트  | 실행내용 설명 |
|-------|----------------|
| v18   | Node.js 18 버전 |
|   18  | Node.js 18 버전 |
| lts/* | LTS(Long Term Support) 버전 중 최신 버전 |
| node  | 현재 시스템에 설치된 Node.js 버전 |

## NPM, NPX
`npx` 는 `Node.js 관련 패키지` 를 `localhost` 에 설치된 내용등을 확인하지 않고 온라인으로 소스를 가져와서 실행 합니다. 장점은 별도의 cache 를 남기지 않고, 실행시점의 최신버젼을 바로 사용 가능합니다. 단점은 온라인에 항상 연결되어 있어야 하며, 관련 파일을 다운받아야 되서 시간이 조금 더 필요로 합니다. 
```bash
$ node -v
v22.14.0
$ npm -v                   
10.9.2
$ npx -v                 
10.9.2
```

개인적으로는 `npm` 은 진행 과정중에 오류가 발생하면 이를 별도로 해결하는 번거로움이 있는데 반해, `yarn`을 사용하여 진행한 경우에는 해당과정에 필요한 부수적인 내용들을 자동으로 해결해 주는 느낌이 들어서 진행과정이 보다 수월했었습니다. 위와 같은 내용으로 인하여 `yarn` 으로 진행하다가, 최신버전 확인 및 진행이 필요한 경우에는 `npx`를 혼합하여 과정을 진행하겠습니다.

<br/>

# React 19 & tailwind
## React + TypeScript SWC
```bash
# 작업을 시작할 폴더를 사용자가 생성
$ mkdir react
$ cd react             

# "." 은 현재위치에 설치를 진행합니다
# 프레임워크는 사용자가 선택가능
$ yarn create vite .
yarn create v1.22.22
✔ Select a framework: › React
✔ Select a variant: › TypeScript + SWC
Done. Now run:

  yarn
  yarn dev

$ yarn              
yarn install v1.22.22
info No lockfile found.
...
success Saved lockfile.
Done in 5.19s.
```

## Tailwind 4
기존에는 설치 후, `tailwind.config.js` 설정파일을 관리해 줘야 했었지만, 이번 버젼부터는 다음과 같이 `vite` 설정파일에 함수를 추가해 주는 것으로 마무리가 가능해 졌습니다.
```bash
$ yarn add -D install tailwindcss @tailwindcss/vite
yarn add v1.22.22
...
info Direct dependencies
├─ @tailwindcss/cli@4.0.7
├─ @tailwindcss/vite@4.0.7
└─ install@0.13.0
...
Done in 2.47s.
``` 

`vite.config.ts` 파일에 아래와 같이 `tailwindcss` 설정 내용을 추가해 주면 모든 설정이 완료 됩니다.
```javascript
# cat vite.config.ts                                   
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
(+) import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    (+) tailwindcss(),
  ],
})
```

# 참고사이트
- [Getting Started Yarn](https://classic.yarnpkg.com/en/docs/getting-started)
- [Get started with Tailwind CSS](https://tailwindcss.com/docs/installation/tailwind-cli)
