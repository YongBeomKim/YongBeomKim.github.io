---
layout: blog
title: (Ubuntu) Apt, Snap, 
tags:
- linux
---

리눅스에서 소프트웨어를 설치하고 관리하는 방식으로 **APT**, **Snap**, **Flatpak** 이 있습니다. 현재 가장 널리 사용되는 세 가지 주요 패키징 및 배포 시스템이며, 각각 고유한 특징과 목표를 가지고 있습니다.

<br/>

# APT vs. Snap vs. Flatpak 비교
* **APT:** 운영체제의 핵심 구성 요소 및 안정성이 중요한 서버용 패키지에 사용.
* **Snap/Flatpak:** 시스템의 안정성에 영향을 주지 않으면서 최신 버전의 그래픽 애플리케이션을 사용하고 싶을 때 사용.
이들의 특징을 표로 정리하면 다음과 같습니다.

| 특징 | APT (Advanced Packaging Tool) | Snap (스냅) | Flatpak (플랫팩) |
| --- | --- | --- | --- |
| **패키지 유형** | `.deb` 파일 | `.snap` 파일 | 독자적인 Flatpak 형식 |
| **기본 대상** | 배포판 자체 및 시스템 핵심 소프트웨어 | 데스크톱 앱, 서버, IoT | 데스크톱 GUI 애플리케이션 |
| **개발사/주도** | 데비안(Debian) | Canonical (Ubuntu) | Red Hat/GNOME |
| **종속성 관리** | **시스템 공유 라이브러리 사용** (의존성 충돌 발생 가능) | 패키지 내에 모든 종속성 포함 (번들) | 런타임 환경으로 관리, 공유 가능 (번들) |
| **운영 체제 의존성** | **특정 배포판 전용** (Debian, Ubuntu 등) | **범용** | **범용** |
| **샌드박스/격리** | **없음** (전체 시스템에 접근) | **있음** (AppArmor를 통해 격리) | **있음** (Bubblewrap을 통해 강력하게 격리) |
| **설치 위치** | 시스템 Root (`/usr`, `/bin` 등) | `/var/lib/snapd/snaps/` (Root 장치 사용) | 사용자 `~/.local/share/flatpak/`, 시스템 `/var/lib/flatpak/` |
| **장점** | 작은 크기, 빠른 실행 속도, 시스템 통합성 높음 | 범용성, 자동 업데이트, 보안 격리 | 범용성, 강력한 보안 격리, 최신 앱 제공 |
| **단점** | '의존성 지옥' 가능성 | 큰 패키지, 느린 시작 (콜드 스타트), 독점적인 백엔드 우려 | 큰 패키지 크기, 느린 시작 속도, 테마/시스템 통합 문제 발생 가능 |


## 1. APT (Advanced Packaging Tool) : **전통적인 기본 패키지 관리 시스템**
* **원리:**
* APT는 소프트웨어 패키지를 **`.deb`** 파일 형식으로 관리합니다.
* 패키지 관리자(APT)가 시스템의 중앙 저장소(Repository)에서 패키지 목록을 가져와 설치합니다.
* **가장 큰 특징은 종속성(Dependency)을 시스템에 이미 설치된 공유 라이브러리를 사용하여 해결한다는 점입니다.**

* **특징:**
* **시스템 통합:** 패키지가 시스템의 기본 디렉토리에 설치되어 운영 체제에 가장 잘 통합되며, 실행 속도가 빠릅니다.
* **효율적 크기:** 필요한 라이브러리를 시스템과 공유하기 때문에 개별 패키지 파일 크기가 작습니다.
* **안정성:** 배포판 제작자가 검증하고 관리하는 저장소를 사용하므로 시스템 안정성이 높습니다.
* **단점:** 배포판의 수명 주기(LTS 버전 등)에 묶여서 최신 버전 업데이트가 늦고, **의존성 충돌**(`Dependency Hell`)이 발생할 수 있습니다.


## 2. Snap (스냅)Snap **범용 패키지 관리 시스템**
* **원리:**
* Snap 패키지(`snap` 파일)는 **실행에 필요한 모든 라이브러리와 종속성을 자체적으로 포함**하는 독립 실행형 번들입니다.
* Canonical이 운영하는 **Snap Store**를 통해 이루어집니다.

* **특징:**
* **범용성:** 하나의 Snap 패키지로 다양한 리눅스 배포판에서 작동
* **샌드박싱 (격리):** 시스템의 나머지 부분과 격리된 안전한 환경(샌드박스)에서 실행
* **자동 업데이트:** 기본적으로 패키지가 자동으로 업데이트됩니다.
* **단점:** 모든 종속성을 포함하므로 패키지 크기가 크고, 처음 실행 시 느린 **콜드 스타트(Cold Start)** 현상이 있다.


## 3. Flatpak (플랫팩) **데스크톱 애플리케이션에 초점을 맞춘 범용 패키징 시스템**
* **원리:**
* Snap과 마찬가지로 모든 종속성을 패키지 내에 번들로 포함
* **런타임(Runtime)** 이라는 공유 환경을 사용하여 Snap보다 공간 효율성을 높였습니다
* 주요 저장소는 **Flathub**입니다.

* **특징:**
* **강력한 샌드박싱:** `Bubblewrap`이라는 기술을 사용하여 강력한 애플리케이션 격리 환경을 제공
* **개발자 친화적:** 개발자는 한 번 빌드한 패키지를 거의 모든 리눅스 데스크톱 사용자에게 배포할 수 있습니다.
* **단점:** 패키지 크기가 크고, 샌드박스 환경 때문에 시스템 테마나 설정과의 통합이 Snap보다도 떨어져 시각적인 이질감이 발생

<br/>

# 명령어 작업별 비교
## APT, Snap, Flatpak 명령어 비교표

| 작업 (Task) | APT (`.deb` / Debian, Ubuntu) | Snap (Canonical) | Flatpak (Flathub) |
| --- | --- | --- | --- |
| **패키지 검색** | `apt search [패키지명]` | `snap find [패키지명]` | `flatpak search [패키지명]` |
| **패키지 설치** | `sudo apt install [패키지명]` | `sudo snap install [패키지명]` | `flatpak install flathub [ID]` |
| **설치된 목록 확인** | `apt list --installed` | `snap list` | `flatpak list` |
| **패키지 제거** | `sudo apt remove [패키지명]` | `sudo snap remove [패키지명]` | `flatpak uninstall [ID]` |
| **전체 업데이트** | `sudo apt update` | `sudo snap refresh` | `flatpak update` |
| **특정 패키지 업데이트** | `sudo apt install --only-upgrade [패키지명]` | `sudo snap refresh [패키지명]` | `flatpak update [ID]` |
| **사용되지 않는 데이터 정리** | `sudo apt autoremove` | (자동 관리) | `flatpak uninstall --unused` |


## 명령어 상세 설명 및 주의사항
### 1. 패키지 설치 (`install`)
* **APT:** 시스템 전체에 설치되며, 관리자 권한(`sudo`)이 필수입니다.
* **Snap:** 기본적으로 관리자 권한(`sudo`)이 필요하며, 설치 후 즉시 사용 가능합니다.
* **Flatpak:**
* **ID** (예: `org.gimp.GIMP`)를 사용해야 합니다.
* `--user` 옵션을 사용하면 관리자 권한 없이 사용자 홈 디렉토리에 설치할 수 있습니다.
* `flathub`는 가장 일반적인 원격 저장소 이름입니다.

### 2. 설치된 목록 확인 (`list`)
* **APT:** `apt list --installed`는 시스템에 설치된 **모든** `.deb` 패키지를 표씨
* **Snap/Flatpak:** 설치된 애플리케이션 목록만 보여주므로 상대적으로 간결

### 3. 패키지 제거 (`remove`/`uninstall`)
* **APT:** `remove`는 패키지 파일만 제거하며, 설정 파일은 남긴다. (완전히 제거 `sudo apt purge [패키지명]`)
* **Snap/Flatpak:** 해당 애플리케이션과 관련 파일(사용자 데이터 제외)을 제거

### 4. 전체 업데이트 (`update`/`refresh`)
* **APT:**
  * `sudo apt update`: **저장소 목록**을 최신 상태로 갱신 (패키지 업그레이드는 하지 않음)
  * `sudo apt upgrade`: 갱신된 목록을 바탕으로 **실제 패키지**를 업그레이드
* **Snap:** `refresh` 목록 갱신 및 실제 업데이트가 모두 실행 (Snap은 기본적으로 백그라운드에서 자동 업데이트)
* **Flatpak:** `update` 명령 하나로 설치된 모든 앱과 런타임을 업데이트합니다.

<br/>

# 실제 실행 명령어 예시
```bash
$ flatpak list
Name         Application ID                        Version
OBS Studio   com.obsproject.Studio                 32.0.2 
Mesa         org.freedesktop.Platform.GL.default   25.2.6  
Kdenlive     org.kde.kdenlive                      25.08.3
```

```bash
snap list | grep firefox
snap info firefox
sudo snap refresh firefox --channel=candidate
```

```bash
dpkg -l | grep firefox\n
```