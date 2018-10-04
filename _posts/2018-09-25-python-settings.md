---
title :  Python 3.6 및 Jupyter lab 설치 - 윈도우
last_modified_at: 2018-09-25T10:45:06-05:00
header:
  overlay_image: /assets/images/book/python.jpg
categories:
  - python
tags: 
    - python
    - setting
toc: true 
---


# ANACONDA 

파이썬 수업을 진행하다 보면, 가장 많이 질문을 받고 시간을 소요하는 부분이 Python 설치에 관련된 부분이다. 개인적으로는 **Excel VBA, HWP, PhotoShop, Illustrator** 등 몇가지를 제외하고는 **대부분의 코딩 및 인터넷 서버와 연동 작업**을 주로 하다보니, 윈도우와는 비교가 안될 정도의 자유도가 확보 가능한 Linux 환경을 선호한다.


<figure class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/book/anaconda.png" alt="">
  <figcaption>아나콘다 다운로드 페이지 파이썬 3.7을 기본으로 되어있다</figcaption>
</figure>


하지만 외부 강의수업을 하다보면 일반인 분들의 경우 상당수가 **ANACONDA**를 설치해 오신 분들이 많다. 이를 비추천하는 이유는 윈도우에서 기본으로 제공하는 **Terminal** 1개를 활용하는 방법보다, **Anaconda**를 설치함으로써 **윈도우 기본 Terminal** 이외에 **Anaconda Prompt** 라는 별도의 가상환경이 내 컴퓨터에 설정되고, 이들의 차이를 잘 이해하지 못하면 <small>(역설적으로 이러한 차이를 이해할 정도로 익숙하신 분들은 아나콘다를 설치하지 않는다)</small> 필요한 모듈 및 환경변수 설정 작업이 2배로 늘어나는 문제점이 있어서 아나콘다를 설치하는 방법에 대해 부정적으로 생각하는 이유이기도 하다

물론 이분들이 좋아서 설치하는게 아니라, 파이썬을 다루는 기본 도서들이 대부분 **Anaconda**를 설치하는 방법으로 가이드가 되어 있고, 이러한 부분은 한국만이 아닌 외국사이트나 내용을 봐도 별반 다르지 않기 때문이기도 하다
{: .notice--info}


<br>
# Python 3.6x 윈도우 설치

## Python 설치파일 다운로드

기본 윈도우 설정에서 Python을 설치해 보도록 한다.

웹 브라우저에서 [Python Download Site](https://www.python.org/downloads/) 다운받는 사이트로 이동한다.

<figure class="align-center">
  <img src="http://blog.heroesofprogramming.com/assets/images/2016/10/python.org-downloads-page.png" alt="">
  <figcaption>Python 3.6 다운로드 페이지 이미지로 연결하기</figcaption>
</figure> 


구글에서 Python 검색해서 이동하면, 기본 사이트가 나오고 2018.10.4 현재 **Python 3.7**을 바로 다운받도록 되어있다. 하지만 Tensorflow 등이 아직은 Python 3.7을 제대로 지원 못하는 문제점이 있어서 위의 링크에서 연결된 다양한 버젼을 선택해서 받을 수 있는 페이지로 이동한 뒤, **Pyton 3.6x 버젼** 중 최신날짜로 업데이트 된 내용을 선택한다 (2018.10.04 현재 Python 3.6.6 2018-6-27 버젼을 선택한다)

해당 버젼을 선택하고 페이지를 밑으로 내리면, 해당버젼의 윈본소스, 맥OS, 윈도우 설치버젼 등 다양한 내용을 설치파일을 볼 수 있다. 이중에 **Windows x86-64 executable installer** 를 선택해서 다운로드 받는다

<figure class="align-center">
  <img src="http://2.bp.blogspot.com/--wpNF2e321s/Wf3qRRgR_0I/AAAAAAAACyE/QrVdAA5d4II71xka2jddXiFliZSiR9urQCK4BGAYYCw/s1600/installX64.png" alt="">
  <figcaption>Python 3.6 다운로드 페이지 이미지로 연결하기</figcaption>
</figure> 



## 윈도우 설치하기

위에서 다운로드 받은 파일을 실행한다

<figure class="align-center">
  <img src="http://imagizer.imageshack.us/v2/xq90/923/4Qfi5o.jpg" alt="">
  <figcaption>설치파일 실행시 꼭 선택해야 할 2가지</figcaption>
</figure> 

**1번은 윈도우 환경변수 설정을 자동으로 실행** 해 주는 것이므로 이를 꼭 선택한다. (선택하지 않으면 윈도우 환경변수 설정을 별도로 잡아야 한다)

**2번을 선택** 해야 하는데, 자동으로는 `-> Install Now` 가 선택되어 있을 것이다. 그 아래에 있는 설치 폴더 이름을 보면 `c:\User\사용자이름\AppData\Local\Programs\` 으로 설치를 하고 사용자 중에  **사용자 이름** 부분이 한글로 되어 있으면 Tensorflow 등 다른 모듈에서 한글로된 경로명을 찾지 못해서 문제가 생기는 경우를 많이 보게된다. 

이뿐만이 아니라 재설치를 할 때에도 위의 경로같이 복잡하게 있으면 완전삭제할 때 뺴먹거나 잔류 파일들이 있어서 문제가 발생 가능하므로 2번을 눌러서 사용자가 경로명을 별도로 입력하는 방법을 추천한다


<figure class="align-center">
  <img src="https://i.stack.imgur.com/eBARC.png" alt="">
  <figcaption></figcaption>
</figure> 

> **C:\Python\Python36-64**

**Customize Install location** 에서 **c:\Python\Python36-64** 와 같이 폴더 시작을 **c:\Python** 으로, 그리고 뒤에 붙는 설치폴더명은 기본적으로 제공하는 마지막 이름을 그대로 사용한다.

이와 같이 설정하면 파이썬과 관련된 모든 파일들이 `C:\Python` 내부에 설치 됨으로써, 환경변수 설정등에도 길지않게 짧은 내용으로 연결이 되고, 재설치등을 할 때에도 별도의 숨겨진 폴더가 아닌 **C:\Python\Python36-64** 만 삭제하면 컴퓨터에서 깨끗하게 삭제가 가능하다.

경로명을 입력하고 설정은 위의 그림과 같이 선택 후 **Install**을 누르면 기본적인 파이썬 설치가 완료된다


<br>
# Python Venv 사용하기 

파이썬이 설치 되었으면 환경변수 설정이 재실행 될 수 있도록 컴퓨터를 재부팅 한다. 그리고 윈도우 로그인 후 기본 터미널을 열고 **python**을 입력한다

<figure class="align-center">
  <img src="https://solarianprogrammer.com/images/2016/09/17/cmd.png
" alt="">
  <figcaption>터미널에서 파이썬 실행</figcaption>
</figure> 

위와 같이 Anaconda Python 이 아닌, 기본 Python이 설치 완료되면 절반이 지난 것이다. 이제부터 가상환경을 설정할 것인데, 이부분은 초보자가 이해하기 조금 어려운 부분이 있으니 천천히 따라하시기 바란다.

우선 `Python/Python36-64` 폴더에 기본적인 파이썬이 설치가 완료 되었다. 윈도우도 사용하다가 이런 저런 프로그램을 설치하다 보면 꼬여서 불필요한 파일들이 많아서 윈도우 재설치하는 방법이 떠 빠르다고 생각해서 지원하는 방법이 **윈도우 복구모드**이다.

즉 윈도우 에서도 기본적인 설치파일과 목록을 따로 관리를 함으로써, 사용자가 불안정해진 운영체계를 재설치/ 복구할때 활용하듯. 이러한 복구모드가 파이썬에서도 존재한다면 이것 저것 설치하다가 꼬여서 잘 안될때, 전체를 지우고 다시설치하는 방법을 쉽게 구현 가능하다면 다양한 모듈을 설치할 때에도 도움이 된다.

물론 위에서 보았듯이 윈도우에서 기본 파이썬을 삭제하고 재설치 할 수 도 있지만, **Venv** 모드를 사용하면 다양한 버젼을 설치함으로써, 한개는 **Tensorflow**등 머신러닝 분석에 최적화된 환경, 다른 하나는 **Django\ Flask**등 웹에 최적화된 환경 등등 다양한 환경설정을 자유자재로 내 컴퓨터 안에서 운영이 가능한 장점또한 제공한다. 

```
C:\> cd c:\Python
C:\Python> mkdir Venv
C:\Python> cd Venv
C:\Python\Venv> python -m venv Tensorflow
```

**Tensorflow** 는 추가 생성되는 **폴더의 이름**이자 **가상환경 프로젝트 이름**이다. 이는 사용자가 선택에 맞게 변경이 가능하다. 원본 폴더에서 파일들을 복사하여 새로운 환경에서 실행이 가능한 사본이 복사 완료되면 작업이 끝난다 


```
C:\Python\Venv> cd Tensorflow\Scripts
C:\Python\Venv\Tensorflow\Scripts>activate

(Tensorflow) C:\Python\Venv\Tensorflow\Scripts>
```

해당 프로젝트에서 `프로젝트 이름\Scripts` 로 이동한 뒤, `activate` 활성화 파일을 실행하면 가상환경이 실행된다. 이 때에는 Python의 환경변수가 윈도우 기본설정이 아닌 `c:\Python\Venv\Tensorflow\Scripts>` 를 최우선적으로 활용함으로써 별도의 환경에서 작업들이 실행되는 장점이 있다

Docker 를 써보신 분들이면 이해하기 쉬운데 <small>Docker 까지 해야되는건 아니고 이해하기 쉽게 설명하기 위해서 언급하는 내용이니 어려우신 분들은 skip해도 됩니다</small> 별도의 가상환경을 띄우면 프롬프트가 달라지고, 각각 여러개의 환경을 테스트 하고싶다면 별개의 터미널 별로 activate 프로젝트를 다르게 함으로써 여러 환경에서 테스트 및 작업이 가능하다
{: .notice--info}

>(Tensorflow) C:\Python\Venv\Tensorflow\Scripts>

여기서 빠져나오고 싶다면 폴더와 관계없이 아무곳에서 `deactivate.bat` 를 실행하면 된다

```
(Tensorflow) C:\Python\Venv\Tensorflow\Scripts>deactivate.bat
C:\Python\Venv\Tensorflow\Scripts>
```


<br>
# Jupyter Notebook

## Jupyter Notebook 소개
실습을 하다보면 Sublime text, Atom, Pycharm 등 다양한 IDE 툴이 있지만, 별도의 Interpretor 설정이 불필요하고, 가볍게 javascript를 기반으로 작동이 가능한장점이 있고

무엇보다 컴파일 언어라는 파이썬의 단점을, 각 Cell 별로 나눠서 실행 및 결과를 분석 비교가 가능하다는 점에 있어서 다수에게 수업을 하기에는 Jupyter Notebook 이 여로모로 유용하다. 특히 초보자 분들에게 있어서 강력 추천하는 편집 도구이다

## PyCharm 을 사용하는 경우

Pycharm 에서도 위에서 설치한 환경과 동일한 Interpretor 로 설정을 잡아주면 훨씬더 강력한 디버깅 작업이 가능하다.  하는데, 위의 내용을 따라하신 분들이면 Interpreter 설정에서 **Add Local**을 선택한 뒤 `C:\Python\Venv\Tensorflow\Scripts\python.exe` 파일을 연결하면 같은 작업환경에서 파이참을 구현하실 수 있다

<figure class="align-center">
  <img src="https://t1.daumcdn.net/cfile/tistory/2676014655F90CFC2D" alt="">
  <figcaption>터미널에서 파이썬 실행</figcaption>
</figure> 


## Jupyter Lab 의 설치

Jupyter notebook 이 등장한 뒤, 이를 업그레이드 한 jupyter lab 이 공개되었고, Jupyter lab 을 설치하더라고 동일하게, **Jupyter notebook**이 실행 가능하기 때문에 설치를 할 때에는 Jupyter lab 을 권장한다

> pip install jupyterlab

```
(Tensorflow) C:\Python\Venv\Tensorflow\Scripts> pip install jupyterlab
```


## Jupyter Lab 의 실행

Jupyter lab 은 터미널에서 실행되는 폴더를 Root로 잡아준다. 하지만 가상환경 실행을 위해 들어온 현재 폴더는 중요한 내용들이 많기 때문에 여기에서 파이썬 작업 내용을 함께 덧씌우는 것은 문제가 많다. 따라서 작업 파일들만 저장하는 별도의 공간을 지정할 필요가 있다

> C:\Python\Source>

```
(Tensorflow) C:\Python\Venv\Tensorflow\Scripts>cd c:\Python
(Tensorflow) C:\Python>mkdir Source
(Tensorflow) C:\Python>cd Source
(Tensorflow) C:\Python\Source> jupyter lab
```

위의 내용대로 따라하면 `C:\Python\Source>` 폴더를 기본으로 Jupyter lab이 실행되는 모습을 볼 수 있다.


## Jupyter Lab 바로가기 만들기

지금까지 필요로 하는 작업들을 간단하게 정리하자면

1. 가상환경 실행 폴더로 이동 (**C:\Python\Venv\Tensorflow\Scripts>**)
2. **activate** 를 실행 (**(Tensorflow) C:\Python\Venv\Tensorflow\Scripts>**)
3. Python Source 만 저장한 폴더로 이동한다 (**cd C:\Python\Source**)
4. Jupyter lab을 실행한다 (**jupyter lab**)

하지만 이러한 작업을 매번 반복해서 실행하기에는 불편한 점이 많다 

하지만 리눅스를 쓰면 이러한 불편한 점을 반복해야 한다 ㅜㅜ. 물론 이를 보다 간단하게 하는 방법들이 있긴한데 그러기 위해선 보다 복잡한 내용을 설명해야 하므로 여기선 Pass! 한다
{: .notice--info}

그래서 위의 모든 내용을 **바로가기 윈도우 아이콘** 1개로 만들면 보다 간단한 방법으로도 접근이 가능하다.


<figure class="align-center">
  <img src="https://cdn1.tekrevue.com/wp-content/uploads/2016/05/remove-shortcut-arrows-960x540.jpg" alt="">
  <figcaption>다양한 바로가기 아이콘들</figcaption>
</figure> 


가상환경을 실행하는 중요한 파일은 다음과 같다

> C:\Python\Venv\Tensorflow\Scripts\activate.bat 

이 파일의 내용을 간단히 설명하면, 윈도우 터미널에서 실행되는 내용들을 메모장에서 열어서 순서대로 적어주면, 윈도우 프로그램이 자동으로 1줄 1줄 실행하는 간단한 구조로 되어있다.

이 파일을 윈도우 기본 메모장으로 열어서 맨 밑을 보면 다음과 같은 내용을 볼 수 있다

```
set "PATH=%VIRTUAL_ENV%\Scripts;%PATH%"

:END
if defined _OLD_CODEPAGE (
    "%SystemRoot%\System32\chcp.com" %_OLD_CODEPAGE% > nul
    set "_OLD_CODEPAGE="
)
```


해당 내용의 밑에 우리가 필요로 하는 내용을 추가하면 된다.
하지만 해당 파일을 바로 수정하면 윈도우 터미널에서 `activate.bat`를 실행하면 무조건 Jupyter Lab 이 실행된다. 이번에는 바로가기 파일을 만드는 게 목적이므로 `activate.bat` 파일의 사본을 생성하고, 별도의 이름을 지정한뒤 이를 사용해서 작업하도록 한다. `activate_lab.bat` 라는 이름으로 사본을 생성하였다.

메모장에서 `activate_lab.bat` 파일을 열고 맨 밑에 아래의 2줄 내용을 추가한다 

```
cd C:\Python\Source
jupyter lab
```

이로써 실행파일까지 완성했다. 

`activate_lab.bat` 파일을 선택한 뒤 오른쪽 버튼으로 **바로 가기 만들기(S)**를 선택하면 **바로가기 파일**이 생성되고, **바로가기 파일** 을 바탕화면으로 옮긴다

`activate_lab.bat` 파일 자체는 해당 폴더에 계속 존재해야 한다. 그래야 가상환경이 실행되기 때문이다. 옮기는 파일은 **바로가기 파일** 만 바탕화면으로 이동한다
{: .notice--info}

바로가기 파일을 더블클릭하면 주피터가 자동으로 실행된다


<br>
## 바로가기 아이콘 변경

<figure class="align-center">
  <img src="https://www.tabmode.com/windows10/images/uac-prompt14.png" alt="">
  <figcaption>바로가기 아이콘 변경</figcaption>
</figure> 

window batch 파일이 때문에 바로가기 커서의 모양이 이쁘지 않다. **바로가기 파일을 선택**한 뒤 오른쪽 버튼을 눌러서 **속성**을 선택한 뒤 **아이콘 변경**을 눌러서 수정이 가능하다. 누르면 기본 아이콘만 있어서 선택의 폭이 좁은데, 대신 인터넷에서 이미지 파일 중 **.ico** 확장자 파일을 검색해서 다운로드 받은뒤, **아이콘 변경**으로 해당 파일을 선택하면 보다 다양한 아이콘 이미지를 선택 가능하다

복잡한 과정은 이제 다 끝났다. 주피터가 필요하면 생성된 바로가기 파일만 더블클릭하면 자동으로 실행되는 모습을 보실 수 있다