---
title : 토크on세미나 - Pytorch 딥러닝
tags: 
    - 세미나
    - t아카데미
    - pytorch
---

## pytorch

<figure class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/photo/20180228_img03.jpg" alt="">
  <figcaption>건물 2층에 올라가면 볼 수 있는 안내 표시</figcaption>
</figure> 

PyTorch는 '공인회계사회 김태식 회계사'님의 소개로<br>
처음 접하게 된 머신러닝 모듈이다.<br>

API가 Numpy, Pandas 처럼 깔끔해서 <br>
접근이 용이해 보이지만,<br>

막연하게 Document를 따라서 실습하다 보면 <br>
변수 초기값들이 뒤섞이면서 <br>
결과값이 매번마다 달라져서 고생을 했었던 모듈이다

지난 달 '홍대 keras'특강에는 동일한 API로 코딩을 해도,<br>
설치 환경에 맞춰 자동으로 최적화를 구현해 주는 <br>
모습에 반해서 Keras를 파야지 하다가,<br>

이번 'PyTorch'특강 오픈 소식을 듣고서<br>
위의 궁금증을 갖고서 바로 신청했지만.. <br>
결과는 다음 기회에..<br>


## t academy

개강 당일 노쇼를 예상하고 도착한 결과,<br>
아쉽게도 이번터 회차부터 좌석배치가 바뀌어서<br>
정해진 인원 아니면 입장이 불가능 하다며,<br>
1시간 뒤 노쇼가 있으면 그때서야 가능하다는 안내를 받았다.<br>

PPT를 미리 받고 예습을 하다보니 1시간을 금방 흘렀고<br>
도착해서 확인해본 결과, 5~6명 정도 빈자리가 있었고 <br>
다행히 수업에 들어갈 수 있었다.<br>

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/photo/20180228_img01.jpg){: .align-center}

Pytorch Document를 한번 봤었고,
머신러닝 기본 이론등은 한번 스터디를 했고,
Tensorflow/ Keras관련 도서를 1번 본 <strike>(자랑인가요..??)</strike> <br>
나에게도 이번 수업은 따라가기에 급급했다 

막상 코딩을 따라다가다 GPU 문제로 계속적 오류가 발생해서 <br>
이를 고치느라 중간 30분을 허비한 이유도 가큰 비중을 차지했다<br>
(최신 pytorch는 구형 GPU 지원을 막아버려서 발생한 오류들로, <br>
 3.0.0을 설치를 한 뒤에 해결 되었다)


## 수업후기 

1. keras에 비해서도 GPU 설정 부분은 더 간단했다.<strike>(안되서 문제였지)</strike>

2. sequential()로 설계시, orderdict을 활용하는 등, 모듈설게시 Python 친화적 튜닝이 가능한 부분들은 신선하게 다가왔다

3. 기본 철학만 잘 익힌다면 keras에 비해 유용해 보였다 

4. 하지만 지원 모듈과 system에 따라 다르니, 결국은 keras/ pytorch/ sklearn 를 병행하며 지식을 쌓아 나아가야 더 탄탄하고 깊게 학습 가능하다는 것을 또한 번 느끼는 시간이었다 <strike>(힘내요 형....)</strike>


생각보다 강의실 내부가 좀 더웠고 <br>

강의 내용이 압축적이고 전문적이여서 그런지, <br>
질문 내용도 그렇고, Python 기본만 익힌 채 <br>
Tensorflow등 머신러닝에 대한 경험이 부족한 학생들에게는 <br> 
동영상 만을 봐서는 이해하긴 쉽지 않았겠다 하는 생각이 들었다. <br>


이번 수업으로 부족함이 느껴진다면, <br>
t아카데미의 '머신러닝' 이론 수업을 보강하고![t-머신러닝](https://tacademy.sktechx.com/live/player/onlineLectureDetail.action?seq=103) 
'모두의 딥러닝' 유투브로 Tensorflow 코딩을 경험한 뒤 ![You-tube](https://hunkim.github.io/ml/) <strike>(할게 많지 애들아 ^^;)</strike> <br>
이번 세미나 동영상을 본다면 많은 도움의 될 것이다.