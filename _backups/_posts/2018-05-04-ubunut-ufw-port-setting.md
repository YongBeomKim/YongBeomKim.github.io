---
title : ubuntu - ufw 방화벽 설정
last_modified_at: 2018-05-04T12:45:06-05:00
header:
  overlay_image: /assets/images/book/singlecom.jpg
categories:
  - ubuntu
  - ufw
---


# Ubuntu 방화벽 설정하기

방화벽이 없으면 설정은 편하지만, 외부에서 접속시 보안 문제로 접근이 제한되는  문제가 발생했다. 이번 스터디용 PC의 설정도 그렇고 제한적이지만 설정을 잡아주는게 보편성과 안전성 측면에서 더 범용적인 활용이 가능해서 이번에 새로 정리를 해보려고 한다 

[ufw 설정 Blog](http://webdir.tistory.com/206)
[tcp/ucp 개념설명](http://www.inven.co.kr/webzine/news/?news=165870#csidx998a31f6cc971c7827ccb6eeb5f982f)
[Ftp 포트설정](http://auctionpro.co.kr/?p=182)


<br>
## ufw 설치하기

```
$ sudo apt-get install ufw
$ sudo ufw enable
```


## ssh 설정 포트

### ssh 22번 포트 열기

```
$ sudo ufw allow 22     # tcp/udp 22번 포트를 모두 허용
$ sudo ufw allow 22/tcp # tcp 22번 포트만 허용 (SSH는 tcp 22번 포트만 허용하는게 정답이다)
```


### ssh 22번 포트  거부

```
$ sudo ufw deny 22             # tcp/udp 22번 포트를 모두 거부
$ sudo ufw deny 22/tcp         # tcp 22번 포트만 거부
```

**TCP (Transmission Control Protocol) :** 전송 제어 프로토콜로, 패킷이 안정적이지 못한경우 안정적으로 갈 수 있게 전송을 제어하는 역할을 하는 프로토콜이라는 뜻이다.(ACK 와 타임아웃, 그리고 재전송을 통해서 이를 제어한다)
{: .notice--success}

**ACK (Acknowledgment) :** 영어의 앞 세 글자를 딴 것으로 “잘 받았습니다.”라는 뜻이다. TCP 데이터가 물줄기처럼 흐른다고 해서 stream이라는 표현을 쓰는데, TCP는 패킷(stream)을 받을 때마다 ACK 이라는 별도의 패킷을 만들어서 보낸 쪽에 알려준다. 일정 시간 동안 오지 않으면 해당 데이터를 **1개씩** 다시 보내고 안전성이 확보되면 나머지를 연결시켜 라우터 혼잡시 부하를 최소화 한다. TCP 의 안정성은 **ACK 라는 부가적인 패킷**과 **타임아웃, 재전송**이라는 비용을 지불하고 만들어졌다.복잡한 절차를 모두 마치고 패킷들이 모두 안정적으로 수신된 다음에야 비로소 프로그램에 패킷을 건네준다. 때문에 TCP 는 느리다. 
{: .notice-success}

**UPT :** 패킷 재전송은 필요 없이 가능한 한 빠르게 전달하는 것을 목표로 하는 경우에 활용하는 방법으로, 사실은 **하는 일 없는 더미**라고 생각하면 된다. TCP 와 달리 안정성 확보를 위해서 해야되는 일도 없고, 네트워크 체증 생각도 안하고 마구잡이로 보낼 수 있다.
{: .notice--success}



<br>
## UTF 룰의 삭제

```
$ sudo ufw delete deny 22/tcp
```


<br>
## service 명을 이용한 설정


### service 파일을 사용하여 설정한다

/etc/services에 지정된 서비스명과 포트로 UFW를 설정
```
$ less /etc/services
$ sudo ufw allow <service name>   # 서비스 이름으로 설정을 한다
```


### UFW 로그 기록을 설정한다

```
$ sudo ufw logging on 
$ sudo ufw logging off
```


<br>
## 추천 설정 method

```Bash
$ sudo ufw allow from 192.168.0.3 to any port 22 proto tcp
$ sudo ufw allow 22/tcp     # ssh 접속포트
$ sudo ufw allow 20         # ftp 접속포트
$ sudo ufw allow 8000/udp   # Jupyter Notebook
$ sudo ufw allow 9091/tcp   # torrent 
$ sudo ufw status
$ sudo ufw enable
```


server 에 직접 접속해서 설정을 변경하며 잘 작동하는지를 확인하자..
막히면 추후 작업도 못하고 문제가 생기니까 주의해서 설정을 변경한다. 물론 ssh만 잘 열려있으면 나머지는 ssh로만 접속하면 되니까 크게 문제가 될것은 없어 보이긴 한다.
{: .notice--success}