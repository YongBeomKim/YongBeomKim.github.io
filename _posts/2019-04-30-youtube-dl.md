---
title : youtube-dl 사용법
last_modified_at: 2019-04-30T10:45:06-05:00
header:
  overlay_image: /assets/images/code/youtube.jpg
categories:
  - youtube
tags: 
    - youtube
toc: true 
---

유투브 다운받아 활용하려는 경우가 많아서, 처음에는 **[Pytube](https://github.com/nficano/pytube)** 를 사용했지만 업데이트 주기가 늦던 중 **[youtube-dl](https://github.com/ytdl-org/youtube-dl)** 를 활용해보니 더 쉽고, 강력한 기능들이 많았습니다.

<br/>
# Install

```r
$ pip install --upgrade youtube-dl
```

<br/>
# How to Use

## Download from PlayList

개별 채널에 **PlayList** 에 묶여진 **모든 재생목록 보기** 내용을 가져오는 방법을 알아보겠습니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/youtube-playlist.jpg">
  <figcaption>Pycon 2018 동계 세미나</figcaption>
</figure>

예제로 [Pycon Korea](https://www.youtube.com/playlist?list=PLZPhyNeJvHRlhgbIE8lg2uqkp71i3eCZu) 세미나 자료를 확인합니다. 해당 파일마다 인코딩 정보들이 출력됩니다

```r
$ youtube-dl -F https://www.youtube.com/watch\?v\=RVH05S1qab8
[download] Downloading playlist: 격월 세미나
[download] Downloading video 1 of 11
format code  extension  resolution note
139 m4a        audio only DASH audio   51k , mp4a.40.5@ 48k (22050Hz)
140 m4a        audio only DASH audio  131k , mp4a.40.2@128k (44100Hz)
247 webm       1280x720   DASH video 1505k , vp9, 30fps, video only
136 mp4        1280x720   DASH video 2310k , avc1.4d4016, 30fps, video only
248 webm       1920x1080  DASH video 2646k , vp9, 30fps, video only
137 mp4        1920x1080  DASH video 5079k , avc1.640028, 30fps, video only
22  mp4        1280x720   hd720 , avc1.64001F, mp4a.40.2@192k (best)
```

목록을 살펴본 결과, **22** 번 인덱스는 **hd720** 포맷으로 **(best)** 다운로드 추천 포맷 입니다. 이를 선택하면 해당 설정의 파일들이 자동으로 다운로드 됩니다. 

화면 해상도를 1080p로 적용하고 싶은 경우에는 **audio only** 와 **video only** 포맷을 연결하여야 합니다. 즉 2번째와 같이 입력을 해야 합니다.

```r
$ youtube-dl -citw -f 22 https://www.youtube.com/watch\?v\=RVH05S1qab8
$ youtube-dl -citw -f 137+140  https://www.youtube.com/watch\?v\=RVH05S1qab8
```

## Download Single File

개별 파일을 다운로드 하는 경우에는 위의 옵션 중 **-citew** 를 제외하고 입력하면 됩니다.

## Download Subtitle

자동 완성된 자막 중 변역내용을 받고싶은 경우, 인터넷을 검색하면 **downsub.com** 을 추천 합니다. 하지만 해당 사이트는 광고가 많고 적용도 번거로운 대신, 이 모듈을 사용하면 보다 간단하게 활용 가능 합니다.

다음의 내용을 활용하면 다운 가능한 목록들이 출력 됩니다. 한글은 **ko** 로 표시 됩니다.

```r
$ youtube-dl --list-subs  https://www.youtube.com/watch\?v\=RVH05S1qab8
```

자동 생성된 자막도 번역된 내용을 받을 수 있습니다. 하지만 다음을 실행하면 **.vtt** 확장자로 다운을 받습니다

```r
$ youtube-dl --write-auto-sub --sub-lang ko --convert-subs srt https://www.youtube.com/watch\?v\=RVH05S1qab8

```

이를 srt 포맷으로 변경하기 위해 `--convert-subs srt` 를 추가합니다. 옵션에서 내용을 추가할 때에는 순서에 유의합니다.

```r
$ youtube-dl --write-auto-sub --sub-lang ko --convert-subs srt https://www.youtube.com/watch\?v\=RVH05S1qab8

```

<br/>
# 참고 사이트
https://seulcode.tistory.com/259