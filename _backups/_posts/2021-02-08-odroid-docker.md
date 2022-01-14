---
title : Odroid XU4 Setting
last_modified_at: 2021-08-10T10:45:06-05:00
header:
   overlay_image: /assets/images/project/single-board.jpg
categories:
  - nas
tags: 
    - nas
    - synology
---

Odroid XU4 의 저장용량과 ubuntu 20.04 로 업그레이드를 하면서, 처리속도 향상 및 Docker 의 활성화가 가능해 졌다. 이번에는 관련 내용들을 정리 해 보겠습니다.

[Root 설치 Script 파일](/assets/files/start_xu4.sh)




https://githubmemory.com/repo/gianlucaborello/libprocesshider/issues/4

## 

```r
apt-get install -y hdparm 
apt autoremove
sudo service hdparm stop
sudo nvim /etc/hdparm.conf
sudo service hdparm start
sudo hdparm -I /dev/sda1
cat /proc/sys/vm/swappiness
sudo hdparm -I /dev/sda1 | grep TRIM
sudo nvim /etc/fstab
```



1. DDNS, 포트 포워딩 없이도 서버를 활용 가능합니다.
2. GUI 기반의 시스템으로, 처음 사용하시는 분들이 쉽게 접근 가능합니다.
3. 시놀로지 패키지 가 잘 발달되어 있어 유용한 기능을 클릭 몇번 만으로 설치 및 활용 가능합니다.


작업 과정을 정리해 보겠습니다.


<br/>

## **Nas 서버의 설치 및 초기화**

**[DSM 설정 및 레이드 구성하기](https://hospital82.tistory.com/82?category=781321)** 내용을 참고하면 됩니다.

Synology 에서는 독립적인 운영체계로 **DSM** 을 활용하고 있습니다. 때문에 기기을 최초에 구입하고 서버를 실행하는 경우, 시스템 초기화 및 해당 운영체계의 설치 과정을 거쳐야만 사용 가능합니다.


## WebDAV 를 활용하여 NAS 접근하기

[WebDAV 를 활용하여 NAS 접근하기](https://www.synology.com/ko-kr/knowledgebase/DSM/tutorial/File_Sharing/How_to_access_files_on_Synology_NAS_with_WebDAV) 방법을 사용하면 공유 폴더 접근이 유용한 것을 알 수 있었습니다.