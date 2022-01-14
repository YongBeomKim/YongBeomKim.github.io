---
title : Visual Studio Code SETTING
last_modified_at: 2020-12-08T14:45:06-05:00
header:
  overlay_image: /assets/images/code/vscode.jpg
categories:
  - vscod
etags: 
    - vscode
    - python
    - html
    - css
---


https://github.com/Microsoft/vscode/issues/27102

엘리코딩의 VScode 설정내용을 참고하며 설정을 진행합니다. 그리고 Tap Space 가 4를 기본으로 하고 있느데, Python 을 작업할 때에는 유용하지만 Front end 작업을 진행하는 경우에는 불리한 부분이 있습니다. 

이러한 상황에 맞도록 설정에 아래 내용을 추가 합니다.

```json
{
    "files.insertFinalNewline": true,
    "files.trimTrailingWhitespace": true,
    "[html]": {
      "editor.insertSpaces": true,
      "editor.tabSize": 2
    },
    "[json]": {
        "editor.insertSpaces": true,
        "editor.tabSize": 2
    }
}
```
