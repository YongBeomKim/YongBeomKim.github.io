---
title : Python 사용 Tips
last_modified_at: 2019-07-31T12:45:06-05:00
header:
  overlay_image: /assets/images/book/python.jpg
categories:
  - python
tags: 
    - python
---

Python 의 기본 내용을 작업하면서 추가된 내용들을 확인 저장하는 페이지 입니다.

<br/>
# xls
파이썬에서 데이터를 호출하는 경우, 특히 **Excel** 에 익숙한 사용자들로 인해 데이터를 호출 및 생성할 경우가 많이 있는데, 이를 위한 모듈과 내용을 정리해 보겠습니다. Excel 모듈에는 **xlrd** 와 **xlwings** 2가지가 있는데, 리눅스는 **xlrd** 만 가능하다.. <strike>하지만 vba 관련 기능은 **xlwings** 가 더 강력하고 윈도우나 Mac 으로 서버를 변경해야 하는건 함은정... </strike>

```python
# Excel 파일의 Sheet 이름들 호출
import xlrd
xls_file = xlrd.open_workbook(r'data/sample.xls', on_demand=True)
sheets   = xls_file.sheet_names()

# DataFrame 활용도가 높은만큼 Pandas로 호출
import pandas as pd
pd.read_excel('data/sample.xls', sheetName=sheets[0])
```


<br/>
# 객체의 저장
**pickle** 객체를 저장하면 장점으로는 **1. 연관 모듈을 추가로 호출할 필요는 없다. 1. 객체의 속성을 그대로 활용할 수 있다** 로 확인 가능합니다. **sklearn, panas, keras, pytorch 등의 결과값** 을 저장하기에 용이 합니다.

```python
import pickle
with open('data/nerDict.pk', 'wb') as handle:
    pickle.dump(nerDict, handle, protocol=pickle.HIGHEST_PROTOCOL)

with open('data/nerDict.pk', 'rb') as handle:
    nerDict = pickle.load(handle)
```

<br/>
# Sqlite3 데이터 저장하기
크롤링 작업을 하는 경우, 대량의 데이터를 저장관리하기 위해서는 DataBase 를 활용합니다. 반복횟수가 수십번을 초과하는 경우일수록 DataBase 활용도가 중요합니다.

```python
import os, sqlite3, json
f_db = "test.db"
conn = sqlite3.connect(file_db)
df   = pd.DataFrame(result)
df.to_sql('foods', con, if_exists='append')
conn.commit()
conn.close()
# os.remove(file_db)
```

저장된 DataBase 를 호출하는 방법은 다음과 같습니다.

```python
import pandas as pd
con = sqlite3.connect("test.db")
# 'food' 테이블 이름을 특정해야 합니다.
df  = pd.read_sql("select * from 'foods'", con,\
          index_col=None).drop('index', axis=1)
con.close()
food_links = df.data.values.tolist()
df.data    = [json.loads(_) for _ in food_links]
df.head()
```

<br/>
# 외부 파라미터를 함수에 적용하기
함수를 활용할 때 터미널에서 유용한 값을 함수에서 적용할 때에 유용합니다.  **[참고용 블로그](http://ngee.tistory.com/159)** 내용에서 보다 자세한 내용을 확인 가능합니다.

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

사용예제를 살펴보면 다음과 같습니다

```python
$ python sysinfo.py 1 2 3 4

var1 = 1
var2 = 2
var3 = 3
```

