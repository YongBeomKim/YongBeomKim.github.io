---
layout: blog
title: Atomic Design + shadcn UI
tags:
- react
---

`Django + React.js (TS) in Docker` 개발환경에서 작업하고 있습니다. `LLM` 이 강화되면서 서비스 확장에 대한 Needs 도 있어서, `Vibe Coding` 의 성능강화로 보다 효율적인 작업환경에 대하여 정리해 보겠습니다.

<br/>

# Project 특징

## 기능 기반 폴더 구조 (Feature-Based / Domain-Based)
앱이 커질수록 각 기능(Feature)별로 모든 관련 파일을 묶는 것이 유지보수에 유리합니다.
```yaml
src/
├── features/             # 주요 기능별 폴더관리
│   ├── auth/             # > 사용자 인증 (로그인, 회원가입)
│   │   ├── components/   # 인증 관련 UI 컴포넌트 (LoginForm, SignupForm)
│   │   ├── hooks/        # 인증 로직 (useLogin, useAuth)
│   │   └── types/
│   ├── userProfile/      # > 사용자 프로필
│   │   ├── components/   # (ProfileCard, EditForm)
│   │   ├── api/          # 데이터 통신 로직
│   │   └── pages/        # (UserProfilePage.tsx - 페이지 컴포넌트)
│   └── posts/            # > 게시판
│       ├── components/   # (ProfileCard, EditForm)
│       ├── api/          # 데이터 통신 로직
│       └── pages/        # (UserProfilePage.tsx - 페이지 컴포넌트)
│
├── components/           # 전역 재사용 컴포넌트
│   ├── ui/               # shadcn/ui 컴포넌트
│   └── common/           # (Logo, GlobalHeaderLayout, Footer)
│
├── pages/                # (옵션) features 폴더에서 관리되지 않는 페이지내용
│   ├── items/            # shadcn/ui 컴포넌트
│   └── board/            # (Logo, GlobalHeaderLayout, Footer)
│
├── lib/                  # 유틸리티 함수 (utils.ts 설정 파일)
│   ├── hooks/            # 전역 재사용 Hook
│   ├── styles/           # styles 전역 스타일 정의
│   └── types/            # 전역 TypeScript 타입 정의
│
├── App.tsx
└── main.tsx
```

그리고 컴포넌트 내부의 변수를 상속받을 때 hirachy로 연결하는데, 이와같은 변수의 상태관리를 도와주는 도구로 `Zustand` 등이 있습니다. 이와같이 코드내용을 보다 효과적으로 관리할 수 있도록 도와주는 도구들도 함께 활용해 보겠습니다.

우선 내용을 공부하고 적용하는 방법도 있지만, Cline 등을 활용하여 전체적인 내용을 GPT 로 보완하면서 내용을 익혀 보는 방법을 추천 합니다.