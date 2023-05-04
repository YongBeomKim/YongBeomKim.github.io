---
layout: blog
title: Decorator
tags:
- python
---

# wrapper 

## **Closure**

### Definition

함수 내부에서 사용되는 함수를 의미한다

```python
def closure():
    x = 10
    
    def inner():
        y = 20
        return x + y
    
    return inner
```

```python
p = closure()
p()
```


### **Closure Attribute**

```python
>> len(p.__closure__)
1
>> dir(p.__closure__[0].cell_contents)
['__abs__',
 '__add__',
 '__and__' ..
```


<br>
## **Decorator** - <small>wrapper()</small> 

<br>
### Introduction

```python
def 데코레이터이름(func):    # 데코레이터는 호출할 함수를 매개변수로 받음
    def wrapper():           # 호출할 함수를 감싸는 함수
        func()               # 매개변수로 받은 함수를 호출
    return wrapper           # wrapper 함수 반환
 
@데코레이터                  # 데코레이터 지정
def 함수이름():
    코드
```

내부 Closure 로 **wrapper** 이름을 꼭 써야만 작동이 된다. 다른 이름으로 바꾸니까 작동이 안된다 주의하자!!
{: .notice--info}


<br>
### Simple Example


```python
def deco(func):    
    def wrapper():
        print("before --------")
        ret = func()
        print('after  --------')
        return ret
    return wrapper

@deco
def base():
    print("base function")

base()

>>> before --------
>>> base function
>>> after  --------
```

<br>
### 데코레이터 없이 사용하는 경우

```python 
def base():
    print("base function")

deco(base)()

>>> before --------
>>> base function
>>> after  --------
```

<br>
### Decorator 의 응용

```python
# "func"로 감싼 객체를 wrapper()를 추가 실행한다
def measure_run_time(func):
    def wrapper(*args, **kwargs):
        start  = time.time()
        result = func(*args, **kwargs)
        end    = time.time()
        print("{} function running time : {} sec".format(func.__name__, int(end - start)))
        return result
    return wrapper

import time

@measure_run_time
def worker(delay_time):
    time.sleep(delay_time)

worker(4)
>>> worker function running time : 4 sec
```

<br>
## 다중 Decorator

```python
import time, datetime
from functools import wraps

def parameter_logger(func):    
    @wraps(func)
    def wrapper(*args, **kwargs):
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
        print("[%s] args : %s, kwargs : %s" %(timestamp, args, kwargs))
        return func(*args, **kwargs)
    return wrapper

def measure_run_time(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print("{} function running time : {} sec".format(func.__name__, int(end - start)))
        return result
    return wrapper
```

```python
@measure_run_time
@parameter_logger
def worker(delay_time):
    time.sleep(delay_time)

worker(3)

>>> [2018-07-14 15:28] args : (3,), kwargs : {}
>>> worker function running time : 3 sec
```

<br>
## **Class Decorator**

```python
import time
from functools import update_wrapper

class MeasureRuntime:
    # 클래스 생성자 정의
    def __init__(self, f):
        self.func = f
        update_wrapper(self, self.func)
    
    # 클래스를 사용하기 위해 정의할 때 호출 
    def __call__(self, *args, **kwargs):
        start  = time.time()
        result = self.func(*args, **kwargs)
        end    = time.time()
        print("{} function running time : {} sec".format(self.func.__name__, int(end - start)))
        return result
```

```python
@MeasureRuntime
def worker(delay_time):
    time.sleep(delay_time)
worker(3)

>>> worker function running time : 3 sec
```