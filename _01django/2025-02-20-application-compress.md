---
layout: blog
title: (Django - 압축) Custom Model Field
tags:
- django
---

이번에 정리하려는 내용은 `Django` 내부의 `Model Field` 자체적으로 데이터를 효율적으로 압축하는 방법들 입니다. 이번 페이지에서 정리할 내용은 2가지로 다음과 같습니다.
1. `CharField` 에 `string` 데이터를 `zlib` 알고리즘으로 압축저장
1. `IntegerField` 에 `float` 데이터는 자릿수를 제한하여 저장 및 호출

<br/>

# Django with `zlib`
## `zlib` 압축 알고리즘
`zlib` 알고리즘으로 문자열을 압축하고, 압축한 내용을 풀어내는 과정은 다음과 같습니다.
```python
import zlib

def compress_data(data):
    return zlib.compress(data.encode('utf-8'))

def decompress_data(compressed_data):
    return zlib.decompress(compressed_data).decode('utf-8')


original_data = "This is a long string that will be compressed."
compressed_data   = compress_data(original_data)     # 데이터 압축
decompressed_data = decompress_data(compressed_data) # 압축해체
decompressed_data, type(compressed_data)
# ('This is a long string that will be compressed.', bytes)
```

압축을 하면 `bytes` 형식으로 저장을 하게 됩니다. **DATABASE** 특성상 해당 타입을 지원하지 않는 경우가 있는데, 이러한 경우에는 `base64` 로 문자열로 변환을 하면, 문자열 데이터로 저장 가능합니다. 대신 저장용량이 대략 33% 커지는 문제가 있습니다.
```python
import zlib, base64

def compress_data(value):
    compressed_data = zlib.compress(value.encode('utf-8'))
    return base64.b64encode(compressed_data).decode('utf-8')

def decompress_data(value):
    decoded_data = base64.b64decode(value.encode('utf-8'))
    return zlib.decompress(decoded_data).decode('utf-8')


original_data = "This is a long string that will be compressed."
compressed_data   = compress_data(original_data)     # 데이터 압축
decompressed_data = decompress_data(compressed_data) # 압축해체
decompressed_data, type(compressed_data)
# ('This is a long string that will be compressed.', str)
```

## Django Field API reference
`Django` 필드별 내부에 사용자 정의 함수를 추가할 수 있습니다. <span style="color:orange">**Django Models Field**</span> 는 데이터베이스 테이블 열을 정의하는 **추상 클래스** 입니다. **Django** 는 Field Method 를 활용하여 데이터베이스 테이블을 생성하고([`db_type()`](https://docs.djangoproject.com/en/5.1/ref/models/fields/#django.db.models.Field.db_type)), 파이썬 유형을 데이터베이스에 매핑하며([`get_prep_value()`](Django Field API reference)), 그 반대로도 ([`from_db_value()`](https://docs.djangoproject.com/en/5.1/ref/models/fields/#django.db.models.Field.from_db_value)) 작동하고 있습니다. [출처 : Django Field API reference](https://docs.djangoproject.com/en/5.1/ref/models/fields/#field-api-reference)

다음의 예제는 문자열로 압축을 하는 내용 입니다. Django 에서 `models.TextField` 필드를 상속하여 `base64` 와 `zlib` 를 활용하여 저장시 압축을 하고, 사용시 압축 해제를 하는 내용 입니다.
```python
# Text Field 를 활용한 압축
class CompressedTextField(models.TextField):
    """데이터를 zlib으로 압축하여 저장하는 TextField"""
    
    def from_db_value(self, value, expression, connection):
        """데이터베이스에서 값을 가져올 때 자동으로 압축 해제"""
        if value is None:
            return value
        return self.decompress(value)

    def get_prep_value(self, value):
        """저장하기 전에 데이터를 압축"""
        if value is None:
            return value
        return self.compress(value)

    def compress(self, value):
        """zlib을 사용하여 문자열 압축 후 base64로 인코딩"""
        if isinstance(value, str):
            compressed_data = zlib.compress(value.encode('utf-8'))
            return base64.b64encode(compressed_data).decode('utf-8')  # Base64로 인코딩하여 저장
        return value

    def decompress(self, value):
        """zlib을 사용하여 base64로 저장된 데이터를 압축 해제"""
        try:
            decoded_data = base64.b64decode(value.encode('utf-8'))
            return zlib.decompress(decoded_data).decode('utf-8')
        except Exception:
            return value
```

Mysql, MariaDB 는 `bytes` 데이터를 저장할 수 있습니다. DATABASE 에서는 `BLOB` 형식으로 저장 되는데, 최대 용량이 `64Kb`로 제한이 되어 있습니다. [출처 : String Data Types - MariaDB](https://mariadb.com/kb/en/columnstore-data-types/#string-data-types) 

다음의 예제는 압축 데이터를 `bytes` 형식으로 저장하는 내용 입니다. Django 에서 `models.BinaryField` 필드를 상속하여 `zlib` 를 활용하여 저장시 압축을 하고, 활용시 압축을 해제를 하는 내용 입니다.
```python
# Binary Field 를 활용한 압축
class CompressedBinaryField(models.BinaryField):

    def from_db_value(self, value, expression, connection):
        """데이터베이스에서 값을 가져올 때 : 자동으로 압축 해제"""
        if value is None:
            return value
        return self.decompress(value)

    def get_prep_value(self, value):
        """저장하기 전에 : 데이터를 압축"""
        if value is None:
            return value
        return self.compress(value)

    def compress(self, value):
        """zlib을 사용하여 문자열 압축 후 base64로 인코딩"""
        if isinstance(value, str):
            return zlib.compress(value.encode('utf-8'))
        return value

    def decompress(self, value):
        """zlib을 사용하여 base64로 저장된 데이터를 압축 해제"""
        try:
            return zlib.decompress(value).decode('utf-8')
        except Exception:
            return value
```

<br/>

# 남은과제
향후 PostgreSQL 을 활용하는 프로젝트에서는 보다 다양한 설정이 가능하다고 합니다. 이 내용은 향후에 알아보겠습니다.
| 방법                        | 장점  | 단점  |
|----------------------------|------|------|
| `BinaryField` + zlib       | 압축률이 좋고, 바이너리 데이터 저장 가능 | 직접 압축 및 해제 메서드를 호출해야 함 |
| `TextField` + Custom Field | 자동으로 압축 및 해제 | 저장 공간은 줄지만, 조회 성능이 다소 떨어질 수 있음 |
| PostgreSQL `BYTEA` 필드     | 대용량 데이터 저장에 적합 | PostgreSQL 전용 |


<br/>

# 참고사이트
- [Django Model - Field API 한글해설](https://brunch.co.kr/@ddangdol/11)