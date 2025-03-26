---
layout: blog
title: (Django) Index Table
tags:
- django
---

`Django` 모델 테이블을 정의할 때, 인덱스에 반복 사용하는 여러개의 필드를 모아서 별개의 테이블로 만들고 이를 상속받는 방식으로 모델을 정의 하였습니다.
```python
class Ticker(models.Model):
    code = models.CharField(blank=True, null=True, max_length=10)
    name = models.CharField(max_length=50, unique=True)


class Index(models.Model):
    date   = models.DateField()
    ticker = models.ForeignKey(
        Ticker, on_delete=models.CASCADE, 
        related_name='index'
    )

    class Meta:
        indexes = [models.Index(fields=['date','ticker']),]
```
<br/>

# 문제점
<span style="color:red">**특정한 종목의 특정한 날짜**</span>의 값을 기준으로 개별 index 가 정의가 되어 있습니다. 때문에 <span style="color:red">**특정종목의 특정한 날**</span> 데이터를 호출하기는 용이한데, 문제는 <span style="color:red">**특정종목의 특정한 날짜 구간의 데이터**</span> 를 호출하려면 복잡한 Query 를 요구합니다. 게다가 1종목의 여러가지 데이터를 호출하려면 `Index` 테이블을 반복적으로 경로를 중복하여 호출을 해야되서 <span style="color:red">**병목현상**</span> 이 발생하기에도 쉬워서 이러한 구조를 해체하고 기존의 방식으로 되돌아 가도록 결정 하였습니다.

<br/>

# 보완점
위와같은 구조를 전체에 적용하기는 어렵지만 부분적으로 적용해 보도록 하겠습니다. `Ohlcv` 테이블을 부모 테이블로 하고 `HourlyPrice Table` 을 자식의 관계로 정의를 해 보겠습니다.
```python
class Ohlcv(models.Model):
    ticker = models.ForeignKey(
        Ticker, on_delete=models.CASCADE, 
        related_name='index_ohlcv'
    )
    date  = models.DateField()
    open  = models.IntegerField()
    high  = models.IntegerField()
    low   = models.IntegerField()
    close = models.IntegerField()
    volume = models.IntegerField()

    def __str__(self):
        return f"{self.index.date} {self.index.ticker}"

    class Meta:
        indexes = [
            models.Index(fields=['ticker','date']),  # `index_id` 인덱스 추가
        ]


class PriceDatetime(models.Model):

    index = models.ForeignKey( 
        Ohlcv, on_delete=models.CASCADE, 
        related_name='index_price_time'
    )
    # 인덱싱한 나머지 시간 데이터
    # : `datetime.now().time().replace(second=0, microsecond=0)`
    day_time = models.TimeField()
    price  = FloatRoundUpField()
    volume = models.IntegerField()

    def __str__(self):
        return f"{self.index} {self.day_time}"
```