---
title : Error / TypeError 들 모음
last_modified_at: 2018-12-12T10:45:06-05:00
header:
  overlay_image: /assets/images/book/apexchart.jpg
categories:
  - chart
tags: 
    - django
    - apex
    - vue
toc: true 
---

파이썬 작업을 하다보면 제대로 했다고 생각되는데 문제가 발생하는 경우들이 생깁니다. 이는 해당 언어에 대한 이해를 필요로 하는 부분들로, 대표적인 오류메세지와 내용에 대해서 알아보겠습니다.

```python
# Error Type 1
>> 'type(data)'
TypeError: 'str' object is not callable (Python)
```

이 에러는 `type()` 가 함수처럼 사용했는데, 해당 코드에서는 `str` 이므로 문제가 발생하였다는 뜻입니다. [StackoverFlow](https://stackoverflow.com/questions/6039605/typeerror-str-object-is-not-callable-python)


```python
# Error Type 2
Python - TypeError: Object of type 'int64' is not JSON serializable
```

Pandas 객체를 Json으로 변환하여 출력하면 자주 마주치는 오류 입니다. 

`Series DataSet` 은 `data.values.tolist()`  로 출력하고, 

`Dataframe` 객체는 `data.to_dict(orient='list')` 으로 변환한 뒤 dict 데이터를 개별 객체별로 순환하며 원하는 포맷으로  문제를 해결합니다.

단순하게 Pandas 객체를 바로 Json으로 출력하려면 `int64` 객체를 처리하는 함수가 없으므로 오류를 발생합니다. 이를 단일하게 처리하기 위해서는 `to_dict()` 으로 한번에 데이터를 `Python int`로 변환을 하고 이를 활용하는 방식으로 문제를 해결해야 합니다.

