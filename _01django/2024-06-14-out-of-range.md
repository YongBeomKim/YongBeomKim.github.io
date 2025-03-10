---
layout: blog
title: MySQL (Out of range value for column)
tags:
- mysql
---

Django 의 Integer 필드에 입력할 때 다음과 같은 오류를 출력하였습니다. 오류의 원인은 컬럼의 `data Type` 이 불일치 해서 발생한 문제였습니다.

```bash
Django  "Out of range value for column 'shares' of row 65"
```

제가 작업한 경우에는, 데이터 값이 `int64` 형식을 갖고 있어서 발생한 오류 였습니다. 해당 필드의 데이터를 `int32` 로 변경한 뒤에 작업을 진행하면 해당 문제가 해결 되었습니다.

```python
d  = dict.fromkeys(df.select_dtypes(np.int64).columns, np.int32)
df = df.astype(d)
```

<br/>

# 참고사이트
- [MySQL : out of range value for column 해결하기](https://happylie.tistory.com/202)
- [Convert all columns from int64 to int32](https://stackoverflow.com/questions/59967429/convert-all-columns-from-int64-to-int32)
