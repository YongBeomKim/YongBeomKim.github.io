---
title : 식재료 추천시스템 구조설계
last_modified_at: 2019-04-19T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django_pro.png
categories:
  - django
tags: 
    - modal
    - django
---


가격정보가 없는 품목에 대한 정보 수집하기

<br/>
# **Daum 쇼핑에서 가격정보 수집하기**

```python
# 목록에 없는 제품에 대한 정보 추출하는 방법
search = "메밀냉면"
from muyong.shop import shop_daum
df = shop_daum(search).sort_values('리뷰수', ascending=False).reset_index(drop=True)
df.iloc[:5,[0,1,2]]
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>제품명</th>
      <th>가격</th>
      <th>가격(1개)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>옥천 메밀냉면 물 비빔 평양 무김치육수-전문점판매용</td>
      <td>3900</td>
      <td>3900</td>
    </tr>
    <tr>
      <th>1</th>
      <td>고급냉면20인/함흥.칡냉면.메밀냉면/물냉면+겨자소스</td>
      <td>12610</td>
      <td>12610</td>
    </tr>
    <tr>
      <th>2</th>
      <td>고급냉면10인분/메밀냉면/칡냉면/함흥냉면/쫄면</td>
      <td>5600</td>
      <td>5600</td>
    </tr>
    <tr>
      <th>3</th>
      <td>옥천냉면100인분(2kgx10개)메밀냉면/함흥냉면/칡냉면</td>
      <td>31200</td>
      <td>3120</td>
    </tr>
    <tr>
      <th>4</th>
      <td>쟁반막국수 쫄면 옥천 메밀냉면 평양 함흥 칡 단무지</td>
      <td>3900</td>
      <td>3900</td>
    </tr>
  </tbody>
</table>
</div>

<br/>
# **레시피 데이터**
- [**농축산물 품목코드**](https://data.mafra.go.kr/opendata/data/indexOpenDataDetail.do?data_id=20141220000000000375&service_ty=G&shareYn=Y)
- **KAMIS, 가락시장 정보** 두가지를 종합해서 일자별 정보 수집하기

```python
# 품목코드 기준표
import pandas as pd
recipe = pd.read_csv('csv/recipe_sum.csv')
recipe.head(3)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }
    .dataframe tbody tr th {
        vertical-align: top;
    }
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>음식분류</th>
      <th>음식명</th>
      <th>식품명</th>
      <th>gram</th>
      <th>Kcal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>구이류</td>
      <td>두부양념구이</td>
      <td>두부</td>
      <td>75.0</td>
      <td>63.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>구이류</td>
      <td>두부양념구이</td>
      <td>간장,왜간장</td>
      <td>10.0</td>
      <td>5.3</td>
    </tr>
    <tr>
      <th>2</th>
      <td>구이류</td>
      <td>두부양념구이</td>
      <td>파,대파</td>
      <td>6.5</td>
      <td>1.7</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 해당 이름을 포함하는 재료 확인하기
search = "토란"
recipe_items = [txt.split(',')[0]  for txt in recipe.식품명]
recipe_items = sorted(set(recipe_items))
[i   for i in recipe_items  if i.find(search)!=-1]
```

    ['토란']

<br/>
# **가격정보에 없는 레시피 재료정보 확인**

```python
# 레시피 재료 중 검색이 안되는 품목들
items  = recipe_items
errors = [] # 결과값 담을 객체
import pandas as pd
food_price = pd.read_csv('csv/food_price.csv')
prod_price = pd.read_csv('csv/product_price.csv')
item_names = [txt.replace(' ','')  for txt in food_price.상품명]
item_prod  = [txt.replace(' ','')  for txt in prod_price.상품명]

for search in items:
    check = []
    # 식재료 가격 정보에서 없는 이름 찾기
    for item in item_names + item_prod:
        if item.find(search) != -1:
            check.append(search)
    if len(check) == 0:
        errors.append(search)

errors
```

    []

<br/>
# **가격정보 CSV에서 이름을 포함하는 품목 찾기**

```python
# 검색하려는 단어가 포함된 목록 출력
items  = ['메밀','토란', '국수', '감자', '당근']
result = {} # 결과값 담을 객체

# 상품과 농산물 가격의 조회 list
import pandas as pd
food_price = pd.read_csv('csv/food_price.csv')
food_price['상품명'] = food_price['상품명'] + "|" + food_price['등급']
prod_price = pd.read_csv('csv/product_price.csv')
item_names = {txt.replace(' ',''):txt  for txt in food_price.상품명}
item_prod  = {txt.replace(' ',''):txt  for txt in prod_price.상품명}

# 식재료 가격 정보에서 일치하는 이름 찾기
for search in items: 
    for item in item_names.keys():
        if item.find(search) != -1:
            result[search] = food_price[food_price.상품명 ==
                                        item_names[item]].loc[:,
                                                    ['상품명','수량','단위','가격']]

            
    # 제품 정보가 없을 때 공산품에서 찾기
    if search not in result.keys():
        for item in item_prod:
            if item.find(search) != -1:
                result[search] = prod_price[prod_price.상품명 == 
                                            item_prod[item]].loc[:,
                                                    ['상품명','수량','단위','가격']]

pd.concat([result[k]   for k in result.keys()]).sort_values('상품명').reset_index(drop=True)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>상품명</th>
      <th>수량</th>
      <th>단위</th>
      <th>가격</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>감자 수입|상품</td>
      <td>23.0</td>
      <td>1000g</td>
      <td>27250</td>
    </tr>
    <tr>
      <th>1</th>
      <td>고급냉면10인분 메밀냉면 칡냉면 함흥냉면 쫄면</td>
      <td>1.0</td>
      <td>2000kg</td>
      <td>5600</td>
    </tr>
    <tr>
      <th>2</th>
      <td>냉동토란</td>
      <td>1.0</td>
      <td>1000g</td>
      <td>6900</td>
    </tr>
    <tr>
      <th>3</th>
      <td>당근 수입|중품</td>
      <td>10.0</td>
      <td>1000g</td>
      <td>6687</td>
    </tr>
    <tr>
      <th>4</th>
      <td>옛날국수소면</td>
      <td>1.0</td>
      <td>NaN</td>
      <td>2400</td>
    </tr>
  </tbody>
</table>
</div>

<br/>
# **관련 레시피 추천시스템**
1. 재료의 비중이 높은 순서대로 추천하기 : 다양성이 떨어짐
2. 재료를 word to bag 으로 변환한 뒤, 텍스트간 Cosin 유사도 활용하기 : 응용이 유용

## **1 레시피를 Bag of word 데이터로 변환**
- 별도의 전처리 과정은 불필요
- 이미 작업된 분류기준, 식재료 이름을 활용하기


```python
temp = recipe[recipe.음식명 == '감자국'] # .reset_index(drop=True)
{temp.iloc[i,2]: temp.iloc[i,3]for i in range(len(temp))}
```

    {'간장,재래간장': 3.0,
     '감자': 110.0,
     '된장,개량': 11.5,
     '마늘,구근': 2.0,
     '멸치,큰멸치': 5.0,
     '파,대파': 3.0}

```python
recipe[recipe.음식명 == '감자국']
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }
    .dataframe tbody tr th {
        vertical-align: top;
    }
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>음식분류</th>
      <th>음식명</th>
      <th>식품명</th>
      <th>gram</th>
      <th>Kcal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>78</th>
      <td>국,탕류</td>
      <td>감자국</td>
      <td>감자</td>
      <td>110.0</td>
      <td>72.6</td>
    </tr>
    <tr>
      <th>79</th>
      <td>국,탕류</td>
      <td>감자국</td>
      <td>된장,개량</td>
      <td>11.5</td>
      <td>18.5</td>
    </tr>
    <tr>
      <th>80</th>
      <td>국,탕류</td>
      <td>감자국</td>
      <td>멸치,큰멸치</td>
      <td>5.0</td>
      <td>15.2</td>
    </tr>
    <tr>
      <th>81</th>
      <td>국,탕류</td>
      <td>감자국</td>
      <td>파,대파</td>
      <td>3.0</td>
      <td>0.8</td>
    </tr>
    <tr>
      <th>82</th>
      <td>국,탕류</td>
      <td>감자국</td>
      <td>간장,재래간장</td>
      <td>3.0</td>
      <td>1.6</td>
    </tr>
    <tr>
      <th>83</th>
      <td>국,탕류</td>
      <td>감자국</td>
      <td>마늘,구근</td>
      <td>2.0</td>
      <td>2.5</td>
    </tr>
  </tbody>
</table>
</div>

### **굳이 복잡하게 안하고, 정규화/ 표준화로도 우선은 구현이 가능**
- 레시피 전체합을 1로 정규화 진행하기
- 재료별 우선순위 높은 순서대로 정렬하기

```python
# DictVectorizer : Bag of Word 벡터를 생성
# 레시피도 가중치에서 이를 활용하기
from sklearn.feature_extraction import DictVectorizer
train = [
    {"user": "1", "item": "5", "age": 1.9},
    {"user": "2", "item": "43", "age": 3.3},
    {"user": "3", "item": "20", "age": 5.5},
    {"user": "4", "item": "10", "age": 2.0},
]
v = DictVectorizer()       # 피쳐값은 v.feature_names_ 저장
X = v.fit_transform(train) # age값, user BOW(4), item BOW(4) 매트릭스
print(X.toarray())
```

    [[1.9 0.  0.  0.  1.  1.  0.  0.  0. ]
     [3.3 0.  0.  1.  0.  0.  1.  0.  0. ]
     [5.5 0.  1.  0.  0.  0.  0.  1.  0. ]
     [2.  1.  0.  0.  0.  0.  0.  0.  1. ]]

### **요리재료를 활용한 유사도 측정**

```python
# 품목코드 기준표
import pandas as pd
recipe = pd.read_csv('csv/recipe_sum.csv')
recipe.head(3)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }
    .dataframe tbody tr th {
        vertical-align: top;
    }
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>음식분류</th>
      <th>음식명</th>
      <th>식품명</th>
      <th>gram</th>
      <th>Kcal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>구이류</td>
      <td>두부양념구이</td>
      <td>두부</td>
      <td>75.0</td>
      <td>63.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>구이류</td>
      <td>두부양념구이</td>
      <td>간장,왜간장</td>
      <td>10.0</td>
      <td>5.3</td>
    </tr>
    <tr>
      <th>2</th>
      <td>구이류</td>
      <td>두부양념구이</td>
      <td>파,대파</td>
      <td>6.5</td>
      <td>1.7</td>
    </tr>
  </tbody>
</table>
</div>


```python
# 요리 인덱스 : 인덱스별 레시피 정보를 정리
food_idx = sorted(set(recipe.음식명))
train    = []
for idx in food_idx:
    temp = recipe[recipe.음식명 == idx]       # .reset_index(drop=True)
    temp = {temp.iloc[i,2]: temp.iloc[i,3]  for i in range(len(temp))}
    train.append(temp)
```

```python
# bag of word 벡터
from sklearn.feature_extraction import DictVectorizer
v = DictVectorizer()       # 피쳐값은 v.feature_names_ 저장
X = v.fit_transform(train) # age값, user BOW(4), item BOW(4) 매트릭스
print(X.toarray())
```

    [[  0.   3. 110. ...   0.   0.   0.]
     [  0.   2.  50. ...   0.   0.   0.]
     [  0.   0.  30. ...   0.   0.   0.]
     ...
     [  0.   0.   0. ...  40.   0.   0.]
     [  0.   0.   0. ...   0.   0.   0.]
     [  0.   0.  30. ...  20.   0.   0.]]


## **메뉴의 유사도 측정**
레시피 데이터를 종합한 메뉴간의 유사도 측정

```python
# 코싸인 유사도 행렬을 생성
from sklearn.metrics.pairwise import cosine_similarity
food_sim = cosine_similarity(X)
print(food_sim.shape)
food_sim
```

    (109, 109)

    array([[1.00000000e+00, 7.68934511e-01, 4.43925098e-01, ...,
            6.63287397e-04, 0.00000000e+00, 5.45209241e-01],
           [7.68934511e-01, 1.00000000e+00, 3.34515585e-01, ...,
            2.19918153e-04, 0.00000000e+00, 8.88999586e-01],
           [4.43925098e-01, 3.34515585e-01, 1.00000000e+00, ...,
            0.00000000e+00, 2.57422487e-04, 2.31483045e-01],
           ...,
           [6.63287397e-04, 2.19918153e-04, 0.00000000e+00, ...,
            1.00000000e+00, 0.00000000e+00, 3.38689982e-01],
           [0.00000000e+00, 0.00000000e+00, 2.57422487e-04, ...,
            0.00000000e+00, 1.00000000e+00, 0.00000000e+00],
           [5.45209241e-01, 8.88999586e-01, 2.31483045e-01, ...,
            3.38689982e-01, 0.00000000e+00, 1.00000000e+00]])

```python
def similar_recommend_by_id(id_num, rank=8):
    food_index  = id_num - 1
    similar_food = sorted(list(enumerate(food_sim[food_index])), key=lambda x:x[1], reverse=True)
    print("----- {} : 요리와 유사도 높은 메뉴추천 -------".format(food_idx[similar_food[0][0]]))
    for no, idx in enumerate(similar_food[1:rank]):
        print('추천영화 {}순위 : {}'.format(no, food_idx[idx[0]]))
```

```python
similar_recommend_by_id(1)
```

    ----- 감자국 : 요리와 유사도 높은 메뉴추천 -------
    추천영화 0순위 : 감자튀김
    추천영화 1순위 : 감자볶음
    추천영화 2순위 : 감자전
    추천영화 3순위 : 감자조림
    추천영화 4순위 : 감자된장국
    추천영화 5순위 : 감자탕
    추천영화 6순위 : 된장찌개


## **재료의 데이터를 활용한 유사도 측정**
개별 재료들의 조합을 활용하여 유사도 높은 자료 찾기
- 유사도 측정 데이터를 다양하게 활용하자
- 데이터 차원을 이해하기
- 2차원, 인덱스는 레이블을 의미한다 : 여기선 메뉴들을 의미

```python
# 데이터의 차원
X.ndim

# 요리명, 재료인덱스
X.shape

# 개별 요리의 인덱스 값
len(X[1].toarray()[0])

# 개별 재료의 인덱스 값
len(X[:,1].toarray())
```


```python
print(len(food_idx))
food_idx[:5]
```

    109

    ['감자국', '감자된장국', '감자밥', '감자볶음', '감자전']

```python
print(len(v.feature_names_))
v.vocabulary_
v.feature_names_[:5]
```

    113

    ['간장,왜간장', '간장,재래간장', '감자', '겨자,분말', '고구마']

```python
df = pd.DataFrame(X.toarray())
df.columns = v.feature_names_
df.index = food_idx
df.head()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }
    .dataframe tbody tr th {
        vertical-align: top;
    }
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>간장,왜간장</th>
      <th>간장,재래간장</th>
      <th>감자</th>
      <th>겨자,분말</th>
      <th>고구마</th>
      <th>고등어</th>
      <th>고사리</th>
      <th>고추,붉은고추</th>
      <th>고추,풋고추</th>
      <th>고추장</th>
      <th>...</th>
      <th>파,실파</th>
      <th>파,중파</th>
      <th>파인애플,통조림</th>
      <th>팥,붉은팥</th>
      <th>피망,녹색과</th>
      <th>햄,등심</th>
      <th>호박,늙은호박</th>
      <th>호박,애호박</th>
      <th>홍합</th>
      <th>후추,검은색</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>감자국</th>
      <td>0.0</td>
      <td>3.0</td>
      <td>110.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>감자된장국</th>
      <td>0.0</td>
      <td>2.0</td>
      <td>50.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>2.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>감자밥</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>30.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>감자볶음</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>80.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>감자전</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>75.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 113 columns</p>
</div>

```python
df['감자'].sort_values(ascending=False)[:5]
```

    감자튀김    130.0
    감자국     110.0
    감자볶음     80.0
    감자전      75.0
    감자탕      60.0
    Name: 감자, dtype: float64
