---
title : jupyter notebook Server 설정방법
last_modified_at: 2018-04-27T10:45:06-05:00
tags: 
    - jupyter
    - ubuntu
    - server
---


[참고사이트01](https://dymaxionkim.github.io/beautiful-jekyll/2017-01-23-Jupyter/)

## Jupyter Theme 설정

```
# install jupyterthemes
$pip install jupyterthemes

# upgrade to latest version
$pip install --upgrade jupyterthemes
```

```
$ jupyter-theme -t monokai -f hack -fs 13

$ nano /home/사용자/.jupyter/custom/custom.css 
div.cell.{# 아래에 추가}  

.container {
    width: 99% !important;
}   
```


## Jupyter Server 설정

```
$ jupyter notebook --generate-config        # 설정파일 생성 
   Writing default config to: /root/.jupyter/jupyter_notebook_config.py
```


## OpenSSL을 사용하기 위해, 365일간 유효인증키 생성

```
$ openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout mycert.pem -out mycert.pem   
```


### 외부 접속시 사용할 비밀번호 생성하기

```
$ ipython
    In [1]: from notebook.auth import passwd
    In [2]: passwd()
      Enter password: 
      Verify password: 
    Out[2]: 'sha1:f24baff....' 
```


### 위에서 생성한 사용자 설정값 적용

```
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

```
$ jupyter notebook --ip=* --no-browser  # terminal 에서 위의 설정값을 입력
```


### 외부에서 접속

```
http://접속아이피:설정포트
```


**Primary Notice:** `$ fc-list` 리눅스 폰트 살펴보기 `$ fc-list :lang=ko` 한글폰트만 살펴보기 `$ fc-list | grep "폰트명"` 찾는폰트 살펴보기
{: .notice--primary}

**Info Notice:**
{: .notice--info}

**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}