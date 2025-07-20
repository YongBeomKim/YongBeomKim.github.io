---
layout: blog
title: (SSH) 접속 오류 (known_hosts Permission denied)
tags:
- ubuntu
---

리눅스는 ssh 접속할 때 상대방의 `RSA 키` 값을 저장 합니다. 사용자가 키값이 저장된 사이트를 접속 할 때 `RSA` 값을 확인하는데, 만약 키값이 변경되었음을 확인한 경우에는 다음의 오류 메세지를 출력 합니다.

```bash
$ scp -P 1234 .env username@site.kr:/home/name/website 

hostkeys_find_by_key_hostfile: 
  hostkeys_foreach failed for /home/name/.ssh/known_hosts: 
Permission denied The authenticity of host 
  '[mrmarket.kr]:4811 ([100.123.100.12]:1234)' 
can't be established.
ED25519 key fingerprint is SHA256:asdbasdf23431532...
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
```

## 원인 정리
- `scp`는 처음 연결하는 호스트의 공개키를 `~/.ssh/known_hosts`에 저장하려고 합니다.
- 그러나 해당 파일에 **쓰기 권한이 없거나** 상위 디렉토리에 대한 **접근 권한이 부족**하면 오류가 발생합니다.
- `Failed to add the host to the list of known hosts`, `Permission denied`, `hostkeys_foreach failed` 등의 메시지가 나타납니다.

## 해결 방법
`.ssh` 디렉토리와 `known_hosts` 파일에 올바른 권한을 부여해, `scp`나 `ssh`에서 호스트 키를 기록할 수 있도록 `.ssh/known_hosts` 파일 및 디렉토리 권한 수정합니다.
```bash
cd ~/             # 홈 디렉토리로 이동
ls -ld ~/.ssh     # .ssh 디렉토리 존재 확인
chmod 700 ~/.ssh  # 권한이 잘못되었으면 수정
chown $(whoami):$(whoami) ~/.ssh

# known_hosts 파일 존재 여부 확인
ls -l ~/.ssh/known_hosts

# 권한이 잘못되었으면 수정
touch ~/.ssh/known_hosts       # 파일이 없다면 생성
sudo chmod 600 ~/.ssh/known_hosts
sudo chown $(whoami):$(whoami) ~/.ssh/known_hosts
```

## 따르게 해결하려면 아래 명령어를 실행하면 됩니다.
```bash
sudo chmod 700 ~/.ssh
sudo chmod 600 ~/.ssh/known_hosts
sudo chown $(whoami):$(whoami) ~/.ssh ~/.ssh/known_hosts
```

<br/>

# 기존의 해결방법 정리 (2023년 버젼)
```bash
$ ssh -p 8888 python@mrmarket.kr
hostkeys_find_by_key_hostfile: hostkeys_foreach failed for 
/home/name/.ssh/known_hosts: Permission denied
The authenticity of host '[mrmarket.kr]:8888 ([123.234.34.5]:8553)'
can't be established.

ED25519 key fingerprint is SHA256:abcdefg......
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Failed to add the host to the list of known hosts (/home/buffet/.ssh/known_hosts).
```

이를 수정하는 작업하는  방법은 저장된 사이트의 `RSA` 키값을 제거 후 새로 접속을 진행하면 됩니다. 위 내용과 같이 포트값을 특정한 경우에는 포트까지 함께 포함하여 작업을 진행하면 됩니다.

```bash
$ sudo ssh-keygen -f "/home/buffet/.ssh/known_hosts" -R "[mrmarket.kr]:8553"

# Host [mrmarket.kr]:8553 found: line 19
# Host [mrmarket.kr]:8553 found: line 20
# Host [mrmarket.kr]:8553 found: line 21
/home/buffet/.ssh/known_hosts updated.
Original contents retained as /home/buffet/.ssh/known_hosts.old
```

포트값을 특정하지 않고 기본값을 활용한 경우는 다음과 같이 작업을 진행하면 됩니다.
```bash
$ ssh-keygen -R mrmarket.kr
$ cd .ssh             
$ rm -rf known_hosts # 공개키 파일을 삭제하고 재접속 합니다. 
```

<br/>

# 참고사이트
- **[ssh 접속 연결시 Warning 메세지 출력하는 경우](https://hoyoung2.tistory.com/106)**
- **[How to Fix “host key verification failed” in SSH](https://kodekloud.com/blog/how-to-fix-host-key-verification-failed-in-ssh/)**