---
title : Desktop 작업화면 Streaming - ubuntu
last_modified_at: 2018-05-01T12:45:06-05:00
header:
  overlay_image: /assets/images/book/periscope.jpg
categories:
  - ubuntu
---


## OBS streaming Studio

처음에는 **Stream Studio** 가 간결해서 좋아보였지만, setting 정보가 부족하다 보니 실행에 문제가 많았다.

less is more 라고, 그럼 다른 플랫폼을 찾던중 **OBS Studio**에 대한 YouTube를 보니 직관적인 InterFace 가 인상적이였고, 추후에 알게된 사실이지만 세부설정 또한 간결하고 쉽게 조작이 가능하다


### Installation

OpenGL 3.2 이상이 설치되었는지를 확인한다

```
$ glxinfo | grep "OpenGL"
```


인코딩을 위한 ffmpeg 설치한다

```
$ sudo apt-get install ffmpeg
```


OBS studio를 설치한다.. 끝....

```
$ sudo add-apt-repository ppa:obsproject/obs-studio
$ sudo apt-get update
$ sudo apt-get install obs-studio
```



## Periscope

### setting to Streaming

<iframe width="560" height="315" src="https://www.youtube.com/embed/OtJHX7O3p5U" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

동영상이 설명이 잘 되어있다... 기억안나면 다시보자...


### Straming Sites 

이 부분부터가 처음 경험하는 내용들인데, YouTube는 처음사용자인경우 신청 후 24시간 이후에야 가능하다.  그래서 차순위로 Facebook Live 를 Test 했는데, 25초의 Delay가 발생했다. YouTube 등에서도 댓글 올라가는 것과 실제 Feedback 에 시차가 있었는데. 아마 YouTube에서도 이정도 시차는 발생할 것으로 예상된다.

사용자가 적으면서도 어느정도 안정적인 서비스를 제공하는 플랫폼을 찾다보니, 결국엔 외국에선 활성화 되어있지만, 아직 우리나라에선 익숙치 안은 **Periscope**가 가장 양호한 결과물을 보여주었다 


### Periscope [https://www.pscp.tv/](https://www.pscp.tv/)

Twitter 에서 LiveStraming 을 사용 가능하다는 이야기를 예전에 들어서 찾던중, 트위터 내부가 아닌 별도의 어플에서 동작 가능한 구조로 되어있었다. 어플에서 서버와 Key 값을 생성하면, OBS 스튜디오에서 Key 값으로 자동연결되는 구조였다

한가지 주의할 점은.. 
1. Periscope 에서 설정 Key 값을 생성
2. OBS Studio 에서 Live 방송을 연결 
3. Periscope 에서 LiveStreaming 을 활성화 
4. Live 를 진행
5. Periscope 에서 LiveStraming 을 정지
6. OBS Studio 에서 Live 를 중단

의 순서대로 외부 플랫폼의 활성화 / 비활성화를 먼저 지정한 뒤, OBS Studio 의 활성화 / 비활성화는 후순위로 조절을 해야 중간에서 설정을 못찾고 꼬이는 일이 생기지 않는다.

이런 작업의 순서만 잘 준수하면 무난하게 바로 방송이 가능할 정도로 쉬운 작업이었다 <strike>물론 다 끝나고 나서 생각한 결과니까</strike>ㄴ


