---
title : Tutorial / itertools
last_modified_at: 2018-11-20T12:45:06-05:00
header:
  overlay_image: /assets/images/book/pymodule.jpg
categories:
  - python
tags: 
    - python
    - itertools
toc: true 
---

간단한 작업들은 **if/ for** 조건문을 과 List, Dict 객체만 잘 조합하면 구성이 가능하다. 하지만 대용량의 데이터 분석 작업을 진행할수록 **class, __init__, lambda** 등의 내용을 사용하면 보다 효과적인 처리가 가능합니다.

<br/>
# 1 기본 Method
## **itertools.chain**(객체1, 객체2, 객체3)
여러 객체를 **1개로 묶는다**
```python
import itertools
tters    = ['a', 'b', 'c', 'd', 'e', 'f']
booleans = [1, 0, 1, 0, 0, 1]
decimals = [0.1, 0.7, 0.4, 0.5]
list(itertools.chain(letters, booleans, decimals))

[Out]>> ['a', 'b', 'c', 'd', 'e', 'f', 1, 0, 1, 0, 0, 1, 0.1, 0.7, 0.4, 0.5]
```

## **itertools.count**(시작값, Step)
**Key, Value 를** 묶어서 **{ dict }** 객체를 생성합니다
```python
from itertools import count
for number, letter in zip(count(0, 10), ['a', 'b', 'c', 'd', 'e']):
    print ('{0}: {1}'.format(number, letter))

[Out]>> 0: a; 10: b; 20: c; 30: d; 40: e
```

<br/>
# 2 Python 기본 함수를 활용
## zip()
객체를 **튜플(tuple)로** 묶는다 
```python
list(zip([1, 2, 3], ['a', 'b', 'c']))

[Out]>> [(1, 'a'), (2, 'b'), (3, 'c')]
```

## map()
개별 인덱스 값을 **lambda 함수로** 묶은 뒤 **list()** 객체를 생성합니다 
```python
list(map(lambda x: x * x, range(10)))

[Out]>> [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

## filter()
전체 인덱스 값 중 **lambda 조건에 True** 를 출력합니다
```python
list(filter(lambda x: x < 10, [1, 4, 6, 7, 11, 34, 66, 100, 1]))

[Out]>> [1, 4, 6, 7, 1]
```

<br/>
# 3 itertools 계산 함수들 
## tee()
동일한 객체의 복사본을 생성하고, 이는 출력 후 바로 메모리에서 지운다.
```python
from itertools import tee
i1, i2, i3 = tee(range(10), 3)

print (i1)        # <itertools.tee object at 0x2a1fc68>
print (list(i1))  # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print (tuple(i1)) # []
print (list(i2))  # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print (list(i2))  # []
print (tuple(i3)) # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print (list(i3))  # []
```

## **cycle()**
0, 1 **2개 인덱스 값을** 사용하여 객체를 출력한다
```python
from itertools import cycle
for number, letter in zip( cycle (range(2)), ['a', 'b', 'c', 'd', 'e'] ):
    print ('{0}: {1}'.format(number, letter))

>> 0: a; 1: b; 0: c; 1: d; 0: e
```

## **repeat()**
value 값을 **반복 출력한다**
```python
from itertools import repeat
print(list(repeat('Hello, world!', 3)))

[Out]>> ['Hello, world!', 'Hello, world!', 'Hello, world!']
```

## **dropwhile()**
Whlie 반복문에서, lambda 조건값은 Drop 하고 **나머지를 출력** 한다<br/>
<small>ex) 11에서 Drop을 멈추고 나머지를 출력</small>
```python
from itertools import dropwhile
list(dropwhile(lambda x: x < 10, [1, 4, 6, 7, 11, 7, 66, 100, 1, 22]))

[Out]>> [11, 7, 66, 100, 1, 22]
```

## **takewhile()**
Whlie 반복문에서 **lambda 조건값을 출력** 하고, 나머지를 Drop 한다<br/>
<small>ex) 11에서 출력을 멈춘다</small>
```python
from itertools import takewhile
list(takewhile(lambda x: x < 10, [1, 4, 6, 7, 11, 34, 66, 100, 1]))

[Out]>> [1, 4, 6, 7]
```

<br/>
# 4 itertools 를 활용한 복잡한 예제  
```python
from collections import defaultdict
counts   = defaultdict(list)
attempts = [('dan', 87), ('erik', 95), 
    ('jason', 79), ('erik', 97), ('dan', 100)]

for (name, score) in attempts:
    counts[name].append(score)
counts

[Out]>> defaultdict(list, {'dan': [87, 100], 'erik': [95, 97], 'jason': [79]})
```

<br/>
# 참고사이트
[itertools 익히기](http://hamait.tistory.com/803)<br/>
[itertools 익히기](https://code.i-harness.com/ko/docs/python~3.6/library/itertools)<br/>