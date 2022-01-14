---
title : python anywhere 설정
last_modified_at: 2019-04-27T02:45:06-05:00
header:
  overlay_image: /assets/images/code/server.jpg
categories:
  - python
tags: 
    - python
    - django
    - pythonanywhere
toc: true 
---

예비창업프로그램에 시연하는 사이트를 제작하면서, 별도 도메인 없이 Django 배포가 쉬운 방법을 찾아보니 그나마 제일 잘 정리된 곳이 https://www.pythonanywhere.com 였습니다.

<br/>
# pythonanywhere.com

## pythonanywhere 설정 초기화 하기
1일 접속량이 제한되어 있고 (차단이 아닌 속도가 늦게 접속됩니다), 3개월 마다 서버를 reboot 하는 점만 제외하면 간단하게 시연하는 용도로는 적합 합니다. 예전에 작업한 내용이 있는데 해당 내용을 잊어서 새로 작업을 하려다 보면 550mb 용량 제한으로 활용 가능한 공간이 부족합니다.

따라서 초기화가 필요한데 계정 삭제도 별도 이메일을 요구하는 등 어려운 부분이 존재합니다.

작업해본 결과 터미널에서 진행하는 내용이 가장 쉬웠습니다. [Disk QuotaExceeded](http://help.pythonanywhere.com/pages/DiskQuota/) 참고하여 용량이 큰 폴더들을 지워 주면 됩니다.

```s
$ du -hs /tmp ~/.[!.]* ~/* | sort -h    # 폴더벌 용량 확인
$ rm -rf /tmp/*
$ rm -rf ~/.local
$ rm -rf ~/.cache
```

<br/>
# Django 의 배포
새로 작업을 하면서 잘 안되는 부분들이 몇몇 있었는데, 해당 사이트만의 특징들만 잘 알고 정리하면 되는 부분 들이었습니다. 이번 기회에 관련된 내용들을 정리해 보겠습니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/SCoGwHCNXVw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>

## Manual Configuration 설정
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/pyany01.png">
</figure>

기본 설정이 Django 1.1 에 맞춰있고, 사용자가 추가로 필요로 하는 모듈의 설정을 필요로 합니다. 따라서 가입을 한 뒤 web app 을 추가하는 과정에서, Django 나 Flask 가 아닌 **사용자 임의 설정을** 선택합니다.  

## Bash 에서 virtualenv 추가

```s
$  mkvirtualenv 가상환경이름 --python=/usr/bin/pthon3.6
```
위와 같이 입력을 하면 `(가상환경이름)` 으로 python 3.6 에 맞는 환경이 추가되고, 사용자가 원하는 모듈의 설치를 위해 `$ pip install -r requirement.txt` 와 같은 방법으로 설치를 합니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/pyany02.png">
</figure>

해당 환경을 종료한 뒤 동일한 가상환경에 다시 접속할 때에는, Web App 설정에서 위의 가상환경 이름을 추가한 뒤 해당 설정연결을 활용하는 방법이 가장 효과적 입니다.

## /var/www/이름_pythonanywhere_com_wsgi.py

설치된 환경에 있는 `wsgi.py` 와 별도로 해당 시스템에서 연결하는 파일의 내용을 변경합니다. **Manual Configuration** 을 선택하면 기본 도메인 서버에서는 해당 내용을 출력합니다.

해당 파일을 열고서 **Django** 의 설정 내용을 추가 합니다. 배포할 목적으로 작업한 내용을 해당 작업 폴더에 압축을 풀고서 설치를 한 뒤, project 폴더명과, setting.py 파일이 있는 폴더 이름을 추가합니다.

그리고 static 폴더의 설정도 해당 페이지에서 맞춰 주는 등 관련 설정내용을 사용자가 설치한 내용과 동일하게 맞춰 줍니다.

## os.path.join(BASE_DIR, '')

이번에 작업하면서 가장 어려움을 격었던 부분이 **views.py** 에서 **절대 경로로 호출하는 파일들** 의 연결 이었습니다. localhost 로 작업을 하면 프로젝트 기본폴더가 BASE_DIR 로 자동 설정되어 관련 파일들을 절대경로를 사용하면 쉽게 가져올 수 있었는데, 이곳에서는 해당 파일을 찾지 못한다는 오류가 계속 발생하였습니다.

[No Such File Or Directory 오류시](https://help.pythonanywhere.com/pages/NoSuchFileOrDirectory/) 페이지에 나온 것처럼 아래의 코드를 사용합니다. 주의할 점은 개별 app 에서는 해당 app 을 기본 폴더로 설정하는 만큼 개별 app 하위에 **THIS_FOLDER** 를 만들고 해당 폴더에 관련 파일을 넣어야 제대로 작동 합니다.

```python
import os
THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
my_file = os.path.join(THIS_FOLDER, 'myfile.pkl')
```