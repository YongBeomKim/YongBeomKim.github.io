---
layout: blog
title: (TransMission) 설정하기
tags:
- ubuntu
---

실질적인 업데이트를 진행 하면서 기존에 설치된 `transmission` 패키지에 문제가 발생하였고, 업데이트가 중단 되었습니다.
```bash
chown: invalid group: ‘debian-transmission:debian-transmission’
 transmission-daemon
needrestart is being skipped since dpkg has failed
```

<br/>

# Errors were encountered while processing
## Remove Transmission Daemon
설정값을 백업한 뒤, `transmission-daemon` 을 제거 후 재설치 과정을 진행해 보겠습니다. 우선 설치된 모듈들을 확인해 보겠습니다.
```bash
$ dpkg --list | grep transmission
transmission-cli     lightweight BitTorrent client (command line programs)
transmission-common  lightweight BitTorrent client (common files)
transmission-daemon  lightweight BitTorrent client (daemon)
```

다음은 설치된 모듈을 삭제하는 내용 입니다.
```bash
$ sudo systemctl stop transmission-daemon.service 
$ dpkg --list | grep transmission
$ apt remove transmission-common -y
$ apt remove transmission-daemon -y
$ apt autoremove
$ sudo dpkg --purge transmission-daemon 
$ sudo rm -rf /etc/transmission-daemon
```

## Install Transmission-Daemon
깨끗한 환경에서 TransMission 을 설치과정을 진행해 보겠습니다.
```bash
$ sudo add-apt-repository ppa:ubuntuhandbook1/transmission
$ sudo apt update && sudo apt upgrade -y
$ sudo apt-get install transmission-cli transmission-common transmission-daemon
  chown: invalid group: ‘debian-transmission:debian-transmission’
  dpkg: error processing package transmission-daemon (--configure):
  Errors were encountered while processing:
    transmission-daemon
  needrestart is being skipped since dpkg has failed
  E: Sub-process /usr/bin/dpkg returned an error code (1)

$ transmission-daemon -V
  transmission-daemon 4.0.6 (38c164933e)
```

## Transmission daemon 실행 권한 변경
설치가 완료되면 기본값으로 `debian-transmission` 사용자 권한으로 데몬을 실행 합니다. 다운받은 파일의 권한도 `debian-transmission` 사용자로 지정되어 다른 사용자가 접근하기 어렵습니다. 지금부터는 원하는 사용자 권한으로 `transmission` 데몬을 실행하는 방법을 알아보도록 하겠습니다. 이번에는 사용자 이름을 `python` 으로 변경해 보겠습니다.
```bash
$ sudo cat /etc/init.d/transmission-daemon

#!/bin/sh -e
NAME=transmission-daemon
DAEMON=/usr/bin/$NAME
#USER=debian-transmission
USER=python
STOP_TIMEOUT=30
```

daemon service 실행명령 에서도 `USER` 이름이 `debian-transmission` 이름을 사용자가 원하는 이름으로 변경하고 저장 합니다.
```bash
$ sudo cat /lib/systemd/system/transmission-daemon.service
[Unit]
Description=Transmission BitTorrent Daemon
Wants=network-online.target
After=network-online.target

[Service]
User=python
Group=python
Type=notify
ExecStart=/usr/bin/transmission-daemon -f --log-level=error
ExecReload=/bin/kill -s HUP $MAINPID
NoNewPrivileges=true
MemoryDenyWriteExecute=true
ProtectSystem=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

```bash
➜  ~ cat /etc/default/transmission-daemon
# defaults for transmission-daemon
# sourced by /etc/init.d/transmission-daemon

# Change to 0 to disable daemon
ENABLE_DAEMON=1

# This directory stores some runtime information, like torrent files 
# and links to the config file, which itself can be found in 
# /etc/transmission-daemon/settings.json
CONFIG_DIR="/var/lib/transmission-daemon/info" 

# Default options for daemon, see transmission-daemon(1) for more options
OPTIONS="--config-dir $CONFIG_DIR"

# (optional) extra options to start-stop-daemon
#START_STOP_OPTIONS="--iosched idle --nicelevel 10"

```

```bash
nvim ~/.config/transmission-daemon/AutoRemove.sh
nvim ~/.config/transmission-daemon/settings.json
sudo service transmission-daemon stop
sudo service transmission-daemon status
sudo service transmission-daemon start
chown python:share /etc/transmission-daemon/settings.json
chown python:python /etc/transmission-daemon/settings.json
sudo chown python:python /etc/transmission-daemon/settings.jsonr
sudo chown -R python:python /etc/transmission-daemon/settings.json
sudo chown -R python:python /var/lib/transmission-daemon/info
```

OpenVPN 서버설치 및 운영작업에 대해 알아보도록 하겠습니다. 지금은 모든 작업이 자동으로 이루어 질 수 있도록 스크립트로 작성되어 있어서 어려움없이 설치 및 운영이 가능했습니다.

<br/>

# 참고사이트
- [우분투(Ubuntu) apt-get 저장소 변경하기](https://shshsh.tistory.com/60)
- [Snap과 Flatpak 비교](https://www.linuxadictos.com/ko/%EC%8A%A4%EB%83%85-%EB%B0%8F-%ED%94%8C%EB%9E%AB%ED%8C%A9.html)
- [The following packages have been kept back 원인과 해결 방법](https://crmn.tistory.com/161)
- [source.list 국내서버로 변경하기](https://nevaterms.tistory.com/3)
- [Transmission daemon 실행 권한 변경](https://orgio.tistory.com/245)
- [Transmission in Ubuntu 24.04/22.04 Server](https://ubuntuhandbook.org/index.php/2023/08/set-up-transmission-daemon-ubuntu-2204/)
- https://forum.transmissionbt.com/viewtopic.php?t=14836
- https://iseunghan.tistory.com/394
- https://askubuntu.com/questions/261252/how-do-i-change-the-user-transmission-runs-under
- https://discussion.fedoraproject.org/t/systemd-failed-to-start-transmission-daemon-service-unit-not-found/75196