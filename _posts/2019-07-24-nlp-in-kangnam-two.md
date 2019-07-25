---
title : 자연어 강의 2일 - 검색자료의 분석
last_modified_at: 2019-07-24T10:45:06-05:00
header:
  overlay_image: /assets/images/book/nlp_master.jpg
categories:
  - nlp
tags: 
    - nlp
    - python
---

Doc Indexing 

Ranking Model and Query Parser

자료의 검색을 Search 대신  retrieval 단어를 사용 합니다.

<br/>
# Search Engine

Indexer (Index 작업을 수행하는 함수들)
1. Crawler (retrieval 수집)
2. Doc Analyzer (빈도분석을 활용한 Vector 로 표현)
3. Doc Representation

Posting File 로 저장 후 Index DataBase 에 저장

USER  == (Query)==> Query Pep

Token 간의 Ranker (relavent 관계를 기준으로) = > 검색 결과를 출력

User relevant Feedback (Evaluation) => 사용자들의 Feedback 정보로 개인화 맞춤형 서비스

정보의 Retriver 방식들
1. ad hoc 방식 : 고정된 데이터에 사용자의 요구에 따라 쿼리가 변경
2. Filtering (추천시스템) : 사용자의 요구는 동일하지만 데이터가 계속적으로 가중치를 변경 
    
CS4501

Bag of Words 를 One-HOT-Encoding 으로 구현하면 **낭비되는 공간이 많다**

Information retrieval

Space Complexity Analysis
최고차항 공식 디노테이션 : O (D(문서의 모든 token의 수) * V (Dimension))


## 차원의 축소 (벡터 공간을 줄이는 방법)

Solution : Token 인덱스를, 주소값 인덱스로 치환

Linked List for each document (Map Reduce 방식을 적용)

Time Complexity Analysis

DTM  word1  word2  ... =>
doc1  0     1
doc2 
=> D(Collection)


(Trans pose Vector)
TDM   doc1  doc2  ... => D(Collection)
word1  0
word2  1
word3
=> V
|Q| *D,  Linked List

word1, ptr => doc2, prt

## Inverted Index

Token 의 인덱스만 저장하고, 인덱싱 주소만 활용하여 Posting 구조를 만든다

각각의 Term 에 대한 관계를 역으로 바꿔서 데이터를 재정의 합니다
(Query : )

DBM : B-Tree 구조로 만들어서 (Valanced Tree 구조)

## Map Reduce 구조

Sorting Based Inverted Index Construction

<figure class="align-center">
  <img src="https://banner2.kisspng.com/20180704/zcs/kisspng-apache-lucene-inverted-index-search-engine-indexin-apache-lucenenet-5b3d8dd9780238.2919637215307606654916.jpg">
  <figcaption>한국어 분석방법</figcaption>
</figure>


## Ranking 

문서별 가중치를 할당하여 관계를 검색합니다

대표적인 방식으로 Vector Space 방식이 가능합니다

<figure class="align-center">
  <img src="https://slideplayer.com/slide/3426299/12/images/2/CS+6501%3A+Information+Retrieval.jpg">
  <figcaption>한국어 분석방법</figcaption>
</figure>


