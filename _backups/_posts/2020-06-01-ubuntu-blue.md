---
title : 우분투 Bluetooth 설정
last_modified_at: 2019-09-01T10:45:06-05:00
header:
  overlay_image: /assets/images/book/ubuntu.png
categories:
  - ubuntu
tags: 
    - ubuntu
    - bluetooth
---

우분투를 자유도가 높지만, 문제가 생겼을때 스스로 해결해야 할 부분도 많은 것이 사실 입니다. 이번에 블루투스 문제가 되는 부분은 **tlp** 전원관리 모듈에서 해당 장치를 전원 중지를 시키기 때문에 먹통이 됩니다. 

# 참고 사이트

[Blutooth 활성화 되지 않는 경우](https://medium.com/@jjeaby/ubuntu-%EC%97%90%EC%84%9C-blutooth-%EC%9E%A5%EC%B9%98%EA%B0%80-on-%EC%9C%BC%EB%A1%9C-%ED%99%9C%EC%84%B1%ED%99%94-%EB%90%98%EC%A7%80-%EC%95%8A%EB%8A%94-%EA%B2%BD%EC%9A%B0-6d5d2c8a7380)

[블루투스를 설정하는 방법](https://www.it-swarm.dev/ko/wireless/%EC%9A%B0%EB%B6%84%ED%88%AC-1804%EC%97%90%EC%84%9C-%EB%B8%94%EB%A3%A8%ED%88%AC%EC%8A%A4%EB%A5%BC-%EC%84%A4%EC%A0%95%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95/998290223/)

<br/>

# Summary

1. `$ lspci -knn | grep Net -A2; lsusb` 블루투스가 작동하는 **장치의 이름** 을 확인 합니다.
2. `$ lsusb` 위 확인한 **장치의 ID** 값을 확인 합니다.
3. `$ nvim /etc/tlp.conf` **장치 ID** 값을 **tlp 설정** 에 추가 합니다
