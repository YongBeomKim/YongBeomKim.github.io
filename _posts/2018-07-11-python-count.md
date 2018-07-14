---
title : Python 함수실행 횟수 계산하기
last_modified_at: 2018-07-11T12:45:06-05:00
header:
  overlay_image: /assets/images/book/python.jpg
categories:
  - python
tags: 
    - python
toc: true 
---
    
<br>
# 함수의 실행 count 

[stack flow](https://stackoverflow.com/questions/21716940/is-there-a-way-to-track-the-number-of-times-a-function-is-called)


```python
def myfunction():
    myfunction.counter += 1

myfunction.counter = 0
```

함수의 이름과 동일한 **객체 method** 를 생성 후 이를 사용하면, 해당 함수가 몇번 실행되었는지를 외부에서도 확인 가능하다.
{: .notice--info}
