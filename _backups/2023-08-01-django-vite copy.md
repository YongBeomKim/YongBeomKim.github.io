---
layout: blog
title: Django Vite.js boiler plate
tags:
- django
---

[django boiler plate](https://bitbucket.org/momukjilab/django-init/src/master/) 를 잘 활용하고 있었습니다. 템플릿에서 **Static** 파일에 대해서 절대경로를 사용 했습니다. 서버에서 운영을 할 때에는 Nginx 에서 **<span style="color:var(--comment);">Reverse Proxy</span>** 설정을 활용 했습니다. 

이번에 중형 프로젝트를 진행 하면서 **<span style="color:var(--accent);">[React Code Split](https://ko.legacy.reactjs.org/docs/code-splitting.html)</span>** 내용이 추가 되었습니다. 앞의 내용대로 진행한 결과 **index.min.js** 까지는 정상적으로 인식 했습니다.

하지만 연결된 파일들과 관련하여 React 또는 Vite.js 내부의 설정 오류로 인하여 실제 존재하는 경로와 다른 위치에서 파일들을 찾고 있었고, 이러한 Static 내부의 문제점을 배포파일이 여러개로 생성이 된 후, 그리고 nginx 서버에서 직접 운영을 한 뒤에서야 확인할 수 있었습니다.

이번 페이지 에서는 Django 와 Vite.js 연결에 있어서 `Static` 설정과 관련된 개념들과 작업 내용에 대해서 중점적으로 살펴보겠습니다.

<br/>

# Initialized
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

# Django & Vite.js
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

**<span style="color:var(--comment);">DEBUG = False</span>** 옵션은 **<span style="color:var(--comment);">서버에서 배포</span>** 하는 상황 입니다. 때문에 배포를 하는 서버가 사용자 설정값과 동일한지 점검하는데 위에서 표시된 **<span style="color:var(--link);">[ALLOWED_HOSTS](https://docs.djangoproject.com/en/4.2/ref/settings/)</span>** 에 대한 내용을 실행환경에 맞게 내용을 입력 합니다.

```python
ALLOWED_HOSTS = [
    '0.0.0.0',
    '127.0.0.1',
    'localhost',
    '.localhost', 
    '127.0.0.1', 
    '[::1]'
]
```

## Django Template
리액트 프로젝트 내부에 생성된 템플릿 파일을 보면 다음과 같습니다.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="django"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

위 탬플릿은 `yarn dev` 로 리액트 프로젝트를 실행할 때 사용하는 파일 입니다. **<span style="color:var(--link);">[Backend Integration](https://vitejs.dev/guide/backend-integration.html)</span>** 내용을 참고하여 Django 의 Template 내용에 다음의 내용을 추가 합니다.

```html
{% raw %}
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>mysite</title>
  </head>
  <body>
    <div id="root"></div>

    <!-- if development -->
    {% if debug %}
      <h1>Development Mode</h1>
      <script type="module" src="http://localhost:5173/@vite/client"></script>
      <script type="module">
        import RefreshRuntime from 'http://localhost:5173/@react-refresh'
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
      </script>
      <script type="module" src="http://localhost:5173/src/main.tsx"></script>

    <!-- production mode -->
    {% else %}
      <h1>Production Mode</h1>
    {% endif %}

    {% block content %}
    {% endblock content %}
  </body>
</html>

{% endraw %}
```

**DEBUG=True** 일 때 동작하는 미들웨어가 ["django.template.context_processors.debug"](https://docs.djangoproject.com/en/4.2/ref/templates/api/#using-requestcontext) 입니다. 이때 추가로 **<span style="color:var(--link);">[INTERNAL_IPS](https://docs.djangoproject.com/en/4.2/ref/settings/#internal-ips)</span>** 설정 내용에 현재 동작하는 환경설정 값을 입력해야만 `debug` 값이 템플릿에서 정상작동 됩니다. 보다 자세한 내용은 [How to check the TEMPLATE_DEBUG flag in a django template?](https://stackoverflow.com/questions/1271631/how-to-check-the-template-debug-flag-in-a-django-template) 를 참고하시면 됩니다.

```python
# settings.py
INTERNAL_IPS = [
    "127.0.0.1",
    'localhost',
]
```

위 내용들이 정상적으로 입력 되었다면, **<span style="color:var(--comment);">DEBUG=True</span>** 일 때에는 리액트 내용을 화면에 출력하고, **<span style="color:var(--comment);">DEBUG=False</span>** 일 때에는 문자만 출력 합니다.

## Vite.config.ts
이번 단계부터는 서버에서 운영에 필요한 내용을 살펴보겠습니다. **<span style="color:var(--link);">[vite.config.js](https://vitejs.dev/config/)</span>** 파일을 열고 다음의 내용을 추가 합니다. 참고로 vscode 에서 작업을 하면 es-lint 의 점검 결과 `(file)` 부분에 `Disable warning - Defined but never used` 오류표시를 출력합니다. 이 메세지를 비활성화 하려면 **<span style="color:var(--link);">[eslint-disable](https://stackoverflow.com/questions/45399923/eslint-disable-warning-defined-but-never-used-for-specific-function)</span>** 내용을 추가 하면 됩니다.

```jsx
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    exclude: /\.stories\.(t|j)sx?$/,
    include: '**/*.tsx',
  })],
  publicDir: './public',
  /* eslint-disable */
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (file) => {
          return `assets/css/index.min.css`
        },
        entryFileNames: (file) => {
          return `assets/js/[name].min.js`
        }
      }
    }
  }
  /* eslint-enable */
})
```

favicon 등의 기본 이미지 파일으 추가와 함께 `Hash` 값을 추가하는 설정 방법을 찾았는데 내용은 다음과 같습니다. 보다 자세한 설명 및 내용은 **<span style="color:var(--link);">[How do I add an images/css/js folder to the build/dist folder?](https://github.com/vitejs/vite/discussions/6552)</span>** 을 참고 하였습니다.

```jsx
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    exclude: /\.stories\.(t|j)sx?$/,
    include: '**/*.(ts|tsx)',
  })],
  publicDir: './public',
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({name}) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')){
              return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name]-[hash][extname]';   
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    }
  }
})
```

## WhiteNoise
**<span style="color:var(--link);">[Using WhiteNoise with Django](https://whitenoise.readthedocs.io/en/latest/django.html)</span>** 은, Dev 모드와 Posting 모드일 때 `Static` 파일들을 자동으로 연결 및 설정을 돕는 파이썬 모듈 입니다. 배포파일의 압축 및 캐시활용 그리고 경로 자동완성 까지 모든 내용을 통합 관리합니다. 

<figure class="align-center">
  <img width="750px" src="{{site.baseurl}}/assets/django/static_files_dev.png">
  <figcaption>Static Files in Development Mode</figcaption>
</figure>

지금까지 Nginx 에서 담당했던 역활을 Django 에서 담당하는데 있어서 문제가 있지 않을까 생각이 들었지만, **<span style="color:var(--link);">[Reddit : Is using Whitenoise instead of Nginx good enough for production?](https://www.reddit.com/r/django/comments/tqmhj6/is_using_whitenoise_instead_of_nginx_good_enough/)</span>** 내용을 확인해본 결과 운영에서도 큰 차이가 없는 것으로 이야기가 되고 있었습니다.

설정방법은 공식문서에 자세히 나와 있어서 이를 참고하여 작성 하였습니다.

```python
MIDDLEWARE = [
  'django.middleware.security.SecurityMiddleware',
  "whitenoise.middleware.WhiteNoiseMiddleware",
  ...
]
# https://whitenoise.readthedocs.io/en/latest/django.html
STORAGES = {
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.filebased.FileBasedCache",
        "LOCATION": "/var/tmp/django_cache",
    }
}

# https://docs.djangoproject.com/en/4.2/howto/static-files/
STATIC_URL = 'static/'
# for development
STATICFILES_DIRS = [
    (BASE_DIR.joinpath("../react/dist/")),
]
# for publishment
STATIC_ROOT = BASE_DIR.joinpath("staticfiles")
```

이처럼 `WhiteNoise` 설정내용을 추가한 뒤 배포환경에서 작동하는지 확인해 보았습니다. 아래의 내용들을 보면 리액트에서 빌드된 파일을 운영에 활용할 수 있도록 다양한 형태로 생성하는 것을 확인할 수 있습니다.

```bash
$ tree -l
.
├── assets
│   ├── css
│   │   └── index-d526a0c5.css
│   ├── images
│   │   └── react-35ef61ed.svg
│   └── js
│       └── index-4bbacb4a.js
├── index.html
└── vite.svg


$ ./manage.py collectstatic

You have requested to collect static files at the destination
location as specified in your settings:

  /django/staticfiles


$ ../staticfiles ➭ tree -l
.
├── assets
│   ├── css
│   │   ├── index-d526a0c5.6c5c661e3e16.css
│   │   ├── index-d526a0c5.6c5c661e3e16.css.gz
│   │   ├── index-d526a0c5.css
│   │   └── index-d526a0c5.css.gz
│   ├── images
│   │   ├── react-35ef61ed.f0402b67b6ce.svg
│   │   ├── react-35ef61ed.f0402b67b6ce.svg.gz
│   │   ├── react-35ef61ed.svg
│   │   └── react-35ef61ed.svg.gz
│   └── js
│       ├── index-4bbacb4a.618d971eb1fe.js
│       ├── index-4bbacb4a.618d971eb1fe.js.gz
│       ├── index-4bbacb4a.js
│       └── index-4bbacb4a.js.gz
├── index.19b724a8a298.html
├── index.19b724a8a298.html.gz
├── index.html
├── index.html.gz
├── staticfiles.json
├── vite.8e3a10e157f7.svg
├── vite.8e3a10e157f7.svg.gz
├── vite.svg
└── vite.svg.gz
```

<br/>

# 참고사이트
- [Vite.js](https://vitejs.dev/guide)
- [Code Split - Reactjs](https://ko.legacy.reactjs.org/docs/code-splitting.html)
- [Static & Media Files in Django with WhiteNoise](https://testdriven.io/blog/django-static-files/)

