---
title : django로 배우는 테스트 주도 개발 1
last_modified_at: 2018-04-08T10:45:06-05:00
tags: 
    - tdd
    - django
    - selenium
---


# 시작하기

예전부터 **_Test 주도 개발_** 에 관심은 있었지만,<br>
번역서가 오래 되어 손이 안가는 측면이 하나 있고<br> 
분절된 진도를 혼자서 따라가려 했지만 여려웠었다.<br>

그러던 중 관련 YouTube [YouTube](https://www.youtube.com/channel/UC6RK-BtC1wqu4OUEcOEPvtw) 를 발견했지만 아쉽게도 6개월 전에 업로드가 중단되어 있었다

동영상 내용을 살펴본 결과
1. TDD에 대한 개념을
2. **_PyCharm_** 설치 및 환경설정 
이 두가지 내용은 꼭 확인하고 싶었던 내용이기도 해서 이렇게 정리를 해보려고 한다


# Selenium 설치 [Gecko](http://nsinc.tistory.com/186)

예전에는 selenium만 설치하면 된다고 알고 있었는데.. 지금 생각해보면 외부 브라우저와 잘 연결이 안되어서 PhantomJS를 주로 쓰긴 했었다..

`Gecho` 는 Mozila 재단에서 개발된 웹브라우저 엔진으로 이걸설치 안하고 실행하니까 PyCharm 에서 **"Message: 'geckodriver' executable needs to be in PATH."** 오류가 발생했다.

우선  `https://github.com/mozilla/geckodriver/releases`[link](https://github.com/mozilla/geckodriver/releases) 에서 OS와 64/ 32bit 에 맞게 다운 후

```
$  tar zxvf geckodriver-v0.20.1-linux64.tar.gz  # 다운파일 압축을 푼다
$  chmod +x geckodriver                         # 파일을 활성화 한다
$  sudo mv geckodriver /usr/local/bin/          # 시스템 폴더로 이동한다
```


# PyCharm 설치 및 환경설정

1. 시작화면에서 **Open**을 누르고,django 해당 프로젝트 폴더를 선택한다
2. file >> setting >>  Project:이름 >> `venv이름/bin/python3.6`를 연결한다 
3. run >> Edit configuration >> '+' >> python >>  이름과, manage.py, 파라미터 (runserver) 를 입력하면 상단에 연결 버튼이 생성된다 
4. Theme [다운로드](http://color-themes.com/?view=index) <strike>이것 저것 해봐도 MONOKAI가 가장 무난</strike>
5. Setting >> color scheme >> 테마선택 >> Python (파이썬 item 별 색 변경가능)
6. Setting >> Editor >> Font >> Default 설정을 불러온 뒤 수정