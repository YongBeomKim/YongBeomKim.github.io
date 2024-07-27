---
layout: blog
title: AttributeError Can't pickle local object in Multiprocessing
tags:
- python
---

`Multiprocessing` 을 사용하다 보면 다음과 같은 오류를 확인하는 경우가 발생합니다. 오류가 발생하는 이유는 반복작업을 실행하는 `addi` 라는 함수가 지역함수로 정의가 되어있기 때문에 발생하는 것으로 이러한 경우에는 `addi` 라는 함수를 외부로 빼내어서 전역함수로써 정의를 한 뒤에 `Multiprocessing` 작업을 진행하면 해결 가능합니다.
```python
import multiprocessing as mp
import os
 
def calc(num1, num2):
  global addi

  def addi(num1, num2):
    print(num1+num2)

  m = mp.Process(target = addi, args = (num1, num2))
  m.start()
  print("here is main", os.getpid())
  m.join()

if __name__ == "__main__":
  
  calc(5, 6) # creating processes

ERROR 1 :    ForkingPickler(file, protocol).dump(obj)
AttributeError: Can't pickle local object 'calc.<locals>.addi'
```

수정된 코드는 다음과 같습니다.
```python
import multiprocessing as mp
import os

def addi(num1, num2):
    print(num1 + num2)

def calc(num1, num2):
    m = mp.Process(target=addi, args=(num1, num2))
    m.start()
    print("here is main", os.getpid())
    m.join()

if __name__ == "__main__":
    # creating processes
    calc(5, 6)
```

<br/>

# 참고사이트
- [AttributeError: Can't pickle local object in Multiprocessing](https://stackoverflow.com/questions/72766345/attributeerror-cant-pickle-local-object-in-multiprocessing)