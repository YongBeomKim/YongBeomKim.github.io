---
title : miniconda 설치하기
last_modified_at: 2018-03-28T10:45:06-05:00
categories:
  - ubuntu
tags: 
    - python
    - miniconda
---


## 결국은 GitHub 의 brench를 사용해서 해결했다 (그리고 더 유용하다)

```
$ pip install -U  github_브런치_다운파일.zip
```



## miniconda installl in ubuntu [link](https://uoa-eresearch.github.io/eresearch-cookbook/recipe/2014/11/20/conda/)

Quantlian, Zipline을 설치하기 위해서

그리도 기피하던, conda를 miniconda 버젼으로 설치하기로 했다
(내혼자 고생하면 모르는데, 남에게도 알려줄려고 보니 결국은 필요하게 되더라..)


### miniconda 설치하기

1. Miniconda3-latest-Linux-x86_64.sh 를 다운로드 받는다 [down](https://conda.io/miniconda.html)
2. `$ bash Miniconda3-latest-Linux-x86_64.sh` 로 설치를 한다
3. `$ conda update conda`  설치 후 최신여부를 확인한다
4. `$ conda --version`  설치를 확인


### virtualenv 별도 환경 설정하기

1. `$ conda create -n 환경이름 python=x.x` 가상환경 설치
2. 사용자 접근이 어렵도록,`conda` 시스템 폴더에 종속되어 설치된다
3. `$ conda activate 환경이름` 로 가상환경을 활성화 한다
4. `(환경이름)$ source deactivate` 를 입력하면 환경을 빠져나오게 된다
5. `$ conda remove -n 환경이름 --all` 로 파일들을 삭제한다


### virtualenv 환경에서 패키지 설치하기

1. `$ conda install jupyter ` 설치
2. `$ conda install -c Quantopian zipline`  설치  : 이걸 설치하면 python2 로 방가져 버림...  


Python 3.5로 설치도 해봤지만,

pip install zipline 하면 permisison 오류가 발생

conda install -c Quantopian zipline 는 python 2.7로 강제 다운그레이드...

아 너무 복잡하당.... 

그리고 안된당<div class=""></div>



### zipline 의 문제점. pandas 0.18 의 모듈이 pandas 0.22에서 삭제

https://github.com/quantopian/zipline/blob/master/zipline/finance/trading.py

    - pandas.tslib.normalize_date 가 pandas 0.18에 있었지만 삭제되었다
    - pandas 0.22 : Revert to prior behavior of normalize_date with datetime.date objects (return datetime)


<strike>`$ sudo apt-get install gfortran libopenblas-dev liblapack-dev python-dev`</strike>


이것 때문에 하루종일 개고생했다. <strike>쓰담 쓰담.. ㅜㅜ</strike>


### virtualenv 설치 후 Ipython Kernel 연결하기

새로운 가상환경 커녈을 Ipython에 연결하기
https://www.youtube.com/watch?v=jv8gQd4g0Og

연결된 커널 삭제하기 
https://www.youtube.com/watch?v=kUUtz-CymkM