---
layout: blog
title: (도서) ⚝⚝⚝⚝ 개발자를 위한 수학
tags:
- book
---

딥러닝을 작업하는 분들이라면 대부분 `HuggingFace` 라는 통합 패키지를 활용 합니다. 하지만 미리 학습한 모델을 재활용 하는데에는 유용하지만 개선되거나, 새로운 학습모델을 만들기 위해서는 딥러닝 프레임 워크인 `TensorFlow, Keras, Pytorch` 를 활용 해야만 합니다.

막상 `TensorFlow, Keras, Pytorch` 딥러닝 프레임 워크를 처음 접하시는 분들을 보면 딥러닝 이론과 이에 해당되는 패키지 내부함수, 함수 파라미터를 익히는데 어려움이 있고, 가장 어려워 하는 부분이 운영하는 버전과 기존에 작업했던 코드의 패키지 버전이 다름에 따라 변경되거나 없어지는 내용을 운영하는 버젼이 변경됨에 따라 모두 작업을 해 줘야 한다는 점이 가장 어려워 하는 부분입니다.

때문에, 파이썬 모듈 중 내부 메서드 및 파라미터 안정성이 높은 `numpy, panda, math, scikit-learn, scipy` 등의 파이썬 기본 패키지를 활용하여 인공지능 프레임 워크를 작성하는 경우가 상당히 있습니다.

이러한 취지를 가장 잘 살린 책이 있는데, 딥러닝을 공부하는 분이라면 한번쯤은 보게 될 [밑바닥부터 시작하는 딥러닝](https://m.hanbit.co.kr/store/books/book_view.html?p_code=B8475831198) 시리즈 입니다. 개인적으로는 가장 좋아하는 시리즈 입니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="400px" src="https://image.yes24.com/Goods/34970929/XL">
  </p>
</figure>

위 책이 `딥러닝`에 관련된 내용이라면, 머신러닝과 관련된 추천도서로는 [밑바닥부터 시작하는 데이터 과학 - 2판](https://product.kyobobook.co.kr/detail/S000001033089) 을 가장 좋아합니다.

이 책은 치명적인 단점이 있는데, 이 책에서만 활용하는 개별 패키지가 있다는 점입니다. 해당 패키지는 이 책에서만 사용하는 것으로 향후에 의존성을 갖는 다른 패키지들에 메서드 내용들이 변경되면 이를 해결하는데 많은 노력이 든다는 단점이 있습니다. 이러한 이유로 해당 이론을 익히고 학습하는데는 유용하지만, 실제 작업에 적용하기까지는 한계가 명확합니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="400px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz6tAJGikidcbVndJvMV8aQfsjiZRGYdy6Kg">
  </p>
</figure>

서론이 길었는데, 이번에 리뷰하게 된 이 책의 제목에는 **<span style="color:orange">딥러닝, 머신러닝, 데이터 마이닝</span>** 과 같은 자극적인 단어가 하나도 없이, 단지 **<span style="color:red">데이터 과학</span>** 이라는 단어만이 표지에 적혀 있습니다. 하지만 목차를 보면 다루는 범위가 상당함을 알 수 있습니다.

1. 중고등학생때 배우는 기초수학, 통계 그리고 선형대수학
2. 머신러닝에서 다루는 선형, 로지스틱 회귀 및 분류
3. 딥러닝에서 다루는 신경망

이 모든 내용에 관한 기본개념에서 부터, 해당내용 까지 모든 내용을 다루고 있습니다.

<br/>

# 총평
이 책은 파이썬으로 데이터 분석에서 딥러닝 까지 작업을 진행하고 있는 개발자 분들에게, 수학적 기본기를 탄탄하게 세우는데 도움을 주는 책 입니다.

이 책의 가장 큰 장점은 앞에서 언급한 **<span style="color:red">밑바닥부터 시작하는 딥러닝 | 데이터 과학 시리즈</span>** 의 책들에서 아쉬웠던 부분들이 모두 보완되어 있는 책이기도 합니다. 보완된 점들은 다음과 같습니다.

1. **<span style="color:red">sympy, numpy, panda, math, scikit-learn, scipy</span>** 와 같은 파이썬 기본 패키지만 활용하고 있습니다.
2. 초보자 분들도 내용을 따라갈 수 있도록, **쉬운 실제 예시** 를 설명과 함께 진행 합니다.
3. 전체 풀 칼라로 구성되어 있어서, 시각화 내용들을 바로 이해하기 쉽게 되어 있습니다.

## 파이썬 기본 패키지 도구만을 활용
다른 책에서는 잘 다루지 않았던 **<span style="color:red">[SymPy](https://docs.sympy.org/latest/tutorials/intro-tutorial/index.html)</span>** 패키지가 이 책에서 주요하게 활용되고 있습니다. 이름이 개인적으로 생소했을 뿐, 선형대수관련 연산 및 시각화를 하는데 있어서는 가장 강력한 패키지 입니다. 

책이 전체적으로 **SymPy** 등의 기본 패키지만 활용하고 있어서, 다른 작업을 하는데 이 책에서 익힌 내용을 적용하기가 용이하다는 장점이 있습니다.

## 쉬운 실제 예시를 들어서 설명
이 책에서 수학에 관한 설명은 중학생 개념에서 부터 시작 합니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/python/sympy_math_01.jpg">
  </p>
</figure>

어려운 내용까지도 쉽게 설명하기위해 각 개념들에 대한 설명과 이러한 장점이 가장 도드러진 챕터가 **<span style="color:red">3장 기술 통계와 추론통계</span>** 입니다. 2장의 확률 내용도 이러한 강점이 잘 살아 있지만, 상대적으로 어렵게 느낄수 있는 3장의 빠르게 읽어보기만 해도 초보자를 위한 저자의 배려가 잘 살아있음을 알 수 있었습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/python/sympy_math_02.jpg">
  </p>
</figure>

## 전체 페이지가 풀칼라로 구성
밑바닥 시리즈에서 가장 아쉬웠던 부분이 흑백이라는 점이었습니다. 밑바닥 딥러닝 시리즈는 3권 이후부터는 부분컬러로 보완이 되긴 했지만 전체적으로 흑백으로 되어 있었습니다. 반면에 이 책은 시각화된 차트와 작업코드까지 모두 칼라로 되어 있어서 한눈에 전체적인 내용을 파악하기 용이 했습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="510px" src="{{site.baseurl}}/assets/python/sympy_math_03.jpg">
  </p>
</figure>

<br/>

# 마무리
일반적인 파이썬 딥러닝, 머신러닝 책들이 대부분 앞부분에서 빠르게 파이썬 기초 및 선형대수 기초 내용을 빠르게 다루고 있습니다. 하지만 해당 내용들은 대부분 몇 페이지 안되기 때문에 놓치는 부분이 많고, 이러한 이유로 인하여 머신러닝, 딥러닝 내용을 따라 가다가 어려움이 생긴 경험이 있으실 겁니다.

이런 경험이 있는 분들 이라면 이 책을 완독하신 후, 기존에 갖고있는 책의 내용을 한번 더 진행하실때 보다 수월하게 진행하실 수 있으실 겁니다.

※ 본 리뷰는 IT 현업개발자가, 한빛미디어 책을 제공받아 작성한 서평입니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="800px" src="https://tensorflow.blog/wp-content/uploads/2024/05/eab09cebb09cec9e90eba5bc-ec9c84ed959c-ed9584ec8898-ec8898ed9599.png">
  </p>
</figure>
