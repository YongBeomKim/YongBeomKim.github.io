---
layout: blog
title: 파이썬으로 URL 갖고 놀기 by urllib 
tags:
- python
- urllib
---

크롤링 작업을 정리할 때, 동일한 Host 주소에 파라미터만 다르게 적용하는 경우가 많습니다. 이 때마다 하드코딩으로 입력하기 보다는, 모듈을 활용하여 보다 체계적인 방법으로 작업을 할 수 있도록 도울 수 있도록 파이썬 기본 모듈인 `urllib` 에 대해서 정리를 해 보겠습니다. 내용은 [파이썬으로 URL 가지고 놀기](https://velog.io/@city7310/%ED%8C%8C%EC%9D%B4%EC%8D%AC%EC%9C%BC%EB%A1%9C-URL-%EA%B0%80%EC%A7%80%EA%B3%A0-%EB%86%80%EA%B8%B0) 를 참고 하였습니다.


# urllib.parse
## urlparse

`urlparse` 는 URL을 6개의 요소로 이루어진 `named tuple` 객체를 반환 합니다. 이는 URL 을 다루기 위해 만들어진 `namedtuple` 을 상속받아 정의한 `ParseResult` 객체 입니다.

```python
from urllib.parse import urlparse
parts = urlparse('https://velog.io/tags/?sort=name')
print(parts.scheme) # 'https'
print(parts.netloc) # 'velog.io:80'
print(parts.path) # '/tags/'
print(parts.params) # ''
print(parts.query) # 'sort=name'
print(parts.fragment) # ''
print(parts) 
# ParseResult(
#    scheme='https', netloc='velog.io:80', 
#    path='/tags/', params='', query='sort=name',
#    fragment='')
```

`namedtuple` 프로퍼티 들은 `tuple`의 `immutable` 속성을 갖고 있습니다. 때문에 값을 변경 하려면 별도의 `setter` 메서드인 `_replace` 를 사용해서 바꿀 수 있습니다.

```python
from urllib.parse import urlparse
parts = urlparse('https://velog.io/tags/?sort=name')
parts = parts._replace(scheme='http')
# parts.scheme = 'http' # AttributeError
```

## ParseResult

`ParseResult` 를 사용하여 새로운 주소값 객체를 생성할 수 있습니다.

```python
from urllib.parse import ParseResult, urlunparse
parts = ParseResult(
    scheme='https', netloc='velog.io', path='/tags', 
    params='', query='', fragment=''
)
print(parts.geturl()) # https://velog.io/tags
print(urlunparse(parts)) # https://velog.io/tags
```

`_replace` 를 사용하면 `query string` 은 `sort=name&keyword=planb` 문자열 형태로 이루어져 있어서 작업에 적합하지 않습니다. `query string` 을 분해할 수 있도록 돕는 모듈로써 `parse_qs` 와 `parse_qsl` 함수를 제공 합니다. `query string` 은 중복이 허용되어 `dict()` 객체가 아닌 `list()` 값을 반환 합니다. 

## parse_qs, parse_qsl

```python
from urllib.parse import urlparse, parse_qs, parse_qsl
parts = urlparse('https://velog.io/tags?sort=name&keyword=planb')
print(parse_qs(parts.query)) # {'sort': ['name'], 'keyword': ['planb']}
print(parse_qsl(parts.query)) # [('sort', 'name'), ('keyword', 'planb')]
```

## urlunparse

`query string` 수정 작업의 예시는 다음과 같습니다.

```python
from urllib.parse import urlparse, parse_qsl, urlencode, urlunparse
parts = urlparse('https://velog.io/tags?sort=name&keyword=planb')

qs = dict(parse_qsl(parts.query)) # 요소분리
qs['keyword'] = 'new' # parse_qsl의 결과를 dictionary로 캐스팅
parts = parts._replace(query=urlencode(qs)) # 수정 작업
new_url = urlunparse(parts) # query string 을 replace
print(new_url) # https://velog.io/tags?sort=name&keyword=new
```
