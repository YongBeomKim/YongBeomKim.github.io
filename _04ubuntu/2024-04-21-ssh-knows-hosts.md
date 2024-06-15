---
layout: blog
title: SSH 접속 오류 ("Host key verification failed")
tags:
- ubuntu
---

리눅스는 ssh 접속할 때 상대방의 `RSA 키` 값을 저장 합니다. 사용자가 키값이 저장된 사이트를 접속 할 때 `RSA` 값을 확인하는데, 만약 키값이 변경되었음을 확인한 경우에는 다음의 오류 메세지를 출력 합니다.

```bash
$ ssh -p 8888 python@192.168.0.1
hostkeys_find_by_key_hostfile: hostkeys_foreach failed for 
/home/name/.ssh/known_hosts: Permission denied
The authenticity of host '[192.168.0.1]:8888 ([192.168.0.1]:8888)'
can't be established.

ED25519 key fingerprint is SHA256:abcdefg......
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Failed to add the host to the list of known hosts (/home/buffet/.ssh/known_hosts).
```

이를 수정하는 방법은 저장된 사이트의 `RSA` 키값을 제거 후 새로 접속을 진행하면 됩니다.

```bash
$ ssh-keygen -R 192.168.0.1
```

```bash
$ cd .ssh             
$ rm -rf known_hosts # 공개키 파일을 삭제하고 재접속 합니다. 
```

<br/>

# 참고사이트
- **[ssh 접속 연결시 Warning 메세지 출력하는 경우](https://hoyoung2.tistory.com/106)**
- **[How to Fix “host key verification failed” in SSH](https://kodekloud.com/blog/how-to-fix-host-key-verification-failed-in-ssh/)**