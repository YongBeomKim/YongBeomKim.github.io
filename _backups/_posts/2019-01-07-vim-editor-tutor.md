---
title : Tutorial / Space-Vim & Vim-Tutor
last_modified_at: 2019-01-07T10:45:06-05:00
header:
  overlay_image: /assets/images/code/vim.png
categories:
  - vim
tags: 
    - vi
    - vim
toc: true 
---

서버파일을 작업하다 보면 `nano` 편집기를 자주 사용했지만, 문법 오류등은 감으로 작업을 해야하는 한계가 존재합니다. 그러던 중 [Django Hot Reload](https://www.youtube.com/embed/A2vEazcfJ7U)  동영상에서 vim을 자유롭게 사용하는 모습을 보고 한번 따라하고 싶어서 정리하게 되었습니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/vim_demo.gif">
  <figcaption></figcaption>
</figure> 

# Install 

## Vim
궁극적인 목표인 `Space-Vim` 을 사용하기 위해서는 `Vim ver 8` 이상을 설치해아 합니다. 이보다 낮은 버젼의 경우에는 기본적인 설치는 되지만 **Auto-Complete** 와 같은 부가기능을 사용하다 보면 `28960 segmentation fault (core dumped)` 와 같은 오류를 출력합니다. 
```php
$ sudo add-apt-repository ppa:jonathonf/vim
$ sudo apt update
$ sudo apt install vim
```
기존에 다른 버젼이 설치되어 있는 경우에는 이를 삭제한 뒤 아래의 내용을 참고하여 재설치를 합니다.
```php
$ sudo apt remove vim
$ sudo add-apt-repository --remove ppa:jonathonf/vim
```

## Space-Vim Install
**Space-Vim** 설치파일을 복사합니다
```python
$ curl -sLf https://spacevim.org/install.sh | bash
```
이후 `Vim`을 실행하면 자동으로 필요한 파일들을 설치합니다

## Space-Vim Python IDE [(Doc)](https://spacevim.org/use-vim-as-a-python-ide/)
Space-Vim 의 환경설정 내용을 추가합니다. `$ nano .SpaceVim.d/init.toml` 파일의 내용 열고서 다음의 내용을 추가합니다. 해당 파일을 일일히 찾기보다는, `vim` 을 실행한 뒤에 `스페이스바 f v d` 를 입력하면 위의 설정파일을 바로 열어보실 수 있습니다. (find and View Dev-setting)

### .SpaceVim.d/init.toml
설정파일에 아래의 내용을 추가한 뒤, `vim` 을 처음 실행하면 필요한 패키지들을 자동으로 설치합니다 
```php
[[layers]]
name = "lang#python"
```

### **sudo pip install --user isort**
그리고 실행 환경에서 설치되어 있는 `Python package` 목록을 조회할 수 있도록 도와주는 모듈을 설치합니다. 
> $ sudo pip install --user isort 

### ./Space-Vim.d/init.toml
vim 의 일반적인 설정은 경우에는 `.vimrc` 파일에 추가합니다. **Space-Vim** 에서 플러그 인을 추하는 경우에는  `./Space-Vim.d/init.toml` 에 아래와 같이 설정내용을 추가합니다.
```php
[[custom_plugins]]
name = "lilydjwg/colorizer"
merged = 0
```

### ./Space-Vim/vimrc
배경을 투명하게 사용하려는 경우에는 `vimrc` 를 바로 변경할 필요가 생깁니다. 그때에는 이 파일을 열어서 다음의 내용을 덧붙이면 됩니다. [SoaceVim dark Setting](https://github.com/liuchengxu/space-vim-dark/blob/master/README.md)
```java
colorscheme space-vim-dark
hi Normal     ctermbg=NONE guibg=NONE
hi LineNr     ctermbg=NONE guibg=NONE
hi SignColumn ctermbg=NONE guibg=NONE
```

## Appendix
Python Virtual Env 를 사용하는 경우에는 각각의 환경에 따라 목록이 달라지고 바로 위의 모듈만으로는 한계가 있었습니다. 이에 대한 여러 대안들을 찾아서 연구할 필요가 있습니다. [env Python](https://duseev.com/articles/vim-python-pipenv/)

<br/>
# Vim-tutor 
도서등을 참고하려고 했지만 분량이 너무 많기도 해서, `$ vimtutor` 를 통해서 나온 내용들을 참고하여 정리하는 편이 핵심도 잘 정리되어 있고 분량도 적어서 참고하기에 적절합니다.
> `$ vimtutor`

## 편집작업
### Mode 이해
다른 IDE는 작업창/ 메뉴창 등이 구분되는데 반해, VIM은 단일한 화면으로 구성되어 있습니다. 이를 이해하기 위해서는 **명령모드** 와 **편집모드** 를 구분할 필요가 있습니다

### 명령모드

| **편집 Key**  |     **내용**           |
|:-------------:|:----------------------:|
| **h** (<-)    | 왼쪽 이동              |
| **j** (v)     | 아래 이동              |
| **k** (^)     | 위로 이동              |
| **l** (->)    | 오른쪽 이동            |
| **:q!**       | 문서 저장없이 종료     |
| **:wq**       | 문서 저장 후 종료      |       

### 편집모드

| **수정 Key**  |     **내용**                  |
|:-------------:|:-----------------------------:|
| **x**    | 객체 **삭제**                      |
| **i**    | 객체 **삽입(insert)**              |
| **cw**   | 공백포함 단어수정 (change word)    |
| **dw**   | 공백포함 단어삭제 (delete word)    |
| **de**   | 공백제외 단어삭제                  |
| **d$**   | 해당 줄 시작점 뒤 모두삭제         |
| **dd**   | 해당 줄 전체삭제                   |
| **2dd**  | 해당 2줄 전체삭제 (2,3,4 변경가능) |

### 탐색모드

| **모드 Key**   |     **내용**                       |
|:--------------:|:----------------------------------:|
| **(esc)**      | 모드 빠져나오기                    |
| **(u)**        | **undo** 해당작업 취소             |
| **/**          | **검색** 모드                      |
| **(n)**        | 검색모드에서 **다음객체** 선택     |
| **ctrl+g**     | **파일이름 및 줄 정보** 표시       |
| 숫자 **ctrl+g**| **행 번호로** 이동하기             |
| **shift+g**    | 문서의 **마지막 줄** 이동하기      |

<br/>
# Tips

## Vim 에서 새로운 Terminal 실행
Space-Vim 은 기본 windows 분할을 활용합니다. 하지만 인위적인 화면분할을 사용하면 보다 효과적인 작업이 가능한 경우가 많습니다. 이를 정리해 보겠습니다

### **: vertical terminal**
vim 을 실행한 뒤 해당 명령을 실행하면 화면이 분할되어 새로운 Terminal 창이 열립니다 [Raddit](https://www.reddit.com/r/vim/comments/8nbrju/vim_81_terminal_on_a_vertical_split/)

### Reload
분할된 화면을 되돌리기 위해서는 `Ctrl + d` 단축키를 사용합니다. [Dev To](https://dev.to/thiht/learn-to-use-screen-a-terminal-multiplexer-gl)

<br/>
# Etc

## Fisa Dev Vim [(Web Page)](http://fisadev.github.io/fisa-vim-config/) [YouTube](https://www.youtube.com/embed/vlb3qUiS2ZY)

### Install 
```php
$ sudo apt-get update 
$ sudo apt-get install vim

$ sudo apt-get install curl vim exuberant-ctags git ack-grep
$ sudo pip install pep8 flake8 pyflakes isort yapf
```

###  .vimrc [WebPage](https://raw.githubusercontent.com/fisadev/fisa-vim-config/master/.vimrc)

```javascript
" Fisa-vim-config
" http://fisadev.github.io/fisa-vim-config/
" version: 8.3.1

let vim_plug_just_installed = 0
let vim_plug_path = expand('~/.vim/autoload/plug.vim')
if !filereadable(vim_plug_path)
    echo "Installing Vim-plug..."
endif
```

## NeoVim [install](https://github.com/neovim/neovim/wiki/Installing-Neovim) [YouTube](https://www.youtube.com/embed/w3Y-Ow_QeAc)
```php
$ sudo add-apt-repository ppa:neovim-ppa/unstable
$ sudo apt-get update
$ sudo apt-get install neovim
```

<br/>
# 참고사이트
[Space-Vim FAQ](https://spacevim.org/faq/#can-i-try-spacevim-without-overwriting-my-vimrc)<br/>
[Install Vim Package](https://www.youtube.com/watch?v=vlb3qUiS2ZY)<br/>
[stackoverflow](https://stackoverflow.com/questions/11272501/enable-vim-syntax-highlighting-by-default)<br/>