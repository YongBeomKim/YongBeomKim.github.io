---
title : AWS Server Instance
last_modified_at: 2020-11-11T10:45:06-05:00
header:
   overlay_image: /assets/images/project/amazon_ec2.jpg
categories:
  - server
tags: 
    - aws
    - server
    - linux
---

AWS 에서의 서버 인스턴스 생성절차와 관련된 내용들로. 가입절차 및 **EC2** 서버의 실행은 다음의 동영상을 따라서 진행하면 됩니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/oGQ1HteFYnQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

그리고 도메인 구매 및 설정은 `hosting.kr` 에서 진행을 하였습니다. 내용은 `1. 도메인을 구매한 뒤`, `2. DNS 서비스를 신청합니다.` `3. DNS 설정 내용에서 서브도메인 내용에 EC2 의 Public IP를 연결 합니다` 위 내용이 완료한 뒤 서버와 연결 여부를 테스트 합니다` 자세한 내용은 **[Hosting.kr](https://help.hosting.kr/hc/ko/articles/900001814906-DNS-%EB%A0%88%EC%BD%94%EB%93%9C%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%84%A4%EC%A0%95%ED%95%98%EB%82%98%EC%9A%94-)** 내용을 참고 합니다.

<br/>

# **AWS INSTANCE USER SETTING**

동영상에서 진행한 내용을 요약하면 다음과 같습니다. 
1. AWS 가입하기
2. AWS Console 로그인 및 EC2 인스턴스 생성
3. **사용자 pem** 키파일을 활용한 접속 설정
4. **탄력적 IP** 발급후 인스턴스 연결
5. **보안그룹** 내용을 생성하고 인스턴스 연결
6. **탄력적 IP** 를 Hosting 업체에서 **DNS** 도메인 연결

인스턴스의 생성 및 기본실행이 완료 되었으면, 앞으로 정리할 내용을 살펴보면 다음과 같습니다.

1. **root** 계정의 활성화
2. **pem** 키파일 없이 로그인 계정의 추가
3. 필수 프로그램 설치

## **Root 계정의 활성화**

다음의 내용은 **[EC2 root 계정 활성화](https://goddaehee.tistory.com/193)** 를 간단하게 요약하였습니다.

1. **pem** 로 서버에 접속 합니다.
2. `$sudo passwd root` 로 root 의 비밀번호를 설정 합니다.
3. `$sudo vi /etc/ssh/sshd_config` 에서 **PermitRootLogin yes** 변경 후 저장 합니다.
4. `$sudo cp /home/ubuntu/.ssh/authorized_keys /root/.ssh` EC2 유저의 인증키를 root 에게 복사 합니다.
5. `$sudo systemctl restart sshd` ssh 를 재실행 합니다.
6. `$ssh -i 'C:\키페어경로\키페어.pem' root@접속IP` 로 접속을 확인 합니다.

## **pem 인증키 파일없이 별도 사용자 로그인 활성화**

EC2 유저 및 root 는 pem 키파일을 활용하는 방법을 추천합니다. 반면 **[추가 사용자](https://ithub.tistory.com/215)** 를 활용하면 별도의 인증키 없이도 접속 설정이 가능 합니다.

1. 최초에는 .pem 파일을 사용하여 EC2에 접속합니다.
2. `$sudo vi /etc/ssh/sshd_config` 에서 **PermitRootLogin yes** 변경 후 저장 합니다.
3. `$ sudo useradd -s /bin/bash -m -d /home/USERNAME -g root USERNAME` 새로운 유저를 생성합니다.
4. `$ sudo passwd USERNAME` 유저 비밀번호를 설정 합니다.
5. 패스워드를 입력 합니다
6. `$ sudo chmod u+w /etc/sudoers` sudoers 파일 권한 변경 
7. sudoers 파일 열고, username 추가 합니다.
   ```r
   $ sudo vi /etc/sudoers
   USERNAME ALL=(ALL:ALL) ALL
   ```
8. `$ sudo service ssh restart` ssh를 재시작

<br/>

# Install Modules

EC2 에서 작업을 진행하기 위해서는, 앞서서 만든 계정들 중, **root** 계정을 활용하여 접속을 하고 진행하는게 가장 편리합니다. <strike>별도의 인증 과정없이 설치가 진행 가능하니까요</strike>

## Time Zone 의 변경 & NeoVim, PostGreSQL, Nginx

서버에서 실행을 위해 필요한 **PostGreSQL, Nginx** 의 설치 및 설정과 관련된 내용을 살펴보도록 하겠습니다. 아래의 명령을 실행하면 바로 적용 됩니다. `NeoVim` 의 **[Theme](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)** 내용은 링크를 참고 합니다

```r
$ sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
$ date
   Sun Oct 25 20:16:53 KST 2020

# NeoVim
$ add-apt-repository ppa:neovim-ppa/unstable
$ apt-get update
$ apt-get install neovim

# postgresql
$ apt install postgresql postgresql-contrib
$ service postgresql status
$ sudo -u postgres psql

# nginx 서버 추가
$ apt-get install nginx
$ service nginx start
$ service nginx status
```

## Oh My Zshell

```r
apt-get install zsh
chsh -s `which zsh`
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh
sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

필요한 내용을 설치한 뒤, 설정값에서 Plugin 과 Theme 를 추가 합니다.

```r
$ nano .zshrc                 # 설정파일
   export LANG="ko_KR.UTF-8" # 한글 인코딩을 해결
   ZSH_THEME="agnoster"      # 테마를 정의한다
   plugins=(
     git
     zsh-autosuggestions
     #zsh-syntax-highlighting
     history-substring-search
   )

$ souce .zshrc                # 변경된 설정을 적용
```

## Node.js Version Manager

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/react/nodejs-banner.png">
</figure>

Node.js 버젼을 쉽게 환경설정을 변경 가능한 Virtual Manger 를 활용할 수 있습니다. **[NVM github](https://github.com/nvm-sh/nvm)** 내용을 참고하여 **[우분투내 설치를](https://trustyoo86.github.io/nodejs/2019/02/18/ubuntu-nvm.html)** 합니다. 

**curl** 이 설치되지 않은 경우에는 `$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | zsh` 을 입력합니다. 기본 **bash** 를 사용하는 경우는 `bash` 로 변경하여 설치 합니다. 보다 자세한 내용은 **[Node Version Manager](https://dgkim5360.tistory.com/entry/node-version-manager-introduction)** 등을 참고합니다.

```r
$ sudo apt install curl
$ sudo apt-get install build-essential libssl-dev
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.0/install.sh | zsh
```

**nvm** 이 설치된 경우 **설치 가능한 버젼들을** 확인 합니다. 이미 설치된 Node.js 가 있는 경우에도 추가 삭제작업 없이도 사용이 가능합니다. 아래 내용은 **Node.js v10** 의 마지막 버젼인 `node.js 12.19.0` 을 설치하는 내용 입니다. 

```r
$ source .zshrc
$ nvm --version
0.37.0
$ nvm ls-remote | grep "v12.*LTS"
   v12.18.3   (LTS: Erbium)
   v12.18.4   (LTS: Erbium)
   v12.19.0   (Latest LTS: Erbium)

$ nvm install 12.19.0
$ node -v            
v12.19.0
```

## Python 3.8 Dependancy in Ubuntu 20

2020년 11월 기준 `우분투 20` 을 기준으로 설치를 하면, Python3.8 로 설치가 완료 되어 있습니다. 하지만 Django 를 바로 설치하면 `gcc module error` 가 발생하여 불완전 한 상태 입니다. 따라서 아래의 내용들을 설치 한 뒤 진행을 해야 합니다

```r
apt install openssl -y
apt install libssl1.0-dev -y
apt install libssl1.0 -y
apt install apt-transport-https -y

# Install Dependancy Modules
apt-get install --reinstall build-essential zlib1g-dev dpkg-dev libffi-dev libsqlite3-dev

apt-get install build-essential python3.8-dev
apt-get install python3-venv python3-dev libpq-dev
```

그리고 Python 가상모듈을 설치한 뒤, 의존성에 필요한 업데이트 를 실행해야 합니다.

```r
$ pip install --upgrade pip
$ pip install --upgrade setuptools
$ pip install uwsgi
$ pip install Django gunicorn
$ pip install psycopg2
```

## Python 3.8

[Python](https://www.python.org/downloads/release/python-386/) 정식 사이트에서 설치파일의 경로를 확인 하고 설치를 진행 합니다. Python 내용을 추가하기에 앞서서 `openssl` 을 설치를 해야만 `pip` 로 설치시 **[SSLError("Can't connect to HTTPS URL because the SSL module is not available.)](https://m.blog.naver.com/theswice/221813774822)** 오류를 피할 수 있습니다.

```r
# Install open ssl
apt install openssl -y
apt install libssl1.0-dev -y
apt install libssl1.0 -y
apt install apt-transport-https -y

# Install Dependancy Modules
apt-get install --reinstall build-essential zlib1g-dev dpkg-dev libffi-dev libsqlite3-dev

# get Python tgz file and Installation
wget https://www.python.org/ftp/python/3.8.6/Python-3.8.6.tgz
tar zxf Python-3.8.6.tgz
cd Python-3.8.6/
./configure --enable-optimizations
make altinstall
```


## 참고사이트

- **[Python WAS 구축하기](http://dveamer.github.io/backend/PythonWAS.html)**
- **[YouTube Link](https://youtu.be/afgPtpw4NKo)**
- **[GitHub of VirtScreen](https://github.com/kbumsik/VirtScreen)**
- **[remote how to ubuntu](https://askubuntu.com/questions/1033436/how-to-use-ubuntu-18-04-on-vnc-without-display-attached)**
- **[xrandr missing hdmi output after install nvidia driver](https://askubuntu.com/questions/1097033/xrandr-missing-hdmi-output-after-install-nvidia-driver)**
