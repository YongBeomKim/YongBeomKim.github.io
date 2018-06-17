---
title : Python 외부 파리미터 사용
last_modified_at: 2018-06-14T12:45:06-05:00
header:
  overlay_image: /assets/images/book/python.jpg
categories:
  - python
tags: 
    - python
---


[외부 파리미터를 활용](http://ngee.tistory.com/159)


```python
# sysinfo.py

import sys

var1 = sys.argv[1]
var2 = sys.argv[2]
var3 = sys.argv[3]

print ("var1 = " + var1)
print ("var2 = " + var2)
print ("var3 = " + var3)
print (sys.argv[0])
```


```
$ python sysinfo.py 1 2 3 4

var1 = 1
var2 = 2
var3 = 3
sysinfo.py
```


**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}   