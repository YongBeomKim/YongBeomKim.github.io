---
title : Jupyter Config, Server 설정방법
last_modified_at: 2019-10-27T10:45:06-05:00
header:
  overlay_image: /assets/images/project/jupyter.png
tags: 
    - jupyter
    - ubuntu
    - server
---

Jupyter 를 설치하면 localhost 만이 아닌 별도 서버에서 설치 및 실행하기 위한 내용을 **[참고사이트](https://dymaxionkim.github.io/beautiful-jekyll/2017-01-23-Jupyter/)** 의 내용을 정리해 보도록 하겠습니다.


<br/>

# **Setting**

## **Jupyter Config**

`generate-config` 를 실행하면 [jupyter 설정](https://stackoverflow.com/questions/47772157/how-to-change-the-default-browser-used-by-jupyter-notebook-in-windows) 파일을 생성 합니다. 우분투 터미널에서 `sudo update-alternatives --config x-www-browser` 를 실행하면 **브라우저 우선순위** 경로명과 우선순서를 확인하고 변경하지만 이대로 실행되진 않습니다. 대신 해당 브라우저 실행파일 목록을 확인할 수 있는데, 위에서 생성한 설정파일에 우선 실행할 브라우저를 `c.NotebookApp.browser =` 뒤에 붙여 줍니다.

```r
$ jupyter lab --generate-config
$ sudo update-alternatives --config x-www-browser
$ nvim .jupyter/jupyter_notebook_config.py
# c.NotebookApp.browser = u'/Applications/Gooogle\ Chrome.app %s'
```

## Jupyter Theme 설정

jupyter lab 에서는 딱히 필요없는 설정 입니다.

```s
# install jupyterthemes
$pip install jupyterthemes

# upgrade to latest version
$pip install --upgrade jupyterthemes
```

```r
$ jt -t monokai -f hack -fs 13
$ jt -t oceans16 -f hack -fs 12 -cellw 100%
$ nano /home/사용자/.jupyter/custom/custom.css 
div.cell.{# 아래에 추가}  

.container {
    width: 99% !important;
}   
```

## Jupyter Server 설정

```r
$ jupyter notebook --generate-config        # 설정파일 생성 
   Writing default config to: /root/.jupyter/jupyter_notebook_config.py
```

## OpenSSL을 사용하기 위해, 365일간 유효인증키 생성

```r
$ openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout mycert.pem -out mycert.pem   
```

### 외부 접속시 사용할 비밀번호 생성하기

```r
$ ipython
    In [1]: from notebook.auth import passwd
    In [2]: passwd()
      Enter password: 
      Verify password: 
    Out[2]: 'sha1:f24baff....' 
```


### 위에서 생성한 사용자 설정값 적용

```r
$ nano /home/사용자/.jupyter/jupyter_notebook_config.py

c = get_config()
c.NotebookApp.password = u'sha1:f24baff....' 
c.NotebookApp.certfile = u'/home/사용자/mycert.pem'
c.NotebookApp.open_browser = False
c.NotebookApp.notebook_dir = u'/home/사용자/자료폴더/'
c.NotebookApp.ip = '*'
c.NotebookApp.port_retries = 8888
```

### jupyter notebook 실행 

```r
$ jupyter notebook --ip=* --no-browser  # terminal 에서 위의 설정값을 입력
```

### 외부에서 접속

```r
http://접속아이피:설정포트
```

[token 입력을 요할때](https://financedata.github.io/posts/jupyter-notebook-authentication.html) Server 에서 `$ jupyter notebook list`로 출력되는 Token 값을 입력해야 한다
{: .notice-danger}

[포트가 열리는지 확인](http://webdir.tistory.com/170) 해당 포트가 열려있는지를 확인한다
{: .notice-danger}

또는 방화벽이 설치된 경우 [Blog](http://webdir.tistory.com/206)를 사용여부에 맞춰서 내용을 변경한다
{: .notice-danger}

## Jupyter Note 자동저장 설정하기 [출처](https://www.webucator.com/blog/2016/03/change-default-autosave-interval-in-ipython-notebook/)

ipython 에서 설정 (해당 Code 만 적용된다)

```python
In[]: %autosave 180
Out[] Autosaving every 180 seconds
```

.jupyter\custom\custom.js 파일을 수정한다 (전체 일괄적용)

```javascript
define([
    'base/js/namespace',
    'base/js/events'
    ],
    function(IPython, events) {
        events.on("notebook_loaded.Notebook",
          function () {
          IPython.notebook.set_autosave_interval(180000); //in milliseconds
      }
      );
        //may include additional events.on() statements
    }
);
```

**Primary Notice:** `$ fc-list` 리눅스 폰트 살펴보기 `$ fc-list :lang=ko` 한글폰트만 살펴보기 `$ fc-list | grep "폰트명"` 찾는폰트 살펴보기
{: .notice--primary}