---
title : python whl pypi 패키지 만들기
last_modified_at: 2019-01-05T10:45:06-05:00
header:
  overlay_image: /assets/images/code/gituni.jpg
categories:
  - python
tags: 
    - whl
    - pypi
    - python
toc: true 
---

2019년 1월부터 GitHub 에서 3개의 private repository를 제공하는 뉴스가 나왔고 이를 사용하여 **간단한 package 배포내용을** 정리해 보겠습니다. <strike>점점 더 1등만 기억하는 더러운 세상이 강화되는 느낌이 드는건..</strike>

<br/>
# Python Docstring
**Docstring** 은 Python 함수나 클래스 맨 위에 **해당 객체를 설명하는 내용으로** 자세하게 내용과 파라미터들을 적어놓은 뒤, 설치 후 사용시마다 `Shift + Tap` 만 누르면 해당 내용을 확인할 수 있습니다. 배포/ 설치는 범용적으로 활용하기 때문에 항상 내용을 정리하는 습관을 들이면 좋습니다.
```python
def test(a, b):

    r"""파이썬함수 입니다
      :param a: (float) 숫자1
    :param b: (float) 숫자2
    :return: (float)"""

    return a + b
```

<br/>
# Project Packaging
## Create Package
배포시 사용할 Package 폴더를 만든 뒤, 작업한 class, def 를 App별로 파일로 묶은 파일을 추가합니다.  `LICENSE` 와 `README.rst` 는 Github 에서 repository를 생성하면서 자동으로 추가됩니다. 
```
├── LICENSE
├── README.rst
└── 프로젝트_이름
    ├── 앱_이름.py
    └── 앱_이름.py
```

### __init__.py
**프로젝트 시작을 선언하는 파일을** 생성합니다. 패키지 생성시 **기준점으로 활용되기** 때문에 꼭 필요한 파일 입니다.
```python
# __import__('pkg_resources').declare_namespace(__name__)
```

### README.rst 
[Rst 문법예제](http://svn.python.org/projects/external/Sphinx-1.2/doc/markup/code.rst) 를 살펴보면 LaTex 과는 달라서 그대로 사용하면 제대로 표현이 되지 않습니다. 위의 예제를 참고하여 원하는 내용을 기록합니다. [reStructure 온라인 에디터](http://rst.ninjs.org/#)
```javascript
.. image:: https://media.sproutsocial.com/uploads/2015/04/API_defined3-02.png
    :target: https://www.google.com/finance

프로젝트 이름
============

.. image:: https://img.shields.io/github/size/webcaetano/craft/build/phaser-craft.min.js.svg

.. image:: https://img.shields.io/pypi/v/requests.svg
    :target: https://pypi.org/project/requests/

.. image:: https://img.shields.io/pypi/pyversions/requests.svg
    :target: https://pypi.org/project/requests/

Personal functions and Api, Json generators

앱 이름
=======
앱의 내용을 설명합니다

.. code-block:: python

    linebar(data, types='line', zoom='False')
    candle(data, height=350, title='None', title_font='14px')

© 2019 GitHub : https://github.com/YongBeomKim/
```

### Shields Icons
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/shields.png">
  <figcaption>$ npm run build</figcaption>
</figure> 
소스코드 설명페이지를 보면 **version 정보를 표시하는 icon** 이미지를 종종 볼 수 있습니다. 이는 링크로 연결하며 활용하는 것들로 **Image Source** 를 제공하는 곳으로 [https://shields.io/#/](https://shields.io/#/) 가 있습니다. 이곳의 이미지 링크를 사용하여 내용에 추가를 합니다.

### ./setup.py
> `$ pip install setuptools`

이제는 배포용 파일을 생성합니다. 위의 [패키지](https://pypi.org/project/setuptools/) 가 설치되어 있지 않는다면 위의 설치내용을 추가한 뒤 **setuptools** 패키지의 **setup() 와 find_packages()** 를 사용합니다. 아래의 내용을 참고하여 목적과 내용에 맞는 내용을 수정 보완하여 입력합니다.
```python
# coding: utf-8
from codecs import open
from setuptools import setup, find_packages

with open('README.rst', 'r', 'utf-8') as f:
    readme = f.read()

setup(
    name             = '프로젝트_이름',
    version          = '0.0.1',
    packages         = find_packages(),
    description      = '프로젝트 설명하는 내용을 서술합니다',
    long_description = readme,
    long_description_content_type = 'text/x-rst',
    license          = '',
    author           = '작성자',
    author_email     = '작성자 이메일',
    url              = 'Git저장소',
    download_url     = 'Git에 저장된 whl 배포용 압축파일',
    install_requires = ['의존성을 갖는 패키지 목록',
                        'pandas',],
    classifiers      = ['Programming Language :: Python :: 3.6',
                        'Intended Audience :: Financial and Insurance Industry',
                        'License :: OSI Approved :: Closed Sorce Software']
    )
```

**setup()** 함수의 파라미터를 정리하면 다음과 같습니다.

| 파라미터 |  설명                                      |
|:--------:|:------------------------------------------:|
|name      |패키지 이름(PYPI에 어떻게 나열될지를 지정)  |
|버전      |적절한 의존성 관리를 유지하는 데 중요합니다.|
|url       |패키지 URL. 일반적으로 깃허브(GitHub)       |
|packages  |서브 패키지 목록으로 find_packages()가 활용 |
|setup_requires| 이곳에 의존성을 지정합니다             |
|test_suite|테스트 시 실행할 도구                       |

### ./setup.cfg
위의 설치한 내용을 확인하기 위해 `$ python setup.py test` 를 실행하여 단위 테스트를 실행합니다. 내용이 제대로 통과되었다면 다음과 같이 파일을 내용을 추가합니다.
```javascript
[metadata]
description-file = README.rst

[nosetests]
verbose = 1
nocapture = 1
```

<br/>
# Project build 
> $ python setup.py **bdist_wheel**

위의 준비들을 모두 거쳤다면, build 파일을 생성합니다. 위 명령은 **순수 휠 또는 플랫폼 휠을 빌드하는 명령으로** 이로써 생성된 `./dist/프로젝트-버젼-정보.whl` 파일만 있으면 어떠한 환경에서도 `$ pip install 프로젝트-버젼-정보.whl` 을 사용하여 해당 프로젝트를 설치 및 활용할 수 있습니다. 

<br/>
# PyPi 배포하기 
> $ python setup.py **sdist**

소스 배포판을 만들기 위해서는 위의 명령을 실행합니다. 기타 Pypi와의 연결 및 내용 전송 및 확인등은 앞에 정리한 내용을 참고하면 됩니다.

<br/>
# 참고 사이트
[나만의 패키지 만들기](https://code.tutsplus.com/ko/tutorials/how-to-write-your-own-python-packages--cms-26076)<br/>
[파이썬 패키지 배포하기](https://rampart81.github.io/post/python_package_publish/)