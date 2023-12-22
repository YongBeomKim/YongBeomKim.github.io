---
layout: blog
title: Ninja with OPENCV
tags:
- pydantic
---

Django API 를 사용하여 동영상 데이터를 `RSTP (Rapid Spanning Tree Protocol)` 방식의 주소값을 활용하는 내용을 보도록 하겠습니다.

<br/>

# RSTP
## Video Source
가장 손쉽게 활용할 수 있는 방법은 스마트폰 어플리케이션을 웹캠으로 활용하는 방법 입니다. 기타 웹캠등을 활용하는 경우 `RSTP` 프로토콜 전송방식을 지원하는 제품인지를 확인하고 구매하면 됩니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/linux/spec_rstp.png">
  </p>
</figure>

카메라를 구매한 뒤, 공유기에 연결한 뒤 필요한 설정값을 확인하는 방법 입니다. 영상에서 사용한 와이파이에 연결된 아이피를 확인하닌 `arp-scan` 패키지는 Debian 에서는 잘 설치가 진행 되었지만, Ubuntu 22.04 에서는 의존성 문제를 해결하지 못하였습니다. 안드로이드 스마트폰을 활용할 때에는 [IP Webcam - PlayStore](https://play.google.com/store/apps/details?id=com.pas.webcam&hl=ko) 앱을 설치하면 `RSTP` 서버를 쉽게 활용할 수 있습니다.

<figure class="align-center">
  <p style="text-align: center">
    <iframe width="560" height="315" 
    src="https://www.youtube.com/embed/ksUylvdJQDQ?si=qTGtl3kmZMfBQaJg" 
    title="YouTube video player" frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowfullscreen>
    </iframe>
  </p>
</figure>  

<br/>

# Django
OpenCv 를 활용하여 동영상 스트리밍을 하고, 사용자가 필요로 하는 추가적인 연산을 영상위에 덧붙이는 작업 만으로도 많은 리소스를 차지 합니다. 특히 Python 언어는 객체들에 대한 접근성을 보호하기 위해 하나의 스레드에서 하나의 바이트 코드를 실행하도록 제한을 갖는 GIL(Global interpreter Lock) 구조를 갖고 있습니다.

이러한 특징은 멀티코어 연산에 있어서 역설적으로 장점을 강화할수 있는데, 단일 thread 작업을 [Thread](https://docs.python.org/ko/3/library/threading.html) 객체로 감싸서 개별 Thread 에서 실행하도록 명령을 할 수 있습니다. 더군다나 웹서비스 운영 측면에 있어서도 장점이 있는데 [Uvicorn](https://www.uvicorn.org/) 에서는 Django 설정값을 변경하지 않은 채 `asgi` 활성화 및 `worker` 갯수를 지정함으로써 병렬방식을 활용한 서비스 구동이 가능해 집니다.

>> $ gunicorn mysite.asgi:application --workers 4 -k uvicorn.workers.UvicornWorker





https://nrsyed.com/2018/07/05/multithreading-with-opencv-python-to-improve-video-processing-performance/

https://forum.djangoproject.com/t/channels-cannot-be-used-with-streaminghttpresponse/10105/8

https://sihabsahariar.medium.com/a-multi-threading-approach-for-faster-opencv-video-streaming-in-python-7324f11dbd2f

https://django-ninja.dev/proposals/cbv/

https://soonhandsomeguy.tistory.com/39

https://stackoverflow.com/questions/63345956/python-opencv-mutithreading-with-opecv-video-streaming

https://stackoverflow.com/questions/55099413/python-opencv-streaming-from-camera-multithreading-timestamps