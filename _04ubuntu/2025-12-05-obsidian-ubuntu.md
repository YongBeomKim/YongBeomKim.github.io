---
layout: blog
title: Obsidian Ubuntu 24 설치하기
tags:
- obsidian
---

Obsidian을 **최초 설치한 뒤**, 이전에 **Remotely Save 플러그인**을 사용하여 Dropbox에 백업해 두었던 내용을 **복구(=동기화)** 하려고 합니다. **Ubuntu 24 또는 Windows/macOS 모두 공통적으로 적용되는 전체 단계**입니다.

[Obsidian](https://obsidian.md/download) 을 설치한 뒤, 커뮤니티 플러그인을 활용하여 Dropbox 접근을 위해 Remotely Save를 Dropbox API에 연결 합니다.
- Dropbox에 예전에 사용하던 **Remotely Save 백업이 존재**해야 함
  (예: `/Apps/Obsidian_RemotelySave/` 경로)
- 예전 Obsidian vault 이름을 알고 있어야 함 (예: `MyVault`)

## Obsidian 및 플러그인 설치
1. **Obsidian 설치**
   * [Obsidian](https://obsidian.md/download) 에서 OS별 설치
   * 첫 실행 후, 새 vault를 만들지 말고 “**Open folder as vault**”는 나중에 합니다.

2. **Community Plugins 활성화**
   * `Settings → Community Plugins → Turn on → Browse`
   * “**Remotely Save**” 검색 → **Install → Enable**

## Dropbox 연동 설정
1. `Settings → Remotely Save → Remote Type` 에서 **Dropbox** 선택
2. “**Connect Dropbox account**” 버튼 클릭
   → 브라우저가 열리며 Dropbox 인증 페이지로 이동
   → “허용(Allow)” 클릭
3. 인증 완료 후 Obsidian으로 돌아오면 **Access Token 자동 저장**됨

## DropBox 에 저장된 Vault 내용 복구
### 새로운 빈 Vault 생성
1. `Create new vault → MyVault (예전 이름과 같을 필요는 없음)`
2. Vault 내부에 아무 파일도 없어야 함 (초기 상태 유지)

### Remotely Save 설정 불러오기
Remotely Save는 Dropbox 내에 `settings.json` (또는 `.obsidian/plugins/remotely-save/config.json`) 같은 설정 파일을 별도로 저장하지 않으므로, 수동으로 Dropbox에서 기존 Vault 백업을 불러와야 합니다.
1. `Settings → Remotely Save` 메뉴에서
   * **Sync Direction** 을 `Remote → Local` (다운로드 전용) 으로 설정
   * **Vault folder name** 이 예전에 Dropbox에 저장된 폴더명과 일치해야 함
     (예: `MyVault`)
2. “**Run full sync**” 클릭
   → Dropbox에 있던 모든 파일이 로컬 Vault로 복사됨
💡 **참고:** Dropbox의 백업 경로는 기본적으로

```
/Apps/Obsidian_RemotelySave/<vault_name>/
```

## 복구 완료 후 동기화 모드 변경
1. 모든 노트가 내려받아졌는지 확인 후,
2. 다시 `Settings → Remotely Save` 로 이동
3. **Sync Direction** 을 `Two-way` 로 변경
   (이제 양방향 실시간 동기화 가능)

## (Option) 추가 팁
* Dropbox 폴더 구조를 직접 보고 싶다면
  → [https://www.dropbox.com/home/Apps/Obsidian_RemotelySave](https://www.dropbox.com/home/Apps/Obsidian_RemotelySave)
  에 접속해 폴더와 파일이 실제로 존재하는지 확인하세요.
* 만약 `Remotely Save` 가 “No remote vault found” 라고 뜬다면,
  → **Vault 이름 오타** 또는 **Dropbox 경로 불일치** 문제일 가능성이 높습니다.
* 복구 직후 자동 동기화는 잠시 비활성화하고 수동으로 한 번 `Run full sync` 하는 것이 안전합니다.

원하신다면 제가 **Dropbox 내부 구조 예시 (폴더/파일 형태)** 와 함께
Remotely Save 설정값 샘플 (`config.json` 예시) 도 보여드릴 수 있습니다.
그걸 원하시나요?
