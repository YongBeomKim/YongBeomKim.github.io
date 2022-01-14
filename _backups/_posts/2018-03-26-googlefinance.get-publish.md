---
title : googlefinance.get 배포하기
last_modified_at: 2018-03-26T10:45:06-05:00
categories:
  - python
tags: 
    - pypi
    - googlefinance
    - python
---

## google finance client

pandas_datareader에 있는 `get_data_google`로 국내증시 데이터를 수집하기 위해 돌려보니, 데이터가 제대로 제공 안되고, 되더라도 간헐적으로만 된다는 Warning 메세지가 나를 반갑게 반겨주고 있었다 <strike>이런 젠장..</strike>

결국은 crawling인가?? 다행히도 <strike>노가다로</strike> 만들어 놓은 Daum, Naver 주가 수집 모듈들은 있지만, 이를 수업에 사용하긴 문제가 많았다.

20분 의 interval은 없지만, 1번 수집을 위해서 2000번 이상의 response를 작동하기 위해선 최소한 5분 이상을 소요하므로, 실제로 다른사람들에게 보여주는데는 문제가 많기 때문이다 .

오늘도 평화로운 <strike>우리의 개인정보를 씹어먹고 있는</strike> 존경하는 google 신에게 여쭤보니 만든지 2달 된 따끈 따끈한 `googlefinance.client`[link](https://github.com/pdevty/googlefinance-client-python) 가 있어서 설치하고 활용해본 결과...

`from googlefinance.client import get_price_data, get_prices_data, get_prices_time_data`

만들어 주신건 감사하지만, 함수들이 여러개로 분산되어 있고, 기능도 중복으로 단지 옵션과 설정 때문에 함수를 여러개로 나뉘어져 있었고...

이것만이면 그냥 쓸려고 했는데..

입력 query 값이 너무도 복잡하게 <strike>불편하게</strike>되어 있었다. 예전부터 google sheet 에서 함수로도 구현되던 기본 **code format**과는 동떨어지고, 불편해서 입력 query 만 고쳐써야지 하다가.. 함수가 중복되어 나뉜것도 불편해서 1개로 합치고 작업을 하다보니 금방 시간이 지나가 버렸다<strike>5시간이 걸린건 비밀.. ㅜㅜ</strike>
 

## pypi 등록 및 배포하기 [link](https://dojang.io/mod/page/view.php?id=1149)

그냥 수정만 하는거였다면 그냥 지나갔겠지만, 이왕에 작업을 하다보니 **_내 이름의 패키지를 배포해 보는 것도 좋겠다_** 라는 호기심이 생겼고, 처음으로 배포하는김에 github.io에 적어서 나중에 반복하기에도 용이하도록 정리를 해보려고 한다 


### 1. pypi 가입하기

`https://pypi.python.org/pypi` 에서 바로 가입은 안되고 1개 사이트를 더 거쳐서 가입을 하면 된다 <strike>이름과 비번, 이메일만 가입하면 끝.. 인증도 따로 없었다</strike>

### 2. 패키지를 git hub에 올리기 

패키지들을 보면, 단순 .py 만이 아니라, 여러 설정파일들이 있는걸 볼 수 있고<br>
이들이 어떤 역활을 하는지 전혀 모르는 나로써는 하나 하나 찾아가며 생성하는 방법밖에 없었다 

1. 우선 repository를 생성 후, Readme.md 와 폴더에 만든 함수파일을 저장했다
```
$ tree
.
├── README.md
└── googlefinance          # import 모듈 클래스 이름 
    └── __init__.py        # 함수
    └── get.py             # 함수 (내부에 코드를 입력)

1 directory, 3 files
```


2. setup.py 작성 [링크](https://jicjjang.github.io/2016/06/26/To-Deployment-PIP/) 등 몇개의 사이트를 참조<strike>복붙해서</strike> 작성

```python
# coding: utf-8

from setuptools import setup, find_packages

setup(
    name             = 'googlefinance.get',
    version          = '0.4.2',
    packages         = find_packages(),
    description      = 'googlefinance.get is a single function from google finance api to DataFrame.',
    license          = 'MIT',
    author           = 'Yong Beom Kim',
    author_email     = 'saltman21@naver.com',
    url              = 'https://github.com/YongBeomKim/googlefinance.get',
    download_url     = 'https://github.com/YongBeomKim/googlefinance.get/dist/googlefinance.get-0.4.2-py3-none-any.whl',
    keywords         = 'googlefinance',
    install_requires = ['requests', 'pandas'],
    classifiers      = ['Programming Language :: Python :: 3.6',
                        'Intended Audience :: Financial and Insurance Industry',
                        'License :: OSI Approved :: MIT License']
)
```


```
$ nano setup.cfg
    [metadata]
    description-file = README.md
```


3. LICENSE 작성하기

유사한 내용들 복사해서 붙여넣자 (이름과 내용만 잘 부분 수정하면 된다)


4. 배포하기

등록을 위한 비밀파일을 생성한다

```
$ sudo nano home/.pypirc

[distutils]
index-servers=
    pypi
    pypitest

[pypitest]
repository = https://testpypi.python.org/pypi
username   = ID이름

[pypi]
repository = https://pypi.python.org/pypi
username   = ID이름
```


`$ python setup.py bdist_wheel --universal`  패키지로 압축 (윈도우/리눅스) 

`$ twine upload dist/*`  twine 패키지로 전송!!

https://pypi.org/ 사이트에서 가입 후 메일인증을 안해서 오류가 발생..

```
$ twine upload dist/*
Uploading distributions to https://upload.pypi.org/legacy/
Enter your username:
Enter your password: 
Uploading googlefinance_get-0.3-py2.py3-none-any.whl
100%|█████████████████████████████| 7.47k/7.47k [00:01<00:00, 6.63kB/s]
```


올리긴 했는데....
검색은 되는데 다운은 안된다는 ...

누구는 다운은 금방되고 검색이 안된다는데 
우짜 이런일이 참이당...

```

$ pip search googlefinance.get
googlefinance.get (0.4.1)  - googlefinance.get is a single function from google finance api to DataFrame.

$ pip install googlefinance.get==0.4.1
Collecting googlefinance.get==0.4.1
  Could not find a version that satisfies the requirement googlefinance.get==0.4.1 (from versions: 0.3)
  No matching distribution found for googlefinance.get==0.4.1
```


pip로 바로 검색이 안될경우 site를 통해서 설치를 한다 



```
$ pip install -i https://pypi.python.org/pypi googlefinance.get
```

이것 때문에 하루종일 개고생했다. <strike>쓰담 쓰담.. ㅜㅜ</strike>