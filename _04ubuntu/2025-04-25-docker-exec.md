---
layout: blog
title: Docker Compose 작업후기
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