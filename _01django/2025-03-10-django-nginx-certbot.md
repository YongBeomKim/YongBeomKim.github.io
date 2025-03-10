---
layout: blog
title: (SSL) - CertBot 설치 및 연결하기
tags:
- certbot
- nginx
---

서비스를 도메인에 연결하고 `SSL` 설정값을 추가하는 내용을 정리해 보겠습니다.

# 서버 문제발생 - 해결필요
Ubuntu 22.04 업데이트 진행 중 시스템 기본값을 유지하면서 업데이트를 진행 했어야 하는데, 무리하게 업데이트를 진행함으로 인하여 서비스에 문제가 발생하여 외부 접속이 안되는 상황이 발생하였습니다.
```bash
$ mokutil --sb-state
disable

## UEFI BIOS에서 Secure Boot를 비활성화하는 방법:
## 시스템 재부팅
## 부팅 시 BIOS/UEFI 설정 진입 (일반적으로 F2, F12, DEL, ESC 키)
## Secure Boot 옵션을 찾아 "Disabled"로 변경
# 변경 사항 저장 후 시스템 재부팅
# 다시 패키지 설치 시도:
$ sudo dpkg --configure -a
$ sudo apt-get install -f
# 이제 shim-signed 패키지가 정상적으로 설치될 가능성이 높습니다.
```

<br/>

# Install
## Certbot 3
우분투 기본제공 패키지를 활용하면 `Certbot 1.21`을 설치 합니다.
```bash
$ sudo apt update
$ sudo apt install certbot python3-certbot-nginx -y
$ certbot --version
  ImportError: cannot import name 'appengine' from 'urllib3.contrib' 
  (/home/username/.local/lib/python3.10/site-packages/urllib3/contrib/__init__.py)

$ pip install "urllib3<1.26"
$ certbot --version
certbot 1.21.0
```

`1.21` 버젼은 `Nov 4, 2021` 에 작성된 것으로 여러가지 문제가 발생할 수 있습니다. [Certbot Github](https://github.com/certbot/certbot) 를 보면 업데이트가 활발하게 진행되고 있고, 2025년 3월 현재 최신버젼으로는 [certbot 3.2.0](https://community.letsencrypt.org/t/certbot-3-2-0-release/233524) 을 제공하고 있습니다. [Certbot Instructions](https://certbot.eff.org/instructions?ws=nginx&os=snap) 문서에 작성한 대로 `snap` 을 활용하여 설치를 진행합니다.

```bash
# 작업을 진행하기 전에 기존 `Certbot`을 제거 합니다
sudo apt remove certbot -y
sudo apt autoremove -y

# Snapd 패키지 설치 (최신 Certbot을 위해 필요)**
sudo apt update
sudo apt install snapd -y

# Certbot 최신 버전 설치**
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot

# 심볼릭 링크 설정 (snap -> apt)
sudo ln -s /snap/bin/certbot /usr/bin/certbot
certbot --version
  certbot 3.2.0
```

<iframe 
  width="560" height="315" src="https://www.youtube.com/embed/zptOf3m_pr4?si=f7fLFuwZsLYXlh0w" 
  title="YouTube video player" frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" 
  allowfullscreen>
</iframe>

## Nginx
현재 서버에는 `MariaDB 11.4 LTS` 를 설치 하였습니다. `djang



sudo apt update
sudo apt install system76-driver-nvidia
sudo apt install nvidia-cuda-toolkit





### **🔹 1-5. Certbot 버전 확인**
```bash
certbot --version
```
출력 예시:
```
certbot 2.11.0
```

---

# ✅ **2. Nginx 설정 확인**
Certbot이 자동으로 SSL 설정을 적용하려면, Nginx가 올바르게 설정되어 있어야 합니다.

### **🔹 2-1. Nginx 설치 및 실행 여부 확인**
```bash
sudo apt install nginx -y
sudo systemctl status nginx
```
Nginx가 실행되지 않았다면:
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

### **🔹 2-2. Nginx 서버 블록 설정 확인**
Nginx의 기본 설정 파일(`/etc/nginx/sites-available/default` 또는 `/etc/nginx/sites-available/yourdomain`)을 열어 도메인이 올바르게 설정되어 있는지 확인하세요.

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;  # Django, Flask 등 백엔드 서버
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

설정을 수정했다면 Nginx를 다시 로드하세요.
```bash
sudo nginx -t  # 설정 확인
sudo systemctl reload nginx
```

---

# ✅ **3. Certbot을 이용한 SSL 인증서 발급**
이제 Let's Encrypt에서 SSL 인증서를 발급받고 자동 설정을 적용합니다.

### **🔹 3-1. SSL 인증서 발급 및 자동 적용**
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### **🔹 3-2. 과정 중 입력 사항**
1. 이메일 입력
2. 이용 약관 동의 (`A` 입력)
3. HTTP → HTTPS 강제 리디렉션 여부 선택  
   - **1번**: HTTPS로 자동 리디렉트 (권장)  
   - **2번**: HTTP와 HTTPS 둘 다 유지

이제 Certbot이 자동으로 SSL 인증서를 적용하며, `/etc/nginx/sites-available/yourdomain` 파일이 업데이트됩니다.

---

# ✅ **4. Nginx 설정 확인**
Certbot이 적용한 Nginx 설정을 확인합니다.

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$host$request_uri;  # HTTP → HTTPS 리디렉트
}

server {
    listen 443 ssl;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### **🔹 4-1. 설정 파일 테스트 후 적용**
```bash
sudo nginx -t  # 설정 파일 검증
sudo systemctl reload nginx  # 설정 반영
```

---

# ✅ **5. SSL 인증서 자동 갱신 설정**
Let's Encrypt 인증서는 **90일마다 갱신**해야 합니다. Certbot은 자동 갱신을 설정할 수 있습니다.

### **🔹 5-1. 갱신 테스트**
```bash
sudo certbot renew --dry-run
```
✅ 정상적으로 실행되면 자동 갱신이 설정된 것입니다.

### **🔹 5-2. 갱신 크론잡 확인**
Certbot은 자동으로 `/etc/cron.d/certbot`에 갱신 작업을 추가합니다. 확인하려면:
```bash
sudo systemctl list-timers | grep certbot
```
만약 자동 갱신을 수동으로 설정하고 싶다면, `crontab`을 수정합니다.
```bash
sudo crontab -e
```
그리고 다음 줄을 추가합니다.
```bash
0 3 * * * certbot renew --quiet && systemctl reload nginx
```
✅ **이제 SSL 인증서가 자동으로 갱신됩니다!**

---

# ✅ **6. 문제 해결**
### ❌ **문제 1: "certbot: command not found"**
🔹 해결 방법:
```bash
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

### ❌ **문제 2: "Could not bind to IPv4 or IPv6"**
🔹 원인: Nginx가 80 포트를 사용 중이어서 Certbot이 인증 실패  
🔹 해결 방법:
```bash
sudo systemctl stop nginx
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com
sudo systemctl start nginx
```

### ❌ **문제 3: 인증서가 만료되었는데 자동 갱신이 안 됨**
🔹 해결 방법:
```bash
sudo certbot renew --force-renewal
sudo systemctl reload nginx
```

---

# 🎯 **최종 정리**
✅ 1. **Certbot 2.11 설치**  
✅ 2. **Nginx 설정 확인**  
✅ 3. **Certbot으로 SSL 인증서 발급 및 자동 적용**  
✅ 4. **Nginx 설정 확인 및 재시작**  
✅ 5. **SSL 인증서 자동 갱신 설정**  
✅ 6. **문제 발생 시 해결 방법 적용**  

이제 **Ubuntu + Nginx에서 무료 SSL 인증서**를 사용하여 **HTTPS를 안전하게 운영**할 수 있습니다! 🚀












<iframe width="560" height="315" src="https://www.youtube.com/embed/zptOf3m_pr4?si=f7fLFuwZsLYXlh0w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>




## <strike>CertBot 1.21</strike>
certbot 은 Python 으로 작성되어 있어서, 이를 실행하기 위한 Python 실행파일 및 패키지는 `/home/username/.local/lib/python3.10/` 에 설치되어 있는 것을 활용하는 것을 확일할 수 있습니다.
```bash
$ sudo apt update
$ sudo apt install certbot python3-certbot-nginx -y
$ certbot --version        

Traceback (most recent call last):
  File "/usr/lib/python3/dist-packages/requests_toolbelt/_compat.py", line 48, in <module>
    from requests.packages.urllib3.contrib import appengine as gaecontrib
ImportError: cannot import name 'appengine' from 'requests.packages.urllib3.contrib' 
(/home/username/.local/lib/python3.10/site-packages/urllib3/contrib/__init__.py)

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  ...
  File "/usr/lib/python3/dist-packages/requests_toolbelt/adapters/ssl.py", line 16, in <module>
    from .._compat import poolmanager
  File "/usr/lib/python3/dist-packages/requests_toolbelt/_compat.py", line 50, in <module>
    from urllib3.contrib import appengine as gaecontrib
ImportError: cannot import name 'appengine' from 'urllib3.contrib' 
(/home/username/.local/lib/python3.10/site-packages/urllib3/contrib/__init__.py)
```

위 오류는 `urllib3` 패키지를 다운그레이드 해 줌으로써 해결 가능합니다. `pip install "urllib3<1.26"` 실행하면 오류가 해결되는 것을 확인 할 수 있습니다.
```bash
$ certbot --version
certbot 1.21.0
```







## 인증서 발급받기






Django 에서 ORM 문법을 활용하여 데이터를 호출하는 때에 초보자가 혼동하는 부분이 `.first()` 와 `.last()` 입니다. 데이터 베이스에 가장 최근에 저장된 내용이 `.first()` 이고, 저장한지 오래된 자료가 `.last()` 메서드를 활용하여 호출 하면 됩니다.
```python
In [1]: from app_news.models import NewsList
      : NewsList.objects.first()
      : NewsList.objects.order_by('-pk')[0]
Out[1]: (id:20) <NewsList: [경제] 해수부, 항만건설사업 BIM 적용지침 마련…"기술도입 활성화 기대">

In [2]: NewsList.objects.last()
      : NewsList.objects.order_by('pk')[0]
Out[2]: (id:1) <NewsList: '매각 중단' 홈플러스익스프레스, 유동성 확보에 힘 보탤까>
```

`Datetime
```python
# models.py
from django.db import models

class Post(models.Model):
    datetime = models.DateTimeField()


# `Datetime` 필드를 특정 날짜로 필터링
from myapp.models import Post
filtered_data = Post.objects.filter(datetime__date=target_date)
```

<br/>

# 참고사이트
- [Django Model - Field API 한글해설](https://brunch.co.kr/@ddangdol/11)