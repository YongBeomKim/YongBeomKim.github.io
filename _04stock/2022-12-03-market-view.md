---
layout: blog
title: 22년 12월 1주 마켓분석
tags:
- krx
- stock
---

Mr Market 을 제작하면서, 데이터간 유기적인 관계를 정의하지 않고 작업을 하다보니 방향을 찾지 못하고 방황을 하게 되었습니다. 이번부터 Hard Writing 으로 분석 내용을 정리하는 시간을 통해 분석 방법을 재 정리 해 보겠습니다.

# Market 내용
- 시장의 Long / Short 세력의 분포
- 주포들의 투자환경에 대해서 알 수 있다.
- [종합주가지수와 투자자예탁금, 신용융자잔고, 파생상품거래 예수금의 동향 및 관계 분석](https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002792198)

## 투자자예탁금
- 개인들의 투자여력에 대해 알 수 있다. 2020년 코로나 상승장을 견인한 근거

## 파생상품거래 예수금
- 말 그대로 파생시장 거래를 위한 예수금 추이
  
## RP 매도잔고
- 시중은행 예금상품을 자금시장에서 사고파는 시장성 예금상품으로 CD 와 RP가 있다
- [CD: Certificate of Deposit](https://holyhacker.tistory.com/53) 은 `양도성 예금증서` 로 **은행의 예금을 담보** 로 **시장에서 돈을 빌리기 위한 채권** 이다.
- [RP: Repurchase Agreements](https://holyhacker.tistory.com/53) 는 `환매조건부채권` 으로 금융회사가 **장기 3~5년 국고채** 를 매입한 뒤, **이를 담보로 돈을 빌리는 채권** 이다
- 이들은 **1 ~ 3개월** 의 짧은 기간으로 만기를 갖고, 대부분이 은행의 예금 또는 국고채를 담보로 하여 안전한 상품으로 알려진다
- 일반저축 보다 금리가 높고, 확정금리고 금리변동 위험 회피가 가능하며, 1일 이상 자유롭게 기간이 설정 가능해 단기자금 운용 수단으로 적합하다 [Kofia 문서]([https://www.kofia.or.kr%2Fnpboard%2Fm_18%2Fdown.do%3FbbsId%3DBBSMSTR_000000000203%26nttId%3D15310%26file_sn%3D0%26atch_file_id%3DFILE_000000000023373&usg=AOvVaw1nm-W92OAFQavo-obhHiA3](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwj5u7iUhuT7AhWum1YBHYQnABwQFnoECA4QAQ&url=https%3A%2F%2Fwww.kofia.or.kr%2Fnpboard%2Fm_18%2Fdown.do%3FbbsId%3DBBSMSTR_000000000203%26nttId%3D15310%26file_sn%3D0%26atch_file_id%3DFILE_000000000023373&usg=AOvVaw1nm-W92OAFQavo-obhHiA3)) | [RP매도잔고](https://eiec.kdi.re.kr/material/clickView.do?click_yymm=201512&cidx=1009)

## 위탁매매 미수금
- **신용매매** 를 위해 [증권사에서 빌린 금액](https://stockro.com/bbs/board.php?bo_table=stock_term&wr_id=333) 을 생각하면 된다
- 증거금 비율이 50%인 경우 **잔고만큼의 금액을 빌려서** 2배 어치의 주식을 살 수 있다
- 만기 차액은 **3거래일 내에** 채워야 하고, 해결하지 못하면 4거래일날 강제 반대매매를 한다.

<br/>

# 종목분석
- `Top-Down 분석방법` 으로 앞의 **<span style="color:var(--strong);">시장분석을 근거로</span>** 분석시점 및 특징을 미리 정의한다.
- 반대매매 최대였던 `2022-10-27` 이후 반등폭이 높은 종목을 선별한다
- `KOSDAQ \ KOSPI 지수와 동조화된 종목` 들은 분석해 보겠습니다.

<br/>

# 상품 아이템 분석 (가격, 수출입 데이터)

<br/>

# 유용한 뉴스, 리포트