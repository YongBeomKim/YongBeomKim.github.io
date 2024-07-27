---
layout: blog
title: requests with Tor
tags:
- python
---

크롤링 작업을 하면서 IP를 변경하며 작업을 진행해 보려고 합니다. 방법으로는 2가지가 있습니다.
- OpenVPN 을 활용하여 IP 변경
- Tor Browser 의 변경된 IP Proxy 를 활용

<br/>

# OpenVPN
## Run
[IPTIME 공유기에서 OpenVPN 클라이언트 세팅하기](https://blog.naver.com/whitepolarbear/222701357395) 를 참고하면 별도의 서버가 없어도 OpenVPN 관련 파일을 [vpngate.net](https://www.vpngate.net/en/) 다운 받아서 활용이 정상적으로 동작하는 것을 확인할 수 있었습니다.
```bash
$ sudo openvpn --config /etc/openvpn/vpngate.ovpn
```

## Tun Network
문제는 작업을 진행하는 서버가, ssh접속 또는 Domain 연결등이 되어 있을 때, `openvpn` 을 실행하면 설정값들이 꼬여서 문제가 발생하는 것을 확인할 수 있었습니다.
```bash
$ ifconfig

virbr0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
  inet 192.168.122.1  netmask 255.255.255.0  broadcast 192.168.122.255
  ether 55:55:00:ff:d1:ca  txqueuelen 1000  (Ethernet)

wlp82s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
  inet 192.100.1.226  netmask 255.255.0.0  broadcast 192.100.255.255
  inet6 aa80::aa29:11aa:a2a2:c1ad  prefixlen 64  scopeid 0x20<link>
  ether 11:e1:f1:11:c1:61  txqueuelen 1000  (Ethernet)
```

위의 실행내용은 원본의 네트워크 설정 내용이고, 아랫 내용이 `open_vpn`을 실행한 뒤 네트워크 설정 내용 입니다. `open vpn` 을 실행하면 `tun0` 가상IP 네트워크가 추가된 것을 확인할 수 있습니다. 
```bash
$ ifconfig

tun0: flags=4305<UP,POINTOPOINT,RUNNING,NOARP,MULTICAST>  mtu 1500
  inet 10.211.1.109  netmask 255.255.255.255  destination 10.211.1.110
  inet6 fe80::ede4:3a36:abc0:8525  prefixlen 64  scopeid 0x20<link>

virbr0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
  inet 192.168.122.1  netmask 255.255.255.0  broadcast 192.168.122.255
  ether 55:55:00:ff:d1:ca  txqueuelen 1000  (Ethernet)

wlp82s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
  inet 192.100.1.226  netmask 255.255.0.0  broadcast 192.100.255.255
  inet6 aa80::aa29:11aa:a2a2:c1ad  prefixlen 64  scopeid 0x20<link>
  ether 11:e1:f1:11:c1:61  txqueuelen 1000  (Ethernet)
```

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/linux/openvpn_tun.png">
  <figcaption></figcaption>
  </p>
</figure>

OpenVPN은 Eth0(외부)로 부터 VPNclient에게 암호화된 패킷을 받고, 해독한 뒤에 tun0으로 내보내면 itpables과 routing engine에 의해 Eth1 또는 Eth0으로 MASQUERADE 되어 전송됩니다. 또한 VPNClient로 들어오는 패킷도 route 설정에 의하여 tun0으로 전송됩니다. tun0은 OpenVPN이 만든 가상 네트워크 인터페이스 입니다. [OpenVPN 2.4 간편 구성(TUN)](https://blog.naver.com/rpg2003a/221209134202)

이로써 대응방법을 생각하면 동일한 네트워크에서 **<span style="color:orange">크롤링만 실행하는 별도의 서버</span>** 를 설치한 뒤  `open_vpn` 을 실행하는 것으로 원하는 결과를 얻을 수 있었습니다. 

<br/>

# Tor Browser
## Install
Tor 브라우저를 설치하는 방법은 다음과 같습니다. 아랫내용으로 확인가능한 내용은 Tor 브라우저에서 `9050` 포트를 활용하여 Proxy 변경된 IP 주소로 작업을 진행할 수 있습니다.
```bash
$ sudo apt update
$ sudo apt install tor
$ netstat -tlp | grep tor
tcp  127.0.0.1:9050   0.0.0.0:*   LISTEN   16205/tor       
```

## Python Codes

```python
import requests

# Tor SOCKS proxy configuration
proxies = {
    'http': 'socks5h://127.0.0.1:9050',
    'https': 'socks5h://127.0.0.1:9050'
}

url = 'http://api.ipify.org?format=json'

try:
    response = requests.get(url, proxies=proxies)
    print(f"Response: {response.json()}")
except requests.exceptions.RequestException as e:
    print(f"An error occurred: {e}")
```

<br/>

# 참고사이트
- [Tor Proxy를 활용한 Selenium](https://jakpentest.tistory.com/entry/Seleinum-Proxy%EC%99%80-OSX%EC%97%90%EC%84%9C-Selenium%EC%9C%BC%EB%A1%9C-Tor-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
- [코딩도장 - 36. 추상 클래스 사용하기](https://dojang.io/mod/page/view.php?id=2389)