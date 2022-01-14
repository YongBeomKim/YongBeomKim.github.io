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

약 1시간 넘게 걸려서 Google cloud Machine Learning JAM 의 필수내용을 수료하였습니다. 간략하게 요약을 하면, **내가 원하는 Machine Learning 기능을** 구현하기 위해 **Json 으로 데이터를 입력** 하면, Cloud 에서 **Json Response** 결과물을 출력하는 방식을 익힘으로써 Google Cloud 에 익숙해지는 과정들을 다뤘습니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/gcloud-end.png">
  <figcaption></figcaption>
</figure>

<br/>
# 전체리뷰
한가지 아쉬운 부분은 해당 문제들의 내용을 이해하기 위해서
1. **Machine Learning 의 내용** (법으로 치면 해당 법률용어)의 이해와
2. **리눅스 작업** 에 대한 익숙함이 필요합니다
  
윈도우 사용자가 대부분인 우리나라에서는 위의 내용을 전혀 접해보지 않은 분들에게는 해당 과정들이 불친절하게 느껴질 수 있어 보였습니다.

<br/>
# Start
[구글 클라우드 학습 사이트](https://google.qwiklabs.com/home?locale=en)

구글 아이디를 사용하여 가입을 한 뒤 **스터디장이 보내준 코드를** 입력하여 **1달 무료 수강권** 을 등록합니다. 다른 메일주소를 직접 해보진 않았지만 [오리엔테이션](https://www.youtube.com/watch?v=yF7EDXKTmoQ) 등에서도 구글메일을 권장하고 있습니다. <strike>구글의 서비스인데 구글걸 써야지 하는 생각으로 만들진 않았을거라고 믿습니다!!</strike>

<br/>
# Step 0 **공통 실습내용** 
1. **구글 클라우드에서 제공하는 별도의 아이디/ 비밀번호로 로그인** 하면 별도 탭에서 로그인 화면이 뜹니다
2. 클라우드가 실행되면 **터미널을 실행** 하고, **프로젝트를 정의** 합니다
3. 터미널에서 작업을 진행합니다
   1. 필요한 **API 키값을** 생성하고
   2. API 재사용을 쉽게 하기위해 **설정값을 변수로** 정의하기 **(export)**
   3. 학습내용의 입력을 위해 **request.json** 파일생성 및 내용입력
   4. 원하는 **분석내용을 실행하기** 위해 클라우드 서버에 POST 방식으로 데이터를 전달하면, 해당 결과물은 Json 형식으로 Response 합니다 **(curl)**

위 내용 중 유투브와 약간의 차이가 있는데, 클라우드를 실행하면 다음과 같은 선택버튼이 나타납니다. 여기에서 **"Use Subscription"** 을 누르면 다음 내용으로 넘어갑니다

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/gcloud-login.png">
  <figcaption></figcaption>
</figure>

그리고 해당 파트에서 분석내용을 변경해 보고 싶으신 분들은 위 과정 중 **3-3 ~ 3-4** 내용만 반복 수정하면 됩니다. 추가로 설명이 필요하신 분들은 [구글슬라이드](https://docs.google.com/presentation/d/1B7Xsqw6pZei0E7PTvRw-c3mCPQnb3grm5JWMAtqlYhA/edit#slide=id.g4f71dfad65_2_17) 를 참고하시면 좋을거 같습니다

<br/>
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
작업을 진행 할 프로젝트가 생성됩니다.

```s
google_student@cloudshell:~ (gqewt12312) $ export API_KEY="abcdeg12345"
```
**API_KEY** 라는 변수명으로 생성된 **API Key** 값을 저장합니다. 이때 주의할 점은 해당 키값을 복사한 뒤 붙여넣을 때에는 쌍따옴표로  \" \" 로(String Type) 감싼 상태에서 입력해야 합니다.

## Speech 음성파일을 Text로 변환하기
이번 파트의 주요내용은 **음성 녹음파일** 을 구글 클라우드로 전송하면, 해당 음성의 내용을 **Text 문장** 으로 출력합니다.

이를 입력하기 위해서 **request.json** 파일을 생성합니다
```s
google_student@cloudshell:~ (gqewt12312) $ touch request.json
```

이 명령은 빈 **request.json** 파일을 생성만 합니다. 생성된 파일의 내용을 수정하기 위해서는 **터미널 화면 위의 상단버튼 중 연필버튼을** 누르면 클라우드 내부의 파일목록들을 출력하고, 이중 **request.json** 을 선택하면 다음과 같이 해당파일의 내용을 수정할 수 있습니다

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/gcloud-file.png">
  <figcaption></figcaption>
</figure>

학습내용을 간단히 설명하면 `gs://cloud-samples-tests/speech/brooklyn.flac` 라는 녹음된 음성 파일을 서버로 전송하기 위한 내용입니다.

입력이 완료되었으면 **request.json** 파일을 저장합니다. 그리고 터미널에서 `https://speech.googleapis.com/v1beta1/speech` 클라우드 서버로 입력한 내용을 **Post 방식으로** 전달하면, 해당 음성을 분석하여 **텍스트 문장** 으로 출력하는 내용을 보실 수 있습니다.

```s
google_student@cloudshell:~ (gqewt12312) $ curl -s -X POST -H "Content-Type: application/json" --data-binary @request.json \
"https://speech.googleapis.com/v1beta1/speech:syncrecognize?key=${API_KEY}"
```

<br/>
# Step 2 **Cloud Natural Language API** [바로가기](https://goo.gl/uMMouk)
내용을 간단히 정리하면 Step 1 에서는 **음성정보를 Text** 로 변환을 했다면, 이번 Part 에서는 **입력한 Text를 분석하여 구체적인 정보** 를 출력하는 내용입니다. 예제에서는 해외의 유명한 미술가 작품을 입력하면, 해당 작가의 소개 및 작품에 대한 상세정보를 출력해 줍니다

## Key 값의 생성 및 자연어 분석을 위한 API 생성하기
```s
google_student@cloudshell:~ (gqewt12312) $ export GOOGLE_CLOUD_PROJECT=$(gcloud config get-value core/project)

google_student@cloudshell:~ (gqewt12312) $ gcloud iam service-accounts create my-natlang-sa \
  --display-name "my natural language service account"

google_student@cloudshell:~ (gqewt12312) $ gcloud iam service-accounts keys create ~/key.json \
  --iam-account my-natlang-sa@${GOOGLE_CLOUD_PROJECT}.iam.gserviceaccount.com

google_student@cloudshell:~ (gqewt12312) $ export GOOGLE_APPLICATION_CREDENTIALS="/home/USER/key.json"
```

이번 파트에서는 **API_KEY** 를 가져오는 부분이 조금 다른데, Step1 의 Tutorial 에서는 해당 메뉴를 클릭해서 생성된 Key 값을 가져오는 방식과는 다르게, 클라우드 실행과정 중 **2번** 에서 정의된 **프로젝트 기본값** 을  **Key 값으로** 활용합니다.

자연어 분석을 위한 API를 별도로 생성하면 해당정보가 **~/key.json** 의 파일로 저장됩니다 (`~/` 표시는 해당 드라이버의 Root 디렉토리를 의미합니다)

위에서 생성한 **프로젝트 기본값을 활용한 Key정보** 와 생성된 **~/key.json** 정보를 사용하여 본인을 인증한뒤 분석할 내용을 입력합니다

## 자연어를 입력하면 해당내용을 분석
```s
gcloud ml language analyze-entities --content="Michelangelo Caravaggio, Italian painter, is known for 'The Calling of Saint Matthew'."
```

**"미켈란젤로, 이탈리안 화가, The Calling of Saint Matthew 작품으로 유명함** 의 내용을 입력하면 해당 단어들의 중요도를 판단한 뒤, 단어별 가장 적합한 정보를 선별하여 사용자에게 알려줍니다.

여기서 한가지 아쉬운 부분은 **해당 단어별로 최적화된 정보를 1 ~ 5 가지 정도 출력해주면 사용자가 그중에서 취사선택이** 가능할텐데, 여기선 **가장 확률이 높은 1개만 추천** 하다보니 **만족할만한 원결과가 없으면 처음부터 새롭게 조건문을 짜야하는 어려움이 있어 보입니다** <strike>물론 구글이 모든 정보를 기계가 스스로 선별할 수 있어야 자동화가 완성 되겠지만 인간의 취향 문제는 녹녹치 않습니다 구글님</strike>

그리고 **작가와 국가를 다르게** 입력하면 `ex)피카소, 미국작가` 제대로 된 결과를 찾지 못햇고, 아쉽게도 우리나라의 김홍도, 김환기등을 입력했을때에는 **None** 을 출력하는 모습을 보여주었습니다.

<br/>
# Step 3 **Speech to Text Transcription with the Cloud Speech API** [바로가기](https://goo.gl/3p7YCY)
이번 과정은 쉬어가는 과정으로 **Step 1 Google Cloud Speech API** 과 거의 동일하고, **추가된 내용은 프랑스어 Speech 음성정보를 Text로(불어) 변환하는** 내용입니다.

이에 대해서는 Google Cloud 에서 한글로 자세한 설명이 되어있는 다음의 페이지를 참고하시는 편이 더 좋습니다 [Google Cloud 설명서](https://cloud.google.com/speech-to-text/docs/basics?hl=ko)

<br/>
# Step 4 **Entity and Sentiment Analysis with the Natural Language API** [바로가기](https://goo.gl/vrQkmi)
자연어의 **기본적인 자연어(고유어/일반어) 분석** 과 **감정분석(긍정/중립/부정)** 그리고 개별 단어들의 **객체어 분석** 과정을 출력하는 Google Cloud API를 실습합니다.

## 기본적인 자연어 분석
```json
{
  "document":{
    "type":"PLAIN_TEXT",
    "content":"Joanne Rowling, who writes under the pen names J. K. Rowling and Robert Galbraith, is a British novelist and screenwriter who wrote the Harry Potter fantasy series."
  },
  "encodingType":"UTF8"
}
```

**"content"** 에 입력한 해리포터 작가에 대한 Text를 입력하면 해당 문장에서 각각의 단어들을 분석합니다. 

주로 **명사** 에는 화자가 전달하려는 주요 정보들이 담겨있고, **(부사)동사/형용사** 에서는 명사들을 보다 구체적으로 설명하는 자연어 분석과정을 보여줍니다.

이번과정에서는 가장 기초적인 방식으로 해당 명사들이 **COMMON: 일반어** 인지 또는 **PROPER: 고유어** 인지를 판단합니다. 문장에서 고유어로 판단되는 내용을 보다 가중치를 갖고서 분석을 하면 보다 원하는 내용을 쉽게 파악가능한 장점이 있습니다.

대부분의 머신러닝 서비스들이 실제로는 **통계적인 분석/ 딥러닝 분석** 으로 나뉘고, Naver 의 파파고 서비스에서도 이를 구분해서 서비스를 제공하고 있습니다. 이러한 클라우드 서비스의 장점은 쉽게 결과를 볼 수 있다는 장점이 있는 반면에, 앞에서 설명했듯이 원하는 결과가 아니라면 처음부터 다시 작업을 해야하는 단점들이 존재하는건 공통적인 부분 같습니다. 

## 감정분석
사용자가 입력하는 2개의 문장, 즉 Sentence 별로 긍정/ 부정여부를 판단합니다
```json
 {
  "document":{
    "type":"PLAIN_TEXT",
    "content":"Harry Potter is the best book. I think everyone should read it."
  },
  "encodingType": "UTF8"
}
```
결과를 간단하게 살펴보면 **개별 문장의 긍정/ 부정 정도를 -1 ~ 1 사이의 값으로** 판단해서 출력합니다. 아무래도 분석을 위해선 **개별 token 별로 분석을 하고 통계적 요약을** 할 수 밖에 없어서 그런지 위의 문장과 같은 경우에도, 앞의 문장이 0.7 의 강한 긍정이고, 바로 뒤에 연결된 문장은 0.1 정도의 중립적인 결과를 도출합니다. 

```json
...
{ "text": { "content": "Harry Potter is the best book.",},
 "sentiment": {"score": 0.7} },
{ "text": { "content": "I think everyone should read it.",},
 "sentiment": {"score": 0.1} },
```
2번째 문장이 1번과 바로 이어지는 만큼 **상관성의 가중치** 가 더 반영된다면 보다 정확한 결과값이 될 듯 합니다 <strike>하지만 그만큼 개발비와 서버비용이 상승하겠죠</strike>

## 객체어 분석
아래의 문장에서 사용된 **명사** 에 대해 구체적으로 어떠한 분류에 해당되는지, **상품명, 서비스명, 회사명** 등을 분석해서 출력합니다. 
```json
 {
  "document":{
    "type":"PLAIN_TEXT",
    "content":"I liked the sushi but the service was terrible."
  },
  "encodingType": "UTF8"
}
```

문장에서 사용된 명사 **sushi, service** 2개의 단어에 대해서 설명을 합니다, 그런데 결과를 보면 **단어별 설명이 2번씩 반복된** 내용을 볼 수 있습니다. 이는 해당 단어가 **복합명사** (명사 여러개가 조합된 단어) 여부를 판단하여 출력한 내용으로 생각됩니다.

```json
{
    {
      "name": "sushi",
      "type": "CONSUMER_GOOD",
      "mentions": [
        { "type": "COMMON",
          "sentiment": {
            "magnitude": 0.9,
            "score": 0.9}
        }
      ],
      "sentiment": {
        "magnitude": 0.9,
        "score": 0.9
      }
    }, 
    {
      "name": "service",
      "type": "OTHER",
      "mentions": [
        {
          "text": {
            "content": "service",
            "beginOffset": 26
          },
          "type": "COMMON",
          "sentiment": {
            "magnitude": 0.9,
            "score": -0.9
          }
        }
      ],
      "sentiment": {
        "magnitude": 0.9,
        "score": -0.9
      }
    }
  ],
  "language": "en"
}
```
이 부분만큼은 딥러닝은 오히려 적은 문장정보로 인해 오인할 가능성이 높고 통계적인 방법으로 접근하는 방법이 좋다고 보여지는 부분입니다. <strike>말해봐요.. 구글 당신들도 딥러닝으로 간단한 분류를 했을 뿐 분석및 결과값 도출은 통계적 분석을 썼죠?? 아닌가요</strike>


## 문장의 구조적 분석
문장이 얼마나 문법적으로 완결되었는지, 짜임새 있게 구성되어 있는지 단어간의 관계 및 우선순위를 분석합니다.

```json
{
  "document":{
    "type":"PLAIN_TEXT",
    "content": "Joanne Rowling is a British novelist, screenwriter and film producer."
  },
  "encodingType": "UTF8"
}
```

이 부분은 [Cloud Natural Language](https://cloud.google.com/natural-language/) 에서 보다 자세하고 구체적인 예시들이 설명되어 있어서 위의 링크의 분석내용을 참고하시면 더 좋습니다
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/gcloud-text.png">
  <figcaption></figcaption>
</figure>

## 외국어 텍스트 분석
마지막으로 다른 외국어를 사용해서도 위와같은 서비스를 받을 수 있음을 보여주는 과정입니다. 별도 언어선택을 하지않고 바로 입력을 하면 결과를 출력해 줍니다. <strike>서비스가 가능하다고 했지 품질까지 동일하진 않다는게 함은정</strike>
```json
{
  "document":{
    "type":"PLAIN_TEXT",
    "content":"머신러닝 광교잼은 가장 우수한 성과를 보여줬습니다"
  }
}
```

<br/>
# 결론
이번 과정의 핵심은 Google Cloud 를 활용한 자연어 분석을 주고 다루고 있습니다. 기존의 단순한 사람과 사람의 소통의 부분은 자동화로 부분적 대체가 가능하다는 점인데, **콜서비스** 에서도 이 부분에 많은 준비가 되었었지만, **인간의 감정과 취향이라는 부분에 있어서** 만족하기 여렵기 때문에, 부분적으로 도입이 되고 있고 일반인 분들의 우려와 현장에서의 한계가 공존하고 있는 상황이긴 합니다.

앞으로 이를 최적화된 다양한 서비스를 제공하려고 할 것이고, 이를 활용하려는 여러 **플랫폼** 들과 **개별 사업장** 그리고 **우리의 환경이** 어떤방식으로 대응해 나아갈지를 주목해야 할 것으로 보입니다.