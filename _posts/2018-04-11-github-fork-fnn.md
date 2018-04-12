---
title : GitHub 에서 수정본 만들기
last_modified_at: 2018-04-11T20:45:06-05:00
tags: 
    - github
    - fnn
    - fork
---


# GitHub에서 수정본 만들기 [초코몽키](https://wayhome25.github.io/git/2017/07/08/git-first-pull-request-story/)

이제는 조금 작업을 할 줄 안다고 이것 저것 만지다 보면, 모듈 중에서도 수정하고 싶은 내용들이 요즘엔 자주 생긴다.

처음에는 **brench** 로 수정본들 끌어오면 되는줄 알았는데, 자료를 찾다 보니 **fork**로 찍어서 내 GitHub로 불러온 뒤 작업하는 방법이 정석으로 보인다.

요약> **fork**로 찍어서 가져온다 ==> **clone** 으로 불러와 작업 ==>  **commit** 으로 작업 ==>  **push** 로 공유를 한다