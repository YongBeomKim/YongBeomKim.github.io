---
layout: blog
title: 파이썬에서 Threading 활용하기
tags:
- python
---

안녕하세요\! Python에서 스레딩을 활용하는 방법에 대해 궁금하시군요. 스레딩은 프로그램 내에서 여러 작업을 동시에 실행할 수 있도록 해주는 강력한 기능입니다. 마치 여러 명의 작업자가 하나의 사무실에서 동시에 일하는 것과 비슷하다고 생각하시면 돼요.

Python에서 스레딩을 사용하기 위한 핵심은 `threading` 모듈입니다. 이 모듈을 통해 스레드를 생성하고 관리할 수 있습니다. 기본적인 사용법부터 조금 더 심화된 내용까지 차근차근 알아볼까요?

### 기본적인 스레드 생성 및 실행

가장 기본적인 방법은 `threading.Thread` 클래스를 사용하여 스레드를 생성하고 `start()` 메서드를 호출하여 실행하는 것입니다.

```python
import threading
import time

def worker():
    """가짜 작업을 수행하는 함수"""
    print("스레드 시작")
    time.sleep(2)
    print("스레드 종료")

# 스레드 객체 생성
thread = threading.Thread(target=worker)

# 스레드 실행
thread.start()

print("메인 스레드 종료 대기 중...")
thread.join()  # 스레드가 종료될 때까지 메인 스레드를 기다리게 함
print("메인 스레드 종료")
```

위 예제에서 `worker` 함수는 스레드가 실행할 작업을 정의합니다. `threading.Thread(target=worker)`는 `worker` 함수를 실행할 새로운 스레드 객체를 생성합니다. `thread.start()`를 호출하면 새로운 스레드가 시작되어 `worker` 함수를 실행합니다. `thread.join()`은 메인 스레드가 생성한 스레드가 종료될 때까지 기다리도록 합니다. 만약 `join()`을 호출하지 않으면 메인 스레드는 생성한 스레드의 종료를 기다리지 않고 먼저 종료될 수 있습니다.

### 여러 개의 스레드 실행

여러 작업을 동시에 처리하고 싶다면 여러 개의 스레드를 생성하여 실행할 수 있습니다.

```python
import threading
import time

def task(n):
    """간단한 작업을 수행하는 함수"""
    print(f"스레드 {n} 시작")
    time.sleep(1)
    print(f"스레드 {n} 종료")

threads = []
for i in range(3):
    t = threading.Thread(target=task, args=(i,))  # 각 스레드에 다른 인수를 전달
    threads.append(t)
    t.start()

for t in threads:
    t.join()

print("모든 스레드 종료")
```

위 예제에서는 3개의 스레드를 생성하여 각각 `task` 함수를 실행합니다. `args=(i,)`는 `task` 함수에 인수를 전달하는 방법입니다. 튜플 형태로 전달해야 하므로 요소가 하나일 경우에도 쉼표를 붙여야 합니다.

### 스레드 동기화 (Thread Synchronization)

여러 스레드가 공유 자원에 접근할 때 race condition과 같은 문제가 발생할 수 있습니다. 이를 방지하기 위해 스레드 동기화 기법이 필요합니다. Python의 `threading` 모듈은 다음과 같은 동기화 객체를 제공합니다.

  * **Lock:** 한 번에 하나의 스레드만 접근할 수 있도록 잠금을 제공합니다.
  * **RLock (Reentrant Lock):** 동일한 스레드가 여러 번 획득할 수 있는 잠금입니다.
  * **Semaphore:** 동시에 접근할 수 있는 스레드의 수를 제한합니다.
  * **Condition:** 특정 조건이 만족될 때까지 스레드를 대기시키고, 조건이 충족되면 다시 깨웁니다.
  * **Event:** 하나의 스레드가 특정 이벤트 발생을 알리고 다른 스레드들이 이를 기다릴 수 있도록 합니다.
  * **Barrier:** 정의된 수의 스레드가 특정 지점에 도달할 때까지 모든 스레드를 대기시킵니다.

가장 기본적인 동기화 방법은 `Lock`을 사용하는 것입니다.

```python
import threading
import time

counter = 0
lock = threading.Lock()

def increment():
    global counter
    for _ in range(100000):
        lock.acquire()  # 잠금 획득
        counter += 1
        lock.release()  # 잠금 해제

threads = []
for _ in range(2):
    t = threading.Thread(target=increment)
    threads.append(t)
    t.start()

for t in threads:
    t.join()

print(f"최종 카운터 값: {counter}")
```

위 예제에서 `lock.acquire()`는 잠금을 획득하려고 시도합니다. 만약 다른 스레드가 이미 잠금을 획득했다면 현재 스레드는 잠금이 해제될 때까지 기다립니다. `lock.release()`는 획득한 잠금을 해제하여 다른 스레드가 접근할 수 있도록 합니다. `with lock:` 구문을 사용하면 `acquire()`와 `release()`를 자동으로 처리하여 더욱 안전하고 편리하게 사용할 수 있습니다.

```python
import threading
import time

counter = 0
lock = threading.Lock()

def increment():
    global counter
    for _ in range(100000):
        with lock:
            counter += 1

threads = []
for _ in range(2):
    t = threading.Thread(target=increment)
    threads.append(t)
    t.start()

for t in threads:
    t.join()

print(f"최종 카운터 값: {counter}")
```

### 스레딩 활용 시 주의사항

  * **GIL (Global Interpreter Lock):** Python의 CPython 구현은 GIL이라는 메커니즘 때문에 실제로 여러 스레드가 동시에 CPU를 사용하는 것이 제한될 수 있습니다. CPU 바운드 작업(계산 위주의 작업)의 경우 스레딩보다는 `multiprocessing` 모듈을 사용하는 것이 더 효과적일 수 있습니다.
  * **데드락 (Deadlock):** 여러 스레드가 서로 필요한 자원을 동시에 기다리면서 진행하지 못하는 상황을 데드락이라고 합니다. 스레드 동기화 시 자원 획득 순서를 주의하여 데드락을 방지해야 합니다.
  * **레이스 컨디션 (Race Condition):** 여러 스레드가 공유 자원에 동시에 접근하여 예상치 못한 결과를 초래하는 상황입니다. 적절한 동기화 메커니즘을 사용하여 방지해야 합니다.

### 결론

Python의 `threading` 모듈은 I/O 바운드 작업(네트워크 요청, 파일 읽기/쓰기 등)을 효율적으로 처리하는 데 유용합니다. 스레드를 생성하고 관리하는 기본적인 방법과 함께 스레드 동기화의 중요성을 이해하고 적절하게 활용하는 것이 중요합니다. GIL과 같은 Python 스레딩의 특징을 고려하여 작업의 성격에 맞는 병렬 처리 방식을 선택하는 것이 좋습니다.

더 궁금한 점이 있으시면 언제든지 질문해주세요\!