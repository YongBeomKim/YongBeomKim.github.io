---
title : 웹을 위한 머신러닝 3 - 추천시스템
last_modified_at: 2018-03-14T18:45:06-05:00
header:
  overlay_image: /assets/images/book/machine-learning.jpg
categories:
  - machine learning
toc: true
---


> 웹을 위한 머신러닝 - 에이콘


<img src="http://acornpub.co.kr/tb/detail/book/dm/qn/1489112679ajXucfb6.jpg" width='300'>

## **추천시스템**
1. **협업필터링** : Collaborative Filtering
2. **콘텐츠 기반 필터링** : Content Based Filtering
3. **연관 룰** : association rules
4. **로그 우도 방식** : Log likelihood method
5. **하이브리드 방식** : Hybrid method
6. **정확도 평가방식** : Accuracy

## **준비재료**
유틸리티 행렬 utility matrix  ex) 컬럼명 item,  row 사용자
1. warm start : 가용 데이터가 충분한 상태 
2. cold start : 가용 데이터가 적은상태 (CF, CBF 하이브리드 방식으로 보완)

## Memory Based Collaborative Filtering
utility Matirx를 사용해서 아이템간 유사도를 측정한다

## User Based Collaborative Filtering
K-NN로 유사한 사용자들을 찾고(피어슨이 cos()보다 결과가 좋다), 가중평균값을 평점으로 대체한다 (k는 20~50 사이값이면 충분하다)

## item Based Collaborative Filtering
아이템을 기준으로 유사도가 측정되어, 보다 확장성 있는 추천 시스템을 제공한다

## Slope one (item based)
1. 특정 item과 차이가 작은 item 'K'를 찾는다 
2. 예측 평점을 가중평균으로 계산 (비용이 낮고, 구현이 쉽고, 대체로 정확)

## Model Based Collaborative Filtering
utility matrix로 사용자 Item 평가 패턴을 추출

## Altering Least Square model (교대 최소 제곱법)
ALS 기법은 행렬 R을 분해하는 가장 간단한 방법이다


<figure>
    <!-- 클릭시 이미지 확대 URL 추가 -->
    <a href="{{ site.url }}{{ site.baseurl }}/assets/images/project/menu-rdb.jpg">
        <img src="{{ site.url }}{{ site.baseurl }}/assets/images/project/menu-rdb.jpg">
    </a>
    <figcaption>메뉴관리 기본 R-DB 설계도</figcaption>
</figure>

**Note:**
{: .notice--info}

**Please Note:**
{: .notice--danger}
