---
title : ubuntu - Vim & Zsh 
last_modified_at: 2019-05-07T12:45:06-05:00
header:
  overlay_image: /assets/images/code/shell.png
categories:
  - ubuntu
---

우분투 시스템을 설치에 있어서 기본적인 **shell script** 환경 구축내용을 정리해 보겠습니다. 터미널 환경도 편집기 이상의 작업이 이루어지는 만큼 다양한 플러그인을 활용하면 능률이 높아집니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/4KBuPCeF9Gc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
</iframe>

<br/>
# NEO VIM
**Neo Vim** 이 가장 무난했습니다. **Space Vim** 은 생각보다 무겁고 우분투에서 fictx 폰트와 충돌로 터미널이 먹통이 되는 등 한글 환경에서는 불안정한 모습을 보여 줬습니다. 그리고 **vim** 과 중복설치시 설정값을 공유하는 등의 문제가 발생하였습니다.

## INSTALL
다음의 내용을 설치한 뒤 `$nvim 파일.확장자` 로 내용을 실행합니다
```s
$ sudo add-apt-repository ppa:neovim-ppa/unstable
$ sudo apt-get update
$ sudo apt-get install neovim
```

## Theme 변경
기본 문법 highlight 는 생각보다 어두워서 시의성이 좋지 않았습니다. 이를 극복하기 위해 [변경방법](https://askubuntu.com/questions/912404/how-to-change-syntax-color-in-vim) 을 사용합니다.

```r
$ ls /usr/share/vim/vim81/colors
default.vim  elflord.vim   koehler.vim  pablo.vim
shine.vim  torte.vim  blue.vim  delek.vim  evening.vim
morning.vim  peachpuff.vim  slate.vim  zellner.vim
darkblue.vim  desert.vim   industry.vim  murphy.vim
ron.vim
```

## Plug in
[설정방법](https://jmyang.kr/2017/11/23/neovim/) 에 대해 정리한 내용을 참고 합니다. 

**vim** 에서는 `.vimrc` 파일을 사용하여 설정값을 변경하는데, **neovim** 에서는 [설정내용 예제](https://github.com/owais/dotfiles/blob/master/nvim/init.vim) 를 참고해 보면  `.convig/nvim/init.vim` 파일을 사용하여 내용을 추가 가능합니다. 이들 사이의 설정 중복될수 있어서 유의 합니다. 

<br/>
# Ubuntu 터미널 설정

## root 사용자 변경
간단해 보이지만 계속 까먹어서 찾게되는 내용 입니다

```s
$ sudo su
암호: 
root:#

root:# su - markbaum
markbaum@markbaum:
```

<br/>
# zsh 와 oh-my-zsh 환경설정 
[Blog](http://crasy.tistory.com/146) 내용을 참고하여 정리를 하였습니다. **깔끔한 파이썬 탄탄한 백핸드 (2019.03)** 도서를 참고하시면 보다 잘 정리된 내용을 확인할 수 있습니다.

## zsh 설치
기본 설치된 bash shell 보다, 다양한 plugin 이 개발된 터미널 환경을 추가합니다. 아래의 내용을 실행한 뒤, 시스템을 재부팅 하면 `z Shell config` 설정화면이 나옵니다. 이때 **2**를 누르면 별도의 설정없이 초기값으로 사용할 수 있습니다.

```s
$ sudo apt-get install zsh
$ which zsh                 # zsh 설치폴더 찾기
/usr/bin/zsh
$ chsh -s /usr/bin/zsh      # shell 을 변경한다
Password:                   # 환경설정 암호를 지정
$ chsh -s `which zsh`       # 자동으로 파일경로를 찾은 뒤 적용
Password:              
```

기본 Bash 로 되돌리기 위해서 `$ sudo chsh -s /bin/bash` , `$chsh -s 'which bash'` 또는 `$ sudo chsh -s /bin/bash` 를 실행합니다
{: .notice--success} 

## Oh-my-zsh 설치
`Oh-my-zsh` 은 `zsh` 를 보다 편리하게 사용할 수 있는 설정관리 용 (configuration manager) 도구 입니다. 아래의 내용을 설치 완료하면 다음과 같은 화면이 변경됩니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/oh-my-zsh.png" style="width:500" align="center">
</figure>

```s
$ wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh
$ sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

## ZSH 테마 변경 
다양한 테마목록중 원하는 내용을 찾아서 정의 후 새로 적용을 하면 됩니다 [Theme 목록](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes)

```s
$ nano .zshrc             # 설정파일
ZSH_THEME="agnoster"      # 테마를 정의한다
export LANG="ko_KR.UTF-8" # 한글 인코딩을 해결
$ souce .zshrc            # 변경된 설정을 적용
```

## 기호폰트 추가하기
터미널에서 한글이 깨지는 경우는 `.zshrc` 에서 `export LANG="ko_KR.UTF-8"` 내용을 추가하면 해결됩니다. 하지만 Theme 별로 git의 다양한 기호들은 깨지는 모습을 볼 수 있습니다. 이를 보완하기 위해 개발된 것으로 **powerline** 폰트를 우분투 시스템에 설치합니다 (Mac 용 폰트를 개조해서 올림) [powerlines 모듈의 설치 방법](https://github.com/powerline/fonts) | [agnoster theme git](https://github.com/agnoster/agnoster-zsh-theme)

```s
$ git clone https://github.com/powerline/fonts.git --depth=1
$ cd fonts
$ ./install.sh
$ cd ..
$ rm -rf fonts            # 터미널에서 추가 설정을 복툰하여 실행한다
$ sudo apt install fonts-powerline
```

## 설치한 폰트를 Terminal 과 tilda 에 적용
아래 그림과 같이 설정내용을 열고서, 터미널 환결에서 사용할 폰트를 **Ubuntu Mono derivative Powerline**로 변경 적용하면 깨지지 않는 결과를 볼 수 있습니다

<figure class="align-center">
  <img src="http://cfile9.uf.tistory.com/image/21795F4D5677A7502C4D30" style="width:500" align="center">
</figure>

<br/>
# Conky manger 설정변경 
위에서 설정 변경을 하다보면 시스템 글씨설정 변경으로 한글이 깨지는 문제가 함께 발생합니다. config 파일을 바꿔서 해결을 했습니다 [blog](https://kjvvv.kr/408707)

1. conky manger 를 연다
2. 적용 테마를 선택한 뒤 'edit text editor' 로 설정파일을 연다
3. 설정 text 중 아래의 내용에서 폰트명과 크기를 한글에 맞게 입력한다

{% raw %}
```r
${voffset 8}${font NanumBarunGothic:size=20}${color}${time %H %M %p}${font}${voffset -8}

${voffset 8}${font NanumBarunGothic:size=15}${color1}${time %A} ${time %e} ${time %B}${font}${voffset -8}

${voffset 8}${font NanumBarunGothic:size=9}${color1}RM $mem/$memmax - HD ${fs_used /}/${fs_size /}${font}${voffset -8}

${voffset 8}${font NanumBarunGothic:size=9}${color1}CPU $freq_g GHz $cpu% - ${if_up wlp1s0}WIFI ${wireless_link_qual wlp1s0}${font}${voffset -8}${endif}
```
{% endraw %}