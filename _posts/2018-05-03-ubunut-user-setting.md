---
title : Zsh & Conky Setting - ubuntu
last_modified_at: 2018-05-01T12:45:06-05:00
header:
  overlay_image: /assets/images/book/ubuntu.jpg
categories:
  - ubuntu
---


# Ubuntu 사용자 변경

## root 사용자 변경하기 
```
$ sudo su
암호: 
root:#
```

```
root:# su - markbaum
markbaum@markbaum:
```

간단해 보이지만 계속 까먹어서 찾게되는 내용 중 하나다

<br>
## Terminal Shell 변경 Tutorial

<iframe width="560" height="315" src="https://www.youtube.com/embed/4KBuPCeF9Gc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<br>
## zsh와 oh-my-zsh의 설치와 사용법 [Blog](http://crasy.tistory.com/146)

### zsh 를 설치한다

```
$ sudo apt-get install zsh
$ which zsh                 # zsh 설치폴더 찾기
/usr/bin/zsh
$ chsh -s /usr/bin/zsh      # shell 을 변경한다
Password:                   # 환경설정 암호를 지정
$ chsh -s `which zsh`      
Password:              
```

터미널 재접속시 z Shell config 설정화면이 나오는데, 이때에는 **2**를 눌러서 별도 설정없이 초기값을 사용한다
{: .notice--success} 


### Oh-my-zsh 을 설치한다

```
$ wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh

$ sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```


### 테마 변경하기 [Theme](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes)

```
$ nano  .zshrc        # 설정파일을 열어서 Theme 를 변경한다
ZSH_THEME="agnoster"  # 테마를 정의한다
$ souce .zshrc        # 변경된 설정을 적용
```


### 설정 적용하기

powerline 폰트 설치하기 (Mac 용 폰트를 개조해서 올림)

```
$ git clone https://github.com/powerline/fonts.git --depth=1
$ cd fonts
$ ./install.sh
$ cd ..
$ rm -rf fonts            # 터미널에서 추가 설정을 복툰하여 실행한다
```

<br>
[powerlines 모듈의 설치](https://github.com/powerline/fonts) | [agnoster theme git](https://github.com/agnoster/agnoster-zsh-theme)

```
$ sudo apt install fonts-powerline
```


### 설치한 폰트를 Terminal 과 tilda 설정에 적용한다

<img src="http://cfile9.uf.tistory.com/image/21795F4D5677A7502C4D30"/>


터미널의 환결설정에서 폰트를 **Ubuntu Mono derivative Powerline**으로 변경하면 깨지지 않고 적용결과를 볼 수 있다


## Bash 기본 Shell 로 되돌리기

```
$ sudo chsh -s /bin/bash  # 기본 Bash Shell로 되돌리기
$ chsh -s `which bash`    # bash 를 기본 shell로 변경 
```

`$ sudo chsh -s /bin/bash` 을 사용하면 기본 Bash Shell로 되돌아간다
{: .notice--success}


## Conky manger 설정변경 [blog](https://kjvvv.kr/408707)

위에서 설정 변경을 하다보면 시스템 글씨설정 변경으로 한글이 깨지는 문제가 발생한다. 이를 해결하기 위해 과거의 기억을 떠올리다가 안되서 결국엔 config 파일을 바꿈으로써 해결했다

1. conky manger 를 연다
2. 적용 테마를 선택한 뒤 'edit text editor' 로 설정파일을 연다
3. 설정 text 중 아래의 내용에서 폰트명과 크기를 한글에 맞게 입력한다

${voffset 8}${font NanumBarunGothic:size=20}${color}${time %H %M %p}${font}${voffset -8}

${voffset 8}${font NanumBarunGothic:size=15}${color1}${time %A} ${time %e} ${time %B}${font}${voffset -8}

${voffset 8}${font NanumBarunGothic:size=9}${color1}RM $mem/$memmax - HD ${fs_used /}/${fs_size /}${font}${voffset -8}

${voffset 8}${font NanumBarunGothic:size=9}${color1}CPU $freq_g GHz $cpu% - ${if_up wlp1s0}WIFI ${wireless_link_qual wlp1s0}${font}${voffset -8}${endif}
