---
title : 광교잼 - 구글클라우드 필수수업 Review
last_modified_at: 2019-02-11T20:45:06-05:00
header:
  overlay_image: /assets/images/code/gcloud-logo.jpg
categories:
  - google
tags: 
    - google
    - jam
    - machine learning
toc: true 
---

약 2시간 이상 걸려서 Google cloud Machine Learning JAM 의 필수내용을 수료하였습니다. 간략하게 요약을 하면, 내가 원하는 Machine Learning 기능을 구현하기 위해 Json 으로 데이터를 입력하면, Cloud 에서 Response 실습을 거침으로써 Google Cloud 에 익숙해지는 과정입니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/gcloud-end.png">
  <figcaption></figcaption>
</figure>


# 전체리뷰
문제는 내용을 이해하기 위해선 **Machine Learning 분류기준** (법으로 치면 해당 법률용어) 를 이해 가능해야 되고, Source Code 에 삽입하기 용이하도록 대부분의 내용이 **Terminal** 에서 실행됩니다. 때문에 **리눅스 및 소스코드 작업** 에 익숙하지 않은 분들에게는 해당 과정들이 불친절하게 느껴질 수 있습니다.


# Start
[구글 클라우드 학습 사이트](https://google.qwiklabs.com/home?locale=en)

해당 사이트로 이동한 뒤, 구글 아이디를 사용하여 가입을 한 뒤 **스터디장이 보내준 코드를** 입력하여 **1달 무료 수강권** 을 등록합니다. 다른 메일주소는 해보지 않았지만 오리엔테이션 등에서도 구글메일을 권장하고 있습니다. <strike>구글의 서비스인데 구글걸 써야지 하는 생각으로 만들진 않았을거라고 믿습니다!!</strike>


# Step 0 **공통 실습내용** 
구글클라우드 실행은 유투브로 안내가 됩니다 [구글 클라우드 실행](https://www.youtube.com/watch?v=yF7EDXKTmoQ)
1. 최초 **구글 클라우드에 로그인** 하고
2. 클라우드 **터미널을 실행** 하고
3. 터미널에서 작업을 하면서
   1. 필요한 **API 키값을** 생성하고
   2. API 재사용을 위한 **설정 내용값** 정의하기 **(export)**
   3. 학습내용 입력을 위해 **request.json** 생성 및 수정
   4. 원하는 **분석내용을 실행하기** 위해 터미널 실행 (curl)

위 내용이 유투브와 약간의 차이가 있는데, 클라우드를 실행하면 다음과 같은 선택버튼이 나타납니다. 여기에서 **"Use Subscription"** 을 누르면 다음 내용으로 넘어갑니다

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/gcloud-login.png">
  <figcaption></figcaption>
</figure>

해당 분석내용을 변경하기 위해서는 **3-3 ~ 3-4** 내용만 반복 수정하면 됩니다. 추가로 설명이 필요하신 분들은 공동 수정작업중인 [구글슬라이드](https://docs.google.com/presentation/d/1B7Xsqw6pZei0E7PTvRw-c3mCPQnb3grm5JWMAtqlYhA/edit#slide=id.g4f71dfad65_2_17) 를 참고하시면 좋을거 같습니다


# Step 1 **Google Cloud Speech API** [바로가기](https://goo.gl/y3rpWa)
## 클라우드 환경설정
클라우드를 로그인 한 뒤, 이후의 모든 작업은 **리눅스 터미널** 에서 진행을 합니다.

```s
google_student@cloudshell:~ (gqewt12312) $ gcloud auth list
```

위 터미널 실행을 하면 사용자 권한내용이 나온다고 했는데 **저는 ACCESS 를 입력하라는 메세지가** 나왔습니다. 하지만 이를 무시하고 다음의 내용을 실행해도 전체 진행에는 문제가 없었습니다.

```s
google_student@cloudshell:~ (gqewt12312) $ gcloud config list project
```
이를 실행하면 작업을 진행 할 프로젝트가 생성됩니다.

```s
google_student@cloudshell:~ (gqewt12312) $ export API_KEY="abcdeg12345"
```
**API_KEY** 라는 변수명으로 **API Key** 값을 저장합니다. 이때 주의할 점은 해당 키값을 쌍따옴표로  \" \" 로 감싼 상태에서 입력해야 합니다.

## Speech 음성파일을 Text로 변환하기
이번 파트의 내용은 **음성 녹음파일** 을 구글 클라우드로 전송하면, 해당 음성의 내용을 **Text 문장** 으로 출력합니다.

이를 입력하기 위해서 **request.json** 파일을 생성합니다
```s
google_student@cloudshell:~ (gqewt12312) $ touch request.json
```

이 명령은 **request.json** 파일을 생성만 합니다. 그리고 터미널 위의 연필버튼을 누르면 클라우드 속의 파일목록을 출력하고, **request.json** 을 선택하면 해당파일의 내용을 수정할 수 있습니다

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/gcloud-file.png">
  <figcaption></figcaption>
</figure>

입력내용은 `gs://cloud-samples-tests/speech/brooklyn.flac` 파일의 내용을 전달하기 위한 설정내용입니다.

입력이 완료된 **request.json** 파일의 내용을, `https://speech.googleapis.com/v1beta1/speech` 사이트로 Post 방식으로 정보를 전달하면, 해당 음성을 **텍스트 문장** 으로 출력하는 내용을 보실 수 있습니다.

```s
google_student@cloudshell:~ (gqewt12312) $ curl -s -X POST -H "Content-Type: application/json" --data-binary @request.json \
"https://speech.googleapis.com/v1beta1/speech:syncrecognize?key=${API_KEY}"
```


# Step 2 **Cloud Natural Language API** [바로가기](https://goo.gl/uMMouk)
