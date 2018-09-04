---
title : [생활코딩] 정규식의 사용
last_modified_at: 2018-09-01T02:45:06-05:00
header:
  overlay_image: /assets/images/book/regex.png
categories:
  - html
tags: 
    - regex
toc: true 
---


# String을 기호들을 활용하여 판단 조건문을 생성한다  

[NEXTREE 정규식 설명 블로그](http://www.nextree.co.kr/p4327/)


## **Square Bracket []**

String 문자열의 시작조건을 정의한다

1. **[abc]** : a, b, c 중 1개로 시작되는 1개 단어
2. **[abc].** : a, b, c 중 1개로 시작되는 ("." : 1개 단어) 2개 단어
3. **[abc][ABC]** : 1개는 a,b,c , 다음의 1개는 A,B,C 로 이어지는 2개 단어
4. **[A-z]** : 1개가 A~z **Range** 범위내 있는 1개 단어


## **Sub Pattern ()**

**(on|ues|rida)** : 문서내부에 on 또는, ues, 또는 ride **해당 문자만** 추출

```
> tokenizer = re.compile('(on|ues|rida)')
> tokenizer.findall('Monday Tuesdat Friday')
Out >> ['on', 'ues', 'rida']

> tokenizer = re.compile('(Mon|Tues|Fri)day')
> tokenizer.findall('Monday Tuesday Friday')
Out >> ['Mon', 'Tues', 'Fri']

> tokenizer = re.compile('..(id|esd|nd)ay')
> tokenizer.findall('Monday Tuesday Friday')
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
> tokenizer = re.compile('.{2}')
> tokenizer.findall('Monday Tuesday Friday')

>> ['Mo', 'nd', 'ay', ' T', 'ue', 'sd', 'ay', ' F', 'ri', 'da']
```





1. **낭비없이 빠르게** 구현한다

<figure class="align-center">
  <img src="https://www.yeonghoey.com/css/_img/screenshot_2018-03-01_15-51-32.png" alt="">
  <figcaption></figcaption>
</figure>

| 상대단위 |         설명                       |
|:--------:|:----------------------------------:|
| **px**   | 모니터 화소(1픽셀) 기준            |
