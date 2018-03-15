---
title : 웹을 위한 머신러닝 1
last_modified_at: 2018-03-13T15:45:06-05:00
tags: 
    - python
    - django
    - ml
toc: true
---


## **Numpy()**

|  numpy 함수 |  설명 |
|-------------|-------|
| np.nan      | NaN 상수 |
| np.newaxis  | 축확장 상수|
| np.unique() | 배열 내 중복값 제거 |
| np.random(), np.shuffle() | 배열요소를 무작위 재배열 |
| np.sort() | 배열 오름차순 정렬 |
| np.argsort() | 배열 오름차순 정렬 후 index 출력 |
| np.array_equal() | 두 배열의 '차원' 비교 (같으면 True)
| np.flatten() | 다차원을 1차원으로 강제변경 |
| np.transpose() | 전치행렬을 생성 (x,y축을 바꾼다) |
| np.reshape()  | 배열을 다른 차원으로 재배열 |
| np.concatenae() | 여러배열을 1개로 결합 (1차원/다차원)|
| np.tostring() | 배열을 binary로 변환 |
| np.fromstring() | binary를 배열로 변환 |
| np배열.take(인덱스) | np배열을 '인덱스'배열에 맞춰서 재배치 한다 |
| np배열.put([값], 인덱스) | np배열에 '값'배열을 '인덱스'순서로 입력 |
| np배열.reshape((행's수, 열's수)) | np배열을 재배열 |
| np배열.T     | np배열의 전치배열 |
| np배열.mean() | np배열의 평균 |
| np배열.std() | np배열의 표준편차 |
| np배열.var() | np배열의 분산 |
| np배열.min() | np배열의 최소값 |
| np배열.max() | np배열의 최대값 |
| np배열.argmin() | np배열의 최소값 인덱스 |
| np배열.argmax() | np배열의 최대값 인덱스 |
| np.dot(행렬, 행렬)  | 내적을 계산 | 
| np.inner(행렬, 행렬)| 내적을 계산 |
| np.cross(행렬, 행렬)| 외적을 계산 |


## **Pandas()**

|  pandas 함수 |  설명 |
|--------------|-------|
| pd.Series([배열]) | NaN 상수 |
| pd.isnull(pd객체)  | NaN 여부 판단 | 
| pd.notnull(pd객체) | not NaN 판단 |
| pd객체.dtype | pd객체의 데이터타입 |
| pd객체[판단문 & 판단문] | 판단결과 true 해당 데이터 추출 |
| pd객체.ix[:3] | index 값으로 row 기준 선택 (0~2) |
| pd객체.iloc[:3] | index 위치값으로 row 기준 선택 (0,1,2)|
| pd객체.loc[:3] | index 레이블로 row 기준 선택 (0~3 주의!!) |
| pd객체.duplicated() | row 에 중복 데이터 확인 |
| pd객체.drop_duplicates() | 유일한 값들로 구성된 row 반환 |
| pd객체.dropna() | 유일한 값들로 구성된 row 반환 |
| pd객체.fillna(-1) | 빈셀에 상수값을 채운다 |
| pd객체.dropduplicates() | 유일한 값들로 구성된 row 반환 |

**Note:** 
1. `data.ix[3,1] = 1` 특정셀에 값을 입력
2. `data.ix[0] = [i for i in range(10)]` 특정 row 에 값을 입력(UPDATE) 
3. `data.loc[len(data)] = [i for i in range(10)]` 마지막 row에 값 추가 (NEW)
4. `data.apply(lambda x : pd.to_numeric(x))` float, int 석였을 떄 float로 변경
5. `pd.concat( element데이터, target 데이터 )` 2개 TABLE을 1개로 결합
{: .notice--info}


**Note:** win32diskimager 추천
{: .notice--info}

**Please Note:** transmission permission 오류시
{: .notice--danger}