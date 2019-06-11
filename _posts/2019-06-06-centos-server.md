---
title : CentOS 활용 및 도구설치
last_modified_at: 2019-06-06T15:45:06-05:00
header:
  overlay_image: /assets/images/book/centos.jpg
categories:
  - linux
tags: 
    - linux
    - centos
toc: true    
---

웹서비스를 준비하면서 서버 Host 를 신청하게 되었습니다. AWS 와 Google 모두 12개월 무료신청 서비스를 제공하고, 대부분이 **CentOS** 로 되어 있다는 이야기를 듣고 이번 기회에 **CentOS** 관련 내용을 정리를 해 보겠습니다.

<br/>
# 리눅스 확인

## 리눅스 정보 확인

여러가지 방법이 있지만 가장 보편적인 접근방법으로 터미널에서 `cat /etc/*release*` 를 입력 합니다. 그리고 우분투 bit 를 확인하는 명령은 `getconf LONG_BIT` 입니다. 

```php
[user@localhost ~]$ su
암호:

[root@localhost ~]# cat /etc/*release*
CentOS Linux release 7.3.1611 (Core) 
Derived from Red Hat Enterprise Linux 7.3 (Source)

[root@localhost ~]# getconf LONG_BIT
64

[root@localhost ~]# exit
[user@localhost ~]$ su
```
**$ su** 를 입력하면 관리자 계정으로 로그인 됩니다. 별도의 **sudo** 입력이 없어도 관리자 내용을 입력 및 실행 가능합니다. 관리자 계정 변경이 성공하면 터미널 앞의 표시가 **$** 에서 **#** 로 변경 됩니다.
{: .notice--info}


## **scp** 파일 이동

기본 Port 가 아닌 제공하는 포트를 사용하는 경우 작업 방법 입니다.

```php
$ scp -P 포트번호 *.mp4  /home/user/Download/
```

<br/>
# 사용자 추가

## 터미널에서 추가, 삭제

```javascript
[root]# useradd python
[root]# passwd python
erdos 사용자의 비밀 번호 변경 중
새  암호: 
새  암호 재입력:
passwd: 모든 인증 토큰이 성공적으로 업데이트 되었습니다.

[root]# userdel python
[root]# rm -rf /etc/python
```
사용자를 추가 후 비밀번호를 입력해야 작업이 완료 됩니다. 사용자 폴더는 위 작업과 별도로 `/home/python` 폴더를 수동으로 삭제 해야 합니다.

<br/>
# Install Tools

## Python

**[CentOS 에서 Python](https://snowdeer.github.io/python/2018/02/20/install-python3-on-centos/)** 설치하는 방법을 참고하여 Python 3.6 을 추가 합니다. 

```r
$ yum install -y https://centos7.iuscommunity.org/ius-release.rpm
$ yum install -y python36u python36u-libs python36u-devel python36u-pip
$ yum search python3.6
```

## Git

```
$ yum install git
```

## NeoVim

**[NeoVim 정식설치](https://github.com/neovim/neovim/wiki/Installing-Neovim)** 문서를 참고하여 내용을 추가 합니다.

```python
$ yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
$ yum install -y neovim python3.6-neovim
```

설정을 위한 `init.vim` 파일이 보이지 않습니다. **[참고 사이트](https://medium.com/@akila1001/easy-steps-to-install-neovim-in-centos-b90599164379)** 

```
$ nvim .config/nvim/init.vim 
```

관련 설정파일을 생성한 뒤, **[우분투](https://yongbeomkim.github.io/ubuntu/neovim-zsh/)** 설정 내용을 그대로 붙여 넣은 뒤 실행을 합니다. 실행을 하면 새로운 플러그 인들이 설치된 모습을 볼 수 있습니다.

## Zsh

```r
$ yum -y install zsh
$ cd ~
$ chsh -s /bin/zsh root
$ sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
$ cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
$ source ~/.zshrc
```

**[Zsh Bash 쉘 설치방법](https://www.howtoforge.com/tutorial/how-to-setup-zsh-and-oh-my-zsh-on-linux/)** 의 내용대로 실행을 하면 zsh 를 설치하고 **Oh-my-zsh** 프레임 워크를 함께 설치 합니다. 아래 내용을 실행하면 변경 가능한 테마 목록이 출력 됩니다.

```r
ls ~/.oh-my-zsh/themes/
```

목록의 테마 중 하나를 적용해 보겠습니다. 이와 함께 **[zsh자동완성](https://github.com/zsh-users/zsh-completions)** 을 설치합니다.

```r
$ git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/zsh-completions
$ nvim .zshrc
```

`.zshrc` 설정파일을 열고 다음을 추가 합니다.

```r
plugins=(… zsh-completions)
```

관련된 모듈을 새로 불러오는 명령을 실행 합니다. 

```r
autoload -U compinit && compinit
```




<figure class="align-center">
  <img src="http://www.onextrapixel.com/wp-content/uploads/2013/04/flexbox-elements.jpg" alt="">
  <figcaption>donut-example</figcaption>
</figure>
