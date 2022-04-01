---
layout: blog
title: Django Error Notes
tags:
- django
- react
---

작업을 하면서 실수한 내용들을 정리 합니다

> 2022-03-30

# Django ORM
## Bulk Create

```python
IntegrityError: duplicated key value violates unique constraint "...."
DETAIL: key (id)=(11087) alreay exists.
```

`bulk_create` 로 데이터를 입력하는 경우, **같은 데이터를 반복하여 Migration** 시도를 할 때 발생하는 오류 였습니다. 일정한 기준에 따라 데이터를 나누는 작업을 추가했을 때, 나눠진 데이터 사이에 중복값이 발견되어 발생하는 오류였습니다. 해결은 `instance = []` 내용이 `for` 반복문 밖에 있었던 것을 내부에 추가 함으로써 해결 되었습니다. 

```python
# instance = []
for code in tqdm(codes_df):

    instance = []
    for index in range(len(df_code)):
        series = df_code.iloc[index,:]
        tuple_data = TableData(
            datetime=series['datetime'],
        )
        instance.append(tuple_data)
    TableData.objects.bulk_create(instance)
```

> 22-04-01

# Django Ninja
## Api Query

`url` 과 **request** 의 `Parametor` 그리고 `ORM Query` 3곳의 변수명이 일치 되어야 1개의 객체로 동작을 합니다. 이번에는 `url` 에서 오타가 난 경우 였는데 **http://localhost:8000/api/{`url변수명`}?`request변수명`=** 으로 동작을 하였습니다.

```python
@api.get("/project/{project_id}", response=ProjectOut, tags=["Read"])
def get_project(request, project_id:int):
    return get_object_or_404(Project, id=project_id)
```
