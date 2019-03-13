---
title : 도서리뷰 - 파이썬 클린코드
last_modified_at: 2019-02-26T10:45:06-05:00
header:
  overlay_image: /assets/images/book/clean-py.jpg
categories:
  - business
tags: 
    - startup
    - business
---

# 파이썬 클린코드 도서리뷰

## 터닝포인트 출판사

이번 리뷰는 **터닝포인트** 출판사에서 진행한 **facebook 도서리뷰** 이벤트로 제공받은 도서를 리뷰하는 내용입니다.

작년에 재미있게 읽었던 책중에 **파이썬 Jupyter Notebook 실전 입문** 가 있었습니다. 당시 Jupyter Notebook 으로 DashBoard 를 구현해볼 생각으로 **동적인 widget** 에 대한 내용을 알고자 여러 책들을 찾아보던 중 위 책이 **jupyter notebook** 에 대해 A-Z 까지 내용도 알차고 편집도 깔끔하게 잘 되어 있어서 인상적인 책이었습니다.

<figure class="align-center">
  <img src="http://image.kyobobook.co.kr/images/book/xlarge/210/x9791161340210.jpg" width="600">
</figure>

**Pandas** 관련 도서가 없고, Jupyter Notebook 에서 **데이터 분석** 에 관심있는 분들이라면 국내 출간된 책들 중 가장 알차게 정리되어 있어서 추천하는 책 입니다. 

## 전체적인 평가

결론만 간단히 언급하면, **내용은 알차고 좋은 내용이긴 하지만 읽어서 도움되실 분들이 한정적이고 몇가지 아쉬운 부분이 많은 책** 이라고 할 수 있습니다.

우선 가격이 28,000 에 약 334 페이지의 분량을 갖고 있습니다. 우선 목차를 봤을때 생소하게 느끼실 분들이 적지 않겠구나 하는 생각이 들었습니다.

```python
@decorator
class Hello:
    def __init__(self):
        self.name = "python"
    
    def __call__(self):
        return print(self.lower())
```
위 코드를 봤을때, 이게뭐야??? 무슨내용이지? 하는 생각이 드신다면 이 책을 접할때 드는 당혹감은 적지 않을 것이라고 생각합니다. TDD와는 다른 **Clean code** 즉, 직접적인 기능의 구현 보다는, if/ for 조건문 만이 아닌 Python의 고유한 메소드들을 활용하여 보다 간결하고 오류가 없는 모듈들을 만드는데 도움이 되는 책이기 때문입니다.

즉 다른 일반적인 책들은, 데이터 분석을 해야지, 머신러닝을 해야지, 시각화를 해야지 등과 같이 구체적인 결과물을 구현함으로써 읽는 독자가 접근성이 용이한데 반해 이 책은 예시를 봐도 구체적으로 어떤 내용인지를 간접적인 경험이 없다면 **왜 이러한 내용을 익혀야 하는데?** 하는 아쉬움이 들 수 있습니다.


## 장점
위에서 나열한 내용은 어떤 분들을 대상으로 제작된 책인지를 말씀드렸고, 이러한 내용에 대해 알고 있었거나 호기심이 생기신 분이라면 얻어가실 수 있는 내용들이 적지 않은 책입니다.

<figure class="align-center">
  <img src="http://image.kyobobook.co.kr/images/book/xlarge/754/x9788960779754.jpg" width="600">
</figure>

위에서 언급했던 불필요하다고 생각드는 부분들이, 계속 여러작업을 파이썬 모듈로 구현을 하고, whl 모듈을 만들고 만들어진 모듈들을 수정하면서 계속적으로 지적 호기심은 생기는 영역이라 위 사진에 나온 책을 

기존에도 이와 비슷한 책들이 몇권 있었는데, **고성능 파이썬**, 




기본적인 Python 의 **Class** 객체들을 다뤄보고 **def __init__** 등과 같은 내용들이 목차에 나열되어 있는데 