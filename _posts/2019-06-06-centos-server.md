---
title : CSS Flexible
last_modified_at: 2019-06-06T15:45:06-05:00
header:
  overlay_image: /assets/images/book/centos.jpg
categories:
  - linux
tags: 
    - linux
    - centos
toc: true    
---

웹서비스를 준비하면서 서버 Host 를 신청하게 되었습니다. AWS 와 Google 모두 12개월 무료신청 서비스를 제공하고, 대부분이 **CentOS** 로 되어 있다는 이야기를 듣고 이번 기회에 **CentOS** 관련 내용을 정리를 해 보겠습니다.

<br/>
# 리눅스 확인

## 리눅스 정보 확인

여러가지 방법이 있지만 가장 보편적인 접근방법으로 터미널에서 `cat /etc/*release*` 를 입력 합니다. 그리고 우분투 bit 를 확인하는 명령은 `getconf LONG_BIT` 입니다. 

```php
[user@localhost ~]$ su
암호:

[root@localhost ~]# cat /etc/*release*
CentOS Linux release 7.3.1611 (Core) 
Derived from Red Hat Enterprise Linux 7.3 (Source)

[root@localhost ~]# getconf LONG_BIT
64

[root@localhost ~]# exit
[user@localhost ~]$ su
```
**$ su** 를 입력하면 관리자 계정으로 로그인 됩니다. 별도의 **sudo** 입력이 없어도 관리자 내용을 입력 및 실행 가능합니다. 관리자 계정 변경이 성공하면 터미널 앞의 표시가 **$** 에서 **#** 로 변경 됩니다.
{: .notice--info}


## **scp** 파일 이동

기본 Port 가 아닌 제공하는 포트를 사용하는 경우 작업 방법 입니다.

```php
$ scp -P 포트번호 *.mp4  /home/user/Download/
```

<br/>
# 사용자 추가

## 터미널에서 추가, 삭제

```javascript
[root]# useradd python
[root]# passwd python
erdos 사용자의 비밀 번호 변경 중
새  암호: 
새  암호 재입력:
passwd: 모든 인증 토큰이 성공적으로 업데이트 되었습니다.

[root]# userdel python
[root]# rm -rf /etc/python
```
사용자를 추가 후 비밀번호를 입력해야 작업이 완료 됩니다. 사용자 폴더는 위 작업과 별도로 `/home/python` 폴더를 수동으로 삭제 해야 합니다.


<figure class="align-center">
  <img src="http://www.onextrapixel.com/wp-content/uploads/2013/04/flexbox-elements.jpg" alt="">
  <figcaption>donut-example</figcaption>
</figure>
