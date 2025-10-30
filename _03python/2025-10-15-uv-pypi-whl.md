---
layout: blog
title: (Uv) python Package & Pypi
tags:
- uv
- python
---

[uv/Document](https://docs.astral.sh/uv/) 과 [uv/Using uv in Docker](https://docs.astral.sh/uv/guides/integration/docker/#installing-uv) 등을 참고하여 환경에 맞게 설치를 합니다. 이번 페이지는 파이썬 패키지와 관련한 내용을 정리해 보겠습니다.

<br/>

# Package
## [package with uv locally](https://www.sarahglasmacher.com/how-to-build-python-package-uv/)
우선 작업을 진행할 Host 운영체계에서 작업을 진할 내용을 정리해 보겠습니다.
```bash
# package_name 을 정의하고 파이썬 버젼을 특정 합니다
$ uv init --lib package_name -p 3.13
$ cd package_name

# 패키지 작업을 진행합니다
$ tree -L 3
.
├── dist
├── pyproject.toml
├── README.md
├── src
│   └── package_name
│       ├── __init__.py
│       ├── data
│       │   ├── __init__.py
│       │   ├── base.py
│       │   └── web.py
│       ├── py.typed
│       └── tools
│           ├── base.py
│           ├── __init__.py
│           └── tools.py
└── uv.lock
```

## [Publishing Package to PyPI](https://pydevtools.com/handbook/tutorial/publishing-your-first-python-package-to-pypi/)
작업진행 과정을 살펴보면 다음과 같습니다.
1. 사용자 로그인 -> Account Setting > API tokens > Add API token
1. Create API Token
1. 발급된 token 값을 `~/.pypirc` 파일로 생성
1. `$ uv build` 빌드작업 진행하여 `./dist/*.whl` 생성
1. `$ uv run pip install --upgrade twine` 업로드

<figure class="align-center">
  <p style="text-align: center">
  <img width="400px" src="{{site.baseurl}}/assets/linux/pypi_token-01.jpg">
  <figcaption>Create API Token</figcaption>
  </p>
</figure>

<figure class="align-center">
  <p style="text-align: center">
  <img width="400px" src="{{site.baseurl}}/assets/linux/pypi_token-02.jpg">
  <figcaption>Token 값 안내 -> `~/.pypirc` 파일로 생성 안내내용</figcaption>
  </p>
</figure>

<figure class="align-center">
  <p style="text-align: center">
  <img width="400px" src="{{site.baseurl}}/assets/linux/pypi_token-03.jpg">
  <figcaption>Token 값 생성</figcaption>
  </p>
</figure>

<br/>

# 참고사이트
- [How to build a Python package with uv and install it locally](https://www.sarahglasmacher.com/how-to-build-python-package-uv/)
- [Publishing Your First Python Package to PyPI](https://pydevtools.com/handbook/tutorial/publishing-your-first-python-package-to-pypi/)
- [Packaging Python Projects](https://packaging.python.org/en/latest/tutorials/packaging-projects/)