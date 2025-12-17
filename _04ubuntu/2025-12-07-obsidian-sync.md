---
layout: blog
title: Obsidian 을 Android 에서 동기화(Sync)
tags:
- obsidian
---

`remote-safely` 등을 활용하여 동기화 하는 방법에 대하여 간단하게 정리해 보겠습니다.

우선 Obsidian 을 설치 및 초기설정을 진행합니다.

1. Obsidian 을 설치 합니다.
2. `설정 > Obsidian 정보 > 계정 - 내 계정` 에서 사용자 정보를 입력 합니다.
3. `Create vault` 로 작업을 진행할 이름 및 폴더를 특정합니다. (추후 변경 가능합니다)

`Obsidian` 의 초기설정이 완료되었습니다. 동기화를 진행하고 있는 주소를 해당 기기와 동기화 진행을 위하여 [FolderSync](https://play.google.com/store/apps/details?id=dk.tacit.android.foldersync.lite&pli=1) 를 기기에 설치 합니다.

이번에는 `DropBox` 무료계정을 활용하여 `Obsidian` 과 동기화하는 과정을 살펴보겠습니다.

<div style="text-align: center;">
  <figure class="align-center">
    <img width="550" src="{{site.baseurl}}/assets/web/sync_01.jpg">
    <figcaption>기기내 폴더와 동기화 설정을 실행합니다.</figcaption>
  </figure>
</div>

<div style="text-align: center;">
  <figure class="align-center">
    <img width="550" src="{{site.baseurl}}/assets/web/sync_02.jpg">
    <figcaption>`우측` 공유장치서 `좌측` 기기 폴더로 동기화</figcaption>
  </figure>
</div>

<div style="text-align: center;">
  <figure class="align-center">
    <img width="550" src="{{site.baseurl}}/assets/web/sync_03.jpg">
    <figcaption>`공유장치` 가능한 서비스는 다음과 같습니다</figcaption>
  </figure>
</div>

<div style="text-align: center;">
  <figure class="align-center">
    <img width="550" src="{{site.baseurl}}/assets/web/sync_04.jpg">
    <figcaption>동기화 설정이 완료되면 이와 같이 표시 됩니다</figcaption>
  </figure>
</div>

<div style="text-align: center;">
  <figure class="align-center">
    <img width="550" src="{{site.baseurl}}/assets/web/sync_05.jpg">
    <figcaption>동기화 작업이 완료되면 다음과 같습니다</figcaption>
  </figure>
</div>

`Obsidian` 에서 위에서 Sync 동작을 완료한 작업 폴더를 특정하여 불러온 뒤, 해당 작업 폴더에서 활용한 플러그인 들을 설치하면 보다 원활한 동기화 내용을 확인할 수 있습니다

# 참고사이트
- [동기화와 백업 솔루션을 제공하는 Remotely Save 플러그인](https://kaminik.tistory.com/entry/%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EB%8F%99%EA%B8%B0%ED%99%94%EC%99%80-%EB%B0%B1%EC%97%85-%EC%86%94%EB%A3%A8%EC%85%98%EC%9D%84-%EC%A0%9C%EA%B3%B5%ED%95%98%EB%8A%94-Remotely-Save-%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8)