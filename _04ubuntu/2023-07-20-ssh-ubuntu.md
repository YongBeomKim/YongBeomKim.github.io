---
layout: blog
title: SSH in Ubuntu
tags: 
- blog
---

서비스를 제작하다 보면 **서버 인스턴스의 교체** 및 **도메인 변경작업** 을 진행하다보면 자주 서버정보가 변경될 수 밖에 없고 다음과 같은 메세지 **<span style="color:var(--comment);">WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!</span>** 를 마주하게 됩니다. 이러한 상황에 처했을 때 어떤 내용이 문제가 되고 해결방법은 어떤 방법이 있는지 알아보도록 하겠습니다

```bash
$ ssh root@site.com

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ED25519 key sent by the remote host is
SHA256:ztpS5WR/MPNXkQZK93WY/pcxOXDrFvxS4xI4n+t6g4w.
Please contact your system administrator.
Add correct host key in /home/user/.ssh/known_hosts to get rid of this message.
Offending ED25519 key in /home/user/.ssh/known_hosts:32
  remove with:
  ssh-keygen -f "/home/user/.ssh/known_hosts" -R "site.com"
Host key for site.com has changed and you have requested strict checking.
Host key verification failed.
```

<br/>

# WARNING
**<span style="color:var(--comment);">ED25519</span>** 는 암화화 기술로, 각각의 도메인 주소와 보안정보가 `/home/user/.ssh/known_hosts` 에 저장되어 있고, 현재 접속하려는 사이트의 정보가 해당 파일의 내용과 불일치 하다는 내용 입니다.

## /home/user/.ssh/known_hosts
`/home/user/.ssh/known_hosts` 파일의 32번째 줄에 정보가 기록되어 있는데 내용을 살펴 보면 다음과 같이 암화화된 정보가 저장되어 있음을 알 수 있습니다.

```bash
|1|85KN0cFAPkIp/IYBh52GDKZ+Jjc=|H9GaoQBEa9mOgmPTbrVNXNVhIbc=ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDmjQtI3WCkvxazrA/qDtoKw/8SMVfRDRKY04ChvY4Ik
```

위 메세지에서 지시한 대로 해당기록을 삭제해 보겠습니다.

```bash
$ ssh-keygen -f "/home/user/.ssh/known_hosts" -R "site.com"

# Host site.com found: line 32
/home/user/.ssh/known_hosts updated.
Original contents retained as /home/user/.ssh/known_hosts.old
```

이렇게 삭제가 되었으면 다시 해당 사이트에 접속해 보겠습니다.

```bash
$ ssh root@tock.kro.kr                                     

The authenticity of host 'tock.kro.kr (34.64.95.198)' can't be established.
ED25519 key fingerprint is SHA256:ztpS5WR/MPNXkQZK93WY/pcxOXDrFvxS4xI4n+t6g4w.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'tock.kro.kr' (ED25519) to the list of known hosts.
root@tock.kro.kr's password: 

Welcome to Ubuntu 22.04.2 LTS (GNU/Linux 5.19.0-1030-gcp x86_64)
```

사이트 정보가 정상적으로 업데이트 된 것을 보실 수 있습니다.

<br/>

# Permission Denied
이처럼 `.ssh` 접속 정보는 우분투 사용자 마다 각각 관리되고 있어서, 동일한 서버라도 다른 사용자 정보로 접속한 경우 위와같은 과정을 반복해야 하는 번거로움이 있습니다.

때문에 위 과정에 대해서 실수로 `sudo` 명령으로 수정작업을 진행한 경우에는 수정된 정보로 접속하려는 경우 **Permission Denied** 오류를 출력하는 문제가 발생합니다. 이때에는 2번째 명령어를 실행하여 관리파일 권한을 수정한 뒤 앞의 작업을 진행하면 됩니다.

```bash
$ sudo ssh-keygen -f "/home/user/.ssh/known_hosts" -R "34.64.138.200"
$ sudo chown -v $USER ~/.ssh/known_hosts
```


<br/>

# 참고사이트
- [Window에 Git세팅하기 (window terminal 설치)](https://kangdanne.tistory.com/215)
- [GitLab 윈도우 개발환경에서 SSH Key 등록하기](https://wylee-developer.tistory.com/54)
- [파이썬 가상환경 만들기 - window](https://velog.io/@tls0506/Windows-Python-%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95-venv-%EA%B0%80%EC%83%81-%ED%99%98%EA%B2%BD-formattor-linter)