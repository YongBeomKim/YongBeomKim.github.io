---
layout: blog
title: Mesh 설정 IPTIME 공유기
tags:
- iptime
---

사무실에 사용중인 공유기에서, 특정 시간대에 사용량이 늘어나면서 전체적인 시스템이 느려지는 현상들이 발생 하였습니다. 이는 특정 ip 에서 `192.168.0.34` 포트에서 UDP 접속량이 상대적으로 많은것을 알 수 있었습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/linux/iptime_traffic.gif">
  </p>
</figure>

접속상태에서 `192.168.0.34` 포트에 접속한 기기의 Mac Address 와 동일한 기기가 `192.168.0.31` 에서도 사용되고 있음을 알 수 있었습니다. 이것은 공유기 Port 연결된 LAN 선 뒤에 또다른 공유기가 물려있는 상황이라는 것을 추후에 발견하였습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/linux/iptime_ip.gif">
  </p>
</figure>

<br/>

# 문제분석
외부에서 가져온 WAN 랜선이 **<span style="color:orange">사무실 공유기</span>** 에 연결되어 있었고 사무실 공유기의 1개 포트에 연결된 랜선이 창고 사무실까지 연결되어 있었고, 해당 선 뒤에는 또다른 IPTIME 공유기를 사용하고 있었습니다.

문제는 **<span style="color:orange">창고 사무실</span>** 에 연결된 공유기가 `접속 관리자` 정보도 `admin:admin` 으로 거의 열려있는것과 다름 없었고, 5G/ 2G Wifi 설정도 별도의 보안설정 없이 개방되어 있어서 해당 사무실 주변이라면 누구나  사무실의 공유기에 바로 접속이 가능한 상황이었습니다. 

<br/>

# 해결방법
IPTIME 공유기에서 지원하는 `Mesh` 연결을 진행하는 것으로 이번 문제를 해결할 수 있었습니다. 창고 사무실까지 LAN 선이 이미 연결되어 있었으므로, `유선 Mesh` 설정을 진행하였습니다.

보다 자세한 설정방법은 아래의 유튜브 동영상을 참고 하였습니다. 초보자 분들이라면 거의 대부분이 `Windows 10/11`을 사용하고 있으므로 [ipTIME Mesh 접속기 v1.36](https://iptime.com/iptime/?page_id=126&uid=20609&mod=document) 도구를 활용하면 보다 쉽게 연결 가능합니다.

<figure class="align-center">
  <iframe width="560" height="315" 
  src="https://www.youtube.com/embed/_pKKd0X7vN0?si=y44L-LrVW7QtcwQq" 
  title="YouTube video player" frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin">
  </iframe>
</figure>

## 동영상 간단정리
**<span style="color:orange">WAN 랜선</span>** 연결된 공유기가 `Mesh 컨트롤러`가 됩니다. 해당 공유기 Mesh 설정에서 `Mesh 컨트롤러`를 활성화 하고 **<span style="color:orange">접속관리자 계정</span>** 및 **<span style="color:orange">Mesh Wifi 이름과 비밀번호</span>** 를 정의 합니다.

이제는 창고 사무실에 설치된 공유기에 전원과 연결하는 LAN 선을 연결합니다. 이때 주의할 점은 LAN 선을 **<span style="color:red">WAN 포트에 연결하지 않고 일반 포트에 연결을 하여야 합니다.<span>** 만약 컨트롤러에서 빠져나온 LAN선을 WAN 포트에 연결하면 이를 별도의 다른 공유기로 인식하게 되고, **<span style="color:red">Mesh 접속 가능한 공유기에서는 제외</span>** 됩니다.

MESH 연결에 대한 설정값 등은 **<span style="color:orange">위부 WAN 랜선이 연결된 Mesh 컨트롤러 공유기</span>** 내부의 MESH 설정에 들어가서 필요한 연결절차를 진행하여야 합니다. 이와같은 내용들만 주의하여 진행한다면 어려움 없이 Mesh 연결 설정을 진행하실 수 있으실 겁니다.

# 참고사이트
- [ipTIME Mesh 접속기 v1.36](https://iptime.com/iptime/?page_id=126&uid=20609&mod=document)
- [ipTIME 이지메시 컨트롤러설정법 - 유선설정](https://www.youtube.com/watch?v=_pKKd0X7vN0)