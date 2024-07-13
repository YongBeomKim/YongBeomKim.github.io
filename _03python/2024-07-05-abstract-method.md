---
layout: blog
title: Abstract Method in Python
tags:
- python
---

파이썬 클래스에서 `추상 클래스(abstract method)` 개념을 이해하고, 예제를 통해서 실제 사용방법까지 확인해 보도록 하겠습니다. 

<br/>

# abstract method
추상 클래스는 클래스를 상속받는 클래스가 있을때, 자식 클래스에 필수로 활용해야될 메서드를 정의하기 위해서 사용 합니다. 예시를 살펴보면 다음과 같습니다.

`BASE` 부모 클래스의 `go_to_school` 메서드에 **추상 클래스 메서드** 를 선언 했습니다.
예시처럼 `@abstractmethod` 데코레이터를 활용하여 선언을 하면 됩니다.

```python
In [0] : from abc import abstractmethod, ABCMeta
    ...: 
    ...: class Base(metaclass=ABCMeta):
    ...:   @abstractmethod
    ...:   def study(self):
    ...:     pass
    ...: 
    ...:   @abstractmethod
    ...:   def go_to_school(self):
    ...:     pass
```

`Base` 부모 클래스를 상속받은 `Student` 자식 클래스를 다음과 같이 코딩작업을 한뒤, 활용을 하려면 다음과 같은 오류를 출력합니다

```python
In [1] : class Student(Base):
    ...:   def study(self):
    ...:     print('공부하기')
    ...: 
    ...: james = Student()
    ...: james.study()

Out [1] :
TypeError Traceback (most recent call last)
Cell In[1], line 5
    2     def study(self):
    3         print('공부하기')
--> 5 james = Student()
    6 james.study()
TypeError: Can't instantiate abstract class 
    Student with abstract method `go_to_school`
```

부모 클래스에서 선언된 2개의 **추상 클래스 메서드** 중, `go_to_school` 메서드가 자식 클래스에서 활용되지 않았음을 출력하고 나머지 명령은 실행되지 않은것을 볼 수 있습니다.

추상 클래스 메서드가 선언된 2개의 메서드를 모두 활용한 자식 클래스 예시를 보면 다음과 같습니다.

```python
In [0] : class Student2(StudentBase):
    ...:   def study(self):
    ...:     print('공부하기')
    ...: 
    ...:   def go_to_school(self):
    ...:     print('학교가기')
    ...:
    ...: james = Student2()
    ...: james.study()
    ...: james.go_to_school()

Out [0] :
공부하기
학교가기
```

정상적으로 동작하는 것을 확인할 수 있습니다. 

<br/>

# 참고사이트
- [코딩도장 - 36. 추상 클래스 사용하기](https://dojang.io/mod/page/view.php?id=2389)