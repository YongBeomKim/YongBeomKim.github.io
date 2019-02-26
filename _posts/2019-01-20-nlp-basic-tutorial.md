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

파이썬 IDE 를 실행하면 **Konlpy** 에서 모듈은 불러오지만 **클래스 인스턴스** 를 생성하면 다음과 같은 오류를 출력합니다.

```r
  File "/usr/local/lib/python3.6/site-packages/konlpy/tag/_mecab.py", line 102, in __init__
    self.tagger = Tagger('-d %s' % dicpath)
NameError: name 'Tagger' is not defined
```
특히 Virtualenv 환경에서 실행하는 경우에 발생하는데, mecab 데이터와 연결을 도와주는 **https://bitbucket.org/eunjeon/mecab-ko-dic** 모듈을 [설치합니다](https://github.com/konlpy/konlpy/issues/144)

해당 모듈이 설치된 뒤 간단한 예제를 통해서 작동을 확인합니다.

```python
In [1]: from konlpy.tag import Mecab
In [2]: mecab = Mecab()
In [3]: mecab.morphs(u'영등포구 여의도동 맛집을 알려주세요')
Out[3]: ['영등포구', '여의도동', '맛집', '을', '알려', '주', '세요']
```