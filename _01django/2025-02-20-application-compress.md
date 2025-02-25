---
layout: blog
title: (Django) Application Compress
tags:
- django
---
xzz
앞서서 `MariaDB` 에서 압축 algorithm 을 활용하는 방법들을 살펴 보았습니다. 실제로 적용한 결과, 데이터를 저장할 때 전체 데이터베이스 리소스 비용이 올라가는 것을 확인 할 수 있었습니다. 차후에 데이테베이스 테이블의 컬럼별 효과적인 적용방법을 찾게 되면 해당 내용을 활용한 뒤 내용을 추가로 정리해 보겠습니다.

이번에 정리하려는 내용은 `Django` 자체적으로 데이터를 효율적으로 압축하는 방법들 입니다. 내용을 크게 정리하면 2가지로 다음과 같습니다.
1. `float` 데이터는 자릿수를 제한하여 `IntegerField` 에 저장 및 호출 합니다.
2. `CharField` 데이터는 `BinaryField` 로 대체하여 `zlib` 알고리즘으로 압축저장 합니다

<br/>

# 문자열 데이터 압축
Django에서 압축을 적용하려면 `zlib.compress()` 및 `zlib.decompress()`를 활용하여 데이터를 변환하고, `BinaryField` 또는 `TextField`를 활용하는 것이 일반적인 방법입니다. **압축된 데이터를 조회할 일이 많다면 압축률과 성능을 고려하여 선택**하는 것이 중요합니다.

`BinaryField`를 활용하여 압축된 데이터를 직접 저장하거나, `base64`로 변환한 뒤 `TextField` 또는 `CharField`에 ㄷ `save` 및 `load` 시점에서 압축과 해제를 수행할 수 있습니다. 참고로 `base64` 로 저장하게 되면 데이터가 33% 이상 커지는 단점이 있습니다.

| 방법                        | 장점  | 단점  |
|----------------------------|------|------|
| `BinaryField` + zlib       | 압축률이 좋고, 바이너리 데이터 저장 가능 | 직접 압축 및 해제 메서드를 호출해야 함 |
| `TextField` + Custom Field | 자동으로 압축 및 해제 | 저장 공간은 줄지만, 조회 성능이 다소 떨어질 수 있음 |
| PostgreSQL `BYTEA` 필드     | 대용량 데이터 저장에 적합 | PostgreSQL 전용 |

## 1 **BinaryField** 를 활용한 압축
`zlib`을 활용하여 데이터를 압축하여 저장하고, 불러올 때 압축을 해제하는 방법입니다. 다음은 `models.py` 에서 정의하는 내용 입니다.
```python
import zlib
from django.db import models

class CompressedModel(models.Model):
    compressed_data = models.BinaryField()

    def set_data(self, data: str):
        """ 문자열 데이터를 zlib을 이용해 압축 후 저장 """
        compressed = zlib.compress(data.encode('utf-8'))
        self.compressed_data = compressed

    def get_data(self) -> str:
        """ 압축된 데이터를 복원하여 반환 """
        return zlib.decompress(self.compressed_data).decode('utf-8')
```

이렇게 정의한 모델을 활용하는 내용 입니다.
```python
instance = CompressedModel()
instance.set_data("압축할 데이터입니다.")
instance.save()

retrieved_instance = CompressedModel.objects.get(id=instance.id)
print(retrieved_instance.get_data())  # "압축할 데이터입니다."
```

## 2 **Custom Field** 를 활용한 자동 압축 및 해제
Django의 `Field`를 상속받아 `TextField`에 대해 자동으로 압축 및 해제를 수행하는 방법입니다. 다음의 내용은 `models.py` 에서 활용을 위한 `CustomField`를 정의하는 내용 입니다.
```python
import zlib
from django.db import models

class CompressedTextField(models.TextField):
    def from_db_value(self, value, expression, connection):
        """DB에서 불러올 때 압축 해제"""
        if value is None:
            return value
        return zlib.decompress(value).decode('utf-8')

    def get_prep_value(self, value):
        """DB에 저장하기 전에 압축"""
        if value is None:
            return value
        return zlib.compress(value.encode('utf-8'))

    def to_python(self, value):
        """모델 인스턴스에서 사용할 때 변환"""
        if isinstance(value, bytes):
            return zlib.decompress(value).decode('utf-8')
        return value
```

`models.py` 에서 모델을 정의하는 내용 입니다.
```python
class CompressedModel(models.Model):
    compressed_text = CompressedTextField()
```

활용하는 예시는 다음과 같습니다.
```python
instance = CompressedModel(compressed_text="압축된 문자열 저장 테스트")
instance.save()

retrieved_instance = CompressedModel.objects.get(id=instance.id)
print(retrieved_instance.compressed_text)  # "압축된 문자열 저장 테스트"
```

## 3 **PostgreSQL `BYTEA` 필드** 활용
PostgreSQL을 사용한다면 `BinaryField` 또는 `BYTEA` 필드를 직접 활용하여 압축된 데이터를 저장할 수도 있습니다.
```python
class CompressedBinaryModel(models.Model):
    compressed_data = models.BinaryField()

    def set_data(self, data: str):
        self.compressed_data = zlib.compress(data.encode('utf-8'))

    def get_data(self) -> str:
        return zlib.decompress(self.compressed_data).decode('utf-8')
```

이 방법은 **큰 데이터를 압축할 때 유용**하며, PostgreSQL의 `BYTEA` 필드와 함께 활용할 수 있습니다.


# Float -> Integer

https://www.geeksforgeeks.org/binaryfield-django-models/

https://velog.io/@qlgks1/Django-Model-%ED%95%84%EB%93%9Cfiled-%EB%AA%A8%EC%9D%8C%EC%A7%91

```bash
# GEMINA 에서 질문내용
Django Project 에서 field 단위로 save, load 메서드를 사용자가 zlib 압축 알고리즘을 적용하는 내용을 예제코드와 함께 보여줘
```


<br/>

# 참고사이트
- [MySQL - InnoDB 페이지 압축](https://myinfrabox.tistory.com/58)
- [InnoDB Page Compression](https://mariadb.com/kb/en/innodb-page-compression/)
- [InnoDB File Format](https://mariadb.com/kb/en/innodb-file-format/)
- [How to change Innodb fileformat to Barracuda](https://mariadb.com/kb/en/how-to-change-innodb-fileformat-to-barracuda/)
- [Mysql, MariaDB 환경설정 파일 my.cnf](https://docs.3rdeyesys.com/docs/database/mysql-mariadb/configure/config-file-my-cnf-position/)
- [MariaDB/MySQL InnoDB 테이블 압축](https://estenpark.tistory.com/377)