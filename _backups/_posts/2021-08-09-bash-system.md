---
title : BASH - Ubuntu System
last_modified_at: 2021-08-09T10:45:06-05:00
header:
  overlay_image: /assets/images/book/ubuntu.png
categories:
  - ubuntu
tags: 
    - ubuntu
    - bash
---

중국어가 포함된 file 을 삭제 작업을 하는경우, 한자 언어팩이 없다보니 입력이 안되는 문제가 발생하였습니다. <strike>야동 아닙니다.</strike> 그래서 궁여지책으로 활용한 방법이 **Regex** 를 bash shell 에서 활용하여 해당 파일 및 폴더를 삭제하는 방법을 찾아 해결하였고, 그 내용을 정리해 보겠습니다.

# Ubuntu

## System

```r
$ cat /etc/issue
Ubuntu 18.04.4 LTS \n \l

# CPU 정보
$ cat /proc/cpuinfo
$ cat /proc/cpuinfo | more
$ cat /proc/cpuinfo | grep name

# Memory
$ free
$ cat /proc/meminfo
```

## File & Folder

```r
# disk mount 확인
$ df -h --total

# 하위폴더 소유자 모두 변경
$ sudo chown -R user1:user1 /home/etc/test

# 마운팅 심볼릭 링크 설정 (Symbolic link)
$ sudo ln -s /data/python  /home/erdos

# 휴지통 비우기
$ cd .local/share/Trash/
$ cd files
$ rm -rf *
```


## 참고사이트
- [우분투 사양 확인](https://cornbro.tistory.com/10)
- [리눅스 파일 폴더 소유자 변경](https://itworld.gmax8.com/24?category=841166)
- [리눅스 폴더 마운트](https://complicated0idea.tistory.com/78)
