---
layout: blog
title: (Cloue) GCP 에서 SSH 접속
tags:
- cloud
---

`Google Cloud Platform` 에서 제공하는 **[free-cloud-features](https://cloud.google.com/free/docs/free-cloud-features?hl=ko#free-tier-usage-limits)** 를 생성한 뒤 `SSH` 접속하는 방법에 대하여 알아보겠습니다.

Google Cloud 인스턴스 생성하는 방법은 [(Cloue) GCP with Free Tier](https://yongbeomkim.github.io/ubuntu/gcp-clouds) 기존의 페이지를 확인하시기 바랍니다.

<br/>

# Instance 내용 수정하기
생성된 인스턴스를 수정하는 페이지로 이동 합니다. 화면을 스크롤 해서 내려가면 아래와 같이 `SSH` 탭을 확인할 수 있습니다.접속을 허용할 사용자의 ssh 키 값은 다음과 같습니다.
```bash
$ cat ~/.ssh/id_ed25519.pub
ssh-ed25519 ABC...234s buffet@buffet
```

위 값을 클립보드로 복사한 뒤, 아래와 같이 붙여넣습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="820px" src="{{site.baseurl}}/assets/linux/gcp_cloud_ssh_edit.png">
  </p>
  <figcaption>Compute Engine - VM 인스턴스 - SSH</figcaption>
</figure>

입력을 완료하면 다음과 같이 화면에 표시되는 모습을 볼 수 있습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="820px" src="{{site.baseurl}}/assets/linux/gcp_cloud_ssh_done.png">
  </p>
  <figcaption>Compute Engine - VM 인스턴스 - SSH</figcaption>
</figure>

이미지에서 보이는 것처럼 **<span style="color:orange">사용자 이름</span>** 이 사용자가 입력한 `ssh`키 값에 따라서 정의되는 것을 볼 수 있습니다. 즉 클라우드에 등록한 사용자가 아닌 `ssh` 키 값으로 추가된 사용자 이름을 활용하여 접속하면 됩니다.

```bash
➜  ~ ssh buffet@123.456.78.9
Welcome to Ubuntu 22.04.4 LTS (GNU/Linux 6.8.0-1041-gcp x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro
...

buffet@momukji-home:~$ su - django
Password: 

django@momukji-home:~$ 
```
