---
layout: blog
title: Docker 실습예제 (Nginx, docker-compose & Celery)
tags:
- docker
---

GPT 질문은 다음과 같습니다 `docker registry는 내부 5000포트로 두고,  Nginx + Let's Encrypt 자동 인증 버전 443 포트에서 HTTPS를 처리한 뒤 registry에 프록시하는 방식 docker-compose.yml 예제로, 인증 갱신 스크립트를 crontab 대신 systemd 타이머로도 구성하고, Basic Auth 추가 버전으로, IP 제한, 도메인 다중 인증, client cert (mutual TLS)까지도 확장한 내용은?`

아주 훌륭한 고급 요청이에요! 💯  
이번 구성은 실서비스용 사설 Docker Registry로도 충분할 만큼 **보안 강화 + 자동화 + 멀티 도메인 + Mutual TLS + IP 제한**까지 포함된 완성형입니다.

---

## ✅ 구성 목표 요약

| 항목 | 내용 |
|------|------|
| Registry 접근 포트 | 내부 5000 |
| 외부 노출 포트 | Nginx가 443 처리 |
| HTTPS 인증서 | Let's Encrypt 자동 발급 (systemd 타이머) |
| 인증 보안 | Basic Auth + Client 인증서 (Mutual TLS) |
| IP 제한 | Nginx 레벨에서 화이트리스트 |
| 멀티 도메인 | registry.example.com, docker.example.com 등 |
| 자동 인증 갱신 | systemd timer로 매일 certbot renew + nginx reload |

---

## 📁 디렉토리 구조 (확장형)

```
docker-registry/
├── docker-compose.yml
├── nginx/
│   ├── nginx.conf
│   ├── htdocs/                     # certbot 인증용 웹루트
│   └── ssl-client/                 # 클라이언트 인증서 (PEM)
├── auth/
│   └── htpasswd                    # 사용자 인증
├── data/                           # registry 저장소
├── certbot-renew.sh
├── certbot-renew.service
└── certbot-renew.timer
```

---

## 🐳 `docker-compose.yml`

```yaml
version: '3.7'

services:
  registry:
    image: registry:2
    restart: always
    environment:
      REGISTRY_AUTH: htpasswd
      REGISTRY_AUTH_HTPASSWD_REALM: "Private Docker Registry"
      REGISTRY_AUTH_HTPASSWD_PATH: /auth/htpasswd
    volumes:
      - ./data:/var/lib/registry
      - ./auth:/auth

  nginx:
    image: nginx:latest
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt
      - /var/lib/letsencrypt:/var/lib/letsencrypt
      - ./nginx/htdocs:/var/www/html:ro
      - ./auth:/auth:ro
      - ./nginx/ssl-client:/etc/nginx/client-certs:ro
    depends_on:
      - registry
```

---

## 🔐 `auth/htpasswd` 생성

```bash
mkdir -p auth
docker run --rm httpd:2.4-alpine htpasswd -Bbn myuser mypassword > auth/htpasswd
```

---

## 🔐 클라이언트 인증서 생성 (Mutual TLS용)

```bash
mkdir -p nginx/ssl-client

# CA 키 생성
openssl genrsa -out nginx/ssl-client/ca.key 4096
openssl req -x509 -new -nodes -key nginx/ssl-client/ca.key -sha256 -days 3650 -out nginx/ssl-client/ca.crt -subj "/CN=my-registry-client"

# 클라이언트 인증서 생성
openssl genrsa -out nginx/ssl-client/client.key 2048
openssl req -new -key nginx/ssl-client/client.key -out nginx/ssl-client/client.csr -subj "/CN=myclient"
openssl x509 -req -in nginx/ssl-client/client.csr -CA nginx/ssl-client/ca.crt -CAkey nginx/ssl-client/ca.key -CAcreateserial -out nginx/ssl-client/client.crt -days 365 -sha256

# nginx가 참조할 인증자 파일 생성
cat nginx/ssl-client/client.crt > nginx/ssl-client/client.pem
```

---

## 🔧 `nginx/nginx.conf` (IP 제한 + Mutual TLS + 다중 도메인)

```nginx
events {}

http {
    map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
    }

    server {
        listen 80;
        server_name registry.example.com docker.example.com;

        location /.well-known/acme-challenge/ {
            root /var/www/html;
        }

        location / {
            return 301 https://$host$request_uri;
        }
    }

    server {
        listen 443 ssl;
        server_name registry.example.com docker.example.com;

        ssl_certificate /etc/letsencrypt/live/registry.example.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/registry.example.com/privkey.pem;

        # Client Certificate Auth (Mutual TLS)
        ssl_client_certificate /etc/nginx/client-certs/ca.crt;
        ssl_verify_client on;

        location / {
            allow 203.0.113.10;      # 허용된 IP (회사, 개인 등)
            allow 203.0.113.20;
            deny all;

            auth_basic "Docker Registry";
            auth_basic_user_file /auth/htpasswd;

            proxy_pass http://registry:5000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

---

## ✅ 인증서 최초 발급 (registry.example.com + docker.example.com)

```bash
docker compose up -d nginx

docker run --rm -v /etc/letsencrypt:/etc/letsencrypt \
  -v /var/lib/letsencrypt:/var/lib/letsencrypt \
  -v "$(pwd)/nginx/htdocs:/var/www/html" \
  certbot/certbot certonly --webroot -w /var/www/html \
  --email you@example.com --agree-tos --no-eff-email \
  -d registry.example.com -d docker.example.com
```

---

## 🔁 자동 인증서 갱신 (systemd 타이머)

### 🔧 `certbot-renew.sh`

```bash
#!/bin/bash

docker run --rm \
  -v /etc/letsencrypt:/etc/letsencrypt \
  -v /var/lib/letsencrypt:/var/lib/letsencrypt \
  -v "$(pwd)/nginx/htdocs:/var/www/html" \
  certbot/certbot renew --webroot -w /var/www/html --quiet

docker compose exec nginx nginx -s reload
```

```bash
chmod +x certbot-renew.sh
```

---

### 🔧 `certbot-renew.service`

```ini
[Unit]
Description=Renew Let's Encrypt certificates for Docker Registry
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
WorkingDirectory=/path/to/docker-registry
ExecStart=/path/to/docker-registry/certbot-renew.sh
```

---

### 🔧 `certbot-renew.timer`

```ini
[Unit]
Description=Daily Certbot renew

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
```

---

### ⏱ 타이머 등록

```bash
sudo cp certbot-renew.* /etc/systemd/system/
sudo systemctl daemon-reexec
sudo systemctl enable --now certbot-renew.timer
```

---

## ✅ 클라이언트 사용 예시 (Mutual TLS 적용 시)

클라이언트는 다음처럼 `client.crt` + `client.key`를 도커 명령어에 사용:

```bash
docker login https://registry.example.com

docker --tlscert=client.crt --tlskey=client.key \
       push registry.example.com/myimage
```

> `docker`는 기본적으로 Mutual TLS 설정을 지원하지 않기 때문에  
> `curl`, `skopeo`, `containerd` 등을 사용하는 환경에서 클라이언트 인증이 더 자연스럽습니다.  
> 혹은 프록시 서버를 활용한 방식을 사용할 수도 있습니다.

---

## ✅ 핵심 보안 요약

| 항목            | 설명 |
|------------------|------|
| HTTPS            | Let's Encrypt, 자동 갱신 |
| Basic Auth       | htpasswd 기반 사용자 인증 |
| IP 제한          | Nginx에서 `allow/deny` 설정 |
| Mutual TLS       | 클라이언트 인증서 필요 |
| 다중 도메인      | certbot + nginx 설정 지원 |
| 자동화           | systemd 타이머로 완전 자동화 |

---

필요하시면:

- `client 인증서 검증 로깅`  
- `fail2ban 연동`  
- `Nginx Rate Limit`  
- `Web UI (Harbor처럼)`  
도 확장 가능합니다.
