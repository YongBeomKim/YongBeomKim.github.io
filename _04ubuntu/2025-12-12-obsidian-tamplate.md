---
layout: blog
title: Obsidian 문서 구조화 & Template
tags:
- obsidian
---

문서를 주제와 용도에 맞도록 폴더 구조와 문서별 제목을 정의하고 관리를 하게 된다. 문서들을 보다 유기적으로 관리할 수 있도록 문서내 `Template` 을 정의 한다면 검색 및 확장이 용이해 집니다.

<br/>

---
# 활용 기본문법

Markdown 표준 문법(CommonMark) 자체에는 헤더에 속성(ID, Class, Style 등)을 직접 부여하는 기능이 없지만, **Obsidian**에서 지원하는 **'확장 문법(Extended Syntax)'**을 사용하면 속성을 추가할 수 있습니다.
사용 목적과 환경에 따라 다음 3가지 방법 중 하나를 선택 합니다.

## 1 확장 문법 사용 (Obsidian 플러그인 / 정적 사이트 생성기)
가장 깔끔하고 많이 쓰이는 방식입니다. 헤더 뒤에 **중괄호 `{ }`**를 사용하여 속성을 정의합니다.

> **주의:** Obsidian 기본 상태에서는 작동하지 않습니다. **'Markdown Attributes'** 같은 커뮤니티 플러그인을 설치하거나, Pandoc/Hugo 같은 외부 도구로 내보낼 때 유효합니다.

**문법:**
```markdown
# 헤더 제목 { #아이디 .클래스명 키=값 }
```

**예시:**
```markdown
# 개발 가이드 문서 {#dev-guide .text-center style="color:red;"}
```

* `#dev-guide`: **ID**를 부여 (링크 이동 타겟으로 사용)
* `.text-center`: **Class**를 부여 (CSS 스타일링용)
* `style="..."`: 인라인 스타일 부여


## 2. 순수 HTML 태그 사용 (모든 환경 호환)
Markdown은 HTML을 100% 지원하므로, 속성이 꼭 필요하다면 Markdown 헤더(`#`) 대신 **HTML 태그**를 직접 쓰는 것이 가장 확실한 방법입니다. Obsidian에서도 별도 설정 없이 즉시 적용됩니다.

**예시:**
```html
<h2 id="api-section" class="highlight" style="color: blue;">
  API 명세서 상세
</h2>
```

* **장점:** Obsidian, GitHub, 웹 브라우저 어디서든 똑같이 보입니다.
* **단점:** Markdown의 간결함이 사라지고 코드가 길어집니다.

## 3. Obsidian 전용: 블록 식별자 (Block Identifier)
만약 속성을 추가하려는 목적이 **'문서 내 특정 위치로 링크를 걸기 위해서(앵커)'**라면, Obsidian 고유의 문법을 사용하는 것이 좋습니다.

**문법:**
```markdown
# 헤더 제목 ^식별자
```

**예시:**
```markdown
# 3. 트러블슈팅 가이드 ^troubleshooting
```

* 사용할 때: `[[문서명#^troubleshooting]]` 형태로 변하지 않는 고유 링크를 만들 수 있습니다.

## 요약 및 추천
1. **CSS 스타일링이 목적이라면:** Obsidian에서는 **HTML 태그(`<h2>...</h2>`)**를 쓰거나, **'Markdown Attributes' 플러그인**을 설치하여 `{ .class }` 문법을 사용하세요.
2. **내부 링크 이동이 목적이라면:** Obsidian 기본 기능인 **Block Identifier (`^id`)**를 사용하는 것이 관리에 유리합니다.

<br/>

# 문서 구조화 & Template
Obsidian은 **'링크(Link)'**와 **'프로퍼티(Property)'**를 활용할 수 있어서, 서로 긴밀하게 연결된 웹 서비스 개발 문서를 작성하기에 최적의 도구입니다. 하지만 자유도가 높은 만큼, 초기에 **체계적인 폴더 구조**와 **템플릿**을 잡지 않으면 문서가 흩어지기 쉽습니다. 웹 서비스 개발 및 유지보수를 위해 **검색이 쉽고 확장이 가능한** 문서 구조와 템플릿 전략을 제안합니다.

아래와 같이 `yaml` 포맷으로 형식을 입력하면 `Obsidian` 에서 지원하는 `속성` 기능이 활성화 되어 체계적으로 문서들을 정의할 수 있습니다.
```yaml
---
tags: [프로젝트A, 문서, 중요]
status: 진행중
date: 2025-12-17
author: 홍길동
---
```

## 1. 폴더 구조 (Directory Structure)
Obsidian은 폴더보다는 '링크'가 중요하지만, 파일을 물리적으로 정리하기 위해 **Johnny Decimal System**(숫자로 분류)을 차용한 구조를 추천합니다.

```markdown
📂 Project-Name/
├── 📂 00_Map                # 프로젝트의 진입점 (Home, MOCs)
├── 📂 10_Planning           # 기획, 요구사항 정의서, 로드맵
├── 📂 20_Architecture       # 시스템 아키텍처, DB 설계(ERD), 기술 스택
├── 📂 30_Backend            # API 명세, 비즈니스 로직, 서버 설정
├── 📂 40_Frontend           # UI/UX, 컴포넌트, 상태 관리, 디자인 시스템
├── 📂 50_Infrastructure     # AWS/GCP 설정, CI/CD 파이프라인, 환경변수
├── 📂 60_Meeting_Notes      # 회의록 (Daily, Weekly, Retrospective)
├── 📂 90_Assets             # 이미지, 첨부파일 (Excalidraw 파일 포함)
└── 📂 Templates             # 문서 템플릿 모음
```

## 2. 핵심 문서 템플릿 (Templates)
Obsidian의 **Core Plugin인 'Templates'** 또는 커뮤니티 플러그인 **'Templater'**를 사용하여 아래 양식을 등록해두고 사용합니다.
*Tip: `Properties` (YAML Frontmatter)를 잘 정의해야 나중에 `Dataview` 플러그인으로 자동 목차를 만들 수 있습니다.*

### A. 기능 명세서 (Feature Specification)
기획 단계에서 개발로 넘어갈 때 사용하는 문서입니다.

```markdown
---
type: feature
status: [기획중 | 개발중 | 완료]
priority: [High | Medium | Low]
assignee: [[담당자이름]]
tags: [feature, frontend, backend]
created_at: {{date}}
---

# 🚀 기능명: [기능 이름]

## 1. 개요 (Overview)
* 이 기능이 필요한 이유와 목적을 기술합니다.

## 2. 사용자 스토리 (User Story)
* **Who**: [사용자]는
* **What**: [무엇을] 하고 싶다
* **Why**: [어떤 가치]를 얻기 위해

## 3. 상세 요구사항 (Requirements)
- [ ] 조건 1
- [ ] 조건 2

## 4. UI/UX (화면 설계)
![[화면설계이미지.png]]
* *피그마 링크: [URL]*

## 5. 데이터 구조 및 API
* 관련 테이블: [[Users]], [[Orders]]
* 사용 API: [[POST /api/v1/orders]]

## 6. 테스트 시나리오 (Acceptance Criteria)
* [ ] 시나리오 1: 성공 케이스
* [ ] 시나리오 2: 실패 케이스
```

### B. API 명세서 (API Document)
백엔드와 프론트엔드 간의 소통을 위한 핵심 문서입니다.

```markdown
---
type: api
method: [GET | POST | PUT | DELETE]
endpoint: /api/v1/resource
auth_required: true
tags: [api, backend]
---

# 📡 API: [API 이름]
> **Endpoint:** `{{method}}` `{{endpoint}}`
> **설명:** 이 API가 하는 역할에 대한 한 줄 요약

## 1. Request (요청)
### Headers
| Key | Value | Description |
| --- | --- | --- |
| Authorization | Bearer {token} | JWT 토큰 |

### Body / Query Params
{
  "userId": "String (Required)",
  "age": "Number (Optional)"
}

## 2. Response (응답)
### 200 OK
{
  "success": true,
  "data": { ... }
}

### 400 Bad Request
{
  "error": "Invalid Parameter"
}

## 3. 관련 로직
* 연결된 DB 테이블: [[Table_Name]]
* 참조하는 함수: `UserService.createUser()`
```

## C. 트러블슈팅/버그 리포트 (Issue & Fix)
개발 중 발생한 문제를 기록하여 자산화합니다. (가장 중요합니다!)
```markdown
---
type: issue
status: [Open | Resolved]
severity: [Critical | Major | Minor]
tags: [bug, troubleshooting]
date: {{date}}
---

# 🐞 Issue: [에러 메시지 혹은 현상 요약]

## 1. 현상 (Symptom)
* 어떤 상황에서 문제가 발생했나요?
* **Error Log:**
(에러 로그 붙여넣기)

## 2. 원인 (Root Cause)

* 분석된 원인은 무엇인가요?
* *참조: [[관련된 코드 파일명]]*

## 3. 해결 방법 (Solution)

* 어떻게 수정했나요?
* [x] 코드 수정 완료
* [ ] 배포 완료

## 4. 레퍼런스 (References)

* [StackOverflow 링크]
* [공식 문서 링크]
```

## 3. Obsidian 활용 전략 (Smart Usage)
문서를 단순히 쌓아두지 않고 **살아있는 문서**로 만들기 위한 전략입니다.

### 1) Dataview 플러그인 활용 (자동 대시보드)
`00_Map` 폴더에 `Dashboard.md`를 만들고, 아래 코드를 넣으면 진행 중인 기능을 자동으로 모아서 볼 수 있습니다. (SQL 처럼 문서 조회 가능)

```dataview
TABLE status, assignee, priority
FROM "Project-Name"
WHERE type = "feature" AND status != "완료"
SORT priority DESC
```

### 2) Excalidraw 플러그인 (다이어그램)
웹 서비스는 구조도가 필수입니다. 별도의 툴(Lucidchart 등)을 쓰지 말고 Obsidian 내부에서 **Excalidraw** 플러그인을 사용하세요.
* 문서 내에 그림을 그리고 바로 `[[문서명]]`으로 링크를 걸 수 있어 구조 파악에 매우 강력합니다.
* *추천 사용처: DB ERD 그리기, 사용자 Flow Chart, 시스템 아키텍처*

### 3) 아키텍처 결정 기록 (ADR)
`20_Architecture` 폴더에 **ADR(Architecture Decision Records)**을 남기세요.
* "왜 우리는 Redux 대신 Recoil을 선택했는가?"
* "왜 DB를 MySQL에서 PostgreSQL로 바꿨는가?"
* 이 기록은 나중에 합류한 팀원에게 최고의 가이드가 됩니다.

## 4. 정리된 문서 작성 흐름
1. **기획:** `Templates/Feature`를 불러와 요구사항 작성 → `10_Planning`에 저장.
2. **설계:** `Excalidraw`로 UI/DB 구조 도식화 → `20_Architecture`에 저장.
3. **개발:** `Templates/API`로 명세 작성하고 기능 문서에 `[[링크]]` 연결.
4. **문제 해결:** 에러 발생 시 `Templates/Issue`로 기록 남기기.

이 구조는 프로젝트 규모가 커져도 **'링크'**를 통해 문서 간의 관계를 추적할 수 있어 스파게티 문서화가 되는 것을 방지해 줍니다.