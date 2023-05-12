---
layout: blog
title: OpenRefine
tags:
- cloud
---

2023년 AIExpo 를 방문한 결과 참가업체 중 약 25% 이상이 `데이터 전처리 업체`가 참가한 것을 볼 수 있었습니다. 이는 `데이터 바우처 지원사업` 의 영향으로 계속 성장하는 분야 입니다. 개인 프로젝트를 진행하면서 전처리 작업을 진행하는데 혼자 작업을 할 때에는 `Regex` 를 활용한 코딩을 사용하고 있지만 전체를 보면서 부족한 부분을 점검 및 확인하는 과정에는 어려움이 있습니다.

향후에는 전처리 작업을 외부인의 도움을 받을 것으로도 예상되고 있습니다. 이러한 작업을 수월하게 돕는 도구가 필요하다고 생각 되어서 몇가지 목록을 확인할 수 있었습니다. [OpenRefine Alternatives](https://alternativeto.net/software/google-refine/) 이중에 가장 역사가 길고 자료가 풍부한 `Open Refine` 에 대해서 알아 보도록 하겠습니다.

<iframe width="450" height="253" src="https://www.youtube.com/embed/oRH-1RG8oQY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br/>

# OpenRefine
OpneRefine 은 Java 로 만들어서 Java 모듈이 먼저 설치되어 있어야 합니다. [Java version history](https://en.wikipedia.org/wiki/Java_version_history) 를 보면 `2018`년 부터 배포된 `Java SE 11 (LTS)` 버젼을 설치하면 됩니다. 다음 예정된 `LTS` 버젼은 `2023년 9월` 부터 배포될 `Java SE 21` 버전 이여서, Java 를 필요로 하는 대부분의 경우 `Java 11` 을 설치하면 됩니다.

## Install
- **[OpenRefine - HomePage](https://openrefine.org/download)**
- **[OpenRefine - Release GitHub](https://github.com/OpenRefine/OpenRefine/releases)**

우분투 환경에서는 `tar.gz` 압축파일 형태로 배포하고 있습니다. 설치 스크립트는 다음과 같습니다. [Ubuntu 22.04 에서 설치방법](https://gist.github.com/felixlohmeier/0ec8b2e8241356ed52af072d9102b391) 에 대해서 구체적인 내용은 링크내용을 참고 합니다.

```bash
# 의존성 문제를 해결하기 위해 Java를 먼저 설치합니다
$ sudo apt install openjdk-11-jre-headless unzip

# 한번에 압출 풀기 및 설치Permalink
$ tar zxvf filename.tar.gz

# 리눅스 tar.xz 파일 설치Permalink
$ tar xf filename.tar.xz
```

## 실행
`OpenRefine` 은 `localhost:3333` 번 포트로 실행이 되어서 해당 주소를 브라우저에 입력하는 방식으로 실행 합니다. `OpenRefine` 프로젝트의 예전 이름이 `Freebase Gridworks` -> `Google Refine` 에서 옮겨와서 그런지 `Chrome` 브라우저에서 실행하는 것을 추천하는 내용을 확인할 수 있었습니다.

## 보안실행
`OpenRefine` 을 실행한 뒤, 실행 주소와 포트 번호로 접속하면 바로 사용 가능합니다. 때문에 외부사용자가 접근 가능한 경우에는 보안설정을 추가로 필요로 하는데 이를 스크립트로 정리한 [psychemedia/openrefiine_secure.sh](https://gist.github.com/psychemedia/f256960c112347dd410c2beec8ce05e3) 등의 내용을 참고 합니다.

별도의 모듈을 추가로 설치 및 관리하는 방법 [Introducing OpenRefine Authenticator and File Extensions](https://kb.refinepro.com/2022/04/introducing-openrefine-authenticator.html) 도 있습니다.

<br/>

# 참고사이트
- [OpenRefine on AWS EC2 server](https://jonathansoma.com/lede/algorithms-2017/servers/openrefine/)
- [How to password-protect an on-the-net OpenRefine instance](https://groups.google.com/g/openrefine/c/xCs2yiQ8RhU/m/uHAWp1qDDwAJ?pli=1)
- 