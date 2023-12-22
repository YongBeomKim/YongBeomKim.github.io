---
layout: blog
title: Ninja with OPENCV
tags:
- pydantic
---

Django API 를 사용하여 동영상 데이터를 `RSTP (Rapid Spanning Tree Protocol)` 방식의 주소값을 활용하는 내용을 보도록 하겠습니다.

<br/>

# Django Thread with ASGI
Python 언어 자체가 개별 객체에 대한 접근성을 보호하기 위해 하나의 스레드에서 하나의 바이트 코드만 실행하도록 제한하는 GIL(Global interpreter Lock) 구조를 갖고 있습니다. 대부분의 CPU 는 다수의 Thread 를 갖고 있기 때문에 GIL 구조는 비효율적인 부분이 많습니다. 이를 극복하는 방법으로 단일 작업들을 각각 [Thread](https://docs.python.org/ko/3/library/threading.html) 객체로 감싸서 개별 CPU Thread 에서 실행하도록 명령을 할 수 있습니다.

**OPENCV** 를 활용하여 동영상 스트리밍 하는 명령을 파이썬으로 실행하는 경우 이 작업 만으로도 많은 리소스를 필요로 합니다. 비동기 및 다수의 사용자에게 서비스를 제공하는 웹 플랫폼의 특징상 비동기 작업 명령을 효율적으로 활용하는 것은 꼭 필요한 부분 입니다.

## Python Threading Explained in 8 Minutes
아래 코드는 [Python Threading Explained in 8 Minutes](https://www.youtube.com/watch?v=A_Z1lgZLSNc) 유투브의 내용을 기록한 내용으로 어떻게 동작이 되는지 살펴볼 수 있습니다. 개념들에 대하여 재미있게 서술한 글이 있는데 [파이썬 쓰레드(Thread)의 이해와 사용법](https://mechacave.tistory.com/2) 를 참고하도록 합니다.
```python
import threading
CHECK = False

def worker(text:str):
  count = 0
  while not CHECK:
    count += 1
    print(f"{text} {count}")

t1 = threading.Thread(
  traget=worker, daemon=True,
  args=("First",))
t2 = threading.Thread(
  traget=worker, daemon=True,
  args=("Second",))
t1.start(); t2.start()
t1.join(); t2.join() 
input("Press Enter to Quit")
CHECK = True
```

## ASGI
Django 에서도 파이썬을 배경으로 실행하고 있어서 GIL(Global interpreter Lock) 구조를 사용하고 있고 `WSGI` 미들웨어를 기본으로 사용 합니다. 비동기 실행을 위해서는 `ASGI` 미들웨어를 활성화 해야 합니다. [공식문서](https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/uvicorn/) 에 따르면 [Uvicorn](https://www.uvicorn.org/) 을 활용하여 비동기 활성화 및 Thread 실행 Worker 갯수를 정의하여 활성화가 가능 합니다.
```bash
$ gunicorn mysite.asgi:application --workers 4 -k uvicorn.workers.UvicornWorker
[2023-12-22] [INFO] ASGI 'lifespan' protocol appears unsupported.
```

실행하면 `ASGI 'lifespan' protocol appears unsupported` 메세지가 보이는데 [ASGI 'lifespan' protocol appears unsupported](https://github.com/apache/skywalking/discussions/10020) 내용을 보면 딱히 문제가 없다는 설명을 하고 있습니다.

## Asynchronous Layer in Django
다수의 Thread 를 활용할 수 있도록 앞의 설정을 완료 했다면 함수작업은 다음의 예시를 참고하면 됩니다. 예제코드는 [Daphne does not stream - Github](https://github.com/django/daphne/issues/413#issuecomment-1133640686) 를 참고 하였습니다.#
```python
import asyncio
from django.http.response import StreamingHttpResponse


async def iterable_content():
  for _ in range(5):
    await asyncio.sleep(1)
    print('Returning chunk')
    yield b'a' * 10000

def test_stream_view(request):
  return StreamingHttpResponse(iterable_content())
```

<br/>

# OPENCV in Django
## OPENCV
지금까지 작업에 필요한 개념 및 코드들을 살펴 보았습니다. 다음의 예시는 OPENCV 를 사용하여 [Django Ninja](https://github.com/vitalik/django-ninja/issues/919) 를 활용하여 웹캠 서비스를 제공하는 End Point 입니다. FrontEnd 에서 받을 때에는 `<img />` 태그를 활용하면 됩니다. 마치 움짤과 같은 연속하는 **jpg** 이미지를 제공하는 API 입니다.
```python
import cv2
from ninja import Router
from django.http import (
  HttpResponse, StreamingHttpResponse
)
router = Router()


@router.get("/camera")
def cctv_stream(request):
  cap = cv2.VideoCapture(0)  # Open the default camera

  def event_stream():
    while True:
      ret, frame = cap.read()
      if not ret:
        break

      # Encode the frame to JPEG
      ret, buffer = cv2.imencode('.jpg', frame)
      frame_bytes = buffer.tobytes()
      yield (b'--frame\r\n'
        b'Content-Type: image/jpeg\r\n\r\n' + \
        frame_bytes + b'\r\n')

    if not cap.isOpened():
      return HttpResponse("camera off", status=400)
    else:
      return StreamingHttpResponse(
        event_stream(), 
        content_type='multipart/x-mixed-replace; boundary=frame'
      )
```

## with Thread
이처럼 구동여부를 확인했다면 `Thread` 를 같이 활용하는 코드를 작성해 보겠습니다. 향후에 정확한 성능비교를 위해서는 2개의 API 를 사용하여 응답 및 CPU 리소스 소모까지 확인해 보면 더 정확하게 그 차이를 비교할 수 있습니다. 비교 분석내용은 [파이썬 서버 프레임워크 선정기 with Django, FastAPI, Sanic - 카카오Pay](https://tech.kakaopay.com/post/image-processing-server-framework/) 문서를 참고하여 진행해 보도록 하겠습니다.


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

# 읽어볼만한 글
- [Python Celery (Processes vs Threads](https://medium.com/@iamlal/scale-up-messaging-queue-with-python-celery-processes-vs-threads-402533be269e)
- [Async Support in Django](https://mdhvkothari.medium.com/async-support-in-django-part-2-f2137b15de0c)


  


<figure class="align-center">
  <p style="text-align: center">
  <iframe width="560" height="315" 
  src="https://www.youtube.com/embed/A_Z1lgZLSNc?si=ZluWpVlbq5_kOExW" 
  title="YouTube video player" frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
  </iframe>
  </p>
</figure>  



https://nrsyed.com/2018/07/05/multithreading-with-opencv-python-to-improve-video-processing-performance/

https://forum.djangoproject.com/t/channels-cannot-be-used-with-streaminghttpresponse/10105/8

https://sihabsahariar.medium.com/a-multi-threading-approach-for-faster-opencv-video-streaming-in-python-7324f11dbd2f

https://django-ninja.dev/proposals/cbv/

https://soonhandsomeguy.tistory.com/39

https://stackoverflow.com/questions/63345956/python-opencv-mutithreading-with-opecv-video-streaming

https://stackoverflow.com/questions/55099413/python-opencv-streaming-from-camera-multithreading-timestamps