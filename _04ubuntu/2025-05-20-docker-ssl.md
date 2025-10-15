---
layout: blog
title: (Docker) Certbot 인증서 설치
tags:
- certbot
---

`Docker Compose` 를 활용하여 Nginx, Certbot 을 설치하는 과정을 간략히 정리하면 다음과 같습니다.

- docker compose 를 활용하여 서비스 빌드작업을 확인 합니다
- 서비스 운영 서버의 `80, 443` 포트 2개가 열려 있는지 확인 합니다.
- 공유기의 `80` 포트의 `http` 주소설정 확인 및 도메인의 동작을 확인 합니다.
- `init-letsencrypt.sh` 를 활용하여 `certbot` 으로 `SSL` 도메인 인증서를 설치 합니다.
- `SSL` 인증서가 정상적으로 설치되면, `nginx.conf` 내용에 관련 내용을 추가 합니다.

<br/>

# Docker Compose 에서 Certbot 인증서 설치
## Docker Compose 작업내용 복사 붙여넣기
Git 등을 활용하여 서비스를 운영하는 서버에 관련 파일들을 복사 합니다. 현재 작업할 내용의 폴더구조를 요약하면 아래와 같습니다.
```bash
.
├── docker-compose.yml
├── init.sh
├── nginx
│   ├── Dockerfile
│   └── default.conf
└── website
    ├── Dockerfile
    └── README.md
```

위의 내용 중 docker compose 설정파일 내용 중 작업에 필요한 부분만 살펴보면 다음과 같습니다. 인증서와 관련하여 중요한 부분은 `volumes` 부분에서 `./data/certbot/www:/var/www/certbot:rw` 내용 입니다. 해당 경로에 인증서 내용이 설치 됩니다.
```yml
networks:
  mynetwork:

volumes:	
  myvolume:
  portainer_data:

services:

  nginx:
    build: 
      context: ./nginx
      dockerfile: Dockerfile
    networks:
      - mynetwork
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro # 템플릿 파일 마운트
      - ./data/certbot/conf:/etc/letsencrypt:rw
      - ./data/certbot/www:/var/www/certbot:rw
    depends_on:
      certbot:
        condition: service_started
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s
    extra_hosts:
      - "host.docker.internal:host-gateway"
    environment:
      - TZ=Asia/Seoul
    command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \"daemon off;\"'"

  certbot:
    image: certbot/certbot
    container_name: certbot_app
    restart: unless-stopped
    volumes:
      - ./data/certbot/conf:/etc/letsencrypt:rw
      - ./data/certbot/www:/var/www/certbot:rw
      - ./html:/var/www/html
    # 12 시간마다 유효기간 확인 및 업데이트
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
```

인증서를 설치하는 경로가 필요하기 때문에 아래와 같이 물리적으로 추가 합니다.
```bash
$ sudo mkdir -p /var/www/certbot
```

## Nginx of `http:80`
nginx 의 기본설정 포트인 `80` 를 활용하여 `http` 주소로 서비스 동작을 확인 합니다. 아래의 내용은 `http://site.kr, http://www.site.kr` 를 활용하는 내용의 예제 입니다.
```jsx
upstream backend {
  server website:8000; 
}

server {
  listen 80;
  server_name www.site.kr site.kr;

  location / {
    proxy_pass http://backend;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location /.well-known/acme-challenge/ {
    root /var/www/certbot;
  }
}
```

## CertBot
현재 사용자가 `시스템 설정파일의 수정작업` 할 수 있도록 권한을 추가 합니다.
```bash
$ ls -ld ./data/certbot/conf               # 권한 확인
$ sudo chown -R $USER:$USER ./data/certbot # 소유자 변경 (현재 사용자)
```

앞의 `www/html` 저장소 저장 폴더가 없는 경우에는 다음과 같은 오류를 발생하였습니다.
```bash
$ ./init-letsencrypt.sh                    # Certbot 인증서 실행

Existing data found for www.site.kr,site.kr. 
Continue and replace existing certificate? (y/N) y

### Downloading recommended TLS parameters ...
./init-letsencrypt.sh: line 25: ./data/certbot/conf/options-ssl-nginx.conf: Permission denied
./init-letsencrypt.sh: line 26: ./data/certbot/conf/ssl-dhparams.pem: Permission denied

### Creating dummy certificate for www.site.kr,site.kr ...
mkdir: cannot create directory 
‘./data/certbot/conf/live’: Permission denied
# .+...+.....+.......+......+......+...+......+..+++++
req Can not open /etc/letsencrypt/live/www.site.kr,site.kr/privkey.pem
for writing, No such file or directory

### Deleting dummy certificate for www.site.kr,site.kr ...
### Requesting Let's Encrypt certificate for www.site.kr,site.kr ...
Saving debug log to /var/log/letsencrypt/letsencrypt.log
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Would you be willing, once your first certificate is successfully issued, to
share your email address with the Electronic Frontier Foundation, a founding
partner of the Let's Encrypt project and the non-profit organization that
develops Certbot? We'd like to send you email about our work encrypting the web,
EFF news, campaigns, and ways to support digital freedom.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: y
Account registered.
Requesting a certificate for www.site.kr and site.kr

Certbot failed to authenticate some domains (authenticator: webroot). 
The Certificate Authority reported these problems:
  Domain: www.site.kr
  Type:   unauthorized
  Detail: 59.14.102.2: Invalid response from http://www.site.kr/.well-known/acme-challenge/K9j4xULGgmrfrLcpzdlnG8yzXZOixHvTCmWdVI9vdZI: 404

  Domain: site.kr
  Type:   unauthorized
  Detail: 59.14.102.2: Invalid response from http://site.kr/.well-known/acme-challenge/Vd_9qQHjKzoANpgv1Y7e8NdjQ3H5iKDis0nt0Hjn_bQ: 404

Hint: The Certificate Authority failed to download the temporary challenge files created by Certbot. Ensure that the listed domains serve their content from the provided --webroot-path/-w and that files created there can be downloaded from the internet.

Some challenges have failed.
Ask for help or search for solutions at https://community.letsencrypt.org. See the logfile /var/log/letsencrypt/letsencrypt.log or re-run Certbot with -v for more details.
```

앞의 환경과 동일한 상태에서 docker compose 를 활용하여 도메인 인증서를 설치해 보았습니다.
```bash
$ docker run --rm -v ./letsencrypt:/etc/letsencrypt certbot/certbot certonly --webroot -w /var/www/html -d site.kr -d www.site.kr

/var/www/html does not exist or is not a directory
Ask for help or search for solutions at https://community.letsencrypt.org. See the logfile /tmp/certbot-log-aips3gy0/log or re-run Certbot with -v for more details.
```

메세지 내용을 살펴보면  `/var/www/html does not exist or is not a directory` 인증서 설치 폴더가 존재하지 않음을 알 수 있습니다. 인증서 설치 폴더를 다시한번 생성 및 확인 후 인증서 설치 과정을 한 번 더 실행해 보았습니다.
```bash
$ sudo mkdir -p /var/www/html
$ ./init-letsencrypt.sh
Existing data found for www.site.kr,site.kr. Continue and replace existing certificate? (y/N) y
### Creating dummy certificate for www.site.kr,site.kr ...
+.........+++++

### Starting nginx ...
[+] Running 6/6
 ✔ Container nginx        Started                                                    11.8s 

### Requesting Let's Encrypt certificate for www.site.kr,site.kr ...
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Requesting a certificate for www.site.kr and site.kr

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/www.site.kr/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/www.site.kr/privkey.pem
This certificate expires on 2025-09-02.
These files will be updated when the certificate renews.

NEXT STEPS:
- The certificate will need to be renewed before it expires. Certbot can automatically renew the certificate in the background, but you may need to take steps to enable that functionality. See https://certbot.org/renewal-setup for instructions.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
 * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
 * Donating to EFF:                    https://eff.org/donate-le
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

모든 조건들을 충족하여 인증서 설치가 완료됨을 알 수 있습니다. 운영 서버에 설치 완료된 인증서를 직접 확인하는 방법은 다음과 같습니다.
```bash
$ docker exec certbot_app certbot certificates     
Saving debug log to /var/log/letsencrypt/letsencrypt.log

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Found the following certs:
  Certificate Name: www.site.kr
    Serial Number: 65fbd1ac6b6b1e7af90c2ea1733318a3184
    Key Type: ECDSA
    Domains: www.site.kr site.kr
    Expiry Date: 2025-09-02 08:14:07+00:00 (VALID: 89 days)
    Certificate Path: /etc/letsencrypt/live/www.site.kr/fullchain.pem
    Private Key Path: /etc/letsencrypt/live/www.site.kr/privkey.pem
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

## Nginx of `https:443`
인증서 내용을 반영한  `nginx.conf` 설정파일을 생성해 보겠습니다. 이번에 작업한 내용은 다음과 같았습니다. 아래와 같이 내용을 업데이트한 뒤, 운영중인 서버에 docker container 들을 재 실행 합니다. 이후 `https://443` 도메인이 정상적으로 동작하는지 확인하면 작업이 완료 됩니다.
```js
# Nginx가 요청을 보낼 백엔드 그룹 이름(`django_app`) 을 정의
upstream backend {
    server website:8000; 
}

server {
    listen 443 ssl;
    server_name www.site.kr site.kr;
    ssl_certificate /etc/letsencrypt/live/www.site.kr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.site.kr/privkey.pem;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /flower/ {
        proxy_pass http://flower:5555/flower/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name www.site.kr site.kr;
    return 301 https://$host$request_uri;
}
```

# 참고사이트
- [Docker-Compose를 이용하여 Nginx와 Certbot으로 HTTPS 활성화](https://ehgus8621.tistory.com/48)
- [Deploying a Django Application with Docker, Nginx, and Certbot](https://medium.com/@akshatgadodia/deploying-a-django-application-with-docker-nginx-and-certbot-eaf576463f19)