---
layout: blog
title: Neovim PlugIn
tags:
- ubuntu
---

대부분의 개발작업을 `vs-code` 에서 진행하고 있지만, 서버 환경에서 수정 작업을 할 때에는 `NeoVim` 을 활용합니다. 하시만 활용 정도는 메모장 수준에 머물러 있고, 자동완성 및 폴더이동 등의 부수적인 개발환경을 사용하지 못하고 있던 가운데 다음의 동영상을 보게 되었습니다.

<figure class="align-center">
  <p style="text-align: center">
  <iframe width="560" height="315" 
    src="https://www.youtube.com/embed/fFHlfbKVi30?si=Zo_d0EQUtDQXCls5" 
    title="YouTube video player" frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
  </iframe>
  </p>
</figure>

평소에 관심있는 유투버가 눈길을 끄는 내용을 다루고 있어서 이 내용을 따라하면서 경험했던 내용들을 정리해 보려고 합니다.

<br/>

# NeoVim
## Install
neovim 을 [최신버젼으로 업데이트](https://github.com/neovim/neovim/blob/master/INSTALL.md#ubuntu) 하였습니다.
설정과 관련된 내용은 `$VIM/sysinit.vim` 을 활용하는 것을 알 수 있습니다.
```bash
$ sudo add-apt-repository ppa:neovim-ppa/unstable -y
$ sudo apt update
$ sudo apt install neovim -u
$ nvim -V1 -v                  
NVIM v0.10.0-dev
  system vimrc file: "$VIM/sysinit.vim"
  fall-back for $VIM: "/usr/share/nvim"
```

## User Config
[NeoVim 공식문서](https://neovim.io/doc/user/starting.html#initialization) 를 보면 운영체제별 설정파일은 다음과 같습니다. 우분투인 경우 `Unix` 설정값을 활용 합니다. 최초 설치한 경우, 폴더 및 설정파일이 존재하지 않기 때문에 해당 내용을 생성하여야 합니다.
```bash
Unix			~/.config/nvim/init.vim		(or init.lua)
Windows			~/AppData/Local/nvim/init.vim	(or init.lua)
$XDG_CONFIG_HOME  	$XDG_CONFIG_HOME/nvim/init.vim	(or init.lua)
```

## Vim-Plug
[vim-plug - Github](https://github.com/junegunn/vim-plug/wiki/tutorial) 은 플러그 인을 사용하기 위해서 필요한 모듈 입니다. [설치방법](https://github.com/junegunn/vim-plug#neovim) 은 링크로 추가된 공식문서를 참고하여 진행 합니다.
```bash
sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
```

설치 완료 후, 추가할 플러그인 파일을 앞에서 추가한 설정파일에 내용을 추가한 뒤 `NeoVim` 명령어 입력창에 `PlugInstall` 을 입력하면 설치작업을 진행 합니다.
```bash
call plug#begin()
Plug 'VundleVim/Vundle.vim'  
Plug 'davidhalter/jedi-vim'
Plug 'zchee/deoplete-jedi'
call plug#end()
```

<br/>

# 참고사이트
- [Configuring NeoVim as a Python IDE](https://www.playfulpython.com/configuring-neovim-as-a-python-ide/)
- [Neovim Colorschemes](https://dotfyle.com/neovim/colorscheme/top)
