---
title : Tutorial / Visual Studio Code
last_modified_at: 2019-01-08T10:45:06-05:00
header:
  overlay_image: /assets/images/code/vscode.png
categories:
  - vscode
tags: 
    - vscode
toc: true 
---

Atom, Sublime Text 등 여러 편집기를 사용하게 되었습니다. 물론 다양한 편집기를 사용함으로써 재미있는 측면도 있었지만 아직까지는 규모가 작아서 그렇지 커지면 커질수록 어려움이 생실거 같았습니다.

`Django Core` 책을 다시 보면서 **visual Studio Code** 에 대한 이야기가 나왔고, ms 에서 **git** 도 인수한 만큼 사용해 보면 좋을거 같아서 설치를 하게 되었습니다. vs-code 의 설치 및 설정은 **Micro Soft** 에서 관리하는 만큼 공식문서를 참고하여 진행하도록 합니다 

<br/>
# Install [(Doc)](https://code.visualstudio.com/docs/setup/linux)
한번이라도 설치가 되어있는 경우에는 아래의 명령만으로 설치가 진행됩니다
```php
$ sudo apt-get install code
```
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/vim_demo.gif">
  <figcaption></figcaption>
</figure> 

## Python Virtualenv [(Doc)](https://code.visualstudio.com/docs/python/environments)
`Ctrl+Shift+P` 통해서 `settings.json` 파일을 편집합니다. 매뉴얼에는 `user setting`, `workspace setting` 모두 다 가능하다고 하지만, 실제 작업해본 결과 `workspace setting` 에 해당 내용을 입력해야 합니다. 그리고 여러 패키지를 설치하다보면 설정이 변경되므로 해당 내용이 변경/삭제 여부를 꾸준하게 확인해야 합니다

```javascript
{
	"python.pythonPath": "~/Python/django/bin/python",
    "python.autoComplete.extraPaths": [
        "~/Python/django/lib/python3.6/site-packages"
    ],
    "python.linting.pylintEnabled": true,
}
```

## Tips
화면을 최대한 **Atom**과 비슷하게 구성하는게 목표였습니다. <strike>익숙한 것에서 부터 하나씩 추가해 보겠습니다</strike> 왼쪽의 메뉴는 `activate bar` 를 줄입니다. 아쉬운 점은 **Pycharm**과 달리 다양한 **workspace**를 다르게 열때마다 설정내용을 **settings.json** 에 일일히 입력을 해야 한다는 점이 아직은 좀 번거롭지만 익숙해 지면서 이를 보완해 나아가도록 하겠습니다.