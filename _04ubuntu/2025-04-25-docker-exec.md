---
layout: blog
title: (Docker) Compose 작업후기
tags:
- docker
---

`docker compose` 를 활용하여 배포하는 작업을 진행해 보았습니다. 이번에 작업을 진행하면서 경험한 내용들을 정리해 보겠습니다.

<br/>

# Docker
[그림으로 배우는 도커](https://yongbeomkim.github.io/contents/docker-image) 를 통해서 `docker` 에 대해서 기본 개념들을 익힐 수 있었습니다. `docker` 는 기본적으로 `Dockerfile` 의 설정내용을 이용하여 `container` 이미지를 생성합니다.

설정에 필요한 예민한 변수와 변수 내용은 `.env` 파일로 작성하면, `Dockerfile` 에서 자동으로 내용을 호출 가능합니다.

# Docker Compose
- 대부분의 서비스는 여러개의 컨테이너들을 연결하는 방식으로 실행을 합니다. 이처럼 여러개의 컨테이너를 한꺼번에 실행 및 관리하는 방법으로 `docker compose` 를 제공하고 있습니다. 

- 컨테이너간의 데이터 연결 및 관리를 위한 `network` `volume` 를 생성 및 관리할 수 있습니다. 

- 여러개의 컨테이너를 사용자 설정에 따라서 선택적으로 실행하는 `profiles` 이 있고, `depends on`,`environment` 그리고 `healthcheck` 등의 파라미터를 활용하여 컨테이너를 제어하는 방법이 있습니다.

- localhost 에서 실행중인 동일한 서비스는 `port`값에서 충돌할 수 있어서 내부의 실행과 함께 외부 연결시 활용한 포트값을 다르게 활용하는 방법이 필요 합니다.

# Example
이번 작업을 하면서 정리한 `docker-compose` 내용을 살펴보면 다음과 같습니다.
```yml
networks:
  mynetwork:

volumes:	
  myvolume:
  portainer_data:

services:

  redis:
    container_name: redis
    image: redis:latest
    ports:
      - "6370:6379"
    networks:
      - mynetwork

  website:
    container_name: website
    depends_on:
      sql:
        condition: service_healthy
      rabbitmq:
        condition: service_healthy
    build: 
      context: ./website
      dockerfile: Dockerfile
    networks:
      - mynetwork
    ports:
      - "8000:8000"
    environment:
      RUN_ENV: docker
      PYTHONPATH: ${PYTHON_DJANGO_PATH}
      # docker-compose 에서 `데이터베이스` 서비스 이름
      CELERY_BROKER_URL: pyamqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@rabbitmq:5672//
      CELERY_RESULT_BACKEND : redis://redis:6379/0
      DATABASE_HOST: ${DATABASE_HOST}
      MARIADB_DATABASE: ${MYSQL_DATABASE}
      MARIADB_USER: ${MYSQL_USER}
      MARIADB_PASSWORD: ${MYSQL_PASSWORD}
    profiles:
      - run_all
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s
    command: >
      sh -c "python manage.py makemigrations core && 
        python manage.py migrate core &&
        python manage.py makemigrations && 
        python manage.py migrate &&
        python manage.py createcachetable &&
        gunicorn server.asgi:application -k uvicorn.workers.UvicornWorker -w 4 -b 0.0.0.0:8000 --reload"

  sql:
    container_name: sql
    build:
      context: ./sql
      dockerfile: Dockerfile
    ports:
      - "3310:3306"
    networks:
      - mynetwork
    environment:
      MARIADB_DATABASE: ${MYSQL_DATABASE}
      MARIADB_USER: ${MYSQL_USER}
      MARIADB_PASSWORD: ${MYSQL_PASSWORD}
      MARIADB_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    volumes:
      - myvolume:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", 
        "ping", "-h", "localhost", "-u${MYSQL_USER}", 
        "-p${MYSQL_PASSWORD}"
      ]
      interval: 5s       # 10초마다 체크
      timeout: 3s        # 3초 넘게 응답이 없으면 실패로 간주
      retries: 10        # 10번 연속 실패하면 unhealthy
      start_period: 10s  # 컨테이너 시작 후 15초간은 실패해도 무시
    restart: always
  
  nginx:
    container_name: nginx
    build: 
      context: ./nginx
      dockerfile: Dockerfile
    networks:
      - mynetwork
    ports:
      - "80:80"
    depends_on:
      website:
        condition: service_healthy
    profiles:
      - run_all
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s
    restart: always

  rabbitmq:
    container_name: rabbitmq
    image: rabbitmq:3-management
    ports:
      - "5670:5672"   # RabbitMQ AMQP 포트 : 외부(5670) -> 컨테이너(5672)
      - "15670:15672" # RabbitMQ Management UI 포트
    networks:
      - mynetwork
    environment:
      RABBITMQ_DEFAULT_USER: ${RABBITMQ_USER}
      RABBITMQ_DEFAULT_PASS: ${RABBITMQ_PASSWORD}
    healthcheck:
      test: ["CMD", "rabbitmqctl", "status"]
      interval: 5s
      retries: 10

  celery_beat:
    container_name: celery_beat
    restart: always
    environment:
      PYTHONPATH: ${PYTHON_DJANGO_PATH}
      DATABASE_HOST: sql  # 데이터베이스 `서비스 이름` 사용
      CELERY_BROKER_URL: pyamqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@rabbitmq:5672//
    depends_on:
      - website
      - rabbitmq
    networks:
      - mynetwork
    build:
      context: ./website
      dockerfile: Dockerfile
    profiles:
      - run_all
    command: >
      sh -c "celery -A server beat --loglevel=info"

  celery_worker:
    container_name: celery_worker
    restart: always
    environment:
      PYTHONPATH: ${PYTHON_DJANGO_PATH}
      DATABASE_HOST: sql  # 데이터베이스 `서비스 이름` 사용
      CELERY_BROKER_URL: pyamqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@rabbitmq:5672//
    depends_on:
      - website
      - rabbitmq
    networks:
      - mynetwork
    build: 
      context: ./website
      dockerfile: Dockerfile
    profiles:
      - run_all
    command: >
      sh -c "celery -A server worker --loglevel=info"

  flower:
    container_name: flower
    restart: always
    environment:
      PYTHONPATH: ${PYTHON_DJANGO_PATH}
      DATABASE_HOST: sql  # 데이터베이스 `서비스 이름` 사용
      CELERY_BROKER_URL: pyamqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@rabbitmq:5672//
    depends_on:
      - website
      - rabbitmq
      - celery_beat
      - celery_worker
    networks:
      - mynetwork
    ports:
      - "5555:5555"
    build: 
      context: ./website
      dockerfile: Dockerfile
    profiles:
      - run_all
    command: >
      sh -c "celery -A server flower --broker=${CELERY_BROKER_URL} --max-tasks=50000"

  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    restart: always
    ports:
      - "9000:9000"  # Web UI
      - "9443:9443"  # HTTPS
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock  # Docker 소켓 접근
      - portainer_data:/data  # Portainer 데이터 저장
```

<br/>

# 참고
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
