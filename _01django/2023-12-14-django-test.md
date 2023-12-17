---
layout: blog
title: Django Test
tags:
- django
---

Django 는 웹서비스를 제공하는 패키지 입니다. 파이썬의 **GIL (Global interpreter Lock)** 특성상 한곳에서 문제가 생기면 전체적인 서비스 운영에 문제 발생합니다. 사용자가 수정/ 보완한 부분이 있을 때마다 테스트 코드로 작성해 두면, 새로운 작업을 추가할 때 테스트 실행 만으로 기존의 작업들이 정상작됭 되는지 확인 가능합니다.

<br/>

# TestCase
[Django 공식문서](https://docs.djangoproject.com/ko/4.2/topics/testing/overview/#writing-tests) 에 나와있는 테스트 클래스를 활용하는 예제 입니다. 이러한 방식은 `Test DB`를 사용하고 Django 의 Request 등을 활용하기 편하다는 등의 작업 편의성은 높지만, 테스트 내용이 많아질 수록 단계적으로 테스트를 실행하기 때문에 결과를 도출하는데 필요한 리소스 및 처리시간이 오래 걸리는 단점이 있습니다.

## Example Code
실행을 할 때 주의할 점으로는 **클래스 함수명** 은 사용자 임의로 정해도 되지만, **클래스 메서드** 이름은 `test_` 로 시작되어야 테스트를 실행 합니다.

```python
from django.test import TestCase
from myapp.models import Animal


class AnimalTestCase(TestCase):
    def setUp(self):
        Animal.objects.create(name="lion", sound="roar")
        Animal.objects.create(name="cat", sound="meow")

    def test_animals_can_speak(self):
        """Animals that can speak are correctly identified"""
        lion = Animal.objects.get(name="lion")
        cat = Animal.objects.get(name="cat")
        self.assertEqual(lion.speak(), 'The lion says "roar"')
        self.assertEqual(cat.speak(), 'The cat says "meow"')
``` 

<br/>

# Unittest
파이썬 기본으로 제공하는 테스트 모듈 입니다. 적은 리소스로도 실행 가능하고 병렬 연산도 가능하다는 등의 장점이 있습니다. 

## Example Code
`unittest` 를 활용하여 Django 에서 테스트를 실행하는 코드 예제 입니다. 앞에서와 동일하게 `test_` 로 시작하는 클래스 메서드만 실행 합니다. 그리고 앞의 **Django Test** 와 다르게 독립적으로 운영되는 만큼, `request` 을 참조하려는 경우 추가로 설정값 들을 입력해야 합니다.

```python
import unittest
from django.test import Client
from django.contrib.auth import get_user_model

class SimpleTest(unittest.TestCase):

    def setUp(self) -> None:
        request = Client()
        self.user = {
            "email":'test@test.com',
            "username":'djangotest',
            "password":'test4132!!',
        }

    def test_token(self):
        r"""Test 사용자 생성 후 Access Token 발급"""
        user = get_user_model().objects.create_user(
            **self.user_info
        )
        self.assertEqual(user.email, self.user.email)
```

## Headers
[Django 에서 Unittest 적용해보기](https://jakpentest.tistory.com/95)

<br/>

# Django Ninja Test
[Documentation about unit tests](https://github.com/vitalik/django-ninja/issues/258) and [JWT authentication](https://github.com/vitalik/django-ninja/issues/45)

```python
# Create your tests here.
import unittest
from django.test import Client

class MyUnitTest(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_product_health(self):
        # Issue a GET request.
        response = self.client.get('/api/v1/products/ping')
        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        # Check that the rendered json contains valid data.
        self.assertEqual(response.json().get('data'), 'Healthy')
```

<br/>

# 참고사이트
- [unittest vs pytest](https://www.bangseongbeom.com/unittest-vs-pytest.html)
- [Django 웹 어플리케이션 테스트하기](https://developer.mozilla.org/ko/docs/Learn/Server-side/Django/Testing)
- [Unittest - Python 공식문서](https://docs.python.org/3/library/unittest.html#unittest.TestCase)
- [Writing and running tests](https://docs.djangoproject.com/ko/4.2/topics/testing/overview/)