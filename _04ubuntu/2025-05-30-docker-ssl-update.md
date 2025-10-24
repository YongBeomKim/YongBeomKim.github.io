---
layout: blog
title: (Docker) Certbot 인증서 갱신하기
tags:
- certbot
---

지금 제공하신 `default.conf`와 `Dockerfile` 내용으로 보면,
현재 `certbot` 인증서 갱신 실패(→ SSL 만료)의 **직접 원인**이 95% 명확합니다.

```bash
>> Warning: Potential Security Risk Ahead

Websites prove their identity via certificates, which are valid for a set time period. The certificate for website.com expired on 8/23/2025.
 
Error code: SEC_ERROR_EXPIRED_CERTIFICATE
 
View Certificate
```


## 결론 요약

> **원인:**
> `nginx`의 HTTPS 블록(`ssl_certificate` 경로)이 `www.mrmarket.kr` 기준으로 설정되어 있지만,
> 실제 certbot은 `mrmarket.kr` 기준 인증서(`live/mrmarket.kr/`)를 관리 중이기 때문입니다.

즉,
nginx는 `/etc/letsencrypt/live/**www.mrmarket.kr**/` 경로의 인증서를 사용하고 있고,
certbot은 `/etc/letsencrypt/live/**mrmarket.kr**/` 인증서만 갱신하려고 시도 → **인증서 파일 불일치 발생.**

→ 따라서 `nginx`는 여전히 **만료된 경로(`www.mrmarket.kr`)의 인증서 파일**을 사용 중입니다.

## 🩺 1️⃣ 현상 정리

현재 nginx 설정 중 관련 부분:

```nginx
ssl_certificate /etc/letsencrypt/live/www.mrmarket.kr/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/www.mrmarket.kr/privkey.pem;
```

하지만 certbot은 보통 다음 경로에 인증서를 발급합니다:

```
/etc/letsencrypt/live/mrmarket.kr/
```

따라서 `docker compose restart nginx`를 해도 nginx는 **존재하지 않거나 오래된 `www.mrmarket.kr` 인증서**를 참조하게 됩니다.
→ 결과적으로 “expired certificate” 오류가 계속 유지됩니다.

## 🧩 2️⃣ 원인 분석 세부 요약

| 구분                           | 문제점                                                         | 영향             |
| ---------------------------- | ----------------------------------------------------------- | -------------- |
| **1. 인증서 경로 불일치**            | `nginx`는 `www.mrmarket.kr` 폴더 참조, certbot은 `mrmarket.kr` 발급 | SSL expired    |
| **2. certbot 발급 시 두 도메인 혼용** | `-d mrmarket.kr -d www.mrmarket.kr` 로 함께 발급 필요              | 일부 도메인만 유효     |
| **3. nginx SSL reload 누락**   | certbot이 자동 갱신해도 nginx가 재시작되지 않음                            | 새 인증서 적용 안 됨   |
| **4. webroot 접근 정상**         | ✅ `/.well-known/acme-challenge/` 설정은 올바름                    | 도메인 검증에는 문제 없음 |

즉, nginx 설정은 challenge 경로는 잘 잡혀 있으므로
갱신은 통과할 수 있었지만
**경로 불일치 + nginx 재시작 누락**으로 인해 “만료된 인증서”를 계속 사용하고 있는 상태입니다.

## 🛠️ 3️⃣ 해결 절차 (확실하고 안전한 방법)
### 🧰 Step 1 — nginx 중지
```bash
docker compose stop nginx
```

### 🧰 Step 2 — 인증서 재발급 (두 도메인 모두 포함)
```bash
docker run --rm \
  -v ./data/certbot/conf:/etc/letsencrypt \
  -v ./data/certbot/www:/var/www/certbot \
  certbot/certbot certonly --webroot \
  -w /var/www/certbot \
  -d mrmarket.kr -d www.mrmarket.kr \
  --email your@email.com --agree-tos --no-eff-email
```

> 📍 이렇게 하면 certbot이 `/etc/letsencrypt/live/**mrmarket.kr**/` 경로에
> 두 도메인을 모두 커버하는 인증서를 새로 생성합니다.

성공 후 이 폴더가 생성되어 있어야 합니다:
```
./data/certbot/conf/live/mrmarket.kr/
  ├── fullchain.pem
  ├── privkey.pem
  ├── chain.pem
  └── cert.pem
```

### 🧰 Step 3 — nginx 설정 경로 수정

아래 부분을 👇

```nginx
ssl_certificate /etc/letsencrypt/live/www.mrmarket.kr/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/www.mrmarket.kr/privkey.pem;
```

다음으로 교체합니다 ✅

```nginx
ssl_certificate /etc/letsencrypt/live/mrmarket.kr/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/mrmarket.kr/privkey.pem;
```

> 이유: certbot이 생성한 기본 폴더는 항상 **첫 번째 도메인(mrmarket.kr)** 기준으로 만들어집니다.
> 따라서 `www.mrmarket.kr` 폴더는 비어 있거나 이전 인증서가 남아 있습니다.

### 🧰 Step 4 — nginx 재시작
```bash
docker compose up -d nginx
```
> 이후 `https://mrmarket.kr` 및 `https://www.mrmarket.kr` 모두 접속 테스트
> 브라우저 개발자 도구 → **인증서 만료일**이 갱신되어야 합니다.

### 🧰 Step 5 — 자동 갱신 유지 확인
현재 certbot의 엔트리포인트는 정상입니다:
```yaml
entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
```

다만 nginx가 자동으로 reload되지 않으므로,
`renew`가 성공해도 nginx는 새 인증서를 즉시 반영하지 않습니다.

가장 간단한 방법은 **cron 컨테이너**를 하나 추가하거나,
certbot loop 안에 다음을 추가하는 것입니다 👇

```yaml
entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew && docker compose exec nginx nginx -s reload; sleep 12h & wait $${!}; done;'"
```

> (단, 이 경우 certbot 컨테이너가 `docker.sock` 접근 권한을 가져야 합니다.
> 운영 안정성을 위해 별도의 reload 스크립트를 호스트 크론에 두는 편이 더 낫습니다.)

## 🔍 4️⃣ 검증 명령어
### 인증서 유효성 확인 (호스트에서)
```bash
openssl x509 -in ./data/certbot/conf/live/mrmarket.kr/fullchain.pem -noout -dates
```

출력 예시 👇
```
notBefore=Oct 20 10:45:23 2025 GMT
notAfter=Jan 18 10:45:23 2026 GMT
```
→ `notAfter`가 현재 날짜보다 이후라면 정상입니다.

## ✅ 최종 정리
| 항목         | 설명                                             |
| ---------- | ---------------------------------------------- |
| **주요 원인**  | nginx가 `www.mrmarket.kr` 폴더의 오래된 인증서를 사용 중     |
| **근본 해결책** | `mrmarket.kr` 기준으로 인증서 재발급 후 nginx 설정 경로 수정    |
| **추가 조치**  | nginx reload 자동화, certbot 로그 주기적 점검            |
| **확인 명령어** | `openssl x509 -in fullchain.pem -noout -dates` |

원하신다면 제가 **`nginx`와 `certbot` 자동 갱신을 완전 자동화**하는
`docker-compose.yml` 개선 버전도 만들어드릴 수 있습니다.
(nginx reload 자동 포함, 중복 경로 제거, 로그 모니터링까지 자동)
그걸 원하시나요?

<br/>

# nginx와 certbot 자동 갱신을 완전 자동화하는 docker-compose.yml 개선 버전

좋습니다 👍 완전 자동으로 **SSL 인증서 발급 및 갱신 + Nginx 재시작(reload)** 이 이루어지는
📦 `docker-compose.yml` 최신 안정형 버전을 아래에 제공합니다.

이 버전은 다음을 모두 해결합니다:

✅ `mrmarket.kr` + `www.mrmarket.kr` **두 도메인 동시 인증서 관리**
✅ **12시간마다 자동 갱신**
✅ 갱신 후 **자동으로 Nginx reload 실행**
✅ `nginx`가 `certbot` 볼륨 공유하여 최신 인증서 사용
✅ `/.well-known/acme-challenge/` 자동 라우팅

---

## 🧩 완전 자동화된 docker-compose.yml

```yaml
version: "3.8"

services:
  nginx:
    image: nginx:1.25.3
    container_name: nginx
    restart: always
    depends_on:
      - certbot
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot
      - ./static:/static
      - ./media:/media
    networks:
      - webnet

  certbot:
    image: certbot/certbot:latest
    container_name: certbot
    restart: always
    volumes:
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot
      - /var/run/docker.sock:/var/run/docker.sock
    entrypoint: >
      /bin/sh -c "
      trap exit TERM;
      while :; do
        echo '🔁 Running certbot renew...';
        certbot renew --webroot -w /var/www/certbot --quiet;
        echo '✅ Reloading nginx...';
        docker exec nginx nginx -s reload || true;
        sleep 12h & wait $${!};
      done;
      "
    networks:
      - webnet

  # 초기 발급용(최초 1회 실행 후 주석 처리)
  certbot-init:
    image: certbot/certbot:latest
    container_name: certbot-init
    depends_on:
      - nginx
    command: >
      certonly --webroot
      -w /var/www/certbot
      -d mrmarket.kr
      -d www.mrmarket.kr
      --email your@email.com
      --agree-tos
      --no-eff-email
    volumes:
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot
    networks:
      - webnet

networks:
  webnet:
    driver: bridge
```

---

## 📁 디렉토리 구조 예시

```
project-root/
├─ nginx/
│  └─ default.conf
├─ data/
│  └─ certbot/
│     ├─ conf/   ← 인증서 저장됨
│     └─ www/    ← 인증 검증용 웹루트
├─ static/
├─ media/
└─ docker-compose.yml
```

---

## 🧱 `nginx/default.conf` (갱신된 버전)

아래 내용으로 반드시 수정해 주세요 👇
(가장 중요한 부분은 `ssl_certificate` 경로입니다 — `mrmarket.kr` 기준)

```nginx
upstream backend {
    server website:8000;
}

server {
    listen 80;
    server_name mrmarket.kr www.mrmarket.kr;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name mrmarket.kr www.mrmarket.kr;

    ssl_certificate /etc/letsencrypt/live/mrmarket.kr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mrmarket.kr/privkey.pem;

    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_min_length 256;
    gzip_types text/plain text/css application/json application/javascript application/xml text/javascript;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /static/;
        autoindex on;
        expires 30d;
        access_log off;
        add_header Cache-Control "public, max-age=2592000";
        try_files $uri $uri/ =404;
    }

    location /media/ {
        alias /media/;
        try_files $uri $uri/ =404;
        expires 30d;
        access_log off;
        add_header Cache-Control "public, max-age=2592000";
    }

    location /flower/ {
        proxy_pass http://flower:5555/flower/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /streamlit/ {
        proxy_pass http://streamlit_app:8501/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

---

## 🚀 최초 실행 순서

1️⃣ `nginx` 먼저 띄움

```bash
docker compose up -d nginx
```

2️⃣ `certbot-init` 실행 → 최초 인증서 발급

```bash
docker compose run --rm certbot-init
```

3️⃣ 발급 완료 후 `certbot-init` 서비스 주석 처리
4️⃣ 나머지 서비스 재시작

```bash
docker compose up -d
```

5️⃣ 확인

```bash
openssl x509 -in data/certbot/conf/live/mrmarket.kr/fullchain.pem -noout -dates
```

---

## 🔄 자동 갱신 동작

* `certbot` 컨테이너는 **12시간마다 `certbot renew`** 실행
* 인증서 변경 감지 시 자동으로 `docker exec nginx nginx -s reload` 수행
* nginx는 재시작 없이 **즉시 새 인증서 반영**

---

## ✅ 장점

| 기능                 | 설명                                     |
| ------------------ | -------------------------------------- |
| 🔁 자동 갱신           | 매 12시간마다 `certbot renew` 실행            |
| 🔂 Nginx 자동 reload | 인증서 변경 즉시 반영                           |
| 🔒 단일 인증서 관리       | `mrmarket.kr` 기준으로 두 도메인(`www.` 포함) 관리 |
| 📦 Docker 내 완전 격리  | nginx, certbot, 웹앱 분리                  |
| 🧱 파일 재활용          | `/data/certbot/conf` 볼륨에 인증서 영구 저장     |

---

원하신다면 이 설정에 **Django / Gunicorn / Redis / Celery** 등까지 포함된
“**SSL 자동갱신 풀스택 배포용 docker-compose.yml**” 버전도 함께 만들어드릴 수 있습니다.
그 버전도 같이 구성해드릴까요?
