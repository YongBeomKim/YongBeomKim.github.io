---
title : Tutorial / Vim Vi Editor
last_modified_at: 2019-01-08T10:45:06-05:00
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

# vimtutor 
도서등을 참고하려고 했지만 분량이 너무 많기도 해서, `$ vimtutor` 를 통해서 나온 내용들을 참고하여 정리하는 편이 핵심도 잘 정리되어 있고 분량도 적어서 참고하게 되었습니다.

# Start
`$ vimtutor`

# 편집작업
`$ vimtutor`

## Mode 이해
다른 IDE는 작업창/ 메뉴창 등이 구분되는데 반해, VIM은 단일한 화면으로 구성되어 있습니다. 이를 이해하기 위해서는 **명령모드** 와 **편집모드** 를 구분할 필요가 있습니다

## 명령모드

| **편집 Key**  |     **내용**           |
|:-------------:|:----------------------:|
| **h** (<-)    | 왼쪽 이동              |
| **j** (v)     | 아래 이동              |
| **k** (^)     | 위로 이동              |
| **l** (->)    | 오른쪽 이동            |
| **:q!**       | 문서 저장없이 종료     |
| **:wq**       | 문서 저장 후 종료      |       

## 편집모드

| **수정 Key**  |     **내용**                  |
|:-------------:|:-------------------------------:|
| **x**    | 객체 **삭제**                      |
| **i**    | 객체 **삽입(insert)**              |
| **cw**   | 공백포함 단어수정 (change word)    |
| **dw**   | 공백포함 단어삭제 (delete word)    |
| **de**   | 공백제외 단어삭제                  |
| **d$**   | 해당 줄 시작점 뒤 모두삭제         |
| **dd**   | 해당 줄 전체삭제                   |
| **2dd**  | 해당 2줄 전체삭제 (2,3,4 변경가능) |

## 탐색모드

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
# NeoVim
neovim 설치하기 [install](https://github.com/neovim/neovim/wiki/Installing-Neovim)
```python
$ sudo add-apt-repository ppa:neovim-ppa/unstable
$ sudo apt-get update
$ sudo apt-get install neovim
```
<iframe width="560" height="315" src="https://www.youtube.com/embed/w3Y-Ow_QeAc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br/>
# 참고사이트
[stackoverflow](https://stackoverflow.com/questions/11272501/enable-vim-syntax-highlighting-by-default)<br/>

