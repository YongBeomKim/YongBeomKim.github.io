---
layout: blog
title: Django Vite.js boiler plate
tags:
- django
---

기존에 작업했던 [django boiler plate](https://bitbucket.org/momukjilab/django-init/src/master/) 를 잘 활용하고 있었습니다. 이번에 중형 프로젝트를 작업하면서 **<span style="color:var(--accent);">[React Code Split](https://ko.legacy.reactjs.org/docs/code-splitting.html)</span>** 내용을 추가하여 작업을 진행했는데 서버 배포시 **index.min.js** 파일은 정상적으로 동작을 하는데 나머지 `split code` 에서 필요한 파일들을 찾지못해 이래저래 수정작업을 하다가 결국 엉망이 되어 버렸습니다.

이번 기회에 `Django & Vite.js` 프로젝트 시작 내용을 다시한번 정리해 볼 예정 입니다. 그리고 그동안 작업을 하면서 추가된 개념 및 기능들이 안정적으로 동작할 수 있도록 함께 내용에 포함시켜 보겠습니다.

<br/>

# Setup & Initialized
## Tutorials
전체적인 내용은 아래의 동영상을 참고 하였습니다.

<figure class="align-center">
  <p style="text-align: center">
    <iframe width="560" height="315" 
      src="https://www.youtube.com/embed/9Iq-0OYkoX0" 
      title="YouTube video player" frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowfullscreen>
    </iframe>
  </p>
  <figcaption>Integrate React in Django</figcaption>
</figure>

## Installation
**<span style="color:var(--link);">[Vite.js Getting Started](https://vitejs.dev/guide/#getting-started)</span>** 와 **<span style="color:var(--link);">[Django 첫 번째 장고 앱 작성하기 Part1](https://docs.djangoproject.com/ko/4.2/intro/tutorial01/)</span>** 내용을 참고 하였습니다.

```bash
$ python3.11 -m venv .venv
$ cd .venv
$ . bin/activate
$ cd ..
$ mkdir django
$ cd django
$ pip install Django
$ django-admin startproject server .
$ cd ..

$ yarn create vite react --template react-ts
$ cd react
$ yarn install
$ tree -d
.
├── django
│   └── server
└── react
    ├── node_modules
    ├── public
    └── src
        └── assets
```

<br/>

# Connect with Django & React.js with Vite.js
`Django` 서버에 `vite.js` 를 연결하여 활용하고 있습니다. 다른 내용에서는 Django 와 React 를 구동하는 서버를 별개로 구성하는 경우가 많습니다. 이러한 방법은 Django 1개의 서버로 운영할 때 보다 장점이 많은데, 대표적인 예로 백엔드 서버를 점검 및 작업을 위해 백업서버로 연결을 할 때, 서비스 중단을 최소화 하며 빠르게 작업을 진행할 수 있습니다. 이번 내용에서는 Django 서버 1개만을 사용하여 배포 서비스를 구현하는 것을 목표로 합니다.

## Django Setting
Django 설치 후 기본내용은 다음과 같습니다.
```python
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
ALLOWED_HOSTS = []
```

**<span style="color:var(--comment);">DEBUG = True</span>** 일 때에는 위 설정 만으로도 정상동작 합니다. **<span style="color:var(--comment);">DEBUG = False</span>** 로 변경 후 실행하면 다음과 같은 메세지를 출력 합니다.
```bash
CommandError: You must set settings.ALLOWED_HOSTS if DEBUG is False.
```

**<span style="color:var(--comment);">DEBUG = False</span>** 옵션은 **<span style="color:var(--comment);">서버에서 배포</span>** 하는 상황 입니다. 때문에 배포를 하는 서버가 사용자 설정값과 동일한지를 점검하는데 위에서 표시된 **<span style="color:var(--link);">[ALLOWED_HOSTS](https://docs.djangoproject.com/en/4.2/ref/settings/)</span>** 와 **<span style="color:var(--link);">[INTERNAL_IPS](https://docs.djangoproject.com/en/4.2/ref/settings/#internal-ips)</span>** 값을 다음과 같이 추가 합니다.
```python
INTERNAL_IPS = [
    "127.0.0.1",
    'localhost',
]
ALLOWED_HOSTS = [
    '0.0.0.0',
    '127.0.0.1',
    'localhost',
    '.localhost', 
    '127.0.0.1', 
    '[::1]'
]
```


<br/>

# 참고사이트
- [Vite.js](https://vitejs.dev/guide)
- [WhiteNoise](https://whitenoise.readthedocs.io/en/latest/)
- [Code Split - Reactjs](https://ko.legacy.reactjs.org/docs/code-splitting.html)

