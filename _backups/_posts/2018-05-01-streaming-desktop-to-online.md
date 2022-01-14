---
title : ubuntu - Streaming Video
last_modified_at: 2018-05-01T12:45:06-05:00
header:
  overlay_image: /assets/images/book/periscope.jpg
categories:
  - ubuntu
---


# OBS streaming Studio [Site](https://obsproject.com/)

처음에는 **Stream Studio** 가 간결해서 좋아보였지만, setting 정보가 부족하다 보니 실행에 문제가 많았다.

less is more 라고, 그럼 다른 플랫폼을 찾던중 **OBS Studio**에 대한 YouTube를 보니 직관적인 InterFace 가 인상적이였고, 추후에 알게된 사실이지만 세부설정 또한 간결하고 쉽게 조작이 가능하다


## Installation [Document](https://github.com/obsproject/obs-studio/wiki/Install-Instructions#linux)

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



## setting [https://tgd.kr/1525312](https://tgd.kr/1525312)

1. NVENC는 CPU를 비 정상적으로 먹는 문제가 있다 
2. 설정 프로파일은 main 이 최적
3. x264 사용시 쓰레드는 수동으로 지정 해 주세요.
4. 콘솔 방송시 오디오 샘플링 레이트는 48k로 잡아주세요.


[방송] 
1. 서버 : Asia: Seoul, South Korea (크롬앱은 지역서버 쉽게 확인가능)

[출력]
1. 출력 모드 : 고급
2. 인코더 : (엔비디아 지포스 그래픽카드라면) NVENC H.264, (아니라면) x264
3. 데이터율 제어 : CBR
4. 비트레이트 : 2500~4000이 적당. (60프레임 방송을 할 것이라면 4000 이상)
5. 키프레임 간격 : 2 (필수 설정!)
6. Profile : main
7. 2패스 인코딩 사용 : 체크 해제
(NVENC H.264로 설정한 사람만) 사전 설정 (대놓고 스트리밍용)
(x264로 설정한 사람만) CPU 사용량 사전설정 : veryfast (가벼우나 불안정)
 

[오디오]
1. 데스크탑 오디오 장치 : 본인이 듣는 스피커
2. 마이크/보조 오디오 장치 : 방송 마이크

[비디오]
1. 기본 (캔버스) 해상도 : 현재 모니터
2. 출력 (조정된) 해상도 : 1280x720 (720p로 방송 송출됨)
3. 축소 필터 : Bilinear (가장 무난)
4. FPS(프레임) : 30 or 60 

[고급] 
1. 일반 - 프로세스 우선 순위 설정 : 높음

<br><br><br>

# Periscope

## Straming Sites 

이 부분부터가 처음 경험하는 내용들인데, YouTube는 처음사용자인경우 신청 후 24시간 이후에야 가능하다.  그래서 차순위로 Facebook Live 를 Test 했는데, 25초의 Delay가 발생했다. YouTube 등에서도 댓글 올라가는 것과 실제 Feedback 에 시차가 있었는데. 아마 YouTube에서도 이정도 시차는 발생할 것으로 예상된다.

사용자가 적으면서도 어느정도 안정적인 서비스를 제공하는 플랫폼을 찾다보니, 결국엔 외국에선 활성화 되어있지만, 아직 우리나라에선 익숙치 안은 **Periscope**가 가장 양호한 결과물을 보여주었다 


## setting to Streaming

<iframe width="560" height="315" src="https://www.youtube.com/embed/OtJHX7O3p5U" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

동영상이 설명이 잘 되어있다... 기억안나면 다시보자...


## Periscope [https://www.pscp.tv/](https://www.pscp.tv/)

Twitter 에서 LiveStraming 을 사용 가능하다는 이야기를 예전에 들어서 찾던중, 트위터 내부가 아닌 별도의 어플에서 동작 가능한 구조로 되어있었다. 어플에서 서버와 Key 값을 생성하면, OBS 스튜디오에서 Key 값으로 자동연결되는 구조였다

한가지 주의할 점은.. 
1. Periscope 에서 설정 Key 값을 생성
2. OBS Studio 에서 Live 방송을 연결 
3. Periscope 에서 LiveStreaming 을 활성화 
4. Live 를 진행
5. Periscope 에서 LiveStraming 을 정지
6. OBS Studio 에서 Live 를 중단

의 순서대로 외부 플랫폼의 활성화 / 비활성화를 먼저 지정한 뒤, OBS Studio 의 활성화 / 비활성화는 후순위로 조절을 해야 중간에서 설정을 못찾고 꼬이는 일이 생기지 않는다.

이런 작업의 순서만 잘 준수하면 무난하게 바로 방송이 가능할 정도로 쉬운 작업이었다 <strike>물론 다 끝나고 나서 생각해서 그런게 아니라고 말을 못..</strike>