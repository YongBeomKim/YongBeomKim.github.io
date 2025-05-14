---
layout: blog
title: Celery 에서 threading 활용
tags:
- celery
---

Django 에서 `multiprocessing` 을 활용하여 병렬처리를 적용해 보았습니다.
```python
# `partial` : MultiProcessing 파라미터 고정
# `args`    : (`today` 값 고정 fixed)
pool   = multiprocessing.Pool(processes=4)
prod_x = partial(daum_trader, today=True)
items  = pool.map(prod_x, tickers)
df     = pandas.concat(items).reset_index(drop=True)
```

위 함수를 `celery` 에서 적용한 결과 다음과 같은 오류를 출력하였습니다
```python
File "/usr/local/lib/python3.12/multiprocessing/pool.py", 
line 329, in _repopulate_pool_static w.start()
File "/usr/local/lib/python3.12/multiprocessing/process.py", 
line 118, in start
assert not _current_process._config.get('daemon'), \
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: daemonic processes are not allowed to have children
```

<br/>

# Celery 에서 multiprocessing
## 원인분석
GPT 문의결가 다음과 같은 분석결과를 알려 주었습니다.
```
daemonic (데몬) 프로세스는 자식 프로세스를 생성할 수 없습니다.

`Celery worker` 가 데몬 프로세스로 실행 중일 때, 그 내부에서 `multiprocessing` 을 사용해 또 다른 프로세스를 만들려고 하는 경우에 위 오류가 발생합니다. 예를 들어, Celery task 내부에서 multiprocessing.Process 또는 concurrent.futures.ProcessPoolExecutor 등을 사용할 경우 이런 문제가 발생할 수 있습니다.
```

## 해결방법
1. Celery worker를 데몬 모드로 실행하지 않도록 설정
    - 만약 Celery를 코드 내에서 수동으로 실행 중이라면, daemon=True 설정을 피해야 합니다.
2. multiprocessing 대신 threading 사용 고려
    - 반드시 병렬 처리가 필요 없다면 multiprocessing 대신 threading 모듈을 사용할 수 있습니다. 데몬 프로세스는 자식 스레드는 생성할 수 있기 때문입니다.
3. Celery worker에서 자식 프로세스를 생성하지 않도록 설계 변경
    - 병렬 처리가 필요한 작업은 Celery 자체의 워커/큐 메커니즘을 활용하거나, 별도의 worker를 두고 Celery task가 그것을 트리거하도록 구조를 변경할 수 있습니다.
4. spawn start method 사용 시도 (Python ≥3.4)
    -일부 환경에서는 multiprocessing.set_start_method("spawn") 설정을 Celery worker 시작 전에 설정하면 피할 수 있으나, 항상 효과적이지는 않습니다.

정리하면
- 원인: Celery task 내에서 multiprocessing.Process를 사용하는 경우에 오류가 발생
- 해결책:
    1. multiprocessing 대신 threading 사용
    1. 구조적으로 프로세스 생성 없이 작업 처리
    1. Celery worker 자체를 데몬으로 실행하지 않도록 변경

<br/>

# Threading 활용하기
## 파이썬 쓰레드(Thread)의 이해와 사용법
다수의 Thread 를 생성하여 수집기를 작동하고 수집과정에서 progressbar 를 적용하는 예시는 다음과 같습니다.
```python
import time
import threading
from tools import crawler, tickers_db

def worker(ticker, output_queue, pbar_lock, pbar):
    result = crawler(ticker)
    output_queue.put(result)
    # Progress bar 업데이트는 lock을 걸고 안전하게 처리
    with pbar_lock:
        pbar.update(1)

threads = []
tickers = tickers_db(slice=slice)
output_queue = Queue()

# tqdm 설정 : progress bar
pbar = tqdm(total=len(tickers), desc="수집기 실행", ncols=80)
pbar_lock = threading.Lock()

for ticker in tickers:
    thread = threading.Thread(
        target=worker, 
        args=(ticker, output_queue, pbar_lock, pbar)
    )
    threads.append(thread)
    thread.start()

# 모든 스레드 종료 대기
for thread in threads:
    thread.join()

# tqdm 닫기
pbar.close()

# 큐에서 결과 모아서 병합
results = []
while not output_queue.empty():
    results.append(output_queue.get())

# 모든 스레드 종료 대기
df = pandas.concat(results).reset_index(drop=True)
```
