---
layout: blog
title: 우분투 에서 Python 업데이트
tags:
- python
---

Ubuntu 22.04 를 설치하면 기본적으로 `python3.10` 이 설치되어 있습니다. 사용자가 파이썬 추가버젼을 설치하는 방법은 아래의 2가지 방법이 있습니다. 깡통서버에서 설치를 할 때에는 [우분투 저장소 - “deadsnakes” team](https://launchpad.net/~deadsnakes/+archive/ubuntu/ppa) 로 진행하여야 `3.12-venv` 와 `3.12-dev` 등의 부가적인 내용들을 함께 설치 가능합니다. 

`설치파일` 을 직접 설치한 경우에는 부가적인 `venv` 등의 오류가 발생 가능합니다.
- `우분투 저장소` 를 활용하여 설치하는 방법
- `설치파일` 을 직접 다운로드 한 뒤 빌드로 설치하는 방법

<br/>

# 우분투 저장소를 활용한 설치방법
[New Python Versions - “deadsnakes” team](https://launchpad.net/~deadsnakes/+archive/ubuntu/ppa) 저장소를 활용하면 비교적 빠르고 쉽게 설치 가능합니다. 
```bash
$ sudo add-apt-repository ppa:deadsnakes/ppa
$ sudo apt update
$ sudo apt install python3.12 python3.12-venv python3.12-dev
```

<br/>

# 빌드파일을 활용한 설치방법
[Python 3.12](https://pytorch.org/get-started/locally/) 버젼을 추가해 보겠습니다.

## Python 3.12
```bash
wget https://www.python.org/ftp/python/3.12.3/Python-3.12.3.tgz
tar -xzvf Python-3.12.3.tgz 
cd Python-3.12.3/
./configure --enable-optimizations
sudo make altinstall

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
