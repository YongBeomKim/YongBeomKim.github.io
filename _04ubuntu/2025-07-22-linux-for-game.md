---
layout: blog
title: Linux for Game
tags:
- ubuntu
---

`2tb HDD`를 구매했고, 무었보다 현재 사용중인 `Pop-OS` 가 ubuntu 24 를 아직 지원하지 않음으로 인하여 Kernel 이 약간 꼬여있는 상황과 함께, 화면보호시 전원관리가 잘 안되는 문제 등 여러가지 최신 드라이버 업데이트에 문제가 있음을 느끼고 있습니다. 

특히 한글입력기에 대하여 불편함을 느끼고 있습니다. `Tian` 이라는 한글 입력기를 사용하고 있었지만 현재는 업데이트 및 사후관리가 되고 있지 않아서 `fcitx5` 으로 교체를 하여야 겠다고 생각하고 있는등 여러가지 상황으로 인하여 새로운 운영체계 설치가 필요한 상황 입니다.

[DistroWathch 의 Linux Ranking](https://distrowatch.com/) 를 보면 최근에는 `CachyOS` 가 떠오르고 있습니다. 하지만 Arch 리눅스 특성상 업데이트를 빈번하게 요구하고 있어서 관리에 어려움이 있고, 대신 `Steam Epic Game` 를 보다 원할하게 실행하기에 `Steam OS`를 활요하는 내용들이 많은 것을 알 수 있었습니다. 때문에 양덕들에게 관심을 많이 받고 있는것을 알 수 있었습니다. 실제 개발을 위한 내용보다는 `Handheld Gaming PC` 를 보다 쾌적하게 활용하기 위한 것으로 보여서 개발 작업에는 적합하지 않았습니다.

가장 사용자가 많은 Debian 과 Ubuntu 중 하나를 선택하는것이 필요하다고 결론 내렸습니다. 위에서 살펴본 것처럼 Epic / Steam Game Launcher 를 Linux 환경에서 설치하기 위해서는 `CachyOS, EndeavourOS`에 최적화 되어 있지만, Debian 과 Ubuntu 중 하나를 선택하라면 현재는 `Ubuntu 24.04` 가 가장 적합하다는 결론을 내렸습니다. [Pop!_OS 22.04 vs Ubuntu 24.04](https://www.reddit.com/r/pop_os/comments/1hobhx4/pop_os_2204_vs_ubuntu_2404/) 내용을 보면, Ubuntu 24 LTS 가 2024년 3월에 릴리즈 되었음에도 2025년 7월 현재까지도 `Pop OS` 의 `Ubuntu 24` 정식버젼이 제공되고 있지 않고 있고 안정적이지도 못해서 이번에는 제외하고 정식 Ubuntu 24 를 설치해 보겠습니다.

# Ubuntu 24 설치하기
Gnome 과 plasma 5 를 비교하면 다음과 같다. 이번에는 가볍고 안정적인 운영체계를 추구하기 위해서 [Kubuntu](https://distrowatch.com/table.php?distribution=kubuntu) 를 설치해 보겠습니다. 그러다가 나무위키 문서와 검색을 한 결과, 보다 더 경량화 버전인 [Lubuntu](https://lubuntu.me/) 로 결정하게 되었습니다.


| 항목          | **GNOME**            | **Xfce**       | **LXQt**            |
|             | **Ubuntu**            | **Xubuntu**    | **Lubuntu**         |
| ----------- | -------------------- | --------------- | ------------------- |
| **기반**     | GTK                  | GTK             | Qt                  |
| **시스템 요구**| 높음 (2GB+ RAM)      | 중간 (1\~2GB RAM) | 낮음 (512MB\~1GB RAM)|
| **UI/UX**   | 모던, 세련됨              | 클래식, 직관적        | 최소화, 단순함            |
| **애니메이션**   | 있음 (많음)              | 적음              | 거의 없음               |
| **확장성**     | 매우 좋음 (`extensions`) | 기본 수준           | 제한적                 |
| **속도/가벼움**  | 느림                   | 빠름              | 매우 빠름               |
| **전력 소모**   | 높음                   | 중간              | 낮음                  |
| **개발자 친화도** | 좋음 (Tool 다양)         | 좋음              | 제한적                 |
| **권장 사용처**  | 최신 하드웨어, 데스크탑        | 노트북/중간 사양 PC    | 구형 PC, 경량 서버        |




| 항목             | **GNOME**                             | **Plasma 5 (KDE)**                    |
| -------------- | ------------------------------------- | ------------------------------------- |
| **개발 언어**      | GTK (C + JS)                          | Qt (C++ 기반)                           |
| **리소스 소비**     | GNOME 45~~46 기준 RAM 1.2~~1.6GB        | Plasma 5는 600\~900MB로 가벼움             |
| **성능**         | 다소 무거우나 최적화 개선 중                      | 매우 가볍고 빠름 (특히 최신 버전)                  |
| **커스터마이징**     | 제한적 (확장 설치 필요)                        | 거의 모든 요소 조정 가능                        |
| **설정 메뉴**      | 단순화된 설정 창                             | 매우 상세하고 다양한 설정 제공                     |
| **애니메이션**      | 부드럽지만 적음                              | 다채롭고 화려함, 비활성화 가능                     |
| **기본 앱**       | GNOME 앱군 (Nautilus, GNOME Terminal 등) | KDE 앱군 (Dolphin, Konsole, Kdenlive 등) |
| **Wayland 지원** | 기본 사용 (Ubuntu, Fedora 등)              | 최근 Plasma 5.27+에서 Wayland 안정화됨        |
| **대중성**        | Ubuntu, Fedora 등 기본 탑재                | Kubuntu, KDE Neon, openSUSE 등         |
| **프로젝트 철학**    | “Less is more”, 일관된 UX                | “Let the user choose”, 유연함            |




plasma 5
- [Ubuntu 24.04.2 LTS가 Linux Kernel 6.11로 구동되는 다운로드 가능](https://svrforum.com/itnews/2141583)

Deep Learning 및 Game Play 에 적합한 Ubuntu flavors 버젼은 ?
| Flavor            | 게임 최적화 요소                                      |
| ----------------- | ---------------------------------------------- |
| **Kubuntu**       | KDE는 GPU 프렌들리, 화면 찢김/딜레이 적음                    |
| **Ubuntu**        | Steam Deck/Proton 공식 지원, GNOME은 다소 무겁지만 호환성 우수 |
| **Pop!\_OS**      | Vulkan + Steam + Lutris 세팅 미리 지원               |
| **Ubuntu Budgie** | GNOME보다 가볍고 심플, 게임용으로 쾌적한 UI                   |

| Flavor             | RAM Idle | GPU 드라이버 호환성 | Vulkan/Steam | ML 툴 설치    |
| ------------------ | -------- | ------------ | ------------ | ---------- |
| **Kubuntu**        | \~800MB  | ✅ 우수         | ✅ 매우 우수      | ✅ 문제 없음    |
| **Ubuntu**         | \~1.4GB  | ✅ 공식 지원      | ✅ 매우 우수      | ✅ 매우 풍부    |
| **Pop!\_OS**       | \~1.2GB  | ✅ NVIDIA 최적화 | ✅ 매우 우수      | ✅ 사전 설정 우수 |
| **Budgie/Xubuntu** | \~600MB  | ◼️ 제한적 UX    | ✅ 사용 가능      | ✅ 수동 설치 필요 |


# Plasma 5 (KDE) Toolkit 설치 <strike>GNOME ToolKits 설치하기</strike>
- KDE Latte Dock
- Cairo Dock

```bash
sudo apt update
sudo apt install fcitx5 fcitx5-hangul
```

# [Top 10 Best Game Launcher in Linux in 2025](https://theserverhost.com/blog/post/top-10-game-launcher-in-linux)
1. Heroic Games Launcher
1. Lutris
1. Bottles
1. Steam
1. GameHub
1. Itch.io App
1. RetroArch
1. PlayOnLinux
1. Minigalaxy
1. PortProton

# 게임 최적화를 위한 Vulkan, Proton-GE, FPS 오버레이 설정법