---
title : mecab 설치하기 / 자연어 분석 기초
last_modified_at: 2019-01-20T10:45:06-05:00
header:
  overlay_image: /assets/images/code/nlp.png
categories:
  - nltk
tags: 
    - nltk
---

# 자연어 분석을 위한 머신러닝/ 딥러닝 기초
nltk basic

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/whatisnlp.jpg">
  <figcaption>이미지 출처 : https://www.nlpacademy.co.uk</figcaption>
</figure>

기본적인 Python 문법을 이해하는 분들을 대상으로, 자연어 분석을 **시작하는 분들을 위한** 기초 수업입니다.

**자연어 분석 Process** 를 이해함으로써 **본인이 원하는 활용 분야에 어떠한 방식으로 접근할 수 있을지 통찰을 얻으실 수 있도록** 수업을 구성 하였습니다.

1. **Chapter 1 : 자연어 데이터 특징**
2. **Chapter 2 : 자연어 분석 방법론**
3. **Chapter 3 : 자연어 Token 다듬기**
4. **Chapter 4 : Word Cloud**
5. **Chapter 5 : Word 2 Vec**

모든 실습코드는 **Google Colaboratory** (Python 3) 에 최적화 되어 있습니다.

<br/>
# Mecab
우분투를 쓰면서 Mecab을 설치해 보고 싶었지만 계속 실패하다가 오늘 필받아서 설치했더니 바로 성공해 버렸다. <strike>(결국 중요한건 운빨인가 ㅜㅜ..)</strike> 작년 Alpha LAW 에서 **Colab** 에서는 실패했었는데 여기서도 설치를 성공하는 방법을 알아보겠습니다

## Mecab 설치하기 [(Web)](https://bitbucket.org/eunjeon/mecab-ko-dic)
**GridSearchCV()** 를 실행하면서 CPU의 Cache 로만 작동하는데 답답함을 느끼다가 Mecab 에서 GPU 연산을 지원한다는 내용에 바로 설치를 해야겠다고 결정을 하게 되었습니다.

우선 Mecab 을 설치합니다. 뒤에 서술하겠지만 문제가 생긴 부분은 virtualenv 에서 Mecab 을 찾지 못했고 이를 보완하기 위해 **mecab-python-0.996.git** 을 추가로 설치를 함으로써 문제를 해결할 수 있었습니다.

위의 페이지로 이동하여 진행과정을 따라가며 **mecab-ko** 모듈을 설치한 뒤 **mecab-ko-dic** 최신 데이터를 다운받아서 설치합니다.

```r
1. Ubuntu

Install dependencies
# Install Java 1.7 or up
$ sudo apt-get install g++ openjdk-8-jdk python-dev python3-dev
$ pip3 install konlpy       # Python 3.x
$ pip3 install mecab-python3

Install MeCab (optional)
$ sudo apt-get install curl
$ bash <(curl -s https://raw.githubusercontent.com/konlpy/konlpy/master/scripts/mecab.sh)

2. CentOS
Install dependencies
# Install Java 1.7 or up
$ sudo yum install gcc-c++ java-1.8.0-openjdk-devel python-devel
$ pip3 install konlpy       # Python 3.x
$ pip3 install mecab-python3

Install MeCab (optional)
$ sudo yum install curl
$ bash <(curl -s https://raw.githubusercontent.com/konlpy/konlpy/master/scripts/mecab.sh)
```

앞의 설치내용은 **sudo** 권한에서 설치한 것으로 **Virtual** 환경에 설치된 파이썬을 활용하여 IDE 를 실행하면 **Konlpy** 는 작동 되지만,  **Meacb 클래스 인스턴스** 를 호출하면 다음과 같은 오류를 출력합니다.

```r
  File "/usr/local/lib/python3.6/site-packages/konlpy/tag/_mecab.py", line 102, in __init__
    self.tagger = Tagger('-d %s' % dicpath)
NameError: name 'Tagger' is not defined
```
특히 Virtualenv 환경에서 실행하는 경우에 발생하는데, mecab 데이터와 연결을 도와주는 **https://bitbucket.org/eunjeon/mecab-ko-dic** 모듈을 [설치합니다](https://github.com/konlpy/konlpy/issues/144)

```r
(venv) git clone https://bitbucket.org/eunjeon/mecab-python-0.996.git
(venv) cd mecab-python-0.996/
(venv) python3 setup.py build
(venv) python3 setup.py install

cf) CentOS는 다음의 설정을 추가 합니다.
(venv) su
$ vi /etc/ld.so.conf
/usr/local/lib
```

CentOS 관련 내용은 [](https://victorydntmd.tistory.com/264) 내용을 참고로 설치하니 제대로 작동 되었습니다. 별도 Java 작업을 하지 않는 한 **javac 는 1.7** 로 설치를 하여 **Jpype** 와 호환성을 높이도록 하는게 좋을 듯 합니다.

이와같은 작업들이 완료된 뒤 간단한 예제로 확인을 합니다.

```python
In [1]: from konlpy.tag import Mecab
In [2]: mecab = Mecab()
In [3]: mecab.morphs(u'영등포구 여의도동 맛집을 알려주세요')
Out[3]: ['영등포구', '여의도동', '맛집', '을', '알려', '주', '세요']
```

## **Jpype** 버젼의 확인

2019년 7월 JPype 는 0.7 버젼으로 업데이트 되었고, 이를 바탕으로 실행을 하는 경우 특히 **한나눔** 이나 **코모란** 의 실행시 다음과 같은 메세지 오류를 출력합니다. 실행에는 문제가 없을 수 도 있지만, 많은 데이터를 처리하는 경우는 멈추는 경우가 발생하기도 합니다.

```
/home/markbaum/Python/nltk/lib/python3.6/site-packages/jpype/_core.py:210: UserWarning: 
-------------------------------------------------------------------------------
Deprecated: convertStrings was not specified when starting the JVM. The default
behavior in JPype will be False starting in JPype 0.8. The recommended setting
for new code is convertStrings=False.  The legacy value of True was assumed for
this session. If you are a user of an application that reported this warning,
please file a ticket with the developer.
-------------------------------------------------------------------------------
```

이와 관련된 오류는 [Ellun's Library](https://ellun.tistory.com/46) 에 자세하게 설명이 되어 있고 이를 참고하면 `pip install JPype==0.6.3` 으로 버젼을 낮춰서 설치를 하면 다음과 같은 오류가 더이상 발생하지 않습니다.





<br/>
# Khaiii 설치

이번 자연어 수업을 거치면서 Kakao 에서 CNN 을 활용한 자연어 분석도구를 알게 되었는데 이를 설치하는 방법을 알아보도록 하겠습니다. 설치관련 자세한 내용은 [Git Issue](https://github.com/kakao/khaiii/wiki/%EB%B9%8C%EB%93%9C-%EB%B0%8F-%EC%84%A4%EC%B9%98) 페이지를 확인 합니다.


## 빌드 및 설치

**[CentOS 설치법](https://lsjsj92.tistory.com/408?category=792966)** 설치방법을 간단하게 요약하면 su 권한으로 Kahii 를 설치를 하고, 추후에 Python 과 연동하는 방식으로 접근을 합니다. **CentOS** 서버에서 작업을 바탕으로 정리를 해 보겠습니다.

```javascript
$ su
$ [root@localhost]~# git clone https://github.com/kakao/khaiii.git
$ [root@localhost]~/khaiii# cd khaiii
$ [root@localhost]~/khaiii# mkdir build
$ [root@localhost]~/khaiii# cd build
$ [root@localhost]~/khaiii/build# cmake .. 
```

작업이 진행되다가 오류가 발생합니다.

```r
------------------------------ WIKI -------------------------------
    https://github.com/ruslo/hunter/wiki/error.broken.package
-------------------------------------------------------------------

CMake Error at /root/.hunter/_Base/Download/Hunter/0.23.34/70287b1/Unpacked/cmake/modules/hunter_wiki.cmake:12 (message):
Call Stack (most recent call first):
  /root/.hunter/_Base/Download/Hunter/0.23.34/70287b1/Unpacked/cmake/modules/hunter_report_broken_package.cmake:14 (hunter_fatal_error)
  /root/.hunter/_Base/Download/Hunter/0.23.34/70287b1/Unpacked/cmake/projects/nlohmann_json/hunter.cmake:14 (hunter_report_broken_package)
```

https://github.com/kakao/khaiii/wiki/%EB%B9%8C%EB%93%9C-%EB%B0%8F-%EC%84%A4%EC%B9%98

https://lsjsj92.tistory.com/408?category=792966

https://provia.tistory.com/56

https://hanshuginn.blogspot.com/2019/02/khaiii.html

등을 참고하여 설치를 진행해 보겠습니다. 현재는 문제가 있어서 설치중 오류를 해결 못하고 있습니다..


yum install libmpc-devel mpfr-devel gmp-devel