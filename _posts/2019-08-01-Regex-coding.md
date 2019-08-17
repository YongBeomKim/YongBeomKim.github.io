---
title : 정규표현식 - 손에 잡히는 Ben Forter
last_modified_at: 2019-08-01T02:45:06-05:00
header:
  overlay_image: /assets/images/code/regex.png
categories:
  - regex
tags: 
    - re
    - regex
    - html
toc: true 
---

lxml, BeautifulSoup 등을 활용하며 자료를 수집했는데, 작업중 몇가지 문제가 발생하였습니다. 

1. lxml 수집시 **\\text()** 함수에서  `<오늘의 요리>` 텍스트를 Skip 하는 문제
2. bs4 객체로 54만개 실행시, 24만개에서 Memory Error 문제 (8Gb 사용 중)

이러한 상황들이 발생했을때, 크롤링 모듈을 사용해서는 해결하기 어려운 문제가 발생하게 되었고, 결국은 Regex 를 사용해서 작업을 해야 되어서 2번 작업을 하게되는 번거로움이 발생하였습니다.

이러한 이유로 Regex 를 사용한 작업들을 정리해 보려고 합니다.

<br/>
# 사용되는 내용

정규식 문법에 사용되는 몇가지 용어들을 정리해 보겠습니다.

## Meta 기호들

정규식 함수들로써..

1. **\\** : 역슬래시(\\) 는 **Escape 기능함수** 로 **기호를 문자열로** 변환
2. **( )** : 객체 집합, 다른말로 **하위 표현식** 이라고 합니다.
3. **[ ]** : 객체 범위
4. **{ }** : 객체의 구간(interval) 값의 정의
5. **\|** : 경우의 수를 묶는 **Or 선택자** 로 객체묶음과 함께 활용 ex) **(<br>|<br/>)**
6. **\\s** : 공백 Space 로, **\\S** 는 **^\\s** 와 동일 합니다
7. **\\n** : 줄 바꿈
8. **\\r** : Enter 줄 바꿈 (캐리지 리턴)
9. **\\t** : Tap 공백
10. **\\w** : 문자열 선택으로 **\\W** 는 **^\\w** 와 동일 합니다
11. **\\d** : 숫자 선택으로 **\\D** 는 **^\\d** 와 동일 합니다
12. **.** : 숫자, 문자, 기호들 **모두 선택가능한** Meta 문자
13. **^** : 이는 **캐럿문자** 로 바로 뒤 문자,범위,집합을 **제외한 나머지**
14. **\***: 이는 **Hash String** 으로 0개 ~ 여러개 번위만큼 일치여부 확인
15. **?** : 제한된 범위만큼 일치여부 확인  cf> * (탐욕적 수량자), *?(게으른 수랑자)

작업을 하다보면 Escape 작업이 필요한 경우가 있는데, 이는 **Meta** 문자와 기호들이 해당됩니다.

**Meta문자** 들로는 `+, *, .,\, |,^,[,{,(` 등이 있습니다. 이부분은 철저하게 정리를 하도록 합니다. 

## 다중행 에서의 Meta 기호들

이 부분에서 주의할 점으로 위의 Meta 기호와 동일한 내용이, 다른 용도로 활용되는 **^** 와 **$** 에 대해 알아보려고 합니다.

> '(?m)^\s*//.*$'

위 내용에서 정규식 기능을 하는 부분은 `^\s*//.*$` 입니다. 이는 앞에 여백이 있는 HTML 주석을 특정할 수 있는 정규식 기호로써 활용 가능합니다. 위에서 살펴본 **^** 는 **범위나 집합** 에서 사용되는 경우를 의미하고, 이번 내용에서는 선택 문자열의 **시작** 조건과 **종료 조건** 을 의미 합니다.

새롭게 추가된 내용으로는 **(?m)** 내용이 있는데, 이는 다중 행 (multiline) 기능을 지원하는 내용 입니다. 하지만 이는 적용되는 언어에 따라 지원되지 않는 경우도 있으므로 주의를 합니다.

## 하위 표현식  **( )**

> `(((\d{1,2})|(1\d{2})|(2[0-9]\d))\.)`

여러 Meta 기호의 묶음으로 특정이 가능한 방식으로 **( )** 내부에 **\|** 와 같은 Filter 를 사용하여 구현을 하면 보다 다양한 경우들을 함께 처리할 수 있습니다.

하위 표현식 내부에, 하위 표현식을 중첩하여 처리할 수 있습니다.

<br/>
# String을 기호들을 활용하여 판단 조건문을 생성한다  

[NEXTREE 정규식 설명 블로그](http://www.nextree.co.kr/p4327/)


## **Square Bracket []**

String 문자열의 시작조건을 정의한다

1. **[abc]** : a, b, c 중 1개로 시작되는 1개 단어
2. **[abc].** : a, b, c 중 1개로 시작되는 ("." : 1개 단어) 2개 단어
3. **[abc][ABC]** : 1개는 a,b,c , 다음의 1개는 A,B,C 로 이어지는 2개 단어
4. **[A-z]** : 1개가 A~z **Range** 범위내 있는 1개 단어


## **Sub Pattern ()**

`(on | ues | rida)` : 문서내부에 on 또는, ues, 또는 ride **해당 문자만** 추출

```python
In > tokenizer = re.compile('(on|ues|rida)')
In > tokenizer.findall('Monday Tuesdat Friday')
Out >> ['on', 'ues', 'rida']

In > tokenizer = re.compile('(Mon|Tues|Fri)day')
In > tokenizer.findall('Monday Tuesday Friday')
Out >> ['Mon', 'Tues', 'Fri']

In > tokenizer = re.compile('..(id|esd|nd)ay')
In > tokenizer.findall('Monday Tuesday Friday')
Out >> ['nd', 'esd', 'id']
```

## **Quantifier (수량자)**

패턴의 출현빈도를 정의한다

* : **Zero** or **More times**
? : **Zero** or **Once**
+ : **Once** or **More times**
. : **Once** (Any Charactor) 
{} : 출현하는 객체의 수를 입력


```python
In > tokenizer = re.compile('.{2}')
In > tokenizer.findall('Monday Tuesday Friday')
Out >> ['Mo', 'nd', 'ay', ' T', 'ue', 'sd', 'ay', ' F', 'ri', 'da']
```

## **Pattern (경계)**

1. **\w** : 
1. **낭비없이 빠르게** 구현한다

<figure class="align-center">
  <img src="https://www.yeonghoey.com/css/_img/screenshot_2018-03-01_15-51-32.png" alt="">
  <figcaption></figcaption>
</figure>

| 상대단위 |         설명                       |
|:--------:|:----------------------------------:|
| **px**   | 모니터 화소(1픽셀) 기준            |
