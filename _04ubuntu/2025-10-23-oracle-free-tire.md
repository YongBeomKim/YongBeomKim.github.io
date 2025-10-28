---
layout: blog
title: (Oracle) 무료계정 컨테이너 실행
tags:
- oracle
---

[Oracle Cloud](https://www.oracle.com/kr/cloud/free/) 는 무료계정을 생성하면 `2개 Linux Container` 를 생성할 수 있다. 계정과 컨테이너는 오래전에 만들었지만 사용하지 않고 있다가 노트북을 교체하면서 알게된 내용에 대하여 정리해 보겠습니다.

<br/>

# Oracle Cloud
## 계정생성 및 인스턴스 생성하기
[오라클 클라우드 평생 무료 서버 만들기 | 인스턴스 생성](https://newstroyblog.tistory.com/652) 와 같이 무료계정으로 클라우드 생성하는 내용을 참고하여 진행 합니다.

## 인스턴스 SSH 접속하기
생성된 인스턴스에 `ssh` 방식으로 접속 가능합니다. 추천하는 SSH 접속 방법은 개발자가 사용하는 Host 운영체계의 ssh token 을 Cloud Console 에서 설정값에 포함하면 됩니다.

이렇게 허용된 Host 에서 `ssh` 명령으로 접속하면 별도의 비밀번호 없이 바로 접속이 가능합니다. 아랫 내용은 추가할 개발자의 `ssh`를 추가하는 과정 입니다. 

1. Oracle Cloud 콘솔에서 - `인스턴스` 설정으로 이동 합니다
<figure class="align-center">
  <img
  width="650px"
  src="{{site.baseurl}}/assets/linux/oracle_console_00.jpg">
  <figcaption>클라우드 인스턴스 선택</figcaption>
</figure>

2. 현재 실행중인 또는 중단 중인 인스턴스 목록을 확인할 수 있습니다. 사용중인 인스턴스만 SSH 접속이 가능하기 때문에 현재 운영중인 인스턴스 중 접속을 허용할 인스턴스를 클릭 합니다
<figure class="align-center">
  <img
  width="650px"
  src="{{site.baseurl}}/assets/linux/oracle_console_01.jpg">
  <figcaption>실행중인 인스턴스를 선택한다</figcaption>
</figure>

3. 인스턴스 세부 설정 중 `콘솔 접속` 사용자 설정으로 이동 합니다.
- `컴퓨트 > 인스턴스 > OS관리 > 콘솔 접속 > 로컬 접속 생성`
<figure class="align-center">
  <img
  width="650px"
  src="{{site.baseurl}}/assets/linux/oracle_console_01.png">
  <figcaption></figcaption>
</figure>

4. 여러 방식 중 ssh Token 값을 입력하는 설정으로 이동해서 사용자를 추가하면 됩니다.
<figure class="align-center">
  <img
  width="650px"
  src="{{site.baseurl}}/assets/linux/oracle_console_02.jpg">
  <figcaption></figcaption>
</figure>

5. 인스턴스 기본 세부설정값 중 `인스턴스 액세스` 정보에서 접속 IP 주소와 계정이름을 확인합니다. 기본 사용자 이름은 `Ubuntu` 로 되어 있습니다. 해당 정보를 확인한 뒤 터미널에서 다음과 같이 접속을 테스트 하면 됩니다.
```bash
$ ssh ubuntu@111.222.333.444
Welcome to Ubuntu 22.04.4 LTS (GNU/Linux 6.8.0-1037-oracle x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 * Strictly confined Kubernetes makes edge and IoT secure. Learn how MicroK8s
   just raised the bar for easy, resilient and secure K8s cluster deployment.

   https://ubuntu.com/engage/secure-kubernetes-at-the-edge

This system has been minimized by removing packages and content that are
not required on a system that users do not log into.

To restore this content, you can run the 'unminimize' command.

Expanded Security Maintenance for Applications is not enabled.

62 updates can be applied immediately.
To see these additional updates run: apt list --upgradable

Enable ESM Apps to receive additional future security updates.
See https://ubuntu.com/esm or run: sudo pro status

New release '24.04.3 LTS' available.
Run 'do-release-upgrade' to upgrade to it.

Last login: Fri Oct 01 01:01:01 2000 from 44.33.22.111
ubuntu@<클라우드 인스턴스 이름>:~$ 
```

<br/>

# 참고사이트
[Always FREE VM Oracle Cloud](https://www.youtube.com/watch?v=uyuHSFo0QQo)