---
layout: blog
title: Cloudflare Tunnel로 홈서버 운영
tags:
- dns
---

사무실에 연결된 Ubuntu 서버는 외부 IP접속이 제한되어 있습니다. 공유기에 연결된 외부 아이피 주소가 172.16.0.0 ~ 172.31.255.255 범위인 경우는 사설 IP(Private IP) 입니다. 현재의 공유기 앞단에 별도의 공유기가 외부 IP와 연결되어 있을 확률이 높습니다. 앞단의 공유기 설정에서 열어주지 않는 한 공유기 설정으로는 해결이 불가능 합니다.

<br/>

# CloudFlare Tunnel
* 작업내용
  - 사용자 가입 및 로그인
  - Add Tunnel

Ubuntu 22 환경의 서버를 기준으로 작업을 진행하겠습니다. 가장 추천되는 방법이 [CloudFlare Tunnel](https://dash.cloudflare.com/) 의 DNS 연결기능을 활용하는 방법 입니다. 각각의 개념에 대한 내용 및 진행과정에 대한 설명은 [Cloudflare Tunnel로 포트포워딩 없이 홈서버 운영하기](https://blog.aqudi.me/cloudflare-tunnel-home-server-without-port-forwarding) 블로그를 참고합니다.

2026년 2월에 위 블로그 내용을 참고하여 진행을 하다보면, 웹 페이지의 구성 및 UI 구조가 몇몇 바뀌어 있는것을 알 수 있습니다. 작업 진행과정을 살펴보겠습니다.

## 1 Cloudflare Tunnel 생성하기
서버에 `Cloudflare Tunnel Client` 를 생성 보겠습니다. [Dash Cloudflare](https://dash.cloudflare.com/) 에 가입합니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="820px" src="{{site.baseurl}}/assets/linux/cloudtunnel_00_login.jpg">
  </p>
  <figcaption></figcaption>
</figure>

`Network >> Connectors` 로 이동해서 `CloudFlare Tunnel` 생성을 시작합니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="820px" src="{{site.baseurl}}/assets/linux/cloudtunnel_01_init.jpg">
  </p>
  <figcaption></figcaption>
</figure>

<figure class="align-center">
  <p style="text-align: center">
  <img width="820px" src="{{site.baseurl}}/assets/linux/cloudtunnel_02_select.jpg">
  </p>
  <figcaption></figcaption>
</figure>

설정을 완료하면 아래와 같이`Install and run a connector` 에서 Host 서버에 설치가능한 스크립트를 알려줍니다. 단계별로 `Cloudflare` 를 설치하고, Cloudflare 에서 제공한 고유값을 활용하여 Host 서버 설정을 완료합니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="820px" src="{{site.baseurl}}/assets/linux/cloudtunnel_03_ubuntu.jpg">
  </p>
  <figcaption></figcaption>
</figure>

앞의 설정 과정을 완료하면 `Network >> Connectors` 에서 `Cloudflare Tunnels` 탭을 선택하면 아래와 같이 설정이 완료된 것을 확인할 수 있습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="820px" src="{{site.baseurl}}/assets/linux/cloudtunnel_04_connects.jpg">
  </p>
  <figcaption></figcaption>
</figure>

## 2 Domain 연결하기
[dash.cloudflare](https://dash.cloudflare.com/) 의 `계정 홈` 에서 서비스와 연결할 `도메인` 을 추가해보겠습니다. 무료계정을 사용해 보겠습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="820px" src="{{site.baseurl}}/assets/linux/cloudtunnel_05_domain1.jpg">
  </p>
  <figcaption></figcaption>
</figure>

## 3 Domain 의 DNS 값 확인 및 변경
사용자가 추가한 도메인의 `상세 DNS 값`을 아래와 같이 자동으로 불러오는 것을 확인할 수 있습니다. 아직은 `Cloudflare Tunnel` 과 관련한 값이 연결되어 있지 않은 상태입니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="820px" src="{{site.baseurl}}/assets/linux/cloudtunnel_06_dns.jpg">
  </p>
  <figcaption></figcaption>
</figure>

해당 페이지의 아래를 내려보면 `Cloudflare` 와 연결가능한 주소값을 제공하고 있습니다. 이 내용을 복사하여 도메인 발급서비스에 `네임서버/DNS` 를 추가 합니다.
```bash
> Cloudflare 이름 서버
>> Cloudflare의 모든 DNS 영역에는 Cloudflare 브랜드 이름 서버 집합이 할당됩니다.

형식	값
NS	xxxxxxx.ns.cloudflare.com
NS	zxxx.ns.cloudflare.com
```

다음의 사진은 [Hosting.kr](https://Hosting.kr) 에서 설정값을 입력하는 화면 입니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="820px" src="{{site.baseurl}}/assets/linux/cloudtunnel_07_hostingkr.jpg">
  </p>
  <figcaption></figcaption>
</figure>

입력을 완료한 뒤 Cloudflare 서비스에서 변경되는 값을 확인을 하는 과정이 필요합니다. `네임서버\DNS` 을 변경하면 대략 30분 정도의 시간이 지나서 자동으로 DNS 값이 변경되는 것을 확인할 수 있습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="820px" src="{{site.baseurl}}/assets/linux/cloudtunnel_08_update.jpg">
  </p>
  <figcaption></figcaption>
</figure>

## 4 Cloudflare Zero Trust 를 활용한 SSH 접근 정책
- Cloudflare Zero Trust 서비스를 활성화 합니다. 이 서비스를 활성화 하려면 계좌정보를 등록 해야 합니다.
[Cloudflare Tunnel로 SSH 안전하게 연결하기](https://xmlangel.uk/posts/2025-05-28-How-to-Set-Up-SSH-via-Cloudflare-Tunnel) 내용을 참고하여 다음 과정을 진행해 보겠습니다.
