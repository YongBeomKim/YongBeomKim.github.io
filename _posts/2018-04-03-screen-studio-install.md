---
title : 리눅스로 동영상 녹화하기
last_modified_at: 2018-04-03T10:45:06-05:00
tags: 
    - linux
    - screenstudio
---

설치하기 [http://screenstudio.crombz.com/](http://screenstudio.crombz.com/)

```
$ sudo apt-get install ffmpeg
$ wget http://screenstudio.crombz.com/archives/ubuntu/ScreenStudio-Ubuntu-3.4.2-bin.tar.gz
$ tar xvf ScreenStudio-Ubuntu-3.1.1-bin.tar.gz 
$ cd ScreenStudio.Ubuntu/
~/ScreenStudio.Ubuntu$ ./ScreenStudio.sh
~/ScreenStudio.Ubuntu$ ./createDesktopIcon.sh 
```



<div class="fluidMedia" style="height: 1500px;">
    <iframe src="http://nbviewer.jupyter.org/github/YongBeomKim/Tutorials/blob/master/PyTorch/01.Linear-Regression.ipynb" frameborder="0" > </iframe>
</div>



https://www.linuxhelp.com/how-to-install-screenstudio-screencaster-on-ubuntu-16-04/


http://screenstudio.crombz.com/archives/ubuntu/  다운로드


`$ wget http://screenstudio.crombz.com/archives/ubuntu/ScreenStudio-Ubuntu-3.4.2-bin.tar.gz `

$ tar xvf ScreenStudio-Ubuntu-3.4.2-bin.tar.gz 




```
$ sudo apt-get install ffmpeg
http://screenstudio.crombz.com/archives/ubuntu/  다운로드
$ tar xvf ScreenStudio-Ubuntu-3.1.1-bin.tar.gz 


```


`$ sudo add-apt-repository ppa:soylent-tv/screenstudio`


```
$ sudo add-apt-repository ppa:soylent-tv/screenstudio
 ScreenStudio By Patrick Balleux.
Home page:
http://screenstudio.crombz.com/

It is built around "ffmpeg" that is currently available on all Linux distos and should work "out-of-the-box". There are no dependencies beside the need for the JRE 8.0 (OpenJDK).
 더 많은 정보: https://launchpad.net/~soylent-tv/+archive/ubuntu/screenstudio
[ENTER]을 눌러 진행하거나 Ctrl-c를 눌러 추가하는것을 취소합니다.

gpg: keybox '/tmp/tmp_3q7dcn2/pubring.gpg' created
gpg: /tmp/tmp_3q7dcn2/trustdb.gpg: trustdb created
gpg: key D9885EE11591F4CD: public key "Launchpad PPA for Karl"
:~$ 
```



[how to install](https://www.linuxhelp.comhow-to-install-screenstudio-screencaster-on-ubuntu-16-04/)


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