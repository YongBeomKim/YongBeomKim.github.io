---
title : ubuntu - NeoVim & Zsh 
last_modified_at: 2019-05-05T12:45:06-05:00
header:
  overlay_image: /assets/images/code/shell.png
categories:
  - ubuntu
---

우분투 시스템을 설치에 있어서 기본적인 **shell script** 환경 구축내용을 정리해 보겠습니다. 터미널 환경도 편집기 이상의 작업이 이루어지는 만큼 다양한 플러그인을 활용하면 능률이 높아 집니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/4KBuPCeF9Gc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
</iframe>

<br/>
# NEO VIM
**Neo Vim** 이 가장 무난했습니다. **Space Vim** 무겁고 우분투에서 fictx 폰트와 충돌로 터미널이 먹통이 되는 등 불안정한 모습을 보여 줬습니다. **vim** 과 중복설치시 설정값을 공유하는 등의 문제가 발생하므로 **vim** 을 제거 후 설치 하도록 합니다.

## INSTALL
다음의 내용을 설치한 뒤 `$ nvim 파일.확장자` 로 실행을 합니다
```s
$ sudo add-apt-repository ppa:neovim-ppa/unstable
$ sudo apt-get update
$ sudo apt-get install neovim
```

## Python In NEOVIM
**[파이썬 설정(영문)](https://yufanlu.net/2018/09/03/neovim-python/)** 은 **[블로그(한글)](https://blog2.lucent.me/vim/neovim#c3b)** 내용을 활용하여 **[설정방법](https://jmyang.kr/2017/11/23/neovim/)** 을 추가 합니다.

## Plug In 설정 및 설치
**vim** 에서는 `.vimrc` 파일을 사용하여 [theme 변경방법](https://askubuntu.com/questions/912404/how-to-change-syntax-color-in-vim) 을 활용 합니다. 하지만 **neovim** 에서는 [예제](https://github.com/owais/dotfiles/blob/master/nvim/init.vim) 를 참고하여  `.convig/nvim/init.vim` 파일로 설정값을 정의 합니다.

다음의 내용은 **[onedark](https://github.com/joshdick/onedark.vim)** 테마와 **[vim-airline](https://github.com/vim-airline/vim-airline)** 하단 Bar 를 추가하는 내용 입니다. 보다 다양한 theme 들을 확인하고 싶은 경우에는 **[vimcolors](https://vimcolors.com/)** 를 확인합니다

```javascript
" 기본 설정값
syntax enable
set encoding=utf-8
set termguicolors

" 플러그인 설치를 위한 설정
if empty(glob('~/.local/share/nvim/site/autoload/plug.vim'))
  silent !curl -fLo ~/.local/share/nvim/site/autoload/plug.vim --create-dirs
     \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
  autocmd VimEnter * PlugInstall --sync | source ~/.config/nvim/init.vim
endif

" 플러그인 설치
" nvim 에서 :PlugInstall 을 실행하면 설치 됩니다
call plug#begin('~/.local/share/nvim/plugged')
Plug 'joshdick/onedark.vim'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
call plug#end()

" 설치된 플러그인 적용하기                          
colorscheme onedark
let g:airline#extensions#tabline#enabled = 1
let g:airline#extensions#tabline#left_sep = ' '
let g:airline#extensions#tabline#left_alt_sep = '|'
let g:airline#extensions#tabline#formatter = 'default'
let g:lightline = {
  \ 'colorscheme': 'onedark',
  \ } 

" 바탕화면을 투명하게 설정 합니다
hi Normal guibg=NONE ctermbg=NONE
```

위 내용을 실행하면 **onedark** 테마가 설치 적용 됩니다. 그리고 [배경을 투명하게 활용](https://github.com/vim/vim/issues/981) 하고 싶은 경우에는 `:hi! Normal ctermbg=NONE guibg=NONE` 를 nvim 에서 실행하면 됩니다.

다음의 내용을 정의한 뒤, [neovim](https://github.com/vim-airline/vim-airline) 에서 **PlugInstall** 을 실행하면 정의된 플러그 인들이 설치 됩니다
{: .notice--info}

## Installing NeoVim and jedi-vim

위 내용을 바탕으로 가상환경에 설치된 파이썬을 활용하여 자동완성 기능을 추가해 보겠습니다. [jedi-vim](https://github.com/davidhalter/jedi-vim) 을 [플러그인](https://sk1u.com/blog/2018/04/16/pyenv-neovim) 으로 추가 합니다. `$ sudo nvim ~/.config/nvim/init.vim` 설정파일에 다음의 내용을 입력한 뒤 vim 을 실행하여 `:PlugInstall` 을 실행하면 해당 모듈이 설치 됩니다. nvim 모둘에서 `:CheckHealth` 을 실행하면 해당 모듈의 상태를 확인하실 수 있습니다.

```javascript
Plug 'davidhalter/jedi-vim'

let g:python3_host_prog = '/home/pyenv/bin/python'
```
`/home/pyenv/bin/python` 는 파이선 실행 파일이 설치된 경로로써 사용자 정의한 내용에 따라 수정 입력하면 됩니다.
{: .notice--info}


https://jdhao.github.io/2018/12/24/centos_nvim_install_use_guide_en/


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

zsh 에서 위의 `sudo su` 사용자 변경을 하는경우 `$ sudo passwd root` 를 사용하여 비밀번호가 지정되어 있는지를 확인합니다. 그래도 `chsh: PAM: Authentication failure` 오류가 출력되는 경우가 있는데 이때는 `sudo nvim /etc/pam.d/chsh` 파일에서 `auth       required   pam_shells.so` 부분을 주석처리 하면 됩니다. 이는 **zsh** 에서 **[쉘의 유효성을 확인](https://devanto.tistory.com/entry/%EC%9A%B0%EB%B6%84%ED%88%AC-1604-%EC%97%90-zsh-%EB%A5%BC-%EC%84%A4%EC%B9%98%ED%95%98%EB%A9%B4%EC%84%9C)** 하는 부분 입니다.

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

## Theme 추가
이번에 작업하면서 **[dracular](https://draculatheme.com/zsh/)** 테마를 추가해 보겠습니다.

```s
$ git clone https://github.com/dracula/zsh.git
$ cp zsh/dracula.zsh-theme $OH_MY_ZSH/themes/dracula.zsh-theme
$ rm -rf zsh 
```

실행파일을 복사했으면 설정에 내용을 추가한 뒤 재실행을 하면 바로 적용 됩니다.

```s
$ nano .zshrc             # 설정파일
ZSH_THEME="dracula"

$ souce .zshrc            # 변경된 설정을 적용
```

## PlugIn 의 추가

전체적인 Theme 를 설치했다면, 이번에는 필요한 기능을 추가해 보겠습니다. 개별 PlugIn Git 소스에 안내한 대로 플러그인 git 데이터를 설치한 뒤, 설정폴더로 파일을 이동한 뒤 `$ nvim ~/.zshrc` 에서 `plugin=()` 에 필요한 내용들을 추가 합니다.

```s
$ git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
$ nvim ~/.zshrc

plugins=(
  git
  zsh-autosuggestions
  #zsh-syntax-highlighting
  history-substring-search
)

$ souce .zshrc   # 변경된 설정을 적용
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