---
title : Atom IDE Setting
last_modified_at: 2018-10-05T10:45:06-05:00
header:
  overlay_image: /assets/images/book/atom_ide.png
categories:
  - atom
tags: 
    - atom 
    - ide
toc: true 
---


# Introduction

Git 에서 개발한 IDE 도구로써, 그동안 무겁고 효율이 낮다는 편견속에서 별로 호기심이 가지 않았었지만, React Native / Vue.js 강사분들이 atom 을 많이 사용하셨고, 다양한 패키지들이 사용에 있어서 편의성이 인정됨에 따라 관련된 내용을 정리해 보려고 합니다.


<br>
### Atom 설치하기 [link](https://flight-manual.atom.io/getting-started/sections/installing-atom/)

> curl -sL https://packagecloud.io/AtomEditor/atom/gpgkey | sudo apt-key add -

> sudo sh -c 'echo "deb [arch=amd64] https://packagecloud.io/AtomEditor/atom/any/ any main" > /etc/apt/sources.list.d/atom.list'

> sudo apt-get update

> sudo apt-get install atom


<br>
## Reset to Factory Defaults [link](https://flight-manual.atom.io/hacking-atom/sections/debugging/#clearing-saved-state)

> Application : Install Update

Atom 을 설정하다 실수로 위를 누르는 경우, 계속 화면에는 아무것도 나오지 않는 경우가 발생한다. 이외에도 다양한 이유로 설정을 초기화 하려는 경우가 종종 필요로 한다 (삭제를 깨끗하게 하려는 경우에도 유용하다)

> $ atom --clear-window-state 

> $ mv ~/.atom ~/.atom-backup

이를 실행해야 설정에 관련된 내용들이 삭제된다. 이를 실행 후 재설치를 해야 설정이 초기화 된 상태에서 설치가 가능하다


<br>
## Install Package

> **Ctrl + Shift + P**
 
누르면 내부검색 모드가 활성화 되고, 'Install Package' 를 입력한다


<figure class="align-center">
  <img src="https://cdn.shopify.com/s/files/1/0533/2089/files/the-best-atom-packages-2017.png" alt="">
</figure>


<br>
### **Atom** 기본 모듈 

<small>참고1 [Atom 설정](http://superjang.com/archives/3105)</small>

<small>참고2 [판교코딩](https://joshuajangblog.wordpress.com/tag/%EC%95%84%ED%86%B0-%ED%95%84%EC%88%98-%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8/)</small>

1. **Seti-icons 1.5.4** : 파일 확장자에 따라 아이콘을 변경
2. **autocomplete paths 2.12** : 외부파일과 연결시 경로 자동완성
3. **autocomplete-modules 2.22** : 관련 폴더 모듈과 자동연결 [link](https://atom.io/packages/autocomplete-modules)
4. **autocomplete-project-paths 2.2.0** : HTML 에서 css, js 경로 자동완성 [link](https://atom.io/packages/autocomplete-project-paths)
5. **atom-beautify 0.33** : 태그들을 자동정렬
6. **pigments 0.44** : #FF530D 등 컬러 값을 직관표시
7. **highlight-seleted** : 객체를 더블클릭하면 하이라이트


<br>
### **HTML** 관련 모듈
1. **autoclose-html 0.23** : HTML 에서 태그를 자동으로 닫는다
2. **atom-ternjs 0.18** : Javascript 자동완성


<br>
### **Vue** 관련 모듈 <small>[link](https://qiita.com/mrmr/items/f6927eb2fe5aa13a2f90)</small>

1. **language-javascript-jsx 0.3.7** : JSX 문법을 자동완성
2. **language-vue 0.23** : Vue 컴포넌트 요소를 작업
3. **vue-autocomplete 0.1.1** : Vue 내부 메서드 자동완성


### **Django** 관련 모듈 <small>[link](https://discuss.atom.io/t/suggestions-on-best-atom-packages-for-django/38918)</small>

1. **django-templates**