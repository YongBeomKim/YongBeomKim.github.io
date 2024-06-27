---
layout: blog
title: Streamlit Setting with Django
tags:
- streamlit
---

Django 데이터 구조화 작업을 진행한 뒤 프론트앤드 작업을 위해서 Figma 스케치 작업을 진행한 뒤 이 내용을 바탕으로 프론트엔드 작업을 진행했습니다. 데이터 구조가 명확하거나 간단한 경우에는 문제가 덜했지만 어떤 내용으로 프론트엔드를 구성할지 명확하지 않은 상황일수록, 빠르게 프로토타입을 구현하면서 작업을 진행한다면 훨씬 생산성이 높아질 것으로 생각 되었습니다.

이에 가장 부합하는 도구라면 [Streamlit](https://docs.streamlit.io/get-started) 이 있습니다. 예전에 한번 사용해본적이 있었지만 그 당시에는 기능이 부족하다고 생각해서 사용을 하지 않았습니다.

Snowflake 에서 관리를 하고 있는 덕분에 많은 기능들이 보강되어 있었습니다. 커뮤니티 활동도 활발하게 이루어져 있어서 Django-React 작업을 진행한 경험에 비추어, Streamlit 에서도 관련된 기능에 대한 내용을 검색하면 어렵지 않게 연관 문서들을 쉽게 찾을 수 있었습니다.

시각화 작업을 위한 Table 및 Chart 작업을 하는데 있어서 Python 코드를 그대로 활용할 수 있다는 점도 강점이 있어서 이와 관련된 내용들을 정리해보려고 합니다.

<br/>

# 작업내용
1. Integrating Streamlit with Django
2. Streamlit with Table
3. Streamlit with Plotly

[작업 Process - by knotend](https://www.knotend.com/g/a#N4IgzgpgTglghgGxgLwnARgiAxA9lAWxAC5QA7XAEwjBPIA4BOAJnoGYAGAFjpAQwgISIACIArOGQDmuAAQAKAHIwyEgJQAdMgFoAfLIDKAFyhoCSIyAC+AGhBkArBycde-dIOEAFBLiMIATwUANxgwAFdEFDgjGFwyNWs7R04ANjZmLgc3ASFiEGNTOHMYIy09WQBhOABjAAsIWQAyWQBBcKM661sQCEopGhIAbSH7JlZOHmSnFxAAXRtRx2cOV2m0jKz5uZ6awQQAdRhKTpIARiy7PYQEAAkIGCk6y2Iueiv9rzhKShUpc44ySoEAA8lBqLBpMMxix2NwQNMVmt7A4NplsjsgA)

<br/>
---

# Integrating Streamlit with Django
## Customized Django-Admin Command
프로젝트 내부에서 사용하는 언어 및 모듈 단위로 폴더를 세분화 합니다.
```bash
$ tree -L 1
.
├── .venv
├── requirements.txt
├── mysite           # django-admin startproject mysite
├── react            # npx create-react-app react
└── streamlit        # mkdir streamlit
```
리액트는 빌드한 뒤, django 내부의 staticfiles 폴더에 포함되므로 django 만 배포작업을 진행하면 됩니다. `Streamlit` 를 배포할 때에는 systemd 에 별도의 Service 로 해서 운영하면 됩니다. 이번에는 조금 더 편하게 운영할 수 있도록 Django 내부에 `Streamlit` 실행함수를 등록해 보도록 하겠습니다.

```python
# /mysite/user_app/management/commands/streamlit.py

from django.core.management.base import BaseCommand
import subprocess

class Command(BaseCommand):
    help = 'Run the Streamlit app'

    def handle(self, *args, **kwargs):
        subprocess.run(['streamlit', 'run', '../streamlit/run.py'])
```

[Custom django-admin Commands](https://docs.djangoproject.com/en/5.0/howto/custom-management-commands/) 를 활용하여 `streamlit` 을 실행하는 커맨드 명령을 위의 예시와 같이 추가를 해 주었습니다. 정상적으로 등록이 되었다면 위 실행파일 이름을 그대로 터미널에서 입력을 하면 정상적으로 서비스가 실행되는 것을 볼 수 있습니다.

```bash
$ ./manage.py streamlit        

  You can now view your Streamlit app in your browser.

  Local URL: http://localhost:8502
  Network URL: http://100.100.0.0:8502
```

## Nginx Setting
배포를 하는 서버에서도 별도의 포트를 통해서 서비스가 운영 됩니다. 한개의 도메인으로 묶으려면 Nginx 등의 미들웨어에서 내부 경로명으로 설정을 하는 작업을 진행하면 됩니다.

```ini
server {
    listen 80;
    server_name yourdomain.com;

    # Serve Django application
    location / {   # Django application
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Serve Streamlit application
    location /streamlit/ {  # Streamlit application
        proxy_pass http://127.0.0.1:8501;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

ps - ChatGPT 나 Copilot 을 활용할 때 가장 큰 장점은 제한없이 내용을 검색할 수 있다는 점입니다. 웹으로 검색하려면 사이트 로그인 또는 유료결제 등으로 막혀있는 내용들도 추가적인 과금없이 확인할 수 있다는 점이 강점으로 보였습니다.

<br/>

# 참고사이트
- [Git - daemonic processes are not allowed to have children](https://github.com/celery/celery/issues/4525#issuecomment-566503932)
- [Celery - Python Multiprocessing](https://yimingstar.medium.com/python-multiproccessing-celery-bc48bb355d1f)
- [Celery 에서 worker별로 task를 부여하는 방법](https://iam.namjun.kim/celery/2018/09/09/celery-routing/)
- [Celery 한 프로세스에서 여러 gpu 할당 및 사용하기](https://medium.com/@sujohn478/celery-%ED%95%9C-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%EC%97%90%EC%84%9C-gpu-%EC%97%AC%EB%9F%AC%EA%B0%9C-%ED%95%A0%EB%8B%B9-%EB%B0%8F-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-0eb6e1a0a1e8)
