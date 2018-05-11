---
title : Sublime Text 3 의 모든것
last_modified_at: 2018-05-11T10:45:06-05:00
header:
  overlay_image: /assets/images/book/sublime.jpg
categories:
  - sublime
tags: 
    - ide
    - sublime
toc: true    
---

# Sublime Text

## Upgrade 방법 

[정보출처](https://askubuntu.com/questions/934799/ubuntu-17-04-install-sublime-text-3)

```
wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -
echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
sudo apt-get update
sudo apt-get install sublime-text
```


## Update the Serial Key

### Host 정보를 추가한다

[참고 Blog](https://gist.github.com/hygull/6cdf0fa8a1184693a234a7a73cbdd52e)

리눅스는 **`/etc/hosts`** 파일을, 윈도우는 **`windows/System32/drivers/etc/hosts.txt`** 파일에 아래의 내용을 추가한다

```
127.0.0.1   license.sublimehq.com
127.0.0.1   sublimetext.com
127.0.0.1   sublimehq.com
127.0.0.1   45.55.255.55
127.0.0.1   45.55.41.223
```

윈도우에서 작업시 메모장에서는 **권한없음 오류**로 수정후 저장이 되지 않는다. 이를 피하기 위해서 **돋보기창**에서 **메모장**을 찾은 뒤, **관리자 권한으로 실행** 으로 실행/편집해야 저장이 가능하다
{: .notice--info}


### Serial Key 입력하기

[blog 1](https://gist.github.com/hygull/6cdf0fa8a1184693a234a7a73cbdd52e) [blog 2](http://thepcwares.com/sublime-text-3-license-key/)  [blog 3](https://gist.github.com/cprakashagr/86d4f8b29f8d54330349875abc6d9cf9) [blog 4](https://gist.github.com/hygull/6cdf0fa8a1184693a234a7a73cbdd52e)

```
ZYNGA INC.
50 User License
EA7E-811825
927BA117 84C9300F 4A0CCBC4 34A56B44
985E4562 59F2B63B CCCFF92F 0E646B83
0FD6487D 1507AE29 9CC4F9F5 0A6F32E3
0343D868 C18E2CD5 27641A71 25475648
309705B3 E468DDC4 1B766A18 7952D28C
E627DDBA 960A2153 69A2D98A C87C0607
45DC6049 8C04EC29 D18DFA40 442C680B
1342224D 44D90641 33A3B9F2 46AADB8F
```

**sublime text2** 용으로 업그레이드를 요구한다고 나오지만.. 그냥 쌩까자...
{: .notice--info}

**ListView의 Template:**
{: .notice--info}

**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}   