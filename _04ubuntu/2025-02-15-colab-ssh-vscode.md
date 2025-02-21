---
layout: blog
title: CLI 에서 Google Colab 컨테이너 접속하기
tags:
- ssh
---

`1650 Ti` 를 가속기로 활용하는 것 보다는 `Google Colab` 의 TPU를 활용하는 것이 성능이 좋은것을 확인할 수 있었습니다. 로컬 개발환경에서 `Google Colab` 의 리소스를 연결하여 작업하는 방법에 대하여 알아보도록 하겠습니다.

<figure class="align-center">
  <iframe width="560" height="315" 
    src="https://www.youtube.com/embed/wvDFNQNgqS8?si=CaUUrwyEC795RkUv" 
    title="SSH to Google Colab via Terminal or VSCode" frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
  </iframe>
</figure>

<br/>

# Introduction
`Google Colab` 의 시스템을 로컬호스트에서 `ssh` 로 연결하여 사용하는 방법은 터미널에서 사용하는 법과, `Vscode 에서 extension` 을 활용하여 접속관리하는 방법이 있습니다. 2025년 2월 현재 `Vscode 에서 extension` 확장도구를 활용하여 접속을 하면 `무료버젼` 에서는 다음과 같은 메세지를 출력하면서 Colab 의 Session 을 멈추게 됩니다. 따라서 CLI Terminal 을 활용하여 접속을 하는 방법으로 진행해 보겠습니다.
<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/linux/ssh_error.png">
  <figcaption>VS Code 접속시 Runtime DisConnect 메세지</figcaption>
  </p>
</figure>

## Create a locally-managed tunnel
[Colab-ssh : Connection closed by remote host #45](https://github.com/WassimBenzarti/colab-ssh/issues/45) 문서를 참고 하여 진행을 하면, 접속을 도와주는 도구로써 [Create a locally-managed tunnel (CLI)](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-local-tunnel/) 를 설치 하여야 합니다.

작업환경인 `Ubuntu 22.04` 에서 실행 스크립트 내용은 다음과 같습니다.
```bash
# 1. Add Cloudflare's package signing key:
$ sudo mkdir -p --mode=0755 /usr/share/keyrings
$ curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null

# 2. Add Cloudflare's apt repo to your apt repositories:
$ echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main" | sudo tee /etc/apt/sources.list.d/cloudflared.list

# 3. Update repositories and install cloudflared:
$ sudo apt-get update && sudo apt-get install cloudflared
```

## Colab Running
`TPU` 가속기를 활용하는 `Colab Session` 을 실행하여 연결을 위한 다음의 스크립트를 실행 합니다. 다음의 내용을 실행하면 다음과 같은 연결 메세지를 화면에 출력하는 것을 확인 할 수 있습니다.
```python
# Google Drive Connect
from google.colab import drive
drive.mount('/content/drive')
# ! ls /content/drive/MyDrive/Huggingface/

# Install colab_ssh on google colab
# https://github.com/WassimBenzarti/colab-ssh/issues/45
!pip install colab_ssh --upgrade

ssl_password = 1234
from colab_ssh import launch_ssh_cloudflared
launch_ssh_cloudflared(password=ssl_password)
```

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/linux/ssh_code.png">
  <figcaption>SSH Client Configuration</figcaption>
  </p>
</figure>

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/linux/ssh_code_detail.png">
  <figcaption>SSH Client Detail Configuration</figcaption>
  </p>
</figure>

## SSH of Cloudflare
설치가 완료된 우분투에서 위 화면에 나타난 주소와 연결을 위한 `./.ssh/config` 설정파일을 생성한 뒤 다음의 내용을 추가합니다
```bash
$ which cloudflared
/usr/local/bin/cloudflared

$ cat ./.ssh/config
Host *.trycloudflare.com
	HostName %h
	User root
	Port 22
	ProxyCommand "/usr/local/bin/cloudflared" access ssh --hostname %h
```

## Colab SSH Connect on CLI
위 화면의 **SSH Terminal** 에 나타난 `Copy` 를 눌러서 주소를 복사한 뒤, SSH 설정이 완료된 터미널에 붙여넣고 접속을 한 뒤, 코드에서 지정한 `Password` 를 입력하면 `Colab` 에서 현재 실행중인 Session 에 접속된 것을 확인할 수 있습니다. 작동은 기존과 동일하게 `https://colab.research.google.com/drive/1q2tD4w....` 에서 실행되고 있지만 해당 환경에서 필요한 실행명령어를 터미널에서 함께 실행 및 확인 가능합니다.  

## Colab SSH Connect on VSCODE
2025년 2월 현재까지는 무료계정으로 해당 과정을 진행하면 Session 이 끊어지는 문제가 발생하였습니다. 향후 해결방법을 찾게되면 그 내용을 추가하도록 하겠습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/linux/ssh_cloud_vscode.png">
  <figcaption>SSH Client Configuration</figcaption>
  </p>
</figure>

<br/>

# 참고사이트
- [colab_ssh : Connection closed by remote host #45](https://github.com/WassimBenzarti/colab-ssh/issues/45)
- [Create a locally-managed tunnel (CLI)](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-local-tunnel/)
- [SSH to Google Colab via Terminal or VSCode - YouTube](https://youtu.be/wvDFNQNgqS8?si=mU3NAHZ2ucN4oC5t)