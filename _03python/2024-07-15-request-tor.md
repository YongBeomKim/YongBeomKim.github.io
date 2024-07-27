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





 tun0은 OpenVPN이 만든 가상 네트워크 인터페이스 입니다.

[출처] OpenVPN 2.4 간편 구성(TUN)|작성자 견습생


내용을 보면 내부의 네트워크 주소는 변경되지 않고 동일함을 확인할 수 있었습니다. 이로써 동일한 네트워크 내부에서 크롤링 작업만 실행하는  `192.168.xxx.yyy` 주소는 변경되지 않았고






문제는 Nginx 과 같은 외부 서비스와 연결되는 서버에서 실행했을때, 해당 서버의 IP로 연결된 도메인 


문제는 원격으로 작업할 때 발생하였습니다. 문제는 원격으로 접속한 서버의 내부 IP가 변경되다 보니, 원격작업 자체에서 여러가지 부가적인 문제가 발행하였습니다. 때문에 2번째 방법에 대해서도 정리해 보도록 하겠습니다.

<br/>

# Tor with requests


```
To use the requests library in Python with Tor Browser in Ubuntu, you need to route your requests through the Tor network. This can be achieved by configuring your requests to use the Tor SOCKS proxy. Here are the steps to set this up:

Step-by-Step Guide
1. Install Tor
First, you need to install Tor on your Ubuntu system.

bash
코드 복사
sudo apt update
sudo apt install tor
2. Start the Tor Service
Start the Tor service to ensure it is running.

bash
코드 복사
sudo service tor start
3. Verify Tor is Running
Check if Tor is running properly by looking for the listening SOCKS proxy on port 9050.

bash
코드 복사
netstat -tuln | grep 9050
You should see an entry indicating that Tor is listening on port 9050.

4. Install Required Python Packages
You need the requests and requests[socks] packages to make HTTP requests through the Tor SOCKS proxy.

bash
코드 복사
pip install requests[socks]
5. Configure requests to Use Tor
Configure your Python script to route requests through the Tor SOCKS proxy. Here’s an example:

python
코드 복사
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
6. Run Your Script
Run your Python script while the Tor service is active. The requests should now be routed through the Tor network.

bash
코드 복사
python your_script.py
Important Considerations
Network Latency:

Tor can introduce significant network latency. Ensure that your script accounts for this by setting appropriate timeouts.
Anonymity and Privacy:

Using Tor can enhance your privacy and anonymity, but it is not a complete solution. Always follow best practices for secure and anonymous browsing.
Testing:

To verify that your requests are being routed through Tor, you can use an IP lookup service like the one shown in the example (http://api.ipify.org?format=json). The response should show an IP address different from your usual IP, indicating that it is coming from a Tor exit node.
Example with Timeout
Here’s an extended example that includes a timeout:

python
코드 복사
import requests

# Tor SOCKS proxy configuration
proxies = {
    'http': 'socks5h://127.0.0.1:9050',
    'https': 'socks5h://127.0.0.1:9050'
}

url = 'http://api.ipify.org?format=json'

try:
    response = requests.get(url, proxies=proxies, timeout=10)
    print(f"Response: {response.json()}")
except requests.exceptions.RequestException as e:
    print(f"An error occurred: {e}")
By following these steps, you can configure your Python requests library to route HTTP requests through the Tor network, enhancing your privacy and anonymity.
```


파이썬으로 크롤링 작업을 진행하다 보면 IP값을 변경하려는 경우가 발생합니다.

파이썬 클래스에서 `추상 클래스(abstract method)` 개념을 이해하고, 예제를 통해서 실제 사용방법까지 확인해 보도록 하겠습니다. 

<br/>

# abstract method
추상 클래스는 클래스를 상속받는 클래스가 있을때, 자식 클래스에 필수로 활용해야될 메서드를 정의하기 위해서 사용 합니다. 예시를 살펴보면 다음과 같습니다.

`BASE` 부모 클래스의 `go_to_school` 메서드에 **추상 클래스 메서드** 를 선언 했습니다.
예시처럼 `@abstractmethod` 데코레이터를 활용하여 선언을 하면 됩니다.

```python
In [0] : from abc import abstractmethod, ABCMeta
    ...: 
    ...: class Base(metaclass=ABCMeta):
    ...:   @abstractmethod
    ...:   def study(self):
    ...:     pass
    ...: 
    ...:   @abstractmethod
    ...:   def go_to_school(self):
    ...:     pass
```

`Base` 부모 클래스를 상속받은 `Student` 자식 클래스를 다음과 같이 코딩작업을 한뒤, 활용을 하려면 다음과 같은 오류를 출력합니다

```python
In [1] : class Student(Base):
    ...:   def study(self):
    ...:     print('공부하기')
    ...: 
    ...: james = Student()
    ...: james.study()

Out [1] :
TypeError Traceback (most recent call last)
Cell In[1], line 5
    2     def study(self):
    3         print('공부하기')
--> 5 james = Student()
    6 james.study()
TypeError: Can't instantiate abstract class 
    Student with abstract method `go_to_school`
```

부모 클래스에서 선언된 2개의 **추상 클래스 메서드** 중, `go_to_school` 메서드가 자식 클래스에서 활용되지 않았음을 출력하고 나머지 명령은 실행되지 않은것을 볼 수 있습니다.

추상 클래스 메서드가 선언된 2개의 메서드를 모두 활용한 자식 클래스 예시를 보면 다음과 같습니다.

```python
In [0] : class Student2(StudentBase):
    ...:   def study(self):
    ...:     print('공부하기')
    ...: 
    ...:   def go_to_school(self):
    ...:     print('학교가기')
    ...:
    ...: james = Student2()
    ...: james.study()
    ...: james.go_to_school()

Out [0] :
공부하기
학교가기
```

정상적으로 동작하는 것을 확인할 수 있습니다. 

<br/>

# 참고사이트
- [Tor Proxy를 활용한 Selenium](https://jakpentest.tistory.com/entry/Seleinum-Proxy%EC%99%80-OSX%EC%97%90%EC%84%9C-Selenium%EC%9C%BC%EB%A1%9C-Tor-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
- [코딩도장 - 36. 추상 클래스 사용하기](https://dojang.io/mod/page/view.php?id=2389)