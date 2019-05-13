---
title : 주식투자 공매도와 숏커버링 (글모음)
last_modified_at: 2019-04-15T10:45:06-05:00
header:
  overlay_image: /assets/images/book/stock.jpg
categories:
  - stock
tags: 
    - finance
    - stock
toc: true 
---

[공매도 종합 포털사이트](http://short.krx.co.kr/main/main.jsp) 를 제공은 하지만 일일히 자료를 찾아서 POST, GenerateKey 등 복잡한 과정을 통해서만 접근이 가능해서 이게 알려주려는 생각이 있는지 모호할 정도 입니다.

[팍스넷(LG전자)](http://www.paxnet.co.kr/stock/analysis/selling?abbrSymbol=066570) 이 좀더 수집이 용이하지만 문제는 거래량만 있을뿐, 잔고자료가 없어서 분석하기엔 부적절 합니다.

[Thinkpool(대차)](http://thinkpool.com/itemanal/i/loanTransaction.jsp?code=005930) 여기가 다양한 정보를 수집에 용이한 장점이 있습니다. 단점은 익일 오전 5시에 업데이트가 되어 위의 당일저녁 6시 갱신과 비교해서 시기적으로 많이 늦습니다.

결국은 HTS 와 연계한 정보수집을 우선적으로 고안하고, 나머지 방법들은 보조적인 수단으로 활용하도록 합니다

<br/>
# 공매도의 개념

<iframe width="560" height="315" src="https://www.youtube.com/embed/KCDFmpVr8cs?start=310" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>

우선 **공매도** 란, 주식없이 거래를 하는 방법입니다. 즉 당장 주식은 없지만 거래를 가능하게 만드는 방법을 말하고, 이들의 방법중 첫째로 **무차입 공매도** [예로 삼성증권 사태가 있습니다](https://namu.wiki/w/%EC%82%BC%EC%84%B1%EC%A6%9D%EA%B6%8C%20%EC%9C%A0%EB%A0%B9%EC%A3%BC%EC%8B%9D%20%EC%82%AC%ED%83%9C) 와 둘째로 **차입공매도** 가 있습니다.

## 대차거래

금지된 **무차입 공매도** 와 다른, 허용되는 **차입공매도** 거래를 **대차거래** 라고 합니다. 즉 공매도 범주내 대차거래 방식이 존재합니다.

## 차입과 상환

대차거래는 일반거래와 다르게, 먼저 **<span style="color:red">(주식의 차입)</span>** 특정주식을 빌려서 판 뒤, 일정한 기간내 **<span style="color:blue">(주식의 상환)</span>** 해당 주식을 빌린만큼 사서 갚습니다.

## 숏커버링

대차거래는 높은 가격에 팔아서, 낮은 가격으로 상환하는게 목적인데, 시장의 방향이 예상과는 다른 **장기적인 상승패턴으로 진입시 대차 주식의 상환 압박이** 심해집니다. 이때는 하루라도 빨리 갚는게 중요해서 대량 매수가 들어오고 이를 **숏커버링** 이라고 합니다.

숏커버링은 주로 연말에 보게되는데, [윈도우 드레싱](https://politicstory.tistory.com/1062) 과 함께 나타납니다. 다음해 배당을 위해 해당 종목의 대차주식을 정리하는 과정 입니다. 그리고 다음해 연초부터 해당 종목의 대차주식을 보유하기 시작합니다

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/stock/short-kl.jpg">
</figure>

주식 수급분석을 하다보면 세력이 **대량으로 주문의 변동이** 일어나는 상황을 반등의 모멘텀으로 오해할 수 있는데 **숏커버링** 을 의심해야 합니다.

즉 이는 장기보유 목적이 아닌, 과거 대량의 매도 후 이를 상환하기 위한 매수인 경우 장기적인 상승의 모멘텀이 아닌 청산의 결과이기 때문입니다. [숏커버링에 속지말자](http://www.hankookilbo.com/News/Read/201511241917008279)


## 숏커버링 소요기간 (Days To Cover)

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/stock/short-lg.jpg">
</figure>

이러한 패턴을 분석하면, 해당 주식을 어떠한 시각으로 바라보는지를 이해할 수 있습니다. 이를 위해 사용하는 자료가 **숏커버링 DTC** 입니다. 

대차거래 매매 패턴을 분석하면 대략의 상환기간을 추정할 수 있습니다. 이를 계산해서 제공하는 서비스가 있었는데 [trueshort]() 지금은 운영하지 않는 듯 합니다.

[하얀늑대 - 공매도 세력분석](https://blog.naver.com/jish2/221434464468) 숏커버링 기간은 대략 1~2일 로 분석됩니다. 이유는 종목에 따른 수수료로 보이고, 급격한 하락이후에 바로 급등할 가능성이 있다고 볼 수 있습니다