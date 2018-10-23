---
title : MU-Porject-02 Build the Structure
last_modified_at: 2018-03-13T15:45:06-05:00
tags: 
    - python
    - django
    - project
    - muyong
toc: true
---


## 추천시스템 [link](https://datascienceschool.net/view-notebook/fcd3550f11ac4537acec8d18136f2066/)

### 개념 (두 TABLE 사이에서, 하나의 예측 실수값을 추출한다)

1. **베이스라인 모형** :  평균값을 통해서 예측 
1. **Collaborative Filter** : 평점행렬의 패턴을 활용하여 예측 
1. **Neighborhood 모형** : 유사한 사용자에게 가중치를 부여(user based)
1. **유사도 예측** : 평균제곱, sin/cos, 피어슨 유사도를 활용 
1. **KNN** 가중치 예측 : 유사도 벡터공간에서 가까운 k명의 사용자 값을 가중평균 하여 예측
1. **Matrix Factorization** : 오차함수를 최소로하는 요인벡터를 찾는다
1. **Singular Value Decomposition** : 특이값 분해


## 맛 구분표 
단맛, 신맛, 짠맛, 쓴맛 (기본맛)
매운맛, 떫은맛 (뒷맛)
6개를 one hot encoding으로 조합한다


**Note:** win32diskimager 추천
{: .notice--info}

**Please Note:** transmission permission 오류시
{: .notice--danger}