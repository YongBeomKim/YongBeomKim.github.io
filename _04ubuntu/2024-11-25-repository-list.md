---
layout: blog
title: (ubuntu) repository update 오류 해결
tags:
- nvidia
---

우분투 22.04 에서 업데이트를 실행하다가 다음과 같은 오류를 맞이하였습니다.
```bash
$ sudo apt update

Err:36 https://ppa.launchpadcontent.net/nathan-renniewaldock/flux/ubuntu jammy Release
  404  Not Found [IP: 185.125.190.80 443]
Get:39 https://download.konghq.com/insomnia-ubuntu default Release.gpg
Err:39 https://download.konghq.com/insomnia-ubuntu default Release.gpg
  Signed file isn't valid, got 'NODATA' (does the network require authentication?)
Reading package lists... Done
W: https://repo.whale.naver.com/stable/deb/dists/stable/InRelease: Key is stored in legacy trusted.gpg keyring (/etc/apt/trusted.gpg), see the DEPRECATION section in apt-key(8) for details.
E: The repository 'https://ppa.launchpadcontent.net/nathan-renniewaldock/flux/ubuntu jammy Release' does not have a Release file.
N: Updating from such a repository can't be done securely, and is therefore disabled by default.
N: See apt-secure(8) manpage for repository creation and user configuration details.
E: GPG error: https://download.konghq.com/insomnia-ubuntu default Release: Signed file isn't valid, got 'NODATA' (does the network require authentication?)
```

## [Fix on Ubuntu CLI](https://askubuntu.com/questions/43345/how-to-remove-a-repository)
오류가 발생한 업데이트 관련 파일들을 삭제하는 방법으로 해결 가능합니다.
```bash
$ cd /etc/apt/sources.list.d
$ sudo rm naver-whale.list

$ cd trusted.gpg.d
$ sudo rm naver-whale.**
```

[insomnia](https://docs.insomnia.rest/insomnia/install) 관련 파일은 `/etc/apt/sources.list.d` 폴더에서 관련 확인되지 않았습니다. 이런 경우에는 해당 서비스의 공식문서에서 관련 파일을 재설치 후 삭제작업을 진행하는 방법으로 해결 가능하였습니다.

설치 소스파일 설치하기
```bash
# Add to sources
curl -1sLf \
  'https://packages.konghq.com/public/insomnia/setup.deb.sh' \
  | sudo -E distro=ubuntu codename=focal bash

# Refresh repository sources and install Insomnia
sudo apt-get update
sudo apt-get install insomnia
```

프로그램 삭제 및 레포지토리 삭제하기
```bash
$ sudo apt purge insomnia
$ /etc/apt/sources.list.d
$ sudo rm insomnia.list
$ sudo rm kong-insomnia.list
```