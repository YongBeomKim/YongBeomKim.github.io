---
title : 웹 서비스 기획하기
last_modified_at: 2019-02-14T10:45:06-05:00
header:
  overlay_image: /assets/images/project/service.jpg
categories:
  - service
tags: 
    - service
    - plan
toc: true 
---

기획을 위해 필요한 절차와 준비물을 간단하게 나열해 보겠습니다. 현재 작업중인 **작업 스케줄** [Gsheet](https://docs.google.com/spreadsheets/d/1Wywf6eM_N_9eRlogjfPc5DA-4gTg0_aTUnENHs80S2E/edit#gid=0) 입니다.

<br/>
# **디자이너 개발자의 웹기획하기**

1. 서비스에 대한 **Brain Storming**
2. <span style="color:red; font-weight:bold">Information Architecture</span> (스토리 보드 스케치)
3. 기능/ 버튼별 **기능정의서, 정책정의서** (자세할 수록 좋다)
4. **앞의 과정을 반복하며** 부족한 부분을 수정/ 보완합니다

**작업시 주의할 점!! :** 웹기획을 처음 시도하다 보니, 자료수집에 많은 시간을 허비 하였습니다. (2월 15~17일) 내용은 **서울창조센터** 및 **디자인 수업** 에서 익숙한 내용들이므로, 간단한 틀이 구성되면 진행한 뒤, 추후 보완하는 작업으로 속도를 높이겠습니다
{: .notice--info}

현재목표는 2019.02월 까지 1개의 Beta Site 를 Open 합니다. <strike>한 번 오픈을 하면 추후에 여러개 오픈하는건 식은죽 먹기겠쥬??</strike>
{: .notice--danger}

## 참고자료
1. **일관된 Concept** 기준을 정합니다
2. **단순, 명확한 기능을** 구현합니다 (범생이 Style)
3. **고객에게 구체적인 이득을** 전달합니다 

검색결과 웹 사이트 명함 페이지 기획자의 경험을 기록한 내용이 있어서 바로가기로 추가를 하게 되었습니다. 그리고 다음의 자료를 참고하면 어떤 방식으로 기획을 하는지를 구체적으로 알 수 있습니다. [쇼핑몰 스토리보드](https://hmtalk.com/download/쇼핑몰_스토리보드.ppt)

1. [삽질하며 배운 웹기획](https://brunch.co.kr/magazine/startup26)
2. [Full Guide 7 step](https://xbsoftware.com/blog/website-development-process-full-guide/)

<br/>
# Information Architecture

## Brain Storming
**해당 서비스에서 구현할 내용들을** Brain Storming 과정을 통해서 **1) 아이디어(피드백) 내용을** 취합하고 **2) 이들을 분류 및 구조화 Sketch** 를 거치면서 **서비스 내용을 구체화** 합니다. 취합의 과정은 [Google Sheet](https://www.google.com/sheets/about/) 와 같은 공유문서를 활용하고, 분류 및 구조화 과정은 [Trello](https://trello.com/b/UTc6X4FS/%ED%8A%B8%EB%A0%90%EB%A1%9C-%EC%AA%BC%EA%B0%9C%EA%B8%B0) 와 같은 사이트를 활용 합니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/project/ia-board.jpg">
  <figcaption>https://uxknowledgebase.com/information-architecture-part-1-43952465e498</figcaption>
</figure>

## 전략과 정책의 구체화
도축된 아이디어들을 취합한 뒤, 본격적으로 구체적인 사안을 해결하기 전에 **해당 서비스의 identity 를** 구체화 합니다. <small>**ex) 브랜드정책, 디자인정책, 상품정책, 운영정책, CS정책, 게시물관리 정책**</small> 에 대한 기준을 정의 합니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/project/ia-doc.jpg">
</figure>

**위에서 정의한 기준을** 바탕으로 **서비스에서 필요로 하는 내용(Feedback 요청사항)과 이를 극복할 구체적인 Idea** 를 사안별로 정리 합니다. <strike>정리를 잘 해야 진도를 나아갈 수 있습니다</strike> 

## Sketch Story Board
위에서 수립한 전략과 정책을 고려하여 필요한 기능/콘텐츠를 정의하고, 이를 바탕으로 메뉴구조를 조직화 합니다. 즉 구체적인 AI를 간단한 Map 의 형식으로 Sketch를 합니다. **이러한 작업을 UML(Unified Modeling language)** 라고 합니다. 대부분의 경우 **손으로 Sketch** 작업을 진행하지만 보다 구조화된 결과물을 위해서는 [Umlet](https://www.umlet.com/) 과 같은 도구들을 활용할 수 있습니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/project/ia-story.jpg">
</figure>

## Information Architecture 초안작성 완료하기
story board 를 바탕으로 위에서 정의한 정책들의 내용을 종합하여, 해당 서비스의 **전체적인 Information Architecture 초안을** 작성합니다. 

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/project/ia-draft.jpg">
</figure>

이 과정을 거치면서 필요한 내용들을 취합 및 구조화를 진행합니다. 초안을 바탕으로 해당 서비스의 진행과정을 색깔별로 구분하며 과정들은 점검 확인하는 용도로써 활용을 합니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/project/ia-table-work.jpg">
  <figcaption>작업중인 내용</figcaption>
</figure>

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/project/ia-table.jpg">
</figure>

<br/>
# Story Board
지금까지 **서비스의 뼈대를** 세웠다면, [draw FlowChart만들기](https://www.draw.io/) 이제부터는 **정의된 골격을 바탕으로 서비스 내용을 구체화** 합니다. [Ovenapp 서비스 페이지 만들어보기](https://ovenapp.io/) 위의 3가지를 모두 갖추었다면 개발작업이 훨씬 용이합니다.

## 필요한 문서들
**백핸드 와 프론트 데이터 흐름을** 우선적으로 구체적으로 정의한 뒤, 이를 바탕으로 스토리 보드를 구성 및 보완합니다. 이를 통해서 다음의 과정을 계속적으로 반복 정의를 합니다.

1. **Information Architecture**
2. 공통된 Layout **ex) Header, Menu**
3. 각 버튼과 메뉴의 상호작용을 기록한 Flow Chart 
4. 콘텐츠 기획내용 추가하기 (전체적인 통일성을 추가)
5. 스토리 보드는 계속 Develop 해 나아갑니다

## 데이터 흐름 정의하기
Django 에서 Back-hand 와 Front-hand 에서 **어떻게 데이터를 구조화** 할 것인가에 대해서 개념정의를 분명하게 해야 합니다. 이러한 토대 위에서 최적화/ 모듈의 추가/ Style의 정의와 같은 작업들을 단계별로 접근해 나아가야만, **전체적인 구조가 흔들리지 않으면서, 다양한 시도들을 견고하게 구현할 수 있습니다.**

그리고 고민하는 부분이 구현 기술인데, 가장 손쉬운 **직렬화 (Json.dump), Serializer (Django 미들웨어), Restful API (django-restful)** 구조화 등의 방법이 있습니다. 최근에는 Graph-gl 을 사용하는 방법들도 논의되고 있지만 이번에는 제외하도록 하겠습니다. <strike>잘 몰라서 그러는거 아냐? 맞습니다 맞구요~</strike>

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/project/menu-rdb.jpg">
  <figcaption>초기 ERD 구조화 작업내용</figcaption>
</figure>

위 예제는 객체 지향적인 구분없이 1개의 덩어리로 구조화가 되어 있다. 이러한 경우에는 1개의 필드에 문제가 생기면 전체적인 흐름에 문제가 생길 수 있어서 안전성이 떨어집니다. 

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/project/ia-table-work.jpg">
</figure>

앞에서 정의한 **Information Architecture 초안을** 바탕으로 개별 APP 에서 필요로 하는 데이터를 구체화 하는 과정이 필요합니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/project/ia-flow.png">
</figure>
