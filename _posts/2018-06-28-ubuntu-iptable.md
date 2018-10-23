---
title : 우분투 iptables
last_modified_at: 2018-06-27T21:45:06-05:00
header:
  overlay_image: /assets/images/book/ubuntu.png
categories:
  - ubuntu
tags: 
    - ubuntu
toc: true 
---


<br>
# ip Tables

방화벽을 활성화 하면 **port**별 작동 제한이 생긴다

이 경우에는 port별 규칙을 설정 가능하고, 이러한 제한을 풀어주고 나서야 외부에서 접속이 가능하다 <small>공유기에서 DNS 설정한 포트 내부 범위에서 가능하다는 점에 유의하자</small> [블로그](http://server-engineer.tistory.com/418)


<br>
## netstat

```
$ netstat -nap
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:8080            0.0.0.0:*               LISTEN      1337/python2.7  
```

현재 활성화 중인 포트를 출력한다

<br>
## iptables

<br>
### 특정 포트를 개방한다

`$ sudo iptables -I INPUT 1 -p tcp --dport 8888 -j ACCEPT`

**1번 규칙**으로 **8888번 포트**를 연다. 외부 접속을 해보면 해당 포트가 접속됨을 알 수 있다

**-I** : 새로운 규칙을 추가한다<br>
**-p** : 패킷의 프로토콜을 명시한다<br>
**-j** : 규칙에 해당되는 패킷을 어떻게 처리할지를 정한다


<br>
### 추가한 설정 조회 

`$ iptables -L -v`

**-L** : 규칙을 출력<br>
**-v** : 자세히

<br>
### 규칙 제거하기

`$ iptables -D INPUT 1` 

1번 규칙을 대상으로 설정을 제거한다

`iptables -D INPUT -p tcp --dport 8888 -j ACCEPT`

**8888번 포트**에 대한 설정을 제거한다
