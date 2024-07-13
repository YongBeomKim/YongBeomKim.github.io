---
layout: blog
title: Apt GPG Error
tags:
- ubuntu
---

서버 Ubuntu 업데이트를 진행하면서 몇가지 문제가 발생하였습니다.
1. `$ apt update` 실행시 **<span style="color:green">GPG Error</span>** 오류
2. `$ apt upgrade` 실행시 **`Errors were encountered while processing`** 오류

<br/>

# GPG Error
우분투 패키지 설치방법으로 `apt, snap, flatpak` 등이 있습니다. `apt`는 일반적인 패키지 설치 명령어로 활용되고 있습니다. `snap` 은 앞의 설치방법으로 진행이 안될때, 별도의 저장소를 정의하지 않아도 손쉽게 설치 가능한 방법 입니다. `flatpak`는 `POP-OS shop` 및 `extensions.gnome.org` 등에서 모듈을 설치하는 방법 입니다.
```bash
$ apt list --upgradable
$ snap list
$ flatpak list
$ dpkg --list | grep python
```

## Apt Update
시스템에 관련된 내용들은 대부분 `apt`로 설치를 진행 했어서 `apt` 를 활용하여 업데이트를 진행하였습니다.
```bash
$ apt update
```

<div style="text-align: center;">
  <figure class="align-center">
    <img width="550" src="{{site.baseurl}}/assets/linux/gpg_error.png">
    <figcaption>GPG 오류예제</figcaption>
  </figure>
</div>

업데이트를 진행하던 중 다음과 같은 오류가 발생 했습니다. 원인은 업데이트를 지정한 PC 내부에 패키지 저장소 경로 자체가 잘못 되었거나, 호환되지 않은 저장소 주소가 등록되었을 때 발생합니다. 패키지 주소를 등록한 파일 및 폴더의 경로는 `/etc/apt/sources.list` 파일과 `/etc/apt/sources.list.d` 폴더 입니다. 오류가 발생한 경로를 해당 저장소에서 삭제 및 수정작업을 진행하면 해당 오류를 해결 가능합니다
```bash
$ /etc/apt# tree
├── sources.list
└── sources.list.d
    ├── google-chrome.list
    └── savoury1-ubuntu-ffmpeg4-jammy.list
```

## Apt Upgrade
문제를 해결한 뒤 업그레이드를 진행했을때, 다음과 같은 메세지를 출력했습니다.
```bash
$ apt upgrade 
  Reading package lists... Done
  Building dependency tree... Done
  Reading state information... Done
  Calculating upgrade... Done
  Get more security updates through Ubuntu Pro with 'esm-apps' enabled:
    redis-server redis-tools
  Learn more about Ubuntu Pro at https://ubuntu.com/pro
  The following packages have been kept back:
    python3-update-manager ubuntu-advantage-tools update-manager-core
  0 upgraded, 0 newly installed, 0 to remove and 3 not upgraded.
```

위 내용은 의존성 내용의 변경으로 인하여 새로운 패키지 추가를 필요로 한다는 것을 경고하는 내요 입니다. 위 메세지에는 3개의 추가 패키지를 필요로 하는데, 이 부분을 사용자가 고려하여 필요하다면 추가설치를 한 뒤 업데이트를 완료 가능하다는 것을 알려주는 내용 입니다. 해당 패키지들이 문제가 되지 않는다고 생각해서 추가설치를 하면 해당 메세지는 더이상 출력되지 않았습니다.
```bash
$ apt install python3-update-manager ubuntu-advantage-tools update-manager-core
```

<br/>

# 참고사이트
- [우분투(Ubuntu) apt-get 저장소 변경하기](https://shshsh.tistory.com/60)
- [Snap과 Flatpak 비교](https://www.linuxadictos.com/ko/%EC%8A%A4%EB%83%85-%EB%B0%8F-%ED%94%8C%EB%9E%AB%ED%8C%A9.html)
- [The following packages have been kept back 원인과 해결 방법](https://crmn.tistory.com/161)
- [source.list 국내서버로 변경하기](https://nevaterms.tistory.com/3)
