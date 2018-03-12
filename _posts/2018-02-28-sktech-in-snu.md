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

지난 달 '홍대 keras'특강을 통해서<br> 
동일한 API 코딩을 하더라도,<br>
설치 환경에 맞춰서 자동으로 cpu/gpu 최적화를 구현하는<br>
모습에 반해서 Keras를 파야지 하다가,<br>

이번에 'PyTorch'특강 오픈 소식을 듣고서<br>
위의 궁금증을 갖고서 바로 신청했지만.. <br>
결과는 다음 기회에..<strike>직장인이 죄인가요..ㅜㅜ</strike><br>


## t academy

개강 당일 노쇼를 예상하고 도착을 했지만,<br>
이번 회차부터 좌석배치가 바뀌어서<br>
정해진 인원 아니면 입장이 불가능 하다며,<br>
1시간 뒤 까지도 노쇼가 있으면 그때 입장 가능하다는 안내를 받았다.<br>

다행히도 미리 PPT를 받고서 설치 및 예습을 하다보니 1시간은 금방 흘렀고<br>
다행히도 5~6명 정도 빈자리가 있어서 수업에 들어갈 수 있었다.<br>

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/photo/20180228_img01.jpg){: .align-center}

Pytorch Document를 한번 봤었고,<br>
머신러닝 기본 이론을 전반적으로 한번 스터디를 했고,<br>
Tensorflow/ Keras/ sklearn 관련 도서를 1권씩 살펴본 <strike>(자랑인가요..??)</strike> <br>
나에게도 이번 수업은 따라가기에도 힘들었다.

가장 큰 이유는 GPU 관런 에러가 계속 발생했는데<br>
틈틈히 이를 고치느라 30분 이상을 허비한 것과 더불어<br>
수업에 완전 집중하지 못한 이유도 한 부분을 차지했다<br>
(원인은 최신 3.0.1에서 구형 GPU 지원을 막아버린 것으로<br>
 3.0.0을 설치를 한 뒤에서야 해결 되었다.)<br> <strike>950Mx로 노트북 특성상 그리 오래된 모델도 아닌데, 벌써 막아버리다니</strike>


## 수업후기 

1. keras에 비해서도 GPU 설정 부분은 더 간단했다.<strike>(안되서 문제였지)</strike>

2. sequential()로 **학습모델**을 설계시, python의 orderdict을 활용하는 등, 모듈 설게시 Python 친화적 튜닝이 가능한 부분들은 신선하게 다가왔다

3. 즉 기본 철학만 잘 익힌다면 keras와 비교하면서 용도가 많아 보였다 

4. 노트북 gpu 미지원 등, 시스템을 조건을 까다롭게 제한을 두는 점 때문에 범용적인 시스템 구현에는 문제가 있다는 점이 아쉬웠다

5. 결국은 keras/ pytorch(keras)/ sklearn 를 병행해야 환경별 제약조건을 극복 가능하다는 불편한 진실을 또한번 경험하는 계기였다<strike>(힘내요 형....)</strike>


생각보다 강의실 내부가 좀 더웠고 <br>

강의 내용이 압축적이고 전문적이여서 그런지, <br>
질문 내용도 그렇고, Python 기본만 익힌 채 <br>
Tensorflow등 머신러닝에 대한 경험이 부족한 학생들에게는 <br> 
동영상 만을 봐서는 이해하기 어려운 학생들이 많아 보였다 

동영상 강의 만으로 부족함을 느낀다면, <br>
t아카데미의 '머신러닝' 이론 수업을 보강하고 [t-머신러닝](https://tacademy.sktechx.com/live/player/onlineLectureDetail.action?seq=103) 
'모두의 딥러닝' 유투브로 Tensorflow 코딩을 경험한 뒤 [You-tube](https://hunkim.github.io/ml/) <strike>(할게 많지 애들아 ^^;)</strike> <br>
이번 세미나 동영상을 본다면, pytorch의 특징을 더욱 잘 알 수 있을 것이다 