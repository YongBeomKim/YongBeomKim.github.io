---
layout: blog
title: 파이썬 관련도서 정리
tags:
- books
---

최근에 읽거나 읽기위해 살펴본 여러권의 책들 중, 반복해서 읽을 필요가 있거나 중요한 내용이 포함된 책들을 간단하게 정리해 보겠습니다. 2022년 3월 4일 기준 입니다.

# For Coding...

## 효율적 개발로 이끄는 파이썬 실천기술

![book cover]({{ site.url }}{{ site.baseurl }}/assets/book/effect_coding.jpg)

추천 : ⭐⭐⭐⭐

코딩 작업을 하다보면 작업을 위한 시간보다, <span style="color:var(--strong);">문제해결 방법을 찾기위한 시간</span>을 더 많이 소비하게 됩니다. `리팩토링` 도 <span style="color:var(--accent);">문제해결 방법을 체계적으로 정리하는 방법</span> 으로써, 파이썬 전체적인 내용을 [Jupyter Notebook](https://nbviewer.org/github/YongBeomKim/Tutorials/tree/master/) 살피는데 도움이 되었습니다.

일본 저자의 책인만큼 `꼼꼼하면서 쉬운듯 어려운` 책 입니다. 초보자는 이해되는 부분만 실습하고, 어려운 부분은 반복하며 보시길 추천 합니다. 중급 이상인 분들은 몰랐던 내용들만 정리하면 페이지가 많이 줄어드는 만큼, 해당 내용들은 꼼꼼하게 익히면서 보면 많은 도움이 될 것입니다.

## 파이썬 코딩의 기술 (2판)

![book cover]({{ site.url }}{{ site.baseurl }}/assets/book/effect_python.jpg)

추천 : ⭐⭐⭐

앞의 책의 심화버젼으로 생각보다 잘 읽히지는 않는다. 원리적인 측면에서 목차가 정해져 있는데, Python 2 에서 부터 내용들이 반영되어 있어서 1회독 하는데 생각보다 많은 시간을 필요로 하다. 가격만큼 무게와 내용이 많아서 앞의 책을 전체적으로 이해한 뒤에 접근하기를 추천한다.


## 도메인 주도 설계 핵심 (반 버논)

![book cover]({{ site.url }}{{ site.baseurl }}/assets/book/ddd_simple.jpg)

추천 : ⭐⭐⭐⭐

**[DDD](https://blog.insightbook.co.kr/2011/08/03/%EB%8F%84%EB%A9%94%EC%9D%B8-%EC%A3%BC%EB%8F%84-%EC%84%A4%EA%B3%84%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80-%EA%B7%B8%EA%B2%83%EC%9D%B4-%EC%95%8C%EA%B3%A0-%EC%8B%B6%EB%8B%A4/)** 는 <span style="color:var(--strong);">개발자와 해당분야 전문가 (도메인 전문가) 사이의 소통 및 문제해결 방법</span> 입니다. 생소한 개념들을 설명하는 입문서로써, 처음 읽으면서 내용을 따라가기는 쉽지 않았습니다. 하지만 <span style="color:var(--accent);">전체적인 내용들을 익힌 뒤, 필기 하면서 내용을 따라가다 보면</span> 이해할 수 있었던 책 입니다.

## 파이썬으로 살펴보는 아키텍처 패턴

![book cover]({{ site.url }}{{ site.baseurl }}/assets/book/python_ddd.jpg)

추천 : ⭐⭐⭐⭐

목차와 내용을 간단하게 살펴보기만 했고, 전체적인 내용을 보진 않았습니다. 앞의 `DDD` 개념들을 파이썬의 `Flask` 와 `Django` 를 활용하여 서비스를 구성하는 예시들로 구성되어 있는만큼, 서비스를 제작하는데 있어서 많은 도움이 될 것으로 보이는 책 입니다.

##  파이썬을 이용한 클린 코드를 위한 테스트 주도 개발

![book cover]({{ site.url }}{{ site.baseurl }}/assets/book/clean_django.jpg)

추천 : ⭐⭐

이 책의 2판은 원서로서 [웹사이트](https://www.obeythetestinggoat.com/pages/book.html#toc) 를 통해서 내용을 볼 수 있습니다. 주요 내용은 `Test Driven Development` 로써 위의 `DDD` 와 보완적인 내용으로 책을 구매했을 때에도 오래된 도서였는데, 지금은 2판도 나온지 3~4년이 지난 내용으로 Django 에 대한 이해가 없으면 실습을 따라하기는 어렵습니다.