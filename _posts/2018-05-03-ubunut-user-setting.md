---
title : User Change - ubuntu
last_modified_at: 2018-05-01T12:45:06-05:00
header:
  overlay_image: /assets/images/book/ubuntu.jpg
categories:
  - ubuntu
---


# Ubuntu 사용자 변경

## root 사용자 변경하기 
```
$ sudo su
암호: 
root:#
```

```
root:# su - markbaum
markbaum@markbaum:
```

간단해 보이지만 계속 까먹어서 찾게되는 내용 중 하나다

<br>
## Terminal Shell 변경하기

### Bash 기본 Shell 로 되돌리기

```
$ sudo chsh -s /bin/bash  기본 Bash Shell로 되돌리기
$ chsh -s `which bash` 
```

### zsh와 oh-my-zsh의 설치와 사용법

```
$ sudo apt-get install zsh
$ chsh -s `which zsh`
```

$ sudo chsh -s /bin/bash  기본 Bash Shell로 되돌리기
$ chsh -s `which bash` 

`#`


erdos@odroid:~$ which zsh
/usr/bin/zsh
erdos@odroid:~$ which bash
/bin/bash
erdos@odroid:~$ 
