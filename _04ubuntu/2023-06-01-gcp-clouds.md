---
layout: blog
title: 구글 클라우트 플랫폼 with Free Tier
tags:
- cloud
---

평생무료 호스팅을 활용하는 방법으로 **[Oracle 의 Free Tier](https://www.oracle.com/kr/cloud/free/)** 와, `Google Cloud Platform` 에서 제공하는 **[free-cloud-features](https://cloud.google.com/free/docs/free-cloud-features?hl=ko#free-tier-usage-limits)** 가 있습니다. `AWS` 에서 제공하는 FreeTier 서버는 가입 후 12개월만 가능하고, 연장을 하기 위해서는 등록한 카드를 변경해야 가능 합니다.

이번 페이지는 구글 클라우드 가입 및 설정에 대해서 정리해 보겠습니다.

<br/>

# 인스턴스 관리
## 가입하기
구글 계정이 있으면 빠르게 가입할 수 있었습니다. 절차가 완료되면 개인에게는 $300 달러, 사업자 계정에게는 $400 달러 크레딧이 제공 됩니다. 대략 1년정도 사용해본 결과 개인계정으로 제공되는 $300 만으로도 충분 했었습니다.

## 인스턴스 생성 (Free Tier)

`Compute Engind >> VM 인스턴스`  

[무료 등급 사용량 한도](https://cloud.google.com/free/docs/free-cloud-features?hl=ko#free-tier-usage-limits) 조건에 맞게 생성하면 대략 `$6 ~ $7` 요금이 표시 됩니다. 이 요금은 차후에 할인받는 요금으로 무시하고 진행하면 됩니다. 보다 자세한 과정에 대한 설명은 [GCP 평생 무료 서버 구축](https://annealing.tistory.com/211) 을 참고합니다. 실제로 무료서버를 운영해본 결과 매월 대략 10월 정도의 요금을 지불하고 있습니다. 회사소개 또는 개인 포트폴리오 페이지를 운영하는 목적으로 활용하는 것을 추천 합니다.

유료로써 인스턴스틑 생성하는 방법은 앞의 과정에서 서버 Region 만 변경해 주면 됩니다. [GCPing](https://gcping.com/) 사이트를 접속하면, **<span style="color:var(--strong);">Google Cloud 의 Regions 들의 Ping 반응 속도</span>** 를 비교할 수 있습니다.

## Root 활성화 & 사용자 추가
가입 후, 인스턴스까지 생성하고 나면 서버에 접속 가능한 `계정`, `키값` 그리고 `서버 IP 주소` 를 확인할 수 있습니다. 고유한 키값을 활용하는 등 서버에 접속하기 까지 여러 과정들을 필요로 하는데, `ssh` 사용자 접속만으로 바로 접근할 수 있도록 설정내용을 변경해 보겠습니다.

```bash
$ sudo passwd root
$ sudo adduser `사용자이름`
$ sudo usermod -aG sudo `사용자이름`
$ sudo snap install nvim --classic
```

Ubuntu 22.04 버전에서 실행 가능한 스크립트 입니다. 처음 우분투를 설치한 뒤에는 `Root` 계정은 존재 하지만 비밀번호가 생성되지 않아서 비 활성화된 상태 입니다. 위 내용처럼 비밀번호를 추가 함으로써 활성화가 됩니다.

그리고 서버에서 활용할 **추가 사용자** 계정을 생성합니다. `Root` 계정으로 작업을 진행하면 설정 내용에 문제가 발생하거나 변경할 때 시스템 전체를 재설치 해야만 해결가능하다는 문제가 생깁니다. 때문에 꼭 추가 사용자를 생성한 뒤에 이 다음 단계들을 진행 하도록 합니다. `사용자이름` 에 들어갈 내용은 영문과 숫자로 구성하면 됩니다. 이렇게 **추가 사용자** 를 생성한 뒤에, sudo 로 Root 계정 명령들을 실행할 수 있도록 추가하면 계정관련 내용은 종료 됩니다.

## sshd_config

`Compute Engind >> VM 인스턴스 >> ssh 접속`

`sshd` 설정 파일을 열고 다음의 내용들을 수정, 추가한 뒤 재부팅을 하고 나면 모든 과정이 종료 됩니다. 이후부터는 `ssh 사용자이름@아이피주소` 를 터미널에 입력한 뒤 계정의 비밀번호를 입력하면 해당서버에 바로 접속이 가능해 집니다.

```bash
$ sudo nvim /etc/ssh/sshd_config
#PermitRootLogin prohibit-password
PermitRootLogin yes
# PasswordAuthentication no
PasswordAuthentication yes
```

<p style="text-align: center">
<figure class="align-center">
  <img width=450
    src="{{site.baseurl}}/assets/linux/gcp-ssh-setting.png">
  <figcaption>Root / 일반 사용자 SSH 접속권한 추가</figcaption>
</figure>
</p>


## 서버상태 확인하기
무료 인스턴스를 생성하면 특히 메모리 크기가 작아서 동작이 느린 상황을 자주 접하게 됩니다. [Swap](https://yeon-kr.tistory.com/174) 설정을 추가하면 조금 더 무거운 프로그램도 운영할 수 있습니다.

## 방화벽 옵션의 추가

`VPC 네트워크 >> 방화벽`

인스턴스 밑의 `방화벽 규칙 설정` 클릭하면 Port 옵션을 수정/ 보완 할 수 있습니다. 메뉴에서 '[방화벽 규칙 만들기](https://kibua20.tistory.com/96)' 를 선택하고 상세 내용들을 추가 합니다.

1. '방화벽 규칙 만들기' 선택
2. 방화벽 이름 지정
3. 트래픽 방향: 외부에서 GCP 접근하는 '수신'을 선택 (수신 (Inbound) 또는 송신 (Outbound))
4. 소스 범위 선택: 모든 IP를 허용하는 경우에는 '0.0.0.0/0' 입력
5. 프로토콜과 포트 선택: TCP, UDP의 포트를 지정 (Flask는 TCP에 5000번 입력)

<p style="text-align: center">
<figure class="align-center">
  <img width="700" src="{{site.baseurl}}/assets/linux/gcp-firewall1.png">
  <figcaption>방화벽 내용</figcaption>
</figure>
</p>

<p style="text-align: center">
<figure class="align-center">
  <img  width="700"  src="{{site.baseurl}}/assets/linux/gcp-firewall2.png">
  <figcaption>상세 설정내용 변경</figcaption>
</figure>
</p>

<br/>

# SQL 서버관리
자체 서버 내부에 DB를 설치하고 운영을 하면, 하드디스크와 메모리 리소스를 추가로 필요로 하여 서버과금제도에 있어서 불리해 질 수 있습니다. 서버 활용도가 높을수록 별도 SQL 서버를 생성하여 활용하는 방법을 추천 합니다.

## Amazon Aurora I/O-Optimized 클러스터
[Amazon Aurora I/O-Optimized 클러스터 구성- I/O 집약적 애플리케이션](https://aws.amazon.com/ko/blogs/korea/new-amazon-aurora-i-o-optimized-cluster-configuration-with-up-to-40-cost-savings-for-i-o-intensive-applications/) 은 23년 5월 부터 AWS 에서 Mysql, PostgreSQL 을 활용하는데 효과적인 설정으로 안내를 하고 있습니다.

## [공개 IP 구성](https://cloud.google.com/sql/docs/postgres/configure-ip?authuser=1)

`SQL >> 개요 >> 연결 >> 승인된 네트워크`

- [Compute Engine에서 PostgreSQL용 Cloud SQL 연결](https://cloud.google.com/sql/docs/postgres/connect-instance-compute-engine?hl=ko)

SQL 은 <span style="color:var(--strong);">공개 IP 설정 만으로는 외부에서 접속을 할 수 없습니다.</span> 공개 IP 설정은 연결값만 할당하는 것이고, 공개 IP를 통해서 접속 가능한 <span style="color:var(--strong);">승인된 네트워크를 추가로 설정</span> 해야 합니다. 아무나 접속 가능하도록 설정하기 위해서는 허용되는 네트워크로 `0.0.0.0/0` 을 추가하면 됩니다. 대신 아래의 그림처럼 경고 메세지가 출력 됩니다.

<p style="text-align: center">
<figure class="align-center">
  <img width="750" src="{{site.baseurl}}/assets/linux/gcp-sql-ip.png">
  <figcaption>승인된 네트워크 IP 주소값 추가시 경고</figcaption>
</figure>
</p>

## GCP 에서 SQL 인스턴스 생성내용은 다음의 동영사을 참고 합니다.
데이터베이스 만을 위한 인스턴스를 생성합니다. 기본 설정값은 `4 cpu, 26Gb` 를 적용하여 비용이 과다하게 청구될 수 있는만큼 아래의 동영상에 맞춰서 `1 cpu 3.6Gb` 등으로 변경하면 불필요한 지출을 줄일 수 있습니다.

<p style="text-align: center">
<iframe 
  width="560" height="315" 
  src="https://www.youtube.com/embed/uMgkCwNQrIg?start=187" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>
</p>

<br/>

# 도메인 추가
## [무료 도메인 추가하기](https://blog.naver.com/wonjinho81/222681679087)
- [내도메인.한국](https://내도메인.한국/)
- [freenom](https://www.freenom.com/en/index.html?lang=en)

검색을 하다보면 무료도메인 대표 사이트로 위 2가지가 자주 언급 됩니다. `FreeNom` 은 사용 및 가입하기가 까다로워서 [Freenom 무료 도메인 발급과 회원가입 방법](https://carpet-part1.tistory.com/676) 을 참고해서 진행해야 합니다. 

둘 중에는 [내도메인.한국](https://내도메인.한국/) 을 추천합니다. 한글로 운영되고 있고, 가입 및 고객응답이 잘 정리되어 있어서 훨씬 편리했습니다. 도메인은 좀 지저분한 내용으로 제공되고 있지만 사용 및 관리가 용이한 만큼 여기를 추천 합니다.

<br/>

# (참고) Naver Cloud

네이버 클라우드는 Ubuntu 18.04 까지만 현재 지원하고 있습니다. 때문에 Python 은 3.6 버젼이고, Nginx 은 설정값을 추가해야만 정상적인 설치 작업이 진행 됩니다.

- [Naver Cloud 콘솔 메뉴얼](https://www.ncloud.com/)
- [Naver Cloud AAG(보안설정) 등 기초설정 방법](https://m.blog.naver.com/nieah914/221609709142)
- [Naver Cloud Nginx 설치 및 포트포워딩](https://prohannah.tistory.com/84)
- [Naver Cloud 서버 반납하기](https://growingsaja.tistory.com/325)
