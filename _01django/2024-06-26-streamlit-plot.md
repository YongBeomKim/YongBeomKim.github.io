---
layout: blog
title: Streamlit plot
tags:
- streamlit
---

Streamlit 의 장점은 파이썬 언어를 사용하여 빠르게 웹서비스 프론트엔드를 작업할 수 있다는 점입니다. 이번에는 그래프를 그리는 방법들에 대해서 여러가지 시도한 내용들을 정리해 보겠습니다. [Streamlit Basics App Tutorial](https://www.youtube.com/playlist?list=PL2VXyKi-KpYtZzm1K8UKnnBzsOCtekhKq)

<br/>

## Matplotlib
**[matplotlib 에서 savefig](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.savefig.html)** 에서 사용가능한 옵션들을 활용 가능합니다. Streamlit 에서 matplotlib 객체를 화면에 출력할 때에는 [st.pyplot](https://docs.streamlit.io/develop/api-reference/charts/st.pyplot) 메서드를 활용 합니다.

장점은 jupyter 등에서 활용했던 코드를 그래도 사용할 수 있다는 점이다. 단점을 단순 이미지로만 출력되므로 사용자 반응이 전혀 없어서 단순한 확인용에는 유용하고 조회 및 검색에는 아쉬운 부분이 많다고 할 수 있습니다.

```python
# Matplotlib
import streamlit as st
# **kwargs : Arguments to pass to Matplotlib's savefig function.
st.pyplot(fig, use_container_width=True, transparent=True)
```

## PYGWalker
[PyGWalker: 시각화와 함께 탐색적 데이터 분석을 위한 Python 라이브러리](https://github.com/Kanaries/pygwalker/blob/main/docs/README.ko.md) 공식문서에는 한글화가 잘 정리되어 있습니다. `dash` 처럼 적용은 쉬웠지만 실행된 화면을 어떻게 조작해야 되는지가 조금 어려웠습니다. 어떤 분석을 할 지 잘 모를때 활용하기 적합해 보였습니다. Jupyter 에서 미리 분석을 한 뒤 서비스에 적용하기에는 자유도가 너무 높아서 Streamlit 적용은 향후에 시도 하는 것이 좋을거 같습니다.

```python
# 단순한 데이터 차트비교는 용이하나, Multi 설정은 조금더 익숙할 필요가 있음
import pygwalker as pyg
walker = pyg.walk(df, hideDataSourceConfig=True, vegaTheme='vega')
```

## Plotly
파이썬에서 활용할 때에는 100% 무료로 활용가능한 패키지 입니다. 특히 화면에 출력되면 사용자 만등으로 다양한 효과들이 추가 되는 도구 입니다.




<br/>

# 참고사이트
- [Jupyter Notebook Tutorial in Python - plotly](https://plotly.com/python/ipython-notebook-tutorial/)
- [Plotly Tutorial - 파이썬 시각화의 끝판왕 마스터하기](https://wikidocs.net/book/8909)
- [Streamlit Basics App Tutorial](https://www.youtube.com/playlist?list=PL2VXyKi-KpYtZzm1K8UKnnBzsOCtekhKq)
