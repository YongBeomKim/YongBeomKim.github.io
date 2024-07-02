---
layout: blog
title: 우분투 에서 Python 업데이트
tags:
- ubuntu
- python
---

배포등의 작업을 하기전에 서버 환경을 확인해 보겠습니다. 확인결과 우분투 22.04 에 파이썬은 3.10 만 설치되어 있음을 확인할 수 있었습니다.

```bash
$ cat /etc/issue                                          
Ubuntu 22.04.2 LTS \n \l

$ python3.10
python3            python3-config     
python3.10         python3.10-config
```

2024년 6월 기준 추천하는 버젼은 [Python 3.11](https://pytorch.org/get-started/locally/) 입니다. 근거는 작업하는 패키지 중 가장 큰 패키지로 최적화가 파이썬 3.11 까지 지원하고 있습니다. 서버를 확인한 결과 현재 파이썬 3.10 만 설치되어 있어서 이번에는 3.11 버젼을 추가해 보겠습니다.

<br/>

# Python 3.11

```bash
wget https://www.python.org/ftp/python/3.12.3/Python-3.12.3.tgz
tar -xzvf Python-3.12.3.tgz 
cd Python-3.12.3/
./configure --enable-optimizations
sudo make altinstall

sudo update
https://www.python.org/ftp/python/3.11.9/Python-3.11.9.tgz
tar -xzvf Python-3.11.9.tgz 
cd Python-3.11.9/
./configure --enable-optimizations
sudo make altinstall

sudo apt install python3.11-dev
sudo apt install python3.11-gdbm
sudo apt install python3.11-venv
sudo apt install python3.11-tk
python3.11 --version



sudo apt install python3-pip -y
sudo apt install python3.12-dev libpq-dev -y
sudo apt install python3.12-venv -y
sudo apt install python3.12 -y
sudo apt install python3.12-lib2to3 -y
sudo apt install python3.12-gdbm -y
sudo apt install python3.12-tk -y
sudo apt install libmariadb-dev  # MariaDB
sudo apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libsqlite3-dev libreadline-dev libffi-dev curl libbz2-dev pkg-config make -y
```



<br/>

# 참고사이트
- [Ubuntu Python3 최신버젼 설치하기](https://rottk.tistory.com/entry/Ubuntu-Python3-%EC%B5%9C%EC%8B%A0-%EB%B2%84%EC%A0%84-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0)