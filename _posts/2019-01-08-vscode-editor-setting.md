---
title : Tutorial / Visual Studio Code
last_modified_at: 2019-01-08T10:45:06-05:00
header:
  overlay_image: /assets/images/code/vscode.jpg
categories:
  - vscode
tags: 
    - vscode
toc: true 
---

Atom, Sublime Text 등 여러 편집기를 사용하게 되었습니다. 물론 다양한 편집기를 사용함으로써 재미있는 측면도 있었지만 아직까지는 규모가 작아서 그렇지 커지면 커질수록 어려움이 생실거 같았습니다.

`Django Core` 책을 다시 보면서 **visual Studio Code** 에 대한 이야기가 나왔고, ms 에서 **git** 도 인수한 만큼 사용해 보면 좋을거 같아서 설치를 하게 되었습니다. vs-code 의 설치 및 설정은 **Micro Soft** 에서 관리하는 만큼 공식문서를 참고하여 진행하도록 합니다 

<br/>
# Tips
자주 찾거나, 추후에 보완된 부분을 정리해 보자면

## Q1. BackSpace 키 오작동
코딩에 자주 쓰는 **BackSpaceKey** 가 종종 안먹어서 하드위에 문제인줄 알았는데, 윈도우에선 아무 문제가 없었다. 찾아보니 리눅스 문제로 [GitIssue](https://github.com/Microsoft/vscode/issues/49051) 설정에서 변경을 해야 한다.

File -> Preference -> settings -(드롭다운)-> Application -> KeyBoard -> Dispatch -> KeyCode

default 는 **code** 로 되어 있는데, 이를 **KeyCode** 로 변경하면 된다고 한다.. <strike>잘 되는거 같긴한데 자세한건 더 지켜봐야... </strike>

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/vscode_key.jpg">
  <figcaption>설정값 페이지</figcaption>
</figure>



<br/>
# Install [(Doc)](https://code.visualstudio.com/docs/setup/linux)
한번이라도 설치가 되어있는 경우에는 아래의 명령만으로 설치가 진행됩니다
```php
$ sudo apt-get install code
```
<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/vs_demo.gif">
  <figcaption></figcaption>
</figure> 

## Python Virtualenv [(Doc)](https://code.visualstudio.com/docs/python/environments)
`Ctrl+Shift+P` 통해서 `settings.json` 파일을 편집합니다. 매뉴얼에는 `user setting`, `workspace setting` 모두 다 가능하다고 하지만, 실제 작업해본 결과 `workspace setting` 에 해당 내용을 입력해야 합니다. 그리고 여러 패키지를 설치하다보면 설정이 변경되므로 해당 내용이 변경/삭제 여부를 꾸준하게 확인해야 합니다.

아래의 예시는 우분투에서 `~/Python/django` 가상환경을 만든 뒤 이를 연결한 것으로 윈도우에서 설정하신 내용이 있으면 그에 맞게 내용을 변경 하셔야 합니다. 그리고 Python 실행파일과, 관련 패키지를 설치한 폴더를 개인 환경에 맞게 설정을 해야 하는데 이부분이 잘 이해가 안되면 별도 내용을 참고하셔야 합니다. [아나콘다를 피해야 하는 이유](https://yongbeomkim.github.io/python/python-settings/)

```javascript
{
	"python.pythonPath": "~/Python/django/bin/python",
    "python.autoComplete.extraPaths": [
        "~/Python/django/lib/python3.6/site-packages"
    ],
    "python.linting.pylintEnabled": true,
}
```
윈도우에서도 `c:/Python/Python3.6/Script/python.exe` 와 같이 '/'를 사용합니다. 설정값을 정의 후 터미널을 실행하면 window powershell 에서 `Permission Error` 를 출력합니다. 이를 해결하기 위해서는 **power shell** 을 관리자 권한으로 실행을 한 뒤 `>> Set-ExecutionPolicy RemoteSigned` 를 실행하면 오류없이 실행됩니다 [Github Issue](https://github.com/Microsoft/vscode-python/issues/2559)
{:.notice--info}

<br/>
# Jupyter Notebook
2019/01/29 기준으로 Python 업데이트를 제공하였습니다. [Python in vscode](https://blogs.msdn.microsoft.com/pythonengineering/2019/01/29/python-in-visual-studio-code-january-2019-release/?fbclid=IwAR3-RjozC2nWlY1QU4ykh_TvPa4pbIXzyVGrOFVPTqh0E-my5y89mK6UUZ0) 다양한 Extention 을 설치하면 오히려 충돌의 문제가 발생하므로 가장 기본적인 모듈을 설치 및 활용하도록 합니다.

## Python, Jupyter 확장팩 설치 및 실행
Jupyter 를 사용하기 위해서는 **Python, Jupyter** 두개의 확장팩만 설치합니다. 기존에 설치된 경우에는 확인을 통해서 최신버전으로 설치를 합니다. [Jupyter vscode](https://code.visualstudio.com/docs/python/jupyter-support) 그리고 다음의 링크를 따라서 Jupyter Notebook 을 터미널에서 실행을 한 뒤, vscode 에 url 링크를 연결하여 실행을 합니다. [Jupyter 사용법](http://www.sysop.jp/entry/2018/07/06/vscode_%2B_jupyter_%E3%81%8C%E3%81%99%E3%82%93%E3%81%92%E3%83%BC%E4%BE%BF%E5%88%A9) 링크를 따라서 Jupyter Notebook 을 실행한뒤 vscode 에 등록을 해야 이후에도 제대로 작동된다는 점 주의하시기 바랍니다. [Git Issue](https://github.com/Microsoft/vscode-python/issues/3332)

```python
Run cell|Run Cell|Run All cells
#%%
data = [i  for i in range(10)]
print(data)
```

<br/>
# HTML Web Front Edit

## Top Extenstions
sublime, atom, vscode 등 편집기 자체의 성능과 함께, 가장 큰 차이는 지원하는 `Extenstion` 내용과 업데이트 입니다. 최근에는 **vscode** 가 널리 사용됨에 따라 다양한 확장팩들이 지원되므로 이를 정리해 보겠습니다.

[Html 작업을 위한 확장팩](https://blog.elmah.io/best-visual-studio-code-extensions/)

<iframe width="560" height="315" src="https://www.youtube.com/embed/Hv8FgxJyI9Y" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>

IntelliSense for CSS class names in HTML

## Intellisense [(Doc)](https://code.visualstudio.com/docs/editor/intellisense)
편집기를 사용하는 가장큰 이유를 1개만 꼽으라면 **자동완성 기능 (AutoComplete)** 을 언급할 수 있습니다. 덧붙여서 **Debuging** 능력까지도 포함된다고 할 수 것입니다. 그런 측면에서 **vscode** 는 JavaScript 등에서도 강력한 기능을 지원하고 있습니다.

Django 작업을 하면서 아직까지는 **Pycharm** 이 **가상환경 내 패키지 목록** 및 **작업폴더내 파일들의 상대경로** 까지도 상세하게 지원하는 등, 초기작업에 있어서 만큼은 강력하게 지원을 합니다. vscode는 전자까지는 위의 설정으로 지원이 되는데, 후자 부분은 아직까지 제대로 지원하지 못하는 단점이 있습니다

### usersetting.json
vscode 설정에서 user.json 에 다음의 내용들을 추가합니다. 해당 기능을 `true` 로 지정해야 활성화 되는 줄 알았는데 다음과 같이 정의를 해도 제대로 작동하는 모습을 볼 수 있었습니다
```php
    "python.jediEnabled": false,
    "emmet.triggerExpansionOnTab": true,
    "path-intellisense.absolutePathToWorkspace": false,
```

## Tips
화면을 최대한 **Atom**과 비슷하게 구성하는게 목표였습니다. <strike>익숙한 것에서 부터 하나씩 추가해 보겠습니다</strike> 왼쪽의 메뉴는 `activate bar` 를 줄입니다. 아쉬운 점은 **Pycharm**과 달리 다양한 **workspace**를 다르게 열때마다 설정내용을 **settings.json** 에 일일히 입력을 해야 한다는 점이 아직은 좀 번거롭지만 익숙해 지면서 이를 보완해 나아가도록 하겠습니다.


### File Utils

vs code 가 업데이트 된 이후로 (2019.09.10) 파일 탐색기 exploer 에서 Duplicate 설정이 없어져서 불편한 부분이 많았습니다. 유사한 포맷과 내용을 작업하기 위해선 위 설정이 유용했는데 없었던 부분을 보완해 주는 도구 입니다. 이를 설치 후 오른쪾 버튼을 사용하면 해당 내용을 볼 수 있습니다.

[Market Place](https://marketplace.visualstudio.com/items?itemName=sleistner.vscode-fileutils)